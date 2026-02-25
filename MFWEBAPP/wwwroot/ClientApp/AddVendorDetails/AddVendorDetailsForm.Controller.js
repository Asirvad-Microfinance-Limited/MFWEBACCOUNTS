

var userId = userdata.userId;
var branchId = userdata.branchId;
var postalDetails = new Array();
var otpval="";
var verifyflag = 0;
var bnkVerifyFlag = 0;
var pinSerialNo;
var accNo = "";
var stateId;
var confirmAccNo = "";
var acctHolderName = "";
var bankBranchName = "";
var gstTyVal;
var EditStatus = 0;
var PinSerial = 0;
var VendorID = 0;
var delay = 3000;
var Percentage = 0;
var bankDetailssData;
var ifscData;
var mobileNumberr;
var nameMatchPercentFlag=0;
var _addVendorDetails = {
    AddVendorDetailsLoadCompleted: function (response) {
       
        if (response.status === "SUCCESS") {
            
            var errmsg = response.responseMsg;
            var msg = errmsg.split(".");
            //swal(msg[0], msg[1], "success");
            swal({
                title: msg[0] ,
                text: msg[1],
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-success",
                confirmButtonText: "OK",
                closeOnConfirm: false
            },
                function () {
                    window.location.href = DOMAIN_URL + "addvendor";
                });
        }
        else {

            swal(response.responseMsg, "", "error");
        }
    _addVendorDetails.clearForm();
    jQuery(".progress-bar").attr("aria-valuenow", 0);
    jQuery("#divShowBankDetails").hide();

 
    },

    postOfficeDetailsLoadCompleted: function (response) {
        if (response.status === "SUCCESS") {
           

            if (response.data.postOfficeList.length > 0) {
                postalDetails = response.data.postOfficeList;
                jQuery("#ddlPostOffice").empty();
                jQuery("#ddlPostOffice").append(jQuery("<option></option>").val("0").text("-- Choose Post Office--"));
                jQuery.each(response.data.postOfficeList, function (i, val) {
                    jQuery("#ddlPostOffice").append(jQuery("<option></option>").val(val.serialNo).text(val.postOfficeName));
                });
            }
            else {
                jQuery("#ddlPostOffice").empty();
                jQuery("#ddlPostOffice").append(jQuery("<option></option>").val("0").text("-- Choose Post Office --"));
            }

        }
        else {

            jQuery("#ddlPostOffice").empty();
            jQuery("#ddlPostOffice").append(jQuery("<option></option>").val("0").text("-- Choose Post Office --"));
        }
        if (EditStatus === 1) {

            jQuery("#ddlPostOffice").val(PinSerial);
            _addVendorDetails.postDetails();
        }
        else
        {

        }

    },

    mobileOTPVerifyLoadCompleted: function (response) {
       
        
        if (response.status === "SUCCESS") {
          
            otpval = response.data.otp;
            jQuery('#otp').prop("disabled", false);
           
            //alert(response.data.message);         
        }

        else {
            swal(response.responseMsg, "", "error");

            jQuery('#otp').prop("disabled", true);

        }

    },
    get: function (url, success) {
        
        return jQuery.ajax({
            url: url,
            
            success: function (resp, textStatus, xhr) {
                if (xhr.status === 200) {
                    success();
                }
            },
            error: function (xhr, textStatus, errorThrown) {

                
            
            }
        });
    },
   
    editDataLoadCompleted: function (response) {
     
        
        if (response.status === "SUCCESS") {
          
            mobileNumberr = response.data.vendorDetails.mobile;
            jQuery("#btnsend").prop("disabled", false);

            jQuery("#ddlGstType").val(response.data.vendorDetails.gstType);
            jQuery("#gstNo").val(response.data.vendorDetails.gstNumber);
            jQuery("#vname").val(response.data.vendorDetails.vendorName);
            jQuery("#vaddress").val(response.data.vendorDetails.address);
            jQuery("#panNo").val(response.data.vendorDetails.panNo);
            jQuery("#pincode").val(response.data.vendorDetails.pinCode); 
            jQuery("#emailId").val(response.data.vendorDetails.emailId); 
            jQuery("#contactPerson").val(response.data.vendorDetails.contactPerson); 
            jQuery("#contactNo").val(response.data.vendorDetails.contactNo); 
            jQuery("#ifsc").val(response.data.vendorDetails.ifscCode);  
            jQuery("#bankName").val(response.data.vendorDetails.bankName);  
            jQuery("#mobileNo").val(response.data.vendorDetails.mobile);
            jQuery("#accNo").val(response.data.vendorDetails.accountNo);  
            jQuery("#confirmAccNo").val(response.data.vendorDetails.accountNo);  
            
            EditStatus = 1;
            PinSerial = response.data.vendorDetails.pinSerial;
            _addVendorDetails.postOfficeDetails();
           
            
        }

        else {
           

        }

    },
    bankDetailsWithIFSCLoadCompleted: function (response) {
     
        if (response.status === "SUCCESS") {
         
            ifscData = response.data.searchIFSCData;
            jQuery("#bankName").val(ifscData.bankname);
            bankBranchName = ifscData.branchName;
           
            
        }
        else {
            swal(response.responseMsg, "", "error");
            jQuery("#bankName").val("");
        }
    },
    
    bankDetailsVerifyLoadCompleted: function (response) {
    
        if (response.status === "SUCCESS") {
           
            bankDetailssData = response['data'];

            jQuery("#divShowBankDetails").show();
            acctHolderName = response.data.beneName;
            jQuery("#accHolderName").val(acctHolderName);
            jQuery("#branchName").val(bankBranchName);
            var accHolderNamee = jQuery("#accHolderName").val();
            var contactPersonName = jQuery("#contactPerson").val();
            if (accHolderNamee == contactPersonName) {
                jQuery('#divpercentValue').html('100%');

                jQuery(".progress-bar").attr("aria-valuenow", 100);
                jQuery(".progress-bar").each(function (i) {
                    jQuery(".progress-bar").delay(delay * i).animate({ width: jQuery(".progress-bar").attr('aria-valuenow') + '%' }, delay);

                    jQuery(".progress-bar").prop('Counter', 0).animate({
                        //Counter: $(this).text()
                    }, {
                            duration: delay,
                            easing: 'swing',
                            step: function (now) {
                                //$(this).text(Math.ceil(now) + '%');
                            }
                        });
                });


            }
            //else if (accHolderNamee != contactPersonName) {

            //    jQuery(".progress-bar").attr("aria-valuenow", 0);
            //    jQuery(".progress-bar").each(function (i) {
            //        jQuery(".progress-bar").delay(delay * i).animate({ width: jQuery(".progress-bar").attr('aria-valuenow') + '%' }, delay);

            //        jQuery(".progress-bar").prop('Counter', 0).animate({
            //            //Counter: $(this).text()
            //        }, {
            //                duration: delay,
            //                easing: 'swing',
            //                step: function (now) {
            //                    //$(this).text(Math.ceil(now) + '%');
            //                }
            //            });
            //    });
            //}
            else if (accHolderNamee.length == 0 || contactPersonName.length == 0) {
             
                jQuery('#divpercentValue').html('0%');

                jQuery(".progress-bar").attr("aria-valuenow", 0);
                jQuery(".progress-bar").each(function (i) {
                    jQuery(".progress-bar").delay(delay * i).animate({ width: jQuery(".progress-bar").attr('aria-valuenow') + '%' }, delay);

                    jQuery(".progress-bar").prop('Counter', 0).animate({
                        //Counter: $(this).text()
                    }, {
                            duration: delay,
                            easing: 'swing',
                            step: function (now) {
                                //$(this).text(Math.ceil(now) + '%');
                            }
                        });
                });
            }
          
            else {
             
                var contactPersonName1 = jQuery("#contactPerson").val().toLowerCase();
                var accHolderName1 = jQuery("#accHolderName").val().toString().toLowerCase();  

                var accHolderNameLen = String(accHolderName1);
                var contactPersonLen = String(contactPersonName1);

                var accLENGT = accHolderNameLen.length;
                var conENGT = contactPersonLen.length;


                var maxLen = accLENGT > conENGT ? accLENGT : conENGT;
                var minLen = accLENGT < conENGT ? accLENGT : conENGT;
                var sameCharAtIndex = 0;
                for ( i = 0; i < minLen; i++) //Compare char by char
                {
                    if (accHolderName1[i] == contactPersonName1[i]) {
                        sameCharAtIndex++;
                    }
                }

                Percentage = Math.round(sameCharAtIndex / maxLen * 100);
                jQuery('#divpercentValue').html(Percentage + '%');

                jQuery(".progress-bar").attr("aria-valuenow", Percentage);
                jQuery(".progress-bar").each(function (i) {
                    jQuery(".progress-bar").delay(delay * i).animate({ width: jQuery(".progress-bar").attr('aria-valuenow') + '%' }, delay);

                    jQuery(".progress-bar").prop('Counter', 0).animate({
                        //Counter: $(this).text()
                    }, {
                            duration: delay,
                            easing: 'swing',
                            step: function (now) {
                                //$(this).text(Math.ceil(now) + '%');
                            }
                        });
                });

            }
        nameMatchPercentFlag=1;
        }
        else {
           
            jQuery("#divShowBankDetails").hide();
            swal(response.responseMsg, "", "error");
        }

    },


    vendorDetails: function () {
      
        
        if (VendorID == null) {
            VendorID = 0;
        }
        else {
            VendorID = VendorID;
        }
       
       
        var vendorDetailsData = {
           
            "vendorId": VendorID ,//0-new,otherwise vendorId 
            "vendorName": jQuery('#vname').val(),
            "address": jQuery('#vaddress').val(),
            "pincode": jQuery('#pincode').val(),
            "gstStateId": jQuery('#stateId').val(),
            "gstNumber": jQuery('#gstNo').val(),
            "pinSerial": jQuery('#ddlPostOffice').val(),
            "gstType": gstTyVal,
            "mobile": jQuery('#mobileNo').val(),
            "contactNo": jQuery('#contactNo').val(),
            "emailId": jQuery('#emailId').val(),
            "verifyFlag": verifyflag,
            "contactPerson": jQuery('#contactPerson').val(),
            "pan": jQuery('#panNo').val(),
            "accountNo": jQuery('#accNo').val(),        
            "bankName":jQuery('#bankName').val(), 
            "bankBranch": jQuery('#branchName').val(), 
            "ifsc": jQuery('#ifsc').val(),
            "userId": userId,
            "statusId":1

        };
        _http.post(MFPUBLICLOSAPI_URL + "api/products/productvendors", vendorDetailsData, _addVendorDetails.AddVendorDetailsLoadCompleted, userdata.token)
         
    },

    postOfficeDetails: function () {
       
        var postOfficeDetailsData = {
            "typeId": 1,
            "typeValue": parseInt(jQuery('#pincode').val())
        };
        _http.post(MFPUBLICLOSAPI_URL + "api/centers/postofficelist", postOfficeDetailsData, _addVendorDetails.postOfficeDetailsLoadCompleted, userdata.token)

    },
    editData: function (vendorID) {
        
        var editData = {

            "vendorId": vendorID
        }

        _http.post(MFPUBLICLOSAPI_URL + "api/products/vendordetails", editData, _addVendorDetails.editDataLoadCompleted, userdata.token)

    },
    mobileOTPDetails: function () {
        
        var mobileOTPDetailsData = {
            "userId": userId,
            "mobileNo": jQuery("#mobileNo").val(),
            "typeId": 2
        };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/general/otp", mobileOTPDetailsData, _addVendorDetails.mobileOTPVerifyLoadCompleted, userdata.token)

    },
    bankDetailsSearchByIFSC: function () {
       
        var bankSearchData = {
            "ifsc": jQuery("#ifsc").val().toString()
        };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/banks/searchifsc", bankSearchData, _addVendorDetails.bankDetailsWithIFSCLoadCompleted, userdata.token)
    },

    bankDetails: function () {
      
        var bankDetailsData = {
            "account": jQuery('#accNo').val(),
            "ifsc": jQuery('#ifsc').val(),
            "firmId": "1", //hardcoded
            "empId": userId
        };
        _http.post(MFAADHARAPI_URL + "api/bank", bankDetailsData, _addVendorDetails.bankDetailsVerifyLoadCompleted, userdata.token)

    },

    postDetails: function () {
        jQuery.each(postalDetails, function (i, val) {
            
            if (jQuery("#ddlPostOffice").val() == val.serialNo) {
                jQuery("#district").val(val.districtName);
                jQuery("#state").val(val.stateName);
                jQuery("#country").val(val.countryName);
                jQuery("#stateId").val(val.stateId);
               
            }
            else
            {
                jQuery("#district").text("");
                jQuery("#state").text("");
                jQuery("#country").text("");

            }
          
        });
    },
    mobileOTPVerify: function (otps) {
        
        var cmpOtp = "";
        cmpOtp = jQuery("#otp").val().toString();
        var n = otps.localeCompare(cmpOtp);
        if (n == 0) {
            jQuery('#otp').removeClass('is-invalid form-control');
            jQuery('#otp').addClass('form-control is-valid form-control-success');
            verifyflag = 1;
            jQuery("#save").prop("disabled", false);

        }
        else {
           
            jQuery('#otp').removeClass('form-control is-valid form-control-success ');
            jQuery('#otp').addClass('is-invalid form-control');
            verifyflag = 0;
            jQuery("#save").prop("disabled", true);

        }
    },
    compareAccNo: function () {
   
        accNo = jQuery("#accNo").val();
        confirmAccNo = jQuery("#confirmAccNo").val();
        if (accNo === confirmAccNo) {
            jQuery('#confirmAccNo').removeClass('is-invalid ');
            jQuery('#confirmAccNo').addClass('is-valid form-control-success');
            bnkVerifyFlag = 1;
          _addVendorDetails.bankDetails();
        }
        else {
            jQuery('#confirmAccNo').removeClass('is-valid form-control-success');
            jQuery('#confirmAccNo').addClass('is-invalid ');
        }
    },
    gstTypeValue: function () {
        
        var gstTypeVal = jQuery('#ddlGstType').find(':selected').val();
        if (gstTypeVal == 1) {
            gstTyVal = 1;
        }
        else if (gstTypeVal == 2){
            gstTyVal = 2;
        }
        else {
            gstTyVal = 0;
        }
    },
    
    clearForm: function () {
        
           
        jQuery("#frmAddVendorDetails")[0].reset();
        var validator = jQuery("#frmAddVendorDetails").validate();
        vendorID = "0";
        validator.resetForm();
    }
}



jQuery(document).ready(function ($) {
    
    jQuery("#divShowBankDetails").hide();
    jQuery('.error').addClass("error-msg");
    verifyflag = 1;
    //validation


    jQuery.validator.addMethod('ddlGstType', function (value, element) {

        return (value != '0');
    }, 'Please Select GST Type');
    jQuery.validator.addMethod('ddlPostOffice', function (value, element) {

        return (value != '0');
    }, 'Please Select Post Office');

    jQuery.validator.addMethod("gstnoval", function (value, element) {
        return this.optional(element) || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value);
    }, "Please Enter Valid GSTIN");

    jQuery.validator.addMethod("Namevalid", function (value, element) {
        return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
    }, "Please enter valid name");

    jQuery.validator.addMethod("panno", function (value, element) {
        return this.optional(element) || /([A-Z]){5}([0-9]){4}([A-Z]){1}$/i.test(value);
    }, "Please enter a valid pan no");
    jQuery.validator.addMethod("validatephonenumber", function (value, element) {
        return this.optional(element) || /^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/.test(value);
    }, "Please Enter Valid Mobile Number");
    jQuery.validator.addMethod("emailvalid", function (value, element) {
        return this.optional(element) || /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i.test(value);
    }, "Please Enter Valid E-mail ID");

    jQuery("#frmAddVendorDetails").validate({

        rules: {


            ddlGstType: {
                required: true,
                ddlGstType: true

            },
            ddlPostOffice: {
                required: true,
                ddlPostOffice: true
            },
            gstNo: {
                required: true,
                gstnoval: true,
            },
            vname: {
                required: true,
                Namevalid: true,
                maxlength: 25,
            },
            vaddress: {
                required: true,
                maxlength: 150,
            },
            panNo: {
                required: true,
                panno: true,

            },
            pincode: {
                required: true
            },
            district: {
                required: true
            },
            state: {
                required: true
            },
            country: {
                required: true
            },
            emailId: {
                required: true,
                emailvalid: true
            },
            contactPerson: {
                required: true,
                Namevalid: true,
                maxlength: 25,
            },
            contactNo: {
                required: true,
                validatephonenumber: true,
            },
            ifsc: {
                required: true
            },
            bankName: {
                required: true
            },
            accNo: {
                required: true
            },
            confirmAccNo: {
                required: true
            },

            mobileNo: {
                required: true,
                validatephonenumber: true,
            },

            otp: {
                required: true
            }


        },
        messages:
        {


            gstNo: {
                required: "Please Enter GST Number"

            },
            vname: {
                required: "Please Enter Name"

            },
            vaddress: {
                required: "Please Enter Address"

            },
            panNo: {
                required: "Please Enter PAN Number"

            },
            pincode: {
                required: "Please Enter Pincode"

            },

            district: {
                required: "Please Enter District Name"
            },

            state: {
                required: "Please Enter State Name"
            },
            country: {
                required: "Please Enter Country Name"
            },
            emailId: {
                required: "Please Enter E-mail ID"
            },
            contactPerson: {
                required: "Please Enter Name"
            },
            contactNo: {
                required: "Please Enter Mobile Number"
            },
            ifsc: {
                required: "Please Enter IFSC Code"
            },
            bankName: {
                required: "Please Enter Bank Name"
            },
            accNo: {
                required: "Please Enter Account Number"
            },
            confirmAccNo: {
                required: "Please Enter Confirm Account Number"
            },
            mobileNo: {
                required: "Please Enter Mobile Number"
            },
            otp: {
                required: "Please Enter OTP"
            },
        },


        submitHandler: function (form) {
            _addVendorDetails.vendorDetails(VendorID);


        }
    });







    //validation
    
    
    jQuery("#mobileNo").change(function (e) {
       
        var mobNo = jQuery("#mobileNo").val();
        var otpvallue = jQuery("#otp").val();
        if (EditStatus==1) {
            if (mobileNumberr != mobNo) {
                
                verifyFlag = 0;
                swal("","Please Verify Mobile Number","warning")
                jQuery("#save").prop("disabled", true);

            }
           
        }
        if (mobNo.length == 10  ) {
            jQuery("#btnsend").prop("disabled", false);

        }
        else {
            jQuery("#btnsend").prop("disabled", true);

        }
        if (mobNo == "") {
            jQuery("#otp").val("");
        }

    });
  
    var mobNo = jQuery("#mobileNo").val();
    var otpvallue = jQuery("#otp").val();
    if ((mobNo && otpvallue) == "") {
       
        jQuery("#btnsend").prop("disabled", true);
    }
    else {
        
        jQuery("#btnsend").prop("disabled", false);
    }
    if (verifyflag == 0) {
      
        jQuery("#save").prop("disabled", true);
    }
    else {
      
        jQuery("#save").prop("disabled", false);

    }

    //jQuery("#emailId").autocomplete({
       
    //    disabled: true
    //});
    //jQuery("#accNo").autocomplete({
    //    disabled: true
    //});
    //jQuery("#emailId").keyup(function (e) {
       
    //});
    //$(this).on('keydown', function () {
    //    switch (event.keyCode) {
    //        case 27: // escape this.hide(); break; default: this.request(); break; } }); 
  
    if (localStorage.getItem('vendorIdForEdit') != "") {
         VendorID = localStorage.getItem('vendorIdForEdit');
        _addVendorDetails.editData(VendorID)
        localStorage.removeItem('vendorIdForEdit');
    }
    else {

    }

    jQuery("#pincode").change(function (e) {
       
        _addVendorDetails.postOfficeDetails();

    });
    jQuery("#ddlPostOffice").change(function (e) {
   
        _addVendorDetails.postDetails();

    });

   
    jQuery("#btnsend").click(function (e) {
      
        _addVendorDetails.mobileOTPDetails();

    });

    jQuery("#otp").change(function (e) {
       
        _addVendorDetails.mobileOTPVerify(otpval);


    });

    jQuery("#btnverifymobile").click(function (e) {
        verifyflag = 1;


    });

   
    jQuery("#ifsc").change(function (e) {
       
        _addVendorDetails.bankDetailsSearchByIFSC();

    });

    jQuery("#confirmAccNo").keyup(function (e) {
        
        _addVendorDetails.compareAccNo();


    });

    jQuery("#ddlGstType").change(function (e) {
       
        _addVendorDetails.gstTypeValue();


    });

    jQuery("#pincode").keyup(function (e) {
        if (/\D/g.test(this.value)) {
            
            this.value = this.value.replace(/\D/g, '');
        }
    });

    jQuery("#ifsc").keyup(function (e) {
        if (/[^A-Z0-9]/ig.test(this.value)) {
            
            this.value = this.value.replace(/[^A-Z0-9]/ig, '');
        }
    });
    jQuery("#contactNo").keyup(function (e) {
        if (/\D/g.test(this.value)) {

            this.value = this.value.replace(/\D/g, '');
        }
    });
    jQuery("#mobileNo").keyup(function (e) {
        if (/\D/g.test(this.value)) {

            this.value = this.value.replace(/\D/g, '');
        }
    });
    jQuery("#otp").keyup(function (e) {
        if (/\D/g.test(this.value)) {

            this.value = this.value.replace(/\D/g, '');
        }
    });
    jQuery("#accNo").keyup(function (e) {
        if (/\D/g.test(this.value)) {

            this.value = this.value.replace(/\D/g, '');
        }
    });
    jQuery("#confirmAccNo").keyup(function (e) {
        if (/\D/g.test(this.value)) {

            this.value = this.value.replace(/\D/g, '');
        }
    });
    jQuery("#vname").keyup(function (e) {
        if (/\D/g.test(this.value)) {

            this.value = this.value.replace(/[^a-zA-Z\s]+$/g, '');
        }
    });
    jQuery("#contactPerson").keyup(function (e) {
        if (/\D/g.test(this.value)) {

            this.value = this.value.replace(/[^a-zA-Z\s]+$/g, '');
        }
    });
    jQuery("#contactPerson").keyup(function (e) {
    
        if (nameMatchPercentFlag == 1) {
           

            acctHolderName = bankDetailssData.beneName;
            jQuery("#accHolderName").val(acctHolderName);
            jQuery("#branchName").val(bankBranchName);
            var accHolderNamee = jQuery("#accHolderName").val();
            var contactPersonName = jQuery("#contactPerson").val();
            if (accHolderNamee == contactPersonName) {
                jQuery('#divpercentValue').html('100%');

                jQuery(".progress-bar").attr("aria-valuenow", 100);
                jQuery(".progress-bar").each(function (i) {
                    jQuery(".progress-bar").delay(delay * i).animate({ width: jQuery(".progress-bar").attr('aria-valuenow') + '%' }, delay);

                    jQuery(".progress-bar").prop('Counter', 0).animate({
                        //Counter: $(this).text()
                    }, {
                            duration: delay,
                            easing: 'swing',
                            step: function (now) {
                                //$(this).text(Math.ceil(now) + '%');
                            }
                        });
                });


            }
       
            else if (accHolderNamee.length == 0 || contactPersonName.length == 0) {
             
                jQuery('#divpercentValue').html('0%');

                jQuery(".progress-bar").attr("aria-valuenow", 0);
                jQuery(".progress-bar").each(function (i) {
                    jQuery(".progress-bar").delay(delay * i).animate({ width: jQuery(".progress-bar").attr('aria-valuenow') + '%' }, delay);

                    jQuery(".progress-bar").prop('Counter', 0).animate({
                        //Counter: $(this).text()
                    }, {
                            duration: delay,
                            easing: 'swing',
                            step: function (now) {
                                //$(this).text(Math.ceil(now) + '%');
                            }
                        });
                });
            }

            else {
             
                var contactPersonName1 = jQuery("#contactPerson").val().toLowerCase();
                var accHolderName1 = jQuery("#accHolderName").val().toString().toLowerCase();

                var accHolderNameLen = String(accHolderName1);
                var contactPersonLen = String(contactPersonName1);

                var accLENGT = accHolderNameLen.length;
                var conENGT = contactPersonLen.length;


                var maxLen = accLENGT > conENGT ? accLENGT : conENGT;
                var minLen = accLENGT < conENGT ? accLENGT : conENGT;
                var sameCharAtIndex = 0;
                for (i = 0; i < minLen; i++) //Compare char by char
                {
                    if (accHolderName1[i] == contactPersonName1[i]) {
                        sameCharAtIndex++;
                    }
                }

                Percentage = Math.round(sameCharAtIndex / maxLen * 100);
                jQuery('#divpercentValue').html(Percentage + '%');

                jQuery(".progress-bar").attr("aria-valuenow", Percentage);
                jQuery(".progress-bar").each(function (i) {
                    jQuery(".progress-bar").delay(delay * i).animate({ width: jQuery(".progress-bar").attr('aria-valuenow') + '%' }, delay);

                    jQuery(".progress-bar").prop('Counter', 0).animate({
                        //Counter: $(this).text()
                    }, {
                            duration: delay,
                            easing: 'swing',
                            step: function (now) {
                                //$(this).text(Math.ceil(now) + '%');
                            }
                        });
                });

            }
        }
    });

});

