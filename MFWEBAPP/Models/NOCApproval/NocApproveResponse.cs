using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.MFLOSAPI.Response
{
    public class NocApproveResponse
    {
        public NocApproveResponse()
        {
            isDataAvailable = false;
        }
        public bool isDataAvailable { get; set; }
        public string message { get; set; }
    }
}
