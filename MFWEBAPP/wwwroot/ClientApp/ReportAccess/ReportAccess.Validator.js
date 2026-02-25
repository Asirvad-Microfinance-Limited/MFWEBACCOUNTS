jQuery.validator.addMethod('ddlReportName', function (value, element) {

    return (value != '0');
}, 'Please Select Report Name');

jQuery("#frmReportAccess").validate({

    rules: {


        txtUserID: {
            required: true,
            maxlength: 6,
            minlength: 1,
            number: true
        },
        txtUserName: {
            required: true,

        },
        ddlReportName: {
            required: true,
            ddlReportName: true

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
        txtUserName: {
            required: "Please Enter User Name"

        },
       
    },

    submitHandler: function (form) {

        _ReportAccess.ReportAssignSubmit();

    }
});