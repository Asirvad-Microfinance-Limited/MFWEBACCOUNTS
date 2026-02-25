var _GeneralServices = {

    signOut: function () {

        LogOutClearLocalStorage();
        localStorage.ClearLocalStorage
        localStorage.removeItem('currentUser');
        localStorage.removeItem('vendorIdForEdit');
        localStorage.removeItem('LoanNo');
        localStorage.removeItem('userTypeIdForEdit');
        localStorage.removeItem('slno');
        localStorage.removeItem('loanid');
        localStorage.removeItem('IntentId');
        localStorage.removeItem('BranchIDCenterReport');
        localStorage.removeItem('BranchIDPendingReport');
        localStorage.removeItem('claimListDetails');
        RemoveToken();

    },

    checkAccessLogout: function (response) {
        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
        window.location.href = DOMAIN_URL;
    },
    LogOut: function () {
        jQuery('.page-loader-wrapper').show();
        var logoutdata = {

            "userId": userdata.userId
        };
        logoutdata = JSON.stringify(logoutdata);
        logoutdata = { "encryptedRqstStr": EncryptAPIReq(logoutdata) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/logout", logoutdata, _GeneralServices.logoutCompleted, userdata.token)
    },

    logoutCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            window.location.href = DOMAIN_URL;
        } else if (response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {
            swal("", response.responseMsg, "error");
        }
    }
}

function RemoveToken() {
    var CheckLogout = {
        "typeID": "3",
        "userID": userdata.userId
    };
    CheckLogout = JSON.stringify(CheckLogout);
    CheckLogout = { "encryptedRqstStr": EncryptAPIReq(CheckLogout) };

    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckLogout, _GeneralServices.checkAccessLogout, userdata.token);
}




var Nkey = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
var Niv = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
function EncryptAPIReq(text) {
    var encryptedStr = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), Nkey,
        {
            keySize: 128 / 8,
            iv: Niv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

    return encryptedStr.toString();
}

function DecryptAPIReq(text) {
    var decrypt = CryptoJS.AES.decrypt(text, Nkey,
        {
            keySize: 128 / 8,
            iv: Niv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return decrypt.toString(CryptoJS.enc.Utf8);
}

