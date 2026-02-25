var _ApprLoanavailment = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _ApprLoanavailment.checkAccessRtn, token)
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
                    _ApprLoanavailment.loadFundType();
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

    //Token Validation


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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _ApprLoanavailment.checkAccessToken, userdata.token)
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
                _ApprLoanavailment.loadFundType();
            }


        }

    },


    //fund type
    loadFundType: function () {
        jQuery('.page-loader-wrapper').show();


        var fundTypes = {
            Flag: "ApproveLoanAvailment",
            PagVal: "GetLoanAvailFundType",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        fundTypes = JSON.stringify(fundTypes);
        fundTypes = { "encryptedRqstStr": EncryptAPIReq(fundTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", fundTypes, _ApprLoanavailment.fillFundType, userdata.token);
    },
    fillFundType: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFundType").empty();
                jQuery("#ddlFundType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FUND TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFundType").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFundType").empty();
                jQuery("#ddlFundType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FUND TYPE -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //fi inst

    loadFIType: function () {
        jQuery('.page-loader-wrapper').show();
        var Fundtype = jQuery('#ddlFundType').val();

        var fiTypes = {
            Flag: "ApproveLoanAvailment",
            PagVal: "GetLoanAvailFI",
            parVal: Fundtype.toString(),
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        fiTypes = JSON.stringify(fiTypes);
        fiTypes = { "encryptedRqstStr": EncryptAPIReq(fiTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", fiTypes, _ApprLoanavailment.fillFiType, userdata.token);
    },
    fillFiType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFi").empty();
                jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI INS TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFi").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFi").empty();
                jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI INS TYPE -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    // SELECT FUND
    loadfiFundType: function () {
        jQuery('.page-loader-wrapper').show();
        var Fundtype = jQuery('#ddlFundType').val();
        var Fitype = jQuery('#ddlFi').val();
        var indata = Fundtype + 'µ' + Fitype;

        var fundfiTypes = {
            Flag: "ApproveLoanAvailment",
            PagVal: "GetLoanAvailLoans",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        fundfiTypes = JSON.stringify(fundfiTypes);
        fundfiTypes = { "encryptedRqstStr": EncryptAPIReq(fundfiTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", fundfiTypes, _ApprLoanavailment.fillFundfiType, userdata.token);
    },
    fillFundfiType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlLoans").empty();
                jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FUND TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlLoans").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlLoans").empty();
                jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FUND TYPE -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },



    //table details
    loadtableType: function (InputData) {
        jQuery('.page-loader-wrapper').show();
        var fundtype = jQuery('#ddlLoans').val();
       
        var FromLoanDtls = {
            Flag: "ApproveLoanAvailment",
            PagVal: "getTableNewLoanDtls",
            parVal: fundtype,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
          
        };

        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _ApprLoanavailment.FillTable, userdata.token);

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
                        jQuery('#Fidatatabl').append($row);
                    });
                }

            }
        }
    },


    //2 table
    loadEMItableType: function (InputData) {
        jQuery('.page-loader-wrapper').show();
        var fundtype = jQuery('#ddlLoans').val();

        var FromEmiLoanDtls = {
            Flag: "ApproveLoanAvailment",
            PagVal: "getTableNewLoanDtlsEmi",
            parVal: fundtype,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };

        FromEmiLoanDtls = JSON.stringify(FromEmiLoanDtls);
        FromEmiLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromEmiLoanDtls) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromEmiLoanDtls, _ApprLoanavailment.FillEMITable, userdata.token);

    },
   
    FillEMITable: function (response) {
            if (response.status === "SUCCESS") {
                response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
               if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();
                jQuery('#maincardsub').show();

                   if (response.data.queryResult.QueryResult.length > 0) {

                    jQuery('#Fidatatable').empty();
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
                        // $row.append(jQuery('<td class="HCol" align="left">').html(data1[9]));
                        jQuery('#Fidatatable').append($row);
                    });
                }

            }
        }
    },
    submitevalue: function () {
        if (_ApprLoanavailment.checkvalues()) {
            var aprRejVAl;
            if (jQuery("#radAppr").prop("checked") == true) {

                aprRejVAl = 1;
            }
            if (jQuery("#radRjct").prop("checked") == true) {

                aprRejVAl = 0;
            }

            if (jQuery("#radYes").prop("checked") == true) {
                entryStatus = 1;
            }
            if (jQuery("#radNo").prop("checked") == true) {
                entryStatus = 0;
            }


           // data = aprRjct + "µ" + $("#ddlLoans").val() + "µ" + $("[id*=hdUserId]").val() + "µ" + $("#txt_reason").val() + "µ" + entryStatus;

            var InputData = aprRejVAl + "µ" + jQuery('#ddlLoans').val() + "µ" + userdata.userId + "µ" + jQuery('#txt_reason').val() + "µ" + entryStatus;

            var submitRequest = {

                Flag: "ConfirmLoanAvailApprove",
                PagVal: InputData,//pqid
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };
            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _ApprLoanavailment.SubmitReturn, 'dfgdfgfgdfgdfgd')

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
    checkvalues: function () {
        var FundType = jQuery('#ddlFundType').val();
        var FiName = jQuery('#ddlFi').val();
        var FiType = jQuery('#ddlLoans').val();
      // var FiAdrs = jQuery('#ddlLoans').val();
     

        if (FundType == 0) {
            swal("", "Please Select Fund Type", "error");
            return false;
        }

        if (FiName == 0) {
            swal("", "Please Select Financial Institution ", "error");
            return false;
        }

        if (FiType == 0) {
            swal("", "Please Select Fund", "error");
            return false;
        }

       
        else if (jQuery("#radAppr").prop("checked") == false && jQuery("#radRjct").prop("checked") == false) {
            swal("", "Please select an Option Approve Or Reject.....!", "error");
            return false;
        }

        else if (jQuery("#txt_reason").val() == "" && jQuery("#radRjct").prop("checked") == true) {
            swal("", "Please Enter The Reason For Rejection", "error");
            return false;
        }
        else if (jQuery("#radNo").prop("checked") == false && jQuery("#radYes").prop("checked") == false) {
            swal("", "Please select an Option  Yes Or No Option...!", "error");
            return false;
        }
        else
            return true;
    }





}





jQuery(document).ready(function () {

    jQuery('.page-loader-wrapper').show();

    //_ApprLoanavailment.loadFundType();
    _ApprLoanavailment.tokenValidate();
}); 


jQuery('#ddlFundType').change(function () {
      _ApprLoanavailment.loadFIType();
  });

 //jQuery('#ddlFi').Change(function () {
 //    _ApprLoanavailment.loadfiFundType();
 //});
  jQuery('#ddlFi').on("change", function () {
     _ApprLoanavailment.loadfiFundType();
 });
jQuery('#ddlLoans').on("change", function () {
    _ApprLoanavailment.loadtableType();
   _ApprLoanavailment.loadEMItableType();
});
jQuery('#btnConf').on("click", function () {


     _ApprLoanavailment.submitevalue();
 });
jQuery('#radRjct').on("click", function () {
    jQuery('#dvtext').show();
});
jQuery('#btnExit').on("click", function () {
    window.open("Dashboard", "_self");
});

