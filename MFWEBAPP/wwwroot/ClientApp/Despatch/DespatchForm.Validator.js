
jQuery.validator.addMethod('ddlIntend', function (value, element) {

    return (value != '0');
}, 'Please Select Center');
jQuery.validator.addMethod('ddlDeliveryType', function (value, element) {

    return (value != '0');
}, 'Please Select Delivery Type');
jQuery.validator.addMethod("VehicleNumberValid", function (value, element) {
    //return this.optional(element) || /^([A-Z]{2}\s{1}\d{2}\s{1}[A-Z]{1,2}\s{1}\d{1,4})?([A-Z]{3}\s{1}\d{1,4})?$/i.test(value);
    return this.optional(element) || /^([A-Z|a-z]{2}\s{1}\d{2}\s{1}[A-Z|a-z]{1,2}\s{1}\d{1,4})?([A-Z|a-z]{3}\s{1}\d{1,4})?$/i.test(value);

  //  return this.optional(element) || /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/i.test(value);
  
}, "Please Enter Valid Vehicle Number");
jQuery.validator.addMethod("RefNumberValid", function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9//]+$/i.test(value);
}, "Please Enter Valid Reference Number");
jQuery("#frmDespatchIntend").validate({

    rules: {


        ddlIntend: {
            required: true,
            ddlIntend: true
        },
        ddlDeliveryType: {
            required: true,
            ddlDeliveryType: true
        },
        deliveryAddress: {
            required: true,
          
        },
        vehicleNo: {
            required: true,
            VehicleNumberValid :true
        },
        referenceNo: {
            required: true,
            RefNumberValid :true
        }


    },
    messages:
    {


        deliveryAddress: {
            required: "Please Enter Address"

        },
        vehicleNo: {
            required: "Please Enter Vehicle Number"
        },
        referenceNo: {
            required: "Please Enter Reference Number"
        }
    },


    submitHandler: function (form) {
       
        _despatchIntend.despatchAccept();

    }
});



