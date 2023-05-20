using gRPC.Code;
using Grpc.Core;

namespace TimeLogging.TestServer.Services;

public class CodeService : gRPC.Code.CodeService.CodeServiceBase
{
    private readonly ILogger<CodeService> _logger;

    public CodeService(ILogger<CodeService> logger)
    {
        _logger = logger;
    }
    
    public override Task<CodeList> get(CodeRequest request, ServerCallContext context)
    {
        return Task.FromResult(new CodeList
        {
            Codes =
            {
                new[]
                {
                    new Code
                    {
                        Description = "test",
                        Id = Guid.NewGuid().ToString(),
                        Name = "test",
                        ProductId = Guid.NewGuid().ToString(),
                    }
                }
            }
        });
    }
}