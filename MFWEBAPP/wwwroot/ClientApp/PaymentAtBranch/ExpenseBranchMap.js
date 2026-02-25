var prid;
var ExpenseBranch = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var CheckAccess = {
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1013",
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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, ExpenseBranch.checkAccessRtn, userdata.token)
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
                //    ExpenseBranch.ShowAccountDetails();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, ExpenseBranch.checkAccessToken, userdata.token)
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
            //    ExpenseBranch.StateLoad();
            //}


        }

    },

    // State Load

    StateLoad: function () {

        var Str = " ";
        var GetstateLoad = {
            "flag1": "Expense_branch_map",
            "flag2": "Get_state",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            GetstateLoad = JSON.stringify(GetstateLoad);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetstateLoad = { "encryptedRqstStr": EncryptAPIReq(GetstateLoad) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", GetstateLoad, ExpenseBranch.FillstateLoad, userdata.token)

    },
    FillstateLoad: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery("#Branchid").empty();
                jQuery("#Branchid").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#Branchid").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#Branchid").empty();
                jQuery("#Branchid").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));
            }
        }
        else {

            jQuery("#Branchid").empty();
            jQuery("#Branchid").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));
        }
    },

    //Expense Load

    ExpenseLoad: function (outward) {

        var GetExpenseLoad = {
            "flag1": "Expense_branch_map",
            "flag2": "Get_Expense",
            "inptvar1": outward,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            GetExpenseLoad = JSON.stringify(GetExpenseLoad);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetExpenseLoad = { "encryptedRqstStr": EncryptAPIReq(GetExpenseLoad) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", GetExpenseLoad, ExpenseBranch.FillExpenseLoad, userdata.token)


    },

    FillExpenseLoad: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery("#Expense").empty();
                jQuery("#Expense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE EXPENSE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#Expense").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#Expense").empty();
                jQuery("#Expense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE EXPENSE-------- "));
            }
        }
        else {

            jQuery("#Expense").empty();
            jQuery("#Expense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE EXPENSE-------- "));
        }


    },

    // TABLE LOAD

    tablefill: function (expense) {

        var outward = jQuery('#Branchid').val();


        var brnachtablefill = {
            "flag1": "Expense_branch_map",
            "flag2": "Get_Branch",
            "inptvar1": outward + "!!" + expense,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId

        };
        try {
            brnachtablefill = JSON.stringify(brnachtablefill);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        brnachtablefill = { "encryptedRqstStr": EncryptAPIReq(brnachtablefill) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", brnachtablefill, ExpenseBranch.branchtableload, userdata.token)
    },

    branchtableload: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery('#maincard').show();



                if (response.data.queryResult.QueryResult.length > 0) {

                    jQuery('#Fidatatabl').empty();
                    jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                        var $row = jQuery('<tr/>');
                        var data1 = val.param1;
                        var data2 = val.param2.split("~");
                        var status = data2[1];
                        $row.append(jQuery('<td class="HCol" align="center">').html(data1));
                        $row.append(jQuery('<td class="HCol" align="center">').html(data2[0]));
                        if (status == 1) {
                            $row.append(jQuery('<td align="center">').html('<button type="button" class="btn btn-danger" id="Block" style="width:70px; height:30px;" onClick="ExpenseBranch.UpdateStatus(' + data1 + ',\'' + status + '\');" name="block" >BLOCK</button>'));
                        }
                        else {
                            $row.append(jQuery('<td align="center">').html('<button type="button" class="btn btn-success" id="Add" style="width:70px; height:30px;" onClick = "ExpenseBranch.UpdateStatus(' + data1 + ',\'' + status + '\');" name="add" >ADD</button> '));

                        }
                        jQuery('#Fidatatabl').append($row);
                    });
                }

            }
        }

    },


    UpdateStatus: function (id, status) {
        var type = parseInt(jQuery('#Expense').val().split("#")[0]);
        var AddButton = {
            "flag1": "Expense_branch_map",
            "flag2": "Update_status",
            "inptvar1": status + "!!" + id + "!!" + type,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId

        };
        try {
            AddButton = JSON.stringify(AddButton);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        AddButton = { "encryptedRqstStr": EncryptAPIReq(AddButton) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/NewExpenseAdd", AddButton, ExpenseBranch.AddButtonStatus, userdata.token)
    },

    AddButtonStatus: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();
                if (response.data.queryResult.QueryResult.length > 0) {
                    var rep = response.data.queryResult.QueryResult[0].param1;
                    var expense = jQuery('#Expense').val();
                    if (rep == 0) {
                        swal({
                            title: "Blocked",
                            type: "info"
                        }, function () {
                            ExpenseBranch.tablefill(expense);
                        });
                    } else if (rep == 1) {
                        swal({
                            title: "Branch Added",
                            type: "info"
                        }, function () {
                            ExpenseBranch.tablefill(expense);
                        });
                    }
                    
                }

            }
        }

    },









}

jQuery(document).ready(function ($) {
    jQuery('#maincard').hide();

    ExpenseBranch.tokenValidate();
    ExpenseBranch.checkAccess();
    ExpenseBranch.StateLoad();
    jQuery('#Type').change(function (e) {

        var outward = jQuery('#Type').val();
        if (outward != 0) {
            ExpenseBranch.ExpenseLoad(outward);
            //jQuery('#confirm').show();
        }
        else {
            jQuery("#Branchid").empty();
            jQuery("#Branchid").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));

        }
        jQuery("#maincard").hide();
    });


    jQuery('#Expense').change(function (e) {
        var expense = jQuery('#Expense').val();
        ExpenseBranch.tablefill(expense);
    });

    jQuery('#Branchid').change(function (e) {
        jQuery("#Expense").empty();
        jQuery("#Expense").append(jQuery("<option></option>").val("0").text(" --------Select Expense-------- "));
    });


    jQuery('#Expense').click(function (e) {
        var prid = jQuery('#Branchid').val();
        var qrid = jQuery('#Type').val();
        if (prid == 0) {
            if (qrid == 0) {

                swal("Error", "Please Select State and Type..!", "error");
                return false;
            }
        }
        else if (prid != 0 && qrid == 0) {
            swal("Error", "Please Select Type..!", "error");
            return false;
        }

    });

    jQuery('#Type').click(function (e) {
        var prid = jQuery('#Branchid').val();
        if (prid == 0) {
            swal("Error", "Please Select State..!", "error");
            return false;
        }
    });

});






