var _DeductionExtendRequest = {
   
    //DeductionRequestFill: function () {
    //    jQuery(".page-loader-wrapper").show();

    //        var exdate = jQuery('#exupto').val(),
    //        var reason = jQuery('#reason').val()


    //    if (jQuery('#exupto').val() == "") {
    //        swal("", "Please Select a Date", "warning");
    //        return false;
    //    }
    //    if (jQuery('#reason').val() == "") {
    //        swal("", "Please enter reason for extension", "warning");
    //        return false;
    //    }

    
    //};
    //    _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/users", AddUserDetailsSubmitData, _userDetails.AddUserDetailsLoadCompleted, userdata.token)
    }

jQuery(document).ready(function ($) {

    jQuery('.page-loader-wrapper').hide();
    jQuery('#bs_datepicker_container5_todate').datepicker({
        autoclose: true,
        format: "dd-M-yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        minDate: new Date(),
        container: '#bs_datepicker_container5_todate'
    }).datepicker("setDate", new Date());

    });
