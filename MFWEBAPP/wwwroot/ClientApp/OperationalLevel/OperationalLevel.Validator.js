
jQuery.validator.addMethod('ddlOpLevel', function (value, element) {

    return (value != '0');
}, 'Please Select Operational Level');

jQuery("#frmOperationalLevel").validate({

    rules: {


        ddlOpLevel: {
            required: true,
            ddlOpLevel: true
        }



    },
    messages:
    {


        //deliveryAddress: {
        //    required: "Please Enter Address"

        //},
        //vehicleNo: {
        //    required: "Please Enter Vehicle Number"
        //},
        //referenceNo: {
        //    required: "Please Enter Reference Number"
        //}
    },


    submitHandler: function (form) {
       
        _operationalLevel.OperationalLevelSubmitFill();

    }
});



