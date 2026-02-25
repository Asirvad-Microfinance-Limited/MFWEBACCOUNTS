var memberCheckedCount = new Array();
var checkStatus = "";
var statusval;
var MemberData = new Array();
var membersList = {
    "memberId": "",
    "flag": 0
};
var mbrdtl = [];
var productMemberList;
var IntendId;
var _despatchIntend = {

    IndentFillLoadCompleted: function (response) {
     
      //  console.log(response.data.productIndentList);
      
       

        if (response.status === "SUCCESS") {

         
            if (response.data.productIndentList.length > 0) {
                jQuery("#ddlIntend").empty();
                jQuery("#ddlIntend").append(jQuery("<option></option>").val("0").text(" -------- Choose Center -------- "));
                jQuery.each(response.data.productIndentList, function (i, val) {
                    jQuery("#ddlIntend").append(jQuery("<option></option>").val(val.indentId).text(val.centerName));
                });
            }
            else {
                jQuery("#ddlIntend").empty();
                jQuery("#ddlIntend").append(jQuery("<option></option>").val("0").text(" -------- Choose Center -------- "));
            }

        }
        else {
         
            jQuery("#ddlIntend").empty();
            jQuery("#ddlIntend").append(jQuery("<option></option>").val("0").text(" -------- Choose Center -------- "));
        }


        if (localStorage.getItem("IntentId") != null) {
           
            IntentId = localStorage.getItem("IntentId");
            jQuery("#ddlIntend").val(IntentId);
            _despatchIntend.prdtMembersTableFill();
            _despatchIntend.deliveryTypes();
        }

        else {
            localStorage.removeItem('IntentId');
        }

    },

    BindPrdtMembersLoadCompleted: function (response) {
       
        jQuery('#maincard').show();

       // console.log(response.data.productMemberList);

       
        if (response.status === "SUCCESS") {
          
            productDeliveryAddressData = response.data.productDeliveryAddressData.deliveryAddress;
            if (response.data.productDeliveryAddressData.statusId > 1) {
                jQuery('#deliveryAddress').val(productDeliveryAddressData);
            }
            else {
                jQuery('#deliveryAddress').val("");

            }

            if (response.data.productMemberList.length > 0) {
                MemberData = [];
                jQuery('#divdespatch').empty();
                var $table = jQuery('<table class="table" id="tbldespatch">');

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
                jQuery('#divdespatch').html($table);



            } else {
                jQuery('#divdespatch').hide();
                jQuery('#divdespatch').empty();
            }
        } else {
            _General.noData(jQuery('#divdespatch'), "No Data Found");

        }
    },

  DespatchAcceptLoadCompleted: async function (response) {
        if (response.status === "SUCCESS") {
           
            swal(response.data.message, "", "success");

        }
        else {
            swal(response.data.message, "", "error");
        }
        jQuery('#divdespatch').empty();
      _despatchIntend.indentFill();
      _despatchIntend.deliveryTypes();
        jQuery("#ddlIntend").empty();
      jQuery("#ddlIntend").append(jQuery("<option></option>").val("0").text(" -------- Choose Center -------- "));
      clearDespatchData();
    },
    DeliveryTypesLoadCompleted: function (response) {
   
       // console.log(response.data.deliveryTypesData);

        if (response.status === "SUCCESS") {

       
            if (response.data.deliveryTypesData.length > 0) {
                jQuery("#ddlDeliveryType").empty();
                jQuery("#ddlDeliveryType").append(jQuery("<option></option>").val("0").text(" -------- Choose Delivery Type -------- "));
                jQuery.each(response.data.deliveryTypesData, function (i, val) {
                    jQuery("#ddlDeliveryType").append(jQuery("<option></option>").val(val.typeId).text(val.typeName));
                });
            }
            else {
                jQuery("#ddlDeliveryType").empty();
                jQuery("#ddlDeliveryType").append(jQuery("<option></option>").val("0").text(" -------- Choose Delivery Type -------- "));
            }

        }
        else {
           
            jQuery("#ddlDeliveryType").empty();
            jQuery("#ddlDeliveryType").append(jQuery("<option></option>").val("0").text(" -------- Choose Delivery Type -------- "));
        }

    },



    indentFill: async function () {

       
        var vendorId = userdata.userId;// login vendorid
        var branchId = userdata.branchId;
        var IndentFillData = {

            "typeId": 2, //productindentlist
            "accessLevelId": vendorId,//vendorid is given as accesslevelid here
          //  "accessLevelId": 2,
            "branchId": branchId


        };

        _http.post(MFPUBLICLOSAPI_URL + "api/products/productindentlist", IndentFillData, _despatchIntend.IndentFillLoadCompleted, userdata.token)

    },
    prdtMembersTableFill: async function () {
       
        var IndentId = parseInt(jQuery("#ddlIntend").val());

        var PrdtMembersTableFillData = {

            "indentId": IndentId,
            "typeId": 2
        };

        _http.post(MFPUBLICLOSAPI_URL + "api/products/productmemberlist", PrdtMembersTableFillData, _despatchIntend.BindPrdtMembersLoadCompleted, userdata.token)

    },

    despatchAccept: async function () {

        var IndentId = parseInt(jQuery('#ddlIntend').val());
        var userId = userdata.userId;
        memberCheckedCount = [];
        membersList = {};
        mbrdtl = [];
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
            var DespatchAcceptData = {
                "indentId": IndentId,
                "userId": userId,
                "totalDespatch": lengthcount,
                "deliveryAddress": jQuery('#deliveryAddress').val(),
                "deliveryType": jQuery("#ddlDeliveryType").val(),
                "vehicleNo": jQuery('#vehicleNo').val(),
                "refferenceNo": jQuery('#referenceNo').val(),
                "productMembers": mbrdtl
            };

            _http.post(MFPUBLICLOSAPI_URL + "api/products/productindentdespatch", DespatchAcceptData, _despatchIntend.DespatchAcceptLoadCompleted, userdata.token)
            
        }
        else {

            swal("", "Select Atleast One Member", "warning")

        }



    },
    deliveryTypes: async function () {
    
        _http.get(MFPUBLICLOSAPI_URL + "api/products/deliverytypes", _despatchIntend.DeliveryTypesLoadCompleted, userdata.token)

    }



}

_despatchIntend.indentFill();


jQuery(document).ready(function ($) {

 
    jQuery('.error').addClass("error-msg");
    jQuery('#maincard').hide();


    jQuery("#ddlIntend").change(function (e) {
  
       
        _despatchIntend.prdtMembersTableFill();
        _despatchIntend.deliveryTypes();

    });

    jQuery("#vehicleNo").keyup(function (e) {
        var data= jQuery(this).val().toString();
        //if (/[^A-Z0-9]/ig.test(this.value)) {
        //    this.value = this.value.replace(/[^A-Z0-9]/ig, '');
        //}
        this.value = data.toUpperCase();
    });
});

function clearDespatchData() {
    jQuery('#deliveryAddress').val("");
    jQuery('#vehicleNo').val("");
    jQuery('#referenceNo').val("");


}
