

var tblData = [];
var AMOUNTtotal;
var CRtot;
var _HoPaymentEntry = {
    AccountFill: function () {
        jQuery('.page-loader-wrapper').show();


    },

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

    //    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.FillPayType, userdata.token)

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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.FillPayType, userdata.token)

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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.EmpFillPayType, userdata.token)

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


    // Sub Expense Load NEW
    expensedetailsload: function (val) {
        jQuery('.page-loader-wrapper').show();
      //  var descr = jQuery("#ddlexpensetyp").val();
        //var venempid = jQuery("#billOfType").val();
        //if (venempid == "BILLVENDOR") {
        //    venemp = 10;
        //}
        //else {
        //    venemp = 11;
        //}

        var descr = jQuery("#ddlexpensetyp").val();



        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADDEATAILS",
            "flag2": "MAINDETAILS",
            "inptvar1": descr,
            "inptvar2": userdata.userId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.expenseloadcompleted, userdata.token)

    },
    expenseloadcompleted: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data != null && response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                var val1 = response.data.queryResult[0].param1.split("~");
                var val2 = response.data.queryResult[0].param2.split("~");
                var val3 = response.data.queryResult[0].param3.split("~");

                jQuery("#payType").val(val1[0].split("^")[0]);

                jQuery("#gstin").val(val2[0]);
                jQuery("#traDate").val(val3[0]);
                jQuery("#txtamount").val(val3[1]);

                //jQuery("#partialamount").val(val3[2]);

                var partialamt = val3[2];
                if (partialamt == "") {
                    jQuery("#partiamtdiv").hide();
                } else {
                    jQuery("#partiamtdiv").show();
                    jQuery("#partialamount").val(partialamt);
                }

                jQuery("#requser").val(val1[2]);
                jQuery("#requserRemark").val(val1[1]);


                var gstvalue = val2[0];

                if (gstvalue == "NIL"){
                    jQuery("#vendorName").val("---");
                }

                jQuery("#btnapprove").show();
                jQuery("#btnreject").show();


                var amount = jQuery("#txtamount").val();
                //var gst = jQuery("#txtgst").val();
                var total = parseInt(amount) /*+ parseInt(gst);*/
                var limit = jQuery("#txtamtLimit").val();


                //if (total < limit) {
                //    jQuery("#txtexceedamt").val(0);
                //    jQuery("#btnapprove").show();
                //    jQuery("#btnrecommend").hide();
                //    jQuery("#btnreject").show();

                //}
                //else {
                //    swal("", "Exceeds the limit,Please recommend to CFO Approval!!!", "warning");
                //    var exceedamnt = parseInt(total) - parseInt(limit);
                //    jQuery("#txtexceedamt").val(exceedamnt);
                //    jQuery("#btnrecommend").show();
                //    jQuery("#btnapprove").hide();
                //    jQuery("#btnreject").show();
                //}

                _HoPaymentEntry.HoEntryData();
                //NEW
                _HoPaymentEntry.GetGST();
            }
            else {
                jQuery("#subexpense").empty();
                jQuery("#subexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
            }


            jQuery('.page-loader-wrapper').hide();
        }
    },

    GetGST: function () {
        jQuery('.page-loader-wrapper').show();
        jQuery('#gstin-error').hide();
        var val = jQuery('#gstin').val();
        if (val != "" && val.toUpperCase() != "NIL") {
            var GetGSTValue = {
                "gstin": val,
                "consent": "Y",
                "consent_text": "I hereby declare my consent agreement for verifying my data to Asirvad company",
                "firmId": "3",
                "empId": userdata.userId

            };

            _http.post(MFPUBLICKYCAPI_URL + "api/gst", GetGSTValue, _HoPaymentEntry.FillGST, userdata.token)
        }
        else {
            jQuery("#gstin").val("---");
            jQuery("#vendorName").val("---");
            //jQuery("#sgst").val(0);
            //jQuery("#cgst").val(0);
            //jQuery("#igst").val(0);
            //jQuery('.page-loader-wrapper').hide();
        }
    },

        FillGST: function (response) {
            if (response.status === "SUCCESS") {
                jQuery('.page-loader-wrapper').hide();
                if (response.data.pradr.em.length > 0) {
                    jQuery("#vendorName").val(response.data.lgnm);
                }
                else {
                    jQuery("#vendorName").val("");
                }
            }
            else {
                jQuery("#vendorName").val("");
            }
        },




    //// Sub Expense Load
    //expensedetailsload: function (val) {
    //    jQuery('.page-loader-wrapper').show();
    //    var descr = jQuery("#ddlexpensetyp").val();
    //    var Str = " ";
    //    var GetExpenseTypeData = {
    //        "flag1": "LOADDEATAILS",
    //        "flag2": "MAINDETAILS",
    //        "inptvar1": descr,
    //        "inptvar2": userdata.userId
    //    };

    //    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoPaymentEntry.expenseloadcompleted, userdata.token)

    //},
    //expenseloadcompleted: function (response) {
    //    if (response.status === "SUCCESS") {
    //        if (response.data != null && response.data.queryResult.length > 0) {
    //            //token = response.data.queryResult.token;
    //            jQuery("#traDate").empty();
    //            jQuery("#traDate").val(response.data.queryResult[0].param1);
    //            jQuery("#txtamount").empty();
    //            jQuery("#txtamount").val(response.data.queryResult[0].param2);
    //            //jQuery("#txtgst").empty();
    //           // jQuery("#txtgst").val(response.data.queryResult[0].param3);
    //            jQuery("#txtamtLimit").empty();
    //            jQuery("#txtamtLimit").val(response.data.queryResult[0].param3);

    //            var amount = jQuery("#txtamount").val();
    //            //var gst = jQuery("#txtgst").val();
    //            var total = parseInt(amount) /*+ parseInt(gst);*/
    //            var limit = jQuery("#txtamtLimit").val();
    //            if (total < limit) {
    //                jQuery("#txtexceedamt").val(0);
    //                jQuery("#btnapprove").show();
    //                jQuery("#btnrecommend").hide();
    //                jQuery("#btnreject").show();

    //            }
    //            else {
    //                swal("", "Exceeds the limit,Please recommend to CFO Approval!!!", "warning");
    //                var exceedamnt = parseInt(total) - parseInt(limit);
    //                jQuery("#txtexceedamt").val(exceedamnt);
    //                jQuery("#btnrecommend").show();
    //                jQuery("#btnapprove").hide();
    //                jQuery("#btnreject").show();
    //            }

    //            _HoPaymentEntry.HoEntryData();
    //        }
    //        else {
    //            jQuery("#subexpense").empty();
    //            jQuery("#subexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
    //        }


    //        jQuery('.page-loader-wrapper').hide();
    //    }
    //},




    //Grid View

    HoEntryData: function () {

        var expense = jQuery("#ddlexpensetyp").val();

        var RowData = {
            "flag1": "LOADSUBDESCR",
            "flag2": "SUBDESCRIPTION",
            "inptvar1": expense,
            "inptvar2": userdata.userId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", RowData, _HoPaymentEntry.HoDataTable, userdata.token)
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
                //$row.append(jQuery('<td align="center">').html('<button type="button" class="btnsmall  btn-danger fc-center" id="btnView" name="submitprint"  data-target = "#ImageModel" onclick=" _HoPaymentEntry.viewInvoiceImages();" > <i class="fa fa-eye" class="bs-tooltip remove" style="font-size:15px;"></i></button> '));
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
        _HoPaymentEntry.addamount();
        jQuery('.page-loader-wrapper').hide();
    },

    // Add the amount 

    addamount: function () {
        var total = jQuery("#txtamount").val();

        jQuery('#maincard').show();
        jQuery("#amttotal").html(total);


        jQuery('.page-loader-wrapper').hide();
    },






    HoEntryConfirm: function () {
        jQuery('.page-loader-wrapper').hide();
        jQuery("#choose").show();

        //debugger;
        if (tblData == "") {
            swal("", "Please Add Ho Direct Payment entry", "warning");
            return false;
        }


    },



    //approve button function//

    Approvepayment: function () {
        jQuery('.page-loader-wrapper').show();
        var expense = jQuery("#ddlexpensetyp").val();
        var user = userdata.userId;
        var remarks = jQuery("#txtremarks").val().toUpperCase();        

        var departmenhd = user + "@@" + expense;
        var Str = " ";
        var ApprovePaymentData = {
            "flag1": "DEPHEADPAGE",
            "flag2": "DEPHDAPPROVE",
            "inptvar1": remarks,
            "inptvar2": departmenhd
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", ApprovePaymentData, _HoPaymentEntry.Recommendpaymentcompleted, userdata.token)

    },



    //reject button function//


    Rejectpayment: function () {
        jQuery('.page-loader-wrapper').show();
        var expense = jQuery("#ddlexpensetyp").val();
        var user = userdata.userId;
        var remarks = jQuery("#txtremarks").val().toUpperCase();
        var departmenhd = user + "@@" + expense;
        var Str = " ";
        var RejectPaymentData = {
            "flag1": "DEPHEADPAGE",
            "flag2": "DEPHDREJECT",
            "inptvar1": remarks,
            "inptvar2": departmenhd
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", RejectPaymentData, _HoPaymentEntry.Recommendpaymentcompleted, userdata.token)

    },


    //Recommend button function//

    Recommendpayment: function () {
        jQuery('.page-loader-wrapper').show();
        var expense = jQuery("#ddlexpensetyp").val();
        var user = userdata.userId;
        var remarks = jQuery("#txtremarks").val();
        var departmenhd = user + "@@" + expense;
        var Str = " ";
        var RecommendPaymentData = {
            "flag1": "DEPHEADPAGE",
            "flag2": "DEPHDRECOMMEND",
            "inptvar1": remarks,
            "inptvar2": departmenhd
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", RecommendPaymentData, _HoPaymentEntry.Recommendpaymentcompleted, userdata.token)

    },

    Recommendpaymentcompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {
                if (response.data.queryResult[0].param2 == '4') {
                    swal({
                        title: "Recommend",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
                else if (response.data.queryResult[0].param2 == '2') {
                    swal({
                        title: "Reject",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });

                }
                else if (response.data.queryResult[0].param2 == '3') {
                    swal({
                        title: "Approved",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });

                   // _HoPaymentEntry.ExpenseLoad();
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

    //view image
    viewInvoiceImages: function (x) {
        jQuery('.page-loader-wrapper').show();
        var expense = jQuery("#ddlexpensetyp").val();
        var invimagemageData = {
            "recordingId": expense,
            "collectionName": "HOPAYMENTFILEID"
        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/images", invimagemageData, _HoPaymentEntry.viewInvoiceImagesLoadCompleted, userdata.token)
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

    jQuery("#choose").hide();


    //expense load function call in ready
   // _HoPaymentEntry.ExpenseLoad();

    //Expense load
    jQuery("#billOfType").change(function (e) {
        jQuery('.page-loader-wrapper').show();
        var empven = jQuery('#billOfType').val();
        if (empven == "BILLVENDOR") {
            _HoPaymentEntry.BillFromVendor();

            jQuery('#traDate').val('');
            jQuery('#txtamount').val('');
            jQuery('#txtamtLimit').val('');
            jQuery('#txtexceedamt').val('');
            jQuery('#txtremarks').val('');

            //jQuery("#vendordiv").show();
            //jQuery("#employeediv").hide();

            jQuery("#btnreject").hide();
            jQuery("#btnapprove").hide();
            jQuery("#btnrecommend").hide();

            jQuery("#maincard").hide();
           // jQuery('#hodetailsentry').hide();
            
        }
        else {
            _HoPaymentEntry.BillFromEmployee();

            jQuery('#traDate').val('');
            jQuery('#txtamount').val('');
            jQuery('#txtamtLimit').val('');
            jQuery('#txtexceedamt').val('');
            jQuery('#txtremarks').val('');

           // jQuery("#vendordiv").hide();
           // jQuery("#employeediv").show();

            jQuery("#btnreject").hide();
            jQuery("#btnapprove").hide();
            jQuery("#btnrecommend").hide();

            jQuery("#maincard").hide();
            //jQuery('#hodetailsentry').hide();
            
        }
    });



    //Save the expense
    jQuery('#hopaymentsave').click(function (e) {
        _HoPaymentEntry.HoPaymentSubmit();
    });


    jQuery('#ddlexpensetyp').change(function (e) {
        jQuery('#txtremarks').val('');




        _HoPaymentEntry.expensedetailsload();

    });

    //approve button//

    jQuery('#btnapprove').click(function () {

        if (jQuery('#txtremarks').val() == "") {
            swal("", "Please Enter Remarks", "warning");
            return false;
        }

        _HoPaymentEntry.Approvepayment();

        //reject button //
    });
    jQuery('#btnreject').click(function () {

        if (jQuery('#txtremarks').val() == "") {
            swal("", "Please Enter Remarks", "warning");
            return false;
        }

        _HoPaymentEntry.Rejectpayment();

        //Recommend button//

    });
    jQuery('#btnrecommend').click(function () {

        if (jQuery('#txtremarks').val() == "") {
            swal("", "Please Enter Remarks", "warning");
            return false;
        }

        _HoPaymentEntry.Recommendpayment();
    });


    //view image
    jQuery('#viewinvoice').click(function (e) {
        var prid = jQuery('#ddlexpensetyp').val();
        if (prid != 0) {
            _HoPaymentEntry.viewInvoiceImages(prid);
        }
        else {
            swal("Error", "Please Select a PR..!", "error");
            return false;
        }
    });


    //jQuery('#btnView').click(function () {


    //    _HoPaymentEntry.viewInvoiceImages();
    //});



});

//function ReversCon(i) {
//    tblData.splice(i, 1);
//    _HoPaymentEntry.HoDataTable(tblData);
//}