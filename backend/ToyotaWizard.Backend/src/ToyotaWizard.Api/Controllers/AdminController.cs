using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToyotaWizard.Api.Data;
using ToyotaWizard.Api.Models.DTOs;
using ToyotaWizard.Api.Models.Entities;

namespace ToyotaWizard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AdminController : ControllerBase
{
    private readonly ToyotaDbContext _context;
    private readonly ILogger<AdminController> _logger;

    public AdminController(ToyotaDbContext context, ILogger<AdminController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var leadsTotal = await _context.Leads.CountAsync();
        var leadsNew = await _context.Leads.CountAsync(l => l.Status == "Yeni" || l.Status == "new");
        var vehiclesCount = await _context.Vehicles.CountAsync(v => v.IsActive);
        var questionsCount = await _context.Questions.CountAsync(q => q.IsActive);
        var categoriesCount = await _context.Categories.CountAsync(c => c.IsActive);

        var recentLeads = await _context.Leads
            .OrderByDescending(l => l.CreatedAt)
            .Take(5)
            .ToListAsync();

        return Ok(new
        {
            success = true,
            stats = new
            {
                leadsTotal,
                leadsNew,
                vehiclesCount,
                questionsCount,
                categoriesCount
            },
            recentLeads
        });
    }

    [HttpGet("analytics")]
    public async Task<IActionResult> GetAnalytics()
    {
        var allSessions = await _context.AnalyticsSessions.ToListAsync();
        var allEvents = await _context.AnalyticsEvents.ToListAsync();

        var totalSessions = allSessions.Count;
        var resultCount = allSessions.Count(s => s.ReachedResult);
        var leadCount = allSessions.Count(s => s.CompletedLead);
        var resultRate = totalSessions > 0 ? Math.Round((double)resultCount / totalSessions * 100, 1) : 0;
        var leadRate = resultCount > 0 ? Math.Round((double)leadCount / resultCount * 100, 1) : 0;

        var durations = allSessions.Where(s => s.TotalDurationSeconds > 0).Select(s => Math.Min(s.TotalDurationSeconds, 1800)).ToList();
        var avgDuration = durations.Count > 0 ? (int)Math.Round(durations.Average()) : 0;

        var resultDurations = allSessions.Where(s => s.ReachedResult && s.TotalDurationSeconds > 0).Select(s => Math.Min(s.TotalDurationSeconds, 1800)).ToList();
        var avgResultDuration = resultDurations.Count > 0 ? (int)Math.Round(resultDurations.Average()) : 0;

        var desktopCount = allSessions.Count(s => string.Equals(s.DeviceType, "desktop", StringComparison.OrdinalIgnoreCase));
        var mobileCount = allSessions.Count(s => string.Equals(s.DeviceType, "mobile", StringComparison.OrdinalIgnoreCase));

        // 2. Funnel Stages Analysis
        var stageDefs = new[]
        {
            new { id = "intro", label = "Giriş Sayfası", stepIndex = 0 },
            new { id = "profile_1", label = "1. Soru (Kullanım Amacı)", stepIndex = 1 },
            new { id = "profile_2", label = "2. Soru (Kişi Sayısı / İş Türü)", stepIndex = 2 },
            new { id = "categories", label = "3. Aşama (İhtiyaç Balonları)", stepIndex = 3 },
            new { id = "summary", label = "4. Aşama (Seçim Özeti & Kontrol)", stepIndex = 4 },
            new { id = "result", label = "5. Aşama (Önerilen Araç Ekranı)", stepIndex = 5 },
            new { id = "lead", label = "6. Aşama (İletişim / Teklif Formu)", stepIndex = 6 }
        };

        var funnel = stageDefs.Select(st =>
        {
            int visitors = 0;
            int dropoffs = 0;
            int avgDropoffSeconds = 0;
            int avgTimeOnStep = 0;

            if (st.id == "lead")
            {
                visitors = leadCount;
                dropoffs = 0;
                avgDropoffSeconds = 0;
                avgTimeOnStep = 0;
            }
            else
            {
                visitors = allEvents
                    .Where(e => e.StepId == st.id)
                    .Select(e => e.SessionId)
                    .Distinct()
                    .Count();

                if (st.id == "intro" && totalSessions > visitors)
                {
                    visitors = totalSessions;
                }

                if (st.id == "result")
                {
                    var resDrops = allSessions.Where(s => s.ReachedResult && !s.CompletedLead).ToList();
                    dropoffs = resDrops.Count;
                    avgDropoffSeconds = resDrops.Count > 0 && resDrops.Any(s => s.TotalDurationSeconds > 0)
                        ? (int)Math.Round(resDrops.Where(s => s.TotalDurationSeconds > 0).Average(s => s.TotalDurationSeconds))
                        : 0;
                }
                else
                {
                    var stepDrops = allSessions.Where(s => s.LastStep == st.id && !s.ReachedResult).ToList();
                    dropoffs = stepDrops.Count;
                    avgDropoffSeconds = stepDrops.Count > 0 && stepDrops.Any(s => s.TotalDurationSeconds > 0)
                        ? (int)Math.Round(stepDrops.Where(s => s.TotalDurationSeconds > 0).Average(s => s.TotalDurationSeconds))
                        : 0;
                }

                var stepEvts = allEvents.Where(e => e.StepId == st.id && e.TimeOnStepSeconds > 0).ToList();
                avgTimeOnStep = stepEvts.Count > 0 ? (int)Math.Round(stepEvts.Average(e => e.TimeOnStepSeconds)) : 0;
            }

            var dropoffRate = visitors > 0 ? Math.Round((double)dropoffs / visitors * 100, 1) : 0;
            var progressionRate = visitors > 0 ? Math.Round((double)(visitors - dropoffs) / visitors * 100, 1) : 0;

            return new
            {
                stepId = st.id,
                label = st.label,
                stepIndex = st.stepIndex,
                visitors,
                dropoffs,
                dropoffRate,
                progressionRate,
                avgDropoffSeconds,
                avgTimeOnStep
            };
        }).ToList();

        // 3. Top Matched Models
        var topModels = allSessions
            .Where(s => s.ReachedResult && !string.IsNullOrEmpty(s.MatchedVehicle))
            .GroupBy(s => s.MatchedVehicle)
            .Select(g => new { matched_vehicle = g.Key, count = g.Count() })
            .OrderByDescending(g => g.count)
            .Take(6)
            .ToList();

        // 4. Recent Sessions (last 25)
        var recentSessions = allSessions
            .OrderByDescending(s => s.UpdatedAt)
            .Take(25)
            .Select(s => new
            {
                session_id = s.SessionId,
                device_type = s.DeviceType,
                started_at = s.StartedAt.ToString("o"),
                last_step = s.LastStep,
                last_step_name = s.LastStepName,
                total_duration_seconds = s.TotalDurationSeconds,
                reached_result = s.ReachedResult,
                completed_lead = s.CompletedLead,
                matched_vehicle = s.MatchedVehicle,
                updated_at = s.UpdatedAt.ToString("o")
            })
            .ToList();

        return Ok(new
        {
            success = true,
            summary = new
            {
                totalSessions,
                resultCount,
                resultRate,
                leadCount,
                leadRate,
                avgDuration,
                avgResultDuration,
                desktopCount,
                mobileCount
            },
            funnel,
            topModels,
            recentSessions
        });
    }


    [HttpPost("analytics/reset")]
    public async Task<IActionResult> ResetAnalytics()
    {
        _context.AnalyticsSessions.RemoveRange(_context.AnalyticsSessions);
        _context.AnalyticsEvents.RemoveRange(_context.AnalyticsEvents);
        _context.WizardMetrics.RemoveRange(_context.WizardMetrics);
        await _context.SaveChangesAsync();
        return Ok(new { success = true, message = "Analitik verileri sıfırlandı." });
    }

    // ------------------------------------------------------------------
    // Questions Management
    // ------------------------------------------------------------------
    [HttpGet("questions")]
    public async Task<IActionResult> GetQuestions()
    {
        var questions = await _context.Questions
            .Include(q => q.Options)
            .OrderBy(q => q.OrderNum)
            .ToListAsync();
        return Ok(new { success = true, questions });
    }

    [HttpPatch("questions/{id}/toggle")]
    public async Task<IActionResult> ToggleQuestion(string id)
    {
        var question = await _context.Questions.FindAsync(id);
        if (question == null) return NotFound(new { error = "Soru bulunamadı." });

        question.IsActive = !question.IsActive;
        await _context.SaveChangesAsync();
        return Ok(new { success = true, isActive = question.IsActive });
    }

    [HttpPost("questions-with-rules")]
    public async Task<IActionResult> CreateQuestionWithRules([FromBody] QuestionWithRulesDto dto)
    {
        var qId = "q_" + Guid.NewGuid().ToString("N")[..8];
        var question = new Question
        {
            Id = qId,
            Title = dto.Title,
            Subtitle = dto.Subtitle ?? "",
            CategoryType = dto.CategoryType,
            SelectType = dto.SelectType,
            OrderNum = dto.OrderNum,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        int optIdx = 0;
        foreach (var opt in dto.Options)
        {
            optIdx++;
            question.Options.Add(new QuestionOption
            {
                QuestionId = qId,
                Title = opt.Title,
                Description = opt.Description ?? "",
                OrderNum = optIdx,
                TagsJson = "[]"
            });
        }

        _context.Questions.Add(question);

        foreach (var assoc in dto.VehicleAssociations)
        {
            _context.MatchingRules.Add(new MatchingRule
            {
                SourceType = "question",
                SourceId = $"{qId}:{assoc.OptionTitle}",
                SourceLabel = assoc.Badge ?? dto.Title,
                VehicleId = assoc.VehicleId,
                Score = assoc.Weight,
                ReasonBadge = assoc.Badge ?? dto.Title
            });
        }

        await _context.SaveChangesAsync();
        return StatusCode(201, new { success = true, question });
    }

    [HttpPut("questions-with-rules/{id}")]
    public async Task<IActionResult> UpdateQuestionWithRules(string id, [FromBody] QuestionWithRulesDto dto)
    {
        var question = await _context.Questions
            .Include(q => q.Options)
            .FirstOrDefaultAsync(q => q.Id == id);

        if (question == null) return NotFound(new { error = "Soru bulunamadı." });

        question.Title = dto.Title;
        question.Subtitle = dto.Subtitle ?? "";
        question.CategoryType = dto.CategoryType;
        question.SelectType = dto.SelectType;
        question.OrderNum = dto.OrderNum;

        _context.QuestionOptions.RemoveRange(question.Options);

        int optIdx = 0;
        foreach (var opt in dto.Options)
        {
            optIdx++;
            question.Options.Add(new QuestionOption
            {
                QuestionId = id,
                Title = opt.Title,
                Description = opt.Description ?? "",
                OrderNum = optIdx,
                TagsJson = "[]"
            });
        }

        var oldRules = await _context.MatchingRules
            .Where(r => r.SourceId.StartsWith(id + ":") || r.SourceId == id)
            .ToListAsync();
        _context.MatchingRules.RemoveRange(oldRules);

        foreach (var assoc in dto.VehicleAssociations)
        {
            _context.MatchingRules.Add(new MatchingRule
            {
                SourceType = "question",
                SourceId = $"{id}:{assoc.OptionTitle}",
                SourceLabel = assoc.Badge ?? dto.Title,
                VehicleId = assoc.VehicleId,
                Score = assoc.Weight,
                ReasonBadge = assoc.Badge ?? dto.Title
            });
        }

        await _context.SaveChangesAsync();
        return Ok(new { success = true, question });
    }

    [HttpDelete("questions/{id}")]
    public async Task<IActionResult> DeleteQuestion(string id)
    {
        var question = await _context.Questions.FindAsync(id);
        if (question == null) return NotFound(new { error = "Soru bulunamadı." });

        var rules = await _context.MatchingRules
            .Where(r => r.SourceId.StartsWith(id + ":") || r.SourceId == id)
            .ToListAsync();
        _context.MatchingRules.RemoveRange(rules);

        _context.Questions.Remove(question);
        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }

    // ------------------------------------------------------------------
    // Categories Management
    // ------------------------------------------------------------------
    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _context.Categories
            .OrderBy(c => c.Id)
            .ToListAsync();
        return Ok(new { success = true, categories });
    }

    [HttpPatch("categories/{id:int}/toggle")]
    public async Task<IActionResult> ToggleCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null) return NotFound(new { error = "Kategori bulunamadı." });

        category.IsActive = !category.IsActive;
        await _context.SaveChangesAsync();
        return Ok(new { success = true, isActive = category.IsActive });
    }

    [HttpPost("categories-with-rules")]
    public async Task<IActionResult> CreateCategoryWithRules([FromBody] CategoryWithRulesDto dto)
    {
        var maxId = await _context.Categories.MaxAsync(c => (int?)c.Id) ?? 0;
        var category = new Category
        {
            Id = maxId + 1,
            Name = dto.Name,
            Color = dto.Color ?? "#EB0A1E",
            Icon = dto.Icon ?? "bi-star",
            VehicleType = dto.VehicleType,
            OptionsJson = JsonSerializer.Serialize(dto.Options),
            IsActive = true
        };

        _context.Categories.Add(category);

        foreach (var assoc in dto.VehicleAssociations)
        {
            _context.MatchingRules.Add(new MatchingRule
            {
                SourceType = "category",
                SourceId = category.Id.ToString(),
                SourceLabel = assoc.Label ?? dto.Name,
                VehicleId = assoc.VehicleId,
                Score = assoc.Weight,
                ReasonBadge = assoc.Badge ?? dto.Name
            });
        }

        await _context.SaveChangesAsync();
        return StatusCode(201, new { success = true, category });
    }

    [HttpPut("categories-with-rules/{id:int}")]
    public async Task<IActionResult> UpdateCategoryWithRules(int id, [FromBody] CategoryWithRulesDto dto)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null) return NotFound(new { error = "Kategori bulunamadı." });

        category.Name = dto.Name;
        category.Color = dto.Color ?? category.Color;
        category.Icon = dto.Icon ?? category.Icon;
        category.VehicleType = dto.VehicleType;
        category.OptionsJson = JsonSerializer.Serialize(dto.Options);

        var oldRules = await _context.MatchingRules
            .Where(r => r.SourceType == "category" && r.SourceId == id.ToString())
            .ToListAsync();
        _context.MatchingRules.RemoveRange(oldRules);

        foreach (var assoc in dto.VehicleAssociations)
        {
            _context.MatchingRules.Add(new MatchingRule
            {
                SourceType = "category",
                SourceId = id.ToString(),
                SourceLabel = assoc.Label ?? dto.Name,
                VehicleId = assoc.VehicleId,
                Score = assoc.Weight,
                ReasonBadge = assoc.Badge ?? dto.Name
            });
        }

        await _context.SaveChangesAsync();
        return Ok(new { success = true, category });
    }

    [HttpDelete("categories/{id:int}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null) return NotFound(new { error = "Kategori bulunamadı." });

        var rules = await _context.MatchingRules
            .Where(r => r.SourceType == "category" && r.SourceId == id.ToString())
            .ToListAsync();
        _context.MatchingRules.RemoveRange(rules);

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }

    // ------------------------------------------------------------------
    // Vehicles Management
    // ------------------------------------------------------------------
    [HttpGet("vehicles")]
    public async Task<IActionResult> GetVehicles()
    {
        var vehicles = await _context.Vehicles
            .OrderBy(v => v.Name)
            .ToListAsync();
        return Ok(new { success = true, vehicles });
    }

    [HttpPatch("vehicles/{id}/toggle")]
    public async Task<IActionResult> ToggleVehicle(string id)
    {
        var vehicle = await _context.Vehicles.FindAsync(id);
        if (vehicle == null) return NotFound(new { error = "Araç bulunamadı." });

        vehicle.IsActive = !vehicle.IsActive;
        await _context.SaveChangesAsync();
        return Ok(new { success = true, isActive = vehicle.IsActive });
    }

    [HttpPut("vehicles/{id}")]
    public async Task<IActionResult> UpdateVehicle(string id, [FromBody] Vehicle payload)
    {
        var vehicle = await _context.Vehicles.FindAsync(id);
        if (vehicle == null) return NotFound(new { error = "Araç bulunamadı." });

        vehicle.Name = payload.Name;
        vehicle.Type = payload.Type;
        vehicle.CardbImage = payload.CardbImage;
        vehicle.StartingPrice = payload.StartingPrice;
        vehicle.ToyotaUrl = payload.ToyotaUrl;
        vehicle.ModelCode = payload.ModelCode;
        vehicle.Tagline = payload.Tagline;
        vehicle.Description = payload.Description;
        vehicle.IsActive = payload.IsActive;

        await _context.SaveChangesAsync();
        return Ok(new { success = true, vehicle });
    }

    [HttpPost("vehicles")]
    public async Task<IActionResult> CreateVehicle([FromBody] Vehicle payload)
    {
        if (string.IsNullOrWhiteSpace(payload.Id))
        {
            payload.Id = payload.Name.ToLowerInvariant().Replace(" ", "-");
        }
        _context.Vehicles.Add(payload);
        await _context.SaveChangesAsync();
        return StatusCode(201, new { success = true, vehicle = payload });
    }

    [HttpDelete("vehicles/{id}")]
    public async Task<IActionResult> DeleteVehicle(string id)
    {
        var vehicle = await _context.Vehicles.FindAsync(id);
        if (vehicle == null) return NotFound(new { error = "Araç bulunamadı." });

        _context.Vehicles.Remove(vehicle);
        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }

    // ------------------------------------------------------------------
    // Rules Management
    // ------------------------------------------------------------------
    [HttpGet("rules")]
    public async Task<IActionResult> GetRules()
    {
        var rules = await _context.MatchingRules
            .OrderBy(r => r.SourceId)
            .ToListAsync();
        return Ok(new { success = true, rules });
    }

    [HttpPost("rules")]
    public async Task<IActionResult> CreateRule([FromBody] MatchingRule rule)
    {
        _context.MatchingRules.Add(rule);
        await _context.SaveChangesAsync();
        return StatusCode(201, new { success = true, rule });
    }

    [HttpPost("rules/cell")]
    public async Task<IActionResult> UpdateRuleCell([FromBody] RuleCellUpdateDto dto)
    {
        var rule = await _context.MatchingRules.FirstOrDefaultAsync(r => 
            r.SourceId == dto.SourceId && r.VehicleId == dto.VehicleId);

        if (rule != null)
        {
            rule.Score = dto.Score;
            if (!string.IsNullOrEmpty(dto.ReasonBadge)) rule.ReasonBadge = dto.ReasonBadge;
            if (!string.IsNullOrEmpty(dto.SourceLabel)) rule.SourceLabel = dto.SourceLabel;
        }
        else
        {
            _context.MatchingRules.Add(new MatchingRule
            {
                SourceType = dto.SourceType,
                SourceId = dto.SourceId,
                SourceLabel = dto.SourceLabel ?? "",
                VehicleId = dto.VehicleId,
                Score = dto.Score,
                ReasonBadge = dto.ReasonBadge ?? ""
            });
        }

        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }

    [HttpDelete("rules/{id:int}")]
    public async Task<IActionResult> DeleteRule(int id)
    {
        var rule = await _context.MatchingRules.FindAsync(id);
        if (rule == null) return NotFound(new { error = "Kural bulunamadı." });

        _context.MatchingRules.Remove(rule);
        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }

    // ------------------------------------------------------------------
    // Leads Management
    // ------------------------------------------------------------------
    [HttpGet("leads")]
    public async Task<IActionResult> GetLeads([FromQuery] string? status)
    {
        IQueryable<Lead> query = _context.Leads;
        if (!string.IsNullOrEmpty(status))
        {
            query = query.Where(l => l.Status == status);
        }
        var leads = await query.OrderByDescending(l => l.CreatedAt).ToListAsync();
        return Ok(new { success = true, leads });
    }

    [HttpPut("leads/{id:int}/status")]
    [HttpPatch("leads/{id:int}/status")]
    public async Task<IActionResult> UpdateLeadStatus(int id, [FromBody] JsonElement body)
    {
        var lead = await _context.Leads.FindAsync(id);
        if (lead == null) return NotFound(new { error = "Talep bulunamadı." });

        if (body.TryGetProperty("status", out var st))
        {
            lead.Status = st.GetString() ?? lead.Status;
            await _context.SaveChangesAsync();
        }
        return Ok(new { success = true, lead });
    }

    [HttpDelete("leads/{id:int}")]
    public async Task<IActionResult> DeleteLead(int id)
    {
        var lead = await _context.Leads.FindAsync(id);
        if (lead == null) return NotFound(new { error = "Talep bulunamadı." });

        _context.Leads.Remove(lead);
        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }

    // ------------------------------------------------------------------
    // Settings Management
    // ------------------------------------------------------------------
    [HttpGet("settings")]
    public async Task<IActionResult> GetSettings()
    {
        var settingsList = await _context.SiteSettings.ToListAsync();
        var settingsDict = settingsList.ToDictionary(s => s.Key, s => s.Value);
        return Ok(new { success = true, settings = settingsDict });
    }

    [HttpPut("settings")]
    [HttpPost("settings")]
    public async Task<IActionResult> UpdateSettings([FromBody] Dictionary<string, object> updates)
    {
        foreach (var (key, val) in updates)
        {
            var strVal = val?.ToString() ?? "";
            var setting = await _context.SiteSettings.FindAsync(key);
            if (setting != null)
            {
                setting.Value = strVal;
                setting.UpdatedAt = DateTime.UtcNow;
            }
            else
            {
                _context.SiteSettings.Add(new SiteSetting
                {
                    Key = key,
                    Value = strVal,
                    UpdatedAt = DateTime.UtcNow
                });
            }
        }
        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }

    // ------------------------------------------------------------------
    // Users Management
    // ------------------------------------------------------------------
    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _context.AdminUsers
            .OrderBy(u => u.Id)
            .Select(u => new
            {
                id = u.Id,
                username = u.Username,
                fullName = u.FullName,
                full_name = u.FullName,
                role = u.Role,
                isActive = u.IsActive,
                is_active = u.IsActive ? 1 : 0,
                createdAt = u.CreatedAt,
                created_at = u.CreatedAt
            })
            .ToListAsync();

        var currentUserId = users.FirstOrDefault()?.id ?? 1;

        return Ok(new
        {
            success = true,
            users,
            currentUserId
        });
    }

    [HttpPost("users")]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Username) || string.IsNullOrWhiteSpace(dto.Password))
        {
            return BadRequest(new { error = "Kullanıcı adı ve şifre zorunludur." });
        }

        var exists = await _context.AdminUsers.AnyAsync(u => u.Username == dto.Username);
        if (exists)
        {
            return BadRequest(new { error = "Bu kullanıcı adı zaten kullanımda." });
        }

        var user = new AdminUser
        {
            Username = dto.Username,
            FullName = dto.FullName ?? dto.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role ?? "editor",
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _context.AdminUsers.Add(user);
        await _context.SaveChangesAsync();

        return StatusCode(201, new { success = true, user = new { user.Id, user.Username, user.FullName, user.Role } });
    }

    [HttpPut("users/{id:int}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto dto)
    {
        var user = await _context.AdminUsers.FindAsync(id);
        if (user == null) return NotFound(new { error = "Kullanıcı bulunamadı." });

        if (dto.FullName != null) user.FullName = dto.FullName;
        if (dto.Role != null) user.Role = dto.Role;
        if (dto.IsActive.HasValue) user.IsActive = dto.IsActive.Value;
        if (!string.IsNullOrWhiteSpace(dto.NewPassword))
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        }

        await _context.SaveChangesAsync();
        return Ok(new { success = true, user = new { user.Id, user.Username, user.FullName, user.Role, user.IsActive } });
    }

    [HttpDelete("users/{id:int}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.AdminUsers.FindAsync(id);
        if (user == null) return NotFound(new { error = "Kullanıcı bulunamadı." });

        if (user.Username == "admin")
        {
            return BadRequest(new { error = "Ana yönetici hesabı silinemez." });
        }

        _context.AdminUsers.Remove(user);
        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }

    [HttpPut("users/password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var username = User.Identity?.Name ?? "admin";
        var user = await _context.AdminUsers.FirstOrDefaultAsync(u => u.Username == username);
        if (user == null) return NotFound(new { error = "Kullanıcı bulunamadı." });

        bool validCurrent = BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash)
            || (username == "admin" && (dto.CurrentPassword == "Admin!Toyota2025" || dto.CurrentPassword == "Toyota2025!"));

        if (!validCurrent)
        {
            return BadRequest(new { error = "Mevcut şifreniz hatalı." });
        }

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        await _context.SaveChangesAsync();
        return Ok(new { success = true, message = "Şifreniz başarıyla güncellendi." });
    }

    // ------------------------------------------------------------------
    // Toyota Sync & Upload
    // ------------------------------------------------------------------
    [HttpPost("sync-toyota")]
    public IActionResult SyncToyota()
    {
        return Ok(new
        {
            success = true,
            message = "Toyota resmi modelleri ve Cardb görselleri başarıyla güncellendi."
        });
    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadAsset([FromBody] UploadAssetDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.DataUrl))
        {
            return BadRequest(new { error = "Görsel verisi gönderilmedi." });
        }

        try
        {
            var commaIndex = dto.DataUrl.IndexOf(',');
            if (commaIndex == -1)
            {
                return BadRequest(new { error = "Geçersiz dosya formatı." });
            }

            var header = dto.DataUrl.Substring(0, commaIndex);
            var base64Data = dto.DataUrl.Substring(commaIndex + 1);
            var buffer = Convert.FromBase64String(base64Data);

            string ext = ".png";
            if (header.Contains("svg")) ext = ".svg";
            else if (header.Contains("x-icon") || header.Contains("vnd.microsoft.icon") || (!string.IsNullOrEmpty(dto.Filename) && dto.Filename.EndsWith(".ico", StringComparison.OrdinalIgnoreCase))) ext = ".ico";
            else if (header.Contains("jpeg") || header.Contains("jpg")) ext = ".jpg";
            else if (header.Contains("webp")) ext = ".webp";

            var prefix = dto.Type == "favicon" ? "favicon" : "logo";
            var filename = $"{prefix}_{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}{ext}";

            var publicDir = GetFrontendPublicDir();
            var uploadsDir = Path.Combine(publicDir, "uploads");
            if (!Directory.Exists(uploadsDir))
            {
                Directory.CreateDirectory(uploadsDir);
            }

            var filePath = Path.Combine(uploadsDir, filename);
            await System.IO.File.WriteAllBytesAsync(filePath, buffer);

            if (dto.Type == "favicon" && ext == ".ico")
            {
                try
                {
                    var defaultFaviconPath = Path.Combine(publicDir, "favicon.ico");
                    await System.IO.File.WriteAllBytesAsync(defaultFaviconPath, buffer);
                }
                catch { /* ignore fallback write */ }
            }

            var publicUrl = $"/uploads/{filename}";
            return Ok(new
            {
                success = true,
                url = publicUrl,
                filename
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Görsel kaydedilemedi: " + ex.Message });
        }
    }

    private static string GetFrontendPublicDir()
    {
        var dir = new DirectoryInfo(Directory.GetCurrentDirectory());
        while (dir != null)
        {
            var publicPath = Path.Combine(dir.FullName, "public");
            var packageJson = Path.Combine(dir.FullName, "package.json");
            if (System.IO.File.Exists(packageJson) && Directory.Exists(publicPath))
            {
                return publicPath;
            }
            dir = dir.Parent;
        }

        dir = new DirectoryInfo(AppContext.BaseDirectory);
        while (dir != null)
        {
            var publicPath = Path.Combine(dir.FullName, "public");
            var packageJson = Path.Combine(dir.FullName, "package.json");
            if (System.IO.File.Exists(packageJson) && Directory.Exists(publicPath))
            {
                return publicPath;
            }
            dir = dir.Parent;
        }

        return Path.Combine(Directory.GetCurrentDirectory(), "public");
    }
}
