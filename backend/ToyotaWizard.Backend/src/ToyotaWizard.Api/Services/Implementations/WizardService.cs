using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using ToyotaWizard.Api.Data;
using ToyotaWizard.Api.Models.DTOs;
using ToyotaWizard.Api.Models.Entities;
using ToyotaWizard.Api.Services.Interfaces;

namespace ToyotaWizard.Api.Services.Implementations;

public class WizardService : IWizardService
{
    private readonly ToyotaDbContext _context;

    public WizardService(ToyotaDbContext context)
    {
        _context = context;
    }

    public async Task<FlowResponseDto> GetFlowAsync(string? category)
    {
        var selectedCategory = category ?? "all";

        // 1. Fetch questions based on category filter
        IQueryable<Question> query = _context.Questions.Include(q => q.Options).Where(q => q.IsActive);

        if (selectedCategory == "Binek Araç")
        {
            query = query.Where(q => q.CategoryType == "all" || q.CategoryType == "Binek Araç");
        }
        else if (selectedCategory == "Ticari Araç")
        {
            query = query.Where(q => q.CategoryType == "all" || q.CategoryType == "Ticari Araç");
        }

        var questionsList = await query.OrderBy(q => q.OrderNum).ToListAsync();

        var questionDtos = questionsList.Select(q => new QuestionDto
        {
            Id = q.Id,
            Order = q.OrderNum,
            CategoryType = q.CategoryType,
            Title = q.Title,
            Sub = q.Subtitle ?? string.Empty,
            Select = q.SelectType,
            Max = q.MaxSelect,
            Opts = q.Options.OrderBy(o => o.OrderNum).Select(o =>
            {
                List<string> tags = new();
                try
                {
                    tags = JsonSerializer.Deserialize<List<string>>(o.TagsJson) ?? new();
                }
                catch { }

                return new QuestionOptionDto
                {
                    T = o.Title,
                    D = o.Description ?? string.Empty,
                    Tags = tags
                };
            }).ToList()
        }).ToList();

        // 2. Fetch categories (bubbles) based on vehicle type
        IQueryable<Category> catQuery = _context.Categories.Where(c => c.IsActive);

        if (selectedCategory == "Binek Araç")
        {
            catQuery = catQuery.Where(c => c.VehicleType == "binek");
        }
        else if (selectedCategory == "Ticari Araç")
        {
            catQuery = catQuery.Where(c => c.VehicleType == "commercial");
        }

        var categoriesList = await catQuery.OrderBy(c => c.Id).ToListAsync();

        var categoryDtos = categoriesList.Select(c =>
        {
            List<string> options = new();
            List<string> exclusivePair = new();
            try
            {
                options = JsonSerializer.Deserialize<List<string>>(c.OptionsJson) ?? new();
            }
            catch { }
            try
            {
                exclusivePair = JsonSerializer.Deserialize<List<string>>(c.ExclusivePairJson) ?? new();
            }
            catch { }

            return new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                Color = c.Color,
                Icon = c.Icon,
                VehicleType = c.VehicleType,
                Radio = c.IsRadio,
                HasTow = c.HasTow,
                NoOpts = c.NoOpts,
                ExclusivePair = exclusivePair,
                Options = options
            };
        }).ToList();

        return new FlowResponseDto
        {
            Success = true,
            Questions = questionDtos,
            Categories = categoryDtos
        };
    }

    public async Task<int> SaveLeadAsync(LeadRequestDto request)
    {
        var modelName = request.MatchedModel ?? request.PreferredModel ?? string.Empty;
        var selectionsJson = "{}";

        if (request.Selections != null)
        {
            selectionsJson = JsonSerializer.Serialize(request.Selections);
        }
        else if (request.SelectionsSummary != null)
        {
            selectionsJson = JsonSerializer.Serialize(request.SelectionsSummary);
        }

        var lead = new Lead
        {
            FullName = request.FullName?.Trim() ?? string.Empty,
            Phone = request.Phone?.Trim() ?? string.Empty,
            City = request.City?.Trim(),
            Email = request.Email?.Trim(),
            PreferredModel = modelName.Trim(),
            SelectionsSummaryJson = selectionsJson,
            Notes = request.Notes?.Trim(),
            Status = "Yeni",
            CreatedAt = DateTime.UtcNow
        };

        _context.Leads.Add(lead);

        if (!string.IsNullOrWhiteSpace(request.SessionId))
        {
            var session = await _context.AnalyticsSessions.FirstOrDefaultAsync(s => s.SessionId == request.SessionId);
            if (session != null)
            {
                session.CompletedLead = true;
                session.UpdatedAt = DateTime.UtcNow;
            }
        }

        await _context.SaveChangesAsync();
        return lead.Id;
    }

    public async Task TrackAnalyticsAsync(TrackMetricDto request)
    {
        if (string.IsNullOrWhiteSpace(request.SessionId)) return;

        // Upsert session
        var session = await _context.AnalyticsSessions.FirstOrDefaultAsync(s => s.SessionId == request.SessionId);
        if (session == null)
        {
            session = new AnalyticsSession
            {
                SessionId = request.SessionId,
                DeviceType = request.DeviceType ?? "desktop",
                LastStep = request.StepId ?? "intro",
                LastStepName = request.StepName ?? "Giriş Sayfası",
                ReachedResult = request.ReachedResult || request.StepId == "result",
                TotalDurationSeconds = Math.Max(0, request.TotalElapsedSeconds),
                MatchedVehicle = request.MatchedVehicle ?? string.Empty,
                StartedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            _context.AnalyticsSessions.Add(session);
        }
        else
        {
            session.DeviceType = request.DeviceType ?? session.DeviceType;
            session.LastStep = request.StepId ?? session.LastStep;
            session.LastStepName = request.StepName ?? session.LastStepName;
            if (request.ReachedResult || request.StepId == "result")
            {
                session.ReachedResult = true;
            }
            session.TotalDurationSeconds = Math.Max(session.TotalDurationSeconds, request.TotalElapsedSeconds);
            if (!string.IsNullOrEmpty(request.MatchedVehicle))
            {
                session.MatchedVehicle = request.MatchedVehicle;
            }
            session.UpdatedAt = DateTime.UtcNow;
        }

        // Insert event
        var evt = new AnalyticsEvent
        {
            SessionId = request.SessionId,
            StepId = request.StepId ?? string.Empty,
            StepName = request.StepName ?? string.Empty,
            StepIndex = request.StepIndex,
            TimeOnStepSeconds = Math.Max(0, request.TimeOnStepSeconds),
            TotalElapsedSeconds = Math.Max(0, request.TotalElapsedSeconds),
            IsExit = request.IsExit,
            CreatedAt = DateTime.UtcNow
        };
        _context.AnalyticsEvents.Add(evt);

        await _context.SaveChangesAsync();
    }

    public async Task<Dictionary<string, string>> GetSiteSettingsAsync()
    {
        return await _context.SiteSettings.ToDictionaryAsync(s => s.Key, s => s.Value);
    }

    public async Task<List<Vehicle>> GetActiveVehiclesAsync()
    {
        return await _context.Vehicles.Where(v => v.IsActive).OrderBy(v => v.Name).ToListAsync();
    }
}
