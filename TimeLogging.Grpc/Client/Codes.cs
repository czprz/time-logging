using gRPC.Code;

namespace TimeLogging.Grpc.Client;

public class Codes : ICodes
{
    private readonly CodeService.CodeServiceClient _client;

    public Codes(CodeService.CodeServiceClient client)
    {
        _client = client;
    }
    
    public async Task<CodeList> GetCodesAsync()
    {
        var request = new CodeRequest();
        var response = await _client.getAsync(request);

        return response;
    }
    
    public async Task<CodeList> GetCodeAsync(string id)
    {
        var request = new CodeRequest { Id = id };
        var response = await _client.getAsync(request);

        return response;
    }
}