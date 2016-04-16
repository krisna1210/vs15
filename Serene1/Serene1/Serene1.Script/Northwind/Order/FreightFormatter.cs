
namespace Serene1.Northwind
{
    using Serenity;

    public class FreightFormatter : ISlickFormatter
    {
        public string Format(SlickFormatterContext ctx)
        {
            return "<span class='freight-symbol'>" +
                Q.HtmlEncode(ctx.Value) +
                "</span>";
        }
    }
}