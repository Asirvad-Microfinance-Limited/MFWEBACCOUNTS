

//jQuery.validator.addMethod('ddlGstType', function (value, element) {

//    return (value != '0');
//}, 'Please Select GST Type');
//jQuery.validator.addMethod('ddlPostOffice', function (value, element) {

//    return (value != '0');
//}, 'Please Select Post Office');

//jQuery.validator.addMethod("gstnoval", function (value, element) {
//    return this.optional(element) || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value);
//}, "Please Enter Valid GSTIN");

//jQuery.validator.addMethod("Namevalid", function (value, element) {
//    return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
//}, "Please enter valid name");

//jQuery.validator.addMethod("panno", function (value, element) {
//    return this.optional(element) || /([A-Z]){5}([0-9]){4}([A-Z]){1}$/i.test(value);
//}, "Please enter a valid pan no");
//jQuery.validator.addMethod("validatephonenumber", function (value, element) {
//    return this.optional(element) || /^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/.test(value);
//}, "Please Enter Valid Mobile Number");
//jQuery.validator.addMethod("emailvalid", function (value, element) {
//    return this.optional(element) || /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i.test(value);
//}, "Please Enter Valid E-mail ID");

//jQuery("#frmAddVendorDetails").validate({

//    rules: {


//        ddlGstType: {
//            required: true,
//            ddlGstType: true

//        },
//        ddlPostOffice: {
//            required: true,
//            ddlPostOffice: true
//        },
//        gstNo: {
//            required: true,
//            gstnoval: true,           
//        },
//        vname: {
//            required: true,
//            Namevalid: true,
//            maxlength: 25,
//        },
//        vaddress: {
//            required: true,
//            maxlength: 150,
//        },
//        panNo: {
//            required: true,
//            panno: true,
            
//        },
//        pincode: {
//            required: true
//        },
//        district: {
//            required: true
//        },
//        state: {
//            required: true
//        },
//        country: {
//            required: true
//        },
//        emailId: {
//            required: true,
//            emailvalid:true
//        },
//        contactPerson: {
//            required: true,
//            Namevalid: true,
//            maxlength: 25,
//        },
//        contactNo: {
//            required: true,
//            validatephonenumber: true,
//        },
//        ifsc: {
//            required: true
//        },
//        bankName: {
//            required: true
//        },
//        accNo: {
//            required: true
//        },
//        confirmAccNo: {
//            required: true
//        },

//        mobileNo: {
//            required: true,
//            validatephonenumber: true,
//        },

//        otp: {
//            required: true
//        }

       
//    },
//    messages:
//    {


//        gstNo: {
//            required: "Please Enter GST Number"

//        },
//        vname: {
//            required: "Please Enter Name"

//        },
//        vaddress: {
//            required: "Please Enter Address"

//        },
//        panNo: {
//            required: "Please Enter PAN Number"

//        },
//        pincode: {
//            required: "Please Enter Pincode"

//        },

//        district: {
//            required: "Please Enter District Name"
//        },

//        state: {
//            required: "Please Enter State Name"
//        },
//        country: {
//            required: "Please Enter Country Name"
//        },
//        emailId: {
//            required: "Please Enter E-mail ID"
//        },
//        contactPerson: {
//            required: "Please Enter Name"
//        },
//        contactNo: {
//            required: "Please Enter Mobile Number"
//        },
//        ifsc: {
//            required: "Please Enter IFSC Code"
//        },
//        bankName: {
//            required: "Please Enter Bank Name"
//        },
//        accNo: {
//            required: "Please Enter Account Number"
//        },
//        confirmAccNo: {
//            required: "Please Enter Confirm Account Number"
//        },
//        mobileNo: {
//            required: "Please Enter Mobile Number"
//        },
//        otp: {
//            required: "Please Enter OTP"
//        },
//    },


//    submitHandler: function (form) {
//        _addVendorDetails.vendorDetails();


//    }
//});





