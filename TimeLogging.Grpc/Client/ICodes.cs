using gRPC.Code;

namespace TimeLogging.Grpc.Client;

public interface ICodes
{
    Task<CodeList> GetCodesAsync();
    Task<CodeList> GetCodeAsync(string id);
}