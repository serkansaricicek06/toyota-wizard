using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using ToyotaWizard.Api.Models.Entities;
using ToyotaWizard.Api.Services.Interfaces;

namespace ToyotaWizard.Api.Services.Implementations;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(AdminUser user)
    {
        var secret = _configuration["Jwt:Secret"] ?? "ToyotaWizardSuperSecretKey2025_LongEnoughForSha256Security!";
        var issuer = _configuration["Jwt:Issuer"] ?? "ToyotaWizardApi";
        var audience = _configuration["Jwt:Audience"] ?? "ToyotaWizardClients";
        var expireHours = int.TryParse(_configuration["Jwt:ExpiresInHours"], out var hours) ? hours : 24;

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(expireHours),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public bool ValidateToken(string token)
    {
        if (string.IsNullOrWhiteSpace(token)) return false;

        var secret = _configuration["Jwt:Secret"] ?? "ToyotaWizardSuperSecretKey2025_LongEnoughForSha256Security!";
        var issuer = _configuration["Jwt:Issuer"] ?? "ToyotaWizardApi";
        var audience = _configuration["Jwt:Audience"] ?? "ToyotaWizardClients";

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

        try
        {
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = true,
                ValidIssuer = issuer,
                ValidateAudience = true,
                ValidAudience = audience,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromMinutes(5)
            }, out _);

            return true;
        }
        catch
        {
            return false;
        }
    }
}
