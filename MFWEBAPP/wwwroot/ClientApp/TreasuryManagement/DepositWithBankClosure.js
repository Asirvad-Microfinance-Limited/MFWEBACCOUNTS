

var _DepBankClosure = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _DepBankClosure.checkAccessRtn, token)
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
                    _DepBankClosure.loadFinancialInstitution();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _DepBankClosure.checkAccessToken, userdata.token)
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
                _DepBankClosure.loadFinancialInstitution();
            }


        }

    },


    //Select Financial Institution
    loadFinancialInstitution: function () {
        jQuery('.page-loader-wrapper').show();
        var FinancialInstitution = {
            Flag: "DepositWithBankClosure",
            PagVal: "GetDepositApprovedFI",

        };
        FinancialInstitution = JSON.stringify(FinancialInstitution);
        FinancialInstitution = { "encryptedRqstStr": EncryptAPIReq(FinancialInstitution) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FinancialInstitution, _DepBankClosure.fillFinancialInstitution, userdata.token);
    },
    fillFinancialInstitution: function (response) {
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

    //Select Deposit Account
    loadDepositAccount: function (intdata) {
        jQuery('.page-loader-wrapper').show();
        var DepositAccount = {
            Flag: "DepositWithBankClosure",
            PagVal: "GetDepositApproved",
            parVal: intdata
        };
        DepositAccount = JSON.stringify(DepositAccount);
        DepositAccount = { "encryptedRqstStr": EncryptAPIReq(DepositAccount) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DepositAccount, _DepBankClosure.fillDepositAccount, userdata.token);
    },
    fillDepositAccount: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlDeposit").empty();
                jQuery("#ddlDeposit").append(jQuery("<option></option>").val("0").text(" --------SELECT DEPOSIT DETAILS-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlDeposit").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlDeposit").empty();
                jQuery("#ddlDeposit").append(jQuery("<option></option>").val("0").text(" --------SELECT DEPOSIT DETAILS-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //tableee


    getFromLoanDtls: function () {
        jQuery('.page-loader-wrapper').show();
        var sub = jQuery("#ddlDeposit").val();


        var FromLoanDtls = {
            Flag: "DepositWithBankClosure",
            PagVal: "getTableDepositDtls",
            parVal: sub

        };
        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _DepBankClosure.FillTable, userdata.token);

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
                            var depamt = 0;
                            //var nval = nval + 1;


                            //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[5]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                            // $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                            jQuery('#Fidatatabl').append($row);

                            depamt = parseFloat(depamt) + parseFloat(data1[2]);


                            jQuery('#txtDepAmt').val(depamt);
                           
                            if (jQuery("#txtIntAmount").val() == "") {
                                jQuery("#txtIntAmount").val();
                            }
                        });
                    }
            }
        }
    },





   



    //DepositAmount+Toatal
    totalintupdate: function () {
        var tot = 0;
        if (jQuery('#txtIntAmount').val() != 0 || jQuery('#txtIntAmount').val().trim().length != 0) {

            var depamt = 0;
            var intamt = "";
            var tdsamt = 0;
            var totamt = 0;
            if (jQuery("#txtDepAmt").val() == "") {
                jQuery("#txtDepAmt").val();
            }
            else { depamt = parseFloat(jQuery("#txtDepAmt").val()); }
            if (jQuery("#txtIntAmount").val() == "") {
               // jQuery("#txtIntAmount").val(0);
            }
            else { intamt = parseFloat(jQuery("#txtIntAmount").val()); }
            if (jQuery("#txtTdsAmount").val() == "") {
               // jQuery("#txtTdsAmount").val(0);
            }
            else { tdsamt = parseFloat(jQuery("#txtTdsAmount").val()); }
            if (jQuery("#radInclude").prop("checked")) {
                accramt = jQuery("#txtAccrualAmt").val();
            }
            else if (jQuery("#radExclude").prop("checked")) {
                accramt = 0;
            }
            totamt = parseFloat(intamt) + parseFloat(depamt) - parseFloat(tdsamt) + parseFloat(accramt);
            jQuery('#txtTotalAmount').val(totamt);
            //TotalAmountWords.innerHTML = AmountToWords(parseFloat(totamt));
        }

    },

    //TotalAmount
    totaltdsupdate: function () {
        var tot = 0;
        if (jQuery('#txtTdsAmount').val() != 0 || jQuery('#txtTdsAmount').val().trim().length != 0) {

            var depamt = 0;
            var intamt = 0;
            var tdsamt = 0;
            var totamt = 0;
            if (jQuery("#txtDepAmt").val() == "") {
                jQuery("#txtDepAmt").val(0);
            }
            else { depamt = parseFloat(jQuery("#txtDepAmt").val()); }
            if (jQuery("#txtIntAmount").val() == "") {
                jQuery("#txtIntAmount").val();
            }
            else { intamt = parseFloat(jQuery("#txtIntAmount").val()); }
            if (jQuery("#txtTdsAmount").val() == "") {
               // jQuery("#txtTdsAmount").val(0);
            }
            else { tdsamt = parseFloat(jQuery("#txtTdsAmount").val()); }
            if (jQuery("#radInclude").prop("checked")) {
                accramt = jQuery("#txtAccrualAmt").val();
            }
            else if (jQuery("#radExclude").prop("checked")) {
                accramt = 0;
            }
            totamt = parseFloat(intamt) + parseFloat(depamt) - parseFloat(tdsamt) + parseFloat(accramt);
            jQuery('#txtTotalAmount').val(totamt);
            //TotalAmountWords.innerHTML = AmountToWords(parseFloat(totamt));
        }

    },





    //Select Main Account
    loadMainAccount: function () {
        jQuery('.page-loader-wrapper').show();
        var MainAccount = {
            Flag: "DepositWithBankClosure",
            PagVal: "GetBnkID",

        };
        MainAccount = JSON.stringify(MainAccount);
        MainAccount = { "encryptedRqstStr": EncryptAPIReq(MainAccount) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", MainAccount, _DepBankClosure.fillMainAccount, userdata.token);
    },
    fillMainAccount: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_mainAcc").empty();
                jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val("0").text(" --------SELECT MAIN ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }

            else {

                jQuery("#ddl_mainAcc").empty();
                jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val("0").text(" --------SELECT MAIN ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Select Sub Account
    loadSubAccount: function (intdata) {
        jQuery('.page-loader-wrapper').show();
        var SubAccount = {
            Flag: "DepositWithBankClosure",
            PagVal: "GetMainBnkID",
            parVal: intdata
        };
        SubAccount = JSON.stringify(SubAccount);
        SubAccount = { "encryptedRqstStr": EncryptAPIReq(SubAccount) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", SubAccount, _DepBankClosure.fillSubAccount, userdata.token);
    },
    fillSubAccount: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_SubAcc").empty();
                jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val("0").text(" --------SELECT SUB ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_SubAcc").empty();
                jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val("0").text(" --------SELECT SUB ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }

    },

    //Select TDS Sub Account
    loadTDSSubAccount: function () {
        jQuery('.page-loader-wrapper').show();
        var TDSSubAccount = {
            Flag: "DepositWithBankClosure",
            PagVal: "GetIntSubAcc",
            // parVal: intdata
        };
        TDSSubAccount = JSON.stringify(TDSSubAccount);
        TDSSubAccount = { "encryptedRqstStr": EncryptAPIReq(TDSSubAccount) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", TDSSubAccount, _DepBankClosure.fillTDSSubAccount, userdata.token);
    },
    fillTDSSubAccount: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_SubAcc_Tds").empty();
                jQuery("#ddl_SubAcc_Tds").append(jQuery("<option></option>").val("0").text(" --------SELECT TDS SUB ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_SubAcc_Tds").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_SubAcc_Tds").empty();
                jQuery("#ddl_SubAcc_Tds").append(jQuery("<option></option>").val("0").text(" --------SELECT TDS SUB ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },



    checkvalues: function () {
        
        if (jQuery('#ddlFI').val() == '0' || jQuery('#ddlFI').val() == '' || jQuery('#ddlFI').val() == null) {
            swal("Select Financial Institution...!!!");
            jQuery('#ddlFi');
            return false;
        }
        else if (jQuery('#ddlDeposit').val() == '0' || jQuery('#ddlDeposit').val() == '' || jQuery('#ddlDeposit').val() == null) {
            swal("Select Deposit Details...!!!");
            jQuery('#ddlDeposit');
            return false;
        }
        else if (jQuery("#radInclude").prop("checked") == false && jQuery("#radExclude").prop("checked") == false) {
            swal("Please select Accrual Included or not...!!!");
            return false;
        }
        else if (jQuery('#ddl_mainAcc').val() == "0") {
            swal("Select Main Account...!!!");
            return false;
        }
        else if (jQuery('#ddl_SubAcc').val() == "0") {
            swal("Select Sub Account...!!!");
            return false;
        }
        else {
            MainAcc = jQuery('#ddl_mainAcc').val();
        }

      
        if (jQuery('#txtIntAmount').val() == "") {
            swal("Interest Amount...!!!");
            return false;
        }
        else if (jQuery('#txtTdsAmount').val() == "0") {

            swal("TDS Amount...!!!");
            return false;
        }
        if (jQuery('#txtTraDate').val()=="0" ) {
            swal("Transaction Date...!!!");
            return false;
        }
        else {
            return true;
        }

   
    },


    submitevalue: function () {
        if (_DepBankClosure.checkvalues()) {

            var MainAcc, SubAcc, TDSSubAcc, FDAccrual;
            var depamt = 0;
            var intamt = "";
            var tdsamt = 0;
            var totamt = 0;
            
            
            if (jQuery("#radInclude").prop("checked")) {
                FDAccrual = 1;
            }
            if (jQuery("#radExclude").prop("checked")) {
                FDAccrual = 2;
            }

            if (jQuery('#ddl_SubAcc').val() == null) {
                SubAcc = 0;
            }
            else {
                SubAcc = jQuery('#ddl_SubAcc').val();
            }

            if (jQuery('#ddl_SubAcc_Tds').val() == "0") {
                swal("Select TDS Sub Account...!!!");
                return false;
            }
            else {
                TDSSubAcc = jQuery('#ddl_SubAcc_Tds').val();
            }
            if (jQuery("#txtDepAmt").val() == "") {
                jQuery("#txtDepAmt").val(0);
            }
            else { depamt = parseFloat(jQuery("#txtDepAmt").val()); }
            if (jQuery("#txtIntAmount").val() == "") {
                jQuery("#txtIntAmount").val();
            }
            else { intamt = parseFloat(jQuery("#txtIntAmount").val()); }
            if (jQuery("#txtTdsAmount").val() == "") {
                jQuery("#txtTdsAmount").val(0);
            }
            else { tdsamt = parseFloat(jQuery("#txtTdsAmount").val()); }

            totamt = parseFloat(intamt) + parseFloat(depamt) - parseFloat(tdsamt);
            jQuery('#txtTotalAmount').val(totamt);
            /*TotalAmountWords.innerHTML = AmountToWords(parseFloat(totamt));*/
            var accrAmnt;
            var data = "";

            if (jQuery("#radInclude").prop("checked") == true) {
                accrAmnt = jQuery('#txtAccrualAmt').val();

            }
            else {
                accrAmnt = 0;
            }

            var MainAcc = jQuery('#ddl_mainAcc').val();
            var textmark = jQuery('#txtremark').val();
            var maturidtae = _DepBankClosure.convertdateformat(jQuery('#txtTraDate').val());

            var data = jQuery('#ddlDeposit').val() + 'µ' + jQuery("#txtTotalAmount").val() + 'µ' + maturidtae + 'µ' + userdata.userId + 'µ' + tdsamt + 'µ' + intamt + 'µ' + MainAcc + 'µ' + SubAcc + 'µ' + TDSSubAcc + 'µ' + FDAccrual + 'µ' + accrAmnt + 'µ' + textmark;

        }
            var submitRequest = {

                Flag: "DepositClosure",
                ParVal: data
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _DepBankClosure.SubmitReturn, userdata.token)
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
                            title: " Request Successfully !",
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

}



jQuery(document).ready(function () {

    jQuery('.page-loader-wrapper').hide();
    jQuery("#txttdsmainacc").val('31100-TDS RECEIVABLE');
    //_DepBankClosure.loadFinancialInstitution();
    _DepBankClosure.tokenValidate();
    _DepBankClosure.loadMainAccount();
    _DepBankClosure.loadTDSSubAccount();

    jQuery('#datepickerDates input').datepicker({
        autoclose: true,
        autoclose: true,
        //endDate: new Date(),
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        //defaultDate: "+1w",
        changeMonth: true,
        //minDate: new Date(),
       // maxDate: new Date(),
        
        container: '#datepickerDates'
    });

        //jQuery('#datepickerDates input').datepicker({
        //    autoclose: true,
        //    format: "dd/mm/yyyy",
        //    showButtonPanel: true,
        //    defaultDate: "+1w",
        //    changeMonth: true,
        //    endDate: new Date(), // Set end date properly
        //    container: '#datepickerDates'
        //}).datepicker("setDate", new Date());



    jQuery('#txtTraDate').datepicker().datepicker('setDate', new Date());

    jQuery('#ddlFI').on("change", function () {
        jQuery("#ddlDepositAccount").show();

        var intdata = jQuery("#ddlFI").val();

        _DepBankClosure.loadDepositAccount(intdata);
    });


    jQuery('#ddl_mainAcc').on("change", function () {
        jQuery("#ddlsubacsts").show();

        var intdata = jQuery("#ddl_mainAcc").val();

        _DepBankClosure.loadSubAccount(intdata);
    });


    jQuery('#ddlDeposit').on("change", function () {


        _DepBankClosure.getFromLoanDtls();
    });


    jQuery('#radInclude').on("change", function () {

        jQuery("#accrdiv").show();

    });

    jQuery('#radExclude').on("change", function () {

        jQuery("#accrdiv").hide();

    });

    //jQuery('#ddlDeposit').on("change", function () {

    //    _DepBankClosure.FillTable();
    //});

    jQuery('#txtIntAmount').on("change", function () {

        _DepBankClosure.totalintupdate();
    });
    jQuery('#txtTdsAmount').on("change", function () {

        _DepBankClosure.totaltdsupdate();
    });


    jQuery('#btnConf').on("click", function () {

        _DepBankClosure.submitevalue();

    });

    jQuery('#BtnExit').on("click", function () {
        window.open("Dashboard", "_self");
    });
});