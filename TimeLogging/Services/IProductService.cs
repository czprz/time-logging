using TimeLogging.Endpoints.Models;

namespace TimeLogging.Services;

public interface IProductService
{
    public Task<IList<Product>> GetProductsAsync();
    public Task<Product?> GetProductAsync(Guid id);
    public Task<Product> CreateProductAsync(Product product);
    public Task<Product?> UpdateProductAsync(Product product);
    public Task<Product?> DeleteProductAsync(Guid id);
}