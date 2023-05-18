using gRPC.Code;
using Grpc.Core;

namespace TimeLogging.Grpc.Server;

public class Codes : CodeService.CodeServiceBase
{
    public override Task<CodeList> get(CodeRequest request, ServerCallContext context)
    {
        throw new NotImplementedException();
    }

    public override Task<Code> create(Code request, ServerCallContext context)
    {
        throw new NotImplementedException();
    }

    public override Task<Code> update(Code request, ServerCallContext context)
    {
        throw new NotImplementedException();
    }

    public override Task<Code> delete(CodeRequest request, ServerCallContext context)
    {
        throw new NotImplementedException();
    }
}