using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.MFLMSAPI.Data
{
   public  class LoanCardInstallmentData
    {
        #region  LoanCardInstallmentData
        /// <summary>
        /// API Number : LMS040
        /// Created on : 18-Jan-2020
        /// Created By : 100101
        /// Description: To Print Loan Card 
        /// Modify Date:
        /// Modify By  : 
        /// Description:
        /// </summary>
        public long installmentNo { get; set; }
        public string dueDate { get; set; }
        public string paidDate { get; set; }
        public string emi { get; set; }
        public string principleAmount { get; set; }
        public string interestAmount { get; set; }
        public string paidAmount { get; set; }
        public string balanceAmount { get; set; }
       
        #endregion

    }
}
