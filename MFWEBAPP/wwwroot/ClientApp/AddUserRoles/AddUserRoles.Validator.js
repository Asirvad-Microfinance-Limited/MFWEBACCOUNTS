
jQuery.validator.addMethod("Namevalid", function (value, element) {
    return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
}, "Please Enter Valid Name");


jQuery("#frmUserRole").validate({

    rules: {
        
        roleName: {
            required: true,
            Namevalid: true,
        }
    },
    messages:
    {
       
        roleName: {
            required: "Please Enter Role Name"

        }
    },

    submitHandler: function (form) {

        _userRoles.AddUserRoleDetailsSubmitData();

    }
});
