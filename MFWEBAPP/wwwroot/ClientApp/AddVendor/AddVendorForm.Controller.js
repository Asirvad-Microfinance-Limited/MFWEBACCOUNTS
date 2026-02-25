var branchId = userdata.branchId;

var _addVendor = {

    Edit: function (vendorId) {


        localStorage.setItem('vendorIdForEdit', vendorId);
        window.location.href = DOMAIN_URL + "addvendordetails"
     
    },

    BindVendorTableLoadCompleted: function (response) {
        
        jQuery('#maincard').show();
        //console.log(response.data.productVendorList);

      
        if (response.status === "SUCCESS") {
            if (response.data.productVendorList.length > 0) {
                
                jQuery('#divvendordetailstable').empty();
                var $table = jQuery('<table class="table" id="tblAddVendor">');
               // $table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:center;">Vendor Id</th><th style="text-align:center;">Vendor Name</th><th style="text-align:center;">Mobile</th></th style="text-align:center;"><th style="text-align:center;">Pincode</th><th style="text-align:center;">District</th><th style="text-align:center;">Address</th><th style="text-align:center;">Edit</th></tr></thead>');

                $table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:center;">Vendor Id</th><th style="text-align:left;">Vendor Name</th><th style="text-align:left;">District</th><th style="text-align:left;">Address</th><th style="text-align:center;">Pincode</th><th style="text-align:center;">Edit</th></tr ></thead > ');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.productVendorList, function (i, val) {
                  
                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="center">').html(val.vendorId));
                    $row.append(jQuery('<td align="left">').html(val.vendorName));
                    $row.append(jQuery('<td align="left">').html(val.districtName));
                    $row.append(jQuery('<td align="left">').html(val.address));
                    $row.append(jQuery('<td align="center">').html(val.pinCode));
                    $row.append(jQuery('<td align="center">').html('<button type="button" onClick="_addVendor.Edit(' + val.vendorId +')" class="btnsmall btn-danger fc-center"> <i class="fa fa-pencil"></i></button> '));                  
                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divvendordetailstable').html($table);
                jQuery('#tblAddVendor').DataTable({
                    "aLengthMenu": [[8, 10, 25, 50, 75, -1], [8, 10, 25, 50, 75, "All"]],
                    "iDisplayLength": 8,
                  
                });
            } else {
                jQuery('#divvendordetailstable').hide();
                jQuery('#divvendordetailstable').empty();
            }
        } else {
            _General.noData(jQuery('#divvendordetailstable'), "No Data Found");
        }
    },

    vendorTableFill: function () {

       

        var vendorTableFillData = {

            "branchId": -1//hardcoded as -1 to display branch  ho  only


        };


        _http.post(MFPUBLICLOSAPI_URL + "api/products/productvendorlist", vendorTableFillData, _addVendor.BindVendorTableLoadCompleted, userdata.token)

    }
}

_addVendor.vendorTableFill();

jQuery(document).ready(function ($) {
   
    jQuery('#maincard').hide();

});
