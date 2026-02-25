var _DepositWithBankAprl = {


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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _DepositWithBankAprl.checkAccessRtn, token)
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
                    _DepositWithBankAprl.loadDepositRequestDetails();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _DepositWithBankAprl.checkAccessToken, userdata.token)
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
                _DepositWithBankAprl.loadDepositRequestDetails();
            }


        }

    },



    //Select Deposit Request Details
    loadDepositRequestDetails: function () {
        jQuery('.page-loader-wrapper').show();
        var DepositRequestDetails = {
            Flag: "DepositReqApproval",
            PagVal: "GetLoanDeposit",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };


        DepositRequestDetails = JSON.stringify(DepositRequestDetails);
        DepositRequestDetails = { "encryptedRqstStr": EncryptAPIReq(DepositRequestDetails) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DepositRequestDetails, _DepositWithBankAprl.fillDepositRequestDetails, userdata.token);

    },
    fillDepositRequestDetails: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlDeposit").empty();
                jQuery("#ddlDeposit").append(jQuery("<option></option>").val("0").text(" --------SELECT DEPOSIT REQUEST DETAILS-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlDeposit").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlDeposit").empty();
                jQuery("#ddlDeposit").append(jQuery("<option></option>").val("0").text(" --------SELECT DEPOSIT REQUEST DETAILS-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
   


    //Table


    getFromLoanDtls: function () {
        jQuery('.page-loader-wrapper').show();
        var sub = jQuery("#ddlDeposit").val();


        var FromLoanDtls = {
            Flag: "DepositReqApproval",
            PagVal: "getTableNewDepositDtls",
            parVal: sub,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };

        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _DepositWithBankAprl.FillTable, userdata.token);

    },
 
    FillTable: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();
                jQuery('#maincard').show();

                if (response.data.queryResult.QueryResult.length > 0) {

                    jQuery('#Fidatatabl').empty();
                    jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                        var $row = jQuery('<tr/>');
                        var data1 = val.Param1.split("~");
                        //var nval = nval + 1;

                        //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[5]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));

                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[8]));

                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[9]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[10]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[11]));

                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[12]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[13])); 
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[14]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[15]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[16]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[17]));



                        // $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                        jQuery('#Fidatatabl').append($row);
                    });
                }
            }

        }
    },

    //checkvalues: function () {
    //    var DepositReq = jQuery('#ddlDeposit').val();
      
      



    //    if (DepositReq == 0) {
    //        swal("", "Please Select Deposit Request Details", "error");
    //        return false;
    //    }
       
    //    //else if (jQuery("#radRjct").prop("checked") == false && jQuery("#radAppr").prop("checked") == false) {
    //    //    swal("", "Please Select Approve/Reject", "error");
    //    //    return false;
    //   // }
    //    //else if (RejectReason == "") {
    //    //    swal("", "Please Enter The Reason For Rejection", "error");
    //    //    return false;
    //        //}
    //    //else if (RejectReason == "" && jQuery("#radRjct").prop("checked") == true) {
    //    //    swal("", "Please Enter The Reason For Rejection", "error");
    //    //    return false;
    //    //}

    //    else
    //        return true;
    //},
    submitevalue: function () {
        var aprRjct;
        var DepositReq = jQuery('#ddlDeposit').val();
        var RejectReason = jQuery('#txt_reason').val();
        var approvreason = jQuery('#txt_Remark').val();

        if (DepositReq == 0) {
            swal("", "Please Select Deposit Request Details", "error");
            return false;
        }
     

        if (jQuery("#radRjct").prop("checked") == false && jQuery("#radAppr").prop("checked") == false) {
            swal("", "Please Select Approve/Reject", "error");
            return false;
        }

        if (jQuery("#radAppr").prop("checked")) {
            aprRjct = 1;
        }

       

        if (RejectReason == "" && jQuery("#radRjct").prop("checked")) {
            swal("", "Please Enter The Reason For Rejection", "error");
            return false;
        }

        if (approvreason == "" && jQuery("#radAppr").prop("checked")) {
            swal("", "Please Enter The Reason For approve", "error");
            return false;
        }

        if (jQuery("#radRjct").prop("checked") && RejectReason != "") {
            aprRjct = 0;
        }

        inputdata = aprRjct + "µ" + jQuery("#ddlDeposit").val() + "µ" + userdata.userId + "µ" + jQuery("#txt_reason").val() + "µ" + jQuery("#txt_Remark").val();

        //data = aprRjct + "µ" + $("#ddlDeposit").val() + "µ" + $("[id*=hdUserId]").val() + "µ" + $("#txt_reason").val();


        var submitRequest = {

            Flag: "ConfirmDepositApprove",
            ParVal: inputdata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };

        submitRequest = JSON.stringify(submitRequest);
        submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _DepositWithBankAprl.SubmitReturn, userdata.token)


    },

    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
            var msg = jQuery.trim(response.data.message);
            //var msg = String.prototype.trim(response.data.message);
                if (response.data.errStatus = "1") {
                    // if (response.data.queryResult[0].param1 == "1") {

                    if (response.data.queryResult.QueryResult[0].Param1 == "1") {
                        swal({
                            title: "Approved Successfully!",
                            text: "",
                            type: "success"
                        }, function () {
                            window.location.reload(true);
                        });
                    }
                }
                if (response.data.queryResult.QueryResult[0].Param1 == "0") {
                    swal({
                        title: "Rejected Successfully!",
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

}

jQuery(document).ready(function () {

    jQuery('.page-loader-wrapper').hide();
    //_DepositWithBankAprl.loadDepositRequestDetails();
    _DepositWithBankAprl.tokenValidate();



    jQuery('#ddlDeposit').on("change", function () {

        //  $("#showcorddiv").show();
        //  $("#divmethod").show();

        _DepositWithBankAprl.getFromLoanDtls();
    });

    jQuery('#radRjct').on("change", function () {

        jQuery("#dvtext").show();
        jQuery("#dvtextappr").hide();


    });

    jQuery('#radAppr').on("change", function () {

        jQuery("#dvtextappr").show();
        jQuery("#dvtext").hide();

    });

    jQuery('#btnConf').on("click", function () {

        _DepositWithBankAprl.submitevalue();

    });
    jQuery('#BtnExit').on("click", function () {
        window.open("Dashboard", "_self");
    });
});