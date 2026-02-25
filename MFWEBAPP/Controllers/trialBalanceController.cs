using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MFWEBACCOUNTS.Controllers
{
    public class TrialBalanceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("trialbalance")]
        public IActionResult TrialBalance()
        {
            return View();
        }
    }
}