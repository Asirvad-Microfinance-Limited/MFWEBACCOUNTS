using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MFWEBACCOUNTS.Controllers
{
    public class customerStatementController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("customerstatement")]
        public IActionResult CustomerStatement()
        {
            return View();
        }
    }
}