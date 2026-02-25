var centerDetailsList = {
    "centerId": "",
    "centerName": ""
};
var checkStatus = "";
cntrdtl = [];
var CenterIdData = new Array();
var CenterNameData = new Array();
var centerCheckedCount = new Array();

var _assignCenter = {
    FdoAssignFromFillLoadCompleted: function (response) {
        
        //console.log(response.data.fDOListData);


        if (response.status === "SUCCESS") {
            

            if (response.data.fDOListData.length > 0) {

                jQuery("#ddlAssignedFrom").empty();
                jQuery("#ddlAssignedFrom").append(jQuery("<option></option>").val("0").text(" -------- Choose Assignor   ----------- "));
                jQuery.each(response.data.fDOListData, function (i, val) {
                jQuery("#ddlAssignedFrom").append(jQuery("<option></option>").val(val.userId).text(val.userName));
                });
            }
            else {
                jQuery("#ddlAssignedFrom").empty();
                jQuery("#ddlAssignedFrom").append(jQuery("<option></option>").val("0").text(" -------- Choose Assignor   ----------- "));
            }

        }
        else {

            jQuery("#ddlAssignedFrom").empty();
            jQuery("#ddlAssignedFrom").append(jQuery("<option></option>").val("0").text(" -------- Choose Assignor   ----------- "));
        }

    },
    FdoAssignToFillLoadCompleted: function (response) {
        
        //console.log(response.data.fDOListData);


        if (response.status === "SUCCESS") {
           
            if (response.data.fDOListData.length > 0) {

                jQuery("#ddlAssignedTo").empty();
                jQuery("#ddlAssignedTo").append(jQuery("<option></option>").val("0").text("----------- Choose Assignee  -----------"));
                jQuery.each(response.data.fDOListData, function (i, val) {
                    jQuery("#ddlAssignedTo").append(jQuery("<option></option>").val(val.userId).text(val.userName));
                });
            }
            else {
                jQuery("#ddlAssignedTo").empty();
                jQuery("#ddlAssignedTo").append(jQuery("<option></option>").val("0").text("----------- Choose Assignee  -----------"));
            }

        }
        else {

            jQuery("#ddlAssignedTo").empty();
            jQuery("#ddlAssignedTo").append(jQuery("<option></option>").val("0").text("----------- Choose Assignee  -----------"));
        }

    },

    AssignCenterLoadCompleted: function (response) {
        
     //   jQuery('#maincard').show();
        //console.log(response.data.fDOCentersListData);
        jQuery('#maincard').show();

        if (response.status === "SUCCESS") {
         
            if (response.data.fDOCentersListData.length > 0) {
               
                CenterIdData = [];
                CenterNameData = [];
                jQuery('#divassigncenter').empty();
                var $table = jQuery('<table class="table" id="tblAssignCenter">');

                $table.append
                    ('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:center;">Center ID</th><th style="text-align:left;">Center Name</th><th style="text-align:center;">Select</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.fDOCentersListData, function (i, val) {
                    CenterIdData.push(val.centerId);
                    CenterNameData.push(val.centerName);
                    var $row = jQuery('<tr/>');

                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="center">').html(val.centerId));
                    $row.append(jQuery('<td align="left">').html(val.centerName));
                    $row.append(jQuery('<td align="center">').html('<input type="checkbox" id="centerscheck" name="centerscheck" />'));


                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divassigncenter').html($table);



            } else {
                jQuery('#divassigncenter').hide();
                jQuery('#divassigncenter').empty();
            }
        }
        else {
           
            _General.noData(jQuery('#divassigncenter'), "No Data Found");
        }
    },
    AssignCenterSubmitLoadCompleted: function (response) {
        
        if (response.status === "SUCCESS") {
            
            swal(response.data.message, "", "success");
        }
        else {
            swal(response.responseMsg, "", "error");

        }
        
        _assignCenter.CentersTableFill();


    },

    FdoListAssignedFromFill: function () {
        
        branchId = userdata.branchId;
        var FdoListAssignedFromFillData = {
            "typeId": 1, // fdo list based on branch
            "branchId": branchId,
            "userId": 0,// hardcoded as zero because fdo list is displayed based on typeId and branchId
            "accessLevelId": 0 //  hardcoded as zero because fdo list is displayed based on typeId and branchId
        };
        _http.post(MFPUBLICLMSAPI_URL + "api/general/fdolist", FdoListAssignedFromFillData, _assignCenter.FdoAssignFromFillLoadCompleted, userdata.token)
    },
    FdoListAssignedToFill: function () {
        
        branchId = userdata.branchId;
        var FdoListAssignedToFillData = {
            "typeId": 3, // fdo list based on branch
            "branchId": branchId,
            //"userId": 0,// hardcoded as zero because fdo list is displayed based on typeId and branchId
            "userId": jQuery("#ddlAssignedFrom").val(),
            "accessLevelId": 0 //  hardcoded as zero because fdo list is displayed based on typeId and branchId
        };
        _http.post(MFPUBLICLMSAPI_URL + "api/general/fdolist", FdoListAssignedToFillData, _assignCenter.FdoAssignToFillLoadCompleted, userdata.token)
    },
    CentersTableFill: function () {
        
        accessLevelId = userdata.accessLevelId;
        var CentersTableFillFillData = {
           
            "userId": jQuery("#ddlAssignedFrom").val()
        };
        _http.post(MFPUBLICLMSAPI_URL + "/api/general/fdocenterslist", CentersTableFillFillData, _assignCenter.AssignCenterLoadCompleted, userdata.token)
    },

    AssignCenterSubmit: function () {
        
       
        var userId = userdata.userId;
        centerCheckedCount = [];
        jQuery.each(jQuery("input[name='centerscheck']:checked"), function () {
            centerCheckedCount.push(jQuery(this).val());
        });

        if (centerCheckedCount.length > 0) {
            cntrdtl = [];
            for (i = 0; i < CenterIdData.length; i++) {

                checkStatus = centerCheckedCount[i];
                if (checkStatus == "on") {
                   // membersList.flag = 1;
                    centerDetailsList.centerId = CenterIdData[i];
                    centerDetailsList.centerName = CenterNameData[i];
                    cntrdtl.push(centerDetailsList);
                    centerDetailsList = {};
                }
                else
                {
                   

                }
               
            }
            //var lengthcount = centerCheckedCount.length;
            var AssignCenterSubmitData = {
                "centerDetails": cntrdtl,
                "oldFDO": jQuery("#ddlAssignedFrom").val(),
                "newFDO": jQuery("#ddlAssignedTo").val(),
                "userId": userId,
                "changeDate": jQuery("#chngDate").val()

                //"indentId": IndentId,
                //"totalDeliverd": lengthcount,
                //"userId": userId,
                //"productVendorList": mbrdtl
            };

            _http.post(MFPUBLICLMSAPI_URL + "/api/stages/changefdocenters", AssignCenterSubmitData, _assignCenter.AssignCenterSubmitLoadCompleted, userdata.token)

        }
        else {

            swal("","Select Atleast One Center","warning")

        }



    }

};

_assignCenter.FdoListAssignedFromFill();

jQuery(document).ready(function ($) {
    
    jQuery('#maincard').hide();
    jQuery('.error').addClass("error-msg");
    jQuery('#bs_datepicker_container1 input').datepicker({      
        autoclose: true,
        format: "mm/dd/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        startDate: new Date(),
        container: '#bs_datepicker_container1'
    });

    jQuery("#ddlAssignedFrom").change(function (e) {
        
        _assignCenter.CentersTableFill();
        _assignCenter.FdoListAssignedToFill();
       
    });
});