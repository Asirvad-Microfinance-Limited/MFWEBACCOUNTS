using Microsoft.AspNetCore.Mvc;

namespace MFWEBACCOUNTS.Controllers
{
    public class AccountsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet("AccountCreation")]
        public IActionResult AccountCreation()
        {
            return View();
        }
        [HttpGet("AccountApprovalOrReject")]
        public IActionResult AccountApprovalOrReject()
        {
            return View();
        }
        [HttpGet("BalanceSheet")]
        public IActionResult BalanceSheet()
        {
            return View();
        }
        [HttpGet("ProfitAndLoss")]
        public IActionResult ProfitAndLoss()
        {
            return View();
        }

        [HttpGet("AccountAdjustments")]
        public IActionResult AccountAdjustments()
        {
            return View();
        }

    }
}
