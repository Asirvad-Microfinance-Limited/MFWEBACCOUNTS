var amnt;
var i;
var buttonClicked = false;
var _loanrepayment = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _loanrepayment.checkAccessRtn, token)
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
                    _loanrepayment.loadFundType();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _loanrepayment.checkAccessToken, userdata.token)
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
                _loanrepayment.loadFundType();
            }


        }

    },







    loadFundType: function () {
        jQuery('.page-loader-wrapper').show();
        var fiTypes = {
            Flag: "LoanRepaymentReq",
            PagVal: "GetFundType",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        fiTypes = JSON.stringify(fiTypes);
        fiTypes = { "encryptedRqstStr": EncryptAPIReq(fiTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", fiTypes, _loanrepayment.fillFiType, userdata.token);
    },
    fillFiType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFundType").empty();
                jQuery("#ddlFundType").append(jQuery("<option></option>").val("0").text(" -------- CHOOSE FUND TYPE -------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFundType").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFundType").empty();
                jQuery("#ddlFundType").append(jQuery("<option></option>").val("0").text(" -------- CHOOSE FUND TYPE -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    Selectbank: function (details11) {

        var loanss = jQuery('#ddlLoans :selected').text();
        var split1 = loanss.split("~");
        var loan = split1[1];
        var loan11 = loan.split("-");
        var loan12 = loan11[0];


        jQuery('.page-loader-wrapper').show();
        var bankdetails = {
            Flag: "LoanRepaymentReq",
            PagVal: "bankdetails",
            parVal: loan12,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        bankdetails = JSON.stringify(bankdetails);
        bankdetails = { "encryptedRqstStr": EncryptAPIReq(bankdetails) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", bankdetails, _loanrepayment.babkdetailsresponse, userdata.token);
    },
    babkdetailsresponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddbankdtl").empty();
                jQuery("#ddbankdtl").append(jQuery("<option></option>").val("0").text(" -------- CHOOSE BANK DETAILS -------- "));
                /*var data = response.data.queryResult.QueryResult[0].Param1;
                jQuery("#ddbankdtl").append(jQuery("<option></option>").text(data));
*/
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddbankdtl").append(jQuery("<option></option>").text(val.Param1));
                });

            }
            else {

                jQuery("#ddbankdtl").empty();
                jQuery("#ddbankdtl").append(jQuery("<option></option>").val("0").text(" -------- CHOOSE BANK DETAILS -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },






    //financial institution  LoadBranch
    Fincialins: function (bank) {
        jQuery('.page-loader-wrapper').show();

        var fincialLoad = {

            Flag: "LoanRepaymentReq",
            PagVal: "GetLoanRepayFI",
            parVal: bank,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };

        fincialLoad = JSON.stringify(fincialLoad);
        fincialLoad = { "encryptedRqstStr": EncryptAPIReq(fincialLoad) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", fincialLoad, _loanrepayment.FincialinsResponse, userdata.token);
    },
    FincialinsResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFincialType").empty();
                jQuery("#ddlFincialType").append(jQuery("<option></option>").val("0").text(" -------- CHOOSE FI TYPE -------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFincialType").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFincialType").empty();
                jQuery("#ddlFincialType").append(jQuery("<option></option>").val("0").text(" -------- CHOOSE FI TYPE -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },







    //select Loan
    selectLoan: function (InputData) {
        jQuery('.page-loader-wrapper').show();

        var LoanLoad = {

            Flag: "LoanRepaymentReq",
            PagVal: "GetLoanRepayLoans",
            parVal: InputData,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        LoanLoad = JSON.stringify(LoanLoad);
        LoanLoad = { "encryptedRqstStr": EncryptAPIReq(LoanLoad) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", LoanLoad, _loanrepayment.LoanRepyResponse, userdata.token);
    },
    LoanRepyResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlLoans").empty();
                jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" -------- CHOOSE LOAN -------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlLoans").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlLoans").empty();
                jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" -------- CHOOSE LOAN -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },



    //seelct bank as  for payment
    paymentbank: function () {
        jQuery('.page-loader-wrapper').show();
        var inputdata = jQuery("#ddl_mainAcc").val();
        var paymentbankvar = {

            Flag: "LoanRepaymentReq",
            PagVal: "GetSubBnkID",
            parVal: inputdata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        paymentbankvar = JSON.stringify(paymentbankvar);
        paymentbankvar = { "encryptedRqstStr": EncryptAPIReq(paymentbankvar) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", paymentbankvar, _loanrepayment.FillpaymentbankResponse, userdata.token);
    },
    FillpaymentbankResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlPaymentBank").empty();
                jQuery("#ddlPaymentBank").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BANK-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlPaymentBank").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlPaymentBank").empty();
                jQuery("#ddlPaymentBank").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BANK-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        _loanrepayment.bankdetails();
    },


    //Load MONTH
    DivMnth: function () {
        jQuery('.page-loader-wrapper').show();

        var DivmonthLoad = {

            Flag: "LoanRepaymentReq",
            PagVal: "GetMnth",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
            // parVal: InputData

        };
        DivmonthLoad = JSON.stringify(DivmonthLoad);
        DivmonthLoad = { "encryptedRqstStr": EncryptAPIReq(DivmonthLoad) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DivmonthLoad, _loanrepayment.DivmntResponse, userdata.token);
    },
    DivmntResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlmonths").empty();
                jQuery("#ddlmonths").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MONTH-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlmonths").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlmonths").empty();
                jQuery("#ddlmonths").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MONTH------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },



    //load Year
    Divyear: function () {
        jQuery('.page-loader-wrapper').show();

        var DivYearLoad = {

            Flag: "LoanRepaymentReq",
            PagVal: "GetYear",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
            // parVal: InputData

        };
        DivYearLoad = JSON.stringify(DivYearLoad);
        DivYearLoad = { "encryptedRqstStr": EncryptAPIReq(DivYearLoad) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DivYearLoad, _loanrepayment.DivYearResponse, userdata.token);
    },
    DivYearResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlyear").empty();
                jQuery("#ddlyear").append(jQuery("<option></option>").val("0").text(" --------CHOOSE YEAR-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlyear").append(jQuery("<option></option>").val(val.Param1).text(val.Param1));
                });

            }
            else {

                jQuery("#ddlyear").empty();
                jQuery("#ddlyear").append(jQuery("<option></option>").val("0").text(" --------CHOOSE YEAR-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },



    //get main aa
    getBnkIDdtl: function () {
        jQuery('.page-loader-wrapper').show();

        var mainaccLoad = {

            Flag: "LoanRepaymentReq",
            PagVal: "GetBnkID",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
            // parVal: InputData

        };
        mainaccLoad = JSON.stringify(mainaccLoad);
        mainaccLoad = { "encryptedRqstStr": EncryptAPIReq(mainaccLoad) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", mainaccLoad, _loanrepayment.FillMainAccResponse, userdata.token);
    },
    FillMainAccResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_mainAcc").empty();
                jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN ACC-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_mainAcc").empty();
                jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN ACC-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //get sub  main aa
    getSubBnkDtl: function () {
        jQuery('.page-loader-wrapper').show();
        var inputdata = jQuery("#ddl_mainAcc").val();
        var SubaccLoad = {

            Flag: "LoanRepaymentReq",
            PagVal: "GetSubBnkID",
            parVal: inputdata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        SubaccLoad = JSON.stringify(SubaccLoad);
        SubaccLoad = { "encryptedRqstStr": EncryptAPIReq(SubaccLoad) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", SubaccLoad, _loanrepayment.FillSubAccResponse, userdata.token);
    },
    FillSubAccResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_SubAcc").empty();
                jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_SubAcc").empty();
                jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },



    //get tds sub bank id
    getTdsbankid: function () {
        jQuery('.page-loader-wrapper').show();
        var inputdata = jQuery("#ddl_mainAcc").val();
        var SubaccLoad = {

            Flag: "LoanRepaymentReq",
            PagVal: "GetTDSBnkID",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId


        };
        SubaccLoad = JSON.stringify(SubaccLoad);
        SubaccLoad = { "encryptedRqstStr": EncryptAPIReq(SubaccLoad) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", SubaccLoad, _loanrepayment.FillSubAcctdsResponse, userdata.token);
    },
    FillSubAcctdsResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_TDS_main_bnk").empty();
                jQuery("#ddl_TDS_main_bnk").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_TDS_main_bnk").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_TDS_main_bnk").empty();
                jQuery("#ddl_TDS_main_bnk").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //bank details table

    bankdetails: function (InputData) {
        var loanss = jQuery('#ddlLoans :selected').text();
        var split1 = loanss.split("~");
        var loan = split1[1];
        var loan11 = loan.split("-");
        var loan12 = loan11[0];

        jQuery('.page-loader-wrapper').show();
        var bnkdetails = {
            Flag: "LoanRepaymentReq",
            PagVal: "bankdetails",
            parVal: loan12,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        bnkdetails = JSON.stringify(bnkdetails);
        bnkdetails = { "encryptedRqstStr": EncryptAPIReq(bnkdetails) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", bnkdetails, _loanrepayment.getbnkdetails, userdata.token);

    },

    getbnkdetails: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();
                jQuery('#main').show();



                if (response.data.queryResult.QueryResult.length > 0) {

                    jQuery('#Fitable').empty();
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
                        /*$row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[8]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[9]));*/
                        jQuery('#Fitable').append($row);
                    });
                }

            }
        }
    },

    // bank balance in lms report

    bankbalance: function () {
        var loanss = jQuery('#ddlLoans :selected').text();
        var split1 = loanss.split("~");
        var loan = split1[1];
        var loan11 = loan.split("-");
        var loan12 = loan11[0];

        var tableData = document.getElementById('tbldespatchs');//2 table

        var inst_number = tableData.rows[1].cells[2].innerText;
        var inst_type = tableData.rows[1].cells[4].innerText;
        var tds_amt = tableData.rows[1].cells[5].querySelector('input').value;
        if (tds_amt == 0) {
            var changed_interest = "";
            var system_date1 = "";
        }
        else {
            var changed_interest = tds_amt;
            var system_date = new Date().toISOString().slice(0, 10);
            var parts = system_date.split("-"); // Split the date into an array ["yyyy", "mm", "dd"]
            var system_date1 = parts[2] + "-" + parts[1] + "-" + parts[0]; // Rearrange to "dd-mm-yyyy"

        }

        if (inst_type == 'Interest')
            inst_type_no = 2;
        else
            inst_type_no = 1;


        var input = loan12 + "µ" + inst_number + "µ" + inst_type_no + "µ" + changed_interest + "µ" + system_date1;


        var bankdetails = {
            Flag: "LoanRepaymentReq",
            PagVal: "bankbal",
            parVal: input,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        bankdetails = JSON.stringify(bankdetails);
        bankdetails = { "encryptedRqstStr": EncryptAPIReq(bankdetails) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", bankdetails, _loanrepayment.bankbalanceresponse, userdata.token);
    },
    bankbalanceresponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                var payed_amt = response.data.queryResult.QueryResult[0].Param1;
                jQuery('.page-loader-wrapper').hide();


                jQuery("#bllms").empty();
                jQuery("#bllms").val(payed_amt);


            }

        }



    },


    // ledger  balance in table 

    ledgerbal: function () {
        var loanss = jQuery('#ddlLoans :selected').text();
        var split1 = loanss.split("~");
        var loan = split1[1];
        var loan11 = loan.split("-");
        var loan12 = loan11[0];
        var ledgerbalanace = {
            Flag: "LoanRepaymentReq",
            PagVal: "ledgbal",
            parVal: loan12,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        ledgerbalanace = JSON.stringify(ledgerbalanace);
        ledgerbalanace = { "encryptedRqstStr": EncryptAPIReq(ledgerbalanace) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", ledgerbalanace, _loanrepayment.ledgerbalanceresponse, userdata.token);
    },
    ledgerbalanceresponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                var ledg = response.data.queryResult.QueryResult[0].Param1;
                jQuery('.page-loader-wrapper').hide();


                jQuery("#amtbalanace").empty();
                jQuery("#amtbalanace").val(ledg);


            }

        }



    },






    //table details
    getFromLoanDtls: function (InputData) {
        jQuery('.page-loader-wrapper').show();
        var fundtype = jQuery('#ddlFundType').val();
        if (fundtype != 9)

            Flag = 'getREpayTableNewLoanDtlsEmi';
        else
            Flag = 'getREpaycommerTableNewLoanDtlsEmi';

        var FromLoanDtls = {
            Flag: "LoanRepaymentReq",
            PagVal: Flag,
            parVal: InputData,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", FromLoanDtls, _loanrepayment.FillTable, userdata.token);

    },
    //FromLoanDtlsResponse: function (Response) {
    //    if (Response.data.message === "Success") {

    //        _loanrepayment.FillTable(Response);

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
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));
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

    ////2 table
    gettableDtls: function (InputData) {
        jQuery('.page-loader-wrapper').show();

        var loanid = jQuery('#ddlLoans').val();

        if (jQuery("#rbtInterest").prop("checked")) {
            var InputData = '1' + 'µ' + jQuery('#ddlmonths').val() + 'µ' + loanid + 'µ' + jQuery('#ddlyear').val();
        }
        else {
            var InputData = '2' + 'µ' + jQuery('#ddlmonths').val() + 'µ' + loanid + 'µ' + jQuery('#ddlyear').val();
        }

        var FromTableDtls = {
            Flag: "LoanRepaymentReq",
            PagVal: "GetIntRePaymentTbl1",
            parVal: InputData,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        FromTableDtls = JSON.stringify(FromTableDtls);
        FromTableDtls = { "encryptedRqstStr": EncryptAPIReq(FromTableDtls) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", FromTableDtls, _loanrepayment.FromtableLoanDtlsResponse, userdata.token);

    },

    FromtableLoanDtlsResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();
                jQuery('#maincards').show();
                //jQuery("#divTDSmainbnk").show();
                _loanrepayment.getTdsbankid();

                if (response.data.queryResult.QueryResult.length > 0) {

                    jQuery('#Fidatatabls').empty();
                    var i = 0;

                    //var val = response.data.queryResult.QueryResult[i].Param1;
                    for (var i = 0; i < response.data.queryResult.QueryResult.length; i++) {
                        var val = response.data.queryResult.QueryResult[i].Param1;
                        //jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                        var $row = jQuery('<tr/>');
                        var data1 = val.split("~");
                        amnt = data1[5];
                        $row.append(jQuery('<td><input type="checkbox"  id="chkbx' + i + 'm" name="Paymnt"  onclick="_loanrepayment.addIntrst(' + i + ')"/></td>'));


                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[3])); /*tdsamt*/
                        //$row.append(jQuery('<td align="center">').html('<input type="text" id="TDS_id" value=' + data1[4] + ' disabled onkeypress="return onlyNumberKey(event)" maxlength="4" onchange="_loanrepayment.addIntTDS(' + i + ')">'));
                        /*intamt*/
                        //$row.append(jQuery('<td align="center">').html('<input type="text" id="Record_id" value=' + data1[5] + ' disabled onkeypress="return onlyNumberKey(event)" maxlength="4"onchange="_loanrepayment.addamtdetails(' + i + ')">'));

                        //$row.append(jQuery('<td align="center">').html('<input type="text" id="' + i + 'TDS_id" value="' + data1[4] + '" disabled onkeypress="return onlyNumberKey(event)" maxlength="4" onchange="' + `${(isInterestChecked ? `_loanrepayment.addIntTDS(${i})` : "return _loanrepayment.addamtdetails()")}` + "\"/>"));
                        //$row.append(jQuery('<td align="center">').html('<input type="text" id="' + i + 'TDS_id" value="' + data1[4] + '" disabled onkeypress="return onlyNumberKey(event)" maxlength="4" onchange="' + `${(isInterestChecked ? `_loanrepayment.addamtdetails(${i})` : "return _loanrepayment.addIntTDS()")}` + "\"/>"));

                        $row.append(jQuery('<td align="center">').html('<input type="text" id="' + i + 'TDS_id" value=' + data1[4] + ' disabled onkeypress="return onlyNumberKey(event)" maxlength="12" onchange="_loanrepayment.addIntTDS(' + i + ')">'));
                        $row.append(jQuery('<td align="center">').html('<input type="text" name="interestamt" id="' + i + 'Record_id" value=' + data1[5] + '  onkeypress="return onlyNumberKey(event)"  onchange="_loanrepayment.addamtdetails(' + i + ')">'));



                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[8]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[9]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));

                        jQuery('#Fidatatabls').append($row);
                        //});
                    }
                }

            }
        }
    },

    addIntTDS: function (i) {


        debugger;
        var table;
        var tdsamnt;
        var intrAmnt;
        var j = i + 1;
        var tot = 0;
        //jQuery("#TDS_id").prop("disabled", true);
        jQuery("#TDS_id").prop("disabled", true);
        //if (jQuery("#txt_tds_amnt").val() == "")

        //else
        //    tot = parseFloat(jQuery("#txt_tds_amnt").val());
        var tableData = document.getElementById('tbldespatchs');//2 table

        var tdsamnt = tableData.rows[1].cells[5].querySelector('input').value;
        if (jQuery("#chkbx" + i + "m").prop("checked")) {
            tot = tot + parseFloat(tdsamnt);
            //tot = tot + tableData.rows[1].cells[5].querySelector('input').value;
            //jQuery("#' + i + 'TDS_id").prop("disabled", true);
        }
        else {
            tot = tot - tdsamnt;
            jQuery("#' + i + 'TDS_id").prop("disabled", true);
            jQuery("#' + i + 'TDS_id").val("0");
        }
        if (tdsamnt > 0) {
            //    jQuery("#divTDSmainbnk").show();
            //}
            //else {
            jQuery("#divTDSmainbnk").show();
            _loanrepayment.getTdsbankid();
            _loanrepayment.bankbalance();

        }
        jQuery("#txt_tds_amnt").val(tot);
        _loanrepayment.calcnetAmt();


    },

    addamtdetails: function (i) {
        // _loanrepayment.addIntrst(i)
        var tableData = document.getElementById('tbldespatchs');//2 table

        var tdsamt = tableData.rows[1].cells[5].querySelector('input').value;
        var interestamt = tableData.rows[1].cells[6].querySelector('input').value;


        jQuery("#txtPayAmount").html(interestamt);
        jQuery("#txtPayAmount").val(interestamt);
        jQuery("#txt_tot").html(interestamt);
        jQuery("#txt_tot").val(interestamt);
        jQuery("#txt_net_amnt").html(interestamt);
        jQuery("#txt_net_amnt").val(interestamt);
        jQuery("#txtTotalAmount").html(interestamt);
        //jQuery("#txtTotalAmount").val(0);

        if (jQuery("#rbtInterest").prop("checked")) {

            debugger;
            var total = 0;
            var tds = jQuery("#txt_tds_amnt").val();
            jQuery("#tblPrincpleIntDtl input[type=checkbox]:checked").each(function () {
                var row = jQuery(this).closest("tr")[0];
                if (jQuery("#rbtInterest").prop("checked")) {
                    var tableData = document.getElementById('tbldespatchs');//2 table

                    var tdsamt = tableData.rows[1].cells[5].querySelector('input').value;


                    var interestamt = tableData.rows[1].cells[6].querySelector('input').value;

                    total = total + parseFloat(tableData.rows[1].cells[5].querySelector('input').value);
                    jQuery("#txt_tot").val(total.toFixed(2));
                    jQuery("#txtPayAmount").val(total.toFixed(2));
                    if (tds == "") {
                        tds = 0;
                    }
                    var net_amnt = parseFloat(total) + parseFloat(tds);
                    jQuery("#txt_net_amnt").val(net_amnt);
                    //row.cells[6].childNodes[0].readOnly = false;
                }
                else {
                    total = total + parseFloat(tableData.rows[1].cells[5].querySelector('input').value);
                    jQuery("#txt_tot").val(total.toFixed(2));
                    jQuery("#txtPayAmount").val(total.toFixed(2));
                    if (tds == "") {
                        tds = 0;
                    }
                    var net_amnt = parseFloat(total) + parseFloat(tds);
                    jQuery("#txt_net_amnt").val(net_amnt);
                    //row.cells[6].childNodes[0].readOnly = true;
                }


            });
            _loanrepayment.calcnetAmt();

        }

        else if (jQuery("#rbtPrinciple").prop("checked")) {

            debugger;
            var table;
            var tdsamnt;
            var intrAmnt;
            var j = i + 1;
            var tot = 0;
            if (jQuery("#txt_tds_amnt").val() == "")
                tot = 0;
            else
                tot = parseFloat(jQuery("#txt_tds_amnt").val());
            //table = document.getElementById('tblPrincpleIntDtl');
            //tdsamnt = parseFloat(table.rows[j].cells[6].childNodes[0].value);
            var tableData = document.getElementById('tbldespatchs');//2 table

            //var tdsamnt = tableData.rows[i].cells[5].querySelector('input').value;
            var tdsamnt = 0;

            if (jQuery("#chkbx" + i + "m").prop("checked")) {
                //tot = parseFloat(tot) + parseFloat(tdsamnt);
                jQuery("#TDS_id" + i).prop("disabled", true);
            }
            else {
                tot = parseFloat(tot) - parseFloat(tdsamnt);
                jQuery("#TDS_id" + i).prop("disabled", true);
                jQuery("#TDS_id" + i).val("0");
            }
            if (tdsamnt > 0) {
                //    jQuery("#divTDSmainbnk").hide();
                //}
                //else {
                jQuery("#divTDSmainbnk").show();
            }
            // $("#txt_tds_amnt").val(tot);
            var amt = jQuery("#txtPayAmount").val();
            // $("#txtTotalAmount").val(amt);
            _loanrepayment.calcnetAmt();


        }



    },








    calcnetAmt: function (i) {

        debugger;
        var amount = jQuery("#txt_tot").val();
        var tdsamnt = jQuery("#txt_tds_amnt").val();
        if (tdsamnt == "") {
            tdsamnt = 0;
        }
        var netAmnt = parseFloat(amount) - parseFloat(tdsamnt);
        jQuery("#txt_net_amnt").val(netAmnt);
        jQuery("#txtTotalAmount").val(netAmnt.toFixed(2));

        if (tdsamnt > 0) {
            //    jQuery("#divTDSmainbnk").hide();
            //}
            //else {
            jQuery("#divTDSmainbnk").show();
        }
    },




    addIntrst: function (i) {
        // _loanrepayment.ledgerbal();
        _loanrepayment.bankbalance();



        if ((jQuery("#rbtInterest").prop("checked"))) {


            if (jQuery("#txt_tot").val() == "") {
                tot = 0;
            }
            else {
                tot = parseFloat(jQuery("#txt_tot").val());
            }

            var tdsSelector = '#' + i + 'TDS_id';
            var recordSelector = '#' + i + 'Record_id';

            /*var idchk = '#' + 'chkbx' + i + 'm';
            if (jQuery(idchk).is(':checked')) {

                jQuery(tdsSelector).prop('disabled', false);
                jQuery(recordSelector).prop('disabled', false);
            }
            else {
                jQuery(tdsSelector).prop('disabled', true);
                jQuery(recordSelector).prop('disabled', true);
            }*/
            jQuery(tdsSelector).prop('disabled', false);
            // jQuery(recordSelector).prop('disabled', false);
            var tableData = document.getElementById('tbldespatchs');//2 table

            var tdsamt = tableData.rows[i + 1].cells[5].querySelector('input').value;
            var interestamt = tableData.rows[i + 1].cells[6].querySelector('input').value;


            jQuery("#txtPayAmount").html(interestamt);
            jQuery("#txtPayAmount").val(interestamt);
            jQuery("#txt_tot").html(interestamt);
            jQuery("#txt_tot").val(interestamt);
            jQuery("#txt_net_amnt").html(interestamt);
            jQuery("#txt_net_amnt").val(interestamt);
            jQuery("#txtTotalAmount").html(interestamt);
            jQuery("#txtTotalAmount").val(0);

        }
        if ((jQuery("#rbtPrinciple").prop("checked"))) {

            if (jQuery("#txt_tot").val() == "") {
                tot = 0;
            }
            else {
                tot = parseFloat(jQuery("#txt_tot").val());
            }

            var tdsSelector = '#' + i + 'TDS_id';
            var recordSelector = '#' + i + 'Record_id';

            jQuery(tdsSelector).prop('disabled', false);
            jQuery(recordSelector).prop('disabled', false);


            //jQuery("#TDS_id").prop("disabled", false);
            //jQuery("#Record_id").prop("disabled", false);


            var tableData = document.getElementById('tbldespatchs');//2 table

            var tdsamt = tableData.rows[i + 1].cells[5].querySelector('input').value;
            var interestamt = tableData.rows[i + 1].cells[6].querySelector('input').value;




            jQuery("#txtPayAmount").html(interestamt);
            jQuery("#txtPayAmount").val(interestamt);
            jQuery("#txt_tot").html(interestamt);
            jQuery("#txt_tot").val(interestamt);
            jQuery("#txt_net_amnt").html(interestamt);
            jQuery("#txt_net_amnt").val(interestamt);
            jQuery("#txtTotalAmount").html(interestamt);
            jQuery("#txtTotalAmount").val(0);


        }



    },


    //paymentautobank: function () {
    //    const selectElement = document.getElementById("ddlPaymentType");
    //    const divElement = document.getElementById("divpaymentbank");

    //    if (selectElement.value === "automatic") {
    //        jQuery("#divpaymentbank").show();

    //        /*divElement.style.display = "block";*/
    //    //} else {
    //    //    divElement.style.display = "none";
    //    }
    //},






    addAmount: function () {

        var inputElement = jQuery('input[type="text"][name="interestamt"]');
        // var inputId = inputElement.attr('id');

        var element = jQuery('#txtPayAmount').val();
        var inputElement = jQuery('input[type="text"][name="interestamt"]');
        var inputId = inputElement.attr('id');
        var ins = jQuery('#' + inputId).val();
        var diff = element - amnt;
        jQuery("#balance").val(diff);
        //var inId = element.attr('id');
        //var diff = inId - inputId;

        if (jQuery("#txtPayAmount").val() == "") {
            swal("", "Please Enter Amount!", "error");
            return false;
        }



        //if (jQuery("#txt_tds_amnt").val() == "") {
        //    jQuery("#txt_tds_amnt").val(0)
        //}
        //if (jQuery("#txtTotalAmount").val() == "") {
        //    jQuery("#txtTotalAmount").val(0);

        //    ToTAmnt = parseFloat(jQuery("#txtPayAmount").val()) + parseFloat(jQuery("#txtTotalAmount").val()) - parseFloat(jQuery("#txt_tds_amnt").val());
        //    jQuery("#txtTotalAmount").val(ToTAmnt);
        //}
        //else {
        //    ToTAmnt = parseFloat(jQuery("#txtPayAmount").val()) + parseFloat(jQuery("#txtTotalAmount").val()) - parseFloat(jQuery("#txt_tds_amnt").val());
        //    jQuery("#txtTotalAmount").val(ToTAmnt);
        //}

        //jQuery("#txtPayAmount").val('');


    },

    submitevalue: function (i) {

        if (_loanrepayment.checkvalues(i)) {

            var tableData = document.getElementById('tbldespatchs');//2 table

            var check = tableData.rows[1].cells[0].innerText;
            var loanid = tableData.rows[1].cells[1].innerText;
            var installment = tableData.rows[1].cells[2].innerText;
            var fiint = tableData.rows[1].cells[3].innerText;
            var paytype = tableData.rows[1].cells[4].innerText;
            var tdsamt = tableData.rows[1].cells[5].querySelector('input').value;
            var amount = tableData.rows[1].cells[6].querySelector('input').value;
            var fromdate = tableData.rows[1].cells[7].innerText;
            var Todate = tableData.rows[1].cells[8].innerText;
            var paydate = tableData.rows[1].cells[9].innerText;
            var loanacc = tableData.rows[1].cells[10].innerText;
            var zerotds = "";
            //var ledgerbalance = jQuery("#balance").val();
            var bal = jQuery('#balance').val()
            /*var llamt = jQuery('#amtbalanace').val()*/
            var llamt = 0
            var totalamt = parseInt(llamt) + parseInt(bal);
            var paymentamt = jQuery('#txtTotalAmount').val()



            if ((jQuery("#rbtInterest").prop("checked"))) {
                paytype = 2;
                if (tdsamt > 0) {
                    var tblAmntData = loanid + "µ" + amount + "µ" + userdata.userId + "µ" + installment + "µ" + Todate + "µ" + paytype + "µ" + tdsamt + "µ" + jQuery('#ddl_TDS_main_bnk').val() + "µ" + jQuery('#ddl_mainAcc').val() + "µ" + jQuery('#ddl_SubAcc').val() + "µ" + jQuery('#ddlPaymentType').val() + "µ" + jQuery('#ddlPaymentBank').val() + "µ" + totalamt + "µ" + paymentamt + "¥";
                    //  var tblAmntData = tblAmntData + table.rows[i].cells[1].innerText + "µ" + table.rows[i].cells[6].childNodes[0].value + "µ" + $("[id*=hdUserId]").val() + "µ" + table.rows[i].cells[2].innerText + "µ" + $('#hdn' + j).val() + "µ" + paytype + "µ" + $('#txt_tds_amnt').val() + "µ" + $('#ddl_TDS_main_bnk').val() + "µ" + $('#ddl_mainAcc').val() + "µ" + $('#ddl_SubAcc').val() + "¥";
                }
                else {
                    var tblAmntData = loanid + "µ" + amount + "µ" + userdata.userId + "µ" + installment + "µ" + Todate + "µ" + paytype + "µ" + tdsamt + "µ" + zerotds + "µ" + jQuery('#ddl_mainAcc').val() + "µ" + jQuery('#ddl_SubAcc').val() + "µ" + jQuery('#ddlPaymentType').val() + "µ" + jQuery('#ddlPaymentBank').val() + "µ" + totalamt + "µ" + paymentamt + "¥";

                }
            }
            if ((jQuery("#rbtPrinciple").prop("checked"))) {
                paytype = 1;
                if (tdsamt > 0) {
                    tblAmntData = loanid + "µ" + amount + "µ" + userdata.userId + "µ" + installment + "µ" + Todate + "µ" + paytype + "µ" + tdsamt + "µ" + jQuery('#ddl_TDS_main_bnk').val() + "µ" + jQuery('#ddl_mainAcc').val() + "µ" + jQuery('#ddl_SubAcc').val() + "µ" + jQuery('#ddlPaymentType').val() + "µ" + jQuery('#ddlPaymentBank').val() + "µ" + totalamt + "µ" + paymentamt + "¥";
                }
                else {
                    tblAmntData = loanid + "µ" + amount + "µ" + userdata.userId + "µ" + installment + "µ" + Todate + "µ" + paytype + "µ" + tdsamt + "µ" + zerotds + "µ" + jQuery('#ddl_mainAcc').val() + "µ" + jQuery('#ddl_SubAcc').val() + "µ" + jQuery('#ddlPaymentType').val() + "µ" + jQuery('#ddlPaymentBank').val() + "µ" + totalamt + "µ" + paymentamt + "¥";

                }
            }



            var submitRequest = {



                Flag: "REPAYMENT_REQ",
                ParVal: tblAmntData,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };
            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _loanrepayment.SubmitReturn, userdata.token)
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
                            title: "Already Requested....!",
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
    checkvalues: function (i) {
        var FundType = jQuery('#ddlFundType').val();
        var fintype = jQuery('#ddlFincialType').val();
        var loan = jQuery('#ddlLoans').val();
        var month = jQuery('#ddlmonths').val();
        var year = jQuery('#ddlyear').val();
        var mainacc = jQuery('#ddl_mainAcc').val();
        var subacc = jQuery('#ddl_SubAcc').val();
        var tdssubbid = jQuery('#ddl_TDS_main_bnk').val();
        var payment = jQuery('#ddlPaymentType').val();
        var bank = jQuery('#ddlPaymentBank').val();

        var tmnt = '#' + i + 'TDS_id';
        var tdsp = jQuery(tmnt).val();

        if (FundType == 0) {
            swal("", "Please Select Fund Type", "error");
            return false;
        }
        else if (fintype == 0) {
            swal("", "Please select Financial Institution Name", "error");
            return false;
        }
        else if (loan == 0) {
            swal("", "Please select Loan", "error");
            return false;
        }


        else if (jQuery("#rbtCp").prop("checked") == false && jQuery("#rbtOther").prop("checked") == false) {
            swal("", "Please select an Option commercial papper and Other..!", "error");
            return false;
        }
        else if (jQuery("#rbtInterest").prop("checked") == false && jQuery("#rbtPrinciple").prop("checked") == false) {
            swal("", "Please select an Option Interest /principal..!", "error");
            return false;
        }
        else if (month == 0) {
            swal("", "Please select month", "error");
            return false;
        }
        else if (year == 0) {
            swal("", "Please select year", "error");
            return false;
        }
        /*else if (j == 0) {
            swal("", "Please select checkbox", "error");
            return false;
        }*/

        /* else if (!jQuery("#chkbx" + i + "m").prop("checked")) {
             swal("", "Please select checkbox", "error");
             return false;
         }*/
        else if (jQuery("#txt_tot").val() == 0) {
            swal("", "Please select checkbox", "error");
            return false;
        }


        else if (tdsp == '') {
            swal("", "Please enter tds amount", "error");
            return false;
        }

        else if (mainacc == 0) {
            swal("", "Please select main Account", "error");
            return false;
        }

        //jQuery("#yourDropdown").is(":visible");
        else if (tdssubbid > 0 && jQuery("#divTDSmainbnk").prop("checked") == false) {
            swal("", "Please select tds sub bank id", "error");
            return false;
        }


        /*else if (tdssubbid == 0) {
            swal("", "Please select tds sub bank id", "error");
            return false;
        }*/
        else if (subacc == 0) {
            swal("", "Please select sub Account", "error");
            return false;
        }
        else if (buttonClicked == false) {
            swal("", "Please click the Add Button", "error");
            return false;
        }
        else if (payment == 0) {
            swal("", "Please Select Payment Type ", "error");
            return false;
        }
        else if (bank == 0 && payment === 'automatic') {


            swal("", "Please Select Payment Bank ", "error");
            return false;
        }

        else
            return true;
    }


}

jQuery(document).ready(function () {


    jQuery("#divPrincInter").hide();
    jQuery("#divAmount").hide();
    jQuery("#btnAdd").hide();
    jQuery("#DivMainAcc").hide();
    //jQuery("#divpaymentbank").hide();


    //$("#divTotal").hide();
    //$("#divTDSAmount").hide();
    //$("#divNetAmount").hide();
    //$("#divpayAmnt").hide();

    jQuery('.page-loader-wrapper').hide();
    // _loanrepayment.loadFundType();
    _loanrepayment.tokenValidate();

});
jQuery("#ddlFundType").on("change", function () {

    //jQuery("#ddlLoans").empty();

    var fundtype = jQuery("#ddlFundType").val();
    _loanrepayment.Fincialins(fundtype);
    jQuery("#ddlFincialType").empty();
    //jQuery("#ddlFincialType").append(jQuery("<option></option>").val("0").text("  --------CHOOSE FI TYPE--------  "));
    jQuery("#ddlLoans").empty();
    jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text("  --------SELECT LOAN--------  "));
    jQuery("#maincard").hide();

    jQuery("#showcorddiv").hide();



});


jQuery("#ddlFincialType").on("change", function () {

    var InputData = jQuery("#ddlFundType").val() + "µ" + jQuery("#ddlFincialType").val()
    _loanrepayment.selectLoan(InputData);
    jQuery("#maincard").hide();
    jQuery("#showcorddiv").hide();



});
//jQuery("#automaticid").on("change", function () {
//     //jQuery("#divpaymentbank").show();
//    _loanrepayment.paymentautobank();

//});

jQuery("#ddlPaymentType").on("change", function () {

    paymenttype = jQuery('#ddlPaymentType').val();

    if (paymenttype == 'automatic') {

        jQuery("#divpaymentbank").show();
        _loanrepayment.paymentbank();

    } else {

        jQuery("#divpaymentbank").hide();

    }
});



jQuery("#ddlLoans").on("change", function () {
    jQuery("#maincard").show();
    jQuery("#showcorddiv").show();
    var InputData = jQuery("#ddlLoans").val();
    _loanrepayment.getFromLoanDtls(InputData);
});


jQuery("#showcorddiv").on("change", function () {

    jQuery("#divPrincInter").show();

});

jQuery("#divPrincInter").on("change", function () {

    jQuery("#divmnth").show();
    _loanrepayment.DivMnth();

    //var selectedValue = jQuery("#rbinterest:checked").val();
    //if (selectedValue == 'interest') {
    if ((jQuery("#rbtInterest").prop("checked"))) {
        jQuery("#divbllms").show();
    }
    else {
        jQuery("#divbllms").hide();
    }


});

jQuery("#divmnth").on("change", function () {
    jQuery("#divyear").show();
    _loanrepayment.Divyear();

});

jQuery("#divyear").on("change", function () {

    _loanrepayment.gettableDtls();

    jQuery("#divAddAccount").show();

    jQuery("#DivMainAcc").show();
    jQuery("#divAmount").show();
    jQuery("#txtfield").show();
    jQuery("#btnAdd").show();
    // $("#divTotal").show();
    jQuery("#divtblPrincpleIntDtl").show();
    jQuery("#txtfield").show();
    _loanrepayment.getBnkIDdtl();


    if (jQuery("#txt_tds_amnt").val() == "") {
        jQuery("#txt_tds_amnt").val(0)
    }
    if (jQuery("#txtTotalAmount").val() == "") {
        jQuery("#txtTotalAmount").val(0);
    }
});


jQuery("#ddl_mainAcc").on("change", function () {

    jQuery("#ddlsubacsts").show();

    _loanrepayment.getSubBnkDtl();
    /* _loanrepayment.paymentbank();*/
});

jQuery("#btnAdd").on("click", function () {


    buttonClicked = true;
    _loanrepayment.addAmount();
    //_loanrepayment.bankdetails();





});

//jQuery("#TDS_id").on("change", function () {

//    jQuery("#divTDSmainbnk").show();

//    _loanrepayment.getTdsbankid();
//});

jQuery("#bhnk").on("change", function () {
    jQuery("#code").prop('disabled', false);
    jQuery("#ifsc").prop('disabled', false);

});


jQuery("#btnConf").on("click", function () {


    if (jQuery('input[type="checkbox"][name="Paymnt"]').prop('checked')) {
        var textid = jQuery('input[type="checkbox"][name="Paymnt"]').attr('id');
        var mt = textid.match(/\d+/);
        if (mt) {
            var numVal = mt[0];
        }
    }
    _loanrepayment.submitevalue(numVal);
});
jQuery('#btnExit').on("click", function () {
    window.open("Dashboard", "_self");
});




function onlyNumberKey(evt) {

    // Only ASCII charactar in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    // alert(ASCIICode);
    if ((ASCIICode > 31 && (ASCIICode < 46 || ASCIICode > 57)) || ASCIICode == 47)
        return false;
    return true;
}

