using ToyotaWizard.Api.Models.DTOs;
using ToyotaWizard.Api.Models.Entities;

namespace ToyotaWizard.Api.Services.Interfaces;

public interface IWizardService
{
    Task<FlowResponseDto> GetFlowAsync(string? category);
    Task<int> SaveLeadAsync(LeadRequestDto request);
    Task TrackAnalyticsAsync(TrackMetricDto request);
    Task<Dictionary<string, string>> GetSiteSettingsAsync();
    Task<List<Vehicle>> GetActiveVehiclesAsync();
}
