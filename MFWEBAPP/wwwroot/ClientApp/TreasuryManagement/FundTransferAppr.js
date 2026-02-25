var _fundtfrData = {


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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _fundtfrData.checkAccessRtn, token)
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
                    _fundtfrData.SelectBank();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _fundtfrData.checkAccessToken, userdata.token)
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
                _fundtfrData.SelectBank();
            }


        }

    },


    SelectBank: function () {
        jQuery('.page-loader-wrapper').show();
        var BankLoad = {

            Flag: "FundTransferapprov",
            PagVal: "loaddetails",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        BankLoad = JSON.stringify(BankLoad);
        BankLoad = { "encryptedRqstStr": EncryptAPIReq(BankLoad) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", BankLoad, _fundtfrData.LoadBankResponse, userdata.token);
    },
    LoadBankResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_Reqst").empty();
                jQuery("#ddl_Reqst").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BANK-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_Reqst").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_Reqst").empty();
                jQuery("#ddl_Reqst").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BANK-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    getFromBankDtls: function (accnum) {
        jQuery('.page-loader-wrapper').show();

        var FromBankDtls = {
            Flag: "FundTransferapprov",
            PagVal: "GetFillApprovebankFTDtls",
            parVal: accnum,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        FromBankDtls = JSON.stringify(FromBankDtls);
        FromBankDtls = { "encryptedRqstStr": EncryptAPIReq(FromBankDtls) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", FromBankDtls, _fundtfrData.FillTable, userdata.token);

    },
    //FromBankDtlsResponse: function (Response) {
    //    if (Response.data.message === "Success") {

    //        _fundtfrData.FillTable(Response);

    //    }
    //    else {

    //        return false;
    //    }
    //},
    FillTable: function (Response) {
        if (Response.status === "SUCCESS") {
            Response.data.queryResult = JSON.parse(DecryptAPIReq(Response.data.encryptedResStr));
            if (Response.data != null && Response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();
                jQuery('#head1').show();
                jQuery('#maincard').show();

                if (Response.data.queryResult.QueryResult.length > 0) {

                    jQuery('#Fidatatabl').empty();
                    jQuery.each(Response.data.queryResult.QueryResult, function (i, val) {

                        var $row = jQuery('<tr/>');
                        var data1 = val.Param1.split("~");
                        //var nval = nval + 1;

                        //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));
                        jQuery('#Fidatatabl').append($row);
                    });
                }

            }
        }
    },





    ToBankDtls: function (accnum) {
        jQuery('.page-loader-wrapper').show();

        var FromBankDtlsappr = {
            Flag: "FundTransferapprov",
            PagVal: "GetFillApproveFTDtls",
            parVal: accnum,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };

        FromBankDtlsappr = JSON.stringify(FromBankDtlsappr);
        FromBankDtlsappr = { "encryptedRqstStr": EncryptAPIReq(FromBankDtlsappr) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", FromBankDtlsappr, _fundtfrData.ToBankDtlsapprResponse, userdata.token);

    },
    ToBankDtlsapprResponse: function (Response) {
        if (Response.status === "SUCCESS") {
            Response.data.queryResult = JSON.parse(DecryptAPIReq(Response.data.encryptedResStr));
            if (Response.data != null && Response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();
                jQuery('#head2').show();

                jQuery('#maincards').show();

                if (Response.data.queryResult.QueryResult.length > 0) {

                    jQuery('#Fidatatabls').empty();
                    jQuery.each(Response.data.queryResult.QueryResult, function (i, val) {

                        var $row = jQuery('<tr/>');
                        var data1 = val.Param1.split("~");
                        //var nval = nval + 1;

                        //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));
                        jQuery('#Fidatatabls').append($row);
                    });
                }

            }
        }
    },



    FillTables: function (Response) {
        if (Response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();
                jQuery('#maincard').show();

                if (Response.data.queryResult.length > 0) {

                    jQuery('#Fidatatabl').empty();
                    jQuery.each(Response.data.queryResult.QueryResult, function (i, val) {

                        var $row = jQuery('<tr/>');
                        var data1 = val.param1.split("~");
                        //var nval = nval + 1;

                        //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));
                        jQuery('#Fidatatabl').append($row);
                    });
                }

            }
        }
    },


    submitevalue: function () {
        if (_fundtfrData.checkvalue()) {
            var aprRejVAl;

            if (jQuery("#radAppr").prop("checked")) {
                aprRjct = 1;
            }
            else if (jQuery("#radRjct").prop("checked")) {
                aprRjct = 0;
            }
            // = aprRejVAl + "µ" + jQuery('#ddl_fIName').val() + "µ" + userdata.userId + "µ" + jQuery('#txt_reason').val();
            var InputData = jQuery("#ddl_Reqst").val() + "µ" + aprRjct + "µ" + userdata.userId + "µ" + userdata.branchId + "µ" + "3" + "µ" + jQuery("#txt_reason").val();

            var submitRequest = {

                Flag: "FUNDTRANSFERAPPROVE",
                ParVal: InputData,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
                //3) page_vale:pqid
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };
            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _fundtfrData.SubmitReturn, userdata.token)

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

        var FiType = jQuery('#ddl_Reqst').val();

        if (FiType == 0) {
            swal("", "Please Select Fund Request", "error");
            return false;
        }

        else if (jQuery("#radAppr").prop("checked") == false && jQuery("#radRjct").prop("checked") == false) {
            swal("", "Please select an Option Approve/Reject..!", "error");
            return false;
        }
        else if (jQuery("#radRjct").prop("checked") == true && jQuery("#txt_reason").val() == "") {
            swal("", "Please Enter Reason", "error");
            return false;
        }
        else {
            return true;
        }
    }











}




jQuery(document).ready(function () {
    jQuery('.page-loader-wrapper').hide();
    //_fundtfrData.SelectBank();
    _fundtfrData.tokenValidate();
});

jQuery("#ddl_Reqst").on("change", function () {



    var accnum = jQuery("#ddl_Reqst").val();
    if (accnum == 0) {
        window.location.reload(true);
    }
    else {
        jQuery('#radAppr').prop('checked', false);
        jQuery('#radRjct').prop('checked', false);



        _fundtfrData.getFromBankDtls(accnum);


        _fundtfrData.ToBankDtls(accnum);
    }

});


jQuery("#radRjct").on("click", function () {
    jQuery('#dvtext').show();
});

jQuery("#radAppr").on("click", function () {
    jQuery('#dvtext').hide();
});


jQuery("#btnConf").on("click", function () {

    _fundtfrData.submitevalue();
});

jQuery("#btnExit").on("click", function () {
    window.open("Dashboard", "_self");
});