using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.MFLOSAPI.Request
{
    public class LoanApplicationDetailsRequest
    {
        
        public long applicationId { get; set; }
        public string memberId { get; set; }
        public long branchId { get; set; }
    }
}
