using Microsoft.EntityFrameworkCore;
using ToyotaWizard.Api.Models.Entities;

namespace ToyotaWizard.Api.Data;

public class ToyotaDbContext : DbContext
{
    public ToyotaDbContext(DbContextOptions<ToyotaDbContext> options) : base(options)
    {
    }

    public DbSet<Question> Questions => Set<Question>();
    public DbSet<QuestionOption> QuestionOptions => Set<QuestionOption>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Vehicle> Vehicles => Set<Vehicle>();
    public DbSet<MatchingRule> MatchingRules => Set<MatchingRule>();
    public DbSet<Lead> Leads => Set<Lead>();
    public DbSet<WizardMetric> WizardMetrics => Set<WizardMetric>();
    public DbSet<AnalyticsSession> AnalyticsSessions => Set<AnalyticsSession>();
    public DbSet<AnalyticsEvent> AnalyticsEvents => Set<AnalyticsEvent>();
    public DbSet<SiteSetting> SiteSettings => Set<SiteSetting>();
    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Question mapping
        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(255);
            entity.Property(e => e.CategoryType).HasMaxLength(50);
            entity.HasMany(e => e.Options)
                  .WithOne(o => o.Question)
                  .HasForeignKey(o => o.QuestionId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // QuestionOption mapping
        modelBuilder.Entity<QuestionOption>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(255);
        });

        // Category mapping
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.Property(e => e.VehicleType).HasMaxLength(50);
        });

        // Vehicle mapping
        modelBuilder.Entity<Vehicle>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(150);
            entity.Property(e => e.Type).IsRequired().HasMaxLength(50);
        });

        // MatchingRule mapping
        modelBuilder.Entity<MatchingRule>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.SourceId).IsRequired().HasMaxLength(255);
            entity.Property(e => e.VehicleId).IsRequired().HasMaxLength(100);
            entity.HasIndex(e => new { e.SourceId, e.VehicleId });
        });

        // Lead mapping
        modelBuilder.Entity<Lead>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FullName).IsRequired().HasMaxLength(150);
            entity.Property(e => e.Phone).IsRequired().HasMaxLength(50);
        });

        // AnalyticsSession mapping
        modelBuilder.Entity<AnalyticsSession>(entity =>
        {
            entity.HasKey(e => e.SessionId);
            entity.Property(e => e.SessionId).HasMaxLength(100);
        });

        // AnalyticsEvent mapping
        modelBuilder.Entity<AnalyticsEvent>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.SessionId).IsRequired().HasMaxLength(100);
            entity.HasIndex(e => e.SessionId);
            entity.HasIndex(e => e.StepId);
        });

        // SiteSetting mapping
        modelBuilder.Entity<SiteSetting>(entity =>
        {
            entity.HasKey(e => e.Key);
            entity.Property(e => e.Key).HasMaxLength(100);
        });

        // AdminUser mapping
        modelBuilder.Entity<AdminUser>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Username).IsRequired().HasMaxLength(100);
            entity.HasIndex(e => e.Username).IsUnique();
        });
    }
}
