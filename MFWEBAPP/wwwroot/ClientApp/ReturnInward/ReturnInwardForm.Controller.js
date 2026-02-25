var memberCheckedCount = new Array();
var checkStatus = "";
var statusval;
var MemberData = new Array();
var membersList = {
    "memberId": "string",
};
var mbrdtl = [];
var productMemberList;
var _returnInward = {

    
    IndentFillLoadCompleted: function (response) {
        
        if (response.status === "SUCCESS") {

           
            if (response.data.productIndentList.length > 0) {
                jQuery("#ddlIntend").empty();
                jQuery("#ddlIntend").append(jQuery("<option></option>").val("0").text(" ---------- Choose Center ---------- "));
                jQuery.each(response.data.productIndentList, function (i, val) {
                    jQuery("#ddlIntend").append(jQuery("<option></option>").val(val.indentId).text(val.centerName));
                });
            }
            else {
                jQuery("#ddlIntend").empty();
                jQuery("#ddlIntend").append(jQuery("<option></option>").val("0").text(" ---------- Choose Center ---------- "));
            }

        }
        else {
           
            jQuery("#ddlIntend").empty();
            jQuery("#ddlIntend").append(jQuery("<option></option>").val("0").text(" ---------- Choose Center ---------- "));
        }

    },

    BindPrdtMembersLoadCompleted: function (response) {
     
        jQuery('#maincard').show();
  



        if (response.status === "SUCCESS") {
           
            if (response.data.productMemberList.length > 0) {
                MemberData = [];
                jQuery('#divreturninward').empty();
                var $table = jQuery('<table class="table" id="tblApproveIndent">');

                $table.append
                    ('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:center;">Member ID</th><th style="text-align:left;">Member Name</th><th style="text-align:center;">Product ID</th><th style="text-align:left;">Product Name</th><th style="text-align:right;">Price</th><th style="text-align:center;">Select</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.productMemberList, function (i, val) {
                    MemberData.push(val.memberId);
                    var $row = jQuery('<tr/>');

                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="center">').html(val.memberId));
                    $row.append(jQuery('<td align="left">').html(val.memberName));
                    $row.append(jQuery('<td align="center">').html(val.productID));
                    $row.append(jQuery('<td align="left">').html(val.product));
                    $row.append(jQuery('<td align="right">').html(val.productPrice));
                    $row.append(jQuery('<td align="center">').html('<input type="checkbox" id="prdtcheck" name="prdtcheck" />'));


                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divreturninward').html($table);



            } else {
                jQuery('#divreturninward').hide();
                jQuery('#divreturninward').empty();
            }
        } else {
            _General.noData(jQuery('#divreturninward'), "No Data Found");
        }
    },

    ReturnInwardLoadCompleted: async function (response) {
        if (response.status === "SUCCESS") {
          
            swal(response.data.message, "", "success");
        }
        else {
            swal(response.data.message, "", "error");

        }
        jQuery('#divreturninward').empty();
        jQuery("#ddlIntend").empty();
        jQuery("#ddlIntend").append(jQuery("<option></option>").val("0").text("-- Select --"));
        _returnInward.indentFill();
       
    },

    indentFill: async function () {

       
        var vendorId = userdata.userId;// login vendorid
        var branchId = userdata.branchId;
        var IndentFillData = {

            "typeId": 6,
            "accessLevelId": vendorId,// vendor id to be given
            "branchId": branchId


        };

        _http.post(MFPUBLICLOSAPI_URL + "api/products/productindentlist", IndentFillData, _returnInward.IndentFillLoadCompleted, userdata.token)

    },
    prdtMembersTableFill: async function () {
        
        var IndentId = parseInt(jQuery("#ddlIntend").val());

        var PrdtMembersTableFillData = {

            "indentId": IndentId,
            "typeId": 6//hardcoded for memberlist
        };

        _http.post(MFPUBLICLOSAPI_URL + "api/products/productmemberlist", PrdtMembersTableFillData, _returnInward.BindPrdtMembersLoadCompleted, userdata.token)

    },

    ReturnInwardAccept: function () {
        
       var IndentId = parseInt(jQuery('#ddlIntend').val());
        var userId = userdata.userId;
        memberCheckedCount = [];
        jQuery.each(jQuery("input[name='prdtcheck']:checked"), function () {
            memberCheckedCount.push(jQuery(this).val());
        });

        if (memberCheckedCount.length > 0) {
            for (i = 0; i < MemberData.length; i++) {

                checkStatus = memberCheckedCount[i];
                membersList.memberId = MemberData[i];
                if (checkStatus == "on") {
                    membersList.flag = 1;

                }
                else {

                    membersList.flag = 0;

                }
                mbrdtl.push(membersList);
                membersList = {};
            }
            var lengthcount = memberCheckedCount.length;
            var ReturnInwardData = {
               
                "indentId": IndentId,
                "totalDeliverd": lengthcount,
                "userId": userId,
                "productVendorList": mbrdtl
            };

            _http.post(MFPUBLICLOSAPI_URL + "api/products/productindentreturninward", ReturnInwardData, _returnInward.ReturnInwardLoadCompleted, userdata.token)

        }
        else {

            swal("", "Select Atleast One Member", "warning")

        }



    }


}

_returnInward.indentFill();

jQuery(document).ready(function ($) {

   
    jQuery('.error').addClass("error-msg");
    jQuery('#maincard').hide();
   
    jQuery("#ddlIntend").change(function (e) {

        _returnInward.prdtMembersTableFill();

    });
   
});

