var totamt;
var _AddPayData = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var CheckAccess = {
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1018",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            CheckAccess = JSON.stringify(CheckAccess);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _AddPayData.checkAccessRtn, userdata.token)
    },

    checkAccessRtn: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.QueryResult.length > 0) {
                var x = response.data.queryResult.QueryResult[0].param1;
                if (x == "0") {
                    swal({
                        title: "Access Denied",
                        text: "You are not autherized to view this page.!",
                        type: "info"
                    }, function () {
                        window.location.href = "dashboard";
                    });
                }
                else {
                    _AddPayData.GetRejectPerson();
                }

            }
        }
        else {
            swal({
                title: "Access Denied",
                text: "You are not autherized to view this page.!",
                type: "info"
            }, function () {
                window.location.href = "dashboard";
            });
        }
    },
    GetRejectPerson: function () {
        jQuery('.page-loader-wrapper').show();
        var br = userdata.branchId;
        var st = " ";
        var GetRejectData = {
            "flag1": "RESUBMISSION",
            "flag2": "NEWRESUBMISSION",
            "inptvar1": br,
            "inptvar2": userdata.userId, 
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            GetRejectData = JSON.stringify(GetRejectData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetRejectData = { "encryptedRqstStr": EncryptAPIReq(GetRejectData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/GlexpensesEnterAPI", GetRejectData, _AddPayData.FillRejectPerson, userdata.token)

    },
    FillRejectPerson: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {
                jQuery("#ddlreject").empty();
                jQuery("#ddlreject").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PR-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlreject").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlreject").empty();
                jQuery("#ddlreject").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PR-------- "));
            }
        }
        else {
            jQuery("#ddlreject").empty();
            jQuery("#ddlreject").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PR-------- "));
        }
    },
    GetPRData: function (st) {
        jQuery('.page-loader-wrapper').show();
        var br = userdata.branchId;
        var GetPRData = {
            "flag1": "RESUBMISSION",
            "flag2": "PRFILL",
            "inptvar1": st,
            "inptvar2": br,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            GetPRData = JSON.stringify(GetPRData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetPRData = { "encryptedRqstStr": EncryptAPIReq(GetPRData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/GlexpensesEnterAPI", GetPRData, _AddPayData.FillPRData, userdata.token)

    },
    FillPRData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {
                jQuery("#ddlprselect").empty();
                jQuery("#ddlprselect").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PR-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlprselect").append(jQuery("<option></option>").val(val.param1).text(val.param1));
                });
            }
            else {
                jQuery("#ddlprselect").empty();
                jQuery("#ddlprselect").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PR-------- "));
            }
        }
        else {
            jQuery("#ddlprselect").empty();
            jQuery("#ddlprselect").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PR-------- "));
        }
    },
    getRejReason: function (pr) {
        jQuery('.page-loader-wrapper').show();
        var br = userdata.branchId;
        var GetPRData = {
            "flag1": "RESUBMISSION",
            "flag2": "GETREJREASON",
            "inptvar1": pr,
            "inptvar2": br,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        try {
            GetPRData = JSON.stringify(GetPRData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetPRData = { "encryptedRqstStr": EncryptAPIReq(GetPRData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/GlexpensesEnterAPI", GetPRData, _AddPayData.FillRejReason, userdata.token)

    },
    FillRejReason: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {
                jQuery("#RejRemarks").val(response.data.queryResult.QueryResult[0].param1);
            }
        }
    },
    GetPRFullData: function (st) {
        jQuery('.page-loader-wrapper').show();
        var br = userdata.branchId;
        var GetPRData = {
            "flag1": "RESUBMISSION",
            "flag2": "GETDATA",
            "inptvar1": st,
            "inptvar2": br,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            GetPRData = JSON.stringify(GetPRData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetPRData = { "encryptedRqstStr": EncryptAPIReq(GetPRData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/GlexpensesEnterAPI", GetPRData, _AddPayData.FillGetPRFullData, userdata.token)

    },
    FillGetPRFullData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {
                var status = response.data.queryResult.QueryResult[0].param2.split('~')[3];
                if (status != 15) {
                    jQuery("#PayType").val(response.data.queryResult.QueryResult[0].param1);
                    var st = response.data.queryResult.QueryResult[0].param2.split('~')[0];
                    var totgst = response.data.queryResult.QueryResult[0].param2.split('~')[1];
                    var grossamt = response.data.queryResult.QueryResult[0].param2.split('~')[4];
                    totamt = response.data.queryResult.QueryResult[0].param3;
                    gstin = response.data.queryResult.QueryResult[0].param4;
                    var billno = response.data.queryResult.QueryResult[0].param2.split('~')[2];
                    var billdate = response.data.queryResult.QueryResult[0].param2.split('~')[3];
                    jQuery("#totalamt").val(totamt);
                    jQuery("#grossGST").val(totgst);
                    jQuery("#grossamt").val(grossamt);
                    jQuery("#gstin").val(gstin);
                    jQuery("#billnumber").val(billno);
                    jQuery("#billdateedit").val(billdate);
                    if (gstin != 'NIL')
                        jQuery("#grossGST").removeAttr("disabled", "disabled");

                    else
                        //jQuery("#grossGST").attr("disabled", "disabled");
                        jQuery("#grossGST").removeAttr("disabled", "disabled");
                }
                else {

                    swal({
                        title: "REJECTED",
                        text: "PR Rejected Permenently ....!",
                        type: "info"
                    }, function () {
                        window.location.href = "dashboard";
                    });


                }


            }
        }
    },

    //gstsplitup: function (gstvndr, brid, gstper) {
    //    jQuery('.page-loader-wrapper').show();
    //    var val1 = gstvndr + '!!' + brid;
    //    var GetPayTypeData = {
    //        "flag1": "GSTIN",
    //        "flag2": "SPLITUP",
    //        "inptvar1": val1,
    //        "inptvar2": gstper
    //    };
    //    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.fillgstsplitup, userdata.token)

    //},
    //fillgstsplitup: function (response) {
    //    jQuery('.page-loader-wrapper').hide();
    //    if (response.status === "SUCCESS") {
    //        var sgst = parseInt(response.data.queryResult[0].param1);
    //        var cgst = parseInt(response.data.queryResult[0].param2);
    //        var igst = parseInt(response.data.queryResult[0].param3);
    //        jQuery("#grosssgstper").val(sgst);
    //        jQuery("#grosscgstper").val(cgst);
    //        jQuery("#grossigstper").val(igst);
    //    }
    //},
    viewInvoiceImages: function (x) {
        jQuery('.page-loader-wrapper').show();
        var invimagemageData = {
            "recordingId": x,
            "collectionName": colectname
        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/images", invimagemageData, _AddPayData.viewInvoiceImagesLoadCompleted, userdata.token)
    },


    viewInvoiceImagesLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            var max = response.data.imageData.length;
            var $image = jQuery('<img class="north" id = "rtimg" src="data:image/png;base64,' + response.data.imageData[max - 1].imageString + ' " height="450"  >');
            jQuery('#ImageModel').modal('show');
            jQuery('#ImageDiv').html($image);

        }
        else {
            //jQuery('.page-loader-wrapper').hide();
            _General.noData(jQuery('#ImageModel'), "No Data Found");

        }
    },
    enontotcalc: function (st) {
        valchange = 1;
        var totamtt = parseFloat(jQuery('#totalamt').val());
        var totgst = parseFloat(jQuery('#grossGST').val());
        var gstin = jQuery('#gstin').val();

        if (gstin == "NIL" && totgst > 0) {
            swal("Error", "Enter the GSTIN number First..! If GSTIN is Nill then GST amount should be zero ", "error");
            jQuery('#grossGST').val("");
            jQuery("#grossamt").val("");
            return false;
        }
        if (gstin == "") {
            swal("Error", "Enter the GSTIN number First..!", "error");
            jQuery('#grossGST').val(0);
            jQuery("#grossamt").val("");

        }



        if (totamtt <= 0 || isNaN(totamtt)) {
            swal("Error", "Invalid Amount,Must be greaterthan 0..!", "error");
            jQuery('#totalamt').val("");
            jQuery('#grossamt').val("");
            return false;
        }
        else if (totgst < 0 || isNaN(totgst)) {
            swal("Error", "Invalid GST amount, must be greater than or equal to Zero..!", "error");
            jQuery('#grossGST').val("");
            jQuery('#grossamt').val("");
            return false;
        }
        else if (totgst < 0 && gstin != 'NIL') {
            swal("Error", "GST amount must be greaterthan zero..!", "error");
            jQuery('#grossGST').val("");
            jQuery('#grossamt').val("");
            return false;
        }
        else {
            var grossamt = totgst + totamtt;
            jQuery('#grossamt').val(grossamt.toFixed(2));
        }
    },
    takeSnapShot: function () {
        jQuery('#camsection').show();
        //size taken camera
        Webcam.set({
            width: 400,
            height: 310,
            //facingMode: "environment",
            image_format: 'jpeg',
            jpeg_quality: 100

        });


        Webcam.attach('#camera');
    },
    takeInvoice: function () {
        Webcam.snap(function (k) {
            //width = "100%" 

            var $image = jQuery('<img id="rtimg" src="' + k + '" height="310" width = "80%"  />');
            jQuery('#viewUploadedImages').html($image);
            jQuery('#viewUploadedImages').show();

            Strbase64 = k.toString().replace('data:image/jpeg;base64,', '');

            if (jQuery('#viewUploadedImages').val() == null) {
                swal("", "Add URL or PDF File..!", "warning");
                return false;
            }
        });

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

        _http.post(MFPUBLICKYCAPI_URL + "api/gst", GetGSTValue, _AddPayData.FillGST, userdata.token)

    },
    FillGST: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.pradr.em.length > 0) {
                jQuery('#vendordata').show();
                jQuery("#vendorName").val(response.data.lgnm);
                jQuery("#vendorAddress").val(response.data.pradr.adr);
                jQuery('#gstin').prop("readonly", false);
                jQuery("#grossGST").val("");
                jQuery("#grossamt").val("");
                //_AddPayData.gstsplitup(gststate, userdata.branchId,p3);
            }
            else {
                jQuery('#vendordata').hide();
                jQuery("#gstin").val("");
                jQuery("#grossGST").val("");
                jQuery("#grossamt").val("");
                jQuery("#vendorName").val("");
                jQuery("#vendorAddress").val("");
                jQuery('#gstin').prop("readonly", false);
            }
        }
        else {
            swal("GST", "Invalid GSTIN number..!", "error");
            jQuery('#vendordata').hide();
            jQuery("#vendorName").val("");
            jQuery("#vendorAddress").val("");
            jQuery("#gstin").val("");
            jQuery("#grossGST").val("");
            jQuery("#grossamt").val("");
            jQuery('#gstin').prop("readonly", false);
        }
    },
    convertdateformat: function (dt) {
        ndt = dt.replace(/\//g, '-');
        var vyear = ndt.split('-')[2];
        var vmonth = ndt.split('-')[1];
        var vday = parseInt(ndt.split('-')[0]);
        var vmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var vmon = vmonths[vmonth - 1];
        var valtortn = vday + '-' + vmon + '-' + vyear;
        return valtortn;
    },

    RejResubmit: function () {
        jQuery('.page-loader-wrapper').show();
        var newgst;
        var checkst = 0;
        var fullval = "";
        var gstin;
        gstin = jQuery("#gstin").val();
        var newnetamt = parseFloat(jQuery('#grossamt').val());
        //var resend = jQuery('#rdbillsnd:checked').val();
        var rej = jQuery('#ddlreject').val();
        var bill_no = jQuery('#billnumber').val();
        var bill_date = jQuery('#billdateedit').val();
        //var updbill = jQuery('input:radio[name="rdbillupd"]:checked').val();
        if (newnetamt <= 0 || isNaN(newnetamt)) {
            swal("Error", "Gross Amount Cannot be null or zero..!", "error");
            jQuery('.page-loader-wrapper').hide();
            return false;
        }
        else if (Strbase64 == null || Strbase64 == "") {
            swal("", "Please capture the Bill..!", "error");
            jQuery('.page-loader-wrapper').hide();
            return false;
        }
        //else if (totamt == newnetamt) {
        //    swal("", "Amount is not modified", "error");
        //    jQuery('.page-loader-wrapper').hide();
        //    return false;
        //}
        else if (bill_no == "") {
            swal("", "Please enter the Bill number!", "error");
            jQuery('.page-loader-wrapper').hide();
            return false;
        } else if (bill_date=="") {
            swal("", "Please select the bill date..!", "error");
            jQuery('.page-loader-wrapper').hide();
            return false;
        }
       
        //else if (updbill == '1' && Strbase64 == null) {
        //    swal("Error", "Please capture the bill..!", "error");
        //    return false;
        //}
        var pr = jQuery('#ddlprselect').val();
        if (valchange == 1) {
            newnetamt = jQuery('#grossamt').val();
            newgst = jQuery('#grossGST').val();
        }

        if (/*updbill == '1' && */Strbase64 != null) {
            checkst = 1;
            var msg = "PRRESUBMITBILL";
            var pr = jQuery('#ddlprselect').val();
            var GetOutWardData = {
                "typeId": "0",
                "image": Strbase64,
                "collectionName": msg,
                "fileName": msg,
                "recordingId": pr,
                "imageType": "img"
            };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/insertimage", GetOutWardData, "", userdata.token)
        }
        if (valchange == 1)
            fullval = "0!!" + valchange + "!!" + newnetamt + "!!" + newgst + "!!" + 1 + "!!" + userdata.branchId + "!!" + rej + "!!" + gstin + "!!" + bill_no + "!!" + bill_date;
        else
            fullval = "1!!" + rej;
        if (checkst == 1 || valchange == 1) {

            var GetPRData = {
                "flag1": "RESUBMISSION",
                "flag2": "CONFIRM",
                "inptvar1": fullval,
                "inptvar2": pr,
                "typeID": "4",
                "userID": userdata.userId,
                "branchID": userdata.branchId
            };

            try {
                GetPRData = JSON.stringify(GetPRData);
            } catch (e) {
                swal("", e.message, "warning");
                return false;
            }
            GetPRData = { "encryptedRqstStr": EncryptAPIReq(GetPRData) };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/GlexpensesEnterAPI", GetPRData, _AddPayData.FillRejResubmit, userdata.token)
        }
        else {
            swal("Error", "Cannot Resubmit, Please change values..!", "error");
            return false;
        }

    },





    FillRejResubmit: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {
                swal({
                    title: "Resubmit",
                    text: response.data.queryResult.QueryResult[0].param1,
                    type: "success"
                }, function () {
                    window.location.reload(true);
                });
            }
        }
    },
    getCollectionName: function (prid) {
        var GetPayTypeData = {
            "flag1": "GETCOLLECTIONNAME",
            "flag2": "",
            "inptvar1": prid,
            "inptvar2": "",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        try {
            GetPayTypeData = JSON.stringify(GetPayTypeData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillCollectionName, userdata.token)

    },
    FillCollectionName: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {
                colectname = response.data.queryResult.QueryResult[0].param1;
            }
        }
    },
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
                    jQuery('#travelFile').val("");
                    jQuery('#foodlFile').val("");
                    jQuery('#stayFile').val("");
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
            swal("", "Add Image..!", "warning");
            return false;
        }
    },

}


jQuery(document).ready(function ($) {
    jQuery('.page-loader-wrapper').hide();
    _AddPayData.checkAccess();

    jQuery('#ddlreject').change(function (e) {
        jQuery('#others').hide();
        valchange = 0;
        Strbase64 = null;
        var val = jQuery('#ddlreject').val();
        if (val != "0") {
            if (val == 9)
                jQuery('#billresnd').hide();
            else

                jQuery('#billresnd').hide();
        }
        _AddPayData.GetPRData(val);
    });

    jQuery('#gstin').change(function (e) {
        var val = parseInt(jQuery('#gstin').val());
        if (val == "" || isNaN(val)) {
            jQuery('#gstin').val("NIL");
        }
        else
            _AddPayData.GetGST();
    });

    jQuery('#ddlprselect').change(function (e) {
        var val = jQuery('#ddlprselect').val();
        if (val != "0") {
            _AddPayData.getCollectionName(val);
            jQuery("#gstcheck").hide();
            valchange = 0;
            Strbase64 = null;
            jQuery('#others').show();
            jQuery('#tick').hide();
            jQuery('#close').show();
            //jQuery('#rdbillupd2').prop('checked', 'true');
            jQuery('#uploadbill').show();
            jQuery('#payfile').show();
            _AddPayData.GetPRFullData(val);
            _AddPayData.getRejReason(val);
        }
        else {
            jQuery('#others').hide();
            valchange = 0;
            Strbase64 = null;
            colectname = "";
        }
        var dateInputValue = jQuery('#billdateedit').val();

        jQuery('#bs_datepicker_container20 input').datepicker({
            autoclose: true,
            format: "dd-M-yyyy",
            startDate: '-90d',
            endDate: new Date(),
            container: '#bs_datepicker_container20',
            changeMonth: true,
            showButtonPanel: true,
            orientation: 'bottom auto'
        }).on('changeDate', function (e) {
            dateInputValue = jQuery('#billdateedit').val();
        });

        jQuery('#bs_datepicker_container20 input').on('click', function () {
            if (!jQuery(this).prop('readonly')) {
                jQuery(this).datepicker('show');
            }
        });
        //jQuery('#bs_datepicker_container20 input').datepicker({
        //    autoclose: true,
        //    format: "yyyy/mm/dd",
        //    showButtonPanel: true,
        //    defaultDate: "+1w",
        //    changeMonth: true,
        //    startDate: '-90d',
        //    endDate: '0d',
        //    container: '#bs_datepicker_container20'
        //});

    });

    jQuery('#ClickmeBtn').click(function (e) {
        _AddPayData.takeInvoice();
        jQuery('#payfile').hide();
    });

    jQuery('#payfile').change(function (e) {
        var file = "payfile";
        // _AddPayData.takeInvoice();
        //base64 = fileLoadedEvent.target.result;
        //Strbase64 = base64.toString().replace('data:image/jpeg;base64,', '');
        //alert(Strbase64);
        jQuery('#billupd').hide();
        _AddPayData.convertToBase64(file);
    });

    //jQuery('input:radio[name="rdbillupd"]').click(function (e) {
    //    var val = jQuery('input:radio[name="rdbillupd"]:checked').val();
    //    if (val != "0") {
    //        jQuery('#uploadbill').show();
    //        jQuery('#payfile').show();
    //    }
    //    else {
    //        jQuery('#uploadbill').hide();
    //        jQuery('#payfile').hide();
    //        Strbase64 = null;
    //        jQuery('#tick').hide();
    //        jQuery('#close').show();
    //    }
    //});
    //jQuery('#rdbillupd2').click(function (e) {
    //    var val = jQuery('#rdbillupd2').val();
    //    if (val != "0") {
    //        jQuery('#uploadbill').show();
    //        jQuery('#payfile').show();
    //    }
    //    else {
    //        jQuery('#uploadbill').hide();
    //        jQuery('#payfile').hide();
    //    }
    //});
    jQuery('#viewinvoice').click(function (e) {
        var prid = jQuery('#ddlprselect').val();
        if (prid != 0) {
            _AddPayData.viewInvoiceImages(prid);
        }
        else {
            swal("Error", "Please Select a PR..!", "error");
            return false;
        }
    });
    jQuery('#totalamt').change(function (e) {

        var resubmitamt = jQuery('#totalamt').val();//total amount
        //var grosspay = jQuery('#grossamt').val();
        if (parseInt(totamt) < parseInt(resubmitamt)) {

            swal("", "Resubmit Amount should be  Less than" + totamt + "...!!!", "error");

            return;
        }


        _AddPayData.enontotcalc();
    });
    jQuery('#grossGST').change(function (e) {
        _AddPayData.enontotcalc();
    });
    jQuery('#billupdnw').click(function (e) {
        jQuery('#camera').show();
        jQuery('#camsection').show();
        jQuery('#closeCam').show();
        _AddPayData.takeSnapShot();
    });
    jQuery('#Rejsubmit').click(function (e) {
        if (/*valchange != 0 ||*/ Strbase64 != null)
            _AddPayData.RejResubmit();
        else {
            swal("", "Please capture the Bill..!", "error");
            jQuery('.page-loader-wrapper').hide();
            return false;
        }

    });
    jQuery('#ClickmeBtn').click(function (e) {
        _AddPayData.takeInvoice();
    });
    jQuery('#ClickmeBtnSave').click(function (e) {
        jQuery('#camera').hide();
        jQuery('#camsection').hide();
        jQuery('#closeCam').hide();
        jQuery('#viewUploadedImages').hide();
        if (Strbase64 != null) {
            jQuery('#tick').show();
            jQuery('#close').hide();
        }
        Webcam.reset();
    });
});

var valchange = 0;
var gstin;
var Strbase64;
var spanCam = document.getElementsByClassName("close")[0];
spanCam.onclick = function () {
    jQuery('#showimg').hide();
}
var spanCam2 = document.getElementsByClassName("close")[1];
spanCam2.onclick = function () {
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


var colectname = "";