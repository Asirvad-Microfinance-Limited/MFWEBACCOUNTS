

jQuery.validator.addMethod('ddlRestricttype', function (value, element) {

    return (value != '0');
}, 'Please Select Type');

jQuery("#frmRestrictMemberCreation").validate({
    
    rules: {


        ddlRestricttype: {
            required: true,
            ddlRestricttype: true

        }
        


    },
    messages:
    {


        
    },


    submitHandler: function (form) {
        _RestrictMemberCreation.loadpopwindow();


    }
});






