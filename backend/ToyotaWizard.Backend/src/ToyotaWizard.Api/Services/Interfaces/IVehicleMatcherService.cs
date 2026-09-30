using ToyotaWizard.Api.Models.DTOs;

namespace ToyotaWizard.Api.Services.Interfaces;

public interface IVehicleMatcherService
{
    Task<List<MatchItemDto>> CalculateMatchesAsync(MatchRequestDto request);
}
