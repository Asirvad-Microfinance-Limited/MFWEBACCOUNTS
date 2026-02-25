jQuery("#frmWriteSystemOff").validate({

    rules: {


        wosystemDate: {
            required: true,


        },

    },
    messages:
    {


        wosystemDate: {
            required: "Please Enter  Date"

        },
        //password: {
        //    required: "Please Enter To Date"
        //}
    },


    submitHandler: function (form) {
       
        _writeOffSystem.WriteOffUpdate();
    }
});