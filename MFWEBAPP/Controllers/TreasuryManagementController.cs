using MFWEBACCOUNTS;
using Microsoft.AspNetCore.Mvc;

namespace MFACCOUNTSWEB.Controllers
{
   [NoDirectAccess]
    public class TreasuryManagementController : Controller
    {


        //[HttpGet("FiRequest")]
        //public IActionResult FiRequest()
        //{
        //    return View();
        //}
        [HttpGet("ApproveFI")]
        public IActionResult ApproveFI()
        {
            return View();
        }
        [HttpGet("NewFI")]
        public IActionResult NewFI()
        {
            return View();
        }
        [HttpGet("NewFund")]
        public IActionResult NewFund()
        {
            return View();
        }
      
        [HttpGet("FundTransferLetterPrint")]
        public IActionResult FundTransferLetterPrint()
        {
            return View();
        }
       
        [HttpGet("ApproveNewFund")]
        public IActionResult ApproveNewFund()
        {
            return View();
        }
        
        [HttpGet("DepositWithBankReq")]
        public IActionResult DepositWithBankReq()
        {
            return View();
        }
        [HttpGet("DepositWithBankApproval")]
        public IActionResult DepositWithBankApproval()
        {
            return View();
        }
        [HttpGet("DepositWithBankRenewalApproval")]
        public IActionResult DepositWithBankRenewalApproval()
        {
            return View();
        }
        [HttpGet("DepositWithBankUpdate")]
        public IActionResult DepositWithBankUpdate()
        {
            return View();
        }
        [HttpGet("DepositWithBankRenewal")]
        public IActionResult DepositWithBankRenewal()
        {
            return View();
        }
        [HttpGet("DepositWithBankClosure")]
        public IActionResult DepositWithBankClosure()
        {
            return View();
        }


        [HttpGet("NcdBondRepaymentAprv")]
        public IActionResult NcdBondRepaymentAprv()
        {
            return View();
        }
        [HttpGet("NcdBondRepayment")]
        public IActionResult NcdBondRepayment()
        {
            return View();
        }
        [HttpGet("ncd_individual_details")]
        public IActionResult ncd_individual_details()
        {
            return View();
        }

        [HttpGet("ApproveNcdBondAvailment")]
        public IActionResult ApproveNcdBondAvailment()
        {
            return View();
        }

        [HttpGet("NCDBondAvailment")]
        public IActionResult NCDBondAvailment()
        {
            return View();
        }
        [HttpGet("ProcFeeNew")]
        public IActionResult ProcFeeNew()
        {
            return View();
        }
        [HttpGet("OtherCharges")]
        public IActionResult OtherCharges()
        {
            return View();
        }

        [HttpGet("DocumentationFee")]
        public IActionResult DocumentationFee()
        {
            return View();
        }

        [HttpGet("IpoNoc")]
        public IActionResult IpoNoc()
        {
            return View();
        }
        [HttpGet("BankCharges")]
        public IActionResult BankCharges()
        {
            return View();
        }
        [HttpGet("IntAccrualAuto")]
        public IActionResult IntAccrualAuto()
        {
            return View();
        }
        [HttpGet("FDIntAccrualAuto")]
        public IActionResult FDIntAccrualAuto()
        {
            return View();
        }
        [HttpGet("Re_intitiationRequest")]
        public IActionResult Re_intitiationRequest()
        {
            return View();
        }

        [HttpGet("Fund_Transfer_Request")]
        public IActionResult Fund_Transfer_Request()
        {
            return View();
        }
        [HttpGet("FundTransferApprove")]
        public IActionResult FundTransferApprove()
        {
            return View();
        }

        [HttpGet("LoanRepayment")]
        public IActionResult LoanRepayment()
        {
            return View();
        }

        [HttpGet("LoanRepaymentApr")]
        public IActionResult LoanRepaymentApr()
        {
            return View();
        }

        [HttpGet("LoanAvailment")]
        public IActionResult LoanAvailment()
        {
            return View();
        }
        [HttpGet("ApproveLoanAvailment")]
        public IActionResult ApproveLoanAvailment()
        {
            return View();
        }

        [HttpGet("FunderExposure")]
        public IActionResult FunderExposure()
        {
            return View();
        }
        [HttpGet("FunderExpApprv")]
        public IActionResult FunderExpApprv()
        {
            return View();
        }


        [HttpGet("Change_Int_Rate_maker")]
        public IActionResult Change_Int_Rate_maker()
        {
            return View();
        }
        [HttpGet("Change_Interest_Rate")]
        public IActionResult Change_Interest_Rate()
        {
            return View();
        }
        [HttpGet("PreClosure")]
        public IActionResult PreClosure()
        {
            return View();
        }

        [HttpGet("Int_Accrual_posting")]
        public IActionResult Int_Accrual_posting()
        {
            return View();
        }

        [HttpGet("principleInterestEntry")]
        public IActionResult principleInterestEntry()
        {
            return View();
        }

	     [HttpGet("FdIntAccrualApprove")]
	     public IActionResult FdIntAccrualApprove()
	     {
         return View();
	     }

	     [HttpGet("FdIntAccrualRequest")]
	     public IActionResult FdIntAccrualRequest()
 	     {
         return View();
 	     }

        [HttpGet("DebenturePayment")]
        public IActionResult DebenturePayment()
        {
            return View();
        }

        [HttpGet("BankDetails")]
        public IActionResult BankDetails()
        {
            return View();
        }

        [HttpGet("InterestRateMasterReport")]
        public IActionResult InterestRateMasterReport()
        {
            return View();
        }

        [HttpGet("FD_Register")]
        public IActionResult FD_Register()
        {
            return View();
        }

        [HttpGet("Loanpaymentchecker")]
        public IActionResult Loanpaymentchecker()
        {
            return View();
        }
        [HttpGet("NCDBondRePaymentmaker")]
        public IActionResult NCDBondRePaymentmaker()
        {
            return View();
        }

        [HttpGet("NCD_BondRePayment_Approvechecker")]
        public IActionResult NCD_BondRePayment_Approvechecker()
        {
            return View();
        }
        [HttpGet("DebentureRepayment_Approve")]
        public IActionResult DebentureRepayment_Approve()
        {
            return View();
        }
        [HttpGet("PaymentReversal")]
        public IActionResult PaymentReversal()
        {
            return View();
        }


    }
}
