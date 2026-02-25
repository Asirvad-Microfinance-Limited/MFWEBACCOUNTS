var userTypeDetailsId;
var userTypesList = new Array();
var AddUserTypeDetailsSubmitDatas = {
    "userTypeId": 0,
    "userType": "",
    "layerId": 0,
    "roleId": 0,
    "statusId": 0,
    "userId": 0

};
var _userTypeDetails = {
   
    UserTypeAccessLevelLoadCompleted: function (response) {
       
        //console.log(response.data.layersListData);

        if (response.status === "SUCCESS") {
       

            if (response.data.layersListData.length > 0) {
             
                jQuery("#ddlAccessLevel").empty();
                jQuery("#ddlAccessLevel").append(jQuery("<option></option>").val("-1").text("----------- Choose Access Level -----------"));
                jQuery.each(response.data.layersListData, function (i, val) {
                    jQuery("#ddlAccessLevel").append(jQuery("<option></option>").val(val.layerId).text(val.displayName));
                });
            }
            else {
                jQuery("#ddlAccessLevel").empty();
                jQuery("#ddlAccessLevel").append(jQuery("<option></option>").val("-1").text("----------- Choose Access Level -----------"));
            }

        }
        else {

            jQuery("#ddlAccessLevel").empty();
            jQuery("#ddlAccessLevel").append(jQuery("<option></option>").val("-1").text("----------- Choose Access Level -----------"));
        }

    },

    UserTypeDefaultRoleLoadCompleted: function (response) {
       
       // console.log(response.data.rolesList);


        if (response.status === "SUCCESS") {


            if (response.data.rolesList.length > 0) {

                jQuery("#ddlDefaultRole").empty();
                jQuery("#ddlDefaultRole").append(jQuery("<option></option>").val("-1").text("----------- Choose Default Role -----------"));
                jQuery.each(response.data.rolesList, function (i, val) {
                    jQuery("#ddlDefaultRole").append(jQuery("<option></option>").val(val.roleId).text(val.roleName));
                });
            }
            else {
                jQuery("#ddlDefaultRole").empty();
                jQuery("#ddlDefaultRole").append(jQuery("<option></option>").val("-1").text("----------- Choose Default Role -----------"));
            }

        }
        else {

            jQuery("#ddlDefaultRole").empty();
            jQuery("#ddlDefaultRole").append(jQuery("<option></option>").val("-1").text("----------- Choose Default Role -----------"));
        }

    },
    UserTypeTableLoadCompleted: function (response) {
     
        jQuery('#maincard').show();

        //console.log(response.data.layerDetailsData);

        if (response.status === "SUCCESS") {
           
            if (response.data.userTypesList.length > 0) {
                userTypesList = response['data']['userTypesList'];
                jQuery('#divusertypedetails').empty();
                var $table = jQuery('<table class="table" id="tblUserTypesList">');

                $table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:left;">User Type</th><th style="text-align:left;">Access Level</th>><th style="text-align:center;">Status</th><th style="text-align:center;">Edit</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.userTypesList, function (i, val) {
                    if (val.statusId != 9) {
                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="left">').html(val.typeName));
                    $row.append(jQuery('<td align="left">').html(val.displayName));
                    if (val.statusId == 1) {
                        $row.append(jQuery('<td align="center">').html('<label class="switch"> <input type="checkbox" onchange="_userTypeDetails.toggleChecks(' + val.typeId + ');" checked> <span class="slider round"></span> </label>'));
                    }
                    else {
                        $row.append(jQuery('<td align="center">').html('<label class="switch" > <input type="checkbox" onchange="_userTypeDetails.toggleChecks(' + val.typeId + ');"  id="status' + i + '" name="status' + i + '" > <span class="slider round"></span> </label>'));
                    }
                    $row.append(jQuery('<td align="center">').html('<button type="button"  data-target="#mediumModal" data-toggle="modal" onClick="_userTypeDetails.Edit(' + val.typeId + ')" class="btnsmall  btn-danger fc-center"> <i class="fa fa-pencil"></i></button> '));
                    $tbody.append($row);
                    }
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divusertypedetails').html($table);



            } else {
                jQuery('#divusertypedetails').hide();
                jQuery('#divusertypedetails').empty();
            }
        } else {
            _General.noData(jQuery('#divusertypedetails'), "No Data Found");
        }
    },
    AddUserTypedetailsToggleSubmitCompleted: function (response) {
     
    },
    AddUserTypeDetailsLoadCompleted: function (response) {
      
        if (response.status === "SUCCESS") {
      
                      
            jQuery("#mediumModal .close").click();
            swal(response.responseMsg, "", "success");

        }
        else {
           
                swal(response.responseMsg, "", "error");
            
            
        }
        _userTypeDetails.UserTypeTableFill();
    },
    toggleChecks: function (responsetype) {
      
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

                    var userId = userdata.userId;
                    jQuery.each(userTypesList, function (i, val) {
                     
                        if (val.typeId == responsetype) {
                          
                            if (val.statusId == 1) {
                                toggleStatus = 0;
                            }
                            else {
                                toggleStatus = 1;
                            }

                            AddUserTypeDetailsSubmitDatas.userTypeId = responsetype;
                            AddUserTypeDetailsSubmitDatas.userType = val.typeName;
                            AddUserTypeDetailsSubmitDatas.layerId = val.layerId;
                            AddUserTypeDetailsSubmitDatas.roleId = val.roleId;
                            AddUserTypeDetailsSubmitDatas.statusId = toggleStatus;
                            AddUserTypeDetailsSubmitDatas.userId = userId;
                        }
                    });

                    _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/addusertypes", AddUserTypeDetailsSubmitDatas, _userTypeDetails.AddUserTypedetailsToggleSubmitCompleted, userdata.token)
                    swal("Changed!", "", "success");
                    setTimeout(function () {
                        
                        _userTypeDetails.UserTypeTableFill();

                    }, 1500);

                }
                else {

                    swal("Cancelled", "", "error");

                    setTimeout(function () {
                       
                        _userTypeDetails.UserTypeTableFill();
                    }, 1500);

                }

            });
        ////var layerId = jQuery('#ddlAccessLevel').val();
        ////var defaultRole = jQuery('#ddlDefaultRole').val();


    },
    UserTypeAccessLevelFill: function () {
      
        var UserTypeAccessLevelFillData = {

            "typeId": 2    //for usertypedetails
        };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/layerslist", UserTypeAccessLevelFillData, _userTypeDetails.UserTypeAccessLevelLoadCompleted, userdata.token)
    },
    UserTypeDefaultRoleFill: function () {
     
        var UserRoleDetailsTableData = {
            "typeId": 2 // 2 for display user roles in dropdownlist
        };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/roleslist", UserRoleDetailsTableData, _userTypeDetails.UserTypeDefaultRoleLoadCompleted, userdata.token)
    },
    UserTypeTableFill: function () {
      
        var UserTypeTableFillData = {

            "typeId": 1//hard-coded for branch list
        };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/usertypeslist", UserTypeTableFillData, _userTypeDetails.UserTypeTableLoadCompleted, userdata.token)
    },
    AddUserTypeDetailsSubmit: function () {
      
        var layerId = jQuery('#ddlAccessLevel').val();
        var defaultRole = jQuery('#ddlDefaultRole').val();
        var userId = userdata.userId;
        var AddUserTypeDetailsSubmitData = {
            "userTypeId": userTypeDetailsId,//0-add new, else- existing userTypeId
            "userType": jQuery('#userType').val(),
            "layerId": layerId,
            "roleId": defaultRole,
            "statusId": 1,//hardcoded as 1 for adding new
            "userId": userId

        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/addusertypes", AddUserTypeDetailsSubmitData, _userTypeDetails.AddUserTypeDetailsLoadCompleted, userdata.token)
    },

    Edit: function (userTypeId) {
      
        jQuery.each(userTypesList, function (i, val) {
      
            if (userTypeId == val.typeId) {
             
                 jQuery('#userType').val(val.typeName);
                 jQuery('#ddlAccessLevel').val(val.layerId);
                jQuery('#ddlDefaultRole').val(val.roleId);
                userTypeDetailsId = val.typeId;
             }
         });
        _userTypeDetails.changePopupHeader(0);
    },
    clearForm: function () {
      
        jQuery("#frmUserType")[0].reset();
        var validator = jQuery("#frmUserType").validate();
        userTypeDetailsId = "0";
        validator.resetForm();
    },
    changePopupHeader: function (type) {
     
        if (type == 1) {
            jQuery('#mediumModalLabel').text('Add User Type ');
        }
        else {
            jQuery('#mediumModalLabel').text('Edit User Type');
        }
    }
}

_userTypeDetails.UserTypeTableFill();
_userTypeDetails.UserTypeAccessLevelFill();
_userTypeDetails.UserTypeDefaultRoleFill();


jQuery(document).ready(function ($) {

    jQuery('#maincard').hide();
    jQuery('.error').addClass("error-msg");
    
});