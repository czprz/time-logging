using Asp.Versioning.Builder;

namespace TimeLogging.Endpoints.Tracking;

public static class GetTracking
{
    public static void MapTrackingLatestEndpoints(this WebApplication app, ApiVersionSet apiVersionSet)
    {
        app.MapGet("tracking", GetLatest)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1)
            .CacheOutput("expires5s");
    }

    private static async Task<IResult> GetLatest(HttpContext context)
    {
        return Results.Ok();
    }
}