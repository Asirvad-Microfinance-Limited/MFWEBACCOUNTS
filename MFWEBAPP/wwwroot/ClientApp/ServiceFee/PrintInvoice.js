var Flag1;
var Flag2;
var param1 = "";
var reverseinvoice = "";
var _PrintInvoice = {
    

    VendorLoad: function () {
        jQuery('.page-loader-wrapper').show();

        var FromDate = jQuery("#Fdate").val();
        var ToDate = jQuery("#Tdate").val();

        var Vendor = {
            "Flag1": "INVOICEPRINT",
            "Flag2": "LOADACCOUNT",
            "inptvar1": ToDate,
            "inptvar2": FromDate
        };
        Vendor = JSON.stringify(Vendor);
        Vendor = { "encryptedRqstStr": EncryptAPIReq(Vendor) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", Vendor, _PrintInvoice.VendorFill, userdata.token)

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




    LoadDeal: function (data) {
        jQuery('.page-loader-wrapper').show();

        var Deal = {
            "Flag1": "INVOICEPRINT",
            "Flag2": "LOADDEALNAME",
            "inptvar1": data
        };
        Deal = JSON.stringify(Deal);
        Deal = { "encryptedRqstStr": EncryptAPIReq(Deal) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", Deal, _PrintInvoice.DealFill, userdata.token)

    },

    DealFill: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {
                jQuery("#ddlDeal").empty();
                jQuery("#ddlDeal").append(jQuery("<option></option>").val("0").text(" ------------ Choose Deal  ------------"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlDeal").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }

            else {
                jQuery("#ddlDeal").empty();
                jQuery("#ddlDeal").append(jQuery("<option></option>").val("0").text(" ------------ Select Deal  ------------"));
            }

        }
        //else if (response.status === "AUTHERROR") {
        //    window.location.href = DOMAIN_URL + "?Id=1";
        //}
        else {

            jQuery("#ddlDeal").empty();
            jQuery("#ddlDeal").append(jQuery("<option></option>").val("0").text(" ------------ Select Deal  ------------"));
        }
        jQuery('.page-loader-wrapper').hide();

    },



    InvoiceLoad: function (data) {
        jQuery('.page-loader-wrapper').show();

        var vendor = jQuery("#ddlVendor").val();

        var Invoice = {
            "Flag1": "INVOICEPRINT",
            "Flag2": "LOADINVOICENO",
            "inptvar1": vendor,
            "inptvar2": data


        };
        Invoice = JSON.stringify(Invoice);
        Invoice = { "encryptedRqstStr": EncryptAPIReq(Invoice) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", Invoice, _PrintInvoice.InvoiceFill, userdata.token)

    },

    InvoiceFill: function (response) {

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




    LoadTable: function (data, datas) {
        jQuery('.page-loader-wrapper').show();

        var tableload = {
            "Flag1": "INVOICEPRINT",
            "Flag2": "LOADINVOICEDETAILS",
            "inptvar1": data,
            "inptvar2": datas


        };
        tableload = JSON.stringify(tableload);
        tableload = { "encryptedRqstStr": EncryptAPIReq(tableload) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", tableload, _PrintInvoice.TableLoadCompleted, userdata.token)
    },

    TableLoadCompleted: function (Response) {
        jQuery('#maincard').show();
        jQuery('.page-loader-wrapper').hide();
        if (Response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();

            if (Response.data.queryResult.length > 0) {

                jQuery('#divvendordetailstable').empty();

                var $table = jQuery('<table class="table" id="tblapproval">');
                $table.append
                    ('<thead><tr> <th style="text-align:center;">ACCOUNT ID</th><th style="text-align:center;">VENDOR NAME</th><th style="text-align:center;">TAXABLE VALUE</th><th style="text-align:center;">IGST</th><th style="text-align:center;">SGST</th><th style="text-align:center;">CGST</th><th style="text-align:center;">TOTAL AMOUNT</th><th style="text-align:center;">REVISED INVOICE NO.</th><th style="text-align:center;">REVISED INVOICE AMOUNT</th></thead>')
                var $tbody = jQuery('<tbody>');
                jQuery.each(Response.data.queryResult, function (i, val) {

                    var M = Response.data.queryResult[i].param1;
                    var P = Response.data.queryResult[i].param2;
                    var N = Response.data.queryResult[i].param4;
                    //var o = Response.data.queryResult[i].param5;

                    var data = N.split(',');
                    var datas = M.split(',');
                    var datass = P.split(',');
                    //var param5 = o.split(',');
                    //jQuery("#ddlLoanId").append(jQuery("<option></option>").val(cust_Name[1]).text(cust_Name[1]));
                    // alert(datas[0]);
                    /*var leaseID = datas[0];*/
                    var $row = jQuery('<tr/>');
                    //$row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="center">').html(datas[0]));
                    $row.append(jQuery('<td align="center">').html(datas[1]));
                    $row.append(jQuery('<td align="center">').html(datass[0]));
                    $row.append(jQuery('<td align="center">').html(data[0]));
                    $row.append(jQuery('<td align="center">').html(data[1]));
                    $row.append(jQuery('<td align="center">').html(data[2]));
                    $row.append(jQuery('<td align="center">').html(data[3]));
                    $row.append(jQuery('<td align="center">').html(data[4]));
                    $row.append(jQuery('<td align="center">').html(data[5]));

                    //$row.append(jQuery('<td align="center">').html(param5[0]));
                   // $row.append(jQuery('<td align="center">').html(param5[1]));
                   
                    jQuery("#submit").show();

                    reverseinvoice = data[4];
                    if (reverseinvoice == '') {
                        jQuery("#print").show();
                        jQuery("#Revprint").hide();
                    }
                    else {
                        jQuery("#Revprint").show();
                        jQuery("#print").hide();
                    }

                    jQuery("#exit").show();

                    //$row.append(jQuery('<td align="center">').html('<button type="button"  class="btnsmall  btn-success fc-center"  class="btn btn-danger fc-center"  onClick="_DAApproval.ApprovalConfirm(' + val.customerID + ');"> <i class="fa fa-check style="font-size:15px;"></i></button> '));
                    //$row.append(jQuery('<td align="center">').html('<button type="button"  class="btnsmall  btn-danger fc-center"  data-toggle="modal" class="btn btn-danger fc-center"   onClick="_DAApproval.RejectionConfirm(' + i + ',' + val.customerID + ');"> <i class="fa fa-times" style="font-size:15px;"></i></button> '));
                    //$row.append(jQuery('<td align="center">').html(' <input type="text" name="txtreject" maxlength="100" id="txtreject' + i + '" class=" form-control" style="margin-bottom:4px; width :170px;" > '));

                    $tbody.append($row);
                    //    custid = Response.data.queryResult[i].param1;
                });


                $tbody.append('</tbody>');
                $table.append($tbody);

                $table.append('</table>');
                jQuery('#divvendordetailstable').html($table);

                

            }
            else if (Response.status === "AUTHERROR") {
                window.location.href = DOMAIN_URL + "?Id=1";
            }
            else {
                jQuery('#divvendordetailstable').empty();
                _General.noData(jQuery('#divvendordetailstable'), "No Data Found");
                jQuery('.page-loader-wrapper').hide();
            }
        }

        jQuery('.page-loader-wrapper').hide();

    },



   


    


    test: function () {
        var s = document.getElementById('cardbody');
        s.style.height = "250px";
    },


    ViewDataApproval: async function () {
        jQuery('.page-loader-wrapper').show();


        Flag1 = "INVOICEPRINT";
        Flag2 = "PRINTINVOICE";
        //var typeId = 5;
        var FromDate = jQuery("#Fdate").val();
        var ToDate = jQuery("#Tdate").val();
        var vendor = jQuery("#ddlVendor").val();
        var deal = jQuery("#ddlDeal").val();
        //var invoice = jQuery("#Invoice").val();
        //////var EmpCode = userdata.userId;
        //var datas = vendor + "!!" + invoice;

        //var data = vendor;
        //var datas = ToDate /*+ "@@" + ToDate + "@@" + EmpCode*/;
        //var datass = FromDate;

        //_loanApplication.getArrayData();
        jQuery("#generateserviceapplication").empty();
        jQuery("#ServicefeeInvoicePrinteView").empty();
        //jQuery("#ServicefeeInvoicePrinteView").empty();
        jQuery("#generateserviceapplication").load(DOMAIN_URL + "ServiceFeeInvoicePrint/" + Flag1 + "/" + Flag2 + "/" + ToDate + "/" + vendor + "/" + deal + "/" + "100367", function (response) {
        //jQuery("#generateserviceapplication").load(DOMAIN_URL + "ServiceFeeInvoicePrint/" + Flag1 + "/" + Flag2 + "/" + "100367", function (response) {
        
           // _PrintInvoice.testpdf(jQuery("#ServicefeeInvoicePrinteView"));
            _PrintInvoice.testpdf(jQuery("#ServicefeeInvoicePrinteView"));

            //jQuery("#ServicefeeInvoicePrinteView").empty();
                //jQuery("#ServicefeeInvoicePrinteView").empty();
        });
        //  jQuery('#printApproval').prop("disabled", true);

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





    ViewDataApprovalrevised: async function () {
        jQuery('.page-loader-wrapper').show();


        Flag1 = "INVOICEPRINT";
        Flag2 = "PRINTINVOICE";
        //var typeId = 5;
        var FromDate = jQuery("#Fdate").val();
        var ToDate = jQuery("#Tdate").val();
        var vendor = jQuery("#ddlVendor").val();
        var deal = jQuery("#ddlDeal").val();

        //var invoice = jQuery("#Invoice").val();
        //////var EmpCode = userdata.userId;
        //var datas = vendor + "!!" + invoice;

        var data = vendor;
        var datas = ToDate /*+ "@@" + ToDate + "@@" + EmpCode*/;
        var datass = FromDate;

        //_loanApplication.getArrayData();
        jQuery("#generaterevisedserviceapplication").empty();
        jQuery("#ServiceFeeRevisedPrintView").empty();
        //jQuery("#ServicefeeInvoicePrinteView").empty();
        jQuery("#generateserviceapplication").load(DOMAIN_URL + "ServiceFeeInvoicePrint/" + Flag1 + "/" + Flag2 + "/" + ToDate + "/" + vendor + "/" + deal + "/" + "100367", function (response) {
            //jQuery("#generateserviceapplication").load(DOMAIN_URL + "ServiceFeeInvoicePrint/" + Flag1 + "/" + Flag2 + "/" + "100367", function (response) {

            // _PrintInvoice.testpdf(jQuery("#ServicefeeInvoicePrinteView"));
            _PrintInvoice.testpdfrevised(jQuery("#ServiceFeeRevisedPrintView"));

            //jQuery("#ServicefeeInvoicePrinteView").empty();
            //jQuery("#ServicefeeInvoicePrinteView").empty();
        });
        //  jQuery('#printApproval').prop("disabled", true);

    },
    testpdfrevised: function (divname) {
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


    ConfirmPrint: function () {
            jQuery('.page-loader-wrapper').show();

        var FromDate = jQuery("#Fdate").val();
        var ToDate = jQuery("#Tdate").val();
        var vendor = jQuery("#ddlVendor").val();
        var deal = jQuery("#ddlDeal").val();


        var datas = ToDate + "@@" + deal ;

        var confirm = {
            "Flag1": "INVOICEPRINT",
            "Flag2": "CONFIRMPRINT",
            "inptvar1": vendor,
            "inptvar2": datas


        };
        confirm = JSON.stringify(confirm);
        confirm = { "encryptedRqstStr": EncryptAPIReq(confirm) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", confirm, _PrintInvoice.ConfirmCompleted, userdata.token)
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


    }



}


jQuery(document).ready(function ($) {

    //jQuery('#Fdate').change(function () {

    //    var s = document.getElementById(cardbody);
    //    s.style.height = "400px";

    //});

    jQuery('#Tdate').change(function () {
        jQuery("#ddlDeal").val(0);
        jQuery('#divvendordetailstable').empty();
        jQuery('#maincard').hide();
        //jQuery('#submit').hide();
        //jQuery('#print').hide();
        //jQuery('#Revprint').hide();
        //jQuery('#exit').hide();
       


            _PrintInvoice.VendorLoad();

    });






    jQuery('#ddlVendor').change(function () {
        jQuery('#divvendordetailstable').empty();
        jQuery('#maincard').hide();
        var FromDate = jQuery("#Fdate").val();
        var ToDate = jQuery("#Tdate").val();
        var vendor = jQuery("#ddlVendor").val();


        var data = vendor + '!!' + ToDate;
      
        _PrintInvoice.LoadDeal(data);


    });



    jQuery('#ddlDeal').change(function () {

        var ToDate = jQuery("#Tdate").val();
        var vendor = jQuery("#ddlVendor").val();
        var deal = jQuery("#ddlDeal").val();



        var data = vendor ;
        var datas = ToDate + "@@" + deal;


        //_PrintInvoice.InvoiceLoad(data);
        _PrintInvoice.LoadTable(data,datas);


    });

    //jQuery('#Invoice').change(function () {


    //    var FromDate = jQuery("#Fdate").val();
    //    var ToDate = jQuery("#Tdate").val();
    //    var vendor = jQuery("#ddlVendor").val();
    //    var invoice = jQuery("#Invoice").val();

    //    var data = vendor + "!!" + invoice;
    //    var datas = FromDate + "@@" + ToDate;
    //    _PrintInvoice.LoadTable(data,datas);


    //});



    jQuery('#print').click(function () {

        _PrintInvoice.ViewDataApproval();
    });

    jQuery('#submit').click(function () {

        _PrintInvoice.ConfirmPrint();
    });

    jQuery("#Revprint").click(function () {
        _PrintInvoice.ViewDataApprovalrevised();
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

    //jQuery('#bs_datepicker_container2 input').datepicker({

    //    autoclose: true,
    //    format: "dd-M-yyyy",
    //    showbuttonPanel: true,
    //    defaultDate: "+v1w",
    //    changeMonth: true,
    //    endDate: new Date(),
    //    endDate: new Date(),
    //    container: '#bs_datepicker_container2'
    //}).datepicker("setDate", new Date());

});