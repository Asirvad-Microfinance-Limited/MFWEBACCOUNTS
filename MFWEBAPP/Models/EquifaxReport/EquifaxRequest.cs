using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MFWEBAPP.Models.EquifaxReport
{
    public class EquifaxRequest
    {
        [JsonProperty("RequestHeader")]
        public RequestHeader RequestHeader { get; set; }

        [JsonProperty("RequestBody")]
        public RequestBody RequestBody { get; set; }

    }
    public partial class RequestBody
    {
        [JsonProperty("InquiryPurpose")]
        public string InquiryPurpose { get; set; }

        [JsonProperty("FirstName")]
        public string FirstName { get; set; }

        [JsonProperty("InquiryAddresses")]
        public InquiryAddress[] InquiryAddresses { get; set; }

        [JsonProperty("IDDetails")]
        public IdDetail[] IdDetails { get; set; }
        // public List<IdDetail> IdDetails { get; set; }

        [JsonProperty("DOB")]
        public string Dob { get; set; }

        [JsonProperty("MFIDetails")]
        public MfiDetails MfiDetails { get; set; }
    }

    public partial class IdDetail
    {
        [JsonProperty("seq")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long Seq { get; set; }

        [JsonProperty("IDType")]
        public string IdType { get; set; }

        [JsonProperty("IDValue")]
        public string IdValue { get; set; }
    }

    public partial class InquiryAddress
    {
        [JsonProperty("seq")]
        //    [JsonConverter(typeof(ParseStringConverter))]
        public long Seq { get; set; }

        [JsonProperty("AddressLine1")]
        public string AddressLine1 { get; set; }

        [JsonProperty("State")]
        public string State { get; set; }

        [JsonProperty("Postal")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long Postal { get; set; }
    }

    public partial class MfiDetails
    {
        [JsonProperty("FamilyDetails")]
        public FamilyDetail[] FamilyDetails { get; set; }
    }

    public partial class FamilyDetail
    {
        [JsonProperty("seq")]
        //  [JsonConverter(typeof(ParseStringConverter))]
        public long Seq { get; set; }

        [JsonProperty("AdditionalNameType")]
        public string AdditionalNameType { get; set; }

        [JsonProperty("AdditionalName")]
        public string AdditionalName { get; set; }
    }

    public partial class RequestHeader
    {
        [JsonProperty("CustomerId")]
        // [JsonConverter(typeof(ParseStringConverter))]
        public long CustomerId { get; set; }

        [JsonProperty("UserId")]
        public string UserId { get; set; }

        [JsonProperty("Password")]
        public string Password { get; set; }

        [JsonProperty("MemberNumber")]
        public string MemberNumber { get; set; }

        [JsonProperty("SecurityCode")]
        public string SecurityCode { get; set; }

        [JsonProperty("ProductCode")]
        public string[] ProductCode { get; set; }
    }

}
