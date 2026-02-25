var writeOffList = {
    "loanId": "string",
    "balanceAmount": 0
};
var writeOffDtlsData = new Array();
var writeOffDtlData = new Array();
var wodtl = [];
var _writeOffSystem = {
    WriteOffSystemTableFillCompleted: function (response) {
        
        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {
         

            if (response.data.writeOffDetails.length > 0) {
                jQuery("#updtBtn").prop("disabled", false);

                writeOffDtlsData = [];
                jQuery('#divwritesystemoff').empty();

                var $table = jQuery('<table class="table " id="tblWriteOffSystem" >');

                $table.append('<thead ><tr><th style="text-align:center;">#</th><th style="text-align:center;">Loan Number</th><th style="text-align:left;">Member Name</th><th style="text-align:right;">Amount Paid</th><th style="text-align:right;">Balance Amount</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.writeOffDetails, function (i, val) {
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
                jQuery('#divwritesystemoff').html($table);
            } else {
                jQuery('#divwritesystemoff').hide();
                jQuery('#divwritesystemoff').empty();
            }
        } else {

            _General.noData(jQuery('#divwritesystemoff'), "No Data Found");
            jQuery("#updtBtn").prop("disabled", true);
        }
    },

    WriteOffUpdateCompleted: function (response) {
        
        if (response.status === "SUCCESS") {
            

            swal(response.data.message, "", "success");
        }
        else {
            swal(response.data.message, "", "error");
        }
        _writeOffSystem.WriteOffSystemTableFill();
        jQuery("#wosystemDate").val("");
    },

    WriteOffSystemTableFill: function () {
      

        writeOffDate = jQuery("#wosystemDate").val();
        var accesslevelId = userdata.accessLevelId;
        var userid = userdata.userId;

        var WriteOffTableFillData = {

            "date": writeOffDate,
            "statusId": 2, //hardcoded as 2 for write off data
            "accesslevelId": accesslevelId,
            "userId": userid
        };

        _http.post(MFPUBLICLMSAPI_URL + "api/loans/writeoffdetails", WriteOffTableFillData, _writeOffSystem.WriteOffSystemTableFillCompleted, userdata.token)
    },

    WriteOffUpdate: function () {
       
        for (i = 0; i < writeOffDtlsData.length; i++) {
            writeOffList.loanId = writeOffDtlsData[i];
            writeOffList.balanceAmount = writeOffDtlData[i];
            wodtl.push(writeOffList);
            writeOffList = {};
        }
        var userId = userdata.userId;
        var WriteOffUpdateData = {

            "writeOffDetails": wodtl,
            "userId": userId,
            "statusId": 3 //hardcoded as 3  for update write off data
        };

        _http.post(MFPUBLICLMSAPI_URL + "api/loans/writeoff", WriteOffUpdateData, _writeOffSystem.WriteOffUpdateCompleted, userdata.token)
    }

}




jQuery(document).ready(function ($) {
   
    jQuery('#maincard').hide();
    jQuery('.error').addClass("error-msg");
   
    jQuery('#bs_datepicker_container1 input').datepicker({
       
        autoclose: true,
        format: "dd-M-yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        minDate: new Date(),
        container: '#bs_datepicker_container1'
        //onSelect: function () {
        
        //   jQuery('#frmWriteSystemOff ').validate().element(this);
        //}
    });


    jQuery("#wosystemDate").change(function (e) {
       
        _writeOffSystem.WriteOffSystemTableFill();
    });

    

});

