var _NewExpenseApproval = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var CheckAccess = {
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1011",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        //encryption//
        try {
            CheckAccess = JSON.stringify(CheckAccess);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _NewExpenseApproval.checkAccessRtn, userdata.token)
    },

    checkAccessRtn: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {
                var x = response.data.queryResult.QueryResult[0].param1;
                if (x == "0") {
                    swal({
                        title: "Access Denied",
                        text: "You are not autherized to view this page.!",
                        type: "info"
                    }, function () {
                        window.location.href = "dashboard";
                    });
                }
                //else {
                //    _NewExpenseApproval.ShowExpenseDetails();
                //}

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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _NewExpenseApproval.checkAccessToken, userdata.token)
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
            //else {
            //    _NewExpenseApproval.checkAccess();
            //}


        }

    },

    ShowExpenseDetails: function (type) {
        
        jQuery('.page-loader-wrapper').show();
        var GetExpenseData = {
            "flag1": "NEW_EXPENSE_APPROVAL",
            "flag2": "FILL_EXPENSES",
            "inptvar1": type,
            "inptvar2": "",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        try {
            GetExpenseData = JSON.stringify(GetExpenseData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetExpenseData = { "encryptedRqstStr": EncryptAPIReq(GetExpenseData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", GetExpenseData, _NewExpenseApproval.FillExpenses, userdata.token)

    },
    FillExpenses: function (response) {
        jQuery('.page-loader-wrapper').hide();
        var nval = 0;
        jQuery('#expense_tbl').show();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {     

                jQuery('#newexpense').empty();
                    jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                        var $row = jQuery('<tr/>');
                        var data1 = val.param1.split("~");
                        var typeid = data1[0];
                        var st = data1[2];
                        var status = "";
                        if (st == 2) {
                            status = "NEW";
                        }
                        else if (st == 3) {
                            status = "RESUBMITTED";
                        }
                        nval = nval + 1;

                        $row.append(jQuery('<td class="HCol" align="left">').html(nval));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                        $row.append(jQuery('<td class="HCol" align="center">').html(status));
                        $row.append(jQuery('<td class="HCol" align="center">').html('<button type="button" class="fa fa-search" id="edit' + i + '" onclick="_NewExpenseApproval.ViewExpense(\'' + data1[0] + '\');">View Details</button>'));
                        jQuery('#newexpense').append($row);
                    });
            }
        }
        //else {

        //    jQuery("#ddlAcc").empty();
        //    jQuery("#ddlAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE ACCOUNT-------- "));
        //}
    },

    ViewExpense: function (typeid) { 
       
        var branch_type = jQuery('#type_select').val();
        jQuery('.page-loader-wrapper').show();
        var GetExpenseDetails = {
            "flag1": "NEW_EXPENSE_APPROVAL",
            "flag2": "FILL_DETAILS",
            "inptvar1": branch_type,
            "inptvar2": typeid,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        try {
            GetExpenseDetails = JSON.stringify(GetExpenseDetails);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetExpenseDetails = { "encryptedRqstStr": EncryptAPIReq(GetExpenseDetails) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", GetExpenseDetails, _NewExpenseApproval.FillExpenseDetail, userdata.token)

    },

    FillExpenseDetail: function (response) {
        jQuery('.page-loader-wrapper').hide();  
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                var val1 = response.data.queryResult.QueryResult[0].param1.split("~");
                var val2 = response.data.queryResult.QueryResult[0].param2.split("~");
                jQuery("#moreDetailsModal").modal('show');

                jQuery("#typeid").val(val1[0]);
                jQuery("#exp").val(val1[1]);
                jQuery("#period").val(val1[2]);
                jQuery("#lmt").val(val1[3]);
                jQuery("#acc").val(val1[4]);
                jQuery("#subacc").val(val1[5]);
                jQuery("#bhlmt").val(val2[0]);
                jQuery("#ahlmt").val(val2[1]);
                jQuery("#rmlmt").val(val2[2]);
                jQuery("#zmlmt").val(val2[3]);
                jQuery("#ohlmt").val(val2[4]);
                jQuery("#ihlmt").val(val2[5]);
                jQuery("#ctolmt").val(val2[6]);
            }
        }

        else {

            swal("", response.responseMsg, "error")

            jQuery('#gstamount').val("");
            jQuery('#billnoupdate').val("");
            jQuery('#billdate').val("");

        }

    },

    submitdata: function (st) {//st=1 Approved,st=0 rejected
            jQuery('.page-loader-wrapper').show();
            var val2 = jQuery("#type_select").val();
            var val1 = jQuery("#typeid").val();
            var remark = jQuery("#remark").val();

            if (remark == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("Error", "Please add remarks..!", "error");
                return false;
            }
            var SubmitData = {
                "flag1": "NEW_EXPENSE_APPROVAL",
                "flag2": "Submit_Expense",
                "inptvar1": val2 + "!!" +val1,
                "inptvar2": st + "@@" + remark,
                "typeID": "4",
                "userID": userdata.userId,
                "branchID": userdata.branchId
            };
            try {
                SubmitData = JSON.stringify(SubmitData);
            } catch (e) {
                swal("", e.message, "warning");
                return false;
            }
            SubmitData = { "encryptedRqstStr": EncryptAPIReq(SubmitData) };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", SubmitData, _NewExpenseApproval.FillsubmitData, userdata.token)
        },
   
    FillsubmitData: function (response) {
     if (response.status === "SUCCESS") {
     jQuery('.page-loader-wrapper').hide();
     response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
        if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
            var rep = response.data.queryResult.QueryResult[0].param2;
            var val1 = jQuery("#type_select").val();
            if (rep == "0") {
                swal({
                    title: "Rejected",
                    text: response.data.queryResult.QueryResult[0].param1,
                    type: "info"
                }, function () {
                    _NewExpenseApproval.ShowExpenseDetails(val1);
                });
            }
            else if (rep == "1") {
                swal({
                    title: "Approved",
                    text: response.data.queryResult.QueryResult[0].param1,
                    type: "success"
                }, function () {
                    _NewExpenseApproval.ShowExpenseDetails(val1);
                });
            }
            else if (rep == "-1") {
                swal({
                    title: "Permanently Rejected",
                    text: response.data.queryResult.QueryResult[0].param1,
                    type: "success"
                }, function () {
                    _NewExpenseApproval.ShowExpenseDetails(val1);
                });
            }

        }
     }
    },

}
function Save() {
    swal({
        title: "do you want to reject the expense?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes',
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isReject) {
            if (isReject) {
                jQuery("#loader").removeClass('hide-loader');
                _NewExpenseApproval.submitdata(0);
            } else {
                swal({
                    title: "Cancelled",
                    text: "",
                    type: "warning",
                    confirmButtonText: "OK",
                    closeOnConfirm: true
                }, function () {
                    window.location.reload();
                });
            }
        });
}



        
   

        

jQuery(document).ready(function ($) {
    jQuery('#expense_tbl').hide();
    //_NewExpenseApproval.ShowAccountDetails();
    _NewExpenseApproval.tokenValidate();
    _NewExpenseApproval.checkAccess();
    jQuery('.page-loader-wrapper').hide();
    jQuery('#type_select').change(function (e) {
        var outward = jQuery('#type_select').val();
        if (outward != 0) {
            _NewExpenseApproval.ShowExpenseDetails(outward);
        }
        else {
            jQuery("#type_select").empty();
            jQuery("#type_select").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TYPE-------- "));
        }
    });
});




jQuery('#btn_approve').click(function (e) {
    _NewExpenseApproval.submitdata(1);
});

jQuery('#btn_reject').click(function (e) {
    //_NewExpenseApproval.submitdata(0);
    Save();
});






