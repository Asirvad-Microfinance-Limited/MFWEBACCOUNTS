jQuery.validator.addMethod('ddlAccntName', function (value, element) {

    return (value != '0');
}, 'Please Select Account Name');


jQuery("#frmcustStmtRpt").validate({

    rules: {

        ddlAccntName: {
            required: true,
            ddlAccntName: true
        },
        txtLoanId: {
            required: true,
            
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
        txtLoanId: {
            required: "Please Enter Loan ID"

        },
        dtFromDate: {
            required: "Please Select From Date"

        },
        dtToDate: {
            required: "Please Select To Date"

        },
    },

    submitHandler: function (form) {

        CustomerStatementReport.CustStntTablefill();

    }
});
