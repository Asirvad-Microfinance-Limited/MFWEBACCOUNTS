var recordingIdData = new Array();
var collectionNameData = new Array();
var custIdData = new Array();
//var applicationIdData = new Array();
//var accountNoData = new Array();
//var ifscCodeData = new Array();
var bankVerificationDetails = new Array();
var applicationId ;
var customerrId ;
var accountNo ;
var ifscCode;
var customerId;
var custIdforImage;


var RecordingId ;
        var CollectionName ;
// var bankName = val.userId;
var branchhName;
var _bankVerification = {
    closeOuterImgModal: function () {
       
        //jQuery('#ViewImagesCustNomModal').hide();
        jQuery("#ViewImagesCustNomModal .close").click()
    },
    showCustomerData: function (applicationID, customerID) {
     
        custIdforImage = customerID;
        jQuery('#viewUploads').load(DOMAIN_URL + 'customerdatadetails?ApplicationId=' + applicationID + '&CustomerId=' + customerID +'authToken='+userdata.token, function () {
      
           
            var ViewCustomerDetailsFillData = {

                "applicationId": applicationID,
                "customerId": customerID

            }
            _http.post(MFPUBLICCUSTOMERAPI_URL + "api/general/customerdetails", ViewCustomerDetailsFillData, _bankVerification.ViewCustomerDetailsLoadCompleted, userdata.token)
            jQuery("#custdtlViewModal").modal('show');
        });
      
    },

    BankVerificationMembersLoadTableCompleted: function (response) {
       
        jQuery('#maincard').show();

        if (response.status === "SUCCESS") {
            
            if (response.data.bankVerificationDetails.length > 0) {
               
                jQuery('#divbankverification').empty();
                var $table = jQuery('<table class="table" id="tblBankVerification">');
                bankVerificationDetails = [];
                custIdData = [];

                $table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:left;">Branch Name</th><th style="text-align:center;">Member ID</th><th style="text-align:left;">Member Name</th><th style="text-align:left;">Account Holder Name </th><th style="text-align:center;">Passbook View</th><th style="text-align:center;">Customer View</th><th style="text-align:center;">Approval</th><th style="text-align:center;">Reject</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.bankVerificationDetails, function (i, val) {
                  
                    custIdData.push(val.customerId);
                    //applicationIdData.push(val.applicationID);
                    //accountNoData.push(val.accountNo);
                    //ifscCodeData.push(val.ifsc);

                    bankVerificationDetails = response['data']['bankVerificationDetails'];
                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="left">').html(val.branchName));
                    $row.append(jQuery('<td align="center">').html(val.customerId));
                    $row.append(jQuery('<td align="left">').html(val.customerName));
                    $row.append(jQuery('<td align="left">').html(val.accountName));                    
                    $row.append(jQuery('<td align="center">').html('<button type="button"  class="btnsmall  btn-danger fc-center" data-target="#bankpassbookViewModal" data-toggle="modal" class="btn btn-danger fc-center"  onClick="_bankVerification.PassbookViewCustData(' + i + ',0,0);"> <i class="fa fa-eye" style="font-size:15px;"></i></button> '));
                    $row.append(jQuery('<td align="center">').html('<button type="button"  class="btnsmall  btn-danger fc-center" data-target="#custdtlViewModal" data-toggle="modal" class="btn btn-danger fc-center"  onClick="_bankVerification.showCustomerData(' + val.applicationID + ',' + val.customerId +');"> <i class="fa fa-eye" style="font-size:15px;"></i></button> '));
                    $row.append(jQuery('<td align="center">').html('<button type="button"  class="btnsmall  btn-success fc-center"  class="btn btn-danger fc-center"  onClick="_bankVerification.PassbookViewCustData(' + i + ',1,1);"> <i class="fa fa-check style="font-size:15px;"></i></button> '));
                    $row.append(jQuery('<td align="center">').html('<button type="button"  class="btnsmall  btn-danger fc-center"  class="btn btn-danger fc-center"  onClick="_bankVerification.PassbookViewCustData(' + i + ',1,0);"> <i class="fa fa-times" style="font-size:15px;"></i></button> '));
                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divbankverification').html($table);
                jQuery('#tblBankVerification').DataTable({
                    "aLengthMenu": [[8, 10, 25, 50, 75, -1], [8, 10, 25, 50, 75, "All"]],
                    "iDisplayLength": -1
               
                });
            } else {
                jQuery('#divbankverification').hide();
                jQuery('#divbankverification').empty();
            }
        } else {

            _General.noData(jQuery('#divbankverification'), "No Data Found");

        }
    },
    //PassbookCustDataLoadCompleted: function (response) {

    //    if (response.status === "SUCCESS") {
    //        

    //        var customerBankPassbookViewData = response.data.customerBankPassbookViewData;
    //        RecordingId = customerBankPassbookViewData.recordingId;
    //        collectionName = customerBankPassbookViewData.collectionName;
    //       
    //       _bankVerification.PassbookViewData();
          

    //    }
    //    else {
    //        swal(response.responseMsg, "", "error");
    //    }
    //},
    PassbookViewDispLoadCompleted: function (response) {
       

        if (response.status === "SUCCESS") {
           
            //jQuery('#viewUpload').prepend('<img src="data:image/png;base64,' + response.data.imageString + '">')
            var $image = jQuery('<img src="data:image/png;base64,' + response.data.imageString + ' " height="500" width="900">');
            jQuery('#viewUpload').html($image);
            jQuery("#btnApprove").prop("disabled", false);
            jQuery("#btnRjt").prop("disabled", false);
            
        }
        else {
           // jQuery('#viewUpload').html("No Data Found");
            _General.noData(jQuery('#viewUpload'), "No Data Found");
            jQuery("#btnApprove").prop("disabled", true);
            jQuery("#btnRjt").prop("disabled", true);

        }
        //_bankVerification.BankVerificationMembersFill();
    },
    BankVerifyCheckLoadCompleted: function (response) {
        


        if (response.status === "SUCCESS") {
            

            //swal(response.responseMsg, "", "success");
            swal(response.responseMsg, "", "success");

        }
        else {
            //swal(response.responseMsg, "", "error");
            swal(response.responseMsg, "", "error");
        }
        _bankVerification.BankVerificationMembersFill();

    },
    
    BankVerificationMembersFill: function () {
        
        var userId = userdata.userId;
        var accesslevelId = userdata.accessLevelId;

        var BankVerificationMembersFillData = {
            
            "accesslevelId": accesslevelId,
            "userId": userId

        };
        _http.post(MFPUBLICLOSAPI_URL + "api/members/bankverificationdetails", BankVerificationMembersFillData,_bankVerification.BankVerificationMembersLoadTableCompleted, userdata.token)
    },
    PassbookViewCustData: function (i,statusVal,approveValue) {
        debugger;
        var custid = "";
        
        custid = custIdData[i];
        customerId = custid;
        if (statusVal == "1") {
            debugger;
            if (approveValue == "1") {
                
                _bankVerification.BankVerifyCheck(1);
            }
            else {
                
                _bankVerification.BankVerifyCheck(0);
            }
        }
        else {

       
        var PassbookViewCustData = {


            "custID": customerId

        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/banks/customerpassbookview", PassbookViewCustData, _bankVerification.PassbookViewDispLoadCompleted, userdata.token)
        }
    },
    clearForm: function () {


        jQuery('#viewUpload').empty();
        jQuery("#frmBankVerification")[0].reset();
        var validator = jQuery("#frmBankVerification").validate();
        validator.resetForm();
    },

   
   
    //PassbookViewData: function () {
    //   ;
        
    //    var PassbookViewDispData = {


    //        "recordingId": RecordingId,
    //        "collectionName": collectionName,
    //        "fileType": "string"

    //    };

    //    _http.post(MFPUBLICLOSAPI_URL + "api/loans/images", PassbookViewDispData, _bankVerification.PassbookViewDispLoadCompleted, userdata.token)
    //},


    BankVerifyCheck: function (statusval) {
        debugger;
        var userid = userdata.userId;
        //bankVerificationDetails = [];

        
        jQuery.each(bankVerificationDetails, function (i, val) {
            
            if (customerId == val.customerId) {
                
            
            applicationId = val.applicationID;
            customerrId = val.customerId;
            accountNo = val.accountNo;
                ifscCode = val.ifsc;
            }
            

        });
        
        
        



        var bankverifyData = {
            "applicationId": applicationId,
            "memberId": customerrId,
            "bankStatus": statusval,// 1-approve button,0-reject button
            "userId": userid,
            "typeId": 1,//hardcoded as 1 for member
            "accountNo": accountNo,
            "ifsc": ifscCode,
            "statusId": statusval// 1-approve button,0-reject button
        };

        _http.post(MFPUBLICLOSAPI_URL + "api/members/bankverification", bankverifyData, _bankVerification.BankVerifyCheckLoadCompleted, userdata.token)
     
    },


/*CustomerDetailsView*/

    viewCutsomerImagesLoadCompleted: function (response) {
        if (response.status == "SUCCESS") {
            var $image = jQuery('<img src="data:image/png;base64,' + response.data.imageString + ' " height="500" width="900">');
            jQuery('#viewUploadedImages').html($image);
        }
        else {

        }
    },
    ViewCustomerDetailsLoadCompleted: function (response) {

        if (response.status == "SUCCESS") {
    
            /*Task Details*/
            if ((response.data.tasksStatus[0].taskId == 2) && (response.data.tasksStatus[0].statusId == 1)) {
               
                jQuery('#personalDetailsBtn').removeClass('btn btn-primary ');
                jQuery('#personalDetailsBtn').addClass('btn btn-success');
            }
            else {
                jQuery('#personalDetailsBtn').removeClass('btn btn-success ');
                jQuery('#personalDetailsBtn').addClass('btn btn-primary');
            }
            if ((response.data.tasksStatus[1].taskId == 3) && (response.data.tasksStatus[1].statusId == 1)) {
               
                jQuery('#bankDetailsBtn').removeClass('btn btn-primary ');
                jQuery('#bankDetailsBtn').addClass('btn btn-success');
            }
            else {
                jQuery('#bankDetailsBtn').removeClass('btn btn-success ');
                jQuery('#bankDetailsBtn').addClass('btn btn-primary');
            }
            if ((response.data.tasksStatus[2].taskId == 4) && (response.data.tasksStatus[2].statusId == 1)) {
               
                jQuery('#loanDetailsBtn').removeClass('btn btn-primary ');
                jQuery('#loanDetailsBtn').addClass('btn btn-success');
            }
            else {
                jQuery('#loanDetailsBtn').removeClass('btn btn-success ');
                jQuery('#loanDetailsBtn').addClass('btn btn-primary');
            }
            if ((response.data.tasksStatus[3].taskId == 5) && (response.data.tasksStatus[3].statusId == 1)) {
               
                jQuery('#nomineeDetailsBtn').removeClass('btn btn-primary ');
                jQuery('#nomineeDetailsBtn').addClass('btn btn-success');
            }
            else {
                jQuery('#nomineeDetailsBtn').removeClass('btn btn-success ');
                jQuery('#nomineeDetailsBtn').addClass('btn btn-primary');
            }
           
            if ((response.data.tasksStatus[4].taskId == 6) && (response.data.tasksStatus[4].statusId == 1)) {

                jQuery('#imgDetailsBtn').removeClass('btn btn-primary ');
                jQuery('#imgDetailsBtn').addClass('btn btn-success');
            }
            else {
                jQuery('#imgDetailsBtn').removeClass('btn btn-success ');
                jQuery('#imgDetailsBtn').addClass('btn btn-primary');
            }
            /*Task Details*/
            /*Personal Details*/
            jQuery("#kycName").val(response.data.customerPersonalDetails.primaryKycName);
            jQuery("#kycid").val(response.data.customerPersonalDetails.primaryKycNo);
            jQuery("#salutation").val(response.data.customerPersonalDetails.salutationName);
            jQuery("#custName").val(response.data.customerPersonalDetails.firstName);
            jQuery("#gender").val(response.data.customerPersonalDetails.genderName);
            jQuery("#dob").val(response.data.customerPersonalDetails.dob);
            jQuery("#honame").val(response.data.customerPersonalDetails.houseName);
            jQuery("#landmark").val(response.data.customerPersonalDetails.locality);
            jQuery("#street").val(response.data.customerPersonalDetails.street);
            jQuery("#city").val(response.data.customerPersonalDetails.city);
            jQuery("#pincode").val(response.data.customerPersonalDetails.pincode);
            jQuery("#place").val(response.data.customerPersonalDetails.postOffice);
            jQuery("#district").val(response.data.customerPersonalDetails.districtName);
            jQuery("#state").val(response.data.customerPersonalDetails.stateName);
            jQuery("#country").val(response.data.customerPersonalDetails.countryName);
            jQuery("#txtMob").val(response.data.customerPersonalDetails.mobileNo);
            jQuery("#txtMobAlternative").val(response.data.customerPersonalDetails.altMobileNo);
            var addrStatus = response.data.customerPersonalDetails.addressStatus;
            if (addrStatus == 1) {
                jQuery("#rdoyes").prop("checked", true);
                jQuery("#mailhouse").val(response.data.customerPersonalDetails.houseName);
                jQuery("#maillandmaark").val(response.data.customerPersonalDetails.locality);
                jQuery("#mailstreet").val(response.data.customerPersonalDetails.street);
                jQuery("#mailcity").val(response.data.customerPersonalDetails.city);
                jQuery("#mailpincode").val(response.data.customerPersonalDetails.pincode);
                jQuery("#mailstate").val(response.data.customerPersonalDetails.stateName);
                jQuery("#maildistrict").val(response.data.customerPersonalDetails.districtName);
                jQuery("#mailcountry").val(response.data.customerPersonalDetails.countryName);

            }
            else {
                jQuery("#rdono").prop("checked", true);
                jQuery("#mailhouse").val(response.data.customerPersonalDetails.altHouse);
                jQuery("#maillandmaark").val(response.data.customerPersonalDetails.altLocality);
                jQuery("#mailstreet").val(response.data.customerPersonalDetails.altStreet);
                jQuery("#mailcity").val(response.data.customerPersonalDetails.altCity);
                jQuery("#mailpincode").val(response.data.customerPersonalDetails.altPincode);
                jQuery("#mailstate").val(response.data.customerPersonalDetails.alternateState);
                jQuery("#maildistrict").val(response.data.customerPersonalDetails.alternateDistrict);
                jQuery("#mailcountry").val(response.data.customerPersonalDetails.countryName);

            }
            jQuery("#fname").val(response.data.customerPersonalDetails.fatherName);
            jQuery("#fage").val(response.data.customerPersonalDetails.fatherAge);
            jQuery("#Mname").val(response.data.customerPersonalDetails.motherName);
            jQuery("#mage").val(response.data.customerPersonalDetails.motherAge);
            jQuery("#mrgstatus").val(response.data.customerPersonalDetails.maritalName);
            jQuery("#spouseName").val(response.data.customerPersonalDetails.spouseName);
            jQuery("#citizenship").val(response.data.customerPersonalDetails.citizenName);
            jQuery("#occupation").val(response.data.customerPersonalDetails.occupationName);
            jQuery("#caste").val(response.data.customerPersonalDetails.casteName);
            jQuery("#religion").val(response.data.customerPersonalDetails.religionName);
            /*Personal Details*/

            /*Bank Details*/
            jQuery("#accHolderName").val(response.data.customerBankDetails.accountName);
            jQuery("#ifscCode").val(response.data.customerBankDetails.ifsc);
            jQuery("#bankName").val(response.data.customerBankDetails.bankName);
            jQuery("#branchname").val(response.data.customerBankDetails.branchName);
            jQuery("#accHolderNumber").val(response.data.customerBankDetails.accountNo);
            /*Bank Details*/

            /*Loan Details*/
            jQuery("#exceptedamt").val(response.data.memberLoanDetails.amount);
            jQuery("#loanTenure").val(response.data.memberLoanDetails.loanTenure);
            jQuery("#loanCategory").val(response.data.memberLoanDetails.loanCategoryName);
            jQuery("#loanpurpose").val(response.data.memberLoanDetails.loanPurposeName);
            var productId = response.data.memberLoanDetails.productId;
            if (productId == 1) {
                jQuery("#chkpdtloan").prop("checked", true);
                jQuery("#pdttypeandvendor").val(response.data.memberLoanDetails.productName);
                jQuery("#pdtprice").val(response.data.memberLoanDetails.productValue);

            }
            else {
                jQuery("#chkpdtloan").prop("checked", false);

            }

            /*Loan Details*/

            /*Nominee Details*/
            jQuery("#relationship").val(response.data.memberNomineeDetails.relationshipName);
            jQuery("#nomineeKyc").val(response.data.memberNomineeDetails.kycName);
            jQuery("#nomineekycnumber").val(response.data.memberNomineeDetails.kycNumber);
            jQuery("#nomineename").val(response.data.memberNomineeDetails.nomineeName);
            jQuery("#nomineedob").val(response.data.memberNomineeDetails.dob);
            jQuery("#nomineegender").val(response.data.memberNomineeDetails.genderName);
            /*Nominee Details*/


        }
        else {
            swal(response.responseMsg, "", "error");
        }
    },
    viewCutsomerImages: function (typeId) {
        
        var custimageData = {

            "customerId": custIdforImage,
            "typeId": typeId
        }
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/general/customerimages", custimageData, _bankVerification.viewCutsomerImagesLoadCompleted, userdata.token)
    },
    //ViewCustomerDetails: function () {

    //   
       
    //    _http.post(MFPUBLICCUSTOMERAPI_URL + "api/general/customerdetails", ViewCustomerDetailsFillData, _bankVerification.ViewCustomerDetailsLoadCompleted, authToken)
    //},
    /*CustomerDetailsView*/
  
    
}


_bankVerification.BankVerificationMembersFill();

jQuery(document).ready(function ($) {
 
    jQuery('#maincard').hide();





});