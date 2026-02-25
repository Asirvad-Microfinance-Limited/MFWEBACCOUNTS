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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _AddPayData.checkAccessRtn, userdata.token)
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

    HeaderChange: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetPayTypeData = {
            "flag1": "PRRATIFICATIONACCOUNTS",
            "flag2": "CHANGEHEADER",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillHeaderChange, userdata.token)

    },

    FillHeaderChange: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {
                if (response.data.queryResult[0].param2 == '1') {
                    jQuery("#bhheader").show();
                    jQuery("#excessheader").hide();
                }
                else /*if (response.data.queryResult[0].param2 == '2')*/ {
                    jQuery("#bhheader").hide();
                    jQuery("#excessheader").show();
                }
                //else {

                //    swal({
                //        title: "Error found!!",
                //        text: "Please try again.!",
                //        type: "info"
                //    }, function () {
                //        window.location.href = "dashboard";
                //    });
                //}

            }
        }

    },





    GetPayData: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetPayTypeData = {
            "flag1": "PRRATIFICATIONACCOUNTS",
            "flag2": "FILLPAYRDATA",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillPayType, userdata.token)

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
            "flag1": "DMAPPROVALDATA",
            "flag2": "REQDATA",
            "inptvar1": val,
            "inptvar2": userdata.userId,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillReqType, userdata.token)

    },
    FillReqType: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            if (response.data.queryResult.length > 0) {
                var val1 = response.data.queryResult[0].param1.split("~");
                var val2 = response.data.queryResult[0].param2.split("~");
                var val4 = response.data.queryResult[0].param4.split("~");
                var val3 = response.data.queryResult[0].param3.split("~");
                var val5 = response.data.queryResult[0].param5.split("~");
                jQuery("#payType").val(val1[0].split("^")[0]);
                var amtlmt = jQuery("#limitamt");
                var exsamt = jQuery("#excamt");
                if (val5[3] == 2) {
                    jQuery("#prstatus").val("NEW");
                }
                //New Modification
                var bhflag = val4[3];
                var ahflag = val4[4];
                var rmflag = val4[5];
                var zmflag = val4[6];
                var hoflag = val4[7];



                //New Modification
                if (val5[3] == 8 || val5[3] == 51 || val5[3] == 54 || val5[3] == 61 || val5[3] == 64 || val5[3] == 98 || val5[3] == 92 ) {
                    jQuery("#prstatus").val("NEW");
                }
                //New Modification
                if (val5[3] == 51 && ahflag == 1 || val5[3] == 51 && ahflag == 2 || val5[3] == 51 && ahflag == 3 || val5[3] == 51 && ahflag == 4) {
                    jQuery("#prstatus").val("RESUBMITTED PR");
                }
                if (val5[3] == 54 && rmflag == 1 || val5[3] == 54 && rmflag == 2 || val5[3] == 54 && rmflag == 3 || val5[3] == 54 && rmflag == 4) {
                    jQuery("#prstatus").val("RESUBMITTED PR");
                }
                if (val5[3] == 64 && hoflag == 1 || val5[3] == 64 && hoflag == 2 || val5[3] == 64 && hoflag == 3 || val5[3] == 64 && hoflag == 4) {
                    jQuery("#prstatus").val("RESUBMITTED PR");
                }
                if (val5[3] == 61 && zmflag == 1 || val5[3] == 61 && zmflag == 2 || val5[3] == 61 && zmflag == 3 || val5[3] == 61 && zmflag == 4) {
                    jQuery("#prstatus").val("RESUBMITTED PR");
                }
                if (val5[3] == 8 && bhflag == 1 || val5[3] == 8 && bhflag == 2 || val5[3] == 8 && bhflag == 3 || val5[3] == 8 && bhflag == 4) {
                    jQuery("#prstatus").val("RESUBMITTED PR");
                }
                if (val5[3] == 2 && bhflag == 1 || val5[3] == 2 && bhflag == 2 || val5[3] == 2 && bhflag == 3 || val5[3] == 2 && bhflag == 4) {
                    jQuery("#prstatus").val("RESUBMITTED PR");
                }
                if (val5[3] == 98 && bhflag == 1 || val5[3] == 98 && bhflag == 2 || val5[3] == 98 && bhflag == 3 || val5[3] == 98 && bhflag == 4) {
                    jQuery("#prstatus").val("RESUBMITTED PR");
                }
                if (val5[3] == 92 && bhflag == 1 || val5[3] == 92 && bhflag == 2 || val5[3] == 92 && bhflag == 3 || val5[3] == 92 && bhflag == 4) {
                    jQuery("#prstatus").val("RESUBMITTED PR");
                }

                if (val5[3] == 5) {
                    jQuery("#prstatus").val("RESUBMITTED PR");
                }
                //New Modification
                if (val5[3] == 81 || val5[3] == 18) {
                    jQuery("#prstatus").val("RESUBMITTED PR");
                }

                //New Modification Recommend And Approve Button
                var amount = parseFloat(val4[0])
                var amtexcess = parseFloat(val4[1])
                var bhlimit = parseFloat(val5[4])
                var ahlimit = parseFloat(val5[5]);
                var rmlimit = parseFloat(val5[6]);
                var zmlimit = parseFloat(val5[7]);
                var checkholimit = parseFloat(val5[8]);
                var usertype = val5[9]


                //if (usertype == 14) {
                //    if (amtexcess == 0){
                //        jQuery('#submit').show();
                //        jQuery('#recommend').hide();
                //    } else {
                //        jQuery('#submit').hide();
                //        jQuery('#recommend').show();
                //    }
                //}


                if (amtexcess == 0 && usertype == 14) {
                    jQuery('#submit').show();
                    jQuery('#recommend').hide();
                } else if (usertype == 7 && amtexcess <= ahlimit && amtexcess > 0) {
                    jQuery('#submit').show();
                    jQuery('#recommend').hide();
                } else if (usertype == 23 && amtexcess <= rmlimit && amtexcess > ahlimit) {
                    jQuery('#submit').show();
                    jQuery('#recommend').hide();
                } else if (usertype == 125 && amtexcess <= zmlimit && amtexcess > rmlimit) {
                    jQuery('#submit').show();
                    jQuery('#recommend').hide();
                } else if (usertype == 15 && amtexcess <= checkholimit && amtexcess > zmlimit) {
                    jQuery('#submit').show();
                    jQuery('#recommend').hide();
                } else {
                    jQuery('#submit').hide();
                    jQuery('#recommend').show();
                }





                if (parseInt(val1[0].split("^")[1]) >= 100) {
                    jQuery("#reqtotamt").hide();
                    if (amtlmt.hasClass("col-lg-2")) {
                        amtlmt.attr('class', 'col-lg-4');
                    }
                    if (exsamt.hasClass("col-lg-2")) {
                        exsamt.attr('class', 'col-lg-4');
                    }

                    if (parseInt(val3[0]) == 0) {
                        jQuery("#amtLimit").val(val4[0]);
                        jQuery("#excessAmt").val(0);
                    }
                    else if (parseInt(val3[0]) > parseInt(val4[0])) {
                        jQuery("#amtLimit").val(val3[0]);
                        jQuery("#excessAmt").val(0);
                    }
                    else {
                        jQuery("#amtLimit").val(val3[0]);
                        jQuery("#excessAmt").val(val4[0] - val3[0]);
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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetGLReqData, _AddPayData.FillGLData, userdata.token)

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

    // Submit BM,AM,RM,ZM
    SubmitData: function () {//st=1 recommend,st=0 rejected
        if (_AddPayData.checkVals()) {
            jQuery('.page-loader-wrapper').show();
            //var val1 = jQuery("#dmremarks").val() + "@@" + userdata.userId;
            //var val2 = jQuery("#ddlPayType").val() + "!!" + st;
            var val1 = jQuery("#ddlPayType").val();
            var val2 = jQuery("#dmremarks").val().toUpperCase() + "@@" + userdata.userId;

            var GetPayTypeData = {
                "flag1": "PRRATIFICATIONACCOUNTS",
                "flag2": "SUBMITRECOMNEW",
                "inptvar1": val1,
                "inptvar2": val2,
                "typeID": "4",
                "userID": userdata.userId,
                "branchID": userdata.branchId
            };

            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillsubmitData, userdata.token)


        }
    },

    //Recommend BM/AM/Rm/ZM
    RecommendData: function () {//st=1 recommend,st=0 rejected
        if (_AddPayData.checkVals()) {
            jQuery('.page-loader-wrapper').show();
            //var val1 = jQuery("#dmremarks").val() + "@@" + userdata.userId;
            //var val2 = jQuery("#ddlPayType").val() + "!!" + st;
            var val1 = jQuery("#ddlPayType").val();
            var val2 = jQuery("#dmremarks").val().toUpperCase() + "@@" + userdata.userId;

            var GetPayTypeData = {
                "flag1": "PRRATIFICATIONACCOUNTS",
                "flag2": "RECOMMENDNEW",
                "inptvar1": val1,
                "inptvar2": val2,
                "typeID": "4",
                "userID": userdata.userId,
                "branchID": userdata.branchId
            };

            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillsubmitData, userdata.token)


        }
    },


    //Reject By BM/AM/RM/ZM

    RejectData: function () {//st=1 recommend,st=0 rejected
        if (_AddPayData.checkVals()) {
            jQuery('.page-loader-wrapper').show();
            //var val1 = jQuery("#dmremarks").val() + "@@" + userdata.userId;
            //var val2 = jQuery("#ddlPayType").val() + "!!" + st;
            var val1 = jQuery("#ddlPayType").val();
            var val2 = jQuery("#dmremarks").val().toUpperCase() + "@@" + userdata.userId;

            var GetPayTypeData = {
                "flag1": "PRRATIFICATIONACCOUNTS",
                "flag2": "REJECTNEW",
                "inptvar1": val1,
                "inptvar2": val2,
                "typeID": "4",
                "userID": userdata.userId,
                "branchID": userdata.branchId
            };

            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillsubmitData, userdata.token)


        }
    },


    FillsubmitData: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {
                if (response.data.queryResult[0].param2 == '3') {
                    swal({
                        title: "Approved",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
                else if (response.data.queryResult[0].param2 == '4') {
                    swal({
                        title: "Reject",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });

                }
                else if (response.data.queryResult[0].param2 == '5') {
                    swal({
                        title: "Recommend",
                        text: response.data.queryResult[0].param1,
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });

                }
                else {

                    swal({
                        title: "Error found!!",
                        text: "Please try again.!",
                        type: "info"
                    }, function () {
                        window.location.href = "dashboard";
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

    viewInvoiceImagesLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            var max = response.data.imageData.length;
            var $image = jQuery('<img class="north" id = "rtimg" src="data:image/png;base64,' + response.data.imageData[max - 1].imageString + ' " height="450" width="50%" >');

            //var $image = jQuery('<img class="north" id = "rtimg" src="data:image/png;base64,' + response.data.imageString + ' " height="450" width="50%" >');
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

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillCollectionName, userdata.token)

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



    _AddPayData.HeaderChange();
    _AddPayData.GetPayData();
    jQuery('#ddlPayType').change(function (e) {
        jQuery('#showimg').hide();
        jQuery('#GLAHDetails').hide();
        jQuery('#GLRMDetails').hide();
        jQuery('#GLHOOPDetails').hide();
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
        _AddPayData.SubmitData();
    });
    //New Modification
    jQuery('#recommend').click(function (e) {
        _AddPayData.RecommendData();
    });

    jQuery('#rotate').click(function (e) {
        _AddPayData.rotateImage1();
    });

    jQuery('#reject').click(function (e) {
        _AddPayData.RejectData();
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
//_AddPayData.checkAccess();

var colectname = "";

var spanCam = document.getElementsByClassName("close")[0];
spanCam.onclick = function () {
    jQuery('#showimg').hide();

}