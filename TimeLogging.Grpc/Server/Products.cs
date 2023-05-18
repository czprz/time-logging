using Grpc.Core;
using gRPC.Product;

namespace TimeLogging.Grpc.Server;

public class Products : ProductService.ProductServiceBase
{
    public override Task<ProductList> get(ProductRequest request, ServerCallContext context)
    {
        throw new NotImplementedException();
    }
}