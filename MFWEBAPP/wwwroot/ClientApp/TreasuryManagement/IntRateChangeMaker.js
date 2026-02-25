var _IntChange = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _IntChange.checkAccessRtn, token)
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
                    _IntChange.loadLoan();
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

    // Token Validation
    tokenValidate: function () {
    jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var CheckToken = {
            "typeID": "1",
            "userID": userdata.userId,
            "branchID": userdata.branchId

        };

        CheckToken = JSON.stringify(CheckToken);
        CheckToken = { "encryptedRqstStr": EncryptAPIReq(CheckToken) };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _IntChange.checkAccessToken, userdata.token)
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
                    text: "You are already login in treasury module!",
                    type: "info"
                }, function () {
                    window.location.href = "dashboard";
                });
            }
            else {
                _IntChange.loadLoan();
            }


        }

    },



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



    loadLoan: function () {
        jQuery('.page-loader-wrapper').show();
        var loans = {
            Flag: "Interest_Rate_Change_Request",
            PagVal: "GetLoans",
            typeID: "2",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        loans = JSON.stringify(loans);
        loans = { "encryptedRqstStr": EncryptAPIReq(loans) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", loans, _IntChange.fillLoans, userdata.token);

    },
    fillLoans: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_Reqst").empty();
                jQuery("#ddl_Reqst").append(jQuery("<option></option>").val("0").text(" --------CHOOSE LOAN-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_Reqst").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));

                });


            }
            else {

                jQuery("#ddl_Reqst").empty();
                jQuery("#ddl_Reqst").append(jQuery("<option></option>").val("0").text(" --------CHOOSE LOAN-------- "));

            }
            jQuery('.page-loader-wrapper').hide();
        }

    },
/*table*/
    getFromLoanDtls: function () {
        jQuery('.page-loader-wrapper').show();
        // var sub = jQuery("#ddl_Reqst").val();
        var M = jQuery('#ddl_Reqst').val();
        var centerSplit = M.split('µ');
        var sub = centerSplit[0];
        //var loanlimit = centerSplit[1];

        var FromLoanDtls = {
            Flag: "Interest_Rate_Change_Request",
            PagVal: "GetIntRate", 
            parVal: sub,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _IntChange.FromLoanDtlsResponse, userdata.token);

    },
    FromLoanDtlsResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                _IntChange.FillTable(response);

            }
            else {

                return false;
            }
        }
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
                        // $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                        // $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                        jQuery('#Fidatatabl').append($row);
                    });
                }

            }
        }
    },

// validation confirm button.

    submitdata1: function () {

        if (_IntChange.checkvalues()) {

            var loanId = jQuery("#ddl_Reqst").val();
            var IntRate = jQuery("#txt_int_rate").val();
            var agrmtdt = _IntChange.convertdateformat(jQuery('#AgreeDt').val());
            data = loanId + "µ" + IntRate + "µ" + userdata.userId + "µ" + agrmtdt;

            var submitRequest = {

                Flag: "CHANGR_INTRATE_REQ",
                ParVal: data,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _IntChange.SubmitReturn, 'dfgdfgfgdfgdfgd')
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
                            title: "Requested Successfully!",
                            text: "",
                            type: "success"
                        }, function () {
                            window.location.reload(true);
                        });
                    }
                    else {
                        swal({
                            title: "Already Requested One Is Pending For Approval!",
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



    Verifyinterestrate: function () {
        var IntRate = jQuery('#txt_int_rate').val();
        
        if (IntRate <= 0) {
            swal("", "Please  Enter New Interest Rate Greater than 0", "error");
            
            jQuery('#txt_int_rate').val(" ");
            return false;
        }

    },

   



    //New Change Rate maker Request popup
    checkvalues: function () {
        var Seletlon = jQuery('#ddl_Reqst').val();
        var NewintrstRate = jQuery('#txt_int_rate').val();
        var FromDate = jQuery('#AgreeDt').val();




        if (Seletlon == 0) {
            swal("", "Please Select Select Loan", "error");
            return false;
        }
        else if (NewintrstRate == "") {
            swal("", "Please Select New Interest Rate", "error");
            return false;
        }
        else if (FromDate == "") {
            swal("", "Please Select From Date", "error");
            return false;
        }
        else
            return true;

    }
}
jQuery(document).ready(function () {

    // _IntChange.loadLoan();
    _IntChange.tokenValidate();

    jQuery('#ddl_Reqst').on("change", function () {

        var indata = jQuery("#ddl_Reqst").val();
        if (indata == 0) {


            window.location.reload(true);
        }

        else {
            jQuery("#maincard").show();
            jQuery("#divnewrate").show();
           
            jQuery("#txt_int_rate").val("");
            jQuery("#AgreeDt").val("");
            //$("#divmethod").show();

            _IntChange.getFromLoanDtls();
        }
    });


     

    jQuery('#btnConf').on("click", function () {


        _IntChange.submitdata1();
    });

    
     jQuery('#txt_int_rate').on("change", function () {


        _IntChange.Verifyinterestrate();
    });





jQuery('#datepickerDatess input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showbuttonPanel: true,
    //defaultDate: "+1w",
    changeMonth: true,
    // minDate: new Date(),
    container: '#datepickerDatess'
});
});
jQuery('#btnExit').on("click", function () {
    window.open("Dashboard", "_self");
});




    