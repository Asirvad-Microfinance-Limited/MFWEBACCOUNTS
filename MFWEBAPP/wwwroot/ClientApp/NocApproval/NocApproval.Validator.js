
jQuery.validator.addMethod('ddlCenters', function (value, element) {

    return (value != '0');
}, 'Please Select Center');

jQuery("#NocApproval").validate({

    rules: {

        ddlCenters: {
            required: true,
            ddlCenters: true
        },


    },
    messages:
    {


        //userid: {
        //    required: "Please Enter Branches"

        //},
        //password: {
        //    required: "Please Enter Password"
        //}
    },


    submitHandler: function (form) {
        //_loanApplication.getLoanApplication();


    }
});



