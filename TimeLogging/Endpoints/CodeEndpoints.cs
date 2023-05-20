using Asp.Versioning.Builder;
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
}