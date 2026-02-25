
var tblData = [];
var AMOUNTtotal;
var CRtot;

var _CfoPaymentEntry = {
    AccountFill: function () {
        jQuery('.page-loader-wrapper').show();


    },


    //ExpenseLoad: function () {
    //    jQuery('.page-loader-wrapper').show();
    //    var Str = " ";
    //    var GetExpenseTypeData = {
    //        "flag1": "LOADDESCRP",
    //        "flag2": "MAINDESCR",
    //        "inptvar1": userdata.branchId,
    //        "inptvar2": userdata.userId
    //    };

    //    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _CfoPaymentEntry.FillPayType, userdata.token)

    //},
    //FillPayType: function (response) {
    //    if (response.status === "SUCCESS") {
    //        if (response.data.queryResult.length > 0) {
    //            //token = response.data.queryResult.token;
    //            jQuery("#ddlexpense").empty();
    //            jQuery("#ddlexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
    //            jQuery.each(response.data.queryResult, function (i, val) {
    //                jQuery("#ddlexpense").append(jQuery("<option></option>").val(val.param1).text(val.param2));
    //            });
    //        }
    //        else {
    //            jQuery("#ddlexpense").empty();
    //            jQuery("#ddlexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
    //        }
    //    }
    //    else {

    //        jQuery("#ddlexpense").empty();
    //        jQuery("#ddlexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
    //    }
    //    jQuery('.page-loader-wrapper').hide();

    //},

    //Vendor Load
    BillFromVendor: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADDESCRP",
            "flag2": "MAINDESCRVEN",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData,  _CfoPaymentEntry.FillPayType, userdata.token)

    },
    FillPayType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#ddlexpense").empty();
                jQuery("#ddlexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlexpense").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlexpense").empty();
                jQuery("#ddlexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
            }
        }
        else {

            jQuery("#ddlexpense").empty();
            jQuery("#ddlexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },
    //Employee Load
    BillFromEmployee: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADDESCRP",
            "flag2": "MAINDESCREMP",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData,  _CfoPaymentEntry.EmpFillPayType, userdata.token)

    },
    EmpFillPayType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#ddlexpense").empty();
                jQuery("#ddlexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlexpense").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlexpense").empty();
                jQuery("#ddlexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
            }
        }
        else {

            jQuery("#ddlexpense").empty();
            jQuery("#ddlexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },



    expensedetailsload: function (val) {
        jQuery('.page-loader-wrapper').show();
        var descr = jQuery("#ddlexpense").val();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADDEATAILS",
            "flag2": "MAINDETAILS",
            "inptvar1": descr,
            "inptvar2": userdata.userId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _CfoPaymentEntry.expenseloadcompleted, userdata.token)

    },
    expenseloadcompleted: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data != null && response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#traDate").empty();
                jQuery("#traDate").val(response.data.queryResult[0].param1);
                jQuery("#txtamount").empty();
                jQuery("#txtamount").val(response.data.queryResult[0].param2);
                //jQuery("#txtgst").empty();
                //jQuery("#txtgst").val(response.data.queryResult[0].param3);
                jQuery("#txtamtLimit").empty();
                jQuery("#txtamtLimit").val(response.data.queryResult[0].param3);

                var amount = jQuery("#txtamount").val();
                //var gst = jQuery("#txtgst").val();
                var total = parseInt(amount) /*+ parseInt(gst);*/
                var limit = jQuery("#txtamtLimit").val();
                if (total < limit) {
                    jQuery("#txtexceedamt").val(0);
                    jQuery("#btnapprove").show();
                    jQuery("#btnrecommend").hide();
                    jQuery("#btnreject").show();
                }
                else {
                    var exceedamnt = parseInt(total) - parseInt(limit);
                    jQuery("#txtexceedamt").val(exceedamnt);
                    jQuery("#btnapprove").hide();
                    jQuery("#btnrecommend").show();
                    jQuery("#btnreject").show();
                }

                _CfoPaymentEntry.HoEntryData();
            }
            else {
                jQuery("#subexpense").empty();
                jQuery("#subexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
            }


            jQuery('.page-loader-wrapper').hide();
        }
    },
    HoEntryData: function () {

        var expense = jQuery("#ddlexpense").val();

        var RowData = {
            "flag1": "LOADSUBDESCR",
            "flag2": "SUBDESCRIPTION",
            "inptvar1": expense,
            "inptvar2": userdata.userId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", RowData, _CfoPaymentEntry.HoDataTable, userdata.token)
    },



    HoDataTable: function (response) {
        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {


            jQuery('#hodetailsentry').empty();
            var $table = jQuery('<table class="table" id="horeconciliation">');
            $table.append('< thead >  <th style="text-align:center;">SL NO</th><th style="text-align:center;"> SUB EXPENSE</th><th style="text-align:center;">AMOUNT</th><th style="text-align:center;">GST</th><th style="text-align:center;">TDS</th></thead >');
            var $tbody = jQuery('<tbody>');
            jQuery("#amttotal").html(0);
            jQuery.each(response.data.queryResult, function (i, val) {
                var $row = jQuery('<tr/>');
                $row.append(jQuery('<td align="center">').html(i + 1));
                $row.append(jQuery('<td align="center">').html(val.param2));
                $row.append(jQuery('<td align="center">').html(val.param3));
                $row.append(jQuery('<td align="center">').html(val.param4));
                $row.append(jQuery('<td align="center">').html(val.param5));

               // $row.append(jQuery('<td align="center">').html('<button type="button" class="btnsmall  btn-danger fc-center" id="View" name="submitprint" onclick="_CfoPaymentEntry.viewInvoiceImages();"  > <i class="fa fa-eye" class="bs-tooltip remove" style="font-size:15px;"></i></button> '));
                $tbody.append($row);


            });
            $tbody.append('</tbody>');
            $table.append($tbody);
            jQuery('#maincard').show();
            jQuery("#amttotal").html(0);


            $table.append('</table>');
            jQuery('#hodetailsentry').html($table);

        }
        else {
            jQuery('#maincard').hide();
            jQuery('#hodetailsentry').empty();
        }
        _CfoPaymentEntry.addamount();
        jQuery('.page-loader-wrapper').hide();
    },
    addamount: function () {
        var total = jQuery("#txtamount").val();
        // if (amount> 0) {
        jQuery('#maincard').show();
        //  var AMOUNTtotal = 0;
        jQuery("#amttotal").html(total);

        //    jQuery.each(tblData, function (i, val) {

        //        AMOUNTtotal = (parseFloat(AMOUNTtotal) + parseFloat(amount)); //parseFloat(val.amount));
        //        jQuery("#amttotal").html(AMOUNTtotal);


        //    });

        //}

        jQuery('.page-loader-wrapper').hide();
    },
    Approvepayment: function () {
        jQuery('.page-loader-wrapper').show();
        var expense = jQuery("#ddlexpense").val();
        var user = userdata.userId;
        var remarks = jQuery("#remarks").val();
        var departmenhd = user + "@@" + expense;
        var Str = " ";
        var ApprovePaymentData = {
            "flag1": "CFOPAGE",
            "flag2": "CFOAPROVE",
            "inptvar1": remarks,
            "inptvar2": departmenhd
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", ApprovePaymentData, _CfoPaymentEntry.Recommendpaymentcompleted, userdata.token)

    },



    //reject button function//


    Rejectpayment: function () {
        jQuery('.page-loader-wrapper').show();
        var expense = jQuery("#ddlexpense").val();
        var user = userdata.userId;
        var remarks = jQuery("#remarks").val();
        var departmenhd = user + "@@" + expense;
        var Str = " ";
        var RejectPaymentData = {
            "flag1": "CFOPAGE",
            "flag2": "CFOREJECT",
            "inptvar1": remarks,
            "inptvar2": departmenhd
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", RejectPaymentData, _CfoPaymentEntry.Recommendpaymentcompleted, userdata.token)

    },


    //Recommend button function//

    Recommendpayment: function () {
        jQuery('.page-loader-wrapper').show();
        var expense = jQuery("#ddlexpense").val();
        var user = userdata.userId;
        var remarks = jQuery("#remarks").val();
        var departmenhd = user + "@@" + expense;
        var Str = " ";
        var RecommendPaymentData = {
            "flag1": "CFOPAGE",
            "flag2": "CFORECOMMEND",
            "inptvar1": remarks,
            "inptvar2": departmenhd
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", RecommendPaymentData, _CfoPaymentEntry.Recommendpaymentcompleted, userdata.token)

    },

    Recommendpaymentcompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {
                if (response.data.queryResult[0].param2 == '12') {
                    swal({
                        title: "Recommend",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
                else if (response.data.queryResult[0].param2 == '10') {
                    swal({
                        title: "Reject",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });

                }
                else if (response.data.queryResult[0].param2 == '11') {
                    swal({
                        title: "Approve",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });

                }
                _CfoPaymentEntry.ExpenseLoad();

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
    //viewInvoiceImages: function (x) {
    //    jQuery('.page-loader-wrapper').show();
    //    var expense = jQuery("#ddlexpense").val();
    //    var invimagemageData = {
    //        "recordingId": expense,
    //        "collectionName": "HOPAYMENTFILEID"
    //    }
    //    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/images", invimagemageData, _CfoPaymentEntry.viewInvoiceImagesLoadCompleted, userdata.token)
    //},

    //viewInvoiceImagesLoadCompleted: function (response) {
    //    jQuery('.page-loader-wrapper').hide();
    //    if (response.status === "SUCCESS") {
    //        var max = response.data.imageData.length;
    //        var $image = jQuery('<img class="north" id = "rtimg" src="data:image/png;base64,' + response.data.imageData[max - 1].imageString + ' " height="450" width="50%" >');
    //        jQuery('#ImageModel').modal('show');
    //        jQuery('#ImageDiv').html($image);


    //    }
    //    else {
    //        //jQuery('.page-loader-wrapper').hide();
    //        _General.noData(jQuery('#ImageModel'), "No Data Found");

    //    }
    //},

    //view image
    viewInvoiceImages: function (x) {
        jQuery('.page-loader-wrapper').show();
        var expense = jQuery("#ddlexpense").val();
        var invimagemageData = {
            "recordingId": expense,
            "collectionName": "HOPAYMENTFILEID"
        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/images", invimagemageData, _CfoPaymentEntry.viewInvoiceImagesLoadCompleted, userdata.token)
    },

    viewInvoiceImagesLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            var max = response.data.imageData.length;
            var $image = jQuery('<img class="north" id = "rtimg" src="data:image/png;base64,' + response.data.imageData[max - 1].imageString + ' " height="450" width="50%" >');
            jQuery('#ImageModel').modal('show');
            jQuery('#ImageDiv').html($image);


        }
        else {
            //jQuery('.page-loader-wrapper').hide();
            _General.noData(jQuery('#ImageModel'), "No Data Found");

        }
    },


}






jQuery(document).ready(function ($) {

    //_CfoPaymentEntry.ExpenseLoad();

    //Expense load
    jQuery("#billOfType").change(function (e) {
        jQuery('.page-loader-wrapper').show();
        var empven = jQuery('#billOfType').val();
        if (empven == "BILLVENDOR") {
            _CfoPaymentEntry.BillFromVendor();

            jQuery('#traDate').val('');
            jQuery('#txtamount').val('');
            jQuery('#txtamtLimit').val('');
            jQuery('#txtexceedamt').val('');
            jQuery('#remarks').val('');

            jQuery("#btnreject").hide();
            jQuery("#btnapprove").hide();
            jQuery("#btnrecommend").hide();

            jQuery("#maincard").hide();
        }
        else {
            _CfoPaymentEntry.BillFromEmployee();

            jQuery('#traDate').val('');
            jQuery('#txtamount').val('');
            jQuery('#txtamtLimit').val('');
            jQuery('#txtexceedamt').val('');
            jQuery('#remarks').val('');

            jQuery("#btnreject").hide();
            jQuery("#btnapprove").hide();
            jQuery("#btnrecommend").hide();

            jQuery("#maincard").hide();
        }
    });


    jQuery('#ddlexpense').change(function ($) {

        _CfoPaymentEntry.expensedetailsload();
    });



    jQuery('#btnrecommend').click(function ($) {

        if (jQuery('#remarks').val() == "") {
            swal("", "Please Enter Remarks", "warning");
            return false;
        }



        _CfoPaymentEntry.Recommendpayment();
    });


    jQuery('#btnapprove').click(function ($) {

        if (jQuery('#remarks').val() == "") {
            swal("", "Please Enter Remarks", "warning");
            return false;
        }

        _CfoPaymentEntry.Approvepayment();

    });


    jQuery('#btnreject').click(function ($) {

        if (jQuery('#remarks').val() == "") {
            swal("", "Please Enter Remarks", "warning");
            return false;
        }

        _CfoPaymentEntry.Rejectpayment();
    });


    //view image
    jQuery('#viewinvoice').click(function (e) {
        var prid = jQuery('#ddlexpense').val();
        if (prid != 0) {
            _CfoPaymentEntry.viewInvoiceImages(prid);
        }
        else {
            swal("Error", "Please Select a PR..!", "error");
            return false;
        }
    });

});
