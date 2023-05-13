using Asp.Versioning.Builder;

namespace TimeLogging.Endpoints;

public static class TemplateEndpoints
{
    public static void AddTemplateEndpoints(this WebApplication app, ApiVersionSet apiVersionSet)
    {
        app.MapGet("templates", Get)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1)
            .CacheOutput("expires5s");
    }

    private static Task<IResult> Get(HttpContext context)
    {
        throw new NotImplementedException();
    }
}