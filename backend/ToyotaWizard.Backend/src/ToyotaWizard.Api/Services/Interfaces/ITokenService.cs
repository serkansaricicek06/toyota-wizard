using ToyotaWizard.Api.Models.Entities;

namespace ToyotaWizard.Api.Services.Interfaces;

public interface ITokenService
{
    string GenerateToken(AdminUser user);
    bool ValidateToken(string token);
}
