var lmt, bhlmt, ahlmt, rmlmt, zmlmt, ohlmt, ihlmt, ctolmt;

var _ResubmitExpense = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var CheckAccess = {
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1012",
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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _ResubmitExpense.checkAccessRtn, userdata.token)
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
                //    _ResubmitExpense.ShowExpenseDetails();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _ResubmitExpense.checkAccessToken, userdata.token)
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
            


        }

    },
      ShowExpenseDetails: function (type) {
        
        jQuery('.page-loader-wrapper').show();
        var GetExpenseData = {
            "flag1": "RESUBMIT_EXPENSE",
            "flag2": "FILL_RESUBMIT_EXPENSES",
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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", GetExpenseData, _ResubmitExpense.FillExpenses, userdata.token)

    },
    FillExpenses: function (response) {
        jQuery('.page-loader-wrapper').hide();
        var nval = 0;
        if (response.status === "SUCCESS") {
        jQuery('#expense_tbl').show();
        
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
                        nval = nval + 1;

                        $row.append(jQuery('<td class="HCol" align="left">').html(nval));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                        //$row.append(jQuery('<td class="HCol" align="center">').html(status));
                        $row.append(jQuery('<td class="HCol" align="center">').html('<button type="button" class="fa fa-search" id="edit' + i + '" onclick="_ResubmitExpense.ViewExpense(\'' + data1[0] + '\');">View Details</button>'));
                        jQuery('#newexpense').append($row);
                    });
            }
        }
        else {

            swal({
                title: "No Data Found",
                //text: response.data.queryResult.QueryResult[0].param1,
                type: "info"
            }, function () {
                window.location.reload(true);
            });
           
        }
    },

    ViewExpense: function (typeid) { 
       
        var branch_type = jQuery('#type_select').val();
        jQuery('.page-loader-wrapper').show();
        var GetExpenseDetails = {
            "flag1": "RESUBMIT_EXPENSE",
            "flag2": "FILL_EXPENSE_DETAILS",
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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", GetExpenseDetails, _ResubmitExpense.FillExpenseDetail, userdata.token)

    },

    FillExpenseDetail: function (response) {

        jQuery('.page-loader-wrapper').hide();  
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                var val1 = response.data.queryResult.QueryResult[0].param1.split("~");
                var val2 = response.data.queryResult.QueryResult[0].param2.split("~");

                lmt = val1[3]
                bhlmt = val2[0]
                ahlmt = val2[1]
                rmlmt = val2[2]
                zmlmt = val2[3]
                ohlmt = val2[4]
                ihlmt = val2[5]
                ctolmt = val2[6]
                jQuery("#moreDetailsModal").modal('show');

                jQuery("#typeid").val(val1[0]);
                jQuery("#exp").val(val1[1]);
                jQuery("#period").val(val1[2]);
                jQuery("#lmt").val(lmt);
                jQuery("#acc").val(val1[4]);
                jQuery("#subacc").val(val1[5]);
                jQuery("#bhlmt").val(bhlmt);
                jQuery("#ahlmt").val(ahlmt);
                jQuery("#rmlmt").val(rmlmt);
                jQuery("#zmlmt").val(zmlmt);
                jQuery("#ohlmt").val(ohlmt);
                jQuery("#ihlmt").val(ihlmt);
                jQuery("#ctolmt").val(ctolmt);
                jQuery("#remark").val(val2[7]);
               
            }
        }

       

    },

    //ShowAccountDetails: function () {
    //    jQuery('.page-loader-wrapper').show();
    //    var GetAccountData = {
    //        "flag1": "NEW_EXPENSE",
    //        "flag2": "FILLACCOUNTNAME",
    //        "typeID": "4",
    //        "userID": userdata.userId,
    //        "branchID": userdata.branchId
    //    };

    //    try {
    //        GetAccountData = JSON.stringify(GetAccountData);
    //    } catch (e) {
    //        swal("", e.message, "warning");
    //        return false;
    //    }
    //    GetAccountData = { "encryptedRqstStr": EncryptAPIReq(GetAccountData) };

    //    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", GetAccountData, _ResubmitExpense.FillAccountType, userdata.token)

    //},
    //FillAccountType: function (response) {
    //    jQuery('.page-loader-wrapper').hide();
    //    if (response.status === "SUCCESS") {
    //        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
    //        if (response.data.queryResult.QueryResult.length > 0) {

    //            jQuery("#ddlacc").empty();
    //            jQuery("#ddlacc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE ACCOUNT-------- "));
    //            jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
    //                jQuery("#ddlacc").append(jQuery("<option></option>").val(val.param1).text(val.param1 + '-' + val.param2));
    //            });
    //        }
    //        else {
    //            jQuery("#ddlacc").empty();
    //            jQuery("#ddlacc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE ACCOUNT-------- "));
    //        }
    //    }
    //    else {

    //        jQuery("#ddlacc").empty();
    //        jQuery("#ddlacc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE ACCOUNT-------- "));
    //    }
    //},

    //ShowSubAccount: function (acc) {
    //    jQuery('.page-loader-wrapper').show();
    //    var GetSubAccData = {
    //        "flag1": "NEW_EXPENSE",
    //        "flag2": "FILL_SUBACCOUNT",
    //        "inptvar1": acc,
    //        "inptvar2": "",
    //        "typeID": "4",
    //        "userID": userdata.userId,
    //        "branchID": userdata.branchId
    //    };

    //    try {
    //        GetSubAccData = JSON.stringify(GetSubAccData);
    //    } catch (e) {
    //        swal("", e.message, "warning");
    //        return false;
    //    }
    //    GetSubAccData = { "encryptedRqstStr": EncryptAPIReq(GetSubAccData) };

    //    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", GetSubAccData, _ResubmitExpense.FillSubAccType, userdata.token)

    //},
    //FillSubAccType: function (response) {
    //    jQuery('.page-loader-wrapper').hide();
    //    if (response.status === "SUCCESS") {
    //        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
    //        if (response.data.queryResult.QueryResult.length > 0) {

    //            jQuery("#subacc").empty();
    //            jQuery("#subacc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB-ACCOUNT TYPE-------- "));
    //            jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
    //                jQuery("#subacc").append(jQuery("<option></option>").val(val.param1).text(val.param1 + '-' + val.param2));
    //            });
    //        }
    //        else {
    //            jQuery("#subacc").empty();
    //            jQuery("#subacc").append(jQuery("<option></option>").val("0").text(" --------NO SUB-ACCOUNT AVAILABLE-------- "));
    //        }
    //    }
    //    else {

    //        jQuery("#subacc").empty();
    //        jQuery("#subacc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB-ACCOUNT TYPE-------- "));
    //    }
    //},

    submitdata: function () {
            jQuery('.page-loader-wrapper').show();
            var val2 = jQuery("#type_select").val();
            var val1 = jQuery("#typeid").val();

            var limit = jQuery("#lmt").val();
            var bh = jQuery("#bhlmt").val();
            var ah = jQuery("#ahlmt").val();
            var rm = jQuery("#rmlmt").val();
            var zm = jQuery("#zmlmt").val();
            var oh = jQuery("#ohlmt").val();
            var ih = jQuery("#ihlmt").val();
            var cto = jQuery("#ctolmt").val();

        if (limit == lmt && bh == bhlmt && ah == ahlmt && rm == rmlmt && zm == zmlmt && oh == ohlmt && ih == ihlmt && cto == ctolmt) {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Cannot Resubmit, Please change values..!", "error");
            return false;
        } else if (limit=="") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter the ceiling limit..!", "error");
            return false;
        } else if (bh == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter the branch head limit..!", "error");
            return false;
        } else if (ah == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter the area head limit..!", "error");
            return false;
        } else if (rm == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Cannot Resubmit, Please enter the RM limit..!", "error");
            return false;
        } else if (zm == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter the ZM limit..!", "error");
            return false;
        } else if (oh == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter the OH limit..!", "error");
            return false;
        } else if (ih == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter the Infra Head limit..!", "error");
            return false;
        } else if (cto == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter the CTO limit..!", "error");
            return false;
        }else {
            var SubmitData = {
                "flag1": "RESUBMIT_EXPENSE",
                "flag2": "Resubmit_Expense",
                "inptvar1": val2 + "!!" + val1,
                "inptvar2": limit + "@@" + bh + "@@" + ah + "@@" + rm + "@@" + zm + "@@" + oh + "@@" + ih + "@@" + cto ,
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
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", SubmitData, _ResubmitExpense.FillsubmitData, userdata.token)
        }
        },
   
    FillsubmitData: function (response) {
     if (response.status === "SUCCESS") {
     jQuery('.page-loader-wrapper').hide();
     response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
        if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
            var rep = response.data.queryResult.QueryResult[0].param1;
           
            if (rep == "1") {
                swal({
                    title: "Resubmitted",
                    //text: response.data.queryResult.QueryResult[0].param1,
                    type: "info"
                }, function () {
                    var val1 = jQuery("#type_select").val();
                    _ResubmitExpense.ShowExpenseDetails(val1);
                });
            }
        }
     }
    },

    
}






jQuery(document).ready(function ($) {
    jQuery('#expense_tbl').hide();
    
    _ResubmitExpense.tokenValidate();
    _ResubmitExpense.checkAccess();
    jQuery('.page-loader-wrapper').hide();
    jQuery('#type_select').change(function (e) {
        var outward = jQuery('#type_select').val();
        if (outward != 0) {
            _ResubmitExpense.ShowExpenseDetails(outward);
        }
        else {
            jQuery("#type_select").empty();
            jQuery("#type_select").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TYPE-------- "));
        }
    });
});

//jQuery('#acc').change(function (e) {
//    var acc = jQuery('#acc').val();
//    if (acc != 0) {
//        _ResubmitExpense.ShowSubAccount(acc);
//    }
//    else {
//        jQuery("#subacc").empty();
//        jQuery("#subacc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB-ACCOUNT -------- "));
//    }
//});

//jQuery('#acc').click(function (e) {
//    jQuery('#acc').hide();
//    jQuery('#ddlacc').show();
//    _ResubmitExpense.ShowAccountDetails();
//});

jQuery('#btn_approve').click(function (e) {
    _ResubmitExpense.submitdata();
});







