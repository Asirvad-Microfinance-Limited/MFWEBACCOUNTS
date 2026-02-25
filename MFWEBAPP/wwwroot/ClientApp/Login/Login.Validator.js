//$.validator.addMethod('OrganizationIsRequired', function (value, element) {

//    return (value != '0');
//}, 'Please select organization.');

//$.validator.addMethod("validatephonenumber", function (value, element) {
//    return this.optional(element) || /^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/.test(value);
//}, "Please enter valid mobile number");

jQuery("#login").validate({

    rules: {


        userid: {
            required: true,
            maxlength: 12,
            minlength: 1,
            number: true
        },
        password: {
            required: true,
            maxlength: 16
        },


    },
    messages:
    {


        userid: {
            required: "Please Enter User ID",
            maxlength: "Employee ID Should Be Maximum 6 Characters",
            minlength: "Employee ID Should Be Minimum 5 Characters",
            number: "Please Enter Valid User ID"
        },
        password: {
            required: "Please Enter Password"
        }
    },


    submitHandler: function (form) {
        _login.Login();
    }
});



