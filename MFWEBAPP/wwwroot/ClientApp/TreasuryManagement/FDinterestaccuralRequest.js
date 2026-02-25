var _fdinterestRequest = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _fdinterestRequest.checkAccessRtn, token)
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
                    _fdinterestRequest.Filldataselectfinance();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _fdinterestRequest.checkAccessToken, userdata.token)
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
                _fdinterestRequest.Filldataselectfinance();
            }


        }

    },


    Filldataselectfinance: function () {
        jQuery('.page-loader-wrapper').show();
        var DebSelectLoan = {
            Flag: "FDInterestRequest",
            PagVal: "getfinacialinstitution",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebSelectLoan = JSON.stringify(DebSelectLoan);
        DebSelectLoan = { "encryptedRqstStr": EncryptAPIReq(DebSelectLoan) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectLoan, _fdinterestRequest.FillDebSelectFin, userdata.token);

    },
    FillDebSelectFin: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#SelectFinanceinst").empty();
                jQuery("#SelectFinanceinst").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  Select Finanacial Institution-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#SelectFinanceinst").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#SelectFinanceinst").empty();
                jQuery("#SelectFinanceinst").append(jQuery("<option></option>").val("0").text(" --------CHOOSE Select Finanacial Institution-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }

    },



/*    Select FD */
    Selecifd: function () {
        jQuery('.page-loader-wrapper').show();

        var sub = jQuery('#SelectFinanceinst').val();
        var DebSelectLoan = {
            Flag: "FDInterestRequest",
            PagVal: "GetfixedDeposite",
            parVal: sub,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebSelectLoan = JSON.stringify(DebSelectLoan);
        DebSelectLoan = { "encryptedRqstStr": EncryptAPIReq(DebSelectLoan) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectLoan, _fdinterestRequest.FillDebSelectFD, userdata.token);

    },
    FillDebSelectFD: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFd").empty();
                jQuery("#ddlFd").append(jQuery("<option></option>").val("0").text(" --------CHOOSE   Select FD-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFd").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFd").empty();
                jQuery("#ddlFd").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  Select FD-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }

    },




    /*    Select Account Number */
    Seleciactnumber: function () {
        jQuery('.page-loader-wrapper').show();

       
        var DebSelectLoan = {
            Flag: "FDInterestRequest",
            PagVal: "GetFDAccountNumber",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebSelectLoan = JSON.stringify(DebSelectLoan);
        DebSelectLoan = { "encryptedRqstStr": EncryptAPIReq(DebSelectLoan) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectLoan, _fdinterestRequest.FillDebSelectactnumber, userdata.token);

    },
    FillDebSelectactnumber: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#Accountno").empty();
                jQuery("#Accountno").append(jQuery("<option></option>").val("0").text(" --------CHOOSE   Select Account number-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#Accountno").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#Accountno").empty();
                jQuery("#Accountno").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  Select Account number-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


       /* Select Sub  Account Number  */
    SelectSubact: function () {
        jQuery('.page-loader-wrapper').show();

        
        var DebSelectLoan = {
            Flag: "FDInterestRequest",
            PagVal: "GetFDSubAccount",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebSelectLoan = JSON.stringify(DebSelectLoan);
        DebSelectLoan = { "encryptedRqstStr": EncryptAPIReq(DebSelectLoan) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectLoan, _fdinterestRequest.FillDebSelectsubactnumber, userdata.token);

    },
    FillDebSelectsubactnumber: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#subactid").empty();
                jQuery("#subactid").append(jQuery("<option></option>").val("0").text(" --------CHOOSE   Select SUB Account number-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#subactid").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#subactid").empty();
                jQuery("#subactid").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  Select SUB Account number-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //FD Interest accural request  popup
    checkvalues: function () {
        var SelectEntrydate = jQuery('#AgreeDts').val();
        var SelectFI = jQuery('#SelectFinanceinst').val();
        var SSUBFD = jQuery('#ddlFd').val();
        var SelectActnumber = jQuery('#Accountno').val();
        var SelectsubActnumber = jQuery('#subactid').val();
        var SelectAccuralAmt = jQuery('#txtPayAmount1').val();
        





        if (SelectEntrydate == 0) {
            swal("", "Please Select Entry Posting Date", "error");
            return false;
        }
        else if (SelectFI == 0) {
            swal("", "Please  Select Finanacial Institution", "error");
            return false;
        }
        else if (SSUBFD == 0) {
            swal("", "Please Select FD", "error");
            return false;
        }

        else if (SelectActnumber == 0) {
            swal("", "Please Select Account Number", "error");
            return false;
        }
        else if (SelectsubActnumber == 0) {
            swal("", "Please Select Sub Account Number", "error");
            return false;
        }
        else if (SelectAccuralAmt == " ") {
            swal("", "Please Select Accrual Amount", "error");
            return false;
        }       
        else
            return true;

    },



    // validation confirm button...
    Confirmbutton: function () {

        if (_fdinterestRequest.checkvalues()) {
            var entrydate = _fdinterestRequest.convertdateformat(jQuery('#AgreeDts').val());

            var finanacinst = jQuery("#SelectFinanceinst").val();
            var selectfd = jQuery("#ddlFd").val();
            var Accuralamt = jQuery("#txtPayAmount1").val();
            var Acctnumber = jQuery("#Accountno").val();
            var Subactnumber = jQuery("#subactid").val();



            data = entrydate + "µ" + "" + "µ" + finanacinst + "µ" + selectfd + "µ" + Accuralamt + "µ" + userdata.userId + "µ" + Acctnumber + "µ" + Subactnumber;

            var submitRequest = {

                Flag: "fixeddepIntAccrurequest",
                PagVal: data,    //pqid
                /* parval //pdata*/
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _fdinterestRequest.SubmitReturn, 'dfgdfgfgdfgdfgd')
        }

    },
    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                var msg = jQuery.trim(response.data.message);
                //var msg = String.prototype.trim(Response.data.message);
                if (response.data.errStatus = "1") {
                    if (response.data.queryResult.QueryResult[0].Param1 == "1") {
                        swal({
                            title: "Requested  Sucessfully...!!! ",
                            text: "",
                            type: "success"
                        }, function () {
                            window.location.reload(true);
                        });
                    }
                    else if (response.data.queryResult.QueryResult[0].Param1 == "2") {
                        swal({
                            title: "Already  Requested .................!!!!",
                            text: "",
                            type: "success"
                        }, function () {
                            window.location.reload(true);
                        });
                    }
                    else if (response.data.queryResult.QueryResult[0].Param1 == "3") {
                        swal({
                            title: "Already Requested One Is Pending For Approval .................!!! ",
                            text: "",
                            type: "success"
                        }, function () {
                            window.location.reload(true);
                        });
                    }

                    else {
                        swal({
                            title: "Already Entry passed...!!!",
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








}





jQuery(document).ready(function () {

    jQuery('.page-loader-wrapper').hide();
    jQuery('#divsubid').hide();
    jQuery('#Scllon').hide();
    //_fdinterestRequest.Filldataselectfinance();
    _fdinterestRequest.tokenValidate();


    jQuery('#datepickerDatee input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        //defaultDate: "+1w",
        changeMonth: true,
        // minDate: new Date(),
        container: '#datepickerDatee'
    });

    jQuery('#SelectFinanceinst').on("change", function () {
        var fin = jQuery('#SelectFinanceinst').val();
        if (fin == 0) {
            window.location.reload(true);
        }
        else {
            jQuery('#ddlFd').val(0);
            jQuery('#Accountno').val("");
            jQuery('#subactid').val(0);
            jQuery('#txtPayAmount1').val("");
            jQuery('#Scllon').show();
            //jQuery('#Scltfd').hide();
            //jQuery('#divsubid').hide();
            _fdinterestRequest.Selecifd();
        }


        
    });

    jQuery('#ddlFd').on("change", function () {

        jQuery('#Scllon').show();

        _fdinterestRequest.Seleciactnumber();
    });

    jQuery('#Accountno').on("change", function () {


        jQuery('#divsubid').show();

        _fdinterestRequest.SelectSubact();
    });

    jQuery('#btnConf').on("click", function () {
        _fdinterestRequest.Confirmbutton();
    });
    

});