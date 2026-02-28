using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MFWEBACCOUNTS;
using Microsoft.AspNetCore.Mvc;

namespace MFWEBAPP.Controllers
{
    [NoDirectAccess]
    public class ProductMastersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("addvendor")]
        public IActionResult AddVendor()
        {
            return View();
        }

        [HttpGet("addvendordetails")]
        public IActionResult AddVendorDetails()
        {
            return PartialView("AddVendorDetails");
        }

        [HttpGet("approveindent")]
        public IActionResult ApproveIndent()
        {
            return View();
        }

        [HttpGet("despatchintend")]
        public IActionResult DespatchIntend()
        {
            
            return View();
        }
        [HttpGet("returninward")]
        public IActionResult ReturnInward()
        {
            return View();
        }
        [HttpGet("paymentatbranch")]
        public IActionResult PaymentAtBranch()
        {
            return View();
        }
        [HttpGet("paymentatho")]
        public IActionResult PaymentAtHO()
        {
            return View();
        }
        [HttpGet("paymentbranchdmapproval")]
        public IActionResult PaymentBranchDMApproval()
        {
            return View();
        }
        [HttpGet("approvalfromDM")]
        public IActionResult ApprovalFromDM()
        {
            return View();
        }
        [HttpGet("CouriersendtoHo")]
        public IActionResult CouriersendtoHo()
        {
            return View();
        }
        [HttpGet("CourierUpdations")]
        public IActionResult CourierUpdation()
        {
            return View();
        }
        [HttpGet("RatificationAtAccounts")]
        public IActionResult RatificationAtAccounts()
        {
            return View();
        }
        [HttpGet("CourierRecieval")]
        public IActionResult CourierRecieval()
        {
            return View();
        }
        [HttpGet("ReJectResubmission")]
        public IActionResult ReJectResubmission()
        {
            return View();
        }
        [HttpGet("AccountsApproval")]
        public IActionResult AccountsApproval()
        {
            return View();
        }
        [HttpGet("BranchEntry")]
        public IActionResult BranchEntry()
        {
            return View();
        }
        [HttpGet("BranchEntryApproval")]
        public IActionResult BranchEntryApproval()
        {
            return View();
        }
        [HttpGet("InternalAuditObservation")]
        public IActionResult InternalAuditObservation()
        {
            return View();
        }
        [HttpGet("BMViewofAuditorRemarks")]
        public IActionResult BMViewofAuditorRemarks()
        {
            return View();
        }
        [HttpGet("BHRemarksToAuditor")]
        public IActionResult BHRemarksToAuditor()
        {
            return View();
        }
        [HttpGet("BMRecommendationAtPaymentratification")]
        public IActionResult BMRecommendationAtPaymentratification()
        {
            return View();
        }

        [HttpGet("TaxNoticeUpdation")]
        public IActionResult TaxNoticeUpdation()
        {
            return View();
        }
        [HttpGet("StatusUpdation")]
        public IActionResult StatusUpdation()
        {
            return View();
        }

        [HttpGet("TTRequest")]
        public IActionResult TTRequest()
        {
            return View();
        }
        [HttpGet("TTRequestApprove")]
        public IActionResult TTRequestApprove()
        {
            return View();
        }
        [HttpGet("RequestByHeadOperations")]
        public IActionResult RequestByHeadOperations()
        {
            return View();
        }
        [HttpGet("ApprovalByHeadFinanceAccounts")]
        public IActionResult ApprovalByHeadFinanceAccounts()
        {
            return View();
        }
        [HttpGet("OverSightVerificationInPaymentRat")]
        public IActionResult OverSightVerificationInPaymentRat()
        {
            return View();
        }
        [HttpGet("ShiftChange")]
        public IActionResult ShiftChange()
        {
            return View();
        }

        //[HttpGet("MenuAssign")]
        //public IActionResult MenuAssign()
        //{
        //    return View();
        //}
        [HttpGet("AddNewExpenseHead")]
        public IActionResult AddNewExpenseHead()
        {
            return View();
        }
        [HttpGet("NewExpenseApproval")]
        public IActionResult NewExpenseApproval()
        {
            return View();
        }

        [HttpGet("ResubmitExpense")]
        public IActionResult ResubmitExpense()
        {
            return View();
        }

        [HttpGet("ExpenseBranchMap")]
        public IActionResult ExpenseBranchMap()
        {
            return View();
        }
        [HttpGet("StaffBalanceRecovery")]
        public IActionResult StaffBalanceRecovery()
        {
            return View();
        }
        [HttpGet("DenominationCash")]
        public IActionResult DenominationCash()
        {
            return View();
        }
        [HttpGet("BranchOperatingExpense")]
        public IActionResult BranchOperatingExpense()
        {
            return View();
        }

        [HttpGet("BranchOperationalClaims")]
        public IActionResult BranchOperationalClaims()
        {
            return View();
        }

        [HttpGet("OperationalResubmission")]
        public IActionResult OperationalResubmission()
        {
            return View();
        }


    }
}