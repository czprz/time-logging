using TimeLogging.Endpoints.Models;

namespace TimeLogging.Maps;

public interface ICodeMap
{
    public Code? Map(gRPC.Code.Code? code);
    public gRPC.Code.Code Map(Code code);
}