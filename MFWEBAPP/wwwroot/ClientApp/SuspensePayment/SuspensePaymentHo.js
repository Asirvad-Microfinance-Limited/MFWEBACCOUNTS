var requestededamount;
var branchhead;
var branchheadid;

var _PaymentHo = {


    Ratconfirm: function () {
        //jQuery('.page-loader-wrapper').show();

        var suspenseid = jQuery("#rqstsearch5").val();
        var branch = jQuery("#ddlBranchnew").val();

        var suspense = suspenseid.split('>>');
        var str = suspense[0] + '!!' + branch;
        var amount = suspense[2];
        var user = userdata.userId;
        var data = amount + '@@' + user;

        var RatconfirmData = {
            "flag1": "SUSPENSERATIFICATION",
            "flag2": "CONFIRM",
            "inptvar1": str,
            "inptvar2": data,


        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", RatconfirmData, _PaymentHo.ratconfirmCompleted, userdata.token)
    },

    ratconfirmCompleted: function (response) {
        //jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            //suspenseid = jQuery.trim(response.data.advance_payment_id);
            //swal(response.data.message, "Approval confirmed.....!", "success");

            swal({
                title: "success",
                text: "Confirmed.....!",
                type: "success"
            },
                function () {
                    window.location.reload(true);
                });
        }

        else {

            swal(response.responseMsg, "", "error");

        }

    },


    rattablefill: function (suspense) {

        var Str = "";
        var GetratDetailData = {
            "flag1": "SUSPENSERATIFICATION",
            "flag2": "SUSPENSDETAIL",
            "inptvar1": suspense,
            "inptvar2": Str

        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetratDetailData, _PaymentHo.FillratDetail, userdata.token)

    },
    FillratDetail: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                var data1 = response.data.queryResult[0].param1;
                var data2 = response.data.queryResult[0].param2;
                var tot = data1.split("#")[0];
                var dt = data2.split("#")[1];
                jQuery("#advanceratcard").show();
                var data = data1.split("#");
                var data3 = data2.split("#")
                var $row = jQuery('<tr/>');
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[0]));

                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[1].toUpperCase()));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[3].toUpperCase()));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[2]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[4]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[1]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[2]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[3]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[4]));

                jQuery('#ratAdvancedetails').append($row);

                jQuery("#viewBill").show();
                jQuery("#btnratify").show();



            }
            else {
            }

            jQuery('.page-loader-wrapper').hide();


        }
    },


    //ratifytablefill: function (suspense) {

    //    var Str = "";
    //    var GetRatifytableData = {
    //        "flag1": "SUSPENSERATIFICATION",
    //        "flag2": "SUSPENSDETAIL",
    //        "inptvar1": suspense,
    //        "inptvar2": Str

    //    }
    //    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetRatifytableData, _PaymentHo.FillRatifyTableDetail, userdata.token)

    //},
    //FillRatifyTableDetail: function (response) {
    //    if (response.status === "SUCCESS") {
    //        if (response.data.queryResult.length > 0) {
    //            var data1 = response.data.queryResult[0].param1;
    //            var data2 = response.data.queryResult[0].param2;
    //            var tot = data1.split("#")[0];
    //            var dt = data2.split("#")[1];
    //            jQuery("#suspenseratifycard").show();
    //            var data = data1.split("#");
    //            var data3 = data2.split("#");
    //            var $row = jQuery('<tr/>');

    //            $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data[0]));
    //            $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data[1].toUpperCase()));
    //            $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data[3].toUpperCase()));
    //            $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data[2]));
    //            $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data[4]));
    //            $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data3[1]));
    //            $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data3[2]));
    //            $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data3[3]));
    //            $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data3[4]));




    //            jQuery('#tableratifydetails').append($row);

    //            jQuery("#viewBill").show();
    //            jQuery("#btnratify").show();

    //            //jQuery("#billbutton").show();
    //            //jQuery("#uploadbutton").show();
    //            //jQuery("#cnfmdamnt").show();
    //            //// var confirmdamount = jQuery('#cnfimdamount').val();
    //            //recievedamount = data3[4];ccc
                                        //            //// jQuery("#cnfmdamnt").val = html(data3[3]);
    //            //var confirmedamount = data3[1];
    //            //jQuery("#cnfimdamount").val(confirmedamount);
    //            //// jQuery("#cnfimdamount").val(response.data.confirmedamount );
    //            //jQuery("#Suspensereverse").show();

    //        }
    //        else {
    //        }

    //        jQuery('.page-loader-wrapper').hide();


    //    }
    //},

    ViewDataApproval: async function () {
        jQuery('.page-loader-wrapper').show();


        Flag1 = "SUSPENSEVOUCHER";
        Flag2 = "VOUCHER";

        //var FromDate = jQuery("#Fdate").val();
        //var ToDate = jQuery("#Tdate").val();
        var branch = jQuery("#ddlBranch").val();
        var inptvar1 = jQuery("#rqstsearch4").val();
        var datas = inptvar1.split('>>');
        var susid = datas[0];
        var transno = datas[1];

        jQuery("#generatevoucherapplication").empty();
        jQuery("#VoucherPrinteView").empty();
        jQuery("#generatevoucherapplication").load(DOMAIN_URL + "VoucherDetailsPrint/" + Flag1 + "/" + Flag2 + "/" + branch + "/" + transno + "/" + "100367", function (response) {

            _PaymentHo.testpdf(jQuery("#VoucherPrinteView"));


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

    VoucherSearchFill: function (brid) {
        jQuery(".page-loader-wrapper").show();
        var Str = "";
        var Getvoucehrdata = {
            "flag1": "SUSPENSEVOUCHER",
            "flag2": "SUSPENSEID",
            "inptvar1": brid,
            "inptvar2": Str
        };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", Getvoucehrdata, _PaymentHo.VoucherLoadCompleted, userdata.token)
    },

    VoucherLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                jQuery("#rqstsearch4").empty();
                jQuery("#rqstsearch4").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#rqstsearch4").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });


            }
            else {
                jQuery("#rqstsearch4").empty();
                jQuery("#rqstsearch4").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
            }

        }
        else {
            jQuery("#rqstsearch4").empty();
            jQuery("#rqstsearch4").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
        }

    },



    RatifySearchFill: function (brid) {
        jQuery(".page-loader-wrapper").show();
        var Str = "";
        var Getratifydata = {
            "flag1": "SUSPENSERATIFICATION",
            "flag2": "SUSPENSEID",
            "inptvar1": brid,
            "inptvar2": Str
        };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", Getratifydata, _PaymentHo.RatifyLoadCompleted, userdata.token)
    },

    RatifyLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                jQuery("#rqstsearch5").empty();
                jQuery("#rqstsearch5").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#rqstsearch5").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });


            }
            else {
                jQuery("#rqstsearch5").empty();
                jQuery("#rqstsearch5").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
            }

        }
        else {
            jQuery("#rqstsearch5").empty();
            jQuery("#rqstsearch5").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
        }

    },

    VoucherBranchFill: function () {
        jQuery(".page-loader-wrapper").show();
        var Str = "";
        var Getbankdata = {
            "flag1": "SUSPENSEVOUCHER",
            "flag2": "BRANCH",
            "inptvar1": userdata.userId,
            "inptvar2": Str
        };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", Getbankdata, _PaymentHo.BranchLoadCompleted, userdata.token)
    },

    BranchLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                jQuery("#ddlBranch").empty();
                jQuery("#ddlBranch").append(jQuery("<option></option>").val("0").text("------------ Choose Branch------------"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlBranch").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });


            }
            else {
                jQuery("#ddlBranch").empty();
                jQuery("#ddlBranch").append(jQuery("<option></option>").val("0").text("------------ Select Branch------------"));
            }

        }
        else {
            jQuery("#ddlBranch").empty();
            jQuery("#ddlBranch").append(jQuery("<option></option>").val("0").text("------------ Select Branch------------"));
        }

    },



    RatifyBranchFill: function () {
        jQuery(".page-loader-wrapper").show();
        var Str = "";
        var GetbankRatdata = {
            "flag1": "SUSPENSERATIFICATION",
            "flag2": "BRANCH",
            "inptvar1": userdata.userId,
            "inptvar2": Str
        };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetbankRatdata, _PaymentHo.RatBranchLoadCompleted, userdata.token)
    },

    RatBranchLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                jQuery("#ddlBranchnew").empty();
                jQuery("#ddlBranchnew").append(jQuery("<option></option>").val("0").text("------------ Choose Branch------------"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlBranchnew").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });


            }
            else {
                jQuery("#ddlBranchnew").empty();
                jQuery("#ddlBranchnew").append(jQuery("<option></option>").val("0").text("------------ Select Branch------------"));
            }

        }
        else {
            jQuery("#ddlBranchnew").empty();
            jQuery("#ddlBranchnew").append(jQuery("<option></option>").val("0").text("------------ Select Branch------------"));
        }

    },


    GetGSTREQ: function () {
        jQuery('.page-loader-wrapper').show();
        var val = jQuery('#gst').val().toUpperCase();
        var GetGSTValue = {
            "gstin": val,
            "consent": "Y",
            "consent_text": "I hereby declare my consent agreement for verifying my data to Asirvad company",
            "firmId": "3",
            "empId": userdata.userId

        };

        _http.post(MFPUBLICKYCAPI_URL + "api/gst", GetGSTValue, _PaymentHo.FillGSTREQ, userdata.token)

    },
    FillGSTREQ: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.pradr.em.length > 0) {

                jQuery("#vendor").val(response.data.lgnm);


            }
            else {

                jQuery("#vendor").val("");

            }
        }
        else {
            jQuery('.page-loader-wrapper').hide();
            swal("GST", "Invalid GSTIN number..!", "warning");

            jQuery("#vendor").val("");
            jQuery("#vendoraddress").val("");
            jQuery("#gst").val("");

        }
    },


    VendorLoad: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetVendor = {
            "flag1": "SUSPENSEHOAPPROVAL",
            "flag2": "VENDORLOAD",
            "inptvar1": '',
            "inptvar2":'' ,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetVendor, _PaymentHo.FillVendor, userdata.token)


    },
    FillVendor: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;

                jQuery("#Vendors").empty();
                jQuery("#Vendors").append(jQuery("<option></option>").val("0").text(" --------CHOOSE VENDOR-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#Vendors").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#Vendors").empty();
                jQuery("#Vendors").append(jQuery("<option></option>").val("0").text(" --------CHOOSE VENDOR-------- "));
            }
        }
        else {

            jQuery("#Vendors").empty();
            jQuery("#Vendors").append(jQuery("<option></option>").val("0").text(" --------CHOOSE VENDOR-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },



    BranchLoad: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetBranch = {
            "flag1": "SUSPENSEHOAPPROVAL",
            "flag2": "BRANCHLOAD",
            "inptvar1": '',
            "inptvar2": '',
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetBranch, _PaymentHo.FillBranch, userdata.token)


    },
    FillBranch: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;

                jQuery("#Branches").empty();
                jQuery("#Branches").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#Branches").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#Branches").empty();
                jQuery("#Branches").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH-------- "));
            }
        }
        else {

            jQuery("#Branches").empty();
            jQuery("#Branches").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },


    ExpenseLoad: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "MAINEXPENSE",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _PaymentHo.FillPayType, userdata.token)

    },
    FillPayType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;

                jQuery("#expense").empty();
                jQuery("#expense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE EXPENSE TYPE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#expense").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#expense").empty();
                jQuery("#expense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE EXPENSE TYPE-------- "));
            }
        }
        else {

            jQuery("#expense").empty();
            jQuery("#expense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE EXPENSE TYPE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },


    SubExpenseLoad: function (val) {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "SUBEXPENSE",
            "inptvar1": userdata.branchId,
            "inptvar2": val + "@@" + userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _PaymentHo.FillSubExpenseType, userdata.token)

    },
    FillSubExpenseType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                // submodetype = response.data.queryResult.param3;
                jQuery("#subexpense").empty();
                jQuery("#subexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#subexpense").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#subexpense").empty();
                jQuery("#subexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
            }
        }
        else {

            jQuery("#subexpense").empty();
            jQuery("#subexpense").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _PaymentHo.GstpercentageType, userdata.token)

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



    TdsPerLoad: function () {
        //jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var input1 = jQuery("#tdsmaster").val();

        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "TDSPERLOAD",
            "inptvar1": input1,
            "inptvar2": userdata.userId,
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _PaymentHo.TdsPercentageType, userdata.token)

    },
    TdsPercentageType: function (response) {
        if (response.status === "SUCCESS") {
            var val1 = response.data.queryResult[0].param1;
            jQuery("#tdsper").val(val1);

            var amnt = jQuery('#approvedamount').val();
            var tds = jQuery('#tdsper').val();
            jQuery('#tdsamnt').val(parseFloat(amnt) * parseFloat(tds) / 100);
            var gstamnt = jQuery('#gstamnt').val();
            var tdsamnt = jQuery('#tdsamnt').val();

            if (jQuery('#gst').is(':visible')) {

                jQuery('#totamnt').val((parseFloat(amnt) + parseFloat(gstamnt)) - parseFloat(tdsamnt));

            }
            else {

                jQuery('#totamnt').val(parseFloat(amnt) - parseFloat(tdsamnt));

            }

            jQuery('.page-loader-wrapper').hide();
        }
        else {
            swal("Invalid TDS option");
            return false;
        }

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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _PaymentHo.TdsMasterType, userdata.token)

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


    paymentsearchfill: function () {
        jQuery(".page-loader-wrapper").show();
        var Str = "";
        var GetSuspenseIddata = {
            "flag1": "SUSPENSEHOAPPROVAL",
            "flag2": "SUSPENSEID",
            "inptvar1": userdata.userId,
            "inptvar2": Str
        };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetSuspenseIddata, _PaymentHo.PaymentSearchLoadCompleted, userdata.token)
    },

    PaymentSearchLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                jQuery("#rqstsearchngpymnt").empty();
                jQuery("#rqstsearchngpymnt").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#rqstsearchngpymnt").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });


            }
            else {
                jQuery("#rqstsearchngpymnt").empty();
                jQuery("#rqstsearchngpymnt").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
            }

        }
        else {
            jQuery("#rqstsearchngpymnt").empty();
            jQuery("#rqstsearchngpymnt").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
        }

    },

    showpaymentdetailstable: function (requestid) {

        var Str = "";
        var GetRequestedDetailData = {
            "flag1": "SUSPENSEHOAPPROVAL",
            "flag2": "SUSPENSEDETAIL",
            "inptvar1": requestid,
            "inptvar2": Str

        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetRequestedDetailData, _PaymentHo.FillRequestedDetail, userdata.token)

    },
    FillRequestedDetail: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                var data1 = response.data.queryResult[0].param1;
                var data2 = response.data.queryResult[0].param2;
                var tot = data1.split("#")[0];
                var dt = data2.split("#")[1];
                jQuery("#advancepaymentcard").show();
                var data = data1.split("#");

                jQuery("#Purpose").val(data[0]);
                jQuery("#Employee").val(data[1]);
                jQuery("#Description").val(data[3]);
                jQuery("#Amount").val(data[4]);
                jQuery("#Date").val(data2);
                jQuery("#IFSC").val(data[5]);
                jQuery("#accno").val(data[6]);
                jQuery("#Branch").val(data[2]);

                var gst = data[7];
                var tds = data[8];

                jQuery("#approvedamount").val(data[4]);
                jQuery("#totamnt").val(data[4]);

                //jQuery("#Receivedamnt").val('0');
                //jQuery("#Balanceamnt").val('0');

                //var $row = jQuery('<tr/>');
                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[0]));

                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[1].toUpperCase()));
                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[3].toUpperCase()));
                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[4]));
                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data2));
                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[2].toUpperCase()));
                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));
                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));
                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));               
                //jQuery('#tblpaymentadvncdetails').append($row);

                requestededamount = data[4];


                if (gst == 1) {

                    jQuery("#gstpershow").show();
                    jQuery("#gstamntshow").show();
                    jQuery("#gstnum").show();
                    jQuery("#gstvendor").show();

                }
                if (gst == 0) {

                    jQuery("#gstpershow").hide();
                    jQuery("#gstamntshow").hide();
                    jQuery("#gstnum").hide();
                    jQuery("#gstvendor").hide();
                }

                if (tds == 1) {

                    jQuery("#tdsshow").show();
                    jQuery("#tdspershow").show();
                    jQuery("#tdsamntshow").show();

                }
                if (tds == 0) {

                    jQuery("#tdsshow").hide();
                    jQuery("#tdspershow").hide();
                    jQuery("#tdsamntshow").hide();

                }
                //if (tds == 0 && gst== 0) {

                //    jQuery("#totamnt").val(data[4]);
                //}

                jQuery("#viewdetails").show();
                jQuery("#apamount").show();
                jQuery("#amountcnfm").show();
                jQuery("#btnpayment").show();
                jQuery("#btnext").show();
                jQuery("#viewapproval1").show();

              
             
            }
            else {
            }

            jQuery('.page-loader-wrapper').hide();


        }
    },



    viewBillDocument: function (suspenseid) {
        var viewbill = {
            "recordingId": suspenseid,
            "collectionName": "SUSPENSEBILL",
            "fileType": "img",
            "editFlag": 0

        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/images", viewbill, _PaymentHo.FillBillDocument, userdata.token)

    },


    FillBillDocument: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('#ImageDivBill').empty();


            var count = jQuery.trim(response.data.imageData.length);
            var expid1 = jQuery.trim(response.data.advance_payment_id);
            jQuery('#ImageModelBill').modal('show');

            var i = 0;
            for (i = 0; i < count; i++) {
                jQuery('#ImageDivBill').append('<div><img height="700" width="700" src="data:image/jpeg;base64,' + response.data.imageData[i].imageString + '"/></div>');
            }



        }
        else {
            swal("Error", "Somthing went wrong", "error");
        }



    },




    viewDocument: function (suspenseid) {
        var viewapproval = {
            "recordingId": suspenseid,
            "collectionName": "SUSPENSEFILE",
            "fileType": "img",
            "editFlag": 0

        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/images", viewapproval, _PaymentHo.FillDocument, userdata.token)

    },


    FillDocument: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('#ImageDiv').empty();


            var count = jQuery.trim(response.data.imageData.length);
            var expid1 = jQuery.trim(response.data.advance_payment_id);
            jQuery('#ImageModel').modal('show');

            var i = 0;
            for (i = 0; i < count; i++) {
            jQuery('#ImageDiv').append('<div><img height="700" width="700" src="data:image/jpeg;base64,' + response.data.imageData[i].imageString + '"/></div>');
            }



        }
        else {
            swal("Error", "Somthing went wrong", "error");
        }



    },
    aprovalconfirm: function (approvedamount) {
        //jQuery('.page-loader-wrapper').show();
        var st = 1;
        var suspenseid = jQuery("#rqstsearchngpymnt").val();
        var expense = jQuery("#expense").val();
        var subexpense = jQuery("#subexpense").val();
        var sub = subexpense.split('~');
        var subexp = sub[0];
        var gstamnt = jQuery("#gstamnt").val();
        var tdsamnt = jQuery("#tdsamnt").val();
        var total = jQuery("#totamnt").val();
        var paymnt = jQuery("#paymode").val();
        var Receiver = jQuery("#Receiver").val();
        var Vendors = jQuery("#Vendors").val();
        var gstVendor = jQuery("#vendor").val();
        var gstnum = jQuery("#gst").val();
        var Branches = jQuery('#Branches').val();
        var tds = jQuery('#tdsmaster').val();



        var str = jQuery("#approvedamount").val() + "@@" + st + "@@" + suspenseid + "@@" + expense + "@@" + subexp + "@@" + gstamnt + "@@" + tdsamnt + "@@" + total + "@@" + paymnt + "@@" + Receiver + "@@" + Vendors + "@@" + gstVendor + "@@" + gstnum + '@@' + Branches + '@@' + tds;
        var aprovalconfirmData = {
            "flag1": "SUSPENSEHOAPPROVAL",
            "flag2": "CONFIRM",
            "inptvar1": userdata.userId + "!!" + userdata.branchId,
            "inptvar2": str,


        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", aprovalconfirmData, _PaymentHo.aprovalconfirmLoadCompleted, userdata.token)
    },

    aprovalconfirmLoadCompleted: function (response) {
        //jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            suspenseid = jQuery.trim(response.data.advance_payment_id);
           


            //swal(response.data.message, "Approval confirmed.....!", "success");
           
            swal({
                title: "success",
                text: "Approved.....!"  ,
                type: "success"
            },
                function () {
                    window.location.reload(true);
                });
        }

        else {

            swal(response.responseMsg, "", "error");

        }

    },
    paymentclear: function () {
        jQuery('#rqstsearchngpymnt').val('');
        jQuery("#morepymntsrch").prop("disabled", false);
       // jQuery('#advancepaymentcard').val(0);
       // jQuery('#advancepaymentcard').hide();
        jQuery('#approvedamount').val(0);
        jQuery('#apamount').hide();
        jQuery('#viewapproval1').hide();
        jQuery('#ImageModel').val('');
        jQuery('#remittingamount').val(0);
        jQuery('#confirmamount').val(0);
        jQuery('#btnpayment').hide();
        jQuery('#cnfmamnt').hide();
        jQuery('#btnext').hide();
    },


    compareAmount1: function () {

        approvedamount = jQuery("#approvedamount").val();
        remittingamount = jQuery("#remittingamount").val();
        if (approvedamount == remittingamount) {
            jQuery('#remittingamount').removeClass('is-invalid ');
            jQuery('#remittingamount').addClass('is-valid form-control-success');
            jQuery('#lbremittingamount').hide();
            jQuery("#confirm").prop("disabled", false);

        }
        else {
            jQuery('#lbremittingamount').show();
            jQuery('#remittingamount').removeClass('is-valid form-control-success');
            jQuery('#remittingamount').addClass('is-invalid ');
            jQuery("#confirm").prop("disabled", true);


        }
    },

    compareAmount: function () {

        remittingamount = jQuery("#remittingamount").val();
        confirmamount = jQuery("#confirmamount").val();
        if (remittingamount == confirmamount) {
            jQuery('#confirmamount').removeClass('is-invalid ');
            jQuery('#confirmamount').addClass('is-valid form-control-success');
            jQuery('#lbconfirmamount').hide();
            jQuery("#confirm").prop("disabled", false);

        }
        else {
            jQuery('#lbconfirmamount').show();
            jQuery('#confirmamount').removeClass('is-valid form-control-success');
            jQuery('#confirmamount').addClass('is-invalid ');
            jQuery("#confirm").prop("disabled", true);


        }
    },

    compareAmount2: function () {

        approvedamount = jQuery("#approvedamount").val();
        confirmamount = jQuery("#confirmamount").val();
        if (approvedamount == confirmamount) {
            jQuery('#confirmamount').removeClass('is-invalid ');
            jQuery('#confirmamount').addClass('is-valid form-control-success');
            jQuery('#lbconfirmamount').hide();
            jQuery("#confirm").prop("disabled", false);

        }
        else {
            jQuery('#lbconfirmamount').show();
            jQuery('#confirmamount').removeClass('is-valid form-control-success');
            jQuery('#confirmamount').addClass('is-invalid ');
            jQuery("#confirm").prop("disabled", true);


        }
    },

    changebranchsearchfill: function () {
        jQuery(".page-loader-wrapper").show();
        var Str = "";
        var GetbranchIddata = {
            "flag1": "CHANGEBRANCH",
            "flag2": "SUSPENSEID",
            "inptvar1": "",
            "inptvar2": Str
        };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetbranchIddata, _PaymentHo.changebranchSearchLoadCompleted, userdata.token)
    },

    changebranchSearchLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                jQuery("#rqstsearchngbrnch").empty();
                jQuery("#rqstsearchngbrnch").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#rqstsearchngbrnch").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });


            }
            else {
                jQuery("#rqstsearchngbrnch").empty();
                jQuery("#rqstsearchngbrnch").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
            }

        }
        else {
            jQuery("#rqstsearchngbrnch").empty();
            jQuery("#rqstsearchngbrnch").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
        }
    },

    showchngebranchdetailstable: function (requestid) {

        var Str = "";
        var GetbranchDetailData = {
            "flag1": "CHANGEBRANCH",
            "flag2": "SUSPENSEIDDETAIL",
            "inptvar1": requestid,
            "inptvar2": Str

        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetbranchDetailData, _PaymentHo.FillchangebranchDetail, userdata.token)

    },
    FillchangebranchDetail: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                var data1 = response.data.queryResult[0].param1;
                var data2 = response.data.queryResult[0].param2;
                var tot = data1.split("#")[0];
                var dt = data2.split("#")[1];
                jQuery("#advancebrnchcard").show();
                var data = data1.split("#");
                var data3= data2.split("#");

                var $row = jQuery('<tr/>');
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[1]));

                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[3].toUpperCase()));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[2].toUpperCase()));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[0]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[3]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[4].toUpperCase()));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[1]))
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));

                jQuery('#brnchAdvancedetails').append($row);
                state = data3[3];
                jQuery("#state").val(state);

                jQuery("#brnchtype").show();
                jQuery("#entrbrnch").show();
               
               
            }
            else {
            }

            jQuery('.page-loader-wrapper').hide();


        }
    },

    branchtypesearchfill: function () {
        //jQuery(".page-loader-wrapper").show();
        suspenseid = jQuery("#rqstsearchngbrnch").val();

        var Str = suspenseid;
        var Getbranchtypedata = {
            "flag1": "CHANGEBRANCH",
            "flag2": "CHANGEBRANCHTYPE",
            "inptvar1": Str,
            "inptvar2": ""
        };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", Getbranchtypedata, _PaymentHo.branchtypeLoadCompleted, userdata.token)
    },

    branchtypeLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                jQuery("#brnchtp").empty();
                jQuery("#brnchtp").append(jQuery("<option></option>").val("0").text("Select branch type"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#brnchtp").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                 

                });
                        

            }
            else {
                jQuery("#brnchtp").empty();
                jQuery("#brnchtp").append(jQuery("<option></option>").val("0").text("Select branch type"));
            }

        }
        else {
            jQuery("#brnchtp").empty();
            jQuery("#brnchtp").append(jQuery("<option></option>").val("0").text("Select branch type"));
        }
    },


    branchnamesearchfill: function () {
        //jQuery(".page-loader-wrapper").show();
      var branchtype = jQuery("#brnchtp").val();
        var suspenseid = jQuery("#rqstsearchngbrnch").val();

      
        var Getbranchnamedata = {
            "flag1": "CHANGEBRANCH",
            "flag2": "CHANGEBRANCHNAME",
            "inptvar1": suspenseid,
            "inptvar2": branchtype
        };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", Getbranchnamedata, _PaymentHo.branchnameLoadCompleted, userdata.token)
    },

    branchnameLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                jQuery("#brnchname").empty();
                jQuery("#brnchname").append(jQuery("<option></option>").val("0").text("Select branch name"));
                jQuery.each(response.data.queryResult, function (i,val) {
                    jQuery("#brnchname").append(jQuery("<option></option>").val(val.param1).text(val.param2));

                    //var data1 = response.data.queryResult[0].param3;
                    //var tot = data1.split("#")[0];
                    //var data2 = data1.split("#");

                    //branchhead = data2[1];
                    //jQuery("#branchhead").val(branchhead);
                });


            }
            else {
                jQuery("#brnchname").empty();
                jQuery("#brnchname").append(jQuery("<option></option>").val("0").text("Select branch name"));
            }

        }
        else {
            jQuery("#brnchname").empty();
            jQuery("#brnchname").append(jQuery("<option></option>").val("0").text("Select branch name"));
        }
    },

    branchheadLoad: function () {
        var branchtype = jQuery("#brnchtp").val();
        var branchid = jQuery("#brnchname").val();

        suspenseid = jQuery("#rqstsearchngbrnch").val();

        var Str = suspenseid;
        var Getbranchheaddata = {
            "flag1": "CHANGEBRANCH",
            "flag2": "BHNAMELOAD",
            "inptvar1": branchtype ,
            "inptvar2": branchid
        };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", Getbranchheaddata, _PaymentHo.branchheadloadCompleted, userdata.token)
    },

    branchheadloadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            var data1 = response.data.queryResult[0].param3;
            var tot = data1.split("#")[0];
            var data = data1.split("#");
            var bh = data[1];
            jQuery('#branchhead').val(bh);
            branchheadid = data[0];
        }
        else {

        }
    },

    changebranchconfirm: function (approvedamount) {
        

        var branchid = jQuery("#brnchname").val();
       
       
        var branchhead = branchheadid;
        var suspenseid = jQuery("#rqstsearchngbrnch").val();
        var str = branchid + "!!" + branchhead;
        var changebranchconfirmData = {
            "flag1": "CHANGEBRANCH",
            "flag2": "CONFIRM",
            "inptvar1": str,
            "inptvar2": suspenseid,


        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", changebranchconfirmData, _PaymentHo.changebranchconfirmLoadCompleted, userdata.token)
    },

    changebranchconfirmLoadCompleted: function (response) {
        //jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            /*suspenseid = jQuery.trim(response.data.advance_payment_id);*/



           swal(response.data.message, "branch changed successfully.....!", "success");


            _PaymentHo.changebranchclear()

            //function () {
            //    window.location.reload(true);
            //});
        }

        else {

            swal(response.responseMsg, "", "error");

        }

    },

    changebranchclear: function () {
        jQuery('#rqstsearchngbrnch').val('');
        jQuery("#morechngbrnch").prop("disabled", false);
        jQuery('#brnchAdvancedetails').val(0);
        jQuery('#brnchAdvancedetails').hide();
        jQuery('#state').val(0);
        jQuery('#brnchname').val(0);
        jQuery('#branchhead').val(0);
        jQuery('#brnchtype').hide(); 
        jQuery('#entrbrnch').hide(); 

    },

    cancelsearchfill: function () {
        jQuery(".page-loader-wrapper").show();
        var Str = "";
        var GetSuspensecancelIddata = {
            "flag1": "SUSPENSECANCEL",
            "flag2": "SUSPENSEID",
            "inptvar1": userdata.userId,
            "inptvar2": Str
        };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetSuspensecancelIddata, _PaymentHo.cancelSearchLoadCompleted, userdata.token)
    },

    cancelSearchLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                jQuery("#rqstsearchcncl").empty();
                jQuery("#rqstsearchcncl").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#rqstsearchcncl").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });


            }
            else {
                jQuery("#rqstsearchcncl").empty();
                jQuery("#rqstsearchcncl").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
            }

        }
        else {
            jQuery("#rqstsearchcncl").empty();
            jQuery("#rqstsearchcncl").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
        }

    },

    showcanceldetailstable: function (requestid1) {

        var Str = "";
        var GetcancelDetailData = {
            "flag1": "SUSPENSECANCEL",
            "flag2": "SUSPENSEIDDETAIL",
            "inptvar1": requestid1,
            "inptvar2": Str

        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetcancelDetailData, _PaymentHo.FillcancelDetail, userdata.token)

    },
    FillcancelDetail: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                var data1 = response.data.queryResult[0].param1;
                var data2 = response.data.queryResult[0].param2;
                var tot = data1.split("#")[0];
                var dt = data2.split("#")[1];
                jQuery("#advancecnclcard").show();
                var data = data1.split("#");
                var data3 = data2.split("#")
                var $row = jQuery('<tr/>');
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[1]));

                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[3].toUpperCase()));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[2].toUpperCase()));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[0]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[3]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[4]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[1]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));

                jQuery('#cnclAdvancedetails').append($row);

                jQuery("#remarks").show();
                jQuery("#cnclconfirm").show();
               
              

            }
            else {
            }

            jQuery('.page-loader-wrapper').hide();


        }
    },
    cancelconfirm: function () {
        jQuery('.page-loader-wrapper').show();
        var st = 2;
        var suspenseid = jQuery("#rqstsearchcncl").val();
        var str = jQuery("#approvedamount").val() + "!!" + st + "!!" + suspenseid;
        var cancelconfirmData = {
            "flag1": "SUSPENSECANCEL",
            "flag2": "CONFIRM",
            "inptvar1": str,
            "inptvar2": userdata.userId,


        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", cancelconfirmData, _PaymentHo.cancelconfirmLoadCompleted, userdata.token)
    },

    cancelconfirmLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            suspenseid = jQuery.trim(response.data.advance_payment_id);



            swal(response.data.message, "Cancel confirmed.....!", "success");

            _PaymentHo.cancelclear()



            //function () {
            //    window.location.reload(true);
            //});
        }

        else {

            swal(response.responseMsg, "", "error");
        }

    },

 }
    

jQuery(document).ready(function ($) {


    jQuery('#ratconfirm').click(function () {

        var ID = jQuery('#rqstsearch5').val();
        if (ID == 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please select your request..!", "warning");
        }
        else {
            _PaymentHo.Ratconfirm();
        }
        

    });


    jQuery('#moreRati').click(function () {
        var requestid5 = jQuery('#rqstsearch5').val();
        var susid = requestid5.split('>>');
        var suspense = susid[0];
        if (requestid5 == 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please select your request..!", "warning");
        }
        else {
            //jQuery("#moreRati").prop("disabled", true);
            jQuery('#ratAdvancedetails').empty();
            _PaymentHo.rattablefill(suspense);

        }

        //jQuery('#cnfimdamount').val('');
        //jQuery('#remarks1').val('');


    });
 

    //jQuery('#gstper').change(function () {

    //    var amnt = jQuery('#approvedamount').val();
    //    var gstamnt = jQuery('#gstamnt').val();
    //    //var tdsamnt = jQuery('#tdsamnt').val();
    //    jQuery('#totamnt').val((parseFloat(amnt) + parseFloat(gstamnt)));

    //});


    //jQuery('#tdsamnt').change(function () {

    //    var amnt = jQuery('#approvedamount').val();
    //    var gstamnt = jQuery('#gstamnt').val();
    //    var tdsamnt = jQuery('#tdsamnt').val();
    //    jQuery('#totamnt').val((parseFloat(amnt) + parseFloat(gstamnt)) - parseFloat(tdsamnt));

    //});

    jQuery('#vouchershow').click(function () {

        _PaymentHo.ViewDataApproval();
    });


    jQuery('#ddlBranch').change(function () {

        var brid = jQuery('#ddlBranch').val();
        _PaymentHo.VoucherSearchFill(brid);
    });

    jQuery('#ddlBranchnew').change(function () {

        var brid = jQuery('#ddlBranchnew').val();
        _PaymentHo.RatifySearchFill(brid);
    });


    jQuery('#voucherLink').click(function () {

        jQuery("#ddlBranch").val(0);
        //jQuery("#rqstsearch4").val("0");
        $('#rqstsearch4').find('option:not(:first)').remove();

        _PaymentHo.VoucherBranchFill()
    });


    jQuery('#RatifyLink').click(function () {

        jQuery("#ddlBranchnew").val(0);
        jQuery("#advanceratcard").hide();
        jQuery("#viewBill").hide();
        jQuery("#btnratify").hide();

        //jQuery("#rqstsearch4").val("0");
        $('#rqstsearch5').find('option:not(:first)').remove();

        _PaymentHo.RatifyBranchFill()
    });


    jQuery('#gst').change(function () {

        _PaymentHo.GetGSTREQ();
    });


    jQuery('#Receiver').change(function () {

        var recvr = jQuery('#Receiver').val();

        if (recvr == 'Vendor') {

            jQuery('#branchname').hide();
            jQuery('#vendorname').show();
            _PaymentHo.VendorLoad();
            
        }
        if (recvr == 'Branch') {
            jQuery('#vendorname').hide();
            jQuery('#branchname').show();
            jQuery('#branchname').val(0);
            _PaymentHo.BranchLoad();

        }

         if (recvr == 'Employee') {
             jQuery('#vendorname').hide();
             jQuery('#branchname').hide();
        }
        
    });

    jQuery('#approvedamount').change(function () {

        jQuery('#gstper').val(0);
        jQuery('#gstamnt').val('');
        jQuery('#tdsmaster').val(0);
        jQuery('#tdsper').val('');
        jQuery('#tdsamnt').val('');
        var req = jQuery('#Amount').val();
        var apprv = jQuery('#approvedamount').val();

        if ( parseFloat(apprv) > parseFloat(req)) {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Approved amount cannot be greater than requested amount..!", "warning");
            jQuery('#approvedamount').val('');
            jQuery('#totamnt').val('');
        }
        else
        jQuery('#totamnt').val(apprv);

    });


    jQuery('#tdsmaster').change(function () {

        if (jQuery('#gst').is(':visible')) {
            gstper = jQuery('#gstper').val();
            if (gstper == '0') {
                jQuery('.page-loader-wrapper').hide();
                swal("Error", "Please select GST Percentage..!", "warning");
                jQuery('#tdsmaster').val('0');
                jQuery('#tdsper').val('');
                jQuery('#tdsamnt').val('');

            }
        }
        if (jQuery('#tdsmaster').val() == '0') {
        
            jQuery('#tdsper').val('');
            jQuery('#tdsamnt').val('');
            jQuery('#totamnt').val('');

            var amnt = jQuery('#approvedamount').val();
            var tds = jQuery('#tdsper').val();
            var gstamnt = jQuery('#gstamnt').val();
            //var tdsamnt = jQuery('#tdsamnt').val();
            //jQuery('#tdsamnt').val(parseFloat(amnt) * parseFloat(tds) / 100);

            if (jQuery('#gst').is(':visible')) {

                jQuery('#totamnt').val((parseFloat(amnt) + parseFloat(gstamnt)));

            }
          
        }
        else {
            _PaymentHo.TdsPerLoad();
        }
     
     
    });

    jQuery('#expense').change(function () {
        var val = jQuery('#expense').val();
        _PaymentHo.SubExpenseLoad(val);
    });

    jQuery('#gstper').change(function () {

        var amnt = jQuery('#approvedamount').val();
        var gst = jQuery('#gstper').val();
        var tdsamnt = jQuery('#tdsamnt').val();

        if (tdsamnt == '') {

            jQuery('#gstamnt').val(parseFloat(amnt) * parseFloat(gst) / 100);
            var gstamnt = jQuery('#gstamnt').val();
            jQuery('#totamnt').val((parseFloat(amnt) + parseFloat(gstamnt)));
        }
        else {

            jQuery('#gstamnt').val(parseFloat(amnt) * parseFloat(gst) / 100);
            var gstamnt = jQuery('#gstamnt').val();
            var tdsamnt = jQuery('#tdsamnt').val();
            jQuery('#totamnt').val((parseFloat(amnt) + parseFloat(gstamnt) - parseFloat(tdsamnt)));
        }

    });


    jQuery('#confirm').click(function () {

        approvedamount = jQuery('#approvedamount').val(),       
        remittingamount = jQuery('#remittingamount').val(),
            confirmamount = jQuery('#confirmamount').val(),
            gst = jQuery('#gst').val(),
            expense = jQuery('#expense').val(),
            subexpense = jQuery('#subexpense').val(),
            gstper = jQuery('#gstper').val(),
            tdsmaster = jQuery('#tdsmaster').val(),
            paymode = jQuery('#paymode').val(),
            Receiver = jQuery('#Receiver').val(),
            Vendors = jQuery('#Vendors').val(),
            Branches = jQuery('#Branches').val(),
            totamnt = jQuery('#totamnt').val()



        if (approvedamount == 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter the approved amount..!", "warning");
            return
        }
         if (remittingamount == 0) {
            jQuery('.page-loader-wrapper').hide();
             swal("Error", "Please enter the remmited amount..!", "warning");
             return
        }

        if (jQuery('#gst').is(':visible')) {

            if (gst == 0) {
                jQuery('.page-loader-wrapper').hide();
                swal("Error", "Please enter the GST number..!", "warning");
                return
            }
        }
        //if (gst == 0) {
        //    jQuery('.page-loader-wrapper').hide();
        //    swal("Error", "Please enter the GST number..!", "warning");
        //    return
        //}
         if (expense == 0) {
            jQuery('.page-loader-wrapper').hide();
             swal("Error", "Please select expense..!", "warning");
             return
        }
         if (subexpense == 0) {
            jQuery('.page-loader-wrapper').hide();
             swal("Error", "Please select sub expense..!", "warning");
             return
        }

        if (jQuery('#gstper').is(':visible')) {

            if (gstper == 0) {
                jQuery('.page-loader-wrapper').hide();
                swal("Error", "Please select GST Percentage..!", "warning");
                return
            }
        }
        //if (!jQuery('#tdsmaster').is(':visible')) {
        //    // The text box is hidden, skip validation
        //    return;
        //}

        if (jQuery('#tdsmaster').is(':visible')) {
            if (tdsmaster == 0) {
                jQuery('.page-loader-wrapper').hide();
                swal("Error", "Please select TDS..!", "warning");
                return
            }
        }



         

         if (paymode == 0) {
            jQuery('.page-loader-wrapper').hide();
             swal("Error", "Please select payment mode..!", "warning");
             return
        }

         if (Receiver == 0) {
            jQuery('.page-loader-wrapper').hide();
             swal("Error", "Please select payment receiver..!", "warning");
             return
        }
         if (Receiver == 'Vendor') {
            if (Vendors == 0) {
                jQuery('.page-loader-wrapper').hide();
                swal("Error", "Please select vendor..!", "warning");
                return
            }
           
        }

        if (Receiver == 'Branch') {
            if (Branches == 0) {
                jQuery('.page-loader-wrapper').hide();
                swal("Error", "Please select Branch..!", "warning");
                return
            }

        }

        if (paymode == 'Cash') {
            if (totamnt > 20000) {
                jQuery('.page-loader-wrapper').hide();
                swal("Error", "In the cash payment mode amount must be less than 20000 ..!", "warning");
                return
            }
        }

            _PaymentHo.aprovalconfirm(approvedamount);
      

 

});
   

    jQuery('#morepymntsrch').click(function () {
    var requestid = jQuery('#rqstsearchngpymnt').val();
        if (requestid == 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please select your request..!", "warning");
        }

        else {
            jQuery("#morepymntsrch").prop("disabled", true);


            _PaymentHo.showpaymentdetailstable(requestid);
            _PaymentHo.GstperLoad();
            _PaymentHo.TdsMasterLoad();
            _PaymentHo.ExpenseLoad();
            jQuery('#paymentAdvancedetails').empty();

            jQuery('#gst').val('');
            jQuery('#vendor').val('');
            jQuery('#approvedamount').val('');
            $('#subexpense').find('option:not(:first)').remove();
            jQuery('#gstamnt').val('');
            jQuery('#tdsper').val('');
            jQuery('#tdsamnt').val('');
            jQuery('#paymode').val('0');
            jQuery('#Receiver').val('0');
            jQuery('#vendorname').hide();

            jQuery('#ImageModel').val('');
            jQuery('#remittingamount').val('');
            jQuery('#confirmamount').val('');
        }

});


  

    jQuery('#morechngbrnch').click(function () {
        var requestid = jQuery('#rqstsearchngbrnch').val();
        if (requestid == 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please select your request..!", "warning");
        }

        else {
            jQuery("#morechngbrnch").prop("disabled", true);


        }

        _PaymentHo.showchngebranchdetailstable(requestid)
        _PaymentHo.branchtypesearchfill();
        jQuery('#brnchAdvancedetails').empty();
        jQuery('#brnchtp').val('');
        jQuery('#state').val('');
        jQuery('#brnchname').val('');
        jQuery('#branchhead').val('');
    });

jQuery('#viewapproval').click(function (e) {
    var suspenseid= jQuery('#rqstsearchngpymnt').val();
  
    _PaymentHo.viewDocument(suspenseid);
});

    jQuery('#viewBill').click(function (e) {
        var suspenseid = jQuery('#rqstsearch5').val();
        var susdtl = suspenseid.split('>>');
        var susid = susdtl[0];
        _PaymentHo.viewBillDocument(susid);
    });

document.getElementById("exit").onclick = function () {
    location.href = "Dashboard";
};

    jQuery("#confirmamount").keyup(function () {

        _PaymentHo.compareAmount();
    });


    jQuery("#remittingamount").keyup(function () {

        _PaymentHo.compareAmount1();


    });



   jQuery('#morecncl').click(function () {
    var requestid1 = jQuery('#rqstsearchcncl').val();
       if (requestid1 == 0) {
           jQuery('.page-loader-wrapper').hide();
           swal("Error", "Please select your request..!", "warning");
       }
       else {
           jQuery("#morecncl").prop("disabled", true);


       }
       _PaymentHo.showcanceldetailstable(requestid1)
       jQuery('#cnclAdvancedetails').empty();
       jQuery('#cnclremarks').val('');
   });

    jQuery('#cnclconfirm').click(function () {
        remarks = jQuery('#cnclremarks').val()
        if (remarks == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter Remarks..!", "warning");
        }
        else {
            _PaymentHo.cancelconfirm();

        }
    });


    //jQuery('#rqstsearchngpymnt').change(function () {

    //    jQuery("#morechngbrnch").prop("disabled", false);
    //});

    //jQuery('#rqstsearchngbrnch').change(function () {

    //    jQuery("#morechngbrnch").prop("disabled", false);
    //});


    //jQuery('#rqstsearchcncl').change(function () {

    //    jQuery("#morecncl").prop("disabled", false);
    //});

    jQuery('#paymentsLink').click(function () {

        jQuery('#viewdetails').hide();
        jQuery('#apamount').hide();
        jQuery('#btnext').hide();
        jQuery('#vendorname').hide();


        jQuery('#Purpose').val('');
        jQuery('#Employee').val('');
        jQuery('#Description').val('');
        jQuery('#Amount').val('');
        jQuery('#Date').val('');
        jQuery('#Branch').val('');
        jQuery('#IFSC').val('');
        jQuery('#accno').val('');
        jQuery('#expense').val('0');
        $('#subexpense').find('option:not(:first)').remove();
        jQuery('#approvedamount').val('');
        jQuery('#gstper').val('0');
        jQuery('#gstamnt').val('');
        jQuery('#tdsmaster').val('0');
        jQuery('#tdsper').val('');
        jQuery('#tdsamnt').val('');
        jQuery('#totamnt').val('');
        jQuery('#paymode').val(0);
        jQuery('#Receiver').val(0);
        jQuery('#Vendors').val(0);


        _PaymentHo.paymentsearchfill();

    });

    _PaymentHo.cancelsearchfill();
    _PaymentHo.changebranchsearchfill();


    jQuery('#brnchtp').change(function () {
        
        _PaymentHo.branchnamesearchfill();

    });

    jQuery('#brnchname').change(function () {

        _PaymentHo.branchheadLoad();



    });



    jQuery('#confirm1').click(function () {
       var  type = jQuery('#brnchtp').val();
       var  name = jQuery('#brnchname').val();

        if (type == 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please select branch type..!", "warning");
        }

        if (name == 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please select branch name..!", "warning");
        }
        _PaymentHo.changebranchconfirm();
        jQuery("#morechngbrnch").prop("disabled", true);

    });

    jQuery('#rqstsearchngpymnt').change(function () {

        jQuery("#morepymntsrch").prop("disabled", false);
    });

    jQuery('#rqstsearchngbrnch').change(function () {

        jQuery("#morechngbrnch").prop("disabled", false);
    });

    jQuery('#rqstsearch1').change(function () {

        jQuery("#more").prop("disabled", false);
    });
    
    
});




