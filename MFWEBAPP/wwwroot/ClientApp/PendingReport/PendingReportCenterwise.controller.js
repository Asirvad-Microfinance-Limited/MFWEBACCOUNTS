
var totMemberCount = 0;
var totLoanAmnt = 0;
var pendingreportcenterwise = {
    closeOuterImgModal: function () {

        //jQuery('#ViewImagesCustNomModal').hide();
        jQuery("#ViewImagesCustNomModal .close").click()
    },
    showCustomerData: function (applicationID, customerID) {
        debugger;
       
        custIdforImage = customerID;
        jQuery('#viewUploads').load(DOMAIN_URL + 'customerdatadetails?ApplicationId=' + applicationID + '&CustomerId=' + customerID + 'authToken=' + userdata.token, function () {
            debugger;

            var ViewCustomerDetailsFillData = {

                "applicationId": applicationID,
                "customerId": customerID

            }
            _http.post(MFPUBLICCUSTOMERAPI_URL + "api/general/customerdetails", ViewCustomerDetailsFillData, pendingreportcenterwise.ViewCustomerDetailsLoadCompleted, userdata.token)
            jQuery("#custdtlViewModal").modal('show');
        });

    },
    showCenterReportCompleted: function (response) {

        
        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {
            
            if (response.data.centerWisePendingReport.length > 0) {
               

                jQuery('#divpendingreportcenterwise').empty();
                var $table = jQuery('<table class="table" id="tblpendingCenterreport">');

                $table.append('<thead><tr><th style="text-align:center;">#</th><th style="text-align:left;">Center</th><th style="text-align:center;">Application ID</th><th style="text-align:left;">Stage Name</th><th style="text-align:center;">Member Count</th><th style="text-align:center;">Member ID</th><th style="text-align:left;">Member Name</th><th style="text-align:left;">Nominee Name</th><th style="text-align:right;">Loan Amount</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.centerWisePendingReport, function (i, val) {

                    totMemberCount = totMemberCount + parseInt(val.memberCount);
                    totLoanAmnt = totLoanAmnt + parseInt(val.loanAmount);
                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i + 1));

                    $row.append(jQuery('<td align="left">').html(val.centerName));
                    $row.append(jQuery('<td align="center">').html(val.applicationId));
                    $row.append(jQuery('<td align="left">').html(val.stageName));
                    $row.append(jQuery('<td align="center">').html(val.memberCount));
                    $row.append(jQuery('<td align="center" style="color:blue;cursor: pointer;" data-target="#custdtlViewModal" data-toggle="modal"   onClick="pendingreportcenterwise.showCustomerData(' + val.applicationId + ',' + val.memeberId +');">').html(val.memeberId));
                    $row.append(jQuery('<td align="left">').html(val.memeberName));
                    $row.append(jQuery('<td align="left">').html(val.nomineeName));
                    $row.append(jQuery('<td align="right">').html(val.loanAmount));

                    $tbody.append($row);
                });

                var $row2 = jQuery('<tr style="background:#eaacac;">');
                $row2.append(jQuery('<td align="center">').html(''));
                $row2.append(jQuery('<td  align="left">').html('Total'));
                $row2.append(jQuery('<td align="center">').html(''));
                $row2.append(jQuery('<td align="center">').html(''));                
                $row2.append(jQuery('<td align="center">').html(totMemberCount));
                $row2.append(jQuery('<td align="center">').html(''));
                $row2.append(jQuery('<td align="center">').html(''));
                $row2.append(jQuery('<td align="center">').html(''));
                $row2.append(jQuery('<td align="right">').html(totLoanAmnt));
                $tbody.append($row2);

                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divpendingreportcenterwise').html($table);



            } else {
                jQuery('#divpendingreportcenterwise').hide();
                jQuery('#divpendingreportcenterwise').empty();
            }
        } else {
            _General.noData(jQuery('#divpendingreportcenterwise'), "No Data Found");
        }


    },



    showCenterReport: function () {
       
        var CenterID;
        var Centerreq;
        if (localStorage.getItem('BranchIDCenterReport') != null && localStorage.getItem('BranchIDPendingReport') != null) {

            CenterID = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("BranchIDCenterReport"), encryptkey).toString(CryptoJS.enc.Utf8));
            Centerreq = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("BranchIDPendingReport"), encryptkey).toString(CryptoJS.enc.Utf8));

        }
                
            var showCenterwiseReportData = {

                "branchId": Centerreq.branchid,
                "userId": userdata.userId,
                "stageId": 0,
                "centerId": CenterID
            };

        _http.post(MFPUBLICLOSAPI_URL + "api/reporst/centerwisependingreport", showCenterwiseReportData, pendingreportcenterwise.showCenterReportCompleted, userdata.token)

    },

    /*CustomerDetailsView*/

    viewCutsomerImagesLoadCompleted: function (response) {
        debugger;
        if (response.status == "SUCCESS") {
            debugger;
            var $image = jQuery('<img src="data:image/png;base64,' + response.data.imageString + ' " height="500" width="900">');
            jQuery('#viewUploadedImages').html($image);
        }
        else {

        }
    },
    ViewCustomerDetailsLoadCompleted: function (response) {
        debugger;
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
        debugger;
        var custimageData = {

            "customerId": custIdforImage,
            "typeId": typeId
        }
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/general/customerimages", custimageData, pendingreportcenterwise.viewCutsomerImagesLoadCompleted, userdata.token)
    },
   
    /*CustomerDetailsView*/
}


pendingreportcenterwise.showCenterReport();

jQuery(document).ready(function ($) {


});