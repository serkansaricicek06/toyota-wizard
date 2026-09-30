using Microsoft.AspNetCore.Mvc;
using ToyotaWizard.Api.Models.DTOs;
using ToyotaWizard.Api.Services.Interfaces;

namespace ToyotaWizard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WizardController : ControllerBase
{
    private readonly IWizardService _wizardService;
    private readonly IVehicleMatcherService _matcherService;
    private readonly ILogger<WizardController> _logger;

    public WizardController(
        IWizardService wizardService,
        IVehicleMatcherService matcherService,
        ILogger<WizardController> logger)
    {
        _wizardService = wizardService;
        _matcherService = matcherService;
        _logger = logger;
    }

    [HttpGet("flow")]
    public async Task<IActionResult> GetFlow([FromQuery] string? category)
    {
        try
        {
            var flow = await _wizardService.GetFlowAsync(category);
            return Ok(flow);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while loading wizard flow.");
            return StatusCode(500, new { error = "Soru akışı yüklenirken bir hata oluştu." });
        }
    }

    [HttpPost("match")]
    public async Task<IActionResult> Match([FromBody] MatchRequestDto request)
    {
        try
        {
            var matches = await _matcherService.CalculateMatchesAsync(request);
            return Ok(new MatchResponseDto
            {
                Success = true,
                Matches = matches
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while calculating matches.");
            return StatusCode(500, new { error = "Eşleştirme hesaplanırken bir hata oluştu." });
        }
    }

    [HttpPost("lead")]
    public async Task<IActionResult> SubmitLead([FromBody] LeadRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.FullName) || string.IsNullOrWhiteSpace(request.Phone))
        {
            return BadRequest(new { error = "Lütfen ad soyad ve telefon numaranızı eksiksiz girin." });
        }

        try
        {
            var leadId = await _wizardService.SaveLeadAsync(request);
            return StatusCode(201, new
            {
                success = true,
                message = "Talebiniz başarıyla alındı. Uzman temsilcimiz en kısa sürede sizinle iletişime geçecektir.",
                leadId
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while saving lead.");
            return StatusCode(500, new { error = "Talep kaydedilirken bir hata oluştu." });
        }
    }

    [HttpPost("track")]
    public async Task<IActionResult> Track([FromBody] TrackMetricDto request)
    {
        if (string.IsNullOrWhiteSpace(request.SessionId))
        {
            return BadRequest(new { error = "sessionId zorunludur." });
        }

        try
        {
            await _wizardService.TrackAnalyticsAsync(request);
            return Ok(new { success = true });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while tracking analytics.");
            return StatusCode(500, new { error = "İzleme kaydedilemedi." });
        }
    }

    [HttpGet("vehicles")]
    public async Task<IActionResult> GetVehicles()
    {
        try
        {
            var vehicles = await _wizardService.GetActiveVehiclesAsync();
            return Ok(new { success = true, vehicles });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while fetching vehicles.");
            return StatusCode(500, new { error = "Araç listesi yüklenemedi." });
        }
    }

    [HttpGet("settings")]
    public async Task<IActionResult> GetSettings()
    {
        try
        {
            var settings = await _wizardService.GetSiteSettingsAsync();
            return Ok(new { success = true, settings });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while fetching settings.");
            return StatusCode(500, new { error = "Site ayarları yüklenemedi." });
        }
    }
}
