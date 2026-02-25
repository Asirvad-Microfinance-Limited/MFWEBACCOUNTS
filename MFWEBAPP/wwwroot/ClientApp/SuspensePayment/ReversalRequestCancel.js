var _RequestCancel = {
    SearchRequestFill: function () {
        jQuery(".page-loader-wrapper").show();
        var SearchFillData = {
            "Requested User Id": userdata.userId,
            "Requst Id": requestId,
            "Amount": amount,
        }
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/userroles", AddUserRoleDetailsSubmitData, _userRoles.AddUserRoleLoadCompleted, userdata.token)
    },
    SearchRequestLoadCompleted: function (response) {

        if (response.status === "SUCCESS") {


            var errmsg = response.data.message;
            var msg = errmsg.split(".");
            swal(msg[0], msg[1], "success");
            jQuery("#mediumModal .close").click();
        }
        else {

            swal(response.responseMsg, "", "error");


        }
        _ReversalRequest.SearchRequestFill();
    },
}
jQuery('#confirm').click(function () {
    purpose = jQuery('#purpose').val(),
        description = jQuery('#description').val(),
        amount = jQuery('#amount').val(),
        confirmamount = jQuery('#cnfmamount').val()
    if (purpose == "") {
        jQuery('.page-loader-wrapper').hide();
        swal("Error", "Please enter your purpose..!", "error");
    }
    else if (description == "") {
        jQuery('.page-loader-wrapper').hide();
        swal("Error", "Please enter Descrption..!", "error");
    }

    else if (amount == "") {
        jQuery('.page-loader-wrapper').hide();
        swal("Error", "Please enter requesting amount..!", "error");
    }
    else if (confirmamount == "") {
        jQuery('.page-loader-wrapper').hide();
        swal("Error", "Enter the amount again to confirm..!", "error");
    } else
        _suspensepayment.SuspenseRequestFill(purpose, description, amount, confirmamount)

});


