var _PreClosure = {
    //Select Fund Type
    loadFundLoan: function () {
        jQuery('.page-loader-wrapper').show();
        var DebSelectLoan = {
            Flag: "PreClosure",
            PagVal: "GetPreCloseFundType"
        };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectLoan, _PreClosure.FillDebSelectLoan, userdata.token);

    },
    FillDebSelectLoan: function (Response) {

        if (Response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();

            jQuery("#ddlFundType").empty();
            jQuery("#ddlFundType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SELECT LOAN -------- "));
            jQuery.each(Response.data.queryResult, function (i, val) {
                jQuery("#ddlFundType").append(jQuery("<option></option>").val(val.param1).text(val.param2));
            });

        }
        else {

            jQuery("#ddlFundType").empty();
            jQuery("#ddlFundType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT LOAN-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },

    //Select Financial Institution


    SelectFinancialInstitution: function () {
        jQuery('.page-loader-wrapper').show();



        var sub = jQuery('#ddlFundType').val();


        var FromLoanDtls = {
            Flag: "PreClosure",
            PagVal: "GetPreCloseFI",
            parVal: sub

        };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _PreClosure.FromLoanDtlsResponse, userdata.token);

    },
    FromLoanDtlsResponse: function (Response) {

        if (Response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();

            jQuery("#ddlFi").empty();
            jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------SELECT FINANCIAL INSTITUTION -------- "));
            jQuery.each(Response.data.queryResult, function (i, val) {
                jQuery("#ddlFi").append(jQuery("<option></option>").val(val.param1).text(val.param2));
            });

        }
        else {

            jQuery("#ddlFi").empty();
            jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------SELECT FINANCIAL INSTITUTION-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },












    //select Fund

    SelectFUNd: function (indata) {
        jQuery('.page-loader-wrapper').show();

        var Selectloan = {
            Flag: "PreClosure",
            PagVal: "GetPreCloseLoans",
            ParVal: indata

        };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectdataQueries", Selectloan, _PreClosure.FillSelectloan, userdata.token);

    },
    FillSelectloan: function (Response) {

        if (Response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();

            jQuery("#ddlLoans").empty();
            jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SELECT FUND -------- "));
            jQuery.each(Response.data.queryResult, function (i, val) {
                jQuery("#ddlLoans").append(jQuery("<option></option>").val(val.param1).text(val.param2));
            });

        }
        else {

            jQuery("#ddlLoans").empty();
            jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FUND -------- "));
        }
        jQuery('.page-loader-wrapper').hide();
    },




    //Table display
    ShowTable: function () {
        jQuery('.page-loader-wrapper').show();
        /*var sub = jQuery("#ddl_Reqst").val();*/
        var M = jQuery('#ddlLoans').val();
        var centerSplit = M.split('µ');
        var sub = centerSplit[0];
        //var loanlimit = centerSplit[1];

        var FromLoanDtls = {
            Flag: "PreClosure",
            PagVal: "getTableNewLoanDtls",
            parVal: sub

        };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _PreClosure.FillTable, userdata.token);

    },
    FillTable: function (Response) {
        if (Response.status === "SUCCESS") {

            jQuery('.page-loader-wrapper').hide();
            jQuery('#maincard').show();

            if (Response.data.queryResult.length > 0) {

                jQuery('#Fidatatabl').empty();
                jQuery.each(Response.data.queryResult, function (i, val) {

                    var $row = jQuery('<tr/>');
                    var data1 = val.param1.split("~");
                    //var nval = nval + 1;


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
                    jQuery('#Fidatatabl').append($row);

                });
            }

        }
    },






    /*Second Table display*/
    Secondtable: function () {
        jQuery('.page-loader-wrapper').show();
        /*var sub = jQuery("#ddl_Reqst").val();*/
        var M = jQuery('#ddlLoans').val();
        var centerSplit = M.split('µ');
        var sub = centerSplit[0];
        //var loanlimit = centerSplit[1];

        var FromLoanDtls = {
            Flag: "PreClosure",
            PagVal: "getTablePreCloseDtlsEmi",
            parVal: sub

        };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _PreClosure.FillTable1, userdata.token);

    },
    FillTable1: function (Response) {
        if (Response.status === "SUCCESS") {

            jQuery('.page-loader-wrapper').hide();
            jQuery('#maincard1').show();

            if (Response.data.queryResult.length > 0) {

                jQuery('#Fidatatabll').empty();
                jQuery.each(Response.data.queryResult, function (i, val) {

                    var $row = jQuery('<tr/>');
                    var data1 = val.param1.split("~");
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
                    /* $row.append(jQuery('<td class="HCol" align="left">').html(data1[9]));*/
                    jQuery('#Fidatatabll').append($row);
                    _PreClosure.newloanfillemitableemi(Response.data.queryResult);
                });
            }

        }
    },


    //////




    newloanfillemitableemi: function (data1) {
        jQuery("#Fidatatabll").empty();
        var valData, valData1;
        var n = 0;
        var pamt = 0;
        var iamt = 0;
        valData = data1.split('~');
        if (jQuery("#Fidatatabll tr").length == 0) {
            jQuery('#Fidatatabll').append('<thead class="bg-success text-white"><tr><th scope="col">LoanID</th><th scope="col">InstallmentNo</th><th scope="col">InstallmentType</th><th scope="col">InstallmentFrequency</th><th scope="col">Amount</th><th scope="col">PenaltyAmount</th><th scope="col">InterestFromDate</th><th scope="col">InterestToDate</th><th scope="col">PaymentDate</th></tr></thead>');
        }
        for (i = 0; i < valData.length - 1; i++) {
            valData1 = valData[i].split('µ');
            if (valData1[2] == "Interest") {
                iamt = iamt + parseFloat(valData1[4]);
            }
            else {
                pamt = pamt + parseFloat(valData1[4]);
            }
            jQuery('#Fidatatabll').append('<tbody><tr>' +
                '<td>' + valData1[0] + '</td>' +
                '<td>' + valData1[1] + '</td>' +
                '<td>' + valData1[2] + '</td>' +
                '<td>' + valData1[3] + '</td>' +
                '<td>' + valData1[4] + '</td>' +
                '<td>' + valData1[5] + '</td>' +
                '<td>' + valData1[6] + '</td>' +
                '<td>' + valData1[7] + '</td>' +
                '<td>' + valData1[8] + '</td>' +
                //'<td>' + valData1[9] + '</td>' +
                '</tr> </tbody>');
        }


        jQuery("#txtloanbal").val(pamt.toFixed(2));
        LoanBalWords.innerHTML = AmountToWords(pamt.toFixed(2));
        //$("#txtIntAmt").val(iamt.toFixed(2));
        // IntAmtWords.innerHTML = AmountToWords(iamt.toFixed(2));
    },





    //Select Main Accout 
    SelectMainacct: function () {
        jQuery('.page-loader-wrapper').show();
        var DebSelectLoan = {
            Flag: "PreClosure",
            PagVal: "GetBnkID"
        };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectLoan, _PreClosure.FillDebMainAcct, userdata.token);

    },
    FillDebMainAcct: function (Response) {

        if (Response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();

            jQuery("#ddl_mainAcc").empty();
            jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SELECT LOAN -------- "));
            jQuery.each(Response.data.queryResult, function (i, val) {
                jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val(val.param1).text(val.param2));
            });

        }
        else {

            jQuery("#ddl_mainAcc").empty();
            jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT LOAN-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },

    //Select Sub Account 


    SelectSubAccount: function () {
        jQuery('.page-loader-wrapper').show();

        var M = jQuery('#ddl_mainAcc').val();
        var centerSplit = M.split('µ');
        var sub = centerSplit[0];

        var sub = jQuery('#ddl_mainAcc').val();


        var FromLoanDtls = {
            Flag: "PreClosure",
            PagVal: "GetMainBnkID",
            parVal: sub

        };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _PreClosure.FromSelectSunAcct, userdata.token);

    },
    FromSelectSunAcct: function (Response) {

        if (Response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();

            jQuery("#ddl_SubAcc").empty();
            jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val("0").text(" --------SELECT SUB ACCOUNT -------- "));
            jQuery.each(Response.data.queryResult, function (i, val) {
                jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val(val.param1).text(val.param2));
            });

        }
        else {

            jQuery("#ddl_SubAcc").empty();
            jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val("0").text(" --------SELECT SUB ACCOUNT-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },

    //Finanace Cost Main Bank  
    FFinanceCostMainBank: function () {
        jQuery('.page-loader-wrapper').show();




        var FromLoanDtls = {
            Flag: "PreClosure",
            PagVal: "GetINTFIAcc",


        };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _PreClosure.FinanceCostMainBank, userdata.token);

    },
    FinanceCostMainBank: function (Response) {

        if (Response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();

            jQuery("#ddl_intfc_main_bnk").empty();
            jQuery("#ddl_intfc_main_bnk").append(jQuery("<option></option>").val("0").text(" --------SELECT Finanace Cost Main Bank -------- "));
            jQuery.each(Response.data.queryResult, function (i, val) {
                jQuery("#ddl_intfc_main_bnk").append(jQuery("<option></option>").val(val.param1).text(val.param2));
            });

        }
        else {

            jQuery("#ddl_intfc_main_bnk").empty();
            jQuery("#ddl_intfc_main_bnk").append(jQuery("<option></option>").val("0").text(" --------SELECT Finanace Cost Main Bank -------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },



    //Finanace Cost Sub Bank


    FinanaceCostSubBank: function () {
        jQuery('.page-loader-wrapper').show();

        var M = jQuery('#ddl_intfc_main_bnk').val();
        var centerSplit = M.split('µ');
        var sub = centerSplit[0];

        var sub = jQuery('#ddl_intfc_main_bnk').val();


        var FromLoanDtls = {
            Flag: "PreClosure",
            PagVal: "GetINTFISubAcc",
            parVal: sub

        };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _PreClosure.Financecostsubbank, userdata.token);

    },
    Financecostsubbank: function (Response) {

        if (Response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();

            jQuery("#ddl_intfc_sub_bnk").empty();
            jQuery("#ddl_intfc_sub_bnk").append(jQuery("<option></option>").val("0").text(" --------SELECT Finanace Cost Sub Bank -------- "));
            jQuery.each(Response.data.queryResult, function (i, val) {
                jQuery("#ddl_intfc_sub_bnk").append(jQuery("<option></option>").val(val.param1).text(val.param2));
            });

        }
        else {

            jQuery("#ddl_intfc_sub_bnk").empty();
            jQuery("#ddl_intfc_sub_bnk").append(jQuery("<option></option>").val("0").text(" --------SELECT Finanace Cost Sub Bank-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },






    //Finance Cost Contra Id


    FinanaceCostContraId: function () {
        jQuery('.page-loader-wrapper').show();

        //var M = jQuery('#ddlLoans').val();
        //var centerSplit = M.split('µ');
        //var F1 = centerSplit[0];

        //var N = jQuery('#ddl_intfc_main_bnk').val();
        //var centerSplit = N.split('µ');
        //var F2 = centerSplit[0];

        //var O = jQuery('#ddl_intfc_sub_bnk').val();
        //var centerSplit = O.split('µ');
        //var F3 = centerSplit[0];


        //var indata = F1 + 'µ' + F2 + 'µ' + F3;

        var indata = jQuery('#ddl_intfc_main_bnk').val() + 'µ' + jQuery('#ddl_intfc_sub_bnk').val() + 'µ' + jQuery('#ddlLoans').val();


        var FromLoanDtls = {
            Flag: "PreClosure",
            PagVal: "GetINTFISubId",
            parVal: indata

        };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _PreClosure.FinancecostContraid, userdata.token);

    },
    FinancecostContraid: function (Response) {

        if (Response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();

            jQuery("#ddl_IfSubid").empty();
            jQuery("#ddl_IfSubid").append(jQuery("<option></option>").val("0").text(" --------SELECT Finance Cost Contra Id-------- "));
            jQuery.each(Response.data.queryResult, function (i, val) {
                jQuery("#ddl_IfSubid").append(jQuery("<option></option>").val(val.param1).text(val.param2));
            });

        }
        else {

            jQuery("#ddl_IfSubid").empty();
            jQuery("#ddl_IfSubid").append(jQuery("<option></option>").val("0").text(" --------SELECT Finance Cost Contra Id-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },
    //New Preclosure Request popup
    checkvalues: function () {
        var SelectFundType = jQuery('#ddlFundType').val();
        var SLTFinstitn = jQuery('#ddlFi').val();
        var SelectFund = jQuery('#ddlLoans').val();
        //var SBlancelnamt = jQuery('#txtloanbal').val();
        //var SBlanceintsrtamt = jQuery('#txtIntAmt').val();
        var SMAmt = jQuery('#ddl_mainAcc').val();
        var SSAmt = jQuery('#ddl_SubAcc').val();
        var SFCMBank = jQuery('#ddl_intfc_main_bnk').val();
        var SFCSBank = jQuery('#ddl_intfc_sub_bnk').val();
        var SFCCBank = jQuery('#ddl_IfSubid').val();





        if (SelectFundType == 0) {
            swal("", "Please Select Fund Type", "error");
            return false;
        }
        else if (SLTFinstitn == 0) {
            swal("", "Please  Select Financial Institution", "error");
            return false;
        }
        else if (SelectFund == 0) {
            swal("", "Please Select Fund", "error");
            return false;
        }
        //else if (SBlancelnamt == 0 ) {
        //    swal("", "Please Select Balance Loan Amount", "error");
        //    return false;
        //}
        //else if (SBlanceintsrtamt == 0 ) {
        //    swal("", "Please Select Balance Interest Amount", "error");
        //    return false;
        //}
        else if (SMAmt == 0) {
            swal("", "Please Select Main Account", "error");
            return false;
        }
        else if (SSAmt == 0) {
            swal("", "Please Select Sub Account", "error");
            return false;
        }
        else if (SFCMBank == 0) {
            swal("", "Please Select Finance Cost Main Bank", "error");
            return false;
        }
        else if (SFCSBank == 0) {
            swal("", "Please Select Finance Cost Sub Bank", "error");
            return false;
        }
        else if (SFCCBank == 0) {
            swal("", "Please Select Finance Cost Contra Id", "error");
            return false;
        }
        else
            return true;

    },





// validation confirm button.

    Confirmfntn: function () {

        if (_PreClosure.checkvalues()) {

            var sltfund = jQuery("#ddlLoans").val();
            var BLAmt = jQuery("#txtloanbal").val();
            var BIAmt = jQuery("#txtIntAmt").val();
            var MAmt = jQuery("#ddl_mainAcc").val();
            var FCMB = jQuery("#ddl_intfc_main_bnk").val();
            var FCSB = jQuery("#ddl_intfc_sub_bnk").val();
            var FCCB = jQuery("#ddl_IfSubid").val();
            var SubAcc;
            SubAcc = $('#ddl_SubAcc').val();
            if (SubAcc == null) {
                var s = 0;
            }
            else {
                s = SubAcc;
            }
            var loanData = sltfund + "¥" + BLAmt + "¥" + BIAmt + "¥" + MAmt + "¥" + s + "¥" + userdata.userId + "¥" + FCMB + "¥" + FCSB + "¥" + FCCB;


            var submitRequest = {

                Flag: "PRECLOSURE1",
                ParVal: loanData
            };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _PreClosure.SubmitReturn, 'dfgdfgfgdfgdfgd')
        }

    },
    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            var msg = jQuery.trim(response.data.message);
            //var msg = String.prototype.trim(response.data.message);
            if (response.data.errStatus = "1") {
               var pmsg= response.data.queryResult[0].param1.split('#');
                if (pmsg[0] == "0") {
                    swal({
                        title: "Confirmed Successfully!",
                        text: "",
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
                else if (pmsg[0] == "1") {
                    swal({
                        title: "Confirmed Successfully!",
                        text: "",
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
                else if (pmsg[0] == "2") {
                    swal({
                        title: "Please Select Payment Sub Ledger..!!! ",
                        text: "",
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
                else if (pmsg[0] == "3") {
                    swal({
                        title: "Please Select Correct Payment Sub Ledger..!!!  ",
                        text: "",
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
                else if (pmsg[0] == "4") {
                    swal({
                        title: "Loan Amount Exceeds the Loan Limit of " || pmsg[1] || "..!!!" ,
                        text: "",
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
                else {
                    swal({
                        title: "Error!",
                        text: "",
                        type: "Error"
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






    },
}

jQuery(document).ready(function () {

        _PreClosure.loadFundLoan();
        jQuery('#divMainacct').show();
        _PreClosure.SelectMainacct();
        jQuery('#ddlFundType').on("change", function () {

            jQuery('#selFinIns').show();

            _PreClosure.SelectFinancialInstitution();
        });
        jQuery('#ddlFi').on("change", function () {
            jQuery('#divselectFund').show();
            var indata = jQuery("#ddlFi").val() + 'µ' + jQuery("#ddlFundType").val();

            _PreClosure.SelectFUNd(indata);
        });



        jQuery('#ddlLoans').on("change", function () {
            jQuery('#maincard').show();
            jQuery('#maincard2').show();

            _PreClosure.ShowTable();
            _PreClosure.Secondtable();
            /*_PreClosure.newloanfillemitableemi(data1);*/

        });

        jQuery('#ddl_mainAcc').on("change", function () {

            jQuery('#subacst').show();
            jQuery('#divintfinmainbnk').show();

            _PreClosure.SelectSubAccount();
            _PreClosure.FFinanceCostMainBank();

           

        });

        jQuery('#ddl_intfc_main_bnk').on("change", function () {

            jQuery('#divintfinsubbnk').show();

            _PreClosure.FinanaceCostSubBank();
        });

        jQuery('#ddl_intfc_sub_bnk').on("change", function () {

            jQuery('#divintfinsubid').show();


            _PreClosure.FinanaceCostContraId();
        });

    jQuery('#ddlFi').on("change", function () {

        jQuery('#divselectFund').show();


        /*_PreClosure.FinanaceCostContraId();*/
    });

        jQuery('#btnconfirm').on("click", function () {


            _PreClosure.Confirmfntn();
        });

});
jQuery('#btnexit').on("click", function () {
    window.open("Dashboard", "_self");
});







