var _BHRemarks = {
    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var CheckAccess = {
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1005",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        CheckAccess = JSON.stringify(CheckAccess);
        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _BHRemarks.checkAccessRtn, userdata.token)
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

    GetOutwardData: function () {
        var Str = " ";
        var GetPayTypeData = {
            "flag1": "BHREMARKSTOAUDITOR",
            "flag2": "AuditObservationStates",
            "inptvar1": userdata.userId,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        GetPayTypeData = JSON.stringify(GetPayTypeData);
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _BHRemarks.FillOutwardData, userdata.token)

    },
    FillOutwardData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {

                jQuery("#ddlOutWard").empty();
                jQuery("#ddlOutWard").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
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
    GetPRData: function (stateID, brtype, fromdate, todate) {
        var Str = " ";
        var state = stateID + "!!" + brtype + "!!" + userdata.userId;
        var dates = fromdate + "@@" + todate;
        jQuery('.page-loader-wrapper').show();
        var GetPayTypeData = {
            "flag1": "BHREMARKSTOAUDITOR",
            "flag2": "FILLPRDDATA",
            "inptvar1": state,
            "inptvar2": dates,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        GetPayTypeData = JSON.stringify(GetPayTypeData);
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _BHRemarks.FillPRData, userdata.token)

    },
    FillPRData: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            jQuery('#maincard').show();
            jQuery('#confirm').show();

            if (response.data.queryResult.length > 0) {

                jQuery('#paymenttabl').empty();
                jQuery.each(response.data.queryResult, function (i, val) {

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
                    $row.append(jQuery('<td class="HCol" align="right">').html(data1[2]));

                    $row.append(jQuery('<td class="HCol" align="right">').html(data5[0]));
                    $row.append(jQuery('<td class="HCol" align="right">').html(data5[1]));
                    $row.append(jQuery('<td class="HCol" align="right">').html(data5[2]));


                    //$row.append(jQuery('<td class="HCol" align="left">').html(data2[0]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data4[1] + "/" + data2[0]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data2[1]));
                    //$row.append(jQuery('<td class="HCol" align="center">').html(data2[1]));
                    //$row.append(jQuery('<td class="HCol" align="left">').html(data3[2]));
                    $row.append(jQuery('<td class="HCol" align="center">').html('<button type="button" class="btn btn-link" id="viewinvoice' + i + '" onclick="_BHRemarks.getCollectionName(\'' + data1[1] + '\');">View Bill</button>'));
                    //$row.append(jQuery('<td class="HCol" align="center">').html('<input type="checkbox" id="' + data1[1] + '" name="prdtcheck" />'));
                    //$row.append(jQuery('<td class="HCol" align="center">').html('<button type="button" class="btn btn-danger" id="AddRemarks' + i + '" onclick="_InternalAuditObservation.AddRemarks(\'' + data1[1] + '\');">ADD REMARK</button>'));
                    jQuery('#paymenttabl').append($row);

                });
            }
            else {

                jQuery('.page-loader-wrapper').hide();
                swal("Warning", "PR Not found between these two periods..!", "warning");
            }
        }
        else {
            jQuery('.page-loader-wrapper').hide();
            swal("Warning", "No Data Found..!", "warning");
        }

    },
    confdata: function (prid, reason) {

        jQuery('.page-loader-wrapper').show();
        var usrdata = userdata.userId;
        var rcnt = 0;

        var indata = userdata.userId + "!!" + reason;
        var outward = prid;

        //for (i = 0; i < nval; i++) {
        //    if (jQuery("#" + checkarr[i]).prop("checked") == true) {
        //        rcnt = rcnt + 1;
        //        outward = outward + "!!" + checkarr[i];
        //    }
        //}
        //if (rcnt !== 0) {
        //outward = rcnt + outward;
        var GetOutWardData = {
            "flag1": "InternalAuditObservation",
            "flag2": "CONFDATA",
            "inptvar1": indata,
            "inptvar2": outward,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        GetOutWardData = JSON.stringify(GetOutWardData);
        GetOutWardData = { "encryptedRqstStr": EncryptAPIReq(GetOutWardData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetOutWardData, _BHRemarks.Fillconfdata, userdata.token)
        //}
        //else {
        //    jQuery('.page-loader-wrapper').hide();
        //    swal("Error", "Please select a PR..!", "error");
        //}
    },
    Fillconfdata: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
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
    viewInvoiceImages: function (x) {
        jQuery('.page-loader-wrapper').show();
        var invimagemageData = {
            "recordingId": x,
            "collectionName": colectname
        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/images", invimagemageData, _BHRemarks.viewInvoiceImagesLoadCompleted, userdata.token)
    },

    viewInvoiceImagesLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            var max = response.data.imageData.length;
            var $image = jQuery('<img class="north" id = "rtimg" src="data:image/png;base64,' + response.data.imageData[max - 1].imageString + ' " height="450" width="50%" >');
            jQuery('#ImageModel').modal('show');
            jQuery('#ImageDiv').html($image);

            var zoomImage = jQuery('#rtimg');
            zoomImage.imageZoom();

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
        GetPayTypeData = JSON.stringify(GetPayTypeData);
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _BHRemarks.FillCollectionName, userdata.token)

    },
    FillCollectionName: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {
                colectname = response.data.queryResult[0].param1;
                _BHRemarks.viewInvoiceImages(parseInt(response.data.queryResult[0].param2));
            }
        }
    },
    getBranchType: function (stateID) {
        jQuery('.page-loader-wrapper').show();
        var GetPayTypeData = {
            "flag1": "BHREMARKSTOAUDITOR",
            "flag2": "FILLBRANCHTYPE",
            "inptvar1": stateID,
            "inptvar2": "",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        GetPayTypeData = JSON.stringify(GetPayTypeData);
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _BHRemarks.FillBranchType, userdata.token)

    },
    FillBranchType: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr)); GetPayTypeData
            if (response.data.queryResult.length > 0) {

                jQuery("#ddlBranchType").empty();
                jQuery("#ddlBranchType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH TYPE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
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
    AddRemarks: function (prid) {
        selectpr = prid;
        jQuery('#camsection').show();
        jQuery('#accRemarks').focus();
        jQuery('#accRemarks').val("");

        //    var GetPayTypeData = {
        //        "flag1": "GETCOLLECTIONNAME",
        //        "flag2": "",
        //        "inptvar1": prid,
        //        "inptvar2": ""
        //    };

        //    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _InternalAuditObservation.FillCollectionName, userdata.token)

        //},
        //FillCollectionName: function (response) {
        //    if (response.status === "SUCCESS") {
        //        if (response.data.queryResult.length > 0) {
        //            colectname = response.data.queryResult[0].param1;
        //            _InternalAuditObservation.viewInvoiceImages(parseInt(response.data.queryResult[0].param2));
        //        }
        //    }
    },


}




jQuery(document).ready(function ($) {
    _BHRemarks.checkAccess();
    jQuery('.page-loader-wrapper').hide();
    jQuery('#bs_datepicker_container1 input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        endDate: new Date(),
        container: '#bs_datepicker_container1'
    }).datepicker("setDate", new Date());
    jQuery('#bs_datepicker_container2 input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        endDate: new Date(),
        container: '#bs_datepicker_container2'
    }).datepicker("setDate", new Date());
    jQuery('#ddlOutWard').change(function (e) {
        jQuery('#toDate').val("");
        jQuery('#efromDate').val("");
        var outward = jQuery('#ddlOutWard').val();
        if (outward != 0) {
            //nval = 0;
            //checkarr = [];
            _BHRemarks.getBranchType(outward);
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

    jQuery('#ddlBranchType').change(function (e) {
        var state = jQuery('#ddlOutWard').val();
        var brType = jQuery('#ddlBranchType').val();
        if (brType != 0 && state != 0) {
            nval = 0;
            checkarr = [];
            //_AddPayData.getBranchType(outward);
            //  _InternalAuditObservation.GetPRData(state, brType);
        }
        else {
            jQuery('#maincard').hide();
            jQuery('#confirm').hide();
        }
    });


    jQuery('#toDate').change(function (e) {
        var state = jQuery('#ddlOutWard').val();
        var brType = jQuery('#ddlBranchType').val();
        var fromdate = jQuery('#efromDate').val();
        var todate = jQuery('#toDate').val();
        _BHRemarks.GetPRData(state, brType, fromdate, todate);

    });

    jQuery('#efromDate').change(function (e) {
        jQuery('#toDate').val("");
        jQuery('#maincard').hide();
        jQuery('#confirm').hide();
    });

    jQuery('#ddlPRselect').change(function (e) {
        var pr = jQuery('#ddlPRselect').val();
        jQuery('#showimg').hide();
        if (pr != 0) {

            _BHRemarks.GetPRFullData(pr);
        }
    });

    jQuery('#submit').click(function (e) {
        //var pr = jQuery('#ddlPRselect').val();
        var remarks = jQuery('#accRemarks').val();
        _BHRemarks.AddRemarks()
        if (pr != 0 || remarks == null) {
            _BHRemarks.confdata(1, "");
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
        var prid = selectpr;
        var rejreason = jQuery('#accRemarks').val().toUpperCase();
        if (rejreason != "" && rejreason != null) {
            jQuery('#camsection').hide();
            _BHRemarks.confdata(prid, rejreason);
        }
        else {
            swal("Error", "Please Enter Remarks..!", "error");
            jQuery('#camsection').show();
            return false;
        }
    });

});
_BHRemarks.GetOutwardData();

var nval = 0;
var checkarr = [];
var colectname = "";
var selectpr;
var spanCam = document.getElementsByClassName("close")[0];
spanCam.onclick = function () {
    jQuery('#showimg').hide();
}
var spanCam = document.getElementsByClassName("close")[1];
spanCam.onclick = function () {
    jQuery('#camsection').hide();
}




