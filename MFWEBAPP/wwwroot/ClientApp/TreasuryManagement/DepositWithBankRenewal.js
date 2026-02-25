var _DepBankRenewal = {


    convertdateformat: function (dt) {
        ndt = dt.replace(/\//g, '-');
        var vyear = ndt.split('-')[2];
        var vmonth = parseInt(ndt.split('-')[0]);
        var vday = ndt.split('-')[1];
        var vmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var vmon = vmonths[vmonth - 1];
        var valtortn = vday + '-' + vmon + '-' + vyear;
        return valtortn
    },


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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _DepBankRenewal.checkAccessRtn, token)
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
                    _DepBankRenewal.loadFixedDeposit();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _DepBankRenewal.checkAccessToken, userdata.token)
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
                _DepBankRenewal.loadFixedDeposit();
            }


        }

    },

    //Select Fixed Deposit
    loadFixedDeposit: function () {
        jQuery('.page-loader-wrapper').show();
        var FixedDeposit = {
            Flag: "DepositWithBankRenewal",
            PagVal: "GetFDrenew",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        FixedDeposit = JSON.stringify(FixedDeposit);
        FixedDeposit = { "encryptedRqstStr": EncryptAPIReq(FixedDeposit) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FixedDeposit, _DepBankRenewal.fillFixedDeposit, userdata.token);
    },
    fillFixedDeposit: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFiType").empty();
                jQuery("#ddlFiType").append(jQuery("<option></option>").val("0").text(" --------SELECT FIXED DEPOSIT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFiType").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFiType").empty();
                jQuery("#ddlFiType").append(jQuery("<option></option>").val("0").text(" --------SELECT FIXED DEPOSIT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Table


    getFromLoanDtls: function () {
        jQuery('.page-loader-wrapper').show();
        var sub = jQuery("#ddlFiType").val();


        var FromLoanDtls = {
            Flag: "DepositWithBankRenewal",
            PagVal: "getTableupdfdDtls",
            parVal: sub,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _DepBankRenewal.FillTable, userdata.token);

    },
    //FromLoanDtlsResponse: function (Response) {
    //    if (Response.status === "SUCCESS") {

    //        _DepBankRenewal.FillTable(Response);

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
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));//deposite amount
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));//deposit
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[5]));//matir
                        // $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                        // $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                        jQuery('#Fidatatabl').append($row);
                        deposite = data1[1];
                       // deposite = data1[3];
                        maturity = data1[5];
                        var amount = data1[6];
                        jQuery("#txt_Maturity_amount").val(amount);
                        _DepBankRenewal.matuityamount();
                    });




                }

            }
        }
    },
    //matuityamount: function () {
    //    var frmdtval = Date.parse(deposite);
    //    var todtval = Date.parse(maturity);
    //    var dif = (todtval - frmdtval);
    //    daysDiff = Math.round(Math.abs(dif / (10000 * 60 * 60 * 24)) * 10);

    //},



    calculationamount: function () {


        var intrasterate = jQuery('#txt_Interest_rate').val();
        var amount = jQuery('#txt_interestamount').val();
        var tdsamtper = jQuery('#txt_tdsamount').val();

        var totamount = parseInt(deposite) + parseInt(amount)


      //  var intrate = intrasterate / 100

      //var totalamount = amount * intrate * daysDiff

        var calculation = totamount - tdsamtper


        var result = Math.floor(calculation);

     


        jQuery('#txt_depositamount').val(result);
    },


    checkvalues: function () {
        var FiDeposit = jQuery('#ddlFiType').val();
        var ClsDate = jQuery('#AgreeDt').val();
     
       /* var MaturityAmt = jQuery('#txt_Maturity_amount').val();*/
        var DepAmt = jQuery('#txt_depositamount').val();
        var intrasterate = jQuery('#txt_Interest_rate').val();
        var amount = jQuery('#txt_interestamount').val();
        var tdsamtper = jQuery('#txt_tdsamount').val();
       


        if (FiDeposit == 0) {
            swal("", "Please Select Fixed Deposit", "error");
            return false;
        }
        else if (ClsDate == "" ) {
            swal("", "Please Enter Closing Date", "error");
            return false;
        }
        //else if (IntRate == "") {
        //    swal("", "Please Enter Interest Rate", "error");
        //    return false;
        //}
        //else if (MaturityAmt <= 0) {
        //    swal("", "Please Enter Maturity Amount GreaterThan Zero:", "error");
        //    return false;
            //}
        else if (intrasterate == "") {
            swal("", "Please Enter Interest rate:", "error");
            return false;
        }
        else if (amount <= 0) {
            swal("", "Please Enter Interest Amount", "error");
            return false;
        }

        else if (tdsamtper <= 0) {
            swal("", "Please Enter TDS Amount", "error");

            return false;
        }
        else if (DepAmt <= 0) {
            swal("", "Please Enter Deposit Amount GreaterThan Zero", "error");
            return false;
        }
      
       

        else
            return true;
    },


    submitevalue: function () {
        if (_DepBankRenewal.checkvalues()) {


            /*var ClosingDate = Date.parse(_DepBankRenewal.convertdateformat(jQuery("#AgreeDt").val()));*/
            var ClosingDate = _DepBankRenewal.convertdateformat(jQuery("#AgreeDt").val());
            data = jQuery("#ddlFiType").val() + "µ" + userdata.userId + "µ" + ClosingDate + "µ" + jQuery("#txt_Interest_rate").val() + "µ" + jQuery("#txt_Maturity_amount").val() + "µ" + jQuery("#txt_interestamount").val();

        }
        var submitRequest = {

            Flag: "Confirmfdrenewal",
            PagVal: data,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        submitRequest = JSON.stringify(submitRequest);
        submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _DepBankRenewal.SubmitReturn, 'dfgdfgfgdfgdfgd')

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
                            title: "Requested Successfully!",
                            text: "",
                            type: "success"
                        }, function () {
                            window.location.reload(true);
                        });
                    }
                    //else {
                    //    swal({
                    //        title: "Rejected Successfully!",
                    //        text: "",
                    //        type: "success"
                    //    }, function () {
                    //        window.location.reload(true);
                    //    });
                    //}

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
    //_DepBankRenewal.loadFixedDeposit();
    _DepBankRenewal.tokenValidate();


    jQuery('#datepickerDate input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        //defaultDate: "+1w",
        changeMonth: true,
        // minDate: new Date(),
        container: '#datepickerDate'
    });


    jQuery('#ddlFiType').on("change", function () {

        $("#showcorddiv").show();
        $("#divmethod").show();

        _DepBankRenewal.getFromLoanDtls();
    });


    jQuery('#txt_interestamount').on("change", function () {
        _DepBankRenewal.calculationamount();


    });

    jQuery('#txt_Interest_rate').on("change", function () {
        _DepBankRenewal.calculationamount();


    });

    jQuery('#txt_tdsamount').on("change", function () {
        _DepBankRenewal.calculationamount();


    });


    jQuery('#btnConf').on("click", function () {

        _DepBankRenewal.submitevalue();

    });
    jQuery('#BtnExit').on("click", function () {
        window.open("Dashboard", "_self");
    });
});