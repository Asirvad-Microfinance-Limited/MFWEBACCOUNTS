

var _forgetPassword = {
    resetPasswordsubmitLoadCompleted: function (response) {
        debugger;
        if (response.status === "SUCCESS") {
            debugger;
            swal(response.responseMsg, "", "success");

        }
        else {

            swal(response.responseMsg, "", "error");
        }

    },
    mobileOTPVerifyLoadCompleted: function (response) {
        debugger;

        if (response.status === "SUCCESS") {
            debugger;
            //otpval = response.data.otp;
            jQuery('#otpdiv').show();

            //swal(response.responseMsg, "", "success"); 
            jQuery('#otp').prop("disabled", false);
             
        }

        else {
            swal(response.responseMsg, "", "error");

            jQuery('#otp').prop("disabled", true);

        }

    },
    verifymobileOTPVerifyLoadCompleted: function (response) {

        debugger;
        if (response.status === "SUCCESS") {
            debugger;
            //jQuery('#otp').prop("disabled", false);
            jQuery('#otp').removeClass('is-invalid ');
            jQuery('#otp').addClass('is-valid form-control-success');
            jQuery('#newPswd').show();
            jQuery('#sendotp').hide();
            jQuery('#resetbtn').show();
           
        }

        else {
            debugger;
            jQuery('#otp').removeClass('is-valid form-control-success');
            jQuery('#otp').addClass('is-invalid ');
            swal(response.responseMsg, "", "error");
            jQuery('#otp').val("");
          

          //  jQuery('#otp').prop("disabled", true);

        }

    },
    mobileOTPDetails: function () {
        debugger;
        var mobNo = jQuery("#mobileNo").val();
         var key = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        var iv = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
       


        var encryptedmobno = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(mobNo), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        
        var mobileOTPDetailsData = {
            "userId": jQuery("#txtUserID").val(),
            "mobileNo": encryptedmobno.toString(),
            "typeId": 1
        };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/general/otp", mobileOTPDetailsData, _forgetPassword.mobileOTPVerifyLoadCompleted, "ds")

    },
    verifymobileOTPDetails: function () {
        debugger;
        var mobNo = jQuery("#mobileNo").val();
        var key = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        var iv = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');



        var encryptedmobno = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(mobNo), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        var verifymobileOTPDetailsData = {
            "mobileNo": encryptedmobno.toString(),
            "otp": jQuery("#otp").val(),
            "typeId": 1
        };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/general/verifyotp", verifymobileOTPDetailsData, _forgetPassword.verifymobileOTPVerifyLoadCompleted, "ddd")

    },
   

    resetpasswordSubmit: function () {
        debugger;
        var key = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        var iv = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        var varnewpass = jQuery('#txtnewPass').val();

        //var key = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        //var iv = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');

        var encryptednewpass = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(varnewpass), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        var resetpasswordSubmitData = {

            "userId": jQuery('#txtUserID').val(),
            "oldPassword": "",
            "newPassword": encryptednewpass.toString()
        }
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/login/resetpassword", resetpasswordSubmitData, _forgetPassword.resetPasswordsubmitLoadCompleted, "ddd")

    }

  

}
jQuery('.page-loader-wrapper').hide();
jQuery(document).ready(function ($) {
  
    jQuery('#maincard').hide();
    jQuery('.error').addClass("error-msg");
    jQuery('#resetbtn').hide();
    //jQuery("#resetbtn").prop("disabled", true);
   
    //jQuery('.page-loader-wrapper').hide();
    jQuery("#otp").change(function (e) {
        debugger
       
        _forgetPassword.verifymobileOTPDetails();

    });
    //jQuery("#txtnewPass").change(function (e) {
    //    debugger;
      
    //    _forgetPassword.resetpasswordSubmit();

    //});
    jQuery("#txtnewPass").keyup(function (e) {
        debugger;
        if (jQuery(this).val().length > 2 && jQuery(this).val().length != 0) {
            debugger;
            jQuery("#resetbtn").prop("disabled", false);
        }
        else if (jQuery(this).val().length == 0) {
            debugger;
            jQuery("#resetbtn").prop("disabled", true);
            swal("", "Please Enter Password", "error"); 


        }
        else {
            debugger;
            jQuery("#resetbtn").prop("disabled", true);
        }


    });

    jQuery("#resetbtn").click(function (e) {
        debugger

        _forgetPassword.resetpasswordSubmit();
    });


});