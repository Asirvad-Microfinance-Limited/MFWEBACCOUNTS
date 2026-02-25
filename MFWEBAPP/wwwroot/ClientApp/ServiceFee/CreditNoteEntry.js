var _CreditNoteEntry = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", Vendor, _CreditNoteEntry.VendorFill, userdata.token)

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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", Invoice, _CreditNoteEntry.InvoiceFill, userdata.token)

    },

    InvoiceFill: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

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
            "Flag1": "CREDITNOTEPAGE",
            "Flag2": "SHOWAMOUNT",
            "inptvar1": data,
            "inptvar2": datas


        };
        total = JSON.stringify(total);
        total = { "encryptedRqstStr": EncryptAPIReq(total) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", total, _CreditNoteEntry.AmountFill, userdata.token)

    },
    AmountFill: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {

                var taxval = response.data.queryResult[0].param1;
                var tottax = response.data.queryResult[0].param2;
                var amount = response.data.queryResult[0].param3;

                jQuery("#taxval").val(parseFloat(taxval));
                jQuery("#tottaxt").val(parseFloat(tottax));
                jQuery("#totamount").val(parseFloat(amount));
            }
        }
    },


    UpdateAmount: function () {
        jQuery('.page-loader-wrapper').show();
  

        var vendor = jQuery("#ddlVendor").val();
        var taxableval = jQuery("#taxval").val();
        var invoice = jQuery("#ddlInvoice").val();
        
        var data = vendor + "!!" + invoice;
        /*var datas = recamnt + "@@" + tds + "@@" + empid + "@@" + remark*/;

        var update = {
            "Flag1": "CREDITNOTEPAGE",
            "Flag2": "UPDATEAMOUNT",
            "inptvar1": data,
            "inptvar2": taxableval


        };
        update = JSON.stringify(update);
        update = { "encryptedRqstStr": EncryptAPIReq(update) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", update, _CreditNoteEntry.UpdateCompleted, userdata.token)
    },

    UpdateCompleted: function (response) {

        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            swal({
                title: "Success",
                text: " Updated.........!!!",
                type: "success"
            });
              
        }

        else {
            swal("Error", "Error", "error");

        }


    },



    ConfirmCredit: function () {
        jQuery('.page-loader-wrapper').show();


        var vendor = jQuery("#ddlVendor").val();
        var invoice = jQuery("#ddlInvoice").val();
        var FromDate = jQuery("#Fdate").val();
        var ToDate = jQuery("#Tdate").val();
        var taxval = jQuery("#taxval").val();
        var tottax = jQuery("#tottaxt").val();
        var remark = jQuery("#Remarks").val();
        var empid = userdata.userId;


        //var data = recamnt + "@@" + tds + "@@" + empid + "@@" + remark;
        var data = vendor + "!!" + ToDate + "!!" + FromDate + "!!" + empid + "!!" + invoice;
        var datas = taxval + "@@" + tottax + "@@" + remark;

        var confirm = {
            "Flag1": "CREDITNOTEPAGE",
            "Flag2": "UPDATECREDITNOTE",
            "inptvar1": data,
            "inptvar2": datas


        };
        confirm = JSON.stringify(confirm);
        confirm = { "encryptedRqstStr": EncryptAPIReq(confirm) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", confirm, _CreditNoteEntry.ConfirmCompleted, userdata.token)
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
            });


            jQuery("#print").show();
                //function () {
                //    window.location.reload(true);
                //});
        }

        else {
            swal("Error", "Error", "error");

        }


    },


    ViewDataApproval: async function () {
        jQuery('.page-loader-wrapper').show();


        Flag1 = "CREDITNOTEPAGE";
        Flag2 = "CREDITNOTEPRINT";

        var FromDate = jQuery("#Fdate").val();
        var ToDate = jQuery("#Tdate").val();
        var vendor = jQuery("#ddlVendor").val();
        //var invoice = jQuery("#Invoice").val();
        //////var EmpCode = userdata.userId;
        //var datas = vendor + "!!" + invoice;

        var data = vendor;
        var datas = FromDate ;
        var datass = ToDate;

        //_loanApplication.getArrayData();
        jQuery("#generatecreditapplication").empty();
        jQuery("#CreditNotePrinteView").empty();
        jQuery("#generatecreditapplication").load(DOMAIN_URL + "CreditNotePrint/" + Flag1 + "/" + Flag2 + "/" + ToDate + "/" + vendor + "/" + "100367", function (response) {

            _CreditNoteEntry.testpdf(jQuery("#CreditNotePrinteView"));

        });

    },

    testpdf: function (divname) {
        //jQuery("#Loader").addClass('hide');
        jQuery('.page-loader-wrapper').hide();

        var contents = divname.html();
        var frame1 = jQuery('<iframe />');
        frame1[0].name = "frame1";
        //frame1.css({ "position": "absolute", "top": "-1000000px" });
        jQuery("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title></title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="' + DOMAIN_URL + 'lib/bootstrap/dist/assets/css/Print.css" rel="stylesheet" />');

        //Append the DIV contents.
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            frame1.remove();
            //$("#btnGenerateAgreement").prop("disabled", false);
        }, 500);
    },



    test: function () {
        var s = document.getElementById('cardbody');
        s.style.height = "220px";
    },
}



    jQuery(document).ready(function ($) {

        jQuery('#Tdate').change(function () {
            var s = document.getElementById('cardbody');
            s.style.height = "190px";
            _CreditNoteEntry.VendorLoad();

        });

        jQuery('#ddlVendor').change(function () {

            jQuery("#taxval").val('');
            jQuery("#tottaxt").val('');
            jQuery("#totamount").val('');
            jQuery("#Remarks").val('');

            var FromDate = jQuery("#Fdate").val();
            var ToDate = jQuery("#Tdate").val();
            var vendor = jQuery("#ddlVendor").val();


            var data = vendor;
            var datas = ToDate + "@@" + FromDate;

            _CreditNoteEntry.InvoiceLoad(data,datas);



        });

        jQuery('#ddlInvoice').change(function () {

            jQuery("#Remarks").val('');

            var FromDate = jQuery("#Fdate").val();
            var ToDate = jQuery("#Tdate").val();
            var vendor = jQuery("#ddlVendor").val();
            var invoice = jQuery("#ddlInvoice").val();

            var data = vendor + "!!" + invoice ;
            var datas = ToDate + "@@" + FromDate;

            _CreditNoteEntry.AmountLoad(data, datas);

        });


        jQuery('#taxval').change(function () {

            var tax = jQuery("#taxval").val();
            var total = (tax * 18) / 100;
            jQuery("#tottaxt").val(total);
            jQuery("#totamount").val(parseFloat(tax) + parseFloat(total));
        });

        jQuery('#update').click(function () {

            var fromdt = jQuery("#Fdate").val();
            var todt = jQuery("#Tdate").val();
            var vendor = jQuery("#ddlVendor").val();
            var invoice = jQuery("#ddlInvoice").val();
            var taxable = jQuery("#taxval").val();

            if (fromdt == 0) {
                swal("Please Select From Date !!!....", "", "warning");
                return false;
            }
            else if (todt == 0) {
                swal("Please Select Date !!!....", "", "warning");
                return false;
            }
            else if (vendor == 0) {
                swal("Please Select Vendor !!!....", "", "warning");
                return false;
            }
            else if (invoice == 0) {
                swal("Please Select Invoice !!!....", "", "warning");
                return false;
            }
            else if (taxable == 0) {
                swal("Please Enter Taxable Value !!!....", "", "warning");
                return false;
            }
         
            else {
                _CreditNoteEntry.UpdateAmount();

            }

        });


        jQuery('#submit').click(function () {

            var fromdt = jQuery("#Fdate").val();
            var todt = jQuery("#Tdate").val();
            var vendor = jQuery("#ddlVendor").val();
            var invoice = jQuery("#ddlInvoice").val();
            var taxable = jQuery("#taxval").val();
            var remark = jQuery("#Remarks").val();


            if (fromdt == 0) {
                swal("Please Select From Date !!!....", "", "warning");
                return false;
            }
            else if (todt == 0) {
                swal("Please Select Date !!!....", "", "warning");
                return false;
            }
            else if (vendor == 0) {
                swal("Please Select Vendor !!!....", "", "warning");
                return false;
            }
            else if (invoice == 0) {
                swal("Please Select Invoice !!!....", "", "warning");
                return false;
            }
            else if (taxable == 0) {
                swal("Please Enter Taxable Value !!!....", "", "warning");
                return false;
            }
            else if (remark == 0) {
                swal("Please Enter Remark !!!....", "", "warning");
                return false;
            }
            else {

                _CreditNoteEntry.ConfirmCredit();
            }

        });

        jQuery('#print').click(function () {

            _CreditNoteEntry.ViewDataApproval();

            //jQuery("#Fdate").val('');
            // jQuery("#Tdate").val('');
            //jQuery("#ddlVendor").val(0);
            //jQuery("#ddlInvoice").val(0);
            //jQuery("#taxval").val('');
            //jQuery("#Remarks").val('');
            //jQuery("#tottaxt").val('');
            //jQuery("#totamount").val('');
        });

        jQuery('#exit').click(function (e) {
            window.location = "Dashboard";
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

