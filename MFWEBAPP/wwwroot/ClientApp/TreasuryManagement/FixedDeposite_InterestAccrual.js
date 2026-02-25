var _fixeddeposit = {


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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _fixeddeposit.checkAccessRtn, token)
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
                    _fixeddeposit.loadfininst();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _fixeddeposit.checkAccessToken, userdata.token)
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
                _fixeddeposit.loadfininst();
            }


        }

    },


    //Select Financial Institution 
    loadfininst: function () {
        jQuery('.page-loader-wrapper').show();
        var DebSelectLoan = {
            Flag: "fixeddepositapproval",
            PagVal: "GetfinINTACCR",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebSelectLoan = JSON.stringify(DebSelectLoan);
        DebSelectLoan = { "encryptedRqstStr": EncryptAPIReq(DebSelectLoan) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DebSelectLoan, _fixeddeposit.FillDebfininst, userdata.token);

    },

    FillDebfininst: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlfininst").empty();
                jQuery("#ddlfininst").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  Financial Institution  -------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlfininst").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlfininst").empty();
                jQuery("#ddlfininst").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  Financial Institution------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //Select FD  
    loadfd: function () {
        jQuery('.page-loader-wrapper').show();
        var sub = jQuery('#ddlfininst').val();
        var DebSelectLoan = {
            Flag: "fixeddepositapproval",
            PagVal: "GetFDINTACCR",
            parVal: sub,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebSelectLoan = JSON.stringify(DebSelectLoan);
        DebSelectLoan = { "encryptedRqstStr": EncryptAPIReq(DebSelectLoan) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DebSelectLoan, _fixeddeposit.FillDebfd, userdata.token);

    },

    FillDebfd: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFD").empty();
                jQuery("#ddlFD").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  Select FD   -------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFD").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFD").empty();
                jQuery("#ddlFD").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  Select FD ------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },



    //Table display
    ShowTable: function () {
        jQuery('.page-loader-wrapper').show();
        var subz = jQuery("#ddlFD").val();
        

        var FromLoanDtls = {
            Flag: "fixeddepositapproval",
            PagVal: "GetFD_IntAccr_ApprovTable",
            parVal: subz,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", FromLoanDtls, _fixeddeposit.FillTable, userdata.token);

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


                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[5]));

                        jQuery('#Fidatatabl').append($row);

                    });
                }

            }
        }
    },


    //New fd Approval popup
    checkvalues: function () {
        var Selectfinint = jQuery('#ddlfininst').val();
        var Selectfd = jQuery('#ddlFD').val();
        





        if (Selectfinint == 0) {
            swal("", "Please Select Financial Institution ", "error");
            return false;
        }
        else if (Selectfd == 0) {
            swal("", "Please Select FD", "error");
            return false;
        }
        else
            return true;

    },



    // validation confirm button.

    Confirmfntn: function () {

        if (_fixeddeposit.checkvalues()) {

            var FD = jQuery("#ddlFD").val();
            var reson = jQuery("#txtremarks").val();
            var tableData = document.getElementById('tbldespatch');
            var entrypostdte = tableData.rows[1].cells[0].innerText;
            var entryrevdate = tableData.rows[1].cells[1].innerText;
            
            var subac = tableData.rows[1].cells[3].innerText;
            var subid = tableData.rows[1].cells[4].innerText;
            var amount = tableData.rows[1].cells[5].innerText;


            
             if (jQuery("#radAppr").prop("checked") == true) {

                 type = 'fixeddepositeConfirmFDIntAccrual';

                Data = userdata.userId + "µ" + FD + "µ" + subac + "µ" + subid + "µ" + amount + "µ" + entrypostdte + "µ" + entryrevdate;

            }
            if (jQuery("#radRjct").prop("checked") == true) {

                type = 'RejectFDIntAccrual';
                

                Data = userdata.userId + "µ" + reson + "µ" + FD;

            }
           

            var submitRequest = {

                Flag: type,
                PagVal: Data,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
               
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _fixeddeposit.SubmitReturn, 'dfgdfgfgdfgdfgd')
        }

    },

    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                var msg = jQuery.trim(response.data.message);

                if (response.data.errStatus = "1") {
                    if (response.data.queryResult.QueryResult[0].Param1 == "1") {
                        swal({
                            title: "Approved Successfully...!!! ",
                            text: "",
                            type: "success"
                        }, function () {
                            window.location.reload(true);
                        });
                    }
                    else if (response.data.queryResult.QueryResult[0].Param1 == "2") {
                        swal({
                            title: "Rejected successfully.!!!",
                            text: "",
                            type: "success"
                        }, function () {
                            window.location.reload(true);
                        });
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
        }
    },






}



jQuery(document).ready(function () {

    //_fixeddeposit.loadfininst();
    _fixeddeposit.tokenValidate();
    jQuery('#ddlfininst').on("change", function () {
        var Selectfinint = jQuery('#ddlfininst').val();
        if (Selectfinint == 0) {
            window.location.reload(true);
        }
        else {

            jQuery('#selectid').show();
            jQuery('#ddlFD').val(" ");
            jQuery('#maincard').hide();
            jQuery('#dvrejectremarks').hide();

            jQuery('#txtremarks').val("");
            jQuery('#radAppr').prop('checked', false);
            jQuery('#radRjct').prop('checked', false);

            _fixeddeposit.loadfd();
        }
    });
    jQuery('#ddlFD').on("change", function () {

       /* jQuery('#maincard').show();*/

        _fixeddeposit.ShowTable();
    });

    jQuery("#radRjct").on("click", function () {

        jQuery("#dvrejectremarks").show();

    });
    jQuery('#radAppr').on("click", function () {

        jQuery('#dvrejectremarks').hide();
    });
    jQuery('#btnConf').on("click", function () {


        _fixeddeposit.Confirmfntn();
    });



});
