using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MFWEBACCOUNTS;
using Microsoft.AspNetCore.Mvc;

namespace MFWEBAPP.Controllers
{
    [NoDirectAccess]
    public class DashBaordController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("dashbaord")]
        public IActionResult DashBaord()
        {
            return View();
        }

        [HttpGet("vendordashboard")]
        public IActionResult VendorDashBoard()
        {
            return View();
        }

    }
}