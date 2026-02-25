using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Config;
using DTO.Response;
using MFWEBAPP.Models;
using Microsoft.AspNetCore.Mvc;
using MFWEBAPP.Models.EquifaxReport;
using MFWEBACCOUNTS;

namespace MFWEBAPP.Controllers
{
    [NoDirectAccess]
    public class ReportingController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("pendingreport")]
        public IActionResult PendngReport()
        {
            return View();
        }

        [HttpGet("pendingreportbranch")]
        public IActionResult PendngReportBranch()
        {
            return View();
        }

        [HttpGet("pendingreportcenterwise")]
        public IActionResult PendingReportCenterWise()
        {
            return View();
        }

        //[HttpGet("criffreport/{RecordingId}/{CollectionName}/{FileType}/{authToken}")]
        [HttpGet("criffreport")]
        public IActionResult CriffReport(string RecordingId = "", string CollectionName = "", string FileType = "", string authToken = "")
        {
            
            //CriffReportRequest criffReportRequest = new CriffReportRequest();
            //CriffReportResponse criffReportResponse = new CriffReportResponse();
            ////NOCApprovalModel nocApprovalModel = new NOCApprovalModel();
            //criffReportRequest.recordingId = RecordingId;
            //criffReportRequest.collectionName = CollectionName;
            //criffReportRequest.fileType = FileType;
            //string urls = "https://mac.mactech.net.in/mfpubliclosapi/api/loans/imagestring";
            //criffReportResponse = new Manager().InvokePostHttpClient<Response<CriffReportResponse>, CriffReportRequest>(criffReportRequest, urls, authToken).Item1.Data;
            ////string base64String = Convert.ToBase64String(imageResponse.imageString, 0, imageResponse.imageString.Length);
            ////nocApprovalModel.base64Image = base64String.ToString();
            ////nocApprovalModel.imageString = imageResponse.imageString;

            return View();

        }
        [HttpGet("summarizedreport")]
        public IActionResult SummarizedReport()
        {
            return View();
        }

        [HttpGet("getcbreport")]
        public IActionResult GetCbReport(long ReportType = 0, string ParamsData = "")
        {
           
            return View();
            
        }
        [HttpGet("getequfaxcibildeatails/{customerId}/{authToken}")]
        public IActionResult GetEqufaxCibilDeatails(string customerId = "",string authToken="")
        {
          
            AppConfigManager AppConfigManager = new AppConfigManager();
            EquifaxModel EquifaxModel = new EquifaxModel();

            CibilEquifaxReportRequest CibilEquifaxReportRequest = new CibilEquifaxReportRequest();
            EquifaxResponse EquifaxResponse = new EquifaxResponse();
          
            CibilEquifaxReportRequest.cibilId = customerId;
            EquifaxResponse = new Manager().InvokePostHttpClient<Response<EquifaxResponse>, CibilEquifaxReportRequest>(CibilEquifaxReportRequest, AppConfigManager.getPublicLosApi + "api/cibil/cibilequifaxreport", authToken).Item1.Data;

            if (EquifaxResponse!=null) {
                EquifaxModel.temperaturesInquiryRequestInfo = EquifaxResponse.InquiryRequestInfo;
                EquifaxModel.temperaturesInquiryResponseHeader = EquifaxResponse.InquiryResponseHeader;
                EquifaxModel.ccrResponse = EquifaxResponse.CcrResponse;

                var cntvar = EquifaxResponse.CcrResponse.CirReportDataLst[0].CirReportData.MicrofinanceAccountDetails.Count;

                var cntmfiaddr = EquifaxResponse.CcrResponse.CirReportDataLst[0].CirReportData.MicrofinanceAccountDetails[0].AdditionalMfiDetails.MfiAddress.Count;
                var addressinforcnt = EquifaxResponse.CcrResponse.CirReportDataLst[0].CirReportData.IdAndContactInfo.AddressInfo.Count;
                var panideinforcnt = EquifaxResponse.CcrResponse.CirReportDataLst[0].CirReportData.IdAndContactInfo.IdentityInfo.PanId.Count;
                var otherideinforcnt = EquifaxResponse.CcrResponse.CirReportDataLst[0].CirReportData.IdAndContactInfo.IdentityInfo.OtherId.Count;
                var history24Monthscnt = EquifaxResponse.CcrResponse.CirReportDataLst[0].CirReportData.MicrofinanceAccountDetails[0].History24Months.Count;
                var enquiriescnt = EquifaxResponse.CcrResponse.CirReportDataLst[0].CirReportData.Enquiries.Count;
                var incomedetailscnt = EquifaxResponse.CcrResponse.CirReportDataLst[0].CirReportData.IncomeDetails.Count;

                EquifaxModel.MicrofinanceAccountDetailsCount = cntvar;
                EquifaxModel.MFIAddressCount = cntmfiaddr;
                EquifaxModel.AddrInfoCount = addressinforcnt;
                EquifaxModel.PanIdInfoCount = panideinforcnt;
                EquifaxModel.OtherIdInfoCount = otherideinforcnt;
                EquifaxModel.History24MonthsCount = history24Monthscnt;
                EquifaxModel.EnqCount = enquiriescnt;
                EquifaxModel.IncomeDtlsCount = incomedetailscnt;

                return View("GetEqufaxCibilDeatails", EquifaxModel);
            }
            else
            {
                return View("GetEqufaxCibilDeatailsNoDataFound");
            }

        }

        [HttpGet("microreports")]
        public IActionResult MicroReports()
        {

            return View();

        }

        [HttpGet("customerstatementreport")]
        public IActionResult CustomerStatementReport()
        {

            return View();

        }

        [HttpGet("punchingreport")]
        public IActionResult PendingReports()
        {

            return View();

        }

        [HttpGet("reports")]
        public IActionResult Reports()
        {

            return View();

        }
        [HttpGet("Paystatusrep")]
        public IActionResult Paystatusrep()
        {

            return View();

        }
        //[HttpGet("paymentreports")]
        //public IActionResult PaymentReports()
        //{

        //    return View();

        //}
    }

}