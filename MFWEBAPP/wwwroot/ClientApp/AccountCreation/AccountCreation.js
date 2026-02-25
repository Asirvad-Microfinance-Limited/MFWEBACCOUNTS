var acc_no;
var _AccountCreation = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var CheckAccess = {
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1009",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        CheckAccess = JSON.stringify(CheckAccess);
        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _AccountCreation.checkAccessRtn, userdata.token)
    },

    checkAccessRtn: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {
                var x = response.data.queryResult[0].param1;
                if (x == "0") {
                    swal({
                        title: "Access Denied",
                        text: "You are not autherized to view this page.!",
                        type: "info"
                    }, function () {
                        window.location.href = "dashboard";
                    });
                }
                else {
                    _AccountCreation.GetOutwardData();
                }

            }
        }
        else {
            swal({
                title: "Access Denied",
                text: "You are not autherized to view this page.!",
                type: "info"
            }, function () {
                window.location.href = "dashboard";
            });
        }
    },


    CategoryFill: async function () {
        jQuery('.page-loader-wrapper').show();
        var CategoryFillData = {
            "typeId": 1 //categoryList
        };
        CategoryFillData = JSON.stringify(CategoryFillData);
        CategoryFillData = { "encryptedRqstStr": EncryptAPIReq(CategoryFillData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/addaccount", CategoryFillData, _AccountCreation.categoryLoad, userdata.token)
    },
    categoryLoad: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.accountCategory.length > 0) {
                jQuery("#CategoryID").empty();
                jQuery("#CategoryID").append(jQuery("<option></option>").val("0").text("  Choose Category  "));
                jQuery.each(response.data.queryResult.accountCategory, function (i, val) {
                    jQuery("#CategoryID").append(jQuery("<option></option>").val(val.categoryId).text(val.categoryName));
                });
            }
            else {
                jQuery("#CategoryID").empty();
                jQuery("#CategoryID").append(jQuery("<option></option>").val("0").text("  Choose Category  "));
            }
            if (response.data.queryResult.mainAccountDetails.length > 0) {
                jQuery("#AccountNo").empty();
                jQuery("#AccountNoDiv3").empty();
                jQuery("#AccountNo").append(jQuery("<option></option>").val("0").text("  Choose Account  "));
                jQuery("#AccountNoDiv3").append(jQuery("<option></option>").val("0").text("  Choose Account  "));
                jQuery.each(response.data.queryResult.mainAccountDetails, function (i, val) {
                    jQuery("#AccountNo").append(jQuery("<option></option>").val(val.accountNo).text(val.accountName));
                    jQuery("#AccountNoDiv3").append(jQuery("<option></option>").val(val.accountNo).text(val.accountName));


                });
            }
            else {
                jQuery("#AccountNo").empty();
                jQuery("#AccountNo").append(jQuery("<option></option>").val("0").text("  Choose Account  "));
                jQuery("#AccountNoDiv3").empty();
                jQuery("#AccountNoDiv3").append(jQuery("<option></option>").val("0").text("  Choose Account  "));
            }

           
        }
        else if (response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {

            jQuery("#CategoryID").empty();
            jQuery("#CategoryID").append(jQuery("<option></option>").val("0").text("  Choose Category  "));
            jQuery("#AccountNo").empty();
            jQuery("#AccountNo").append(jQuery("<option></option>").val("0").text("  Choose Account  "));
            jQuery("#AccountNoDiv3").empty();
            jQuery("#AccountNoDiv3").append(jQuery("<option></option>").val("0").text("  Choose Account  "));
        }
        jQuery('.page-loader-wrapper').hide();
    },



   
    AccountCreationSaveReq: function (typeId) {
        jQuery('.page-loader-wrapper').hide();
        debugger;
        var AccName = "";
        var ProjectCode = "";
        var CatId = jQuery('#CategoryID').val();
        var ParAccNum = jQuery('#AccountNo').val();
        var ParAccNum3 = jQuery('#AccountNoDiv3').val();
        var SubAccNo = jQuery('#SubAccountNo').val();
        var AccGroup = jQuery('#AccountGRP option:selected').val();
        var subaccgrp = jQuery('#SubAccountgrp option:selected').val();
            

        if (typeId == 2) {
            AccName = jQuery('#AccountName').val();
            if (AccName == "") {
                swal("Enter Account Name", "", "warning");
                return false;
            }
            if (CatId == 0) {
                swal("Select Category", "", "warning");
                return false;
            }

            if (AccGroup == 0) {
                swal("Select Account group", "", "warning");
                return false;
            }

            if (subaccgrp == 0) {
                swal("Select Account group", "", "warning");
                return false;
            }

        }
        else if (typeId == 4) {
            AccName = jQuery('#SubAccountName').val();
            if (AccName == "") {
                swal("Enter Sub Account Name", "", "warning");
                return false;
            }
            if (ParAccNum == 0) {
                swal("Select Main Account", "", "warning");
                return false;
            }
        }
        else if (typeId == 9) {
            AccName = jQuery('#SubAIdName').val();
            ProjectCode = jQuery('#ProjectCode').val();

            if (AccName == "") {
                swal("Enter SubId Account Name", "", "warning");
                return false;
            }
            if (SubAccNo == 0) {
                swal("Select Sub Account", "", "warning");
                return false;
            }
            if (ParAccNum3 == 0) {
                swal("Select Main Account", "", "warning");
                return false;
            }
            ParAccNum = ParAccNum3;
        }
        var SubAcFlag = 0;
        if (jQuery('#SubAcFlag').prop('checked') == true && typeId == 2) {
            SubAcFlag = 1;
        }
        if (jQuery('#SubAcFlag2').prop('checked') == true && typeId == 4) {
            SubAcFlag = 2;
        }

        if (SubAccNo == '') {

            SubAccNo = 0;
        }

        //if (ProjectCode == '') {

        //    ProjectCode = 0;
        //}


        var AccountCreationSaveFillData = {


            "typeId": typeId, //changed on 14-may-2022
            "subAccFlag": SubAcFlag,
            "categoryId": CatId,
            "accName": AccName,
            "userId": userdata.userId,
            //"mainAccNo": MainAccNo,
            "parAccNo": ParAccNum,
            "subAccId": SubAccNo,
            "projectCode": ProjectCode ,
            "accountGrp": AccGroup ,
           "subAccGroup": subaccgrp

        };
        AccountCreationSaveFillData = JSON.stringify(AccountCreationSaveFillData);
        AccountCreationSaveFillData = { "encryptedRqstStr": EncryptAPIReq(AccountCreationSaveFillData) };
       
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/addaccount", AccountCreationSaveFillData, _AccountCreation.AccountCreationSave, userdata.token)
    },


    AccountCreationSave: function (response) {
        jQuery('.page-loader-wrapper').hide();
          
        
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));





            





            swal({
                title: "verified",
                text: response.data.responseMsg,
                type: "success"
            }, function () {
                window.location.reload(true);


            });




            //  swal(response.data.message, "", "success");
           // swal(response.data.responseMsg, "", "success");

            _AccountCreation.AccountFieldClear();
            _AccountCreation.SubAccFieldClear();
            _AccountCreation.SubIdFieldClear();
        }
        else if (response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {
            swal(response.responseMsg, "", "error");
        }
        

    },
    AccountFieldClear: function () {
        jQuery('#CategoryID').val('0');
        jQuery('#AccountName').val('');
        jQuery('#SubAcFlag').prop('checked', false);
        jQuery('#AccountGRP').val('0');
        jQuery('#SubAccountgrp').val('0');
        jQuery('.page-loader-wrapper').hide();
        //jQuery('#AccountNo').val('0');
        //jQuery('#SubAccountName').val('');
        //jQuery('#SubAccountNo').val('0');
        //jQuery('#AccountNoDiv3').val('0');
        //jQuery('#SubAIdName').val('');
        //jQuery('#SubAcFlag2').prop('checked', false);
    },
    SubAccFieldClear: function () {
        //jQuery('#CategoryID').val('0');
        //jQuery('#AccountName').val('');
        //jQuery('#SubAcFlag').prop('checked', false);
        jQuery('.page-loader-wrapper').hide();
        jQuery('#AccountNo').val('0');
        jQuery('#SubAccountName').val('');
        jQuery('#SubAcFlag2').prop('checked', false);
        //jQuery('#SubAccountNo').val('0');
        //jQuery('#AccountNoDiv3').val('0');
        //jQuery('#SubAIdName').val('');

    },
    SubIdFieldClear: function () {
        //jQuery('#CategoryID').val('0');
        //jQuery('#AccountName').val('');
        //jQuery('#SubAcFlag').prop('checked', false);
        //jQuery('#AccountNo').val('0');
        //jQuery('#SubAccountName').val('');
        //jQuery('#SubAcFlag2').prop('checked', false);
        //jQuery('#AccountNoDiv3').reset();

        //jQuery('#AccountNoDiv3').val('0');
        //jQuery("#AccountNoDiv3").empty();
        //jQuery("#AccountNoDiv3").append(jQuery("<option></option>").val("0").text("  Choose sub Account  "));
        //jQuery('#AccountNoDiv3').val('0');
        jQuery("#AccountNoDiv3").empty();
        jQuery("#AccountNoDiv3").append(jQuery("<option></option>").val("0").text("  Choose sub Account  "));
        jQuery("#SubAccountNo").empty();
        jQuery("#SubAccountNo").append(jQuery("<option></option>").val("0").text("  Choose sub Account  "));
        jQuery('#SubAccountNo').val('0');
        jQuery('#SubAIdName').val('');
        jQuery("#ProjectCode").val('');

    },
    SubAcFill: async function () {
        jQuery('.page-loader-wrapper').show();
        var SubAcFillData = {
            "typeId": 8,
            "parAccNo": jQuery('#AccountNoDiv3').val()
        };
        SubAcFillData = JSON.stringify(SubAcFillData);
        SubAcFillData = { "encryptedRqstStr": EncryptAPIReq(SubAcFillData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/addaccount", SubAcFillData, _AccountCreation.SubAcLoad, userdata.token)
    },
    SubAcLoad: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.subAccList.length > 0) {
                jQuery("#SubAccountNo").empty();
                jQuery("#SubAccountNo").append(jQuery("<option></option>").val("0").text("  Choose Sub Account  "));
                jQuery.each(response.data.queryResult.subAccList, function (i, val) {
                    jQuery("#SubAccountNo").append(jQuery("<option></option>").val(val.subAccNo).text(val.subAccName));


                });
            }

            else {
                jQuery("#SubAccountNo").empty();
                jQuery("#SubAccountNo").append(jQuery("<option></option>").val("0").text("  Choose Sub Account  "));
            }

        }
        else if (response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {

            jQuery("#SubAccountNo").empty();
            jQuery("#SubAccountNo").append(jQuery("<option></option>").val("0").text("  Choose Sub Account  "));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    //LEDGER GROUP CREATION NEW CRF //


      MainAccountfill: async function () {
          jQuery('.page-loader-wrapper').show();
          var categoryid = jQuery("#CategoryID").val()
          var aaccountgroupfilldata = {
              "typeId": 11,
              "categoryId": categoryid
           
        };

          aaccountgroupfilldata = JSON.stringify(aaccountgroupfilldata);
          aaccountgroupfilldata = { "encryptedRqstStr": EncryptAPIReq(aaccountgroupfilldata) };

          _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/addaccount", aaccountgroupfilldata, _AccountCreation.accountgroupcreationloaddata, userdata.token)
    },
    accountgroupcreationloaddata: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.accountDetails.length > 0) {
                jQuery("#AccountGRP").empty();
                jQuery("#AccountGRP").append(jQuery("<option></option>").val("0").text("  Choose  Account group "));
                jQuery.each(response.data.queryResult.accountDetails, function (i, val) {
                    jQuery("#AccountGRP").append(jQuery("<option></option>").val(val.GroupId).text(val.GroupName));


                });
            }

            else {
                jQuery("#AccountGRP").empty();
                jQuery("#AccountGRP").append(jQuery("<option></option>").val("0").text("  Choose Account group  "));
            }

        }
        else if (response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {

            jQuery("#AccountGRP").empty();
            jQuery("#AccountGRP").append(jQuery("<option></option>").val("0").text("  Choose  Account group "));
        }
        jQuery('.page-loader-wrapper').hide();
    },




    subactgrpfillsdata: async function () {
        jQuery('.page-loader-wrapper').show();
        var groupid=jQuery("#AccountGRP").val()
        var subactgrpfill = {
            "typeId": 12,
            "accountGrp": groupid

        };

        subactgrpfill = JSON.stringify(subactgrpfill);
        subactgrpfill = { "encryptedRqstStr": EncryptAPIReq(subactgrpfill) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/addaccount", subactgrpfill, _AccountCreation.subactgrpfilldatas, userdata.token)
    },
    subactgrpfilldatas: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.accountDetails.length > 0) {
                jQuery("#SubAccountgrp").empty();
                jQuery("#SubAccountgrp").append(jQuery("<option></option>").val("0").text("  Choose Sub group   "));
                jQuery.each(response.data.queryResult.accountDetails, function (i, val) {
                    jQuery("#SubAccountgrp").append(jQuery("<option></option>").val(val.subgroupid).text(val.SubGroupName));


                });
            }

            //else {
            //    jQuery("#SubAccountgrp").empty();
            //    jQuery("#SubAccountgrp").append(jQuery("<option></option>").val("0").text("  Choose Sub group   "));
            //}

        }
        else if (response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {

            jQuery("#SubAccountNo").empty();
            jQuery("#SubAccountNo").append(jQuery("<option></option>").val("0").text("  Choose Sub group  "));
        }
        jQuery('.page-loader-wrapper').hide();
    }
}
jQuery(document).ready(function ($) {


    //jQuery('#ddlbranch').select2();
    //jQuery('#CategoryID').select2();
    //jQuery('#AccountNo').select2();
    //jQuery('#AccountNoDiv3').select2();
    //jQuery('#SubAccountNo').select2();

    $('#AccountName').keyup(function () {
        $(this).val($(this).val().toUpperCase());
    });
    $('#SubAccountName').keyup(function () {
        $(this).val($(this).val().toUpperCase());
    });
    $('#SubAIdName').keyup(function () {
        $(this).val($(this).val().toUpperCase());
    });
    $('#AccountNoDiv3').on('change', function () {
        _AccountCreation.SubAcFill();

    });
        $('#AccountGRP').on('change', function () {
            _AccountCreation.subactgrpfillsdata();
        });
    ;
    $('#CategoryID').on('change', function () {
        _AccountCreation.MainAccountfill();
    });

    _AccountCreation.CategoryFill();
    _AccountCreation.SubAcFill();
    _AccountCreation.MainAccountfill();
    _AccountCreation.subactgrpfillsdata();
});
