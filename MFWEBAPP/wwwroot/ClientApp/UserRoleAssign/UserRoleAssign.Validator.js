
jQuery.validator.addMethod('ddlRole', function (value, element) {

    return (value != '0');
}, 'Please Select Role');

jQuery("#frmRoleAssign").validate({

    rules: {


        ddlRole: {
            required: true,
            ddlRole: true
        },
       


    },
    messages:
    {


        //deliveryAddress: {
        //    required: "Please Enter Address"

        //},
        //vehicleNo: {
        //    required: "Please Enter Vehicle Number"
        //},
        //referenceNo: {
        //    required: "Please Enter Reference Number"
        //}
    },


    submitHandler: function (form) {
        
        _userRoleAssign.RoleDetailsSubmit();


    }
});



