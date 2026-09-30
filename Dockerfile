# ------------------------------------------------------------
# Dockerfile for Toyota Wizard .NET 8 Web API
# Suitable for Render.com, Railway, Fly.io, Koyeb (100% Free Tiers)
# ------------------------------------------------------------

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY backend/ToyotaWizard.Backend/src/ToyotaWizard.Api/ToyotaWizard.Api.csproj ./backend/ToyotaWizard.Backend/src/ToyotaWizard.Api/
RUN dotnet restore ./backend/ToyotaWizard.Backend/src/ToyotaWizard.Api/ToyotaWizard.Api.csproj

# Copy source code and publish
COPY backend/ToyotaWizard.Backend/src/ToyotaWizard.Api/ ./backend/ToyotaWizard.Backend/src/ToyotaWizard.Api/
WORKDIR /src/backend/ToyotaWizard.Backend/src/ToyotaWizard.Api
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Expose default HTTP port
ENV ASPNETCORE_ENVIRONMENT=Production
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "ToyotaWizard.Api.dll"]
