var tblData = [];
var buttonClicked = false;
var lotNo;
var Lotnumber;
var excelRows;

var _NcdBondRePayment = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _NcdBondRePayment.checkAccessRtn, token)
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
                    _NcdBondRePayment.loadMainAccount();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _NcdBondRePayment.checkAccessToken, userdata.token)
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
                _NcdBondRePayment.loadMainAccount();
            }


        }
    },



    //Main Account  
    TdsAmount: [],
    loadMainAccount: function () {
        jQuery('.page-loader-wrapper').show();
        var DebMainAccount = {
            Flag: "NCDBondAvailment",
            PagVal: "GetBnkID",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        DebMainAccount = JSON.stringify(DebMainAccount);
        DebMainAccount = { "encryptedRqstStr": EncryptAPIReq(DebMainAccount) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebMainAccount, _NcdBondRePayment.FillDebMainAccount, userdata.token);

    },
    FillDebMainAccount: function (response) {


        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_mainAcc").empty();
                jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_mainAcc").empty();
                jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //Sub Account

    loadSubAccount: function () {
        jQuery('.page-loader-wrapper').show();
        var indata = jQuery("#ddl_mainAcc").val();
        var DebSubAccount = {
            Flag: "NCDBondAvailment",
            PagVal: "GetMainBnkID",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebSubAccount = JSON.stringify(DebSubAccount);
        DebSubAccount = { "encryptedRqstStr": EncryptAPIReq(DebSubAccount) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSubAccount, _NcdBondRePayment.FillDebSubAccount, userdata.token);

    },
    FillDebSubAccount: function (response) {


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




    //Payment bank

    loadPaymentbank: function () {
        jQuery('.page-loader-wrapper').show();
        var indata = jQuery("#ddl_mainAcc").val();
        var DebPaymentbank = {
            Flag: "NCDBondAvailment",
            PagVal: "GetMainBnkID1",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebPaymentbank = JSON.stringify(DebPaymentbank);
        DebPaymentbank = { "encryptedRqstStr": EncryptAPIReq(DebPaymentbank) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebPaymentbank, _NcdBondRePayment.FillDebPaymentbank, userdata.token);

    },
    FillDebPaymentbank: function (response) {


        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_paymntbnk").empty();
                jQuery("#ddl_paymntbnk").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_paymntbnk").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_paymntbnk").empty();
                jQuery("#ddl_paymntbnk").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    //tds1
    getTdsbankid: function () {
        jQuery('.page-loader-wrapper').show();
        var DebTdsAccount = {
            Flag: "LoanRepaymentReq",
            PagVal: "GetTDSBnkID1",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebTdsAccount = JSON.stringify(DebTdsAccount);
        DebTdsAccount = { "encryptedRqstStr": EncryptAPIReq(DebTdsAccount) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DebTdsAccount, _NcdBondRePayment.FillDebtdsAccount, userdata.token);

    },
    FillDebtdsAccount: function (response) {


        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_TDS_main_bnk").empty();
                jQuery("#ddl_TDS_main_bnk").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS MAin ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_TDS_main_bnk").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_TDS_main_bnk").empty();
                jQuery("#ddl_TDS_main_bnk").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },



    //tds2
    getTdsbankid2: function () {
        jQuery('.page-loader-wrapper').show();
        var DebTdsAccount = {
            Flag: "LoanRepaymentReq",
            PagVal: "GetTDSBnkID",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebTdsAccount = JSON.stringify(DebTdsAccount);
        DebTdsAccount = { "encryptedRqstStr": EncryptAPIReq(DebTdsAccount) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DebTdsAccount, _NcdBondRePayment.FillDebtdsAccount2, userdata.token);

    },
    FillDebtdsAccount2: function (response) {


        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_TDS_main_bnk2").empty();
                jQuery("#ddl_TDS_main_bnk2").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS MAin ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_TDS_main_bnk2").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_TDS_main_bnk2").empty();
                jQuery("#ddl_TDS_main_bnk2").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
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
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DivmonthLoad, _NcdBondRePayment.DivmntResponse, userdata.token);
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

    //Load MONTH
    DivMnth: function () {
        jQuery('.page-loader-wrapper').show();

        var DivmonthLoad = {

            Flag: "LoanRepaymentReq",
            PagVal: "GetM0nth1",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
            // parVal: InputData

        };
        DivmonthLoad = JSON.stringify(DivmonthLoad);
        DivmonthLoad = { "encryptedRqstStr": EncryptAPIReq(DivmonthLoad) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DivmonthLoad, _NcdBondRePayment.DivmntResponse, userdata.token);
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
            PagVal: "GetYear1",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
            // parVal: InputData

        };
        DivYearLoad = JSON.stringify(DivYearLoad);
        DivYearLoad = { "encryptedRqstStr": EncryptAPIReq(DivYearLoad) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DivYearLoad, _NcdBondRePayment.DivYearResponse, userdata.token);
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


    PrincipleIntrest: function () {
        var FundTyp;
        if (jQuery("#rbtPublic").prop("checked")) {
            FundTyp = '2';
        }
        else if (jQuery("#rbtOther").prop("checked") == true) {
            FundTyp = '1';
        }


        if (jQuery("#rbtInterest").prop("checked")) {
            IRate = 0;
            jQuery("#tblPrincpleIntDtl").empty();
            jQuery("#tblPaymentDtl").empty();
            jQuery("#txtTotalAmount").val(0);
            jQuery("#txt_tot").val(0);
            jQuery("#divtblPrincpleIntDtl").fadeIn();
            jQuery("#divAddAccount").fadeIn();
            jQuery("#divTotal").fadeIn();
            intPrnc = "GetIntRePaymentTblncd";
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == true) {
            IRate = 0;
            jQuery("#tblPrincpleIntDtl").empty();
            jQuery("#tblPaymentDtl").empty();
            jQuery("#txtTotalAmount").val(0);
            jQuery("#txt_tot").val(0);
            jQuery("#divtblPrincpleIntDtl").fadeIn();
            jQuery("#divAddAccount").fadeIn();
            jQuery("#divTotal").fadeIn();
            intPrnc = "GetPrncRepaymntncd";
        }

        var input = FundTyp + "µ" + jQuery('#ddlmonths').val() + "µ" + jQuery('#ddlyear').val();
        var LoadTableReq = {
            Flag: "DebRepayment",
            PagVal: intPrnc,
            parVal: input,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId


        };
        LoadTableReq = JSON.stringify(LoadTableReq);
        LoadTableReq = { "encryptedRqstStr": EncryptAPIReq(LoadTableReq) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", LoadTableReq, _NcdBondRePayment.LoadTablerep, userdata.token);

    },

    LoadTablerep: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();
                jQuery('#maincard').show();
                if (response.data.queryResult.QueryResult.length > 0) {
                    jQuery('#Fidatatabl').empty();
                    var isInterestChecked = jQuery("#rbtInterest").prop("checked");
                    jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                        var $row = jQuery('<tr/>');
                        var data1 = val.Param1.split("~");
                        //var nval = nval + 1;
                        if (jQuery("#rbtInterest").prop("checked")) {
                            //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                            $row.append(jQuery('<td><input type="checkbox"  id="chkbx' + i + 'm" name="Paymnt"  onclick="' + `_NcdBondRePayment.addIntTDS(${i})` + '"/></td>'));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                            $row.append(jQuery('<td align="center">').html('<input type="text" id="' + i + 'TDS_id" value="' + data1[4] + '" disabled onkeypress="return onlyNumberKey(event)" maxlength="13" onchange="' + `_NcdBondRePayment.addIntTDS(${i})` + "\"/>"));
                            $row.append(jQuery('<td align="center">').html('<input type="text" id="' + i + 'TDS_id2" value="' + "0" + '" disabled onkeypress="return onlyNumberKey(event)" maxlength="13" onchange="' + `_NcdBondRePayment.addIntTDS(${i})` + "\"/>"));

                            // $row.append(jQuery('<td align="center">').html('<input type="text" id="TDS_id" value=' + data1[4] + ' disabled onkeypress="return onlyNumberKey(event)" maxlength="4" onchange="_NcdBondRePayment.addIntTDS(' + i + ')">'));

                            $row.append(jQuery('<td align="center">').html('<input type="text" id="' + i + 'Record_id" value="' + data1[5] + '" disabled onkeypress="return onlyNumberKey(event)" maxlength="13"onchange="' + `_NcdBondRePayment.addIntTDS(${i})` + "\"/>"));

                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[8]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[9]));


                        }


                        else {
                            //var Strt = '<thead class="bg-success text-white"><tr><th scope="col">Pay</th><th scope="col">LoanID</th><th scope="col">Installment</th><th scope="col">Financial_Institition</th><th scope="col">Pay_Type</th><th scope="col">Principle_Amount</th><th scope="col">TDS</th><th scope="col">Pay_Date</th><th scope="col">LoanAccount</th><th scope="col">Pjt_Code</th></tr></thead><tbody class="border border-dark">';

                            //for (i = 0; i < valData.length - 1; i++) {

                            //valData1 = valData[i].split('^');
                            // var data1 = val.Param1.split("~");
                            //   $('#tblPrincpleIntDtl').append('<tr>' +
                            // '<td><input class="form-control input-sm align-right " id="chkbx' + i + 'm" name="Paymnt" type="checkbox" onclick="addPrincipal(' + i + ')"/></td>' +
                            $row.append(jQuery('<td><input type="checkbox"  id="chkbx' + i + 'm" name="Paymnt"  onclick="' + `_NcdBondRePayment.addPrincipal(${i})` + '"/></td>'));

                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                            //  '<td><input type = "text" id= "Record_id' + i + '" name = "Record_id1" value =' + valData1[4] + ' Disabled  onkeypress="return onlyNumberKey(event)" class="price"   size = "10" onchange="return addamtdetails()"   /></td>' +
                            // '<td><input type = "text" id= "TDS_id' + i + '" name = "TDS_id1" value =' + valData1[5] + ' Disabled  onkeypress="return onlyNumberKey(event)" class="price"   size = "10" onchange="return addprcTDS(' + i + ')"  /></td>' +
                            $row.append(jQuery('<td align="center">').html('<input type="text" id="' + i + 'TDS_id" value="' + data1[4] + '" disabled  maxlength="4" onchange="' + `_NcdBondRePayment.addPrincipal(${i})` + "\"/>"));
                            $row.append(jQuery('<td align="center">').html('<input type="text" id="' + i + 'TDS_id2" value="' + "0" + '" disabled onkeypress="return onlyNumberKey(event)" maxlength="4" onchange="' + `_NcdBondRePayment.addPrincipal(${i})` + "\"/>"));
                            $row.append(jQuery('<td align="center">').html('<input type="text" id="' + i + 'Record_id" value="' + data1[5] + '" disabled onkeypress="return onlyNumberKey(event)" maxlength="13"onchange="' + `_NcdBondRePayment.addPrincipal(${i})` + "\"/>"));

                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[8]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[9]));
                            $row.append(jQuery('<td align="center">').html('<input id="hdn' + i + '" type="hidden" value="' + data1[10] + '"/></td>' + '</tr> </tbody>'));


                        }
                        jQuery('#Fidatatabl').append($row);

                    });

                }



            }


        }
    },



    addIntrst: function (i) {
        if ((jQuery("#rbtInterest").prop("checked"))) {

            if (jQuery("#txt_tot").val() == "") {
                tot = 0;
            }
            else {
                tot = parseFloat(jQuery("#txt_tot").val());
            }
            if (jQuery(`#chkbx${i}m`).prop("checked")) {
                jQuery(`#${i}TDS_id`).prop("disabled", false);
                //jQuery("#TDS_id" + i).prop("disabled", false);
                jQuery(`#${i}TDS_id2`).prop("disabled", false);

                jQuery(`#${i}Record_id`).prop("disabled", false);
            }
            else {
                jQuery(`#${i}TDS_id`).prop("disabled", true);
                jQuery(`#${i}TDS_id2`).prop("disabled", true);
                //jQuery("#TDS_id" + i).prop("disabled", true);

                jQuery(`#${i}Record_id`).prop("disabled", true);
                //jQuery("#Record_id" + i).prop("disabled", true);
                jQuery(`#${i}TDS_id2`).val("0");
                //jQuery("#TDS_id" + i).val("0");
            }

            //jQuery("#Record_id" + i).prop("disabled", false);


            var tableData = document.getElementById('tbldespatchs');//2 table

            var tdsamt = tableData.rows[1].cells[5].querySelector('input').value;
            var interestamt = tableData.rows[1].cells[7].querySelector('input').value;



            jQuery("#txt_intrst_amt").html(interestamt);
            jQuery("#txt_intrst_amt").val(interestamt);
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
            jQuery(`#${i}TDS_id`).prop("disabled", false);
            //jQuery("#TDS_id" + i).prop("disabled", false);
            jQuery(`#${i}TDS_id2`).prop("disabled", false);

            jQuery(`#${i}Record_id`).prop("disabled", false);
            //jQuery("#Record_id" + i).prop("disabled", false);


            var tableData = document.getElementById('tbldespatchs');//2 table

            var tdsamt = tableData.rows[1].cells[5].querySelector('input').value;
            var interestamt = tableData.rows[1].cells[7].querySelector('input').value;


            jQuery("#txt_intrst_amt").html(interestamt);
            jQuery("#txt_intrst_amt").val(interestamt);
            jQuery("#txt_tot").html(interestamt);
            jQuery("#txt_tot").val(interestamt);
            jQuery("#txt_net_amnt").html(interestamt);
            jQuery("#txt_net_amnt").val(interestamt);
            jQuery("#txtTotalAmount").html(interestamt);
            jQuery("#txtTotalAmount").val(0);
        }
    },

    addIntTDS: function (i) {

        var tds1 = jQuery(`#${i}TDS_id`);
        var tds2 = jQuery(`#${i}TDS_id2`);
        var recordId = jQuery(`#${i}Record_id`);
        var tdsamt1 = Number.parseFloat(tds1.val() || "0")
        var tdsamt2 = Number.parseFloat(tds2.val() || "0")
        var recordAmt = Number.parseFloat(recordId.val() || "0")
        var tdsamnt = Number.parseFloat(tds1.val()) + Number.parseFloat(tds2.val());
        if (jQuery("#chkbx" + i + "m").prop("checked")) {
            tds1.prop("disabled", false);
            tds2.prop("disabled", false);
            recordId.prop("disabled", false);
            if (_NcdBondRePayment.TdsAmount.findIndex(x => x.id == i) == -1) {
                _NcdBondRePayment.TdsAmount.push({
                    id: i,
                    tds1: tdsamt1,
                    tds2: tdsamt2,
                    amount: recordAmt
                });
                jQuery("#txtPayAmount").val(recordAmt - (tdsamt1 + tdsamt2))
            }
            else {
                var data = _NcdBondRePayment.TdsAmount.find(x => x.id == i);
                data.tds1 = tdsamt1;
                data.tds2 = tdsamt2;
                data.amount = recordAmt;
            }
            jQuery("#txtPayAmount").val(recordAmt - (tdsamt1 + tdsamt2))
        }
        else {
            tds1.prop("disabled", true);
            tds2.prop("disabled", true);
            recordId.prop("disabled", true);
            _NcdBondRePayment.TdsAmount.findIndex(x => x.id == i) != -1 && _NcdBondRePayment.TdsAmount.splice(_NcdBondRePayment.TdsAmount.findIndex(x => x.id == i), 1);
            tds1.val("0");
            tds2.val("0");
            jQuery("#txtPayAmount").val("");
        }
       
        var tdsAmount1 = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.tds1), 0);
        var tdsAmount2 = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.tds2), 0);
        var recordAmount = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += x.amount, 0);
        var tdsAmount = tdsAmount1 + tdsAmount2;
        if (tdsamt1 > 0) {
            jQuery("#divTDSmainbnk").show();
        }
        else {
            jQuery("#divTDSmainbnk").hide();
        }
        if (tdsamt2 > 0) {
            jQuery("#divTDSmainbnk2").show();
        }
        else {
            jQuery("#divTDSmainbnk2").hide();
        }
        jQuery("#txt_tds_amnt").val(tdsAmount.toString());
        jQuery("#txt_intrst_amt").val(recordAmount.toString());
        jQuery("#txt_tot").val((recordAmount - tdsAmount).toString());

    },


    addPrincipal: function (i) {

        var tds1 = jQuery(`#${i}TDS_id`);
        var tds2 = jQuery(`#${i}TDS_id2`);
        var recordId = jQuery(`#${i}Record_id`);
        var tdsamt1 = Number.parseFloat(tds1.val() || "0")
        var tdsamt2 = Number.parseFloat(tds2.val() || "0")
        var recordAmt = Number.parseFloat(recordId.val() || "0")
        var tdsamnt = Number.parseFloat(tds1.val()) + Number.parseFloat(tds2.val());
        if (jQuery("#chkbx" + i + "m").prop("checked")) {
            tds1.prop("disabled", false);
            tds2.prop("disabled", false);
            recordId.prop("disabled", false);
            if (_NcdBondRePayment.TdsAmount.findIndex(x => x.id == i) == -1) {
                _NcdBondRePayment.TdsAmount.push({
                    id: i,
                    tds1: tdsamt1,
                    tds2: tdsamt2,
                    amount: recordAmt
                });
                jQuery("#txtPayAmount").val(recordAmt - (tdsamt1 + tdsamt2))
            }
            else {
                var data = _NcdBondRePayment.TdsAmount.find(x => x.id == i);
                data.tds1 = tdsamt1;
                data.tds2 = tdsamt2;
                data.amount = recordAmt;
                jQuery("#txtPayAmount").val(recordAmt - (tdsamt1 + tdsamt2))
            }
        }
        else {
            tds1.prop("disabled", true);
            tds2.prop("disabled", true);
            recordId.prop("disabled", true);
            _NcdBondRePayment.TdsAmount.findIndex(x => x.id == i) != -1 && _NcdBondRePayment.TdsAmount.splice(_NcdBondRePayment.TdsAmount.findIndex(x => x.id == i), 1);
            tds1.val("0");
            tds2.val("0");
            jQuery("#txtPayAmount").val("");
        }
        var tdsamnt1 = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.tds1), 0);
        var tdsamnt2 = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.tds2), 0);
        var tdsamnt = tdsamnt1 + tdsamnt2;
        var recordAmount = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += x.amount, 0);

        if (tdsamt1 > 0) {
            jQuery("#divTDSmainbnk").show();
        }
        else {
            jQuery("#divTDSmainbnk").hide();
        }
        if (tdsamt2 > 0) {
            jQuery("#divTDSmainbnk2").show();
        }
        else {
            jQuery("#divTDSmainbnk2").hide();
        }
        jQuery("#txt_tds_amnt").val(tdsamnt.toString());
        jQuery("#txt_intrst_amt").val(recordAmount.toString());
        jQuery("#txt_tot").val((recordAmount - tdsamnt).toString());
    },

    //addPrincipal: function (i) {
    //    var tdsrate;
    //    var table;
    //    var prncamnt;

    //    var j = i + 1;
    //    var tot = 0;
    //    if (jQuery("#txt_intrst_amt").val() == "")
    //        tot = 0;
    //    else
    //        tot = parseFloat(jQuery("#txt_intrst_amt").val());

    //    //tdsrate = parseFloat(table.rows[j].cells[6].childNodes[0].value);
    //    table = document.getElementById('Fidatatabl');
    //    prncamnt = parseFloat(table.rows[j].cells[5].childNodes[0].value);
    //    if (jQuery("#chkbx" + i + "m").prop("checked")) {
    //        tot = tot + prncamnt;
    //        jQuery(`#${i}TDS_id`).prop("disabled", false);
    //        jQuery(`#${i}TDS_id2`).prop("disabled", false);
    //        //jQuery("#TDS_id" + i).prop("disabled", false);

    //        jQuery(`#${i}Record_id`).prop("disabled", false);
    //        //jQuery("#Record_id" + i).prop("disabled", false);
    //    }
    //    else {
    //        tot = tot - prncamnt;
    //        jQuery(`#${i}TDS_id`).prop("disabled", true);
    //        jQuery(`#${i}TDS_id2`).prop("disabled", true);
    //        //jQuery("#TDS_id" + i).prop("disabled", true);

    //        jQuery(`#${i}Record_id`).prop("disabled", true);
    //        //jQuery("#Record_id" + i).prop("disabled", true);
    //        addprcTDS(i);
    //        jQuery(`#${i}TDS_id`).val("0");
    //        //jQuery("#TDS_id" + i).val("0");

    //    }

    //    if (prncamnt == 0) {
    //        jQuery("#divTDSmainbnk").hide();
    //    }
    //    else {
    //        jQuery("#divTDSmainbnk").show();
    //        _NcdBondRePayment.getTdsbankid();

    //    }

    //    jQuery("#txt_intrst_amt").val(tot);
    //    _NcdBondRePayment.calcnetAmt();
    //},













    addamtdetails: function (i) {
        // _loanrepayment.addIntrst(i)
        var tableData = document.getElementById('   ');//2 table

        var tdsamt = tableData.rows[1].cells[5].querySelector('input').value;
        var interestamt = tableData.rows[1].cells[7].querySelector('input').value;


        jQuery("#txt_intrst_amt").html(interestamt);
        jQuery("#txt_intrst_amt").val(interestamt);
        jQuery("#txt_tot").html(interestamt);
        jQuery("#txt_tot").val(interestamt);
        jQuery("#txt_net_amnt").html(interestamt);
        jQuery("#txt_net_amnt").val(interestamt);
        jQuery("#txtTotalAmount").html(interestamt);
        jQuery("#txtTotalAmount").val(0);

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
                    // $("#txtPayAmount").val(total.toFixed(2));
                    jQuery("#txt_intrst_amt").val(total.toFixed(2));
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
                    // $("#txtPayAmount").val(total.toFixed(2));
                    //jQuery("#txt_intrst_amt").val(total.toFixed(2));

                    if (tds == "") {
                        tds = 0;
                    }
                    var net_amnt = parseFloat(total) + parseFloat(tds);
                    jQuery("#txt_net_amnt").val(net_amnt);
                    //row.cells[6].childNodes[0].readOnly = true;
                }


            });
            _NcdBondRePayment.calcnetAmt();
          //  _NcdBondRePayment.limitToFourDigits();

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

            var tdsamnt = tableData.rows[1].cells[5].querySelector('input').value;


            if (jQuery("#chkbx" + i + "m").prop("checked")) {
                //tot = parseFloat(tot) + parseFloat(tdsamnt);
                jQuery(`#${i}TDS_id`).prop("disabled", true);
                //jQuery("#TDS_id" + i).prop("disabled", true);

            }
            else {
                tot = parseFloat(tot) - parseFloat(tdsamnt);

                jQuery(`#${i}TDS_id`).prop("disabled", true);
                // jQuery("#TDS_id" + i).prop("disabled", true);

                jQuery(`#${i}TDS_id`).val("0");
                //jQuery("#TDS_id" + i).val("0");
            }
            if (tdsamnt == 0) {
                jQuery("#divTDSmainbnk").hide();
            }
            else {
                jQuery("#divTDSmainbnk").show();
            }
            // $("#txt_tds_amnt").val(tot);
            var amt = jQuery("#txtPayAmount").val();
            
            var amt = jQuery("#txt_intrst_amt").val();
            // $("#txtTotalAmount").val(amt);
            _NcdBondRePayment.calcnetAmt();
           // _NcdBondRePayment.limitToFourDigits();


        }
       


    },

    //limitToFourDigits: function (inputField) {
    //    let value = inputField.value;

    //    // Restrict the input to 300 digits
    //    if (value.length > 300) {
    //        inputField.value = value.slice(0,300);
    //    }
    //},




    calcnetAmt: function (i) {

        var amount = jQuery("#txt_intrst_amt").val();
        var tdsamnt = jQuery("#txt_tds_amnt").val();
        var netAmnt = amount - tdsamnt;
        jQuery("#txt_tot").val(netAmnt);

        if (tdsamnt == 0) {
            jQuery("#divTDSmainbnk").hide();
        }
        else {
            jQuery("#divTDSmainbnk").show();
        }
    },



    getToAddDtls: function () {

        //var tdsamt1 = jQuery("#divTDSmainbnk").val();
        //var tdsamt1 = Number(jQuery("#divTDSmainbnk").val());
        //var tdsamt2 = jQuery("#divTDSmainbnk2").val();

        var tdsamt = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.tds1 + x.tds2), 0)

        var tds1Total = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += x.tds1, 0);
        var tds2Total = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += x.tds2, 0);

        var mainacc = jQuery("#ddl_mainAcc").val();
        var subacc = jQuery("#ddl_SubAcc").val();
        var amount = jQuery("#txtPayAmount").val();
        var amont = jQuery('#txt_intrst_amt').val();
        var value = jQuery('#ddl_TDS_main_bnk').val();
        var val = jQuery('#ddl_TDS_main_bnk2').val();
        /*var tds1 = jQuery('#ddl_TDS_main_bnk').val();
        var tds2 = jQuery('#ddl_TDS_main_bnk2').val();*/
        var anyZeroTds = _NcdBondRePayment.TdsAmount.filter(x => x.tds1 == 0 && x.tds2 == 0);

        if (amont == 0) {
            swal("", "Please select the check box..!", "error");
            return false;
        }
        //else if (tdsamt == 0) {
        //    swal("Please Enter TDs ....", "", "warning");
        //    return false;

        //}
        //else if (anyZeroTds.length > 0) {
        //    swal("TDS-1 and TDS-2 are both zero in one or more selections.", "", "warning");
        //    return false;
        //}

        else if (tds1Total > 0 && value == 0) {
            swal("Please TDs sub Bank Id1!!!....", "", "warning");
            return false;
        }
        else if (tds2Total > 0 && val == 0) {
            swal("Please TDs sub Bank Id2!!!....", "", "warning");
            return false;
        }
        else if (mainacc == 0) {
            swal("Please select main account!!!....", "", "warning");
            return false;

        }
        else if (subacc == 0) {
            swal("Please select sub account!!!....", "", "warning");
            return false;

        }


        else if (amount == "") {
            swal("Please Enter amount!!!....", "", "warning");
            return false;

        }
        else if (amount == 0) {
            swal("Please  enter greater than zero !!!....", "", "warning");
            return false;
        }
        else {

            //for (i = 0; i < tblData.length; i++) {

            //    if (tblData[i].subacc == subacc) {

            //        swal("Already Selected this Sub Account !!!....", "", "warning");
            //        return false;
            //    }
            //}

            if (tblData.find(x => x.subacc == subacc)) {

                swal("Already Selected this Sub Account !!!....", "", "warning");
                return false;
            }
            var RowData = {

                'mainacc': mainacc,
                'subacc': subacc,
                'amount': amount,

            };

            tblData.push(RowData);
            _NcdBondRePayment.AddCustomer(tblData);

            //jQuery('#ddl_TDS_main_bnk2').val("0");
            //jQuery('#ddl_TDS_main_bnk').val("0");

            jQuery('#ddl_TDS_main_bnk2').val();
            jQuery('#ddl_TDS_main_bnk').val();


            jQuery('#divTDSmainbnk').fadeOut();
            jQuery('#divTDSmainbnk2').fadeOut();

        }

    },

    AddCustomer: function (tblData) {

        if (tblData != null && tblData.length > 0) {

            jQuery('#maincards').show();
            jQuery('.page-loader-wrapper').hide();
            jQuery('#divcustomertable').empty();

            var $table = jQuery('<table class="table" id="tbladd">');
            $table.append
                ('<thead><tr> <th style="text-align:center;">Main Account</th><th style="text-align:center;">Sub Account</th><th style="text-align:center;">Amount</th><th style="text-align:center;">DELETE</th></thead>')
            var $tbody = jQuery('<tbody>');

            jQuery.each(tblData, function (i, val) {

                var $row = jQuery('<tr/>');
                // $row.append(jQuery('<td align="center">').html(i + 1));
                $row.append(jQuery('<td align="center">').html(val.mainacc));
                $row.append(jQuery('<td align="center">').html(val.subacc));
                $row.append(jQuery('<td align="center">').html(val.amount));


                $row.append(jQuery('<td align="center">').html('<button type="button" class="btnsmall  btn-danger fc-center" id="delete" name="submit"  onclick="ReversCon(' + i + ');" > <i class="fa fa-trash" class="bs-tooltip remove" style="font-size:15px;"></i></button> '));




                $tbody.append($row);

            });


            $tbody.append('</tbody>');
            $table.append($tbody);
            $table.append('</table>');
            jQuery('#divcustomertable').html($table);
        }
        else {
            jQuery('#maincards').hide();
            jQuery('#hodetailsentry').empty();
        }



        jQuery('.page-loader-wrapper').hide();
        _NcdBondRePayment.addamount(tblData);



        _NcdBondRePayment.clear();



    },


    clear: function (tblData) {
        jQuery("#ddl_mainAcc").val(0);
        jQuery("#ddl_SubAcc").val(0);

        jQuery("#txtPayAmount").val('');

    },
    addamount: function (tblData) {
        if (tblData != null && tblData.length > 0) {
            jQuery('#maincards').show();
            var AMOUNTtotalRent = 0;
            var AMOUNTtotalAdvance = 0;
            jQuery("#amttotal").html(0);

            jQuery.each(tblData, function (i, val) {

                AMOUNTtotalRent = (parseFloat(AMOUNTtotalRent) + parseFloat(val.amount));
                // AMOUNTtotalAdvance = (parseFloat(AMOUNTtotalAdvance) + parseFloat(val.SecurityDep));
                jQuery("#txtTotalAmount").html(AMOUNTtotalRent);
                jQuery('#txtTotalAmount').val(AMOUNTtotalRent);
                //jQuery("#txtTotalAmount").html(AMOUNTtotalAdvance);


            });

        }

        jQuery('.page-loader-wrapper').hide();
    },

    submitevalue: function () {
        if (_NcdBondRePayment.checkvalue()) {



            paymenttype = jQuery('#ddl_paymntype').val();

            if (paymenttype == 'automatic') {

                var tableData = document.getElementById('tbldespatchs');//2

                for (var i = 0; i < tableData.rows.length; i++) {

                    var limit = i + 1;
                    if (jQuery("#chkbx" + i + "m").prop("checked")) {

                        var loanid = tableData.rows[limit].cells[1].innerText;
                        var installment = tableData.rows[limit].cells[2].innerText;
                        var tsd1 = tableData.rows[limit].cells[5].querySelector('input').value;
                        var tsd2 = tableData.rows[limit].cells[6].querySelector('input').value;
                        var tdsamt = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.tds1 + x.tds2), 0);
                        var amount = tableData.rows[limit].cells[7].querySelector('input').value;
                        var tdsacc = jQuery('#ddl_TDS_main_bnk').val();
                        var tdsacc2 = jQuery('#ddl_TDS_main_bnk2').val();
                        /*var payamt = _NcdBondRePayment.recordAmount - tdsamt;*/
                        var payamt = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.amount - (x.tds1 + x.tds2)), 0);

                        var sumOfExcel = excelRows?.reduce((sum, x) => sum + x.NETTDS, 0) ?? 0;
                        var sumOfNetExcel = excelRows?.reduce((sum, x) => sum + x.NETAMNT, 0) ?? 0;
                        var tdsAmount1 = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.tds1), 0);
                        var tdsAmount2 = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.tds2), 0);
                        var recordAmount = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += x.amount, 0);
                        var sumOfInput = tdsAmount1 + tdsAmount2;
                        var sumTotal = recordAmount - (tdsAmount1 + tdsAmount2);
                       // str = response.data.lotNo;
                        // localStorage.setItem('lotNo');
                        //var lotNo = excelRows;

                        if (sumOfInput != sumOfExcel) {

                            swal("The tds amount in the excel is not equal to the total TDS", "", "warning");
                            jQuery('.page-loader-wrapper').hide();

                            return false;
                        }

                        if (sumOfNetExcel != payamt) {
                            swal("The payment amount in the excel is not equal to the total net amount", "", "warning");
                            jQuery('.page-loader-wrapper').hide();

                            return false;
                        }


                        if ((jQuery("#rbtInterest").prop("checked"))) {
                            paytype = 2;
                            var tblAmnt = loanid + "µ" + amount + "µ" + userdata.userId + "µ" + installment + "µ" + paytype + "µ" + tsd1 + "µ" + tsd2 + "µ" + tdsamt + "µ" + tdsacc + "µ" + tdsacc2 + "µ" + payamt + "µ" + 1 + "µ" + Lotnumber + "¥";
                        }
                        if ((jQuery("#rbtPrinciple").prop("checked"))) {
                            paytype = 1;
                            var tblAmnt = loanid + "µ" + amount + "µ" + userdata.userId + "µ" + installment + "µ" + paytype + "µ" + tsd1 + "µ" + tsd2 + "µ" + tdsamt + "µ" + tdsacc + "µ" + tdsacc2 + "µ" + payamt + "µ" + 1 + "µ" + Lotnumber + "¥";
                        }

                    }
                }
            } else {

                var tableData = document.getElementById('tbldespatchs');//2

                for (var i = 0; i < tableData.rows.length; i++) {

                    var limit = i + 1;
                    if (jQuery("#chkbx" + i + "m").prop("checked")) {

                        var loanid = tableData.rows[limit].cells[1].innerText;
                        var installment = tableData.rows[limit].cells[2].innerText;
                        var tsd1 = tableData.rows[limit].cells[5].querySelector('input').value;
                        var tsd2 = tableData.rows[limit].cells[6].querySelector('input').value;
                        var tdsamt = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.tds1 + x.tds2), 0);
                        var amount = tableData.rows[limit].cells[7].querySelector('input').value;
                        var tdsacc = jQuery('#ddl_TDS_main_bnk').val();
                        var tdsacc2 = jQuery('#ddl_TDS_main_bnk2').val();
                        /*var payamt = _NcdBondRePayment.recordAmount - tdsamt;*/
                        var payamt = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.amount - (x.tds1 + x.tds2)), 0);

                        //var sumOfExcel = excelRows?.reduce((sum, x) => sum + x.NETTDS, 0) ?? 0;
                        //var sumOfNetExcel = excelRows?.reduce((sum, x) => sum + x.NETAMNT, 0) ?? 0;
                        //var tdsAmount1 = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.tds1), 0);
                        //var tdsAmount2 = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.tds2), 0);
                        //var recordAmount = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += x.amount, 0);
                        //var sumOfInput = tdsAmount1 + tdsAmount2;
                        //var sumTotal = recordAmount - (tdsAmount1 + tdsAmount2);
                        //if (sumOfInput != sumOfExcel) {
                        //    swal("The tds amount in the excel is not equal to the total TDS", "", "warning");
                        //    jQuery('.page-loader-wrapper').hide();

                        //    return false;
                        //}

                        //if (sumOfNetExcel != sumTotal) {
                        //    swal("The payment amount in the excel is not equal to the total payment amount", "", "warning");
                        //    jQuery('.page-loader-wrapper').hide();

                        //    return false;
                        //}


                        if ((jQuery("#rbtInterest").prop("checked"))) {
                            paytype = 2;
                            var tblAmnt = loanid + "µ" + amount + "µ" + userdata.userId + "µ" + installment + "µ" + paytype + "µ" + tsd1 + "µ" + tsd2 + "µ" + tdsamt + "µ" + tdsacc + "µ" + tdsacc2 + "µ" + payamt + "µ" + 2 + "µ" + 0 +"¥";
                        }
                        if ((jQuery("#rbtPrinciple").prop("checked"))) {
                            paytype = 1;
                            var tblAmnt = loanid + "µ" + amount + "µ" + userdata.userId + "µ" + installment + "µ" + paytype + "µ" + tsd1 + "µ" + tsd2 + "µ" + tdsamt + "µ" + tdsacc + "µ" + tdsacc2 + "µ" + payamt + "µ" + 2 + "µ" + 0 + "¥";
                        }

                    }
                }
            }
          

            ////var tableData = document.getElementById('tbldespatchs');//2

            ////for (var i = 0; i < tableData.rows.length; i++) {

            ////    var limit = i + 1;
            ////    if (jQuery("#chkbx" + i + "m").prop("checked")) {

            ////        var loanid = tableData.rows[limit].cells[1].innerText;
            ////        var installment = tableData.rows[limit].cells[2].innerText;
            ////        var tsd1 = tableData.rows[limit].cells[5].querySelector('input').value;
            ////        var tsd2 = tableData.rows[limit].cells[6].querySelector('input').value;
            ////        var tdsamt = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.tds1 + x.tds2), 0);
            ////        var amount = tableData.rows[limit].cells[7].querySelector('input').value;
            ////        var tdsacc = jQuery('#ddl_TDS_main_bnk').val();
            ////        var tdsacc2 = jQuery('#ddl_TDS_main_bnk2').val();
            ////        /*var payamt = _NcdBondRePayment.recordAmount - tdsamt;*/
            ////        var payamt = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.amount - (x.tds1 + x.tds2)), 0);

            ////        var sumOfExcel = excelRows?.reduce((sum, x) => sum + x.NETTDS, 0) ?? 0;
            ////        var sumOfNetExcel = excelRows?.reduce((sum, x) => sum + x.NETAMNT, 0) ?? 0;
            ////        var tdsAmount1 = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.tds1), 0);
            ////        var tdsAmount2 = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += (x.tds2), 0);
            ////        var recordAmount = _NcdBondRePayment.TdsAmount.reduce((sum, x) => sum += x.amount, 0);
            ////        var sumOfInput = tdsAmount1 + tdsAmount2;
            ////        var sumTotal = recordAmount - (tdsAmount1 + tdsAmount2);
            ////        if (sumOfInput != sumOfExcel) {
            ////            swal("The tds amount in the excel is not equal to the total TDS", "", "warning");
            ////            jQuery('.page-loader-wrapper').hide();

            ////            return false;
            ////        }
                 
            ////        if (sumOfNetExcel != sumTotal) {
            ////            swal("The payment amount in the excel is not equal to the total payment amount", "", "warning");
            ////            jQuery('.page-loader-wrapper').hide();

            ////            return false;
            ////        }
                 

            ////        if ((jQuery("#rbtInterest").prop("checked"))) {
            ////            paytype = 2;
            ////            var tblAmnt = loanid + "µ" + amount + "µ" + userdata.userId + "µ" + installment + "µ" + paytype + "µ" + tsd1 + "µ" + tsd2 + "µ" + tdsamt + "µ" + tdsacc + "µ" + tdsacc2 + "µ" + payamt +"¥";
            ////        }
            ////        if ((jQuery("#rbtPrinciple").prop("checked"))) {
            ////            paytype = 1;
            ////            var tblAmnt = loanid + "µ" + amount + "µ" + userdata.userId + "µ" + installment + "µ" + paytype + "µ" + tsd1 + "µ" + tsd2 + "µ" + tdsamt + "µ" + tdsacc + "µ" + tdsacc2 + "µ" + payamt + "¥";
            ////        }

            ////    }
            ////}

            var tblAmntData = "";


            for (i = 0; i < tblData.length; i++) {


                //tblAmntData = tblAmntData + table.rows[i].cells[0].innerText + "µ" + table.rows[i].cells[1].innerText + "µ" + table.rows[i].cells[2].innerText + "µ" + table.rows[i].cells[3].innerText + "¥";
                tblAmntData = tblAmntData + tblData[i].mainacc + "µ" + tblData[i].subacc + "µ" + tblData[i].amount + "µ" + userdata.userId + "¥";


            }

            //var itmdata = ' ';
            //var table = document.getElementById('tblExcelData');
            //var rowLength = table.rows.length;
            //if (rowLength < 1) {
            //    swal("Upload Debenture cost ...!!!");
            //    return false;
            //}
            //for (var i = 1; i < rowLength; i++) {

            //    itmdata = itmdata + table.rows[i].cells[0].innerHTML + '£' + table.rows[i].cells[1].innerHTML + '£' + table.rows[i].cells[2].innerHTML + '£' + table.rows[i].cells[3].innerHTML + '£' + table.rows[i].cells[4].innerHTML + '£' + table.rows[i].cells[5].innerHTML.split("-")[0] + '£' + table.rows[i].cells[6].innerHTML.split("-")[0] + '£' + table.rows[i].cells[7].innerHTML.split("-")[0] + '£0£0£1æ';

            //}
            //itmdata = itmdata + '¥' + 2;
            //}

            var submitRequest = {

                Flag: "ncdbondrepaymentconfirm",

                PagVal: tblAmntData,//pqid
                parval: tblAmnt, //pdata
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };
            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _NcdBondRePayment.SubmitReturn, userdata.token)

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


    GetData: function () {

        if (jQuery('#fileUpload').val() == "") {
            swal("Choose a Excel File....!", "", "warning");
            jQuery('#fileUpload').val('');
            return false;
        }

        jQuery('.page-loader-wrapper').show();
        var fileUpload = document.getElementById("fileUpload");

        var fileUpload = document.getElementById("fileUpload");

        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;

        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();


                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                jQuery('.page-loader-wrapper').hide();
                swal("This browser does not support HTML5..!", "", "warning");
                return false;
            }
        }

        else {
            jQuery('.page-loader-wrapper').hide();
            swal("Upload a valid Excel..!", "", "warning");
            return false;
        }
    },
    checkvalue: function () {

        //var mainacc = jQuery('#ddl_mainAcc').val();
        //var subacc = jQuery('#ddl_SubAcc').val();
        //var account = jQuery('#ddl_accnt').val();

        

        if (jQuery("#rbtPublic").prop("checked") == false && jQuery("#rbtOther").prop("checked") == false) {
            swal("", "Please select an Option  Public issues and Other..!", "error");
            return false;
        }
        else if (jQuery("#rbtInterest").prop("checked") == false && jQuery("#rbtPrinciple").prop("checked") == false) {
            swal("", "Please select an Option Interest /principal..!", "error");
            return false;
        }
        else if (buttonClicked == false) {
            swal("", "Please click the Add Button", "error");
            return false;
        }

        else {
            return true;
        }

        
    },
    
    ExcelDataUpload: function () {
        jQuery('.page-loader-wrapper').show();
        if (excelRows == undefined) {

            swal("View Data and Verify...!", "", "warning");
            return false;
        }
        if (excelRows.length == 0) {
            swal("View Data and Verify...!", "", "warning");
            jQuery('.page-loader-wrapper').hide();

            return false;
        }
       
        var UploadReq = {
            "exTypeId": 1,
            "lotNo": "string",
            "userId": userdata.userId,
            //"debentureexcleuploadLists": excelRows
            "debentureexcleuploadLists": excelRows.map(x => {
                return {
                    
                    name: x.NAME,
                    bankac: x.BANKAC.toString(),
                    ifsc: x.IFSC,
                    panno: x.PANNO,
                    tosamt: (x.TOSAMT),
                    intrt: (x.INTRT),
                    grsInrst: (x.GrsInrst),
                    status: x.Status,
                    panStatus: x.Panstatus,
                    tdsrate: (x.TDSrate),
                    oprtPan: x.oprtpan?.toString(),
                    tdsamt: (x.TDSamt),
                    csnri: (x.CSNRI ),
                    nettds: (x.NETTDS),
                    netIntrsT: (x.NETINTRST),
                    princiPal:(x.Principal),
                    netamnt: (x.NETAMNT),
                   // Req_id: (x.REQ_ID)

                }
            })
            //"typeID": "4",
            //"userID": userdata.userId,
            //"branchID": userdata.branchId
        }


        //UploadRequest = JSON.stringify(UploadRequest);
        //UploadRequest = { "encryptedRqstStr": EncryptAPIReq(UploadRequest) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/debentureexcelupload", UploadReq, _NcdBondRePayment.ExcelDataUploadLoadCompleted, userdata.token)

    },

    ExcelDataUploadLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').show();

        if (response.status === "SUCCESS") {
          
            Lotnumber = response.data.lotNo;
          //  _BulkCollectionUpload.SaveData(str);

                // lotno = response.data.lotId;
              
               // jQuery('#maincard').hide();

           // excelRows = [];
           // jQuery('#fileUpload').val('');
            jQuery('.page-loader-wrapper').hide();

            swal("Uploaded Successfully..!", "", "success");
            
        }
        //else if (response.status === "AUTHERROR") {
        //    window.location.href = DOMAIN_URL + "?Id=1";
        //}
        else {
            swal("Something went wrong..!", response.responseMsg, "error");
           // jQuery('#fileUpload').val('');
            //jQuery('.page-loader-wrapper').hide();
        }
    },





}



jQuery(document).ready(function () {
    _NcdBondRePayment.getTdsbankid();
    _NcdBondRePayment.getTdsbankid2();

    jQuery('#rbtPublic').on("click", function () {
        jQuery("#divPrincInter").show();
        _NcdBondRePayment.TdsAmount = [];
    });

    jQuery('#rbtOther').on("click", function () {
        jQuery("#divPrincInter").show();
        _NcdBondRePayment.TdsAmount = [];
    });


    //jQuery('#btnUpload').on("click", function () {
       
    //    _NcdBondRePayment.ExcelDataUpload ();
    //});

    jQuery("#divPrincInter").on("change", function () {
        jQuery("#divmnth").show();
        _NcdBondRePayment.DivMnth();

    });
    jQuery("#divmnth").on("change", function () {
        jQuery("#divyear").show();
        _NcdBondRePayment.Divyear();

    });
    jQuery("#ddlyear").on("change", function () {

      //  _NcdBondRePayment.LoadTablerep();
        jQuery("#maincard").show();
        jQuery("#divAddAc-count").show();
        jQuery("#divTotal").show();
        jQuery("#addbtn").show();
        jQuery("#DivTotalAmnt").show();
        jQuery("#divpayment").show();
        jQuery("#divpaymentbnk").show();
        _NcdBondRePayment.PrincipleIntrest();


        
       


        //if (jQuery("#txt_tds_amnt").val() == "") {
        //    jQuery("#txt_tds_amnt").val(0)
        //}
        //if (jQuery("#txtTotalAmount").val() == "") {
        //    jQuery("#txtTotalAmount").val(0);
        //}
    });

    jQuery('#rbtInterest').on("click", function () {
       /* jQuery("#maincard").show();*/
        jQuery("#divAddAc-count").show();
        jQuery("#divTotal").show();
        jQuery("#addbtn").show();
        jQuery("#DivTotalAmnt").show();
        //jQuery("#divpayment").show();
       // jQuery("#divpaymentbnk").show();
       // _NcdBondRePayment.PrincipleIntrest();
        //_NcdBondRePayment.loadMainAccount();
        _NcdBondRePayment.tokenValidate();
    });

    jQuery('#rbtPrinciple').on("click", function () {
       // jQuery("#maincard").show();
        jQuery("#divAddAc-count").show();
        jQuery("#divTotal").show();
        jQuery("#addbtn").show();
        jQuery("#DivTotalAmnt").show();
       // jQuery("#divpayment").show();
       // jQuery("#divpaymentbnk").show();
       // _NcdBondRePayment.PrincipleIntrest();
        //_NcdBondRePayment.loadMainAccount();
        _NcdBondRePayment.tokenValidate();

    });

    jQuery("#ddl_mainAcc").on("change", function () {

        // jQuery("#ddlsubacsts").show();

        _NcdBondRePayment.loadSubAccount();
    });
    jQuery("#ddl_paymntype").on("change", function () {

        paymenttype = jQuery('#ddl_paymntype').val();

        if (paymenttype == 'automatic') {

            jQuery("#addbexl").show();

        } else {

            jQuery("#addbexl").hide();

        }
        

      jQuery("#ddlsubacsts").show();

       _NcdBondRePayment.loadPaymentbank();
   });

    //jQuery("#txtPayAmount").on("change", function () {

    //    // jQuery("#ddlsubacsts").show();


    //    _NcdBondRePayment.limitToFourDigits();
    //});


    jQuery("#btnAdd").on("click", function () {

        buttonClicked = true;
        _NcdBondRePayment.getToAddDtls();
    });


    jQuery("#btnConf").on("click", function () {


        _NcdBondRePayment.submitevalue();
    });
});
jQuery('#btnExit').on("click", function () {
    window.open("Dashboard", "_self");
});
//function ReversCon(i) {
//    tblData.splice(i, 1);
//    _NcdBondRePayment.AddCustomer(tblData);
//}


//function RepaymentDtls() {
//    var itmdata = '';
//    var table = document.getElementById('tblExcelData');
//    var rowLength = table.rows.length;

//    if (rowLength < 1) {
//        swal("", "Please View Debenture cost...!!!", "Error");
//        return false;
//    }

//    for (var i = 1; i < rowLength; i++) {
//        //itmdata = itmdata + table.rows[i].cells[1].innerText + '^' + table.rows[i].cells[2].innerText + '^' + table.rows[i].cells[3].innerText + '^' + table.rows[i].cells[4].innerText + '^' + $("[id*=hdUserId]").val() + 'æ';
//        //itmdatahtml = itmdatahtml + table.rows[i].cells[1].innerHTML + '^' + table.rows[i].cells[2].innerHTML + '^' + table.rows[i].cells[3].innerHTML + '^' + table.rows[i].cells[4].innerHTML + '^' + $("[id*=hdUserId]").val() + 'æ';

//        itmdata = itmdata + table.rows[i].cells[0].innerHTML + '£' + table.rows[i].cells[1].innerHTML + '£' + table.rows[i].cells[2].innerHTML + '£' + table.rows[i].cells[3].innerHTML + '£' + table.rows[i].cells[4].innerHTML + '£' + table.rows[i].cells[5].innerHTML.split("-")[0] + '£' + 'æ';
//    }
//    itmdata = itmdata + '¥' + 2;

//    _NcdBondRePayment.submitevalue(itmdata);
//    //alert(itmdata);
//}


 
function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });


    var firstSheet = workbook.SheetNames[0];


    excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    var table = document.createElement("table");
    table.border = "1";
    table.id = "tblExcelData";
    table.className = "table dataTable";

    //Add the header row.
    var row = table.insertRow(-1);

    //Add the header cells.
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "NAME";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "BANKAC";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "IFSC";
    row.appendChild(headerCell);
    headerCell.style = "";


    headerCell = document.createElement("TH");
    headerCell.innerHTML = "PANNO";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "TOSAMT";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "INTRT";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "GrsInrst";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Status";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Panstatus ";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "TDSrate";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = " oprtpan";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "TDSamt ";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "CSNRI";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "NETTDS";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "NETINTRST";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Principal";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "NETAMNT";
    row.appendChild(headerCell);
    headerCell.style = "";

    var flag = 0; rowNo = 0;
    //Add the data rows from Excel file.
    for (var i = 0; i < excelRows.length; i++) {
        //Add the data row.
        var row = table.insertRow(-1);
        // rowNo = i + 2;

        var cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["NAME"] != undefined ? excelRows[i]["NAME"] : 'N/A';

        var cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["BANKAC"] != undefined ? excelRows[i]["BANKAC"] : 'N/A';

        var cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["IFSC"] != undefined ? excelRows[i]["IFSC"] : 'N/A';

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["PANNO"] != undefined ? excelRows[i]["PANNO"] : 'N/A';

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].TOSAMT != undefined ? excelRows[i].TOSAMT : 'N/A';

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["INTRT"] != undefined ? excelRows[i]["INTRT"] : 'N/A';

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["GrsInrst"] != undefined ? excelRows[i]["GrsInrst"] : 'N/A';

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["Status"] != undefined ? excelRows[i]["Status"] : 'N/A';

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["Panstatus"] != undefined ? excelRows[i]["Panstatus"] : 'N/A';

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["TDSrate"] != undefined ? excelRows[i]["TDSrate"] : 'N/A';

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["oprtpan"] != undefined ? excelRows[i]["oprtpan"] : 'N/A';

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["TDSamt"] != undefined ? excelRows[i]["TDSamt"] : 'N/A';

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["CSNRI"] != undefined ? excelRows[i]["CSNRI"] : 'N/A';

        cell = row.insertCell(-1);

        cell.innerHTML = excelRows[i]["NETTDS"] != undefined ? excelRows[i]["NETTDS"] : 'N/A';


        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["NETINTRST"] != undefined ? excelRows[i]["NETINTRST"] : 'N/A';

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["Principal"] != undefined ? excelRows[i]["Principal"] : 'N/A';


        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["NETAMNT"] != undefined ? excelRows[i]["NETAMNT"] : 'N/A';



    }

    jQuery("#divclass").show();
    var dvExcel = document.getElementById("dvExcel");
    dvExcel.innerHTML = "";
    dvExcel.appendChild(table);
    jQuery('.page-loader-wrapper').hide();

}