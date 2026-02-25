using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.MFLMSAPI.Request
{
   public class LoanCardRequest
    {
        public long applicationId { get; set; }
        public string memberId { get; set; }
    }
}
