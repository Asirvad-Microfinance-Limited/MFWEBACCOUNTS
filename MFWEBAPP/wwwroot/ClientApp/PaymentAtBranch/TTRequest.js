var _TTRequest = {
    
    BranchFill: function () {
        jQuery('.page-loader-wrapper').show();
        var BranchFillData = {
            "typeid":1,
            "branchID": userdata.branchId
        };
        BranchFillData = JSON.stringify(BranchFillData);
        BranchFillData = { "encryptedRqstStr": EncryptAPIReq(BranchFillData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/Ttrequest", BranchFillData, _TTRequest.BranchFilleDataLoad, userdata.token)
        
    },
    BranchFilleDataLoad: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            var accname = response.data.ttrequestList[0].accountName;
            var branchName = userdata.branchName;
            jQuery("#BranchName").val(branchName);
            jQuery("#BankName").val(accname);
        } else {
            jQuery("#BranchName").val('');
            jQuery("#BankName").val('');
        }
    },
    LoadBranchDetails: function () {
        jQuery('.page-loader-wrapper').show();
        var BranchData = {
            "typeid": 1,
            "branchID": userdata.branchId
        }
        BranchData = JSON.stringify(BranchData);
        BranchData = { "encryptedRqstStr": EncryptAPIReq(BranchData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/Ttrequest", BranchData, _TTRequest.BranchDetailsTableLoadCompleted, userdata.token)
    },
    BranchDetailsTableLoadCompleted: function (response) {

        jQuery('#maincard').show();

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            BranchData = response;
            if (response.data.ttrequestList != null && response.data.ttrequestList.length > 0) {
                jQuery('#divloanDetails').empty();
                var $table = jQuery('<table class="table" id="divloanDetails">');

                $table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text_align:center;">Cash Balance</th><th style=""margin-left:80px;">Bank Balance</th><th style="text-align:left;">Total Balance</th><th style="text-align:left;min-width:100px;">Retention Limit</th></tr></thead>');

                var $tbody = jQuery('<tbody>');
                jQuery.each(response.data.ttrequestList, function (i, val) {

                    var $row = jQuery('<tr/>');
                  
                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="left">').html(val.cashbalance));
                    $row.append(jQuery('<td align="left">').html(val.bankBalance));
                    $row.append(jQuery('<td align="left">').html(val.totalBalance));
                    $row.append(jQuery('<td align="left">').html(val.retentionLimit));
                 
                    $tbody.append($row);
                   
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divloanDetails').html($table);

            } else {
                jQuery('#divloanDetails').hide();
                jQuery('#divloanDetails').empty();
            }
        } else {

            _General.noData(jQuery('#divloanDetails'), "No Data Found");

        }

        jQuery('.page-loader-wrapper').hide();
    },
    DataSaveLoad: function () {
        jQuery('.page-loader-wrapper').hide();   
        var bankName = jQuery('#BankName').val();
        var cashbalance = BranchData.data.ttrequestList[0].cashbalance;
        var bankBalance = BranchData.data.ttrequestList[0].bankBalance;
        var totalBalance = BranchData.data.ttrequestList[0].totalBalance;
        var retentionLimit = BranchData.data.ttrequestList[0].retentionLimit;
        var bankId = BranchData.data.ttrequestList[0].accountNumber;
        var amount = jQuery('#amount').val();
        var remark = jQuery('#remark').val();


        if (jQuery('#amount').val() == "") {
            swal("", "Please Enter Amount", "warning");
            return false;
        }
        else if (jQuery('#remark').val() == "") {
            swal("", "Please Enter Remarks", "warning");
            return false;
        }

        var SaveData = {
            "typeid": 2,
            "branchID": userdata.branchId,
            "bankID": bankId,
            "bankName": bankName,
            "cashBalance": cashbalance,
            "bankBalance": bankBalance, 
            "totalBalance": totalBalance,
            "retentionLimit": retentionLimit,
            "amount": amount,
            "remark": remark,
            "userId": userdata.userId 
        }
        SaveData = JSON.stringify(SaveData);
        SaveData = { "encryptedRqstStr": EncryptAPIReq(SaveData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/Ttrequest", SaveData, _TTRequest.SaveDataCompleted, userdata.token)
    },

    SaveDataCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            swal("", response.responseMsg, "success");

            //jQuery('#BranchName').val("");
            //jQuery('#BankName').val("");
            jQuery('#amount').val("");
            jQuery('#remark').val("");
            //jQuery('#divloanDetails').hide();

            _TTRequest.BranchFill();
            _TTRequest.LoadBranchDetails();
        }

        else {

            swal("", response.responseMsg, "error")

           
        }

    }
}

jQuery(document).ready(function ($) {

    jQuery('.page-loader-wrapper').show();

    _TTRequest.BranchFill();

    _TTRequest.LoadBranchDetails();

    jQuery("#BtnConfirm").click(function (e) {



        _TTRequest.DataSaveLoad();

    });


    jQuery('#btn_exit').click(function () {
      
        jQuery("#amount").val('');
        jQuery("#remark").val('');
      

    });


});
