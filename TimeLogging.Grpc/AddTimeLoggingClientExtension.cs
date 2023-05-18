using gRPC.Code;
using Grpc.Net.Client;
using gRPC.Product;
using gRPC.Record;
using gRPC.Template;
using Microsoft.Extensions.DependencyInjection;
using TimeLogging.Grpc.Client;

namespace TimeLogging.Grpc;

public static class AddTimeLoggingClientExtension
{
    public static void AddTimeLoggingClient(this IServiceCollection services, Action<Config> configure)
    {
        var config = Configure(configure);

        var channel = GrpcChannel.ForAddress(config.Address!);
        
        services.AddSingleton(new TemplateService.TemplateServiceClient(channel));
        services.AddSingleton(new CodeService.CodeServiceClient(channel));
        services.AddSingleton(new ProductService.ProductServiceClient(channel));
        services.AddSingleton(new RecordService.RecordServiceClient(channel));
        
        services.AddSingleton<ITemplates, Templates>();
        services.AddSingleton<ICodes, Codes>();
        services.AddSingleton<IProducts, Products>();
        services.AddSingleton<IRecords, Records>();
    }

    private static Config Configure(Action<Config> action)
    {
        var config = new Config();

        action(config);

        config.Address ??= Environment.GetEnvironmentVariable("GRPC_CHANNEL")!;
        
        return config;
    }
}