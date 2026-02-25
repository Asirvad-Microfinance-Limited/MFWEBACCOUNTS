var _changePassword = {

    changePasswordsubmitLoadCompleted: function (response) {
        
        if (response.status === "SUCCESS") {

            swal(response.responseMsg, "", "success");

        }
        else {

            swal(response.responseMsg, "", "error");
        }

    },

    changepasswordSubmit: function () {
       
        varnewpass = jQuery('#txtnewPass').val();
        varconfirmpass = jQuery('#txtConfirmPass').val();
        varoldpass = jQuery('#txtoldPass').val();
        if (varnewpass != varconfirmpass) {
            swal('', 'Your New Password and Confirmation Password Do Not Match...!', 'warning')
        }
        else {
            

            var key = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
            var iv = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');

            var encryptednewpass = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(varnewpass), key,
                {
                    keySize: 128 / 8,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });  
            var encryptedoldpass = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(varoldpass), key,
                {
                    keySize: 128 / 8,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });  
            var changepasswordSubmitData = {

                "userId": jQuery('#txtUserID').val(),
                "oldPassword": encryptedoldpass.toString(),
                "newPassword": encryptednewpass.toString()
            }
            _http.post(MFPUBLICCUSTOMERAPI_URL + "api/login/changepassword", changepasswordSubmitData, _changePassword.changePasswordsubmitLoadCompleted, userdata.token)

        }

    }
}


    jQuery(document).ready(function ($) {
       
        jQuery('#maincard').hide();
        jQuery('.error').addClass("error-msg");
        //Qualification.GetQualifications();


    });