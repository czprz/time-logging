using Grpc.Net.Client;
using gRPC.Template;

namespace TimeLogging.Grpc.Client;

public class Templates : ITemplates
{
    private readonly TemplateService.TemplateServiceClient _client;

    public Templates(TemplateService.TemplateServiceClient client)
    {
        _client = client;
    }

    public async Task<TemplateList> GetTemplateAsync()
    {
        var request = new TemplateRequest();
        var response = await _client.getAsync(request);

        return response;
    }

    public async Task<TemplateList> GetTemplateAsync(string id)
    {
        var request = new TemplateRequest { Id = id };
        var response = await _client.getAsync(request);

        return response;
    }

    public async Task<Template> CreateTemplateAsync(Template template)
    {
        var response = await _client.createAsync(template);

        return response;
    }
    
    public async Task<Template> UpdateTemplateAsync(Template template)
    {
        var response = await _client.updateAsync(template);

        return response;
    }
    
    public async Task<Template> DeleteTemplateAsync(string id)
    {
        var request = new TemplateRequest { Id = id };
        var response = await _client.deleteAsync(request);

        return response;
    }
}