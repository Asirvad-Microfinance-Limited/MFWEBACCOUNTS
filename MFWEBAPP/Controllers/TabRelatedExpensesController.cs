using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MFWEBACCOUNTS.Controllers
{
    public class TabRelatedExpensesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet("tabrelatedexpense")]
        public IActionResult tabrelatedexpense()
        {
            return View();
        }
        [HttpGet("tabrelatedexpenseview")]
        public IActionResult tabrelatedexpenseview()
        {
            return View();
        }
    }
}