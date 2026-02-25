jQuery("#frmResetPassword").validate({

    rules: {


        txtUserID: {
            required: true,
            maxlength: 6,
            minlength: 1,
            number: true
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
      
        txtnewPass: {
            required: "Please Enter New Password"

        },
       

    },

    submitHandler: function (form) {
        debugger;
        _resetPassword.resetpasswordSubmit();

    }
});