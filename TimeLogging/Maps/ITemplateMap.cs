using TimeLogging.Endpoints.Models;

namespace TimeLogging.Maps;

public interface ITemplateMap
{
    Template? Map(gRPC.Template.Template? template);
    gRPC.Template.Template Map(Template template);
}