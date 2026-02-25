
var data, tbl_val, v_val;
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
            Flag: "lOANREPAYMENTCHECKER",
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


    // NEWLY ADDED TABLE LOAD FUNCTION


    LoadApprvTable: function () {
        jQuery('.page-loader-wrapper').show();
        var loadtableapr = {
            flag: "lOANREPAYMENTCHECKER",
            PagVal: "LoadtableData",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        loadtableapr = JSON.stringify(loadtableapr);
        loadtableapr = { 'encryptedRqstStr': EncryptAPIReq(loadtableapr) }
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", loadtableapr, _aprvLoanApr.TableLoadCompleted, userdata.token);
    },

    TableLoadCompleted: function (Response) {

        jQuery('.page-loader-wrapper').hide();
        if (Response.status === "SUCCESS") {
            Response.data = JSON.parse(DecryptAPIReq(Response.data.encryptedResStr));

            jQuery('.page-loader-wrapper').hide();
            jQuery('#maincard').show();
            if (Response.data != null && Response.data.QueryResult.length > 0) {

                if (Response.data.QueryResult.length > 0) {

                    jQuery('#Fidatatabl').empty();
                    jQuery.each(Response.data.QueryResult, function (i, val) {

                        var $row = jQuery('<tr/>');
                        var data1 = val.Param1;
                        var data2 = val.Param2.split("~");
                        var category = data2[0];
                        var paytype = data2[3];
                        if (paytype == 1) {
                            var pt = "Principle";
                        }
                        else if (paytype == 2) {
                            var pt = "Interest";
                        }
                        var reid = data1;
                        //var  = data2[2];

                        //var category = data2[3];

                        var fund_type = data2[0];

                        var pjt_code = data2[1];

                        var Fi = data2[2];

                        var payment_type = data2[4];

                        var month = data2[5];
                        var year = data2[6];

                        var Loan_id = data2[7];
                        var install_no = data2[8];
                        var gross = data2[9];
                        var benef_name = data2[10];
                        var benef_accno = data2[11];
                        var ifsc = data2[12];
                        var main_bnk_acc = data2[13];
                        var sub_bnk_acc = data2[14];
                        var payment_amnt = data2[15];




                        $row.append(jQuery('<td align="center">').html(i + 1));
                        $row.append(jQuery('<td class="HCol" align="left">').html(reid));
                        $row.append(jQuery('<td class="HCol" align="left">').html(fund_type));
                        $row.append(jQuery('<td class="HCol" align="left">').html(pjt_code));
                        $row.append(jQuery('<td class="HCol" align="left">').html(Fi));
                        $row.append(jQuery('<td class="HCol" align="left">').html(pt));
                        $row.append(jQuery('<td class="HCol" align="left">').html(payment_type));
                        $row.append(jQuery('<td class="HCol" align="left">').html(month));
                        $row.append(jQuery('<td class="HCol" align="left">').html(year));
                        $row.append(jQuery('<td class="HCol" align="left">').html(Loan_id));
                        $row.append(jQuery('<td class="HCol" align="left">').html(install_no));
                        $row.append(jQuery('<td class="HCol" align="left">').html(gross));
                        $row.append(jQuery('<td class="HCol" align="left">').html(payment_amnt));

                        $row.append(jQuery('<td class="HCol" align="left">').html(main_bnk_acc));
                        $row.append(jQuery('<td class="HCol" align="left">').html(sub_bnk_acc));

                        $row.append(jQuery('<td class="HCol" align="left">').html(benef_name));
                        $row.append(jQuery('<td class="HCol" align="left">').html(benef_accno));
                        $row.append(jQuery('<td class="HCol" align="left">').html(ifsc));


                        $row.append(jQuery('<td align="center">').html('<input type="checkbox" id="chkvalue" class="loan-checkbox" value="' + reid + '">'));


                        jQuery('#Fidatatabl').append($row);
                    });
                }


            }
        }
    },


    // NEWLY ADDED TABLE LOAD FUNCTION





    // payment function 
    payment: function (payment_mode) {





        var loan_no = jQuery("#ddlLoans").val();

        // var qwerty = payment_mode;

        var paymentRequest = {
            fileId: loan_no,
            customerId: loan_no,
            paymentMode: payment_mode
            //typeID: "4",
            //userID: userdata.userId,
            //branchID: userdata.branchId

        };
        //paymentRequest = JSON.stringify(paymentRequest);
        //paymentRequest = { "encryptedRqstStr": EncryptAPIReq(paymentRequest) };

        _http.post(MFPUBLICLMSAPI_URL + "api/disbursement/BOBDisbursement", paymentRequest, _aprvLoanApr.paymentReturn, userdata.token)


    },



    paymentReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {

            // response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            //if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
            //if (response.data != null && response.data.queryResult.length > 0) {


            var msg = jQuery.trim(response.message);
            //var msg = String.prototype.trim(response.data.message);



            //var msg = String.prototype.trim(response.data.message);
            //  alert(response.data.errStatus);
            swal({
                title: "Approved Successfully!",
                text: msg,
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













    // newly added 9-Aug-2025

    newsubmit: function (v_vals, tbl_vals) {

        // var split = v_vals[0].split("µ");
        // var paytype = split[0];



        //if (paytype == 2) {

        //    var tblAmntData = tbl_vals + "¥";

        //    var tblAccntData = "" + "µ" + "" + "µ" + "" + "µ" + v_vals + "¥";


        //}
        //else if (paytype == 1) {

        //    var tblAmntData = tbl_vals + "¥";

        //    var tblAccntData = "" + "µ" + "" + "µ" + "" + "µ" + v_vals + "¥";


        //}
        var tblAccntData = "" + "µ" + "" + "µ" + "" + "µ" + v_vals + "¥";
        var tblAmntData = tbl_vals + "¥";

        var approval_submit = {

            Flag: "APPROVELOAN",
            PagVal: tblAccntData,
            parVal: tblAmntData,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        approval_submit = JSON.stringify(approval_submit);
        approval_submit = { "encryptedRqstStr": EncryptAPIReq(approval_submit) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", approval_submit, _aprvLoanApr.approval_submitreturn, userdata.token)

    },

    approval_submitreturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                var msg = jQuery.trim(response.data.message);
                //var msg = String.prototype.trim(response.data.message);
                if (response.data.errStatus = "1") {
                    if (response.data.queryResult.QueryResult[0].Param1 == "1") {

                        var paramtwo = response.data.queryResult.QueryResult[0].Param2;
                        var param2split = paramtwo.split("~");
                        var payment_type = param2split[0];
                        var payment_mode = param2split[1];
                        if (payment_type == "automatic") {

                            _aprvLoanApr.payment(payment_mode);

                        }
                        //change else case for manual data
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
            else if (response.responseMsg == "Invalid Token") {
                window.location.href = DOMAIN_URL;
            }

        }
    },




    // newly added 9-Aug-2025

    newrejectvalue: function (v_vals, tbl_vals) {


        var tblAmntData = tbl_vals + "¥";

        var tblAccntData = "" + "µ" + "" + "µ" + v_vals + "¥";


        var Rejectrequest = {

            Flag: "REJECT_REPAYMENTlast",
            PagVal: tblAccntData,
            parVal: tblAmntData,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        Rejectrequest = JSON.stringify(Rejectrequest);
        Rejectrequest = { "encryptedRqstStr": EncryptAPIReq(Rejectrequest) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", Rejectrequest, _aprvLoanApr.Rejectconfirmresponse, userdata.token)

    },

    Rejectconfirmresponse: function (response) {

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



function Saveapproval(v_vals, tbl_vals) {

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
        function (isApprove) {
            if (isApprove) {
                jQuery("#loader").removeClass('hide-loader');


                _aprvLoanApr.newsubmit(v_vals, tbl_vals);

            } else {


                swal({
                    title: "Cancelled",
                    text: "",
                    type: "warning",
                    confirmButtonText: "OK",
                    closeOnConfirm: false
                }, function () {
                    _aprvLoanApr.tokenValidate();

                    window.location.reload();
                });

            }
        });


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
        function (isApprove) {
            if (isApprove) {
                jQuery("#loader").removeClass('hide-loader');
                _aprvLoanApr.submitevalue();
            } else {


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



_aprvLoanApr.LoadApprvTable();

//jQuery('#chkvalue').on("change", function () {
//jQuery(document).on("change", ".loan-checkbox", function () {



//    const $row = jQuery(this).closest('tr');
//    const usr = userdata.userId;
//    const loan = $row.find('td').eq(9).text().trim();
//    const inst_no = $row.find('td').eq(10).text().trim();
//    const inst_type = $row.find('td').eq(5).text().trim();
//    const bank_acc = $row.find('td').eq(13).text().trim();
//    const sub_bank_acc = $row.find('td').eq(14).text().trim();

//    if (inst_type == 'Interest') {
//      var ins_t = 2;
//    }
//    else {
//        var ins_t = 1;
//    }


//    const v_val = `${ins_t}µ${usr}µ${loan}µ${inst_no}`;
//    const tbl_val = `${bank_acc}µ${sub_bank_acc}`;

//});

jQuery('#btnSaveBank').on("click", function () {

    let v_vals = [];  // To store formatted values
    let tbl_vals = []; // To store bank account info
    let allRowsData = [];
    let selectedCount = 0;

    // Loop through each row in tbody
    jQuery("#tbldespatch tbody tr").each(function () {
        const $row = jQuery(this);
        const checkbox = $row.find(".loan-checkbox");

        if (checkbox.is(':checked')) {
            selectedCount++;
            const usr = userdata.userId;

            // Get required columns (0-based indexing)
            const loanId = $row.find('td').eq(9).text().trim();   // 10th column
            const inst_no = $row.find('td').eq(10).text().trim(); // 11th column
            const inst_type = $row.find('td').eq(5).text().trim();// 6th column
            const bank_acc = $row.find('td').eq(13).text().trim();// 14th column
            const sub_bank_acc = $row.find('td').eq(14).text().trim();// 15th column

            // Set ins_t based on inst_type
            let ins_t = (inst_type === 'Interest') ? 2 : 1;


            //const rowData = [loanId, inst_no, inst_type, bank_acc, sub_bank_acc].join('µ');
            //allRowsData.push(rowData);

            // Prepare values
            let v_val = `${ins_t}µ${usr}µ${loanId}µ${inst_no}`;
            let tbl_val = `${bank_acc}µ${sub_bank_acc}`;

            v_vals.push(v_val);
            tbl_vals.push(tbl_val);
        }
        /*else {
            swal("", "Please select checkbox", "error");
            return false;
        }*/
    });

    if (selectedCount === 0) {
        swal("", "Please select one checkbox", "error");
        return false;
        //return; // stop execution
    }
    //const finalData = allRowsData.join('~');
    //_aprvLoanApr.newsubmit(finalData);

    //Saveapproval(v_vals, tbl_vals);
    _aprvLoanApr.newsubmit(v_vals, tbl_vals);

});


jQuery('#excel').on("click", function () {

    let table = document.getElementById("tbldespatch");

    // Convert table to worksheet
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.table_to_sheet(table);

    // Append sheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Save the file
    XLSX.writeFile(wb, "table_data.xlsx");

});




jQuery('#btnreject1').on("click", function () {
    const v_vals = [];
    const tbl_vals = [];

    document.querySelectorAll("#tbldespatch tbody tr").forEach(row => {


        // loop through each table row
        const checkbox = row.querySelector(".loan-checkbox");
        if (checkbox && checkbox.checked) {

            const usr = userdata.userId;
            const f_type = row.cells[2].innerText.trim();
            const fi_type = row.cells[4].innerText.trim();
            var fund_t = f_type.split[0];
            var financial_t = fi_type.split[0];

            const amnt = row.cells[12].innerText.trim();

            const loanId = row.cells[9].innerText.trim();
            const inst_no = row.cells[10].innerText.trim();
            const inst_type = row.cells[5].innerText.trim();

            const bank_acc = row.cells[13].innerText.trim();
            const sub_bank_acc = row.cells[14].innerText.trim();

            if (inst_type == 'Interest') {
                var ins_t = 2;
            }
            else {
                var ins_t = 1;
            }

            let v_val = `${amnt}µ${ins_t}µ${usr}µ${loanId}µ${inst_no}µ${f_type}µ${fi_type}`;
            let tbl_val = `${bank_acc}µ${sub_bank_acc}`;

            v_vals.push(v_val);
            tbl_vals.push(tbl_val);

        }
        else {
            swal("", "Please select checkbox", "error");
            return false;
        }

    });
    _aprvLoanApr.newrejectvalue(v_vals, tbl_vals);
});


jQuery('#btnreject').on("click", function () {
    const v_vals = [];
    const tbl_vals = [];
    let selectedCount = 0;
    jQuery("#tbldespatch tbody tr").each(function () {
        const $row = jQuery(this);
        const checkbox = $row.find(".loan-checkbox");

        if (checkbox.is(':checked')) {
            selectedCount++;
            const usr = userdata.userId;
            const f_type = $row.find('td').eq(2).text().trim();
            const fi_type = $row.find('td').eq(4).text().trim();
            var fund_t = f_type.split('-')[0];
            var financial_t = fi_type.split('-')[0];
            const amnt = $row.find('td').eq(12).text().trim();
            const loanId = $row.find('td').eq(9).text().trim();
            const inst_no = $row.find('td').eq(10).text().trim();
            const inst_type = $row.find('td').eq(5).text().trim();
            const bank_acc = $row.find('td').eq(13).text().trim();
            const sub_bank_acc = $row.find('td').eq(14).text().trim();

            let ins_t = (inst_type === 'Interest') ? 2 : 1;


            let v_val = `${amnt}µ${ins_t}µ${usr}µ${loanId}µ${inst_no}µ${fund_t}µ${financial_t}`;
            let tbl_val = `${bank_acc}µ${sub_bank_acc}`;

            v_vals.push(v_val);
            tbl_vals.push(tbl_val);

        }
        /*else {
            swal("", "Please select checkbox", "error");
            return false;
        }*/
    });
    if (selectedCount === 0) {
        swal("", "Please select one checkbox", "error");
        return false;
        //return; // stop execution
    }

    _aprvLoanApr.newrejectvalue(v_vals, tbl_vals);
});


/*
jQuery('#btnreject').on("click", function () {
    const v_vals = [];
    const tbl_vals = [];

    document.querySelectorAll("#tbldespatch tbody tr").forEach(row => {


        // loop through each table row
        const checkbox = row.querySelector(".loan-checkbox");
        if (checkbox && checkbox.checked) {

            const usr = userdata.userId;

            const loanId = row.cells[9].innerText.trim();
            const inst_no = row.cells[10].innerText.trim();
            const inst_type = row.cells[5].innerText.trim();

            const bank_acc = row.cells[13].innerText.trim();
            const sub_bank_acc = row.cells[14].innerText.trim();

            if (inst_type == 'Interest') {
                var ins_t = 2;
            }
            else {
                var ins_t = 1;
            }

            let v_val = `${ins_t}µ${usr}µ${loanId}µ${inst_no}`;
            let tbl_val = `${bank_acc}µ${sub_bank_acc}`;

            v_vals.push(v_val);
            tbl_vals.push(tbl_val);

        }

    });
    _aprvLoanApr.newsubmit(v_vals, tbl_vals);
});
*/





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
    // var id1 = jQuery('#ddlLoans').text();
    var id1 = jQuery('#ddlLoans :selected').text();
    var dta = id1.split("-");
    var type = dta[15];





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

jQuery("#btnAprv").on("click", function () {
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

