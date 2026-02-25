using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace MFWEBAPP
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        string[] corsOrigin = { "http://amfluat.macom.in", "https://localhost:44396/", "https://apps.asirvad.com/" };



        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        //rohini coment//
        {

            //services.AddCors(options =>
            //{
            //    options.AddPolicy(name: MyAllowSpecificOrigins,
            //                        builder =>
            //                        {


            //                            builder.WithOrigins(corsOrigin)
            //                            .AllowAnyMethod()
            //                            .AllowAnyHeader();
            //                        });
            //});

            //corspolicy added//
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins",
                    builder => builder.WithOrigins( "https://amfluat.macom.in/NewMFPublicAccountsAPI/NewMFPubAccountsAPI/", "https://amfluat.macom.in/AccountsAPI/NewTreasurypubAPI/") // UAT & Live
                                      .SetIsOriginAllowed(origin =>
                                          new Uri(origin).Host == "localhost" ||
                                          new Uri(origin).Host == "amfluat.macom.in" ||
                                          new Uri(origin).Host == "apps.asirvad.com")
                                      .AllowAnyMethod()
                                      .AllowAnyHeader()
                                      .AllowCredentials());
            });




            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });



            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddControllersWithViews().AddRazorRuntimeCompilation();
        }



        //{


        //    services.Configure<CookiePolicyOptions>(options =>
        //    {
        //        // This lambda determines whether user consent for non-essential cookies is needed for a given request.
        //        options.CheckConsentNeeded = context => true;
        //        options.MinimumSameSitePolicy = SameSiteMode.None;
        //    });



        //    //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        //    services.AddControllersWithViews().AddRazorRuntimeCompilation();
        //}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
               // app.UseHsts();
            }
            app.UseMiddleware<HstsMiddleware>();
            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.Use((context, next) =>
            {
                context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
                context.Response.Headers.Append("Cross-Origin-Resource-Policy", "same-origin");
                context.Response.Headers.Append("Cross-Origin-Opener-Policy", "same-origin");
                context.Response.Headers.Append("Cross-Origin-Embedder-Policy", "require-corp");
                context.Response.Headers.Append("Permissions-Policy", "fullscreen=(self), geolocation=(self)");
                context.Response.Headers.Append("Content-Security-Policy", "default-src *; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src *; img-src * data:; style-src * 'unsafe-inline';");
                context.Response.Headers.Append("Strict-Transport-Security", "max-age=31536000");
                //context.Response.Headers.Append(
                //     "Content-Security-Policy",
                //    "default-src 'self'; "
                //         + "base-uri 'none'; "
                //        + "script-src 'self'  'unsafe-eval' 'unsafe-inline'; "
                //         + "style-src 'self'  'unsafe-eval' 'unsafe-inline' https://fonts.googleapis.com; "
                //         + "img-src 'self' data:; "
                //       + "font-src 'self' https://fonts.gstatic.com; "
                //        + "connect-src  https://amfluat.macom.in/NewAccountsWeb/  https://apps.asirvad.com/amfltms_payrat; "
                //         + "object-src 'none'; "
                //         + "frame-ancestors 'none'; "
                //         + "form-action 'self'; "
                //         + "upgrade-insecure-requests;"
                // );
                context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
                context.Response.Headers.Append("Cache-Control", "no-cache, no-store, must-revalidate");
                context.Response.Headers.Append("Pragma", "no-cache");
                context.Response.Headers.Append("Expires", "0");
                context.Response.Headers.Append("X-Frame-Options", "SAMEORIGIN");
                context.Response.Headers.Remove("X-Powered-By");
                context.Response.Headers.Remove("X-AspNet-Version");
                return next();
            });



            app.UseCors(MyAllowSpecificOrigins);
            //app.UseHttpsRedirection();
            //parameter validation
            //app.UseMiddleware<ParameterValidation>();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseRouting();
            //app.UseCors("AllowSpecificOrigins"); // CORS



            //app.UseMvc(routes =>
            //{
            //    routes.MapRoute(
            //        name: "default",
            //        template: "{controller=Home}/{action=Login}/{id?}");
            //});

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("Default", "{controller=Home}/{action=Login}/{id?}");
            });
        }
    }
}
