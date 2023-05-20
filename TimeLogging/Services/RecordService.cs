using TimeLogging.Endpoints.Models;
using TimeLogging.Grpc.Client;
using TimeLogging.Maps;

namespace TimeLogging.Services;

public class RecordService : IRecordService
{
    private readonly IRecords _records;
    private readonly IRecordMap _recordMap;

    public RecordService(IRecords records, IRecordMap recordMap)
    {
        _records = records;
        _recordMap = recordMap;
    }

    public async Task<Record?> GetRecordAsync(Guid id)
    {
        var records = await _records.GetRecordAsync(id.ToString());
        var record = records.Records.FirstOrDefault();

        return _recordMap.Map(record);
    }

    public async Task<IList<Record>> GetRecordsAsync()
    {
        var records = await _records.GetRecordAsync();
        return records.Records.Select(x => _recordMap.Map(x)!).ToList();
    }

    public async Task<IList<Record>> GetRecordsAsync(DateTime from, DateTime to)
    {
        var records = await _records.GetRecordAsync();
        return records.Records.Select(x => _recordMap.Map(x)!).ToList();
    }

    public async Task<Record?> CreateRecordAsync(Record record)
    {
        var recordMap = _recordMap.Map(record); 
        var result = await _records.CreateRecordAsync(recordMap);
        
        return _recordMap.Map(result);
    }

    public async Task<Record?> UpdateRecordAsync(Record record)
    {
        var recordMap = _recordMap.Map(record);
        var result = await _records.UpdateRecordAsync(recordMap);
        
        return _recordMap.Map(result);
    }

    public async Task<Record?> DeleteRecordAsync(Guid id)
    {
        var result = await _records.DeleteRecordAsync(id.ToString());
        return _recordMap.Map(result);
    }
}