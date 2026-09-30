using System.Text.Json.Serialization;

namespace ToyotaWizard.Api.Models.DTOs;

public class QuestionOptionDto
{
    [JsonPropertyName("t")]
    public string T { get; set; } = string.Empty;

    [JsonPropertyName("d")]
    public string D { get; set; } = string.Empty;

    [JsonPropertyName("tags")]
    public List<string> Tags { get; set; } = new();
}

public class QuestionDto
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("order")]
    public int Order { get; set; }

    [JsonPropertyName("categoryType")]
    public string CategoryType { get; set; } = "all";

    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("sub")]
    public string Sub { get; set; } = string.Empty;

    [JsonPropertyName("select")]
    public string Select { get; set; } = "single";

    [JsonPropertyName("max")]
    public int Max { get; set; } = 1;

    [JsonPropertyName("opts")]
    public List<QuestionOptionDto> Opts { get; set; } = new();
}

public class CategoryDto
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("color")]
    public string Color { get; set; } = string.Empty;

    [JsonPropertyName("icon")]
    public string Icon { get; set; } = string.Empty;

    [JsonPropertyName("vehicleType")]
    public string VehicleType { get; set; } = "binek";

    [JsonPropertyName("radio")]
    public bool Radio { get; set; }

    [JsonPropertyName("hasTow")]
    public bool HasTow { get; set; }

    [JsonPropertyName("noOpts")]
    public bool NoOpts { get; set; }

    [JsonPropertyName("exclusivePair")]
    public List<string> ExclusivePair { get; set; } = new();

    [JsonPropertyName("options")]
    public List<string> Options { get; set; } = new();
}

public class FlowResponseDto
{
    [JsonPropertyName("success")]
    public bool Success { get; set; } = true;

    [JsonPropertyName("questions")]
    public List<QuestionDto> Questions { get; set; } = new();

    [JsonPropertyName("categories")]
    public List<CategoryDto> Categories { get; set; } = new();
}

public class MatchRequestDto
{
    [JsonPropertyName("category")]
    public string Category { get; set; } = "Binek Araç";

    [JsonPropertyName("businessType")]
    public string? BusinessType { get; set; }

    [JsonPropertyName("answers")]
    public object? Answers { get; set; }

    [JsonPropertyName("selections")]
    public object? Selections { get; set; }
}

public class ScoreBreakdownDto
{
    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    [JsonPropertyName("points")]
    public int Points { get; set; }

    [JsonPropertyName("badge")]
    public string? Badge { get; set; }

    [JsonPropertyName("type")]
    public string Type { get; set; } = "rule";
}

public class MatchItemDto
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("fullName")]
    public string FullName { get; set; } = string.Empty;

    [JsonPropertyName("type")]
    public string Type { get; set; } = string.Empty;

    [JsonPropertyName("bodyType")]
    public string? BodyType { get; set; }

    [JsonPropertyName("powertrain")]
    public string? Powertrain { get; set; }

    [JsonPropertyName("seats")]
    public int Seats { get; set; } = 5;

    [JsonPropertyName("tagline")]
    public string? Tagline { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("imageUrl")]
    public string? ImageUrl { get; set; }

    [JsonPropertyName("cardb_image")]
    public string? CardbImage { get; set; }

    [JsonPropertyName("fallbackImageUrl")]
    public string? FallbackImageUrl { get; set; }

    [JsonPropertyName("url")]
    public string? Url { get; set; }

    [JsonPropertyName("toyota_url")]
    public string? ToyotaUrl { get; set; }

    [JsonPropertyName("startingPrice")]
    public string? StartingPrice { get; set; }

    [JsonPropertyName("starting_price")]
    public long StartingPriceNum { get; set; }

    [JsonPropertyName("score")]
    public int Score { get; set; }

    [JsonPropertyName("matchPercentage")]
    public int MatchPercentage { get; set; }

    [JsonPropertyName("matchPercent")]
    public int MatchPercent { get; set; }

    [JsonPropertyName("breakdown")]
    public List<ScoreBreakdownDto> Breakdown { get; set; } = new();

    [JsonPropertyName("reasons")]
    public List<string> Reasons { get; set; } = new();

    [JsonPropertyName("supported_tags")]
    public List<string> SupportedTags { get; set; } = new();
}

public class MatchResponseDto
{
    [JsonPropertyName("success")]
    public bool Success { get; set; } = true;

    [JsonPropertyName("matches")]
    public List<MatchItemDto> Matches { get; set; } = new();
}
