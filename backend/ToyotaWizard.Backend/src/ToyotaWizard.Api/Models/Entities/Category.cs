namespace ToyotaWizard.Api.Models.Entities;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Color { get; set; } = "#5B8DBF";
    public string Icon { get; set; } = "★";
    public string VehicleType { get; set; } = "binek"; // "binek" | "commercial"
    public bool IsRadio { get; set; } = false;
    public bool HasTow { get; set; } = false;
    public bool NoOpts { get; set; } = false;
    public string ExclusivePairJson { get; set; } = "[]";
    public string OptionsJson { get; set; } = "[]";
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class VehicleRule
{
    public int Id { get; set; }
    public string SourceId { get; set; } = string.Empty; // question option title or category option
    public string TargetVehicleId { get; set; } = string.Empty; // e.g. "corolla_cross", "proace_city"
    public int Weight { get; set; } = 25; // default bonus points
    public string RuleType { get; set; } = "question"; // "question" | "category"
    public string BadgeText { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
