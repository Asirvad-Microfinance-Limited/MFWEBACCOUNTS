using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.MFLOSAPI.Request
{
    public class MemberInsuranceDetailsRequest
    {
        public long applicationId { get; set; }
        public string memberId { get; set; }
    }
}
