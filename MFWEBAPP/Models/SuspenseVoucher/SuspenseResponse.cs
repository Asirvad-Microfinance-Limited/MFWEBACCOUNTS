
using MFWEBACCOUNTS.Models.SuspenseVoucher;
using System.Collections.Generic;

namespace DTO.MFACCOUNTS.Response
{
    public class SuspenseResponse
    {
        public SuspenseResponse()
        {
            isDataAvailable = false;
        }
        public bool isDataAvailable { get; set; }
        public List<SuspenseViewDetails> queryResult { get; set; }
    }
}


