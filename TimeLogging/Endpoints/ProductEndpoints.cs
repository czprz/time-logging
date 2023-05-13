using Asp.Versioning.Builder;

namespace TimeLogging.Endpoints;

public static class ProductEndpoints
{
    public static void AddProductEndpoints(this WebApplication app, ApiVersionSet apiVersionSet)
    {
        app.MapGet("products", Get)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1)
            .CacheOutput("expires5s");
    }

    private static Task Get(HttpContext context)
    {
        throw new NotImplementedException();
    }
}