using TimeLogging.Endpoints.Models;

namespace TimeLogging.Maps;

public class CodeMap : ICodeMap
{
    public Code? Map(gRPC.Code.Code? code)
    {
        if (code is null)
        {
            return null;
        }
        
        return new Code
        {
            Id = Guid.Parse(code.Id),
            Name = code.Name,
        };
    }

    public gRPC.Code.Code Map(Code code)
    {
        return new gRPC.Code.Code
        {
            Id = code.Id.ToString(),
            Name = code.Name,
        };
    }
}