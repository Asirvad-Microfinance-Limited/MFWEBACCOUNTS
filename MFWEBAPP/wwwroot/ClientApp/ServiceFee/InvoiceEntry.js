var _InvoiceEntry = {

    VendorLoad: function () {
        jQuery('.page-loader-wrapper').show();
        var Vendor = {
            "Flag1": "INVOICEPAGE",
            "Flag2": "INVOICEACCOUNTLOAD"

        };

        Vendor = JSON.stringify(Vendor);
        Vendor = { "encryptedRqstStr": EncryptAPIReq(Vendor) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", Vendor, _InvoiceEntry.VendorFill, userdata.token)

    },

    VendorFill: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
         jQuery("#year").val('');
            if (response.data.queryResult.length > 0) {
                jQuery("#ddlVendor").empty();
                jQuery("#ddlVendor").append(jQuery("<option></option>").val("0").text(" ------------ Choose Vendor  ------------"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlVendor").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }

            else {
                jQuery("#ddlVendor").empty();
                jQuery("#ddlVendor").append(jQuery("<option></option>").val("0").text(" ------------ Select Vendor  ------------"));
            }

        }
        //else if (response.status === "AUTHERROR") {
        //    window.location.href = DOMAIN_URL + "?Id=1";
        //}
        else {

            jQuery("#ddlVendor").empty();
            jQuery("#ddlVendor").append(jQuery("<option></option>").val("0").text(" ------------ Select Vendor  ------------"));
        }
        jQuery('.page-loader-wrapper').hide();

    },

    Getgst: function () {

        var tax = jQuery("#taxval").val();
        var gst = (tax * 18) / 100;
        jQuery("#gst").val(gst);
        jQuery("#totval").val(parseFloat(gst) + parseFloat(tax));
    },



    ConfirmReq: function (datas) {
        jQuery('.page-loader-wrapper').show();
        var Confirm = {
            "Flag1": "INVOICEPAGE",
            "Flag2": "ADDINVOICE",
            "inptvar1": datas,
            "inptvar2": userdata.userId

        };
        Confirm = JSON.stringify(Confirm);
        Confirm = { "encryptedRqstStr": EncryptAPIReq(Confirm) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", Confirm, _InvoiceEntry.ConfirmData, userdata.token)

    },
    ConfirmData: function (response) {
        // debugger;
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            var status = response.data.queryResult[0].param2;

            if (status == "0") {
                swal({
                    title: "Success",
                    text: " Confirmed.........!!!",
                    type: "success"
                },

                    function () {
                        window.location.reload(true);
                    });
            }
            //else if (status == "1") {

            //    swal({
            //        title: "Warning",
            //        text: "This Account is already added.........!!!",
            //        type: "warning"
            //    });
            //}
        }

        else {
            swal("Error", "Error", "error");

        }

    },



    RevInvoice: function () {
        jQuery('.page-loader-wrapper').show();

        var vendor = jQuery("#ddlVendor").val();

        var Invoice = {
            "Flag1": "INVOICEPAGE",
            "Flag2": "LOADREVERSEINVOICE",
            "inptvar1": vendor,


        };
        Invoice = JSON.stringify(Invoice);
        Invoice = { "encryptedRqstStr": EncryptAPIReq(Invoice) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", Invoice, _InvoiceEntry.VendorFills, userdata.token)

    },

    VendorFills: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {
                jQuery("#Invoice").empty();
                jQuery("#Invoice").append(jQuery("<option></option>").val("0").text(" ------------ Choose Invoice  ------------"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#Invoice").append(jQuery("<option></option>").val(val.param1).text(val.param1));
                });
            }

            else {
                jQuery("#Invoice").empty();
                jQuery("#Invoice").append(jQuery("<option></option>").val("0").text(" ------------ Select Invoice  ------------"));
            }

        }
        //else if (response.status === "AUTHERROR") {
        //    window.location.href = DOMAIN_URL + "?Id=1";
        //}
        else {

            jQuery("#Invoice").empty();
            jQuery("#Invoice").append(jQuery("<option></option>").val("0").text(" ------------ Select Invoice  ------------"));
        }
        jQuery('.page-loader-wrapper').hide();

    },


    GetAmount: function () {
        jQuery('.page-loader-wrapper').show();
        var invoice = jQuery("#Invoice").val();

        var invamount = {
            "Flag1": "INVOICEPAGE",
            "Flag2": "LOADREVERSEINVOICEAMOUNT",
            "inptvar1": invoice

        }; 
        invamount = JSON.stringify(invamount);
        invamount = { "encryptedRqstStr": EncryptAPIReq(invamount) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", invamount, _InvoiceEntry.InvoiceFill, userdata.token)

    },
    InvoiceFill: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
               var amount = response.data.queryResult[0].param1;
               jQuery("#Amount").val(amount);

            
        }
    },




    ConfirmReqRev: function (datas, data) {
        jQuery('.page-loader-wrapper').show();
        var Confirm = {
            "Flag1": "INVOICEPAGE",
            "Flag2": "ADDREVERSEINVOICE",
            "inptvar1": datas,
            "inptvar2": data

        };
        Confirm = JSON.stringify(Confirm);
        Confirm = { "encryptedRqstStr": EncryptAPIReq(Confirm) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", Confirm, _InvoiceEntry.ConfirmDataRev, userdata.token)

    },
    ConfirmDataRev: function (response) {
        // debugger;
        jQuery('.page-loader-wrapper').hide();
        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
        if (response.status == "SUCCESS") {

            swal({
                title: "Success",
                text: " Confirmed.........!!!",
                type: "success"
            },



                function () {
                    window.location.reload(true);
                });
        }

        else {
            swal("Error", "Error", "error");

        }

    },

}


jQuery(document).ready(function ($) {

    _InvoiceEntry.VendorLoad();

    jQuery('#taxval').change(function () {

        _InvoiceEntry.Getgst();

    });

    jQuery('#Invoice').change(function () {

        _InvoiceEntry.GetAmount();

    });


    jQuery('#inyes').click(function () {

        jQuery("#innumber").show();
        jQuery("#amount").show();
        jQuery("#Revsubmit").show();
        jQuery("#submit").hide();

        _InvoiceEntry.RevInvoice();

    });
    jQuery('#inno').click(function () {

        jQuery("#innumber").hide();
        jQuery("#amount").hide();
        jQuery("#submit").show();
        jQuery("#Revsubmit").hide();


    });

    //jQuery('#bs_datepicker_container1 input').datepicker({
    //    format: "yyyy",
    //    viewMode: "years",
    //    minViewMode: "years",
    //    autoclose: true,
    //    container: '#bs_datepicker_container1'
    //});

    jQuery('#bs_datepicker_container1 input').datepicker({
        autoclose: true,
        format: "M",
        startView: "months",
        minViewMode: "months",
        showbuttonPanel: true,
        container: '#bs_datepicker_container1'
    }).datepicker("setDate", new Date());



    jQuery('#submit').click(function () {

        var vendor = jQuery("#ddlVendor").val();
        var year = jQuery("#year").val();
        var tax = jQuery("#taxval").val();
        var gst = jQuery("#gst").val();
        var tot = jQuery("#totval").val();
        var remark = jQuery("#Remarks").val();
        var yes = jQuery('#inyes').val();
        var no = jQuery('#inno').val();
        var deal= jQuery("#deal").val();


        if (vendor == 0) {
            swal("Please select vendor !!!....", "", "warning");
            return false;
        }
        else if (deal == 0) {
            swal("Please Entere Deal Name !!!....", "", "warning");
            return false;
        }
        else if (year == 0) {
            swal("Please select month !!!....", "", "warning");
            return false;
        }
        else if (tax == 0) {
            swal("Please enter taxable value !!!....", "", "warning");
            return false;
        }
        else if (gst == 0) {
            swal("Please enter  GST !!!....", "", "warning");
            return false;
        }
        else if (tot == 0) {
            swal("Please enter total  !!!....", "", "warning");
            return false;
        }

        else if (!jQuery('#inyes').prop('checked') && !jQuery('#inno').prop('checked')) {
            swal("Please Select Any option", "", "warning");
        }
       
        else if (remark == 0) {
            swal("Please enter remark !!!....", "", "warning");
            return false;
        }

        else {

            var datas = vendor + "!!" + year + "!!" + tax + "!!" + tot + "!!" + remark + "!!" + deal;

            _InvoiceEntry.ConfirmReq(datas);


        }

    });

    jQuery('#exit').click(function (e) {
        window.location = "Dashboard";
    });

    jQuery('#ddlVendor').change(function (e) {

         jQuery("#year").val('');
         jQuery("#taxval").val('');
         jQuery("#gst").val('');
         jQuery("#totval").val('');
         jQuery("#Remarks").val('');
         jQuery('#inyes').val(0);
         jQuery('#inno').val(0);
         jQuery("#Invoice").val(0);
        jQuery("#Amount").val('');
        jQuery("#deal").val('');
        jQuery("#innumber").hide();
        jQuery("#amount").hide();
    });




    jQuery('#Revsubmit').click(function () {

        var vendor = jQuery("#ddlVendor").val();
        var year = jQuery("#year").val();
        var tax = jQuery("#taxval").val();
        var gst = jQuery("#gst").val();
        var tot = jQuery("#totval").val();
        var remark = jQuery("#Remarks").val();
        var invoice = jQuery("#Invoice").val();
        var amount = jQuery("#Amount").val();
        var deal = jQuery("#deal").val();
        var user = userdata.userId;


        if (vendor == 0) {
            swal("Please select vendor !!!....", "", "warning");
            return false;
        }
        else if (deal == 0) {
            swal("Please Entere Deal Name !!!....", "", "warning");
            return false;
        }
        else if (year == 0) {
            swal("Please select month !!!....", "", "warning");
            return false;
        }
        else if (tax == 0) {
            swal("Please enter tax !!!....", "", "warning");
            return false;
        }
        else if (gst == 0) {
            swal("Please enter  GST !!!....", "", "warning");
            return false;
        }
        else if (tot == 0) {
            swal("Please enter total !!!....", "", "warning");
            return false;
        }
        else if (!jQuery('#inyes').prop('checked') && !jQuery('#inno').prop('checked')) {
            swal("Please Select Any option", "", "warning");
        }

        else if (invoice == 0) {
            swal("Please select invoice !!!....", "", "warning");
            return false;
        }
        else if (remark == 0) {
            swal("Please enter remark !!!....", "", "warning");
            return false;
        }

        else {


            var datas = vendor + "!!" + year + "!!" + tax + "!!" + tot + "!!" + remark + "!!" + deal;
            var data = invoice + "@@" + amount + "@@" + user;


            _InvoiceEntry.ConfirmReqRev(datas, data);


        }

    });

});