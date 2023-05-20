using Asp.Versioning.Builder;
using TimeLogging.Endpoints.Models;
using TimeLogging.Services;

namespace TimeLogging.Endpoints;

public static class TemplateEndpoints
{
    public static void AddTemplateEndpoints(this WebApplication app, ApiVersionSet apiVersionSet)
    {
        app.MapGet("templates", GetTemplates)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1)
            .CacheOutput("expires5s");
        app.MapGet("templates/{id}", GetTemplate)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1)
            .CacheOutput("expires5s");
        app.MapPost("templates", CreateTemplate)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1);
        app.MapPut("templates", UpdateTemplate)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1);
        app.MapDelete("templates/{id}", DeleteTemplate)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1);
    }

    private static async Task<IResult> GetTemplates(ITemplateService service)
    {
        var templates = await service.GetTemplatesAsync();
        return templates.Count == 0 ? Results.NotFound() : Results.Ok(templates);
    }

    private static async Task<IResult> GetTemplate(ITemplateService service, Guid id)
    {
        var template = await service.GetTemplateAsync(id);
        return template is null ? Results.NotFound() : Results.Ok(template);
    }

    private static async Task<IResult> CreateTemplate(ITemplateService service, Template template)
    {
        var createdTemplate = await service.CreateTemplateAsync(template);
        return createdTemplate is null ? Results.BadRequest() : Results.Created($"/templates/{createdTemplate.Id}", createdTemplate);
    }

    private static async Task<IResult> UpdateTemplate(ITemplateService service, Template template)
    {
        var updatedTemplate = await service.UpdateTemplateAsync(template);
        return updatedTemplate is null ? Results.NotFound() : Results.Ok(updatedTemplate);
    }

    private static async Task<IResult> DeleteTemplate(ITemplateService service, Guid id)
    {
        var template = await service.DeleteTemplateAsync(id);
        return template is null ? Results.NotFound() : Results.Ok(template);
    }
}