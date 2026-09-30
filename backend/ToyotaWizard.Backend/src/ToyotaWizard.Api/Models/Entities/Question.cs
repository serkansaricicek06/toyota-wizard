namespace ToyotaWizard.Api.Models.Entities;

public class Question
{
    public string Id { get; set; } = string.Empty;
    public int OrderNum { get; set; }
    public string CategoryType { get; set; } = "all"; // "all" | "Binek Araç" | "Ticari Araç"
    public string Title { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public string SelectType { get; set; } = "single"; // "single" | "multi"
    public int MaxSelect { get; set; } = 1;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public List<QuestionOption> Options { get; set; } = new();
}

public class QuestionOption
{
    public int Id { get; set; }
    public string QuestionId { get; set; } = string.Empty;
    public int OrderNum { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string TagsJson { get; set; } = "[]";

    [System.Text.Json.Serialization.JsonIgnore]
    public Question? Question { get; set; }
}
