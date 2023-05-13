using Asp.Versioning.Builder;
using TimeLogging.Endpoints.Models;
using TimeLogging.Services;

namespace TimeLogging.Endpoints;

public static class ProductEndpoints
{
    public static void AddProductEndpoints(this WebApplication app, ApiVersionSet apiVersionSet)
    {
        app.MapGet("products", GetProducts)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1)
            .CacheOutput("expires5s");
        app.MapGet("products/{id}", GetProduct)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1)
            .CacheOutput("expires5s");
        app.MapPost("products", CreateProduct)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1);
        app.MapPut("products", UpdateProduct)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1);
        app.MapDelete("products/{id}", DeleteProduct)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1);
    }

    private static async Task<IResult> GetProducts(IProductService service)
    {
        var products = await service.GetProductsAsync();
        return products.Count == 0 ? Results.NotFound() : Results.Ok(products);
    }
    
    private static async Task<IResult> GetProduct(IProductService service, Guid id)
    {
        var product = await service.GetProductAsync(id);
        return product is null ? Results.NotFound() : Results.Ok(product);
    }
    
    private static async Task<IResult> CreateProduct(IProductService service, Product product)
    {
        var createdProduct = await service.CreateProductAsync(product);
        return Results.Created($"/products/{createdProduct.Id}", createdProduct);
    }
    
    private static async Task<IResult> UpdateProduct(IProductService service, Product product)
    {
        var updatedProduct = await service.UpdateProductAsync(product);
        return updatedProduct is null ? Results.NotFound() : Results.Ok(updatedProduct);
    }
    
    private static async Task<IResult> DeleteProduct(IProductService service, Guid id)
    {
        var product = await service.DeleteProductAsync(id);
        return product is null ? Results.NotFound() : Results.Ok(product);
    }
}