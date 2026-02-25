using DTO.MFCustomerAPI.Data;
using DTO.MFLOSAPI.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.MFLOSAPI.Response
{
    public class MemberInsuranceDetailsResponse
    {
        public MemberInsuranceDetailsResponse()
        {
            isDataAvailable = false;
        }
        public bool isDataAvailable { get; set; }
        public MemberInsuranceDetailsData memberInsuranceDetailsData { get; set; }
        public LoanApplicationCustomerData loanApplicationCustomerData { get; set; }

    }
}
