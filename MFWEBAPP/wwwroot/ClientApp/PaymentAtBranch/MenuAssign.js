//var _ModuledataDetails = {


//    checkAccess: function () {
//        jQuery('.page-loader-wrapper').show();
//        var Str = " ";

//        var CheckAccess = {
//            "typeID": "2",
//            "flag1": "CHECKACCESS",
//            "flag2": "",
//            "inptvar1": userdata.userId,
//            "inptvar2": "1001",
//            "userID": userdata.userId,
//            "branchID": userdata.branchId
//        };
//        try {
//            CheckAccess = JSON.stringify(CheckAccess);
//        } catch (e) {
//            swal("", e.message, "warning");
//            return false;
//        }
//        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };
//        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _loanrepayment.checkAccessRtn, token)
//    },

//    checkAccessRtn: function (response) {
//        if (response.status === "SUCCESS") {
//            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
//            jQuery('.page-loader-wrapper').hide();
//            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
//                token = response.data.token;
//                var x = response.data.queryResult[0].param1;
//                if (x == "0") {
//                    swal({
//                        title: "Access Denied",
//                        text: "You are not autherized to view this page.!",
//                        type: "info"
//                    }, function () {
//                        window.location.href = "dashboard";
//                    });
//                }
//                else {
//                    _ModuledataDetails.ModuleFill();
//                }

//            }
//        }
//        else {
//            swal({
//                title: "Access Denied",
//                text: "You are not autherized to view this page.!",
//                type: "info"
//            }, function () {
//                window.location.href = "dashboard";
//            });
//        }
//    },

//    tokenValidate: function () {
//        jQuery('.page-loader-wrapper').show();
//        var Str = " ";

//        var CheckToken = {
//            "typeID": "1",
//            "userID": userdata.userId,
//            "branchID": userdata.branchId

//        };

//        try {
//            CheckToken = JSON.stringify(CheckToken);
//        } catch (e) {
//            swal("", e.message, "warning");
//            return false;
//        }
//        CheckToken = { "encryptedRqstStr": EncryptAPIReq(CheckToken) };


//        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _ModuledataDetails.checkAccessToken, userdata.token)
//    },

//    // Token response



//    checkAccessToken: function (response) {
//        if (response.status === "SUCCESS") {
//            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
//            jQuery('.page-loader-wrapper').hide();
//            token = response.data.queryResult.tokenId;
//            if (response.data.errStatus == 0) {
//                swal({
//                    title: "Access Denied",
//                    text: "You are already login in pr module!",
//                    type: "info"
//                }, function () {
//                    window.location.href = "dashboard";
//                });
//            }
//            else {
//                _ModuledataDetails.ModuleFill();
//            }


//        }

//    },



//    ModuleFillLoadCompleted: function (response) {
//        if (response.status === "SUCCESS") {
//            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
//            jQuery('.page-loader-wrapper').hide();
//            if (response.data != null && response.data.queryResult.moduledetails.length > 0) {

//                jQuery("#ddlModule").empty();
//                jQuery("#ddlModule").append(jQuery("<option></option>").val("0").text("Select Module"));
//                jQuery.each(response.data.queryResult.moduledetails, function (i, val) {
//                    jQuery("#ddlModule").append(jQuery("<option></option>").val(val.ModuleId).text(val.ModuleName));
//                });
//            }
//            else {
//                jQuery("#ddlModule").empty();
//                jQuery("#ddlModule").append(jQuery("<option></option>").val("0").text("Select Module"));
//            }
//            jQuery('.page-loader-wrapper').hide();
//        }
//        else {
//            jQuery("#ddlModule").empty();
//            jQuery("#ddlModule").append(jQuery("<option></option>").val("0").text("Select Module"));
//        }
//    },


//    MenuFillLoadCompleted: function (response) {
//        if (response.status === "SUCCESS") {
//            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
//            jQuery('.page-loader-wrapper').hide();
//           // if (response.data != null && response.data.queryResult.moduledetails.length > 0) {
//                if (response.data != null && response.data.queryResult.menudtl.length > 0) {
//                jQuery("#ddlMenu").empty();
//                jQuery("#ddlMenu").append(jQuery("<option></option>").val("0").text("Select Menu"));
//                jQuery.each(response.data.queryResult.menudtl, function (i, val) {
//                    jQuery("#ddlMenu").append(jQuery("<option></option>").val(val.MenuId).text(val.DisplayName));
//                });
//            }
//            else {
//                jQuery("#ddlMenu").empty();
//                jQuery("#ddlMenu").append(jQuery("<option></option>").val("0").text("Select Menu"));
//            }
//            jQuery('.page-loader-wrapper').hide();
//        }
//        else {
//            jQuery("#ddlMenu").empty();
//            jQuery("#ddlMenu").append(jQuery("<option></option>").val("0").text("Select Menu"));
//        }
//    },

//    AssignButtonLoad: function (response) {
//        jQuery('.page-loader-wrapper').hide();
//        if (response.status === "SUCCESS") {
          
//         response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

//            //swal("SUCCESS", "", "success");
//            swal(response.data.confirm1[0].paramList, "", "success");



//        }
//        else {
//            swal(response.responseMsg, "", "error");
//        }
//    },


//    ModuleFill: function () {
//        jQuery('.page-loader-wrapper').show();

//        var ModuleFillData = {
//            "TypeIDD": 1,
//            typeID: "4",
//            userID: userdata.userId,
//            branchID: userdata.branchId


//        };
//        ModuleFillData = JSON.stringify(ModuleFillData);
//        ModuleFillData = { "encryptedRqstStr": EncryptAPIReq(ModuleFillData) };
//        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/moduledetails", ModuleFillData, _ModuledataDetails.ModuleFillLoadCompleted, userdata.token)

//    },
//    MenuFill: function () {
//        jQuery('.page-loader-wrapper').show();
//        var moduleId = jQuery('#ddlModule').val();
//        var MenuFillData = {
//            "TypeIDD": 2,
//            "flag": moduleId,
//            typeID: "4",
//            userID: userdata.userId,
//            branchID: userdata.branchId

//        };
//        MenuFillData = JSON.stringify(MenuFillData);
//        MenuFillData = { "encryptedRqstStr": EncryptAPIReq(MenuFillData) };
//        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/moduledetails", MenuFillData, _ModuledataDetails.MenuFillLoadCompleted, userdata.token)

//    },

//    AssignFill: function () {
//        jQuery('.page-loader-wrapper').show();
//        var menudt = jQuery('#ddlMenu').val();
//        var empdt = jQuery('#vaemployee').val();
//        var entby = userdata.userId;
//        paramslist = menudt + "^" + empdt + "^" + entby;//paramlist
//        var moduleId = jQuery('#ddlModule').val();
//        var AssignFillData = {
//            "TypeIDD": 3,
//            "flag": moduleId,
//            "ParamList": paramslist,
//            typeID: "4",
//            userID: userdata.userId,
//            branchID: userdata.branchId
//        };

//        AssignFillData = JSON.stringify(AssignFillData);
//        AssignFillData = { "encryptedRqstStr": EncryptAPIReq(AssignFillData) };
//        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/moduledetails", AssignFillData, _ModuledataDetails.AssignButtonLoad, userdata.token)

//    },

//}

//jQuery(document).ready(function ($) {
//    jQuery('.page-loader-wrapper').hide();
//    jQuery('#ddlModule').select2();
//    jQuery('#ddlMenu').select2();

//    // _ModuledataDetails.ModuleFill();
//    _ModuledataDetails.tokenValidate();


//    jQuery("#ddlModule").change(function (e) {

//        /*  moduleId = jQuery('#ddlMenu').val();*/
//        jQuery('.page-loader-wrapper').show();
//        _ModuledataDetails.MenuFill();
//    });


//    jQuery('#Assign').click(function (e) {

//        jQuery('.page-loader-wrapper').show();
//        _ModuledataDetails.AssignFill();
//    });


//});
