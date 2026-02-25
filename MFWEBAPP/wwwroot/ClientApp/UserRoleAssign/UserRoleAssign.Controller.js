var rolesList = {
    "formId": 0,
    "statusId": 0
};
var RoleAssignData = new Array();
var rolesDetailsList = new Array();
//var RoleAssignStatusData = new Array();

var roledtl = [];
var _userRoleAssign = {
    RoleFillLoadCompleted: function (response) {
       
       

        if (response.status === "SUCCESS") {
           

            if (response.data.rolesList.length > 0) {

                jQuery("#ddlRole").empty();
                jQuery("#ddlRole").append(jQuery("<option></option>").val("0").text(" --- Choose Role --- "));
                jQuery.each(response.data.rolesList, function (i, val) {
                    jQuery("#ddlRole").append(jQuery("<option></option>").val(val.roleId).text(val.roleName));
                });
            }
            else {
                jQuery("#ddlRole").empty();
                jQuery("#ddlRole").append(jQuery("<option></option>").val("0").text(" --- Choose Role --- "));
            }

        }
        else {

            jQuery("#ddlRole").empty();
            jQuery("#ddlRole").append(jQuery("<option></option>").val("0").text(" --- Choose Role --- "));
        }

    },

    BindRoleAssignLoadCompleted: function (response) {
       
        jQuery('#maincard').show();

       

        if (response.status === "SUCCESS") {
           
            if (response.data.rolesDetailsList.length > 0) {
              
                rolesDetailsList = response['data']['rolesDetailsList'];

                //RoleAssignStatusData = [];
                jQuery('#divroleassign').empty();
                var $table = jQuery('<table class="table" id="tblroleassign">');

                $table.append
                    ('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:left;">Form Name</th><th style="text-align:center;">Select</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.rolesDetailsList, function (i, val) {
                    //RoleAssignStatusData.push(val.statusId);
                    var $row = jQuery('<tr/>');

                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="left">').html(val.displayName));
                    //$row.append(jQuery('<td align="center">').html('<input type="checkbox" id="prdtcheck" name="prdtcheck" />'));
                    if (val.statusId == 1) {
                        $row.append(jQuery('<td align="center">').html('<label class="switch"> <input type="checkbox" onchange="_userRoleAssign.toggleChecks(' + val.menuId + ');" checked> <span class="slider round"></span> </label>'));
                    }
                    else {
                        $row.append(jQuery('<td align="center">').html('<label class="switch" > <input type="checkbox" onchange="_userRoleAssign.toggleChecks(' + val.menuId + ');"  id="status' + i + '" name="status' + i + '" > <span class="slider round"></span> </label>'));
                    }
                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divroleassign').html($table);



            } else {
                jQuery('#divroleassign').hide();
                jQuery('#divroleassign').empty();
            }
        } else {
            _General.noData(jQuery('#divroleassign'), "No Data Found");

        }
    },
    RoleAssignSubmitLoadCompleted: function (response) {
        
        if (response.status === "SUCCESS") {
           
            swal(response.data.message, "", "success");
            RoleAssignData = [];
        }
        else {
            swal(response.data.message, "", "error");
            RoleAssignData = [];
        }
       
        _userRoleAssign.RoleDetailsTableFill();
    },

    RoleDetailsFill: function () {
        
        var RoleDetailsFillData = {
            "typeId": 2 // 2 for display user roles in dropdownlist
        };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/roleslist", RoleDetailsFillData, _userRoleAssign.RoleFillLoadCompleted, userdata.token)
    },
    RoleDetailsTableFill: async function () {
        roleId = jQuery("#ddlRole").val();
        var RoleDetailsTableFillData = {
            "roleId": roleId // 2 for display user roles in dropdownlist
        };
        
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/menuslist", RoleDetailsTableFillData, _userRoleAssign.BindRoleAssignLoadCompleted, userdata.token)

    },
    
    toggleChecks: function (responsetype) {
        
        RoleAssignData.push(responsetype);
       
    },

    RoleDetailsSubmit: function() {
        var userId = userdata.userId;
        jQuery.each(rolesDetailsList, function (i, val) {
           
            if (RoleAssignData.length == 0) {
                
                swal("", "Please Select A Form And  On/Off The Toggle Button", "");
            }
            for (i = 0; i < RoleAssignData.length; i++) {
                
                if (val.menuId == RoleAssignData[i]) {
                
                    if (val.statusId == 0) {
                        
                        toggleStatus = 1;
                    }
                    else if (val.statusId == 1)
                    {
                       
                        toggleStatus = 0;

                    }
                    else {
                        
                        toggleStatus = 0;
                    }
                    rolesList.formId = RoleAssignData[i];
                    rolesList.statusId =toggleStatus;
                    roledtl.push(rolesList);
                    rolesList = {};

                }
            }
        });
 
       // console.log(roledtl);
       
        var RoleDetailsFillData = {
            "userId": userId,
            "roleId": jQuery("#ddlRole").val(),
            "rolesList": roledtl
        };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/assignuserroles", RoleDetailsFillData, _userRoleAssign.RoleAssignSubmitLoadCompleted, userdata.token)
}

};

_userRoleAssign.RoleDetailsFill();
jQuery(document).ready(function ($) {

    
    jQuery('.error').addClass("error-msg");
    jQuery('#maincard').hide();


    jQuery("#ddlRole").change(function (e) {
     

        _userRoleAssign.RoleDetailsTableFill();

    });

});