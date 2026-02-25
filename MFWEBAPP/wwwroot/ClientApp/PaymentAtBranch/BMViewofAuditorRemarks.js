var _BmViewOfRemarks = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var CheckAccess = {
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1006",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _BmViewOfRemarks.checkAccessRtn, userdata.token)
    },

    checkAccessRtn: function (response) {
        if (response.status === "SUCCESS") {
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

    GetPayData: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetPayTypeData = {
            "flag1": "BMREMARKS",
            "flag2": "PAYREQ",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _BmViewOfRemarks.FillPayType, userdata.token)

    },
    FillPayType: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {

                jQuery("#ddlPayType").empty();
                jQuery("#ddlPayType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE REQUEST-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlPayType").append(jQuery("<option></option>").val(val.param1).text(val.param1));
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
        jQuery('.page-loader-wrapper').show();
        var GetPayTypeData = {
            "flag1": "BMREMARKS",
            "flag2": "REQDATA",
            "inptvar1": val,
            "inptvar2": userdata.userId,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _BmViewOfRemarks.FillReqType, userdata.token)

    },
    FillReqType: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            if (response.data.queryResult.length > 0) {
                var val1 = response.data.queryResult[0].param1.split("~");
                //var paytyp = val1[0].spilt()
                var val2 = response.data.queryResult[0].param2.split("~");
                var val3 = response.data.queryResult[0].param3.split("~");
                jQuery("#payType").val(val1[0]);
                jQuery("#branch").val(val1[2]);
                jQuery("#gstin").val(val1[1]);
                jQuery("#billdt").val(val1[3]);
                jQuery("#sgst").val(val2[0]);
                jQuery("#cgst").val(val2[1]);
                jQuery("#igst").val(val2[3]);
                jQuery("#requserRemark").val(val3[0]);
                jQuery("#reqAmt").val(val2[4]);
                jQuery("#requser").val(val2[6]);
                jQuery("#excessAmt").val(val2[3]);
                jQuery("#totreqAmt").val(val3[1]);


            }
            else {
                jQuery("#payType").val("");
                jQuery("#gstin").val("");
                jQuery("#amtLimit").val("");
                jQuery("#reqAmt").val("");
                jQuery("#excessAmt").val("");
                jQuery("#bhremarks").val("");
                jQuery("#branch").val("");
                jQuery("#requser").val("");
                jQuery("#billdt").val("");
                jQuery("#sgst").val("");
                jQuery("#cgst").val("");
                jQuery("#igst").val("");
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
    GetGLData: function (val) {
        var Str = " ";
        jQuery('.page-loader-wrapper').show();
        var GetGLReqData = {
            "flag1": "DMAPPROVALDATA",
            "flag2": "GLREQREQDATA",
            "inptvar1": val,
            "inptvar2": userdata.userId,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetGLReqData, _BmViewOfRemarks.FillGLData, userdata.token)

    },
    FillGLData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                var val1 = parseInt(response.data.queryResult[0].param1);
                if (val1 >= 1) {
                    jQuery('#GLAHDetails').show();
                    var val2 = response.data.queryResult[0].param2.split("~");
                    jQuery('#recommendedAH').val(val2[0]);
                    jQuery('#recommendedAHRemark').val(val2[1]);
                }
                if (val1 >= 2) {
                    jQuery('#GLRMDetails').show();
                    var val2 = response.data.queryResult[0].param3.split("~");
                    jQuery('#recommendedRM').val(val2[0]);
                    jQuery('#recommendedRMRemark').val(val2[1]);
                }
                if (val1 >= 3) {
                    jQuery('#GLHOOPDetails').show();
                    var val2 = response.data.queryResult[0].param4.split("~");
                    jQuery('#recommendedHOP').val(val2[0]);
                    jQuery('#recommendedHOPRemarks').val(val2[1]);
                }
                if (val1 >= 4) {
                    jQuery('#GLBusinessHeadDetails').show();
                    var val2 = response.data.queryResult[0].param5.split("~");
                    jQuery('#recommendedBUHEAD').val(val2[0]);
                    jQuery('#recommendedBUHEADRemark').val(val2[1]);
                }
            }
        }
        _BmViewOfRemarks.GetGST();
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
                "empId": userdata.userId

            };

            _http.post(MFPUBLICKYCAPI_URL + "api/gst", GetGSTValue, _BmViewOfRemarks.FillGST, userdata.token)
        }
        else {
            jQuery("#gstin").val("---");
            jQuery("#vendorName").val("---");
            jQuery("#sgst").val(0);
            jQuery("#cgst").val(0);
            jQuery("#igst").val(0);
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
    submitdata: function (st) {//st=1 Approved,st=0 rejected

        jQuery('.page-loader-wrapper').show();
        var val1 = jQuery("#dmremarks").val() + "@@" + userdata.userId;
        var val2 = jQuery("#ddlPayType").val() + "!!" + st;
        var GetPayTypeData = {
            "flag1": "BMREMARKS",
            "flag2": "SUBMIT",
            "inptvar1": val2,
            "inptvar2": val1,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _BmViewOfRemarks.FillsubmitData, userdata.token)



    },
    FillsubmitData: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {

                if (response.data.queryResult[0].param2 == '1') {
                    swal({
                        title: "Success",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
                else {
                    swal({
                        title: "Rejected",
                        text: response.data.queryResult[0].param1,
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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/images", invimagemageData, _BmViewOfRemarks.viewInvoiceImagesLoadCompleted, userdata.token)
    },

    viewInvoiceImagesLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            var $image = jQuery('<img class="north" id = "rtimg" src="data:image/png;base64,' + response.data.imageString + ' " height="450" width="50%" >');
            jQuery('#ImageModel').modal('show');
            jQuery('#ImageDiv').html($image);

            var zoomImage = jQuery('#rtimg');
            zoomImage.imageZoom();

        }
        else {
            //jQuery('.page-loader-wrapper').hide();
            _General.noData(jQuery('#divInvimages'), "No Data Found");

        }
    },
    rotateImage1: function () {
        var img = jQuery('#rtimg1');
        if (img.hasClass('north')) {
            img.attr('class', 'west');
        } else if (img.hasClass('west')) {
            img.attr('class', 'south');
        } else if (img.hasClass('south')) {
            img.attr('class', 'east');
        } else if (img.hasClass('east')) {
            img.attr('class', 'north');
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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _BmViewOfRemarks.FillCollectionName, userdata.token)

    },
    FillCollectionName: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                colectname = response.data.queryResult[0].param1;
            }
        }
    }
}

jQuery(document).ready(function ($) {
    jQuery('.page-loader-wrapper').hide();
    _BmViewOfRemarks.GetPayData();
    jQuery('#ddlPayType').change(function (e) {
        jQuery('#showimg').hide();
        jQuery('#GLAHDetails').hide();
        jQuery('#GLRMDetails').hide();
        jQuery('#GLHOOPDetails').hide();
        jQuery('#GLBusinessHeadDetails').hide();

        var val = jQuery("#ddlPayType").val();
        if (val != 0) {
            _BmViewOfRemarks.GetReqData(val);
            _BmViewOfRemarks.getCollectionName(val);

        }
        else {
            jQuery("#payType").val("");
            jQuery("#gstin").val("");
            jQuery("#amtLimit").val("");
            jQuery("#reqAmt").val("");
            jQuery("#excessAmt").val("");
            jQuery("#vendorName").val("");
            jQuery("#requserRemark").val("");
            jQuery("#branch").val("");
            jQuery("#requser").val("");
            jQuery("#billdt").val("");
            jQuery("#sgst").val("");
            jQuery("#cgst").val("");
            jQuery("#igst").val("");
            colectname = "";
        }

    });
    jQuery('#submit').click(function (e) {

        var val1 = jQuery("#ddlPayType").val();


        var remarks = jQuery("#dmremarks").val();
        if (val1 == "" || val1 == 0) {
            swal("", "Please choose a request..!", "error");
            return false;
        }
        else if (remarks == "") {
            swal("", "Remarks cannot be Null..!", "error");
            return false;
        }
        _BmViewOfRemarks.submitdata(1);
    });
    jQuery('#rotate').click(function (e) {
        _BmViewOfRemarks.rotateImage1();
    });
    jQuery('#reject').click(function (e) {
        _BmViewOfRemarks.submitdata(0);
    });
    jQuery('#viewinvoice').click(function (e) {
        var prid = jQuery('#ddlPayType').val();
        if (prid != 0) {
            _BmViewOfRemarks.viewInvoiceImages(prid);
        }
        else {
            swal("Error", "Please Select a PR..!", "error");
            return false;
        }
    });
});
_BmViewOfRemarks.checkAccess();

var colectname = "";

var spanCam = document.getElementsByClassName("close")[0];
spanCam.onclick = function () {
    jQuery('#showimg').hide();

}