var userdata = null;
if (localStorage.getItem("currentUser") != null) {
	
	userdata = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("currentUser"), encryptkey).toString(CryptoJS.enc.Utf8));
	
	    jQuery("#userdtl").text(userdata.userName)
}

if (window.location.pathname != "/mfweb/getcbreport" && window.location.pathname != "/mfweb/criffreport") {
	if (userdata != null) {
		var aaaa = "msdmdsmdsdmsdk";
	}
	else {
	
	
window.location.href = Domain_Url;

	}
}




jQuery(document).ready(function () {
    jQuery('form').on('focus', ':input', function () {
        jQuery(this).attr('autocomplete', 'off');
    });
});
