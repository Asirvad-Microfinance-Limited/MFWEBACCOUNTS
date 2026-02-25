var _ReportAccess = {
   

    headNameLoad: function (response) {
        debugger;
        if (response.status === "SUCCESS") {
            debugger
            var userName = response.data.userName;
            jQuery("#txtUserName").val(userName);
           
        }
        else {
            swal("", "No User Data Found", "")
        }
    },

    ReportNameLoadCompleted: function (response) {

        //console.log(response.data.rolesList);
        debugger;

        if (response.status === "SUCCESS") {
            debugger;

            if (response.data.reportListData.length > 0) {

                jQuery("#ddlReportName").empty();
                jQuery("#ddlReportName").append(jQuery("<option></option>").val("0").text(" ------ Choose Report Name ------ "));
                jQuery.each(response.data.reportListData, function (i, val) {
                    jQuery("#ddlReportName").append(jQuery("<option></option>").val(val.reportId).text(val.reportName));
                });
            }
            else {
                jQuery("#ddlReportName").empty();
                jQuery("#ddlReportName").append(jQuery("<option></option>").val("0").text(" ------ Choose Report Name ------ "));
            }

        }
        else {

            jQuery("#ddlReportName").empty();
            jQuery("#ddlReportName").append(jQuery("<option></option>").val("0").text(" ------ Choose Report Name ------ "));
        }

    },
  
    ReportAssignCompleted: function (response) {

        if (response.status === "SUCCESS") {
            debugger;
            swal(response.responseMsg, "", "success");

        }
        else {

            swal(response.responseMsg, "", "error");
        }

    },
    headNameDetails: function () {
        debugger;
        //var layerId = userdata.accessLevelId;
        var userId = jQuery('#txtUserID').val();
        var headNameDetailsData = {
            "layerId": -1,//hardcoded as -1 
            "userId": userId
        };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/username", headNameDetailsData, _ReportAccess.headNameLoad, userdata.token)

    },
    ReportNameFill: function () {
        debugger;
        var userId = jQuery('#txtUserID').val();
        var ReportNameFillData = {

            "userID": userId 
        };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "reports/assignreportcombofills", ReportNameFillData, _ReportAccess.ReportNameLoadCompleted, userdata.token)
    },
    ReportAssignSubmit: function () {
        debugger;
        var userId = jQuery('#txtUserID').val();
        var reportId = jQuery('#ddlReportName').val();
        var ReportSubmitFillData = {

            "reportId": reportId,
            "empCode": userId,
            "userId": userdata.userId
        };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "reports/assignreportaccess", ReportSubmitFillData, _ReportAccess.ReportAssignCompleted, userdata.token)
    },
}



jQuery(document).ready(function ($) {

    jQuery('#maincard').hide();
    jQuery('.error').addClass("error-msg");

    jQuery("#txtUserID").change(function (e) {
        debugger;
        if (jQuery("#txtUserName").val()!=null) {
            jQuery("#txtUserName").val("");
        }
        _ReportAccess.headNameDetails();
        _ReportAccess.ReportNameFill();
    });
   

});