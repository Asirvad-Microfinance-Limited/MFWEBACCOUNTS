using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MFWEBAPP.Models.EquifaxReport
{
    public class EquifaxModel
    {
        public EquifaxResponse equifaxResponse { get; set; }
        public CcrResponse ccrResponse { get; set; }
        public CirReportDataLst cirReportDataLst { get; set; }
        public Enquiry enquiry { get; set; }
        public FamilyDetailsInfo familyDetailsInfo { get; set; }
        public TemperaturesInquiryResponseHeader temperaturesInquiryResponseHeader { get; set; }
        public TemperaturesInquiryRequestInfo temperaturesInquiryRequestInfo { get; set; }
        public CirReportDataLstInquiryResponseHeader cirReportDataLstInquiryResponseHeader { get; set; }
        public CirReportDataLstInquiryRequestInfo cirReportDataLstInquiryRequestInfo { get; set; }
        public CirReportData cirReportData { get; set; }
        public IdAndContactInfo idAndContactInfo { get; set; }
        public List<MicrofinanceAccountDetail> MicrofinanceAccountDetails { get; set; }

        public MicrofinanceAccountsSummary microfinanceAccountsSummary { get; set; }
        public IncomeDetail incomeDetail { get; set; }
        public OtherKeyInd otherKeyInd { get; set; }
        public Relative relative { get; set; }
        public PersonalInfo personalInfo { get; set; }
        public IdentityInfo identityInfo { get; set; }
        public AddressInfo addressInfo { get; set; }
        public IdentityInfoOtherId identityInfoOtherId { get; set; }
        public IdentityInfoOtherId IdentityInfoOtherId { get; set; }
        public DateTimeOffset dateTimeOffset { get; set; }
        public EnquirySummary enquirySummary { get; set; }
        public Age age { get; set; }
        public Name name { get; set; }
        public KeyPerson keyPerson { get; set; }
        public AdditionalMfiDetails additionalMfiDetails { get; set; }
        public MfiPhone MfiPhone { get; set; }
        public MfiIdentificationOtherId MfiIdentificationOtherId { get; set; }
        public History24Month History24Month { get; set; }
        public MicrofinanceAccountsSummary MicrofinanceAccountsSummary { get; set; }
        public IdDetailRes IdDetailRes { get; set; }
        public InquiryAddressRes InquiryAddressRes { get; set; }

        public int MicrofinanceAccountDetailsCount { get; set; }
        public int MFIAddressCount { get; set; }
        public int AddrInfoCount { get; set; }
        public int PanIdInfoCount { get; set; }
        public int OtherIdInfoCount { get; set; }
        public int History24MonthsCount { get; set; }
        public int EnqCount { get; set; }
        public int IncomeDtlsCount { get; set; }


        //public CirReportData cirReportData { get; set; }
        //public CirReportData cirReportData { get; set; }



    }
}
