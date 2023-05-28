using Asp.Versioning;
using Asp.Versioning.Conventions;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerGen;
using TimeLogging.Endpoints;
using TimeLogging.Grpc;
using TimeLogging.Maps;
using TimeLogging.OpenApi;
using TimeLogging.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTimeLoggingClient();

builder.Services.AddTransient<IRecordMap, RecordMap>();
builder.Services.AddTransient<IRecordService, RecordService>();

builder.Services.AddTransient<ICodeMap, CodeMap>();
builder.Services.AddTransient<ICodeService, CodeService>();

builder.Services.AddTransient<IProductMap, ProductMap>();
builder.Services.AddTransient<IProductService, ProductService>();

builder.Services.AddTransient<ITemplateMap, TemplateMap>();
builder.Services.AddTransient<ITemplateService, TemplateService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();
builder.Services.AddSwaggerGen(options => options.OperationFilter<SwaggerDefaultValues>());
builder.Services
    .AddApiVersioning(options =>
    {
        options.DefaultApiVersion = new(1);
        options.ReportApiVersions = true;
        options.AssumeDefaultVersionWhenUnspecified = true;
        options.ApiVersionReader = ApiVersionReader.Combine(
            new QueryStringApiVersionReader("api-version"),
            new HeaderApiVersionReader("api-version"),
            new MediaTypeApiVersionReader()
        );
    })
    .AddApiExplorer(options => { options.GroupNameFormat = "'v'VVV"; });

builder.Services.AddHealthChecks();

builder.Services.AddOutputCache(options =>
{
    options.AddPolicy("expires5s", x => x.Expire(TimeSpan.FromSeconds(5)));
});

builder.Services.AddOutputCache(options =>
{
    options.AddPolicy("expires5s", x => x.Expire(TimeSpan.FromSeconds(5)));
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseStaticFiles();

app.MapFallbackToFile("index.html");

app.UseOutputCache();

var versionSet = app.NewApiVersionSet()
    .HasApiVersion(1, 0)
    .HasApiVersion(2, 0)
    .Build();

app.AddRecordEndpoints(versionSet);
app.AddProductEndpoints(versionSet);
app.AddCodeEndpoints(versionSet);
app.AddTemplateEndpoints(versionSet);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        var descriptions = app.DescribeApiVersions();

        foreach (var description in descriptions)
        {
            var url = $"/swagger/{description.GroupName}/swagger.json";
            var name = description.GroupName.ToUpperInvariant();
            options.SwaggerEndpoint(url, name);
        }
    });
}

app.MapHealthChecks("/healthz");

app.Run();