namespace TimeLogging.Endpoints.Models;

public class Code
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public string Name { get; set; } = null!; 
    public string Description { get; set; } = null!;
}