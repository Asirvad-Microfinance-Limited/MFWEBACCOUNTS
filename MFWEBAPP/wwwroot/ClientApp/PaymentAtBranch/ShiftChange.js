var prid;
var _ShiftChange = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var CheckAccess = {
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1010",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        //encryption//
        try {
            CheckAccess = JSON.stringify(CheckAccess);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _ShiftChange.checkAccessRtn, userdata.token)
    },

    checkAccessRtn: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.QueryResult.length > 0) {
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
                    _ShiftChange.GetOutwardStateData();
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

    GetOutwardStateData: function () {
        var Str = " ";
        var GetStateData = {
            "flag1": "SHIFT_CHANGE",
            "flag2": "FILLSTATE",
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        //encryption//
        try {
            GetStateData = JSON.stringify(GetStateData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetStateData = { "encryptedRqstStr": EncryptAPIReq(GetStateData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetStateData, _ShiftChange.FillOutwardData, userdata.token)

    },
    FillOutwardData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery("#ddlOutWard").empty();
                jQuery("#ddlOutWard").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlOutWard").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlOutWard").empty();
                jQuery("#ddlOutWard").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));
            }
        }
        else {

            jQuery("#ddlOutWard").empty();
            jQuery("#ddlOutWard").append(jQuery("<option></option>").val("0").text(" --------CHOOSE STATE-------- "));
        }
    },
    
    getBranchType: function (stateID) {
        jQuery('.page-loader-wrapper').show();
        var GetPayTypeData = {
            "flag1": "SHIFT_CHANGE",
            "flag2": "FILLBRANCH",
            "inptvar1": stateID,
            "inptvar2": "",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        try {
            GetPayTypeData = JSON.stringify(GetPayTypeData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _ShiftChange.FillBranchType, userdata.token)

    },
    FillBranchType: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery("#ddlBranchType").empty();
                jQuery("#ddlBranchType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlBranchType").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlBranchType").empty();
                jQuery("#ddlBranchType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH TYPE-------- "));
            }
        }
        else {

            jQuery("#ddlBranchType").empty();
            jQuery("#ddlBranchType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH TYPE-------- "));
        }
    },

    GetReadings: function (branch) {
        jQuery('.page-loader-wrapper').show();
        var ReadingDetails = {
            "flag1": "SHIFT_CHANGE",
            "flag2": "GetReading",
            "inptvar1": branch,
            "inptvar2": "",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        try {
            ReadingDetails = JSON.stringify(ReadingDetails);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        ReadingDetails = { "encryptedRqstStr": EncryptAPIReq(ReadingDetails) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", ReadingDetails, _ShiftChange.GetElectReadings, userdata.token)

    },
    GetElectReadings: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            var tokenidd = response.data.queryResult.token;
            token = tokenidd;
            var val = response.data.queryResult.QueryResult[0].param1; 
            if (val == "1") {
                swal({
                    title: "Branch Shifted!",
                    //text: "success",
                    type: "success"
                }, function () {
                    window.location.reload(true);
                });

            }
            else {
                var data = response.data.queryResult.QueryResult[0].param1.split("~");
                jQuery('#OpenRead').val(data[0]);
                jQuery('#CloseRead').val(data[1]);
            }
        }
    },
    submitdata1: function () {
        jQuery('.page-loader-wrapper').show();
        var state = jQuery('#ddlOutWard').val();
        var branch = parseInt(jQuery('#ddlBranchType').val().split("#")[0]);
        if (jQuery("#opening").prop("checked") == true) {
            var result = jQuery('#op').text();
        }
        else if (jQuery("#openingReading").prop("checked") == true) {
            var result = jQuery('#en').text();
        }
        if (state == 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("", "Please Select the State...!", "error");
            return false;
        }
        if (branch == 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("", "Please Select the Branch...!", "error");
            return false;
        }
        if (result == 'Yes') {

            var UpdateElect = {
                "flag1": "SHIFT_CHANGE",
                "flag2": "UpdateElectricity",
                "inptvar1": branch,
                "inptvar2": "",
                "typeID": "4",
                "userID": userdata.userId,
                "branchID": userdata.branchId
            };

            try {
                UpdateElect = JSON.stringify(UpdateElect);
            } catch (e) {
                swal("", e.message, "warning");
                return false;
            }
            UpdateElect = { "encryptedRqstStr": EncryptAPIReq(UpdateElect) };

            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", UpdateElect, _ShiftChange.SubmitReturn, userdata.token);

        }
        else {
           
                window.location.reload(true);
            
        }
        
    },
    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.QueryResult.length > 0) {
                swal({
                    title: "Updated",
                    text: response.data.queryResult.QueryResult[0].param1,
                    type: "success"
                }, function () {
                    window.location.reload(true);
                });
            }
        }
    },
  
}



jQuery(document).ready(function ($) {
    _ShiftChange.checkAccess();
    jQuery('.page-loader-wrapper').hide();
    jQuery('#ddlOutWard').change(function (e) {
        var outward = jQuery('#ddlOutWard').val();
        if (outward != 0) {
            _ShiftChange.getBranchType(outward);
            jQuery('#confirm').show();
            jQuery("#OpenRead").val('');
            jQuery("#CloseRead").val('');
        }
        else
        {
            jQuery("#ddlBranchType").empty();
            jQuery("#ddlBranchType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH TYPE-------- "));           
        }
    });
});
    jQuery('#ddlBranchType').change(function (e) {
        var branch = parseInt(jQuery('#ddlBranchType').val().split("#")[0]);
        if (branch != 0) {
            _ShiftChange.GetReadings(branch);
            jQuery("#OpenRead").val('');
            jQuery("#CloseRead").val('');
        }
    });

    jQuery('#submit').click(function (e) {
        _ShiftChange.submitdata1();
    });
   
    






