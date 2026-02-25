using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.MFLOSAPI.Data
{
   public class LoanApplicationData
    {
        
        
        public string nomineeName { get; set; }
        public double loanAmount { get; set; }
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
        public string parameterValue { get; set; }
        public string applnDate { get; set; }
        public string languageId { get; set; }
        public string disbursementDate { get; set; }
        public string repayMode { get; set; }
        public string morotorium { get; set; }
        public string familyMemberCount { get; set; }
        public string earningMemberCount { get; set; }
        public string mChildCount { get; set; }
        public string fChildCount { get; set; }
        public string education { get; set; }



    }
}
