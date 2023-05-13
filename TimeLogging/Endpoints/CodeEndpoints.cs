using Asp.Versioning.Builder;
using TimeLogging.Endpoints.Models;
using TimeLogging.Services;

namespace TimeLogging.Endpoints;

public static class CodeEndpoints
{
    public static void AddCodeEndpoints(this WebApplication app, ApiVersionSet apiVersionSet)
    {
        app.MapGet("codes", GetCodes)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1)
            .CacheOutput("expires5s");
        app.MapGet("codes/{id}", GetCode)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1)
            .CacheOutput("expires5s");
        app.MapPost("codes", CreateCode)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1);
        app.MapPut("codes", UpdateCode)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1);
        app.MapDelete("codes/{id}", DeleteCode)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1);
    }

    private static async Task<IResult> GetCodes(ICodeService service)
    {
        var codes = await service.GetCodesAsync();
        return codes.Count == 0 ? Results.NotFound() : Results.Ok(codes);
    }
    
    private static async Task<IResult> GetCode(ICodeService service, Guid id)
    {
        var code = await service.GetCodeAsync(id);
        return code is null ? Results.NotFound() : Results.Ok(code);
    }
    
    private static async Task<IResult> CreateCode(ICodeService service, Code code)
    {
        var createdCode = await service.CreateCodeAsync(code);
        return Results.Created($"/codes/{createdCode.Id}", createdCode);
    }
    
    private static async Task<IResult> UpdateCode(ICodeService service, Code code)
    {
        var updatedCode = await service.UpdateCodeAsync(code);
        return updatedCode is null ? Results.NotFound() : Results.Ok(updatedCode);
    }
    
    private static async Task<IResult> DeleteCode(ICodeService service, Guid id)
    {
        var code = await service.DeleteCodeAsync(id);
        return code is null ? Results.NotFound() : Results.Ok(code);
    }
}