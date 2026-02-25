

jQuery.validator.addMethod('ddlBranches', function (value, element) {

    return (value != '0');
}, 'Please Select Branch');
jQuery.validator.addMethod('ddlCenters', function (value, element) {

    return (value != '0');
}, 'Please Select Center');

jQuery("#PrintLoanApplication").validate({

    rules: {


        ddlBranches: {
            required: true,
            ddlBranches: true
           
        },
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
        _loanApplication.getLoanApplication();

      
    }
});



