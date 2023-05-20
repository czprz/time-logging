using TimeLogging.Endpoints.Models;
using TimeLogging.Grpc.Client;
using TimeLogging.Maps;

namespace TimeLogging.Services;

public class CodeService : ICodeService
{
    private readonly ICodes _codes;
    private readonly ICodeMap _codeMap;

    public CodeService(ICodes codes, ICodeMap codeMap)
    {
        _codes = codes;
        _codeMap = codeMap;
    }
    
    public async Task<IList<Code>> GetCodesAsync()
    {
        var codes = await _codes.GetCodesAsync();
        return codes.Codes.Select(x => _codeMap.Map(x)!).ToList();
    }

    public async Task<Code?> GetCodeAsync(Guid id)
    {
        var code = await _codes.GetCodeAsync(id.ToString());
        var result = code.Codes.FirstOrDefault();
        
        return _codeMap.Map(result);
    }
}