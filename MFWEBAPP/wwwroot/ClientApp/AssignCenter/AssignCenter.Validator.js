jQuery.validator.addMethod('ddlAssignedFrom', function (value, element) {

    return (value != '0');
}, 'Please Select Assigned From ');
jQuery.validator.addMethod('ddlAssignedTo', function (value, element) {

    return (value != '0');
}, 'Please Select Assigned To');

jQuery("#frmAssignCenter").validate({

    rules: {


        ddlAssignedFrom: {
            required: true,
            ddlAssignedFrom: true
        },
        ddlAssignedTo: {
            required: true,
            ddlAssignedTo: true
        },
       
        chngDate: {
            required: true,


        },
        


    },
    messages:
    {


        chngDate: {
            required: "Please Enter  Date"

        },
    },


    submitHandler: function (form) {

        _assignCenter.AssignCenterSubmit();

    }
});

