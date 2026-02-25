
//jQuery.validator.addMethod('ddlOpLevel', function (value, element) {

//    return (value != '0');
//}, 'Please Select Operational Level');

jQuery("#frmUpdatePolicyNumber").validate({

    rules: {


        fileUpload: {
            required: true,
           
        }



    },
    messages:
    {


        fileUpload: {
            required: "Please select a file "

        },
        //vehicleNo: {
        //    required: "Please Enter Vehicle Number"
        //},
        //referenceNo: {
        //    required: "Please Enter Reference Number"
        //}
    },


    submitHandler: function (form) {
       
        _updatePolicyNumber.UpdatePolicyNumberSubmit();
        
    }
});



