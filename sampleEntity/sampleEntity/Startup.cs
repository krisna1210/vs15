using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(sampleEntity.Startup))]
namespace sampleEntity
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
