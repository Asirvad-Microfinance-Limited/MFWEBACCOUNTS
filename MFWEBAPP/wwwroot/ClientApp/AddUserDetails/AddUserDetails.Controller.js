var userDetailsId = "0";
var branchList;
var AddUserDetailsSubmits= {
    "userId": 0,
    "userName": "",
    "userType": 0,
    "branchId": 0,
    "mobileNo": "",
    "emailId": "",
    "statusId": 0
}
var branchUsersListData = new Array();

var _userDetails = {
    UserTypeLoadCompleted: function (response) {
        
        //console.log(response.data.userTypesList);
        branchList = response.data.userTypesList;
        if (response.status === "SUCCESS") {
            

            if (response.data.userTypesList.length > 0) {
                
                jQuery("#ddlUserType").empty();
                jQuery("#ddlUserType").append(jQuery("<option></option>").val("0").text(" -------- Choose User Type ------"));
                jQuery.each(response.data.userTypesList, function (i, val) {
                    jQuery("#ddlUserType").append(jQuery("<option></option>").val(val.typeId).text(val.typeName));
                });
            }
            else {
                jQuery("#ddlUserType").empty();
                jQuery("#ddlUserType").append(jQuery("<option></option>").val("0").text("-------- Choose User Type ------"));
            }

        }
        else {

            jQuery("#ddlUserType").empty();
            jQuery("#ddlUserType").append(jQuery("<option></option>").val("0").text("-------- Choose User Type ------"));
        }

    },
    BranchLoadCompleted: function (response) {
        
        //console.log(response.data.layerDetailsData);

        if (response.status === "SUCCESS") {
            

            if (response.data.layerDetailsData.length > 0) {

                jQuery("#ddlBranch").empty();
                jQuery("#ddlBranch").append(jQuery("<option></option>").val("0").text("------- Choose Access Level -------"));
                jQuery.each(response.data.layerDetailsData, function (i, val) {
                    jQuery("#ddlBranch").append(jQuery("<option></option>").val(val.levelId).text(val.levelName));
                });
            }
            else {
                jQuery("#ddlBranch").empty();
                jQuery("#ddlBranch").append(jQuery("<option></option>").val("0").text("------- Choose Access Level -------"));
            }

        }
        else {

            jQuery("#ddlBranch").empty();
            jQuery("#ddlBranch").append(jQuery("<option></option>").val("0").text("------- Choose Access Level -------"));
        }

    },
    UserDetailsTableCompleted: function (response) {
        
        
        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {
            
      
            if (response.data.branchUsersListData.length > 0) {
               
                branchUsersListData = [];
                jQuery('#divuserdetails').empty();
               
                var $table = jQuery('<table class="table" id="tbluserdetails"  >');
                $table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:left;">User ID</th><th style="text-align:left;">Name</th><th style="text-align:left;">User Type</th><th style="text-align:left;">Access Level</th>><th style="text-align:center;">Status</th><th style="text-align:center;">Edit</th></tr></thead>');
                var $tbody = jQuery('<tbody id="tblUserList">');
                jQuery.each(response.data.branchUsersListData, function (i, val) {
                 
                    branchUsersListData = response['data']['branchUsersListData'];
                    var $row = jQuery('<tr/>');

                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="left">').html(val.userId));
                    $row.append(jQuery('<td align="left">').html(val.userName));
                    $row.append(jQuery('<td align="left">').html(val.userType));
                    $row.append(jQuery('<td align="left">').html(val.branchName));
                    if (val.statusId == 1) {
                        $row.append(jQuery('<td align="center">').html('<label class="switch"> <input type="checkbox" onchange="_userDetails.toggleChecks(' + val.userId + ');" checked> <span class="slider round"></span> </label>'));
                    }
                    else {
                        $row.append(jQuery('<td align="center">').html('<label class="switch" > <input type="checkbox" onchange="_userDetails.toggleChecks(' + val.userId + ');"  id="status' + i + '" name="status' + i + '" > <span class="slider round"></span> </label>'));
                    }

                    $row.append(jQuery('<td align="center">').html('<button type="button" data-target="#mediumModal" data-toggle="modal" onClick="_userDetails.Edit(' + val.userId + ');" class="btnsmall btn-danger fc-center"> <i class="fa fa-pencil"></i></button> '));

                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divuserdetails').html($table);
                jQuery('#tbluserdetails').DataTable({
                    "aLengthMenu": [[8,10,25, 50, 75, -1], [8,10,25, 50, 75, "All"]],
                    "iDisplayLength": 8,
                    //"dom": '<"dt-buttons"Bf><"clear">',
                    //"dom": '<"dt-buttons"Bf><"clear">lirtp',
                    //"dom": '<"dt-button buttons-print"Bf><"clear">lirtp',
                    //"dom": '<"col-sm-6">lirtp',
                    //dom: 'Bfrtip',
                    //buttons: [
                    //    'print'
                    //]
                    //dom: 'Bfrtip',
                    //dom: '<"#idprint">',
                  ////  "dom": '<"top"i>rt<"bottom"flp><"clear">',
                   //"dom": '<"top"fl>rt<"bottom"ipB><"clear">',
                   //"dom": '<"top"fl>rt<"bottom"ipB><"clear">',
                    //dom: 'flrtipB',
                    //dom: 'fBrtip<"clear">l',
                    //buttons: ['print']
                    //buttons: [
                    //    {
                    //        extend: 'print',
                    //        customize: function (win) {
                               

                    //            jQuery(win.document.body).find('table')
                    //                .addClass('compact')
                    //                .css('font-size', 'inherit');
                    //        }
                    //    }
                    //]
                
                   
                 });
                jQuery('#tbluserdetails_wrapper').removeClass('form-inline');
                

            } else {
                jQuery('#divuserdetails').hide();
                jQuery('#divuserdetails').empty();
            }
        } else {
            _General.noData(jQuery('#divuserdetails'), "No Data Found");
        }
    },

    AddUserDetailsLoadCompleted: function (response) {
       
        if (response.status === "SUCCESS") {
            
            jQuery('#divuserId').hide();
            var errmsg = response.data.message;
            var msg = errmsg.split(".");
            swal(msg[0], msg[1], "success");
            jQuery("#mediumModal .close").click();
            
        }
        else {

            swal(response.responseMsg, "", "error");
        }
        _userDetails.UserDetailsTableFill();
    },
    AddUserDetailssLoadCompleted:function(response) {
        
    },
    UserTypeFill: function () {
       
        var UserTypeFillData = {

            "typeId": 2//hard-coded for branch list
        };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/usertypeslist", UserTypeFillData,_userDetails.UserTypeLoadCompleted, userdata.token)
    },
    UserDetailsTableFill: function () {
        
        _http.get(MFPUBLICCUSTOMERAPI_URL + "api/layers/branchuserslist", _userDetails.UserDetailsTableCompleted, userdata.token)
    },
    BranchFill: function () {
       
        var ddlUserTypeId = jQuery('#ddlUserType').val();

        var LayerId;
         jQuery.each(branchList, function (i, val) {
             if (ddlUserTypeId== val.typeId) {
                 LayerId = val.layerId
             }
         });
      
        var BranchFillData = {

            //"layerId": 6//hard-coded for branch list
            "layerId": LayerId //comez from ddlUserType corresponding layerid
        };

         _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/layerdetails", BranchFillData, _userDetails.BranchLoadCompleted, userdata.token)
    },


    AddUserDetailsSubmit: function () {
       
      
     
        var AddUserDetailsSubmitData = {
            "userId": userDetailsId,//0-add new,1- existing userId
            "userName": jQuery('#userName').val(),
            "userType": jQuery('#ddlUserType').val(),
            "branchId": jQuery('#ddlBranch').val(),
            "mobileNo": jQuery('#mobile').val(),
            "emailId": jQuery('#txtemail').val(),
            "statusId": 1 //hardcoded as 1 for adding new
           

        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/users", AddUserDetailsSubmitData, _userDetails.AddUserDetailsLoadCompleted, userdata.token)
    },

    Edit: function (userIdget) {
        
        jQuery.each(branchUsersListData, function (i, val) {
            
            if (userIdget == val.userId) {
                jQuery('#divuserId').show();
                jQuery('#userId').val(val.userId);
                jQuery('#userName').val(val.userName);
                jQuery('#ddlUserType').val(val.userTypeId);
                jQuery('#ddlBranch').val(val.branchId);
                jQuery('#mobile').val(val.mobile);
                jQuery('#txtemail').val(val.emailId);
                userDetailsId = val.userId;
            }
        });
        _userDetails.changePopupHeader(0);
    },
    toggleChecks: function (responseUserId) {
        
        swal({
            title: "Are you sure?",
            text: "Do You Want To Change the Active Status!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, Change it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {

                    jQuery.each(branchUsersListData, function (i, val) {
                        
                        if (val.userId == responseUserId) {
                            
                            if (val.statusId == 1) {
                                toggleStatus = 0;
                            }
                            else {
                                toggleStatus = 1;
                            }

                            AddUserDetailsSubmits.userId = responseUserId;
                            AddUserDetailsSubmits.userName = val.userName;
                            AddUserDetailsSubmits.userType = val.userTypeId;
                            AddUserDetailsSubmits.branchId = val.branchId;
                            AddUserDetailsSubmits.mobileNo = val.mobile;
                            AddUserDetailsSubmits.emailId = val.emailId;
                            AddUserDetailsSubmits.statusId = toggleStatus;


                        }
                    });
                    _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/users", AddUserDetailsSubmits, _userDetails.AddUserDetailssLoadCompleted, userdata.token)
                    swal("Changed!", "", "success");
                    setTimeout(function () {
                        //jQuery('#divoperationalsublevel').empty();
                        _userDetails.UserDetailsTableFill();
                        
                    }, 2000);
                }
                else {

                    swal("Cancelled", "", "error");

                    setTimeout(function () {
                        //jQuery('#divoperationalsublevel').empty();
                        _userDetails.UserDetailsTableFill();
                    }, 2000);

                }
            });
        

    },

    clearForm: function () {
        
        jQuery('#divuserId').hide();
        jQuery("#frmUserDetails")[0].reset();
        var validator = jQuery("#frmUserDetails").validate();
        userDetailsId = "0";
        validator.resetForm();
    },

    changePopupHeader: function (type) {
        
        if (type == 1) {
            jQuery('#mediumModalLabel').text('Add User ');
        }
        else {
            jQuery('#mediumModalLabel').text('Edit User ');
        }
    }

}


_userDetails.UserDetailsTableFill();
_userDetails.UserTypeFill();



jQuery(document).ready(function ($) {

    jQuery('#maincard').hide();
    jQuery('.error').addClass("error-msg");
   
    jQuery("#ddlUserType").on("change", function (e) {
        _userDetails.BranchFill();
    });
    
});