using gRPC.Product;

namespace TimeLogging.Grpc.Client;

public interface IProducts
{
    Task<ProductList> GetProductsAsync();
    Task<ProductList> GetProductAsync(string id);
}

public class Products : IProducts
{
    private readonly ProductService.ProductServiceClient _client;

    public Products(ProductService.ProductServiceClient client)
    {
        _client = client;
    }
    
    public async Task<ProductList> GetProductsAsync()
    {
        var request = new ProductRequest();
        var response = await _client.getAsync(request);

        return response;
    }
    
    public async Task<ProductList> GetProductAsync(string id)
    {
        var request = new ProductRequest { Id = id };
        var response = await _client.getAsync(request);

        return response;
    }
}