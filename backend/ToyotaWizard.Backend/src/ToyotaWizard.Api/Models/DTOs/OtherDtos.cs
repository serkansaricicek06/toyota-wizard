using System.Text.Json.Serialization;

namespace ToyotaWizard.Api.Models.DTOs;

public class LeadRequestDto
{
    [JsonPropertyName("fullName")]
    public string FullName { get; set; } = string.Empty;

    [JsonPropertyName("phone")]
    public string Phone { get; set; } = string.Empty;

    [JsonPropertyName("email")]
    public string? Email { get; set; }

    [JsonPropertyName("city")]
    public string? City { get; set; }

    [JsonPropertyName("matchedModel")]
    public string? MatchedModel { get; set; }

    [JsonPropertyName("preferredModel")]
    public string? PreferredModel { get; set; }

    [JsonPropertyName("selections")]
    public object? Selections { get; set; }

    [JsonPropertyName("selectionsSummary")]
    public object? SelectionsSummary { get; set; }

    [JsonPropertyName("sessionId")]
    public string? SessionId { get; set; }

    [JsonPropertyName("notes")]
    public string? Notes { get; set; }
}

public class TrackMetricDto
{
    [JsonPropertyName("sessionId")]
    public string SessionId { get; set; } = string.Empty;

    [JsonPropertyName("deviceType")]
    public string DeviceType { get; set; } = "desktop";

    [JsonPropertyName("stepId")]
    public string StepId { get; set; } = string.Empty;

    [JsonPropertyName("stepName")]
    public string StepName { get; set; } = string.Empty;

    [JsonPropertyName("stepIndex")]
    public int StepIndex { get; set; }

    [JsonPropertyName("timeOnStepSeconds")]
    public int TimeOnStepSeconds { get; set; }

    [JsonPropertyName("totalElapsedSeconds")]
    public int TotalElapsedSeconds { get; set; }

    [JsonPropertyName("reachedResult")]
    public bool ReachedResult { get; set; }

    [JsonPropertyName("matchedVehicle")]
    public string? MatchedVehicle { get; set; }

    [JsonPropertyName("isExit")]
    public bool IsExit { get; set; }
}

public class LoginRequestDto
{
    [JsonPropertyName("username")]
    public string Username { get; set; } = string.Empty;

    [JsonPropertyName("password")]
    public string Password { get; set; } = string.Empty;
}

public class LoginResponseDto
{
    [JsonPropertyName("success")]
    public bool Success { get; set; }

    [JsonPropertyName("token")]
    public string Token { get; set; } = string.Empty;

    [JsonPropertyName("username")]
    public string Username { get; set; } = string.Empty;

    [JsonPropertyName("role")]
    public string Role { get; set; } = string.Empty;

    [JsonPropertyName("error")]
    public string? Error { get; set; }
}

public class AdminStatsDto
{
    [JsonPropertyName("totalVisits")]
    public int TotalVisits { get; set; }

    [JsonPropertyName("totalCompletions")]
    public int TotalCompletions { get; set; }

    [JsonPropertyName("completionRate")]
    public double CompletionRate { get; set; }

    [JsonPropertyName("totalLeads")]
    public int TotalLeads { get; set; }

    [JsonPropertyName("activeRulesCount")]
    public int ActiveRulesCount { get; set; }

    [JsonPropertyName("topVehicles")]
    public List<TopVehicleDto> TopVehicles { get; set; } = new();

    [JsonPropertyName("devices")]
    public List<DeviceBreakdownDto> Devices { get; set; } = new();
}

public class TopVehicleDto
{
    [JsonPropertyName("vehicle")]
    public string Vehicle { get; set; } = string.Empty;

    [JsonPropertyName("count")]
    public int Count { get; set; }

    [JsonPropertyName("percentage")]
    public double Percentage { get; set; }
}

public class DeviceBreakdownDto
{
    [JsonPropertyName("device")]
    public string Device { get; set; } = string.Empty;

    [JsonPropertyName("count")]
    public int Count { get; set; }

    [JsonPropertyName("percentage")]
    public double Percentage { get; set; }
}

public class SettingUpdateDto
{
    [JsonPropertyName("key")]
    public string Key { get; set; } = string.Empty;

    [JsonPropertyName("value")]
    public string Value { get; set; } = string.Empty;
}

public class QuestionOptionInputDto
{
    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public string? Description { get; set; }
}

public class QuestionVehicleAssociationDto
{
    [JsonPropertyName("option_title")]
    public string? OptionTitle { get; set; }

    [JsonPropertyName("vehicle_id")]
    public string VehicleId { get; set; } = string.Empty;

    [JsonPropertyName("weight")]
    public int Weight { get; set; } = 25;

    [JsonPropertyName("badge")]
    public string? Badge { get; set; }
}

public class QuestionWithRulesDto
{
    [JsonPropertyName("category_type")]
    public string CategoryType { get; set; } = "all";

    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("subtitle")]
    public string? Subtitle { get; set; }

    [JsonPropertyName("select_type")]
    public string SelectType { get; set; } = "single";

    [JsonPropertyName("order_num")]
    public int OrderNum { get; set; }

    [JsonPropertyName("options")]
    public List<QuestionOptionInputDto> Options { get; set; } = new();

    [JsonPropertyName("vehicle_associations")]
    public List<QuestionVehicleAssociationDto> VehicleAssociations { get; set; } = new();
}

public class CategoryVehicleAssociationDto
{
    [JsonPropertyName("vehicle_id")]
    public string VehicleId { get; set; } = string.Empty;

    [JsonPropertyName("weight")]
    public int Weight { get; set; } = 25;

    [JsonPropertyName("badge")]
    public string? Badge { get; set; }

    [JsonPropertyName("label")]
    public string? Label { get; set; }
}

public class CategoryWithRulesDto
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("color")]
    public string? Color { get; set; }

    [JsonPropertyName("icon")]
    public string? Icon { get; set; }

    [JsonPropertyName("vehicle_type")]
    public string VehicleType { get; set; } = "Binek";

    [JsonPropertyName("options")]
    public List<string> Options { get; set; } = new();

    [JsonPropertyName("vehicle_associations")]
    public List<CategoryVehicleAssociationDto> VehicleAssociations { get; set; } = new();
}

public class RuleCellUpdateDto
{
    [JsonPropertyName("source_type")]
    public string SourceType { get; set; } = "question";

    [JsonPropertyName("source_id")]
    public string SourceId { get; set; } = string.Empty;

    [JsonPropertyName("source_label")]
    public string? SourceLabel { get; set; }

    [JsonPropertyName("vehicle_id")]
    public string VehicleId { get; set; } = string.Empty;

    [JsonPropertyName("score")]
    public int Score { get; set; }

    [JsonPropertyName("reason_badge")]
    public string? ReasonBadge { get; set; }
}

public class CreateUserDto
{
    [JsonPropertyName("username")]
    public string Username { get; set; } = string.Empty;

    [JsonPropertyName("password")]
    public string Password { get; set; } = string.Empty;

    [JsonPropertyName("full_name")]
    public string? FullName { get; set; }

    [JsonPropertyName("role")]
    public string Role { get; set; } = "editor";
}

public class UpdateUserDto
{
    [JsonPropertyName("full_name")]
    public string? FullName { get; set; }

    [JsonPropertyName("role")]
    public string? Role { get; set; }

    [JsonPropertyName("is_active")]
    public bool? IsActive { get; set; }

    [JsonPropertyName("newPassword")]
    public string? NewPassword { get; set; }
}

public class ChangePasswordDto
{
    [JsonPropertyName("currentPassword")]
    public string CurrentPassword { get; set; } = string.Empty;

    [JsonPropertyName("newPassword")]
    public string NewPassword { get; set; } = string.Empty;
}

public class UploadAssetDto
{
    [JsonPropertyName("dataUrl")]
    public string DataUrl { get; set; } = string.Empty;

    [JsonPropertyName("filename")]
    public string Filename { get; set; } = string.Empty;

    [JsonPropertyName("type")]
    public string? Type { get; set; }
}

