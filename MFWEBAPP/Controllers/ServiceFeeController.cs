using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MFWEBACCOUNTS.Models.ServiceFee;
using DTO.Response;
using Config;
using DTO.MFACCOUNTS.Response;

namespace MFWEBACCOUNTS.Controllers
{
    [NoDirectAccess]
    public class ServiceFeeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("AddVendorFee")]
        public IActionResult AddVendorFee()
        {
            return View();
        }
        [HttpGet("InvoiceEntry")]
        public IActionResult InvoiceEntry()
        {
            return View();
        }
        [HttpGet("PrintInvoice")]
        public IActionResult PrintInvoice()
        {
            return View();
        }
        [HttpGet("InvoiceReceipt")]
        public IActionResult InvoiceReceipt()
        {
            return View();
        }
        [HttpGet("CreditNotePrint")]
        public IActionResult CreditNotePrint()
        {
            return View();
        }
        [HttpGet("Invoice2")]
        public IActionResult Invoice2()
        {
            return View();
        }
        [HttpGet("Invoice3")]
        public IActionResult Invoice3()
        {
            return View();
        }
        [HttpGet("CreditNoteEntry")]
        public IActionResult CreditNoteEntry()
        {
            return View();
        }


        //[HttpGet("ServiceFeeInvoicePrint/{Flag1}/{Flag2}/{datas}/{data}/{authToken}")]
        [HttpGet("ServiceFeeInvoicePrint/{Flag1}/{Flag2}/{ToDate}/{vendor}/{deal}/{authToken}")]
        //public IActionResult ServiceFeeInvoicePrint(string Flag1 = "", string Flag2 = "", string datas = "", string data = "", string authToken = "")
        public IActionResult ServiceFeeInvoicePrint(string Flag1 = "", string Flag2 = "",string ToDate = "",string vendor = "", string deal = "", string param1 = "", string authToken = "")
        {
            string input2 =ToDate +"@@"+ deal;

            ServiceFeeModel ServiceFeeModel = new ServiceFeeModel();
            ServiceFeeViewDetails serviceFeeData = new ServiceFeeViewDetails();
            ServiceFeeResponse serviceFeeResponse = new ServiceFeeResponse();
            ServiceFeeRequest serviceFeeRequest = new ServiceFeeRequest();
            serviceFeeRequest.flag1 = Flag1;
            serviceFeeRequest.flag2 = Flag2;
            serviceFeeRequest.inptvar1 = vendor;
            serviceFeeRequest.inptvar2 = input2;

            


            AppConfigManager AppConfigManager = new AppConfigManager();
            serviceFeeResponse = new Manager().InvokePostHttpClient<Response<ServiceFeeResponse>, ServiceFeeRequest>(serviceFeeRequest, AppConfigManager.getPublicAccountsApi + "/api/accounts/serivicefeedetails", authToken).Item1.Data;
            serviceFeeResponse.queryResult[0].TotalAmtText = ConvertNumbertoWords(Convert.ToInt64(serviceFeeResponse.queryResult[0].param4.Split("^")[2]));
            //serviceFeeResponse.queryResult[0].fromdate = FromDate.ToString();
            serviceFeeResponse.queryResult[0].todate = ToDate.ToString();
            serviceFeeResponse.queryResult[0].deal = deal.ToString();


            var reivsedInvoice = serviceFeeResponse.queryResult[0].param1.Split("^")[1] ;
            if (reivsedInvoice == "")
            {
                return View("ServiceFeeinvoice", serviceFeeResponse);
            }
            else
            {
                return View("ServicefeeRevisedinvoice", serviceFeeResponse);
            }

           
           
        }






        [HttpGet("CreditNotePrint/{Flag1}/{Flag2}/{ToDate}/{vendor}/{authToken}")]
        //public IActionResult ServiceFeeInvoicePrint(string Flag1 = "", string Flag2 = "", string datas = "", string data = "", string authToken = "")
        public IActionResult CreditNotePrint(string Flag1 = "", string Flag2 = "", string ToDate = "", string vendor = "", string param1 = "", string authToken = "")
        {
            string input2 =  ToDate ;

            ServiceFeeModel ServiceFeeModel = new ServiceFeeModel();
            ServiceFeeViewDetails serviceFeeData = new ServiceFeeViewDetails();
            ServiceFeeResponse serviceFeeResponse = new ServiceFeeResponse();
            ServiceFeeRequest serviceFeeRequest = new ServiceFeeRequest();
            serviceFeeRequest.flag1 = Flag1;
            serviceFeeRequest.flag2 = Flag2;
            serviceFeeRequest.inptvar1 = vendor;
            serviceFeeRequest.inptvar2 = input2;




            AppConfigManager AppConfigManager = new AppConfigManager();
            serviceFeeResponse = new Manager().InvokePostHttpClient<Response<ServiceFeeResponse>, ServiceFeeRequest>(serviceFeeRequest, AppConfigManager.getPublicAccountsApi + "/api/accounts/serivicefeedetails", authToken).Item1.Data;
            serviceFeeResponse.queryResult[0].TotalAmtText = ConvertNumbertoWords(Convert.ToInt64(serviceFeeResponse.queryResult[0].param1.Split("~")[12]));
            //serviceFeeResponse.queryResult[0].fromdate = FromDate.ToString();
            serviceFeeResponse.queryResult[0].todate = ToDate.ToString();


            //var reivsedInvoice = serviceFeeResponse.queryResult[0].param1.Split("-")[2] + '-' + serviceFeeResponse.queryResult[0].param1.Split("-")[3];
            //if (reivsedInvoice == "")
            //{
            return View("CreditNotePrint", serviceFeeResponse);
            //}
            //else
            //{
            //    return View("ServicefeeRevisedinvoice", serviceFeeResponse);
            //}



        }

        public static string ConvertNumbertoWords(long number)
        {
            if (number == 0) return "ZERO";
            if (number < 0) return "minus " + ConvertNumbertoWords(Math.Abs(number));
            string words = "";
            if ((number / 100000) > 0)
            {
                words += ConvertNumbertoWords(number / 100000) + " LAKHS ";
                number %= 1000000;
            }
            if ((number / 1000) > 0)
            {
                words += ConvertNumbertoWords(number / 1000) + " THOUSAND ";
                number %= 1000;
            }
            if ((number / 100) > 0)
            {
                words += ConvertNumbertoWords(number / 100) + " HUNDRED ";
                number %= 100;
            }
            //if ((number / 10) > 0)
            //{
            // words += ConvertNumbertoWords(number / 10) + " RUPEES ";
            // number %= 10;
            //}
            if (number > 0)
            {
                if (words != "") words += "AND ";
                var unitsMap = new[]
                {
            "ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN"
        };
                var tensMap = new[]
                {
            "ZERO", "TEN", "TWENTY", "THIRTY", "FORTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"
        };
                if (number < 20) words += unitsMap[number];
                else
                {
                    words += tensMap[number / 10];
                    if ((number % 10) > 0) words += " " + unitsMap[number % 10];
                }
            }
            return words;
        }

    }
}