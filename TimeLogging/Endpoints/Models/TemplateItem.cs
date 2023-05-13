namespace TimeLogging.Endpoints.Models;

public record TemplateItem
{
    public string Id { get; init; } = "";
    public string TemplateId { get; init; } = "";
    public string CodeId { get; init; } = "";
    public Day Day { get; init; } = Day.Monday;
    public TimeSpan Time { get; init; }
}