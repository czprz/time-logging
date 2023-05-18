using TimeLogging.Grpc;
using TimeLogging.TestServer.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTimeLoggingServer();

var app = builder.Build();

app.MapGrpcService<TemplateService>();
app.MapGrpcService<RecordService>();
app.MapGrpcService<CodeService>();
app.MapGrpcService<ProductService>();

app.MapGet("/",
    () =>
        "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();