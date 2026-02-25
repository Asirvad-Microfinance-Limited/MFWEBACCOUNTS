var _AddPayData = {
    confdata: function () {
        jQuery('.page-loader-wrapper').show();
        var rcnt = 0;
        var branch_id = userdata.branchId;
        var user_id = userdata.userId;
        var snddata = branch_id + "@@" + user_id;
        var outward = "";
        for (i = 0; i < val; i++) {
            if (jQuery("#" + checkarr[i]).prop("checked") == true) {
                rcnt = rcnt + 1;
                outward = outward + "!!" + checkarr[i];
            }
        }
        if (rcnt !== 0) {
            if (rcnt == val) {
                outward = rcnt + outward;
                var GetOutWardData = {
                    "flag1": "OUTWARD",
                    "flag2": "CONFDATA",
                    "inptvar1": outward,
                    "inptvar2": snddata,
                    "typeID": "4",
                    "userID": userdata.userId,
                    "branchID": userdata.branchId
                };
                _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetOutWardData, _AddPayData.Fillconfdata, userdata.token)
            }
            else {
                jQuery('.page-loader-wrapper').hide();
                swal("Error", "select all the PR..!", "error");
            }
        } else {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please select a PR..!", "error");
        }
    },
    Fillconfdata: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {
                swal({
                    title: response.data.queryResult[0].param1,
                    text: "",
                    type: "success"
                }, function () {
                    window.location.reload(true);
                });
            }
        }
    },

    GetItemValData: function () {
        var Str = " ";
        var branch_id = userdata.branchId;
        jQuery('.page-loader-wrapper').show();
        var GetItemdata = {
            "flag1": "OUTWARD",
            "flag2": "FILLOUTWARDDATA",
            "inptvar1": branch_id,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetItemdata, _AddPayData.FillItem, userdata.token)
    },

    FillItem: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            jQuery('#maincard').show();
            jQuery('#confirm').show();

            if (response.data.queryResult.length > 0) {
                jQuery.each(response.data.queryResult, function (i, val1) {
                    checkarr[i] = val1.param5;
                    val = val + 1;

                    var $row = jQuery('<tr/>');
                    var billdata = val1.param3.split("~");
                    var dtdata = val1.param4.split("~");
                    $row.append(jQuery('<td class="HCol" align="left">').html(val1.param5));
                    $row.append(jQuery('<td class="HCol" align="left">').html(val1.param1));
                    $row.append(jQuery('<td class="HCol" align="left">').html(val1.param2));
                    $row.append(jQuery('<td class="HCol" align="left">').html(billdata[0]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(billdata[1]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(dtdata[0]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(dtdata[1]));
                    $row.append(jQuery('<td class="HCol" align="center">').html('<input type="checkbox" id="' + val1.param5 + '" name="prdtcheck" />'));
                    jQuery('#paymenttabl').append($row);
                });
            }
        }
    },
}

jQuery(document).ready(function ($) {
    jQuery('.page-loader-wrapper').hide();
    //jQuery('#ddlOutwardno').change(function (e) {
    //    var outward = jQuery('#ddlOutwardno').val();
    //    if (outward != 0) {
    //        if (val > 0) {
    //            for (i = 0; i < val; i++) {
    //                if (checkarr[i] == outward) {
    //                    swal("", "Already Added..!", "info");
    //                    return false;
    //                }
    //            }
    //        }
    //        checkarr[val] = outward;
    //        _AddPayData.GetItemValData();
    //    }
    //});

    jQuery('#submit').click(function (e) {
        if (val > 0) {
            _AddPayData.confdata();
        }
    });
});
_AddPayData.GetItemValData();

var val = 0;
var checkarr = [];

//jQuery(document).on('click', '.delete', function () {

//    var id = jQuery(this).closest("tr").find('td:eq(0)').text();
//    if (checkarr[val - 1] != id) {
//        for (i = 0; i < val; i++) {
//            if (checkarr[i] == id) {
//                for (j = i; j < val-1; j++) {
//                    checkarr[j] = checkarr[j + 1];
//                }
//                break;
//            }
//        }
//    } checkarr[val - 1] = "";
//    val = val - 1;
//    jQuery(this).closest('tr').remove();
//    if (jQuery("#tbldespatch tr").length == 1) {
//        jQuery('#maincard').hide();
//        jQuery('#confirm').hide();
//    }


//    return false;
//});