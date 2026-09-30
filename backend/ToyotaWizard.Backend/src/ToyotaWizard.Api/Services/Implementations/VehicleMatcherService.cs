using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using ToyotaWizard.Api.Data;
using ToyotaWizard.Api.Models.DTOs;
using ToyotaWizard.Api.Models.Entities;
using ToyotaWizard.Api.Services.Interfaces;

namespace ToyotaWizard.Api.Services.Implementations;

public class VehicleMatcherService : IVehicleMatcherService
{
    private readonly ToyotaDbContext _context;

    public VehicleMatcherService(ToyotaDbContext context)
    {
        _context = context;
    }

    public async Task<List<MatchItemDto>> CalculateMatchesAsync(MatchRequestDto request)
    {
        var category = request.Category ?? "Binek Araç";
        var businessType = request.BusinessType ?? string.Empty;

        // 1. Fetch active vehicles and rules from database
        var rawVehicles = await _context.Vehicles.Where(v => v.IsActive).ToListAsync();
        var rules = await _context.MatchingRules.ToListAsync();

        // 2. Normalize user criteria
        var userCriteria = new List<string>();

        // Parse answers
        if (request.Answers != null)
        {
            if (request.Answers is JsonElement jsonElem)
            {
                if (jsonElem.ValueKind == JsonValueKind.Array)
                {
                    foreach (var item in jsonElem.EnumerateArray())
                    {
                        var str = item.GetString();
                        if (!string.IsNullOrWhiteSpace(str)) userCriteria.Add(str);
                    }
                }
                else if (jsonElem.ValueKind == JsonValueKind.Object)
                {
                    foreach (var prop in jsonElem.EnumerateObject())
                    {
                        if (prop.Value.ValueKind == JsonValueKind.Array)
                        {
                            foreach (var item in prop.Value.EnumerateArray())
                            {
                                var str = item.GetString();
                                if (!string.IsNullOrWhiteSpace(str)) userCriteria.Add(str);
                            }
                        }
                        else
                        {
                            var str = prop.Value.GetString();
                            if (!string.IsNullOrWhiteSpace(str)) userCriteria.Add(str);
                        }
                    }
                }
            }
            else if (request.Answers is IEnumerable<string> strList)
            {
                userCriteria.AddRange(strList.Where(s => !string.IsNullOrWhiteSpace(s)));
            }
        }

        // Parse selections
        var selectedOptions = new List<string>();
        if (request.Selections != null)
        {
            if (request.Selections is JsonElement selElem)
            {
                if (selElem.ValueKind == JsonValueKind.Array)
                {
                    foreach (var sub in selElem.EnumerateArray())
                    {
                        var s = sub.GetString();
                        if (!string.IsNullOrWhiteSpace(s))
                        {
                            selectedOptions.Add(s);
                            userCriteria.Add(s);
                        }
                    }
                }
                else if (selElem.ValueKind == JsonValueKind.Object)
                {
                    foreach (var prop in selElem.EnumerateObject())
                    {
                        if (prop.Value.ValueKind == JsonValueKind.Array)
                        {
                            foreach (var sub in prop.Value.EnumerateArray())
                            {
                                var s = sub.GetString();
                                if (!string.IsNullOrWhiteSpace(s))
                                {
                                    selectedOptions.Add(s);
                                    userCriteria.Add(s);
                                }
                            }
                        }
                        else if (prop.Value.ValueKind == JsonValueKind.String)
                        {
                            var s = prop.Value.GetString();
                            if (!string.IsNullOrWhiteSpace(s))
                            {
                                selectedOptions.Add(s);
                                userCriteria.Add(s);
                            }
                        }
                    }
                }
            }
            else if (request.Selections is IEnumerable<string> optList)
            {
                foreach (var s in optList)
                {
                    if (!string.IsNullOrWhiteSpace(s))
                    {
                        selectedOptions.Add(s);
                        userCriteria.Add(s);
                    }
                }
            }
        }

        // 3. Evaluate each vehicle
        var scoredList = new List<(Vehicle Vehicle, int Score, List<ScoreBreakdownDto> Breakdown, List<string> Reasons)>();

        foreach (var vehicle in rawVehicles)
        {
            // Strict category isolation
            if (category == "Binek Araç")
            {
                var isPassenger = vehicle.Type == "binek" || vehicle.Type == "binek-ticari";
                if (!isPassenger) continue;
            }
            else if (category == "Ticari Araç")
            {
                var isCommercial = vehicle.Type == "ticari" || vehicle.Type == "commercial" || vehicle.Type == "binek-ticari";
                if (!isCommercial) continue;
            }

            int score = 50; // base score
            var breakdown = new List<ScoreBreakdownDto>
            {
                new() { Label = "Taban Uyum Puanı", Points = 50, Type = "base" }
            };
            var reasons = new List<string>();

            // Apply dynamic matching rules from database
            foreach (var rule in rules)
            {
                if (AreVehicleIdsEqual(rule.VehicleId, vehicle.Id))
                {
                    bool isMatched = userCriteria.Any(c =>
                        string.Equals(c, rule.SourceLabel, StringComparison.OrdinalIgnoreCase) ||
                        rule.SourceId.Contains(c, StringComparison.OrdinalIgnoreCase) ||
                        c.Contains(rule.SourceLabel, StringComparison.OrdinalIgnoreCase)
                    );

                    if (isMatched)
                    {
                        score += rule.Weight;
                        breakdown.Add(new ScoreBreakdownDto
                        {
                            Label = rule.SourceLabel,
                            Points = rule.Weight,
                            Badge = rule.ReasonBadge,
                            Type = rule.SourceType
                        });

                        if (!string.IsNullOrEmpty(rule.ReasonBadge) && !reasons.Contains(rule.ReasonBadge))
                        {
                            reasons.Add(rule.ReasonBadge);
                        }
                    }
                }
            }

            // Tag matching bonus
            List<string> supportedTags = new();
            try
            {
                supportedTags = JsonSerializer.Deserialize<List<string>>(vehicle.SupportedTagsJson) ?? new();
            }
            catch { }

            foreach (var opt in selectedOptions)
            {
                var match = supportedTags.FirstOrDefault(tag =>
                    string.Equals(tag, opt, StringComparison.OrdinalIgnoreCase) ||
                    opt.Contains(tag, StringComparison.OrdinalIgnoreCase) ||
                    tag.Contains(opt, StringComparison.OrdinalIgnoreCase)
                );

                if (match != null)
                {
                    score += 8;
                    breakdown.Add(new ScoreBreakdownDto
                    {
                        Label = $"Donanım Uyum: {opt}",
                        Points = 8,
                        Type = "tag"
                    });
                    if (!reasons.Contains(opt))
                    {
                        reasons.Add(opt);
                    }
                }
            }

            // Commercial business type specific handling
            if (category == "Ticari Araç")
            {
                if (businessType == "Yolcu Taşımacılığı" || userCriteria.Any(c => c.Contains("Yolcu", StringComparison.OrdinalIgnoreCase)))
                {
                    if (AreVehicleIdsEqual(vehicle.Id, "proace-verso") || AreVehicleIdsEqual(vehicle.Id, "proace-city-verso") || AreVehicleIdsEqual(vehicle.Id, "proace-city"))
                    {
                        score += 45;
                        breakdown.Add(new ScoreBreakdownDto
                        {
                            Label = "Yolcu Taşımacılığı Uyumu",
                            Points = 45,
                            Type = "business"
                        });
                        if (!reasons.Contains("Yolcu Taşıma Uyumu")) reasons.Add("Yolcu Taşıma Uyumu");
                    }
                }
                else if (businessType == "Dağıtım" || userCriteria.Any(c => c.Contains("Dağıtım", StringComparison.OrdinalIgnoreCase) || c.Contains("Servis", StringComparison.OrdinalIgnoreCase) || c.Contains("Sanayi", StringComparison.OrdinalIgnoreCase)))
                {
                    if (AreVehicleIdsEqual(vehicle.Id, "proace-city") || AreVehicleIdsEqual(vehicle.Id, "proace") || AreVehicleIdsEqual(vehicle.Id, "proace-cargo"))
                    {
                        score += 40;
                        breakdown.Add(new ScoreBreakdownDto
                        {
                            Label = "Yük & Kargo Taşımacılığı Uyumu",
                            Points = 40,
                            Type = "business"
                        });
                        if (!reasons.Contains("Kargo & Yük Uyumu")) reasons.Add("Kargo & Yük Uyumu");
                    }
                }
            }

            scoredList.Add((vehicle, score, breakdown, reasons));
        }

        // Sort descending
        var valid = scoredList.Where(s => s.Score > 0).OrderByDescending(s => s.Score).ToList();

        if (valid.Count == 0)
        {
            var fallbackCandidate = rawVehicles.FirstOrDefault(v => category == "Ticari Araç"
                ? (v.Type == "commercial" || v.Type == "binek-ticari")
                : (v.Type == "binek" || v.Type == "binek-ticari")) ?? rawVehicles.First();

            return new List<MatchItemDto>
            {
                MapToDto(fallbackCandidate, 50, 90, new List<ScoreBreakdownDto> { new() { Label = "Varsayılan Uyum", Points = 50, Type = "base" } }, new List<string> { "En Çok Tercih Edilen Model", "Toyota Güvenlik Donanımı" })
            };
        }

        int maxPossible = Math.Max(valid[0].Score, 90);
        int topScore = valid[0].Score;

        var result = new List<MatchItemDto>();
        for (int i = 0; i < valid.Count; i++)
        {
            var item = valid[i];
            int p;
            if (i == 0)
            {
                p = Math.Min(99, Math.Max(88, (int)Math.Round((double)item.Score / maxPossible * 98)));
            }
            else
            {
                double ratio = topScore > 0 ? ((double)item.Score / topScore) : 0.8;
                p = Math.Min(94, Math.Max(55, (int)Math.Round(ratio * 90)));
            }

            var finalReasons = item.Reasons.Count > 0
                ? item.Reasons.Take(4).ToList()
                : new List<string> { "Tüm İhtiyaçlarınıza Dengeli Uyum", "Toyota Güvenlik Paketi", "Yüksek İkinci El Değeri" };

            result.Add(MapToDto(item.Vehicle, item.Score, p, item.Breakdown, finalReasons));
        }

        return result;
    }

    private static bool AreVehicleIdsEqual(string? id1, string? id2)
    {
        if (string.IsNullOrEmpty(id1) || string.IsNullOrEmpty(id2)) return false;
        if (string.Equals(id1, id2, StringComparison.OrdinalIgnoreCase)) return true;

        string norm1 = id1.ToLowerInvariant().Replace("-", "").Replace("_", "").Replace(" ", "");
        string norm2 = id2.ToLowerInvariant().Replace("-", "").Replace("_", "").Replace(" ", "");

        if (norm1 == norm2) return true;
        if ((norm1 == "corolla" && norm2 == "corollasedan") || (norm2 == "corolla" && norm1 == "corollasedan")) return true;
        if ((norm1 == "proace" && norm2 == "proacecargo") || (norm2 == "proace" && norm1 == "proacecargo")) return true;

        return false;
    }

    private static MatchItemDto MapToDto(Vehicle vehicle, int score, int percentage, List<ScoreBreakdownDto> breakdown, List<string> reasons)
    {
        string bodyType = "Binek";
        int seats = 5;
        string tagline = "";
        string description = "";

        try
        {
            using var doc = JsonDocument.Parse(vehicle.SpecsJson);
            var root = doc.RootElement;
            if (root.TryGetProperty("bodyType", out var bt)) bodyType = bt.GetString() ?? "Binek";
            if (root.TryGetProperty("seats", out var st)) seats = st.GetInt32();
            if (root.TryGetProperty("tagline", out var tl)) tagline = tl.GetString() ?? "";
            if (root.TryGetProperty("description", out var ds)) description = ds.GetString() ?? "";
        }
        catch { }

        List<string> tags = new();
        try
        {
            tags = JsonSerializer.Deserialize<List<string>>(vehicle.SupportedTagsJson) ?? new();
        }
        catch { }

        return new MatchItemDto
        {
            Id = vehicle.Id,
            Name = vehicle.Name,
            FullName = vehicle.Name,
            Type = vehicle.Type,
            BodyType = bodyType,
            Powertrain = vehicle.Powertrain,
            Seats = seats,
            Tagline = tagline,
            Description = description,
            ImageUrl = vehicle.CardbImage,
            CardbImage = vehicle.CardbImage,
            FallbackImageUrl = vehicle.CardbImage,
            Url = vehicle.ToyotaUrl,
            ToyotaUrl = vehicle.ToyotaUrl,
            StartingPrice = vehicle.StartingPrice > 0 ? $"{vehicle.StartingPrice:N0} TL" : "Toyota Yetkili Satıcılarında",
            StartingPriceNum = vehicle.StartingPrice,
            Score = score,
            MatchPercentage = percentage,
            MatchPercent = percentage,
            Breakdown = breakdown,
            Reasons = reasons,
            SupportedTags = tags
        };
    }
}
