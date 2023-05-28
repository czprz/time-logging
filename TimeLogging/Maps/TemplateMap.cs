using Google.Protobuf.WellKnownTypes;
using TimeLogging.Endpoints.Models;

namespace TimeLogging.Maps;

public class TemplateMap : ITemplateMap
{
    public Template? Map(gRPC.Template.Template? template)
    {
        if (template == null)
        {
            return null;
        }
        
        return new()
        {
            Id = template.Id,
            Name = template.Name,
            Description = template.Description,
            Items = template.Items.Select(item => new TemplateItem
            {
                Id = item.Id,
                TemplateId = item.TemplateId,
                CodeId = item.CodeId,
                Day = ConvertDayOfWeek(item.Day),
                Time = item.Duration.ToTimeSpan()
            }).ToList()
        };
    }

    public gRPC.Template.Template Map(Template template)
    {
        return new()
        {
            Id = template.Id,
            Name = template.Name,
            Description = template.Description,
            Items =
            {
                template.Items.Select(item => new gRPC.Template.TemplateItem
                {
                    Id = item.Id,
                    TemplateId = item.TemplateId,
                    CodeId = item.CodeId,
                    Day = ConvertDayOfWeek(item.Day),
                    Duration = item.Time.ToDuration()
                })
            }
        };
    }

    private static DayOfWeek ConvertDayOfWeek(gRPC.Template.Day day)
    {
        return day switch
        {
            gRPC.Template.Day.Monday => DayOfWeek.Monday,
            gRPC.Template.Day.Tuesday => DayOfWeek.Tuesday,
            gRPC.Template.Day.Wednesday => DayOfWeek.Wednesday,
            gRPC.Template.Day.Thursday => DayOfWeek.Thursday,
            gRPC.Template.Day.Friday => DayOfWeek.Friday,
            gRPC.Template.Day.Saturday => DayOfWeek.Saturday,
            gRPC.Template.Day.Sunday => DayOfWeek.Sunday,
            _ => throw new ArgumentOutOfRangeException(nameof(day), day, null)
        };
    }
    
    private static gRPC.Template.Day ConvertDayOfWeek(DayOfWeek day)
    {
        return day switch
        {
            DayOfWeek.Monday => gRPC.Template.Day.Monday,
            DayOfWeek.Tuesday => gRPC.Template.Day.Tuesday,
            DayOfWeek.Wednesday => gRPC.Template.Day.Wednesday,
            DayOfWeek.Thursday => gRPC.Template.Day.Thursday,
            DayOfWeek.Friday => gRPC.Template.Day.Friday,
            DayOfWeek.Saturday => gRPC.Template.Day.Saturday,
            DayOfWeek.Sunday => gRPC.Template.Day.Sunday,
            _ => throw new ArgumentOutOfRangeException(nameof(day), day, null)
        };
    }
}