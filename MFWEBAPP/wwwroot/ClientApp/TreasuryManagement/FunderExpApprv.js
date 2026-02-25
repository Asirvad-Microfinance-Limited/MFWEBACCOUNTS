

var _FunderExpApprv = {


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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _FunderExpApprv.checkAccessRtn, token)
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
                    _FunderExpApprv.loadSelectLoan();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _FunderExpApprv.checkAccessToken, userdata.token)
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
                _FunderExpApprv.loadSelectLoan();
            }


        }

    },

    //Select Loan
    loadSelectLoan: function () {
        jQuery('.page-loader-wrapper').show();
        var DebSelectLoan = {
            Flag: "Fundexposureapr",
            PagVal: "FundSelectLoan",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebSelectLoan = JSON.stringify(DebSelectLoan);
        DebSelectLoan = { "encryptedRqstStr": EncryptAPIReq(DebSelectLoan) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DebSelectLoan, _FunderExpApprv.FillDebSelectLoan, userdata.token);

    },
    FillDebSelectLoan: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#txt_selectloan").empty();
                jQuery("#txt_selectloan").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SELECTLOAN-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#txt_selectloan").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#txt_selectloan").empty();
                jQuery("#txt_selectloan").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECTLOAN-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    //dataloan

    fetchdataLoan: function () {
        jQuery('.page-loader-wrapper').show();
        var fundex = jQuery("#txt_selectloan").val();
        var foundexpose = {
            Flag: "Fundexposureapr",
            PagVal: "GetFundExpDtl",
            parVal: fundex,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };

        foundexpose = JSON.stringify(foundexpose);
        foundexpose = { "encryptedRqstStr": EncryptAPIReq(foundexpose) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", foundexpose, _FunderExpApprv.fundexpos, userdata.token);

    },
    fundexpos: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    var data = val.Param1.split("~");
                    jQuery('#txt_PjtName').val(data[0]);
                    jQuery('#txt_invest').val(data[1]);
                    jQuery('#txt_investType').val(data[2]);
                    jQuery('#txt_sub_investType').val(data[3]);
                    jQuery('#txt_securedunsecured').val(data[4]);
                    jQuery('#txt_Mclr').val(data[5]);
                    jQuery('#txt_nat_fac').val(data[6]);
                    jQuery('#txt_scheme').val(data[7]);
                    jQuery('#txt_fac_name').val(data[8]);
                    jQuery('#txt_fund_name').val(data[9]);
                    jQuery('#txt_Sanc_amnt').val(data[10]);
                    jQuery('#txt_Ava_amnt').val(data[11]);
                    jQuery('#txt_date_sanc').val(data[12]);
                    jQuery('#txt_base_mclr_san').val(data[13]);
                    jQuery('#txt_spreadrate').val(data[14]);
                    jQuery('#txt_intRateAtSan').val(data[15]);
                    jQuery('#txt_cashmargin').val(data[16]);
                    jQuery('#txt_bkdbt_margin').val(data[17]);
                    jQuery('#txt_dis_dt').val(data[18]);
                    jQuery('#txt_Mat_dt').val(data[19]);
                    jQuery('#txt_proc_fee').val(data[20]);
                    jQuery('#txt_arg_name').val(data[21]);
                    jQuery('#txt_arg_fee').val(data[22]);
                    jQuery('#txt_prepaymentpenalty').val(data[23]);
                    jQuery('#txt_tenure').val(data[24]);
                    jQuery('#txt_debenture').val(data[25]);
                    jQuery('#txt_listed').val(data[26]);
                    jQuery('#txt_rating').val(data[27]);
                    jQuery('#txt_mclr_next').val(data[28]);
                    jQuery('#tot_transctin_cost').val(data[29]);


                });
            }

            jQuery('.page-loader-wrapper').hide();

        }
    },



    // validation confirm button...
    submitdata3: function () {

        if (_FunderExpApprv.checkvalues()) {
            var Selectloan = jQuery("#txt_selectloan").val();
            var remark = jQuery("#txt_reason").val();

            var aprRejVAl;

            if (jQuery("#radAppr").prop("checked") == true) {

                var aprRejVAl = 1;
            }
            if (jQuery("#radRjct").prop("checked") == true) {

                var aprRejVAl = 2;
            }

            data = Selectloan + "µ" + userdata.userId + "µ" + remark;

            var submitRequest = {

                Flag: 'FUNDEREXPOSUREAPPROVAL',
                PagVal: data,
                parVal: aprRejVAl.toString(),
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };

            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _FunderExpApprv.SubmitReturn, 'dfgdfgfgdfgdfgd')
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
                            title: "Approved Successfully...!!! ",
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
        }
    },









    





    //New Funder Exposure Approval popup
    checkvalues: function () {
        var SltLon = jQuery('#txt_selectloan').val();
        var Remark = jQuery('#txt_reason').val();




        if (SltLon == 0) {
            swal("", "Please Select Select Loan", "error");
            return false;
        }

        else if (jQuery("#radAppr").prop("checked") == false && jQuery("#radRjct").prop("checked") == false) {
            swal("", "Please select an Option Approve/Reject..!", "error");
            return false;
        }
        else if (Remark == "" && jQuery("#radRjct").prop("checked") == true) {
            swal("", "Please Enter Reason", "error");
            return false;
        }
        else
            return true;

    }







}
jQuery(document).ready(function () {

    //_FunderExpApprv.loadSelectLoan();
    _FunderExpApprv.tokenValidate();
    jQuery('#txt_selectloan').on("change", function () {
        var accnum = jQuery('#txt_selectloan').val();
        if (accnum == 0) {
            window.location.reload(true);
        }
        else {
            jQuery('#radAppr').prop('checked', false);
            jQuery('#radRjct').prop('checked', false);
            _FunderExpApprv.fetchdataLoan();
        }
    });

    jQuery('#btnsubmit').on("click", function () {


        _FunderExpApprv.submitdata3();
    });

    jQuery("#radRjct").on("click", function () {

        jQuery("#dvtext").show();

    });
    jQuery('#radAppr').on("click", function () {

        jQuery('#dvtext').hide();
    });

});












