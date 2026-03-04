//function GetMenuItem(item) {
//    debugger;
//    if (item === "loanapplication") {

//        window.location.href = DOMAIN_URL + "GenerateLoanApplication";

//    }
//    else if (item === "loancard") {
//        window.location.href = DOMAIN_URL + "GenerateLoanCard";

//    }
//    else if (item === "nocapproval") {
//        window.location.href = DOMAIN_URL + "NOCApproval";

//    }
//    else if (item === "viewNOC") {
//        window.location.href = DOMAIN_URL + "ViewNOC";

//    }
//    else if (item === "genarateinsuranceform") {

//        window.location.href = DOMAIN_URL + "GenarateInsuranceForm";

//    }
//    else if (item === "restrictmembercreation") {

//        window.location.href = DOMAIN_URL + "RestrictMemberCreation";

//    }
//    else if (item === "addvendor") {

//        window.location.href = DOMAIN_URL + "AddVendor";

//    }
//    else if (item === "approveindent") {

//        window.location.href = DOMAIN_URL + "ApproveIndent";

//    }
//    else if (item === "addvendordetails") {

//        window.location.href = DOMAIN_URL + "AddVendorDetails";

//    }
//    else if (item === "returninward") {

//        window.location.href = DOMAIN_URL + "ReturnInward";

//    }
//    else if (item === "despatchintend") {

//        window.location.href = DOMAIN_URL + "despatchintend";

//    }
//    else if (item === "userroledetails") {

//        window.location.href = DOMAIN_URL + "userroledetails";

//    }
//    else if (item === "usertypedetails") {

//        window.location.href = DOMAIN_URL + "usertypedetails";

//    }
//    else if (item === "UserDetails") {

//        window.location.href = DOMAIN_URL + "UserDetails";

//    }
//    else if (item === "vendordashboard") {

//        window.location.href = DOMAIN_URL + "vendordashboard";

//    }
//    else if (item === "pendingreport") {

//        window.location.href = DOMAIN_URL + "pendingreport";

//    }
//    else if (item === "setgeneralparams") {
//        window.location.href = DOMAIN_URL + "setgeneralparams";
//    }
//    else if (item === "setrules") {
//        window.location.href = DOMAIN_URL + "setrules";
//    }
//    else if (item === "insuranceclaimapproval") {
//        window.location.href = DOMAIN_URL + "insuranceclaimapproval";
//    }
//    else if (item === "sendtoinsurancecompany") {
//        window.location.href = DOMAIN_URL + "sendtoinsurancecompany";
//    }
//}


var Nkey = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
var Niv = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
function EncryptAPIReq1(text) {
    var encryptedStr = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), Nkey,
        {
            keySize: 128 / 8,
            iv: Niv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

    return encryptedStr.toString();
}

var _autoMenu = {


    GetMenuItem: function (responce) {

        window.location.href = DOMAIN_URL + responce;

    },
    getDyanamicMenuLoadCompleted: function (response) {


        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            if (response.data.menuList.length > 0) {

                //response.data = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
                //if (response.data != null && response.data.menuList.length > 0) {

                $ul = jQuery('<ul class="nav navbar-nav" id="menuBinderlist">')
                var $li = jQuery('<li style="padding-left:20px;">')
                $li.append('<a href="' + DOMAIN_URL + 'dashboard"><i class="menu-icon fa fa-tachometer"></i>Dashboard</a>');
                $li.append('</li>')
                $ul.append($li);
                jQuery.each(response.data.menuList, function (i, val) {
                    var subMenu = val.submenu;
                    var submenuList = subMenu.split(',');
                    var mainMenu = val.mainmenu.split('^');
                    $li = jQuery('<li class="menu-item-has-children dropdown">');
                    $li.append('<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="' + mainMenu[1] + '"></i> ' + mainMenu[0] + '</a>')
                    var $ulsub = jQuery('<ul class="sub-menu children dropdown-menu">')
                    var $lisubdiv = jQuery('<div class="scrollbar square scrollbar-lady-lips thin" style="position: relative;min-height: 20px;max-height:300px;overflow: auto;display: block;">')

                    jQuery.each(submenuList, function (i, val) {
                        var submenuwithclass = val.split('^')
                        //$ulsub.append('<li><i class="fa fa-users"></i><a href="javascript:void(0);" onclick="_autoMenu.GetMenuItem('+ val.toLowerCase()+')">'+ val +'</a></li>');
                        $lisubdiv.append('<li><i class="' + submenuwithclass[1] + '"></i><a href="javascript:void(0);" onclick="_autoMenu.GetMenuItem(\'' + submenuwithclass[2] + '\');"> ' + submenuwithclass[0] + ' </a></li>');

                    });
                    $lisubdiv.append('</div>')
                    $ulsub.append($lisubdiv);
                    $ulsub.append('</ul>')
                    $li.append($ulsub);
                    $li.append('</li>')
                    $ul.append($li);
                });
                $ul.append('</ul>')
                jQuery('#main-menu').html($ul);
            }
            else {

            }
        }


        else {

            jQuery("#ddlBranch").empty();
            jQuery("#ddlBranch").append(jQuery("<option></option>").val("0").text("------- Choose Access Level -------"));
        }

    },
    getDyanamicMenu: function () {


        jQuery('.page-loader-wrapper').show();
        var getMenuData = {

            "userID": userdata.userId,
            "moduleID": 7

        };

        //getMenuData = JSON.stringify(getMenuData);
        //getMenuData = { "encryptedRqstStr": EncryptAPIReq1(getMenuData) };



        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/mainmenulist", getMenuData, _autoMenu.getDyanamicMenuLoadCompleted, userdata.token)
        // _http.post(REPMFPUBLICCUSTOMERAPI_URL + "api/layers/mainmenulist", getMenuData, _autoMenu.getDyanamicMenuLoadCompleted, userdata.token)
        //_http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/mainmenulist", getMenuData, _autoMenu.getDyanamicMenuLoadCompleted, userdata.token)
    }
}
_autoMenu.getDyanamicMenu();

jQuery(document).ready(function ($) {






});