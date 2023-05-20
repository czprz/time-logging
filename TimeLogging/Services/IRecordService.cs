using TimeLogging.Endpoints.Models;

namespace TimeLogging.Services;

public interface IRecordService
{
    public Task<IList<Record>> GetRecordsAsync();
    public Task<Record?> GetRecordAsync(Guid id);
    public Task<IList<Record>> GetRecordsAsync(DateTime from, DateTime to);
    public Task<Record?> CreateRecordAsync(Record record);
    public Task<Record?> UpdateRecordAsync(Record record);
    Task<Record?> DeleteRecordAsync(Guid id);
}