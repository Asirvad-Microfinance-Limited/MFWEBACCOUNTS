var baseUrl = "https://amfluat.asirvad.com/AsirvadGoldloan/PublicAuthApi/";
/*var baseUrl = "https://apps.asirvad.com/AsirvadGoldloan/PublicAuthApi/";*/
var token = "";
var AadharNo = "";
var T_Token = "";
var _Cashdenomination = {
    scanFinger: function () {
        event.preventDefault();
       
    
        if (AadharNo.length !== 0) {

            var port;
            var urlStr = '';

            urlStr = 'https://localhost:11100/rd/capture';
            var host = window.location.hostname;
            if (host == "appsbackend.asirvad.com") {
            /*if (host == "apps.asirvad.com") {*/
                getJSONCapturePROD(urlStr,
                    function (err, data) {
                        if (err != null) {
                            //alert('Something went wrong: ' + err);
                        } else {
                            _Cashdenomination.Authenticate(String(data), AadharNo);

                        }
                    }
                );
            }
            else {
                getJSONCapture(urlStr,
                    function (err, data) {
                        if (err != null) {
                            // alert('Something went wrong: ' + err);
                        } else {
                            _Cashdenomination.Authenticate(String(data), AadharNo);


                        }
                    }
                );
            }

        }
        else {
            alert("Empty UID token!.");
            jQuery('.page-loader-wrapper').hide();
        }
            
        


    },
    GetToken: function () {
        var Time = getFormattedDateTime();
        $.ajax({
            url: baseUrl + 'PublicApi/PublicAuthentication/GetToken/JWT', // 🔗 Replace with your API endpoint
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                "username": "Jithin",
                "password": "100939@777"
            }),
            headers: {
                'Authorization': 'Bearer a86a5a5ed9b9d790b407aef8924d541b4cefbd8ed88080bc78488906abeb4522' + btoa(Time)
            },
            async: false,
            success: function (response) {
                if (response.token) {
                    
                    token = response.token;
                    console.log(token);
                } else {
                    alert("Access denied ❌");
                }
            },
            error: function (xhr, status, error) {
                console.error('API error:' + xhr.statusCode, error);
               
            }
        });
    },
    Authenticate: function (data, aadhar) {
        _Cashdenomination.GetToken();
        var PostData = {

            requestID: jQuery('#txt_id').val(),
            lat: "17.494568",
            lon: "78.392056",
            devMacId: "11:22:33:44:55",
            devId: "efsgrgrd",
            devSrNo: "2040444",
            rc: "Y",
            shRc: "Y",
            ver: "2.5",
            serType: "24",
            env: "2",
            uid: aadhar,
            ref: "FROMSAMPLE",
            pidXml: btoa(data)
        };
        console.log(JSON.stringify(PostData));
        $.ajax({
            url: baseUrl +'PublicApi/PublicAuthentication/AuthBiometric', // 🔗 Replace with your API endpoint
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(PostData),
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (response) {
                if (response.err == "000") {
                    alert("Authentication success!");
                    var sysAmt = jQuery('#systotal').val();
                    var TotalAmt = jQuery('#txttotal').val();
                    var LateCash = jQuery('#txtlatecash').val();
                    var Remark = jQuery('#txtremark').val();

                    jQuery('.page-loader-wrapper').show();

                    var burglary = 0;

                    if (document.getElementById('Br_Yes').checked == true) {
                        burglary = 1;
                    }

                    // alert(burglary);
                    var ups = 0;

                    if (document.getElementById('Ups_Yes').checked == true) {
                        ups = 1;
                    }

                    var gps = 0;

                    if (document.getElementById('Gps_Yes').checked == true) {
                        gps = 1;
                    }

                    var panicSwicth = 0;

                    if (document.getElementById('Ps_Yes').checked == true) {
                        panicSwicth = 1;
                    }

                    var wirSwitch = 0;

                    if (document.getElementById('Wps_Yes').checked == true) {
                        wirSwitch = 1;
                    }

                    var ipcam = 0;

                    if (document.getElementById('Ip_Yes').checked == true) {
                        ipcam = 1;
                    }

                    var safeStrong = 0;

                    if (document.getElementById('Sr_Yes').checked == true) {
                        safeStrong = 1;
                    }

                    var CashConfirmTablefillData = {


                        "branchid": userdata.branchId,
                        "firm": 3,
                        "userId": userdata.userId,
                        //"c2000": parseInt(jQuery('#lbl2000').text() != ' ' ? jQuery('#lbl2000').text() : 0),
                        "c500": parseInt(jQuery('#lbl500').text() != ' ' ? jQuery('#lbl500').text() : 0),
                        "c200": parseInt(jQuery('#lbl200').text() != ' ' ? jQuery('#lbl200').text() : 0),
                        "c100": parseInt(jQuery('#lbl100').text() != ' ' ? jQuery('#lbl100').text() : 0),
                        "c50": parseInt(jQuery('#lbl50').text() != ' ' ? jQuery('#lbl50').text() : 0),
                        "c20": parseInt(jQuery('#lbl20').text() != ' ' ? jQuery('#lbl20').text() : 0),
                        "c10": parseInt(jQuery('#lbl10').text() != ' ' ? jQuery('#lbl10').text() : 0),
                        "c5": parseInt(jQuery('#lbl5').text() != ' ' ? jQuery('#lbl5').text() : 0),
                        "c2": parseInt(jQuery('#lbl2').text() != ' ' ? jQuery('#lbl2').text() : 0),
                        "c1": parseInt(jQuery('#lbl1').text() != ' ' ? jQuery('#lbl1').text() : 0),
                        "lateCash": parseInt(jQuery('#txtlatecash').val() == '' ? 0 : jQuery('#txtlatecash').val()),
                        "sysTotal": parseInt(jQuery('#systotal').val()),
                        "cashTotal": parseInt(jQuery('#txttotal').val()),
                        "coinAmt": parseInt(jQuery('#txtcoin').val() == '' ? 0 : jQuery('#txtcoin').val()),
                        "remark": jQuery('#txtremark').val(),
                        "autherId": jQuery('#txt_id').val(),
                        /* "password": encryptedlogin.toString(),*/
                        "safeStrong": safeStrong,
                        "burglary": burglary,
                        "ups": ups,
                        "gps": gps,
                        "panicSwicth": panicSwicth,
                        "wirSwitch": wirSwitch,
                        "ipcam": ipcam

                    };
                    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/BranchCashPosition", CashConfirmTablefillData, _Cashdenomination.CashConfirmcompleted, userdata.token);
                }
                else {
                    alert(response.errdesc);
                    jQuery('.page-loader-wrapper').hide();
                }
            },
            error: function (xhr, status, error) {
                console.error('API error:' + xhr.statusCode, error);
                // alert("Something went wrong!");
                jQuery('.page-loader-wrapper').hide();
            }
        });
        
    },

    GetTok: function () {

        var Authr_Id = jQuery('#txt_id').val();

        var T_Token = {

            "typeId": 2,
            "autherId": Authr_Id,
            "branchId": userdata.branchId

        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/BranchCashPosition", T_Token, _Cashdenomination.Auther_Token, userdata.token);
        
    },

    Auther_Token: function (response) {

        if (response.status === "SUCCESS") {
            //AadharNo = response.data.uidToken;
            /*response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));*/
            if (response.data.sysAmount != null) {
               

                AadharNo = response.data.token;
                //jQuery('#btnConfirm').show();
            }
            else {

                alert("Token Access Failed... ❌");

            }

        }
        jQuery('.page-loader-wrapper').hide();
    },


    CashConfirm: function () {

        var sysAmt = jQuery('#systotal').val();
        var TotalAmt = jQuery('#txttotal').val();
        var LateCash = jQuery('#txtlatecash').val();
        var Remark = jQuery('#txtremark').val();
        var Authr_Id = jQuery('#txt_id').val();
        var uid = userdata.userId;

        jQuery('.page-loader-wrapper').show();

        var burglary = 0;

        if (document.getElementById('Br_Yes').checked == true) {
            burglary = 1;
        }

        // alert(burglary);
        var ups = 0;

        if (document.getElementById('Ups_Yes').checked == true) {
            ups = 1;
        }

        var gps = 0;

        if (document.getElementById('Gps_Yes').checked == true) {
            gps = 1;
        }

        var panicSwicth = 0;

        if (document.getElementById('Ps_Yes').checked == true) {
            panicSwicth = 1;
        }

        var wirSwitch = 0;

        if (document.getElementById('Wps_Yes').checked == true) {
            wirSwitch = 1;
        }

        var ipcam = 0;

        if (document.getElementById('Ip_Yes').checked == true) {
            ipcam = 1;
        }

        var safeStrong = 0;

        if (document.getElementById('Sr_Yes').checked == true) {
            safeStrong = 1;
        }


        ////login
        //var value = jQuery('#txt_pwd').val().toString()


        //var key = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        //var iv = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');

        //var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), key,
        //    {
        //        keySize: 128 / 8,
        //        iv: iv,
        //        mode: CryptoJS.mode.CBC,
        //        padding: CryptoJS.pad.Pkcs7
        //    });

        if (TotalAmt == '0') {
            jQuery('.page-loader-wrapper').hide();
            swal("", "Total Cash Zero Not Possible", "warning");
            return false;
        }

        if (LateCash > 0 && Remark == '') {
            jQuery('.page-loader-wrapper').hide();
            swal("", "please enter late cash reason in remarks", "warning");
            return false;

        }

        if (sysAmt != TotalAmt) {
            jQuery('.page-loader-wrapper').hide();
            swal("", "Please check the total amount or entered late cash", "warning");
            return false;
            //  _Cashdenomination.clear();

        }
        if (Authr_Id == uid) {
            jQuery('.page-loader-wrapper').hide();
            swal("", "Authorised employee and logined employee is same", "warning");
            return false;
            //  _Cashdenomination.clear();

        }
        else {
            _Cashdenomination.scanFinger();
            
            //CashConfirmTablefillData = JSON.stringify(CashConfirmTablefillData);
            //CashConfirmTablefillData = { "encryptedRqstStr": EncryptAPIReq(CashConfirmTablefillData) };
        }
        //_http.post(MFPUBLICLMSAPI_URL + "accountdetails/BranchCashPosition", CashConfirmTablefillData, _Cashdenomination.CashConfirmcompleted, userdata.token)
      


    },

    clear: function () {

        window.location.href = "./cashdenomination";

    },

    CashConfirmcompleted: function (response) {


        if (response.status == "SUCCESS") {
           
          
           
            swal(" ", response.data.message, "success");
            //jQuery('#lbl500').text('');
            //jQuery('#lbl200').text('');
            //jQuery('#lbl100').text('');
            //jQuery('#lbl50').text('');
            //jQuery('#lbl20').text('');
            //jQuery('#lbl10').text('');
            //jQuery('#lbl5').text('');
            //jQuery('#lbl2').text('');
            //jQuery('#lbl1').text('');
            //// jQuery('#systotal').val('');
            //jQuery('#txttotal').val('');
            //jQuery('#txtlatecash').val('');
            //jQuery('#txtremark').val('');

            //jQuery('#txt500').val('');
            //jQuery('#txt200').val('');
            //jQuery('#txt100').val('');
            //jQuery('#txt50').val('');
            //jQuery('#txt20').val('');
            //jQuery('#txt10').val('');
            //jQuery('#txt5').val('');
            //jQuery('#txt2').val('');
            //jQuery('#txt1').val('');
           _Cashdenomination.clear();

        } else {
            swal(" ", response.responseMsg, "error");
        }
        jQuery('.page-loader-wrapper').hide();
    },

    SystemAmtFill: async function () {
        jQuery('.page-loader-wrapper').show();
        var SystemDepositAmount = {
            "typeId": 1,
            "branchId": userdata.branchId

        };

        //SystemDepositAmount = JSON.stringify(SystemDepositAmount);
        //SystemDepositAmount = { "encryptedRqstStr": EncryptAPIReq(SystemDepositAmount) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/BranchCashPosition", SystemDepositAmount, _Cashdenomination.SystemDepAmt, userdata.token);
    },

    SystemDepAmt: function (response) {
        if (response.status === "SUCCESS") {
            //AadharNo = response.data.uidToken;
            /*response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));*/
            if (response.data.sysAmount != null) {
                jQuery("#systotal").val(response.data.sysAmount);
            }
            else {
                jQuery("#systotal").empty();

            }

        }
        jQuery('.page-loader-wrapper').hide();
    },
}
// #region BiometricScan
var getJSONCapturePROD = function (url, callback) {
    
   
    var xhr = new XMLHttpRequest();
    xhr.open('CAPTURE', url, true);
    xhr.responseType = 'text'; //json


    var InputXml = '<PidOptions ver="1.0"> <Opts fCount="1" fType="2" iCount="0"  pCount="0" format="0" pidVer="2.0" timeout="10000" posh="UNKNOWN" env="P" /> </PidOptions>';
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
            
        } else {
            callback(status);
        }
    };
    xhr.send(InputXml);

};
var getJSONCapture = function (url, callback) {
    
    var xhr = new XMLHttpRequest();
    xhr.open('CAPTURE', url, true);
    xhr.responseType = 'text'; //json

    var InputXml = '<PidOptions ver="1.0"> <Opts fCount="1" fType="2" iCount="0"   pCount="0" format="0" pidVer="2.0" timeout="10000" posh="UNKNOWN" env="PP" /> </PidOptions>';
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);

        } else {
            callback(status);
        }
    };
    xhr.send(InputXml);

};
// #endregion
jQuery(document).ready(function ($) {


    jQuery('.page-loader-wrapper').hide();
    _Cashdenomination.SystemAmtFill();


    inputs = $("table :input");
    $(inputs).keyup(function (e) {
        if (e.keyCode == 13) {
            inputs[inputs.index(this) + 1].focus();
        }
    });


    //$('#txt2000').keyup(function () {
    //    var Data2000;
    //    Data2000 = $('#txt2000').val() * 2000;
    //    $('#lbl2000').text(Data2000);

    //});

    $('#txt500').keyup(function () {
        var Data500;
        Data500 = $('#txt500').val() * 500;
        $('#lbl500').text(Data500);

    });
    $('#txt200').keyup(function () {
        var Data200;
        Data200 = $('#txt200').val() * 200;
        $('#lbl200').text(Data200);

    });
    $('#txt100').keyup(function () {
        var Data100;
        Data100 = $('#txt100').val() * 100;
        $('#lbl100').text(Data100);

    });
    $('#txt50').keyup(function () {
        var Data50;
        Data50 = $('#txt50').val() * 50;
        $('#lbl50').text(Data50);

    });

    $('#txt20').keyup(function () {
        var Data20;
        Data20 = $('#txt20').val() * 20;
        $('#lbl20').text(Data20);

    });

    $('#txt10').keyup(function () {
        var Data10;
        Data10 = $('#txt10').val() * 10;
        $('#lbl10').text(Data10);

    });
    $('#txt5').keyup(function () {
        var Data5;
        Data5 = $('#txt5').val() * 5;
        $('#lbl5').text(Data5);

    });

    $('#txt2').keyup(function () {
        var Data2;
        Data2 = $('#txt2').val() * 2;
        $('#lbl2').text(Data2);

    });

    $('#txt1').keyup(function () {
        var Data1;
        Data1 = $('#txt1').val() * 1;
        $('#lbl1').text(Data1);

    });

    $("input[type='text']").keyup(function () {

        var total;

        total = /*parseInt($('#lbl2000').text() != ' ' ? $('#lbl2000').text() : 0) + */parseInt($('#lbl500').text() != ' ' ? $('#lbl500').text() : 0) + parseInt($('#lbl200').text() != ' ' ? $('#lbl200').text() : 0) + parseInt($('#lbl100').text() != ' ' ? $('#lbl100').text() : 0) + parseInt($('#lbl50').text() != ' ' ? $('#lbl50').text() : 0) + parseInt($('#lbl20').text() != ' ' ? $('#lbl20').text() : 0) + parseInt($('#lbl10').text() != ' ' ? $('#lbl10').text() : 0) + parseInt($('#lbl5').text() != ' ' ? $('#lbl5').text() : 0) + parseInt($('#lbl2').text() != ' ' ? $('#lbl2').text() : 0) + parseInt($('#lbl1').text() != ' ' ? $('#lbl1').text() : 0) + parseInt($('#txtcoin').val() == '' ? 0 : $('#txtcoin').val()) + parseInt($('#txtlatecash').val() == '' ? 0 : $('#txtlatecash').val());

        $('#txttotal').val(total);



    });






});
function getFormattedDateTime() {
    const now = new Date();

    const pad = (n) => n.toString().padStart(2, '0');

    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1); // Month is zero-based
    const year = now.getFullYear();

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}