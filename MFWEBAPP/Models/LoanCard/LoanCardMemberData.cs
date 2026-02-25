using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.MFLMSAPI.Data
{
   public class LoanCardMemberData
    {

        #region  LoanCardMemberData
        /// <summary>
        /// API Number : LMS040
        /// Created on : 18-Jan-2020
        /// Created By : 110060
        /// Description: To Print Loan Card 
        /// Modify Date:
        /// Modify By  : 
        /// Description:
        /// </summary>
        public string branchName { get; set; }
        public string centerId { get; set; }
        public string centerName { get; set; }
        public string memberId { get; set; }
        public string memberName { get; set; }
        public string fatHusName { get; set; }
        public string kycNo { get; set; }
        public string mobileNumber { get; set; }
        public string ifscCode { get; set; }
        public string accountNo { get; set; }
        public long languageId { get; set; }
        #endregion

    }
}
