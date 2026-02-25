var _AddNewExpense = {

    AddExpense: function (name, hdlimit, cfolimit, mdlimit, ExpenseType) {
        jQuery('.page-loader-wrapper').show();
        var ExpenseType = jQuery('#ddlexpensetyp').val();
        var val = 0;
        if (ExpenseType == 1) {
            val = 10;
        }
        else if (ExpenseType == 2) {
            val = 11;
        }

        //var input1 = name + "!!" + hdlimit + "!!" + cfolimit + "!!" + mdlimit + "!!" + val;
        var input1 = name + "!!" + val;
        var AddExpenseData = {
            "flag1": "NEWEXPENSEADD",
            "flag2": "NEWEXPENSE",
            "inptvar1": input1,
            "inptvar2": userdata.userId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", AddExpenseData, _AddNewExpense.AddExpenseCompleted, userdata.token)
    },
    AddExpenseCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {
                if (response.data.queryResult[0].param2 == '13') {
                    swal({
                        title: "Confirmed",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
                jQuery('#btnadd1').prop("disabled", true);

            }
            else {

                swal({
                    title: "Error found!!",
                    text: "Please try again.!",
                    type: "info"
                }, function () {
                    window.location.href = "dashboard";
                });
            }
        }
    },
    Expenseload: function () {
        jQuery('.page-loader-wrapper').show();
        var ExpenseloadData = {
            "flag1": "LOADEXPENSE",
            "flag2": "MAINEXPENSE"
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", ExpenseloadData, _AddNewExpense.ExpenseloadCompleted, userdata.token)
    },
    ExpenseloadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#ddlexpense").empty();
                jQuery("#ddlexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN EXPENSE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlexpense").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlexpense").empty();
                jQuery("#ddlexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN EXPENSE-------- "));
            }
        }
        else {

            jQuery("#ddlexpense").empty();
            jQuery("#ddlexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN EXPENSE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },
    ParentACCload: function () {
        jQuery('.page-loader-wrapper').show();
        var ParentAccLoadData = {
            "flag1": "NEWEXPENSEADD",
            "flag2": "LOADPARENTACC"
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", ParentAccLoadData, _AddNewExpense.ParentACCloadCompleted, userdata.token)
    },
    ParentACCloadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#ddlprntacc").empty();
                jQuery("#ddlprntacc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PARENT ACCOUNT-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlprntacc").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlprntacc").empty();
                jQuery("#ddlprntacc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  PARENT ACCOUNT-------- "));
            }
        }
        else {

            jQuery("#ddlprntacc").empty();
            jQuery("#ddlprntacc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  PARENT ACCOUNT-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },
    SubACCload: function () {
        jQuery('.page-loader-wrapper').show();
        var parentAcc = jQuery("#ddlprntacc").val();
        var SubACCData = {
            "flag1": "NEWEXPENSEADD",
            "flag2": "LOANSUBACC",
            "inptvar1": parentAcc
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", SubACCData, _AddNewExpense.SubACCloadCompleted, userdata.token)
    },
    SubACCloadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#ddlsubacc").empty();
                jQuery("#ddlsubacc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB ACCOUNT-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlsubacc").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlsubacc").empty();
                jQuery("#ddlsubacc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SUB ACCOUNT-------- "));
            }
        }
        else {

            jQuery("#ddlsubacc").empty();
            jQuery("#ddlsubacc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SUB ACCOUNT-------- "));
        }
        jQuery('.page-loader-wrapper').hide();
    },
    typeload: function () {
        jQuery('.page-loader-wrapper').show();
        var parentAcc = jQuery("#ddlprntacc").val();
        var subAcc = jQuery("#ddlsubacc").val();
        var typeloadData = {
            "flag1": "NEWEXPENSEADD",
            "flag2": "LOADTYPE",
            "inptvar1": parentAcc,
            "inptvar2": subAcc
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", typeloadData, _AddNewExpense.typeloadCompleted, userdata.token)
    },
    typeloadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            var type = "";
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                if (response.data.queryResult[0].param1 == 'C') {
                    type = 'CREDIT';
                }
                else if (response.data.queryResult[0].param1 == 'D') {

                    type = 'DEBIT';
                }
                else { }
                jQuery("#txttype").empty();
                jQuery("#txttype").val(type);
            }
            else {
                jQuery("#txttype").empty();

            }
        }
        else {

            jQuery("#txttype").empty();

        }
        jQuery('.page-loader-wrapper').hide();
    },
    AddSubExpense: function (Expense, subExpense, parentACC, SubACC, typ) {
        jQuery('.page-loader-wrapper').hide();
        var inputt = Expense + "!!" + subExpense + "!!" + parentACC + "!!" + SubACC + "!!" + typ ;
        var AddSubExpenseData = {
            "flag1": "NEWEXPENSEADD",
            "flag2": "NEWSUBEXPENSE",
            "inptvar1": inputt,
            "inptvar2": userdata.userId

        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", AddSubExpenseData, _AddNewExpense.AddSubExpenseCompleted, userdata.token)
    },
    AddSubExpenseCompleted: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {
                if (response.data.queryResult[0].param2 == '15') {
                    swal({
                        title: "Confirmed",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
                jQuery('#btnadd1').prop("disabled", true);

            }
            else {

                swal({
                    title: "Error found!!",
                    text: "Please try again.!",
                    type: "info"
                }, function () {
                    window.location.href = "dashboard";
                });
            }
        }
    }
}
jQuery(document).ready(function ($) {
    jQuery('#btnaddExpense').click(function (e) {
        jQuery('#addExpenseDetails').show();
        jQuery('#addSubExpenseDetails').hide();

    });
    jQuery('#btnadd1').click(function (e) {
        var name = jQuery('#txtexpensename').val().toUpperCase();
        //var hdlimit = jQuery('#txtdphdlmt').val();
        //var cfolimit = jQuery('#txtcfolmt').val();
        //var mdlimit = jQuery('#txtmdlmt').val();
        var ExpenseType = jQuery('#ddlexpensetyp').val();

        if (name == "") {
            swal("Please Enter Expense ...!!!", "");
        }
        //else if (hdlimit == "") {
        //    swal("Please Enter Department Head Limit...!!!", "warning");
        //}
        //else if (cfolimit == "") {
        //    swal("Please Enter CFO Limint...!!!", "warning");
        //}
        //else if (mdlimit == "") {
        //    swal("Please Enter MD limit...!!!", "warning");
        //}
        else if (ExpenseType == 0) {
            swal("Please select Expense Type...!!!", "");
        }
        else {
            //_AddNewExpense.AddExpense(name, hdlimit, cfolimit, mdlimit, ExpenseType);
            _AddNewExpense.AddExpense(name, ExpenseType);
        }
    });
    jQuery('#btnaddSubExpense').click(function (e) {
        jQuery('#addExpenseDetails').hide();
        jQuery('#addSubExpenseDetails').show();
        _AddNewExpense.Expenseload();
    });
    jQuery('#txtexpensename').change(function (e) {
        jQuery('#btnadd1').prop("disabled", false);
    });
    jQuery('#txtsubexpensename').change(function (e) {
        _AddNewExpense.ParentACCload();
    });
    jQuery('#ddlprntacc').change(function (e) {
        _AddNewExpense.SubACCload();
    });
    jQuery('#ddlsubacc').change(function (e) {
        _AddNewExpense.typeload();
    })
    //jQuery('#btnadd2').click(function (e) {
    //    var Expense = jQuery('#ddlexpense').val();
    //    var subExpense = jQuery('#txtsubexpensename').val();
    //    var parentACC = jQuery('#ddlprntacc').val();
    //    var SubACC = jQuery('#ddlsubacc').val();
    //    var type = jQuery('#txttype').val();
    //    if (type == 'CREDIT') {
    //        var typ = 'C';
    //    }
    //    else {
    //        var typ = 'D';
    //    }
    //    if (Expense == 0) {
    //        swal("Please Select Expense...!!!", "warning");
    //    }
    //    else if (subExpense == "") {
    //        swal("Please Enter the SubExpense...!!!", "warning");
    //    }
    //    else if (parentACC == 0) {
    //        swal("Please Select Parent Account...!!!", "warning");
    //    }
    //    else if (SubACC == 0) {
    //        swal("Please Select Sub-Account...!!!")
    //    }
    //    else {
    //        _AddNewExpense.AddSubExpense(Expense, subExpense, parentACC, SubACC, typ);
    //    }
    //});

    jQuery('#btnadd2').click(function (e) {
        var Expense = jQuery('#ddlexpense').val();
        var subExpense = jQuery('#txtsubexpensename').val().toUpperCase();
        var parentACC = jQuery('#ddlprntacc').val();
        var SubACC = jQuery('#ddlsubacc').val();
        var type = jQuery('#txttype').val();

        //var hdlimit = jQuery('#txtdphdlmt').val();
        //var cfolimit = jQuery('#txtcfolmt').val();

        if (type == 'CREDIT') {
            var typ = 'C';
        }
        else {
            var typ = 'D';
        }
        if (Expense == 0) {
            swal("Please Select Expense...!!!", "");
        }
        else if (subExpense == "") {
            swal("Please Enter SubExpense...!!!", "");
        }
        else if (parentACC == 0) {
            swal("Please Select Parent Account...!!!", "");
        }
        //else if (hdlimit == "") {
        //    swal("Please Enter Department Limit...!!!", "");
        //}
        //else if (cfolimit == "") {
        //    swal("Please Enter CFO Limit...!!!", "");
        //}
        else if (SubACC == 0) {
            swal("Please Select Sub-Account...!!!")
        }
        else {
            _AddNewExpense.AddSubExpense(Expense, subExpense, parentACC, SubACC, typ);
            //_AddNewExpense.AddSubExpense(Expense, subExpense, parentACC, SubACC, typ, hdlimit, cfolimit);
        }
    });


});