namespace TimeLogging.Endpoints.Models;

public class Record
{
    public Guid Id { get; set; }
    public Guid CodeId { get; set; }
    public DateTime Date { get; set; }
    public TimeSpan Duration { get; set; }
}