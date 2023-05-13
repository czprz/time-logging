using Asp.Versioning.Builder;
using Microsoft.AspNetCore.Mvc;
using TimeLogging.Endpoints.Models;
using TimeLogging.Services;

namespace TimeLogging.Endpoints;

public static class RecordEndpoints
{
    public static void AddRecordEndpoints(this WebApplication app, ApiVersionSet apiVersionSet)
    {
        app.MapGet("records", GetRecords)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1)
            .CacheOutput("expires5s");
        app.MapGet("records/{id}", GetRecord)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1)
            .CacheOutput("expires5s");
        app.MapGet("records", GetRecordsByDate)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1)
            .CacheOutput("expires5s");
        app.MapPost("records", CreateRecord)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1);
        app.MapPut("records", UpdateRecord)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1);
        app.MapDelete("records/{id}", DeleteRecord)
            .WithApiVersionSet(apiVersionSet)
            .MapToApiVersion(1);
    }

    private static async Task<IResult> GetRecord(IRecordService recordService, Guid id)
    {
        var record = await recordService.GetRecordAsync(id);
        return record is null ? Results.NotFound() : Results.Ok(record);
    }

    private static async Task<IResult> GetRecords(IRecordService recordService)
    {
        var records = await recordService.GetRecordsAsync();
        return records.Count == 0 ? Results.NotFound() : Results.Ok(records);
    }

    // TODO: Test if this works
    private static async Task<IResult> GetRecordsByDate(IRecordService recordService, [FromQuery] DateTime from, [FromQuery] DateTime to)
    {
        var records = await recordService.GetRecordsAsync(from, to);
        return records.Count == 0 ? Results.NotFound() : Results.Ok(records);
    }

    private static async Task<IResult> CreateRecord(IRecordService recordService, Record record)
    {
        var createdRecord = await recordService.CreateRecordAsync(record);
        return Results.Created($"/records/{createdRecord.Id}", createdRecord);
    }

    private static async Task<IResult> UpdateRecord(IRecordService recordService, Record record)
    {
        var updatedRecord = await recordService.UpdateRecordAsync(record);
        return updatedRecord is null ? Results.NotFound() : Results.Ok(updatedRecord);
    }

    private static async Task<IResult> DeleteRecord(IRecordService recordService, Guid id)
    {
        var record = await recordService.DeleteRecordAsync(id);
        return record is null ? Results.NotFound() : Results.Ok(record);
    }
}