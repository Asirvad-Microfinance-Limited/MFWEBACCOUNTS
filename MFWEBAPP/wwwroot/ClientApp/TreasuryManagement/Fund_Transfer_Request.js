var _fundtfrData = {


    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var CheckAccess = {
            "typeID": "2",
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1001",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            CheckAccess = JSON.stringify(CheckAccess);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _fundtfrData.checkAccessRtn, token)
    },

    checkAccessRtn: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                token = response.data.token;
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
                    _fundtfrData.loadBank();
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

        try {
            CheckToken = JSON.stringify(CheckToken);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckToken = { "encryptedRqstStr": EncryptAPIReq(CheckToken) };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _fundtfrData.checkAccessToken, userdata.token)
    },

    // Token response



    checkAccessToken: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            token = response.data.queryResult.tokenId;
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
                _fundtfrData.loadBank();
            }


        }

    },


    loadBank: function () {
        jQuery('.page-loader-wrapper').show();
        var BankLoad = {

            Flag: "FundTransferRequest",
            PagVal: "FromBank",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        BankLoad = JSON.stringify(BankLoad);
        BankLoad = { "encryptedRqstStr": EncryptAPIReq(BankLoad) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", BankLoad, _fundtfrData.LoadBankResponse, userdata.token);
    },
    LoadBankResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_bank").empty();
                jQuery("#ddl_bank").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BANK-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_bank").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_bank").empty();
                jQuery("#ddl_bank").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BANK-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    LoadBranch: function (bank) {
        jQuery('.page-loader-wrapper').show();

        var branchLoad = {

            Flag: "FundTransferRequest",
            PagVal: "FromBranch",
            parVal: bank,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        branchLoad = JSON.stringify(branchLoad);
        branchLoad = { "encryptedRqstStr": EncryptAPIReq(branchLoad) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", branchLoad, _fundtfrData.LoadBranchResponse, userdata.token);
    },
    LoadBranchResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_branch").empty();
                jQuery("#ddl_branch").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_branch").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_branch").empty();
                jQuery("#ddl_branch").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    LoadAccount: function (data) {
        jQuery('.page-loader-wrapper').show();

        var accountLoab = {
            Flag: "FundTransferRequest",
            PagVal: "FromAccount",
            parVal: data,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        accountLoab = JSON.stringify(accountLoab);
        accountLoab = { "encryptedRqstStr": EncryptAPIReq(accountLoab) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", accountLoab, _fundtfrData.LoadAccountResponse, userdata.token);

    },
    LoadAccountResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_accnt").empty();
                jQuery("#ddl_accnt").append(jQuery("<option></option>").val("0").text(" --------CHOOSE ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_accnt").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_accnt").empty();
                jQuery("#ddl_accnt").append(jQuery("<option></option>").val("0").text(" --------CHOOSE ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    getFromBankDtls: function (accnum) {
        jQuery('.page-loader-wrapper').show();

        var FromBankDtls = {
            Flag: "FundTransferRequest",
            PagVal: "FromBankdtls",
            parVal: accnum,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        FromBankDtls = JSON.stringify(FromBankDtls);
        FromBankDtls = { "encryptedRqstStr": EncryptAPIReq(FromBankDtls) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", FromBankDtls, _fundtfrData.FromBankDtlsResponse, userdata.token);

    },
    FromBankDtlsResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                _fundtfrData.FillTable(response);

            }
            else {

                return false;
            }
        }
    },
    FillTable: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();
                jQuery('#maincard').show();

                if (response.data.queryResult.QueryResult.length > 0) {

                    jQuery('#Fidatatabl').empty();
                    jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                        var $row = jQuery('<tr/>');
                        var data1 = val.Param1.split("~");
                        //var nval = nval + 1;

                        //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                        jQuery('#Fidatatabl').append($row);
                    });
                }

            }
        }

    },
    loadToBank: function () {
        jQuery('.page-loader-wrapper').show();
        var ToBankLoad = {

            Flag: "FundTransferRequest",
            PagVal: "FromBank",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        ToBankLoad = JSON.stringify(ToBankLoad);
        ToBankLoad = { "encryptedRqstStr": EncryptAPIReq(ToBankLoad) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", ToBankLoad, _fundtfrData.LoadToBankResponse, userdata.token);
    },
    LoadToBankResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_bank1").empty();
                jQuery("#ddl_bank1").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BANK-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_bank1").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_bank1").empty();
                jQuery("#ddl_bank1").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BANK-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    LoadToBranch: function (bank) {
        jQuery('.page-loader-wrapper').show();

        var TobranchLoad = {

            Flag: "FundTransferRequest",
            PagVal: "FromBranch",
            parVal: bank,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        TobranchLoad = JSON.stringify(TobranchLoad);
        TobranchLoad = { "encryptedRqstStr": EncryptAPIReq(TobranchLoad) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", TobranchLoad, _fundtfrData.LoadToBranchResponse, userdata.token);
    },
    LoadToBranchResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_branch1").empty();
                jQuery("#ddl_branch1").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_branch1").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_branch1").empty();
                jQuery("#ddl_branch1").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },













    LoadToAccount: function (data) {
        jQuery('.page-loader-wrapper').show();

        var accountLoab = {
            Flag: "FundTransferRequest",
            PagVal: "FromAccount",
            parVal: data,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        accountLoab = JSON.stringify(accountLoab);
        accountLoab = { "encryptedRqstStr": EncryptAPIReq(accountLoab) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", accountLoab, _fundtfrData.LoadToAccountResponse, userdata.token);

    },
    LoadToAccountResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_accnt1").empty();
                jQuery("#ddl_accnt1").append(jQuery("<option></option>").val("0").text(" --------CHOOSE ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_accnt1").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_accnt1").empty();
                jQuery("#ddl_accnt1").append(jQuery("<option></option>").val("0").text(" --------CHOOSE ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    //fillDataTable: function () {
    //    jQuery('.page-loader-wrapper').hide();
    //    jQuery('#maincards').show();
    //    jQuery('#Filldatatabl').empty();


    //        var $row = jQuery('<tr/>');

    //    $row.append(jQuery('<td class="HCol" align="left">').html(jQuery("#ddl_bank1 option:selected").text()));
    //    $row.append(jQuery('<td class="HCol" align="left">').html(jQuery("#ddl_branch1 option:selected").text()));
    //    $row.append(jQuery('<td class="HCol" align="left">').html(jQuery("#ddl_accnt1 option:selected").text()));
    //    $row.append(jQuery('<td class="HCol" align="left">').html(jQuery("#txtPayAmount").val()));


    //        jQuery('#Filldatatabl').append($row);

    //}

    fillDataTable: function () {
        jQuery('.page-loader-wrapper').hide();


        // Get values
        var bank = jQuery("#ddl_bank1 option:selected").text();
        var branch = jQuery("#ddl_branch1 option:selected").text();
        var account = jQuery("#ddl_accnt1 option:selected").text();
        var bnk_id = jQuery("#ddl_accnt1").val();
        var amount = jQuery("#txtPayAmount").val();


        if (document.getElementById('Fidatatabl').rows[0].cells[2].innerText == account) {
            swal("", "From Account and To Account cannot be the same", "warning");
            _fundtfrData.loadToBank();
            jQuery("#ddl_branch1").empty();
            jQuery("#ddl_accnt1").empty();
            jQuery("#txtPayAmount").val("");

            return false;
        }

        // Validation
        else if (bank === " --------CHOOSE BANK-------- " || branch === " --------CHOOSE BRANCH-------- " ||
            account === " --------CHOOSE ACCOUNT-------- " || amount === "") {
            swal("", "Please select all fields and enter amount", "warning");
            return false;
        }
        else {
            jQuery('#maincards').show();
            // Create row
            var $row = jQuery('<tr/>');
            $row.append(jQuery('<td class="HCol" align="left">').text(bank));
            $row.append(jQuery('<td class="HCol" align="left">').text(branch));
            $row.append(jQuery('<td class="HCol" align="left">').text(account));
            $row.append(jQuery('<td class="HCol" align="left" style="display:none">').text(bnk_id));

            $row.append(jQuery('<td class="HCol" align="left">').text(amount));
            //$row.append(jQuery('<td class="HCol" align="left">').$("#ddl_accnt1").val());

            //'<td class="align-center" style="display:none">' + $("#ddl_accnt1").val() + '</td>' +

            //$row.append(jQuery('<td class="HCol" align="center">').html("<button type='button' class='btnDelete btn btn-danger btn-sm'>Delete</button>"));
            //<i class="material-icons">delete</i>
            $row.append(jQuery('<td class="HCol" align="center">').html(
                "<button type='button' class='btnDelete btn btn-danger btn-sm'><i class='material-icons'>delete</i></button>"
            ));


            // Append row to table
            jQuery('#Filldatatabl').append($row);
            _fundtfrData.calculateTotalAmount();

            // Reset fields
            jQuery("#ddl_bank1").prop("selectedIndex", 0);
            jQuery("#ddl_branch1").empty().append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH-------- "));
            jQuery("#ddl_accnt1").empty().append(jQuery("<option></option>").val("0").text(" --------CHOOSE ACCOUNT-------- "));
            jQuery("#txtPayAmount").val("");
        }
    },


    calculateTotalAmount: function () {
        var total = 0;

        jQuery("#Filldatatabl tr").each(function () {
            var amountText = jQuery(this).find("td:eq(4)").text();
            var amount = parseFloat(amountText.replace(/,/g, '')) || 0;
            total += amount;
        });

        jQuery("#txtTotalAmount").val(total.toFixed(2));
    },

    Confirmtransfer: function () {
        jQuery('.page-loader-wrapper').show();

        var tblAccntData = "";
        var tblAmntData = jQuery("#ddl_accnt").val() + "¥" + jQuery("#txtTotalAmount").val() + "¥" + userdata.userId + "¥" + userdata.branchId + "¥" + "3" + "¥" + jQuery("#ddl_remarks").val();

        var tableData = document.getElementById('Filldatatabl');
        for (j = 0; j < jQuery("#Filldatatabl tr").length; j++) {
            tblAccntData = tblAccntData + tableData.rows[j].cells[0].innerText + "µ" + tableData.rows[j].cells[3].innerText + "µ" + tableData.rows[j].cells[4].innerText + "¥";
        }

        var accountransfer = {
            Flag: "FUNDTRANSFERREQUEST",
            PagVal: tblAmntData,
            parVal: tblAccntData,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        accountransfer = JSON.stringify(accountransfer);
        accountransfer = { "encryptedRqstStr": EncryptAPIReq(accountransfer) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", accountransfer, _fundtfrData.fundtransferapproveresponse, userdata.token)

    },

    fundtransferapproveresponse: function (response) {

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                var msg = jQuery.trim(response.data.queryResult.Message);
                if (msg = "Success") {
                    if (response.data.queryResult.QueryResult[0].Param1 == "SUCCESS") {
                        swal({
                            title: "Requested Successfully!",
                            text: "",
                            type: "success"
                        }, function () {
                            window.location.reload(true);
                        });

                    }
                    else {
                        var msg = jQuery.trim(response.responseMsg);
                        swal({
                            title: "Error",
                            text: msg,
                            type: "error"
                        }, function () {
                            window.location.reload(true);
                        });

                    }
                }
            }

        }


    }

}

function checkvalues() {

    var frombank = jQuery('#ddl_bank').val();
    var frombranch = jQuery('#ddl_branch').val();
    var fromaccount = jQuery('#ddl_accnt').val();
    const table = document.getElementById("maincards");
    //var amount = jQuery('#ddlFundType').val();
    if (frombank == 0) {

        swal("", "Please Select Bank", "error");
        return false;
    }
    else if (frombranch == 0) {

        swal("", "Please Select Branch", "error");
        return false;
    }
    else if (fromaccount == 0) {

        swal("", "Please Select Account", "error");
        return false;
    }
    else if (jQuery("#maincards td").text().trim() === "") {
        swal("", "Please Add To bank details", "error");
        return false;
    }
    else if (jQuery("#divremark").is(':visible') && jQuery("#ddl_remarks").val().trim() === '') {
        swal("", "Please Enter Remarks", "error");
        return false;
    }


    else {

        _fundtfrData.Confirmtransfer();
        //return true;
    }
}



jQuery(document).ready(function () {
    jQuery('.page-loader-wrapper').hide();
    //_fundtfrData.loadBank();
    _fundtfrData.tokenValidate();
});
jQuery("#ddl_bank").on("change", function () {
    jQuery("#maincard").hide();
    //jQuery("#maincards").empty();
    jQuery('#maincards').find('tr:gt(0)').remove();

    jQuery("#maincards").hide();
    jQuery("#divTotal").hide();
    jQuery("#divremark").hide();

    jQuery("#ddl_accnt").val('');

    var bank = jQuery("#ddl_bank").val();
    _fundtfrData.LoadBranch(bank);
});
jQuery("#ddl_branch").on("change", function () {
    jQuery("#maincard").hide();
    jQuery('#maincards').find('tr:gt(0)').remove();
    jQuery("#maincards").hide();

    jQuery("#divTotal").hide();
    jQuery("#divremark").hide();

    var bank = jQuery("#ddl_bank").val();
    var brnch = jQuery("#ddl_branch").val();
    var data = bank + 'µ' + brnch;
    _fundtfrData.LoadAccount(data);
});
jQuery("#ddl_accnt").on("change", function () {

    jQuery("#divAddAccount1head").show();
    jQuery("#divAddAccount1").show();
    jQuery("#divaddbutton").show();
    jQuery('#maincards').find('tr:gt(0)').remove();
    jQuery("#maincards").hide();

    jQuery("#divTotal").hide();
    jQuery("#divremark").hide();

    var accnum = jQuery("#ddl_accnt").val();
    _fundtfrData.getFromBankDtls(accnum);
    _fundtfrData.loadToBank();
});

jQuery("#ddl_bank1").on("change", function () {

    jQuery('#ddl_accnt1').val('');
    //jQuery("#divaddbutton").show();
    //jQuery("#divaddbutton").show();
    //jQuery("#divaddbutton").show();
    jQuery("#txtPayAmount").val('');

    var bank = jQuery("#ddl_bank1").val();
    _fundtfrData.LoadToBranch(bank);
});
jQuery("#ddl_branch1").on("change", function () {
    jQuery("#txtPayAmount").val('');

    var bank = jQuery("#ddl_bank1").val();
    var brnch = jQuery("#ddl_branch1").val();
    var data = bank + 'µ' + brnch;
    _fundtfrData.LoadToAccount(data);
});
jQuery("#btnAdd").on("click", function () {

    //jQuery('#maincards').find('tr:gt(0)').remove();

    jQuery("#divTotal").show();
    jQuery("#divremark").show();

    var bank = jQuery("#ddl_bank1 option:selected").text();
    var branch = jQuery("#ddl_branch1 option:selected").text();
    var account = jQuery("#ddl_accnt1 option:selected").text();

    let isDuplicate = false;

    jQuery('#divcustomertbl tbody tr').each(function () {
        let rowVal1 = jQuery(this).find('td:eq(0)').text().trim();
        let rowVal2 = jQuery(this).find('td:eq(1)').text().trim();
        let rowVal3 = jQuery(this).find('td:eq(2)').text().trim();

        if (bank === rowVal1 && branch === rowVal2 && account === rowVal3) {
            isDuplicate = true;
            return false; // break loop
        }
    });

    if (isDuplicate) {
        swal("", "Data already exists in the table", "error");

        return false;
    }
    else {
        _fundtfrData.fillDataTable();
    }
});

jQuery("#Filldatatabl").on("click", ".btnDelete", function () {
    jQuery(this).closest("tr").remove();
    const remainingRows = jQuery("#maincards tbody tr").length;

    if (remainingRows === 0) {
        // Remove the header if no data rows left
        jQuery("#maincards").hide();
        jQuery("#divTotal").hide();
        jQuery("#divremark").hide();

    }

    _fundtfrData.calculateTotalAmount();
});


jQuery("#btnConf").on("click", function () {

    checkvalues();

    //btnAdd _fundtfrData.Confirmtransfer();
});

jQuery('#btnExit').on("click", function () {
    window.open("Dashboard", "_self");
});

jQuery("#ddl_accnt1").on("change", function () {
    //jQuery("#maincards").hide();
    jQuery("#txtPayAmount").val('');


});