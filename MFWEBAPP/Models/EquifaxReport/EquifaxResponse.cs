using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MFWEBAPP.Models.EquifaxReport
{
    public partial class EquifaxResponse
    {
        [JsonProperty("InquiryResponseHeader")]
        public TemperaturesInquiryResponseHeader InquiryResponseHeader { get; set; }

        [JsonProperty("InquiryRequestInfo")]
        public TemperaturesInquiryRequestInfo InquiryRequestInfo { get; set; }

        [JsonProperty("CCRResponse")]
        public CcrResponse CcrResponse { get; set; }
    }

    public partial class CcrResponse
    {
        [JsonProperty("Status")]
        //  [JsonConverter(typeof(ParseStringConverter))]
        public long Status { get; set; }

        [JsonProperty("CIRReportDataLst")]
        public List<CirReportDataLst> CirReportDataLst { get; set; }
    }
    public partial class CirReportDataLst
    {
        [JsonProperty("InquiryResponseHeader")]
        public CirReportDataLstInquiryResponseHeader InquiryResponseHeader { get; set; }

        [JsonProperty("InquiryRequestInfo")]
        public CirReportDataLstInquiryRequestInfo InquiryRequestInfo { get; set; }

        [JsonProperty("CIRReportData")]
        public CirReportData CirReportData { get; set; }
    }

    public partial class CirReportData
    {
        [JsonProperty("IDAndContactInfo")]
        public IdAndContactInfo IdAndContactInfo { get; set; }

        [JsonProperty("MicrofinanceAccountDetails")]
        public List<MicrofinanceAccountDetail> MicrofinanceAccountDetails { get; set; }

        [JsonProperty("MicrofinanceAccountsSummary")]
        public MicrofinanceAccountsSummary MicrofinanceAccountsSummary { get; set; }

        [JsonProperty("IncomeDetails")]
        public List<IncomeDetail> IncomeDetails { get; set; }

        [JsonProperty("familyDetailsInfo")]
        public FamilyDetailsInfo FamilyDetailsInfo { get; set; }

        [JsonProperty("Enquiries")]
        public List<Enquiry> Enquiries { get; set; }

        [JsonProperty("EnquirySummary")]
        public EnquirySummary EnquirySummary { get; set; }

        [JsonProperty("OtherKeyInd")]
        public OtherKeyInd OtherKeyInd { get; set; }
    }

    public partial class Enquiry
    {
        [JsonProperty("seq")]
        
        public long Seq { get; set; }

        [JsonProperty("Institution")]
        public string Institution { get; set; }

        [JsonProperty("Date")]
        public string Date { get; set; }

        [JsonProperty("Time")]
        public string Time { get; set; }

        [JsonProperty("RequestPurpose")]
        public string RequestPurpose { get; set; }

        //[JsonProperty("Amount", NullValueHandling = NullValueHandling.Ignore)]
        //[JsonConverter(typeof(ParseStringConverter))]
        public long Amount { get; set; }
    }

    public partial class EnquirySummary
    {
    }

    public partial class FamilyDetailsInfo
    {
        [JsonProperty("relatives")]
        public List<Relative> Relatives { get; set; }
    }

    public partial class Relative
    {
        [JsonProperty("AdditionalNameType")]
        public string AdditionalNameType { get; set; }

        [JsonProperty("AdditionalName")]
        public string AdditionalName { get; set; }
    }

    public partial class IdAndContactInfo
    {
        [JsonProperty("PersonalInfo")]
        public PersonalInfo PersonalInfo { get; set; }

        [JsonProperty("IdentityInfo")]
        public IdentityInfo IdentityInfo { get; set; }

        [JsonProperty("AddressInfo")]
        public List<AddressInfo> AddressInfo { get; set; }
    }

    public partial class AddressInfo
    {
        [JsonProperty("Seq")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long Seq { get; set; }

        [JsonProperty("ReportedDate")]
        public string ReportedDate { get; set; }

        [JsonProperty("Address")]
        public string Address { get; set; }

        [JsonProperty("State")]
        public string State { get; set; }

        [JsonProperty("Postal")]
        public string Postal { get; set; }
    }

    public partial class IdentityInfo
    {
        [JsonProperty("PANId")]
        public List<IdentityInfoOtherId> PanId { get; set; }

        [JsonProperty("OtherId")]
        public List<IdentityInfoOtherId> OtherId { get; set; }
    }

    public partial class IdentityInfoOtherId
    {
        [JsonProperty("seq")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long Seq { get; set; }

        [JsonProperty("ReportedDate")]
        public DateTimeOffset ReportedDate { get; set; }

        [JsonProperty("IdNumber")]
        public string IdNumber { get; set; }
    }

    public partial class PersonalInfo
    {
        [JsonProperty("Name")]
        public Name Name { get; set; }

        [JsonProperty(" AliasName")]
        public EnquirySummary AliasName { get; set; }

        [JsonProperty("DateOfBirth")]
        public DateTimeOffset DateOfBirth { get; set; }

        [JsonProperty("Gender")]
        public string Gender { get; set; }

        [JsonProperty("Age")]
        public Age Age { get; set; }

        [JsonProperty("PlaceOfBirthInfo")]
        public EnquirySummary PlaceOfBirthInfo { get; set; }

        [JsonProperty("Occupation")]
        public string Occupation { get; set; }

        [JsonProperty("MaritalStatus")]
        public string MaritalStatus { get; set; }
    }

    public partial class Age
    {
        [JsonProperty("Age")]
        //  [JsonConverter(typeof(ParseStringConverter))]
        public long AgeAge { get; set; }
    }

    public partial class Name
    {
        [JsonProperty("FullName")]
        public string FullName { get; set; }

        [JsonProperty("FirstName")]
        public string FirstName { get; set; }

        [JsonProperty("MiddleName")]
        public string MiddleName { get; set; }

        [JsonProperty("LastName")]
        public string LastName { get; set; }
    }

    public partial class IncomeDetail
    {
        [JsonProperty("occupation", NullValueHandling = NullValueHandling.Ignore)]
        public string Occupation { get; set; }

        [JsonProperty("monthlyExpense", NullValueHandling = NullValueHandling.Ignore)]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long MonthlyExpense { get; set; }

        [JsonProperty("assetOwnership", NullValueHandling = NullValueHandling.Ignore)]
        public string AssetOwnership { get; set; }

        [JsonProperty("seq")]
        public long Seq { get; set; }

        [JsonProperty("reportedDate")]
        public DateTimeOffset ReportedDate { get; set; }
    }

    public partial class MicrofinanceAccountDetail
    {
        [JsonProperty("branchIDMFI")]
        //[JsonConverter(typeof(ParseStringConverter))]
        public long MicrofinanceAccountDetailBranchIdmfi { get; set; }

        [JsonProperty("kendraIDMFI")]
        public string MicrofinanceAccountDetailKendraIdmfi { get; set; }

        [JsonProperty("seq")]
        //  [JsonConverter(typeof(ParseStringConverter))]
        public long Seq { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("AccountNumber")]
        public string AccountNumber { get; set; }

        [JsonProperty("CurrentBalance")]
        //   [JsonConverter(typeof(ParseStringConverter))]
        public long CurrentBalance { get; set; }

        [JsonProperty("Institution")]
        public string Institution { get; set; }

        [JsonProperty("InstitutionType")]
        public string InstitutionType { get; set; }

        [JsonProperty("PastDueAmount")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long PastDueAmount { get; set; }

        [JsonProperty("DisbursedAmount")]
        //   [JsonConverter(typeof(ParseStringConverter))]
        public long DisbursedAmount { get; set; }

        [JsonProperty("LoanCategory")]
        public string LoanCategory { get; set; }

        [JsonProperty("LoanPurpose")]
        public string LoanPurpose { get; set; }

        [JsonProperty("Open")]
        public string Open { get; set; }

        [JsonProperty("SanctionAmount")]
        //   [JsonConverter(typeof(ParseStringConverter))]
        public long SanctionAmount { get; set; }

        [JsonProperty("LastPaymentDate")]
        public DateTimeOffset LastPaymentDate { get; set; }

        [JsonProperty("DateReported")]
        public DateTimeOffset DateReported { get; set; }

        [JsonProperty("DateOpened")]
        public DateTimeOffset DateOpened { get; set; }

        [JsonProperty("LoanCycleID", NullValueHandling = NullValueHandling.Ignore)]
        //  [JsonConverter(typeof(ParseStringConverter))]
        public long? LoanCycleId { get; set; }

        [JsonProperty("DateSanctioned")]
        public DateTimeOffset DateSanctioned { get; set; }

        [JsonProperty("AppliedAmount")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long AppliedAmount { get; set; }

        [JsonProperty("NoOfInstallments")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long NoOfInstallments { get; set; }

        [JsonProperty("RepaymentTenure")]
        public string RepaymentTenure { get; set; }

        [JsonProperty("InstallmentAmount")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long InstallmentAmount { get; set; }

        [JsonProperty("KeyPerson")]
        public KeyPerson KeyPerson { get; set; }

        [JsonProperty("AccountStatus")]
        public string AccountStatus { get; set; }

        [JsonProperty("DaysPastDue")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long DaysPastDue { get; set; }

        [JsonProperty("MaxDaysPastDue")]
        //  [JsonConverter(typeof(ParseStringConverter))]
        public long MaxDaysPastDue { get; set; }

        [JsonProperty("TypeOfInsurance", NullValueHandling = NullValueHandling.Ignore)]
        public string TypeOfInsurance { get; set; }

        [JsonProperty("InsurancePolicyAmount", NullValueHandling = NullValueHandling.Ignore)]
        //   [JsonConverter(typeof(ParseStringConverter))]
        public long? InsurancePolicyAmount { get; set; }

        [JsonProperty("NumberOfMeetingsHeld", NullValueHandling = NullValueHandling.Ignore)]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long? NumberOfMeetingsHeld { get; set; }

        [JsonProperty("NumberOfMeetingsMissed", NullValueHandling = NullValueHandling.Ignore)]
        //  [JsonConverter(typeof(ParseStringConverter))]
        public long? NumberOfMeetingsMissed { get; set; }

        [JsonProperty("source")]
        public string Source { get; set; }

        [JsonProperty("AdditionalMFIDetails")]
        public AdditionalMfiDetails AdditionalMfiDetails { get; set; }

        [JsonProperty("BranchIDMFI")]
        //   [JsonConverter(typeof(ParseStringConverter))]
        public long BranchIdmfi { get; set; }

        [JsonProperty("KendraIDMFI")]
        public string KendraIdmfi { get; set; }

        [JsonProperty("History24Months")]
        public List<History24Month> History24Months { get; set; }

        [JsonProperty("DateClosed", NullValueHandling = NullValueHandling.Ignore)]
        public DateTimeOffset? DateClosed { get; set; }

        [JsonProperty("Reason", NullValueHandling = NullValueHandling.Ignore)]
        public string Reason { get; set; }

        [JsonProperty("DateApplied", NullValueHandling = NullValueHandling.Ignore)]
        public DateTimeOffset? DateApplied { get; set; }
    }

    public partial class AdditionalMfiDetails
    {
        [JsonProperty("MFIClientFullname")]
        public string MfiClientFullname { get; set; }

        [JsonProperty("MFIDOB")]
        public DateTimeOffset Mfidob { get; set; }

        [JsonProperty("MFIGender")]
        public string MfiGender { get; set; }

        [JsonProperty("MemberId")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long MemberId { get; set; }

        [JsonProperty("MFIIdentification")]
        public MfiIdentification MfiIdentification { get; set; }

        [JsonProperty("MFIAddress")]
        public List<AddressInfo> MfiAddress { get; set; }

        [JsonProperty("MFIPhones", NullValueHandling = NullValueHandling.Ignore)]
        public List<MfiPhone> MfiPhones { get; set; }
    }

    public partial class MfiIdentification
    {
        [JsonProperty("PANId", NullValueHandling = NullValueHandling.Ignore)]
        public List<MfiIdentificationOtherId> PanId { get; set; }

        [JsonProperty("OtherId", NullValueHandling = NullValueHandling.Ignore)]
        public List<MfiIdentificationOtherId> OtherId { get; set; }
    }

    public partial class MfiIdentificationOtherId
    {
        [JsonProperty("IdNumber")]
        public string IdNumber { get; set; }
    }

    public partial class MfiPhone
    {
        [JsonProperty("seq")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long Seq { get; set; }

        [JsonProperty("ReportedDate")]
        public DateTimeOffset ReportedDate { get; set; }

        [JsonProperty("Number")]
        public string Number { get; set; }
    }

    public partial class History24Month
    {
        [JsonProperty("key")]
        public string Key { get; set; }

        [JsonProperty("PaymentStatus")]
        public string PaymentStatus { get; set; }
    }

    public partial class KeyPerson
    {
        [JsonProperty("Name")]
        public string Name { get; set; }

        [JsonProperty("RelationType")]
        public string RelationType { get; set; }

        [JsonProperty("associationType")]
        public string AssociationType { get; set; }
    }

    public partial class MicrofinanceAccountsSummary
    {
        [JsonProperty("id")]
        public string MicrofinanceAccountsSummaryId { get; set; }

        [JsonProperty("NoOfActiveAccounts")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long NoOfActiveAccounts { get; set; }

        [JsonProperty("TotalPastDue")]
        public string TotalPastDue { get; set; }

        [JsonProperty("NoOfPastDueAccounts")]
        //  [JsonConverter(typeof(ParseStringConverter))]
        public long NoOfPastDueAccounts { get; set; }

        [JsonProperty("RecentAccount")]
        public string RecentAccount { get; set; }

        [JsonProperty("TotalBalanceAmount")]
        public string TotalBalanceAmount { get; set; }

        [JsonProperty("TotalMonthlyPaymentAmount")]
        public string TotalMonthlyPaymentAmount { get; set; }

        [JsonProperty("TotalWrittenOffAmount")]
        public string TotalWrittenOffAmount { get; set; }

        [JsonProperty("Id")]
        public string Id { get; set; }
    }

    public partial class OtherKeyInd
    {
        [JsonProperty("NumberOfOpenTrades")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long NumberOfOpenTrades { get; set; }
    }

    public partial class CirReportDataLstInquiryRequestInfo
    {
        [JsonProperty("FirstName")]
        public string FirstName { get; set; }

        [JsonProperty("InquiryAddresses")]
        public List<InquiryAddressRes> InquiryAddresses { get; set; }

        [JsonProperty("IDDetails")]
        public List<IdDetailRes> IdDetails { get; set; }

        [JsonProperty("DOB")]
        public string Dob { get; set; }

        [JsonProperty("MFIDetails")]
        public MfiDetailsRes MfiDetails { get; set; }
    }

    public partial class IdDetailRes
    {
        [JsonProperty("seq")]
        //  [JsonConverter(typeof(ParseStringConverter))]
        public long Seq { get; set; }

        [JsonProperty("IDType")]
        public string IdType { get; set; }

        [JsonProperty("IDValue")]
        public string IdValue { get; set; }

        [JsonProperty("Source", NullValueHandling = NullValueHandling.Ignore)]
        public string Source { get; set; }
    }

    public partial class InquiryAddressRes
    {
        [JsonProperty("seq")]
        //   [JsonConverter(typeof(ParseStringConverter))]
        public long Seq { get; set; }

        [JsonProperty("AddressLine1")]
        public string AddressLine1 { get; set; }

        [JsonProperty("State")]
        public string State { get; set; }

        [JsonProperty("Postal")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long Postal { get; set; }
    }

    public partial class MfiDetailsRes
    {
        [JsonProperty("FamilyDetails")]
        public List<FamilyDetailRes> FamilyDetails { get; set; }
    }

    public partial class FamilyDetailRes
    {
        [JsonProperty("seq")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long Seq { get; set; }

        [JsonProperty("AdditionalNameType")]
        public string AdditionalNameType { get; set; }

        [JsonProperty("AdditionalName")]
        public string AdditionalName { get; set; }
    }

    public partial class CirReportDataLstInquiryResponseHeader
    {
        [JsonProperty("CustomerCode")]
        public string CustomerCode { get; set; }

        [JsonProperty("ReportOrderNO")]
        //  [JsonConverter(typeof(ParseStringConverter))]
        public long ReportOrderNo { get; set; }

        [JsonProperty("ProductCode")]
        public List<string> ProductCode { get; set; }

        [JsonProperty("SuccessCode")]
        //  [JsonConverter(typeof(ParseStringConverter))]
        public long SuccessCode { get; set; }

        [JsonProperty("Date")]
        public string Date { get; set; }

        [JsonProperty("Time")]
        public string Time { get; set; }

        [JsonProperty("HitCode")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long HitCode { get; set; }

        [JsonProperty("CustomerName")]
        public string CustomerName { get; set; }
    }

    public partial class TemperaturesInquiryRequestInfo
    {
        [JsonProperty("InquiryPurpose")]
        public string InquiryPurpose { get; set; }

        [JsonProperty("FirstName")]
        public string FirstName { get; set; }

        [JsonProperty("InquiryAddresses")]
        public List<InquiryAddress> InquiryAddresses { get; set; }

        [JsonProperty("IDDetails")]
        public List<IdDetail> IdDetails { get; set; }

        [JsonProperty("DOB")]
        public DateTimeOffset Dob { get; set; }

        [JsonProperty("MFIDetails")]
        public MfiDetails MfiDetails { get; set; }
    }

    public partial class TemperaturesInquiryResponseHeader
    {
        [JsonProperty("ClientID")]
        public string ClientId { get; set; }

        [JsonProperty("ReportOrderNO")]
        //  [JsonConverter(typeof(ParseStringConverter))]
        public long ReportOrderNo { get; set; }

        [JsonProperty("ProductCode")]
        public List<string> ProductCode { get; set; }

        [JsonProperty("SuccessCode")]
        //   [JsonConverter(typeof(ParseStringConverter))]
        public long SuccessCode { get; set; }

        [JsonProperty("Date")]
        public string Date { get; set; }

        [JsonProperty("Time")]
        public string Time { get; set; }
    }
}
