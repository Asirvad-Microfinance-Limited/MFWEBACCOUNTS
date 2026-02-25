using DTO.MFCustomerAPI.Data;
using DTO.MFLOSAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MFWEBAPP.Models
{
    public class LoanApplicationCustomerResponse
    {
        public LoanApplicationCustomerData loanApplicationCustomerData { get; set; }
        public LoanApplicationData loanApplicationData { get; set; }
        public MemberIncomeDetails memberIncomeDetails { get; set; }
        public BranchDetailsData branchDetails { get; set; }
        public HoBranchDetailsData hoBranchDetails { get; set; }
        public byte[] imageString { get; set; }
    }
}
