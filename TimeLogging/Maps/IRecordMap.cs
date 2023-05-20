using TimeLogging.Endpoints.Models;

namespace TimeLogging.Maps;

public interface IRecordMap
{
    Record? Map(gRPC.Record.Record? record);
    gRPC.Record.Record Map(Record record);
}