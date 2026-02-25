var ApproveNcdBondAvailment = {


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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, ApproveNcdBondAvailment.checkAccessRtn, token)
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
                    ApproveNcdBondAvailment.loadSelectFundType();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, ApproveNcdBondAvailment.checkAccessToken, userdata.token)
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
                ApproveNcdBondAvailment.loadSelectFundType();
            }


        }

    },



    //Select Fund Type
    loadSelectFundType: function () {
        jQuery('.page-loader-wrapper').show();
        var DebSelectFundType = {
            Flag: "NCDBondAvailment",
            PagVal: "GetNcdAvailFundType",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebSelectFundType = JSON.stringify(DebSelectFundType);
        DebSelectFundType = { "encryptedRqstStr": EncryptAPIReq(DebSelectFundType) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectFundType, ApproveNcdBondAvailment.FillDebSelectFundType, userdata.token);

    },
    FillDebSelectFundType: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFundType").empty();
                jQuery("#ddlFundType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FUND TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFundType").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFundType").empty();
                jQuery("#ddlFundType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FUND TYPE-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },



    //Select Financial Institution

    loadSelectFinancialInstitution: function (indata,flagVal) {
        jQuery('.page-loader-wrapper').show();
        var DebSelectFinancialInstitution = {
            Flag: "NCDBondAvailment",
            PagVal: flagVal,
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebSelectFinancialInstitution = JSON.stringify(DebSelectFinancialInstitution);
        DebSelectFinancialInstitution = { "encryptedRqstStr": EncryptAPIReq(DebSelectFinancialInstitution) };

       
            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectFinancialInstitution, ApproveNcdBondAvailment.FillDebSelectFinancialInstitution, userdata.token);

       

    },
    FillDebSelectFinancialInstitution: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFi").empty();
                jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FINACIAL INSTITUTION-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFi").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFi").empty();
                jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FINACIAL INSTITUTION-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    loadSelectFundpubissue: function (indata,p_flag) {
        jQuery('.page-loader-wrapper').show();
        var DebSelectFund = {
            Flag: "NCDBondAvailment",
            PagVal: p_flag,
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebSelectFund = JSON.stringify(DebSelectFund);
        DebSelectFund = { "encryptedRqstStr": EncryptAPIReq(DebSelectFund) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectFund, ApproveNcdBondAvailment.FillDebSelectFund, userdata.token);

    },
    //Select Fund

    loadSelectFund: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var DebSelectFund = {
            Flag: "NCDBondAvailment",
            PagVal: "GetNcdAvailed",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        
        };
        DebSelectFund = JSON.stringify(DebSelectFund);
        DebSelectFund = { "encryptedRqstStr": EncryptAPIReq(DebSelectFund) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectFund, ApproveNcdBondAvailment.FillDebSelectFund, userdata.token);

    },
    FillDebSelectFund: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlLoans").empty();
                jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FUND------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlLoans").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlLoans").empty();
                jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FUND-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Add Debenture Approval
    checkvalues: function () {
        if (jQuery("#ddlFundType").val() == "0") {
            swal("Please Select Fund Type...!");
            return false;
        }
        else if (jQuery("#ddlFi").val() == "0") {
            swal("Please Select Financial Institution...!");
            return false;
        }
        else if (jQuery("#ddlLoans").val() == "0") {
            swal("Please Select Fund...!");
            return false;
        }

        else if (jQuery("#radAppr").prop("checked") == false && jQuery("#radRjct").prop("checked") == false) {
            swal("Select Approve Or Reject...!");
            return false;
        }
        else if (jQuery("#txt_reason").val() == "" && jQuery("#radRjct").prop("checked") == true) {
            swal("Please Enter The Reason For Rejection");

            return false;
        }
        else if (jQuery("#radYes").prop("checked") == false && jQuery("#radNo").prop("checked") == false) {
            swal("Select Yes Or No Option...!");
            return false;
        }
       

        else
            return true;
        



    } ,   

    
    submitevalue: function () {
        if (ApproveNcdBondAvailment.checkvalues()) {
        
            var aprRjct, EntryYes ;

            if (jQuery("#radAppr").prop("checked")) {
                aprRjct = 1;
            }
            else if (jQuery("#radRjct").prop("checked")) {
                aprRjct = 0;
            }
            if (jQuery("#radYes").prop("checked")) {
                EntryYes = 1;
            }
            else if (jQuery("#radNo").prop("checked")) {
                EntryYes = 0;
            }

            var InputData = aprRjct + "µ" + jQuery("#ddlLoans").val() + "µ" + userdata.userId + "µ" + jQuery("#txt_reason").val() + "µ" + EntryYes;

            var submitRequest = {

                Flag: "APPROVENEWNCDBOND",
               
                ParVal: InputData,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, ApproveNcdBondAvailment.SubmitReturn, userdata.token)

        }

    },
    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                var msg = jQuery.trim(response.data.message);
                //var msg = String.prototype.trim(response.data.message);
                if (response.data.errStatus = "1") {
                    if (response.data.queryResult.QueryResult[0].Param1 == "1") {
                        swal({
                            title: "Approved Successfully!",
                            text: "",
                            type: "success"
                        }, function () {
                            window.location.reload(true);
                        });
                    }
                    if (response.status === "SUCCESS") {
                        var msg = jQuery.trim(response.data.message);
                        //var msg = String.prototype.trim(response.data.message);
                        //  alert(response.data.errStatus);
                        if (response.data.queryResult.QueryResult[0].Param1 == "2") {

                            swal({
                                title: "Reject Successfully!",
                                text: "",
                                type: "success"
                            }, function () {
                                window.location.reload(true);
                            });
                        }

                    }
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
}     







jQuery(document).ready(function () {

    //ApproveNcdBondAvailment.loadSelectFundType();
    ApproveNcdBondAvailment.tokenValidate();

    jQuery('#ddlFundType').on("change", function () {
        jQuery("#ShowFinInst").show();
        

        var indata = jQuery("#ddlFundType").val();


        if (indata == 2) {

            jQuery("#ShowFinInst").hide();

            ApproveNcdBondAvailment.loadSelectFundpubissue(indata, 'GetNcdAvailedPublicIssue');
        }
        else {
            ApproveNcdBondAvailment.loadSelectFinancialInstitution(indata, 'GetNcdAvailFI');
        }

        
    });



    jQuery('#ddlFi').on("change", function () {
        jQuery("#showSclFnd").show();
        var indata = jQuery("#ddlFundType").val() + 'µ' + jQuery("#ddlFi").val();
        ApproveNcdBondAvailment.loadSelectFund(indata);
    });
    jQuery('#radRjct').on("click", function () {

        jQuery("#dvtext").show();

       
    });


   
    
    jQuery('#btnConf').on("click", function () {
        ApproveNcdBondAvailment.submitevalue();
    });

    jQuery('#btnExit').on("click", function () {
        window.open("Dashboard", "_self");
    });

});


