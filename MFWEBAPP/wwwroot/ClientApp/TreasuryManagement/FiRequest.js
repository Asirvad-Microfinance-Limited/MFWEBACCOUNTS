var _fidata = {


    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var CheckAccess = {
            "typeID": "2",
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1001",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            CheckAccess = JSON.stringify(CheckAccess);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _fidata.checkAccessRtn, token)
    },

    checkAccessRtn: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                token = response.data.token;
                var x = response.data.queryResult[0].param1;
                if (x == "0") {
                    swal({
                        title: "Access Denied",
                        text: "You are not autherized to view this page.!",
                        type: "info"
                    }, function () {
                        window.location.href = "dashboard";
                    });
                }
                else {
                    _fidata.mbValidation();
                }

            }
        }
        else {
            swal({
                title: "Access Denied",
                text: "You are not autherized to view this page.!",
                type: "info"
            }, function () {
                window.location.href = "dashboard";
            });
        }
    },

    tokenValidate: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var CheckToken = {
            "typeID": "1",
            "userID": userdata.userId,
            "branchID": userdata.branchId

        };

        try {
            CheckToken = JSON.stringify(CheckToken);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckToken = { "encryptedRqstStr": EncryptAPIReq(CheckToken) };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _fidata.checkAccessToken, userdata.token)
    },

    // Token response



    checkAccessToken: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            token = response.data.queryResult.tokenId;
            if (response.data.errStatus == 0) {
                swal({
                    title: "Access Denied",
                    text: "You are already login in pr module!",
                    type: "info"
                }, function () {
                    window.location.href = "dashboard";
                });
            }
            else {
                _fidata.mbValidation();
            }


        }

    },

    mbValidation: function () {
        var phone = jQuery('#txt_mob').val();
        var phlength = phone.length;
        if (phlength < "10") {
            swal("", "Please enter correct mobile number", "error");
            jQuery('#txt_mob').val("");
            jQuery('#txt_mob').focus();
            return false;
        }
    },
    emailValidationn: function (email) {

        var filter = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        if (filter.test(email)) {
            return true;
        }
        else {
            swal("", "Please enter valid Email Id", "error");
            jQuery('#txt_eml').val("");
            return false;
        }
    },
    panValidationn: function (PAN) {

        var regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (PAN.length === 10 && regex.test(PAN)) {
            return true;
        } else {
            swal("", "Please enter valid PAN", "error");
            jQuery('#pan_txt').val("");
            return false;
        }

    },
    ContactValidation: function () {
        var phone = jQuery('#txt_contactnum').val();
        var phlength = phone.length;
        if (phlength < "10") {
            swal("", "Please enter correct contact number", "error");
            jQuery('#txt_contactnum').val("");
            jQuery('#txt_contactnum').focus();
            return false;
        }
    },
    cinValidationn: function (CIN) {
        var regex = /^([LU]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;

        if (!regex.test(CIN)) {
            swal("", "Please enter valid CIN", "error");
            jQuery('#txt_cin').val("");
            jQuery('#txt_cin').focus();
            return false;

        } else {
            return true;
        }
    },
    gstinValidate: function (GSTIN) {
        var reggst = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (!reggst.test(GSTIN)) {
            swal("", "Please enter valid GSTIN", "error");
            jQuery('#gstn_txt').val("");
            jQuery('#gstn_txt').focus();
            return false;
        }
        else {
            _fidata.gstdata(GSTIN);
        }
    },
    gstdata: function (GSTIN) {
        var consent_type = "Y";
        var consent_txt = "I hereby declare my consent agreement for verifying my data to Asirvad company";

        var gstreqdata = {
            gstin: GSTIN,
            consent: consent_type,
            consent_text: consent_txt,
            firmId: "3",
            empId: userdata.userId,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        }
        gstreqdata = JSON.stringify(gstreqdata);
        gstreqdata = { "encryptedRqstStr": EncryptAPIReq(gstreqdata) };

        _http.post(MFPUBLIKYCAPI_URL + "api/gst", gstreqdata, _fidata.fillGstdata, userdata.token);
    },
    fillGstdata: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {



                jQuery("#txt_adrs").val(response.data.pradr.adr);
                jQuery("#txt_eml").val(response.data.pradr.em);
                jQuery("#txt_mob").val(response.data.pradr.mb);
                jQuery("#txt_adrs").prop('disabled', true);
                jQuery("#txt_eml").prop('disabled', true);
                jQuery("#txt_mob").prop('disabled', true);
                return true;
            }
            else {
                swal("", "API NOT SUCESS", "error");
                jQuery("#txt_adrs").val("");
                jQuery("#txt_eml").val("");
                jQuery("#txt_mob").val("");
                return true;
            }
        }
    },
    loadFIType: function () {
        jQuery('.page-loader-wrapper').show();
        var fiTypes = {
            Flag: "FIREQUEST",
            PagVal: "GetFIType",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        fiTypes = JSON.stringify(fiTypes);
        fiTypes = { "encryptedRqstStr": EncryptAPIReq(fiTypes) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", fiTypes, _fidata.fillFiType, userdata.token);
    },
    fillFiType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFIType").empty();
                jQuery("#ddlFIType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFIType").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFIType").empty();
                jQuery("#ddlFIType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI TYPE-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    submitdata1: function () {

        if (_fidata.checkvalues()) {


            var FiType = jQuery('#ddlFIType').val();
            var FiName = jQuery('#txt_fiName').val();
            var FiAdrs = jQuery('#txt_adrs').val();
            var FiEmail = jQuery('#txt_eml').val();
            var FiMob = jQuery('#txt_mob').val();
            var FiPAN = jQuery('#pan_txt').val();
            var CPName = jQuery('#txt_person').val();
            var CPNum = jQuery('#txt_contactnum').val();
            var CIN = jQuery('#txt_cin').val();
            var GSTIN = jQuery('#gstn_txt').val();

            var vdata = userdata.branchId + 'µ' + FiType + 'µ' + FiName + 'µ' + FiAdrs + 'µ' + FiEmail + 'µ' + FiMob + 'µ' + FiPAN + 'µ' + CIN + 'µ' + CPName + 'µ' + CPNum + 'µ' + GSTIN + 'µ' + userdata.userId;

            var submitRequest = {

                Flag: "ADDFINANCIALINST",
                ParVal: vdata,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _fidata.SubmitReturn, userdata.token)
        }

    },
    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();
        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
        if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


            if (response.status == "SUCCESS") {

                var msg = jQuery.trim(response.data.message);
                //var msg = String.prototype.trim(response.data.message);
                if (response.data.errStatus = "1") {
                    swal({
                        title: "Requested Successfully!",
                        text: "",
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
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
    checkvalues: function () {
        var FiType = jQuery('#ddlFIType').val();
        var FiName = jQuery('#txt_fiName').val();
        var FiAdrs = jQuery('#txt_adrs').val();
        var FiEmail = jQuery('#txt_eml').val();
        var FiMob = jQuery('#txt_mob').val();
        var FiPAN = jQuery('#pan_txt').val();
        var CPName = jQuery('#txt_person').val();
        var CPNum = jQuery('#txt_contactnum').val();
        var CIN = jQuery('#txt_cin').val();

        if (FiType == 0) {
            swal("", "Please Select Financial Institution Type", "error");
            return false;
        }
        else if (FiName == "") {
            swal("", "Please Enter Financial Institution Name", "error");
            return false;
        }
        else if (FiAdrs == "") {
            swal("", "Please Enter Address", "error");
            return false;
        }
        else if (FiEmail == "") {
            swal("", "Please Enter Email", "error");
            return false;
        }
        else if (FiMob == "") {
            swal("", "Please Enter Mobile Number", "error");
            return false;
        }
        else if (FiPAN == "") {
            swal("", "Please Enter PAN", "error");
            return false;
        }
        else if (CIN == "") {
            swal("", "Please Enter CIN", "error");
            return false;
        }
        else if (CPName == "") {
            swal("", "Please Enter Contact Person Name", "error");
            return false;
        }
        else if (CPNum == "") {
            swal("", "Please Enter Contact Person Number", "error");
            return false;
        }
        else if (jQuery("#radYes").prop("checked") == false && jQuery("#radNo").prop("checked") == false) {
            swal("", "Please select an Option GSTIN-Yes/No..!", "error");
            return false;
        }
        else if (jQuery("#radYes").prop("checked") == true && jQuery("#gstn_txt").val() == "") {
            swal("", "Please Enter GSTIN", "error");
            return false;
        }
        else
            return true;
    }
}
jQuery(document).ready(function () {

    jQuery('.page-loader-wrapper').hide();
    _fidata.loadFIType();
    
    jQuery('#btnConf').on("click", function () {

        _fidata.submitdata1();
    });
    jQuery('#radYes').on("click", function () {
        jQuery('#divGST').show();
    });
    jQuery('#radNo').on("click", function () {
        jQuery('#divGST').hide();
        jQuery("#txt_adrs").prop('disabled', false);
        jQuery("#txt_eml").prop('disabled', false);
        jQuery("#txt_mob").prop('disabled', false);
        jQuery("#txt_adrs").val("");
        jQuery("#txt_eml").val("");
        jQuery("#txt_mob").val("");
        jQuery("#gstn_txt").val("");
    });
    jQuery('#txt_mob').on("change", function () {
        //_fidata.mbValidation();
        _fidata.tokenValidate();
    });
    jQuery('#txt_contactnum').on("change", function () {
        _fidata.ContactValidation();
    })
    jQuery('#txt_eml').on("change", function () {
        var email = jQuery('#txt_eml').val();
        _fidata.emailValidationn(email);
    });

    jQuery('#pan_txt').on("change", function () {
        var PAN = jQuery('#pan_txt').val();
        _fidata.panValidationn(PAN);
    });
    jQuery('#txt_cin').on("change", function () {
        var CIN = jQuery('#txt_cin').val();
        _fidata.cinValidationn(CIN);
    });
    jQuery('#gstn_txt').on("change", function () {
        var GSTIN = jQuery('#gstn_txt').val();
        _fidata.gstinValidate(GSTIN);
    });
   

    jQuery('#ddlFIType').on("change", function () {
        jQuery('#txt_fiName').val("");
    });
    jQuery('#ddlFIType').on("change", function () {
        jQuery('#radYes').val("");
        jQuery('#radNo').val("");
        jQuery('#txt_adrs').val("");
        jQuery('#txt_eml').val("");
        jQuery('#txt_mob').val("");
        jQuery('#txt_cin').val("");
        jQuery('#pan_txt').val("");
        jQuery('#txt_person').val("");
        jQuery('#txt_contactnum').val("");
        

    });
});
jQuery('#btnExit').on("click", function () {
    window.open("Dashboard", "_self");
});