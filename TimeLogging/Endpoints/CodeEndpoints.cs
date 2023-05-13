using Asp.Versioning.Builder;

namespace TimeLogging.Endpoints;

public static class CodeEndpoints
{
    public static void AddCodeEndpoints(this WebApplication app, ApiVersionSet apiVersionSet)
    {
        app.MapGet("codes", Get)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1)
            .CacheOutput("expires5s");
    }

    private static Task Get(HttpContext context)
    {
        throw new NotImplementedException();
    }
}