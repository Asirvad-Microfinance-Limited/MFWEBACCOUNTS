var _AddPayData = {
    GetPayData: function () {
        var Str = " ";
        var GetPayTypeData = {
            "flag1": "ACCOUNTSAPPROVALDATA",
            "flag2": "PAYREQ",
            "inptvar1": userdata.branchId,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        GetPayTypeData = JSON.stringify(GetPayTypeData);
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillPayType, userdata.token)

    },
    FillPayType: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery("#ddlPayType").empty();
                jQuery("#ddlPayType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE REQUEST-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlPayType").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlPayType").empty();
                jQuery("#ddlPayType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE REQUEST-------- "));
            }
        }
        else {

            jQuery("#ddlPayType").empty();
            jQuery("#ddlPayType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE REQUEST-------- "));
        }
    },
    GetReqData: function (val) {
        var Str = " ";
        var GetPayTypeData = {
            "flag1": "DMAPPROVALDATA",
            "flag2": "REQDATA",
            "inptvar1": val,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        GetPayTypeData = JSON.stringify(GetPayTypeData);
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillReqType, userdata.token)

    },
    FillReqType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.QueryResult.length > 0) {
                jQuery("#payType").val(response.data.queryResult.QueryResult[0].param1);
                jQuery("#gstin").val(response.data.queryResult.QueryResult[0].param2);
                jQuery("#amtLimit").val(response.data.queryResult.QueryResult[0].param3);
                jQuery("#reqAmt").val(response.data.queryResult.QueryResult[0].param4);
                jQuery("#excessAmt").val(response.data.queryResult.QueryResult[0].param5);
                _AddPayData.GetGST();
            }
            else {
                jQuery("#payType").val("");
                jQuery("#gstin").val("");
                jQuery("#amtLimit").val("");
                jQuery("#reqAmt").val("");
                jQuery("#excessAmt").val("");
            }
        }
        else {
            jQuery("#payType").val("");
            jQuery("#gstin").val("");
            jQuery("#amtLimit").val("");
            jQuery("#reqAmt").val("");
            jQuery("#excessAmt").val("");
        }
    },
    GetGST: function () {
        jQuery('.page-loader-wrapper').show();
        jQuery('#gstin-error').hide();
        var val = jQuery('#gstin').val();
        if (val != "" && val.toUpperCase() != "NIL") {
            var GetGSTValue = {
                "gstin": val,
                "consent": "Y",
                "consent_text": "I hereby declare my consent agreement for verifying my data to Asirvad company",
                "firmId": "3",
                "empId": "316595"

            };

            _http.post(MFPUBLICKYCAPI_URL + "api/gst", GetGSTValue, _AddPayData.FillGST, userdata.token)
        }
        else {
            jQuery("#gstin").val("---");
            jQuery("#vendorName").val("---");
            jQuery('.page-loader-wrapper').hide();
        }
    },
    FillGST: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.pradr.em.length > 0) {
                jQuery("#vendorName").val(response.data.lgnm);
            }
            else {
                jQuery("#vendorName").val("");
            }
        }
        else {
            jQuery("#vendorName").val("");
        }
    },
    submitdata: function (st) {
        if (_AddPayData.checkVals()) {
            jQuery('.page-loader-wrapper').show();
            var val1 = jQuery("#dmremarks").val() + "@@" + userdata.userId;
            var val2 = jQuery("#ddlPayType").val() + "!!" + st;
            var GetPayTypeData = {
                "flag1": "DMAPPROVALDATA",
                "flag2": "APPROVAL",
                "inptvar1": val2,
                "inptvar2": val1,
                "typeID": "4",
                "userID": userdata.userId,
                "branchID": userdata.branchId
            };
            GetPayTypeData = JSON.stringify(GetPayTypeData);
            GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillsubmitData, userdata.token)


        }
    },
    FillsubmitData: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.QueryResult.length > 0) {
                if (response.data.queryResult.QueryResult[0].param2 == "3") {
                    swal({
                        title: "Approve",
                        text: response.data.queryResult.QueryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
                else {
                    swal({
                        title: "Reject",
                        text: response.data.queryResult.QueryResult[0].param1,
                        type: "info"
                    }, function () {
                        window.location.reload(true);
                    });
                }

            }
        }

    },
    checkVals: function () {
        var val1 = jQuery("#ddlPayType").val();
        var remarks = jQuery("#dmremarks").val();
        if (val1 == "" || val1 == 0) {
            swal("", "Please choose a request..!", "error");
            return false;
        }
        else if (remarks == "") {
            swal("", "Please Enter remarks..!", "error");
            return false;
        } else
            return true;
    },
    viewInvoiceImages: function (x) {
        jQuery('.page-loader-wrapper').show();
        var invimagemageData = {
            "recordingId": x,
            "collectionName": colectname
        }
       
        _http.post(MFPUBLICLOSAPI_URL + "api/loans/images", invimagemageData, _AddPayData.viewInvoiceImagesLoadCompleted, userdata.token)
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
            _General.noData(jQuery('#divInvimages'), "No Data Found");

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
        GetPayTypeData = JSON.stringify(GetPayTypeData);
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
    }
}

jQuery(document).ready(function ($) {
    jQuery('.page-loader-wrapper').hide();
    jQuery('#ddlPayType').change(function (e) {
        jQuery('#showimg').hide();
        var val = jQuery("#ddlPayType").val();
        if (val != 0) {
            _AddPayData.GetReqData(val);
            _AddPayData.getCollectionName(val);
        }
        else {
            jQuery("#payType").val("");
            jQuery("#gstin").val("");
            jQuery("#amtLimit").val("");
            jQuery("#reqAmt").val("");
            jQuery("#excessAmt").val("");
            jQuery("#vendorName").val("");
            colectname = "";
        }
    });
    jQuery('#submit').click(function (e) {
        _AddPayData.submitdata(1);
    });
    jQuery('#reject').click(function (e) {
        _AddPayData.submitdata(0);
    });
    jQuery('#viewinvoice').click(function (e) {
        var prid = jQuery('#ddlPayType').val();
        if (prid != 0) {
            _AddPayData.viewInvoiceImages(prid);
        }
        else {
            swal("Error", "Please Select a PR..!", "error");
            return false;
        }
    });
});

_AddPayData.GetPayData();
var colectname = "";

var spanCam = document.getElementsByClassName("close")[0];
spanCam.onclick = function () {
    jQuery('#showimg').hide();

}