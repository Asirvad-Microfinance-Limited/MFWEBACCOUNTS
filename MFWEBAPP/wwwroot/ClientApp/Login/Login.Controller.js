//global variables for encr
var keySize = 256;
var ivSize = 128;
var iterations = 100;
var message = "Hello World";
var password = "7x!A%D*G-KaPdSgV";
//global variables for encr  end
var cipherText;
var LocalStr;

//function encrypt(msg, pass) {

//    var salt = CryptoJS.lib.WordArray.random(128 / 8);

//    var key = CryptoJS.PBKDF2(pass, salt, {
//        keySize: keySize / 32,
//        iterations: iterations
//    });

//    var iv = CryptoJS.lib.WordArray.random(128 / 8);

//    var encrypted = CryptoJS.AES.encrypt(msg, key, {
//        iv: iv,
//        padding: CryptoJS.pad.Pkcs7,
//        mode: CryptoJS.mode.CBC

//    });

//    // salt, iv will be hex 32 in length
//    // append them to the ciphertext for use  in decryption
//    var transitmessage = salt.toString() + iv.toString() + encrypted.toString();
//    console.log(transitmessage.toString());
//    console.log(encrypted.toString());
//    return transitmessage;
//}

var _login = {
    LoginLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status === "SUCCESS") {
            response.data = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
        }
        if (response.status === "SUCCESS" && response.data.otpFlag == 0) {

           
           



            LogOutClearLocalStorage();
            localStorage.setItem('currentUser', CryptoJS.AES.encrypt(JSON.stringify(response.data), encryptkey));
            jQuery("#login_submit").val("Login....")
            jQuery('#Login').hide();
            jQuery('#Otp').hide();
            jQuery('#ResentOtp').hide()
            jQuery('.page-loader-wrapper').show();
            window.location.href = DOMAIN_URL + "dashboard";
        }
        else if (response.status === "SUCCESS" && response.data.otpFlag == 1) {
            if (response.data.mobileNumber.length < 10) {
                swal("", "Please update mobile number through HRM module", "warning");
                return false;
            }
            if (response.responseMsg.toUpperCase() != "SUCCESS") {
                swal({
                    title: "Warning..!",
                    text: response.responseMsg,
                    type: "warning"
                }, function () {
                    LogOutClearLocalStorage();
                    //  localStorage.setItem('currentUser', CryptoJS.AES.encrypt(JSON.stringify(response.data), encryptkey));
                    LocalStr = CryptoJS.AES.encrypt(JSON.stringify(response.data), encryptkey);
                    mobilenum = response.data.mobileNumber;
                    userid = response.data.userId;
                    jQuery("#Count").modal('show');
                    _login.OtpSendRequest(mobilenum, userid);
                });

            }
            else {
                LogOutClearLocalStorage();
                //  localStorage.setItem('currentUser', CryptoJS.AES.encrypt(JSON.stringify(response.data), encryptkey));
                LocalStr = CryptoJS.AES.encrypt(JSON.stringify(response.data), encryptkey);
                mobilenum = response.data.mobileNumber;
                userid = response.data.userId;
                jQuery("#Count").modal('show');
                _login.OtpSendRequest(mobilenum, userid);
            }
        }
        else {
            jQuery("#login_submit").val("Login to continue");
            jQuery("#login_submit").attr("disabled", false);
            swal("", response.responseMsg, "error");
        }

    },


    Login: function () {

        jQuery("#login_submit").attr("disabled", true);
        //ClearLocalStorage();

        //var value = jQuery('#password').val().toString();
        //$("#login_submit").attr("disabled", true);
        //$("#login_submit").text("Login.....");

        var value = jQuery('#password').val().toString()
        jQuery(".containers").html('');

        //var encrypted = encrypt(value, password);


        var key = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        var iv = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');

        var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });


        // console.log(encryptedlogin.toString());

        var Logindata = {

            "typeId": 1,
            "userId": jQuery('#userid').val(),
            "password": encryptedlogin.toString(),
            "deviceId": "",
            "moduleId": 33
        };


        Logindata = JSON.stringify(Logindata);
        Logindata = { "encryptedRqstStr": EncryptAPIReq(Logindata) };
        // _http.post(MFPUBLICCUSTOMERAPI_URL + "api/login/login", Logindata, _login.LoginLoadCompleted, "")
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/login", Logindata, _login.LoginLoadCompleted, "asdasd")


    },
    OtpSendRequest: async function (mobilenum, userid) {

        jQuery('.page-loader-wrapper').show();
        var key = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        var iv = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        var mob = mobilenum;
        var uid = userid;
        var encryptedmob = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(mob), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        var OtpSend = {
            "customerId": 2,
            "typeId": 1,
            "mobileNo": encryptedmob.toString(),
            "userId": uid
        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/general/otp", OtpSend, _login.OtpSendsucess)
    },

    OtpSendsucess: function (response) {

        if (response.status === "SUCCESS") {
            jQuery('#Login').show();
            jQuery('#phonenum').text('');
            var mob = mobilenum.replace(/\d(?=\d{4})/g, 'X');
            jQuery("#phonenum").text("+91 XXXXXX" + mobilenum.substr(6));
            jQuery("#Otp").modal('show');
            jQuery('#VerifyOtp').show();
            jQuery('#ResentOtp').hide();
            CountDown();
        }
        else {
            swal(response.message, "", "error");
        }
        jQuery('.page-loader-wrapper').hide();
    },

    OtpVerifyRequest: function () {
        jQuery('.page-loader-wrapper').show();
        var key = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        var iv = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        var mob = mobilenum;
        var encryptedmob = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(mob), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        var OtpVerify = {
            "otp": jQuery('#otpid').val(),
            "typeId": 1,
            "mobileNo": encryptedmob.toString()
        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/general/verifyotp", OtpVerify, _login.OtpVerify)
    },

    OtpVerify: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.responseMsg.toUpperCase() != "SUCCESS") {
                swal({
                    title: "Warning..!",
                    text: response.responseMsg,
                    type: "warning"
                }, function () {
                    LogOutClearLocalStorage();
                    localStorage.setItem('currentUser', LocalStr, encryptkey);
                    jQuery("#login_submit").val("Login....")
                    jQuery('#Login').hide();
                    jQuery('#Otp').hide();
                    jQuery('#ResentOtp').hide()
                    jQuery('.page-loader-wrapper').show();
                    window.location.href = DOMAIN_URL + "dashboard";
                });
            }
            else {
                LogOutClearLocalStorage();
                localStorage.setItem('currentUser', LocalStr, encryptkey);
                jQuery("#login_submit").val("Login....")
                jQuery('.page-loader-wrapper').show();
                window.location.href = DOMAIN_URL + "dashboard";
            }
        }
        else {
            jQuery("#login_submit").val("Login to continue");
            jQuery("#login_submit").attr("disabled", false);
            jQuery("#otpid").val('');
            swal("", "OTP Verification Failed", "error");
        }
    },

    ChangeResponse: function (response) {
        if (response.status === "SUCCESS") {
            //swal("", response.responseMsg, "success");
            swal({
                title: "Success..!",
                text: response.responseMsg,
                type: "success"
            }, function () {
                jQuery('#Cuserid').val('');
                jQuery('#Oldpassword').val('');
                jQuery('#Newpassword1').val('');
                jQuery('#Newpassword2').val('');
                jQuery('#Login').show();
                jQuery('#ChangePwd').hide();
            });
        }
        else {
            swal("", response.responseMsg, "OTP Verification Failed");
            jQuery('#Login').show();
            jQuery('#ChangePwd').hide();
            jQuery('#Otp').hide();
        }
    }

}

jQuery(document).ready(function ($) {

    //_login.Login();
    jQuery('.page-loader-wrapper').hide();
    jQuery('#VerifyOtp').click(function () {

        _login.OtpVerifyRequest();
    });
    jQuery('#ResentOtp').click(function () {
        ClearOtp();
    });
    function ClearOtp() {
        jQuery(".containers").html('');
        jQuery("#otpid").val('');

        _login.OtpSendRequest(mobilenum, userid);
    }
    jQuery('#close').click(function () {

        //jQuery("#login_submit").attr("disabled", false);

        window.location.reload(true);

    });



});
function CountDown() {
    var width = 280,
        height = 280,
        timePassed = 0,
        timeLimit = 30;

    var fields = [{
        value: timeLimit,
        size: timeLimit,
        update: function () {
            return timePassed = timePassed + 1;
        }
    }];


    var nilArc = d3.svg.arc().
        innerRadius(width / 3 - 133).
        outerRadius(width / 3 - 133).
        startAngle(0).
        endAngle(2 * Math.PI);

    var arc = d3.svg.arc().
        innerRadius(width / 3 - 45).
        outerRadius(width / 3 - 35).
        startAngle(0).
        endAngle(function (d) {
            return d.value / d.size * 2 * Math.PI;
        });

    var svg = d3.select(".containers").append("svg").
        attr("width", width).
        attr("height", height);

    var field = svg.selectAll(".field").
        data(fields).
        enter().append("g").
        attr("transform", "translate(" + width / 2 + "," + height / 2 + ")").
        attr("class", "field");

    var back = field.append("path").
        attr("class", "path path--background").
        attr("d", arc);

    var path = field.append("path").
        attr("class", "path path--foreground");

    var label = field.append("text").
        attr("class", "label").
        attr("dy", ".35em");

    (function update() {

        field.
            each(function (d) {
                d.previous = d.value, d.value = d.update(timePassed);
            });

        path.transition().
            ease("elastic").
            duration(500).
            attrTween("d", arcTween);

        if (timeLimit - timePassed <= 10)
            pulseText(); else

            label.
                text(function (d) {
                    return d.size - d.value;
                });

        if (timePassed <= timeLimit)
            setTimeout(update, 1000 - timePassed % 1000);
        else
            destroyTimer();


    })();

    function pulseText() {
        back.classed("pulse", true);
        label.classed("pulse", true);

        if (timeLimit - timePassed >= 0) {
            label.style("font-size", "120px").
                attr("transform", "translate(0," + +4 + ")").
                text(function (d) {
                    return d.size - d.value;
                });
        }

        label.transition().
            ease("elastic").
            duration(900).
            style("font-size", "60px").
            attr("transform", "translate(0," + -1 + ")");
    }

    function destroyTimer() {
        jQuery('#VerifyOtp').hide();
        jQuery('#ResentOtp').show();
    }

    function arcTween(b) {
        var i = d3.interpolate({
            value: b.previous
        },
            b);
        return function (t) {
            return arc(i(t));
        };
    }
}
