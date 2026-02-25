using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MFWEBACCOUNTS.Controllers
{
    public class statementofAccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("statementofaccount")]
        public IActionResult StatementOfAccount()
        {
            return View();
        }
    }
}