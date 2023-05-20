using TimeLogging.Endpoints.Models;

namespace TimeLogging.Services;

public interface ITemplateService
{
    public Task<IList<Template>> GetTemplatesAsync();
    public Task<Template?> GetTemplateAsync(Guid id);
    public Task<Template?> CreateTemplateAsync(Template template);
    public Task<Template?> UpdateTemplateAsync(Template template);
    public Task<Template?> DeleteTemplateAsync(Guid id);
}