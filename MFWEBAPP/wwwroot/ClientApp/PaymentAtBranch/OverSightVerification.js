var _AddOversightdata = {

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
        CheckAccess = JSON.stringify(CheckAccess);
        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _AddOversightdata.checkAccessRtn, userdata.token)
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
    tokenValidate: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var CheckToken = {
            "typeID": "1",
            "userID": userdata.userId,
            "branchID": userdata.branchId

        };



        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _AddOversightdata.checkAccessToken, userdata.token)
    },

    checkAccessToken: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            token = response.data.tokenId;
            if (response.data.errStatus == 0) {
                swal({
                    title: "Access Denied",
                    text: "You are already login in pr module!",
                    type: "info"
                }, function () {
                    window.location.href = "dashboard";
                });
            }
            else {
                _AddOversightdata.GetPayData1();
            }


        }
        else if (response.responseMsg == "Invalid Token") {
            window.location.href = DOMAIN_URL;
        }

    },


    GetPayid: function () {
        jQuery('.page-loader-wrapper').show();

        var GetPayIdData = {
            "flag1": "LOADOVERSIGHT",
            "flag2": "GETOVERSIGHT",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId

        };
        GetPayIdData = JSON.stringify(GetPayIdData);
        GetPayIdData = { "encryptedRqstStr": EncryptAPIReq(GetPayIdData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratOversightDelegation", GetPayIdData, _AddOversightdata.FillPayidtype, userdata.token)

    },
    FillPayidtype: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            var chk = response.data.queryResult.QueryResult[0].param1;
            if (chk != 0) {
                if (response.data.queryResult.QueryResult.length > 0) {

                    jQuery("#ddlPayIds").empty();
                    jQuery("#ddlPayIds").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PR-------- "));
                    jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                        jQuery("#ddlPayIds").append(jQuery("<option></option>").val(val.param1).text(val.param1));
                    });
                }


                else {
                    jQuery("#ddlPayIds").empty();
                    jQuery("#ddlPayIds").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PR-------- "));
                }

            }
            else {


                /*swal("", "Please Do the Audit Punch ..!", "error");*/
                swal({
                    title: "Warning",
                    text: "Please Do Audit Punch.!",
                    type: "info"
                }, function () {
                    window.location.href = "dashboard";
                });
                return false;


            }


        }
        else {

            jQuery("#ddlPayIds").empty();
            jQuery("#ddlPayIds").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PR-------- "));
        }
    },


    //GET POST ID 

    GetPostId: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetPost = {
            "flag1": "LOADOVERSIGHT",
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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratOversightDelegation", GetPost, _AddOversightdata.Check_PostId, userdata.token)

    },
    Check_PostId: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                var val1 = response.data.queryResult.QueryResult[0].param1;
                if (val1 == 92 || val1 == 23 || val1 == 303 || val1 == 262 || val1 == 7 || val1 == 125 || val1 == 292 || val1 == 346 || val1 == 435) {

                    _AddOversightdata.FetchDatas();

                } else if (val1 == 134 || val1 == 89 || val1 == 98 || val1 == 10 || val1 == 635) {
                    _AddOversightdata.FetchDataIntAud();
                }
            }
        }
    },


    //************************************************

    FetchDatas: function () {
        jQuery('.page-loader-wrapper').show();
        var val = jQuery("#ddlPayIds").val();

        var FetchOversight = {
            "flag1": "LOADOVERSIGHT",
            "flag2": "FETCHOVERSIGHTPR",
            "inptvar1": val,
            "inptvar2": userdata.branchId + "@@" + userdata.userId,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId

        };

        FetchOversight = JSON.stringify(FetchOversight);
        FetchOversight = { "encryptedRqstStr": EncryptAPIReq(FetchOversight) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratOversightDelegation", FetchOversight, _AddOversightdata.FillPaydetails, userdata.token)

    },

    FillPaydetails: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {
                var status = response.data.queryResult.QueryResult[0].param1.split('~');

                jQuery('#branchids').val(status[0]);
                jQuery('#branchname').val(status[1]);
                jQuery('#expensetype').val(status[2]);
                jQuery('#Billdates').val(status[3]);
                jQuery('#approvaldate').val(status[4])
                jQuery('#celinglimit').val(status[5]);
                jQuery('#frmdateover').val(status[6]);
                jQuery('#todateovr').val(status[7]);
                jQuery('#billnumber').val(status[8]);
                jQuery('#Requester').val(status[9]);
                jQuery('#amountt').val(status[10]);
                jQuery('#appvrrmrks').val(status[11]);
                jQuery('#appvrempcode').val(status[12]);
                jQuery('#expdate').val(status[13]); 






            }
        }

    },

    // FOR intelligence @  auditor

    FetchDataIntAud: function () {
        jQuery('.page-loader-wrapper').show();
        var val = jQuery("#ddlPayIds").val();

        var FetchOversightInt = {
            "flag1": "LOADOVERSIGHT",
            "flag2": "FETCHOVERSIGHTPR",
            "inptvar1": val,
            "inptvar2": userdata.branchId + "@@" + userdata.userId,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId

        };

        FetchOversightInt = JSON.stringify(FetchOversightInt);
        FetchOversightInt = { "encryptedRqstStr": EncryptAPIReq(FetchOversightInt) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratOversightDelegation", FetchOversightInt, _AddOversightdata.FillPaydetailIntAud, userdata.token)

    },

    FillPaydetailIntAud: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {
                var status = response.data.queryResult.QueryResult[0].param1.split('~');

                jQuery('#branchids').val(status[0]);
                jQuery('#branchname').val(status[1]);
                jQuery('#expensetype').val(status[2]);
                jQuery('#Billdates').val(status[3]);
                jQuery('#approvaldate').val(status[4])
                jQuery('#celinglimit').val(status[5]);
                jQuery('#frmdateover').val(status[6]);
                jQuery('#todateovr').val(status[7]);
                jQuery('#billnumber').val(status[8]);
                jQuery('#Requester').val(status[9]);
                jQuery('#amountt').val(status[10]);
                jQuery('#appvrrmrks').val(status[11]);
                jQuery('#appvrempcode').val(status[12]);
                jQuery('#expdate').val(status[13]);
                jQuery('#tempremrks').show();
                jQuery('#TempEmcode').show();
                jQuery('#Overightapprvremrks').val(status[14]);
                jQuery('#Ovrsightappemp').val(status[15]);







            }
        }

    },


    //NEW CHANGE FOR IMAGE VIEW//

    //viewInvoiceImagesLoadCompleted: function (response) {
    //    jQuery('.page-loader-wrapper').hide();
    //    if (response.status === "SUCCESS") {

    //        var images = response.data.imageData;   // list of images
    //        var $container = jQuery('#ImageDiv');
    //        $container.empty();                     // clear old content

    //        // create carousel wrapper
    //        var $carousel = jQuery(
    //            '<div id="invoiceCarousel" class="carousel slide" data-ride="carousel">' +
    //            '<div class="carousel-inner"></div>' +
    //            '<a class="carousel-control-prev" href="#invoiceCarousel" role="button" data-slide="prev">' +
    //            '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
    //            '<span class="sr-only">Previous</span>' +
    //            '</a>' +
    //            '<a class="carousel-control-next" href="#invoiceCarousel" role="button" data-slide="next">' +
    //            '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
    //            '<span class="sr-only">Next</span>' +
    //            '</a>' +
    //            '</div>'
    //        );

    //        var $inner = $carousel.find('.carousel-inner');

    //        // loop through all images
    //        for (var i = 0; i < images.length; i++) {
    //            var imgBase64 = images[i].imageString;
    //            var fileType = images[i].fileType || "png"; // default to png

    //            var $item = jQuery(
    //                '<div class="carousel-item ' + (i === 0 ? 'active' : '') + '">' +
    //                '<img class="d-block w-100 rtimg" ' +
    //                'src="data:image/' + fileType + ';base64,' + imgBase64 + '" ' +
    //                'height="450" style="margin:auto;" />' +
    //                '</div>'
    //            );

    //            // initialize rotation state for each image
    //            $item.find('img').data('rotate', 0);

    //            $inner.append($item);
    //        }

    //        $container.append($carousel);

    //        jQuery('#ImageModel').modal('show');

    //        // apply zoom to all images
    //        jQuery('.rtimg').each(function () {
    //            jQuery(this).imageZoom();
    //        });

    //        // rotation logic
    //        jQuery('#rotate').off('click').on('click', function () {
    //            // find the currently active image in the carousel
    //            var $activeImg = jQuery('#invoiceCarousel .carousel-item.active img');

    //            if ($activeImg.length) {
    //                var currentAngle = $activeImg.data('rotate') || 0;
    //                var newAngle = (currentAngle + 90) % 360;

    //                $activeImg.css({
    //                    'transform': 'rotate(' + newAngle + 'deg)',
    //                    'transition': 'transform 0.3s ease' // smooth animation
    //                });

    //                // save new angle for this image
    //                $activeImg.data('rotate', newAngle);
    //            }
    //        });

    //    } else {
    //        _General.noData(jQuery('#divInvimages'), "No Data Found");
    //    }
    //},


    viewInvoiceImages: function (x) {
        jQuery('.page-loader-wrapper').show();
        var invimagemageData = {
            "recordingId": x,
            "collectionName": colectname
        }


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/images", invimagemageData, _AddOversightdata.viewInvoiceImagesLoadCompleted, userdata.token)
    },

    viewInvoiceImagesLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            var max = response.data.imageData.length;
            var $image = jQuery('<img class="north" id = "rtimg" src="data:image/png;base64,' + response.data.imageData[max - 1].imageString + ' " height="450" width="50%" >');
            //var $image = jQuery('<img class="north" id="rtimg" src="data:image/png;base64,' + response.data.imageData[max - 1].imageString + '" alt="Invoice Image" />');

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
        GetPayTypeData = JSON.stringify(GetPayTypeData);
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddOversightdata.FillCollectionName, userdata.token)

    },
    FillCollectionName: function (response) {

        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
        if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
            colectname = response.data.queryResult.QueryResult[0].param1;

        }

    },


    submitpaydata: function () {
      
            jQuery('.page-loader-wrapper').show();

            var remarksss = jQuery('#addremarks').val();

            if (remarksss == "") {
                swal("", "Remarks cannot be Null..!", "error");
                return false;
            }

            var val = jQuery("#ddlPayIds").val();
            var verifyremrks = jQuery("#addremarks").val();



            var submitpaydatas = {
                "flag1": "LOADOVERSIGHT",
                "flag2": "SUBMITOVERSIGHTAH",
                "inptvar1": " ",
                "inptvar2": userdata.branchId + "@@" + userdata.userId + "@@" + verifyremrks + "@@" + val,
                "typeID": "4",
                "userID": userdata.userId,
                "branchID": userdata.branchId

            };

            submitpaydatas = JSON.stringify(submitpaydatas);
            submitpaydatas = { "encryptedRqstStr": EncryptAPIReq(submitpaydatas) };

            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratOversightDelegation", submitpaydatas, _AddOversightdata.submitPayidtype, userdata.token)
        
    },

    submitPayidtype: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            swal({
                title: "verified",
                text: response.data.queryResult.QueryResult[0].param1,
                type: "success"
            }, function () {
                window.location.reload(true);


            });

        }
    },
    


}








jQuery(document).ready(function ($) {
    _AddOversightdata.checkAccess();
    _AddOversightdata.GetPayid();
    // _AddOversightdata.GetGlData();
    //_AddOversightdata.FetchDatas();

    //_AddOversightdata.getCollectionName(val);
    //jQuery('.page-loader-wrapper').hide();
    jQuery('#ddlPayIds').change(function (e) {
        jQuery('#checkbox').show();
        _AddOversightdata.GetPostId();
        /*_AddOversightdata.FetchDatas();*/
        var val = jQuery("#ddlPayIds").val();
        if (val != 0) {

            _AddOversightdata.getCollectionName(val);

        }
        else {
            colectname = "";
        }
    });
    jQuery('#approval').click(function (e) {

        _AddOversightdata.submitpaydata();
        jQuery('.page-loader-wrapper').hide();

       




    });
    jQuery('#rotate').click(function (e) {
        _AddOversightdata.rotateImage1();
    });
    jQuery('#viewinvoice').click(function (e) {
        var prid = jQuery('#ddlPayIds').val();
        if (prid != 0) {
            _AddOversightdata.viewInvoiceImages(prid);
        }
        else {
            swal("Error", "Please Select a PR..!", "error");
            return false;
        }





    });


});
var colectname = "";
var spanCam = document.getElementsByClassName("close")[0];
spanCam.onclick = function () {
    jQuery('#showimg').hide();

}
