var _AddPayData = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var CheckAccess = {
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1001",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        CheckAccess = JSON.stringify(CheckAccess);
        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _AddPayData.checkAccessRtn, userdata.token)
    },

    checkAccessRtn: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {
                var x = response.data.queryResult[0].param1;
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
                    _AddPayData.RequestedRelivingPr();
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
    RequestedRelivingPr: function () {
        jQuery('.page-loader-wrapper').show();
        var var1 = 28 + '!!' + userdata.branchId;
        var var2 = userdata.branchId + '@@' + userdata.userId;
        var RequestedPrid = {
            "flag1": "RELIVING",
            "flag2": "APPROVALRELIVING",
            "inptvar1": var1,
            "inptvar2": var2,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        RequestedPrid = JSON.stringify(RequestedPrid);
        RequestedPrid = { "encryptedRqstStr": EncryptAPIReq(RequestedPrid) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", RequestedPrid, _AddPayData.RequestedPrr, userdata.token)

    },
    RequestedPrr: function (response) {
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
    GetRequestedrRelivingPrData: function (st) {
        jQuery('.page-loader-wrapper').show();
        var prid = jQuery("#ddlprselect").val();
        var var1 = prid + '!!' + userdata.branchId;
        var var2 = userdata.branchId + '@@' + userdata.userId;
        var br = userdata.branchId;
        var GetPrReliving = {
            "flag1": "RELIVING",
            "flag2": "FETCHREQUESTEDPR",
            "inptvar1": var1,
            "inptvar2": var2,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        GetPrReliving = JSON.stringify(GetPrReliving);
        GetPrReliving = { "encryptedRqstStr": EncryptAPIReq(GetPrReliving) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPrReliving, _AddPayData.GetRelivingprdata, userdata.token)

    },
    GetRelivingprdata: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {
                jQuery("#others").show();
                jQuery("#viewinvoice").show();
                jQuery("#confirm").show();
                jQuery("#branch").val(response.data.queryResult.QueryResult[0].param1);
                jQuery("#PayType").val(response.data.queryResult.QueryResult[0].param2);
                jQuery("#gstin").val(response.data.queryResult.QueryResult[0].param4);
                jQuery("#amt").val(response.data.queryResult.QueryResult[0].param3);

                jQuery("#RequestedRemarks").val(response.data.queryResult.QueryResult[0].param5);

            }
            else {
                swal("Error", "No Data Found!", "Warning");
                return false;
            }
        }

        else {
            swal("error", "Something Went Wrong", "error");

        }


    },
    ApproveConfirm: function () {
        jQuery('.page-loader-wrapper').show();
        var prid = jQuery("#ddlprselect").val();
        var var1 = prid + '!!' + userdata.branchId;
        var var2 = userdata.branchId + '@@' + userdata.userId;
        var ApproveConfirmData = {
            "flag1": "RELIVING",
            "flag2": "APPROVECONFIRM",
            "inptvar1": var1,
            "inptvar2": var2,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        ApproveConfirmData = JSON.stringify(ApproveConfirmData);
        ApproveConfirmData = { "encryptedRqstStr": EncryptAPIReq(ApproveConfirmData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", ApproveConfirmData, _AddPayData.ApproveConfirmPrData, userdata.token)

    },



    ApproveConfirmPrData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {
                swal({
                    title: "PR APPROVED",
                    text: response.data.queryResult.QueryResult[0].param1,
                    type: "success"
                }, function () {
                    window.location.reload(true);
                });
            }
        }

        else {
            swal("Error", "Somethimg Went Wrong, ..!", "error");
            return false;
        }
    },




    //viewInvoiceImages: function (x) {
    //    jQuery('.page-loader-wrapper').show();
    //    var invimagemageData = {
    //        "recordingId": x,
    //        "collectionName": colectname
    //    }
    //    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/images", invimagemageData, _AddPayData.viewInvoiceImagesLoadCompleted, userdata.token)
    //},
    //viewInvoiceImagesLoadCompleted: function (response) {
    //    jQuery('.page-loader-wrapper').hide();
    //    if (response.status === "SUCCESS") {
    //        var max = response.data.imageData.length;
    //        var $image = jQuery('<img class="north" id = "rtimg" src="data:image/png;base64,' + response.data.imageData[max - 1].imageString + ' " height="450"  >');
    //        jQuery('#ImageModel').modal('show');
    //        jQuery('#ImageDiv').html($image);

    //    }
    //    else {
    //        //jQuery('.page-loader-wrapper').hide();
    //        _General.noData(jQuery('#ImageModel'), "No Data Found");

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
    //getCollectionName: function (prid) {
    //    var GetPayTypeData = {
    //        "flag1": "GETCOLLECTIONNAME",
    //        "flag2": "",
    //        "inptvar1": prid,
    //        "inptvar2": "",
    //        "typeID": "4",
    //        "userID": userdata.userId,
    //        "branchID": userdata.branchId
    //    };

    //    GetPayTypeData = JSON.stringify(GetPayTypeData);
    //    GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
    //    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillCollectionName, userdata.token)

    //},
    //FillCollectionName: function (response) {
    //    if (response.status === "SUCCESS") {
    //        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
    //        if (response.data.queryResult.QueryResult.length > 0) {
    //            colectname = response.data.queryResult.QueryResult[0].param1;
    //        }
    //    }
    //},
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
    jQuery('#ddlprselect').select2();
    _AddPayData.RequestedRelivingPr();

    jQuery('#ddlprselect').change(function (e) {
        var val = jQuery('#ddlprselect').val();
        if (val != "0") {
            _AddPayData.GetRequestedrRelivingPrData(val);

        }
        else {
            jQuery('#others').hide();
            valchange = 0;
            Strbase64 = null;
            colectname = "";
        }
    });
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
    jQuery('#btncancel').click(function (e) {
        // _AddPayData.GetRelivingPr();
        jQuery("#ddlprselect").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PR-------- "));
        jQuery('#branch').val("");
        jQuery('#PayType').val("");
        jQuery('#gstin').val("");
        jQuery('#amt').val("");
        jQuery('#RequestedRemarks').val("");
        jQuery('#ApprovalRemarks').val("");
        _AddPayData.RequestedRelivingPr();


    });
    jQuery('#btnapprove').click(function (e) {
        var remrk = jQuery('#ApprovalRemarks').val();
        var prid = jQuery('#ddlprselect').val();
        if (remrk == "") {
            //swal("Warning","Please Enter Remarks", "Warning");
            alert("Please Enter Remarks");
        }


        else if (prid == 0) {
            //swal("Please Enter Remarks", "Warning");
            alert("Please choose Pr");

        }
        else {
            _AddPayData.ApproveConfirm();
            //swal("Error", "Please Select a PR..!", "error");
            //return false;
        }
    });
    jQuery('#ddlprselect').change(function (e) {
        var val = jQuery('#ApprovalRemarks').val("");
        var val = jQuery('#ddlprselect').val();
        if (val != "0") {
            _AddPayData.getCollectionName(val);

            //jQuery("#gstcheck").hide();
            //valchange = 0;
            //Strbase64 = null;
            //jQuery('#others').show();
            //jQuery('#tick').hide();
            //jQuery('#close').show();
            //jQuery('#rdbillupd2').prop('checked', 'true');
            //jQuery('#uploadbill').hide();
            //jQuery('#payfile').hide();
            //_AddPayData.GetPRFullData(val);
            //_AddPayData.getRejReason(val);
        }
        else {
            jQuery('#others').hide();
            valchange = 0;
            Strbase64 = null;
            colectname = "";
        }

        // _AddPayData.checkAccess();
    });
});