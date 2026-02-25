jQuery.validator.addMethod('ddlRptName', function (value, element) {
    return (value != '0');
}, 'Please Select Report Name');

jQuery("#frmSummariseReport").validate({

    rules: {


        ddlRptName: {
            required: true,
            ddlRptName: true
        },
        dtFromDate: {
            required: true            
        },
        dtToDate: {
            required: true
        }
       
    },
    messages:
    {
        dtFromDate: {
            required: "Please Select From Date"

        },
        dtToDate: {
            required: "Please Select To Date"

        },
        
    },

    submitHandler: function (form) {

        _summarizedReport.SummReportTableFill()

    }
});