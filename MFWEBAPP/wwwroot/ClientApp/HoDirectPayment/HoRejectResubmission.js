var total = 0;
var amount = 0;
var mop;

var _HoRejectResubmission = {



    //Expense load//

    ExpenseTypeLoad: function (st) {
        jQuery('.page-loader-wrapper').show();
        var Str = "";
        var GetExpenseTypeData = {
            "flag1": "REJECTRECOMMEND",
            "flag2": "LOADEXPENCETYPE",
            "inptvar1": userdata.userId,
            "inptvar2": st

        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoRejectResubmission.FillExpenseType, userdata.token)

    },
    FillExpenseType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#ddlexpensetyp").empty();
                jQuery("#ddlexpensetyp").append(jQuery("<option></option>").val("0").text(" ------CHOOSE EXPENSE TYPE------ "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlexpensetyp").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlexpensetyp").empty();
                jQuery("#ddlexpensetyp").append(jQuery("<option></option>").val("0").text(" ------CHOOSE EXPENSE TYPE------ "));
            }
        }
        else {

            jQuery("#ddlexpensetyp").empty();
            jQuery("#ddlexpensetyp").append(jQuery("<option></option>").val("0").text(" ------CHOOSE EXPENSE TYPE------ "));
        }
        jQuery('.page-loader-wrapper').hide();

    },



    Expenseremarks: function () {
        jQuery('.page-loader-wrapper').show();
        var expense = jQuery("#ddlexpensetyp").val();
        var Str = " ";
        var GetremarksTypeData = {
            "flag1": "REJECTRECOMMEND",
            "flag2": "LOADREMARKS",
            "inptvar1": expense

        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetremarksTypeData, _HoRejectResubmission.RemarksloadFill, userdata.token)

    },


    RemarksloadFill: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //jQuery('.page-loader-wrapper').hide();
                //if (response.data.queryResult[0].param3 == '2') {
                //    jQuery('#cforemark').hide();
                //    jQuery('#mdremark').hide();
                //    jQuery('#Depheadremark').show();
                //    jQuery("#txtdepHead").val(response.data.queryResult[0].param2);
                //}
                //else if (response.data.queryResult[0].param3 == '10') {
                //    jQuery('#mdremark').hide();
                //    jQuery('#Depheadremark').hide();
                //    jQuery('#cforemark').show();
                //    jQuery("#txtcforemark").val(response.data.queryResult[0].param2);
                //}
                //else if (response.data.queryResult[0].param3 == '20') {
                //    jQuery('#cforemark').hide();
                //    jQuery('#Depheadremark').hide();
                //    jQuery('#mdremark').show();
                //    jQuery("#txtmdremarks").val(response.data.queryResult[0].param2);
                //}
                jQuery("#txtreason").val(response.data.queryResult[0].param2)
            }
            else {
                swal("No data Found ....!!", "", "warning");
            }
        }
        else {
            swal("Error found...!!!", "", "warning");
        }
    },

    tableload: function () {

        var expense = jQuery("#ddlexpensetyp").val();

        var RowData = {
            "flag1": "REJECTRECOMMEND",
            "flag2": "LOADDETAILS",
            "inptvar1": expense,
            "inptvar2": userdata.userId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", RowData, _HoRejectResubmission.HoDataTable, userdata.token)
    },


    HoDataTable: function (response) {
       // debugger
        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {


            jQuery('#HoRejectResubmission').empty();
            var $table = jQuery('<table class="table" id="horeconciliation">');
            $table.append('< thead >  <th style="text-align:center;">SL NO</th><th style="text-align:center;"> SUB EXPENSE ID</th><th style="text-align:center;"> SUB EXPENSE</th><th style="text-align:center;">AMOUNT</th><th style="text-align:center;">GST</th><th style="text-align:center;">TDS</th><<th style="text-align:center;">DELETE </th><th style="text-align:center;">EDIT</th></thead >');
            var $tbody = jQuery('<tbody>');
            jQuery("#amttotal").html(0);
            jQuery.each(response.data.queryResult, function (i, val) {

                var $row = jQuery('<tr/>');
                var data1 = val.param4.split("~");
                var data2 = val.param2.split("~");
                amount = data1[0];
                mop = data2[1];
                $row.append(jQuery('<td align="center">').html(i + 1));
                $row.append(jQuery('<td align="center">').html(val.param1));
                $row.append(jQuery('<td align="center">').html(data2[0]));
                $row.append(jQuery('<td align="center">').html(val.param3));
                $row.append(jQuery('<td align="center">').html(data1[0]));
                $row.append(jQuery('<td align="center">').html(data1[1]));
                //$row.append(jQuery('<td align="center">').html('<button type="button" class="btnsmall  btn-danger fc-center" id="btnView" name="submitprint"  data-target = "#ImageModel" onclick=" _HoRejectResubmission.viewInvoiceImages();" > <i class="fa fa-eye" class="bs-tooltip remove" style="font-size:15px;"></i></button> '));
                $row.append(jQuery('<td align="center">').html('<button type="button" class="btnsmall  btn-danger fc-center" id="btbdelete" name="submitprint"  onclick="_HoRejectResubmission.deleteTypes(\'' + val.param1 + '\');"> <i class="fa fa-trash" class="bs-tooltip remove" style="font-size:15px;"></i></button> '));
                $row.append(jQuery('<td align="center">').html('<button type="button" class="btnsmall  btn-danger fc-center" id="btnedit" name="submitprint"  onclick="_HoRejectResubmission.editchanges( \'' + val.param1 + '\', \'' + val.param3 + '\', \'' + mop + '\', \'' + amount + '\'); "> <i class="fa fa-pencil" class="bs-tooltip remove" style="font-size:15px;"></i></button> '));
                $tbody.append($row);
                total = parseInt(total) + parseInt(response.data.queryResult[i].param3);
            });

            $tbody.append('</tbody>');
            $table.append($tbody);
            jQuery('#maincard').show();
            jQuery("#amttotal").html(total);


            $table.append('</table>');
            jQuery('#hodetailsentry').html($table);

            jQuery('#ClickmeBtnConfirm').show();
            jQuery('#dvremarks').show();
            jQuery('#dvreason').show();
            _HoRejectResubmission.Expenseremarks();

        }
        else {
            jQuery('#maincard').hide();
            jQuery('#hodetailsentry').empty();



        }

        // _HoRejectResubmission.addamount();
        jQuery('.page-loader-wrapper').hide();
    },


    viewInvoiceImages: function (x) {
        jQuery('.page-loader-wrapper').show();
        var expense = jQuery("#ddlexpensetyp").val();
        var invimagemageData = {
            "recordingId": expense,
            "collectionName": "HOPAYMENTFILEID"
        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/images", invimagemageData, _HoRejectResubmission.viewInvoiceImagesLoadCompleted, userdata.token)
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

    //delete  function//


    deleteTypes: function (param1) {
        jQuery('.page-loader-wrapper').show();
        var expense = jQuery("#ddlexpensetyp").val();
        var Str = " ";
        var GetdeleteTypeData = {
            "flag1": "REJECTRECOMMEND",
            "flag2": "DELETESUBEXPENSE",
            "inptvar1": expense,
            "inptvar2": param1

        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetdeleteTypeData, _HoRejectResubmission.DeleteloadFill, userdata.token)

    },


    DeleteloadFill: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {

                if (response.data.queryResult[0].param2 == '0') {
                    swal({
                        title: "Delete",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    });
                    _HoRejectResubmission.tableload();
                }
            }
            else {
                jQuery('.page-loader-wrapper').hide();
                swal("Error  Found...!!!", "", "warning")
            }
        }
        else {
            jQuery('.page-loader-wrapper').hide();
            swal("Error Found...!!!", "", "warning")
        }
    },

    //edit changes//

    editchanges: function (param1, param3, mop, amount) {
        jQuery('.page-loader-wrapper').hide();

        jQuery('#addclear').show();
        

        jQuery('#divrejectreason').show();
        jQuery('#dvtds').show();
        jQuery('#dvbtnadd').show();
        jQuery('#txtsubexpense').val(param1);
        jQuery('#txtamt').val(param3);
        jQuery('#txtgst').val(amount);
        jQuery('#txtparam2').val(mop);


        //new modification
        _HoRejectResubmission.HoDataTable(tblData);
    },







    editsubexpense: function () {
        var amount = jQuery('#txtamt').val();
        var gst = jQuery('#txtgst').val();
        var billdt = jQuery('#billDate').val();
        var payid = jQuery('#ddlexpensetyp').val();
        var subid = jQuery('#txtsubexpense').val();
        var input1 = amount + "!!" + gst + "!!" + billdt;
        var input2 = payid + "@@" + subid;
        var updatesubexpense = {

            "flag1": "REJECTRECOMMEND",
            "flag2": "ADDSUBEXPENSE",
            "inptvar1": input1,
            "inptvar2": input2
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", updatesubexpense, _HoRejectResubmission.Editsubexpensecompleted, userdata.token)
    },

    Editsubexpensecompleted: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {
                if (response.data.queryResult[0].param2 == '6') {
                    swal({
                        title: "Update",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    });
                    _HoRejectResubmission.tableload();
                }
                else {
                    jQuery('.page-loader-wrapper').hide();
                    swal("Error  Found...!!!", "", "warning")
                }
            }
        }
        else {
            jQuery('.page-loader-wrapper').hide();
            swal("Error Found...!!!", "", "warning")
        }
    },
    GstperLoad: function () {
        //jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "GSTPERLOAD",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoRejectResubmission.GstpercentageType, userdata.token)

    },
    GstpercentageType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#gstper").empty();
                jQuery("#gstper").append(jQuery("<option></option>").val("0").text(" --------CHOOSE GST PERCENTAGE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#gstper").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#gstper").empty();
                jQuery("#gstper").append(jQuery("<option></option>").val("0").text(" --------CHOOSE GST PERCENTAGE-------- "));
            }
        }
        else {

            jQuery("#gstper").empty();
            jQuery("#gstper").append(jQuery("<option></option>").val("0").text(" --------CHOOSE GST PERCENTAGE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },
    GetGstPercentage: function () {

        var gstamounttotal = parseFloat(jQuery('#gstper').val());   //modified gst included amount 
        var percentage = 100;
        var amount = parseFloat(jQuery('#txtamt').val()); // assuming 'amount' is a valid input field ID
        var gstpertotalx = (amount * (gstamounttotal / percentage));
        //var gstpertotalx = (amount + x);
        // jQuery('#gstamount').html(gstpertotalx);

        jQuery('#txtgst').val(gstpertotalx);
    },

    TdsMasterLoad: function () {
        //jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "TDSMASTERLOAD",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoRejectResubmission.TdsMasterType, userdata.token)

    },
    TdsMasterType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#tdsmaster").empty();
                jQuery("#tdsmaster").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#tdsmaster").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#tdsmaster").empty();
                jQuery("#tdsmaster").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS-------- "));
            }
        }
        else {

            jQuery("#tdsmaster").empty();
            jQuery("#tdsmaster").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },


    TdsPerLoad: function () {
        //jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "TDSPERLOAD",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoRejectResubmission.TdsPercentageType, userdata.token)

    },
    TdsPercentageType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#tdsper").empty();
                jQuery("#tdsper").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS PERCENTAGE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#tdsper").append(jQuery("<option></option>").val(val.param2).text(val.param2));
                });
            }
            else {
                jQuery("#tdsper").empty();
                jQuery("#tdsper").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS PERCENTAGE-------- "));
            }
        }
        else {

            jQuery("#tdsper").empty();
            jQuery("#tdsper").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS PERCENTAGE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },

    GetTdsPercentage: function () {


        var tdsamounttotal = parseFloat(jQuery('#tdsper').val());   //modified tds excluded amount
        var percentage = 100;
        var amount = parseFloat(jQuery('#txtamt').val()); // assuming 'amount' is a valid input field ID
        var tdspertotalx = (amount * (tdsamounttotal / percentage));
        //var gstpertotalx = (amount + x);
        // jQuery('#gstamount').html(gstpertotalx);

        jQuery('#tdsamount').val(tdspertotalx);

    },
    addamount: function () {
        var AMOUNTtotal = 0;
        var ttlamount = jQuery('#txtamt').val();
        var gst = jQuery('#txtgst').val();
        var tds = jQuery('#tdsamount').val();

        if (jQuery('#txtparam2').val() == 'C') {
            AMOUNTtotal = (parseFloat(AMOUNTtotal) - parseFloat(ttlamount) + parseFloat(gst) - parseFloat(tds));
            jQuery("#txtamt").html(AMOUNTtotal);

        }

        if (jQuery('#txtparam2').val() == "D") {
            AMOUNTtotal = (parseFloat(AMOUNTtotal) + parseFloat(ttlamount) + parseFloat(gst) - parseFloat(tds));
            jQuery("#txtamt").val(AMOUNTtotal);
        }
    },

    Submitrequest: function () {
        var amount = jQuery('#txtamt').val();
        var gsttype = jQuery('#gstOfType').val();
        var gstpersentage = jQuery('#gstper').val();
        var gst = jQuery('#txtgst').val();
        var tdltype = jQuery('#tdsmaster').val();
        var tdspersentage = jQuery('#gstper').val();
        var tdsamount = jQuery('#tdsamount').val();
        var remarks = jQuery('#txtremarks').val();
        var payid = jQuery('#ddlexpensetyp').val();
        var subid = jQuery('#txtsubexpense').val();
        var input1 = amount + "!!" + gsttype + "!!" + gstpersentage + "!!" + gst + "!!" + remarks;
        var input2 = payid + "@@" + subid + "@@" + tdltype + "@@" + tdspersentage + "@@" + tdsamount;
        var updatesubexpense = {

            "flag1": "REJECTRECOMMEND",
            "flag2": "ADDSUBEXPENSE",
            "inptvar1": input1,
            "inptvar2": input2
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", updatesubexpense, _HoRejectResubmission.Submitrequestcompleted, userdata.token)
    },
    Submitrequestcompleted: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {
                if (response.data.queryResult[0].param2 == '6') {
                    swal({
                        title: "Update",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                    _HoRejectResubmission.ExpenseTypeLoad();
                }
                else {
                    jQuery('.page-loader-wrapper').hide();
                    swal("Error  Found...!!!", "", "warning")
                }
            }
        }
        else {
            jQuery('.page-loader-wrapper').hide();
            swal("Error Found...!!!", "", "warning")
        }
    },



}




jQuery(document).ready(function ($) {
    jQuery("#subexpense").hide();

    jQuery('#billDate').datepicker({

        autoclose: true,
        format: "dd/M/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        // startDate: '+0d',
        minDate: new Date(),
        endDate: new Date(),
        container: '#bs_datepicker_container1',
    });


    jQuery('#ddlrejby').change(function (e) {
        var st = jQuery('#ddlrejby').val();
        _HoRejectResubmission.ExpenseTypeLoad(st);

    });

    jQuery('#ddlexpensetyp').change(function (e) {


        // _HoRejectResubmission.Expenseremarks();
        _HoRejectResubmission.tableload();

    });
    jQuery('#gstOfType').change(function (e) {


        // _HoRejectResubmission.Expenseremarks();
        _HoRejectResubmission.GstperLoad();

    });
    jQuery('#gstper').change(function (e) {


        // _HoRejectResubmission.Expenseremarks();
        _HoRejectResubmission.GetGstPercentage();

    });
    jQuery('#tdsper').change(function (e) {


        // _HoRejectResubmission.Expenseremarks();
        _HoRejectResubmission.GetTdsPercentage();
        _HoRejectResubmission.addamount();
    });

    jQuery('#btnadd').click(function (e) {

        _HoRejectResubmission.editsubexpense();

    });
    jQuery('#ClickmeBtnConfirm').click(function (e) {

        _HoRejectResubmission.Submitrequest();

    });
    jQuery('input:radio[name="tdsyes"]').click(function (e) {
        var val = jQuery('input:radio[name="tdsyes"]:checked').val();
        if (val != "0") {
            jQuery('#tdspercentage').show();
            jQuery('#tdstotamount').show();
            jQuery('#tdsmasterdiv').show();
            _HoRejectResubmission.TdsMasterLoad();
            _HoRejectResubmission.TdsPerLoad();
        }
        else {
            jQuery('#tdspercentage').hide();
            jQuery('#tdstotamount').hide();
            jQuery('#tdsmasterdiv').hide();

        }
    });


});
