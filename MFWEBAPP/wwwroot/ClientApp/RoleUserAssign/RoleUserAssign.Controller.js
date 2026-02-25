var statusval;
var statflag;
var headerflag=0;
var a = 0;
var _roleUserAssign = {
    RoleFillLoadCompleted: function (response) {
       
        console.log(response.data.rolesList);


        if (response.status === "SUCCESS") {
           

            if (response.data.rolesList.length > 0) {

                jQuery("#ddlRole").empty();
                jQuery("#ddlRole").append(jQuery("<option></option>").val("0").text("----------- Choose Role -----------"));
                jQuery.each(response.data.rolesList, function (i, val) {
                    jQuery("#ddlRole").append(jQuery("<option></option>").val(val.roleId).text(val.roleName));
                });
            }
            else {
                jQuery("#ddlRole").empty();
                jQuery("#ddlRole").append(jQuery("<option></option>").val("0").text("----------- Choose Role -----------"));
            }

        }
        else {

            jQuery("#ddlRole").empty();
            jQuery("#ddlRole").append(jQuery("<option></option>").val("0").text(" ----------- Choose Role -----------"));
        }

    },
    BindRoleAssignLoadCompleted: function (response) {
        
        jQuery('#maincard').show();

        console.log(response.data.rolesDetailsList);


        if (response.status === "SUCCESS") {
            
            a = 0;
            if (response.data.rolesDetailsList.length > 0) {
                statflag = 0;
                rolesDetailsList = response['data']['rolesDetailsList'];

                //RoleAssignStatusData = [];
                jQuery('#divroleassign').empty();
                var $table = jQuery('<table class="table" id="tblroleassign">');

                $table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:left;">Form Name</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.rolesDetailsList, function (i, val) {
                   
                   

                    if (val.statusId == 1) {
                       
                        a += 1;
                        statflag = 1;
                        //RoleAssignStatusData.push(val.statusId);
                        var $row = jQuery('<tr/>');

                        $row.append(jQuery('<td align="center">').html(a));
                        $row.append(jQuery('<td align="left">').html(val.displayName));
                        //$row.append(jQuery('<td align="center">').html('<input type="checkbox" id="prdtcheck" name="prdtcheck" />'));

                        $tbody.append($row);

                       

                    }

                  

                    });
            
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');

                if (statflag == 1) {

                    
                    jQuery("#btnAssign").prop("disabled", false);
                    jQuery("#btnRmv").prop("disabled", false);
                    jQuery('#divroleuserassign').html($table);

                }
                else {

                    _General.noData(jQuery('#divroleuserassign'), "No Menus Are Assigned To This Role Till Now!");
                    jQuery("#btnAssign").prop("disabled", true);
                    jQuery("#btnRmv").prop("disabled", true);


                }
                
           
            } else {
                jQuery('#divroleuserassign').hide();
                jQuery('#divroleuserassign').empty();
            }

        }
        else {
            _General.noData(jQuery('#divroleuserassign'), "No Data Found");

        }
    },
    UserFillLoadCompleted: function (response) {
    


        if (response.status === "SUCCESS") {
           

            if (response.data.branchUsersListData.length > 0) {

                jQuery("#ddluserName").empty();
                jQuery("#ddluserName").append(jQuery("<option></option>").val("0").text("----------- Choose User -----------"));
                jQuery.each(response.data.branchUsersListData, function (i, val) {
                    jQuery("#ddluserName").append(jQuery("<option></option>").val(val.userId).text(val.userId + ' - ' + val.userName));
                });
            }
            else {
                jQuery("#ddluserName").empty();
                jQuery("#ddluserName").append(jQuery("<option></option>").val("0").text("----------- Choose User -----------"));
            }

        }
        else {

            jQuery("#ddluserName").empty();
            jQuery("#ddluserName").append(jQuery("<option></option>").val("0").text(" ----------- Choose User -----------"));
        }

    },
    
        AssRemRoleCompleted: function(response) {
        


        if (response.status === "SUCCESS") {
           

            //swal(response.responseMsg, "", "success");
            swal(response.data.message, "", "success");

        }
        else {
            //swal(response.responseMsg, "", "error");
            swal(response.data.message, "", "error");
            }
            jQuery("#ddlRole").val(0);
            _roleUserAssign.RoleDetailsFill();
            _roleUserAssign.UserDetailsFill();
            if (jQuery("#ddlRole").val() == 0) {
               
                _General.noData(jQuery('#divroleuserassign'), "No Data Found");

            }
            else {
                _roleUserAssign.RoleDetailsTableFill();

            }


    },

    RoleDetailsFill: function () {
        
        var RoleDetailsFillData = {
            "typeId": 2 // 2 for display user roles in dropdownlist
        };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/roleslist", RoleDetailsFillData, _roleUserAssign.RoleFillLoadCompleted, userdata.token)
    },
    RoleDetailsTableFill: async function () {
        
        roleId = jQuery("#ddlRole").val();
        var RoleDetailsTableFillData = {
            "roleId": roleId // 2 for display user roles in dropdownlist
        };
        
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/menuslist", RoleDetailsTableFillData, _roleUserAssign.BindRoleAssignLoadCompleted, userdata.token)

    },
    
    UserDetailsFill: function () {
        
       

        _http.get(MFPUBLICCUSTOMERAPI_URL + "api/layers/branchuserslist", _roleUserAssign.UserFillLoadCompleted, userdata.token)
    },
    AssRemRole: async function (statusval) {
       
        roleId = jQuery("#ddlRole").val();
        userId = jQuery("#ddluserName").val();
        assignedBy = userdata.userId;
        var AssRemRoleData = {

            "roleId": roleId, // 2 for display user roles in dropdownlist
            "userId": userId,
            "assignedBy": assignedBy,
            "statusId":statusval
        };
       
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/assignroles", AssRemRoleData, _roleUserAssign.AssRemRoleCompleted, userdata.token)

        var validator = jQuery("#frmRoleUserAssign").validate();
        validator.destroy();
    }
    
};
_roleUserAssign.RoleDetailsFill();
_roleUserAssign.UserDetailsFill();


jQuery(document).ready(function ($) {

    jQuery('.error').addClass("error-msg");
    jQuery('#maincard').hide();
    jQuery("#ddlRole").change(function (e) {
      
        _roleUserAssign.RoleDetailsTableFill();

    });
   
   

    jQuery("#btnAssign").click(function () {
     
    jQuery.validator.addMethod('ddlRole', function (value, element) {

        return (value != '0');
    }, 'Please Select Role');
    jQuery.validator.addMethod('ddluserName', function (value, element) {

        return (value != '0');
    }, 'Please Select User');

    jQuery("#frmRoleUserAssign").validate({

        rules: {


            ddlRole: {
                required: true,
                ddlRole: true
            },
            ddluserName: {
                required: true,
                ddluserName: true
            }



        },
        messages:
        {


        },


        submitHandler: function (form) {
           

            _roleUserAssign.AssRemRole(1);

        }
    });
    });

    jQuery("#btnRmv").click(function () {
        
        jQuery.validator.addMethod('ddlRole', function (value, element) {

            return (value != '0');
        }, 'Please Select Role');
        jQuery.validator.addMethod('ddluserName', function (value, element) {

            return (value != '0');
        }, 'Please Select User');

        jQuery("#frmRoleUserAssign").validate({

            rules: {


                ddlRole: {
                    required: true,
                    ddlRole: true
                },
                ddluserName: {
                    required: true,
                    ddluserName: true
                }



            },
            messages:
            {


            },


            submitHandler: function (form) {
                

                _roleUserAssign.AssRemRole(0);

            }
        });
    });

   
   });