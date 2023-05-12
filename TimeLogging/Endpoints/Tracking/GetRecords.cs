using Asp.Versioning.Builder;

namespace TimeLogging.Endpoints.Tracking;

public static class GetRecords
{
    public static void MapRecordEndpoints(this WebApplication app, ApiVersionSet apiVersionSet)
    {
        app.MapGet("records", GetLatest)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1)
            .CacheOutput("expires5s");
    }

    private static async Task<IResult> GetLatest(HttpContext context)
    {
        return Results.Ok();
    }
}