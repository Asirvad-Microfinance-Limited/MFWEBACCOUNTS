using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MFWEBAPP.Models.CriffReport
{
    public class CriffReportRequest
    {
        public string recordingId { get; set; }
        public string collectionName { get; set; }
        public string fileType { get; set; }
    }
}
