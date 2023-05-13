namespace TimeLogging.Endpoints.Models;

public record Template
{
    public string Id { get; init; } = "";
    public string? Name { get; init; }
    public string? Description { get; init; }
    public IList<TemplateItem> Items { get; init; } = new List<TemplateItem>();
}