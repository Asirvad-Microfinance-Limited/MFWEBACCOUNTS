var depositeval;
var Strbase64 = 0


var _DepositWithBankUpdate = {


    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var CheckAccess = {
            "typeID": "2",
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1001",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            CheckAccess = JSON.stringify(CheckAccess);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _DepositWithBankUpdate.checkAccessRtn, token)
    },

    checkAccessRtn: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                token = response.data.token;
                var x = response.data.queryResult[0].param1;
                if (x == "0") {
                    swal({
                        title: "Access Denied",
                        text: "You are not autherized to view this page.!",
                        type: "info"
                    }, function () {
                        window.location.href = "dashboard";
                    });
                }
                else {
                    _DepositWithBankUpdate.loadSelectBank();
                }

            }
        }
        else {
            swal({
                title: "Access Denied",
                text: "You are not autherized to view this page.!",
                type: "info"
            }, function () {
                window.location.href = "dashboard";
            });
        }
    },

    tokenValidate: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var CheckToken = {
            "typeID": "1",
            "userID": userdata.userId,
            "branchID": userdata.branchId

        };

        try {
            CheckToken = JSON.stringify(CheckToken);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckToken = { "encryptedRqstStr": EncryptAPIReq(CheckToken) };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _DepositWithBankUpdate.checkAccessToken, userdata.token)
    },

    // Token response



    checkAccessToken: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            token = response.data.queryResult.tokenId;
            if (response.data.errStatus == 0) {
                swal({
                    title: "Access Denied",
                    text: "You are already login in pr module!",
                    type: "info"
                }, function () {
                    window.location.href = "dashboard";
                });
            }
            else {
                _DepositWithBankUpdate.loadSelectBank();
            }


        }

    },

    //Select Bank
    loadSelectBank: function () {
        jQuery('.page-loader-wrapper').show();
        var SelectBank = {
            Flag: "DepositWithBankUpdate",
            PagVal: "Getbanktype",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        SelectBank = JSON.stringify(SelectBank);
        SelectBank = { "encryptedRqstStr": EncryptAPIReq(SelectBank) };
        //_http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", SelectBank, _DepositWithBankUpdate.fillSelectBank, userdata.token);
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", SelectBank, _DepositWithBankUpdate.fillSelectBank, userdata.token);

    },
    fillSelectBank: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlbanktype").empty();
                jQuery("#ddlbanktype").append(jQuery("<option></option>").val("0").text(" --------SELECT BANK-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlbanktype").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlbanktype").empty();
                jQuery("#ddlbanktype").append(jQuery("<option></option>").val("0").text(" --------SELECT BANK-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Select Date
    loadSelectDate: function (intdata) {
        jQuery('.page-loader-wrapper').show();
        var SelectDate = {
            Flag: "DepositWithBankUpdate",
            PagVal: "GetDateType",
            parVal: intdata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        SelectDate = JSON.stringify(SelectDate);
        SelectDate = { "encryptedRqstStr": EncryptAPIReq(SelectDate) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", SelectDate, _DepositWithBankUpdate.fillSelectDate, userdata.token);
    },
    fillSelectDate: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddldatetype").empty();
                jQuery("#ddldatetype").append(jQuery("<option></option>").val("0").text(" --------SELECT DEPOSIT DATE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddldatetype").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddldatetype").empty();
                jQuery("#ddldatetype").append(jQuery("<option></option>").val("0").text(" --------SELECT DEPOSIT DATE-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //Select Fixed Deposit
    loadFixedDeposit: function (intdata) {
        jQuery('.page-loader-wrapper').show();
        var FixedDeposit = {
            Flag: "DepositWithBankUpdate",
            PagVal: "GetFDType",
            parVal: intdata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        FixedDeposit = JSON.stringify(FixedDeposit);
        FixedDeposit = { "encryptedRqstStr": EncryptAPIReq(FixedDeposit) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FixedDeposit, _DepositWithBankUpdate.fillFixedDeposit, userdata.token);
    },
    fillFixedDeposit: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                /*depositeval = response.data.queryResult;*/


                

                //  var depositeval = response.data.queryResult.QueryResult.Param1;
                // depositeval = val(number.Param1)

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFiType").empty();
                jQuery("#ddlFiType").append(jQuery("<option></option>").val("0").text(" --------SELECT FIXED DEPOSIT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFiType").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFiType").empty();
                jQuery("#ddlFiType").append(jQuery("<option></option>").val("0").text(" --------SELECT FIXED DEPOSIT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Table


    getFromLoanDtls: function () {
        jQuery('.page-loader-wrapper').show();
        var sub = jQuery("#ddlFiType").val();


        var FromLoanDtls = {
            Flag: "DepositWithBankUpdate",
            PagVal: "getTableupdfdDtls",
            parVal: sub,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _DepositWithBankUpdate.FromLoanDtlsResponse, userdata.token);

    },
    FromLoanDtlsResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                _DepositWithBankUpdate.FillTable(response);

            }
            else {

                return false;
            }
        }
    },
    FillTable: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();
                jQuery('#maincard').show();

                if (response.data.queryResult.QueryResult.length > 0) {

                    jQuery('#Fidatatabl').empty();
                    jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                        var $row = jQuery('<tr/>');
                        var data1 = val.Param1.split("~");
                        //var nval = nval + 1;

                        //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                        /* $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));*/
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[5]));
                        // $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                        // $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                        jQuery('#Fidatatabl').append($row);
                    });
                }

            }
        }

    },



    convertToBase64: function (img) {
        Strbase64 = "";
        DFILETYPE = "";
        //var a = "travelFile";
        var a = img;
        //Read File
        var selectedFile = document.getElementById(a).files;
        //Check File is not Empty
        if (selectedFile.length > 0) {
            //Size checking //
            var sizeInKB = selectedFile[0].size / 1024;
            var sizeLimit = 200;
            //if (sizeInKB >= sizeLimit) {
            //    swal("", "Max file size allowed is 200KB", "warning");
            //    selectedFile = "";
            //    return false;
            //}
            // TEST BLOB TO BASE 64 //

            //var reader = new FileReader();
            //reader.readAsDataURL(blob);
            //reader.onloadend = function () {
            //    var base64String = reader.result;
            //   // console.log('Base64 String - ', base64String);

            //TEST BLOB TO BASE 64 //

            // Select the very first file from list
            var fileToLoad = selectedFile[0];
            // FileReader function for read the file.
            var fileReader = new FileReader();
            var base64;
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
            // Onload of file read the file content
            fileReader.onloadend = function (fileLoadedEvent) {
                base64 = fileLoadedEvent.target.result;
                if (base64.toString().includes("data:application/pdf;base64")) {
                    DFILETYPE = "PDF";
                    swal("", "Please only upload Images..!", "warning");
                    jQuery('#payfile').val("");
                    jQuery('#tick').hide();
                    jQuery('#close').show();
                    return false;

                }
                else {
                    DFILETYPE = "IMG";
                }
                if ((base64.toString().includes("data:image/jpeg;base64")) || (base64.toString().includes("data:image/img;base64")) || (base64.toString().includes("data:image/jpg;base64")) || (base64.toString().includes("data:image/png;base64"))) {
                    DFILETYPE = "IMG";
                }
                else {
                    swal("", "Please only upload Images..!", "warning");
                    jQuery('#payfile').val("");
                    jQuery('#tick').hide();
                    jQuery('#close').show();

                    return false;
                }

                Strbase64 = base64.toString().replace('data:application/pdf;base64,', '').replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');

            };
            if (Strbase64 != null) {
                jQuery('#tick').show();
                jQuery('#close').hide();
            }
        }
        else {

            swal("", "Add Image..!", "warning");
            return false;
        }
    },

    checkvalues: function () {
        var SelectBank = jQuery('#ddlbanktype').val();
        var Date = jQuery('#ddldatetype').val();
        var FiDeposit = jQuery('#ddlFiType').val();
        var FDNO = jQuery('#txtFDNo').val();




        if (SelectBank == 0) {
            swal("", "Please Select Bank", "error");
            return false;
        }
        else if (Date == 0) {
            swal("", "Please Select Date", "error");
            return false;
        }
        else if (FiDeposit == 0) {
            swal("", "Please Select Fixed Deposit", "error");
            return false;
        }
        else if (FDNO <= 0) {
            swal("", "Please Enter The Updated FD Number:", "error");
            return false;
        }
        //else if (fdreceipt == 0) {
        //    swal("", "Please choose image:", "error");
        //    return false;
        //}
        //else if (fdreceipt == 0) {
        //    swal("", "Please choose image", "error");
        //    return false;
        //}



        else
            return true;
    },
    submitevalue: function (depositeval) {
        if (_DepositWithBankUpdate.checkvalues()) {



            data = jQuery("#txtFDNo").val() + "µ" + jQuery("#ddlFiType").val() + "µ" + userdata.userId + "µ" + jQuery("#txtremark").val();;


        }
        var submitRequest = {

            Flag: "Confirmfdupdate",
            PagVal: data,
            parVal: depositeval,
            invoiceFile: Strbase64,
            fileType: "img",
            CollectionName: "FDreceipt",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        submitRequest = JSON.stringify(submitRequest);
        submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _DepositWithBankUpdate.SubmitReturn, 'dfgdfgfgdfgdfgd')

    },
    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                var msg = jQuery.trim(response.data.message);
                
                if (Strbase64 !=0)
                {
                        _DepositWithBankUpdate.insertreceipt();
                 }

                else {
                    //var msg = String.prototype.trim(response.data.message);
                    if (response.data.errStatus = "1") {
                        if (response.data.queryResult.QueryResult[0].Param1 == "1") {
                            swal({
                                title: "UPDATES Successfully!",
                                text: "",
                                type: "success"
                            }, function () {
                                window.location.reload(true);
                            });
                        }
                        else {
                            swal({
                                title: "UPDATES Successfully!",
                                text: "",
                                type: "success"
                            }, function () {
                                window.location.reload(true);
                            });
                        }

                    }
                }
            }
            else if (response.responseMsg == "Invalid Token") {
                window.location.href = DOMAIN_URL;
            }
            else {
                var msg = jQuery.trim(response.responseMsg);
                swal({
                    title: "Error",
                    text: msg,
                    type: "error"
                }, function () {
                    window.location.reload(true);
                });
            }
        }

    },


    insertreceipt: function (depositeval) {
        //for (var i = 0; i < filelength; i++) {
        //    base64string = conveydocs[i];
        //    conveydoctype1 = conveydoctype[i];
        var msg = "FDRECEIPT";

        depositeval = jQuery("#ddlFiType").val();     



            var FdreceiptConfirm = {
                "typeId": 0,
                "image": Strbase64,
                "collectionName": msg,
                "fileName": msg,
                "recordingId": depositeval,
                "imageType": "img",
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId


            };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/insertimage2", FdreceiptConfirm, _DepositWithBankUpdate.Fdreceipt, userdata.token)

    },
    Fdreceipt: function (response) {
        if (response.status == "SUCCESS") {
            var expid = jQuery.trim(response.data.expence_id);

            swal({
                title: "UPDATEED Successfully",
                text: "success ",
                type: "success"
            },



                function () {
                    window.location.reload(true);
                });
        }
        else {
            swal("Error", "Not Uploaded", "error");
        }
    },

    }





jQuery(document).ready(function () {

    jQuery('.page-loader-wrapper').hide();
    //_DepositWithBankUpdate.loadSelectBank();
    _DepositWithBankUpdate.tokenValidate();


});

jQuery('#ddlbanktype').on("change", function () {
    jQuery("#ddlDate").show();

    var intdata = jQuery("#ddlbanktype").val();

    _DepositWithBankUpdate.loadSelectDate(intdata);
});


jQuery('#ddldatetype').on("change", function () {
    jQuery("#ddlFixedDeposit").show();

    var intmain = jQuery("#ddlbanktype").val() + 'µ' + jQuery("#ddldatetype").val();
    _DepositWithBankUpdate.loadFixedDeposit(intmain);


});

jQuery('#ddlFiType').on("change", function () {

    $("#showcorddiv").show();
    $("#divmethod").show();

    _DepositWithBankUpdate.getFromLoanDtls();
});

jQuery('#btnConf').on("click", function () {
    var depositeval = jQuery("#ddlFiType").val();

    _DepositWithBankUpdate.submitevalue(depositeval);

});

jQuery('#fdrecipt').on("change", function () {
    var file = "fdrecipt";

    _DepositWithBankUpdate.convertToBase64(file);
});
