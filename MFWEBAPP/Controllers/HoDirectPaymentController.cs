using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MFWEBACCOUNTS.Controllers
{
    [NoDirectAccess]
    public class HoDirectPaymentController : Controller
    {
     
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("HoDirectPayment")]
        public IActionResult HoDirectPayment()
        {
            return View();
        }

        [HttpGet("HoDirectPaymentCfo")]
        public IActionResult HoDirectPaymentCfo()
        {
            return View();
        }

        [HttpGet("HoDirectPaymentApproval")]
        public IActionResult HoDirectPaymentApproval()
        {
            return View();
        }

        [HttpGet("MdApproval")]
        public IActionResult MdApproval()
        {
            return View();
        }

        [HttpGet("HoRejectResubmission")]
        public IActionResult HoRejectResubmission()
        {
            return View();
        }

        [HttpGet("HoPaymentReinitiate")]
        public IActionResult HoPaymentReinitiate()
        {
            return View();
        }

        //[HttpGet("HoAddExpense")]
        //public IActionResult HoAddExpense()
        //{
        //    return View();
        //}
        [HttpGet("AddNewExpense")]
        public IActionResult AddNewExpense()
        {
            return View();
        }


        [HttpGet("HoExistingEntry")]
        public IActionResult HoExistingEntry()
        {
            return View();
        }


    }
}