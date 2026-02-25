jQuery.validator.addMethod("validatephonenumber", function (value, element) {
    return this.optional(element) || /^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/.test(value);
}, "Please Enter Valid Mobile Number");
jQuery("#forgetPassword").validate({

    rules: {


        txtUserID: {
            required: true,
            maxlength: 12,
            minlength: 1,
            number: true
        },
      
        mobileNo: {
            required: true,
            validatephonenumber: true,
        },

        otp: {
            required: true
        },
        txtnewPass: {
            required: true,

        },


    },
    messages:
    {


        txtUserID: {
            required: "Please Enter User ID",
            maxlength: "Employee ID Should Be Maximum 6 Characters",
            minlength: "Employee ID Should Be Minimum 5 Characters",
            number: "Please Enter Valid User ID"
        },
        mobileNo: {
            required: "Please Enter Mobile Number"
        },
        otp: {
            required: "Please Enter OTP"
        },
        txtnewPass: {
            required: "Please Enter New Password"

        },
    },


    submitHandler: function (form) {
        
        _forgetPassword.mobileOTPDetails();
      
    }
});