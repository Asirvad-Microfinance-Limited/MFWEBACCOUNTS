var OtherCharges = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, OtherCharges.checkAccessRtn, token)
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
                    OtherCharges.loadSelectFinancialInstitution();
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


    // Token validation


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


    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, OtherCharges.checkAccessToken, userdata.token)
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
            OtherCharges.loadSelectFinancialInstitution();
        }


    }
    },

    //Select Financial Institution
    loadSelectFinancialInstitution: function () {
        jQuery('.page-loader-wrapper').show();
        var DebSelectFinancialInstitution = {
            Flag: "BankCharges",
            PagVal: "FeeFILoad",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebSelectFinancialInstitution = JSON.stringify(DebSelectFinancialInstitution);
        DebSelectFinancialInstitution = { "encryptedRqstStr": EncryptAPIReq(DebSelectFinancialInstitution) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DebSelectFinancialInstitution, OtherCharges.FillDebSelectFinancialInstitution, userdata.token);

    },
    FillDebSelectFinancialInstitution: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_fI").empty();
                jQuery("#ddl_fI").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FINACIAL INSTITUTION-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_fI").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });


            }
            else {

                jQuery("#ddl_fI").empty();
                jQuery("#ddl_fI").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FINACIAL INSTITUTION-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Select Fund
    loadSelectFund: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var DebSelectFund = {
            Flag: "BankCharges",
            PagVal: "OthFeeFund",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebSelectFund = JSON.stringify(DebSelectFund);
        DebSelectFund = { "encryptedRqstStr": EncryptAPIReq(DebSelectFund) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DebSelectFund, OtherCharges.FillDebSelectFund, userdata.token);

    },
    FillDebSelectFund: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_Loan").empty();
                jQuery("#ddl_Loan").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FUND-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_Loan").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_Loan").empty();
                jQuery("#ddl_Loan").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FUND-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },




    //table

    getFromLoanDtls: function () {
        jQuery('.page-loader-wrapper').show();
        // var sub = jQuery("#ddl_Reqst").val();
        var M = jQuery('#ddl_Loan').val();
        var centerSplit = M.split('~');
        var sub = centerSplit[0];
        //var loanlimit = centerSplit[1];

        var FromLoanDtls = {
            Flag: "BankCharges",
            PagVal: "GetFUNDDTL",
            parVal: sub,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", FromLoanDtls, OtherCharges.FillTable, userdata.token);

    },
    //FromLoanDtlsResponse: function (Response) {
    //    if (Response.status === "SUCCESS") {

    //        OtherCharges.FillTable(Response);

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
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[5]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[8]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[9]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[10]));

                        jQuery('#Fidatatabl').append($row);
                    });
                }
            }

        }
    },




    //BankAccount
    loadBankAccount: function () {
        jQuery('.page-loader-wrapper').show();
        var DebBankAccount = {
            Flag: "BankCharges",
            PagVal: "GetMainBnkAC",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebBankAccount = JSON.stringify(DebBankAccount);
        DebBankAccount = { "encryptedRqstStr": EncryptAPIReq(DebBankAccount) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DebBankAccount, OtherCharges.FillDebBankAccount, userdata.token);

    },
    FillDebBankAccount: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_mainAcc").empty();
                jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BANK ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_mainAcc").empty();
                jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BANK ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //BankSubAccount
    loadBankSubAccount: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var DebBankSubAccount = {
            Flag: "BankCharges",
            PagVal: "GetSubBnkAcc",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebBankSubAccount = JSON.stringify(DebBankSubAccount);
        DebBankSubAccount = { "encryptedRqstStr": EncryptAPIReq(DebBankSubAccount) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DebBankSubAccount, OtherCharges.FillDebBankSubAccount, userdata.token);

    },
    FillDebBankSubAccount: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_SubAcc").empty();
                jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BANK SUB ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_SubAcc").empty();
                jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BANK SUB ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },




    //ContraMainAccount
    loadContraMainAccountt: function () {
        jQuery('.page-loader-wrapper').show();
        var DebContraMainAccount = {
            Flag: "BankCharges",
            PagVal: "GetMainContraAcc",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebContraMainAccount = JSON.stringify(DebContraMainAccount);
        DebContraMainAccount = { "encryptedRqstStr": EncryptAPIReq(DebContraMainAccount) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DebContraMainAccount, OtherCharges.FillDebContraMainAccount, userdata.token);

    },
    FillDebContraMainAccount: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_contramainAcc").empty();
                jQuery("#ddl_contramainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE CONTRA MAIN ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_contramainAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_contramainAcc").empty();
                jQuery("#ddl_contramainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE CONTRA MAIN ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //ContraSubAccount
    loadContraSubAccount: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var DebContraSubAccount = {
            Flag: "BankCharges",
            PagVal: "GetSubBnkAcc",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebContraSubAccount = JSON.stringify(DebContraSubAccount);
        DebContraSubAccount = { "encryptedRqstStr": EncryptAPIReq(DebContraSubAccount) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DebContraSubAccount, OtherCharges.FillDebContraSubAccount, userdata.token);

    },
    FillDebContraSubAccount: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_contraSubAcc").empty();
                jQuery("#ddl_contraSubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE CONTRA SUB ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_contraSubAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_contraSubAcc").empty();
                jQuery("#ddl_contraSubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE CONTRA SUB ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },




    //Contra No
    loadContraNo: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var DebContraNo = {
            Flag: "BankCharges",
            PagVal: "GetContraID",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebContraNo = JSON.stringify(DebContraNo);
        DebContraNo = { "encryptedRqstStr": EncryptAPIReq(DebContraNo) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DebContraNo, OtherCharges.FillDebContraNo, userdata.token);

    },
    FillDebContraNo: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_contraFIID").empty();
                jQuery("#ddl_contraFIID").append(jQuery("<option></option>").val("0").text(" --------CHOOSE CONTRA NO-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_contraFIID").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_contraFIID").empty();
                jQuery("#ddl_contraFIID").append(jQuery("<option></option>").val("0").text(" --------CHOOSE CONTRA NO-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //TDSAccount
    loadTDSAccount: function () {
        jQuery('.page-loader-wrapper').show();
        var DebTDSAccount = {
            Flag: "BankCharges",
            PagVal: "GetMainTDSAC",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebTDSAccount = JSON.stringify(DebTDSAccount);
        DebTDSAccount = { "encryptedRqstStr": EncryptAPIReq(DebTDSAccount) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DebTDSAccount, OtherCharges.FillDebTDSAccount, userdata.token);

    },
    FillDebTDSAccount: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_maintds").empty();
                jQuery("#ddl_maintds").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_maintds").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_maintds").empty();
                jQuery("#ddl_maintds").append(jQuery("<option></option>").val("0").text(" --------CHOOSETDS ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //TDSSubAccount
    loadTDSSubAccount: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var DebTDSSubAccount = {
            Flag: "BankCharges",
            PagVal: "GetSubTDSAC",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebTDSSubAccount = JSON.stringify(DebTDSSubAccount);
        DebTDSSubAccount = { "encryptedRqstStr": EncryptAPIReq(DebTDSSubAccount) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DebTDSSubAccount, OtherCharges.FillDebTDSSubAccount, userdata.token);

    },
    FillDebTDSSubAccount: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_tdsSubAcc").empty();
                jQuery("#ddl_tdsSubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS SUB ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_tdsSubAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_tdsSubAcc").empty();
                jQuery("#ddl_tdsSubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS SUB ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


        //New ProcFeeNew popup
        checkvalues: function () {

            if (jQuery("#ddl_fI").val() == "0") {
                swal("Please Select Financial Institution...!!!");
                return false;
            }
            else if (jQuery("#ddl_Loan").val() == "0") {
                swal("Please Select Fund...!!!");
                return false;
            }
            else if (jQuery("#radigst").prop("checked") == false && jQuery("#radsgst").prop("checked") == false) {
                swal("Please select an Option - Other Charges With IGST/Other Charges WithSGST & CGST..!");
                //alert("Please select an Option");
                return false;
            }
            else if (jQuery("#txt_docfee").val() == "") {
                swal("Please Enter Other Fee...!!!");
                return false;
            }
            else if (jQuery("#ddl_mainAcc").val() == "0" && jQuery("#radNo").prop("checked") == true) {
                swal("Please Select Main Bank Account...!!!");
                return false;
            }
            else if (jQuery("#ddl_SubAcc").val() == "0" && jQuery("#radNo").prop("checked") == true) {
                swal("Please Select Sub Bank Account...!!!");
                return false;
            }

            else if (jQuery("#ddl_contramainAcc").val() == "0") {
                swal("Please Select Main Contra Account...!!!");
                return false;
            }
            else if (jQuery("#ddl_contraSubAcc").val() == "0") {
                swal("Please Select Sub Contra Account...!!!");
                return false;
            }
            else if (jQuery("#radYes").prop("checked") == false && jQuery("#radNo").prop("checked") == false) {
                swal("Please select an Option - Yes/No..!");
                //alert("Please select an Option");
                return false;
            }
            else if (jQuery("#radYes").prop("checked") == true && jQuery("#txt_ifsc").val() == "") {

                swal("Please Enter IFSC Code...!!!");
                return false;
            }

            else if (jQuery("#radYes").prop("checked") == true && jQuery("#txt_Accnumber").val() == "") {
                swal("Please Enter Bank Account Number...!!!");
                return false;
            }
            else if (jQuery("#radYes").prop("checked") == true && jQuery("#txt_Accname").val() == "") {
                swal("Please Enter Beneficiary Name...!!!");
                return false;
            }
            else if (jQuery("#radYes").prop("checked") == true && jQuery("#txt_Mobnumber").val() == "") {
                swal("Please Enter Mobile  Number...!!!");
                return false;
            }
            else if (jQuery("#txt_pjt").val() == "") {
                swal("Please Enter Project Code...!!!");
                return false;
            }
            else if (jQuery("#ddl_contraFIID").val() == "0") {
                swal("Please Select Contra Number...!!!");
                return false;
            }
            else if (jQuery("#radAppr").prop("checked") == false && jQuery("#radRjct").prop("checked") == false) {
                swal("Please select an Option - With TDS/Without TDS..!");
                return false;
            }
            else if (jQuery("#radAppr").prop("checked") == true && jQuery("#ddl_maintds").val() == "0") {
                swal("Please Select TDS Main Account...!!!");
                return false;
            }
            else if (jQuery("#radAppr").prop("checked") == true && jQuery("#ddl_tdsSubAcc").val() == "0") {
                swal("Please Select TDS Sub Account...!!!");
                return false;
            }
            else if (jQuery("#radAppr").prop("checked") == true && jQuery("#txt_tds").val() == "") {
                swal("Please Enter TDS Amount...!!!");
                return false;
            }
            else {
                return true;
            }

        },

 

    submitevalue: function () {
        if (OtherCharges.checkvalues()) {
            var OthFeeType, paymode, mainac, subac, tdsmain, tdssub, tdsamnt;
            if (jQuery("#radigst").prop("checked") == true) {

                OthFeeType = 1;
            }
            if (jQuery("#radigst").prop("checked") == true) {

                OthFeeType = 0;
            }
            if (jQuery("#radYes").prop("checked")) {
                paymode = 1;
                mainac = 0;
                subac = 0;
            }
            if (jQuery("#radNo").prop("checked")) {
                paymode = 0;
                mainac = jQuery("#ddl_mainAcc").val();
                subac = jQuery("#ddl_SubAcc").val()
            }
            if (jQuery("#radAppr").prop("checked")) {
                tdsmain = jQuery("#ddl_maintds").val();
                tdssub = jQuery("#ddl_tdsSubAcc").val();
                tdsamnt = jQuery("#txt_tds").val();

            }
            if (jQuery("#radRjct").prop("checked")) {
                tdsmain = 0;
                tdssub = 0;
                tdsamnt = 0;

            }
            var InputData = OthFeeType + "µ" + jQuery("#ddl_Loan").val() + "µ" + jQuery("#txt_docfee").val() + "µ" + mainac + "µ" + subac + "µ" + jQuery("#ddl_contramainAcc").val() + "µ" + jQuery("#ddl_contraSubAcc").val() + "µ" + jQuery("#ddl_contraFIID").val() + "µ" + userdata.userId + "µ" + jQuery("#txt_ifsc").val() + "µ" + jQuery("#txt_Accnumber").val() + "µ" + jQuery("#txt_Mobnumber").val() + "µ" + jQuery("#txt_Accname").val() + "µ" + paymode + "µ" + jQuery("#txt_pjt").val() + "µ" + tdsmain + "µ" + tdssub + "µ" + tdsamnt;


            var submitRequest = {

                Flag: "OTHERFEE",
                ParVal: InputData,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };
            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, OtherCharges.SubmitReturn, userdata.token)


        }
    },
    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                var msg = jQuery.trim(response.data.message);
                //var msg = String.prototype.trim(response.data.message);

                if (response.status === "SUCCESS") {
                    var msg = jQuery.trim(response.data.message);
                    //var msg = String.prototype.trim(response.data.message);
                    //  alert(response.data.errStatus);
                    if (response.data.responseMsg = "SUCCESS") {
                        swal({
                            title: "Requested Successfully!",
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
    VerifyIFSC: function () {
        var Ifscode = jQuery('#txt_ifsc').val();

        var VIfsc = {

            ifsc: Ifscode

        };
        VIfsc = JSON.stringify(VIfsc);
        VIfsc = { "encryptedRqstStr": EncryptAPIReq(VIfsc) };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/banks/searchifsc", VIfsc, OtherCharges.FillIfsc, userdata.token);
    },
    FillIfsc: function (response) {


        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

            }
            else {
                swal("", "Please Enter Correct IFSC Code", "error");

                jQuery("#txt_ifsc").val("");
                jQuery("#txt_ifsc").focus();
            }
        }
    },
    error: function (xhr) {
        swal("", "Please Enter Correct IFSC Code", "error");
        jQuery("#txt_ifsc").val("");
        jQuery("#txt_ifsc").focus();
    },

    VerifyMob: function () {
        var phone = jQuery("#txt_Mobnumber").val();
        var phlength = phone.length;

        if (phlength < "10") {
            swal("", "Please enter correct mobile number", "error");
            jQuery("#txt_Mobnumber").val("");
            jQuery("#txt_Mobnumber").focus();
            return false;
        }
    },
}

   
jQuery(document).ready(function () {

   // OtherCharges.loadSelectFinancialInstitution();
   
    OtherCharges.tokenValidate();


    OtherCharges.loadBankAccount();

    OtherCharges.loadContraMainAccountt();

    OtherCharges.loadTDSAccount();

    jQuery('#ddl_fI').on("change", function () {
        jQuery("#sclfnd").show();
        var indata = jQuery("#ddl_fI").val();

        OtherCharges.loadSelectFund(indata);
    });

    jQuery('#ddl_Loan').on("change", function () {
        //$("#showcorddiv").show();
        //$("#divmethod").show();

        OtherCharges.getFromLoanDtls();
    });
    jQuery('#radYes').on("click", function () {
        jQuery('#DivBank').show();
        jQuery("#divmainbank").hide();

    });
    jQuery('#radNo').on("click", function () {
        jQuery('#divmainbank').show();
        jQuery('#DivBank').hide();

    });
    jQuery('#ddl_mainAcc').on("change", function () {
        jQuery("#ddlsubacBNK").show();
        var indata = jQuery("#ddl_mainAcc").val();

        OtherCharges.loadBankSubAccount(indata);
    });
    jQuery('#ddl_contramainAcc').on("change", function () {
        jQuery("#ddlcontrasub").show();
        var indata = jQuery("#ddl_contramainAcc").val();

        OtherCharges.loadContraSubAccount(indata);     
    });

    jQuery('#txt_pjt').on("change", function () {
        jQuery("#ddlcontraIsubID").show();
        var indata = jQuery("#ddl_contramainAcc").val() + 'µ' + jQuery("#ddl_contraSubAcc").val() + 'µ' + jQuery("#txt_pjt").val();

        OtherCharges.loadContraNo(indata);
    });
    jQuery('#ddl_contraSubAcc').on("change", function () {
        jQuery('#divpjt').show();

    });
    jQuery('#radAppr').on("click", function () {
        jQuery('#tdsdiv').show();
    });
    jQuery('#radRjct').on("click", function () {
        jQuery('#tdsdiv').hide();
    });
    jQuery('#ddl_maintds').on("change", function () {
        jQuery("#tsat").show();
        var indata = jQuery("#ddl_maintds").val();

        OtherCharges.loadTDSSubAccount(indata);
    });
    jQuery('#btnConf').on("click", function () {
        OtherCharges.submitevalue();
    });

    jQuery('#txt_ifsc').on("change", function () {
        OtherCharges.VerifyIFSC();
    });
    jQuery('#txt_Mobnumber').on("change", function () {
        OtherCharges.VerifyMob();
    });
    jQuery('#ddl_Loan').on("change", function () {
        jQuery('#ShowtblDiv').show();
       
    });


});
jQuery('#btnExit').on("click", function () {
    window.open("Dashboard", "_self");
});

