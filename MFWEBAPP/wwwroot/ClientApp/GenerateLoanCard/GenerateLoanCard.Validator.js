
jQuery.validator.addMethod('ddllcBranches', function (value, element) {

    return (value != '0');
}, 'Please Select Branch');
jQuery.validator.addMethod('ddllcCenters', function (value, element) {

    return (value != '0');
}, 'Please Select Center');

jQuery("#GenerateLoanCard").validate({

    rules: {


        ddllcBranches: {
            required: true,
            ddllcBranches: true

        },
        ddllcCenters: {
            required: true,
            ddllcCenters: true
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
        //_loanCard.getLoanCard();
    }
});



