var _NcdNCDBondRePaymentApprove = {
    //Select Debenture
    loadSelectDebenture: function () {
        jQuery('.page-loader-wrapper').show();

        if (jQuery("#rbtInterest").prop("checked") == true) {
            var paytype = 2;
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == true) {
            var paytype = 1;
        }

        var indata = paytype;
        var DebSelectDebenture = {
            Flag: "NCDBondAvailment",
            PagVal: "GetNCDRepayLoans_apr",
            parVal: indata.toString()
        };
        DebSelectDebenture = JSON.stringify(DebSelectDebenture);
        DebSelectDebenture = { "encryptedRqstStr": EncryptAPIReq(DebSelectDebenture) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectDebenture, _NcdNCDBondRePaymentApprove.FillDebSelectDebenture, userdata.token);

    },
    FillDebSelectDebenture: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlLoans").empty();
                jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SELECT DEBENTURE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlLoans").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlLoans").empty();
                jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT DEBENTURE-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Debenture RePayment Approval
    checkvalues: function () {
        // var NcdReSlctPymntTyp = jQuery('#rbtInterest').val()
        //var NcdReASlctDbntr = jQuery('#ddlLoans').val();
        var CIN = jQuery('#ddlLoans').val();
        if (jQuery("#rbtInterest").prop("checked") == false && jQuery("#rbtPrinciple").prop("checked") == false) {
            swal("", "Please select an Option Interest/principle..!", "error");
            return false;
        }
        else if (CIN == 0) {
            swal("", "Please Select Select Debenture", "error");
            return false;
        }

        else
            return true;
    },




    //Select table
    Getshowtablinterest: function () {
        jQuery('.page-loader-wrapper').show();
        var paytype;
        var sub = jQuery("#ddlLoans").val();


        if (jQuery("#rbtInterest").prop("checked") == true) {
            var paytype = 2;
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == true) {
            var paytype = 1;
        }



        var loanTypes = {
            Flag: "NCDBondAvailment",
            PagVal: "GetNCDReqData",
            parVal: sub + 'µ' + paytype


        };
        loanTypes = JSON.stringify(loanTypes);
        loanTypes = { "encryptedRqstStr": EncryptAPIReq(loanTypes) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", loanTypes, _NcdNCDBondRePaymentApprove.FillTables, userdata.token);
    },
    //fillTabledetResponseint: function (Response) {
    //    if (Response.data.message === "Success") {

    //        _NcdNCDBondRePaymentApprove.FillTables(Response);

    //    }
    //    else {

    //        return false;
    //    }
    //},
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
        var sub = jQuery("#ddlLoans").val();


        if (jQuery("#rbtInterest").prop("checked") == true) {
            var paytype = 2;
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == true) {
            var paytype = 1;
        }



        var FromLoanDtls = {
            Flag: "NCDBondAvailment",
            PagVal: "GetNCDReqData",
            parVal: sub + 'µ' + paytype


        };
        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _NcdNCDBondRePaymentApprove.FillTable, userdata.token);
    },
    //fillTabledetResponse: function (Response) {
    //    if (Response.data.message === "Success") {


    //        _NcdNCDBondRePaymentApprove.FillTable(Response);

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
        var sub = jQuery("#ddlLoans").val();


        if (jQuery("#rbtInterest").prop("checked") == true) {
            var paytype = 2;
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == true) {
            var paytype = 1;
        }



        var loanTypesprinc = {
            Flag: "NCDBondAvailment",
            PagVal: "GetNCDReqACCData",
            parVal: sub + 'µ' + paytype


        };
        loanTypesprinc = JSON.stringify(loanTypesprinc);
        loanTypesprinc = { "encryptedRqstStr": EncryptAPIReq(loanTypesprinc) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", loanTypesprinc, _NcdNCDBondRePaymentApprove.FillTableed, userdata.token);
    },
    //fillTabledetResponseinterto: function (Response) {
    //    if (Response.data.message === "Success") {

    //        _NcdNCDBondRePaymentApprove.FillTableed(Response);

    //    }
    //    else {

    //        return false;
    //    }
    //},
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
        var sub = jQuery("#ddlLoans").val();


        if (jQuery("#rbtInterest").prop("checked") == true) {
            var paytype = 2;
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == true) {
            var paytype = 1;
        }



        var loanTypesint = {
            Flag: "NCDBondAvailment",
            PagVal: "GetNCDReqACCData",
            parVal: sub + 'µ' + paytype


        };
        loanTypesint = JSON.stringify(loanTypesint);
        loanTypesint = { "encryptedRqstStr": EncryptAPIReq(loanTypesint) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", loanTypesint, _NcdNCDBondRePaymentApprove.FillTableedes, userdata.token);
    },
    //fillTabledetResponseprinto: function (Response) {
    //    if (Response.data.message === "Success") {

    //        _NcdNCDBondRePaymentApprove.FillTableedes(Response);

    //    }
    //    else {

    //        return false;
    //    }
    //},
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


                        jQuery('#Fidatatabllee').append($row);
                    });
                }
            }

        }
    },





    submitevalue: function () {
        if (_NcdNCDBondRePaymentApprove.checkvalues()) {
            if ((jQuery("#rbtInterest").prop("checked"))) {
                paytype = 2;


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

            }
            if ((jQuery("#rbtPrinciple").prop("checked"))) {
                paytype = 1;


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
            }


            if (paytype == 2) {

                var tblAmntData = main + "µ" + sub + "µ" + fcmain + "µ" + fcsubacc + "µ" + fcsubid + "µ" + tdssubacc + "µ" + tdsamont + "¥";
                // tblAmntData = tblAmntData + table.rows[1].cells[0].innerText + "µ" + table.rows[1].cells[1].innerText + "µ" + table.rows[1].cells[2].innerText + "µ" + table.rows[1].cells[3].innerText + "µ" + table.rows[1].cells[4].innerText + "µ" + table.rows[1].cells[5].innerText + "µ" + table.rows[1].cells[6].innerText + "¥";


                var tblAccntData = mainlonac + "µ" + subloanac + "µ" + amount + "µ" + paytype + "µ" + userdata.userId + "µ" + jQuery("#ddlLoans").val() + "¥";
                //tblAccntData = tblAccntData + tableData.rows[1].cells[0].innerText + "µ" + tableData.rows[1].cells[1].innerText + "µ" + tableData.rows[1].cells[2].innerText + "µ" + paytype + "µ" + $("[id*=hdUserId]").val() + "µ" + $("#ddlLoans").val() + "¥";


            }
            else if (paytype == 1) {

                var tblAmntData = main + "µ" + sub + "µ" + subid + "µ" + tdssubac + "µ" + tdsamount + "¥";
                //tblAmntData = tblAmntData + table.rows[1].cells[0].innerText + "µ" + table.rows[1].cells[1].innerText + "µ" + table.rows[1].cells[2].innerText + "µ" + table.rows[1].cells[3].innerText + "µ" + table.rows[1].cells[4].innerText + "¥";


                var tblAccntData = mainlonac + "µ" + subloanac + "µ" + amount + "µ" + paytype + "µ" + userdata.userId + "µ" + jQuery("#ddlLoans").val() + "¥";
                //tblAccntData = tblAccntData + tableData.rows[1].cells[0].innerText + "µ" + tableData.rows[1].cells[1].innerText + "µ" + tableData.rows[1].cells[2].innerText + "µ" + paytype + "µ" + $("[id*=hdUserId]").val() + "µ" + $("#ddlLoans").val() + "¥";


            }
            var submitRequest = {

                Flag: "REPAYMENTNCDBOND2",

                pagval: tblAccntData,
                ParVal: tblAmntData
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _NcdNCDBondRePaymentApprove.SubmitReturn, userdata.token)
        }

    },
    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                var msg = jQuery.trim(response.data.message);
                //var msg = String.prototype.trim(response.data.message);
                //  alert(response.data.errStatus);

                if (response.data.responseMsg = "SUCCESS") {
                    swal({
                        title: "Approve Successfully!",
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
    },






    rejectvalue: function () {
        if (_NcdNCDBondRePaymentApprove.checkvalues()) {
            if ((jQuery("#rbtInterest").prop("checked"))) {
                paytype = 2;


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

            }
            if ((jQuery("#rbtPrinciple").prop("checked"))) {
                paytype = 1;


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
            }


            if (paytype == 2) {

                var tblAmntData = main + "µ" + sub + "µ" + fcmain + "µ" + fcsubacc + "µ" + fcsubid + "µ" + tdssubacc + "µ" + tdsamont + "¥";
                // tblAmntData = tblAmntData + table.rows[1].cells[0].innerText + "µ" + table.rows[1].cells[1].innerText + "µ" + table.rows[1].cells[2].innerText + "µ" + table.rows[1].cells[3].innerText + "µ" + table.rows[1].cells[4].innerText + "µ" + table.rows[1].cells[5].innerText + "µ" + table.rows[1].cells[6].innerText + "¥";


                var tblAccntData = mainlonac + "µ" + subloanac + "µ" + amount + "µ" + paytype + "µ" + userdata.userId + "µ" + jQuery("#ddlLoans").val() + "¥";
                //tblAccntData = tblAccntData + tableData.rows[1].cells[0].innerText + "µ" + tableData.rows[1].cells[1].innerText + "µ" + tableData.rows[1].cells[2].innerText + "µ" + paytype + "µ" + $("[id*=hdUserId]").val() + "µ" + $("#ddlLoans").val() + "¥";


            }
            else if (paytype == 1) {

                var tblAmntData = main + "µ" + sub + "µ" + subid + "µ" + tdssubac + "µ" + tdsamount + "¥";
                //tblAmntData = tblAmntData + table.rows[1].cells[0].innerText + "µ" + table.rows[1].cells[1].innerText + "µ" + table.rows[1].cells[2].innerText + "µ" + table.rows[1].cells[3].innerText + "µ" + table.rows[1].cells[4].innerText + "¥";


                var tblAccntData = mainlonac + "µ" + subloanac + "µ" + amount + "µ" + paytype + "µ" + userdata.userId + "µ" + jQuery("#ddlLoans").val() + "¥";
                //tblAccntData = tblAccntData + tableData.rows[1].cells[0].innerText + "µ" + tableData.rows[1].cells[1].innerText + "µ" + tableData.rows[1].cells[2].innerText + "µ" + paytype + "µ" + $("[id*=hdUserId]").val() + "µ" + $("#ddlLoans").val() + "¥";


            }
            var submitRequest = {

                Flag: "REJECT_REPAYMENT_NCD",

                pagval: tblAccntData,
                ParVal: tblAmntData
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _NcdNCDBondRePaymentApprove.SubmitReturn, userdata.token)
        }

    },
    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                var msg = jQuery.trim(response.data.message);
                //var msg = String.prototype.trim(response.data.message);
                //  alert(response.data.errStatus);

                if (response.data.responseMsg = "SUCCESS") {
                    swal({
                        title: "rejected Successfully!",
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



}     



jQuery('#rbtInterest').on("change", function () {
    jQuery("#divloanshow").show();
    _NcdNCDBondRePaymentApprove.loadSelectDebenture();
});
jQuery('#rbtPrinciple').on("change", function () {
    jQuery("#divloanshow").show();
    _NcdNCDBondRePaymentApprove.loadSelectDebenture();


});

jQuery('#btnConf').on("click", function () {


    _NcdNCDBondRePaymentApprove.submitevalue();
});

jQuery('#btnrej').on("click", function () {


    _NcdNCDBondRePaymentApprove.rejectvalue();
});



jQuery('#ddlLoans').on("change", function () {
    jQuery('#divtblPrincpleIntDtl').show();


    if (jQuery("#rbtInterest").prop("checked") == true) {
        paytype = 2;
        _NcdNCDBondRePaymentApprove.Getshowtablinterest();
        _NcdNCDBondRePaymentApprove.Getshowtablinteresttwo();
    }
    else if (jQuery("#rbtPrinciple").prop("checked") == true) {
        paytype = 1;
        _NcdNCDBondRePaymentApprove.Getshowtablprincipal();
       _NcdNCDBondRePaymentApprove.Getshowtablprincipaltwo();
    }



});
jQuery('#btnExit').on("click", function () {
    window.open("Dashboard", "_self");
});