using TimeLogging.Endpoints.Models;
using TimeLogging.Grpc.Client;
using TimeLogging.Maps;

namespace TimeLogging.Services;

public class TemplateService : ITemplateService
{
    private readonly ITemplates _templates;
    private readonly ITemplateMap _templateMap;

    public TemplateService(ITemplates templates, ITemplateMap templateMap)
    {
        _templates = templates;
        _templateMap = templateMap;
    }

    public async Task<IList<Template>> GetTemplatesAsync()
    {
        var templates = await _templates.GetTemplateAsync();
        return templates.Templates.Select(x => _templateMap.Map(x)!).ToList();
    }

    public async Task<Template?> GetTemplateAsync(Guid id)
    {
        var templates = await _templates.GetTemplateAsync(id.ToString());
        var result = templates.Templates.FirstOrDefault();

        return _templateMap.Map(result);
    }

    public async Task<Template?> CreateTemplateAsync(Template template)
    {
        var templateRequest = _templateMap.Map(template);
        var result = await _templates.CreateTemplateAsync(templateRequest);
        
        return _templateMap.Map(result);
    }

    public async Task<Template?> UpdateTemplateAsync(Template template)
    {
        var templateRequest = _templateMap.Map(template);
        var result = await _templates.UpdateTemplateAsync(templateRequest);
        
        return _templateMap.Map(result);
    }

    public async Task<Template?> DeleteTemplateAsync(Guid id)
    {
        var result = await _templates.DeleteTemplateAsync(id.ToString());
        return _templateMap.Map(result);
    }
}