using Grpc.Core;
using gRPC.Template;

namespace TimeLogging.TestServer.Services;

public class TemplateService : gRPC.Template.TemplateService.TemplateServiceBase
{
    public override Task<TemplateList> get(TemplateRequest request, ServerCallContext context)
    {
        return Task.FromResult(new TemplateList
        {
            Templates =
            {
                new []
                {
                    new Template
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = "test",
                        Description = "test",
                        Items =
                        {
                            new []
                            {
                                new TemplateItem
                                {
                                    Id = Guid.NewGuid().ToString(),
                                    Day = Day.Friday,
                                    Time = 1000,
                                    CodeId = Guid.NewGuid().ToString(),
                                    TemplateId = Guid.NewGuid().ToString(),
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    
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
}