using Grpc.Core;
using gRPC.Record;

namespace TimeLogging.Grpc.Server;

public class Records : RecordService.RecordServiceBase
{
    public override Task<RecordList> get(RecordRequest request, ServerCallContext context)
    {
        throw new NotImplementedException();
    }
    
    public override Task<Record> create(Record request, ServerCallContext context)
    {
        throw new NotImplementedException();
    }
    
    public override Task<Record> update(Record request, ServerCallContext context)
    {
        throw new NotImplementedException();
    }
    
    public override Task<Record> delete(RecordRequest request, ServerCallContext context)
    {
        throw new NotImplementedException();
    }
}