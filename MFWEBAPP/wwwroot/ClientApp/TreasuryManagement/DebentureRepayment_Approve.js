
var DebentureRepayment_Approve = {


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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, DebentureRepayment_Approve.checkAccessRtn, token)
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
                    DebentureRepayment_Approve.loadSelectDebenture();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, DebentureRepayment_Approve.checkAccessToken, userdata.token)
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
                DebentureRepayment_Approve.loadSelectDebenture();
            }


        }
    },




    //Select Debenture
    loadSelectDebenture: function () {
        jQuery('.page-loader-wrapper').show();

        //var Debenture = jQuery("#ddlLoans option:selected").text().split(" - "); 
        //var pjt_code = stockStickerDtl[1];
        //var Doc_ID = stockStickerDtl[2];
        //var Amount = stockStickerDtl[3];
        //var Tenure = stockStickerDtl[4];
        //var Project_Code = stockStickerDtl[4];
        //var Intallment_No = stockStickerDtl[4];
        //var Lot_number = stockStickerDtl[4];

        // var stockStickerDtl = $("#ddlStockSticker option:selected").text().split(" - ");




        if (jQuery("#rbtInterest").prop("checked") == true) {
            var paytype = 2;
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == true) {
            var paytype = 1;
        }

        var indata = paytype;
        var DebSelectDebenture = {
            Flag: "debenture_aprv",
            PagVal: "GetNCDRepayLoans_apr",
            parVal: indata.toString(),
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebSelectDebenture = JSON.stringify(DebSelectDebenture);
        DebSelectDebenture = { "encryptedRqstStr": EncryptAPIReq(DebSelectDebenture) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectDebenture, DebentureRepayment_Approve.FillDebSelectDebenture, userdata.token);

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
        /* var payment = jQuery('#ddlPaymentType').val();*/
        var CIN = jQuery('#ddlLoans').val();
        if (jQuery("#rbtInterest").prop("checked") == false && jQuery("#rbtPrinciple").prop("checked") == false) {
            swal("", "Please select an Option Interest/principle..!", "error");
            return false;
        }
        else if (CIN == 0) {
            swal("", "Please Select Select Debenture", "error");
            return false;
        }
        //else if (payment == 0) {
        //    swal("", "Please Select Payment Type ", "error");
        //    return false;
        //}
        //else if (bank == 0) {
        //    swal("", "Please Select Payment Bank ", "error");
        //    return false;
        //}

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
            Flag: "debenture_aprv",
            PagVal: "GetNCDReqData",
            parVal: sub + 'µ' + paytype,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId


        };
        loanTypes = JSON.stringify(loanTypes);
        loanTypes = { "encryptedRqstStr": EncryptAPIReq(loanTypes) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", loanTypes, DebentureRepayment_Approve.FillTables, userdata.token);
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
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[8]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[9]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[10]));

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
            Flag: "debenture_aprv",
            PagVal: "GetNCDReqData",
            parVal: sub + 'µ' + paytype,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId


        };
        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, DebentureRepayment_Approve.FillTable, userdata.token);
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
                        /*  $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));*/
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[8]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[9]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[10]));


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
            Flag: "debenture_aprv",
            PagVal: "GetNCDReqACCData",
            parVal: sub + 'µ' + paytype,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId


        };
        loanTypesprinc = JSON.stringify(loanTypesprinc);
        loanTypesprinc = { "encryptedRqstStr": EncryptAPIReq(loanTypesprinc) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", loanTypesprinc, DebentureRepayment_Approve.FillTableed, userdata.token);
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
        var sub = jQuery("#ddlLoans").val();


        if (jQuery("#rbtInterest").prop("checked") == true) {
            var paytype = 2;
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == true) {
            var paytype = 1;
        }



        var loanTypesint = {
            Flag: "debenture_aprv",
            PagVal: "GetNCDReqACCData",
            parVal: sub + 'µ' + paytype,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId


        };
        loanTypesint = JSON.stringify(loanTypesint);
        loanTypesint = { "encryptedRqstStr": EncryptAPIReq(loanTypesint) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", loanTypesint, DebentureRepayment_Approve.FillTableedes, userdata.token);
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
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));


                        jQuery('#Fidatatabllee').append($row);
                    });
                }
            }

        }
    },

    //table 3
    loaddata: function () {
        jQuery('.page-loader-wrapper').show();


        var Lotnumber = jQuery("#ddlLoans").val();

        var loandata = {
            Flag: "debenture_aprv",
            PagVal: "fincialcost",
            parVal: Lotnumber,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        loandata = JSON.stringify(loandata);
        loandata = { "encryptedRqstStr": EncryptAPIReq(loandata) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", loandata, DebentureRepayment_Approve.FillTable1, userdata.token);

    },



    FillTable1: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();
                jQuery('#maincardss').show();

                if (response.data.queryResult.QueryResult.length > 0) {

                    jQuery('#Fidatatbl').empty();
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
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[11]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[12]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[13]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[14]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[15]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[16]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[17]));




                        jQuery('#Fidatatbl').append($row);
                    });
                }
            }

        }
    },

    // payment function 
    payment: function (payment_mode) {


        var loan_no = jQuery("#ddlLoans").val();



        var paymentRequest = {
            fileId: loan_no,
            customerId: loan_no,
            paymentMode: payment_mode,


        };
        //paymentRequest = JSON.stringify(paymentRequest);
        //paymentRequest = { "encryptedRqstStr": EncryptAPIReq(paymentRequest) };

        _http.post(MFPUBLICLMSAPI_URL + "api/disbursement/BOBDisbursement", paymentRequest, DebentureRepayment_Approve.paymentReturn, userdata.token)


    },



    paymentReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            //response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            //if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


            var msg = jQuery.trim(response.data.message);
            //var msg = String.prototype.trim(response.data.message);

            //if (response.status === "SUCCESS") {
            //    var msg = jQuery.trim(response.data.message);
            //    //var msg = String.prototype.trim(response.data.message);
            //    //  alert(response.data.errStatus);
            //    if (response.data.queryResult.QueryResult[0].Param1 == "1") {
            //        _aprvLoanApr.payment();
            swal({
                title: "Approved Successfully!",
                text: "",
                type: "success"
            }, function () {
                window.location.reload(true);
            });
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

    submitevalue: function () {
        if (DebentureRepayment_Approve.checkvalues()) {

            if ((jQuery("#rbtInterest").prop("checked"))) {
                paytype = 2;


                var tableData = document.getElementById('tbldespatch');//1 table
                var main = tableData.rows[1].cells[0].innerText;
                var sub = tableData.rows[1].cells[1].innerText;
                var fcmain = tableData.rows[1].cells[2].innerText;
                var fcsubacc = tableData.rows[1].cells[3].innerText;
                var fcsubid = tableData.rows[1].cells[4].innerText;
                var tdssubacc = tableData.rows[1].cells[5].innerText;
                var tdssubacc2 = tableData.rows[1].cells[6].innerText;
                var tds1 = tableData.rows[1].cells[7].innerText;
                var tds2 = tableData.rows[1].cells[8].innerText;
                var tdsamont = tableData.rows[1].cells[9].innerText;



                var tblAccntData = document.getElementById('tbldespatchint');//2 table
                var mainlonac = tblAccntData.rows[1].cells[0].innerText;
                var subloanac = tblAccntData.rows[1].cells[1].innerText;
                var amount = tblAccntData.rows[1].cells[2].innerText;


                var input = jQuery("#ddlLoans").val();
                var lot = input.split('µ');
                var Lotnumber = lot[2];
                if (Lotnumber == 0) {

                    jQuery("#tbldespatch1").hide();
                }
                else {

                    var tblAccntDatas = document.getElementById('tbldespatch1');//3 table
                    var Lotnumber = tblAccntDatas.rows[1].cells[17].innerText;
                }
            }
            if ((jQuery("#rbtPrinciple").prop("checked"))) {
                paytype = 1;


                var tableData = document.getElementById('tbldespatchprin');//1
                var main = tableData.rows[1].cells[0].innerText;
                var sub = tableData.rows[1].cells[1].innerText;
                var subid = tableData.rows[1].cells[2].innerText;
                var tdssubac = tableData.rows[1].cells[3].innerText;
                var tdssubacc2 = tableData.rows[1].cells[4].innerText;
                var tds1 = tableData.rows[1].cells[5].innerText;
                var tds2 = tableData.rows[1].cells[6].innerText;
                var tdsamount = tableData.rows[1].cells[7].innerText;


                var tblAccntData = document.getElementById('tbldespatchprnc');//2
                var mainlonac = tblAccntData.rows[1].cells[0].innerText;
                var subloanac = tblAccntData.rows[1].cells[1].innerText;
                var amount = tblAccntData.rows[1].cells[2].innerText;

                var input = jQuery("#ddlLoans").val();
                var lot = input.split('µ');
                var Lotnumber = lot[2];
                if (Lotnumber == 0) {

                    jQuery("#tbldespatch1").hide();

                }
                else {

                    var tblAccntDatas = document.getElementById('tbldespatch1');//3 table
                    var Lotnumber = tblAccntDatas.rows[1].cells[17].innerText;

                }

            }


            if (paytype == 2) {

                var tblAmntData = main + "µ" + sub + "µ" + fcmain + "µ" + fcsubacc + "µ" + fcsubid + "µ" + tdssubacc + "µ" + tdssubacc2 + "µ" + tds1 + "µ" + tds2 + "µ" + tdsamont + "µ" + Lotnumber + "¥";
                // tblAmntData = tblAmntData + table.rows[1].cells[0].innerText + "µ" + table.rows[1].cells[1].innerText + "µ" + table.rows[1].cells[2].innerText + "µ" + table.rows[1].cells[3].innerText + "µ" + table.rows[1].cells[4].innerText + "µ" + table.rows[1].cells[5].innerText + "µ" + table.rows[1].cells[6].innerText + "¥";


                var tblAccntData = mainlonac + "µ" + subloanac + "µ" + amount + "µ" + paytype + "µ" + userdata.userId + "µ" + jQuery("#ddlLoans").val() + "¥";
                //tblAccntData = tblAccntData + tableData.rows[1].cells[0].innerText + "µ" + tableData.rows[1].cells[1].innerText + "µ" + tableData.rows[1].cells[2].innerText + "µ" + paytype + "µ" + $("[id*=hdUserId]").val() + "µ" + $("#ddlLoans").val() + "¥";

                // var tblAccntDatas = Lotnumber + "¥";

            }
            else if (paytype == 1) {

                var tblAmntData = main + "µ" + sub + "µ" + subid + "µ" + tdssubac + "µ" + tdssubacc2 + "µ" + tds1 + "µ" + tds2 + "µ" + tdsamount + "µ" + Lotnumber + "¥";
                //tblAmntData = tblAmntData + table.rows[1].cells[0].innerText + "µ" + table.rows[1].cells[1].innerText + "µ" + table.rows[1].cells[2].innerText + "µ" + table.rows[1].cells[3].innerText + "µ" + table.rows[1].cells[4].innerText + "¥";


                var tblAccntData = mainlonac + "µ" + subloanac + "µ" + amount + "µ" + paytype + "µ" + userdata.userId + "µ" + jQuery("#ddlLoans").val() + "¥";
                //tblAccntData = tblAccntData + tableData.rows[1].cells[0].innerText + "µ" + tableData.rows[1].cells[1].innerText + "µ" + tableData.rows[1].cells[2].innerText + "µ" + paytype + "µ" + $("[id*=hdUserId]").val() + "µ" + $("#ddlLoans").val() + "¥";

                // var tblAccntDatas = Lotnumber + "¥";

            }
            var submitRequest = {

                Flag: "REPAYMENTNCDBOND2",

                pagval: tblAccntData,
                ParVal: tblAmntData,

                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, DebentureRepayment_Approve.SubmitReturn, userdata.token)
        }

    },
    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                var msg = jQuery.trim(response.data.message);


                if (response.data.errStatus = "1") {
                    if (response.data.queryResult.QueryResult[0].Param1 == "1") {

                        var paramtwo = response.data.queryResult.QueryResult[0].Param2;
                        var param2split = paramtwo.split("~");
                        var payment_type = param2split[0];
                        var payment_mode = param2split[1];
                        if (payment_type == "1") {


                            DebentureRepayment_Approve.payment(payment_mode);


                            //swal({
                            //    title: "Approved Successfully!",
                            //    text: "",
                            //    type: "success"
                            //}, function () {
                            //    window.location.reload(true);
                            //});
                        }
                        //manual reponse
                        else {
                            swal({
                                title: "Approved Successfully!",
                                text: "",
                                type: "success"
                            }, function () {
                                window.location.reload(true);
                            });
                        }
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
        }
        else if (response.responseMsg == "Invalid Token") {
            window.location.href = DOMAIN_URL;
        }
        //else {
        //    var msg = jQuery.trim(response.responseMsg);
        //    swal({
        //        title: "Error",
        //        text: msg,
        //        type: "error"
        //    }, function () {
        //        window.location.reload(true);
        //    });
        //}
    },



    rejectvalue: function () {
        if (DebentureRepayment_Approve.checkvalues()) {
            if ((jQuery("#rbtInterest").prop("checked"))) {
                paytype = 2;


                var tableData = document.getElementById('tbldespatch');//1 table
                var main = tableData.rows[1].cells[0].innerText;
                var sub = tableData.rows[1].cells[1].innerText;
                var fcmain = tableData.rows[1].cells[2].innerText;
                var fcsubacc = tableData.rows[1].cells[3].innerText;
                var fcsubid = tableData.rows[1].cells[4].innerText;
                var tdssubacc = tableData.rows[1].cells[5].innerText;
                var tdssubacc2 = tableData.rows[1].cells[6].innerText;
                var tds1 = tableData.rows[1].cells[5].innerText;
                var tds2 = tableData.rows[1].cells[6].innerText;
                var tdsamont = tableData.rows[1].cells[7].innerText;



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
                var tdssubacc2 = tableData.rows[1].cells[4].innerText;
                var tds1 = tableData.rows[1].cells[5].innerText;
                var tds2 = tableData.rows[1].cells[6].innerText;
                var tdsamount = tableData.rows[1].cells[7].innerText;


                var tblAccntData = document.getElementById('tbldespatchprnc');//2
                var mainlonac = tblAccntData.rows[1].cells[0].innerText;
                var subloanac = tblAccntData.rows[1].cells[1].innerText;
                var amount = tblAccntData.rows[1].cells[2].innerText;
            }


            if (paytype == 2) {

                var tblAmntData = main + "µ" + sub + "µ" + fcmain + "µ" + fcsubacc + "µ" + fcsubid + "µ" + tdssubacc + "µ" + tdssubacc2 + "µ" + tds1 + "µ" + tds2 + "µ" + tdsamont + "¥";
                // tblAmntData = tblAmntData + table.rows[1].cells[0].innerText + "µ" + table.rows[1].cells[1].innerText + "µ" + table.rows[1].cells[2].innerText + "µ" + table.rows[1].cells[3].innerText + "µ" + table.rows[1].cells[4].innerText + "µ" + table.rows[1].cells[5].innerText + "µ" + table.rows[1].cells[6].innerText + "¥";


                var tblAccntData = mainlonac + "µ" + subloanac + "µ" + amount + "µ" + paytype + "µ" + userdata.userId + "µ" + jQuery("#ddlLoans").val() + "¥";
                //tblAccntData = tblAccntData + tableData.rows[1].cells[0].innerText + "µ" + tableData.rows[1].cells[1].innerText + "µ" + tableData.rows[1].cells[2].innerText + "µ" + paytype + "µ" + $("[id*=hdUserId]").val() + "µ" + $("#ddlLoans").val() + "¥";


            }
            else if (paytype == 1) {

                var tblAmntData = main + "µ" + sub + "µ" + subid + "µ" + tdssubac + "µ" + tdssubacc2 + "µ" + tds1 + "µ" + tds2 + "µ" + tdsamount + "¥";
                //tblAmntData = tblAmntData + table.rows[1].cells[0].innerText + "µ" + table.rows[1].cells[1].innerText + "µ" + table.rows[1].cells[2].innerText + "µ" + table.rows[1].cells[3].innerText + "µ" + table.rows[1].cells[4].innerText + "¥";


                var tblAccntData = mainlonac + "µ" + subloanac + "µ" + amount + "µ" + paytype + "µ" + userdata.userId + "µ" + jQuery("#ddlLoans").val() + "¥";
                //tblAccntData = tblAccntData + tableData.rows[1].cells[0].innerText + "µ" + tableData.rows[1].cells[1].innerText + "µ" + tableData.rows[1].cells[2].innerText + "µ" + paytype + "µ" + $("[id*=hdUserId]").val() + "µ" + $("#ddlLoans").val() + "¥";


            }
            var submitRequest = {

                Flag: "REJECT_REPAYMENT_NCDAPR",

                pagval: tblAccntData,
                ParVal: tblAmntData,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, DebentureRepayment_Approve.SubmitReturn1, userdata.token)
        }

    },


    SubmitReturn1: function (response) {
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
    },




    exportTableToExcel: function (filename = 'excel_data.xlsx') {
        // Get the table element by ID
        const table = document.getElementById('Fidatatbl');
        if (!table) {
            alert('Table not found!');
            return;
        }

        // Create a new workbook and an empty worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([
            ['NAME', 'BANKAC', 'IFSC', 'PANNO', 'TOSAMT', 'INTRT', 'GrsInrst', 'Status', 'Panstatus', 'TDSrate', 'oprtpan', 'TDSamt', 'CSNRI', 'NETTDS', 'NETINTRST', 'Principal', 'NETAMNT', 'LOTNUMBER']
        ]);

        // Convert the table to a worksheet and start appending from row 2
        const tableWorksheet = XLSX.utils.table_to_sheet(table, { origin: -1 }); // 'origin: -1' starts from the next row
        XLSX.utils.sheet_add_aoa(worksheet, XLSX.utils.sheet_to_json(tableWorksheet, { header: 1 }), { origin: 'A2' });

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Write the workbook to an Excel file
        XLSX.writeFile(workbook, filename);
    },



}



jQuery(document).ready(function () {





    jQuery('#rbtInterest').on("change", function () {
        jQuery("#divloanshow").show();
        //_NcdNCDBondRePaymentApprove.loadSelectDebenture();
        DebentureRepayment_Approve.tokenValidate();
    });
    jQuery('#rbtPrinciple').on("change", function () {
        jQuery("#divloanshow").show();
        // _NcdNCDBondRePaymentApprove.loadSelectDebenture();
        DebentureRepayment_Approve.tokenValidate();

    });
});
jQuery('#ddlLoans').on("change", function () {
    jQuery('#divtblPrincpleIntDtl').show();
    jQuery('#divpayment').show();

    var input = jQuery("#ddlLoans").val();
    var lot = input.split('µ');
    var Lotnumber = lot[2];
    if (Lotnumber == 0) {

        jQuery("#divexl").hide();
    }
    else {
        jQuery("#divexl").show();
    }


    if (jQuery("#rbtInterest").prop("checked") == true) {
        paytype = 2;
        DebentureRepayment_Approve.Getshowtablinterest();
        DebentureRepayment_Approve.Getshowtablinteresttwo();
        DebentureRepayment_Approve.loaddata()
    }
    else if (jQuery("#rbtPrinciple").prop("checked") == true) {
        paytype = 1;
        DebentureRepayment_Approve.Getshowtablprincipal();
        DebentureRepayment_Approve.Getshowtablprincipaltwo();
        DebentureRepayment_Approve.loaddata()

    }
});
jQuery('#btnConf').on("click", function () {

    DebentureRepayment_Approve.submitevalue();
});

jQuery('#btnrej').on("click", function () {


    DebentureRepayment_Approve.rejectvalue();
});




//    /*jQuery("#ddl_paymntype").on("change", function () {

//        paymenttype = jQuery('#ddl_paymntype').val();

//        if (paymenttype == 'automatic') {

//            jQuery("#loaddata").show();

//        } else {

//            jQuery("#loaddata").hide();

//        }


//        //jQuery("#ddlsubacsts").show();

//        //_NcdNCDBondRePaymentApprove.loadPaymentbank();
//    });*/

//});

jQuery('#btnExit').on("click", function () {
    window.open("Dashboard", "_self");
});
jQuery('#btn_Excel').on("click", function () {
    DebentureRepayment_Approve.exportTableToExcel();
});


