
jQuery.validator.addMethod('ddlUserType', function (value, element) {

    return (value != '0');
}, 'Please Select User Type');
jQuery.validator.addMethod('ddlBranch', function (value, element) {

    return (value != '0');
}, 'Please Select Access Level ');
jQuery.validator.addMethod("Namevalid", function (value, element) {
    return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
    //return this.optional(element) || /^[a-zA-Z0-9\s]+$/i.test(value);
}, "Please enter valid name");
jQuery.validator.addMethod("validatephonenumber", function (value, element) {
    return this.optional(element) || /^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/.test(value);
}, "Please Enter Valid Mobile Number");
//jQuery.validator.addMethod("validateemailid", function (value, element) {
//    //return this.optional(element) || /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
//    return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
//}, "Please Enter Valid E-mail ID");
jQuery.validator.addMethod("emailvalid", function (value, element) {
    return this.optional(element) || /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i.test(value);
}, "Please Enter Valid E-mail ID");
jQuery("#frmUserDetails").validate({

    rules: {


        ddlUserType: {
            required: true,
            ddlUserType: true
        },
        ddlBranch: {
            required: true,
            ddlBranch: true
        },
        userId: {
            required: true

        },
        userName: {
            required: true,
            Namevalid: true,
            maxlength: 25
        },
        mobile: {
            required: true,
            validatephonenumber: true

        },

        txtemail: {
            required: true,
            emailvalid: true, 
        }
    },
    messages:
    {
        userId: {
            required: "Please Enter User Id"

        },
        userName: {
            required: "Please Enter User Name"

        },
        mobile: {
            required: "Please Enter Mobile Number"

        },
        txtemail: {
            required: "Please Enter E-mail ID"

        }
    },

    submitHandler: function (form) {

        _userDetails.AddUserDetailsSubmit();

    }
});
