
jQuery.validator.addMethod('ddlAgent', function (value, element) {

    return (value != '0');
}, 'Please Select Agent');
jQuery("#frmSendToInsuranceCompany").validate({

    rules: {


        fromDate: {
            required: true,
            

        },
        toDate: {
            required: true,
           
        },

        ddlAgent: {
            required: true,
            ddlAgent: true
        },

    },
    messages:
    {


        fromDate: {
            required: "Please Enter From Date"

        },
        toDate: {
            required: "Please Enter To Date"
        }
    },


    submitHandler: function (form) {
         
        
        _sendToInsuranceCompany.DownloadExcel();

    }
});



