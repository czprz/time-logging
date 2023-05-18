using gRPC.Code;
using Grpc.Core;
using gRPC.Product;
using gRPC.Record;
using gRPC.Template;
using Microsoft.Extensions.DependencyInjection;
using TimeLogging.Grpc.Server;

namespace TimeLogging.Grpc;

public static class AddTimeLoggingServerExtension
{
    public static void AddTimeLoggingServer(this IServiceCollection services, Action<Config> configure)
    {
        var config = Configure(configure);

        services.AddGrpc(options =>
        {
            options.EnableDetailedErrors = true;
            options.MaxReceiveMessageSize = 1024 * 1024 * 100;
            options.MaxSendMessageSize = 1024 * 1024 * 100;
        });
        
        services.AddSingleton<Templates>();
        services.AddSingleton<Codes>();
        services.AddSingleton<Products>();
        services.AddSingleton<Records>();
        
        var serviceProvider = services.BuildServiceProvider();

        var templateServerDefinition = CreateTemplateService(serviceProvider);
        var codeServerDefinition = CreateCodeService(serviceProvider);
        var productServerDefinition = CreateProductService(serviceProvider);
        var recordServerDefinition = CreateRecordService(serviceProvider);

        var server = new global::Grpc.Core.Server
        {
            Services = { templateServerDefinition, codeServerDefinition, productServerDefinition, recordServerDefinition },
            Ports = { new ServerPort(config.Address ?? "localhost", config.Port ?? 58000, ServerCredentials.Insecure) }
        };

        server.Start();
    }

    private static Config Configure(Action<Config> action)
    {
        var envPort = Environment.GetEnvironmentVariable("GRPC_PORT")!;

        var config = new Config();

        action(config);

        config.Address ??= Environment.GetEnvironmentVariable("GRPC_CHANNEL")!;
        config.Port ??= int.TryParse(envPort, out var port) ? port : 58000;

        return config;
    }

    private static ServerServiceDefinition CreateCodeService(IServiceProvider serviceProvider)
    {
        var codes = serviceProvider.GetRequiredService<Codes>();
        return CodeService.BindService(codes);
    }

    private static ServerServiceDefinition CreateTemplateService(IServiceProvider serviceProvider)
    {
        var templates = serviceProvider.GetRequiredService<Templates>();
        return TemplateService.BindService(templates);
    }
    
    private static ServerServiceDefinition CreateProductService(IServiceProvider serviceProvider)
    {
        var products = serviceProvider.GetRequiredService<Products>();
        return ProductService.BindService(products);
    }
    
    private static ServerServiceDefinition CreateRecordService(IServiceProvider serviceProvider)
    {
        var records = serviceProvider.GetRequiredService<Records>();
        return RecordService.BindService(records);
    }
}