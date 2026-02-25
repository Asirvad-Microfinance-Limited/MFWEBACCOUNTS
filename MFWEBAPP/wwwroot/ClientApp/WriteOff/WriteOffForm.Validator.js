jQuery("#frmWriteOff").validate({

    rules: {


        woDate: {
            required: true,


        },
        
    },
    messages:
    {


        woDate: {
            required: "Please Enter  Date"

        },
        //password: {
        //    required: "Please Enter To Date"
        //}
    },


    submitHandler: function (form) {
        
        _writeOffForm.WriteOffSave();
    }
});