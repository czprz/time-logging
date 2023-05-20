using TimeLogging.Endpoints.Models;

namespace TimeLogging.Maps;

public class ProductMap : IProductMap
{
    public Product? Map(gRPC.Product.Product? product)
    {
        if (product is null)
        {
            return null;
        }

        return new Product
        {
            Id = Guid.Parse(product.Id),
            Name = product.Name
        };
    }

    public gRPC.Product.Product Map(Product product)
    {
        return new()
        {
            Id = product.Id.ToString(),
            Name = product.Name
        };
    }
}