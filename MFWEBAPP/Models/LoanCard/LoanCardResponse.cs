using DTO.MFLMSAPI.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.MFLMSAPI.Response
{
    public class LoanCardResponse
    { 
        public LoanCardMemberData memberDetails { get; set; }
        public List<LoanCardLoanData> loanDetails { get; set; }
        public List<LoanCardInstallmentData> LoanInstallments { get; set; }
        public byte[] imageString { get; set; }
        public string fileType { get; set; }
    }
}
