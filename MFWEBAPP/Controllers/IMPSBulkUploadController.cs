using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MFWEBACCOUNTS.Controllers
{
    public class IMPSBulkUploadController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet("impsbulkupload")]
        public IActionResult IMPSBulkUpload()
        {
            return View();
        }
        [HttpGet("CreditInBankUpload")]
        public IActionResult CreditInBankUpload()
        {
            return View();
        }
        [HttpGet("DebitInBankUpload")]
        public IActionResult DebitInBankUpload()
        {
            return View();
        }
        [HttpGet("CreditInBankAprove")]
        public IActionResult CreditInBankAprove()
        {
            return View();
        }
        [HttpGet("DebitInBankAprove")]
        public IActionResult DebitInBankAprove()
        {
            return View();
        }
    }
}