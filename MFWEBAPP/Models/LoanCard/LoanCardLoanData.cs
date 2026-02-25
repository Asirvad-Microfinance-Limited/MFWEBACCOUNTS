using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.MFLMSAPI.Data
{
    public  class LoanCardLoanData
    {

        #region  LoanCardLoanData
        /// <summary>
        /// API Number : LMS040
        /// Created on : 18-Jan-2020
        /// Created By : 100101
        /// Description: To Print Loan Card 
        /// Modify Date:
        /// Modify By  : 
        /// Description:
        /// </summary>
        public string loanId { get; set; }
        public string loanDate { get; set; }
        public double loanAmount { get; set; }
        public double interestRate { get; set; }
        public string loanPurpose { get; set; }
        public long cycle { get; set; }
        public long noOfInstallment { get; set; }
        public string morotorium { get; set; }
        public string repayMode { get; set; }
        public double firstInstallment { get; set; }
        public double lastInstallment { get; set; }
        public double processingFee { get; set; }
        public double insuranceAmount { get; set; }
        public long loanTenure { get; set; }
        public string insuranceCompany { get; set; }
        public string dueDate { get; set; }
       
        #endregion

    }
}
