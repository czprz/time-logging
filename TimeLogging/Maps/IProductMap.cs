using TimeLogging.Endpoints.Models;

namespace TimeLogging.Maps;

public interface IProductMap
{
    public Product? Map(gRPC.Product.Product? product);
    public gRPC.Product.Product Map(Product product);
}