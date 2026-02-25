
jQuery.validator.addMethod('ddlIntend', function (value, element) {

    return (value != '0');
}, 'Please Select Center');

jQuery("#frmReturnInward").validate({

    rules: {


        ddlIntend: {
            required: true,
            ddlIntend: true
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

        _returnInward.ReturnInwardAccept();

    }
});



