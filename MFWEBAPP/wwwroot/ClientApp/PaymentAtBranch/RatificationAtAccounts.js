var prid;
var _AddPayData = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var CheckAccess = {
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1003",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        //encryption//
        CheckAccess = JSON.stringify(CheckAccess);
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
                    _AddPayData.GetOutwardData();
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

    GetOutwardData: function () {
        var Str = " ";
        var GetPayTypeData = {
            "flag1": "RATIFICATIONACCOUNTS",
            "flag2": "FILLOUTWARDDATA",
            "inptvar1": userdata.userId,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        //encryption//
        GetPayTypeData = JSON.stringify(GetPayTypeData);
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillOutwardData, userdata.token)

    },
    FillOutwardData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery("#ddlOutWard").empty();
                jQuery("#ddlOutWard").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlOutWard").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlOutWard").empty();
                jQuery("#ddlOutWard").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));
            }
        }
        else {

            jQuery("#ddlOutWard").empty();
            jQuery("#ddlOutWard").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));
        }
    },
    GetPRData: function (stateID, brtype) {
        var Str = " ";
        jQuery('.page-loader-wrapper').show();
        var GetPayTypeData = {
            "flag1": "RATIFICATIONACCOUNTS",
            "flag2": "FILLPRDDATA",
            "inptvar1": stateID,
            "inptvar2": brtype,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        GetPayTypeData = JSON.stringify(GetPayTypeData);
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillPRData, userdata.token)

    },
    FillPRData: function (response) {

        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#maincard').show();
            jQuery('#confirm').show();
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('#paymenttabl').empty();
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                    var $row = jQuery('<tr/>');
                    var data1 = val.param1.split("~");
                    var data2 = val.param2.split("~");
                    var data3 = val.param3.split("~");
                    var data4 = val.param4.split("~");
                    var data5 = val.param5.split("~");
                    checkarr[i] = data1[1];
                    nval = nval + 1;
                    var branch = data3[1] + '(' + data1[0] + ')';
                    $row.append(jQuery('<td class="HCol" align="left">').html(nval));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(branch));
                    //$row.append(jQuery('<td class="HCol" align="left">').html(data3[1]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data3[0]));


                    //  $row.append(jQuery('<td class="HCol" align="left">').html(data3[3]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data5[5]));  //invoice date
                    $row.append(jQuery('<td class="HCol" align="right">').html(data1[2]));
                    $row.append(jQuery('<td class="HCol" align="right">').html(data1[3]));

                    $row.append(jQuery('<td class="HCol" align="right">').html(data5[0]));
                    $row.append(jQuery('<td class="HCol" align="right">').html(data5[1]));
                    $row.append(jQuery('<td class="HCol" align="right">').html(data5[2]));


                    $row.append(jQuery('<td class="HCol" align="right">').html(data5[3]));
                    $row.append(jQuery('<td class="HCol" align="right">').html(data5[4]));



                    //$row.append(jQuery('<td class="HCol" align="left">').html(data2[0]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data4[1] /*+ "/" + data2[0]*/));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data2[1]));
                    //$row.append(jQuery('<td class="HCol" align="center">').html(data2[1]));
                    //$row.append(jQuery('<td class="HCol" align="left">').html(data3[2]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data2[2]));





                    $row.append(jQuery('<td class="HCol" align="center">').html('<button type="button" class="btn btn-link" id="viewinvoice' + i + '" onclick="_AddPayData.getCollectionName(\'' + data1[1] + '\');">View Bill</button>'));
                    $row.append(jQuery('<td class="HCol" align="center">').html('<button type="button" class="fa fa-pencil" id="edit' + i + '" onclick="_AddPayData.GSTEDIT(\'' + data1[1] + '\');">Edit</button>'));

                    $row.append(jQuery('<td class="HCol" align="center">').html('<input type="checkbox" id="' + data1[1] + '" name="prdtcheck" />'));
                    jQuery('#paymenttabl').append($row);

                });
            }
        }

    },
    confdata: function (st, reason) {

        jQuery('.page-loader-wrapper').show();
        var usrdata = userdata.userId;
        var rcnt = 0;
        var outward = "";
        var indata = st + "@@" + reason + "@@" + userdata.userId;
        for (i = 0; i < nval; i++) {
            if (jQuery("#" + checkarr[i]).prop("checked") == true) {
                rcnt = rcnt + 1;
                outward = outward + "!!" + checkarr[i];
            }
        }
        if (rcnt !== 0) {
            outward = rcnt + outward;
            var GetOutWardData = {
                "flag1": "RATIFICATIONACCOUNTS",
                "flag2": "CONFDATA",
                "inptvar1": outward,
                "inptvar2": indata,
                "typeID": "4",
                "userID": userdata.userId,
                "branchID": userdata.branchId
            };

            GetOutWardData = JSON.stringify(GetOutWardData);
            GetOutWardData = { "encryptedRqstStr": EncryptAPIReq(GetOutWardData) };

            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetOutWardData, _AddPayData.Fillconfdata, userdata.token)
        } else {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please select a PR..!", "error");
        }
    },
    Fillconfdata: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {
                if (response.data.queryResult.QueryResult[0].param2 == '10') {
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
                        title: "Rejected",
                        text: response.data.queryResult.QueryResult[0].param1,
                        type: "info"
                    }, function () {
                        window.location.reload(true);
                    });
                }
            }
        }
    },
    viewInvoiceImages: function (x) {
        jQuery('.page-loader-wrapper').show();
        var invimagemageData = {
            "recordingId": x,
            "collectionName": colectname
        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/images", invimagemageData, _AddPayData.viewInvoiceImagesLoadCompleted, userdata.token)
    },

    //viewInvoiceImagesLoadCompleted: function (response) {
    //    jQuery('.page-loader-wrapper').hide();
    //    if (response.status === "SUCCESS") {

    //        var max = response.data.imageData.length;
    //        var $image = jQuery('<img class="north" id = "rtimg" src="data:image/png;base64,' + response.data.imageData[max - 1].imageString + ' " height="450" width="50%" >');
    //        jQuery('#ImageModel').modal('show');
    //        jQuery('#ImageDiv').html($image);

    //        var zoomImage = jQuery('#rtimg');
    //        zoomImage.imageZoom();

    //    }
    //    else {
    //        //jQuery('.page-loader-wrapper').hide();
    //        //_General.noData(jQuery('#ImageModel'), "No Data Found");
    //        _General.noData(jQuery('#divInvimages'), "No Data Found");

    //    }
    //},

    //IMAGE VIEW NEW CHANGE//

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
    //        colectname = response.data.queryResult.QueryResult[0].param1;
    //            _AddPayData.viewInvoiceImages(parseInt(response.data.queryResult.QueryResult[0].param2));
    //        }
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
            _AddPayData.viewInvoiceImages(response.data.queryResult.QueryResult[0].param2);
        }
    },
    getBranchType: function (stateID) {
        jQuery('.page-loader-wrapper').show();
        var GetPayTypeData = {
            "flag1": "RATIFICATIONACCOUNTS",
            "flag2": "FILLBRANCHTYPE",
            "inptvar1": stateID,
            "inptvar2": "",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        GetPayTypeData = JSON.stringify(GetPayTypeData);
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillBranchType, userdata.token)

    },
    FillBranchType: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery("#ddlBranchType").empty();
                jQuery("#ddlBranchType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlBranchType").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlBranchType").empty();
                jQuery("#ddlBranchType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH TYPE-------- "));
            }
        }
        else {

            jQuery("#ddlBranchType").empty();
            jQuery("#ddlBranchType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH TYPE-------- "));
        }
    },

    GSTEDIT: function (prid) {
        jQuery("#pr").val(prid);
        jQuery("#moreDetailsModal").modal('show');//div show
    },

    SaveBillDetailsEdit: function () {
        var prIDs = jQuery('#pr').val();
        var gstamount = jQuery('#gstamount').val();
        var billno = jQuery('#billnoupdate').val();
        var billdate = jQuery('#billdate1').val();
        //updation
        //var openReading = jQuery('#openreadingupdate').val();
        //var closeReading = jQuery('#closereadingupdate').val();
        //var fromDate = jQuery('#efromDateupdte').val();
        //var toDate = jQuery('#etoDateupdate').val();

        if (billno == "") {
            swal("", "Please enter bill number..!", "error");
            return false;
        }
        else if (gstamount == "") {
            swal("", "Please enter GST amount..!", "error");
            return false;
        }
        //else if (billdate=="")) {
        //    swal("", "Please enter bill date..!", "error");
        //    return false;
        //}
        if (jQuery('#billdate1').val() == '') {
            swal("", "Please Select To date ....", "warning");
            return false;
        }


        var indata = gstamount + "!!" + billno + "!!" + billdate;
        jQuery('.page-loader-wrapper').show();

        var GetPayTypeData = {
            "flag1": "RATIFICATIONACCOUNTS",
            "flag2": "GSTEDIT",
            "inptvar1": indata,
            "inptvar2": prIDs,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        GetPayTypeData = JSON.stringify(GetPayTypeData);
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.GSTAMOUNTUPDATE, userdata.token)
    },
    GSTAMOUNTUPDATE: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            swal("", response.responseMsg, "success");

            jQuery('#gstamount').val("");
            jQuery('#billnoupdate').val("");
            jQuery('#billdate').val("");
            var state = jQuery('#ddlOutWard').val();
            var brType = jQuery('#ddlBranchType').val();
            _AddPayData.GetPRData(state, brType);


        }

        //else if (response.status === "AUTHERROR") {
        //    window.location.href = DOMAIN_URL + "?Id=1";
        //}

        else {

            swal("", response.responseMsg, "error")

            jQuery('#gstamount').val("");
            jQuery('#billnoupdate').val("");
            jQuery('#billdate').val("");

        }

    },
}



jQuery(document).ready(function ($) {
    _AddPayData.checkAccess();
    jQuery('.page-loader-wrapper').hide();
    jQuery('#ddlOutWard').change(function (e) {
        var outward = jQuery('#ddlOutWard').val();
        if (outward != 0) {
            //nval = 0;
            //checkarr = [];
            _AddPayData.getBranchType(outward);
            //_AddPayData.GetPRData(outward);
            jQuery('#maincard').hide();
            jQuery('#confirm').hide();
        }
        else {
            jQuery('#maincard').hide();
            jQuery('#confirm').hide();
            jQuery("#ddlBranchType").empty();
            jQuery("#ddlBranchType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH TYPE-------- "));
        }
    });

    //jQuery('#billdate1').click(function (e) {
    //    jQuery('#bs_datepicker_container2 input').datepicker({
    //        autoclose: true,
    //        format: "yyyy/mm/dd",
    //        //startDate: '-90d',
    //        endDate: new Date(),
    //        container: '#bs_datepicker_container2',
    //        changeMonth: true,
    //        showButtonPanel: true,
    //        defaultDate: "+1w",
    //        //orientation: 'bottom auto'
    //    }).datepicker("setDate", new Date());
    //});

    jQuery('#bs_datepicker_container2 input').datepicker({
        autoclose: true,
        format: "yyyy/mm/dd",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        endDate: new Date(),
        container: '#bs_datepicker_container2',
        appendTo: '#bs_datepicker_container2'
    }).datepicker("setDate", new Date());

    jQuery('#ddlBranchType').change(function (e) {
        var state = jQuery('#ddlOutWard').val();
        var brType = jQuery('#ddlBranchType').val();
        if (brType != 0 && state != 0) {
            nval = 0;
            checkarr = [];
            //_AddPayData.getBranchType(outward);
            _AddPayData.GetPRData(state, brType);
        }
        else {
            jQuery('#maincard').hide();
            jQuery('#confirm').hide();
        }
    });
    jQuery('#savebuttonedit').click(function (e) {
        _AddPayData.SaveBillDetailsEdit();
    });

    jQuery('#ddlPRselect').change(function (e) {
        var pr = jQuery('#ddlPRselect').val();
        jQuery('#showimg').hide();
        if (pr != 0) {

            _AddPayData.GetPRFullData(pr);
        }
    });

    jQuery('#submit').click(function (e) {
        var pr = jQuery('#ddlPRselect').val();
        var remarks = jQuery('#accRemarks').val();

        if (pr != 0 || remarks == null) {
            _AddPayData.confdata(1, "");
        }
    });
    jQuery('#reject').click(function (e) {
        var rcnt = 0;
        for (i = 0; i < nval; i++) {
            if (jQuery("#" + checkarr[i]).prop("checked") == true) {
                rcnt = rcnt + 1;
                break;
            }
        }
        if (rcnt > 0) {
            jQuery('#camsection').show();
            jQuery('#accRemarks').focus();
            jQuery('#accRemarks').val("");
        } else {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please select a PR..!", "error");
        }

    });





    jQuery('#rejectReason').click(function (e) {
        var rejreason = jQuery('#accRemarks').val().toUpperCase();
        if (rejreason != "" && rejreason != null) {
            jQuery('#camsection').hide();
            _AddPayData.confdata(0, rejreason);
        }
        else {
            swal("Error", "Please Enter Remarks..!", "error");
            jQuery('#camsection').show();
            return false;
        }
    });

});

//_AddPayData.GetOutwardData();

var nval = 0;
var checkarr = [];
var colectname = "";
var spanCam = document.getElementsByClassName("close")[0];
spanCam.onclick = function () {
    jQuery('#showimg').hide();
}
var spanCam = document.getElementsByClassName("close")[1];
spanCam.onclick = function () {
    jQuery('#camsection').hide();
}
var tryCount = 0;
var minimalUserResponseInMiliseconds = 700;
function check() {
    console.clear();
    before = new Date().getTime();

    after = new Date().getTime();
    if (after - before > minimalUserResponseInMiliseconds) {
        document.write(" Dont open Developer Tools. ");
        self.location.replace(
            window.location.protocol + window.location.href.substring(
                window.location.protocol.length
            )
        );
    } else {
        before = null;
        after = null;
        delete before;
        delete after;
    }
    setTimeout(check, 500);
}
check();
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);
document.addEventListener("keydown", function (e) {
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        disabledEvent(e);
    }
    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        disabledEvent(e);
    }
    // Ctrl+S
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        disabledEvent(e);
    }
    // Ctrl + U
    if (e.ctrlKey && e.keyCode == 85) {
        disabledEvent(e);
    }
    // F12
    if (event.keyCode == 123) {
        disabledEvent(e);
    }
}, false);
function disabledEvent(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else if (window.event) {
        window.event.cancelBubble = true;
    }
    e.preventDefault();
    return false;
}



