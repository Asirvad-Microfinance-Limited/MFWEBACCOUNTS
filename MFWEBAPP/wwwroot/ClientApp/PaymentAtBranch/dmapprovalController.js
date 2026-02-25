var expToDate;
var expFromDate;
var _AddPayData = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var CheckAccess = {
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1002",
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
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                var x = response.data.queryResult.QueryResult[0].param1;
                if (x == "1") {
                    //document.getElementById("editFrom").disabled = true;
                    //document.getElementById("editTo").disabled = true; 
                    _AddPayData.GetPostId();
                    _AddPayData.GetPayData();
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
        }
    },


    //checkAccessRtn: function (response) {
    //    if (response.status === "SUCCESS") {
    //        jQuery('.page-loader-wrapper').hide();
    //        if (response.data.queryResult.length > 0) {
    //            var x = response.data.queryResult[0].param1;
    //            if (x == "0") {
    //                swal({
    //                    title: "Access Denied",
    //                    text: "You are not autherized to view this page.!",
    //                    type: "info"
    //                }, function () {
    //                    window.location.href = "dashboard";
    //                });
    //            }

    //        }
    //    }
    //    else {
    //        swal({
    //            title: "Access Denied",
    //            text: "You are not autherized to view this page.!",
    //            type: "info"
    //        }, function () {
    //            window.location.href = "dashboard";
    //        });
    //    }
    //},
    GetPostId: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetPost = {
            "flag1": "DMAPPROVALDATA",
            "flag2": "GET_POST",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            GetPost = JSON.stringify(GetPost);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetPost = { "encryptedRqstStr": EncryptAPIReq(GetPost) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPost, _AddPayData.Check_PostId, userdata.token)

    },
    Check_PostId: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                var val1 = response.data.queryResult.QueryResult[0].param1;
                if (val1 == 93) {
                    jQuery('#editFrom').show();
                    jQuery('#editTo').show();
                }
            }
        }
    },
    GetPayData: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetPayTypeData = {
            "flag1": "DMAPPROVALDATA",
            "flag2": "PAYREQ",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillPayType, userdata.token)

    },
    FillPayType: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

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
        jQuery('.page-loader-wrapper').show();
        var GetPayTypeData = {
            "flag1": "DMAPPROVALDATA",
            "flag2": "REQDATA",
            "inptvar1": val,
            "inptvar2": userdata.userId,
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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillReqType, userdata.token)

    },
    FillReqType: function (response) {
        jQuery('.page-loader-wrapper').hide();
        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
        if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


            if (response.data.queryResult.QueryResult.length > 0) {
                var val1 = response.data.queryResult.QueryResult[0].param1.split("~");
                var val2 = response.data.queryResult.QueryResult[0].param2.split("~");
                var val4 = response.data.queryResult.QueryResult[0].param4.split("~");
                var val3 = response.data.queryResult.QueryResult[0].param3.split("~");
                var val5 = response.data.queryResult.QueryResult[0].param5.split("~");
                jQuery("#payType").val(val1[0].split("^")[0]);
                var amtlmt = jQuery("#limitamt");
                var exsamt = jQuery("#excamt");
                //if (val5[3] == 1) {
                //    jQuery("#prstatus").val("NEW");
                //} for vapt testing //
                if (val5[3] == 2) {
                    jQuery("#prstatus").val("NEW");
                }
                //New Modification
                if (val5[3] == 50 || val5[3] == 60 || val5[3] == 70 || val5[3] == 1 || val5[3] == 51 || val5[3] == 54 || val5[3] == 61 || val5[3] == 64 || val5[3] == 84 || val5[3] == 85 || val5[3] == 57 || val5[3] == 81 || val5[3] == 107 || val5[3] == 113 || val5[3] == 120 || val5[3] == 132 || val5[3] == 131 || val5[3] == 152) {
                    jQuery("#prstatus").val("NEW");
                }
                if (val5[3] == 5 || val5[3] == 100 || val5[3] == 101 || val5[3] == 102 || val5[3] == 103 || val5[3] == 104 || val5[3] == 89 || val5[3] == 105 || val5[3] == 135 || val5[3] == 136 || val5[3] == 139 || val5[3] == 140 || val5[3] == 143 || val5[3] == 146) {
                    jQuery("#prstatus").val("RESUBMITTED PR");
                }
                if (parseInt(val1[0].split("^")[1]) >= 1) {
                    jQuery("#reqtotamt").hide();
                    if (amtlmt.hasClass("col-lg-2")) {
                        amtlmt.attr('class', 'col-lg-4');
                    }
                    if (exsamt.hasClass("col-lg-2")) {
                        exsamt.attr('class', 'col-lg-4');
                    }

                    if (parseInt(val3[0]) < parseInt(val4[0])) {
                        jQuery("#amtLimit").val(val3[0]);
                        jQuery("#excessAmt").val(val4[0] - val3[0]);
                    }
                    else if (parseInt(val3[0]) > parseInt(val4[0])) {
                        jQuery("#amtLimit").val(val3[0]);
                        jQuery("#excessAmt").val(0);
                    }

                    else if (!val3[0] || val3[0].trim() === '') {
                        jQuery("#amtLimit").val('NA');
                        jQuery("#excessAmt").val(0);
                    }
                }
                else {
                    jQuery("#reqtotamt").show();
                    amtlmt.attr('class', 'col-lg-2');
                    exsamt.attr('class', 'col-lg-2');
                    jQuery("#amtLimit").val(val3[0]);
                    jQuery("#excessAmt").val(val4[1]);
                }
                //jQuery("#bhremarks").val(val1[1]);
                jQuery("#gstin").val(val2[0]);
                jQuery("#vendorName").val(val1[3]);
                jQuery("#branch").val(val2[1]);
                //if (parseInt(val3[0]) == 0) {
                //    jQuery("#amtLimit").val(val4[0]);
                //    jQuery("#excessAmt").val(0);
                //}
                //else if (val3[0] > val4[0]) {
                //    jQuery("#amtLimit").val(val3[0]);
                //    jQuery("#excessAmt").val(val3[0] - val4[0]);
                //}
                //else {
                //    jQuery("#amtLimit").val(val3[0]);
                //    jQuery("#excessAmt").val(val4[0] - val3[0]);
                //}
                jQuery("#totreqAmt").val(val3[1]);
                jQuery("#requser").val(val1[2]);
                jQuery("#requserRemark").val(val1[1]);
                jQuery("#reqAmt").val(val4[0]);

                jQuery("#billdt").val(val4[2].replace(/\s/g, ''));
                jQuery("#sgst").val(val5[0]);
                jQuery("#cgst").val(val5[1]);
                jQuery("#igst").val(val5[2]);
                jQuery("#invoice_no").val(val5[4]);
                //jQuery("#expfrom").val(val5[5].replace(/\s/g, ''));
                //jQuery("#expto").val(val5[6].replace(/\s/g, ''));

                expFromDate = _AddPayData.convertdateformat(val5[5].replace(/\s/g, ''));
                expToDate = _AddPayData.convertdateformat(val5[6].replace(/\s/g, ''));


                jQuery("#expfrom").val(expFromDate);
                jQuery("#expto").val(expToDate);
                var val = jQuery("#ddlPayType").val();
                _AddPayData.GetGLData(val);

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
        try {
            GetGLReqData = JSON.stringify(GetGLReqData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetGLReqData = { "encryptedRqstStr": EncryptAPIReq(GetGLReqData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetGLReqData, _AddPayData.FillGLData, userdata.token)

    },
    FillGLData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
        if (response.status === "SUCCESS") {
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                //if (response.data.queryResult.length > 0) {
                var val1 = parseInt(response.data.queryResult.QueryResult[0].param1);

                if (val1 == 6) {
                    jQuery('#GLAHDetails').show();
                    var val2 = response.data.queryResult.QueryResult[0].param2.split("~");
                    jQuery('#recommendedAH').val(val2[0]);
                    jQuery('#recommendedAHRemark').val(val2[1]);
                    jQuery('#GLRMDetails').show();
                    var val2 = response.data.queryResult.QueryResult[0].param3.split("~");
                    jQuery('#recommendedRM').val(val2[0]);
                    jQuery('#recommendedRMRemark').val(val2[1]);
                    jQuery('#infrahead').show();
                    var val2 = response.data.queryResult.QueryResult[0].param4.split("~");
                    jQuery('#recommendedinfrahead').val(val2[0]);
                    jQuery('#recommendedinfraheadRemark').val(val2[1]);
                }


                else if (val1 == 7) {
                    jQuery('#GLAHDetails').show();
                    var val2 = response.data.queryResult.QueryResult[0].param2.split("~");
                    jQuery('#recommendedAH').val(val2[0]);
                    jQuery('#recommendedAHRemark').val(val2[1]);
                    jQuery('#GLRMDetails').show();
                    var val2 = response.data.queryResult.QueryResult[0].param3.split("~");
                    jQuery('#recommendedRM').val(val2[0]);
                    jQuery('#recommendedRMRemark').val(val2[1]);
                    jQuery('#GLHOOPDetails').show();
                    var val2 = response.data.queryResult.QueryResult[0].param4.split("~");
                    jQuery('#recommendedHOP').val(val2[0]);
                    jQuery('#recommendedHOPRemarks').val(val2[1]);
                    jQuery('#infrahead').show();
                    var val2 = response.data.queryResult.QueryResult[0].param4.split("~");
                    jQuery('#recommendedinfrahead').val(val2[0]);
                    jQuery('#recommendedinfraheadRemark').val(val2[1]);
                }

                //newly added for zm//
                else if (val1 == 4) {
                    jQuery('#GLAHDetails').show();
                    var val2 = response.data.queryResult.QueryResult[0].param2.split("~");
                    jQuery('#recommendedAH').val(val2[0]);
                    jQuery('#recommendedAHRemark').val(val2[1]);
                    jQuery('#GLRMDetails').show();
                    var val2 = response.data.queryResult.QueryResult[0].param3.split("~");
                    jQuery('#recommendedRM').val(val2[0]);
                    jQuery('#recommendedRMRemark').val(val2[1]);
                    jQuery('#GLHOOPDetails').show();
                    var val2 = response.data.queryResult.QueryResult[0].param4.split("~");
                    jQuery('#recommendedHOP').val(val2[0]);
                    jQuery('#recommendedHOPRemarks').val(val2[1]);
                    jQuery('#infdrahead').hide();
                    var val2 = response.data.queryResult.QueryResult[0].param5.split("~");
                    jQuery('#recommendedZM').val(val2[0]);
                    jQuery('#recommendedzmRemarks').val(val2[1]);
                    jQuery('#GLZMRecommneded').show();
                }


                else {

                    if (val1 >= 1) {
                        jQuery('#GLAHDetails').show();
                        var val2 = response.data.queryResult.QueryResult[0].param2.split("~");
                        jQuery('#recommendedAH').val(val2[0]);
                        jQuery('#recommendedAHRemark').val(val2[1]);
                    }
                    if (val1 >= 2) {
                        jQuery('#GLRMDetails').show();
                        var val2 = response.data.queryResult.QueryResult[0].param3.split("~");
                        jQuery('#recommendedRM').val(val2[0]);
                        jQuery('#recommendedRMRemark').val(val2[1]);
                    }
                    if (val1 >= 3) {
                        jQuery('#GLHOOPDetails').show();
                        var val2 = response.data.queryResult.QueryResult[0].param4.split("~");
                        jQuery('#recommendedHOP').val(val2[0]);
                        jQuery('#recommendedHOPRemarks').val(val2[1]);
                    }
                    if (val1 >= 4) {
                        jQuery('#GLBusinessHeadDetails').show();
                        var val2 = response.data.queryResult.QueryResult[0].param5.split("~");
                        jQuery('#recommendedBUHEAD').val(val2[0]);
                        jQuery('#recommendedBUHEADRemark').val(val2[1]);
                    }

                }
            }
        }
        _AddPayData.GetGST();
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

            _http.post(MFPUBLICKYCAPI_URL + "api/gst", GetGSTValue, _AddPayData.FillGST, userdata.token)
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
    checkDateValidity: function () {
        var frmdtval = Date.parse(jQuery('#expfrom').val());
        var todtval = Date.parse(jQuery('#expto').val());


        var dif = (todtval - frmdtval) / 86400000; // Difference in days
        if (!(isNaN(dif))) {
            if (dif <= 0) {
                swal("Invalid Date Selection", "To Date must be greater than From Date..!", "error");
                jQuery('#expto').val(""); // Clear invalid "To Date"
                return false;

            }
        }
    },
    checkDateEquality: function (dt1, dt2) {
        var dt1 = Date.parse(dt1);
        var dt2 = Date.parse(dt2);
        var dif = (dt2 - dt1) / 86400000; // Difference in days
        if (!(isNaN(dif))) {
            return dif;
        }
    },
    convertdateformat: function (dt) {
        let [vday, vmonthName, vyear] = dt.split('-');
        vday = parseInt(vday);


        vday = vday < 10 ? '0' + vday : vday;

        const monthMap = {
            'January': 'Jan',
            'February': 'Feb',
            'March': 'Mar',
            'April': 'Apr',
            'May': 'May',
            'June': 'Jun',
            'July': 'Jul',
            'August': 'Aug',
            'September': 'Sep',
            'October': 'Oct',
            'November': 'Nov',
            'December': 'Dec'
        };

        vmonthName = vmonthName.charAt(0).toUpperCase() + vmonthName.slice(1).toLowerCase();

        let vmon = monthMap[vmonthName];

        if (!vmon) {
            return "Invalid month name";
        }

        let valtortn = vday + '-' + vmon + '-' + vyear;
        return valtortn;
    },
    submitdata: function (st) {//st=1 Approved,st=0 rejected
        if (_AddPayData.checkVals()) {
            jQuery('.page-loader-wrapper').show();

            var dateFrom = jQuery("#expfrom").val();
            var toDate = jQuery("#expto").val();
            var val1;

            //if (isNaN(dateFrom)) {
            //    swal("", "Please select the from date..!", "error");
            //    return false;
            //}
            //else if (isNaN(toDate)) {
            //    swal("", "Please select the from date..!", "error");
            //    return false;
            //}

            if (_AddPayData.checkDateEquality(dateFrom, expFromDate) === 0 && _AddPayData.checkDateEquality(toDate, expToDate) === 0) {
                val1 = jQuery("#dmremarks").val() + "@@" + userdata.userId + "@@" + 'NULL' + "@@" + 'NULL' + "@@" + userdata.branchId;
            } else {
                val1 = jQuery("#dmremarks").val() + "@@" + userdata.userId + "@@" + dateFrom + "@@" + toDate + "@@" + userdata.branchId;
            }
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
            try {
                GetPayTypeData = JSON.stringify(GetPayTypeData);
            } catch (e) {
                swal("", e.message, "warning");
                return false;
            }
            GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillsubmitData, userdata.token)


        }
    },
    FillsubmitData: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                var rep = response.data.queryResult.QueryResult[0].param2;
                if (rep == "4" || rep == "30" || rep == "31" || rep == "32" || rep == "33" || rep == "34" || rep == "58" || rep == "55" || rep == "62" || rep == "65" || rep == "87" || rep == "88" || rep == "82" || rep == "108" || rep == "114" || rep == "133" || rep == "134" || rep == "138") {
                    swal({
                        title: "Rejected",
                        text: response.data.queryResult.QueryResult[0].param1,
                        type: "info"
                    }, function () {
                        window.location.reload(true);
                    });
                }
                else if (rep == "3" || rep == "53" || rep == "50" || rep == "59" || rep == "63" || rep == "66" || rep == "72" || rep == "86" || rep == "53" || rep == "80" || rep == "106" || rep == "110" || rep == "112") {
                    swal({
                        title: "Approved",
                        text: response.data.queryResult.QueryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
                else if (rep == "15" || rep == "58" || rep == "52" || rep == "55" || rep == "62" || rep == "65" || rep == "73") {
                    swal({
                        title: "Rejected",
                        text: response.data.queryResult.QueryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }



                else {
                    swal({
                        title: "Recommended",
                        text: response.data.queryResult.QueryResult[0].param1,
                        type: "success"
                    },
                        function () {
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/images", invimagemageData, _AddPayData.viewInvoiceImagesLoadCompleted, userdata.token)
    },
    //IMAGE VIEW NEW//
    viewInvoiceImagesLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            var images = response.data.imageData;   // list of images
            var $container = jQuery('#ImageDiv');
            $container.empty();                     // clear old content

            // create carousel wrapper
            var $carousel = jQuery(
                '<div id="invoiceCarousel" class="carousel slide" data-ride="carousel">' +
                '<div class="carousel-inner"></div>' +
                '<a class="carousel-control-prev" href="#invoiceCarousel" role="button" data-slide="prev">' +
                '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
                '<span class="sr-only">Previous</span>' +
                '</a>' +
                '<a class="carousel-control-next" href="#invoiceCarousel" role="button" data-slide="next">' +
                '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
                '<span class="sr-only">Next</span>' +
                '</a>' +
                '</div>'
            );

            var $inner = $carousel.find('.carousel-inner');

            // loop through all images
            for (var i = 0; i < images.length; i++) {
                var imgBase64 = images[i].imageString;
                var fileType = images[i].fileType || "png"; // default to png

                var $item = jQuery(
                    '<div class="carousel-item ' + (i === 0 ? 'active' : '') + '">' +
                    '<img class="d-block w-100 rtimg" ' +
                    'src="data:image/' + fileType + ';base64,' + imgBase64 + '" ' +
                    'height="450" style="margin:auto;" />' +
                    '</div>'
                );

                // initialize rotation state for each image
                $item.find('img').data('rotate', 0);

                $inner.append($item);
            }

            $container.append($carousel);

            jQuery('#ImageModel').modal('show');

            // apply zoom to all images
            jQuery('.rtimg').each(function () {
                jQuery(this).imageZoom();
            });

            // rotation logic
            jQuery('#rotate').off('click').on('click', function () {
                // find the currently active image in the carousel
                var $activeImg = jQuery('#invoiceCarousel .carousel-item.active img');

                if ($activeImg.length) {
                    var currentAngle = $activeImg.data('rotate') || 0;
                    var newAngle = (currentAngle + 90) % 360;

                    $activeImg.css({
                        'transform': 'rotate(' + newAngle + 'deg)',
                        'transition': 'transform 0.3s ease' // smooth animation
                    });

                    // save new angle for this image
                    $activeImg.data('rotate', newAngle);
                }
            });

        } else {
            _General.noData(jQuery('#divInvimages'), "No Data Found");
        }
    },

    //viewInvoiceImagesLoadCompleted: function (response) {
    //    jQuery('.page-loader-wrapper').hide();
    //    if (response.status === "SUCCESS") {

    //        var max = response.data.imageData.length;
    //        var $image = jQuery('<img class="north" id = "rtimg" src="data:image/png;base64,' + response.data.imageData[max - 1].imageString + ' " height="450" width="50%" >');

    //        //var $image = jQuery('<img class="north" id = "rtimg" src="data:image/png;base64,' + response.data.imageString + ' " height="450" width="50%" >');
    //        jQuery('#ImageModel').modal('show');
    //        jQuery('#ImageDiv').html($image);

    //        var zoomImage = jQuery('#rtimg');
    //        zoomImage.imageZoom();

    //    }
    //    else {
    //        //jQuery('.page-loader-wrapper').hide();
    //        _General.noData(jQuery('#divInvimages'), "No Data Found");

    //    }
    //},


    //rotateImage1: function () {
    //    var img = jQuery('#rtimg1');
    //    if (img.hasClass('north')) {
    //        img.attr('class', 'west');
    //    } else if (img.hasClass('west')) {
    //        img.attr('class', 'south');
    //    } else if (img.hasClass('south')) {
    //        img.attr('class', 'east');
    //    } else if (img.hasClass('east')) {
    //        img.attr('class', 'north');
    //    }
    //},
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
        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

        if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

            colectname = response.data.queryResult.QueryResult[0].param1;
        }
    }

}


jQuery(document).ready(function ($) {

    jQuery('.page-loader-wrapper').hide();
    //_AddPayData.GetPost();
    $('#editFrom').hide();
    $('#editTo').hide();
    // _AddPayData.GetPayData();
    jQuery('#ddlPayType').change(function (e) {
        jQuery('#showimg').hide();
        jQuery('#GLAHDetails').hide();
        jQuery('#GLRMDetails').hide();
        jQuery('#GLHOOPDetails').hide();
        jQuery('#GLZMRecommneded').hide();
        jQuery('#GLBusinessHeadDetails').hide();



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
        _AddPayData.submitdata(1);
    });

    //comment for image multiple  rotate//09/01/2025
    //jQuery('#rotate').click(function (e) {
    //    _AddPayData.rotateImage1();
    //});

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

    jQuery('#editFrom').click(function (e) {
        jQuery('#bs_datepicker_container20 input').datepicker({
            autoclose: true,
            format: "dd-M-yyyy",
            startDate: '-90d',
            endDate: new Date(),
            container: '#bs_datepicker_container20',
            changeMonth: true,
            showButtonPanel: true,
            orientation: 'bottom auto'
        }).change(function () {
            _AddPayData.checkDateValidity();
        });
    });

    jQuery('#editTo').click(function (e) {
        jQuery('#bs_datepicker_container21 input').datepicker({
            autoclose: true,
            format: "dd-M-yyyy",
            startDate: '-90d',
            endDate: new Date(),
            container: '#bs_datepicker_container21',
            changeMonth: true,
            showButtonPanel: true,
            orientation: 'bottom auto'
        }).change(function () {
            _AddPayData.checkDateValidity();
        });

    });


});
_AddPayData.checkAccess();

var colectname = "";

var spanCam = document.getElementsByClassName("close")[0];
spanCam.onclick = function () {
    jQuery('#showimg').hide();

}