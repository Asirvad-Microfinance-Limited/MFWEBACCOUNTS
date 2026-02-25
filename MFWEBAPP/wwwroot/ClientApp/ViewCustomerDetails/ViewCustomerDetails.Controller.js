var appId;
var custId;
var authToken;
var _ViewCustomerDetails = {
    //viewCutsomerImagesLoadCompleted: function (response) {
    //    if (response.status == "SUCCESS") {
    //        var $image = jQuery('<img src="data:image/png;base64,' + response.data.imageString + ' " height="500" width="900">');
    //        jQuery('#viewUpload').html($image);
    //    }
    //    else {

    //    }
    //},
    //ViewCustomerDetailsLoadCompleted: function (response) {
    //    debugger;
    //    if (response.status == "SUCCESS") {
    //        /*Personal Details*/
    //        jQuery("#kycName").val(response.data.customerPersonalDetails.primaryKycName);
    //        jQuery("#kycid").val(response.data.customerPersonalDetails.primaryKycName);
    //        jQuery("#salutation").val(response.data.customerPersonalDetails.salutationName);
    //        jQuery("#custName").val(response.data.customerPersonalDetails.firstName);
    //        jQuery("#gender").val(response.data.customerPersonalDetails.genderName);
    //        jQuery("#dob").val(response.data.customerPersonalDetails.dob);
    //        jQuery("#honame").val(response.data.customerPersonalDetails.houseName);
    //        jQuery("#landmark").val(response.data.customerPersonalDetails.locality);
    //        jQuery("#street").val(response.data.customerPersonalDetails.street);
    //        jQuery("#city").val(response.data.customerPersonalDetails.city);
    //        jQuery("#pincode").val(response.data.customerPersonalDetails.pincode);
    //        jQuery("#place").val(response.data.customerPersonalDetails.postOffice);
    //        jQuery("#district").val(response.data.customerPersonalDetails.districtName);
    //        jQuery("#state").val(response.data.customerPersonalDetails.stateName);
    //        jQuery("#country").val(response.data.customerPersonalDetails.countryName);
    //        jQuery("#txtMob").val(response.data.customerPersonalDetails.mobileNo);
    //        jQuery("#txtMobAlternative").val(response.data.customerPersonalDetails.altMobileNo);
    //        var addrStatus = response.data.customerPersonalDetails.addressStatus;
    //        if (addrStatus == 1) {
    //            jQuery("#rdoyes").prop("checked", true);
    //            jQuery("#mailhouse").val(response.data.customerPersonalDetails.houseName);
    //            jQuery("#maillandmaark").val(response.data.customerPersonalDetails.locality);
    //            jQuery("#mailstreet").val(response.data.customerPersonalDetails.street);
    //            jQuery("#mailcity").val(response.data.customerPersonalDetails.city);
    //            jQuery("#mailpincode").val(response.data.customerPersonalDetails.pincode);
    //            jQuery("#mailstate").val(response.data.customerPersonalDetails.stateName);
    //            jQuery("#maildistrict").val(response.data.customerPersonalDetails.districtName);
    //            jQuery("#mailcountry").val(response.data.customerPersonalDetails.countryName);

    //        }
    //        else {
    //            jQuery("#rdono").prop("checked", true);
    //            jQuery("#mailhouse").val(response.data.customerPersonalDetails.altHouse);
    //            jQuery("#maillandmaark").val(response.data.customerPersonalDetails.altLocality);
    //            jQuery("#mailstreet").val(response.data.customerPersonalDetails.altStreet);
    //            jQuery("#mailcity").val(response.data.customerPersonalDetails.altCity);
    //            jQuery("#mailpincode").val(response.data.customerPersonalDetails.altPincode);
    //            jQuery("#mailstate").val(response.data.customerPersonalDetails.alternateState);
    //            jQuery("#maildistrict").val(response.data.customerPersonalDetails.alternateDistrict);
    //            jQuery("#mailcountry").val(response.data.customerPersonalDetails.countryName);

    //        }
    //        jQuery("#fname").val(response.data.customerPersonalDetails.fatherName);
    //        jQuery("#fage").val(response.data.customerPersonalDetails.fatherAge);
    //        jQuery("#Mname").val(response.data.customerPersonalDetails.motherName);
    //        jQuery("#mage").val(response.data.customerPersonalDetails.motherAge);
    //        jQuery("#mrgstatus").val(response.data.customerPersonalDetails.maritalName);
    //        jQuery("#spouseName").val(response.data.customerPersonalDetails.spouseName);
    //        jQuery("#citizenship").val(response.data.customerPersonalDetails.citizenName);
    //        jQuery("#occupation").val(response.data.customerPersonalDetails.occupationName);
    //        jQuery("#caste").val(response.data.customerPersonalDetails.casteName);
    //        jQuery("#religion").val(response.data.customerPersonalDetails.religionName);
    //       /*Personal Details*/

    //       /*Bank Details*/
    //        jQuery("#accHolderName").val(response.data.customerBankDetails.accountName);
    //        jQuery("#ifscCode").val(response.data.customerBankDetails.ifsc);
    //        jQuery("#bankName").val(response.data.customerBankDetails.bankName);
    //        jQuery("#branchname").val(response.data.customerBankDetails.branchName);
    //        jQuery("#accHolderNumber").val(response.data.customerBankDetails.accountNo);
    //       /*Bank Details*/

    //       /*Loan Details*/
    //        jQuery("#exceptedamt").val(response.data.memberLoanDetails.amount);
    //        jQuery("#loanTenure").val(response.data.memberLoanDetails.loanTenure);
    //        jQuery("#loanCategory").val(response.data.memberLoanDetails.loanCategoryName);
    //        jQuery("#loanpurpose").val(response.data.memberLoanDetails.loanPurposeName);
    //        var productId = response.data.memberLoanDetails.productId;
    //        if (productId == 1) {
    //            jQuery("#chkpdtloan").prop("checked", true);
    //            jQuery("#pdttypeandvendor").val(response.data.memberLoanDetails.productName);
    //            jQuery("#pdtprice").val(response.data.memberLoanDetails.productValue);

    //        }
    //        else {
    //            jQuery("#chkpdtloan").prop("checked", false);

    //        }

    //       /*Loan Details*/

    //       /*Nominee Details*/
    //        jQuery("#relationship").val(response.data.memberNomineeDetails.relationshipName);
    //        jQuery("#nomineeKyc").val(response.data.memberNomineeDetails.kycName);
    //        jQuery("#nomineekycnumber").val(response.data.memberNomineeDetails.kycNumber);
    //        jQuery("#nomineename").val(response.data.memberNomineeDetails.nomineeName);
    //        jQuery("#nomineedob").val(response.data.memberNomineeDetails.dob);
    //        jQuery("#nomineegender").val(response.data.memberNomineeDetails.genderName);
    //       /*Nominee Details*/
           

    //    }
    //    else {
    //        swal(response.responseMsg, "", "error");
    //    }
    //},
    //viewCutsomerImages: function (typeId) {
    //    debugger;
    //    var custimageData = {

    //        "customerId": "10010000000327",
    //        "typeId": typeId
    //    }
    //    _http.post(MFPUBLICCUSTOMERAPI_URL + "api/general/customerimages", custimageData, _ViewCustomerDetails.viewCutsomerImagesLoadCompleted, authToken)
    //},
    //ViewCustomerDetails: function () {

    //    debugger;
    //    var ViewCustomerDetailsFillData = {

    //        "applicationId": appId,
    //        "customerId": custId

    //    };
    //    _http.post(MFPUBLICCUSTOMERAPI_URL + "api/general/customerdetails", ViewCustomerDetailsFillData, _ViewCustomerDetails.ViewCustomerDetailsLoadCompleted, authToken)
    //},
};

jQuery(document).ready(function ($) {
    debugger;
    
    appId = getUrlParameter('ApplicationId');
    custId = getUrlParameter('CustomerId');
    authToken = getUrlParameter('authToken');
    _ViewCustomerDetails.ViewCustomerDetails();
});
var getUrlParameter = function getUrlParameter(sParam) {
    debugger;
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

