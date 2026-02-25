var tblAccountsRetA, tblAccountsRetB, ReportData;
jQuery(document).ready(function () {
    jQuery('#TraDate').datepicker({
        autoclose: true,
        format: "dd/M/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        minDate: new Date(),
        container: '#DivDate'
    }).datepicker("setDate", new Date());

    jQuery("#btnSearch").click(function () {
        LoadFunction.GetAccountsReportA();
    });
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

   

   
    GetAccountsReportA: function () {
        jQuery('.page-loader-wrapper').show();
        var ReportReq = {
            "branchID": jQuery('#BranchID').val(),
            "date": jQuery('#TraDate').val()
        };
        _http.post(MFPUBLICLMSAPI_URL + "api/accountdetails/trialbalance", ReportReq, LoadFunction.AccountsReportA, userdata.token)
    },

    AccountsReportA: function (response) {
        if (response.status === "SUCCESS") {
            LoadReportA(response.data.trialBalanceList);
        }
        jQuery('.page-loader-wrapper').hide();
        jQuery('#TotDrAmt').html(TotDr.toFixed(2));
        jQuery('#TotCrAmt').html(TotCr.toFixed(2));
    }
}

LoadFunction.GetBranch();
var tblAccountsRetA;
function LoadReportA(ReportData) {
    var TotCr = 0, TotDr = 0;

    jQuery.each(ReportData, function (i, val) {
        var Amt = val.balance.replace(",", "");
        if (Amt < 0)
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
            { "data": "accountNo" },
            { "data": "accountName" },
            {
                "render": function (data, type, full, meta) {
                    var Debit = "";
                    if (full.balance > 0)
                        Debit = full.balance;
                    if (Debit == "")
                        return '<div style="text-align: right"></div>';
                    else
                        return '<div style="text-align: right">' + Debit.replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</div>';
                }
            },
            {
                "render": function (data, type, full, meta) {
                    var Credit = "";
                    if (full.balance < 0)
                        Credit = Math.abs(full.balance);
                    else
                        Credit = "";
                    if (Credit == "")
                        return '<div style="text-align: right"></div>';
                    else
                        return '<div style="text-align: right">' + Math.abs(Credit).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</div>';
                }
            }
        ],
        select: 'single',
        pagination: true,
        ordering: false
    });
    jQuery('.page-loader-wrapper').hide();
    jQuery('#TotDrAmt').html(TotDr.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    jQuery('#TotCrAmt').html(Math.abs(TotCr).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
}