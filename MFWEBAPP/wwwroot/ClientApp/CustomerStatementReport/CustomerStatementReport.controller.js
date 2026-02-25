var CustomerStatementReport = {

    CustStntcombofillLoadCompleated: function (response) {
       
        if (response.status === "SUCCESS") {


            if (response.data.customerStatementResult.length > 0) {

                jQuery("#ddlAccntName").empty();
                jQuery("#ddlAccntName").append(jQuery("<option></option>").val("0").text(" -------- Choose Acccount Name ------"));
                jQuery.each(response.data.customerStatementResult, function (i, val) {
                    var custnamedata = val.value.split('||');
                    jQuery("#ddlAccntName").append(jQuery("<option></option>").val(custnamedata[0]).text(custnamedata[1]));
                });
            }
            else {
                jQuery("#ddlAccntName").empty();
                jQuery("#ddlAccntName").append(jQuery("<option></option>").val("0").text(" -------- Choose Acccount Name ------"));
            }

        }
        else {

            jQuery("#ddlAccntName").empty();
            jQuery("#ddlAccntName").append(jQuery("<option></option>").val("0").text(" -------- Choose Acccount Name ------"));
        }
    },
    CustStntTablefillLoadCompleated: function (response) {


        jQuery('#maincard').show();
        
        if (response.status === "SUCCESS") {


            if (response.data.customerStatementResult.length > 0) {

                
                jQuery('#divcstSmtRptDetailsTable').empty();

                var $table = jQuery('<table class="table" id="tbluserdetails"  >');
                $table.append('<thead><tr><th style="text-align:center;">Customer ID</th><th style="text-align:center;">Name</th><th style="text-align:center;">Loan Date</th><th style="text-align:center;">Tenure</th>><th style="text-align:center;">Intrest Rate</th><th style="text-align:center;">Cycle</th><th style="text-align:center;">Center</th></tr></thead>');
                var $tbody = jQuery('<tbody id="tblUserList">');
                jQuery.each(response.data.customerStatementResult, function (i, val) {

                    var Customerinfo = val.value.split('||');
                    var $row = jQuery('<tr/>');
                    
                    $row.append(jQuery('<td align="center">').html(Customerinfo[0]));
                    $row.append(jQuery('<td align="center">').html(Customerinfo[1]));
                    $row.append(jQuery('<td align="center">').html(Customerinfo[2]));
                    $row.append(jQuery('<td align="center">').html(Customerinfo[3]));
                    $row.append(jQuery('<td align="center">').html(Customerinfo[4]));
                    $row.append(jQuery('<td align="center">').html(Customerinfo[5]));
                    $row.append(jQuery('<td align="center">').html(Customerinfo[6]));
                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divcstSmtRptDetailsTable').html($table);
                //jQuery('#tbluserdetails').DataTable({
                //    "aLengthMenu": [[8, 10, 25, 50, 75, -1], [8, 10, 25, 50, 75, "All"]],
                //    "iDisplayLength": 8,
                    
                //});
                //jQuery('#tbluserdetails_wrapper').removeClass('form-inline');


            } else {
                jQuery('#divcstSmtRptDetailsTable').hide();
                jQuery('#divcstSmtRptDetailsTable').empty();
            }
        } else {
            _General.noData(jQuery('#divcstSmtRptDetailsTable'), "No Data Found");
        }
        CustomerStatementReport.CustStntDAtaTablefill();
    },
    CustStntDAtaTablefillLoadCompleated: function (response) {


        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {


            if (response.data.customerStatementResult.length > 0) {


                jQuery('#divcstSmtRptTable').empty();

                var $table = jQuery('<table class="table" id="tbluserdatadetails"  >');
                $table.append('<thead><tr><th style="text-align:center;">#</th><th style="text-align:center;">Date</th><th style="text-align:left;">Description</th><th style="text-align:right;">Debit</th><th style="text-align:right;">Credit</th>><th style="text-align:right;">Balance</th></tr></thead>');
                var $tbody = jQuery('<tbody id="tblUserList">');
                jQuery.each(response.data.customerStatementResult, function (i, val) {

                    var Customerinfodata = val.value.split('||');
                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i+1));
                    $row.append(jQuery('<td align="center">').html(Customerinfodata[0]));                   
                    $row.append(jQuery('<td align="left">').html(Customerinfodata[1]));
                    $row.append(jQuery('<td align="right">').html(Customerinfodata[2]));
                    $row.append(jQuery('<td align="right">').html(Customerinfodata[3]));
                    $row.append(jQuery('<td align="right">').html(Customerinfodata[4]));
                  
                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divcstSmtRptTable').html($table);
                jQuery('#tbluserdatadetails').DataTable({
                    "aLengthMenu": [[8, 10, 25, 50, 75, -1], [8, 10, 25, 50, 75, "All"]],
                    "iDisplayLength": 8,

                });
                jQuery('#tbluserdatadetails_wrapper').removeClass('form-inline');


            } else {
                jQuery('#divcstSmtRptTable').hide();
                jQuery('#divcstSmtRptTable').empty();
            }
        } else {
            _General.noData(jQuery('#divcstSmtRptTable'), "No Data Found");
        }
    },
    CustStntcombofill: function () {
      
        var CustStntcombofillData = {

            "typeId": 1,
            "parameters": ""


        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "reports/customerstatement", CustStntcombofillData, CustomerStatementReport.CustStntcombofillLoadCompleated, userdata.token)
    },
    CustStntTablefill: function () {
   
        var CustStntcombofillData = {

            "typeId": 2,
            "parameters": jQuery('#txtLoanId').val().toString()


        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "reports/customerstatement", CustStntcombofillData, CustomerStatementReport.CustStntTablefillLoadCompleated, userdata.token)
    },
    CustStntDAtaTablefill: function () {
    
        var CustStntDAtaTablefillData = {

            "typeId": 3,
            "parameters": jQuery('#txtLoanId').val().toString() + '^' + jQuery('#ddlAccntName').val().toString() + '^' + jQuery('#dtFromDate').val().toString() + '^' + jQuery('#dtToDate').val().toString()

        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "reports/customerstatement", CustStntDAtaTablefillData, CustomerStatementReport.CustStntDAtaTablefillLoadCompleated, userdata.token)
    }

}

CustomerStatementReport.CustStntcombofill();

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

    

});