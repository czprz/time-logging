using Google.Protobuf.WellKnownTypes;
using gRPC.Record;

namespace TimeLogging.Grpc.Client;

public class Records : IRecords
{
    private readonly RecordService.RecordServiceClient _client;

    public Records(RecordService.RecordServiceClient client)
    {
        _client = client;
    }
    
    public async Task<RecordList> GetRecordAsync()
    {
        var request = new RecordRequest();
        var response = await _client.getAsync(request);

        return response;
    }
    
    public async Task<RecordList> GetRecordAsync(string id)
    {
        var request = new RecordRequest { Id = id };
        var response = await _client.getAsync(request);

        return response;
    }

    public async Task<RecordList> GetRecordAsync(DateTime from, DateTime to)
    {
        var request = new RecordRequest { From = from.ToTimestamp(), To = to.ToTimestamp() };
        var response = await _client.getAsync(request);
        
        return response;
    }

    public async Task<Record> CreateRecordAsync(Record record)
    {
        var response = await _client.createAsync(record);

        return response;
    }
    
    public async Task<Record> UpdateRecordAsync(Record record)
    {
        var response = await _client.updateAsync(record);

        return response;
    }
    
    public async Task<Record> DeleteRecordAsync(string id)
    {
        var request = new RecordRequest { Id = id };
        var response = await _client.deleteAsync(request);

        return response;
    }
}