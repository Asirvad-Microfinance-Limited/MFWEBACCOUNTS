using DTO.MFCustomerAPI.Data;
using DTO.MFLOSAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MFWEBAPP.Models
{
    public class GenerateLoanApplicationModel
    {
        //loanApplicationCustomerData
        public string memberId { get; set; }
        public string memberName { get; set; }
        public string husband { get; set; }
        public string father { get; set; }
        public string motherName { get; set; }
        public string memberAge { get; set; }
        public string adhaarNo { get; set; }
        public string maritalStatus { get; set; }
        public string religionName { get; set; }
        public string casteName { get; set; }
        public string accountNo { get; set; }
        public string ifscCode { get; set; }
        public string bankName { get; set; }
        public string bankBranch { get; set; }
        public string contactNo { get; set; }
        public string houseName { get; set; }
        public string locality { get; set; }
        public long spouseAge { get; set; }
        public long motherAge { get; set; }
        public long fatherAge { get; set; }
        public string votersId { get; set; }
        public string occupationName { get; set; }
        public long pinCode { get; set; }
        public string street { get; set; }
        public string district { get; set; }
        public string maritalName{ get; set; }
        public string address{ get; set; }
        public string altContactNo { get; set; }

        //loanApplicationData
        public string nomineeName { get; set; }
        public double loanAmount { get; set; }
        public string loanAmountTxt { get; set; }
        public long loanTenure { get; set; }
        public long loanCycle { get; set; }
        public string purpose { get; set; }
        public string categoryName { get; set; }
        public string houseType { get; set; }
        public string ownerShip { get; set; }
        //public long noofYears { get; set; }
        public string noofYears { get; set; }
        public string schemeName { get; set; }
        public string interestRate { get; set; }
        public decimal processingFee { get; set; }
        public decimal insurancePremium { get; set; }
        public decimal moratoriumDays { get; set; }
        public decimal annualIncome { get; set; }
        public decimal familyIncome { get; set; }
        public decimal monthlyExpense { get; set; }
        public decimal monthlyNetIncome { get; set; }
        public decimal annualNetIncome { get; set; }
        public string nomineeAadhar { get; set; }
        public string nomineeVotersId { get; set; }
        public string particulars { get; set; }
        public double applicationNumber { get; set; }
        public string areaType { get; set; }
        public double incomeLimit { get; set; }
        public string centerId { get; set; }
        public string centerName { get; set; }
        public string disbursementDate { get; set; }


        //memberincomedetails
        public decimal agricultureIncome { get; set; }
        public decimal rent { get; set; }
        public decimal otherIncome { get; set; }

        //branchDetails
        public string branchName { get; set; }
        public string cinNo { get; set; }
        public string gstinNo { get; set; }
        public string rbiRegno { get; set; }
        public string branchAddress { get; set; }
        public string location { get; set; }
        public string date { get; set; }
        public string parameterValue { get; set; }
        public string applnDate { get; set; }

        //hobranchdata
        public string hobranchName { get; set; }
        public string hocinNo { get; set; }
        public string hogstinNo { get; set; }
        public string horbiRegno { get; set; }
        public string hoaddress { get; set; }
        public string holocation { get; set; }
        public string customerImage { get; set; }
        public string repayMode { get; set; }
        public string morotorium { get; set; }
        public string familyMemberCount { get; set; }
        public string earningMemberCount { get; set; }
        public string mChildCount { get; set; }
        public string fChildCount { get; set; }
        public string education { get; set; }

    }

}
