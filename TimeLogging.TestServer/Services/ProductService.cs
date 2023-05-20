using Grpc.Core;
using gRPC.Product;

namespace TimeLogging.TestServer.Services;

public class ProductService : gRPC.Product.ProductService.ProductServiceBase
{
    public override Task<ProductList> get(ProductRequest request, ServerCallContext context)
    {
        return Task.FromResult(new ProductList
        {
            Products =
            {
                new[]
                {
                    new Product
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = "test",
                    }
                }
            }
        });
    }
}