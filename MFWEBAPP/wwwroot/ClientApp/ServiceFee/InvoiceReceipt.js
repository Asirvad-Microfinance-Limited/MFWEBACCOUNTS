var _InvoiceReceipt = {

    VendorLoad: function () {
        jQuery('.page-loader-wrapper').show();

        var FromDate = jQuery("#Fdate").val();
        var ToDate = jQuery("#Tdate").val();

        var Vendor = {
            "Flag1": "RECIEPTCONFIRMATIONPAGE",
            "Flag2": "LOADRECEPITACCOUNTNO",
            "inptvar1": ToDate,
            "inptvar2": FromDate
        };
        Vendor = JSON.stringify(Vendor);
        Vendor = { "encryptedRqstStr": EncryptAPIReq(Vendor) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", Vendor, _InvoiceReceipt.VendorFill, userdata.token)

    },

    VendorFill: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
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



    InvoiceLoad: function (data,datas) {
        jQuery('.page-loader-wrapper').show();


        var Invoice = {
            "Flag1": "RECIEPTCONFIRMATIONPAGE",
            "Flag2": "LOADRECEIPTINVOICENO",
            "inptvar1": data,
            "inptvar2": datas


        };
        Invoice = JSON.stringify(Invoice);
        Invoice = { "encryptedRqstStr": EncryptAPIReq(Invoice) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", Invoice, _InvoiceReceipt.InvoiceFill, userdata.token)

    },

    InvoiceFill: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {
                jQuery("#ddlInvoice").empty();
                jQuery("#ddlInvoice").append(jQuery("<option></option>").val("0").text(" ------------ Choose Invoice  ------------"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlInvoice").append(jQuery("<option></option>").val(val.param1).text(val.param1));
                });
            }

            else {
                jQuery("#ddlInvoice").empty();
                jQuery("#ddlInvoice").append(jQuery("<option></option>").val("0").text(" ------------ Select Invoice  ------------"));
            }

        }
        //else if (response.status === "AUTHERROR") {
        //    window.location.href = DOMAIN_URL + "?Id=1";
        //}
        else {

            jQuery("#ddlInvoice").empty();
            jQuery("#ddlInvoice").append(jQuery("<option></option>").val("0").text(" ------------ Select Invoice  ------------"));
        }
        jQuery('.page-loader-wrapper').hide();

    },


    AmountLoad: function (data, datas) {
        jQuery('.page-loader-wrapper').show();

        var total = {
            "Flag1": "RECIEPTCONFIRMATIONPAGE",
            "Flag2": "LOADTOTALAMOUNT",
            "inptvar1": data,
            "inptvar2": datas


        };
        total = JSON.stringify(total);
        total = { "encryptedRqstStr": EncryptAPIReq(total) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", total, _InvoiceReceipt.AmountFill, userdata.token)

    },
    AmountFill: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {

                var amount = response.data.queryResult[0].param1;

                jQuery("#totamount").val(parseFloat(amount));
            }
        }
    },



    ConfirmReceipt: function () {
        jQuery('.page-loader-wrapper').show();

        var recamnt = jQuery("#amount").val();
        var tds = jQuery("#tds").val();
        var empid = userdata.userId;
        var remark = jQuery("#Remarks").val();

        var vendor = jQuery("#ddlVendor").val();
        var invoice = jQuery("#ddlInvoice").val();
        var FromDate = jQuery("#Fdate").val();
        var ToDate = jQuery("#Tdate").val();

        var data = recamnt + "@@" + tds + "@@" + empid + "@@" + remark;
        var datas = vendor + "!!" + invoice + "!!" + ToDate + "!!" + FromDate;

        var confirm = {
            "Flag1": "RECIEPTCONFIRMATIONPAGE",
            "Flag2": "CONFIRMRECIEPT",
            "inptvar1": datas,
            "inptvar2": data


        };
        confirm = JSON.stringify(confirm);
        confirm = { "encryptedRqstStr": EncryptAPIReq(confirm) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", confirm, _InvoiceReceipt.ConfirmCompleted, userdata.token)
    },

    ConfirmCompleted: function (response) {
        // debugger;
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
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

    test: function () {
        var s = document.getElementById('cardbody');
        s.style.height = "220px";
    },

}



    jQuery(document).ready(function ($) {

        jQuery('#Tdate').change(function () {
            var s = document.getElementById('cardbody');
            s.style.height = "150px";
            _InvoiceReceipt.VendorLoad();

        });

        jQuery('#ddlVendor').change(function () {

            jQuery("#totamount").val('');
            jQuery("#amount").val('');
            jQuery("#tds").val('');
            jQuery("#Remarks").val('');

            var FromDate = jQuery("#Fdate").val();
            var ToDate = jQuery("#Tdate").val();
            var vendor = jQuery("#ddlVendor").val();


            var data = vendor;
            var datas = ToDate + "@@" + FromDate;

            _InvoiceReceipt.InvoiceLoad(data,datas);



        });

        jQuery('#ddlInvoice').change(function () {

            jQuery("#amount").val('');
            jQuery("#tds").val('');
            jQuery("#Remarks").val('');

            var FromDate = jQuery("#Fdate").val();
            var ToDate = jQuery("#Tdate").val();
            var vendor = jQuery("#ddlVendor").val();
            var invoice = jQuery("#ddlInvoice").val();

            var data = vendor + "!!" + invoice ;
            var datas = ToDate + "@@" + FromDate;

            _InvoiceReceipt.AmountLoad(data, datas);

        });


        jQuery('#amount').change(function () {

            var totamnt = jQuery("#totamount").val();
            var amnt = jQuery("#amount").val();
            jQuery("#tds").val(parseFloat(totamnt) - parseFloat(amnt));
        });


        jQuery('#submit').click(function () {

            var fromdt = jQuery("#Fdate").val();
            var todt = jQuery("#Tdate").val();
            var vendor = jQuery("#ddlVendor").val();
            var invoice = jQuery("#ddlInvoice").val();
            var amnt = jQuery("#amount").val();
            var remark = jQuery("#Remarks").val();


            if (fromdt == 0) {
                swal("Please select From Date !!!....", "", "warning");
                return false;
            }
            else if (todt == 0) {
                swal("Please select Date !!!....", "", "warning");
                return false;
            }
            else if (vendor == 0) {
                swal("Please select vendor !!!....", "", "warning");
                return false;
            }
            else if (invoice == 0) {
                swal("Please select invoice !!!....", "", "warning");
                return false;
            }
            else if (amnt == 0) {
                swal("Please enter receiving amount !!!....", "", "warning");
                return false;
            }
            else if (remark == 0) {
                swal("Please enter remark !!!....", "", "warning");
                return false;
            }
            else {
                _InvoiceReceipt.ConfirmReceipt();
            }
        });

        jQuery('#exit').click(function (e) {
            window.location = "Dashboard";
        });


        jQuery('#amount').change(function () {

            var totamnt = jQuery("#totamount").val();
            var amnt = jQuery("#amount").val();

            if (parseFloat(amnt) > parseFloat(totamnt)) {
                swal({
                    title: "warning",
                    text: "Receiving amount must be less than total amount ...!!!",
                    type: "warning"
                });

                jQuery("#amount").val('');
                jQuery("#tds").val('');

            }
        });
    

        //jQuery('#bs_datepicker_container1 input').datepicker({

        //    autoclose: true,
        //    format: "dd-M-yyyy",
        //    showbuttonPanel: true,
        //    defaultDate: "+v1w",
        //    changeMonth: true,
        //    endDate: new Date(),
        //    endDate: new Date(),
        //    container: '#bs_datepicker_container1'
        //}).datepicker("setDate", new Date());

        jQuery('#bs_datepicker_container1 input').datepicker({
            autoclose: true,
            format: "M",
            startView: "months",
            minViewMode: "months",
            showbuttonPanel: true,
            container: '#bs_datepicker_container1'
        });
    });

