using Serenity;
using System.Html;

namespace Serene1
{
    public static class ScriptInitialization
    {
        static ScriptInitialization()
        {
            Q.Config.RootNamespaces.Add("Serene1");
        }
    }
}