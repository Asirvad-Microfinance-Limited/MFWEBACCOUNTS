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
        LoadFunction.GetCenter();
    });

    jQuery("#CenterID").change(function () {
        jQuery('.page-loader-wrapper').show();
        LoadFunction.GetCustomer();
    });

    jQuery("#CustomerID").change(function () {
        jQuery('.page-loader-wrapper').show();
        LoadFunction.GetLoanDetail();
    });

    jQuery("#LoanID").change(function () {
        jQuery('.page-loader-wrapper').show();
        LoadFunction.GetAccounts();
    });

    jQuery("#btnSearch").click(function () {
        LoadFunction.GetAccountsReportA();
    });
    jQuery('#tblAccountsRetA').show();
    jQuery('#tblAccountsRetB').hide();
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

    GetCenter: function () {
        var BranchID = jQuery('#BranchID').val();
        var userid = userdata.userId;
        var CenterReq = {
            "branchid": BranchID,
            "userid": userid

        };
        jQuery('.page-loader-wrapper').show();
        _http.post(MFPUBLICLMSAPI_URL + "api/loans/loanCenters", CenterReq, LoadFunction.FillCenter, userdata.token)
    },

    GetCustomer: function () {
        var BranchID = jQuery('#BranchID').val();
        var userid = userdata.userId;
        var centerid = jQuery('#CenterID').val();
        var CustomerReq = {
            "branchid": BranchID,
            "userid": userid,
            "centerId" : centerid
        };
        jQuery('.page-loader-wrapper').show();
        _http.post(MFPUBLICLMSAPI_URL + "api/accountdetails/loanmembers", CustomerReq, LoadFunction.FillCustomer, userdata.token)
    },


    GetLoanDetail: function () {
        var BranchID = jQuery('#BranchID').val();
        var userid = userdata.userId;
        var centerid = jQuery('#CenterID').val();
        var customerid = jQuery('#CustomerID').val();
        var LoanDetailReq = {
            "branchid": BranchID,
            "userid": userid,
            "centerId": centerid,
            "memberId": customerid
        };
        jQuery('.page-loader-wrapper').show();
        _http.post(MFPUBLICLMSAPI_URL + "api/loans/loandetails", LoanDetailReq, LoadFunction.FillLoanDetail, userdata.token)
    },

    FillCenter: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.loancentersdata.length > 0) {
                jQuery("#CenterID").empty();
                jQuery("#CenterID").append(jQuery("<option></option>").val("0").text("Select Center"));
                jQuery.each(response.data.loancentersdata, function (i, val) {
                    jQuery("#CenterID").append(jQuery("<option></option>").val(val.centerId).text(val.centerName));
                });
            }
            else {
                jQuery("#CenterID").empty();
                jQuery("#CenterID").append(jQuery("<option></option>").val("0").text("Select Center"));
            }
        }
        else {

            jQuery("#CenterID").empty();
            jQuery("#CenterID").append(jQuery("<option></option>").val("0").text("Choose Center"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    FillCustomer: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.loanMemberList.length > 0) {
                jQuery("#CustomerID").empty();
                jQuery("#CustomerID").append(jQuery("<option></option>").val("0").text("Select Customer"));
                jQuery.each(response.data.loanMemberList, function (i, val) {
                    jQuery("#CustomerID").append(jQuery("<option></option>").val(val.memberId).text(val.memberName));
                });
            }
            else {
                jQuery("#CustomerID").empty();
                jQuery("#CustomerID").append(jQuery("<option></option>").val("0").text("Select Customer"));
            }
        }
        else {

            jQuery("#CustomerID").empty();
            jQuery("#CustomerID").append(jQuery("<option></option>").val("0").text("Choose Customer"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    FillAccount: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.accountList.length > 0) {
                jQuery("#AccountID").empty();
                jQuery("#AccountID").append(jQuery("<option></option>").val("0").text("Select Account"));
                jQuery.each(response.data.accountList, function (i, val) {
                    jQuery("#AccountID").append(jQuery("<option></option>").val(val.accountNo).text(val.accountName));
                });
            }
            else {
                jQuery("#AccountID").empty();
                jQuery("#AccountID").append(jQuery("<option></option>").val("0").text("Select Account"));
            }
        }
        else {
            jQuery("#BranchID").empty();
            jQuery("#BranchID").append(jQuery("<option></option>").val("0").text("Select Account"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    FillLoanDetail: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.loanDetails.length > 0) {
                jQuery("#LoanID").empty();
                jQuery("#LoanID").append(jQuery("<option></option>").val("0").text("Select Loan"));
                jQuery.each(response.data.loanDetails, function (i, val) {
                    jQuery("#LoanID").append(jQuery("<option></option>").val(val.loanId).text(val.loanId));
                });
            }
            else {
                jQuery("#LoanID").empty();
                jQuery("#LoanID").append(jQuery("<option></option>").val("0").text("Select Loan"));
            }
        }
        else {
            jQuery("#BranchID").empty();
            jQuery("#BranchID").append(jQuery("<option></option>").val("0").text("Select Account"));
        }
        jQuery('.page-loader-wrapper').hide();
    },



    GetAccountsReportA: function () {
        jQuery('.page-loader-wrapper').show();
        jQuery('#tblAccountsRetA').show();
        jQuery('#tblAccountsRetB').hide();
        var ReportReq = {
            "branchId": jQuery('#BranchID').val(),
            "accountNo": jQuery('#AccountID').val(),
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
        //jQuery('.page-loader-wrapper').show();
        //jQuery('#tblAccountsRetB').show();
        //jQuery('#tblAccountsRetA').hide();
        //var ReportReq = {
        //    "branchId": jQuery('#BranchID').val(),
        //    "transId": TransNo,
        //    "traDt": TransDate
        //};
        //_http.post(MFPUBLICLMSAPI_URL + "api/accountdetails/accountjurnalreport", ReportReq, LoadFunction.AccountsReportB, userdata.token)
    },

    AccountsReportB: function (response) {
        if (response.status === "SUCCESS")
            LoadReportB(response.data.accountReportListData);
        jQuery('.page-loader-wrapper').hide();
    },
}

LoadFunction.GetBranch();
var tblAccountsRetA;
function LoadReportA(ReportData) {
    var TotBal = 0, TotCr = 0, TotDr = 0;

    jQuery.each(ReportData, function (i, val) {
        var Amt = val.amount.replace(",", "");
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
                        return '<a href="#" style="font-weight:600;color:#e5322d;" onclick="LoadFunction.GetAccountsReportB(' + full.transno + ',' + traDt +')">' + full.transno + '</a>';
                    else
                        return '';
                }
            },
            { "data": "descr" },
            {
                "render": function (data, type, full, meta) {
                    var Amt = "";
                    if (full.type == "D" && full.traDt != "01-JAN-1900")
                        Amt = full.amount;
                    return '<div style="text-align: right">' + Amt + '</div>';
                }
            },
            {
                "render": function (data, type, full, meta) {
                    var Amt = "";
                    if (full.type == "C" && full.traDt != "01-JAN-1900")
                        Amt = full.amount;
                    return '<div style="text-align: right">' + Amt + '</div>';
                }
            },
            {
                "render": function (data, type, full, meta) {
                    var BAmt = 0;
                    BAmt = parseFloat(full.amount.replace(",", ""));
                    if (full.type == "D")
                        TotBal += BAmt;
                    else
                        TotBal -= BAmt;
                    return '<div style="text-align: right">' + Math.abs(TotBal).toFixed(2) + '</div>';
                }
            }
        ],
        select: 'single',
        pagination: true,
        ordering: false
    });
    jQuery('.page-loader-wrapper').hide();

    jQuery('#TotDrAmt').html(TotDr.toFixed(2));
    jQuery('#TotCrAmt').html(TotCr.toFixed(2));
    jQuery('#TotBalAmt').html(Math.abs(TotDr - TotCr).toFixed(2));
}

var tblAccountsRetB;
function LoadReportB(ReportData) {
    var TotCr = 0, TotDr = 0;

    jQuery.each(ReportData, function (i, val) {
        var Amt = val.amount.replace(",", "");
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
                        return '<a style="font-weight:600;color:#e5322d;" onclick="LoadFunction.GetAccountsReportB(' + full.transno +')">' + full.transno + '</a>';
                    else
                        return '';
                }
            },
            { "data": "descr" },
            {
                "render": function (data, type, full, meta) {
                    var Amt = "";
                    if (full.type == "D" && full.traDt != "01-JAN-1900")
                        Amt = full.amount;
                    return '<div style="text-align: right">' + Amt + '</div>';
                }
            },
            {
                "render": function (data, type, full, meta) {
                    var Amt = "";
                    if (full.type == "C" && full.traDt != "01-JAN-1900")
                        Amt = full.amount;
                    return '<div style="text-align: right">' + Amt + '</div>';
                }
            },
            {
                "render": function (data, type, full, meta) {
                    var BAmt = 0;
                    BAmt = parseFloat(full.amount.replace(",", ""));
                    if (full.type == "D")
                        TotBal += BAmt;
                    else
                        TotBal -= BAmt;
                    return '<div style="text-align: right">' + Math.abs(TotBal).toFixed(2) + '</div>';
                }
            }
        ],
        select: 'single',
        pagination: true,
        ordering: false
    });
    jQuery('.page-loader-wrapper').hide();

    jQuery('#TotDrAmt').html(TotDr.toFixed(2));
    jQuery('#TotCrAmt').html(TotCr.toFixed(2));
}