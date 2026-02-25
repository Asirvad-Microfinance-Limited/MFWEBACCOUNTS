var ceillmt, bhlm, ahlm, rmlm, zmlm, ohlm, ihlm, ctolm;
var _AddNewExpense = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var CheckAccess = {
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1015",
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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _AddNewExpense.checkAccessRtn, userdata.token)
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
                else {
                    _AddNewExpense.ShowAccountDetails();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _AddNewExpense.checkAccessToken, userdata.token)
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
                _AddNewExpense.GetOutwardStateData();
            }


        }

    },

    checkValidation: function () {

        //jQuery('.page-loader-wrapper').show();
        ceillmt = parseInt(jQuery('#lmt').val());
        bhlm = parseInt(jQuery('#bhlmt').val());
        ahlm = parseInt(jQuery('#ahlmt').val());
        rmlm = parseInt(jQuery('#rmlmt').val());
        zmlm = parseInt(jQuery('#zmlmt').val());
        ohlm = parseInt(jQuery('#ohlmt').val()); 
        ihlm = parseInt(jQuery('#ihlmt').val());
        ctolm = parseInt(jQuery('#ctolmt').val());


        if (bhlm > ceillmt) {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#bhlmt').val("");
            swal("Error", "BH limit should be less than Ceiling Limit..!", "error");
            return false;
        }
        else if (ahlm > ceillmt) {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#ahlmt').val("");
            swal("Error", "AH limit should be less than Ceiling Limit..!", "error");
            return false;
        }
        else if (rmlm > ceillmt) {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#rmlmt').val("");
            swal("Error", "RM limit should be less than Ceiling Limit..!", "error");
            return false;
        }
        else if (zmlm > ceillmt) {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#zmlmt').val("");
            swal("Error", "ZM limit should be less than Ceiling Limit..!", "error");
            return false;
        }
        else if (ohlm > ceillmt) {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#ohlmt').val("");
            swal("Error", "Operation Head limit should be less than Ceiling Limit..!", "error");
            return false;
        }
        else if (ihlm > ceillmt) {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#ihlmt').val("");
            swal("Error", "Infra Head limit should be less than Ceiling Limit..!", "error");
            return false;
        }
        else if (ctolm > ceillmt) {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#ctolmt').val("");
            swal("Error", "CTO limit should be less than Ceiling Limit..!", "error");
            return false;
        }
        else if (ahlm < bhlm && ahlm !='') {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#ahlmt').val("");
            swal("Error", "AH limit should be greater than BH..!", "error");
            return false;
        }
   
        else if (rmlm < ahlm && rmlm != '') {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#rmlmt').val("");
            swal("Error", "RM limit should be greater than AH..!", "error");
            return false;
        }
     
        else if (zmlm < rmlm && zmlm != '') {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#zmlmt').val("");
            swal("Error", "ZM limit should be greater than RM..!", "error");
            return false;
        }
       
        else if (ohlm < zmlm && ohlm != '') {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#ohlmt').val("");
            swal("Error", "OH limit should be greater than ZM..!", "error");
            return false;
        }
        
        else if (ihlm < ohlm && ihlm != '') {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#ihlmt').val("");
            swal("Error", "IH limit should be greater than OH..!", "error");
            return false;
        }
        
        else if (ctolm < ihlm && ctolm != '') {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#ctolmt').val("");
            swal("Error", "CTO limit should be greater than Infra Head..!", "error");
            return false;
        }

        
    },

    ShowAccountDetails: function () {
       
        jQuery('.page-loader-wrapper').show();
        var GetAccountData = {
            "flag1": "NEW_EXPENSE",
            "flag2": "FILLACCOUNTNAME",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        try {
            GetAccountData = JSON.stringify(GetAccountData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetAccountData = { "encryptedRqstStr": EncryptAPIReq(GetAccountData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", GetAccountData, _AddNewExpense.FillAccountType, userdata.token)

    },
    FillAccountType: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery("#ddlAcc").empty();
                jQuery("#ddlAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlAcc").append(jQuery("<option></option>").val(val.param1).text(val.param1+'-'+val.param2));
                });
            }
            else {
                jQuery("#ddlAcc").empty();
                jQuery("#ddlAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE ACCOUNT-------- "));
            }
        }
        else {

            jQuery("#ddlAcc").empty();
            jQuery("#ddlAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE ACCOUNT-------- "));
        }
    },

    ShowSubAccount: function (acc) {
        jQuery('.page-loader-wrapper').show();
        var GetSubAccData = {
            "flag1": "NEW_EXPENSE",
            "flag2": "FILL_SUBACCOUNT",
            "inptvar1": acc,
            "inptvar2": "",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        try {
            GetSubAccData = JSON.stringify(GetSubAccData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetSubAccData = { "encryptedRqstStr": EncryptAPIReq(GetSubAccData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", GetSubAccData, _AddNewExpense.FillSubAccType, userdata.token)

    },
    FillSubAccType: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery("#subacc").empty();
                jQuery("#subacc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB-ACCOUNT TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#subacc").append(jQuery("<option></option>").val(val.param1).text(val.param1 + '-' +val.param2));
                });
            }
            else {
                jQuery("#subacc").empty();
                jQuery("#subacc").append(jQuery("<option></option>").val("0").text(" --------NO SUB-ACCOUNT AVAILABLE-------- "));
            }
        }
        else {

            jQuery("#subacc").empty();
            jQuery("#subacc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB-ACCOUNT TYPE-------- "));
        }
    },
    GetOutwardStateData: function () {
        var Str = " ";
        var GetStateData = {
            "flag1": "NEW_EXPENSE",
            "flag2": "FILLSTATE",
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        //encryption//
        try {
            GetStateData = JSON.stringify(GetStateData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetStateData = { "encryptedRqstStr": EncryptAPIReq(GetStateData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", GetStateData, _AddNewExpense.FillOutwardData, userdata.token)

    },
    FillOutwardData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery("#ddlOutWard").empty();
                jQuery("#ddlOutWard").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlOutWard").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlOutWard").empty();
                jQuery("#ddlOutWard").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));
            }
        }
        else {

            jQuery("#ddlOutWard").empty();
            jQuery("#ddlOutWard").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));
        }
    },

    getBranchType: function (stateID) {
        jQuery('.page-loader-wrapper').show();
        var GetPayTypeData = {
            "flag1": "NEW_EXPENSE",
            "flag2": "FILLBRANCH",
            "inptvar1": stateID,
            "inptvar2": "",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        try {
            GetPayTypeData = JSON.stringify(GetPayTypeData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", GetPayTypeData, _AddNewExpense.FillBranchType, userdata.token)

    },
    FillBranchType: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {
                var branchContainer = jQuery("#ddlBranchType");
                branchContainer.empty();
                //jQuery("#ddlBranchType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH-------- "));
                 jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    var checkbox = jQuery('<input type="checkbox" name="ddlBranchType" value="' + val.param1 + '"> '+ val.param1 +"-"+ val.param2 + '<br>');
                    branchContainer.append(checkbox);
                });
            }
            else {
                jQuery("#ddlBranchType").empty();
                jQuery("#ddlBranchType").append(jQuery("<option></option>").val("0").text(" --------NO BRANCHES AVAILABLE-------- "));
            }
        }
        else {

            jQuery("#ddlBranchType").empty();
            jQuery("#ddlBranchType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH TYPE-------- "));
        }
    },
    //enontotcalc: function (st) {
    //    var isValid = true;

    //    // Expense Validation
    //    var exp = jQuery('#exp').val();
    //    if (exp === "") {
    //        jQuery('.page-loader-wrapper').hide();
    //        swal("Error", "Enter the Expense..!", "error");
    //        jQuery('#exp-error').text("This field is required");
    //        isValid = false;
    //    } else {
    //        jQuery('#exp-error').text("");
    //    }

    //    // Period Validation
    //    var per = jQuery('#period').val();
    //    if (per === "") {
    //        jQuery('.page-loader-wrapper').hide();
    //        jQuery('#period-error').text("Please select an option");
    //        isValid = false;
    //    } else {
    //        jQuery('#period-error').text("");
    //    }

    //    // Ceiling Limit Validation
    //    var lmt = jQuery('#lmt').val();
    //    if (lmt === "") {
    //        jQuery('.page-loader-wrapper').hide();
    //        jQuery('#lmt-error').text("This field is required");
    //        isValid = false;
    //    } else {
    //        jQuery('#lmt-error').text("");
    //    }

    //    // Type Validation
    //    var typ = jQuery('#type').val();
    //    if (typ === "") {
    //        jQuery('.page-loader-wrapper').hide();
    //        jQuery('#type-error').text("Please select an option");
    //        isValid = false;
    //    } else {
    //        jQuery('#type-error').text("");
    //    }

    //    // Branch Head Limit Validation
    //    var bh = jQuery('#bhlmt').val();
    //    if (bh === "") {
    //        jQuery('.page-loader-wrapper').hide();
    //        jQuery('#bhlmt-error').text("This field is required");
    //        isValid = false;
    //    } else {
    //        jQuery('#bhlmt-error').text("");
    //    }

    //    // Area Head Limit Validation
    //    var ah = jQuery('#ahlmt').val();
    //    if (ah === "") {
    //        jQuery('.page-loader-wrapper').hide();
    //        jQuery('#ahlmt-error').text("This field is required");
    //        isValid = false;
    //    } else {
    //        jQuery('#ahlmt-error').text("");
    //    }

    //    // Regional Manager Limit Validation
    //    var rm = jQuery('#rmlmt').val();
    //    if (rm === "") {
    //        jQuery('.page-loader-wrapper').hide();
    //        jQuery('#rmlmt-error').text("This field is required");
    //        isValid = false;
    //    } else {
    //        jQuery('#rmlmt-error').text("");
    //    }

    //    // Zonal Manager Limit Validation
    //    var zm = jQuery('#zmlmt').val();
    //    if (zm === "") {
    //        jQuery('.page-loader-wrapper').hide();
    //        jQuery('#zmlmt-error').text("This field is required");
    //        isValid = false;
    //    } else {
    //        jQuery('#zmlmt-error').text("");
    //    }

    //    // Operation Head Limit Validation
    //    var oh = jQuery('#ohlmt').val();
    //    if (oh === "") {
    //        jQuery('.page-loader-wrapper').hide();
    //        jQuery('#ohlmt-error').text("This field is required");
    //        isValid = false;
    //    } else {
    //        jQuery('#ohlmt-error').text("");
    //    }

    //    // Infra Head Limit Validation
    //    var ih = jQuery('#ihlmt').val();
    //    if (ih === "") {
    //        jQuery('.page-loader-wrapper').hide();
    //        jQuery('#ihlmt-error').text("This field is required");
    //        isValid = false;
    //    } else {
    //        jQuery('#ihlmt-error').text("");
    //    }

    //    // CTO Limit Validation
    //    var cto = jQuery('#ctolmt').val();
    //    if (cto === "") {
    //        jQuery('.page-loader-wrapper').hide();
    //        jQuery('#ctolmt-error').text("This field is required");
    //        isValid = false;
    //    } else {
    //        jQuery('#ctolmt-error').text("");
    //    }

    //    // Account Number Validation
    //    var acc = parseInt(jQuery('#ddlAcc').val());
    //    if (acc === 0) {
    //        jQuery('.page-loader-wrapper').hide();
    //        jQuery('#acc-error').text("Please select an account");
    //        isValid = false;
    //    } else {
    //        jQuery('#acc-error').text("");
    //    }

    //    // Sub-Account Number Validation
    //    var subacc = parseInt(jQuery('#subacc').val());
    //    if (subacc === 0) {
    //        jQuery('.page-loader-wrapper').hide();
    //        jQuery('#subacc-error').text("Please select a sub-account");
    //        isValid = false;
    //    } else {
    //        jQuery('#subacc-error').text("");
    //    }

    //    // State Validation
    //    var state = parseInt(jQuery('#ddlOutWard').val());
    //    if (state === 0) {
    //        jQuery('.page-loader-wrapper').hide();
    //        jQuery('#ddlOutWard-error').text("Please select a state");
    //        isValid = false;
    //    } else {
    //        jQuery('#ddlOutWard-error').text("");
    //    }

    //    // Branch Type Validation
    //    var branchType = parseInt(jQuery('#ddlBranchType').val());
    //    if (branchType === 0) {
    //        jQuery('.page-loader-wrapper').hide();
    //        jQuery('#ddlBranchType-error').text("Please select a branch type");
    //        isValid = false;
    //    } else {
    //        jQuery('#ddlBranchType-error').text("");
    //    }

    //    return isValid;
    //},
    submitdata1: function () {
        //_AddNewExpense.enontotcalc();
        jQuery('.page-loader-wrapper').show();
        var exp = jQuery('#exp').val();
        var per = jQuery('#period').val();
        var lmt = jQuery('#lmt').val();
        var typ = jQuery('#type').val();
        var bh = jQuery('#bhlmt').val();
        var ah = jQuery('#ahlmt').val();
        var rm = jQuery('#rmlmt').val();
        var zm = jQuery('#zmlmt').val();
        var oh = jQuery('#ohlmt').val();
        var ih = jQuery('#ihlmt').val();
        var cto = jQuery('#ctolmt').val();
        var acc = parseInt(jQuery('#ddlAcc').val().split("#")[0]);
        var subacc = parseInt(jQuery('#subacc').val().split("#")[0]);
        var state = parseInt(jQuery('#ddlOutWard').val().split("#")[0]);

        var selectedBranches = [];
        jQuery('input[name="ddlBranchType"]:checked').each(function () {
            selectedBranches.push(jQuery(this).val());
        });

        if (exp == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter the expense..!", "error");
            return false;
        } else if (per == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter the period..!", "error");
            return false;
        }
        else if (lmt == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter the ceiling limit..!", "error");
            return false;
        } else if (typ == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter the branch type..!", "error");
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
        } else if (acc == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter the account..!", "error");
            return false;
        } else if (subacc == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter the sub-account..!", "error");
            return false;
        } else if (state == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter the state..!", "error");
            return false;
        }
        if (selectedBranches.length === 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please choose the branch..!", "error");
            return false;
        }
        else {

            var result1 = exp + "!!" + per + "!!" + lmt + "!!" + typ + "!!" + bh + "!!" + ah + "!!" + rm;
            var result2 = zm + "@@" + oh + "@@" + ih + "@@" + cto + "@@" + acc + "@@" + subacc + "@@" + state + "@@" + selectedBranches;
            //if (state == 0) {
            //    jQuery('.page-loader-wrapper').hide();
            //    swal("", "Please Select the State...!", "error");
            //    return false;
            //}
            //else {
            //    jQuery('.page-loader-wrapper').hide();
            //    swal("", "Please Select the Branch...!", "error");
            //    return false;
            //}


            var submit_values = {
                "flag1": "NEW_EXPENSE",
                "flag2": "Submit_Flag",
                "inptvar1": result1,
                "inptvar2": result2,
                "typeID": "4",
                "userID": userdata.userId,
                "branchID": userdata.branchId
            };

            try {
                submit_values = JSON.stringify(submit_values);
            } catch (e) {
                swal("", e.message, "warning");
                return false;
            }
            submit_values = { "encryptedRqstStr": EncryptAPIReq(submit_values) };

            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", submit_values, _AddNewExpense.SubmitReturn, userdata.token);
        }
        
    },
    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {
                swal({
                    title: "Submitted",
                    text: response.data.queryResult.QueryResult[0].param1,
                    type: "success"
                }, function () {
                    window.location.reload(true);
                });
            }
        }
    },

}
jQuery(document).ready(function ($) {

     //_AddNewExpense.ShowAccountDetails();
    _AddNewExpense.tokenValidate();
    _AddNewExpense.checkAccess();
    jQuery('.page-loader-wrapper').hide();
    jQuery('#ddlOutWard').change(function (e) {
        var outward = jQuery('#ddlOutWard').val();
        if (outward != 0) {
            _AddNewExpense.getBranchType(outward);
            jQuery('#confirm').show();
        }
        else {
            jQuery("#ddlBranchType").empty();
            jQuery("#ddlBranchType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH TYPE-------- "));
        }
    });

    jQuery('#ddlAcc').change(function (e) {
        var acc = jQuery('#ddlAcc').val();
        if (acc != 0) {
            _AddNewExpense.ShowSubAccount(acc);
            jQuery('#confirm').show();      
        }
        else {
            jQuery("#subacc").empty();
            jQuery("#subacc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB-ACCOUNT -------- "));
        }
    });

    //jQuery('#ddlOutWard').click(function (e) {
    //    _AddNewExpense.GetOutwardStateData();
    //});
});




jQuery('#submit').click(function (e) {
    _AddNewExpense.submitdata1();
});

jQuery('#bhlmt').click(function (e) {
    _AddNewExpense.checkValidation();
});

jQuery('#ahlmt').click(function (e) {
    _AddNewExpense.checkValidation();
});

jQuery('#rmlmt').click(function (e) {
    _AddNewExpense.checkValidation();
});

jQuery('#zmlmt').click(function (e) {
    _AddNewExpense.checkValidation();
});

jQuery('#ohlmt').click(function (e) {
    _AddNewExpense.checkValidation();
});
jQuery('#ihlmt').click(function (e) {
    _AddNewExpense.checkValidation();
});
jQuery('#ctolmt').click(function (e) {
    _AddNewExpense.checkValidation();
});





