using Google.Protobuf.WellKnownTypes;
using TimeLogging.Endpoints.Models;

namespace TimeLogging.Maps;

public class RecordMap : IRecordMap
{
    public Record? Map(gRPC.Record.Record? record)
    {
        if (record is null)
        {
            return null;
        }
        
        return new Record
        {
            Id = Guid.Parse(record.Id),
            CodeId = Guid.Parse(record.CodeId),
            Date = record.Date.ToDateTime(),
            Duration = record.Duration.ToTimeSpan(),
        };
    }

    public gRPC.Record.Record Map(Record record)
    {
        return new gRPC.Record.Record
        {
            Id = record.Id.ToString(),
            CodeId = record.CodeId.ToString(),
            Date = Timestamp.FromDateTime(record.Date),
            Duration = Duration.FromTimeSpan(record.Duration),
        };
    }
}