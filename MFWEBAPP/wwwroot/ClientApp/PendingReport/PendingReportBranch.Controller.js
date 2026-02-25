
var totMemberCount=0;

var PendingReportBranch = {

    showBranchReportCompleted: function (response) {

        
        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {
            
            if (response.data.branchWisePendingReport.length > 0) {
              

                jQuery('#divpendingreportbranch').empty();
                var $table = jQuery('<table class="table" id="tblpendingbranchreport">');

                $table.append('<thead><tr><th style="text-align:center;">#</th><th style="text-align:left;">Center</th><th style="text-align:center;">Application ID</th><th style="text-align:Center;">Stage</th><th style="text-align:center;">Member Count</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.branchWisePendingReport, function (i, val) {

                    totMemberCount = totMemberCount + parseInt(val.memberCount);
                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="left" style="color:blue;cursor: pointer;" onclick="PendingReportBranch.goToCenterwiseReport(' + val.centerId +');">').html(val.centerName));
                    $row.append(jQuery('<td align="center">').html(val.applicationId));
                    $row.append(jQuery('<td align="center">').html(val.stageName));
                    $row.append(jQuery('<td align="center">').html(val.memberCount));                  
                    $tbody.append($row);
                });
                var $row2 = jQuery('<tr style="background:#eaacac;">');
                $row2.append(jQuery('<td align="center">').html(''));
                $row2.append(jQuery('<td  align="left">').html('Total'));
                $row2.append(jQuery('<td align="center">').html(''));
                $row2.append(jQuery('<td align="center">').html(''));
                $row2.append(jQuery('<td align="center">').html(totMemberCount));
                $tbody.append($row2);
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divpendingreportbranch').html($table);



            } else {
                jQuery('#divpendingreportbranch').hide();
                jQuery('#divpendingreportbranch').empty();
            }
        } else {
            _General.noData(jQuery('#divpendingreportbranch'), "No Data Found");
        }


    },
    showStageReportCompleted: function (response) {

       
        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {
           
            if (response.data.stageWisePendingReport.length > 0) {
               

                jQuery('#divpendingreportbranch').empty();
                var $table = jQuery('<table class="table" id="tblpendingbranchreport">');

                $table.append('<thead><tr><th style="text-align:center;">#</th><th style="text-align:left;">Center</th><th style="text-align:center;">Application ID</th><th style="text-align:center;">Stage</th><th style="text-align:center;">Member Count</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.stageWisePendingReport, function (i, val) {


                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i + 1));

                    $row.append(jQuery('<td align="left" >').html(val.centerName));
                    $row.append(jQuery('<td align="center">').html(val.applicationId));
                    $row.append(jQuery('<td align="center">').html(val.stageName));
                    $row.append(jQuery('<td align="center">').html(val.memberCount));
                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divpendingreportbranch').html($table);



            } else {
                jQuery('#divpendingreportbranch').hide();
                jQuery('#divpendingreportbranch').empty();
            }
        } else {
            _General.noData(jQuery('#divpendingreportbranch'), "No Data Found");
        }


    },

    showBranchReport: function () {
       
        var reqData;
        var branchId;
        var statusId;
        if (localStorage.getItem('BranchIDPendingReport')!= null) {
            
            reqData = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("BranchIDPendingReport"), encryptkey).toString(CryptoJS.enc.Utf8));

        }
        statusId = reqData.stageid;
        branchId = reqData.branchid;
        if (statusId == 0) {
           
            var showBranchwiseReportData = {

                "branchId": branchId,
                "userId": userdata.userId
            };

            _http.post(MFPUBLICLOSAPI_URL + "api/reporst/branchwisependingreport", showBranchwiseReportData, PendingReportBranch.showBranchReportCompleted, userdata.token)
        }
        else {

            var showStagewiseReportData = {

                "branchId": branchId,
                "userId": userdata.userId,
                "stageId": statusId
            };

            _http.post(MFPUBLICLOSAPI_URL + "api/reporst/stagewisependingreport", showStagewiseReportData, PendingReportBranch.showStageReportCompleted, userdata.token)


        }
        
    },

    goToCenterwiseReport: function (CenterID) {

        localStorage.setItem('BranchIDCenterReport', CryptoJS.AES.encrypt(JSON.stringify(CenterID), encryptkey));
        window.location.href = DOMAIN_URL + "pendingreportcenterwise";

    }

}

PendingReportBranch.showBranchReport();

jQuery(document).ready(function ($) {

    jQuery('#maincard').hide();

});