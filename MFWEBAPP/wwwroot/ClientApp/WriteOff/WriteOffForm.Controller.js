var writeOffList = {
    "loanId": "string",
    "balanceAmount": 0
};
var writeOffDtlsData = new Array();
var writeOffDtlData = new Array();
var wodtl = [];
var _writeOffForm = {
WriteOffTableFillCompleted: function (response) {
        
        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {
           
         
            if (response.data.writeOffDetails.length > 0) {
                writeOffDtlsData = [];
                jQuery('#divwriteoff').empty();

                var $table = jQuery('<table class="table " id="tblWriteOff" >');

                $table.append('<thead ><tr><th style="text-align:center;">#</th><th style="text-align:center;">Loan Number</th><th style="text-align:left;">Member Name</th><th style="text-align:right;">Amount Paid</th><th style="text-align:right;">Balance Amount</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.writeOffDetails, function (i, val) {
                    jQuery("#svBtn").prop("disabled", false);

                    writeOffDtlsData.push(val.loanId);
                    writeOffDtlData.push(val.balanceAmount);
                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="center">').html(val.loanId));
                    $row.append(jQuery('<td align="left">').html(val.memberName));
                    $row.append(jQuery('<td align="right">').html(val.amountPaid));
                    $row.append(jQuery('<td align="right">').html(val.balanceAmount));
                
                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divwriteoff').html($table);
            } else {
                jQuery('#divwriteoff').hide();
                jQuery('#divwriteoff').empty();
            }
        } else {

            _General.noData(jQuery('#divwriteoff'), "No Data Found");
            jQuery("#svBtn").prop("disabled", true);

        }
    },

WriteOffSaveCompleted: function (response) {
        
        if (response.status === "SUCCESS") {
          

            swal(response.data.message, "", "success");
        }
        else {
            swal(response.data.message, "", "error");
        }
        _writeOffForm.WriteOffTableFill();
        jQuery("#woDate").val("");
    },

WriteOffTableFill: function () {
        

    writeOffDate = jQuery("#woDate").val();
      
    var accesslevelId = userdata.accessLevelId;
    var userid = userdata.userId;

      var WriteOffTableFillData = {

          "date": writeOffDate,
          "statusId": 1, //hardcoded as 1 for write off data
          "accesslevelId": accesslevelId,
          "userId": userid
        };

      _http.post(MFPUBLICLMSAPI_URL + "api/loans/writeoffdetails", WriteOffTableFillData, _writeOffForm.WriteOffTableFillCompleted, userdata.token)
    },

 WriteOffSave: function () {
        
        for (i = 0; i < writeOffDtlsData.length; i++) {
            writeOffList.loanId = writeOffDtlsData[i];
            writeOffList.balanceAmount = writeOffDtlData[i];
            wodtl.push(writeOffList);
            writeOffList = {};
        }
        var userId = userdata.userId;
        var WriteOffSaveData = {

            "writeOffDetails": wodtl ,
            "userId": userId,
            "statusId": 2 //hardcoded as 2  for save write off data
        };

        _http.post(MFPUBLICLMSAPI_URL + "api/loans/writeoff", WriteOffSaveData, _writeOffForm.WriteOffSaveCompleted, userdata.token)
    }
    
};


jQuery(document).ready(function ($) {
    
    jQuery('#maincard').hide();
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

    jQuery("#woDate").change(function (e) {
     
        _writeOffForm.WriteOffTableFill();
    });

});