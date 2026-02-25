var Int_accr_posting_Approval = {


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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, Int_accr_posting_Approval.checkAccessRtn, token)
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
                    Int_accr_posting_Approval.loadSelectFundType();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, Int_accr_posting_Approvalss.checkAccessToken, userdata.token)
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
                Int_accr_posting_Approval.loadSelectFundType();
            }


        }

    },

    //Select Fund Type
    loadSelectFundType: function () {
        jQuery('.page-loader-wrapper').show();
        var SelectFundType = {
            Flag: "Int_Accru_approve",
            PagVal: "GetLoanAvailFundTypeINTACCR",      
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
            
        };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectdataQueries", SelectFundType, Int_accr_posting_Approval.FillSelectFundType, userdata.token);

    },
    FillSelectFundType: function (Response) {

        if (Response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();

            jQuery("#ddlFundType").empty();
            jQuery("#ddlFundType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SELECT FUND TYPE-------- "));
            jQuery.each(Response.data.queryResult, function (i, val) {
                jQuery("#ddlFundType").append(jQuery("<option></option>").val(val.param1).text(val.param2));
            });

        }
        else {

            jQuery("#ddlFundType").empty();
            jQuery("#ddlFundType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FUND TYPE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();
    },



    //Select loan
    loadSelectloan: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var Selectloan = {
            Flag: "Int_Accru_approve",
            PagVal: "GetLoanAvailLoans_INTACCR_Confirm",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectdataQueries", Selectloan, Int_accr_posting_Approval.FillSelectloan, userdata.token);

    },
    FillSelectloan: function (Response) {

        if (Response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();

            jQuery("#ddlloantype").empty();
            jQuery("#ddlloantype").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SELECT SELECT LOAN-------- "));
            jQuery.each(Response.data.queryResult, function (i, val) {
                jQuery("#ddlloantype").append(jQuery("<option></option>").val(val.param1).text(val.param2));
            });

        }
        else {

            jQuery("#ddlloantype").empty();
            jQuery("#ddlloantype").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT SELECT LOAN-------- "));
        }
        jQuery('.page-loader-wrapper').hide();
    },





    //table

    getFromLoanDtls: function () {
        jQuery('.page-loader-wrapper').show();
        // var sub = jQuery("#ddl_Reqst").val();
        var M = jQuery('#ddlloantype').val();
        var centerSplit = M.split('µ');
        var sub = centerSplit[1];
        //var loanlimit = centerSplit[1];

        var FromLoanDtls = {
            Flag: "Int_Accru_approve",
            PagVal: "Get_IntAccr_Table",
            parVal: sub,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, Int_accr_posting_Approval.FromLoanDtlsResponse, userdata.token);

    },
    FromLoanDtlsResponse: function (Response) {
        if (Response.status === "SUCCESS") {

            Int_accr_posting_Approval.FillTable(Response);

        }
        else {

            return false;
        }
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

                    //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[5]));
                    // $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                    // $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                    jQuery('#Fidatatabl').append($row);

                   
                });
            }

        }
    },







    // validation confirm button...
    submitdata2: function () {

        if (Int_accr_posting_Approval.checkvalues()) {
            var loanid, type;

            var userid = userdata.userId 
            // var loanid = jQuery("#ddlloantype").val().split('µ');
            /*entdate*/
            var M = jQuery('#ddlloantype').val();
            var centerSplit = M.split('µ');
            var pjtcode = centerSplit[0];
            var loanid = centerSplit[1];
            var fundtype = jQuery("#ddlFundType").val();
            var tableData = document.getElementById('tbldespatch');
            var entdate = tableData.rows[1].cells[0].innerText;
            var revdate = tableData.rows[1].cells[1].innerText;
            var mainac = tableData.rows[1].cells[2].innerText;
            var subac = tableData.rows[1].cells[3].innerText;
            var subid = tableData.rows[1].cells[4].innerText;
            var amount = tableData.rows[1].cells[5].innerText;

            if (jQuery("#radAppr").prop("checked")) {

                type = 'ConfirmIntAccrualposting';

                Data = loanid + "µ" + userid + "µ" + amount + "µ" + mainac + "µ" + subac + "µ" + subid + "µ" + entdate + "µ" + revdate + "µ" + fundtype;

            }
            if (jQuery("#radRjct").prop("checked")) {

                type = 'RejectIntAccrualposting';
                /*var remarks = jQuery("#txtremarks").val();*/

                Data = loanid + "µ" + userid + "µ" + jQuery("#txtremarks").val();

            }


            var submitRequest = {

                Flag: type,
                PagVal: Data,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, Int_accr_posting_Approval.SubmitReturn, 'dfgdfgfgdfgdfgd')
        }

    },


    //SubmitReturn: function (response) {
    //    jQuery('.page-loader-wrapper').hide();

    //    if (response.status == "SUCCESS") {
    //        var msg = jQuery.trim(response.data.message);
    //        //var msg = String.prototype.trim(response.data.message);
    //        if (response.data.errStatus = "1") {
    //            if (response.data.queryResult[0].param1 == "1") {
    //                swal({
    //                    title: "Approved Successfully...!!! ",
    //                    text: "",
    //                    type: "success"
    //                }, function () {
    //                    window.location.reload(true);
    //                });
    //            }
    //            else if (response.data.queryResult[0].param1 == "0") {
    //                swal({
    //                    title: "Rejected successfully.!!!",
    //                    text: "",
    //                    type: "success"
    //                }, function () {
    //                    window.location.reload(true);
    //                });
    //            }


    //        }
    //        else if (response.responseMsg == "Invalid Token") {
    //            window.location.href = DOMAIN_URL;
    //        }
    //        else {
    //            var msg = jQuery.trim(response.responseMsg);
    //            swal({
    //                title: "Error",
    //                text: msg,
    //                type: "error"
    //            }, function () {
    //                window.location.reload(true);
    //            });
    //        }

    //    }
    //},

    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            var msg = jQuery.trim(response.data.message);
            //var msg = String.prototype.trim(response.data.message);
            if (response.data.errStatus = "1") {
                if (response.data.queryResult[0].param1 == "1") {
                    swal({
                        title: "Approved Successfully!",
                        text: "",
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
                else {
                    swal({
                        title: "Rejected Successfully!",
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











    //New Intrest Accural Posting  Approval popup
    checkvalues: function () {
        var SltFundType = jQuery('#ddlFundType').val();
        var SeletLon = jQuery('#ddlloantype').val();
        var Reason = jQuery('#txtremarks').val();




        if (SltFundType == 0) {
            swal("", "Please  Select Fund Type", "error");
            return false;
        }
        else if (SeletLon == 0) {
            swal("", "Please  Select Loan ", "error");
            return false;
        }
         else if (jQuery("#radRjct").prop("checked") == false && jQuery("#radAppr").prop("checked") == false) {
            swal("", "Please Select Approve/Reject", "error");
            return false;
        }
        else if (Reason == "" && jQuery("#radRjct").prop("checked") == true) {
            swal("", "Please Enter Reason For Rejection ", "error");
            return false;
        }
        else
            return true;

    }




}




jQuery(document).ready(function () {

    jQuery('.page-loader-wrapper').hide();
    //Int_accr_posting_Approval.loadSelectFundType();
    Int_accr_posting_Approval.tokenValidate();
    
    jQuery('#ddlFundType').on("change", function () {

        jQuery("#scln").show();
        var indata = jQuery("#ddlFundType").val();

        Int_accr_posting_Approval.loadSelectloan(indata);


    });


    jQuery('#ddlloantype').on("change", function () {

        Int_accr_posting_Approval.getFromLoanDtls();
    });


    jQuery('#radRjct').on("click", function () {
        jQuery('#dvrejectremarks').show();
    });
    jQuery('#btnConf').on("click", function () {

        Int_accr_posting_Approval.submitdata2();
    });

    jQuery('#radAppr').on("click", function () {
        jQuery('#dvrejectremarks').hide();
    });

});
jQuery('#btnExit').on("click", function () {
    window.open("Dashboard", "_self");
});