
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DTO.MFLOSAPI.Request
{
     public class NocApproveRequest
    {
        
        public long applicationId { get; set; }
        public string memberId { get; set; }
        public string remarks { get; set; }
        public long statusId { get; set; }
        public long userId { get; set; }
    }
}
