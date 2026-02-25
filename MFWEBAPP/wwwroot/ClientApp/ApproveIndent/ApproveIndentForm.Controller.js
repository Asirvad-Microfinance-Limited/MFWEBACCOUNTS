var memberCheckedCount = new Array();
var checkStatus = "";
var statusval;
var productDeliveryAddressData;
var MemberData = new Array();
var membersList = {
    "memberId": "",
    "flag": 0
};
var mbrdtl = [];
var productMemberList;
var _approveIndent = {

    BranchFillLoadCompleted: function (response) {
        
      //  console.log(response.data.productBranchList);


        if (response.status === "SUCCESS") {
           
            if (response.data.productBranchList.length > 0) {
                jQuery("#ddlBranches").empty();
                jQuery("#ddlBranches").append(jQuery("<option></option>").val("0").text(" -------- Choose Branch ------"));
                jQuery.each(response.data.productBranchList, function (i, val) {
                    jQuery("#ddlBranches").append(jQuery("<option></option>").val(val.branchId).text(val.branchName));
                });
            }
            else {
                jQuery("#ddlBranches").empty();
                jQuery("#ddlBranches").append(jQuery("<option></option>").val("0").text(" -------- Choose Branch ------"));
            }

        }
        else {

            jQuery("#ddlBranches").empty();
            jQuery("#ddlBranches").append(jQuery("<option></option>").val("0").text(" -------- Choose Branch ------"));
        }

    },
    IndentFillLoadCompleted: function (response) {
       
       

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

    },

    BindPrdtMembersLoadCompleted: function (response) {
       
        jQuery('#maincard').show();
        console.log(response.data.productMemberList);



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
                jQuery('#divapproveindent').empty();
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
                jQuery('#divapproveindent').html($table);




            } else {
                jQuery('#divapproveindent').hide();
                jQuery('#divapproveindent').empty();
            }
        } else {
            _General.noData(jQuery('#divapproveindent'), "No Data Found");
        }
    },

    IndentApprovalRejectLoadCompleted: async function (response)
    {
        if (response.status === "SUCCESS") {
           
            swal(response.data.message, "", "success");
        }
        else {
            swal(response.data.message, "", "error");
        }
        jQuery('#divapproveindent').empty();
        jQuery("#deliveryAddress").val("0");
        _approveIndent.branchFill();
        jQuery("#ddlIntend").empty();
        jQuery("#ddlIntend").append(jQuery("<option></option>").val("0").text(" -------- Choose Center --------"));
        jQuery("#deliveryAddress").val("");
       
    },

    branchFill: async function () {

     
        var accessLevelId = userdata.accessLevelId;
        var userid = userdata.userId;
        var BranchFillData = {


            "typeId": 1,//1-for productbranchlist
            "accessLevelId": accessLevelId,
            "userId": userid

        };

        _http.post(MFPUBLICLOSAPI_URL + "api/products/productbranchlist", BranchFillData, _approveIndent.BranchFillLoadCompleted, userdata.token)

    },

    indentFill: async function () {

      
        var accessLevelId = userdata.accessLevelId;
        var branchId = parseInt(jQuery('#ddlBranches').val());
        var IndentFillData = {

            "typeId": 1,
            "accessLevelId": accessLevelId,
            "branchId": branchId


        };

        _http.post(MFPUBLICLOSAPI_URL + "api/products/productindentlist", IndentFillData, _approveIndent.IndentFillLoadCompleted, userdata.token)

    },
    prdtMembersTableFill: async function () {
        
        var IndentId = parseInt(jQuery("#ddlIntend").val());

        var PrdtMembersTableFillData = {

            "indentId": IndentId,
            "typeId": 1,
            "accesslevelId": userdata.accessLevelId,
            "userId": userdata.userId
        };

        _http.post(MFPUBLICLOSAPI_URL + "api/products/productmemberlist", PrdtMembersTableFillData, _approveIndent.BindPrdtMembersLoadCompleted, userdata.token)

    },

    IntendStatusCheck: function (statusval) {
       
        var IndentId = parseInt(jQuery('#ddlIntend').val());
        var accessLevelId = userdata.accessLevelId;
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
            var IndentData = {
                "indentId": IndentId,
                "accessLevelId": accessLevelId,
                "userId": userId,
                "statusId": statusval,
                "totalApproved": lengthcount,
                "deliveryAddress": jQuery('#deliveryAddress').val(),
                "productMemebersList": mbrdtl


            };

            _http.post(MFPUBLICLOSAPI_URL + "api/products/productindentapproval", IndentData, _approveIndent.IndentApprovalRejectLoadCompleted, userdata.token)

        }
        else {

            swal("", "Select Atleast One Member", "warning")


        }
        var validator = jQuery("#frmApproveIndent").validate();
        validator.destroy();

        
    }
   

}

_approveIndent.branchFill();

jQuery(document).ready(function ($) {

 
    jQuery('.error').addClass("error-msg");
    jQuery('#maincard').hide();
    jQuery("#ddlBranches").change(function (e) {

        _approveIndent.indentFill();

    });

    jQuery("#ddlIntend").change(function (e) {

        _approveIndent.prdtMembersTableFill();

    });

    jQuery("#btnApprove").click(function () {
      



        jQuery.validator.addMethod('ddlBranches', function (value, element) {

            return (value != '0');
        }, 'Please Select Branch');
        jQuery.validator.addMethod('ddlIntend', function (value, element) {

            return (value != '0');
        }, 'Please Select Center');

        jQuery("#frmApproveIndent").validate({

            rules: {


                ddlBranches: {
                    required: true,
                    ddlBranches: true

                },
                ddlIntend: {
                    required: true,
                    ddlIntend: true
                },
                deliveryAddress: {
                    required: true,

                },



            },
            messages:
            {


                deliveryAddress: {
                    required: "Please Enter Delivery Address"

                },
                
            },


            submitHandler: function (form) {
             
                
                    _approveIndent.IntendStatusCheck(1);
                



            }
        });

        



    });
    jQuery("#btnReject").click(function () {

     



        jQuery.validator.addMethod('ddlBranches', function (value, element) {

            return (value != '0');
        }, 'Please Select Branch');
        jQuery.validator.addMethod('ddlIntend', function (value, element) {

            return (value != '0');
        }, 'Please Select Center');

        jQuery("#frmApproveIndent").validate({

            rules: {


                ddlBranches: {
                    required: true,
                    ddlBranches: true

                },
                ddlIntend: {
                    required: true,
                    ddlIntend: true
                },
                deliveryAddress: {
                    required: false,

                },



            },
            messages:
            {


                deliveryAddress: {
                    //required: "Please Enter Delivery Address"

                },
               
            },


            submitHandler: function (form) {
             
               
                    _approveIndent.IntendStatusCheck(0);

              



            }
        });





    });


        
});

