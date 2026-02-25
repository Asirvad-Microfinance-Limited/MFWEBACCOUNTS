
jQuery.validator.addMethod('ddlAccessLevel', function (value, element) {

    return (value != '-1');
}, 'Please Select Access Level');
jQuery.validator.addMethod('ddlDefaultRole', function (value, element) {

    return (value != '-1');
}, 'Please Select Default Role ');

jQuery.validator.addMethod("Namevalid", function (value, element) {
    //return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
    return this.optional(element) || /^[a-zA-Z0-9\s]+$/i.test(value);
}, "Please enter valid name");

jQuery("#frmUserType").validate({

    rules: {


        ddlAccessLevel: {
            required: true,
            ddlAccessLevel: true
        },
        ddlDefaultRole: {
            required: true,
            ddlDefaultRole: true
        },
        userType: {
            required: true,
            Namevalid: true,
            maxlength: 25
        }


    },
    messages:
    {
        userType: {
            required: "Please Enter User Type"

        }
    },

    submitHandler: function (form) {

        _userTypeDetails.AddUserTypeDetailsSubmit();

    }
});
