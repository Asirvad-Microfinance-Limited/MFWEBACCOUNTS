var _AddPayData = {

    GetOutwardData: function () {
        var Str = " ";
        jQuery('.page-loader-wrapper').show();
        var GetPayTypeData = {
            "flag1": "COURIERRECEIVAL",
            "flag2": "FILLOUTWARDDATA",
            "inptvar1": userdata.branchId,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillOutwardData, userdata.token)

    },
    FillOutwardData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
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
    GetPRData: function () {
        var Str = " ";
        jQuery('.page-loader-wrapper').show();
        var outward = jQuery('#ddlOutWard').val();
        var GetPayTypeData = {
            "flag1": "COURIERRECEIVAL",
            "flag2": "FILLDEPTDATA",
            "inptvar1": outward,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillPRData, userdata.token)

    },
    FillPRData: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#maincard').show();
            jQuery('#confirm').show();
            //jQuery('#others').show();

            if (response.data.queryResult.length > 0) {
                var len = response.data.queryResult.length;

                jQuery("#nobills").val(len);
                jQuery('#paymenttabl').empty();
                jQuery.each(response.data.queryResult, function (i, val) {

                    var $row = jQuery('<tr/>');
                    var data1 = val.param1.split("~");
                    var data2 = val.param2.split("~");
                    var data3 = val.param3.split("~");
                    var data4 = val.param4.split("~");
                    checkarr[i] = data1[0];
                    nval = nval + 1;
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data3[1]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data3[0]));
                    $row.append(jQuery('<td class="HCol" align="center">').html(data1[2]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data2[0]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data4[1]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data4[0]));
                    $row.append(jQuery('<td class="HCol" align="center">').html(data2[1]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data3[2]));
                    $row.append(jQuery('<td class="HCol" align="left">').html('<button type="button" class="btn btn-link" id="viewinvoice' + i + '" onclick="_AddPayData.viewInvoiceImages(\'' + data1[1] + '\');">View challan</button>'));
                    $row.append(jQuery('<td class="HCol" align="center">').html('<input type="checkbox" id="' + data1[0] + '" name="prdtcheck" />'));
                    jQuery('#paymenttabl').append($row);

                });

            }
        }
        else {
            {
                jQuery('.page-loader-wrapper').hide();
                swal("Error", "No Data Found..!", "error");
            }

        }
    },
    //GetMailData: function () {
    //    var outward = jQuery('#ddlOutWard').val();
    //    var GetPayTypeData = {
    //        "flag1": "COURIERRECEIVAL",
    //        "flag2": "FILLMAILDATA",
    //        "inptvar1": outward,
    //        "inptvar2": " "
    //    };
    //    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillMailData, userdata.token)
    //},
    //FillMailData: function (response) {
    //    if (response.status === "SUCCESS") {
    //        jQuery('.page-loader-wrapper').hide();
    //        if (response.data.queryResult.length > 0) {
    //            jQuery('#agencyName').val(response.data.queryResult[0].param1);
    //            jQuery('#challanno').val(response.data.queryResult[0].param2);
    //            jQuery('#sendDate').val(response.data.queryResult[0].param3);
    //            jQuery('#crupdate').val(response.data.queryResult[0].param4);
    //        }
    //    }
    //},
    //convertdateformat: function (dt) {
    //    var vyear = dt.split('-')[0];
    //    var vmonth = parseInt(dt.split('-')[1]);
    //    var vday = dt.split('-')[2];
    //    var vmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //    var vmon = vmonths[vmonth - 1];
    //    var valtortn = vday + '-' + vmon + '-' + vyear;
    //    return valtortn
    //},
    confdata: function () {
        var usrdata = userdata.userId;
        var rcnt = 0;
        var outward = "";
        jQuery('.page-loader-wrapper').show();
        for (i = 0; i < nval; i++) {
            if (jQuery("#" + checkarr[i]).prop("checked") == true) {
                rcnt = rcnt + 1;
                outward = outward + "!!" + checkarr[i];
            }
        }
        //for (i = 0; i < nval; i++) {
        //    if (checkarr[i] != null) {
        //        rcnt = rcnt + 1;
        //        outward = outward + "!!" + checkarr[i];
        //    }
        //}
        if (rcnt !== 0) {
            outward = rcnt + outward;


            var GetPayTypeData = {
                "flag1": "COURIERRECEIVAL",
                "flag2": "CONFDATA",
                "inptvar1": outward,
                "inptvar2": usrdata,
                "typeID": "4",
                "userID": userdata.userId,
                "branchID": userdata.branchId
            };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.Fillconfdata, userdata.token)
        }
        else {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please select a PR..!", "error");
        }
    },
    Fillconfdata: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {
                swal({
                    title: "Approve",
                    text: response.data.queryResult[0].param1,
                    type: "success"
                }, function () {
                    window.location.reload(true);
                });
            }
        }

    },
    viewInvoiceImages: function (x) {
        jQuery('.page-loader-wrapper').show();
        var invimagemageData = {
            "recordingId": x,
            "collectionName": "PROUTWARDFILE"
        }
        _http.post(MFPUBLICLOSAPI_URL + "api/loans/images", invimagemageData, _AddPayData.viewInvoiceImagesLoadCompleted, userdata.token)
    },

    viewInvoiceImagesLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            var $image = jQuery('<img class="north" id = "rtimg" src="data:image/png;base64,' + response.data.imageString + ' " height="450" width="50%" >');
            jQuery('#ImageModel').modal('show');
            jQuery('#ImageDiv').html($image);

        }
        else {
            //jQuery('.page-loader-wrapper').hide();
            _General.noData(jQuery('#divInvimages'), "No Data Found");

        }
    }

}

jQuery(document).ready(function ($) {
    jQuery('.page-loader-wrapper').hide();
    jQuery('#ddlOutWard').change(function (e) {
        var outward = jQuery('#ddlOutWard').val();
        if (outward != 0) {
            _AddPayData.GetPRData();
            //           _AddPayData.GetMailData();
        } else {
            jQuery('#maincard').hide();
            jQuery('#confirm').hide();
        }
    });

    jQuery('#viewinvoice').click(function (e) {
        var outward = jQuery('#ddlOutWard').val();
        if (outward != 0) {
            jQuery('#showimg').hide();
            _AddPayData.viewInvoiceImages(outward);
        }
    });

    jQuery('#submit').click(function (e) {
        //var outward = jQuery('#ddlOutWard').val();
        //var dt = jQuery('#rcvDate').val();
        //if (outward == "0") {
        //    swal("Error", "Select an Outward number..!", "error");
        //    return false;
        //}
        //else if (dt == "") {
        //    swal("Error", "Select the receival date..!", "error");
        //    return false;
        //}
        //else {
        _AddPayData.confdata();
        //}
    });


});
var dt = new Date();
var e = parseInt(dt.getMonth()) + 1;
var d = dt.getFullYear() + '-0' + e + '-' + dt.getDate()
jQuery('#rcvDate').prop('max', d);
_AddPayData.GetOutwardData();

var nval = 0;
var checkarr = [];


var spanCam = document.getElementsByClassName("close")[0];
spanCam.onclick = function () {
    jQuery('#showimg').hide();
}

