var tblAccountsRetA, tblAccountsRetB, ReportData;
jQuery(document).ready(function () {
    jQuery('#FrmDate').datepicker({
        autoclose: true,
        format: "dd/M/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        minDate: new Date(),
        container: '#DivFrmDate'
    }).datepicker("setDate", new Date());

    jQuery('#ToDate').datepicker({
        autoclose: true,
        format: "dd/M/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        minDate: new Date(),
        container: '#DivToDate'
    }).datepicker("setDate", new Date());

    jQuery("#BranchID").change(function () {
        jQuery('.page-loader-wrapper').show();
        LoadFunction.GetAccounts();
    });
    jQuery("#AccountID").change(function () {
        var Status = jQuery(this).find(':selected').attr('data-accountstatus');
        if (Status == "2") {
            jQuery('.page-loader-wrapper').show();
            LoadFunction.GetSubAccounts();
        }
        else 
            jQuery('#DivSubAccount').hide();
    });
    jQuery("#btnSearch").click(function () {
        LoadFunction.GetAccountsReportA();
    });
    jQuery("#btnBack").click(function () {
        jQuery('#DivReportA').show();
        jQuery('#DivReportB').hide();
        jQuery('#FrmDate').attr('disabled', false);
        jQuery('#ToDate').attr('disabled', false);
        jQuery('#BranchID').attr('disabled', false);
        jQuery('#AccountID').attr('disabled', false);
        jQuery('#SubAccountID').attr('disabled', false);
        jQuery('#btnSearch').show();
        jQuery('#btnBack').hide();
    });
    jQuery('#DivReportA').show();
    jQuery('#DivReportB').hide();
    jQuery('#DivSubAccount').hide();
    jQuery('#btnBack').hide();
    LoadReportA(ReportData);
});

var LoadFunction = {
    FillBranch: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.layerDetailsData.length > 0) {
                jQuery("#BranchID").empty();
                jQuery("#BranchID").append(jQuery("<option></option>").val("0").text("Select Branch"));
                jQuery.each(response.data.layerDetailsData, function (i, val) {
                    jQuery("#BranchID").append(jQuery("<option></option>").val(val.levelId).text(val.levelName));
                });
            }
            else {
                jQuery("#BranchID").empty();
                jQuery("#BranchID").append(jQuery("<option></option>").val("0").text("Select Branch"));
            }
        }
        else {

            jQuery("#BranchID").empty();
            jQuery("#BranchID").append(jQuery("<option></option>").val("0").text("Choose Branch"));
        }
    },

    GetBranch: function () {
        var userid = userdata.userId;
        var BranchFillData = {
            "layerId": 6
        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/layerdetails", BranchFillData, LoadFunction.FillBranch, userdata.token)
    },

    GetAccounts: function () {
        var BranchID = jQuery('#BranchID').val();
        var AccountReq = {
            "branchID": BranchID
        };
        jQuery('.page-loader-wrapper').show();
        _http.post(MFPUBLICLMSAPI_URL + "api/accountdetails/accountsdetails", AccountReq, LoadFunction.FillAccount, userdata.token)
    },

    FillAccount: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.accountList.length > 0) {
                jQuery("#AccountID").empty();
                jQuery("#AccountID").append(jQuery("<option></option>").val("0").text("Select Account"));
                jQuery.each(response.data.accountList, function (i, val) {
                    jQuery("#AccountID").append("<option value=" + val.accountNo + " data-AccountStatus=" + val.accountStatus + ">" + val.accountName + "</option>");
                });
            }
            else {
                jQuery("#AccountID").empty();
                jQuery("#AccountID").append(jQuery("<option></option>").val("0").text("Select Account"));
            }
        }
        else {
            jQuery("#AccountID").empty();
            jQuery("#AccountID").append(jQuery("<option></option>").val("0").text("Select Account"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetSubAccounts: function () {
        var SubAccountReq = {
            "branchID": jQuery('#BranchID').val(),
            "accountNo": jQuery('#AccountID').val()
        };
        jQuery('.page-loader-wrapper').show();
        _http.post(MFPUBLICLMSAPI_URL + "api/accountdetails/subaccountsdetails", SubAccountReq, LoadFunction.FillSubAccount, userdata.token)
    },

    FillSubAccount: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.accountList.length > 0) {
                jQuery('#DivSubAccount').show();
                jQuery("#SubAccountID").empty();
                jQuery("#SubAccountID").append(jQuery("<option></option>").val("0").text("Select Sub-Account"));
                jQuery.each(response.data.accountList, function (i, val) {
                    jQuery("#SubAccountID").append("<option value=" + val.accountNo + ">" + val.accountName + "</option>");
                });
            }
            else {
                jQuery('#DivSubAccount').hide();
                jQuery("#SubAccountID").empty();
                jQuery("#SubAccountID").append(jQuery("<option></option>").val("0").text("Select Sub-Account"));
            }
        }
        else {
            jQuery('#DivSubAccount').hide();
            jQuery("#SubAccountID").empty();
            jQuery("#SubAccountID").append(jQuery("<option></option>").val("0").text("Select Sub-Account"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetAccountsReportA: function () {
        jQuery('.page-loader-wrapper').show();
        jQuery('#DivReportA').show();
        jQuery('#DivReportB').hide();
        var ReportReq = {
            "branchId": jQuery('#BranchID').val(),
            "accountNo": jQuery('#AccountID').val(),
            "subAccountNo": (jQuery('#SubAccountID').val() == undefined ? "0" : jQuery('#SubAccountID').val()),
            "fromDt": jQuery('#FrmDate').val(),
            "toDt": jQuery('#ToDate').val()
        };
        _http.post(MFPUBLICLMSAPI_URL + "api/accountdetails/accountsreport", ReportReq, LoadFunction.AccountsReportA, userdata.token)
    },

    AccountsReportA: function (response) {
        if (response.status === "SUCCESS")
            LoadReportA(response.data.accountReportListData);
        jQuery('.page-loader-wrapper').hide();
    },

    GetAccountsReportB: function (TransNo, TransDate) {
        jQuery('.page-loader-wrapper').show();
        jQuery('#DivReportB').show();
        jQuery('#DivReportA').hide();
        var ReportReq = {
            "branchId": jQuery('#BranchID').val(),
            "transId": TransNo,
            "traDt": TransDate
        };
        _http.post(MFPUBLICLMSAPI_URL + "api/accountdetails/accountjurnalreport", ReportReq, LoadFunction.AccountsReportB, userdata.token)
    },

    AccountsReportB: function (response) {
        if (response.status === "SUCCESS")
            LoadReportB(response.data.accountJurnalReportListData);
        jQuery('.page-loader-wrapper').hide();
    },
}

LoadFunction.GetBranch();
var tblAccountsRetA;
function LoadReportA(ReportData) {
    var TotBal = 0, TotCr = 0, TotDr = 0;

    jQuery.each(ReportData, function (i, val) {
        var Amt = val.amount.replace(/,/gi, "").replace(/-/gi, "");
        if (val.type == "C")
            TotCr += parseFloat(Amt);
        else
            TotDr += parseFloat(Amt);
    });

    if (jQuery.fn.dataTable.isDataTable('#tblAccountsRetA')) {
        tblAccountsRetA.off('user-select');
        tblAccountsRetA.destroy();
    }
    tblAccountsRetA = jQuery('#tblAccountsRetA').DataTable({
        data: ReportData,
        "columns": [
            {
                "render": function (data, type, full, meta) {
                    if (full.traDt == "01-JAN-1900")
                        return '';
                    else
                        return full.traDt;
                }
            },
            {
                "render": function (data, type, full, meta) {
                    if (full.transno != 0)
                        return '<a href="#" style="font-weight:600;color:#e5322d;" onclick="LoadFunction.GetAccountsReportB(' + full.transno + ',\'' + full.traDt + '\')">' + full.transno + '</a>';
                    else
                        return '';
                }
            },
            { "data": "descr" },
            {
                "render": function (data, type, full, meta) {
                    var Amt = "";
                    if (full.type == "D")
                        Amt = full.amount.replace(/-/gi, "");
                    return '<div style="text-align: right">' + Amt + '</div>';
                }
            },
            {
                "render": function (data, type, full, meta) {
                    var Amt = "";
                    if (full.type == "C")
                        Amt = full.amount.replace(/-/gi, "");
                    return '<div style="text-align: right">' + Amt + '</div>';
                }
            },
            {
                "render": function (data, type, full, meta) {
                    var BAmt = 0;
                    BAmt = parseFloat(full.amount.replace(/,/gi, ""));
                    if (full.type == "D")
                        TotBal += BAmt;
                    else
                        TotBal -= BAmt;
                    return '<div style="text-align: right">' + Math.abs(TotBal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</div>';
                }
            }
        ],
        select: 'single',
        pagination: true,
        ordering: false
    });
    jQuery('.page-loader-wrapper').hide();

    jQuery('#TotDrAmt').html(TotDr.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    jQuery('#TotCrAmt').html(TotCr.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    jQuery('#TotBalAmt').html(Math.abs(TotBal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
}

var tblAccountsRetB;
function LoadReportB(ReportData) {
    jQuery('#FrmDate').attr('disabled', true);
    jQuery('#ToDate').attr('disabled', true);
    jQuery('#BranchID').attr('disabled', true);
    jQuery('#AccountID').attr('disabled', true);
    jQuery('#SubAccountID').attr('disabled', true);
    jQuery('#btnSearch').hide();
    jQuery('#btnBack').show();

    var TotCr = 0, TotDr = 0;

    jQuery.each(ReportData, function (i, val) {
        var Amt = val.amount;
        if (val.type == "C")
            TotCr += parseFloat(Amt);
        else
            TotDr += parseFloat(Amt);
    });

    if (jQuery.fn.dataTable.isDataTable('#tblAccountsRetB')) {
        tblAccountsRetB.off('user-select');
        tblAccountsRetB.destroy();
    }
    tblAccountsRetB = jQuery('#tblAccountsRetB').DataTable({
        data: ReportData,
        "columns": [
            { "data": "accountNo" },
            { "data": "accountName" },
            { "data": "traDt" },
            { "data": "descr" },
            {
                "render": function (data, type, full, meta) {
                    var Amt = "";
                    if (full.type == "D")
                        Amt = full.amount;
                    return '<div style="text-align: right">' + (Amt == "" ? "" : parseFloat(Amt).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) + '</div>';
                }
            },
            {
                "render": function (data, type, full, meta) {
                    var Amt = "";
                    if (full.type == "C")
                        Amt = full.amount;
                    return '<div style="text-align: right">' + (Amt == "" ? "" : parseFloat(Amt).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) + '</div>';
                }
            }
        ],
        select: 'single',
        pagination: true,
        ordering: false
    });
    jQuery('.page-loader-wrapper').hide();

    jQuery('#BTotDrAmt').html(TotDr.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    jQuery('#BTotCrAmt').html(TotCr.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
}