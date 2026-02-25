using Microsoft.AspNetCore.Mvc;
using MFWEBACCOUNTS.Models.SuspenseVoucher;
using DTO.MFACCOUNTS.Response;
using DTO.Response;
using Config;
using System;

namespace MFWEBACCOUNTS.Controllers
{
    public class EmployeeAdvanceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("suspensepayment")]
        public IActionResult SuspensePayment()
        {
            return View();
        }
        [HttpGet("staffdeductionextentrequest")]
        public IActionResult StaffDeductionExtentRequest()
        {
            return View();
        }
        [HttpGet("reversalrequestcancel")]
        public IActionResult ReversalRequestCancel()
        {
            return View();
        }

        [HttpGet("suspensepaymentho")]
        public IActionResult suspensepaymentHo()
        {
            return View();
        }


        [HttpGet("suspensepaymentrecommend")]
        public IActionResult suspensepaymentRecommend()
        {
            return View();
        }
        [HttpGet("suspensepaymentvoucher")]
        public IActionResult suspensepaymentvoucher()
        {
            return View();
        }

        //[HttpGet("ServiceFeeInvoicePrint/{Flag1}/{Flag2}/{datas}/{data}/{authToken}")]
        [HttpGet("VoucherDetailsPrint/{Flag1}/{Flag2}/{branch}/{transno}/{authToken}")]
        //public IActionResult ServiceFeeInvoicePrint(string Flag1 = "", string Flag2 = "", string datas = "", string data = "", string authToken = "")
        public IActionResult VoucherDetailsPrint(string Flag1 = "", string Flag2 = "", string branch = "", string transno = "", string param1 = "", string authToken = "")
        {
            //string input2 = ToDate + "@@" + deal;

            SuspenseModel suspenseModel = new SuspenseModel();
            SuspenseViewDetails suspenseViewDetails = new SuspenseViewDetails();
            SuspenseResponse suspenseResponse = new SuspenseResponse();
            SuspenseRequest suspenseRequest = new SuspenseRequest();
            suspenseRequest.flag1 = Flag1;
            suspenseRequest.flag2 = Flag2;
            suspenseRequest.inptvar1 = branch;
            suspenseRequest.inptvar2 = transno;




            AppConfigManager AppConfigManager = new AppConfigManager();
            suspenseResponse = new Manager().InvokePostHttpClient<Response<SuspenseResponse>, SuspenseRequest>(suspenseRequest, AppConfigManager.getPublicAccountsApi + "/api/EmployeeSuspenseAdvance/SuspenseQueries", authToken).Item1.Data;
            //suspenseResponse.queryResult[0].TotalAmtText =suspenseResponse.queryResult[0].param2.Split("#")[3] + suspenseResponse.queryResult[1].param2.Split("#")[3];
            //serviceFeeResponse.queryResult[0].fromdate = FromDate.ToString();
            //suspenseResponse.queryResult[0].todate = ToDate.ToString();
            suspenseResponse.queryResult[0].BranchID = branch.ToString();


            //var reivsedInvoice = serviceFeeResponse.queryResult[0].param1.Split("^")[1];
            //if (reivsedInvoice == "")
            //{
            return View("suspensepaymentvoucher", suspenseResponse);
            //}
            //else
            //{
            //    return View("ServicefeeRevisedinvoice", serviceFeeResponse);
            //}



        }

    }
}
