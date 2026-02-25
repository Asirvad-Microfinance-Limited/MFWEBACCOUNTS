
jQuery.validator.addMethod('ddlparameter', function (value, element) {

    return (value != '0');
}, 'Please Select Parameter ');

jQuery("#frmSetGeneralParams").validate({
    
    rules: {


        ddlparameter: {
            required: true,
            ddlparameter: true
        },
        
        txtValue: {
            required: true,

        }


    },
    messages:
    {
        txtValue: {
            required: "Please Enter Value"

        }
    },

    submitHandler: function (form) {

        _setGeneralParams.SetGeneralParamsSubmit();

    }
});
