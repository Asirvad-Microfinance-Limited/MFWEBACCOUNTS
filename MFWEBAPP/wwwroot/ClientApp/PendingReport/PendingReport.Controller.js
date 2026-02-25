var BranchIDPendingReport = {
    "branchid": 0,
    "clickstatus": 0,
    "stageid": 0
}
var mgrt = 0;
var cgts = 0;
var grt = 0;
var mtl = 0;
var disburse = 0;
var rowvisetotal = 0;
var rowvisesubtotal = 0;

var PendingReport = {

    showReportCompleted: function (response) {

       
        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {
           
            if (response.data.pendingReportData.length > 0) {
               
                jQuery('#divpendingreport').empty();
                var $table = jQuery('<table class="table" id="tblpendingreport">');

                $table.append('<thead><tr><th style="text-align:center;">#</th><th style="text-align:center;">Branch ID</th><th style="text-align:center;">CGT</th><th style="text-align:center;">Mini GRT</th><th style="text-align:center;">GRT</th><th style="text-align:center;">MTL</th><th style="text-align:center;">Disbursement</th><th style="text-align:center;">Total</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.pendingReportData, function (i, val) {

                    slno = i + 1;
                    cgts = cgts + val.cgt;
                    mgrt = mgrt + val.minigrt;
                    grt = grt + val.grt;
                    mtl = mtl + val.specialmeeting;
                    disburse = disburse + val.disbursement;
                    rowvisetotal = 0;
                    rowvisetotal = val.cgt + val.minigrt + val.grt + val.specialmeeting + val.disbursement;
                    rowvisesubtotal = rowvisesubtotal + rowvisetotal;
                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="center" style="color:blue;cursor: pointer;" onclick="PendingReport.GoToBranchReport(' + 0 + ',' + 0 + ',' + val.branch_id +');">').html(val.branch_name));
                    $row.append(jQuery('<td align="center" style="color:blue;cursor: pointer;" onclick="PendingReport.GoToBranchReport(' + 1 + ',' + 1 + ',' + val.branch_id +');">').html(val.cgt));
                    $row.append(jQuery('<td align="center" style="color:blue;cursor: pointer;" onclick="PendingReport.GoToBranchReport(' + 2 + ',' + 2 + ',' + val.branch_id +');">').html(val.minigrt));
                    $row.append(jQuery('<td align="center" style="color:blue;cursor: pointer;" onclick="PendingReport.GoToBranchReport(' + 3 + ',' + 3 + ',' + val.branch_id +');">').html(val.grt));
                    $row.append(jQuery('<td align="center" style="color:blue;cursor: pointer;" onclick="PendingReport.GoToBranchReport(' + 4 + ',' + 4 + ',' + val.branch_id +');">').html(val.specialmeeting));
                    $row.append(jQuery('<td align="center" style="color:blue;cursor: pointer;" onclick="PendingReport.GoToBranchReport(' + 9 + ',' + 9 + ',' + val.branch_id +');">').html(val.disbursement)); 
                    $row.append(jQuery('<td align="center" style="color:blue;cursor: pointer;" onclick="PendingReport.GoToBranchReport(' + 9 + ',' + 9 + ',' + val.branch_id + ');">').html(rowvisetotal)); 
                    $tbody.append($row);
                });
                var $row1 = jQuery('<tr style="background:#eaacac;">');
                $row1.append(jQuery('<td align="center">').html(''));
                $row1.append(jQuery('<td  align="center">').html('Total'));
                $row1.append(jQuery('<td align="center">').html(cgts));
                $row1.append(jQuery('<td align="center">').html(mgrt));
                $row1.append(jQuery('<td align="center">').html(grt));
                $row1.append(jQuery('<td align="center">').html(mtl));
                $row1.append(jQuery('<td align="center">').html(disburse));
                $row1.append(jQuery('<td align="center">').html(rowvisesubtotal));

                $tbody.append($row1);


                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divpendingreport').html($table);



            } else {
                jQuery('#divpendingreport').hide();
                jQuery('#divpendingreport').empty();
            }
        } else {
            _General.noData(jQuery('#divpendingreport'), "No Data Found");
        }


    },

    showReport: function () {
        

        var showReportData = {

            "userId": userdata.userId

        };

        _http.post(MFPUBLICLOSAPI_URL + "api/reporst/pendingreport", showReportData, PendingReport.showReportCompleted, userdata.token)
    },

    GoToBranchReport: function (id,status,branchID) {
        
        if (status == 0) {
            BranchIDPendingReport.branchid = branchID
            BranchIDPendingReport.clickstatus = status;
            BranchIDPendingReport.stageid = id;
        }
        else {
            BranchIDPendingReport.branchid = branchID;
            BranchIDPendingReport.clickstatus = status;
            BranchIDPendingReport.stageid = id;
        }
       
        
        //localStorage.setItem('BranchIDPendingReport', BranchIDPendingReportarr);
        localStorage.setItem('BranchIDPendingReport', CryptoJS.AES.encrypt(JSON.stringify(BranchIDPendingReport), encryptkey));
        window.location.href = DOMAIN_URL + "pendingreportbranch";
       
    }

}

PendingReport.showReport();

jQuery(document).ready(function ($) {

    jQuery('#maincard').hide();

});