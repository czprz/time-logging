using Asp.Versioning.Builder;

namespace TimeLogging.Endpoints;

public static class RecordEndpoints
{
    public static void AddRecordEndpoints(this WebApplication app, ApiVersionSet apiVersionSet)
    {
        app.MapGet("records", Get)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1)
            .CacheOutput("expires5s");
    }

    private static async Task<IResult> Get(HttpContext context)
    {
        return Results.Ok();
    }
}