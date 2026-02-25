var _aprvFiData = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var CheckAccess = {
            "typeID": "2",
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1001",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            CheckAccess = JSON.stringify(CheckAccess);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _aprvFiData.checkAccessRtn, token)
    },

    checkAccessRtn: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                token = response.data.token;
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
                    _aprvFiData.loadFIType();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _aprvFiData.checkAccessToken, userdata.token)
    },

    // Token response



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
                _aprvFiData.loadFIType();
            }


        }

    },


    loadFIType: function () {
        jQuery('.page-loader-wrapper').show();
        var fiTypes = {
            Flag: "FIApproval",
            PagVal: "GetFITypeNew",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        fiTypes = JSON.stringify(fiTypes);
        fiTypes = { "encryptedRqstStr": EncryptAPIReq(fiTypes) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", fiTypes, _aprvFiData.fillFiType, userdata.token);
    },
    fillFiType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFIType").empty();
                jQuery("#ddlFIType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFIType").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFIType").empty();
                jQuery("#ddlFIType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI TYPE-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },



    loadFiName: function (fitype) {
        jQuery('.page-loader-wrapper').show();
        var fiName = {
            Flag: "FIApproval",
            PagVal: "GetFIApprvl",
            parVal: fitype,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        fiName = JSON.stringify(fiName);
        fiName = { "encryptedRqstStr": EncryptAPIReq(fiName) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", fiName, _aprvFiData.fillFiName, userdata.token);
    },
    fillFiName: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_fIName").empty();
                jQuery("#ddl_fIName").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI NAME-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_fIName").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_fIName").empty();
                jQuery("#ddl_fIName").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI NAME-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    loadFiData: function (finame) {
        jQuery('.page-loader-wrapper').show();
        var fiData = {
            Flag: "FIApproval",
            PagVal: "GetFiApproveTbl",
            parVal: finame,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        fiData = JSON.stringify(fiData);
        fiData = { "encryptedRqstStr": EncryptAPIReq(fiData) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", fiData, _aprvFiData.FiTable, userdata.token);
    },
    //fillFiData: function (Response) {
    //    if (Response.data.message === "Success") {

    //        _aprvFiData.FiTable(Response);

    //    }
    //    else {

    //        return false;
    //    }
    //},
    FiTable: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();
                jQuery('#maincard').show();
                if (response.data.queryResult.QueryResult.length > 0) {

                    jQuery('#Fidatatabl').empty();
                    jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                        var $row = jQuery('<tr/>');
                        var data1 = val.Param1.split("~");
                        //var nval = nval + 1;

                        //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[5]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[8]));
                        jQuery('#Fidatatabl').append($row);
                    });
                }
                jQuery('#divAprRejBtn').show();
            }
        }
    },
    submitevalue: function () {
        if (_aprvFiData.checkvalue()) {
            var aprRejVAl;
            if (jQuery("#radaprv").prop("checked") == true) {

                aprRejVAl = 1;
            }
            if (jQuery("#radreject").prop("checked") == true) {

                aprRejVAl = 0;
            }
            var InputData = aprRejVAl + "µ" + jQuery('#ddl_fIName').val() + "µ" + userdata.userId + "µ" + jQuery('#txt_reason').val();

            var submitRequest = {

                Flag: "APPROVEFINANCIALINST",
                ParVal: InputData,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _aprvFiData.SubmitReturn, userdata.token)

        }  
    },
    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                var msg = jQuery.trim(response.data.message);
                //var msg = String.prototype.trim(response.data.message);
                if (response.data.errStatus = "1") {
                    if (response.data.queryResult.QueryResult[0].Param1 == "1") {
                        swal({
                            title: "Approved Successfully!",
                            text: "",
                            type: "success"
                        }, function () {
                            window.location.reload(true);
                        });
                    }
                    else {
                        swal({


                            title: "Rejected Successfully!",
                            text: "",
                            type: "success"
                        }, function () {
                            window.location.reload(true);
                        });
                    }

                }
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
    },
    checkvalue: function () {

        var FiType = jQuery('#ddlFIType').val();
        var FiName = jQuery('#ddl_fIName').val();

        if (FiType == 0) {
            swal("", "Please Select Financial Institution Type", "error");
            return false;
        }
        else if (FiName == "") {
            swal("", "Please Enter Financial Institution Name", "error");
            return false;
        }
        else if (jQuery("#radaprv").prop("checked") == false && jQuery("#radreject").prop("checked") == false) {
            swal("", "Please select an Option Approve/Reject..!", "error");
            return false;
        }  
        else if (jQuery("#radreject").prop("checked") == true && jQuery("#txt_reason").val() == "") {
            swal("", "Please Enter Reason", "error");
            return false;
        }
        else {
            return true;
        }
    }
}
jQuery(document).ready(function () {

    jQuery('.page-loader-wrapper').hide();
    //_aprvFiData.loadFIType();
    _aprvFiData.tokenValidate();

});
jQuery('#ddlFIType').on("change", function () {
   var fitype= jQuery("#ddlFIType").val();
    _aprvFiData.loadFiName(fitype);
});
jQuery('#ddl_fIName').on("change", function () {
    var finame = jQuery("#ddl_fIName").val();
    _aprvFiData.loadFiData(finame);
});
jQuery('#radreject').on("click", function () {
    jQuery('#divreason').show();
});
jQuery('#radaprv').on("click", function () {
    jQuery('#divreason').hide();
    jQuery('#txt_reason').val("");
});
jQuery('#Btnsubmit').on("click", function () {
    _aprvFiData.submitevalue();
});
jQuery('#BtnExit').on("click", function () {
    window.open("Dashboard", "_self");
});