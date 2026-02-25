

var tblData = [];
var CRtot;
var _MDPaymentEntry = {


    //Expense Load
    //ExpenseLoad: function () {
    //    jQuery('.page-loader-wrapper').show();
    //    var Str = " ";
    //    var GetExpenseTypeData = {
    //        "flag1": "LOADDESCRP",
    //        "flag2": "MAINDESCR",
    //        "inptvar1": userdata.branchId,
    //        "inptvar2": userdata.userId,
    //    };

    //    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _MDPaymentEntry.FillPayType, userdata.token)

    //},
    //FillPayType: function (response) {
    //    if (response.status === "SUCCESS") {
    //        if (response.data.queryResult.length > 0) {
    //            //token = response.data.queryResult.token;
    //            jQuery("#ddlexpensetyp").empty();
    //            jQuery("#ddlexpensetyp").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
    //            jQuery.each(response.data.queryResult, function (i, val) {
    //                jQuery("#ddlexpensetyp").append(jQuery("<option></option>").val(val.param1).text(val.param2));
    //            });
    //        }
    //        else {
    //            jQuery("#ddlexpensetyp").empty();
    //            jQuery("#ddlexpensetyp").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
    //        }
    //    }
    //    else {

    //        jQuery("#ddlexpensetyp").empty();
    //        jQuery("#ddlexpensetyp").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _MDPaymentEntry.FillPayType, userdata.token)

    },
    FillPayType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#ddlexpensetyp").empty();
                jQuery("#ddlexpensetyp").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlexpensetyp").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlexpensetyp").empty();
                jQuery("#ddlexpensetyp").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
            }
        }
        else {

            jQuery("#ddlexpensetyp").empty();
            jQuery("#ddlexpensetyp").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _MDPaymentEntry.EmpFillPayType, userdata.token)

    },
    EmpFillPayType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#ddlexpensetyp").empty();
                jQuery("#ddlexpensetyp").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlexpensetyp").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlexpensetyp").empty();
                jQuery("#ddlexpensetyp").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
            }
        }
        else {

            jQuery("#ddlexpensetyp").empty();
            jQuery("#ddlexpensetyp").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },


    expensedetailsload: function (val) {
        jQuery('.page-loader-wrapper').show();
        var descr = jQuery("#ddlexpensetyp").val();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADDEATAILS",
            "flag2": "MAINDETAILS",
            "inptvar1": descr,
            "inptvar2": userdata.userId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _MDPaymentEntry.expenseloadcompleted, userdata.token)

    },
    expenseloadcompleted: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data != null && response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#btnapprove").show();
                jQuery("#btnreject").show();

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
                var total = parseInt(amount);  ///*+ parseInt(gst)*/
                var limit = jQuery("#txtamtLimit").val();
                if (total < limit) {
                    jQuery("#txtexceedamt").val(0);
                    //jQuery("#btnapprove").show();
                    //jQuery("#btnreject").show();

                }
                else {

                    var exceedamnt = parseInt(total) - parseInt(limit);
                    jQuery("#txtexceedamt").val(exceedamnt);

                }

                _MDPaymentEntry.HoEntryData();
            }
            else {
                jQuery("#subexpense").empty();
                jQuery("#subexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
            }


            jQuery('.page-loader-wrapper').hide();
        }

    },
    HoEntryData: function () {

        var expense = jQuery("#ddlexpensetyp").val();

        var RowData = {
            "flag1": "LOADSUBDESCR",
            "flag2": "SUBDESCRIPTION",
            "inptvar1": expense,
            "inptvar2": userdata.userId
        };
        //jQuery("#traDate").attr("disabled", true);
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", RowData, _MDPaymentEntry.HoDataTable, userdata.token)
    },


    // View Image

    viewInvoiceImages: function (x) {
        jQuery('.page-loader-wrapper').show();
        var expense = jQuery("#ddlexpensetyp").val();
        var invimagemageData = {
            "recordingId": expense,
            "collectionName": "HOPAYMENTFILEID"
        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/images", invimagemageData, _MDPaymentEntry.viewInvoiceImagesLoadCompleted, userdata.token)
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


    HoDataTable: function (response) {
        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {
            // if (response != null && response.length > 0) {

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
                //$row.append(jQuery('<td align="center">').html(val.GST));
                //$row.append(jQuery('<td align="center">').html(val.remarks));
               // $row.append(jQuery('<td align="center">').html('<button type="button" class="btnsmall  btn-danger fc-center" id="btnView" name="submitprint"  onclick=" _MDPaymentEntry.viewInvoiceImages();" > <i class="fa fa-eye" class="bs-tooltip remove" style="font-size:15px; "></i></button> '));
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
        _MDPaymentEntry.addamount();
        jQuery('.page-loader-wrapper').hide();
    },

    // Add the amount 

    addamount: function () {
        var total = jQuery("#txtamount").val();

        jQuery('#maincard').show();
        jQuery("#amttotal").html(total);


        jQuery('.page-loader-wrapper').hide();
    },
    Approvepayment: function () {
        jQuery('.page-loader-wrapper').show();
        var expense = jQuery("#ddlexpensetyp").val();
        var user = userdata.userId;
        var remarks = jQuery("#txtremarks").val();
        var departmenhd = user + "@@" + expense;
        var Str = " ";
        var ApprovePaymentData = {
            "flag1": "MDPAGE",
            "flag2": "MDAPPROVE",
            "inptvar1": remarks,
            "inptvar2": departmenhd
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", ApprovePaymentData, _MDPaymentEntry.Recommendpaymentcompleted, userdata.token)

    },



    //reject button function//


    Rejectpayment: function () {
        jQuery('.page-loader-wrapper').show();
        var expense = jQuery("#ddlexpensetyp").val();
        var user = userdata.userId;
        var remarks = jQuery("#txtremarks").val();
        var departmenhd = user + "@@" + expense;
        var Str = " ";
        var RejectPaymentData = {
            "flag1": "MDPAGE",
            "flag2": "MDREJECT",
            "inptvar1": remarks,
            "inptvar2": departmenhd
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", RejectPaymentData, _MDPaymentEntry.Recommendpaymentcompleted, userdata.token)

    },
    Recommendpaymentcompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {
                if (response.data.queryResult[0].param2 == '20') {
                    swal({
                        title: "Reject",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });

                }
                else if (response.data.queryResult[0].param2 == '21') {
                    swal({
                        title: "Approve",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });

                    //_MDPaymentEntry.ExpenseLoad();
                }

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
    //    var expense = jQuery("#ddlexpensetyp").val();
    //    var invimagemageData = {
    //        "recordingId": expense,
    //        "collectionName": "HOPAYMENTFILEID"
    //    }
    //    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/images", invimagemageData, _MDPaymentEntry.viewInvoiceImagesLoadCompleted, userdata.token)
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
    //}
}





jQuery(document).ready(function ($) {


   // _MDPaymentEntry.ExpenseLoad();

    //Expense load
    jQuery("#billOfType").change(function (e) {
        jQuery('.page-loader-wrapper').show();
        var empven = jQuery('#billOfType').val();
        if (empven == "BILLVENDOR") {
            _MDPaymentEntry.BillFromVendor();

            jQuery('#traDate').val('');
            jQuery('#txtamount').val('');
            jQuery('#txtamtLimit').val('');
            jQuery('#txtexceedamt').val('');
            jQuery('#txtremarks').val('');

            jQuery("#btnreject").hide();
            jQuery("#btnapprove").hide();

            jQuery("#maincard").hide();

        }
        else {
            _MDPaymentEntry.BillFromEmployee();

            jQuery('#traDate').val('');
            jQuery('#txtamount').val('');
            jQuery('#txtamtLimit').val('');
            jQuery('#txtexceedamt').val('');
            jQuery('#txtremarks').val('');

            jQuery("#btnreject").hide();
            jQuery("#btnapprove").hide();

            jQuery("#maincard").hide();

            
        }
    });

    //sub expense load in main expense onchange
    jQuery('#ddlexpensetyp').change(function () {
        jQuery('#txtremarks').val('');
        _MDPaymentEntry.expensedetailsload();
    });

    jQuery('#btnapprove').click(function () {


        if (jQuery('#ddlexpensetyp').val() == "0") {
            swal("", "Please Choose Payment Type", "warning");
            return false;
        }


        else if (jQuery('#txtremarks').val() == "") {
            swal("", "Please Enter Remarks", "warning");
            return false;
        }
        else {

            _MDPaymentEntry.Approvepayment();
        }
        //reject button //
    });
    jQuery('#btnreject').click(function () {
        if (jQuery('#ddlexpensetyp').val() == "0") {
            swal("", "Please Choose Payment Type", "warning");
            return false;
        }


        else if (jQuery('#txtremarks').val() == "") {
            swal("", "Please Enter Remarks", "warning");
            return false;
        }
        else {
            _MDPaymentEntry.Rejectpayment();
        }
        //Recommend button//

    });

    //view image
    jQuery('#viewinvoice').click(function (e) {
        var prid = jQuery('#ddlexpensetyp').val();
        if (prid != 0) {
            _MDPaymentEntry.viewInvoiceImages(prid);
        }
        else {
            swal("Error", "Please Select a PR..!", "error");
            return false;
        }
    });




});

