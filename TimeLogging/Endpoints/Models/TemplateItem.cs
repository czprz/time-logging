namespace TimeLogging.Endpoints.Models;

public record TemplateItem
{
    public string Id { get; init; } = "";
    public string TemplateId { get; init; } = "";
    public string CodeId { get; init; } = "";
    public DayOfWeek Day { get; init; } = DayOfWeek.Monday;
    public TimeSpan Time { get; init; }
}