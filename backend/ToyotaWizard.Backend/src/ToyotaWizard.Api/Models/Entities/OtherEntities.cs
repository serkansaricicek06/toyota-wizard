namespace ToyotaWizard.Api.Models.Entities;

public class Lead
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? City { get; set; }
    public string? PreferredModel { get; set; }
    public string? SelectionsSummaryJson { get; set; }
    public string? Notes { get; set; }
    public string Status { get; set; } = "new"; // "new" | "contacted" | "completed" | "cancelled"
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class WizardMetric
{
    public int Id { get; set; }
    public string SessionId { get; set; } = string.Empty;
    public string DeviceType { get; set; } = "desktop"; // "desktop" | "mobile"
    public string StepId { get; set; } = string.Empty;
    public string StepName { get; set; } = string.Empty;
    public int StepIndex { get; set; }
    public int TimeOnStepSeconds { get; set; }
    public int TotalElapsedSeconds { get; set; }
    public bool ReachedResult { get; set; }
    public string? MatchedVehicle { get; set; }
    public bool IsExit { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class SiteSetting
{
    public string Key { get; set; } = string.Empty; // Primary Key
    public string Value { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class AdminUser
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "admin";
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
