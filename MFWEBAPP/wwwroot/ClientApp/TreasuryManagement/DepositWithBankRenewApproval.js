var _DepositWithBankRenewalAprl = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _DepositWithBankRenewalAprl.checkAccessRtn, token)
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
                    _DepositWithBankRenewalAprl.loadRenewalDepositRequestDetails();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _DepositWithBankRenewalAprl.checkAccessToken, userdata.token)
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
                _DepositWithBankRenewalAprl.loadRenewalDepositRequestDetails();
            }


        }

    },

    //Select Deposit Request
    loadRenewalDepositRequestDetails: function () {
        jQuery('.page-loader-wrapper').show();
        var RenewalDepositRequestDetails = {
            Flag: "DepositRenewalApproval",
            PagVal: "Getrenewreq",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        RenewalDepositRequestDetails = JSON.stringify(RenewalDepositRequestDetails);
        RenewalDepositRequestDetails = { "encryptedRqstStr": EncryptAPIReq(RenewalDepositRequestDetails) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", RenewalDepositRequestDetails, _DepositWithBankRenewalAprl.fillRenewalDepositRequestDetails, userdata.token);

    },
    fillRenewalDepositRequestDetails: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlDeposit").empty();
                jQuery("#ddlDeposit").append(jQuery("<option></option>").val("0").text(" --------SELECT RENEWAL DEPOSIT REQUEST DETAILS-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlDeposit").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlDeposit").empty();
                jQuery("#ddlDeposit").append(jQuery("<option></option>").val("0").text(" --------SELECT RENEWAL DEPOSIT REQUEST DETAILS-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Table1


    getFromLoanDtlsAprd: function () {
        jQuery('.page-loader-wrapper').show();

        jQuery("#maincard1").show();


        var sub = jQuery("#ddlDeposit").val();


        var FromLoanDtls = {
            Flag: "DepositRenewalApproval",
            PagVal: "getTablerenewDtls",
            parVal: sub,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _DepositWithBankRenewalAprl.FromLoanDtlsResponseApr, userdata.token);

    },
    FromLoanDtlsResponseApr: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                _DepositWithBankRenewalAprl.FillTableapr(response);

            }
            else {

                return false;
            }
        }
    },
        FillTableapr: function (response) {
            if (response.status === "SUCCESS") {
                response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
                if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                    jQuery('.page-loader-wrapper').hide();
                    jQuery('#maincard1').show();

                    if (response.data.queryResult.QueryResult.length > 0) {

                        jQuery('#Fidatatable1').empty();
                        jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                            var $row1 = jQuery('<tr/>');
                            var data1 = val.Param1.split("~");
                            //var nval = nval + 1;

                            //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                            $row1.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                            $row1.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                            $row1.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                            $row1.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                            $row1.append(jQuery('<td class="HCol" align="left">').html(data1[4]));
                            //  $row.append(jQuery('<td class="HCol" align="left">').html(data1[5]));
                            // $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                            // $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                            jQuery('#Fidatatable1').append($row1);
                        });
                    }

                }
            }
    },


    //Table2


    getFromLoanDtlsold: function () {
        jQuery('.page-loader-wrapper').show();
        jQuery("#maincard2").show();
        var sub = jQuery("#ddlDeposit").val();


        var FromLoanDtls = {
            Flag: "DepositRenewalApproval",
            PagVal: "getTablerenewreqDtls",
            parVal: sub,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _DepositWithBankRenewalAprl.FromLoanDtlsResponseOld, userdata.token);

    },
    FromLoanDtlsResponseOld: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                _DepositWithBankRenewalAprl.FillTableold(response);

            }
            else {

                return false;
            }
        }
    },
    FillTableold: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();
                jQuery('#maincard2').show();

                if (response.data.queryResult.QueryResult.length > 0) {

                    jQuery('#Fidatatable2').empty();
                    jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                        var $row2 = jQuery('<tr/>');
                        var data2 = val.Param1.split("~");
                        //var nval = nval + 1;

                        //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                        $row2.append(jQuery('<td class="HCol" align="left">').html(data2[0]));
                        $row2.append(jQuery('<td class="HCol" align="left">').html(data2[1]));
                        $row2.append(jQuery('<td class="HCol" align="left">').html(data2[2]));
                        $row2.append(jQuery('<td class="HCol" align="left">').html(data2[3]));
                        $row2.append(jQuery('<td class="HCol" align="left">').html(data2[4]));
                        // $row.append(jQuery('<td class="HCol" align="left">').html(data1[5]));
                        // $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                        // $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                        jQuery('#Fidatatable2').append($row2);
                    });
                }

            }
        }
    },

    //checkvalues: function () {
    //    var DepositReq = jQuery('#ddlDeposit').val();
    //    var RejectReason = jQuery('#txt_reason').val();



    //    if (DepositReq == 0) {
    //        swal("", "Please Select Renewal Deposit Request Details", "error");
    //        return false;
    //    }
    //    else if (RejectReason == "") {
    //        swal("", "Please Enter The Reason For Rejection", "error");
    //        return false;
    //    }

    //    else
    //        return true;
    //},

    submitevalue: function () {
       /* if (_DepBankReq.checkvalue()) {*/
            
            var aprRjct;
            var DepositReq = jQuery('#ddlDeposit').val();
        var RejectReason = jQuery('#txt_reason').val();
        var Remark = jQuery('#txt_remark').val();

            if (DepositReq == 0) {
                swal("", "Please Select Deposit Request Details", "error");
                return false;
            }

            //if (jQuery("#radAppr").prop("checked")) {
            //    aprRjct = 1;
            //}
            //if (jQuery("#radRjct").prop("checked")) {
            //    aprRjct = 0;
            //}

            if (jQuery("#radRjct").prop("checked") == false && jQuery("#radAppr").prop("checked") == false) {
                swal("", "Please Select Approve/Reject", "error");
                return false;
            }
        if (Remark == "" && jQuery("#radAppr").prop("checked")) {
            swal("", "Please Enter The REMARK For Approved It", "error");
            return false;
        }

            if (jQuery("#radAppr").prop("checked")) {
                aprRjct = 1;
            }




            if (RejectReason == "" && jQuery("#radRjct").prop("checked")) {
                swal("", "Please Enter The Reason For Rejection", "error");
                return false;
            }

            if (jQuery("#radRjct").prop("checked") && RejectReason != "") {
                aprRjct = 0;
            }
        if (aprRjct == 0) {
            data = aprRjct + "µ" + jQuery("#ddlDeposit").val() + "µ" + userdata.userId + "µ" + jQuery("#txt_reason").val();

        }
        else {



            data = aprRjct + "µ" + jQuery("#ddlDeposit").val() + "µ" + userdata.userId + "µ" + jQuery("#txt_remark").val();
        }

        var submitRequest = {

            Flag: "ConfirmDepositrenwApprove",
            PagVal: data,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        submitRequest = JSON.stringify(submitRequest);
        submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _DepositWithBankRenewalAprl.SubmitReturn, userdata.token)

    },

    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
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
                    else {
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
        }
    },

}


jQuery(document).ready(function () {

    jQuery('.page-loader-wrapper').hide();
    //_DepositWithBankRenewalAprl.loadRenewalDepositRequestDetails();
    _DepositWithBankRenewalAprl.tokenValidate();


});

jQuery('#ddlDeposit').on("change", function () {


    _DepositWithBankRenewalAprl.getFromLoanDtlsAprd();
    _DepositWithBankRenewalAprl.getFromLoanDtlsold();
});

jQuery('#radRjct').on("change", function () {

    jQuery("#dvtext").show();
    jQuery("#dvtexts").hide();

});

jQuery('#radAppr').on("change", function () {

    jQuery("#dvtext").hide();
    jQuery("#dvtexts").show();


});

jQuery('#btnConf').on("click", function () {

    _DepositWithBankRenewalAprl.submitevalue();

});
jQuery('#BtnExit').on("click", function () {
    window.open("Dashboard", "_self");
});