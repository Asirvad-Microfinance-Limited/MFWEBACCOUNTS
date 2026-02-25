var tblData = [];
var AMOUNTtotal;
var grossAmount = 0;
var gstpertotalx = 0;
var tdspertotalx = 0;

var Strbase64;
var _HoPaymentEntry = {

    AccountFill: function () {
        jQuery('.page-loader-wrapper').show();
    }, 

    //Vendor And Employee Selection
    BillOfTypeChecking: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "BILLTYPENEW",
            "flag2": "BILLLOAD",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.BillOfTypeNew, userdata.token)

    },
    BillOfTypeNew: function (response) {
        if (response.status === "SUCCESS") {
            //jQuery('#firstrow').show();
            //_HoPaymentEntry.VendorLoad();
            //_HoPaymentEntry.BranchLoad();
            //_HoPaymentEntry.VendorStateLoad();
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;

                jQuery("#billOfType").empty();
                jQuery("#billOfType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#billOfType").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#billOfType").empty();
                jQuery("#billOfType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
            }
        }
        else {

            jQuery("#billOfType").empty();
            jQuery("#billOfType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },

    //Bill From & Bill To Load
    BillFromTo: function () {
        jQuery('.page-loader-wrapper').show();
        var billtypeven = jQuery('#billOfType').val();
        if (billtypeven == "1") {
            flagname = 'BILLVENDOR';
        }


            
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADBILLTYPE",
            "flag2": flagname,
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.FillBillType, userdata.token)

    },
    FillBillType: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('#firstrow').show();
            //_HoPaymentEntry.VendorLoad();
            _HoPaymentEntry.BranchLoad();
            _HoPaymentEntry.VendorStateLoad();
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;

                jQuery("#expense").empty();
                jQuery("#expense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#expense").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#expense").empty();
                jQuery("#expense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
            }
        }
        else {

            jQuery("#expense").empty();
            jQuery("#expense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },

    //Bill To Employee Load
    BillToEmployee: function () {
        jQuery('.page-loader-wrapper').show();
        var billtypeemp = jQuery('#billOfType').val();
        if (billtypeemp == "2") {
            flagname = 'BILLEMPLOYEE';
        }

        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADBILLTYPE",
            "flag2": flagname,
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.FillEmployeeBillType, userdata.token)

    },
    FillEmployeeBillType: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('#firstrow').show();
            _HoPaymentEntry.EmployeeLoad();
            _HoPaymentEntry.BranchLoad();
            _HoPaymentEntry.VendorStateLoad();
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;

                jQuery("#expense").empty();
                jQuery("#expense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#expense").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#expense").empty();
                jQuery("#expense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
            }
        }
        else {

            jQuery("#expense").empty();
            jQuery("#expense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },



    //Expense Load
    ExpenseLoad: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "MAINEXPENSE",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.FillPayType, userdata.token)

    },
    FillPayType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;

                jQuery("#expense").empty();
                jQuery("#expense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#expense").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#expense").empty();
                jQuery("#expense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
            }
        }
        else {

            jQuery("#expense").empty();
            jQuery("#expense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },

    // Sub Expense Load
    SubExpenseLoad: function (val) {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "SUBEXPENSE",
            "inptvar1": userdata.branchId,
            "inptvar2": val + "@@" + userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.FillSubExpenseType, userdata.token)

    },
    FillSubExpenseType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                // submodetype = response.data.queryResult.param3;
                jQuery("#subexpense").empty();
                jQuery("#subexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#subexpense").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#subexpense").empty();
                jQuery("#subexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
            }
        }
        else {

            jQuery("#subexpense").empty();
            jQuery("#subexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },



    //Employee Load

    EmployeeLoad: function () {
        //jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "EMPLOYEELOAD",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.FillEmployeeType, userdata.token)

    },
    FillEmployeeType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#employee").empty();
                jQuery("#employee").append(jQuery("<option></option>").val("0").text(" --------CHOOSE EMPLOYEE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#employee").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#employee").empty();
                jQuery("#employee").append(jQuery("<option></option>").val("0").text(" --------CHOOSE EMPLOYEE-------- "));
            }
        }
        else {

            jQuery("#employee").empty();
            jQuery("#employee").append(jQuery("<option></option>").val("0").text(" --------CHOOSE EMPLOYEE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },


    //Branch Load

    BranchLoad: function () {
        //jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "BRANCHLOAD",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.FillBranchType, userdata.token)

    },
    FillBranchType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#branch").empty();
                jQuery("#branch").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#branch").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#branch").empty();
                jQuery("#branch").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH-------- "));
            }
        }
        else {

            jQuery("#branch").empty();
            jQuery("#branch").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH-------- "));
        }

        jQuery('.page-loader-wrapper').hide();

    },

    //GST Percentage Load

    GstperLoad: function () {
        //jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "GSTPERLOAD",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.GstpercentageType, userdata.token)

    },
    GstpercentageType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#gstper").empty();
                jQuery("#gstper").append(jQuery("<option></option>").val("0").text(" --------CHOOSE GST PERCENTAGE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#gstper").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#gstper").empty();
                jQuery("#gstper").append(jQuery("<option></option>").val("0").text(" --------CHOOSE GST PERCENTAGE-------- "));
            }
        }
        else {

            jQuery("#gstper").empty();
            jQuery("#gstper").append(jQuery("<option></option>").val("0").text(" --------CHOOSE GST PERCENTAGE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },

    //TDS Percentage Load

    TdsPerLoad: function () {
        //jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var input1 = jQuery("#tdsmaster").val();

        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "TDSPERLOAD",
            "inptvar1": input1,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.TdsPercentageType, userdata.token)

    },
    TdsPercentageType: function (response) {
        if (response.status === "SUCCESS") {
            var val1 = response.data.queryResult[0].param1;
            // jQuery("#tdsamount").val(val1);    
            _HoPaymentEntry.GetTdsPercentage(val1)

            jQuery('.page-loader-wrapper').hide();
        }
        else {
            swal("Invalid TDS option");
            return false;
        }

    },

    //TDS Master Load

    TdsMasterLoad: function () {
        //jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "TDSMASTERLOAD",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.TdsMasterType, userdata.token)

    },
    TdsMasterType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#tdsmaster").empty();
                jQuery("#tdsmaster").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#tdsmaster").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#tdsmaster").empty();
                jQuery("#tdsmaster").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS-------- "));
            }
        }
        else {

            jQuery("#tdsmaster").empty();
            jQuery("#tdsmaster").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },

    //Vendor State Load

    VendorStateLoad: function () {
        //jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "GSTSTATELOAD",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.FillVendorStateType, userdata.token)

    },
    FillVendorStateType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#vendorstate").empty();
                jQuery("#vendorstate").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#vendorstate").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#vendorstate").empty();
                jQuery("#vendorstate").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));
            }
        }
        else {

            jQuery("#vendorstate").empty();
            jQuery("#vendorstate").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));
        }
       
        jQuery('.page-loader-wrapper').hide();

    },

    //Branch State Load

    GstBranchStateLoad: function (val) {
        //jQuery('.page-loader-wrapper').show();
        var idbranch = jQuery("#branch").val();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "BRANCHSTATE",
            "inptvar1": idbranch,
            "inptvar2": userdata.userId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.FillBranchStateFill, userdata.token)

    },
    FillBranchStateFill: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data != null && response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#branchstate").empty();
                jQuery("#branchstate").val(response.data.queryResult[0].param4);
            }

            jQuery('.page-loader-wrapper').hide();
        }

    },

    //Employee Beneficiary Account Load

    EmployeeAccountLoad: function (val) {
        //jQuery('.page-loader-wrapper').show();
        var empaccload = jQuery("#employee").val();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "EMPACCLOAD",
            "inptvar1": empaccload,
            "inptvar2": userdata.userId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.FillEmployeeAccountFill, userdata.token)

    },
    FillEmployeeAccountFill: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data != null && response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#employeeacc").empty();
                jQuery("#employeeacc").val(response.data.queryResult[0].param1);
            }

            jQuery('.page-loader-wrapper').hide();
        }

    },


    //  GET GST

    GetGST: function () {
        jQuery('.page-loader-wrapper').show();
        jQuery('#gstin-error').hide();
        var val = jQuery('#gstin').val().toUpperCase();
        gststate = parseInt(val.substring(0, 2));
        var GetGSTValue = {
            "gstin": val,
            "consent": "Y",
            "consent_text": "I hereby declare my consent agreement for verifying my data to Asirvad company",
            "firmId": "3",
            "empId": userdata.userId

        };

        _http.post(MFPUBLICKYCAPI_URL + "api/gst", GetGSTValue, _HoPaymentEntry.FillGST, userdata.token)

    },
    FillGST: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.pradr.em.length > 0) {
                jQuery('#vendordata').show();
                jQuery("#vendorName").val(response.data.lgnm);
                jQuery("#vendorAddress").val(response.data.pradr.adr);
                jQuery('#gstin').prop("readonly", false);
                jQuery("#grossGST").val("");
                jQuery("#grossamt").val("");
                //_AddPayData.gstsplitup(gststate, userdata.branchId,p3);


                var BillValue = jQuery('#billOfType').val();
                if (BillValue == "1") {
                    jQuery("#ifscdata").hide();
                    jQuery("#ifscdata1").show();
                    _HoPaymentEntry.GetVendorGstLoad();
                }
               


            }
            else {
                jQuery('#vendordata').hide();
                jQuery("#gstin").val("");
                jQuery("#grossGST").val("");
                jQuery("#grossamt").val("");
                jQuery("#vendorName").val("");
                jQuery("#vendorAddress").val("");
                jQuery('#gstin').prop("readonly", false);
            }
        }
        else {
            swal("GST", "Invalid GSTIN number..!", "error");
            jQuery('#vendordata').hide();
            jQuery("#vendorName").val("");
            jQuery("#vendorAddress").val("");
            jQuery("#gstin").val("");
            jQuery("#grossGST").val("");
            jQuery("#grossamt").val("");
            jQuery('#gstin').prop("readonly", false);
        }
    },


    GetVendorGstLoad: function (val) {
        //jQuery('.page-loader-wrapper').show();
        var idgst = jQuery("#gstin").val();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADVENGST",
            "flag2": "VENDORGST",
            "inptvar1": idgst,
            "inptvar2": userdata.userId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.FillVendorGstLoadFill, userdata.token)

    },
    FillVendorGstLoadFill: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data != null && response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#txtIFSCCode1").empty();
                jQuery("#txtIFSCCode1").val(response.data.queryResult[0].param1);
                jQuery("#txtBankName1").empty();
                jQuery("#txtBankName1").val(response.data.queryResult[0].param2);
                jQuery("#txtBranchName1").empty();
                jQuery("#txtBranchName1").val(response.data.queryResult[0].param3);
                jQuery("#txtAccountNumber1").empty();
                jQuery("#txtAccountNumber1").val(response.data.queryResult[0].param4);
                jQuery("#txtConfirmAccountNumber1").empty();
                jQuery("#txtConfirmAccountNumber1").val(response.data.queryResult[0].param5);
            }

            if (response.data.queryResult[0].param1 == '1') {
                jQuery("#txtIFSCCode1").val('');
                jQuery("#txtBankName1").val('');
                jQuery("#txtBranchName1").val('');
                jQuery("#txtAccountNumber1").val('');
                jQuery("#txtConfirmAccountNumber1").val('');
            }

            jQuery('.page-loader-wrapper').hide();
        }

        //jQuery('.page-loader-wrapper').hide();
        //swal("Error  Found...!!!", "", "warning")
    },

 

    // Verifying vendor bank
    verifyAccount: function () {
        var AccountNumber = jQuery("#txtAccountNumber").val().toUpperCase();
        var ConfirmAccountNumber = jQuery("#txtConfirmAccountNumber").val().toUpperCase();
        var ifscCode = jQuery("#txtIFSCCode").val().toUpperCase();
        jQuery('.page-loader-wrapper').show();

        if (AccountNumber.trim() != ConfirmAccountNumber.trim()) {
            jQuery('#txtConfirmAccountNumber-error').text('Account No mismatch!!!').css('color', 'red');
            jQuery('#txtConfirmAccountNumber-error').show();
            jQuery('.page-loader-wrapper').hide();

            return false;
        }
        else {
            jQuery('#txtConfirmAccountNumber-error').hide();


            var VerifyFillData = {
                "empId": userdata.userId,
                "firmId": 1,
                "ifsc": ifscCode,
                "account": ConfirmAccountNumber
            };
            //VerifyFillData = JSON.stringify(VerifyFillData);
            //VerifyFillData = { "encryptedRqstStr": EncryptAPIReq(VerifyFillData) };
            _http.post("https://lms.asirvad.com/mfpublickycapi/api/bank", VerifyFillData, _HoPaymentEntry.VerifiedLoadCompleted, userdata.token)
        }
    },

    VerifiedLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            verificationResponse = response.data;
            verificationStatus = 1;
            flag1 = 1;
            swal(response.data.status, "", "success");
           // jQuery('#savebutton').removeAttr('disabled');

            jQuery('#showoff1').show();
            jQuery('#showoff2').show();
            jQuery('#showoff3').show();
            jQuery('#showoff4').show();
            jQuery('#showoff5').show();

        } else {
            verificationResponse = response;
            verificationStatus = 0
            swal(response.responseMsg, "", "error");
        }
    },


    // Verifying vendor bank automatically select
    VerifyAccountNew: function () {
        var AccountNumber = jQuery("#txtAccountNumber1").val().toUpperCase();
        var ConfirmAccountNumber = jQuery("#txtConfirmAccountNumber1").val().toUpperCase();
        var ifscCode = jQuery("#txtIFSCCode1").val().toUpperCase();
        jQuery('.page-loader-wrapper').show();

        if (AccountNumber.trim() != ConfirmAccountNumber.trim()) {
            jQuery('#txtConfirmAccountNumber1-error').text('Account No mismatch!!!').css('color', 'red');
            jQuery('#txtConfirmAccountNumber1-error').show();
            jQuery('.page-loader-wrapper').hide();

            return false;
        }
        else {
            jQuery('#txtConfirmAccountNumber-error').hide();


            var VerifyFillData = {
                "empId": userdata.userId,
                "firmId": 1,
                "ifsc": ifscCode,
                "account": ConfirmAccountNumber
            };
            //VerifyFillData = JSON.stringify(VerifyFillData);
            //VerifyFillData = { "encryptedRqstStr": EncryptAPIReq(VerifyFillData) };
            _http.post("https://lms.asirvad.com/mfpublickycapi/api/bank", VerifyFillData, _HoPaymentEntry.VerifiedLoadCompletedNew, userdata.token)
        }
    },

    VerifiedLoadCompletedNew: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            verificationResponse = response.data;
            verificationStatus = 1;
            flag1 = 1;
            swal(response.data.status, "", "success");
            // jQuery('#savebutton').removeAttr('disabled');

            jQuery('#showoff1').show();
            jQuery('#showoff2').show();
            jQuery('#showoff3').show();
            jQuery('#showoff4').show();
            jQuery('#showoff5').show();

        } else {
            verificationResponse = response;
            verificationStatus = 0
            swal(response.responseMsg, "", "error");
        }
    },


    //  Camera

    takeSnapShot: function () {
        jQuery('#camsection').show();
        Webcam.set({
            width: 400,
            height: 310,
            image_format: 'jpeg',
            jpeg_quality: 100
        });
        Webcam.attach('#camera');
    },
    takeInvoice: function () {
        Webcam.snap(function (k) {

            var $image = jQuery('<img id="rtimg" src="' + k + '" height="310" width="80%" />');
            jQuery('#viewUploadedImages').html($image);
            jQuery('#viewUploadedImages').show();

            Strbase64 = k.toString().replace('data:image/jpeg;base64,', '');

            if (jQuery('#viewUploadedImages').val() == null) {
                swal("", "Add URL or PDF File..!", "warning");
                return false;
            }
        });

    },

    // Camera Convert

    convertToBase64: function (img) {
        Strbase64 = "";
        DFILETYPE = "";
        //var a = "travelFile";
        var a = img;
        //Read File
        var selectedFile = document.getElementById(a).files;
        //Check File is not Empty
        if (selectedFile.length > 0) {
            //Size checking //
            var sizeInKB = selectedFile[0].size / 1024;
            var sizeLimit = 200;
            //if (sizeInKB >= sizeLimit) {
            //    swal("", "Max file size allowed is 200KB", "warning");
            //    selectedFile = "";
            //    return false;
            //}
            // TEST BLOB TO BASE 64 //

            //var reader = new FileReader();
            //reader.readAsDataURL(blob);
            //reader.onloadend = function () {
            //    var base64String = reader.result;
            //   // console.log('Base64 String - ', base64String);

            //TEST BLOB TO BASE 64 //

            // Select the very first file from list
            var fileToLoad = selectedFile[0];
            // FileReader function for read the file.
            var fileReader = new FileReader();
            var base64;
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
            // Onload of file read the file content
            fileReader.onloadend = function (fileLoadedEvent) {
                base64 = fileLoadedEvent.target.result;
                if (base64.toString().includes("data:application/pdf;base64")) {
                    DFILETYPE = "PDF";
                    swal("", "Please only upload Images..!", "warning");
                    jQuery('#payfile').val("");
                    jQuery('#tick').hide();
                    jQuery('#close').show();
                    return false;

                }
                else {
                    DFILETYPE = "IMG";
                }
                if ((base64.toString().includes("data:image/jpeg;base64")) || (base64.toString().includes("data:image/img;base64")) || (base64.toString().includes("data:image/jpg;base64")) || (base64.toString().includes("data:image/png;base64"))) {
                    DFILETYPE = "IMG";
                }
                else {
                    swal("", "Please only upload Images..!", "warning");
                    jQuery('#payfile').val("");
                    jQuery('#tick').hide();
                    jQuery('#close').show();

                    return false;
                }

                Strbase64 = base64.toString().replace('data:application/pdf;base64,', '').replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');

            };
            if (Strbase64 != null) {
                jQuery('#tick').show();
                jQuery('#close').hide();
            }
        }
        else {

            swal("", "Add Image..!", "warning");
            return false;
        }
    },



    // Add the amount  -- MODIFIED Checking

    addamount: function (tblData) {
        if (tblData != null && tblData.length > 0) {
            jQuery('#maincard').show();
            var AMOUNTtotal = 0;
            jQuery("#amttotal").html(0);

            jQuery.each(tblData, function (i, val) {

                if (val.subPaymentMod == "DEBIT") {
                    AMOUNTtotal = (parseFloat(AMOUNTtotal) + parseFloat(val.amount) + parseFloat(val.gstamount) - parseFloat(val.tdsamount));
                    jQuery("#amttotal").html(AMOUNTtotal);
                }

                if (val.subPaymentMod == "CREDIT") {
                    AMOUNTtotal = (parseFloat(AMOUNTtotal) - parseFloat(val.amount) + parseFloat(val.gstamount) - parseFloat(val.tdsamount));
                    jQuery("#amttotal").html(AMOUNTtotal);
                }



            });

        }

        jQuery('.page-loader-wrapper').hide();
    },

    //GST Percentage Total Amount 
    //Only GST Amount Calculating  
    GetGstPercentage: function () {         

        var gstamounttotal = parseFloat(jQuery('#gstper').val());   //modified gst included amount 
        var percentage = 100;
        var amount = parseFloat(jQuery('#amount').val()); // assuming 'amount' is a valid input field ID
        var gstpertotalx = (amount * (gstamounttotal / percentage));
        //var gstpertotalx = (amount + x);
        // jQuery('#gstamount').html(gstpertotalx);

        jQuery('#gstamount').val(gstpertotalx);
    },


    //TDS percentage using slab

    GetTdsPercentage: function (tdsamounttotal) {

        //var tdsamounttotal = parseFloat(jQuery('#tdsper').val());   //modified tds excluded amount
       // var tdsamounttotal
        var percentage = 100;
        var amount = parseFloat(jQuery('#amount').val()); // assuming 'amount' is a valid input field ID
        var tdspertotalx = (amount * (tdsamounttotal / percentage));
        //var gstpertotalx = (amount + x);
        // jQuery('#gstamount').html(gstpertotalx);

        jQuery('#tdsamount').val(tdspertotalx);
    },


    // Entry of expense values  same name as api

    HoEntryData: function () {


        //var billDt = jQuery('#traDate').val();
        var paymentType = jQuery('#expense :selected').val();
        var paymentTypeText = jQuery('#expense :selected').text();
        var subval = jQuery('#subexpense :selected').val();
        var subPaymentType = subval.split('~')[0];  
        var subPaymentsymbol= subval.split('~')[1];
        var subPaymentTypeText = jQuery('#subexpense :selected').text();
        var amount = jQuery('#amount').val();

        //modified changes
        var gstpercentage = jQuery('#gstper :selected').val();
        var gsttotalamount = jQuery('#gstamount').val();
        //var tdspercentage = jQuery('#tdsper :selected').val();  //TDS slab
        var tdstotalamount = jQuery('#tdsamount').val();
        var gsttype = jQuery('#gstOfType').val();

        var tdsaccount = jQuery('#tdsmaster').val();  //new mod


        if (subPaymentsymbol == "C")
        {
            subPaymentMod = 'CREDIT';

        }
        else {
            subPaymentMod = 'DEBIT';
        }


        if (jQuery('#branch').val() == "00") {
            swal("", "Please choose branch", "warning");   //vendor load
            return false;
        }
        else if (jQuery('#expense').val() == "0") {
            swal("", "Please Select Expense", "warning");
            return false;
        }
        else if (jQuery('#subexpense').val() == "0") {
            swal("", "Please Select Sub Expense", "warning");
            return false;
        }
        else if (amount == 0) {
            swal("", "Please Enter Amount", "warning");
            return false;
        }
        //else if (jQuery('#txtgst').val() == "0") {
        //    swal("", "Please Enter GST", "warning");
        //    return false;
        //}
        else if (jQuery('#billno').val() == "") {
            swal("", "Please Enter Bill Number", "warning");
            return false;
        }
        else if (jQuery('#vendorstate').val() == "") {
            swal("", "Please Select Vendor State", "warning");
            return false;
        }


      



        else {

            var RowData = { 
                //"billDt": billDt,
                'paymentType': paymentType,
                'subPaymentType': subPaymentType,
                'amount': amount,
                'paymentTypeText': paymentTypeText,
                'subPaymentTypeText': subPaymentTypeText,
                'subPaymentMod': subPaymentMod,
                'gstpercentage': gstpercentage,
                'gstamount': gsttotalamount,
                //'tdspercentage': tdspercentage, //TDS slab
                'tdsamount': tdstotalamount,
                'gsttype': gsttype,
                'tdsaccount': tdsaccount  //new mod

            };
            //jQuery("#traDate").attr("disabled", true);
            tblData.push(RowData);
            _HoPaymentEntry.HoDataTable(tblData);
        }
    },

    //Add the values and shows the grid view

    HoDataTable: function (tblData) {
        if (tblData != null && tblData.length > 0) {
            jQuery('#maincard').show();
            jQuery('#hodetailsentry').empty();
            var $table = jQuery('<table class="table" id="horeconciliation">');
            $table.append('< thead >  <th style="text-align:center;">SL NO</th><th style="text-align:center;">EXPENSE</th><th style="text-align:center;">SUBEXPENSE</th><th style="text-align:center;">PAYMENT TYPE</th><th style="text-align:center;">AMOUNT</th><th style="text-align:center;">GST</th><th style="text-align:center;">TDS</th><th style="text-align:center;">DELETE</th></thead >');
            var $tbody = jQuery('<tbody>');
            //var grossAmount = 0;  //3
            // jQuery("#amttotal").html(grossAmount);  //2
            // jQuery("#amttotal").html(0);
            jQuery.each(tblData, function (i, val) {
                var $row = jQuery('<tr/>');
                $row.append(jQuery('<td align="center">').html(i + 1));
                // $row.append(jQuery('<td align="center">').html(val.billDt));
                //$row.append(jQuery('<td align="center">').html(val.paymentType));
                //$row.append(jQuery('<td align="center">').html(val.subPaymentType));
                $row.append(jQuery('<td align="center">').html(val.paymentTypeText));
                $row.append(jQuery('<td align="center">').html(val.subPaymentTypeText));
                $row.append(jQuery('<td align="center">').html(val.subPaymentMod));  //Debit Credit
                $row.append(jQuery('<td align="center">').html(val.amount));
                $row.append(jQuery('<td align="center">').html(val.gstamount));
                $row.append(jQuery('<td align="center">').html(val.tdsamount));
                // $row.append(jQuery('<td align="center">').html(val.serviceTax));
                //$row.append(jQuery('<td align="center">').html(val.grossAmount));
                //$row.append(jQuery('<td align="center">').html(val.remarks));
                $row.append(jQuery('<td align="center">').html('<button type="button" class="btnsmall  btn-danger fc-center" id="delete" name="submitprint"  onclick="ReversCon(' + i + ');" > <i class="fa fa-trash" class="bs-tooltip remove" style="font-size:15px;"></i></button> '));
                $tbody.append($row);




            });
            $tbody.append('</tbody>');
            $table.append($tbody);
            $table.append('</table>');
            jQuery('#hodetailsentry').html($table);
        }
        else {
            jQuery('#maincard').hide();
            jQuery('#hodetailsentry').empty();
        }
        _HoPaymentEntry.addamount(tblData);
        jQuery('.page-loader-wrapper').hide();
    },


    //clear table data

    clearTableData: function () {
        tblData = [];
        _HoPaymentEntry.HoDataTable(tblData);
    },



    // Save Expense Function

    HoPaymentSubmit: function () {
        var grossAmount = jQuery('#amttotal').html();
        var remarks = jQuery('#remarks').val();

        var employeeacc = jQuery('#billOfType').val();     
        if (employeeacc == "1") {
            var vendor = "0";//jQuery('#vendor').val();
        }
        else {
            var vendor = 0;
        }


        var gstin = jQuery('#gstin').val().toUpperCase();
        if (gstin == null || gstin == "") gstin = "NIL";   //newly added


        //var billDt = jQuery('#traDate').val();

        var BillValue = jQuery('#billOfType').val();
        if (BillValue == "1") {
            var fromDt = jQuery('#BillToDate').val();
            var toDt = jQuery('#BillToDate').val();
        }
        else {
            var fromDt = jQuery('#traDate').val();
            var toDt = jQuery('#traToDate').val();
        }


        var billno = jQuery('#billno').val();
        var serviceTax = jQuery('#txtgst').val();   //block 2
        var expenseTypeId = jQuery('#expense').val();
        var vendorState = jQuery('#vendorstate').val();
        var branchState = jQuery('#branchstate').val();

        var employeeAccount = jQuery('#employeeacc').val();
        //modification 2
        var partialAmountFind = jQuery('#partialamount').val();
        if (partialAmountFind == "") {
            partialAmount = '0';
        }
        else {
            partialAmount = partialAmountFind;

        }

        var amountTypeFind = jQuery('input:radio[name="amountfull"]:checked').val(); //new modification
        if (amountTypeFind == null) {
            swal("", "Please Select Amount Type", "warning");
            return false;
        }
        else { 
            var amountType = amountTypeFind;
        }


        var BillValue = jQuery('#billOfType').val();
        if (BillValue == "1") {
            selectedEmp = 0;
        } else {
            var selectedEmp = jQuery('#employee').val();
        }

        //var selectedEmp = jQuery('#employeeacc').val();

        var venEmpBranch = jQuery('#branch').val();


        if (tblData == "") {
            swal("", "Please Add HO Payment Entry", "warning");
            return false;
        }


        else if (jQuery('#remarks').val() == "") {
            swal("", "Please Enter Remarks", "warning");
            return false;
        }
        else if (Strbase64 == null || Strbase64 == "") {
            swal("", "Please capture the Bill..!", "error");
            return false;
        }

        //new mod vendor add

        //employee

        var employeeacc = jQuery('#billOfType').val();
        var employeegst = jQuery('#gstin').val();
        if (employeeacc == "2") {
            if (employeegst == "") {
                var vendorname = "NIL";
                var vendoraddr = "NIL";
                var ifsc = "NIL";
                var bankname = "NIL";
                var branchname = "NIL";
                var accno = 0;
                var confaccno = 0;         
            }
            else {
                var vendorname = jQuery('#vendorName').val().toUpperCase();
                var vendoraddr = jQuery('#vendorAddress').val().toUpperCase();
                var ifsc = "NIL";
                var bankname = "NIL";
                var branchname = "NIL";
                var accno = 0;
                var confaccno = 0;  
            }
        }



        //vendor
        //var vendorname = "";
        //var vendoraddr = "";

        //checking gst vendor or not

        var vendorgstchk = jQuery('#billOfType').val();
        //var vendorchk = jQuery('#gstin').val();
        if (vendorgstchk == "1") {
            var val = jQuery('input:radio[name="gstyes"]:checked').val();
            if (val == "1") {
                var vendorname = jQuery('#vendorName').val().toUpperCase();
                var vendoraddr = jQuery('#vendorAddress').val().toUpperCase();
            }
            else {
                var vendorname = jQuery('#vendorName1').val().toUpperCase();
                var vendoraddr = jQuery('#vendorAddress1').val().toUpperCase();

            }
        }




        var gstval = jQuery('#gstin').val().toUpperCase();
        if (gstval == null || gstval == "") {
            gstno = "NIL"
        }
        else {
            gstno = jQuery('#gstin').val().toUpperCase();
        }


        var vendorgst = jQuery('#billOfType').val();
        if (vendorgst == "1"){
        var val = jQuery('input:radio[name="gstyes"]:checked').val();
            if (val == "1") {
                var ifsc = jQuery('#txtIFSCCode1').val();
                var bankname = jQuery('#txtBankName1').val();
                var branchname = jQuery('#txtBranchName1').val();
                var accno = jQuery('#txtAccountNumber1').val();
                var confaccno = jQuery('#txtConfirmAccountNumber1').val();            
            }
            else {
                var ifsc = jQuery('#txtIFSCCode').val();
                var bankname = jQuery('#txtBankName').val();
                var branchname = jQuery('#txtBranchName').val();
                var accno = jQuery('#txtAccountNumber').val();
                var confaccno = jQuery('#txtConfirmAccountNumber').val();
            }

        }
        
        


        jQuery('.page-loader-wrapper').show();

        var GetPayTypeData = {
            "branchId": userdata.branchId,
            "firmId": 3,
            "userID": userdata.userId,
            "gstNo": gstin,
            "fileType": "img",
            "grossAmount": grossAmount,
            "vendor": vendor,
            "remarks": remarks,
            "invoiceFile": Strbase64,
            //"billDt": billDt,
            "fromDt": fromDt,
            "toDt": toDt,
            "billno": billno,
            "serviceTax": serviceTax,
            "partialAmount": partialAmount,
            "amountType": amountType,
            "typeId": 1,
            "vendorState": vendorState,
            "venEmpBranch": venEmpBranch,
            "selectedEmp": selectedEmp,
            "newVendorName": vendorname,
            "newVendorAdd": vendoraddr,
            "newGstNo": gstno,
            "ifscCode": ifsc,
            "bankName": bankname,
            "bankBranchName": branchname,
            "accNo": accno,
            "confAccNo": confaccno,
            "employeeAccount": employeeAccount,
            "expenseTypeId": expenseTypeId,
            "entryDetails": tblData,



        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseatBranch", GetPayTypeData, _HoPaymentEntry.SubmitReturn, userdata.token)

    },

    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            var msg = jQuery.trim(response.data.message);
            if (response.data.errStatus = "1") {
                swal({
                    title: msg,
                    text: "",
                    type: "success"
                }, function () {
                    window.location.reload(true);
                });
            }
        }
        else if (response.responseMsg == "Invalid Token") {
            window.location.href = DOMAIN_URL;
        }
        else {
            var msg = jQuery.trim(response.responseMsg);
            swal({
                title: "Error",
                text: msg,
                type: "error"
            }, function () {
                window.location.reload(true);
            });
        }

    },


    //datediff new
    DateDiff: function (tp) {
        if (tp == 1) {
            var frmdtval = Date.parse(jQuery('#traDate').val());
            var todtval = Date.parse(jQuery('#traToDate').val());
        }
        else {
            var frmdtval = Date.parse(jQuery('#traDate').val());
            var todtval = Date.parse(jQuery('#traToDate').val());
        }
        var dif = (todtval - frmdtval) / 86400000;
        //alert(dif);
        if (!(isNaN(dif))) {
            if (dif < 0) {
                swal("Invalid Date Selection", "To Date must be greater than From date..!", "error");
                if (tp == 1) {
                    jQuery('#itmtodt').val("");
                    return false;
                }
                else {
                    jQuery('#etoDate').val("");
                    return false;
                }
            }
            else {
                if (tp == 2) {
                    _AddPayData.monthdif(_AddPayData.convertdateformat(jQuery('#efromDate').val()), _AddPayData.convertdateformat(jQuery('#etoDate').val()));
                }
            }
            //else if (dif < 2332800000 && tp==2 ) {
            //    swal("Invalid Date Selection", "Atleast 1 month difference needed..!", "error");

            //    jQuery('#etoDate').val("");
            //    return false;

            //}
            //if (tp == 1) {
            //    var dt = jQuery('#itmfrmdt').val();
            //    var frmdt = _AddPayData.convertdateformat(dt);

            //    _AddPayData.checkdate(frmdt);
            //}
        }
    },



    //IFSC code 
    bankFill: function () {
        jQuery('.page-loader-wrapper').show();
        var ifscCode = jQuery("#txtIFSCCode").val();
        var bankFillData = {
            "ifsc": ifscCode
        };
        //bankFillData = JSON.stringify(bankFillData);
        //bankFillData = { "encryptedRqstStr": EncryptAPIReq(bankFillData) };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/banks/searchifsc", bankFillData, _HoPaymentEntry.bankFillLoadCompleted, userdata.token)
    },

    bankFillLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            var bankName = response.data.searchIFSCData.bankname;
            var branchName = response.data.searchIFSCData.branchName;
            jQuery("#txtBankName").val(bankName);
            jQuery("#txtBranchName").val(branchName);
        } else {
            swal("IFSC", "Invalid IFSC Code..!", "error");
            return false;
            jQuery("#txtBankName").val('');
            jQuery("#txtBranchName").val('');
        }
    },


    //IFSC code  New Vendor
    bankFillNew: function () {
        jQuery('.page-loader-wrapper').show();
        var ifscCode = jQuery("#txtIFSCCode1").val();
        var bankFillData = {
            "ifsc": ifscCode
        };
        //bankFillData = JSON.stringify(bankFillData);
        //bankFillData = { "encryptedRqstStr": EncryptAPIReq(bankFillData) };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/banks/searchifsc", bankFillData, _HoPaymentEntry.bankFillLoadNewCompleted, userdata.token)
    },

    bankFillLoadNewCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            var bankName = response.data.searchIFSCData.bankname;
            var branchName = response.data.searchIFSCData.branchName;
            jQuery("#txtBankName1").val(bankName);
            jQuery("#txtBranchName1").val(branchName);
        } else {
            swal("IFSC", "Invalid IFSC Code..!", "error");
            return false;
            jQuery("#txtBankName1").val('');
            jQuery("#txtBranchName1").val('');
        }
    },






}



jQuery(document).ready(function ($) {

    jQuery("#choose").hide();

    //New Entry
    jQuery('#billOfTypeDiv').show();
    _HoPaymentEntry.BillOfTypeChecking();


    // Vendor and Employee Load


    jQuery("#billOfType").change(function (e) {
        jQuery('.page-loader-wrapper').show();
        var empven = jQuery('#billOfType').val()

        if (empven == "1") {
            jQuery('#showoff').hide();
            jQuery('#gstupd').show();

            var gstTypeFind = jQuery('input:radio[name="gstyes"]:checked').val();
            var gstType = gstTypeFind;
            if (gstType != null) {
                jQuery('input:radio[name="gstyes"]').prop("checked", false);
            }

            //jQuery('#ifscdata').show();   --in gst on change
            //jQuery('#accountnodata').show();
            //jQuery('#showoff1').hide();
            //jQuery('#showoff2').hide();
            //jQuery('#showoff3').hide();
            //jQuery('#showoff4').hide();
            //jQuery('#showoff5').hide();

        }
        else {
            jQuery('#showoff').show();
            jQuery('#employeedetails').show();
            jQuery('#gstupd').hide();
            jQuery('#ifscdata').hide();
            jQuery('#accountnodata').hide();
            jQuery('#vendordata1').hide();
            jQuery('#ifscdata1').hide();
            jQuery('#accountnodata1').hide();

            //jQuery('#showoff').hide();
            jQuery('#showoff1').show();
            jQuery('#showoff2').show();
            jQuery('#showoff3').show();
            jQuery('#showoff4').show();
            jQuery('#showoff5').show();


        }


        //commented start
        if (empven == "1") {
            //clear data start
            _HoPaymentEntry.clearTableData();    //clear the table  values
            jQuery('#add').show();
            jQuery('#remarksdiv').hide();
            jQuery('#remarks').val('');
            jQuery('#fullamount').val('');
            jQuery('#partialamount').val('');
            jQuery('#partialamount').hide();
            jQuery('#payfile').val('');
            jQuery('#tick').hide();
            jQuery('#close').show();
            jQuery('#traDate').val('');
            jQuery('#traToDate').val('');
            jQuery('#branchstate').val('');
            jQuery('#billno').val('');

            jQuery('#bs_datepicker_container2').hide();
            jQuery('#bs_datepicker_container1').hide();
            jQuery('#bs_datepicker_container3').show();

            var amountTypeFind = jQuery('input:radio[name="amountfull"]:checked').val();
            var amountType = amountTypeFind;
            if (amountType != null) {
                jQuery('input:radio[name="amountfull"]').prop("checked", false);
            }

            //stop


            jQuery('#vendordetails').show();
            jQuery('#vendorstatediv').show();
            jQuery('#employeeaccdiv').hide();
            //jQuery('#vendordiv').show();
            jQuery('#employeedetails').hide();
            jQuery('#employeediv').hide();
            //jQuery("#gstamount").val(gstamount); // null value set to 0
            //jQuery("#gstamount").val(tdsamount); // null value set to 0
            jQuery('#gstamount').val('0');  //null value set to 0
            jQuery('#tdsamount').val('0');

            jQuery('#gstamount').val('0');
            jQuery('#gstper').val('0');
            jQuery('#gstOfType').val('0');
            jQuery('#gstper').val("0");
            //jQuery('#tdsper').val("0");
            jQuery('#subexpense').val("0");
            jQuery('#amount').val('');
            jQuery('#gstamount').val('0');  //null value set to 0
            jQuery('#tdsamount').val('0');
            jQuery('#gstOfType').val('0');
            jQuery('#tdsmaster').val('0');



            _HoPaymentEntry.BillFromTo();
        }
        else {
            _HoPaymentEntry.clearTableData();    //clear the table  values
            jQuery('#add').show();
            jQuery('#remarksdiv').hide();
            jQuery('#remarks').val('');
            jQuery('#fullamount').val('');
            jQuery('#partialamount').val('');
            jQuery('#partialamount').hide();
            jQuery('#payfile').val('');
            jQuery('#tick').hide();
            jQuery('#close').show();
            jQuery('#traDate').val('');
            jQuery('#traToDate').val('');

            jQuery('#bs_datepicker_container2').show();
            jQuery('#bs_datepicker_container1').show();
            jQuery('#bs_datepicker_container3').hide();
            
            var amountTypeFind = jQuery('input:radio[name="amountfull"]:checked').val();
            var amountType = amountTypeFind;
            if (amountType != null) {
                jQuery('input:radio[name="amountfull"]').prop("checked", false);
            }



            jQuery('#employeedetails').show();
            jQuery('#vendorstatediv').hide();
            jQuery('#employeeaccdiv').show();
            jQuery('#employeediv').show();
            jQuery('#vendordetails').hide();
            //jQuery('#vendordiv').hide();

            jQuery('#gstamount').val('0');
            jQuery('#gstper').val('0');
            jQuery('#gstOfType').val('0');
            jQuery('#gstper').val("0");
           // jQuery('#tdsper').val("0");
            jQuery('#subexpense').val("0");
            jQuery('#amount').val('');
            jQuery('#gstamount').val('0');  //null value set to 0
            jQuery('#tdsamount').val('0');
            jQuery('#gstOfType').val('0');
            jQuery('#tdsmaster').val('0');
            jQuery('#branchstate').val('');
            jQuery('#billno').val('');


           // window.location.reload();
            _HoPaymentEntry.BillToEmployee()
        }
        //commented stop
    });


    //GST Bank Details Show
    jQuery('input:radio[name="gstyes"]').click(function (e) {
        var val = jQuery('input:radio[name="gstyes"]:checked').val();
        if (val == "1") {
            jQuery('#showoff').show(); 
            jQuery('#vendordata1').hide();
            jQuery('#ifscdata1').show();
            jQuery('#accountnodata1').show();
            jQuery('#accountnodata').hide();

            jQuery('#ifscdata').hide();
            jQuery('#gstindiv').show();

            jQuery('#showoff1').hide();
            jQuery('#showoff2').hide();
            jQuery('#showoff3').hide();
            jQuery('#showoff4').hide();
            jQuery('#showoff5').hide();


            jQuery('#txtIFSCCode1').val('');
            jQuery('#txtBankName1').val('');
            jQuery('#txtBranchName1').val('');
            jQuery('#txtAccountNumber1').val('');
            jQuery('#txtConfirmAccountNumber1').val('');

        }
        else {
            jQuery('#showoff').show();
            jQuery('#gstindiv').hide();

            jQuery('#ifscdata1').hide();
            jQuery('#accountnodata1').hide();

            jQuery('#vendordata').hide();
            jQuery('#vendordata1').show();
            jQuery('#ifscdata').show();
            jQuery('#accountnodata').show();
            jQuery('#showoff1').hide();
            jQuery('#showoff2').hide();
            jQuery('#showoff3').hide();
            jQuery('#showoff4').hide();
            jQuery('#showoff5').hide();


            //jQuery('#branch').val("00");
            jQuery('#vendorName1').val('');
            jQuery('#vendorAddress1').val('');
            jQuery('#txtIFSCCode').val('');
            jQuery('#txtAccountNumber').val('');
            jQuery('#txtConfirmAccountNumber').val('');
            
        }


    });

    //Verify Vendor
    jQuery('#verifybutton').click(function (e) {
        var IFSC = jQuery('#txtIFSCCode').val();
        var ACCNO = jQuery('#txtAccountNumber').val();
        var CONACCNO = jQuery('#txtConfirmAccountNumber').val();
        var branchno = jQuery('#branch').val();
        var vendname = jQuery('#vendorName1').val();
        var vendadd = jQuery('#vendorAddress1').val();

        if (branchno == "00") {
            swal("Please Select Branch", "", "warning");
            return false;
        }
        else if (vendname == "") {
            swal("Please Enter Vendor Name", "", "warning");
            return false;
        }
        else if (vendadd == "") {
            swal("Please Enter Vendor Address", "", "warning");
            return false;
        }
        else if (IFSC == 0) {
            swal("Please Enter IFSC Code", "", "warning");
            return false;
        }
        else if (ACCNO == 0) {

            swal("Please Enter Account Number", "", "warning");
            return false;
        }
        else if (CONACCNO == 0) {

            swal("Please Enter Confirm Account Number", "", "warning");
            return false;
        }

        else {

            _HoPaymentEntry.verifyAccount();
        }

    }),


    //Verify Vendor Already GST case
    jQuery('#verifybutton1').click(function (e) {
        var IFSC = jQuery('#txtIFSCCode1').val();
        var ACCNO = jQuery('#txtAccountNumber1').val();
        var CONACCNO = jQuery('#txtConfirmAccountNumber1').val();
        var branchno = jQuery('#branch').val();



        if (branchno == "00") {
            swal("Please Select Branch", "", "warning");
            return false;
        }
        else if (IFSC == '') {
            swal("Please Enter IFSC Code", "", "warning");
            return false;
        }
        else if (ACCNO == 0) {
            swal("Please Enter Account Number", "", "warning");
            return false;
        }
       else if (CONACCNO == 0) {
            swal("Please Enter Confirm Account Number", "", "warning");
            return false;
        }


        _HoPaymentEntry.VerifyAccountNew();


    }),



    //Vendor Load
     // _HoPaymentEntry.VendorLoad()

    //datediff old Start

    jQuery('#traDate').change(function (e) {
        _HoPaymentEntry.DateDiff(1);

        var BillValue = jQuery('#billOfType').val();
        if (BillValue == "1") {
            bill_date = jQuery('#traDate').val();
            jQuery('#traToDate').val(bill_date);
            //jQuery('#traToDate').show();

        }
    });

    jQuery('#traToDate').change(function (e) {

        var BillValue = jQuery('#billOfType').val();
        if (BillValue == "1") {
            bill_date = jQuery('#traDate').val();
            jQuery('#traToDate').val(bill_date);
            //jQuery('#traToDate').hide();

            _HoPaymentEntry.DateDiff(1);

        } else { 
            _HoPaymentEntry.DateDiff(1);
            }
    });

        //datediff old stop

    //Bill date
    jQuery('#BillToDate').datepicker({

        autoclose: true,
        format: "dd/M/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        // startDate: '+0d',
        minDate: new Date(),
        endDate: new Date(),
        container: '#bs_datepicker_container3',
    });


    //From Date
    jQuery('#traDate').datepicker({

        autoclose: true,
        format: "dd/M/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        // startDate: '+0d',
        minDate: new Date(),
        endDate: new Date(),
        container: '#bs_datepicker_container1',
    });


    //to date new

    jQuery('#traToDate').datepicker({

        autoclose: true,
        format: "dd/M/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        // startDate: '+0d',
        minDate: new Date(),
        endDate: new Date(),
        container: '#bs_datepicker_container2',
    });


      //sub expense load in main expense onchange
    jQuery('#expense').change(function () {
        var val = jQuery('#expense').val();
        _HoPaymentEntry.SubExpenseLoad(val);
    });


    //TDS amount clear when amount is changed

    jQuery('#amount').change(function () {

        jQuery('#tdsmaster').val('0');
        jQuery('#tdsamount').val('0');
        var gstval = jQuery('#gstper').val();
        if (gstval != 0) {
            _HoPaymentEntry.GetGstPercentage();
        }
        
    });



      // Add the elements to grid

    jQuery('#add').click(function (e) {

        var val = jQuery('input:radio[name="tdsyes"]:checked').val();
        if (val == "1") {
            var tdsconfi = jQuery('#tdsmaster').val();
            if (tdsconfi == "0") {
            swal("", "Please Select TDS Option", "warning");
                return false;
                }
        }



        //cehcking start
        var BillValue = jQuery('#billOfType').val();
        if (BillValue == "2") {
            if (jQuery('#traDate').val() == "") {
                swal("", "Please Enter Date", "warning");
                return false;
            }
            else if (jQuery('#traToDate').val() == "") {
                swal("", "Please Select Date", "warning");
                return false;
            }
        }

        branchval = jQuery('#branch').val()
        if (branchval == "00") {
            swal("", "Please choose branch", "warning");   
            return false;
        }


        if (jQuery('#expense').val() == "0") {
            swal("", "Please Select Expense", "warning");
            return false;
        }
        else if (jQuery('#subexpense').val() == "0") {
            swal("", "Please Select Sub Expense", "warning");
            return false;
        }
        else if (jQuery('#amount').val() == "") {
            swal("", "Please Enter Amount", "warning");
            return false;
        }
        else if (jQuery('#billno').val() == "") {
            swal("", "Please Enter Bill Number", "warning");
            return false;
        }


        var BillValue = jQuery('#billOfType').val();
        if (BillValue == "1") {
            if (jQuery('#vendorstate').val() == "0") {
                swal("", "Please Select Vendor State", "warning");
                return false;
            }
            else if (jQuery('#BillToDate').val() == ""){
                swal("", "Please Select Bill Date", "warning");
                return false;
            }
        }
        //else if (jQuery('#vendorstate').val() == "0") {
        //    swal("", "Please Select Vendor State", "warning");
        //    return false;
        //}
        //stop


        _HoPaymentEntry.HoEntryData();
       // jQuery('#vendor').val("0");
       // jQuery('#employee').val("0");


        jQuery('#gstper').val("0");
        //jQuery('#tdsper').val("0");
        jQuery('#subexpense').val("0");
        jQuery('#amount').val('');
        jQuery('#gstamount').val('0');  //null value set to 0
        jQuery('#tdsamount').val('0');
        jQuery('#gstOfType').val('0');
        jQuery('#tdsmaster').val('0');

        
    });


    //GST branch state load
    jQuery('#branch').change(function () {        
       _HoPaymentEntry.GstBranchStateLoad();
        
    });

    // Employee Benefiaciary account number load
    jQuery('#employee').change(function () {
        _HoPaymentEntry.EmployeeAccountLoad();

    });


    // TDS Account Change
    jQuery('#tdsmaster').change(function () {
        _HoPaymentEntry.TdsPerLoad();
        jQuery('#tdsamount').val('0');

    });



    //GST Percentage Load

    jQuery("#gstOfType").change(function (e) {
        jQuery('.page-loader-wrapper').show();
        var gstvalue = jQuery('#gstOfType').val()
        if (gstvalue == "1") {
            _HoPaymentEntry.GstperLoad();
            jQuery('#gstamount').val('0');
        }
        else if (gstvalue == "2") {
            _HoPaymentEntry.GstperLoad();
            jQuery('#gstamount').val('0');
        }
        else {
            _HoPaymentEntry.GstperLoad();
            jQuery('#gstamount').val('0');
        }



    });

    // AMOUNT Type Full or Partial

    jQuery('input:radio[name="amountfull"]').click(function (e) {
        var val = jQuery('input:radio[name="amountfull"]:checked').val();
        if (val != "0") {
            jQuery('#partialamountdiv').show();
            
        }
        else {
            jQuery('#partialamountdiv').hide();
            
        }
    });


    //TDS Radio Button

    jQuery('input:radio[name="tdsyes"]').click(function (e) {
        var val = jQuery('input:radio[name="tdsyes"]:checked').val();
        if (val != "0") {
            jQuery('#tdspercentage').show();
            jQuery('#tdstotamount').show();
            jQuery('#tdsmasterdiv').show();
            _HoPaymentEntry.TdsMasterLoad();
            //_HoPaymentEntry.TdsPerLoad();  tds slab 
        }
        else {
            jQuery('#tdspercentage').hide();
            jQuery('#tdstotamount').hide();
            jQuery('#tdsmasterdiv').hide();

        }
    });


    //IFSC code verification  Commented already in html 
    //jQuery("#txtConfirmAccountNumber").change(function (e) {

    //    _HoPaymentEntry.bankFill();
    //});


    //jQuery("#txtConfirmAccountNumber1").change(function (e) {

    //    _HoPaymentEntry.bankFillNew();
    //});



      //Save the expense
    jQuery('#hopaymentsave').click(function (e) {
        _HoPaymentEntry.HoPaymentSubmit();
    });

    jQuery('#hopaymentclear').click(function (e) {
        window.location.reload(true);
    });



    jQuery('#clear').click(function () {
        jQuery('#employee').val("0");
        jQuery('#gstper').val("0");
        jQuery('#tdsper').val("0");
        jQuery('#subexpense').val("0");
        jQuery('#amount').val('');
        jQuery('#gstamount').val('0');  //null value set to 0
        jQuery('#tdsamount').val('0');
        jQuery('#gstOfType').val('0');
        jQuery('#tdsmaster').val('0');

    });





    jQuery('#ClickmeBtnConfirm').click(function () {
        jQuery('#remarksdiv').show();
        jQuery('#add').hide();
        jQuery('#partialamount').show();

        var finalamount = jQuery('#amttotal').text();
        jQuery('#fullamount').val(finalamount);
    });


         //GST 

    jQuery('#gstin').change(function (e) {
        var val = parseInt(jQuery('#gstin').val());
        _HoPaymentEntry.GetGST();
    });

    //GST Amount Total

    jQuery('#gstper').change(function (e) {
        var chkamt = jQuery('#amount').val();
        if (chkamt == "") {          
            swal("", "Please Enter amount", "warning");
            jQuery('#gstper').val("0");
                return false;            
        }
        _HoPaymentEntry.GetGstPercentage();
    });

   
        //camera

    jQuery('#billupd').click(function (e) {

        jQuery('#camera').show();
        jQuery('#camsection').show();
        jQuery('#closeCam').show();
        jQuery('#payFile').hide();
        _HoPaymentEntry.takeSnapShot();
    });

    jQuery('#ClickmeBtn').click(function (e) {
        _HoPaymentEntry.takeInvoice();
        jQuery('#payfile').hide();
    });

    jQuery('#ClickmeBtnSave').click(function (e) {
        jQuery('#camera').hide();
        jQuery('#camsection').hide();
        jQuery('#closeCam').hide();
        jQuery('#viewUploadedImages').hide();
        /*jQuery('#payfile').hide();*/
        if (Strbase64 != null) {
            jQuery('#tick').show();
            jQuery('#close').hide();
        }
        Webcam.reset();
    });

    jQuery('#payfile').change(function (e) {
        var file = "payfile";
        jQuery('#billupd').hide();
        _HoPaymentEntry.convertToBase64(file);
    });


});

function ReversCon(i) {
    tblData.splice(i, 1);
    _HoPaymentEntry.HoDataTable(tblData);
}

var spanCam = document.getElementsByClassName("close")[0];
spanCam.onclick = function () {
    jQuery('#camera').hide();
    jQuery('#camsection').hide();
    jQuery('#closeCam').hide();
    jQuery('#viewUploadedImages').hide();
    if (Strbase64 != null) {
        jQuery('#tick').show();
        jQuery('#close').hide();
    }

    Webcam.reset();
}

