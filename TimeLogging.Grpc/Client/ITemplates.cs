using gRPC.Template;

namespace TimeLogging.Grpc.Client;

public interface ITemplates
{
    Task<TemplateList> GetTemplateAsync();
    Task<TemplateList> GetTemplateAsync(string id);
    Task<Template> CreateTemplateAsync(Template template);
    Task<Template> UpdateTemplateAsync(Template template);
    Task<Template> DeleteTemplateAsync(string id);
}