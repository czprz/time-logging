using TimeLogging.Endpoints.Models;

namespace TimeLogging.Services;

public interface IProductService
{
    public Task<IList<Product>> GetProductsAsync();
    public Task<Product?> GetProductAsync(Guid id);
}