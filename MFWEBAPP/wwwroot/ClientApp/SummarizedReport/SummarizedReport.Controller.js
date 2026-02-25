

var _summarizedReport = {

    ReportNameFillLoadCompleted: function (response) {

       // console.log(response.data.reportDetailsList);

        if (response.status === "SUCCESS") {


            if (response.data.reportDetailsList.length > 0) {

                jQuery("#ddlRptName").empty();
                jQuery("#ddlRptName").append(jQuery("<option></option>").val("0").text(" -------- Choose Report Name ------"));
                jQuery.each(response.data.reportDetailsList, function (i, val) {
                    jQuery("#ddlRptName").append(jQuery("<option></option>").val(val.reportId).text(val.reportName));
                });
            }
            else {
                jQuery("#ddlRptName").empty();
                jQuery("#ddlRptName").append(jQuery("<option></option>").val("0").text(" -------- Choose Report Name ------"));
            }

        }
        else {

            jQuery("#ddlRptName").empty();
            jQuery("#ddlRptName").append(jQuery("<option></option>").val("0").text(" -------- Choose Report Name ------"));
        }

    },
    
    SummReportTableFillCompleted: function (response) {

        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {


            if (response.data.resulset.length > 0) {
                var headersData = response.data.header;
                var headers = headersData.split("||");
               // console.log(headers);
                jQuery('#divsummarizedreport').empty();
                var slno = "slno"
                var $table = jQuery('<table class="table" id="tblsummdetails"  >');
                var $thead = jQuery('<thead id="sumTableHead">')
                var $row1 = jQuery('<tr/>');
                $row1.append(jQuery('<th align="center">').html(slno));
                jQuery.each(headers, function (i, val) {
                    $row1.append(jQuery('<th align="center">').html(val));
                    $thead.append($row1);
                });
                $thead.append('</thead>');
                $table.append($thead);
                var $tbody = jQuery('<tbody id="tblUserList">');
                              
                jQuery.each(response.data.resulset, function (i, val) {
                    var rowsData = val.resultset;                     
                    var dataBinder = rowsData.split("||");
                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i + 1));
                    jQuery.each(dataBinder, function (i, val) {

                        $row.append(jQuery('<td align="left">').html(val));
                        $tbody.append($row);
                    });
                    dataBinder = "";
                    dataset = "";
                });
                
                $tbody.append('</tbody>');
                $table.append($tbody);
                

                //$table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:left;">Name<th style="text-align:left;">User Type</th><th style="text-align:left;">Access Level</th>><th style="text-align:center;">Status</th><th style="text-align:center;">Edit</th></tr></thead>');
                //var $tbody = jQuery('<tbody id="tblUserList">');
                //jQuery.each(response.data.branchUsersListData, function (i, val) {

                //    branchUsersListData = response['data']['branchUsersListData'];
                //    var $row = jQuery('<tr/>');

                //    $row.append(jQuery('<td align="center">').html(i + 1));
                //    $row.append(jQuery('<td align="left">').html(val.userName));
                //    $row.append(jQuery('<td align="left">').html(val.userType));
                //    $row.append(jQuery('<td align="left">').html(val.branchName));
                //    if (val.statusId == 1) {
                //        $row.append(jQuery('<td align="center">').html('<label class="switch"> <input type="checkbox" onchange="_userDetails.toggleChecks(' + val.userId + ');" checked> <span class="slider round"></span> </label>'));
                //    }
                //    else {
                //        $row.append(jQuery('<td align="center">').html('<label class="switch" > <input type="checkbox" onchange="_userDetails.toggleChecks(' + val.userId + ');"  id="status' + i + '" name="status' + i + '" > <span class="slider round"></span> </label>'));
                //    }

                //    $row.append(jQuery('<td align="center">').html('<button type="button" data-target="#mediumModal" data-toggle="modal" onClick="_userDetails.Edit(' + val.userId + ');" class="btnsmall btn-danger fc-center"> <i class="fa fa-pencil"></i></button> '));

                //    $tbody.append($row);
                //});
                //$tbody.append('</tbody>');
                //$table.append($tbody);
                $table.append('</table>');
                jQuery('#divSummaryRptTable').html($table);
                jQuery('#tblsummdetails').DataTable({
                    "aLengthMenu": [[8, 10, 25, 50, 75, -1], [8, 10, 25, 50, 75, "All"]],
                    "iDisplayLength": 8,
                });
                jQuery('#tblsummdetails_wrapper').removeClass('form-inline');


            } else {
                jQuery('#divSummaryRptTable').hide();
                jQuery('#divSummaryRptTable').empty();
            }
        } else {
            _General.noData(jQuery('#divSummaryRptTable'), "No Data Found");
            jQuery('#divSummaryRptTable').attr('align','center')
        }
    },
    ReportNameFill: function () {

        _http.get(MFPUBLICCUSTOMERAPI_URL + "reports/reportdetails", _summarizedReport.ReportNameFillLoadCompleted, userdata.token)
    },

    SummReportTableFill: function () {
        var fromDate = jQuery("#dtFromDate").val();
        var ReportId = jQuery("#ddlRptName").val();
        var toDate = jQuery("#dtToDate").val();
       
        var SummReportTableFillData = {           
          
         "reportId": ReportId,
         "type": "L",
         "param1": "0",
         "param2": fromDate,
         "param3": toDate,
         "param4": "",
         "param5": "",
         "param6": fromDate,
         "param7": toDate,
         "firmId": 0,
         "productId": 0
        
        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "reports/generatereport", SummReportTableFillData, _summarizedReport.SummReportTableFillCompleted, userdata.token)
    },
};



_summarizedReport.ReportNameFill();

jQuery(document).ready(function ($) {

    jQuery('#maincard').show();
    jQuery('.error').addClass("error-msg");
    jQuery('#bs_datepicker_container1 input').datepicker({
        autoclose: true,
        format: "mm/dd/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        minDate: new Date(),
        container: '#bs_datepicker_container1'
    });
    jQuery('#bs_datepicker_container2 input').datepicker({
        autoclose: true,
        format: "mm/dd/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        minDate: new Date(),
        container: '#bs_datepicker_container2'
    });

    jQuery("#dtToDate").change(function (e) {
        

       
    });

    jQuery("#exprtBtn").click(function () {
        debugger;
        jQuery("#tblsummdetails").table2excel({
          
    // exclude CSS class

    exclude: ".noExl",
            
    name: "Worksheet Name",
            
    filename: "SomeFile",//do not include extension
            
    fileext: ".xls" // file extension

        });


    });
});


//function stringfy(resps) {
//   
//    var a = resps.resultset;
//    var spiltter = a.split("||");
//    return spiltter;
//}