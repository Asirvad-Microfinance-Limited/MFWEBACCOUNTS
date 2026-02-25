using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.MFLOSAPI.Data
{
   public  class MemberInsuranceDetailsData
    {
       
        public string nomineeName { get; set; }
        public string nomineeAge { get; set; }
        public string  gender { get; set; }
        public string relationShip { get; set; }
        public decimal sumAssured { get; set; }
        public decimal premiumAmount { get; set; }
        public decimal coverage { get; set; }
    }
}
