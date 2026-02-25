var token = "";

var _AddPayData = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var CheckAccess = {
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1001",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        CheckAccess = JSON.stringify(CheckAccess);
        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _AddPayData.checkAccessRtn, token)
    },

    checkAccessRtn: function (response) {
        if (response.status === "SUCCESS") {


               

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
                        if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                            token = response.data.token;
                            var x = response.data.queryResult.QueryResult[0].param1;



                           

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
                    _AddPayData.GetPayData();
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

    tokenValidate: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var CheckToken = {
            "typeID": "1",
            "userID": userdata.userId,
            "branchID": userdata.branchId

        };

        try {
            CheckToken = JSON.stringify(CheckToken);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckToken = { "encryptedRqstStr": EncryptAPIReq(CheckToken) };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _AddPayData.checkAccessToken, userdata.token)
    },

    checkAccessToken: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            token = response.data.queryResult.tokenId;
            if (response.data.errStatus == 0) {
                swal({
                    title: "Access Denied",
                    text: "You are already login in pr module!",
                    type: "info"
                }, function () {
                    window.location.href = "dashboard";
                });
            }
            else {
                _AddPayData.GetPayData();
            }


        }
        else if (response.responseMsg == "Invalid Token") {
            window.location.href = DOMAIN_URL;
        }

    },


    GetPayData: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetPayTypeData = {
            "flag1": "DMAPPROVEDDATA",
            "flag2": "PAYREQ",
            "inptvar1": userdata.branchId,
            "inptvar2": Str,
            "typeID": "2",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        GetPayTypeData = JSON.stringify(GetPayTypeData);
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillPayType,token)

    },
    FillPayType: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                token = response.data.queryResult.token;

                jQuery("#ddlPayType").empty();
                jQuery("#ddlPayType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE REQUEST-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlPayType").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlPayType").empty();
                jQuery("#ddlPayType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE REQUEST-------- "));
            }
        }
        else {

            jQuery("#ddlPayType").empty();
            jQuery("#ddlPayType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE REQUEST-------- "));
        }
    },
    GetReqData: function (val) {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var GetPayTypeData = {
            "flag1": "DMAPPROVEDDATA",
            "flag2": "REQDATA",
            "inptvar1": val,
            "inptvar2": Str,
            "typeID": "2",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        GetPayTypeData = JSON.stringify(GetPayTypeData);
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillReqType, token)

    },
    FillReqType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            //jQuery('.page-loader-wrapper').hide();
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                token = response.data.queryResult.token;
                jQuery("#payType").val(response.data.queryResult.QueryResult[0].param1);
                var x = response.data.queryResult.QueryResult[0].param2;
                jQuery("#reqAmt").val(response.data.queryResult.QueryResult[0].param3);
                jQuery("#remarks").val(response.data.queryResult.QueryResult[0].param4);
                _AddPayData.GetGST(x);
            }
            else {
                jQuery("#payType").val("");
                jQuery("#remarks").val("");
                jQuery("#reqAmt").val("");
                jQuery("#vendorName").val("");
            }
        }
        else {
            jQuery("#payType").val("");
            jQuery("#remarks").val("");
            jQuery("#reqAmt").val("");
            jQuery("#vendorName").val("");
        }
    },
    GetGST: function (val) {
        jQuery('.page-loader-wrapper').show();
        jQuery('#gstin-error').hide();
        var Str = " ";
        if (val != "" && val.toUpperCase() != "NIL") {
            var GetGSTValue = {
                "gstin": val,
                "consent": "Y",
                "consent_text": "I hereby declare my consent agreement for verifying my data to Asirvad company",
                "firmId": "3",
                "empId": "316595"

            };

            _http.post(MFPUBLICKYCAPI_URL + "api/gst", GetGSTValue, _AddPayData.FillGST, userdata.token)
        }
        else {
            var val = jQuery("#ddlPayType").val();
            _AddPayData.GetRemarksData(val);
            jQuery("#vendorName").val("---");
            //jQuery('.page-loader-wrapper').hide();
        }
    },
    FillGST: function (response) {
        //jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.pradr.em.length > 0) {
                jQuery("#vendorName").val(response.data.lgnm);
            }
            else {
                jQuery("#vendorName").val("");
            }
        }
        else {
            jQuery("#vendorName").val("");
        }
        var val = jQuery("#ddlPayType").val();
        _AddPayData.GetRemarksData(val);
    },
    submitdata: function () {
        var val2 = jQuery("#ddlPayType").val();
        if (val2 != 0) {
            jQuery('.page-loader-wrapper').show();
            var str = " "
            var val2 = jQuery("#ddlPayType").val();
            var GetPayTypeData = {
                "flag1": "DMAPPROVEDDATA",
                "flag2": "APPROVAL",
                "inptvar1": val2,
                "inptvar2": userdata.userId ,
                "typeID": "2",
                "userID": userdata.userId,
                "branchID": userdata.branchId
            };
            GetPayTypeData = JSON.stringify(GetPayTypeData);
            GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillsubmitData,token)
        } else {
            swal("Error", "Please select a PR..!", "error");
        }
    },

    GetRemarksData: function (val) {
        var Str = " ";
        jQuery('.page-loader-wrapper').show();
        var GetGLReqData = {
            "flag1": "DMAPPROVEDDATA",
            "flag2": "GLREREMARKS",
            "inptvar1": val,
            "inptvar2": Str,
            "typeID": "2",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        GetGLReqData = JSON.stringify(GetGLReqData);
        GetGLReqData = { "encryptedRqstStr": EncryptAPIReq(GetGLReqData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetGLReqData, _AddPayData.FillRemarkData, token)

    },
    FillRemarkData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                token = response.data.queryResult.token;
                var val1 = response.data.queryResult.QueryResult[0].param1;
                var val2 = response.data.queryResult.QueryResult[0].param2;
                var val3 = response.data.queryResult.QueryResult[0].param3;
                var val4 = response.data.queryResult.QueryResult[0].param4;
                var val5 = response.data.queryResult.QueryResult[0].param5;

                if (val1 != "0") {
                    jQuery('#OtherRemarks').hide();
                    if (val1 != "NIL") {
                        jQuery('#GLAHDetails').show();
                        var remark = val1;
                        jQuery('#recommendedAHRemark').val(remark);
                    }
                    if (val2 != "NIL") {
                        jQuery('#GLRMDetails').show();
                        var remark = val2;
                        jQuery('#recommendedRMRemark').val(remark);
                    }
                    if (val3 != "NIL") {
                        jQuery('#GLHOOPDetails').show();
                        var remark = val3;
                        jQuery('#recommendedHOPRemarks').val(remark);
                    }
                    if (val4 != "NIL") {
                        jQuery('#GLBusinessHeadDetails').show();
                        var remark = val4;
                        jQuery('#recommendedBUHEADRemark').val(remark);
                    }
                    if (val5 != "NIL") {
                        jQuery('#GLMDDetails').show();
                        var remark = val5;
                        jQuery('#MDRemark').val(remark);
                    }
                }
                else {
                    jQuery('#OtherRemarks').show();
                }

            }
        }
    },

    FillsubmitData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                token = response.data.queryResult.token;
                var typ;
                if (response.data.queryResult.QueryResult[0].param2 == '0')
                    typ = "error";
                else
                    typ = "success";
                swal({
                    title: "Approve",
                    text: response.data.queryResult.QueryResult[0].param1,
                    type: typ
                }, function () {
                    window.location.reload(true);
                });
            }
        }

        else if (response.responseMsg == "Invalid Token") {
            window.location.href = DOMAIN_URL;
        }
        else {
            var msg = jQuery.trim(response.responseMsg);
            swal({
                title: "Error",
                text: msg,
                type: "error"
            }, function () {
                window.location.reload(true);
            });
        }













    }
}

//_AddPayData.GetPayData();
_AddPayData.tokenValidate();
jQuery(document).ready(function ($) {
    //_AddPayData.tokenValidate();
    //_AddPayData.checkAccess();
    jQuery('.page-loader-wrapper').hide();
    jQuery('#ddlPayType').change(function (e) {
        var val = jQuery("#ddlPayType").val();
        jQuery('#GLAHDetails').hide();
        jQuery('#GLRMDetails').hide();
        jQuery('#GLHOOPDetails').hide();
        jQuery('#GLBusinessHeadDetails').hide();
        jQuery('#GLMDDetails').hide();
        jQuery('#OtherRemarks').hide();
        if (val != 0) {
            _AddPayData.GetReqData(val);
        }
        else {
            jQuery("#payType").val("");
            jQuery("#remarks").val("");
            jQuery("#reqAmt").val("");
            jQuery("#vendorName").val("");
        }

    });
    jQuery('#submit').click(function (e) {
        _AddPayData.submitdata();
    });

});
var tryCount = 0;
var minimalUserResponseInMiliseconds = 700;
function check() {
    console.clear();
    before = new Date().getTime();
    
    after = new Date().getTime();
    if (after - before > minimalUserResponseInMiliseconds) {
        document.write(" Dont open Developer Tools. ");
        self.location.replace(
            window.location.protocol + window.location.href.substring(
                window.location.protocol.length
            )
        );
    } else {
        before = null;
        after = null;
        delete before;
        delete after;
    }
    setTimeout(check, 500);
}
check();
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);
document.addEventListener("keydown", function (e) {
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        disabledEvent(e);
    }
    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        disabledEvent(e);
    }
    // Ctrl+S
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        disabledEvent(e);
    }
    // Ctrl + U
    if (e.ctrlKey && e.keyCode == 85) {
        disabledEvent(e);
    }
    // F12
    if (event.keyCode == 123) {
        disabledEvent(e);
    }
}, false);
function disabledEvent(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else if (window.event) {
        window.event.cancelBubble = true;
    }
    e.preventDefault();
    return false;
}

