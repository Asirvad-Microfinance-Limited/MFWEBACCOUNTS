var _Loanavailment = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _Loanavailment.checkAccessRtn, token)
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
                    _Loanavailment.loadFIType();
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

       // Token validation


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


    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _Loanavailment.checkAccessToken, userdata.token)
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
            _Loanavailment.loadFIType();
        }


    }
    },
    convertdateformat: function (dt) {
        ndt = dt.replace(/\//g, '-');
        var vyear = ndt.split('-')[2];
        var vmonth = parseInt(ndt.split('-')[0]);
        var vday = ndt.split('-')[1];
        var vmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var vmon = vmonths[vmonth - 1];
        var valtortn = vday + '-' + vmon + '-' + vyear;
        return valtortn
    },



    //financial institution type
    loadFIType: function () {
        jQuery('.page-loader-wrapper').show();

        
        var fiTypes = {
            Flag: "LoanAvailment",
            PagVal: "GetFITypes",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };

        fiTypes = JSON.stringify(fiTypes);
        fiTypes = { "encryptedRqstStr": EncryptAPIReq(fiTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", fiTypes, _Loanavailment.fillFiType, userdata.token);
    },
    fillFiType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFiType").empty();
                jQuery("#ddlFiType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI INS TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFiType").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFiType").empty();
                jQuery("#ddlFiType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI INS TYPE -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //financial institution
    LoadFiIns: function () {

        var fundtype = jQuery("#ddlFiType").val();
        jQuery('.page-loader-wrapper').show();
        var fiInsTypes = {
            Flag: "LoanAvailment",
            PagVal: "SELFININST",
            parVal: fundtype,
             typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        fiInsTypes = JSON.stringify(fiInsTypes);
        fiInsTypes = { "encryptedRqstStr": EncryptAPIReq(fiInsTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", fiInsTypes, _Loanavailment.fillFiInsType, userdata.token);
    },
    fillFiInsType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFi").empty();
                jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI INS-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFi").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFi").empty();
                jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI INS-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //fund Category
    LoadFundCat: function () {

        jQuery('.page-loader-wrapper').show();

        var fundtype = jQuery("#ddlFi").val();
      
        var fundcatTypes = {
            Flag: "LoanAvailment",
            PagVal: "SELFUNDSOURCE",
            parVal: fundtype,
             typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        fundcatTypes = JSON.stringify(fundcatTypes);
        fundcatTypes = { "encryptedRqstStr": EncryptAPIReq(fundcatTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", fundcatTypes, _Loanavailment.fundcatTypes, userdata.token);
    },
    fundcatTypes: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlCategory").empty();
                jQuery("#ddlCategory").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FUND CATEGORY-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlCategory").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlCategory").empty();
                jQuery("#ddlCategory").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FUND CATEGORY-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    //fund sub category
    LoadSubFundCat: function () {

        jQuery('.page-loader-wrapper').show();

        var InputData = jQuery("#ddlCategory").val() + "µ" + jQuery("#ddlFi").val();

        var fundsubcatTypes = {
            Flag: "LoanAvailment",
            PagVal: "SELSUBFUND",
            parVal: InputData,
             typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        fundsubcatTypes = JSON.stringify(fundsubcatTypes);
        fundsubcatTypes = { "encryptedRqstStr": EncryptAPIReq(fundsubcatTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", fundsubcatTypes, _Loanavailment.fillfundsubcatTypes, userdata.token);
    },
    fillfundsubcatTypes: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
            jQuery('.page-loader-wrapper').hide();

            jQuery("#ddlSubCat").empty();
            jQuery("#ddlSubCat").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SUB FUND CATEGORY-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                jQuery("#ddlSubCat").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
            });

        }
        else {

            jQuery("#ddlSubCat").empty();
            jQuery("#ddlSubCat").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB FUND CATEGORY-------- "));
        }
        jQuery('.page-loader-wrapper').hide();
      }
    },

    

     //select fund
    LoadFUND: function () {

        jQuery('.page-loader-wrapper').show();


        if ((jQuery('#ddlSubFundSourse').val() == '4') || (jQuery('#ddlSubFundSourse').val() == '5') || (jQuery('#ddlSubFundSourse').val() == '8')) {
            jQuery('#divRateTerm').show();
        }
        else {
            jQuery('#divRateTerm').hide();
        }
        var InputData = jQuery("#ddlSubCat").val() + "µ" + jQuery("#ddlFi").val()


        var fundTypes = {
            Flag: "LoanAvailment",
            PagVal: "SELFUND",
            parVal: InputData,
             typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        fundTypes = JSON.stringify(fundTypes);
        fundTypes = { "encryptedRqstStr": EncryptAPIReq(fundTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", fundTypes, _Loanavailment.fillfundTypes, userdata.token);
    },
    fillfundTypes: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlfund").empty();
                jQuery("#ddlfund").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  LOAN-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlfund").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlfund").empty();
                jQuery("#ddlfund").append(jQuery("<option></option>").val("0").text(" --------CHOOSE LOAN-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlfund").empty();
            jQuery("#ddlfund").append(jQuery("<option></option>").val("0").text("--------CHOOSE LOAN--------  "));
            //  window.location.href = DOMAIN_URL + "insuranceclaimapproval";
        }
    },
    //Loadamountfund: function () {
    //    var M = jQuery('#ddlfund').text();
    //    var centerSplit = M.split('~');
    //    var centerId = centerSplit[0];
    //    var loanlimit = centerSplit[1];
    //    var loanbalance = centerSplit[2];
    //    var k = centerSplit[3];
    //    var p = centerSplit[4];
    //    jQuery("#txtLoanlimit").val(loanlimit)
    //    jQuery("#txtLoanbalan").val(loanbalance)
    //},
    //table details
    getFromLoanDtls: function () {
        jQuery('.page-loader-wrapper').show();
       // data: "{typ:'SELFUNDPROVIDER', val1:'" + $('#ddlFundSourse').val() + "',data:'" + $('#ddlFund').val().split("æ")[1] + "'}",
        //  $('#ddlFund').val().split("æ")[1]
       //   var sub = $('#ddlfund').val();
         var M = jQuery('#ddlfund').val();
        var centerSplit = M.split('æ');
        var sub = centerSplit[1];

        var FromLoanDtls = {
            Flag: "LoanAvailment",
            PagVal: "SELFUNDPROVIDER",
            parVal: sub,
             typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", FromLoanDtls, _Loanavailment.FillTable, userdata.token);

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
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[5]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                   // $row.append(jQuery('<td class="HCol" align="left">').html(data1[10]));
                   // $row.append(jQuery('<td class="HCol" align="left">').html(data1[11]));
                    jQuery('#Fidatatabl').append($row);

                    var loanlimit = data1[7];
                    var loanbalance = data1[10];
                    var processingfee = data1[11];
                    jQuery("#txtLoanlimit").val(loanlimit);
                    jQuery("#txtLoanbalan").val(loanbalance);
                    jQuery("#txtProcessFee").val(processingfee);
                });
                    

            }

        }
       }
    },
    //interest type

    loadintType: function () {
        jQuery('.page-loader-wrapper').show();


        var interTypes = {
            Flag: "LoanAvailment",
            PagVal: "SELINTRESTTYPE",
             typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        interTypes = JSON.stringify(interTypes);
        interTypes = { "encryptedRqstStr": EncryptAPIReq(interTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", interTypes, _Loanavailment.fillintType, userdata.token);
    },
    fillintType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlInttype").empty();
                jQuery("#ddlInttype").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN A/C-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlInttype").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlInttype").empty();
                jQuery("#ddlInttype").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN A/C -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    ///*2 sub  Main a/c*/
    //LoadSubacc: function () {
    //    jQuery('.page-loader-wrapper').show();
    //    var InputData = jQuery("#ddl_DebmainAcc").val();

    //    var mainsubTypes = {
    //        Flag: "processingfee",
    //        PagVal: "GetSubAcc",
    //        parVal: InputData,
    //    };
    //    _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", mainsubTypes, _Loanavailment.fillMainsubacType, userdata.token);
    //},



    //interest method

    loadintmethod: function () {
        jQuery('.page-loader-wrapper').show();


        var interestmethTypes = {
            Flag: "LoanAvailment",
            PagVal: "GetIntMethodType",
             typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        interestmethTypes = JSON.stringify(interestmethTypes);
        interestmethTypes = { "encryptedRqstStr": EncryptAPIReq(interestmethTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", interestmethTypes, _Loanavailment.fillintMethodType, userdata.token);
    },
    fillintMethodType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlintmet").empty();
                jQuery("#ddlintmet").append(jQuery("<option></option>").val("0").text(" --------CHOOSE Interest Type-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlintmet").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlintmet").empty();
                jQuery("#ddlintmet").append(jQuery("<option></option>").val("0").text(" --------CHOOSE Interest Type -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Principal method

    loadprinmethod: function () {
        jQuery('.page-loader-wrapper').show();


        var principalmethTypes = {
            Flag: "LoanAvailment",
            PagVal: "GetPrcMethodType",
             typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        principalmethTypes = JSON.stringify(principalmethTypes);
        principalmethTypes = { "encryptedRqstStr": EncryptAPIReq(principalmethTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", principalmethTypes, _Loanavailment.fillprinMethodType, userdata.token);
    },
    fillprinMethodType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlprinmet").empty();
                jQuery("#ddlprinmet").append(jQuery("<option></option>").val("0").text(" --------CHOOSE Principal Type-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlprinmet").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlprinmet").empty();
                jQuery("#ddlprinmet").append(jQuery("<option></option>").val("0").text(" --------CHOOSE Principal Type -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },





    //Main a/c
    loadmainType: function () {
        jQuery('.page-loader-wrapper').show();


        var mainTypes = {
            Flag: "LoanAvailment",
            PagVal: "GetMainAcc",
             typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        mainTypes = JSON.stringify(mainTypes);
        mainTypes = { "encryptedRqstStr": EncryptAPIReq(mainTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", mainTypes, _Loanavailment.fillMainacType, userdata.token);
    },
    fillMainacType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_DebmainAcc").empty();
                jQuery("#ddl_DebmainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN A/C-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_DebmainAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_DebmainAcc").empty();
                jQuery("#ddl_DebmainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN A/C -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    //2 sub  Main a/c
    LoadSubacc: function () {
        jQuery('.page-loader-wrapper').show();
        var InputData = jQuery("#ddl_DebmainAcc").val();

        var mainsubTypes = {
            Flag: "LoanAvailment",
            PagVal: "GetSubAcc",
            parVal: InputData,
             typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };

        mainsubTypes = JSON.stringify(mainsubTypes);
        mainsubTypes = { "encryptedRqstStr": EncryptAPIReq(mainsubTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", mainsubTypes, _Loanavailment.fillMainsubacType, userdata.token);
    },
    fillMainsubacType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_DebSubAcc").empty();
                jQuery("#ddl_DebSubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN SUB  A/C-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_DebSubAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_DebSubAcc").empty();
                jQuery("#ddl_DebSubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN SUB A/C -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //3 subid  Main a/c
    LoadSubidacc: function () {
        jQuery('.page-loader-wrapper').show();
        
        var mainaccount = jQuery('#ddl_DebmainAcc').val();
        var subaccount = jQuery('#ddl_DebSubAcc').val();


        var data = mainaccount + 'µ' + subaccount;
        var mainsubidTypes = {
            Flag: "LoanAvailment",
            PagVal: "GetSubDebID",
            parVal: data,
             typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        mainsubidTypes = JSON.stringify(mainsubidTypes);
        mainsubidTypes = { "encryptedRqstStr": EncryptAPIReq(mainsubidTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", mainsubidTypes, _Loanavailment.fillMainsubidacType, userdata.token);
    },
    fillMainsubidacType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_DebSubID").empty();
                jQuery("#ddl_DebSubID").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN SUB  A/C-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_DebSubID").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_DebSubID").empty();
                jQuery("#ddl_DebSubID").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN SUB A/C -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },



    //1 Fin cost  Main a/c
    loadFincstmainType: function () {
        jQuery('.page-loader-wrapper').show();

      
        var finmainTypes = {
            Flag: "LoanAvailment",
            PagVal: "GetINTFIAcc",
             typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
           
        };
        finmainTypes = JSON.stringify(finmainTypes);
        finmainTypes = { "encryptedRqstStr": EncryptAPIReq(finmainTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", finmainTypes, _Loanavailment.fillfincstMainacType, userdata.token);
    },
    fillfincstMainacType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_DebFImainAcc").empty();
                jQuery("#ddl_DebFImainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN SUB  A/C-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_DebFImainAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_DebFImainAcc").empty();
                jQuery("#ddl_DebFImainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN SUB A/C -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //2 Fin cost sub  Main a/c
    loadFincstsubType: function () {
        jQuery('.page-loader-wrapper').show();
        var data = jQuery('#ddl_DebFImainAcc').val();

        var finsubTypes = {
            Flag: "LoanAvailment",
            PagVal: "GetINTFISUBAcc",
             parVal: data,
              typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        finsubTypes = JSON.stringify(finsubTypes);
        finsubTypes = { "encryptedRqstStr": EncryptAPIReq(finsubTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", finsubTypes, _Loanavailment.fillfincstsubacType, userdata.token);
    },
    fillfincstsubacType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_DebFISubAcc").empty();
                jQuery("#ddl_DebFISubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN SUB  A/C-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_DebFISubAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_DebFISubAcc").empty();
                jQuery("#ddl_DebFISubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN SUB A/C -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //3 Fin cost subid  Main a/c
    loadFincstsubidType: function () {
        jQuery('.page-loader-wrapper').show();
        var mainaccount = jQuery('#ddl_DebFImainAcc').val();
        var subaccount = jQuery('#ddl_DebFISubAcc').val();


        var data = mainaccount + 'µ' + subaccount;

        var finsubTypes = {
            Flag: "LoanAvailment",
            PagVal: "GetSubDebFIID",
             parVal: data,
              typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        finsubTypes = JSON.stringify(finsubTypes);
        finsubTypes = { "encryptedRqstStr": EncryptAPIReq(finsubTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", finsubTypes, _Loanavailment.fillfincstsubidacType, userdata.token);
    },
    fillfincstsubidacType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_DebSubFIID").empty();
                jQuery("#ddl_DebSubFIID").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN SUB  A/C-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_DebSubFIID").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_DebSubFIID").empty();
                jQuery("#ddl_DebSubFIID").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN SUB A/C -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //1 INT  Main a/c
    loadINTmainType: function () {
        jQuery('.page-loader-wrapper').show();
       

        var IntMainTypes = {
            Flag: "LoanAvailment",
            PagVal: "GetINTMainAcc",
             typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        IntMainTypes = JSON.stringify(IntMainTypes);
        IntMainTypes = { "encryptedRqstStr": EncryptAPIReq(IntMainTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", IntMainTypes, _Loanavailment.fillintmainType, userdata.token);
    },
    fillintmainType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_DebINTmainAcc").empty();
                jQuery("#ddl_DebINTmainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN SUB  A/C-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_DebINTmainAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_DebINTmainAcc").empty();
                jQuery("#ddl_DebINTmainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN SUB A/C -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    //2 INT sub Main a/c
    loadintsubaccType: function () {
        jQuery('.page-loader-wrapper').show();
        var data = jQuery('#ddl_DebINTmainAcc').val();
        
        var IntMainsubTypes = {
            Flag: "LoanAvailment",
            PagVal: "GetINTSubAcc",
            parVal: data,
             typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        IntMainsubTypes = JSON.stringify(IntMainsubTypes);
        IntMainsubTypes = { "encryptedRqstStr": EncryptAPIReq(IntMainsubTypes) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", IntMainsubTypes, _Loanavailment.fillintsubType, userdata.token);
    },
    fillintsubType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_DebINTSubAcc").empty();
                jQuery("#ddl_DebINTSubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN SUB  A/C-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_DebINTSubAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_DebINTSubAcc").empty();
                jQuery("#ddl_DebINTSubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN SUB A/C -------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //get main aa
    getBnkIDdtl: function () {
        jQuery('.page-loader-wrapper').show();

        var mainaccLoad = {

            Flag: "LoanAvailment",
            PagVal: "GetBnkID",
             typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
            // parVal: InputData

        };

        mainaccLoad = JSON.stringify(mainaccLoad);
        mainaccLoad = { "encryptedRqstStr": EncryptAPIReq(mainaccLoad) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", mainaccLoad, _Loanavailment.FillMainAccResponse, userdata.token);
    },
    FillMainAccResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_mainAcc").empty();
                jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN ACC-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_mainAcc").empty();
                jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN ACC-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    //get sub  main aa
    getSubBnkDtl: function () {
        jQuery('.page-loader-wrapper').show();
        var inputdata = jQuery("#ddl_mainAcc").val();
        var SubaccLoad = {

            Flag: "LoanAvailment",
            PagVal: "GetSubBnkID",
            parVal: inputdata,
             typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        SubaccLoad = JSON.stringify(SubaccLoad);
        SubaccLoad = { "encryptedRqstStr": EncryptAPIReq(SubaccLoad) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", SubaccLoad, _Loanavailment.FillSubAccResponse, userdata.token);
    },
    FillSubAccResponse: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_SubAcc").empty();
                jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB MAIN ACC-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_SubAcc").empty();
                jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB MAIN ACC-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    //file upload
    
    GetData: function () {

        if (jQuery('#fileUpload').val() == "") {
            swal("Choose a Excel File....!", "", "warning");
            jQuery('#fileUpload').val('');
            return false;
        }

        jQuery('.page-loader-wrapper').show();
        var fileUpload = document.getElementById("fileUpload");

        var fileUpload = document.getElementById("fileUpload");

        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;

        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();


                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                jQuery('.page-loader-wrapper').hide();
                swal("This browser does not support HTML5..!", "", "warning");
                return false;
            }
        }

        else {
            jQuery('.page-loader-wrapper').hide();
            swal("Upload a valid Excel..!", "", "warning");
            return false;
        }
    },



    submitdata1: function (itmdata) {

        if (_Loanavailment.checkvalues()) {


            var Loanamnt = jQuery('#txtloanamt').val();

            var inttype1 = jQuery('#ddlInttype').val();
            if (!jQuery('#ddlInttype').val()) {
                inttype1 = jQuery('#ddlInttype').val();
            }
            if (jQuery('#ddlInttype').val() == null) {
                inttype1 = "";
            }

            if (!jQuery('#ddlmodpay').val()) {
                modpay = jQuery('#ddlmodpay').val();
            }
            if (jQuery('#ddlmodpay').val() == null) {
                modpay = "";
            }

            var raterm = "";
            if ((jQuery('#ddlSubCat').val() == '4') || (jQuery('#ddlSubCat').val() == '5') || (jQuery('#ddlSubCat').val() == '8')) {
                raterm = jQuery('#txtRateTerm').val();
            }
            else {
                raterm = "";
            }


            var mod = jQuery('#ddlmodpay').val();


            var M = jQuery('#ddlfund').val();
            var centerSplit = M.split('æ');
            var loanid = centerSplit[1];
            //var ftype = $('#ddlFund').val().split("~")[0];
            //var ftype_id = ftype.split("æ")[0];
            if ((mod == '-1') && (ftype_id != '8') && (ftype_id != '9')) {
                if (ftype_id != '6') {
                    swal("", "Select Payment Mode", "error");
                    return false;
                }

            }
            else if (jQuery('#txtloanamt').val() == '' && ftype_id != '9') {
                swal("", "Select Payment Mode", "error");
                return false;
            }


            jQuery('.page-loader-wrapper').show();
                if (excelRows == undefined) {

                    swal("View Data and Verify...!", "", "warning");
                    return false;
                }
                if (excelRows.length == 0) {
                    swal("View Data and Verify...!", "", "warning");
                    jQuery('.page-loader-wrapper').hide();

                    return false;
                }

           var intrate= jQuery('#txtintrate').val();
            var tenure = jQuery('#txtTenureday').val();
            var availdtae = _Loanavailment.convertdateformat(jQuery('#txtAvailmentDate').val());
            //var availdtae = jQuery('#txtAvailmentDate').val();
           // var maturidtae = jQuery('#txtMaturityDate').val();
            var maturidtae = _Loanavailment.convertdateformat(jQuery('#txtMaturityDate').val());
            var mainacc = jQuery('#ddl_DebmainAcc').val();
            var mainsubacc = jQuery('#ddl_DebSubAcc').val();
            var mainsubid = jQuery('#ddl_DebSubID').val();


            var fcmainacc = jQuery('#ddl_DebFImainAcc').val();
            var fcmainsubacc = jQuery('#ddl_DebFISubAcc').val();
            var fcmainsubid = jQuery('#ddl_DebSubFIID').val();

            var intmainacc = jQuery('#ddl_DebINTmainAcc').val();
            var interestsubacc = jQuery('#ddl_DebINTSubAcc').val();

            var mainaccont = jQuery('#ddl_mainAcc').val();
            var submainaccount = jQuery('#ddl_SubAcc').val();
            var intmethod = jQuery('#ddlintmet').val()
            var prinmethod = jQuery('#ddlprinmet').val()
                 
            //             1                 2           3               4               5                 6              7                8               9                10                    11                  12               13                14                 15                16                   17                18                   19                    20             21                  22                        23                24
            Data = userdata.branchId + 'µ' + 3 + 'µ' + loanid + 'µ' + Loanamnt + 'µ' + inttype1 + 'µ' + intrate + 'µ' + tenure + 'µ' + availdtae + 'µ' + maturidtae + 'µ' + modpay + 'µ' + userdata.userId + 'µ' + mainacc + 'µ' + mainsubacc + 'µ' + mainsubid + 'µ' + intmainacc + 'µ' + interestsubacc + 'µ' + fcmainacc + 'µ' + fcmainsubacc + 'µ' + fcmainsubid + 'µ' + raterm + 'µ' + mainaccont + 'µ' + submainaccount + 'µ' + intmethod + 'µ' + prinmethod;


                                                                                                                                                                                  //      11  main                + 'µ' +      12  Sub Account          + 'µ' +   13 sub id       + 'µ' +       15 interest main acc + 'µ' +     16 interest sub acc       + 'µ' + 17 Finance Cost Main Account+ 'µ' + 18Finance Cost subAccount   + 'µ' +19 Finance Cost sub id+ 'µ' +20+21 main +sub




            var submitRequest = {

                Flag: "INSERTAVAILMENT",
                PagVal: Data,
                parVal: itmdata,
                 typeID: "4",
               userID: userdata.userId,
               branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };
            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _Loanavailment.SubmitReturn, 'dfgdfgfgdfgdfgd')
        }

    },
    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                var msg = jQuery.trim(response.data.message);
                //var msg = String.prototype.trim(response.data.message);
                if (response.data.errStatus = "1") {
                    swal({
                        title: "Requested Successfully!",
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
    },
   
     checkvalues: function () {
         var FiType = jQuery('#ddlFiType').val();
         var FiName = jQuery('#ddlFi').val();
         var Fundcat = jQuery('#ddlCategory').val();
         var SubCat = jQuery('#ddlSubCat').val();
         var Fund = jQuery('#ddlfund').val();
        var loanamt = jQuery('#txtloanamt').val();
        var inttype = jQuery('#ddlInttype').val();
         var intrate = jQuery('#txtintrate').val();
         var tenure = jQuery('#txtTenureday').val();

         var mainacc = jQuery('#ddl_DebmainAcc').val();
         var mainsubacc = jQuery('#ddl_DebSubAcc').val();
         var mainsubid = jQuery('#ddl_DebSubID').val();

         var finmainacc = jQuery('#ddl_DebFImainAcc').val();
         var fincstsubacc = jQuery('#ddl_DebFISubAcc').val();
         var finsubid = jQuery('#ddl_DebSubFIID').val();

         var intmainacc = jQuery('#ddl_DebINTmainAcc').val();
         var intsubacc = jQuery('#ddl_DebINTSubAcc').val();
        
         var bnkmainacc = jQuery('#ddl_mainAcc').val();
         var bnksubacc = jQuery('#ddl_SubAcc').val();
       



        if (FiType == 0) {
            swal("", "Please Select Financial Institution Type", "error");
            return false;
        }
        else if (FiName == 0) {
            swal("", "Please Enter Financial Institution Name", "error");
            return false;
        }
        else if (Fundcat == 0) {
            swal("", "Select Fund Category", "error");
            return false;
        }
        else if (SubCat == 0) {
            swal("", "Select Fund sub Category", "error");
            return false;
        }
        else if (Fund == 0) {
            swal("", "Please Select Fund", "error");
            return false;
        }
        else if (loanamt == "") {
            swal("", "Please Enter Loan Amount", "error");
            return false;
        }
        else if (inttype == 0) {
            swal("", "Please Enter interest type", "error");
            return false;
        }
        else if (intrate == '') {
            swal("", "Please Enter Interest Rate", "error");
            return false;
        }
       
        else if (tenure == 0) {
            swal("", "Please Enter Tenure", "error");
            return false;
        }
       else if (mainacc ==0 ) {
            swal("", "Select Main Account", "error");
            return false;
        }

        else if (mainsubacc == 0) {
            swal("", "Select Sub Account", "error");
            return false;
        }
        else if (mainsubid == 0) {
            swal("", "Select Sub  Account", "error");
            return false;
        }
        else if (finmainacc == 0) {
            swal("", "Select Financial Cost Main Account", "error");
            return false;
        }

        else if (fincstsubacc == 0) {
            swal("", "Select Financial Cost Sub Account", "error");
            return false;
        }
        else if (finsubid == 0) {
            swal("", "Select Financial Cost Sub  Id", "error");
            return false;
        }

        else if (intmainacc == 0) {
            swal("", "Select Interest Main Account", "error");
            return false;
        }
        else if (intsubacc == 0) {
            swal("", "Select Interest Main Sub  Account", "error");
            return false;
        }
        else if (bnkmainacc == 0) {
            swal("", "Select Interest Main Account", "error");
            return false;
        }
        else if (bnksubacc == 0) {
            swal("", "Select  Main Sub  Accountzzz", "error");
            return false;
        }
       
        else
            return true;
    },


    CalAgreTo: function () {

        var agrfrom = jQuery('#txtAvailmentDate').val();
        var tenure = jQuery('#txtTenureday').val();
        if (agrfrom == "") {
            swal("", "Please Select Areement From Date", "error");
            jQuery('#txtTenureday').val("");
            return false;
        }
        else if (tenure <= 0) {
            swal("", "Please Enter Tenure Greater Than Zero", "error");
            jQuery('#txtTenureday').val("");
            return false;
        }
        var date = new Date(agrfrom);
        var newdate = new Date(date);

        newdate.setDate(newdate.getDate() + parseInt(jQuery('#txtTenureday').val()));

        var dd = newdate.getDate();
        var mm = newdate.getMonth() + 1;
        var y = newdate.getFullYear();

        //var month_names = ["January", "February", "March",
        //    "April", "May", "June",
        //    "July", "August", "September",
        //    "October", "November", "December"];

        var someFormattedDate = mm + '/' + dd + '/' + y;
        jQuery('#txtMaturityDate').val(someFormattedDate);
    },



    interestrate:  function () {
        
        if (jQuery('#txtintrate').val() > 100) {

            swal("", "Interest rate  should be less than 100 ...!!!", "error");
            jQuery('#txtintrate').val("");
            return false;
   
         }
     }




}






jQuery(document).ready(function () {

    jQuery('.page-loader-wrapper').show();
   // _Loanavailment.loadFIType();
      _Loanavailment.tokenValidate();
    _Loanavailment.loadmainType();
    _Loanavailment.loadFincstmainType();
    _Loanavailment.loadINTmainType();
    _Loanavailment.getBnkIDdtl();
    _Loanavailment.loadintType();
    _Loanavailment.loadintmethod();
    _Loanavailment.loadprinmethod();

    jQuery('#datepickerDate input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        //defaultDate: "+1w",
        changeMonth: true,
        // minDate: new Date(),
        container: '#datepickerDate'
    });



    jQuery("#ddlFiType").on("change", function () {

        _Loanavailment.LoadFiIns();
        jQuery("#ddlFi").val(0)
        jQuery("#ddlCategory").val(0)
        jQuery("#ddlSubCat").val(0)
        jQuery("#ddlfund").val(0)

    });


    jQuery("#ddlFi").on("change", function () {

        _Loanavailment.LoadFundCat();


    });

    jQuery("#ddlCategory").on("change", function () {

        _Loanavailment.LoadSubFundCat();
    });

    jQuery("#ddlSubCat").on("change", function () {

        _Loanavailment.LoadFUND();



    });

    jQuery("#ddl_DebmainAcc").on("change", function () { //sub load
        jQuery("#ddlDebsubacsts").show();
        _Loanavailment.LoadSubacc();
    });

    jQuery("#ddl_DebSubAcc").on("change", function () { //subid load
        jQuery("#ddlDebsubID").show();
        _Loanavailment.LoadSubidacc();
    });


    jQuery("#ddl_DebFImainAcc").on("change", function () { //
        jQuery("#ddlDebFIsubacsts").show();
        _Loanavailment.loadFincstsubType();
    });

    jQuery("#ddl_DebFISubAcc").on("change", function () { //
        jQuery("#ddlDebFIsubID").show();
        _Loanavailment.loadFincstsubidType();
    });
    jQuery("#ddl_DebINTmainAcc").on("change", function () { //int sub load
        jQuery("#ddlDebINTsubacsts").show();
        _Loanavailment.loadintsubaccType();
    });

    jQuery("#ddl_mainAcc").on("change", function () { //  main sub load
        // jQuery("#ddl_SubAcc").show();
        jQuery("#ddlsubacsts").show();
        _Loanavailment.getSubBnkDtl();
    });


    jQuery("#btnconfirm").on("click", function () { //  main sub load

        _Loanavailment.submitdata1();
    });


    jQuery("#ddlfund").on("change", function () {//table show
        jQuery("#maincard").show();
        jQuery("#showcorddiv").show();
        jQuery("#divmethod").show();
        jQuery("#divint").show();
        jQuery("#divprin").show();
        jQuery("#divmethod").show();
        _Loanavailment.getFromLoanDtls();

        // _Loanavailment.Loadamountfund();
    });




    jQuery("#txtloanamt").on("change", function () {
        var loanblnc = jQuery('#txtLoanbalan').val();
        var loanamt = jQuery('#txtloanamt').val();
        if (parseInt(loanblnc) < parseInt(loanamt)) {

            swal("", "Loan Amount Exceeds the Loan Limit of " + loanblnc + "...!!!", "error");

            return;
        }

    });
    jQuery("#btnView").on("click", function () {//table show

        //var InputData = jQuery("#ddlLoans").val();
        _Loanavailment.ExportToTable();

    });

    jQuery("#fupImports").bind("change", function () {//table show

        //var InputData = jQuery("#ddlLoans").val();
        _Loanavailment.tablecall();

    });



    jQuery('#txtTenureday').on("change", function () {
        // var finame = jQuery('#txtTenureday').val();
        _Loanavailment.CalAgreTo();
    });


    jQuery('#txtintrate').on("change", function () {
        // var finame = jQuery('#txtTenureday').val();
        _Loanavailment.interestrate();
    });
});

function RepaymentDtls() {
    var itmdata = '';
    var table = document.getElementById('tblExcelData');
    var rowLength = table.rows.length;

    if (rowLength < 1) {
        swal("","Please View Repayment Shedule...!!!","Error");
        return false;
    }
    
    for (var i = 1; i < rowLength; i++) {
        //itmdata = itmdata + table.rows[i].cells[1].innerText + '^' + table.rows[i].cells[2].innerText + '^' + table.rows[i].cells[3].innerText + '^' + table.rows[i].cells[4].innerText + '^' + $("[id*=hdUserId]").val() + 'æ';
        //itmdatahtml = itmdatahtml + table.rows[i].cells[1].innerHTML + '^' + table.rows[i].cells[2].innerHTML + '^' + table.rows[i].cells[3].innerHTML + '^' + table.rows[i].cells[4].innerHTML + '^' + $("[id*=hdUserId]").val() + 'æ';

        itmdata = itmdata + table.rows[i].cells[0].innerHTML + '£' + table.rows[i].cells[1].innerHTML + '£' + table.rows[i].cells[2].innerHTML + '£' + table.rows[i].cells[3].innerHTML + '£' + table.rows[i].cells[4].innerHTML + '£' + table.rows[i].cells[5].innerHTML.split("-")[0] + '£' + 'æ';
    }
    itmdata = itmdata + '¥' + 2;

    _Loanavailment.submitdata1(itmdata);
    //alert(itmdata);
}

function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });


    var firstSheet = workbook.SheetNames[0];


    excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    var table = document.createElement("table");
    table.border = "1";
    table.id = "tblExcelData";
    table.className = "table dataTable";

    //Add the header row.
    var row = table.insertRow(-1);

    //Add the header cells.
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "SL NO";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "FROM DATE";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "TO DATE";
    row.appendChild(headerCell);
    headerCell.style = "";


    headerCell = document.createElement("TH");
    headerCell.innerHTML = "PAY DATE";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "AMOUNT";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "REPAYMENT TYPE";
    row.appendChild(headerCell);
    headerCell.style = "";

    


    var flag = 0; rowNo = 0;
    //Add the data rows from Excel file.
    for (var i = 0; i < excelRows.length; i++) {
        //Add the data row.
        var row = table.insertRow(-1);
        // rowNo = i + 2;

        var cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].SlNO != '' ? excelRows[i].SlNO/*.toString()*/ : 0;
        




        cell = row.insertCell(-1);
        var FromDate = ExcelDateToJSDate(excelRows[i].FromDate);
        cell.innerHTML = excelRows[i].FromDate != undefined ? moment(FromDate).format('DD-MMM-YYYY') : 'N/A';
        excelRows[i].FromDate = excelRows[i].FromDate != undefined ? moment(FromDate).format('DD-MMM-YYYY') : 'N/A';



        //cell = row.insertCell(-1);
        //cell.innerHTML = excelRows[i].FromDate != undefined ? excelRows[i].FromDate : 'N/A';

        cell = row.insertCell(-1);
        var ToDate = ExcelDateToJSDate(excelRows[i].ToDate);
        cell.innerHTML = excelRows[i].ToDate != undefined ? moment(ToDate).format('DD-MMM-YYYY') : 'N/A';
        excelRows[i].ToDate = excelRows[i].ToDate != undefined ? moment(ToDate).format('DD-MMM-YYYY') : 'N/A';


      

        //cell = row.insertCell(-1);
        //cell.innerHTML = excelRows[i].PayDate != undefined ? excelRows[i].PayDate : 'N/A';

        cell = row.insertCell(-1);
        var PayDate = ExcelDateToJSDate(excelRows[i].PayDate);
        cell.innerHTML = excelRows[i].PayDate != undefined ? moment(PayDate).format('DD-MMM-YYYY') : 'N/A';
        excelRows[i].PayDate = excelRows[i].PayDate != undefined ? moment(PayDate).format('DD-MMM-YYYY') : 'N/A';


        

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].Amount != undefined ? excelRows[i].Amount : 'N/A';


        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].RepaymentType != undefined ? excelRows[i].RepaymentType : 'N/A';

       

    }

    jQuery("#divclass").show();
    var dvExcel = document.getElementById("dvExcel");
    dvExcel.innerHTML = "";
    dvExcel.appendChild(table);
    jQuery('.page-loader-wrapper').hide();
};

function ExcelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
}
