//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace MFWEBACCOUNTS.Models.ServiceFee
//{
//    public class ServiceFeeResponse
//    {
//        public ServiceFeeResponse()
//        {
//            isDataAvailable = false;
//        }
//        public bool isDataAvailable { get; set; }
//        public List<ServiceFeeViewDetails> ServiceFeeViewDetails { get; set; }
//    }

//}

using MFWEBACCOUNTS.Models.ServiceFee;
using System.Collections.Generic;

namespace DTO.MFACCOUNTS.Response
{
    public class ServiceFeeResponse
    {
        public ServiceFeeResponse()
        {
            isDataAvailable = false;
        }
        public bool isDataAvailable { get; set; }
        public List<ServiceFeeViewDetails> queryResult { get; set; }
    }
}


