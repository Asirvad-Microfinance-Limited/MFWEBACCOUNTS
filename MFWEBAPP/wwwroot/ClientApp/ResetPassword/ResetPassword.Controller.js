var _resetPassword = {

    resetPasswordsubmitLoadCompleted: function (response) {

        if (response.status === "SUCCESS") {
            debugger;
            swal(response.responseMsg, "", "success");

        }
        else {

            swal(response.responseMsg, "", "error");
        }

    },

    resetpasswordSubmit: function () {
        debugger;

        varnewpass = jQuery('#txtnewPass').val();
    

            var key = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
            var iv = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');

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
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/login/resetpassword", resetpasswordSubmitData, _resetPassword.resetPasswordsubmitLoadCompleted, userdata.token)

        }

    

}

jQuery(document).ready(function ($) {

    jQuery('#maincard').hide();
    jQuery('.error').addClass("error-msg");



});