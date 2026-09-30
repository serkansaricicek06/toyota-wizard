# ------------------------------------------------------------
# Dockerfile for Toyota Wizard .NET 8 Web API
# ------------------------------------------------------------

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY src/ToyotaWizard.Api/ToyotaWizard.Api.csproj ./src/ToyotaWizard.Api/
RUN dotnet restore src/ToyotaWizard.Api/ToyotaWizard.Api.csproj

COPY src/ToyotaWizard.Api/ ./src/ToyotaWizard.Api/
WORKDIR /src/src/ToyotaWizard.Api
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Production
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "ToyotaWizard.Api.dll"]
