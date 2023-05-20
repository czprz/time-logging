using TimeLogging.Endpoints.Models;

namespace TimeLogging.Services;

public interface ICodeService
{
    public Task<IList<Code>> GetCodesAsync();
    public Task<Code?> GetCodeAsync(Guid id);
}