using System.Web;
using System.Web.Optimization;

namespace AngularEx
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css").Include(
         
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/AwesomeAngularMVCApp")
                    .IncludeDirectory("~/Scripts/Controllers", "*.js")
                    .IncludeDirectory("~/Scripts/Factories", "*.js")
                    .Include("~/Scripts/AngularMVCApp.js"));

            BundleTable.EnableOptimizations = true;
        }
    }
}
