var _IntAccrualposting = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _IntAccrualposting.checkAccessRtn, token)
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
                    _IntAccrualposting.loadSelectFundType();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _IntAccrualposting.checkAccessToken, userdata.token)
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
                _IntAccrualposting.loadSelectFundType();
            }


        }

    },



    //Select Fund Type
    loadSelectFundType: function () {
        jQuery('.page-loader-wrapper').show();
        var SelectFundType = {
            Flag: "Int_Accru_request",
            PagVal: "GetLoanAvailFundTypeINTACCR",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        SelectFundType = JSON.stringify(SelectFundType);
        SelectFundType = { "encryptedRqstStr": EncryptAPIReq(SelectFundType) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectdataQueries", SelectFundType, _IntAccrualposting.FillSelectFundType, userdata.token);

    },
    FillSelectFundType: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFundType").empty();
                jQuery("#ddlFundType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SELECT FUND TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFundType").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFundType").empty();
                jQuery("#ddlFundType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FUND TYPE-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //Select Financial Institution

    loadSelectFinancialInstitution: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var SelectFinancialInstitution = {
            Flag: "Int_Accru_request",
            PagVal: "GetLoanAvailFI_INTACCR",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        SelectFinancialInstitution = JSON.stringify(SelectFinancialInstitution);
        SelectFinancialInstitution = { "encryptedRqstStr": EncryptAPIReq(SelectFinancialInstitution) };
        
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectdataQueries", SelectFinancialInstitution, _IntAccrualposting.FillSelectFinancialInstitution, userdata.token);

    },
    FillSelectFinancialInstitution: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFi").empty();
                jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SELECT FUND TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFi").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFi").empty();
                jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FUND TYPE-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },




    //select loan

    loadSelectloan: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var Selectloan = {
            Flag: "Int_Accru_request",
            PagVal: "GetLoanAvailLoans_INTACCR",
            ParVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        Selectloan = JSON.stringify(Selectloan);
        Selectloan = { "encryptedRqstStr": EncryptAPIReq(Selectloan) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectdataQueries", Selectloan, _IntAccrualposting.FillSelectloan, userdata.token);

    },
    FillSelectloan: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlLoans").empty();
                jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SELECT LOAN TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlLoans").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlLoans").empty();
                jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT LOAN TYPE-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //Finance Cost Main Bank
    loadFinanceCostMainBank: function () {
        jQuery('.page-loader-wrapper').show();
        var FinanceCostMainBank = {
            Flag: "Int_Accru_request",
            PagVal: "GetLoanAvailLoans_INTACCR",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        FinanceCostMainBank = JSON.stringify(FinanceCostMainBank);
        FinanceCostMainBank = { "encryptedRqstStr": EncryptAPIReq(FinanceCostMainBank) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectdataQueries", FinanceCostMainBank, _IntAccrualposting.FillFinanceCostMainBank, userdata.token);

    },
    FillFinanceCostMainBank: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_intfc_main_bnk").empty();
                jQuery("#ddl_intfc_main_bnk").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SELECT FINANCE COST BANK TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_intfc_main_bnk").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_intfc_main_bnk").empty();
                jQuery("#ddl_intfc_main_bnk").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT  SELECT FINANCE COST BANK TYPE-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

   
        //FinanceCostMainBank
        loadFinanceCostMainBank: function () {
            jQuery('.page-loader-wrapper').show();
            var FinanceCostMainBank = {
                Flag: "Int_Accru_request",
                PagVal: "GetINTFIAcc",
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            FinanceCostMainBank = JSON.stringify(FinanceCostMainBank);
            FinanceCostMainBank = { "encryptedRqstStr": EncryptAPIReq(FinanceCostMainBank) };
            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectdataQueries", FinanceCostMainBank, _IntAccrualposting.FillFinanceCostMainBank, userdata.token);

        },
    FillFinanceCostMainBank: function (response) {

            if (response.status === "SUCCESS") {
                response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
                if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                    jQuery('.page-loader-wrapper').hide();

                    jQuery("#ddl_intfc_main_bnk").empty();
                    jQuery("#ddl_intfc_main_bnk").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  FINACIAL COST MAIN BANK-------- "));
                    jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                        jQuery("#ddl_intfc_main_bnk").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                    });

                }
                else {

                    jQuery("#ddl_intfc_main_bnk").empty();
                    jQuery("#ddl_intfc_main_bnk").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FINACIAL COST MAIN BANK-------- "));
                }
                jQuery('.page-loader-wrapper').hide();
            }
        },



    // FinanceCostSubBank 
    loadFinanceCostSubBank: function () {
        jQuery('.page-loader-wrapper').show();
        var FinanceCostSubBank = {
            Flag: "Int_Accru_request",
            PagVal: "GetINTFISubAcc",
            parVal: jQuery("#ddl_intfc_main_bnk").val(),
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        FinanceCostSubBank = JSON.stringify(FinanceCostSubBank);
        FinanceCostSubBank = { "encryptedRqstStr": EncryptAPIReq(FinanceCostSubBank) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectdataQueries", FinanceCostSubBank, _IntAccrualposting.FillFinanceCostSubBank, userdata.token);

    },
    FillFinanceCostSubBank: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_intfc_sub_bnk").empty();
                jQuery("#ddl_intfc_sub_bnk").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  FINACIAL COST SUB BANK-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_intfc_sub_bnk").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_intfc_sub_bnk").empty();
                jQuery("#ddl_intfc_sub_bnk").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FINACIAL COST SUB BANK-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },




    // FinanceCostContraId
    loadFinanceCostContraId: function (indatas) {
        jQuery('.page-loader-wrapper').show();
        var FinanceCostContraId = {
            Flag: "Int_Accru_request",
            PagVal: "GetINTFISubIdAccrual",
            parVal: indatas,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        FinanceCostContraId = JSON.stringify(FinanceCostContraId);
        FinanceCostContraId = { "encryptedRqstStr": EncryptAPIReq(FinanceCostContraId) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectdataQueries", FinanceCostContraId, _IntAccrualposting.FillFinanceCostContraId, userdata.token);

    },
    FillFinanceCostContraId: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_IfSubid").empty();
                jQuery("#ddl_IfSubid").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  FINACIAL COST CONTRA ID-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_IfSubid").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_IfSubid").empty();
                jQuery("#ddl_IfSubid").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FINACIAL COST CONTRA ID-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },



    // validation confirm button...
    submitdata: function () {

        if (_IntAccrualposting.checkvalues()) {
            var entrydate = _IntAccrualposting.convertdateformat(jQuery('#AgreeDts').val());
            var reversaldate = _IntAccrualposting.convertdateformat(jQuery('#AgreeDt').val());
            datas = jQuery("#ddlLoans").val() + "µ" + userdata.userId + "µ" + jQuery("#txtPayAmount").val() + "µ" + jQuery("#ddl_intfc_main_bnk").val() + "µ" + jQuery("#ddl_intfc_sub_bnk").val() + "µ" + jQuery("#ddl_IfSubid").val() + "µ" + entrydate + "µ" + reversaldate + "µ" + jQuery("#ddlFundType").val() + "µ" + jQuery("#ddlFi").val();


            var submitRequest = {

                Flag: "IntAccrualpostingrequest",
                ParVal: datas,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _IntAccrualposting.SubmitReturn, 'dfgdfgfgdfgdfgd')
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
                    if (response.data.queryResult.QueryResult[0].Param1 == "0") {
                        swal({
                            title: "Requsted Successfully...!!! ",
                            text: "",
                            type: "success"
                        }, function () {
                            window.location.reload(true);
                        });
                    }
                    else if (response.data.queryResult.QueryResult[0].Param1 == "1") {
                        swal({
                            title: "Already Requested One Is Pending For Approval...!!!",
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

    VerifyAAmount: function () {
        var AAmount = jQuery('#txtPayAmount').val();

        if (AAmount <= 0) {
            swal("", "Please  Enter New Interest Rate Greater than 0", "error");

            jQuery('#txtPayAmount').val(" ");
            return false;
        }

    },

    //New Intrest Accural Posting  Request popup
        checkvalues: function () {
        var EntryPostingDate = jQuery('#AgreeDts').val();
        var ReversalDate = jQuery('#AgreeDt').val();
        var SelectFdType = jQuery('#ddlFundType').val();
        var SltFincInstn = jQuery('#ddlFi').val();
        var SeltLon = jQuery('#ddlLoans').val();
        var FinCostmnBank = jQuery('#ddl_intfc_main_bnk').val();
        var FinCostsubBank = jQuery('#ddl_intfc_sub_bnk').val();
        var FinCostContraid = jQuery('#ddl_IfSubid').val();
        var AAmount = jQuery('#txtPayAmount').val();
       





        if (EntryPostingDate == "") {
            swal("", "Please Select Entry Posting Date ", "error");
            return false;
        }

        else if (ReversalDate == "") {
            swal("", "Please Select Reversal Date", "error");
            return false;
        }
        else if (SelectFdType == 0) {
            swal("", "Please  Select Fund Type ", "error");
            return false;
        }
        else if (SltFincInstn== 0) {
            swal("", "Please  Select Financial Institution ", "error");
            return false;
        }
        else if (SeltLon == 0) {
            swal("", "Please  Select Loan ", "error");
            return false;
        }
        else if (FinCostmnBank == 0) {
            swal("", "Please Select Finance Cost Main Bank ", "error");
            return false;
        }
        else if (FinCostsubBank == 0) {
            swal("", "Please Select Finance Cost Sub Bank  ", "error");
            return false;
        }
        else if (FinCostContraid == 0) {
            swal("", "Please Select Finance Cost Contra Id ", "error");
            return false;
        }
        else if (AAmount == "") {
            swal("", "Please Enter Accrual Amount ", "error");
            return false;
        }

        else
            return true;

    }









}





jQuery(document).ready(function () {

        jQuery('.page-loader-wrapper').hide();
        //_IntAccrualposting.loadSelectFundType();
        _IntAccrualposting.tokenValidate();


    jQuery('#datepickerDate input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        //defaultDate: "+1w",
        changeMonth: true,
        // minDate: new Date(),
        container: '#datepickerDate'
    });

    jQuery('#datepickerDates input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        //defaultDate: "+1w",
        changeMonth: true,
        // minDate: new Date(),
        container: '#datepickerDates'
    });

        jQuery('#ddlFundType').on("change", function () {

            jQuery("#Sclfins").show();
            var indata = jQuery("#ddlFundType").val();

            _IntAccrualposting.loadSelectFinancialInstitution(indata);


        });
        jQuery('#ddlFi').on("change", function () {

            jQuery("#Scllon").show();
            var indata = jQuery("#ddlFundType").val() + 'µ' + jQuery("#ddlFi").val();


            _IntAccrualposting.loadSelectloan(indata);


        });
        jQuery('#ddlLoans').on("change", function () {

            jQuery("#divintfinmainbnk").show();

            _IntAccrualposting.loadFinanceCostMainBank();

        });

    jQuery('#ddl_intfc_main_bnk').on("change", function () {

        jQuery("#divintfinsubbnk").show();

        _IntAccrualposting.loadFinanceCostSubBank();

    });

    jQuery('#ddl_intfc_sub_bnk').on("change", function () {

        jQuery("#divintfinsubid").show();
        var indatas = jQuery("#ddlLoans").val() + 'µ' + jQuery("#ddl_intfc_main_bnk").val() + 'µ' + jQuery("#ddl_intfc_sub_bnk").val();


        _IntAccrualposting.loadFinanceCostContraId(indatas);


    });

    jQuery('#btnConf').on("click", function () {


        _IntAccrualposting.submitdata();
    });

    jQuery('#txtPayAmount').on("change", function () {


        _IntAccrualposting.VerifyAAmount();
    });
});
