var BankCharges = {


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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, BankCharges.checkAccessRtn, token)
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
                    BankCharges.loadSelectFund();
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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, BankCharges.checkAccessToken, userdata.token)
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
                BankCharges.loadSelectFund();
            }

        }

    },

    //Select Fund
    loadSelectFund: function () {
        jQuery('.page-loader-wrapper').show();

        if (jQuery("#rdproc").prop("checked") == false && jQuery("#rddoc").prop("checked") == false && jQuery("#rdoth").prop("checked") == false && jQuery("#rdnoc").prop("checked") == false) {
            ModelPopWarning("Please Select Any Charges");
            return false;
        }

        var ptype;
        
        if (jQuery("#rdproc").prop("checked")) {
            ptype = 1;
        }
        else if (jQuery("#rddoc").prop("checked")) {
            ptype = 2;
        }   
        else if (jQuery("#rdoth").prop("checked")) {
            ptype = 3;
        }
        else if (jQuery("#rdnoc").prop("checked")) {
            ptype = 4;
        }

        var DebSelectFund = {
            Flag: "BankCharges_approval",
            PagVal: "LoadFund",
            ParVal: ptype.toString(),
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebSelectFund = JSON.stringify(DebSelectFund);
        DebSelectFund = { "encryptedRqstStr": EncryptAPIReq(DebSelectFund) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectFund, BankCharges.FillDebSelectFund, userdata.token);

    },
    FillDebSelectFund: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_Loan").empty();
                jQuery("#ddl_Loan").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FUND-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_Loan").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_Loan").empty();
                jQuery("#ddl_Loan").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SELECT FUND-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //table

    getFromLoanDtls: function () {
        var ptype;
        jQuery("#ShowtblDiv").show();
        jQuery("#divaprrej").show();
        if (jQuery("#rdproc").prop("checked") == false && jQuery("#rddoc").prop("checked") == false && jQuery("#rdoth").prop("checked") == false && jQuery("#rdnoc").prop("checked") == false) {
            swal("Please Select Any Charges");
            return false;
        }
        if (jQuery("#rdproc").prop("checked")) {
            ptype = 1;
        }
        else if (jQuery("#rddoc").prop("checked")) {
            ptype = 2;
        }
        else if (jQuery("#rdoth").prop("checked")) {
            ptype = 3;
        }
        else if (jQuery("#rdnoc").prop("checked")) {
            ptype = 4;
        }
        var FromLoanDtls = {
            Flag: "BankCharges_approval",
            PagVal: "LoadTable",
            parVal: jQuery("#ddl_Loan").val() + 'µ' + ptype.toString(),
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, BankCharges.FillTable, userdata.token);

    },
    //FromLoanDtlsResponse: function (Response) {
    //    if (Response.status === "SUCCESS") {

    //        BankCharges.FillTable(Response);

    //    }
    //    else {

    //        return false;
    //    }
    //},
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


                        jQuery('#Fidatatabl').append($row);
                    });
                }
            }

        }
    },

    //New ProcFeeNew popup
    checkvalues: function () {

        if (jQuery("#rdproc").prop("checked") == false && jQuery("#rddoc").prop("checked") == false && jQuery("#rdoth").prop("checked") == false && jQuery("#rdnoc").prop("checked") == false) {
            swal("Please Select Any Charges");
            return false;
        }
        if (jQuery("#ddl_Loan").val() == "0") {
            swal("Please Select Fund...!!!");
            return false;
        }
        if (jQuery("#radAppr").prop("checked") == false && jQuery("#radRjct").prop("checked") == false) {
            swal("Please select an Option - Approve/Reject..!");
            return false;
        }
        if (jQuery("#txt_reason").val() == "" && jQuery("#radRjct").prop("checked") == true) {
            swal("Please Enter The Reason For Rejection");
            return false;
        }
        else {
            return true;
        }
    },


    payment: function () {

        var loan_id, dataid, loan_no;

        if (jQuery("#rdproc").prop("checked")) {
            ptype = 1;
        }
        else if (jQuery("#rddoc").prop("checked")) {
            ptype = 2;
        }
        else if (jQuery("#rdoth").prop("checked")) {
            ptype = 3;
        }
        else if (jQuery("#rdnoc").prop("checked")) {
            ptype = 4;
        }

        var dataid = jQuery("#ddl_Loan").val().split('µ');
        var loan_id = dataid[1];
        var loan_no = dataid[0] + '~' + ptype;


        var paymentRequest = {
            fileId: loan_id,
            customerId: loan_no,
            paymentMode: 'IMPS',
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
           
        };
        paymentRequest = JSON.stringify(paymentRequest);
        paymentRequest = { "encryptedRqstStr": EncryptAPIReq(paymentRequest) };

        _http.post(MFPUBLICLMSAPI_URL + "api/disbursement/ICICIDisbursement", paymentRequest, BankCharges.paymentReturn, userdata.token)


    },

    paymentReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


                var msg = jQuery.trim(response.data.message);
                //var msg = String.prototype.trim(response.data.message);

                if (response.status === "SUCCESS") {
                    var msg = jQuery.trim(response.data.message);
                    //var msg = String.prototype.trim(response.data.message);
                    //  alert(response.data.errStatus);
                    if (response.data.queryResult.QueryResult[0].Param1 == "1") {
                            BankCharges.payment();
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
                            title: "Approve Successfully!",
                            text: "",
                            type: "success"
                        }, function () {
                            window.location.reload(true);
                        });
                    }
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


    submitevalue: function () {
        if (BankCharges.checkvalues()) {
            var aprRjct, ptype
            if (jQuery("#rdproc").prop("checked")) {
                ptype = 1;
            }
            if (jQuery("#rddoc").prop("checked")) {
                ptype = 2;
            }
            if (jQuery("#rdoth").prop("checked")) {
                ptype = 3;
            }
            if (jQuery("#rdnoc").prop("checked")) {
                ptype = 4;
            }
            if (jQuery("#radAppr").prop("checked")) {
                aprRjct = 1;
            }
            if (jQuery("#radRjct").prop("checked")) {
                aprRjct = 0;
            }
            var InputData = jQuery("#ddl_Loan").val() + "µ" + ptype + "µ" + aprRjct + "µ" + jQuery("#txt_reason").val() + "µ" + userdata.userId;

            var submitRequest = {

                Flag: "BANKCHARGES",
                PagVal: InputData,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, BankCharges.SubmitReturn,  userdata.token)


        }

        
    },

    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


            var msg = jQuery.trim(response.data.message);
            //var msg = String.prototype.trim(response.data.message);

                if (response.status === "SUCCESS") {
                    var msg = jQuery.trim(response.data.message);
                    //var msg = String.prototype.trim(response.data.message);
                    //  alert(response.data.errStatus);
                    /* if (response.data.responseMsg = "SUCCESS") {*/
                    if (response.data.errStatus = "1") {
                        if (response.data.queryResult.QueryResult[0].Param1 == "1") {
                            BankCharges.payment();
                            swal({
                                title: "Approved Successfully!",
                                text: "",
                                type: "success"
                            }, function () {
                                window.location.reload(true);
                            });
                        }
                       
                    }
                }
                    
                if (response.status === "SUCCESS") {
                    var msg = jQuery.trim(response.data.message);
                    //var msg = String.prototype.trim(response.data.message);
                    //  alert(response.data.errStatus);
                    /* if (response.data.responseMsg = "SUCCESS") {*/
                    if (response.data.errStatus = "2") {
                        if (response.data.queryResult.QueryResult[0].Param1 == "2") {
                            BankCharges.payment();
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


                if (response.status === "SUCCESS") {
                    var msg = jQuery.trim(response.data.message);
                    //var msg = String.prototype.trim(response.data.message);
                    //  alert(response.data.errStatus);
                    /* if (response.data.responseMsg = "SUCCESS") {*/
                    if (response.data.errStatus = "0") {
                        if (response.data.queryResult.QueryResult[0].Param1 == "0") {
                            BankCharges.payment();
                            swal({
                                title: "Approved Successfully!",
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



   // BankCharges.loadSelectFund();
    jQuery('#rdproc').on("click", function () {
        jQuery("#divfi").show();
        jQuery('#txt_reason').val("");
        jQuery('#maincard').hide();
        jQuery('#divaprrej').hide(); jQuery('#dvtext').hide();
        jQuery('#radRjct').prop('checked', false);
        jQuery('#radAppr').prop('checked', false);

        //BankCharges.loadSelectFund();
        BankCharges.tokenValidate();
    });
    jQuery('#rddoc').on("click", function () {
        jQuery("#divfi").show();
        jQuery('#txt_reason').val("");
        jQuery('#maincard').hide();
        jQuery('#divaprrej').hide(); jQuery('#dvtext').hide();
        jQuery('#radRjct').prop('checked', false);
        jQuery('#radAppr').prop('checked', false);
        //BankCharges.loadSelectFund();
        BankCharges.tokenValidate();
    });
    jQuery('#rdoth').on("click", function () {
        jQuery("#divfi").show();
        jQuery('#txt_reason').val("");
        jQuery('#maincard').hide();
        jQuery('#divaprrej').hide(); jQuery('#dvtext').hide();
        jQuery('#radRjct').prop('checked', false);
        jQuery('#radAppr').prop('checked', false);
        //BankCharges.loadSelectFund();
        BankCharges.tokenValidate();
    });
    jQuery('#rdnoc').on("click", function () {
        jQuery("#divfi").show();
        jQuery('#txt_reason').val("");
        jQuery('#maincard').hide();
        jQuery('#divaprrej').hide();
        jQuery('#dvtext').hide();
        jQuery('#radRjct').prop('checked', false);
        jQuery('#radAppr').prop('checked', false);
        //BankCharges.loadSelectFund();
        BankCharges.tokenValidate();

    });
    jQuery('#ddl_Loan').on("change", function () {

        var loan = jQuery('#ddl_Loan').val();
        if (loan == 0) {
            jQuery('#divaprrej').hide();
            jQuery('#txt_reason').val("");
            jQuery('#dvtext').hide();
            jQuery('#radRjct').prop('checked', false);
            jQuery('#radAppr').prop('checked', false);
            jQuery("#maincard").hide();


        }
        else {
            jQuery("#maincard").show();
            jQuery('#txt_reason').val("");
            jQuery('#divaprrej').hide(); jQuery('#dvtext').hide();
            jQuery('#radRjct').prop('checked', false);
            jQuery('#radAppr').prop('checked', false);
            BankCharges.getFromLoanDtls();
        }
    });
    jQuery('#radRjct').on("click", function () {
        jQuery('#dvtext').show();
    });
    jQuery('#radAppr').on("click", function () {
        jQuery("#dvtext").hide();
    });
    jQuery('#btnConf').on("click", function () {
        BankCharges.submitevalue();
    });

    
});
jQuery('#btnExit').on("click", function () {
    window.open("Dashboard", "_self");
});