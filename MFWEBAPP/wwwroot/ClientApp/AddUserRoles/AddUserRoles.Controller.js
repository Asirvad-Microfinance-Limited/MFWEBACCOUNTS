
var AddUserRoleDetailsSubmitDatas = {
    "userId": 0,
    "roleName": "string",
    "roleId": 0,
    "statusId": 0
}
var rolesList = new Array();
var userRoleId;
var _userRoles = {
    UserRoleTableLoadCompleted: function (response) {
      
        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {
           
            if (response.data.rolesList.length > 0) {
              
           
                jQuery('#divuserroledetails').empty();
                var $table = jQuery('<table class="table" id="tblUserrolesList" >');

                $table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:left;">Role Name</th>><th style="text-align:center;">Status</th><th style="text-align:center;">Edit</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.rolesList, function (i, val) {

                    rolesList = response['data']['rolesList'];
                    var $row = jQuery('<tr/>');  
                    $row.append(jQuery('<td align="center">').html(i + 1));
                  //  $row.append(jQuery('<td/>').html(val.roleId));
                    $row.append(jQuery('<td align="left">').html(val.roleName));
                
                    if (val.statusId == 1) {
                        $row.append(jQuery('<td align="center">').html('<label class="switch"> <input type="checkbox" onchange="_userRoles.toggleChecks(' + val.roleId + ');" checked> <span class="slider round"></span> </label>'));
                    }
                    else {
                        $row.append(jQuery('<td align="center">').html('<label class="switch" > <input type="checkbox" onchange="_userRoles.toggleChecks(' + val.roleId + ');"  id="status' + i + '" name="status' + i + '" > <span class="slider round"></span> </label>'));
                    }

                    $row.append(jQuery('<td align="center">').html('<button type="button" data-target="#mediumModal" data-toggle="modal" onClick="_userRoles.Edit(' + val.roleId + ');" class="btnsmall btn-danger fc-center"> <i class="fa fa-pencil"></i></button> '));
                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divuserroledetails').html($table);



            } else {
                jQuery('#divuserroledetails').hide();
                jQuery('#divuserroledetails').empty();
            }
        } else {
            _General.noData(jQuery('#divuserroledetails'), "No Data Found");
        }
    },

    AddUserRoleLoadCompleted: function (response) {
       
        if (response.status === "SUCCESS") {
          

            var errmsg = response.data.message;
            var msg = errmsg.split(".");
            swal(msg[0], msg[1], "success");
            jQuery("#mediumModal .close").click();
        }
        else {
            
                swal(response.responseMsg, "", "error");
            
            
        }
        _userRoles.UserRoleFill();
    },
    AddUserRoledetailsToggleSubmitCompleted: function (response) {
      
    },
    UserRoleFill: function () {
     
        var AddUserRoleDetailsTableData = {
            "typeId": 1 // 1 for display user roles
        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/roleslist", AddUserRoleDetailsTableData, _userRoles.UserRoleTableLoadCompleted, userdata.token)
    },

    AddUserRoleDetailsSubmitData: function () {
     

        var userId = userdata.userId;
        var AddUserRoleDetailsSubmitData = {
            "userId": userId,
            "roleName": jQuery('#roleName').val(),
            "roleId": userRoleId, //0-add new, else- existing userRoleId
            "statusId": 1 //hardcoded as 1 for adding new

        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/userroles", AddUserRoleDetailsSubmitData, _userRoles.AddUserRoleLoadCompleted, userdata.token)
    },

    Edit: function (userRoleIdval) {
       
        jQuery.each(rolesList, function (i, val) {
          
            if (userRoleIdval == val.roleId) {
              
                jQuery('#roleName').val(val.roleName);
                userRoleId = val.roleId;
            }
        });
        _userRoles.changePopupHeader(0);
    },

    toggleChecks: function (responsetype) {
     
        var userId = userdata.userId;
     
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

                  
                    jQuery.each(rolesList, function (i, val) {
                    
                        if (val.roleId == responsetype) {
                         
                            if (val.statusId == 1) {
                                toggleStatus = 0;
                            }
                            else {
                                toggleStatus = 1;
                            }
                          
                            AddUserRoleDetailsSubmitDatas.userId = userId;
                            AddUserRoleDetailsSubmitDatas.roleName = val.roleName;
                            AddUserRoleDetailsSubmitDatas.roleId = responsetype;
                            AddUserRoleDetailsSubmitDatas.statusId = toggleStatus;
                         
                        }
                    });

                    _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/userroles", AddUserRoleDetailsSubmitDatas, _userRoles.AddUserRoledetailsToggleSubmitCompleted, userdata.token)
                    swal("Changed!", "", "success");
                    setTimeout(function () {


                    _userRoles.UserRoleFill();
                    }, 1500);

                }
                else {

                    swal("Cancelled", "", "error");

                    setTimeout(function () {

                        _userRoles.UserRoleFill();
                    }, 1500);

                }

            });
     
    },
    clearForm: function () {
       
        jQuery("#frmUserRole")[0].reset();
        var validator = jQuery("#frmUserRole").validate();
        userRoleId = "0";
        validator.resetForm();
    },
     changePopupHeader: function (type) {
     
         if (type == 1) {
             jQuery('#mediumModalLabel').text('Add User Role ');
            
         }
         else
         {
             jQuery('#mediumModalLabel').text('Edit User Role');
         }

        

         
    }
};

_userRoles.UserRoleFill();

jQuery(document).ready(function ($) {

    jQuery('#maincard').hide();
    jQuery('.error').addClass("error-msg");

});