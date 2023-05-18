using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using gRPC.Record;

namespace TimeLogging.TestServer.Services;

public class RecordService : gRPC.Record.RecordService.RecordServiceBase
{
    public override Task<RecordList> get(RecordRequest request, ServerCallContext context)
    {
        return Task.FromResult(new RecordList
        {
            Records =
            {
                new[]
                {
                    new Record
                    {
                        Id = Guid.NewGuid().ToString(),
                        CodeId = Guid.NewGuid().ToString(),
                        Date = DateTime.Now.ToTimestamp(),
                        Duration = Duration.FromTimeSpan(new TimeSpan(0, 1, 0))
                    }
                }
            }
        });
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