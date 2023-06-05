using Microsoft.Extensions.DependencyInjection;

namespace TimeLogging.Grpc;

public static class AddTimeLoggingServerExtension
{
    public static void AddTimeLoggingServer(this IServiceCollection services)
    {
        services.AddGrpc();
    }
}