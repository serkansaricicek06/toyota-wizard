namespace ToyotaWizard.Api.Models.Entities;

public class Vehicle
{
    public string Id { get; set; } = string.Empty;
    public string? ModelCode { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = "binek"; // "binek" | "commercial" | "binek-ticari"
    public string? Segment { get; set; }
    public long StartingPrice { get; set; }
    public string? Powertrain { get; set; }
    public string? CardbToken { get; set; }
    public string? CardbImage { get; set; }
    public string? ToyotaUrl { get; set; }
    public string SpecsJson { get; set; } = "{}";
    public string SupportedTagsJson { get; set; } = "[]";
    public string? Tagline { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class MatchingRule
{
    public int Id { get; set; }
    public string SourceType { get; set; } = "question"; // "question" | "category"
    public string SourceId { get; set; } = string.Empty;
    public string SourceLabel { get; set; } = string.Empty;
    public string VehicleId { get; set; } = string.Empty;
    public int Weight { get; set; } = 10;
    [System.ComponentModel.DataAnnotations.Schema.NotMapped]
    public int Score { get => Weight; set => Weight = value; }
    public string? ReasonBadge { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class AnalyticsSession
{
    public string SessionId { get; set; } = string.Empty;
    public string DeviceType { get; set; } = "desktop";
    public string LastStep { get; set; } = "intro";
    public string LastStepName { get; set; } = "Giriş Sayfası";
    public bool ReachedResult { get; set; }
    public bool CompletedLead { get; set; }
    public int TotalDurationSeconds { get; set; }
    public string MatchedVehicle { get; set; } = string.Empty;
    public DateTime StartedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class AnalyticsEvent
{
    public int Id { get; set; }
    public string SessionId { get; set; } = string.Empty;
    public string StepId { get; set; } = string.Empty;
    public string StepName { get; set; } = string.Empty;
    public int StepIndex { get; set; }
    public int TimeOnStepSeconds { get; set; }
    public int TotalElapsedSeconds { get; set; }
    public bool IsExit { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
