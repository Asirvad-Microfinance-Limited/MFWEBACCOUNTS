jQuery.validator.addMethod('ddlLevels', function (value, element) {

    return (value != '0');
}, 'Please Select Level');

jQuery("#frmOperationalSubLevel").validate({

    rules: {


        ddlLevels: {
            required: true,
            ddlLevels: true
        },
       



    },
    messages:
    {


    },


    submitHandler: function (form) {
       

        _operationalSubLevel.changePopupHeader(1);

    }
});



//jQuery.validator.addMethod('ddlRole', function (value, element) {

//    return (value != '0');
//}, 'Please Select Role');
//jQuery.validator.addMethod('ddluserName', function (value, element) {

//    return (value != '0');
//}, 'Please Select User');

//jQuery("#frmRoleUserAssign").validate({

//    rules: {


//        ddlRole: {
//            required: true,
//            ddlRole: true
//        },
//        ddluserName: {
//            required: true,
//            ddluserName: true
//        }



//    },
//    messages:
//    {


//    },


//    submitHandler: function (form) {
//        debugger;


//    }
//});


//jQuery.validator.addMethod('ddlLanguage', function (value, element) {

//    return (value != '0');
//}, 'Please Select Language');
//jQuery.validator.addMethod('ddlPostOffice', function (value, element) {

//    return (value != '0');
//}, 'Please Select Post Office');
//jQuery.validator.addMethod('ddlDependentId', function (value, element) {

//    return (value != '0');
//}, 'This Field Is Required');

//jQuery.validator.addMethod("Namevalid", function (value, element) {
//    //return this.optional(element) || /^[a-zA-Z0-9]+$/i.test(value);
//    return this.optional(element) || /^[a-zA-Z0-9\s]+$/i.test(value);

//}, "Please enter valid name");

//jQuery.validator.addMethod("cinnoval", function (value, element) {
//    return this.optional(element) || /^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/i.test(value);
//}, "Please enter valid CIN Number");	

//jQuery.validator.addMethod("gstnoval", function (value, element) {
//    return this.optional(element) || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value);
//}, "Please Enter Valid GSTIN");

//jQuery.validator.addMethod("rbinoval", function (value, element) {
//    return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
//}, "Please enter valid RBI Number");

//jQuery.validator.addMethod("validatephonenumber", function (value, element) {
//    return this.optional(element) || /^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/.test(value);
//}, "Please Enter Valid Mobile Number");

//jQuery.validator.addMethod("validateemailid", function (value, element) {
//    return this.optional(element) || /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
//}, "Please Enter Valid E-mail ID");

//jQuery("#frmOperationalAddSubLevel").validate({

//    rules: {
//        levelId: {
//            required: true
//        },
//        levelName: {
//            required: true,
//            Namevalid: true,
//            maxlength: 25,
//        },
//        ddlLanguage: {
//            required: true,
//            ddlLanguage: true
//        },
//        ddlDependentID: {
//            required: true,
//            ddlDependentId:true,
//        },
//        address: {
//            required: true,
//            maxlength: 150,
//        },
//        mobno: {
//            required: true,
//            validatephonenumber: true,
            
//        },
       
//        cinNo: {
//            required: true,
//            cinnoval: true,
//        },
//        gstIn: {
//            required: true,
//            gstnoval: true,
//        },
//        rbiNo: {
//            required: true,
//            rbinoval: true,
//        },
//        pincode: {
//            required: true
//        },
//        ddlPostOffice: {
//            required: true,
//            ddlPostOffice: true
//        },
//        dependentId: {
//            required: true,

//        },
//         head: {
//            required: true,
//        },
//        headName: {
//            required: true
//        },
//        email: {
//            required: true,
//            validateemailid: true
//        }

    
        
     

//    },
//    messages:
//    {
//        levelId: {
//            required: "Please Enter ID"

//        },
//        levelName: {
//            required: "Please Enter Name"

//        },
//        address: {
//            required: "Please Enter Address"

//        },
//        cinNo: {
//            required: "Please Enter CIN Number"

//        },

//        gstIn: {
//            required: "Please Enter GST Number"

//        },

//        rbiNo: {
//            required: "Please Enter RBI Number"

//        },

//        pincode: {
//            required: "Please Enter Pincode"

//        },
//        dependentId: {
//            required: "Please Enter Dependent ID"

//        },
//        head: {
//            required: "Please Enter Head"

//        },
//        headName: {
//            required: "Please Enter Head Name"

//        },
//        mobno: {
//            required: "Please Enter Mobile Number"

//        },
//        email: {
//            required: "Please Enter E-mail ID"

//        },
//    },


//    submitHandler: function (form) {
//debugger;
//        _operationalSubLevel.AddOperationalLevelSubmit();


//    }
//});


////second validation


