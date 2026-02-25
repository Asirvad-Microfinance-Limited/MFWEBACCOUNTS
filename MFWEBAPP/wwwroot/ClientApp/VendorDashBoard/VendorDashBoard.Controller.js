var _VendorDasboard = {
    fillVendorDashboardTableLoadCompleted: function (response) {
       
  jQuery('#maincard').show();
        if (response.status === "SUCCESS") {
            if (response.data.vendorDetails.length > 0) {
                
                jQuery('#VendorListTable').empty();
                var $table = jQuery('<table class="table basic-table" id="tblVendorList">');

                $table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:left;">State Name</th><th style="text-align:left;">Branch Name</th><th style="text-align:left;">Center Name</th><th style="text-align:left;">Address</th><th style="text-align:center;">Mobile</th><th style="text-align:center;">Despatch</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.vendorDetails, function (i, val) {
                   
                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="left">').html(val.stateName));
                    $row.append(jQuery('<td align="left">').html(val.branchName));
                    $row.append(jQuery('<td align="left">').html(val.centerName));
                    $row.append(jQuery('<td align="left">').html(val.address));
                    $row.append(jQuery('<td align="center">').html(val.mobile));
                   // $row.append(jQuery('<td align="center">').html('<input type="button" class="btnsmall btn-danger fc-center" onClick="_VendorDasboard.dispatchIntend(' + val.indentId + ');" id="btnDispatch" name="btnDispatch" value="Go"/>'));<i class="fas fa-arrow-right"></i>
                    $row.append(jQuery('<td align="center">').html('<button type="button" class="btnsmall btn-danger fc-center"  onClick="_VendorDasboard.dispatchIntend(' + val.indentId + ');" id="btnDispatch" name="btnDispatch"> <i class="fa fa-arrow-right" style="font-size:15px;"></i></button> ')); 

                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#VendorListTable').html($table);
            } else {
                jQuery('#VendorListTable').hide();
                jQuery('#VendorListTable').empty();
            }
        } else {
            //_loanApplication.noData($('#policyReportDiv'), "No Policy Found");
        }
    },
    

    fillVendorDashboardTable: function () {
        
        var vendorId = userdata.userId;// login vendorid

        var fillVendorDashboardTableData = {

            "vendorId": vendorId
        }
       
        _http.post(MFPUBLICLOSAPI_URL + "api/products/vendordashboarddetails", fillVendorDashboardTableData, _VendorDasboard.fillVendorDashboardTableLoadCompleted, userdata.token)

    },

     dispatchIntend : async function (vals) {
         var intentId = vals;
       
         localStorage.setItem('IntentId', intentId);
         window.location.href = DOMAIN_URL + "despatchintend";
       
       
    }

}

_VendorDasboard.fillVendorDashboardTable();

jQuery(document).ready(function ($) {

     jQuery('.error').addClass("error-msg");
    jQuery('#maincard').hide();
    

   

});