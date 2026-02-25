
var a = 0;
var recievedamount;
var _suspensepayment = {



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

            _suspensepayment.testpdf(jQuery("#VoucherPrinteView"));

         
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

        Getvoucehrdata = JSON.stringify(Getvoucehrdata);
        Getvoucehrdata = { "encryptedRqstStr": EncryptAPIReq(Getvoucehrdata) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", Getvoucehrdata, _suspensepayment.VoucherLoadCompleted, userdata.token)
    },

    VoucherLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
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

    VoucherBranchFill: function () {
        jQuery(".page-loader-wrapper").show();
        var Str = "";
        var Getbankdata = {
            "flag1": "SUSPENSEVOUCHER",
            "flag2": "BRANCH",
            "inptvar1": userdata.userId,
            "inptvar2": Str
        };

        Getbankdata = JSON.stringify(Getbankdata);
        Getbankdata = { "encryptedRqstStr": EncryptAPIReq(Getbankdata) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", Getbankdata, _suspensepayment.BranchLoadCompleted, userdata.token)
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

    MoneyReturnConfirm: function () {
        jQuery('.page-loader-wrapper').show();

        var suspenseid = jQuery('#rqstsearch3').val();
        var balance = jQuery('#balamnt').val();

        var moneyconfirmdata = {
            "flag1": "MONEYTRANSFER",
            "flag2": "MONEYTRANSFERBILLCONFIRM",
            "inptvar1": suspenseid + '!!' + userdata.userId + '!!' + userdata.branchId,
            "inptvar2": balance

        }
        moneyconfirmdata = JSON.stringify(moneyconfirmdata);
        moneyconfirmdata = { "encryptedRqstStr": EncryptAPIReq(moneyconfirmdata) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", moneyconfirmdata, _suspensepayment.moneyconfirmDetail, userdata.token)

    },

    moneyconfirmDetail: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            swal({
                title:"success",
                text: "money returned succesfully",
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


    moneysearchfill: function () {
        jQuery(".page-loader-wrapper").show();
        var Str = "";
        var Getmoneydata = {
            "flag1": "MONEYTRANSFER",
            "flag2": "SUSPENSEID",
            "inptvar1": userdata.userId,
            "inptvar2": Str
        };

        Getmoneydata = JSON.stringify(Getmoneydata);
        Getmoneydata = { "encryptedRqstStr": EncryptAPIReq(Getmoneydata) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", Getmoneydata, _suspensepayment.MoneyLoadCompleted, userdata.token)
    },

    MoneyLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {
                jQuery("#rqstsearch3").empty();
                jQuery("#rqstsearch3").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#rqstsearch3").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });


            }
            else {
                jQuery("#rqstsearch3").empty();
                jQuery("#rqstsearch3").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
            }

        }
        else {
            jQuery("#rqstsearch3").empty();
            jQuery("#rqstsearch3").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
        }

    },


    moneytablefill: function (requestid4) {

        var Str = "";
        var GetmoneytableData = {
            "flag1": "MONEYTRANSFER",
            "flag2": "MONEYTRANSFERBILLDETAIL",
            "inptvar1": requestid4,
            "inptvar2": Str

        }
        GetmoneytableData = JSON.stringify(GetmoneytableData);
        GetmoneytableData = { "encryptedRqstStr": EncryptAPIReq(GetmoneytableData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetmoneytableData, _suspensepayment.FillmoneytableDetail, userdata.token)

    },
    FillmoneytableDetail: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {
                var data1 = response.data.queryResult[0].param1;
                var data2 = response.data.queryResult[0].param2;
                var tot = data1.split("#")[0];
                var dt = data2.split("#")[1];
                jQuery("#suspensemoneycard").show();
                jQuery("#moneydetails").show();
                var data = data1.split("#");
                var data3 = data2.split("#");
                var $row = jQuery('<tr/>');
                $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data[1]));

                $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data[3].toUpperCase()));
                $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data[2].toUpperCase()));
                $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data3[0]));
                $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data3[3]));
                $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data[4].toUpperCase()));
                $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data3[1]));
                $row.append(jQuery('<td class="DCol" style="text-align:left;">').html(data3[4]));
                //$row.append(jQuery('<td class="DCol" style="text-align:left;">').text("0"));
                // $row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));
                jQuery('#tablertrndetails').append($row);

                jQuery('#recamnt').val(data3[4]);

                jQuery("#returnbutton").show();
                //jQuery("#cnfmdamnt").show();
                //// var confirmdamount = jQuery('#cnfimdamount').val();
                //recievedamount = data3[4];
                //// jQuery("#cnfmdamnt").val = html(data3[3]);
                //var confirmedamount = data3[1];
                //jQuery("#cnfimdamount").val(confirmedamount);
                //// jQuery("#cnfimdamount").val(response.data.confirmedamount );
                //jQuery("#Suspensereverse").show();

            }
            else {
            }

            jQuery('.page-loader-wrapper').hide();


        }
    },


    OriginalBillConfirm: function () {
        jQuery('.page-loader-wrapper').show();

        var suspenseid = jQuery('#rqstsearch2').val();
 
        var Billconfirmdata = {
            "flag1": "SUSPENSEBILL",
            "flag2": "SUSPENSEBILLCONFIRM",
            "inptvar1": suspenseid,
            "inptvar2": ''

        }
        Billconfirmdata = JSON.stringify(Billconfirmdata);
        Billconfirmdata = { "encryptedRqstStr": EncryptAPIReq(Billconfirmdata) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", Billconfirmdata, _suspensepayment.BillconfirmDetail, userdata.token)

    },

    BillconfirmDetail: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            //suspenseid = jQuery.trim(response.data.suspense_id);
            var suspenseid = jQuery('#rqstsearch2').val();

                _suspensepayment.uploadbillaprvl(suspenseid);
   
        }

        else {

            swal(response.responseMsg, "", "error");
        }

    },

    uploadbillaprvl: function (suspenseid) {

        var msg = "SUSPENSEBILL";
        {
            var SuspenseBillConfirmData = {
                "typeId": 0,
                "image": Strbase64, //imgtravelarray[i],
                "collectionName": msg,
                "fileName": msg,
                "recordingId": suspenseid,
                "imageType": "img"
            };
            SuspenseBillConfirmData = JSON.stringify(SuspenseBillConfirmData);
            SuspenseBillConfirmData = { "encryptedRqstStr": EncryptAPIReq(SuspenseBillConfirmData) };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/insertimage", SuspenseBillConfirmData, _suspensepayment.uploadOriginalBill, userdata.token)

        }
    },
    uploadOriginalBill: function (response) {
        if (response.status == "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            swal({
                title: "Success",
                text: "Bill Uploaded Successfully....",
                /*Approval ID is: " + suspenseid,*/
                type: "success"
            },

            function () {
                window.location.reload(true);
            });
        }

        else {
            swal("Error", "Not Uploaded", "error");
        }
    },


    billtablefill: function (requestid3) {

        var Str = "";
        var GetBilltableData = {
            "flag1": "SUSPENSEBILL",
            "flag2": "SUSPENSEBILLDETAIL",
            "inptvar1": requestid3,
            "inptvar2": Str

        }
        GetBilltableData = JSON.stringify(GetBilltableData);
        GetBilltableData = { "encryptedRqstStr": EncryptAPIReq(GetBilltableData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetBilltableData, _suspensepayment.FillBillableDetail, userdata.token)

    },
    FillBillableDetail: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {
                var data1 = response.data.queryResult[0].param1;
                var data2 = response.data.queryResult[0].param2;
                var tot = data1.split("#")[0];
                var dt = data2.split("#")[1];
                jQuery("#suspensebillcard").show();
                var data = data1.split("#");
                var data3 = data2.split("#");
                var $row = jQuery('<tr/>');
                $row.append(jQuery('<td class="BCol" style="text-align:left;">').html(data[1]));

                $row.append(jQuery('<td class="BCol" style="text-align:left;">').html(data[3].toUpperCase()));
                $row.append(jQuery('<td class="BCol" style="text-align:left;">').html(data[2].toUpperCase()));
                $row.append(jQuery('<td class="BCol" style="text-align:left;">').html(data3[0]));
                $row.append(jQuery('<td class="BCol" style="text-align:left;">').html(data3[3]));
                $row.append(jQuery('<td class="BCol" style="text-align:left;">').html(data[4].toUpperCase()));
                $row.append(jQuery('<td class="BCol" style="text-align:left;">').html(data3[1]));
                $row.append(jQuery('<td class="BCol" style="text-align:left;">').html(data3[4]));
                //$row.append(jQuery('<td class="BCol" style="text-align:left;">').text("0"));
                // $row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));
                jQuery('#tablebilldetails').append($row);


                jQuery("#billbutton").show();
                jQuery("#uploadbutton").show();
                //jQuery("#cnfmdamnt").show();
                //// var confirmdamount = jQuery('#cnfimdamount').val();
                //recievedamount = data3[4];
                //// jQuery("#cnfmdamnt").val = html(data3[3]);
                //var confirmedamount = data3[1];
                //jQuery("#cnfimdamount").val(confirmedamount);
                //// jQuery("#cnfimdamount").val(response.data.confirmedamount );
                //jQuery("#Suspensereverse").show();

            }
            else {
            }

            jQuery('.page-loader-wrapper').hide();


        }
    },



    billsearchfill: function () {
        jQuery(".page-loader-wrapper").show();
        var Str = "";
        var Getbilldata = {
            "flag1": "SUSPENSEBILL",
            "flag2": "SUSPENSEID",
            "inptvar1": userdata.userId,
            "inptvar2": Str
        };

        Getbilldata = JSON.stringify(Getbilldata);
        Getbilldata = { "encryptedRqstStr": EncryptAPIReq(Getbilldata) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", Getbilldata, _suspensepayment.BillLoadCompleted, userdata.token)
    },

    BillLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {
                jQuery("#rqstsearch2").empty();
                jQuery("#rqstsearch2").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#rqstsearch2").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });


            }
            else {
                jQuery("#rqstsearch2").empty();
                jQuery("#rqstsearch2").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
            }

        }
        else {
            jQuery("#rqstsearch2").empty();
            jQuery("#rqstsearch2").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
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

        _http.post(MFPUBLICKYCAPI_URL + "api/gst", GetGSTValue, _suspensepayment.FillGSTREQ, userdata.token)

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


    TdsMasterLoad: function () {
        //jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetExpenseTypeData = {
            "flag1": "LOADEXPENSE",
            "flag2": "TDSMASTERLOAD",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
        };
        GetExpenseTypeData = JSON.stringify(GetExpenseTypeData);
        GetExpenseTypeData = { "encryptedRqstStr": EncryptAPIReq(GetExpenseTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/hoexpense/hoexpenseQueries", GetExpenseTypeData, _suspensepayment.TdsMasterType, userdata.token)

    },
    TdsMasterType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                jQuery("#ddlTds").empty();
                jQuery("#ddlTds").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlTds").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlTds").empty();
                jQuery("#ddlTds").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS-------- "));
            }
        }
        else {

            jQuery("#ddlTds").empty();
            jQuery("#ddlTds").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS-------- "));
        }
        jQuery('.page-loader-wrapper').hide();

    },


    SuspenseRequestFill: function (purpose, description, amount,/* gst, vendor, tds,*/ GstVal, TdsVal) {
        jQuery('.page-loader-wrapper').show();
        var SuspensePaymentId;
        var SuspenseRequestData = {

            "user_id": userdata.userId,
            "branch_id": userdata.branchId,
            "purpose": purpose,
            "Description": description,
            "Amount": amount,
            "gst": gst,
            "vendor": vendor,
            "tds": tds,
            "flag1": GstVal + '!!' + TdsVal



        };
        SuspenseRequestData = JSON.stringify(SuspenseRequestData);
        SuspenseRequestData = { "encryptedRqstStr": EncryptAPIReq(SuspenseRequestData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/EmployeeSuspenseAdvanceInsert", SuspenseRequestData, _suspensepayment.SuspenseRequestFillLoadCompleted, userdata.token)
    },

    SuspenseRequestFillLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            suspenseid = jQuery.trim(response.data.suspense_id);
            _suspensepayment.uploadaprvl(suspenseid);
        


        //    swal(response.data.message, "", "success");

        }
        else {

            swal(response.responseMsg, "", "error");


        }



    },
    convertToBase64: function (img) {
        Strbase64 = "";
        DFILETYPE = "";
        var a = img;
        var selectedFile = document.getElementById(a).files;
        if (selectedFile.length > 0) {
            var sizeInKB = selectedFile[0].size / 1024;
            var sizeLimit = 200
            var fileToLoad = selectedFile[0];
            var fileReader = new FileReader();
            var base64;
            fileReader.readAsDataURL(fileToLoad);

            fileReader.onloadend = function (fileLoadedEvent) {
                base64 = fileLoadedEvent.target.result;
                if ((base64.toString().includes("data:image/jpeg;base64")) || (base64.toString().includes("data:image/img;base64")) || (base64.toString().includes("data:image/jpg;base64")) || (base64.toString().includes("data:image/png;base64"))) {
                    DFILETYPE = "IMG";
                }
                else {
                    swal("", "Please only upload Images..!", "warning");
                    jQuery('#uploadfile').val("");
                    jQuery('#uploadfile2').val("");
                    //jQuery('#foodlFile').val("");
                    //jQuery('#stayFile').val("");
                    return false;

                }
                Strbase64 = base64.toString().replace('data:application/pdf;base64,', '').replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');

            };
        }
        else {

            swal("", "Add Image..!", "warning");
            return false;
        }


    },
    compareAmount: function () {

        amount = jQuery("#amount").val();
        confirmamount = jQuery("#cnfmamount").val();
        if (amount === confirmamount) {
            jQuery('#cnfmamount').removeClass('is-invalid ');
            jQuery('#cnfmamount').addClass('is-valid form-control-success');
            jQuery("#save").prop("disabled", false);
            jQuery('#lbcnfmamount').hide();
        }
        else {
            jQuery('#lbcnfmamount').show();
            jQuery('#cnfmamount').removeClass('is-valid form-control-success');
            jQuery('#cnfmamount').addClass('is-invalid ');
            jQuery("#save").prop("disabled", true);

        }
    },


    uploadaprvl: function (suspenseid) {
        var msg = "SUSPENSEFILE";
       {
                var SuspenseConfirmData = {
                    "typeId": 0,
                    "image": Strbase64, //imgtravelarray[i],
                    "collectionName": msg,
                    "fileName": msg,
                    "recordingId": suspenseid,
                    "imageType": "img"
                };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/insertimage", SuspenseConfirmData, _suspensepayment.uploadaprvlfill, userdata.token)

       }
    },
     uploadaprvlfill: function (response) {
         if (response.status == "SUCCESS") {


             swal({
                 title: "Success",
                 text: "Requested Successfully....Suspense ID is  :" + suspenseid,
                 type: "success"
             },
                 function () {
                     window.location.reload(true);
                 });

         }

               

        //        _suspensepayment.requestclear()
        //}
        else {
            swal("Error", "Not Uploaded", "error");
        }
     },

    requestclear: function () {

        jQuery('#purpose').val("");
        jQuery('#description').val("");
        jQuery('#amount').val("");
        jQuery('#cnfmamount').val("");
        jQuery('#uploadfile').val("");

    },

    recievalsearchfill: function () {
        jQuery(".page-loader-wrapper").show();

        var Str = "";
        var GetRecievalIddata = {
            "flag1": "SUSPENSERECEIVAL",
            "flag2": "SUSPENSEID",
            "inptvar1": userdata.userId,
            "inptvar2": Str
        };

        GetRecievalIddata = JSON.stringify(GetRecievalIddata);
        GetRecievalIddata = { "encryptedRqstStr": EncryptAPIReq(GetRecievalIddata) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetRecievalIddata, _suspensepayment.SuspenseSearchLoadCompleted, userdata.token)
    },

    SuspenseSearchLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {
                jQuery("#rqstsearchngrcvl").empty();
                jQuery("#rqstsearchngrcvl").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#rqstsearchngrcvl").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });


            }
            else {
                jQuery("#rqstsearchngrcvl").empty();
                jQuery("#rqstsearchngrcvl").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
            }

        }
        else {
            jQuery("#rqstsearchngrcvl").empty();
            jQuery("#rqstsearchngrcvl").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
        }

    },

  
    recievaltablefill: function (requestid1) {

       

        var Str = "";
        var GetrcvlDetailData = {
            "flag1": "SUSPENSERECEIVAL",
            "flag2": "SUSPENSEIDDETAIL",
            "inptvar1": requestid1,
            "inptvar2": Str

        }
        GetrcvlDetailData = JSON.stringify(GetrcvlDetailData);
        GetrcvlDetailData = { "encryptedRqstStr": EncryptAPIReq(GetrcvlDetailData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetrcvlDetailData, _suspensepayment.FillrecivaltableDetail,userdata.token)

    },
    FillrecivaltableDetail: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {
                var data1 = response.data.queryResult[0].param1;
                var data2 = response.data.queryResult[0].param2;
                var tot = data1.split("#")[0];
                var dt = data2.split("#")[1];
                jQuery("#advancepaymentcard").show();
                var data = data1.split("#");
                var data3 = data2.split("#");

                jQuery("#PURPOSE").val(data[1]);
                jQuery("#EMPLOYEE").val(data[3]);
                jQuery("#DESCRIPTION").val(data[2]);
                jQuery("#Reqamnt").val(data3[0]);
                jQuery("#Reqdate").val(data3[3]);
                jQuery("#Branch").val(data[4]);
                jQuery("#Apprvdamount").val(data3[1]);
                //jQuery("#GSTamount").val(data3[4]);
                //jQuery("#TDSamount").val(data3[5]);
                jQuery("#totamount").val(data3[6]);
                jQuery("#Recvdamount").val('0');
                jQuery("#Balamount").val('0');
                jQuery("#paymode").val(data3[7]);

                var tdsflag = data3[8];
                var gstflag = data3[9];

                if (tdsflag == 1) {

                    jQuery("#tdsflag").show();
                    jQuery("#TDSamount").val(data3[5]);

                }
                if (gstflag == 1) {

                    jQuery("#gstflag").show();
                    jQuery("#GSTamount").val(data3[4]);

                }

                //var $row = jQuery('<tr/>');
                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[1]));

                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[3].toUpperCase()));
                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[2].toUpperCase()));
                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[0]));
                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[3]));
                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[4].toUpperCase()));
                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[1]));
                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));
                //$row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));
                ////$row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));
                //jQuery('#tblpaymentadvncdetails').append($row);
                
                jQuery("#cnfmdamnt").show();
               // var confirmdamount = jQuery('#cnfimdamount').val();
               
               // jQuery("#cnfmdamnt").val = html(data3[3]);
             
                var confirmedamount = data3[1]; 
                jQuery("#cnfimdamount").val(confirmedamount);
               // jQuery("#cnfimdamount").val(response.data.confirmedamount );
                jQuery("#btn1").show();
                jQuery("#remarks").show();
               
               

               
            }
            else {
            }

            jQuery('.page-loader-wrapper').hide();


        }
    },

    recievalconfirm: function () {
        var st = userdata.branchId;
        var Suspenseid = jQuery("#rqstsearchngrcvl").val();
        var str = jQuery('#remarks1').val() + "!!" + st + "!!" + Suspenseid;
      
        var Getconfirmdata = {
            "flag1": "SUSPENSERECEIVAL",
            "flag2": "CONFIRM",
            "inptvar1": str,
            "inptvar2": userdata.userId

        }
        Getconfirmdata = JSON.stringify(Getconfirmdata);
        Getconfirmdata = { "encryptedRqstStr": EncryptAPIReq(Getconfirmdata) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", Getconfirmdata, _suspensepayment.confirmDetail, userdata.token)

    },

    confirmDetail: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
           // suspenseid = jQuery.trim(response.data.advance_payment_id);
            //swal(response.data.message, "Recieval confirmed.....!", "success");
            
           
            swal({
                title: response.data.message,
                text: "Receival confirmed.....!",
                type: "success"
            },
                function () {
                    window.location.reload(true);
                });
            
            /*_suspensepayment.recievalclear();*/
          
        }

        else {

            swal(response.responseMsg, "", "error");
        }

    },
    //recievalclear: function () {
    //    jQuery('#rqstsearchngrcvl').val("");
    //    jQuery('#advancepaymentcard').val("");
    //    jQuery('#advancepaymentcard').hide();
    //    jQuery('#cnfimdamount').val("");
    //    jQuery('#remarks1').val("");
    //    jQuery('#cnfmdamnt').hide();
    //    jQuery('#advancepaymentcard').hide();

    //   // jQuery('#remarks').hide();
    //    //jQuery('#btn1').hide();
    //    jQuery("#morercvl").prop("disabled", false);


    //},
    reversalsearchfill: function () {
        jQuery(".page-loader-wrapper").show();
        var Str = "";
        var GetReversalIddata = {
            "flag1": "SUSPENSEREVERSAL",
            "flag2": "SUSPENSEID",
            "inptvar1": userdata.userId,
            "inptvar2": Str
        };

        GetReversalIddata = JSON.stringify(GetReversalIddata);
        GetReversalIddata = { "encryptedRqstStr": EncryptAPIReq(GetReversalIddata) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetReversalIddata, _suspensepayment.SuspenseReversalLoadCompleted, userdata.token)
    },

    SuspenseReversalLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {
                jQuery("#rqstsearch1").empty();
                jQuery("#rqstsearch1").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#rqstsearch1").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });


            }
            else {
                jQuery("#rqstsearch1").empty();
                jQuery("#rqstsearch1").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
            }

        }
        else {
            jQuery("#rqstsearch1").empty();
            jQuery("#rqstsearch1").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
        }

    },


    reversaltablesearchfill: function (requestid2) {



        var Str = "";
        var GetrvrsltableData = {
            "flag1": "SUSPENSEREVERSAL",
            "flag2": "REVERSALSUSPENSEIDDETAIL",
            "inptvar1": requestid2,
            "inptvar2": Str

        }
        GetrvrsltableData = JSON.stringify(GetrvrsltableData);
        GetrvrsltableData = { "encryptedRqstStr": EncryptAPIReq(GetrvrsltableData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetrvrsltableData, _suspensepayment.FillreversaltableDetail, userdata.token)

    },
    FillreversaltableDetail: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {
                var data1 = response.data.queryResult[0].param1;
                var data2 = response.data.queryResult[0].param2;
                var tot = data1.split("#")[0];
                var dt = data2.split("#")[1];
                jQuery("#suspensereversalcard").show();
                var data = data1.split("#");
                var data3 = data2.split("#");
                var $row = jQuery('<tr/>');
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[1]));

                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[3].toUpperCase()));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[2].toUpperCase()));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[0]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[3]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[4].toUpperCase()));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[1]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3[4]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));
               // $row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));
                jQuery('#tblpaymentreversaldetails').append($row);

                jQuery("#cnfmdamnt").show();
                // var confirmdamount = jQuery('#cnfimdamount').val();
                recievedamount = data3[4];
                // jQuery("#cnfmdamnt").val = html(data3[3]);
                var confirmedamount = data3[1];
                jQuery("#cnfimdamount").val(confirmedamount);
                // jQuery("#cnfimdamount").val(response.data.confirmedamount );
                jQuery("#Suspensereverse").show();

            }
            else {
            }

            jQuery('.page-loader-wrapper').hide();


        }
    },
    reversalconfirm: function (billfrom, billto, gstin, Totalamount, TotalGST, Grossamount, Balanceamount) {
        jQuery('.page-loader-wrapper').show();

        var st = userdata.branchId;
        var id = userdata.userId;
        var Suspenseid = jQuery("#rqstsearch1").val();
        var str = billfrom + "@@" + billto + "@@" + gstin + "@@" + Totalamount + "@@" + TotalGST +  "@@" + Balanceamount + "@@" + Suspenseid;

        var Reversalconfirmdata = {
            "flag1": "SUSPENSEREVERSAL",
            "flag2": "SUSPENSEREVERSALCONFIRM",
            "inptvar1": st + "!!" + id,
            "inptvar2": str

        }
        Reversalconfirmdata = JSON.stringify(Reversalconfirmdata);
        Reversalconfirmdata = { "encryptedRqstStr": EncryptAPIReq(Reversalconfirmdata) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", Reversalconfirmdata, _suspensepayment.reversalconfirmDetail, userdata.token)

    },

    reversalconfirmDetail: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            suspenseid = jQuery.trim(response.data.suspense_id);
            _suspensepayment.orginalupload(suspenseid);
            // suspenseid = jQuery.trim(response.data.advance_payment_id);
            swal(response.data.message, "Reversal confirmed.....!", "success");
            //function () {
            //    window.location.reload(true);
            //});
        }

        else {

            swal(response.responseMsg, "", "error");
        }

    },

    convertToBase64orginal: function (img) {
        Strbase64 = "";
        DFILETYPE = "";
        var a = img;
        var selectedFile = document.getElementById(a).files;
        if (selectedFile.length > 0) {
            var sizeInKB = selectedFile[0].size / 1024;
            var sizeLimit = 200
            var fileToLoad = selectedFile[0];
            var fileReader = new FileReader();
            var base64;
            fileReader.readAsDataURL(fileToLoad);

            fileReader.onloadend = function (fileLoadedEvent) {
                base64 = fileLoadedEvent.target.result;
                if ((base64.toString().includes("data:image/jpeg;base64")) || (base64.toString().includes("data:image/img;base64")) || (base64.toString().includes("data:image/jpg;base64")) || (base64.toString().includes("data:image/png;base64"))) {
                    DFILETYPE = "IMG";
                }
                else {
                    swal("", "Please only upload Images..!", "warning");
                    jQuery('#billupdate').val("");
                    //jQuery('#foodlFile').val("");
                    //jQuery('#stayFile').val("");
                    return false;

                }
                Strbase64 = base64.toString().replace('data:application/pdf;base64,', '').replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');

            };
        }
        else {

            swal("", "Add Image..!", "warning");
            return false;
        }


    },
    orginalupload: function (suspenseid) {
        var msg = "SUSPENSEORGINALBILL";
        {
            var Suspenseorginal = {
                "typeId": 0,
                "image": Strbase64, //imgtravelarray[i],
                "collectionName": msg,
                "fileName": msg,
                "recordingId": suspenseid,
                "imageType": "img"
            };

            Suspenseorginal = JSON.stringify(Suspenseorginal);
            Suspenseorginal = { "encryptedRqstStr": EncryptAPIReq(Suspenseorginal) };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/insertimage", Suspenseorginal, _suspensepayment.uploadorginalaprvlfill, userdata.token)

        }
    },
    uploadorginalaprvlfill: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            swal({
                title: "Success",
                text: "Orginal Bill Uploaded Successfully....",
                type: "success"
            });


                _suspensepayment.billclear()
                //function () {
                //    window.location.reload(true);
                //});
        }
        else {
            swal("Error", "Not Uploaded", "warning");
        }
    },

    billclear: function () {
        jQuery('#rqstsearch1').val("");
        jQuery('#suspensereversalcard').val("");
        jQuery('#suspensereversalcard').hide();
        jQuery('#suspensereversalcard').hide();
        jQuery('#Suspensereverse').hide();
        jQuery('#billfrom').val("");
        jQuery('#billto').val("");
        jQuery('#gstin').val("");
        jQuery('#vendorname').val("");
        jQuery('#vendoraddress').val("");
        jQuery('#totalamount').val("");
        jQuery('#totalgst').val("");
        jQuery('#grossamount').val("");
        jQuery('#balanceamount').val("");
        jQuery('#billupdate').val("");
        jQuery('#billdetails').hide();
        jQuery('#billdetailsbtn').hide();
        //jQuery('#cnfmdamnt').hide();

        jQuery("#more").prop("disabled", false);

    },

    GetGST: function () {
        jQuery('.page-loader-wrapper').show();
        jQuery('#gstin-error').hide();
        var val = jQuery('#gstin').val().toUpperCase();
        gststate = parseInt(val.substring(0, 2));
        var GetGSTValue = {
            "gstin": val,
            "consent": "Y",
            "consent_text": "I hereby declare my consent agreement for verifying my data to Asirvad company",
            "firmId": "3",
            "empId": userdata.userId

        };

        _http.post(MFPUBLICKYCAPI_URL + "api/gst", GetGSTValue, _suspensepayment.FillGST, userdata.token)

    },
    FillGST: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.pradr.em.length > 0) {
                //jQuery('#vendordata').show();
                //jQuery('#Gsttypes').show();
                jQuery("#vendorname").val(response.data.lgnm);
                jQuery("#vendoraddress").val(response.data.pradr.adr);
               /* jQuery('#gstin').prop("readonly", false);*/
                //_AddPayData.gstsplitup(gststate, userdata.branchId,p3);

            }
            else {
                //jQuery('#vendordata').hide();
                //jQuery('#Gsttypes').hide();
                //jQuery("#gstin").val("");

                jQuery("#vendorname").val("");
                jQuery("#vendoraddress").val("");
            //    jQuery('#gstin').prop("readonly", false);
            }
        }
        else {
            jQuery('.page-loader-wrapper').hide();

           // jQuery('#lbgstin').show();
            swal("GST", "Invalid GSTIN number..!", "warning");
            //jQuery('#vendordata').hide();
            //jQuery('#Gsttypes').hide();
            jQuery("#vendorname").val("");
            jQuery("#vendoraddress").val("");
            jQuery("#gstin").val("");
            //jQuery("#grossGST").val("");
            //jQuery("#grossamt").val("");
            //jQuery('#gstin').prop("readonly", false);
        }
    },
    convertdateformat: function (dt) {
        ndt = dt.replace(/\//g, '-');
        var vyear = ndt.split('-')[0];
        var vmonth = parseInt(ndt.split('-')[1]);
        var vday = ndt.split('-')[2];
        var vmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var vmon = vmonths[vmonth - 1];
        var valtortn = vday + '-' + vmon + '-' + vyear;
        return valtortn
    },

}

jQuery(document).ready(function ($) {


    jQuery('#vouchershow').click(function () {

        _suspensepayment.ViewDataApproval();
    });

    jQuery('#ddlBranch').change(function () {

        var brid = jQuery('#ddlBranch').val();
        _suspensepayment.VoucherSearchFill(brid);
    });


    jQuery('#returnsave').click(function () {

        var exp = jQuery('#usedexp').val();

        if (exp == 0) {
            swal("Error", "Please enter your expense..!", "warning");
            return
        }

        else {
            _suspensepayment.MoneyReturnConfirm();
        }

    });

    jQuery('#usedexp').change(function () {

        recamount = jQuery('#recamnt').val();
        expense = jQuery('#usedexp').val();

        if (parseFloat(expense) > parseFloat(recamount)) {

            swal("Error", "expense must be less than received amount.....!", "warning");
            jQuery('#usedexp').val('');
        }
        else {
            jQuery('#balamnt').val(parseFloat(recamount) - parseFloat(expense));
        }
        
    });


    jQuery('#billsave').click(function () {

        uploadfile = jQuery('#uploadfile2').val();


        if (uploadfile === "") {
            swal("Error", "Please upload your original bill.....!", "warning");
        }
        else {
            _suspensepayment.OriginalBillConfirm();
        }
    });


    jQuery('#gstyes').click(function () {

        jQuery("#gstnum").show();
        jQuery("#vendorname").show();

    });

    jQuery('#gstno').click(function () {

        jQuery("#gstnum").hide();
        jQuery("#vendorname").hide();

    });

    jQuery('#tdsyes').click(function () {

        jQuery("#tds").show();
        _suspensepayment.TdsMasterLoad();

    });

    jQuery('#tdsno').click(function () {

        jQuery("#tds").hide();

    });


    jQuery('#gst').change(function () {

        _suspensepayment.GetGSTREQ();
    });


    jQuery('#save').click(function () {
            purpose = jQuery('#purpose').val(),
            description = jQuery('#description').val(),
            amount = jQuery('#amount').val(),
            confirmamount = jQuery('#cnfmamount').val(),
            gst = jQuery('#gst').val(),
            vendor = jQuery('#vendor').val(),
            tds = jQuery('#ddlTds').val(),
            uploadfile = jQuery('#uploadfile').val()

        if (purpose == 0) {
            swal("Error", "Please enter your purpose..!", "warning");
            return
        }
         if (description == 0) {
             swal("Error", "Please enter Description..!", "warning");
             return
        }
         if (amount == 0) {
             swal("Error", "Please enter requesting amount..!", "warning");
             return
        }
         if (confirmamount == 0) {
             swal("Error", "Enter the amount again to confirm..!", "warning");
             return
        }
         if (!jQuery('#gstyes').prop('checked') && !jQuery('#gstno').prop('checked')) {
             swal("Error", "Please Select Any GST option..!", "warning");
             return
        }
         if (jQuery('#gstyes').prop('checked')) {
            //if (gst == 0) {
            //    swal("Error", "Please enter gst number..!", "warning");
            //    return
            // }
             GstVal = "1";
        }

        if (jQuery('#gstno').prop('checked')) {
             GstVal = "0";
        }


        //else if (jQuery('#gstyes').prop('checked') || jQuery('#gstno').prop('checked')) {
            //if (jQuery('#gstyes').prop('checked')) {
            //    if (gst == 0) {
            //        swal("Error", "Please enter gst number..!", "warning");
            //    }
            //}
            //    else if (gst != 0) {
            //        GstVal = "GetGST";
            //    }
            //}
            //else if (jQuery('#gstno').prop('checked')){
            //    GstVal = "NoGST";
            //}
        //}

         if (!jQuery('#tdsyes').prop('checked') && !jQuery('#tdsno').prop('checked')) {
            swal("Error","Please Select Any TDS option..!", "warning");
            return; 
        }

        if (jQuery('#tdsyes').prop('checked')) {

            TdsVal = '1';

            //if (tds == 0) {
            //    swal("Error", "Please Select TDS..!", "warning");
            //    return;
            //}
        }

        if (jQuery('#tdsno').prop('checked')) {

            TdsVal = '0';
        }

        //else if (gst == 0) {
        //    swal("Error", "Please enter gst number..!", "warning");
        //}
        //else if (tds == 0) {
        //    swal("Error", "Please select tds ..!", "warning");
        //}
        //else if (vendor === "") {
        //    swal("Error", "Please enter requesting amount..!", "warning");
        //}

     

        //else {
        //    swal("Please Select Any GST option", "", "warning");
        //    return; // Stop execution if GST option is not selected
        //}

        //if (!jQuery('#tdsyes').prop('checked') && !jQuery('#tdsno').prop('checked')) {
        //    swal("Please Select Any TDS option", "", "warning");
        //    return; // Stop execution if TDS option is not selected
        //}

         if (uploadfile === "") {
            swal("Error", "Please upload your approval.....!", "warning");
         }

        if (confirmamount != amount) {
            swal("Error", "Confirm amount must be equal to requested amount..!", "warning");
            jQuery('#cnfmamount').val('');
            return;
        }
        else {
             _suspensepayment.SuspenseRequestFill(purpose, description, confirmamount,/* gst, vendor, tds,*/ GstVal, TdsVal);
        }
    });



    jQuery('#uploadfile').change(function () {
        var UploadFile = "uploadfile";
        _suspensepayment.convertToBase64(UploadFile);
    });

    jQuery('#uploadfile2').change(function () {
        var UploadFile = "uploadfile2";
        _suspensepayment.convertToBase64(UploadFile);
    });

    jQuery('#billupdate').change(function () {
        var Billupdate = "billupdate";
        _suspensepayment.convertToBase64orginal(Billupdate);
    });

    jQuery('#gstin').keyup(function () {
      var  gstin = jQuery('#gstin').val();

       
            if (gstin == "") {
                jQuery('.page-loader-wrapper').hide();
                // swal("Error", "Please enter gst number..!", "error");
                
                //jQuery('#gstin').val(a);

                jQuery('#totalgst').prop('readonly', true);
               

            }
        
        else {
            // var Billupdate = "gstin";
                jQuery('#totalgst').prop('readonly', false);
            }
        
    });

    jQuery("#amount").keyup(function () {

        jQuery('#cnfmamount').val('');
    });

    jQuery("#cnfmamount").keyup(function () {

        var amnt = jQuery('#amount').val();

        if (amnt == '') {

            swal("Error", "Please enter amount..!", "warning");
            jQuery('#cnfmamount').val('');
            return
        }
        else

        _suspensepayment.compareAmount();


    });
    jQuery('#exit4').click(function () {
        window.location = "Dashboard";
    });
    jQuery('#exit3').click(function () {
        window.location = "Dashboard";
    });
    jQuery('#exit2').click (function () {
        window.location = "Dashboard";
    });

    jQuery('#exit1').click(function () {
        window.location = "Dashboard";
    });

    jQuery('#exit').click (function () {
        window.location = "Dashboard";
    });



    jQuery('#morercvl').click(function () {
        var requestid1 = jQuery('#rqstsearchngrcvl').val();
        if (requestid1 == 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please select your request..!", "warning");
        }
        else {
            jQuery("#morercvl").prop("disabled", true);

        }
        _suspensepayment.recievaltablefill(requestid1);

        jQuery('#paymentAdvancedetails').empty();
        jQuery('#cnfimdamount').val('');
        jQuery('#remarks1').val('');


    });


    jQuery('#morebill').click(function () {
        var requestid3 = jQuery('#rqstsearch2').val();
        if (requestid3 == 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please select your request..!", "warning");
        }
        else {
            //jQuery("#morebill").prop("disabled", true);
            jQuery('#tblbilldetails').empty();
            _suspensepayment.billtablefill(requestid3);

        }

        //jQuery('#cnfimdamount').val('');
        //jQuery('#remarks1').val('');


    });


    jQuery('#return').click(function () {
        var requestid4 = jQuery('#rqstsearch3').val();
        if (requestid4 == 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please select your request..!", "warning");
        }
        else {
            //jQuery("#return").prop("disabled", true);
            jQuery('#tblmoneydetails').empty();
            _suspensepayment.moneytablefill(requestid4);
        }

        //jQuery('#cnfimdamount').val('');
        //jQuery('#remarks1').val('');


    });


    jQuery('#confirm').click(function () {
        var Remarks = jQuery('#remarks1').val();
        if (Remarks == 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter remarks..!", "warning");
            return false;

        }
        _suspensepayment.recievalconfirm();
    });


    jQuery('#more').click(function () {
        var requestid2 = jQuery('#rqstsearch1').val();
        if (requestid2 == 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please select your request..!", "warning");


        }
        else {
            jQuery("#more").prop("disabled", true);
            _suspensepayment.reversaltablesearchfill(requestid2)
        }
       

        jQuery('#paymentreversaldetails').empty();
        jQuery('#billfrom').val('');
        jQuery('#billto').val('');
        jQuery('#gstin').val('');
        jQuery('#vendorname').val('');
        jQuery('#vendoraddress').val('');
        jQuery('#totalamount').val('');
        jQuery('#totalgst').val('');
        jQuery('#grossamount').val('');
        jQuery('#balanceamount').val('');
        jQuery('#billupdate').val('');




    });


    jQuery('#Suspensereverse').click(function () {

        jQuery("#billdetails").show();
       
        jQuery('#totalgst').val(a);
    });

  

    jQuery('#reversalconfirm').click(function () {
        billfrom = jQuery('#billfrom').val(),
         billto = jQuery('#billto').val(),
        gstin = jQuery('#gstin').val(),
           
            Totalamount = jQuery('#totalamount').val(),
       TotalGST = jQuery('#totalgst').val(),
        Grossamount = jQuery('#grossamount').val(),
        Balanceamount = jQuery('#balanceamount').val(),
            Billupdate = jQuery('#billupdate').val()

        ta = parseFloat(jQuery('#totalamount').val());
        tg = parseFloat(jQuery('#totalgst').val());

        ga = ta + tg;
        jQuery('#grossamount').val(ga);
        ra = recievedamount - ga;
        jQuery('#balanceamount').val(ra);


        if (billfrom == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please select the date..!", "warning");
            return false;

        }
        if (billto == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter the date..!", "warning");
            return false;

        }
        
        if (Totalamount == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please enter total amount..!", "warning");
            return false;

        }

        if (ga > recievedamount) {
            swal("Error", "Amount cannot be greater than Recieved amount..!", "warning");

            jQuery('#totalamount').val("");

            jQuery('#totalgst').val("");

            jQuery('#grossamount').val("");

            jQuery('#balanceamount').val("");
            return false;

        }
        //if (TotalGST == "") {
        //    jQuery('.page-loader-wrapper').hide();
        //    swal("Error", "Please enter total gst ..!", "error");
        //    return false;

        //}
        if (Billupdate == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please upload the orginal bill..!", "warning");
            return false;

        }
       
        _suspensepayment.reversalconfirm(billfrom, billto, gstin, Totalamount, TotalGST, Grossamount, Balanceamount)
    });

   

        jQuery('#bs_datepicker_container5_billfrom input').datepicker({
            
            autoclose: true,
            format: "dd/mm/yyyy",
            showbuttonPanel: true,
            defaultDate: "+1w",
            changeMonth: true,
            endDate: new Date(),
            container: '#bs_datepicker_container5_billfrom'
        }).datepicker("setDate", new Date());
  

    jQuery('#bs_datepicker_container5_billto input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        endDate: new Date(),
        container: '#bs_datepicker_container5_billto'
    }).datepicker("setDate", new Date());

    jQuery('#totalgst').change(function () {
        ta = parseFloat(jQuery('#totalamount').val());
        tg = parseFloat(jQuery('#totalgst').val());
       
        
            ga = ta + tg;
            jQuery('#grossamount').val(ga);
            ra = recievedamount - ga;
            jQuery('#balanceamount').val(ra);
      
    });
        jQuery('#totalamount').change(function () {
            ta = parseFloat(jQuery('#totalamount').val());
            tg = parseFloat(jQuery('#totalgst').val());
            if (tg == a) {
                jQuery('#grossamount').val(ta);
                ra = recievedamount - ta;
                jQuery('#balanceamount').val(ra);
            }

        });
    jQuery('#gstin').change(function () {


        _suspensepayment.GetGST();


    });

  

    jQuery('#billto').change(function (e) {

        var fromdate = _suspensepayment.convertdateformat(jQuery('#billfrom').val());
        var todate = _suspensepayment.convertdateformat(jQuery('#billto').val());
        var datediff = Date.parse(todate) - Date.parse(fromdate);
        if (Date.parse(todate) < Date.parse(fromdate)) {
           

            daysDiff = Math.round(Math.abs(datediff / (1000 * 60 * 60 * 24)) * 10);
    
            swal("Error", "The To date must be greater than the From date !", "warning");
            jQuery('#billto').val("");
            return false;
            //_suspensepayment.stateFill();
        }

    });

    jQuery('#rqstsearchngrcvl').change(function () {
     
        jQuery("#morercvl").prop("disabled", false);
    });

    jQuery('#rqstsearch1').change(function () {

        jQuery("#more").prop("disabled", false);
    });

    jQuery('#suspenserecievalLink').click(function () {

       

        jQuery("#PURPOSE").val('');
        jQuery("#EMPLOYEE").val('');
        jQuery("#DESCRIPTION").val('');
        jQuery("#Reqamnt").val('');
        jQuery("#Reqdate").val('');
        jQuery("#Branch").val('');
        jQuery("#Apprvdamount").val('');
        jQuery("#GSTamount").val('');
        jQuery("#TDSamount").val('');
        jQuery("#totamount").val('');
        jQuery("#paymode").val('');
        jQuery("#cnfimdamount").val('');
        jQuery("#remarks1").val('');

        jQuery("#advancepaymentcard").hide();
        jQuery("#cnfmdamnt").hide();

        _suspensepayment.recievalsearchfill()

    });

    jQuery('#suspenserequestLink').click(function () {

        jQuery("#purpose").val('');
        jQuery("#description").val('');
        jQuery("#amount").val('');
        jQuery("#cnfmamount").val('');
        jQuery("#gstselect").val('');
        jQuery("#gst").val('');
        jQuery("#gstnum").hide();
        jQuery("#vendor").val('');
        jQuery("#vendorname").hide();
        jQuery('input[name="gstselect"]').prop('checked', false);
        jQuery('input[name="tdsselect"]').prop('checked', false);
        //jQuery("#ddlTds").val('0');
        $('#ddlTds').find('option:not(:first)').remove();
        jQuery("#tds").hide();

        jQuery("#uploadfile").val('');


    });



    //jQuery('#rqstsearchngrcvl').select2();
    _suspensepayment.reversalsearchfill()


    jQuery('#suspensebillLink').click(function () {

        jQuery("#suspensebillcard").hide();
        jQuery("#billbutton").hide();
        jQuery("#uploadbutton").hide();
        jQuery("#uploadfile2").val('');

        _suspensepayment.billsearchfill()

    });

    jQuery('#moneyrtrnLink').click(function () {

        jQuery("#suspensemoneycard").hide();
        jQuery("#moneydetails").hide();
        jQuery("#returnbutton").hide();
        //jQuery("#recamnt").val('');
        jQuery("#usedexp").val('');
        jQuery("#balamnt").val('');

        _suspensepayment.moneysearchfill()
    });

    jQuery('#voucherLink').click(function () {

        jQuery("#ddlBranch").val(0);
        //jQuery("#rqstsearch4").val("0");
        $('#rqstsearch4').find('option:not(:first)').remove();

        _suspensepayment.VoucherBranchFill()
    });



});