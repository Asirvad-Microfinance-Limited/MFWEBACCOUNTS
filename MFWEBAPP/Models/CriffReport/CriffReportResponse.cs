using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MFWEBAPP.Models.CriffReport
{
    public class CriffReportResponse
    {
        public CriffReportResponse()
        {
            isDataAvilable = false;
        }
        public bool isDataAvilable { get; set; }
        public string imageString { get; set; }
        public string fileType { get; set; }

    }
}
