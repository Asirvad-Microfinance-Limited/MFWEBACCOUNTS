jQuery("#frmChangePassword").validate({

    rules: {


        txtUserID: {
            required: true,
            maxlength: 6,
            minlength: 1,
            number: true
        },
        txtoldPass: {
            required: true,

        },
        txtnewPass: {
            required: true,

        },

        txtConfirmPass: {
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
        txtoldPass: {

            required: "Please Enter Old Password"

        },
        txtnewPass: {
            required: "Please Enter New Password"

        },
        txtConfirmPass: {
            required: "Please Enter Confirm Password"

        },

    },

    submitHandler: function (form) {
      
        _changePassword.changepasswordSubmit();

    }
});