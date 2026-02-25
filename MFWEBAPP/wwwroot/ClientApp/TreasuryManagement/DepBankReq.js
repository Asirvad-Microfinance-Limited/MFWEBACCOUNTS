var _DepBankReq = {


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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _DepBankReq.checkAccessRtn, token)
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
                    _DepBankReq.loadslno();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _DepBankReq.checkAccessToken, userdata.token)
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
                _DepBankReq.loadslno();
            }


        }

    },


    loadslno: function () {
        jQuery('.page-loader-wrapper').show();
        var SlnoType = {
            Flag: "DepositReq",
            PagVal: "loadslno",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        SlnoType = JSON.stringify(SlnoType);
        SlnoType = { "encryptedRqstStr": EncryptAPIReq(SlnoType) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", SlnoType, _DepBankReq.fillslnoType, userdata.token);
    },
    fillslnoType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                var slno = response.data.queryResult.QueryResult[0];

                jQuery("#txtSLNO").val(slno.Param1);

               
                //jQuery("#ddlSLNO").empty();
                //jQuery("#ddlSLNO").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SL NO-------- "));
                //jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                //    jQuery("#ddlSLNO").append(jQuery("<option></option>").val(val.Param1).text(val.Param1));
                //});

            }
            //else {

            //    jQuery("#txtSLNO").empty();
            //    jQuery("#txtSLNO").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SL NO-------- "));
            //}
            //jQuery('.page-loader-wrapper').hide();
        }
    },



    //Select Financial Institution Type
    loadFinancialInstitutionType: function () {
        jQuery('.page-loader-wrapper').show();
        var FinancialInstitutionType = {
            Flag: "DepositReq",
            PagVal: "GetFinInstType",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        FinancialInstitutionType = JSON.stringify(FinancialInstitutionType);
        FinancialInstitutionType = { "encryptedRqstStr": EncryptAPIReq(FinancialInstitutionType) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FinancialInstitutionType, _DepBankReq.fillFinancialInstitutionType, userdata.token);
    },
    fillFinancialInstitutionType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFiType").empty();
                jQuery("#ddlFiType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FINANCIAL INSTITUTION TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFiType").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFiType").empty();
                jQuery("#ddlFiType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FINANCIAL INSTITUTION TYPE-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Select Financial Institution
    loadFinancialInstitution: function (intdata) {
        jQuery('.page-loader-wrapper').show();
        var FinancialInstitution = {
            Flag: "DepositReq",
            PagVal: "GetFinInstn",
            parVal: intdata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        FinancialInstitution = JSON.stringify(FinancialInstitution);
        FinancialInstitution = { "encryptedRqstStr": EncryptAPIReq(FinancialInstitution) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FinancialInstitution, _DepBankReq.fillFinancialInstitution, userdata.token);
    },
    fillFinancialInstitution: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFi").empty();
                jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FINANCIAL INSTITUTION-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFi").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFi").empty();
                jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FINANCIAL INSTITUTION-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Select Category
    loadCategory: function (intdata) {
        jQuery('.page-loader-wrapper').show();
        var Category = {
            Flag: "DepositReq",
            PagVal: "CATEGORY",
            parVal: intdata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        Category = JSON.stringify(Category);
        Category = { "encryptedRqstStr": EncryptAPIReq(Category) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", Category, _DepBankReq.fillCategory, userdata.token);
    },
    fillCategory: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlcategory").empty();
                jQuery("#ddlcategory").append(jQuery("<option></option>").val("0").text(" --------SELECT CATEGORY-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlcategory").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlcategory").empty();
                jQuery("#ddlcategory").append(jQuery("<option></option>").val("0").text(" --------SELECT CATEGORY-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Select Main Account
    loadMainAccount: function () {
        jQuery('.page-loader-wrapper').show();

        var MainAccount = {
            Flag: "DepositReq",
            PagVal: "GetBnkID",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        MainAccount = JSON.stringify(MainAccount);
        MainAccount = { "encryptedRqstStr": EncryptAPIReq(MainAccount) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", MainAccount, _DepBankReq.fillMainAccount, userdata.token);
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
            Flag: "DepositReq",
            PagVal: "GetMainBnkID",
            parVal: intdata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        SubAccount = JSON.stringify(SubAccount);
        SubAccount = { "encryptedRqstStr": EncryptAPIReq(SubAccount) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", SubAccount, _DepBankReq.fillSubAccount, userdata.token);
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


    matuityamount: function () {

        var DepAmt = jQuery('#txtDepositAmt').val();
        //var MaturityAmt = jQuery('#txtMaturityAmt').val();
        var Rate = jQuery('#txtrate').val();
        var depositdte = jQuery('#AgreeDt').val();
        var maturitdte = jQuery('#AgreeDate').val();

        var intrate = Rate / 100

        var frmdtval = Date.parse(jQuery('#AgreeDate').val());
        var todtval = Date.parse(jQuery('#AgreeDt').val());

        var dif = (todtval - frmdtval);
        var daysDiff = Math.round(Math.abs(dif / (10000 * 60 * 60 * 24)) * 10);
        //alert(daysDiff);

        if (daysDiff < 0) {
            swal("Choose Maturity Date greater than Deposit Date");
            jQuery("#txtMaturityAmt").val("");
            jQuery("#txtMaturityAmt").focus();
            return false;

        }

        if (DepAmt <= 0) {
            swal("", "Please Enter Deposit Amount GreaterThan Zero", "error");
            return false;
        }

        else if (Rate == "") {
            swal("", "Please Enter Rate", "error");
            return false;
        }
        else if (depositdte == "") {
            swal("", "Please Enter Deposit Date", "error");
            return false;
        }

        else if (maturitdte == "") {
            swal("", "Please Enter Maturity Date", "error");
            return false;
        }

        var amount = DepAmt * intrate * daysDiff

        var calculation = amount / 365
        var result = Math.floor(calculation);
        var total = parseInt(result) + parseInt(DepAmt)
        var MaturityAmt = jQuery('#txtMaturityAmt').val(total);
    },


    checkvalues: function () {
        var FiType = jQuery('#ddlFiType').val();
        var Fi = jQuery('#ddlFi').val();
        var FiCate = jQuery('#ddlcategory').val();
        var bank = jQuery('#txtbankbranch').val();
        var DepAmt = jQuery('#txtDepositAmt').val();
        var MaturityAmt = jQuery('#txtMaturityAmt').val();
        var Rate = jQuery('#txtrate').val();
        var AgreeDt = jQuery('#AgreeDt').val();
        var AgreeDate = jQuery('#AgreeDate').val();

        var Purpose = jQuery('#txt_purpose').val();
        var MainAcc= jQuery('#ddl_mainAcc').val();
        var SubAcc = jQuery('#ddl_SubAcc').val();
        var period = jQuery('#txt_period').val();
        var COMPONDINT = jQuery('#txtcompoundint').val();
        var Classification = jQuery('#txt_Classification').val();


        if (FiType == 0) {
            swal("", "Please Select Financial Institution Type", "error");
            return false;
        }
        else if (Fi == 0) {
            swal("", "Please Select Financial Institution", "error");
            return false;
        }
        else if (FiCate == 0) {
            swal("", "Please Select Category", "error");
            return false;
        }
        else if (bank == "") {
            swal("", "Please Enter Deposit Bank Branch", "error");
            return false;
        }
        else if (AgreeDt == "") {
            swal("", "Please Enter Deposit Date", "error");
            return false;
        }
        else if (AgreeDate == "") {
            swal("", "Please Enter Maturity Date", "error");
            return false;
        }
        else if (Rate == "") {
            swal("", "Please Enter Rate", "error");
            return false;
        }

        else if (DepAmt <=0 ) {
            swal("", "Please Enter Deposit Amount GreaterThan Zero", "error");
            return false;
        }
        else if (MaturityAmt <= 0) {
            swal("", "Please Enter Maturity Amount GreaterThan Zero", "error");
            return false;
        }

        //else if (Purpose == "") {
        //    swal("", "Please Enter The Purpose", "error");
        //    return false;
        //}

        else if (COMPONDINT == 0) {
            swal("", "Please Select Componding Interest ", "error");
            return false;
        }

        else if (Classification == "") {
            swal("", "Please Select Classification", "error");
            return false;
        }
        
        else if (MainAcc == 0) {
            swal("", "Please Select Main Account ", "error");
            return false;
        }
        else if (SubAcc == 0) {
            swal("", "Please Select Sub Account", "error");
            return false;
        }
       
    


        
        else
            return true;
    },


 submitevalue: function () {
        if (_DepBankReq.checkvalues()) {

            var Data, itmdata;//, dateval, itmdatachild, MainAcc, SubAcc, LoanBal, Loanamnt, fundTfrMain, fundTfrSub;
            Data = '';
            itmdata = 's';
            var Depostamt = jQuery("#txtDepositAmt").val();
            var maturityamt = jQuery("#txtMaturityAmt").val();
            var depositdate = Date.parse(_DepBankReq.convertdateformat(jQuery("#AgreeDt").val()));
            var maturitydate = Date.parse(_DepBankReq.convertdateformat(jQuery("#AgreeDate").val()));
            var datedif = maturitydate - depositdate;
            var period = jQuery('#txt_period').val();
            var componudint = jQuery('#txtcompoundint').val();
            var remark = jQuery('#txt_Remark').val();
            var classification = jQuery('#txt_Classification').val();
            var bankbranch = jQuery('#txtbankbranch').val();
            var slno = jQuery('#txtSLNO').val();

            //if (datedif < 0) {
            //    swal("Choose Maturity Date greater than Deposit Date");
            //    jQuery("#txtMaturityAmt").val("");
            //    jQuery("#txtMaturityAmt").focus();
            //    return false;

            //}

            //if (parseInt(maturityamt) <= parseInt(Depostamt)) {
            //    swal("Enter Maturity Amount Greater Than" + Depostamt);
            //    jQuery("#txtMaturityAmt").focus();
            //    return false;
            //}



            var MainAcc = jQuery('#ddl_mainAcc').val();
            var SubAcc = jQuery('#ddl_SubAcc').val();

            if (jQuery('#ddl_SubAcc').val() == null) {
                SubAcc = 0;
            }

            //              1                          2c                      3                                    4                           5                                6                                   7                                            8                                                     9                                                                   10                                    11                                     12                            13             14           15               16             17             18                 19               20                     21
            var Data = userdata.branchId + 'µ' + userdata.userId + 'µ' + jQuery('#ddlFiType').val() + 'µ' + jQuery('#ddlFi').val() + 'µ' + jQuery('#ddlcategory').val() + 'µ' + jQuery('#txtFDNo').val() + 'µ' + jQuery('#txtrate').val() + 'µ' + _DepBankReq.convertdateformat(jQuery('#AgreeDt').val()) + 'µ' + _DepBankReq.convertdateformat(jQuery('#AgreeDate').val()) + 'µ' + jQuery('#txtDepositAmt').val() + 'µ' + jQuery('#txtMaturityAmt').val() + 'µ' + jQuery('#txt_purpose').val() + 'µ' + MainAcc + 'µ' + SubAcc + 'µ' + "3" + 'µ' + bankbranch + 'µ' + period + 'µ' + componudint + 'µ' + remark + 'µ' + classification + 'µ' + slno;
            //Data = $("[i  d*=hdBranchId]").val() + 'µ' + $("[id*=hdUserId]").val() + 'µ' + $('#ddlFiType').val() + 'µ' + $('#ddlFi').val() + 'µ' + $('#ddlcategory').val() + 'µ' + $('#txtFDNo').val() + 'µ' + $('#txtrate').val() + 'µ' + $('#txtDepositDate').val() + 'µ' + $('#txt_maturity').val() + 'µ' + $('#txtDepositAmt').val() + 'µ' + $('#txtMaturityAmt').val() + 'µ' + $('#txt_purpose').val() + 'µ' + MainAcc + 'µ' + SubAcc + 'µ' + $("[id*=hdFirmId]").val(); 

        }

        var submitRequest = {

            Flag: "INSERTDEPOSITBREQ",
            ParVal: Data,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
     };
     submitRequest = JSON.stringify(submitRequest);
     submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _DepBankReq.SubmitReturn, 'dfgdfgfgdfgdfgd')



    },

    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                var msg = jQuery.trim(response.data.message);
                //var msg = String.prototype.trim(response.data.message);
                if (response.data.errStatus = "1") {
                    swal({
                        title: "Requested Successfully!",
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
    },
}
jQuery(document).ready(function () {

    jQuery('.page-loader-wrapper').hide();
    //_DepBankReq.loadslno();
    _DepBankReq.tokenValidate();
    _DepBankReq.loadFinancialInstitutionType();
    _DepBankReq.loadMainAccount();

    jQuery('#datepickerDate input').datepicker({
        autoclose: true,
        format: "dd/M/yyyy",
        showbuttonPanel: true,
        //defaultDate: "+1w",
        changeMonth: true,
        minDate: new Date(),
        container: '#datepickerDate'
    });

    jQuery('#datepickerDates input').datepicker({
        autoclose: true,
        format: "dd/M/yyyy",
        showbuttonPanel: true,
        //defaultDate: "+1w",
        changeMonth: true,
        minDate: new Date(),
        container: '#datepickerDates'
    });

    jQuery('#AgreeDt').on('change', function () {

        jQuery("#txtrate").val("");
        jQuery("#txtDepositAmt").val("");
        jQuery("#txtMaturityAmt").val("");
    });
    jQuery('#AgreeDate').on('change', function () {

        jQuery("#txtrate").val("");
        jQuery("#txtDepositAmt").val("");
        jQuery("#txtMaturityAmt").val("");

        var depositdate = Date.parse(_DepBankReq.convertdateformat(jQuery("#AgreeDt").val()));
        var maturitydate = Date.parse(_DepBankReq.convertdateformat(jQuery("#AgreeDate").val()));
        var diff = maturitydate - depositdate;
        var daysDiff = (diff / (10000 * 60 * 60 * 24)) * 10;

        if (daysDiff < 0) {
            swal({
                title: "Choose Maturity Date greater than Deposit Date!",
                text: "",
                type: "error"
            },
            );


            jQuery("#txtMaturityAmt").val("");
            jQuery("#txtMaturityAmt").focus();
            return false;

        }
        var period = jQuery('#txt_period').val(daysDiff);

    });

});

jQuery('#ddlFiType').on("change", function () {
    jQuery("#ddlFiinstitution").show();

    var intdata = jQuery("#ddlFiType").val();

    _DepBankReq.loadFinancialInstitution(intdata);
});




jQuery('#ddlFi').on("change", function () {
    jQuery("#ddlCategory").show();

  var intmain = jQuery("#ddlFiType").val() + 'µ' + jQuery("#ddlFi").val();
  _DepBankReq.loadCategory(intmain);


});
jQuery('#ddl_mainAcc').on("change", function () {
    jQuery("#ddlsubacsts").show();

    var intdata = jQuery("#ddl_mainAcc").val();

    _DepBankReq.loadSubAccount(intdata);
});
jQuery('#txtDepositAmt').on("change", function () {


    _DepBankReq.matuityamount();
});

jQuery('#txtrate').on("change", function () {
    var DepAmt = jQuery('#txtDepositAmt').val();
    //var MaturityAmt = jQuery('#txtMaturityAmt').val();
    var Rate = jQuery('#txtrate').val();
    var depositdte = jQuery('#AgreeDt').val();
    var maturitdte = jQuery('#AgreeDate').val();
       var intrate = Rate / 100
    var frmdtval = Date.parse(jQuery('#AgreeDate').val());
    var todtval = Date.parse(jQuery('#AgreeDt').val());
    var dif = (todtval - frmdtval);
    var daysDiff = Math.round(Math.abs(dif / (10000 * 60 * 60 * 24)) * 10);
    var amount = DepAmt * intrate * daysDiff
     var calculation = amount / 365
    var result = Math.floor(calculation);
    var total = parseInt(result) + parseInt(DepAmt)
    var MaturityAmt = jQuery('#txtMaturityAmt').val(total);

   });


jQuery('#txtDepositAmt').on("change", function () {
    _DepBankReq.matuityamount();
});


jQuery('#btnconfirm').on("click", function () {
   


    _DepBankReq.submitevalue();


});

jQuery('#BtnExit').on("click", function () {
    window.open("Dashboard", "_self");
});