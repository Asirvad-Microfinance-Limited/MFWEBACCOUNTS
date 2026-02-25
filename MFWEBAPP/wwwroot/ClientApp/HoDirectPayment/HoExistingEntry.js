var tblData = [];
var grossamount;


var _HoExistingEntry = {
    AccountFill: function () {
        jQuery('.page-loader-wrapper').show();


    },

    //EXisting Entry Load
    ExpenseLoad: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXISTING",
            "flag2": "OLDENTRY",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoExistingEntry.FillPayType, userdata.token)

    },
    FillPayType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#existingentry").empty();
                jQuery("#existingentry").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#existingentry").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#existingentry").empty();
                jQuery("#existingentry").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
            }
        }
        else {

            jQuery("#existingentry").empty();
            jQuery("#existingentry").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },

    //Existing Description Load

    ExistingDetailsLoad: function (val) {
        jQuery('.page-loader-wrapper').show();
        var descr = jQuery("#existingentry").val();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXISTING",
            "flag2": "OLDDESLOAD",
            "inptvar1": descr,
            "inptvar2": userdata.userId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _HoExistingEntry.expenseloadcompleted, userdata.token)

    },
    expenseloadcompleted: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data != null && response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#traDate").empty();
                jQuery("#traDate").val(response.data.queryResult[0].param1);
                jQuery("#txtamount").empty();
                jQuery("#txtamount").val(response.data.queryResult[0].param2);
                jQuery("#txtexpense").empty();
                jQuery("#txtexpense").val(response.data.queryResult[0].param3);
                jQuery("#paidamt").empty();
                jQuery("#paidamt").val(response.data.queryResult[0].param4);

                hoPayId = response.data.queryResult[0].param5;

                 //Amount to be paid or minus amount
                var totalamount = parseFloat(jQuery('#txtamount').val());
                var paidamount = parseFloat(jQuery('#paidamt').val());
                var amount = (totalamount - paidamount)
                jQuery('#minusamount').val(amount);

               // var gst = jQuery("#txtexpense").val();
               // var total = parseInt(amount) + parseInt(gst);
              //  var limit = jQuery("#txtamtLimit").val();
                //if (total < limit) {
                //    jQuery("#txtexceedamt").val(0);


                //}
                //else {

                //    var exceedamnt = parseInt(total) - parseInt(limit);
                //    jQuery("#txtexceedamt").val(exceedamnt);

                //}

                _HoExistingEntry.HoEntryData();
            }
            //else {
            //    jQuery("#subexpense").empty();
            //    jQuery("#subexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
            //}


            jQuery('.page-loader-wrapper').hide();
        }

    },

    HoEntryData: function () {

        var expense = jQuery("#existingentry").val();

        var RowData = {
            "flag1": "LOADEXISTING",
            "flag2": "GRIDLOAD",
            "inptvar1": expense,
            "inptvar2": userdata.userId
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", RowData, _HoExistingEntry.HoDataTable, userdata.token)
    },


    HoDataTable: function (response) {
        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {
            // if (response != null && response.length > 0) {

            jQuery('#hodetailsentry').empty();
            var $table = jQuery('<table class="table" id="horeconciliation">');
            $table.append('< thead >  <th style="text-align:center;">SL NO</th><th style="text-align:center;"> SUB EXPENSE</th><th style="text-align:center;">AMOUNT</th><th style="text-align:center;">GST</th><th style="text-align:center;">TDS</th></thead >'); //<th style="text-align:center;">VIEW </th>
            var $tbody = jQuery('<tbody>');
           // jQuery("#amttotal").html(0);
            jQuery.each(response.data.queryResult, function (i, val) {
                var $row = jQuery('<tr/>');
                $row.append(jQuery('<td align="center">').html(i + 1));
                $row.append(jQuery('<td align="center">').html(val.param2));
                $row.append(jQuery('<td align="center">').html(val.param3));
                $row.append(jQuery('<td align="center">').html(val.param4));
                $row.append(jQuery('<td align="center">').html(val.param5));
                //$row.append(jQuery('<td align="center">').html(val.GST));
                //$row.append(jQuery('<td align="center">').html(val.remarks));
               // $row.append(jQuery('<td align="center">').html('<button type="button" class="btnsmall  btn-danger fc-center" id="btnView" name="submitprint"  onclick=" _HoExistingEntry.viewInvoiceImages();" > <i class="fa fa-eye" class="bs-tooltip remove" style="font-size:15px; "></i></button> '));  //view bill
                $tbody.append($row);

            });
            $tbody.append('</tbody>');
            $table.append($tbody);
            jQuery('#maincard').show();
            //jQuery("#amttotal").html(0);


            $table.append('</table>');
            jQuery('#hodetailsentry').html($table);

        }
        else {
            jQuery('#maincard').hide();
            jQuery('#hodetailsentry').empty();
        }
      //  _HoExistingEntry.addamount();
        jQuery('.page-loader-wrapper').hide();
    },


    //  Camera

    takeSnapShot: function () {
        jQuery('#camsection').show();
        Webcam.set({
            width: 400,
            height: 310,
            image_format: 'jpeg',
            jpeg_quality: 100
        });
        Webcam.attach('#camera');
    },
    takeInvoice: function () {
        Webcam.snap(function (k) {

            var $image = jQuery('<img id="rtimg" src="' + k + '" height="310" width="80%" />');
            jQuery('#viewUploadedImages').html($image);
            jQuery('#viewUploadedImages').show();

            Strbase64 = k.toString().replace('data:image/jpeg;base64,', '');

            if (jQuery('#viewUploadedImages').val() == null) {
                swal("", "Add URL or PDF File..!", "warning");
                return false;
            }
        });

    },


    // Camera Convert

    convertToBase64: function (img) {
        Strbase64 = "";
        DFILETYPE = "";
        //var a = "travelFile";
        var a = img;
        //Read File
        var selectedFile = document.getElementById(a).files;
        //Check File is not Empty
        if (selectedFile.length > 0) {
            //Size checking //
            var sizeInKB = selectedFile[0].size / 1024;
            var sizeLimit = 200;
            //if (sizeInKB >= sizeLimit) {
            //    swal("", "Max file size allowed is 200KB", "warning");
            //    selectedFile = "";
            //    return false;
            //}
            // TEST BLOB TO BASE 64 //

            //var reader = new FileReader();
            //reader.readAsDataURL(blob);
            //reader.onloadend = function () {
            //    var base64String = reader.result;
            //   // console.log('Base64 String - ', base64String);

            //TEST BLOB TO BASE 64 //

            // Select the very first file from list
            var fileToLoad = selectedFile[0];
            // FileReader function for read the file.
            var fileReader = new FileReader();
            var base64;
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
            // Onload of file read the file content
            fileReader.onloadend = function (fileLoadedEvent) {
                base64 = fileLoadedEvent.target.result;
                if (base64.toString().includes("data:application/pdf;base64")) {
                    DFILETYPE = "PDF";
                    swal("", "Please only upload Images..!", "warning");
                    jQuery('#payfile').val("");
                    jQuery('#tick').hide();
                    jQuery('#close').show();
                    return false;

                }
                else {
                    DFILETYPE = "IMG";
                }
                if ((base64.toString().includes("data:image/jpeg;base64")) || (base64.toString().includes("data:image/img;base64")) || (base64.toString().includes("data:image/jpg;base64")) || (base64.toString().includes("data:image/png;base64"))) {
                    DFILETYPE = "IMG";
                }
                else {
                    swal("", "Please only upload Images..!", "warning");
                    jQuery('#payfile').val("");
                    jQuery('#tick').hide();
                    jQuery('#close').show();

                    return false;
                }

                Strbase64 = base64.toString().replace('data:application/pdf;base64,', '').replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');

            };
            if (Strbase64 != null) {
                jQuery('#tick').show();
                jQuery('#close').hide();
            }
        }
        else {

            swal("", "Add Image..!", "warning");
            return false;
        }
    },


    // Gross Amount Calculate
    GrossAmountLoad: function () {

        //var partialamount = 0;
        //var fullamount = 0;

        var paidamount = parseFloat(jQuery('#paidamt').val());
        var paidpartialamount = parseFloat(jQuery('#epartialamount').val());
        var paidfullamount = parseFloat(jQuery('#efullamount').val());

        var GrossAmountFind = jQuery('input:radio[name="eamountfull"]:checked').val();
        if (GrossAmountFind == "0") {
            grossAmount = (parseFloat(paidamount) + parseFloat(paidfullamount));
        }
        else {
            grossAmount = (parseFloat(paidamount) + parseFloat(paidpartialamount));
        }


        //var gstamounttotal = parseFloat(jQuery('#gstper').val());   //modified gst included amount 
        //var percentage = 100;
        //var amount = parseFloat(jQuery('#amount').val()); // assuming 'amount' is a valid input field ID
        //var gstpertotalx = (amount * (gstamounttotal / percentage));
        ////var gstpertotalx = (amount + x);
        //// jQuery('#gstamount').html(gstpertotalx);

        //jQuery('#gstamount').val(gstpertotalx);
    },



      // Save Expense Function

    HoPaymentSubmit: function () {

        _HoExistingEntry.GrossAmountLoad();
       // var grossAmount = jQuery('#txtamount').val();
        var remarks = jQuery('#eremarks').val().toUpperCase();
        var billno = jQuery('#ebillno').val();
        var billDt = jQuery('#etraDate').val();

        var fullamount = parseFloat(jQuery('#efullamount').val());


       // var fullamount = jQuery('#efullamount').val();
        //var partialAmount = jQuery('#epartialamount').val();

        var partialAmountFind = jQuery('#epartialamount').val();
        if (partialAmountFind == "") {
            partialAmount = fullamount;  // case of full amount selecting geting partial amount in column 
        }
        else {
            partialAmount = partialAmountFind;

        }

        var amountTypeFind = jQuery('input:radio[name="eamountfull"]:checked').val();
        var amountType = amountTypeFind;

        var hoPayId = jQuery('#existingentry').val();


        //Validation Checking

        if (jQuery('#etraDate').val() == "") {
            swal("", "Please Select The Date", "warning");
            return false;
        }
        else if (jQuery('#ebillno').val() == "") {
            swal("", "Please Enter Bill No", "warning");
            return false;
        }
        else if (jQuery('#eremarks').val() == "") {
            swal("", "Please Enter Remarks", "warning");
            return false;
        }
        else if (isNaN(partialAmount) ) {
            swal("", "Please Select Amount Type", "warning");
            return false;
        }
        //else if (Strbase64 == null || Strbase64 == "") {
        //    swal("", "Please capture the Bill..!", "error");
        //    return false;
        //}


       //if (tblData == "") {
       //     swal("", "Please Add HO Payment Entry", "warning");
       //     return false;
       // }



        //var GrossAmountFind = jQuery('#epartialamount').val();
        //if (partialAmountFind == "") {
        //    grossAmount = '0';
        //}
        //else {
        //    partialAmount = partialAmountFind;

        //}
        //var typeId = amountType;




        //var grossAmount = jQuery('#amttotal').html();
        //var remarks = jQuery('#remarks').val();
        //var vendor = jQuery('#vendor').val();
       // var gstin = jQuery('#gstin').val();
        //var billDt = jQuery('#traDate').val();
        //var billno = jQuery('#billno').val();
        //var serviceTax = jQuery('#txtgst').val();
        //var expenseTypeId = jQuery('#expense').val();
        //modification 2
        //var partialAmountFind = jQuery('#partialamount').val();
        //if (partialAmountFind == "") {
        //    partialAmount = '0';
        //}
        //else {
        //    partialAmount = partialAmountFind;

        //}

        //var amountTypeFind = jQuery('input:radio[name="amountfull"]:checked').val();
        //var amountType = amountTypeFind;
        //var typeId = amountType;

        //if (typeIdFind == "0") {
        //    typeId = '2';
        //}
        //else {
        //    typeId = typeIdFind ;

        //}

        // var vendorpayment = jQuery('#vendor :selected').val();

        //var branchId = userdata.branchId;
        //var userId = userdata.userId;
        //var credit = jQuery('#crtotal').html();
        //var debit = jQuery('#drtotal').html();

        //if (tblData == "") {
        //    swal("", "Please Add HO Payment Entry", "warning");
        //    return false;
        //}

        //else if (jQuery('#vendor').val() == "0") {
        //    swal("", "Please choose vendor", "warning");
        //    return false;
        //}
        //else if (jQuery('#remarks').val() == "") {
        //    swal("", "Please Enter Remarks", "warning");
        //    return false;
        //}
        //else if (Strbase64 == null || Strbase64 == "") {
        //    swal("", "Please capture the Bill..!", "error");
        //    return false;
        //}
        //else if (serviceTax == 0) {
        //    swal("", "Please Add GST", "warning");   //service tax
        //    return false;
        //}
        jQuery('.page-loader-wrapper').show();

        var GetPayTypeData = {
            "branchId": userdata.branchId,
            "firmId": 3,
            "userID": userdata.userId,
           // "gstNo": gstin,
            "fileType": "img",
            "grossAmount": grossAmount,
          //  "vendor": vendor,
            "remarks": remarks,
            "invoiceFile": Strbase64,
            "billDt": billDt,
            "billno": billno,
            //"serviceTax": serviceTax,
            "partialAmount": partialAmount,
            "amountType": amountType,
            "typeId": 2,
            "hoPayId": hoPayId,
           // "expenseTypeId": expenseTypeId,
          //  "entryDetails": tblData,



        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseatBranch", GetPayTypeData, _HoExistingEntry.SubmitReturn, userdata.token)

    },

    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            var msg = jQuery.trim(response.data.message);
            if (response.data.errStatus = "1") {
                swal({
                    title: msg,
                    text: "",
                    type: "success"
                }, function () {
                    window.location.reload(true);
                });
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

    },









}

jQuery(document).ready(function ($) {
    _HoExistingEntry.ExpenseLoad();

    jQuery('#existingentry').change(function () {
        _HoExistingEntry.ExistingDetailsLoad();
        jQuery('#existingentryload').show();
        jQuery('#eremarksdiv').show();


    });


    // date

    jQuery('#etraDate').datepicker({

        autoclose: true,
        format: "dd/M/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        // startDate: '+0d',
        minDate: new Date(),
        endDate: new Date(),
        container: '#ebs_datepicker_container1',
    });



    // AMOUNT Type Full or Partial

    jQuery('input:radio[name="eamountfull"]').click(function (e) {
        var val = jQuery('input:radio[name="eamountfull"]:checked').val();
        if (val != "0") {
            jQuery('#epartialamountdiv').show();
            jQuery('#efullamountdiv').hide();

        }
        else {
            jQuery('#epartialamountdiv').hide();
            jQuery('#efullamountdiv').show();
            var closeamount = jQuery('#minusamount').val();
            jQuery('#efullamount').val(closeamount);
            
        }
    });

    //Save the expense
    jQuery('#ehopaymentsave').click(function (e) {
        _HoExistingEntry.HoPaymentSubmit();
    });



    //camera

    jQuery('#billupd').click(function (e) {

        jQuery('#camera').show();
        jQuery('#camsection').show();
        jQuery('#closeCam').show();
        jQuery('#payFile').hide();
        _HoExistingEntry.takeSnapShot();
    });

    jQuery('#ClickmeBtn').click(function (e) {
        _HoExistingEntry.takeInvoice();
        jQuery('#payfile').hide();
    });

    jQuery('#ClickmeBtnSave').click(function (e) {
        jQuery('#camera').hide();
        jQuery('#camsection').hide();
        jQuery('#closeCam').hide();
        jQuery('#viewUploadedImages').hide();
        /*jQuery('#payfile').hide();*/
        if (Strbase64 != null) {
            jQuery('#tick').show();
            jQuery('#close').hide();
        }
        Webcam.reset();
    });

    jQuery('#payfile').change(function (e) {
        var file = "payfile";
        jQuery('#billupd').hide();
        _HoExistingEntry.convertToBase64(file);
    });


});


function ReversCon(i) {
    tblData.splice(i, 1);
    _HoExistingEntry.HoDataTable(tblData);
}

var spanCam = document.getElementsByClassName("close")[0];
spanCam.onclick = function () {
    jQuery('#camera').hide();
    jQuery('#camsection').hide();
    jQuery('#closeCam').hide();
    jQuery('#viewUploadedImages').hide();
    if (Strbase64 != null) {
        jQuery('#tick').show();
        jQuery('#close').hide();
    }

    Webcam.reset();
}