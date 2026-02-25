var _apprNewFund = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _apprNewFund.checkAccessRtn, token)
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
                    _apprNewFund.LoadFi();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _apprNewFund.checkAccessToken, userdata.token)
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
                _apprNewFund.LoadFi();
            }


        }

    },


    LoadFi: function () {
        jQuery('.page-loader-wrapper').show();
        var FiName = {
            Flag: "NewFundApprove",
            PagVal: "NewLoadFi",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        FiName = JSON.stringify(FiName);
        FiName = { "encryptedRqstStr": EncryptAPIReq(FiName) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", FiName, _apprNewFund.fillFI, userdata.token);
    },
    fillFI: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFI").empty();
                jQuery("#ddlFI").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FINANCIAL INSTITUTION-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFI").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFI").empty();
                jQuery("#ddlFI").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FINANCIAL INSTITUTION-------- "));
            }
            jQuery('.page-loader-wrapper').hide();

        }
    },
    loadFund: function (fidata) {
        jQuery('.page-loader-wrapper').show();
        var FundName = {
            Flag: "NewFundApprove",
            PagVal: "NewLoadFund",
            parVal: fidata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        FundName = JSON.stringify(FundName);
        FundName = { "encryptedRqstStr": EncryptAPIReq(FundName) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", FundName, _apprNewFund.fillFund, userdata.token);
    },
    fillFund: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_fund").empty();
                jQuery("#ddl_fund").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FUND-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_fund").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_fund").empty();
                jQuery("#ddl_fund").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FUND-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
            jQuery('#maincard').hide();
            jQuery('#divAprRejBtn').hide();
        }
    },
    loadGetTable: function (fund) {
        jQuery('.page-loader-wrapper').show();
        var fiData = {
            Flag: "NewFundApprove",
            PagVal: "GetTable",
            parVal: fund,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        fiData = JSON.stringify(fiData);
        fiData = { "encryptedRqstStr": EncryptAPIReq(fiData) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", fiData, _apprNewFund.fillTable, userdata.token);
    },
    fillTable: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                _apprNewFund.FiTable(response);

            }
            else {

                return false;
            }
        }
    },
    FiTable: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();
                jQuery('#maincard').show();

                if (response.data.queryResult.QueryResult.length > 0) {

                    jQuery('#Funddatatabl').empty();
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
                        jQuery('#Funddatatabl').append($row);
                    });
                }
                jQuery('#divAprRejBtn').show();
                jQuery('#divCnfrmBtn').show();
            }
        }
    },
    submitevalue: function () {

        if (_apprNewFund.checkvalue()) {
            var aprRejVAl;
            if (jQuery("#radaprv").prop("checked") == true) {

                aprRejVAl = 1;
            }
            if (jQuery("#radreject").prop("checked") == true) {

                aprRejVAl = 9;
            }
            var InputData = aprRejVAl + "µ" + jQuery('#ddl_fund').val() + "µ" + userdata.userId + "µ" + jQuery('#txt_reason').val();

            var submitRequest = {

                Flag: "APPROVENEWFUND",
                ParVal: InputData,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };
            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _apprNewFund.SubmitReturn, 'dfgdfgfgdfgdfgd')

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
    checkvalue: function () {
        var FiName = jQuery('#ddlFI').val();
        var FundName = jQuery('#ddl_fund').val();

        if (FiName == 0) {
            swal("", "Please Select Financial Institution", "error");
            return false;
        }
        else if (FundName == 0) {
            swal("", "Please Select Fund", "error");
            return false;
        }
        else if (jQuery("#radaprv").prop("checked") == false && jQuery("#radreject").prop("checked") == false) {
            swal("", "Please select an Option Approve/Reject..!", "error");
            return false;
        }
        else if (jQuery("#radreject").prop("checked") == true && jQuery("#txt_reason").val() == "") {
            swal("", "Please Enter Reason", "error");
            return false;
        }
        else {
            return true;
        }

    }
}

jQuery(document).ready(function () {
    //_apprNewFund.LoadFi();
    _apprNewFund.tokenValidate();
});
jQuery('#ddlFI').on("change", function () {
    var fidata = jQuery('#ddlFI').val();
    if (fidata == 0)
    {
        window.location.reload(true);
    }
    else {
        jQuery('#ddl_fund').val("");
        jQuery('#txt_reason').val("");
        jQuery('#divAprRejBtn').hide();
        jQuery('#divreason').hide();
        jQuery('#maincard').hide();
        jQuery('#radaprv').prop('checked', false);
        jQuery('#radreject').prop('checked', false);


        _apprNewFund.loadFund(fidata);
    }
});
jQuery('#ddl_fund').on("change", function () {
    var fund = jQuery('#ddl_fund').val();
    _apprNewFund.loadGetTable(fund);
});
jQuery('#radreject').on("click", function () {
    jQuery('#divreason').show();
});
jQuery('#radaprv').on("click", function () {
    jQuery('#divreason').hide();
    jQuery('#txt_reason').val("");
});
jQuery('#btnConf').on("click", function () {
    _apprNewFund.submitevalue();
});
jQuery('#BtnExit').on("click", function () {
    window.open("Dashboard", "_self");
});