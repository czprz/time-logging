using TimeLogging.Endpoints.Models;

namespace TimeLogging.Services;

public interface ICodeService
{
    public Task<IList<Code>> GetCodesAsync();
    public Task<Code?> GetCodeAsync(Guid id);
    public Task<Code> CreateCodeAsync(Code code);
    public Task<Code?> UpdateCodeAsync(Code code);
    public Task<Code?> DeleteCodeAsync(Guid id);
}