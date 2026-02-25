
var _DebitInBankAprove = {
    lotFill: function () {
        jQuery('.page-loader-wrapper').show();
        var lotFillData = {
            "typeId": 4
        };
        lotFillData = JSON.stringify(lotFillData);
        lotFillData = { "encryptedRqstStr": EncryptAPIReq(lotFillData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/disbursementEntryUpdation", lotFillData, _DebitInBankAprove.lotFillDataLoadCompleated, userdata.token)
    },
    lotFillDataLoadCompleated: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.aproverDataLoads.length > 0) {
                jQuery("#ddlLot").empty();
                jQuery("#ddlLot").append(jQuery("<option></option>").val("0").text("  Choose Lot Number  "));
                jQuery.each(response.data.queryResult.aproverDataLoads, function (i, val) {
                    jQuery("#ddlLot").append(jQuery("<option></option>").val(val.lotNo).text(val.lotNo));
                });
            }
            else {
                jQuery("#ddlLot").empty();
                jQuery("#ddlLot").append(jQuery("<option></option>").val("0").text("  Choose  Lot Number  "));
            }
        }
        else {

            jQuery("#ddlLot").empty();
            jQuery("#ddlLot").append(jQuery("<option></option>").val("0").text("  Choose  Lot Number  "));
        }
        jQuery('.page-loader-wrapper').hide();

    },
    AproverData: function () {
        jQuery('.page-loader-wrapper').show();
        var a = jQuery('#ddlLot').val();
        var b = a.split('-');
        var c= b[0].trim();
        var lotNo = c;
        var AproveDataLoad = {
            "typeId": 6,
            "lotNo": lotNo
        };
        AproveDataLoad = JSON.stringify(AproveDataLoad);
        AproveDataLoad = { "encryptedRqstStr": EncryptAPIReq(AproveDataLoad) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/disbursementEntryUpdation", AproveDataLoad, _DebitInBankAprove.AproveDataLoadLoadCompleated, userdata.token)
    },
    AproveDataLoadLoadCompleated: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('#maincard').show();
            if (response.data.queryResult.aproverDataLoads.length > 0) {
                jQuery('#divDebitInBankAprove').empty();
                var $table = jQuery('<table class="table" id="tblDebitInBankAprove">');
                $table.append('<thead><tr><th style="text-align:center;">No</th><th style="text-align:center;">Bank Name</th><th style="text-align:center;">Payement Reference Number</th><th style="text-align:center;">UTRN Number</th><th style="text-align:center;">Amount</th></tr></thead>');
                var $tbody = jQuery('<tbody>');
                jQuery.each(response.data.queryResult.aproverDataLoads, function (i, val) {
                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="center">').html(val.bank));
                    $row.append(jQuery('<td align="center">').html(val.paymentRefNumber));
                    $row.append(jQuery('<td align="center">').html(val.utrNum));
                    $row.append(jQuery('<td align="center">').html(val.amount));
                    $tbody.append($row);

                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divDebitInBankAprove').html($table);


            } else {
                jQuery('#divDebitInBankAprove').hide();
                jQuery('#divDebitInBankAprove').empty();
            }
        }

        else {
            _General.noData(jQuery('#divDebitInBankAprove'), "No Data Found");

        }
        jQuery('.page-loader-wrapper').hide();

    },
    Approve: function () {
        jQuery('.page-loader-wrapper').show();
        var a = jQuery('#ddlLot').val();
        var b = a.split('-');
        var c= b[0].trim();
        var lotNo = c;
        var approveData = {
            "typeId": 8,
            "lotNo": lotNo,
            "userId": userdata.userId,
            "remark": jQuery('#remark').val()
        };
        approveData = JSON.stringify(approveData);
        approveData = { "encryptedRqstStr": EncryptAPIReq(approveData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/disbursementEntryUpdation", approveData, _DebitInBankAprove.approveDataCompleated, userdata.token)
    },
    approveDataCompleated: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr)); _DebitInBankAprove
            swal(response.data.queryResult.message, "", "success");
            _DebitInBankAprove.lotFill();
            jQuery('#remark').val('');
            jQuery('#maincard').hide();
        }
        else {
            swal(response.responseMsg, "", "error");
        }
    },
    Reject: function () {
        jQuery('.page-loader-wrapper').show();
        remark = jQuery('#remark').val();
        if (remark == '') {
            jQuery('.page-loader-wrapper').hide();
            swal("", "Add Reason for Rejection", "warning");
            return false;
        }
        var a = jQuery('#ddlLot').val();
        var b = a.split('-');
        var c= b[0].trim();
        var lotNo = c;
        var remarkData = {
            "typeId": 10,
            "lotNo": lotNo,
            "userId": userdata.userId,
            "remark": jQuery('#remark').val()
        };
        remarkData = JSON.stringify(remarkData);
        remarkData = { "encryptedRqstStr": EncryptAPIReq(remarkData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/disbursementEntryUpdation", remarkData, _DebitInBankAprove.remarkDataCompleated, userdata.token)
    },
    remarkDataCompleated: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            swal(response.queryResult.data.message, "", "success");
            _DebitInBankAprove.lotFill();
            jQuery('#remark').val('');
            jQuery('#maincard').hide();
        }
        else {
            swal(response.responseMsg, "", "error");
        }
    },
}
jQuery(document).ready(function (e) {
    jQuery('.page-loader-wrapper').hide();
    _DebitInBankAprove.lotFill();

    jQuery("#ddlLot").on('change', function () {
        _DebitInBankAprove.AproverData();

    });
});