using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AngularEx.Startup))]
namespace AngularEx
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
