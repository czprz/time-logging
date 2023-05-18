using Grpc.Core;
using gRPC.Template;

namespace TimeLogging.Grpc.Server;

public class Templates : TemplateService.TemplateServiceBase
{
    public override Task<Template> create(Template request, ServerCallContext context)
    {
        throw new NotImplementedException();
    }
    
    public override Task<Template> update(Template request, ServerCallContext context)
    {
        throw new NotImplementedException();
    }
    
    public override Task<Template> delete(TemplateRequest request, ServerCallContext context)
    {
        throw new NotImplementedException();
    }
    
    public override Task<TemplateList> get(TemplateRequest request, ServerCallContext context)
    {
        throw new NotImplementedException();
    }
}