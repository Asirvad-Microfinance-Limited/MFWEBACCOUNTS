using Config;
using DTO.MFCustomerAPI.Data;
using DTO.MFLMSAPI.Data;
using DTO.MFLMSAPI.Request;
using DTO.MFLMSAPI.Response;
using DTO.MFLOSAPI.Data;
using DTO.MFLOSAPI.Request;
using DTO.Response;
using MFWEBAPP.Models;
using MFWEBAPP.Models.LoanCard;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace MFWEBAPP.Controllers
{
    public class LoanController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("generateloancard")]
        public IActionResult GenerateLoanCard()
        {
            return View();
        }

        [HttpGet("loancardprintpreview/{ApplicationId}/{MemberId}/{authToken}")]
        public IActionResult LoanCardPrintPreview(long ApplicationId = 0, string MemberId = "",string authToken = "")
        {
            GenerateLoanCardModel generateLoanCardModel = new GenerateLoanCardModel();
            LoanCardResponse loanCardResponse = new LoanCardResponse();
            LoanCardRequest loanCardRequest = new LoanCardRequest();
            LoanCardMemberData loanCardMemberData = new LoanCardMemberData();
            List<LoanCardLoanData> loanDetails = new List<LoanCardLoanData>();
            List<LoanCardInstallmentData> LoanInstallments = new List<LoanCardInstallmentData>();
            
            loanCardRequest.applicationId = ApplicationId;
            loanCardRequest.memberId = MemberId;
            AppConfigManager AppConfigManager = new AppConfigManager();
               //string urls = "https://mac.mactech.net.in/mfpubliclmsapi/api/loans/loancard";
               loanCardResponse = new Manager().InvokePostHttpClient<Response<LoanCardResponse>, LoanCardRequest>(loanCardRequest, AppConfigManager.getPublicLmsApi + "api/loans/loancard", authToken).Item1.Data;

            loanCardMemberData = loanCardResponse.memberDetails;
            loanDetails = loanCardResponse.loanDetails;
            LoanInstallments = loanCardResponse.LoanInstallments;
            var loanDtlCount = loanDetails.Count;
            var LoanDtlInstallments = LoanInstallments.Count;
            var LanguageReturn = "";
            string base64String = Convert.ToBase64String(loanCardResponse.imageString, 0, loanCardResponse.imageString.Length);
            //------------------------------------ model binding--------------------------------------------//

            //LoanCardMemberData
            generateLoanCardModel.customerImage = base64String;
            generateLoanCardModel.branchName = loanCardMemberData.branchName;
            generateLoanCardModel.centerId = loanCardMemberData.centerId;
            generateLoanCardModel.centerName = loanCardMemberData.centerName;
            generateLoanCardModel.memberId = loanCardMemberData.memberId;
            generateLoanCardModel.memberName = loanCardMemberData.memberName;
            generateLoanCardModel.fatHusName = loanCardMemberData.fatHusName;
            generateLoanCardModel.kycNo = loanCardMemberData.kycNo;
            generateLoanCardModel.mobileNumber = loanCardMemberData.mobileNumber;
            generateLoanCardModel.ifscCode = loanCardMemberData.ifscCode;
            generateLoanCardModel.accountNo = loanCardMemberData.accountNo;
            
            //LoanCardLoanData
            for (int i = 0; i <= loanDtlCount-1; i++)
            {
                if (i==0)
                {
                   
                    generateLoanCardModel.loanId = loanDetails[0].loanId;
                    generateLoanCardModel.loanDate = loanDetails[0].loanDate;
                    generateLoanCardModel.loanAmount = loanDetails[0].loanAmount;
                    generateLoanCardModel.interestRate = Math.Round(loanDetails[0].interestRate,2);
                    generateLoanCardModel.loanPurpose = loanDetails[0].loanPurpose;
                    generateLoanCardModel.cycle = loanDetails[0].cycle;
                    generateLoanCardModel.interestRate = Math.Round(loanDetails[0].interestRate,2);
                    generateLoanCardModel.noOfInstallment = loanDetails[0].noOfInstallment;
                    generateLoanCardModel.morotorium = loanDetails[0].morotorium;
                    generateLoanCardModel.repayMode = loanDetails[0].repayMode;
                    generateLoanCardModel.firstInstallment = loanDetails[0].firstInstallment;
                    generateLoanCardModel.lastInstallment = loanDetails[0].lastInstallment;
                    generateLoanCardModel.processingFee = loanDetails[0].processingFee;
                    generateLoanCardModel.insuranceAmount = loanDetails[0].insuranceAmount;
                    generateLoanCardModel.loandueDate = loanDetails[0].dueDate;
                    generateLoanCardModel.insuranceCompany = loanDetails[0].insuranceCompany;
                    generateLoanCardModel.loanTenure = loanDetails[0].loanTenure;
                }

                if (i==1)
                {
                    generateLoanCardModel.loanId1 = loanDetails[1].loanId;
                    generateLoanCardModel.loanDate1 = loanDetails[1].loanDate;
                    generateLoanCardModel.loanAmount1 = loanDetails[1].loanAmount;
                    generateLoanCardModel.interestRate1 = Math.Round(loanDetails[1].interestRate,2);
                    generateLoanCardModel.loanPurpose1 = loanDetails[1].loanPurpose;
                    generateLoanCardModel.cycle1 = loanDetails[1].cycle;
                    generateLoanCardModel.interestRate1 = Math.Round(loanDetails[1].interestRate,2);
                    generateLoanCardModel.noOfInstallment1 = loanDetails[1].noOfInstallment;
                    generateLoanCardModel.morotorium1 = loanDetails[1].morotorium;
                    generateLoanCardModel.repayMode1 = loanDetails[1].repayMode;
                    generateLoanCardModel.firstInstallment1 = loanDetails[1].firstInstallment;
                    generateLoanCardModel.lastInstallment1 = loanDetails[1].lastInstallment;
                    generateLoanCardModel.processingFee1 = loanDetails[1].processingFee;
                    generateLoanCardModel.insuranceAmount1 = loanDetails[1].insuranceAmount;
                    generateLoanCardModel.loandueDate1 = loanDetails[1].dueDate;
                    generateLoanCardModel.insuranceCompany1 = loanDetails[1].insuranceCompany;
                    generateLoanCardModel.loanTenure1 = loanDetails[1].loanTenure;
                }

                if (i==2)
                {
                    generateLoanCardModel.loanId2 = loanDetails[2].loanId;
                    generateLoanCardModel.loanDate2 = loanDetails[2].loanDate;
                    generateLoanCardModel.loanAmount2 = loanDetails[2].loanAmount;
                    generateLoanCardModel.interestRate2 = Math.Round(loanDetails[2].interestRate,2);
                    generateLoanCardModel.loanPurpose2 = loanDetails[2].loanPurpose;
                    generateLoanCardModel.cycle2 = loanDetails[2].cycle;
                    generateLoanCardModel.interestRate2 = Math.Round(loanDetails[2].interestRate,2);
                    generateLoanCardModel.noOfInstallment2 = loanDetails[2].noOfInstallment;
                    generateLoanCardModel.morotorium2 = loanDetails[2].morotorium;
                    generateLoanCardModel.repayMode2 = loanDetails[2].repayMode;
                    generateLoanCardModel.firstInstallment2 = loanDetails[2].firstInstallment;
                    generateLoanCardModel.lastInstallment2 = loanDetails[2].lastInstallment;
                    generateLoanCardModel.processingFee2 = loanDetails[2].processingFee;
                    generateLoanCardModel.insuranceAmount2 = loanDetails[2].insuranceAmount;
                    generateLoanCardModel.loandueDate2 = loanDetails[2].dueDate;
                    generateLoanCardModel.insuranceCompany2 = loanDetails[2].insuranceCompany;
                    generateLoanCardModel.loanTenure2 = loanDetails[2].loanTenure;
                }

                if (i==3)
                {
                    generateLoanCardModel.loanId3 = loanDetails[3].loanId;
                    generateLoanCardModel.loanDate3 = loanDetails[3].loanDate;
                    generateLoanCardModel.loanAmount3 = loanDetails[3].loanAmount;
                    generateLoanCardModel.interestRate3 = Math.Round(loanDetails[3].interestRate,2);
                    generateLoanCardModel.loanPurpose3 = loanDetails[3].loanPurpose;
                    generateLoanCardModel.cycle3 = loanDetails[3].cycle;
                    generateLoanCardModel.interestRate3 = Math.Round(loanDetails[3].interestRate,2);
                    generateLoanCardModel.noOfInstallment3 = loanDetails[3].noOfInstallment;
                    generateLoanCardModel.morotorium3 = loanDetails[3].morotorium;
                    generateLoanCardModel.repayMode3 = loanDetails[3].repayMode;
                    generateLoanCardModel.firstInstallment3 = loanDetails[3].firstInstallment;
                    generateLoanCardModel.lastInstallment3 = loanDetails[3].lastInstallment;
                    generateLoanCardModel.processingFee3 = loanDetails[3].processingFee;
                    generateLoanCardModel.insuranceAmount3 = loanDetails[3].insuranceAmount;
                    generateLoanCardModel.loandueDate3 = loanDetails[3].dueDate;
                    generateLoanCardModel.insuranceCompany3 = loanDetails[3].insuranceCompany;
                    generateLoanCardModel.loanTenure3 = loanDetails[3].loanTenure;
                }


            }


            for (int j = 0; j < LoanDtlInstallments; j++)
            {

                if (j==0)
                {
                    generateLoanCardModel.installmentNo = LoanInstallments[0].installmentNo;
                    generateLoanCardModel.dueDate = LoanInstallments[0].dueDate;
                    generateLoanCardModel.paidDate = LoanInstallments[0].paidDate;
                    generateLoanCardModel.emi = LoanInstallments[0].emi;
                    generateLoanCardModel.principleAmount = LoanInstallments[0].principleAmount;
                    generateLoanCardModel.interestAmount = LoanInstallments[0].interestAmount;
                    generateLoanCardModel.paidAmount = LoanInstallments[0].paidAmount;
                    generateLoanCardModel.balanceAmount = LoanInstallments[0].balanceAmount;
                }

                if (j==1)
                {
                    generateLoanCardModel.installmentNo1 = LoanInstallments[1].installmentNo;
                    generateLoanCardModel.dueDate1 = LoanInstallments[1].dueDate;
                    generateLoanCardModel.paidDate1 = LoanInstallments[1].paidDate;
                    generateLoanCardModel.emi1 = LoanInstallments[1].emi;
                    generateLoanCardModel.principleAmount1 = LoanInstallments[1].principleAmount;
                    generateLoanCardModel.interestAmount1 = LoanInstallments[1].interestAmount;
                    generateLoanCardModel.paidAmount1 = LoanInstallments[1].paidAmount;
                    generateLoanCardModel.balanceAmount1 = LoanInstallments[1].balanceAmount;
                }

                if (j==2)
                {
                    generateLoanCardModel.installmentNo2 = LoanInstallments[2].installmentNo;
                    generateLoanCardModel.dueDate2 = LoanInstallments[2].dueDate;
                    generateLoanCardModel.paidDate2 = LoanInstallments[2].paidDate;
                    generateLoanCardModel.emi2 = LoanInstallments[2].emi;
                    generateLoanCardModel.principleAmount2 = LoanInstallments[2].principleAmount;
                    generateLoanCardModel.interestAmount2 = LoanInstallments[2].interestAmount;
                    generateLoanCardModel.paidAmount2 = LoanInstallments[2].paidAmount;
                    generateLoanCardModel.balanceAmount2 = LoanInstallments[2].balanceAmount;
                }

                if (j==3)
                {
                    generateLoanCardModel.installmentNo3 = LoanInstallments[3].installmentNo;
                    generateLoanCardModel.dueDate3 = LoanInstallments[3].dueDate;
                    generateLoanCardModel.paidDate3 = LoanInstallments[3].paidDate;
                    generateLoanCardModel.emi3 = LoanInstallments[3].emi;
                    generateLoanCardModel.principleAmount3 = LoanInstallments[3].principleAmount;
                    generateLoanCardModel.interestAmount3 = LoanInstallments[3].interestAmount;
                    generateLoanCardModel.paidAmount3 = LoanInstallments[3].paidAmount;
                    generateLoanCardModel.balanceAmount3 = LoanInstallments[3].balanceAmount;
                }

                if (j==4)
                {
                    generateLoanCardModel.installmentNo4 = LoanInstallments[4].installmentNo;
                    generateLoanCardModel.dueDate4 = LoanInstallments[4].dueDate;
                    generateLoanCardModel.paidDate4 = LoanInstallments[4].paidDate;
                    generateLoanCardModel.emi4 = LoanInstallments[4].emi;
                    generateLoanCardModel.principleAmount4 = LoanInstallments[4].principleAmount;
                    generateLoanCardModel.interestAmount4 = LoanInstallments[4].interestAmount;
                    generateLoanCardModel.paidAmount4 = LoanInstallments[4].paidAmount;
                    generateLoanCardModel.balanceAmount4 = LoanInstallments[4].balanceAmount;
                }

                if (j==5)
                {
                    generateLoanCardModel.installmentNo5 = LoanInstallments[5].installmentNo;
                    generateLoanCardModel.dueDate5 = LoanInstallments[5].dueDate;
                    generateLoanCardModel.paidDate5 = LoanInstallments[5].paidDate;
                    generateLoanCardModel.emi5 = LoanInstallments[5].emi;
                    generateLoanCardModel.principleAmount5= LoanInstallments[5].principleAmount;
                    generateLoanCardModel.interestAmount5 = LoanInstallments[5].interestAmount;
                    generateLoanCardModel.paidAmount5 = LoanInstallments[5].paidAmount;
                    generateLoanCardModel.balanceAmount5 = LoanInstallments[5].balanceAmount;
                }

                if (j==6)
                {
                    generateLoanCardModel.installmentNo6 = LoanInstallments[6].installmentNo;
                    generateLoanCardModel.dueDate6 = LoanInstallments[6].dueDate;
                    generateLoanCardModel.paidDate6 = LoanInstallments[6].paidDate;
                    generateLoanCardModel.emi6 = LoanInstallments[6].emi;
                    generateLoanCardModel.principleAmount6 = LoanInstallments[6].principleAmount;
                    generateLoanCardModel.interestAmount6 = LoanInstallments[6].interestAmount;
                    generateLoanCardModel.paidAmount6 = LoanInstallments[6].paidAmount;
                    generateLoanCardModel.balanceAmount6 = LoanInstallments[6].balanceAmount;
                }

                if (j==7)
                {
                    generateLoanCardModel.installmentNo7 = LoanInstallments[7].installmentNo;
                    generateLoanCardModel.dueDate7 = LoanInstallments[7].dueDate;
                    generateLoanCardModel.paidDate7 = LoanInstallments[7].paidDate;
                    generateLoanCardModel.emi7 = LoanInstallments[7].emi;
                    generateLoanCardModel.principleAmount7 = LoanInstallments[7].principleAmount;
                    generateLoanCardModel.interestAmount7 = LoanInstallments[7].interestAmount;
                    generateLoanCardModel.paidAmount7 = LoanInstallments[7].paidAmount;
                    generateLoanCardModel.balanceAmount7 = LoanInstallments[7].balanceAmount;
                }

                if (j==8)
                {
                    generateLoanCardModel.installmentNo8 = LoanInstallments[8].installmentNo;
                    generateLoanCardModel.dueDate8 = LoanInstallments[8].dueDate;
                    generateLoanCardModel.paidDate8 = LoanInstallments[8].paidDate;
                    generateLoanCardModel.emi8 = LoanInstallments[8].emi;
                    generateLoanCardModel.principleAmount8 = LoanInstallments[8].principleAmount;
                    generateLoanCardModel.interestAmount8 = LoanInstallments[8].interestAmount;
                    generateLoanCardModel.paidAmount8 = LoanInstallments[8].paidAmount;
                    generateLoanCardModel.balanceAmount8 = LoanInstallments[8].balanceAmount;
                }

                if (j == 9)
                {
                    generateLoanCardModel.installmentNo9 = LoanInstallments[9].installmentNo;
                    generateLoanCardModel.dueDate9 = LoanInstallments[9].dueDate;
                    generateLoanCardModel.paidDate9 = LoanInstallments[9].paidDate;
                    generateLoanCardModel.emi9 = LoanInstallments[9].emi;
                    generateLoanCardModel.principleAmount9 = LoanInstallments[9].principleAmount;
                    generateLoanCardModel.interestAmount9 = LoanInstallments[9].interestAmount;
                    generateLoanCardModel.paidAmount9 = LoanInstallments[9].paidAmount;
                    generateLoanCardModel.balanceAmount9 = LoanInstallments[9].balanceAmount;
                }

                if (j == 10)
                {
                    generateLoanCardModel.installmentNo10 = LoanInstallments[10].installmentNo;
                    generateLoanCardModel.dueDate10 = LoanInstallments[10].dueDate;
                    generateLoanCardModel.paidDate10 = LoanInstallments[10].paidDate;
                    generateLoanCardModel.emi10 = LoanInstallments[10].emi;
                    generateLoanCardModel.principleAmount10 = LoanInstallments[10].principleAmount;
                    generateLoanCardModel.interestAmount10 = LoanInstallments[10].interestAmount;
                    generateLoanCardModel.paidAmount10 = LoanInstallments[10].paidAmount;
                    generateLoanCardModel.balanceAmount10 = LoanInstallments[10].balanceAmount;
                }

                if (j == 11)
                {
                    generateLoanCardModel.installmentNo11 = LoanInstallments[11].installmentNo;
                    generateLoanCardModel.dueDate11 = LoanInstallments[11].dueDate;
                    generateLoanCardModel.paidDate11 = LoanInstallments[11].paidDate;
                    generateLoanCardModel.emi11 = LoanInstallments[11].emi;
                    generateLoanCardModel.principleAmount11 = LoanInstallments[11].principleAmount;
                    generateLoanCardModel.interestAmount11 = LoanInstallments[11].interestAmount;
                    generateLoanCardModel.paidAmount11 = LoanInstallments[11].paidAmount;
                    generateLoanCardModel.balanceAmount11 = LoanInstallments[11].balanceAmount;
                }

                if (j == 12)
                {
                    generateLoanCardModel.installmentNo12 = LoanInstallments[12].installmentNo;
                    generateLoanCardModel.dueDate12 = LoanInstallments[12].dueDate;
                    generateLoanCardModel.paidDate12 = LoanInstallments[12].paidDate;
                    generateLoanCardModel.emi12 = LoanInstallments[12].emi;
                    generateLoanCardModel.principleAmount12 = LoanInstallments[12].principleAmount;
                    generateLoanCardModel.interestAmount12 = LoanInstallments[12].interestAmount;
                    generateLoanCardModel.paidAmount12 = LoanInstallments[12].paidAmount;
                    generateLoanCardModel.balanceAmount12 = LoanInstallments[12].balanceAmount;
                }

                if (j == 13)
                {
                    generateLoanCardModel.installmentNo13 = LoanInstallments[13].installmentNo;
                    generateLoanCardModel.dueDate13 = LoanInstallments[13].dueDate;
                    generateLoanCardModel.paidDate13 = LoanInstallments[13].paidDate;
                    generateLoanCardModel.emi13 = LoanInstallments[13].emi;
                    generateLoanCardModel.principleAmount13 = LoanInstallments[13].principleAmount;
                    generateLoanCardModel.interestAmount13 = LoanInstallments[13].interestAmount;
                    generateLoanCardModel.paidAmount13 = LoanInstallments[13].paidAmount;
                    generateLoanCardModel.balanceAmount13 = LoanInstallments[13].balanceAmount;
                }

                if (j == 14)
                {
                    generateLoanCardModel.installmentNo14 = LoanInstallments[14].installmentNo;
                    generateLoanCardModel.dueDate14 = LoanInstallments[14].dueDate;
                    generateLoanCardModel.paidDate14 = LoanInstallments[14].paidDate;
                    generateLoanCardModel.emi14 = LoanInstallments[14].emi;
                    generateLoanCardModel.principleAmount14 = LoanInstallments[14].principleAmount;
                    generateLoanCardModel.interestAmount14 = LoanInstallments[14].interestAmount;
                    generateLoanCardModel.paidAmount14 = LoanInstallments[14].paidAmount;
                    generateLoanCardModel.balanceAmount14 = LoanInstallments[14].balanceAmount;
                }

                if (j == 15)
                {
                    generateLoanCardModel.installmentNo15 = LoanInstallments[15].installmentNo;
                    generateLoanCardModel.dueDate15 = LoanInstallments[15].dueDate;
                    generateLoanCardModel.paidDate15 = LoanInstallments[15].paidDate;
                    generateLoanCardModel.emi15 = LoanInstallments[15].emi;
                    generateLoanCardModel.principleAmount15 = LoanInstallments[15].principleAmount;
                    generateLoanCardModel.interestAmount15 = LoanInstallments[15].interestAmount;
                    generateLoanCardModel.paidAmount15 = LoanInstallments[15].paidAmount;
                    generateLoanCardModel.balanceAmount15 = LoanInstallments[15].balanceAmount;
                }

                if (j == 16)
                {
                    generateLoanCardModel.installmentNo16 = LoanInstallments[16].installmentNo;
                    generateLoanCardModel.dueDate16 = LoanInstallments[16].dueDate;
                    generateLoanCardModel.paidDate16 = LoanInstallments[16].paidDate;
                    generateLoanCardModel.emi16 = LoanInstallments[16].emi;
                    generateLoanCardModel.principleAmount16 = LoanInstallments[16].principleAmount;
                    generateLoanCardModel.interestAmount16 = LoanInstallments[16].interestAmount;
                    generateLoanCardModel.paidAmount16 = LoanInstallments[16].paidAmount;
                    generateLoanCardModel.balanceAmount16 = LoanInstallments[16].balanceAmount;
                }

                if (j == 17)
                {
                    generateLoanCardModel.installmentNo17 = LoanInstallments[17].installmentNo;
                    generateLoanCardModel.dueDate17 = LoanInstallments[17].dueDate;
                    generateLoanCardModel.paidDate17 = LoanInstallments[17].paidDate;
                    generateLoanCardModel.emi17 = LoanInstallments[17].emi;
                    generateLoanCardModel.principleAmount17 = LoanInstallments[17].principleAmount;
                    generateLoanCardModel.interestAmount17 = LoanInstallments[17].interestAmount;
                    generateLoanCardModel.paidAmount17 = LoanInstallments[17].paidAmount;
                    generateLoanCardModel.balanceAmount17 = LoanInstallments[17].balanceAmount;
                }

                if (j == 18)
                {
                    generateLoanCardModel.installmentNo18 = LoanInstallments[18].installmentNo;
                    generateLoanCardModel.dueDate18 = LoanInstallments[18].dueDate;
                    generateLoanCardModel.paidDate18 = LoanInstallments[18].paidDate;
                    generateLoanCardModel.emi18 = LoanInstallments[18].emi;
                    generateLoanCardModel.principleAmount18 = LoanInstallments[18].principleAmount;
                    generateLoanCardModel.interestAmount18 = LoanInstallments[18].interestAmount;
                    generateLoanCardModel.paidAmount18 = LoanInstallments[18].paidAmount;
                    generateLoanCardModel.balanceAmount18 = LoanInstallments[18].balanceAmount;
                }

                if (j == 19)
                {
                    generateLoanCardModel.installmentNo19 = LoanInstallments[19].installmentNo;
                    generateLoanCardModel.dueDate19 = LoanInstallments[19].dueDate;
                    generateLoanCardModel.paidDate19 = LoanInstallments[19].paidDate;
                    generateLoanCardModel.emi19 = LoanInstallments[19].emi;
                    generateLoanCardModel.principleAmount19 = LoanInstallments[19].principleAmount;
                    generateLoanCardModel.interestAmount19 = LoanInstallments[19].interestAmount;
                    generateLoanCardModel.paidAmount19 = LoanInstallments[19].paidAmount;
                    generateLoanCardModel.balanceAmount19 = LoanInstallments[19].balanceAmount;
                }

                if (j == 20)
                {
                    generateLoanCardModel.installmentNo20 = LoanInstallments[20].installmentNo;
                    generateLoanCardModel.dueDate20 = LoanInstallments[20].dueDate;
                    generateLoanCardModel.paidDate20 = LoanInstallments[20].paidDate;
                    generateLoanCardModel.emi20 = LoanInstallments[20].emi;
                    generateLoanCardModel.principleAmount20 = LoanInstallments[20].principleAmount;
                    generateLoanCardModel.interestAmount20 = LoanInstallments[20].interestAmount;
                    generateLoanCardModel.paidAmount20 = LoanInstallments[20].paidAmount;
                    generateLoanCardModel.balanceAmount20 = LoanInstallments[20].balanceAmount;
                }

                if (j == 21)
                {
                    generateLoanCardModel.installmentNo21 = LoanInstallments[21].installmentNo;
                    generateLoanCardModel.dueDate21 = LoanInstallments[21].dueDate;
                    generateLoanCardModel.paidDate21 = LoanInstallments[21].paidDate;
                    generateLoanCardModel.emi21 = LoanInstallments[21].emi;
                    generateLoanCardModel.principleAmount21 = LoanInstallments[21].principleAmount;
                    generateLoanCardModel.interestAmount21 = LoanInstallments[21].interestAmount;
                    generateLoanCardModel.paidAmount21 = LoanInstallments[21].paidAmount;
                    generateLoanCardModel.balanceAmount21 = LoanInstallments[21].balanceAmount;
                }

                if (j == 22)
                {
                    generateLoanCardModel.installmentNo22 = LoanInstallments[22].installmentNo;
                    generateLoanCardModel.dueDate22 = LoanInstallments[22].dueDate;
                    generateLoanCardModel.paidDate22 = LoanInstallments[22].paidDate;
                    generateLoanCardModel.emi22 = LoanInstallments[22].emi;
                    generateLoanCardModel.principleAmount22 = LoanInstallments[22].principleAmount;
                    generateLoanCardModel.interestAmount22 = LoanInstallments[22].interestAmount;
                    generateLoanCardModel.paidAmount22 = LoanInstallments[22].paidAmount;
                    generateLoanCardModel.balanceAmount22 = LoanInstallments[22].balanceAmount;
                }

                if (j == 23)
                {
                    generateLoanCardModel.installmentNo23 = LoanInstallments[23].installmentNo;
                    generateLoanCardModel.dueDate23 = LoanInstallments[23].dueDate;
                    generateLoanCardModel.paidDate23 = LoanInstallments[23].paidDate;
                    generateLoanCardModel.emi23 = LoanInstallments[23].emi;
                    generateLoanCardModel.principleAmount23 = LoanInstallments[23].principleAmount;
                    generateLoanCardModel.interestAmount23 = LoanInstallments[23].interestAmount;
                    generateLoanCardModel.paidAmount23 = LoanInstallments[23].paidAmount;
                    generateLoanCardModel.balanceAmount23 = LoanInstallments[23].balanceAmount;
                }

                if (j == 24)
                {
                    generateLoanCardModel.installmentNo24 = LoanInstallments[24].installmentNo;
                    generateLoanCardModel.dueDate24 = LoanInstallments[24].dueDate;
                    generateLoanCardModel.paidDate24 = LoanInstallments[24].paidDate;
                    generateLoanCardModel.emi24 = LoanInstallments[24].emi;
                    generateLoanCardModel.principleAmount24 = LoanInstallments[24].principleAmount;
                    generateLoanCardModel.interestAmount24 = LoanInstallments[24].interestAmount;
                    generateLoanCardModel.paidAmount24 = LoanInstallments[24].paidAmount;
                    generateLoanCardModel.balanceAmount24 = LoanInstallments[24].balanceAmount;
                }

                if (j == 25)
                {
                    generateLoanCardModel.installmentNo25 = LoanInstallments[25].installmentNo;
                    generateLoanCardModel.dueDate25 = LoanInstallments[25].dueDate;
                    generateLoanCardModel.paidDate25 = LoanInstallments[25].paidDate;
                    generateLoanCardModel.emi25 = LoanInstallments[25].emi;
                    generateLoanCardModel.principleAmount25 = LoanInstallments[25].principleAmount;
                    generateLoanCardModel.interestAmount25 = LoanInstallments[25].interestAmount;
                    generateLoanCardModel.paidAmount25 = LoanInstallments[25].paidAmount;
                    generateLoanCardModel.balanceAmount25 = LoanInstallments[25].balanceAmount;
                }
            }
            if (loanCardResponse.memberDetails.languageId == 1)
            {
                LanguageReturn = "LoanCardPrintPreviewNew";
            }
            else if(loanCardResponse.memberDetails.languageId == 2)
            {
                LanguageReturn = "LoanCardPrintMalayalamPreview";
            }
            else if(loanCardResponse.memberDetails.languageId == 3)
            {
                LanguageReturn = "LoanCardPrintTamilPreview";
            }
            else if (loanCardResponse.memberDetails.languageId == 4)
            {
                
                LanguageReturn = "LoanCardPrintOdiyaPreview";
            }
            else if (loanCardResponse.memberDetails.languageId == 5)
            {
                LanguageReturn = "LoanCardPrintHindiPreview";
            }
            else if(loanCardResponse.memberDetails.languageId == 6)
            {
                LanguageReturn = "LoanCardPrintKannadaPreview";
            }
            else if (loanCardResponse.memberDetails.languageId == 7)
            {
                LanguageReturn = "LoanCardPrintBengalNewPreview";
            }
            else if (loanCardResponse.memberDetails.languageId == 8)
            {
                LanguageReturn = "LoanCardPrintAssamePreview";
            }
            else
            {
                LanguageReturn = "LoanCardPrintPreviewNew";
            }

            return View(LanguageReturn, generateLoanCardModel);
        }

        [HttpGet("generateloanapplication")] 
        public IActionResult GenerateLoanApplication()
        {
            return View();
        }
        public static string ConvertNumbertoWords(long number)
        {
            if (number == 0) return "ZERO";
            if (number < 0) return "minus " + ConvertNumbertoWords(Math.Abs(number));
            string words = "";
            if ((number / 1000000) > 0)
            {
                words += ConvertNumbertoWords(number / 100000) + " LAKES ";
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
        [HttpGet("loanapplicationprintpreview/{ApplicationId}/{MemberId}/{BranchId}/{authToken}")]
        public IActionResult LoanApplicationPrintPreview(long ApplicationId = 0, string MemberId ="", long BranchId=0, string authToken = "")
        {
            GenerateLoanApplicationModel generateLoanapplicationmodel = new GenerateLoanApplicationModel();
            LoanApplicationCustomerResponse loanApplicationCustomerResponse = new LoanApplicationCustomerResponse();
            LoanApplicationDetailsRequest loanapplicationdetailsrequest = new LoanApplicationDetailsRequest();
            LoanApplicationCustomerData loanApplicationCustomerData = new LoanApplicationCustomerData();
            LoanApplicationData loanApplicationData = new LoanApplicationData();
            MemberIncomeDetails memberIncomeDetails = new MemberIncomeDetails();
            BranchDetailsData branchDetails = new BranchDetailsData();
            HoBranchDetailsData hoBranchDetails = new HoBranchDetailsData();

            loanapplicationdetailsrequest.applicationId = ApplicationId;
            loanapplicationdetailsrequest.memberId = MemberId;
            loanapplicationdetailsrequest.branchId = BranchId;
            var LanguageReturn = "";
            //string urls = "https://mac.mactech.net.in/mfpubliclosapi/api/loans/loanapplication";
            AppConfigManager AppConfigManager = new AppConfigManager();
            
            loanApplicationCustomerResponse = new Manager().InvokePostHttpClient<Response<LoanApplicationCustomerResponse>, LoanApplicationDetailsRequest>(loanapplicationdetailsrequest, AppConfigManager.getPublicLosApi + "api/loans/loanapplication", authToken).Item1.Data;

                loanApplicationCustomerData = loanApplicationCustomerResponse.loanApplicationCustomerData;
            loanApplicationData = loanApplicationCustomerResponse.loanApplicationData;
            memberIncomeDetails = loanApplicationCustomerResponse.memberIncomeDetails;
            branchDetails = loanApplicationCustomerResponse.branchDetails;
            hoBranchDetails = loanApplicationCustomerResponse.hoBranchDetails;
            string base64String = Convert.ToBase64String(loanApplicationCustomerResponse.imageString, 0, loanApplicationCustomerResponse.imageString.Length);

            //------------------------------------ model binding--------------------------------------------//

            //loanApplicationCustomerData
            generateLoanapplicationmodel.customerImage = base64String;

            generateLoanapplicationmodel.memberId = loanApplicationCustomerData.memberId;
            generateLoanapplicationmodel.memberName = loanApplicationCustomerData.memberName;
            generateLoanapplicationmodel.husband = loanApplicationCustomerData.husband;
            generateLoanapplicationmodel.father = loanApplicationCustomerData.father;
            generateLoanapplicationmodel.motherName = loanApplicationCustomerData.motherName;
            generateLoanapplicationmodel.memberAge = loanApplicationCustomerData.memberAge;
            generateLoanapplicationmodel.adhaarNo = loanApplicationCustomerData.adhaarNo;
            generateLoanapplicationmodel.maritalStatus = loanApplicationCustomerData.maritalStatus;
            generateLoanapplicationmodel.religionName = loanApplicationCustomerData.religionName;
            generateLoanapplicationmodel.accountNo = loanApplicationCustomerData.accountNo;
            generateLoanapplicationmodel.ifscCode = loanApplicationCustomerData.ifscCode;
            generateLoanapplicationmodel.bankName = loanApplicationCustomerData.bankName;
            generateLoanapplicationmodel.bankBranch = loanApplicationCustomerData.bankBranch;
            generateLoanapplicationmodel.contactNo = loanApplicationCustomerData.contactNo;
            generateLoanapplicationmodel.houseName = loanApplicationCustomerData.houseName;
            generateLoanapplicationmodel.locality = loanApplicationCustomerData.locality;
            generateLoanapplicationmodel.spouseAge = loanApplicationCustomerData.spouseAge;
            generateLoanapplicationmodel.motherAge = loanApplicationCustomerData.motherAge;
            generateLoanapplicationmodel.fatherAge = loanApplicationCustomerData.fatherAge;
            generateLoanapplicationmodel.votersId = loanApplicationCustomerData.votersId;
            generateLoanapplicationmodel.occupationName = loanApplicationCustomerData.occupationName;
            generateLoanapplicationmodel.pinCode = loanApplicationCustomerData.pinCode;
            generateLoanapplicationmodel.street = loanApplicationCustomerData.street;
            generateLoanapplicationmodel.district = loanApplicationCustomerData.district;
            generateLoanapplicationmodel.maritalName = loanApplicationCustomerData.maritalName;
            generateLoanapplicationmodel.address = loanApplicationCustomerData.houseName+", "+ loanApplicationCustomerData.locality;
            generateLoanapplicationmodel.casteName = loanApplicationCustomerData.casteName;
            generateLoanapplicationmodel.altContactNo = loanApplicationCustomerData.altContactNo;

            //loanApplicationData
            generateLoanapplicationmodel.nomineeName = loanApplicationData.nomineeName;
            generateLoanapplicationmodel.loanAmount = loanApplicationData.loanAmount;
            generateLoanapplicationmodel.loanAmountTxt = ConvertNumbertoWords(Convert.ToInt64(loanApplicationData.loanAmount));


            generateLoanapplicationmodel.loanTenure = loanApplicationData.loanTenure;
            generateLoanapplicationmodel.loanCycle = loanApplicationData.loanCycle;
            generateLoanapplicationmodel.purpose = loanApplicationData.purpose;
            generateLoanapplicationmodel.categoryName = loanApplicationData.categoryName;
            generateLoanapplicationmodel.houseType = loanApplicationData.houseType;
            generateLoanapplicationmodel.ownerShip = loanApplicationData.ownerShip;
            generateLoanapplicationmodel.noofYears = loanApplicationData.noofYears;
            generateLoanapplicationmodel.schemeName = loanApplicationData.schemeName;
            generateLoanapplicationmodel.interestRate = loanApplicationData.interestRate;
            generateLoanapplicationmodel.processingFee = loanApplicationData.processingFee;
            generateLoanapplicationmodel.insurancePremium = loanApplicationData.insurancePremium;
            generateLoanapplicationmodel.processingFee = loanApplicationData.processingFee;
            generateLoanapplicationmodel.moratoriumDays = loanApplicationData.moratoriumDays;
            generateLoanapplicationmodel.annualIncome = loanApplicationData.annualIncome;
            generateLoanapplicationmodel.familyIncome = loanApplicationData.familyIncome;
            generateLoanapplicationmodel.monthlyExpense = loanApplicationData.monthlyExpense;
            generateLoanapplicationmodel.monthlyNetIncome = loanApplicationData.monthlyNetIncome;
            generateLoanapplicationmodel.annualNetIncome = loanApplicationData.annualNetIncome;
            generateLoanapplicationmodel.nomineeAadhar = loanApplicationData.nomineeAadhar;
            generateLoanapplicationmodel.nomineeVotersId = loanApplicationData.nomineeVotersId;
            generateLoanapplicationmodel.particulars = loanApplicationData.particulars;
            generateLoanapplicationmodel.applicationNumber = loanApplicationData.applicationNumber;
            generateLoanapplicationmodel.areaType = loanApplicationData.areaType;
            generateLoanapplicationmodel.incomeLimit = loanApplicationData.incomeLimit;
            generateLoanapplicationmodel.centerId = loanApplicationData.centerId;
            generateLoanapplicationmodel.centerName = loanApplicationData.centerName;
            generateLoanapplicationmodel.parameterValue = loanApplicationData.parameterValue;
            generateLoanapplicationmodel.applnDate = loanApplicationData.applnDate;
            generateLoanapplicationmodel.disbursementDate = loanApplicationData.disbursementDate;
            generateLoanapplicationmodel.repayMode = loanApplicationData.repayMode;
            generateLoanapplicationmodel.morotorium = loanApplicationData.morotorium;
            generateLoanapplicationmodel.familyMemberCount = loanApplicationData.familyMemberCount;
            generateLoanapplicationmodel.earningMemberCount = loanApplicationData.earningMemberCount;
            generateLoanapplicationmodel.mChildCount = loanApplicationData.mChildCount;
            generateLoanapplicationmodel.fChildCount = loanApplicationData.fChildCount;
            generateLoanapplicationmodel.education = loanApplicationData.education;


            //memberincomedetails
            generateLoanapplicationmodel.agricultureIncome = memberIncomeDetails.agricultureIncome;
            generateLoanapplicationmodel.rent = memberIncomeDetails.rent;
            generateLoanapplicationmodel.otherIncome = memberIncomeDetails.otherIncome;

            //branchDetails
            generateLoanapplicationmodel.branchName = branchDetails.branchName;
            generateLoanapplicationmodel.cinNo = branchDetails.cinNo;
            generateLoanapplicationmodel.gstinNo = branchDetails.gstinNo;
            generateLoanapplicationmodel.rbiRegno = branchDetails.rbiRegno;
            generateLoanapplicationmodel.branchAddress = branchDetails.address;
            generateLoanapplicationmodel.location = branchDetails.location;

            //hobranchDetails
            generateLoanapplicationmodel.hobranchName = hoBranchDetails.branchName;
            generateLoanapplicationmodel.hocinNo = hoBranchDetails.cinNo;
            generateLoanapplicationmodel.hogstinNo = hoBranchDetails.gstinNo;
            generateLoanapplicationmodel.horbiRegno = hoBranchDetails.rbiRegno;
            generateLoanapplicationmodel.hoaddress = hoBranchDetails.address;
            generateLoanapplicationmodel.holocation = hoBranchDetails.location;

            generateLoanapplicationmodel.date  = DateTime.Now.ToString("dd MMM yyyy");

            if (loanApplicationCustomerResponse.loanApplicationData.languageId == "1")
            {
                LanguageReturn = "LoanApplicationPrintPreview";
            }
            else if (loanApplicationCustomerResponse.loanApplicationData.languageId == "2")
            {
                LanguageReturn = "LoanApplicationMalayalamPrintPreview";
            }
            else if (loanApplicationCustomerResponse.loanApplicationData.languageId == "3")
            {
                LanguageReturn = "LoanApplicationTamilPrintPreview";
            }
            else if (loanApplicationCustomerResponse.loanApplicationData.languageId == "4")
            {

                LanguageReturn = "LoanApplicationOriyaPrintPreview";
            }
            else if (loanApplicationCustomerResponse.loanApplicationData.languageId == "5")
            {
                LanguageReturn = "LoanApplicationHindiPrintPreview";
            }
            else if (loanApplicationCustomerResponse.loanApplicationData.languageId == "6")
            {
                LanguageReturn = "LoanApplicationKannadaPrintPreview";
            }
            else if (loanApplicationCustomerResponse.loanApplicationData.languageId == "7")
            {
                LanguageReturn = "LoanApplicationBengaliPrintPreview";
            }
            else if (loanApplicationCustomerResponse.loanApplicationData.languageId == "8")
            {
                LanguageReturn = "LoanApplicationAssamePrintPreview";
            }
            else
            {
                LanguageReturn = "LoanApplicationPrintPreview";
            }

            return View(LanguageReturn, generateLoanapplicationmodel);

        }

       
        
    }
}