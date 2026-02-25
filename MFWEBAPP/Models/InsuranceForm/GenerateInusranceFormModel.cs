using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MFWEBAPP.Models.InsuranceForm
{
    public class GenerateInusranceFormModel
    {
        //memberInsuranceDetailsData
        public string nomineeName { get; set; }
        public string nomineeAge { get; set; }
        public string gender { get; set; }
        public string relationShip { get; set; }
        public decimal sumAssured { get; set; }
        public decimal premiumAmount { get; set; }
        public decimal coverage { get; set; }


        //LoanApplicationCustomerData
        public string memberId { get; set; }
        public string memberName { get; set; }
        public string memberAge { get; set; }
        public string occupationName { get; set; }
        public string genderName { get; set; }
        public string stateName { get; set; }
        public long pinCode { get; set; }





    }
}
