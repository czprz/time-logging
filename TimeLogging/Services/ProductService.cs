using TimeLogging.Endpoints.Models;
using TimeLogging.Grpc.Client;
using TimeLogging.Maps;

namespace TimeLogging.Services;

public class ProductService : IProductService
{
    private readonly IProducts _products;
    private readonly IProductMap _productMap;

    public ProductService(IProducts products, IProductMap productMap)
    {
        _products = products;
        _productMap = productMap;
    }
    
    public async Task<IList<Product>> GetProductsAsync()
    {
        var products = await _products.GetProductsAsync();
        return products.Products.Select(x => _productMap.Map(x)!).ToList();
    }

    public async Task<Product?> GetProductAsync(Guid id)
    {
        var product = await _products.GetProductAsync(id.ToString());
        var result = product.Products.FirstOrDefault();
        
        return _productMap.Map(result);
    }
}