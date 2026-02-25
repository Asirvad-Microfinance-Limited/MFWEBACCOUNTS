 var MemberData = new Array();
var MemberIndex = 0;
var Remarks = "";
var recordingIdData = new Array();
var collectionNameData = new Array();
var applicationIdData = new Array();
var _nocApproval = {

    CenterFillLoadCompleted: function (response) {
     
       // console.log(response.data.centersList);

        if (response.status === "SUCCESS") {
            


            if (response.data.centersList.length > 0) {
                jQuery("#ddlCenters").empty();
                jQuery("#ddlCenters").append(jQuery("<option></option>").val("0").text(" --------- Choose Center ---------  "));
                jQuery.each(response.data.centersList, function (i, val) {
                    jQuery("#ddlCenters").append(jQuery("<option></option>").val(val.applicationId).text(val.centerName));
                });
            }
            else {
                jQuery("#ddlCenters").empty();
                jQuery("#ddlCenters").append(jQuery("<option></option>").val("0").text(" --------- Choose Center ---------  "));
            }

        }
        else {

            jQuery("#ddlCenters").empty();
            jQuery("#ddlCenters").append(jQuery("<option></option>").val("0").text(" --------- Choose Center ---------  "));
        }

    },
  

   BindNocApprovalTableCompleted: function (response) {
       
       jQuery('#maincard').show();
       if (response.status === "SUCCESS") {
           
            if (response.data.membersList.length > 0) {
                MemberData = [];
                recordingIdData = [];
                collectionNameData = [];
                jQuery('#divnocapproval').empty();
                var $table = jQuery('<table class="table" id="tblNocApproval">');

                $table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:center;">Member Id</th><th style="text-align:left;">Member Name</th><th style="text-align:left;">Nominee Name</th><th style="text-align:center;">CB Report</th><th style="text-align:center;">NOC View</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.membersList, function (i, val) {
                 
                    MemberData.push(val.memberId);
                    recordingIdData.push(val.recordingId);
                    collectionNameData.push(val.collectionName);
                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="center">').html(val.memberId));
                    $row.append(jQuery('<td align="left">').html(val.memberName));
                    $row.append(jQuery('<td align="left">').html(val.nomineeName));
                    $row.append(jQuery('<td align="center">').html('<button type="button" class="btnsmall btn-danger fc-center"  onClick="_nocApproval.CBReportData(' + i + ');"><i class="fa fa-eye" style="font-size:15px;"></i></button>' )); 
                    $row.append(jQuery('<td align="center">').html('<button type="button" class="btnsmall btn-danger fc-center"  onClick="_nocApproval.NOCReportData(' + i + ');"> <i class="fa fa-eye" style="font-size:15px;"></i></button> '));                    
                  
                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divnocapproval').html($table);
            } else {
                jQuery('#divnocapproval').hide();
                jQuery('#divnocapproval').empty();
            }
        } else {
           _General.noData(jQuery('#divnocapproval'), "No Data Found");
        }
    },

    NOCApprove: function (response) {
        
        if (response.status === "SUCCESS") {
            
            swal(response.responseMsg, "", "success");

            jQuery("#Modal1").modal('hide');
        }
        else {
            swal(response.responseMsg, "", "error");
        }
        
        jQuery('#divnocapproval').empty();
        jQuery("#ddlCenters").empty();
        jQuery("#ddlCenters").append(jQuery("<option></option>").val("0").text(" --------- Choose Center --------- "));
        _nocApproval.centerFill();
        _nocApproval.nocApprovalTableFill();

    },




    centerFill: function () {
      
      
        var userid = userdata.userId;

        var CenterFillData = {
           
            "statusId": 4, //hardcoded
            "userId": userid


        };

        _http.post(MFPUBLICLOSAPI_URL + "api/meetings/noccenters", CenterFillData, _nocApproval.CenterFillLoadCompleted, userdata.token)

    },

    nocApprovalTableFill: function () {

       
        var ApplicationId = jQuery('#ddlCenters').val(); 
        var nocApprovalTableFillData = {

            "applicationId": ApplicationId,
            "statusId": 4 //hardcoded

        };

        _http.post(MFPUBLICLOSAPI_URL + "api/members/nocmembers", nocApprovalTableFillData, _nocApproval.BindNocApprovalTableCompleted, userdata.token)

    },

    nocApprove: function (statusval) {
        
        var memid = "";
        memid = MemberData[MemberIndex];
        var MemberId = memid;
        var ApplicationId = jQuery('#ddlCenters').val();
        Remarks = jQuery('#remarks').val();
        if (Remarks != "" && statusval == 7) {
            var nocApproveData = {

                "applicationId": ApplicationId,
                "memberId": MemberId,
                "remarks": Remarks,
                "statusId": statusval,
                "userId": userdata.userId

            }

            _http.post(MFPUBLICLOSAPI_URL + "api/meetings/nocapprove", nocApproveData, _nocApproval.NOCApprove, userdata.token)
           
        }
        else if (Remarks == "" && statusval == 7){
            swal("", "Please Enter Remarks", "warning");
        }
        else if (statusval == 0) {

            var nocApproveData = {

                "applicationId": ApplicationId,
                "memberId": MemberId,
                "remarks": Remarks,
                "statusId": statusval,
                "userId": userdata.userId

            }

            _http.post(MFPUBLICLOSAPI_URL + "api/meetings/nocapprove", nocApproveData, _nocApproval.NOCApprove, userdata.token)
        }

       
       
        
    },


    CBReportData: async function (i) {
      
        var MemberId = memid;
        jQuery('#CBreportload').load(DOMAIN_URL + 'CBReport/' + MemberId, function () {
           

            jQuery("#Modal1").modal('show');
        });
    },

    NOCReportData: async function (i) {
       
        var recid = "";
        var collname = "";
        MemberIndex = 0;
        recid = recordingIdData[i];
        collname = collectionNameData[i];
        var RecordingId = recid;
        var CollectionName = collname;
        var authToken = userdata.token;
        if (i == 0) {

        }
        else {
            MemberIndex = i;
        }
       
        jQuery('#NOCViewload').load(DOMAIN_URL + 'NocView/' + RecordingId + '/' + CollectionName + '/' + authToken, function (){
            
      
            jQuery("#Modal1").modal('show');
            


        });
    }
    
  
}
 

_nocApproval.centerFill();


jQuery(document).ready(function ($) {

    jQuery('.error').addClass("error-msg");
    jQuery('#maincard').hide();


    jQuery("#ddlCenters").change(function (e) {
       
        _nocApproval.nocApprovalTableFill();

    });

});
   
