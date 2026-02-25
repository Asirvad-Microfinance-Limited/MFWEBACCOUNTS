var _ChangeInterestapprove = {


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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _ChangeInterestapprove.checkAccessRtn, token)
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
                    _ChangeInterestapprove.loadSelectLoan();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _ChangeInterestapprove.checkAccessToken, userdata.token)
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
                _ChangeInterestapprove.loadSelectLoan();
            }


        }

    },




    //Select Loan
    loadSelectLoan: function () {
        jQuery('.page-loader-wrapper').show();
        var DebSelectLoan = {
            Flag: "Interest_Rate_ChangeAprove",
            PagVal: "GetLoanDTlchangeInt",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };


        DebSelectLoan = JSON.stringify(DebSelectLoan);
        DebSelectLoan = { "encryptedRqstStr": EncryptAPIReq(DebSelectLoan) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectLoan, _ChangeInterestapprove.FillDebSelectLoan, userdata.token);

    },
    FillDebSelectLoan: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_approve").empty();
                jQuery("#ddl_approve").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SELECT LOAN -------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_approve").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_approve").empty();
                jQuery("#ddl_approve").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT LOAN-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }

    },

//table display
    getFromLoanDtls: function () {
        jQuery('.page-loader-wrapper').show();
        // var sub = jQuery("#ddl_Reqst").val();
        var M = jQuery('#ddl_approve').val();
        var centerSplit = M.split('µ');
        var sub = centerSplit[0];
        //var loanlimit = centerSplit[1];

        var FromLoanDtls = {
            Flag: "Interest_Rate_ChangeAprove",
            PagVal: "GetIntRate",
            parVal: sub,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _ChangeInterestapprove.FillTable, userdata.token);

    },
    //FromLoanDtlsResponse: function (Response) {
    //    if (Response.status === "SUCCESS") {

    //        _ChangeInterestapprove.FillTable(Response);

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
                        /*$row.append(jQuery('<td class="HCol" align="left">').html(data1[5]));*/
                        // $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                        // $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                        jQuery('#Fidatatabl').append($row);
                    });
                }

            }
        }
    },


// validation confirm button...
 submitdata2: function () {

     if (_ChangeInterestapprove.checkvalues()) {
            var aprRjct,data;
            var loanId = jQuery("#ddl_approve").val();
            var tableData = document.getElementById('tbldespatch');
            var IntRate = tableData.rows[1].cells[2].innerText;
            var frm_dt = tableData.rows[1].cells[3].innerText;

            if (jQuery("#radAppr").prop("checked")) {

                aprRjct = 'INTRATEAPPROVE';
                data = loanId + "µ" + IntRate + "µ" + userdata.userId + "µ" + frm_dt;
            }
            if (jQuery("#radRjct").prop("checked")) {

                aprRjct = 'INTRATEREJECT';
                var remarks = jQuery("#txt_reason").val();
                data = loanId + "µ" + remarks + "µ" + userdata.userId;

            }
            var submitRequest = {

                Flag: aprRjct,
                ParVal: data,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _ChangeInterestapprove.SubmitReturn, userdata.token)
        }

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
                    if (response.data.queryResult.QueryResult[0].Param1 == "2") {
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








    //New Change Interest Rate Approval popup
    checkvalues: function () {
        var SltLn = jQuery('#ddl_approve').val();
        var Remark = jQuery('#txt_reason').val();
        if (SltLn == 0) {
            swal("", "Please  Select Loan", "error");
            return false;
        }
        else if (jQuery("#radRjct").prop("checked") == false && jQuery("#radAppr").prop("checked") == false) {
            swal("", "Please Select Approve/Reject", "error");
            return false;
        }
        else if (Remark == "" && jQuery("#radRjct").prop("checked") == true) {
            swal("", "Please Enter remark", "error");
            return false;
        }
        else
            return true;

    }

}
jQuery(document).ready(function () {

    //_ChangeInterestapprove.loadSelectLoan();
    _ChangeInterestapprove.tokenValidate();
    jQuery('#ddl_approve').on("change", function () {

        var indata = jQuery('#ddl_approve').val();

        if (indata == 0) {
            window.location.reload(true);

        }
        else {

            jQuery('#txt_reason').val("");
            //jQuery('#maincard').show();
            jQuery('#divaprrej').hide();
            jQuery('#dvtext').hide();
            jQuery('#radRjct').prop('checked', false);
            jQuery('#radAppr').prop('checked', false);
            _ChangeInterestapprove.getFromLoanDtls();
        }
    });
    jQuery('#radRjct').on("click", function () {
        jQuery('#dvtext').show();
    });
    jQuery('#btnConf').on("click", function () {


        _ChangeInterestapprove.submitdata2();
    });
    jQuery('#radAppr').on("click", function () {

        jQuery('#dvtext').hide();
    });
});
jQuery('#btnExit').on("click", function () {
    window.open("Dashboard", "_self");
});





