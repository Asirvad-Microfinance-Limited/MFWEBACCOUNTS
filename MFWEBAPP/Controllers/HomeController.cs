using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MFWEBAPP.Models;
using Microsoft.AspNetCore.Hosting;
using MFWEBACCOUNTS;

namespace MFWEBAPP.Controllers
{
   
    public class HomeController : Controller
    {
        [Obsolete]
        private readonly IHostingEnvironment _hostingEnvironment;

        [Obsolete]
        public HomeController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

      
        public IActionResult Login()
        {
           // ViewData["Message"] = "Your application description page.";

            return View();
        }


        [HttpGet("dashboard")]
        public IActionResult Dashboard()
        {
            return View();
        }
        [HttpGet("changepassword")]
        public IActionResult Changepassword()
        {
            return View();
        }
        [HttpGet("forgetpassword")]
        public IActionResult ForgetPassword()
        {
            return View();
        }

        [HttpGet("accessdenied")]
        public IActionResult AccessDenied()
        {
            return View();
        }
        //public IActionResult Index()
        //{
        //    return View();
        //}

        //public IActionResult Privacy()
        //{
        //    return View();
        //}

        //[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        //public IActionResult Error()
        //{
        //    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        //}

    }
}
