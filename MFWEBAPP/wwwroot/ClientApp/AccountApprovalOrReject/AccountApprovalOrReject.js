var log_id;
var status_id;
var _AccountApprovalOrRejectController = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var CheckAccess = {
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1008",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        CheckAccess = JSON.stringify(CheckAccess);
        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _AccountApprovalOrRejectController.checkAccessRtn, userdata.token)
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
                else {
                    _AccountApprovalOrRejectController.GetOutwardData();
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



    AccountFill: async function () {
        jQuery('.page-loader-wrapper').show();
        var AccountFillData = {
            "typeId": 5

        };
        AccountFillData = JSON.stringify(AccountFillData);
        AccountFillData = { "encryptedRqstStr": EncryptAPIReq(AccountFillData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/addaccount", AccountFillData, _AccountApprovalOrRejectController.AccountTabFill, userdata.token)

    },


    AccountTabFill: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.accountDetails.length > 0) {

                jQuery('#accountapprovalorReject').empty();
                var $table = jQuery('<table class="table" id="tblAccountCreationLog">');

                $table.append('<thead><tr><th style="text-align:left;">Account Type</th> <th style="text-align:left;">Account Name</th><th style="text-align:left;">Have sub Account</th> <th style="text-align:left;">Main Account</th><th style="text-align:left;">Category</th> <th style="text-align:left;">Requested By</th><th style="text-align:left;">Account Group</th><th style="text-align:left;">Sub Account Group</th><th style="text-align:center;width:15%">Action</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.queryResult.accountDetails, function (i, val) {

                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="left">').html(val.parAccNo == "0" ? "MAIN ACCOUNT" : val.subAccNo == "0" ? "SUB ACCOUNT" : "SUB OF SUB ACCOUNT"));
                    $row.append(jQuery('<td align="left">').html(val.accName));
                    $row.append(jQuery('<td align="left">').html(val.subAccFlag == 0 ? "NO" : "YES"));
                    $row.append(jQuery('<td align="left">').html(val.accNo == "0" ? "N/A" : val.mainAccName));
                    $row.append(jQuery('<td align="left">').html(val.categoryId == "0" ? "N/A" : val.categoryName));
                    $row.append(jQuery('<td align="left">').html(val.userName));
                    $row.append(jQuery('<td align="left">').html(val.accountGroup));
                    $row.append(jQuery('<td align="left">').html(val.subAccountGroup));
                    $row.append(jQuery('<td align="left">').html('<button type="button" style="width:52%" class="btn btn-success btn-sm"  onClick="_AccountApprovalOrRejectController.ApproveOrRejectAccount(' + val.logId + ',' + (val.subAccNo == "0" ? "6" : "10") + ');"><i class="fa fa-check"></i> Approval</button> <button type="button" class="btn btn-danger btn-sm" onClick="_AccountApprovalOrRejectController.ApproveOrRejectAccount(' + val.logId + ',7);"><i class="fa fa-times"></i> Reject</button>'));
                    $tbody.append($row);
                });

                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#accountapprovalorReject').html($table);
                jQuery('#maincard').show();
            }
            else {
                jQuery('#accountapprovalorReject').hide();
                jQuery('#accountapprovalorReject').empty();
            }
        }
        else if (response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {
            _General.noData(jQuery('#accountapprovalorReject'), "No Data Found");
        }
        jQuery('.page-loader-wrapper').hide();
    },

    ApproveOrRejectAccount: function (logid, st) {
        jQuery('.page-loader-wrapper').show();
        var AccountFillData = {

            "logId": logid,
            "typeId": st,
            "userId": userdata.userId
        };
        AccountFillData = JSON.stringify(AccountFillData);
        AccountFillData = { "encryptedRqstStr": EncryptAPIReq(AccountFillData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/addaccount", AccountFillData, _AccountApprovalOrRejectController.AccUpdatedstatus, userdata.token)
    },



    AccUpdatedstatus: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            swal(response.data.message, "", "success");
            _AccountApprovalOrRejectController.AccountFill();
        }
        else if (response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {
            swal(response.responseMsg, "", "error");
        }
        //_AccountApprovalOrRejectController.AccountFill();
    }
}

jQuery(document).ready(function ($) {
    _AccountApprovalOrRejectController.checkAccess();
    jQuery('.page-loader-wrapper').hide();
    _AccountApprovalOrRejectController.AccountFill();
});