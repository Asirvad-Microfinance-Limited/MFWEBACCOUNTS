
var data;
var _aprvLoanApr = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _aprvLoanApr.checkAccessRtn, token)
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
                    _aprvLoanApr.loadFundType();
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

        try {
            CheckToken = JSON.stringify(CheckToken);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckToken = { "encryptedRqstStr": EncryptAPIReq(CheckToken) };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _aprvLoanApr.checkAccessToken, userdata.token)
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
                _aprvLoanApr.loadFundType();
            }


        }

    },
    loadFundType: function () {
        jQuery('.page-loader-wrapper').show();
        var paytype;
        if (jQuery("#rbtInterest").prop("checked") == true) {
            paytype = 2;
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == true) {
            paytype = 1;
        }


        var fundTypes = {
            Flag: "LoanRepaymentApr",
            PagVal: "GetFundTypeapr",
            parVal: paytype.toString(),
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        fundTypes = JSON.stringify(fundTypes);
        fundTypes = { "encryptedRqstStr": EncryptAPIReq(fundTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", fundTypes, _aprvLoanApr.fillFundType, userdata.token);
    },
    fillFundType: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                //jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFundType").empty();
                jQuery("#ddlFundType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FUND TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFundType").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFundType").empty();
                jQuery("#ddlFundType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FUND TYPE-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //FINANCIAL institution
    loadFIType: function () {
        jQuery('.page-loader-wrapper').show();
        var paytype;
        if (jQuery("#rbtInterest").prop("checked") == true) {
            paytype = 2;
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == true) {
            paytype = 1;
        }
        var InputData = jQuery("#ddlFundType").val() + "µ" + paytype

        var loanfiTypes = {
            Flag: "LoanRepaymentApr",
            PagVal: "GetLoanFIAPR",
            parVal: InputData,//.toString()
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        loanfiTypes = JSON.stringify(loanfiTypes);
        loanfiTypes = { "encryptedRqstStr": EncryptAPIReq(loanfiTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", loanfiTypes, _aprvLoanApr.fillLoanFIType, userdata.token);
    },
    fillLoanFIType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFi").empty();
                jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFi").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFi").empty();
                jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI TYPE-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //Select Loan
    GetLoanAvailLoans: function () {
        jQuery('.page-loader-wrapper').show();
        var paytype;
        if (jQuery("#rbtInterest").prop("checked") == true) {
            paytype = 2;
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == true) {
            paytype = 1;
        }
        var InputData = jQuery("#ddlFundType").val() + "µ" + jQuery("#ddlFi").val() + "µ" + paytype

        var loanTypes = {
            Flag: "LoanRepaymentApr",
            PagVal: "GetLoanRepayLoansapr",
            parVal: InputData,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        loanTypes = JSON.stringify(loanTypes);
        loanTypes = { "encryptedRqstStr": EncryptAPIReq(loanTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", loanTypes, _aprvLoanApr.fillLoanType, userdata.token);
    },
    fillLoanType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                var data = response.data.queryResult.QueryResult[0].Param2;

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlLoans").empty();
                jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" --------SELECT LOAN-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlLoans").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlLoans").empty();
                jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" --------SELECT LOAN-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    //Select table
    Getshowtablinterest: function () {
        jQuery('.page-loader-wrapper').show();
        var paytype;
        if (jQuery("#rbtInterest").prop("checked") == true) {
            paytype = 2;
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == true) {
            paytype = 1;
        }
        var loanid = jQuery("#ddlLoans").val();

        var InputData = paytype + 'µ' + jQuery("#ddlFundType").val() + 'µ' + jQuery("#ddlFi").val() + 'µ' + loanid;

        var loanTypes = {
            Flag: "LoanRepaymentApr",
            PagVal: "GetLoanReqData",
            parVal: InputData,//.toString()
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        loanTypes = JSON.stringify(loanTypes);
        loanTypes = { "encryptedRqstStr": EncryptAPIReq(loanTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", loanTypes, _aprvLoanApr.FillTables, userdata.token);
    },

    FillTables: function (response) {
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
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[5]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));

                        jQuery('#Fidatatabl').append($row);
                    });
                }

            }
        }
    },

    Getshowtablprincipal: function () {
        jQuery('.page-loader-wrapper').show();
        var paytype;
        if (jQuery("#rbtInterest").prop("checked") == true) {
            paytype = 2;
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == true) {
            paytype = 1;
        }
        var loanid = jQuery("#ddlLoans").val();

        var InputData = paytype + 'µ' + jQuery("#ddlFundType").val() + 'µ' + jQuery("#ddlFi").val() + 'µ' + loanid;

        var loanTypes = {
            Flag: "LoanRepaymentApr",
            PagVal: "GetLoanReqData",
            parVal: InputData,//.toString()
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        loanTypes = JSON.stringify(loanTypes);
        loanTypes = { "encryptedRqstStr": EncryptAPIReq(loanTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", loanTypes, _aprvLoanApr.FillTable, userdata.token);
    },

    FillTable: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();
                jQuery('#maincards').show();

                if (response.data.queryResult.QueryResult.length > 0) {

                    jQuery('#Fidatatabls').empty();
                    jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                        var $row = jQuery('<tr/>');
                        var data1 = val.Param1.split("~");
                        //var nval = nval + 1;

                        //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));

                        jQuery('#Fidatatabls').append($row);
                    });
                }

            }
        }
    },



    //2  table principal
    Getshowtablprincipaltwo: function () {
        jQuery('.page-loader-wrapper').show();
        var paytype;
        if (jQuery("#rbtInterest").prop("checked") == true) {
            paytype = 2;
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == true) {
            paytype = 1;
        }
        var loanid = jQuery("#ddlLoans").val();

        var InputData = paytype + 'µ' + jQuery("#ddlFundType").val() + 'µ' + jQuery("#ddlFi").val() + 'µ' + loanid;

        var loanTypes = {
            Flag: "LoanRepaymentApr",
            PagVal: "GetLoanReqACCData",
            parVal: InputData,//.toString()
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        loanTypes = JSON.stringify(loanTypes);
        loanTypes = { "encryptedRqstStr": EncryptAPIReq(loanTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", loanTypes, _aprvLoanApr.FillTableed, userdata.token);
    },

    FillTableed: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();
                jQuery('#maincareds').show();

                if (response.data.queryResult.QueryResult.length > 0) {

                    jQuery('#Fidatatablleess').empty();
                    jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                        var $row = jQuery('<tr/>');
                        var data1 = val.Param1.split("~");
                        //var nval = nval + 1;

                        //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));



                        jQuery('#Fidatatablleess').append($row);
                    });
                }

            }
        }
    },


    //2  table interest
    Getshowtablinteresttwo: function () {
        jQuery('.page-loader-wrapper').show();
        var paytype;
        if (jQuery("#rbtInterest").prop("checked") == true) {
            paytype = 2;
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == true) {
            paytype = 1;
        }
        var loanid = jQuery("#ddlLoans").val();


        var InputData = paytype + 'µ' + jQuery("#ddlFundType").val() + 'µ' + jQuery("#ddlFi").val() + 'µ' + loanid;
        var loanTypes = {
            Flag: "LoanRepaymentApr",
            PagVal: "GetLoanReqACCData",
            parVal: InputData,//.toString()
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        loanTypes = JSON.stringify(loanTypes);
        loanTypes = { "encryptedRqstStr": EncryptAPIReq(loanTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", loanTypes, _aprvLoanApr.FillTableedes, userdata.token);
    },

    FillTableedes: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();
                jQuery('#maincared').show();

                if (response.data.queryResult.QueryResult.length > 0) {

                    jQuery('#Fidatatabllee').empty();
                    jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                        var $row = jQuery('<tr/>');
                        var data1 = val.Param1.split("~");
                        //var nval = nval + 1;

                        //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));



                        jQuery('#Fidatatabllee').append($row);
                    });
                }

            }
        }
    },

    //BANK DETAILS TABLE 6-MAR-2025

    bnkdetailsfill: function () {

        var id1 = jQuery('#ddlLoans').text();
        var dta = id1.split("-");
        var id = dta[17];
        var bnkid = id.split("~");
        var bnkloanid = bnkid[1];

        var InputData = bnkloanid;



        var bfill = {
            Flag: "LoanRepaymentReq",
            PagVal: "bankdetails",
            parVal: InputData,//.toString()
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        bfill = JSON.stringify(bfill);
        bfill = { "encryptedRqstStr": EncryptAPIReq(bfill) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", bfill, _aprvLoanApr.fillbnk, userdata.token);
    },

    fillbnk: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();
                //jQuery('#main').show();

               // payment_type11 = jQuery("#ddlLoans").val()
                jQuery('#tblcard').show();



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
                        jQuery('#tbl').append($row);
                    });
                }

            }
        }

    },




    submitevalue: function () {
        //if (_aprvLoanApr.checkvalue1()) {
        if ((jQuery("#rbtInterest").prop("checked"))) {
            paytype = 2;
            if (paytype == 2) {

                var paymt = "Interest";

            }
            if (jQuery("#rbtCp").prop("checked") == true) {

                var category = jQuery('#comerid').text();

            }

            else if (jQuery("#rbtOther").prop("checked") == true) {

                var category = jQuery('#id').text();

            }
            var tableData = document.getElementById('tbldespatch');//1 table
            var main = tableData.rows[1].cells[0].innerText;
            var sub = tableData.rows[1].cells[1].innerText;
            var fcmain = tableData.rows[1].cells[2].innerText;
            var fcsubacc = tableData.rows[1].cells[3].innerText;
            var fcsubid = tableData.rows[1].cells[4].innerText;
            var tdssubacc = tableData.rows[1].cells[5].innerText;
            var tdsamont = tableData.rows[1].cells[6].innerText;



            var tblAccntData = document.getElementById('tbldespatchint');//2 table
            var mainlonac = tblAccntData.rows[1].cells[0].innerText;
            var subloanac = tblAccntData.rows[1].cells[1].innerText;
            var amount = tblAccntData.rows[1].cells[2].innerText;
            var loanss1 = jQuery("#ddlLoans").text();
            var loanss = jQuery('#ddlLoans :selected').text();

            var split = loanss.split("-");
            var loan_date = split[9] + "/" + split[10] + "/" + split[11];
            var tenure = split[5];
            var int_rate = split[7];


        }
        if ((jQuery("#rbtPrinciple").prop("checked"))) {
            paytype = 1;
            if (paytype == 1) {

                var paymt = "Principle";

            }
            if (jQuery("#rbtCp").prop("checked") == true) {

                var category = jQuery('#comerid').text();

            }

            else if (jQuery("#rbtOther").prop("checked") == true) {

                var category = jQuery('#id').text();

            }

            var tableData = document.getElementById('tbldespatchprin');//1
            var main = tableData.rows[1].cells[0].innerText;
            var sub = tableData.rows[1].cells[1].innerText;
            var subid = tableData.rows[1].cells[2].innerText;
            var tdssubac = tableData.rows[1].cells[3].innerText;
            var tdsamount = tableData.rows[1].cells[4].innerText;



            var tblAccntData = document.getElementById('tbldespatchprnc');//2
            var mainlonac = tblAccntData.rows[1].cells[0].innerText;
            var subloanac = tblAccntData.rows[1].cells[1].innerText;
            var amount = tblAccntData.rows[1].cells[2].innerText;
            var loanss1 = jQuery("#ddlLoans").text();
            var loanss = jQuery('#ddlLoans :selected').text();

            var split = loanss.split("-");
            var loan_date = split[9] + "/" + split[10] + "/" + split[11];
            var tenure = split[5];
            var int_rate = split[7];






            //var paymenttype = jQuery('#ddlPaymentType').val();
            //var paybank = jQuery('#ddlPaymentBank').val();
        }


        if (paytype == 2) {

            //var tblAmntData = main + "µ" + sub + "µ" + fcmain + "µ" + fcsubacc + "µ" + fcsubid + "µ" + tdssubacc + "µ" + tdsamont + "¥";
            // tblAmntData = tblAmntData + table.rows[1].cells[0].innerText + "µ" + table.rows[1].cells[1].innerText + "µ" + table.rows[1].cells[2].innerText + "µ" + table.rows[1].cells[3].innerText + "µ" + table.rows[1].cells[4].innerText + "µ" + table.rows[1].cells[5].innerText + "µ" + table.rows[1].cells[6].innerText + "¥";
            var tblAmntData = main + "µ" + sub + "µ" + subid + "µ" + tdssubac + "µ" + tdsamount + "¥";

            //var tblAccntData = mainlonac + "µ" + subloanac + "µ" + amount + "µ" + paytype + "µ" + userdata.userId + "µ" + jQuery("#ddlLoans").val() + "µ" + jQuery('#ddlPaymentType').val() + "µ" + jQuery('#ddlPaymentBank').val() + "µ" + jQuery('#ddlFundType').val() + "µ" + jQuery('#ddlFi').val() + "¥";
            //tblAccntData = tblAccntData + tableData.rows[1].cells[0].innerText + "µ" + tableData.rows[1].cells[1].innerText + "µ" + tableData.rows[1].cells[2].innerText + "µ" + paytype + "µ" + $("[id*=hdUserId]").val() + "µ" + $("#ddlLoans").val() + "¥";
            var tblAccntData = mainlonac + "µ" + subloanac + "µ" + amount + "µ" + paytype + "µ" + userdata.userId + "µ" + jQuery("#ddlLoans").val() + "µ" + jQuery('#ddlFundType').val() + "µ" + jQuery('#ddlFi').val() + "µ" + loan_date + "µ" + tenure + "µ" + int_rate + "µ" + paytype + "µ" + category + "¥";


        }
        else if (paytype == 1) {

            var tblAmntData = main + "µ" + sub + "µ" + subid + "µ" + tdssubac + "µ" + tdsamount + "¥";
            //tblAmntData = tblAmntData + table.rows[1].cells[0].innerText + "µ" + table.rows[1].cells[1].innerText + "µ" + table.rows[1].cells[2].innerText + "µ" + table.rows[1].cells[3].innerText + "µ" + table.rows[1].cells[4].innerText + "¥";


            var tblAccntData = mainlonac + "µ" + subloanac + "µ" + amount + "µ" + paytype + "µ" + userdata.userId + "µ" + jQuery("#ddlLoans").val() + "µ" + jQuery('#ddlFundType').val() + "µ" + jQuery('#ddlFi').val() + "µ" + loan_date + "µ" + tenure + "µ" + int_rate + "µ" + paytype + "µ" + category + "¥";
            //tblAccntData = tblAccntData + tableData.rows[1].cells[0].innerText + "µ" + tableData.rows[1].cells[1].innerText + "µ" + tableData.rows[1].cells[2].innerText + "µ" + paytype + "µ" + $("[id*=hdUserId]").val() + "µ" + $("#ddlLoans").val() + "¥";


        }



        var submitRequest = {

            Flag: "REPAYMENT_AUTOPAY",
            PagVal: tblAccntData,
            parVal: tblAmntData,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        submitRequest = JSON.stringify(submitRequest);
        submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _aprvLoanApr.SubmitReturns, userdata.token)

        //}
    },
    SubmitReturns: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                var msg = jQuery.trim(response.data.message);
                //var msg = String.prototype.trim(response.data.message);
                if (response.data.errStatus = "1") {
                    if (response.data.queryResult.QueryResult[0].Param1 == "1") {



                        swal({
                            title: "Recommended Successfully!",
                            text: "",
                            type: "success"
                        }, function () {
                            window.location.reload(true);
                        });
                    }
                    else {
                        swal({
                            title: "Already Paid.!",
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
            /*else {
                var msg = jQuery.trim(response.responseMsg);
                swal({
                    title: "Error",
                    text: msg,
                    type: "error"
                }, function () {
                    window.location.reload(true);
                });
            }*/
        }
    },
    checkvalue1: function () {

        var FiType = jQuery('#ddlFundType').val();
        var FiName = jQuery('#ddlFi').val();
        var loan = jQuery('#ddlLoans').val();
        var payment = jQuery('#ddlPaymentType').val();
        var bank = jQuery('#ddlPaymentBank').val();
        //var paytyp = jQuery('#ddlPaymentType').val();
        //var paybank = jQuery('#ddlPaymentBank').val();


        if (jQuery("#rbtOther").prop("checked") == false && jQuery("#rbtCp").prop("checked") == false) {
            swal("", "Please select an Option other/commercialpaper ..!", "error");
            return false;
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == false && jQuery("#rbtInterest").prop("checked") == false) {
            swal("", "Please select an Option principle/Interest..!", "error");
            return false;
        }
        else if (FiType == 0) {
            swal("", "Please Select Fund Type", "error");
            return false;
        }
        else if (FiName == 0) {
            swal("", "Please Enter Financial Institution ", "error");
            return false;
        }

        else if (loan == 0) {
            swal("", "Please Select Loan ", "error");
            return false;
        }
        else if (jQuery("#radaprv").prop("checked") == false && jQuery("#radreject").prop("checked") == false) {
            swal("", "Please select an Option Approve/Reject..!", "error");
            return false;
        }
        else if (jQuery("#radreject").prop("checked") == true && jQuery("#txt_reason").val() == "") {
            swal("", "Please Enter Reason", "error");
            return false;
        }
        else if (payment == 0) {
            swal("", "Please Select Payment Type ", "error");
            return false;
        }
        else if (bank == 0) {
            swal("", "Please Select Payment Bank ", "error");
            return false;
        }

        //else if (paytyp == 0) {
        //    swal("", "Please Select  Automatic/Manual", "error");
        //    return false;
        //}
        //else if (paybank == 0) {
        //    swal("", "Please Select  Bank of Baroda", "error");
        //    return false;
        //}


        else {
            Save();

        }

    },




    rejectevalue: function () {

        if ((jQuery("#rbtInterest").prop("checked"))) {
            paytype = 2;
            if (paytype == 2) {

                var paymt = "Interest";

            }
            if (jQuery("#rbtCp").prop("checked") == true) {

                var category = jQuery('#comerid').text();

            }

            else if (jQuery("#rbtOther").prop("checked") == true) {

                var category = jQuery('#id').text();

            }
            var tableData = document.getElementById('tbldespatch');//1 table
            var main = tableData.rows[1].cells[0].innerText;
            var sub = tableData.rows[1].cells[1].innerText;
            var fcmain = tableData.rows[1].cells[2].innerText;
            var fcsubacc = tableData.rows[1].cells[3].innerText;
            var fcsubid = tableData.rows[1].cells[4].innerText;
            var tdssubacc = tableData.rows[1].cells[5].innerText;
            var tdsamont = tableData.rows[1].cells[6].innerText;



            var tblAccntData = document.getElementById('tbldespatchint');//2 table
            var mainlonac = tblAccntData.rows[1].cells[0].innerText;
            var subloanac = tblAccntData.rows[1].cells[1].innerText;
            var amount = tblAccntData.rows[1].cells[2].innerText;
            var loanss1 = jQuery("#ddlLoans").text();
            var loanss = jQuery('#ddlLoans :selected').text();

            var split = loanss.split("-");
            var loan_date = split[9] + "/" + split[10] + "/" + split[11];
            var tenure = split[5];
            var int_rate = split[7];


        }
        if ((jQuery("#rbtPrinciple").prop("checked"))) {
            paytype = 1;
            if (paytype == 1) {

                var paymt = "Principle";

            }
            if (jQuery("#rbtCp").prop("checked") == true) {

                var category = jQuery('#comerid').text();

            }

            else if (jQuery("#rbtOther").prop("checked") == true) {

                var category = jQuery('#id').text();

            }

            var tableData = document.getElementById('tbldespatchprin');//1
            var main = tableData.rows[1].cells[0].innerText;
            var sub = tableData.rows[1].cells[1].innerText;
            var subid = tableData.rows[1].cells[2].innerText;
            var tdssubac = tableData.rows[1].cells[3].innerText;
            var tdsamount = tableData.rows[1].cells[4].innerText;



            var tblAccntData = document.getElementById('tbldespatchprnc');//2
            var mainlonac = tblAccntData.rows[1].cells[0].innerText;
            var subloanac = tblAccntData.rows[1].cells[1].innerText;
            var amount = tblAccntData.rows[1].cells[2].innerText;
            var loanss1 = jQuery("#ddlLoans").text();
            var loanss = jQuery('#ddlLoans :selected').text();

            var split = loanss.split("-");
            var loan_date = split[9] + "/" + split[10] + "/" + split[11];
            var tenure = split[5];
            var int_rate = split[7];






            //var paymenttype = jQuery('#ddlPaymentType').val();
            //var paybank = jQuery('#ddlPaymentBank').val();
        }


        if (paytype == 2) {

            var tblAmntData = main + "µ" + sub + "µ" + fcmain + "µ" + fcsubacc + "µ" + fcsubid + "µ" + tdssubacc + "µ" + tdsamont + "¥";
            // tblAmntData = tblAmntData + table.rows[1].cells[0].innerText + "µ" + table.rows[1].cells[1].innerText + "µ" + table.rows[1].cells[2].innerText + "µ" + table.rows[1].cells[3].innerText + "µ" + table.rows[1].cells[4].innerText + "µ" + table.rows[1].cells[5].innerText + "µ" + table.rows[1].cells[6].innerText + "¥";


            var tblAccntData = mainlonac + "µ" + subloanac + "µ" + amount + "µ" + paytype + "µ" + userdata.userId + "µ" + jQuery("#ddlLoans").val() + "µ" + jQuery('#ddlFundType').val() + "µ" + jQuery('#ddlFi').val() + "¥";
            //tblAccntData = tblAccntData + tableData.rows[1].cells[0].innerText + "µ" + tableData.rows[1].cells[1].innerText + "µ" + tableData.rows[1].cells[2].innerText + "µ" + paytype + "µ" + $("[id*=hdUserId]").val() + "µ" + $("#ddlLoans").val() + "¥";


        }
        else if (paytype == 1) {

            var tblAmntData = main + "µ" + sub + "µ" + subid + "µ" + tdssubac + "µ" + tdsamount + "¥";
            //tblAmntData = tblAmntData + table.rows[1].cells[0].innerText + "µ" + table.rows[1].cells[1].innerText + "µ" + table.rows[1].cells[2].innerText + "µ" + table.rows[1].cells[3].innerText + "µ" + table.rows[1].cells[4].innerText + "¥";


            var tblAccntData = mainlonac + "µ" + subloanac + "µ" + amount + "µ" + paytype + "µ" + userdata.userId + "µ" + jQuery("#ddlLoans").val() + "µ" + jQuery('#ddlFundType').val() + "µ" + jQuery('#ddlFi').val() + "µ" + loan_date + "µ" + tenure + "µ" + int_rate + "µ" + paytype + "µ" + category + "¥";
            //tblAccntData = tblAccntData + tableData.rows[1].cells[0].innerText + "µ" + tableData.rows[1].cells[1].innerText + "µ" + tableData.rows[1].cells[2].innerText + "µ" + paytype + "µ" + $("[id*=hdUserId]").val() + "µ" + $("#ddlLoans").val() + "¥";


        }



        var Rejectrequest = {

            Flag: "REJECT_REPAYMENT",
            PagVal: tblAccntData,
            parVal: tblAmntData,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        Rejectrequest = JSON.stringify(Rejectrequest);
        Rejectrequest = { "encryptedRqstStr": EncryptAPIReq(Rejectrequest) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", Rejectrequest, _aprvLoanApr.Rejectreturnresponse, userdata.token)

    
    },
    Rejectreturnresponse: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                var msg = jQuery.trim(response.data.message);

                if (response.data.errStatus = "1") {
                    if (response.data.queryResult.QueryResult[0].Param1 == "1") {
                        swal({
                            title: "Rejected Successfully!",
                            text: "",
                            type: "success"
                        }, function () {
                            window.location.reload(true);
                        });
                    }
                    else {
                        swal({
                            title: "Some thing went wrong....!",
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

        var FiType = jQuery('#ddlFundType').val();
        var FiName = jQuery('#ddlFi').val();
        var loan = jQuery('#ddlLoans').val();

        if (jQuery("#rbtOther").prop("checked") == false && jQuery("#rbtCp").prop("checked") == false) {
            swal("", "Please select an Option other/commercialpaper ..!", "error");
            return false;
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == false && jQuery("#rbtInterest").prop("checked") == false) {
            swal("", "Please select an Option principle/Interest..!", "error");
            return false;
        }
        else if (FiType == 0) {
            swal("", "Please Select Fund Type", "error");
            return false;
        }
        else if (FiName == 0) {
            swal("", "Please Enter Financial Institution ", "error");
            return false;
        }

        else if (loan == 0) {
            swal("", "Please Enter Financial Institution ", "error");
            return false;
        }
        else if (jQuery("#radaprv").prop("checked") == false && jQuery("#radreject").prop("checked") == false) {
            swal("", "Please select an Option Approve/Reject..!", "error");
            return false;
        }
        else if (jQuery("#radreject").prop("checked") == true && jQuery("#txt_reason").val() == "") {
            swal("", "Please Enter Reason", "error");
            return false;
        }
        else {
            return true;
        }
    }





}

function Save() {

   // _aprvLoanApr.submitevalue();

    swal({
        title: "Amount Credit Status Verified Or Not.?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, I am sure!',
        cancelButtonText: "No, cancel it!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            if (isConfirm) {
                jQuery("#loader").removeClass('hide-loader');
                //window.location.reload(true);

                 _aprvLoanApr.submitevalue();
            } else {

                /*swal("", "Cancelled", "warning");
                jQuery('.page-loader-wrapper').hide();
                // _BankEntryRequest.ClearData();
                //window.location.reload(true);
                _aprvLoanApr.tokenValidate();
                 window.location.reload(true);*/
                swal({
                    title: "Cancelled",
                    text: "",
                    type: "warning",
                    confirmButtonText: "OK",
                    closeOnConfirm: true
                }, function () {
                    _aprvLoanApr.tokenValidate();

                    window.location.reload();
                });
               






            }
        });







}




jQuery('#rbtCp').on("click", function () {
    jQuery('#divfund').hide();


});
jQuery('#rbtOther').on("click", function () {
    jQuery('#divfund').hide();

});

//jQuery(document).ready(function () {

//});
jQuery('#rbtInterest').on("click", function () {
    jQuery('#divfund').show();
    //_aprvLoanApr.loadFundType();
    _aprvLoanApr.tokenValidate();
});

jQuery('#rbtPrinciple').on("click", function () {
    jQuery('#divfund').show();
    //_aprvLoanApr.loadFundType();
    _aprvLoanApr.tokenValidate();
});
jQuery('#ddlFundType').on("change", function () {
    
    jQuery('#divfi').show();
    _aprvLoanApr.loadFIType();
});
jQuery('#ddlFi').on("change", function () {
    jQuery('#divloanshow').show();
    _aprvLoanApr.GetLoanAvailLoans();
});

jQuery('#ddlLoans').on("change", function () {
    jQuery('#divtblPrincpleIntDtl').show();
    //jQuery('#tblcard').show();
    
    var id1 = jQuery('#ddlLoans').text();
    var dta = id1.split("-");
    var type = dta[31];
    

    

    



    if (jQuery("#rbtInterest").prop("checked") == true) {
        paytype = 2;
        _aprvLoanApr.Getshowtablinterest();
        _aprvLoanApr.Getshowtablinteresttwo();
        if (type == 'automatic') {
            _aprvLoanApr.bnkdetailsfill();
        }
        else {
            return true;
        }
    }
    else if (jQuery("#rbtPrinciple").prop("checked") == true) {
        paytype = 1;
        _aprvLoanApr.Getshowtablprincipal();
        _aprvLoanApr.Getshowtablprincipaltwo();
        if (type == 'automatic') {
            _aprvLoanApr.bnkdetailsfill();
        }
        else {
            return true;
        }
    }
   
    

});

jQuery("#btnConf").on("click", function () {
    _aprvLoanApr.checkvalue1();
    //_aprvLoanApr.submitevalue();
    //Save();

});

jQuery("#btnrej").on("click", function () {
    _aprvLoanApr.rejectevalue();
});

jQuery('#btnExit').on("click", function () {
    window.open("Dashboard", "_self");
});