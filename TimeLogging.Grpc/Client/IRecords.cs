using gRPC.Record;

namespace TimeLogging.Grpc.Client;

public interface IRecords
{
    Task<RecordList> GetRecordAsync();
    Task<RecordList> GetRecordAsync(string id);
    Task<Record> CreateRecordAsync(Record record);
    Task<Record> UpdateRecordAsync(Record record);
    Task<Record> DeleteRecordAsync(string id);
}