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
                else {
                    _AddPayData.GetBranchEntry();
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

    GetBranchEntry: function () {
        var Str = " ";
        var GetBranchEntryData = {
            "flag1": "BRANCHENTRYAPPROVAL",
            "flag2": "FILLBRANCHREQUEST",
            "inptvar1": Str,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetBranchEntryData, _AddPayData.FillBranchEntry, userdata.token)

    },
    FillBranchEntry: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {

                jQuery("#ddlRequested").empty();
                jQuery("#ddlRequested").append(jQuery("<option></option>").val("0").text(" --------CHOOSE REQUEST-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlRequested").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlRequested").empty();
                jQuery("#ddlRequested").append(jQuery("<option></option>").val("0").text(" --------CHOOSE REQUEST-------- "));
            }
        }
        else {
            jQuery("#ddlRequested").empty();
            jQuery("#ddlRequested").append(jQuery("<option></option>").val("0").text(" --------CHOOSE REQUEST-------- "));
        }
    },
    GetEntryData: function (ReqID) {
        var Str = " ";
        jQuery('.page-loader-wrapper').show();
        var GetRequestData = {
            "flag1": "BRANCHENTRYAPPROVAL",
            "flag2": "FILLREQUESTDATA",
            "inptvar1": ReqID,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetRequestData, _AddPayData.FillEntryData, userdata.token)

    },
    FillEntryData: function (response) {

        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#maincard').show();
            jQuery('#confirm').show();
            var slno = 1;
            if (response.data.queryResult.length > 0) {

                jQuery('#paymenttabl').empty();
                jQuery.each(response.data.queryResult, function (i, val) {

                    var $row = jQuery('<tr/>');
                    var data1 = val.param1;
                    var data2 = val.param2.split("~");
                    var data3 = val.param3;
                    var data4 = val.param4;
                    var data5 = val.param5;
                    $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(slno))
                    $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data1));
                    $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data2[0]));
                    $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data2[1]));
                    $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data3));
                    $row.append(jQuery('<td class="HCol" style="text-align:right;">').html(data4));
                    $row.append(jQuery('<td class="HCol" style="text-align:right;">').html(data5));

                    jQuery('#paymenttabl').append($row);
                    slno += 1;
                });
            }
        }

    },
    confdata: function (st, prid, reason) {

        jQuery('.page-loader-wrapper').show();
        var usrdata = userdata.userId;


        var indata = st + "@@" + reason + "@@" + userdata.userId;


        var GetOutWardData = {
            "flag1": "BRANCHENTRYAPPROVAL",
            "flag2": "CONFDATA",
            "inptvar1": prid,
            "inptvar2": indata,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetOutWardData, _AddPayData.Fillconfdata, userdata.token)

    },
    Fillconfdata: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {
                if (response.data.queryResult[0].param2 == '2') {
                    swal({
                        title: "Approve",
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

}

_AddPayData.checkAccess();

jQuery(document).ready(function ($) {

    jQuery('.page-loader-wrapper').hide();
    jQuery('#ddlRequested').change(function (e) {
        var reqID = jQuery('#ddlRequested').val();
        if (reqID != 0) {
            _AddPayData.GetEntryData(reqID);
        }
        else {
            jQuery('#maincard').hide();
            jQuery('#confirm').hide();
        }
    });


    jQuery('#submit').click(function (e) {
        var pr = jQuery('#ddlRequested').val();
        if (pr != 0) {
            _AddPayData.confdata(1, pr, "");
        }
    });
    jQuery('#reject').click(function (e) {
        var pr = jQuery('#ddlRequested').val();

        if (pr != 0) {
            jQuery('#camsection').show();
            jQuery('#accRemarks').focus();
            jQuery('#accRemarks').val("");
        } else {
            jQuery('.page-loader-wrapper').hide();
            swal("Error", "Please select any entry ID..!", "error");
        }

    });

    jQuery('#rejectReason').click(function (e) {
        var pr = jQuery('#ddlRequested').val();
        var rejreason = jQuery('#accRemarks').val().toUpperCase();
        if (rejreason != "" && rejreason != null) {
            jQuery('#camsection').hide();
            _AddPayData.confdata(0, pr, rejreason);
        }
        else {
            swal("Error", "Please Enter Remarks..!", "error");
            jQuery('#camsection').show();
            return false;
        }
    });

});

