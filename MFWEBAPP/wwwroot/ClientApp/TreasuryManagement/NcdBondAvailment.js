var _NcdBond = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _NcdBond.checkAccessRtn, token)
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
                    _NcdBond.loadCategory();
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


    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _NcdBond.checkAccessToken, userdata.token)
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
            _NcdBond.loadCategory();
        }


    }
    },
    //Fund Category
    loadCategory: function () {
        jQuery('.page-loader-wrapper').show();
        var DebCategory = {
            Flag: "NCDBondAvailment",
            PagVal: "GetCategory",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebCategory = JSON.stringify(DebCategory);
        DebCategory = { "encryptedRqstStr": EncryptAPIReq(DebCategory) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebCategory, _NcdBond.FillDebCategory, userdata.token);

    },
    FillDebCategory: function (response) {

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlCategory").empty();
                jQuery("#ddlCategory").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  FUND CATEGORY-------- "));
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



    //Fund Sub Category 
    loadsubCategory: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var DebSubCategory = {
            Flag: "NCDBondAvailment",
            PagVal: "Getsubfundcat",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebSubCategory = JSON.stringify(DebSubCategory);
        DebSubCategory = { "encryptedRqstStr": EncryptAPIReq(DebSubCategory) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSubCategory, _NcdBond.FillDebSubCategory, userdata.token);

    },
    FillDebSubCategory: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlSubCat").empty();
                jQuery("#ddlSubCat").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SUBCATEGORY-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlSubCat").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {

                jQuery("#ddlSubCat").empty();
                jQuery("#ddlSubCat").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUBCATEGORY-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }

    },



    //Financial Institution Type

    LoadInstitutionType: function () {
        jQuery('.page-loader-wrapper').show();
        var DebInstitutionType = {
            Flag: "NCDBondAvailment",
            PagVal: "GetFinInstType",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId


        };
        DebInstitutionType = JSON.stringify(DebInstitutionType);
        DebInstitutionType = { "encryptedRqstStr": EncryptAPIReq(DebInstitutionType) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebInstitutionType, _NcdBond.FillDebInstitutionType, userdata.token);

    },
    FillDebInstitutionType: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFiType").empty();
                jQuery("#ddlFiType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  INSTITUTION TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFiType").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {

                jQuery("#ddlFiType").empty();
                jQuery("#ddlFiType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE INSTITUTION TYPE--------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },






    //Financial Institution 

    loadfinacialinstitution: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var DebFinInstitution = {
            Flag: "NCDBondAvailment",
            PagVal: "GetFinInstn",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId


        };
        DebFinInstitution = JSON.stringify(DebFinInstitution);
        DebFinInstitution = { "encryptedRqstStr": EncryptAPIReq(DebFinInstitution) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebFinInstitution, _NcdBond.FillDebFinInstitution, userdata.token);

    },
    FillDebFinInstitution: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFi").empty();
                jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  FINACIAL INSTITUTION -------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFi").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {

                jQuery("#ddlFi").empty();
                jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  FINACIAL INSTITUTION --------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //interest method

    loadinterestMethod: function () {
        jQuery('.page-loader-wrapper').show();
        var DebInterestMethod = {
            Flag: "NCDBondAvailment",
            PagVal: "GetIntMethodType",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId



        };
        DebInterestMethod = JSON.stringify(DebInterestMethod);
        DebInterestMethod = { "encryptedRqstStr": EncryptAPIReq(DebInterestMethod) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebInterestMethod, _NcdBond.FillDebInterestMethod, userdata.token);

    },
    FillDebInterestMethod: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlintresttype").empty();
                jQuery("#ddlintresttype").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  INTEREST METHOD-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlintresttype").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {

                jQuery("#ddlintresttype").empty();
                jQuery("#ddlintresttype").append(jQuery("<option></option>").val("0").text(" --------CHOOSE INTEREST METHOD--------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Principal Method 
    loadprincipalMethod: function () {
        jQuery('.page-loader-wrapper').show();
        var DebPrincipalMethod = {
            Flag: "NCDBondAvailment",
            PagVal: "GetPrcMethodType",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId



        };
        DebPrincipalMethod = JSON.stringify(DebPrincipalMethod);
        DebPrincipalMethod = { "encryptedRqstStr": EncryptAPIReq(DebPrincipalMethod) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebPrincipalMethod, _NcdBond.FillDebPrincipalMethod, userdata.token);

    },
    FillDebPrincipalMethod: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlprinciple").empty();
                jQuery("#ddlprinciple").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  PRINCIPAL METHOD-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlprinciple").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {

                jQuery("#ddlprinciple").empty();
                jQuery("#ddlprinciple").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PRINCIPAL METHOD--------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },






    //debenture account details
    //main accounts

    loadmainaccount: function () {
        jQuery('.page-loader-wrapper').show();
        var DebMainAccount = {
            Flag: "NCDBondAvailment",
            PagVal: "GetDebMainAcc",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebMainAccount = JSON.stringify(DebMainAccount);
        DebMainAccount = { "encryptedRqstStr": EncryptAPIReq(DebMainAccount) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebMainAccount, _NcdBond.FillDebMainAccount, userdata.token);

    },

    FillDebMainAccount: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_DebmainAcc").empty();
                jQuery("#ddl_DebmainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  MAIN ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_DebmainAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {
                jQuery("#ddl_DebmainAcc").empty();
                jQuery("#ddl_DebmainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  MAIN ACCOUNT --------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //sub account

    loadsubaccount: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var Debsubaccount = {
            Flag: "NCDBondAvailment",
            PagVal: "GetSubAcc",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        Debsubaccount = JSON.stringify(Debsubaccount);
        Debsubaccount = { "encryptedRqstStr": EncryptAPIReq(Debsubaccount) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", Debsubaccount, _NcdBond.FillDebsubaccount, userdata.token);

    },

    FillDebsubaccount: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlDebSubAcc").empty();
                jQuery("#ddlDebSubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SUB ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlDebSubAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {
                jQuery("#ddlDebSubAcc").empty();
                jQuery("#ddlDebSubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB ACCOUNT --------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Sub ID 

    loadsubId: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var DebSubID = {
            Flag: "NCDBondAvailment",
            PagVal: "GetSubDebID",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebSubID = JSON.stringify(DebSubID);
        DebSubID = { "encryptedRqstStr": EncryptAPIReq(DebSubID) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSubID, _NcdBond.FillDebSubID, userdata.token);

    },

    FillDebSubID: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlDebSubIDloan").empty();
                jQuery("#ddlDebSubIDloan").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SUB ID-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlDebSubIDloan").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {
                jQuery("#ddlDebSubIDloan").empty();
                jQuery("#ddlDebSubIDloan").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB ID --------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Finance Cost Main Account


    loadFinanceCostMainAccount: function () {
        jQuery('.page-loader-wrapper').show();
        var DebFinanceCostMainAccount = {
            Flag: "NCDBondAvailment",
            PagVal: "GetDEBFIAcc",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebFinanceCostMainAccount = JSON.stringify(DebFinanceCostMainAccount);
        DebFinanceCostMainAccount = { "encryptedRqstStr": EncryptAPIReq(DebFinanceCostMainAccount) };


        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebFinanceCostMainAccount, _NcdBond.FillDebFinanceCostMainAccount, userdata.token);

    },

    FillDebFinanceCostMainAccount: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_DebFImainAcc").empty();
                jQuery("#ddl_DebFImainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FINACIAL COST MAIN ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_DebFImainAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {
                jQuery("#ddl_DebFImainAcc").empty();
                jQuery("#ddlDebFImddl_DebFImainAccainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  FINACIAL COST MAIN ACCOUNT --------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Finance Cost Sub Account 

    loadFinanceCostSubAccount: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var DebFinanceCostSubAccount = {
            Flag: "NCDBondAvailment",
            PagVal: "GetSubfincstAcc",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebFinanceCostSubAccount = JSON.stringify(DebFinanceCostSubAccount);
        DebFinanceCostSubAccount = { "encryptedRqstStr": EncryptAPIReq(DebFinanceCostSubAccount) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebFinanceCostSubAccount, _NcdBond.FillDebFinanceCostSubAccount, userdata.token);

    },

    FillDebFinanceCostSubAccount: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_DebFISubAcc").empty();
                jQuery("#ddl_DebFISubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FINACIAL COST SUB ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_DebFISubAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {
                jQuery("#ddl_DebFISubAcc").empty();
                jQuery("#ddl_DebFISubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  FINACIAL COST SUB  ACCOUNT --------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Finance CostSub ID

    loadFinanceCostSubID: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var DebFinanceCostSubID = {
            Flag: "NCDBondAvailment",
            PagVal: "GetSubDebFIID",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebFinanceCostSubID = JSON.stringify(DebFinanceCostSubID);
        DebFinanceCostSubID = { "encryptedRqstStr": EncryptAPIReq(DebFinanceCostSubID) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebFinanceCostSubID, _NcdBond.FillDebFinanceCostSubID, userdata.token);

    },

    FillDebFinanceCostSubID: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_DebSubFIID").empty();
                jQuery("#ddl_DebSubFIID").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FINANCE COST SUB ID-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_DebSubFIID").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {
                jQuery("#ddl_DebSubFIID").empty();
                jQuery("#ddl_DebSubFIID").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FINANCE COST SUB ID --------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Interest Main Account


    loadInterestMainAccount: function () {
        jQuery('.page-loader-wrapper').show();
        var DebInterestMainAccount = {
            Flag: "NCDBondAvailment",
            PagVal: "GetDebINTMainAcc",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebInterestMainAccount = JSON.stringify(DebInterestMainAccount);
        DebInterestMainAccount = { "encryptedRqstStr": EncryptAPIReq(DebInterestMainAccount) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebInterestMainAccount, _NcdBond.FillDebInterestMainAccount, userdata.token);

    },

    FillDebInterestMainAccount: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_DebINTmainAcc").empty();
                jQuery("#ddl_DebINTmainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE INTEREST MAIN ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_DebINTmainAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {
                jQuery("#ddl_DebINTmainAcc").empty();
                jQuery("#ddl_DebINTmainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  INTEREST MAIN ACCOUNT --------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //Interest  Sub Account

    loadInterestSubAccount: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var DebInterestSubAccount = {
            Flag: "NCDBondAvailment",
            PagVal: "GetINTSubAcc",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebInterestSubAccount = JSON.stringify(DebInterestSubAccount);
        DebInterestSubAccount = { "encryptedRqstStr": EncryptAPIReq(DebInterestSubAccount) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebInterestSubAccount, _NcdBond.FillDebInterestSubAccount, userdata.token);

    },

    FillDebInterestSubAccount: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_DebINTSubAcc").empty();
                jQuery("#ddl_DebINTSubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE INTEREST SUB ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_DebINTSubAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {
                jQuery("#ddl_DebINTSubAcc").empty();
                jQuery("#ddl_DebINTSubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  INTEREST  SUB  ACCOUNT --------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //bank account details
    //main account

    loadintMainAccount: function () {
        jQuery('.page-loader-wrapper').show();
        var DebintMainAccount = {
            Flag: "NCDBondAvailment",
            PagVal: "GetBnkID",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebintMainAccount = JSON.stringify(DebintMainAccount);
        DebintMainAccount = { "encryptedRqstStr": EncryptAPIReq(DebintMainAccount) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebintMainAccount, _NcdBond.FillintMainAccount, userdata.token);

    },

    FillintMainAccount: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_mainAcc").empty();
                jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  MAIN ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {
                jQuery("#ddl_mainAcc").empty();
                jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  MAIN ACCOUNT --------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }

    },


    //sub account

    loadintsubaccount: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var Debintsubaccount = {
            Flag: "NCDBondAvailment",
            PagVal: "GetMainBnkID",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        Debintsubaccount = JSON.stringify(Debintsubaccount);
        Debintsubaccount = { "encryptedRqstStr": EncryptAPIReq(Debintsubaccount) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", Debintsubaccount, _NcdBond.FillDebintsubaccount, userdata.token);

    },

    FillDebintsubaccount: function (response) {
        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_SubAcc").empty();
                jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SUB ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {
                jQuery("#ddl_SubAcc").empty();
                jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB ACCOUNT --------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

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




    //New ProcFeeNew popup
    checkvalues: function () {


        if (jQuery('#ddlCategory').val() == '0') {
            swal("Select Fund Category ...!!!");
            jQuery('#ddlCategory').focus();
            return false;
        }
        if (jQuery('#ddlSubCat').val() == '0') {
            swal("Select Fund Sub Category ...!!!");
            jQuery('#ddlSubCat').focus();
            return false;
        }


        if (jQuery('#ddlFiType').val() == '0' && jQuery('#ddlSubCat').val()!='2') {
            swal("Select Financial Institution Type ...!!!");
            jQuery('#ddlFiType').focus();
            return false;
        }

        if (jQuery('#ddlFi').val() == '0') {
            swal("Select Financial Institution ...!!!");
            jQuery('#ddlFi').focus();
            return false;
        }

        var SubCat = jQuery("#ddlSubCat").val();
        if (jQuery("#ddlSubCat").val() == '2') {

            if (jQuery('#txtPblcIssueSeries').val() == '') {

                swal("Enter Public Issue Series...!!!");
                jQuery('#txtPblcIssueSeries').focus();
                return false;
            }
        }

        else if (SubCat == '12') {

            if (jQuery('#txtRateTerm').val() == '') {
                swal("Enter Rate Term...!!!");
                jQuery('#txtRateTerm').focus();
                return false;
            }
            if (jQuery('#txtHedgeType').val() == '') {
                swal("Enter Hedging Type...!!!");
                jQuery('#txtHedgeType').focus();
                return false;
            }
            if (jQuery('#txtUsdAmt').val() == '') {
                swal("Enter Amount in USD...!!!");
                jQuery('#txtUsdAmt').focus();
                return false;
            }
            if (jQuery('#txtInrRate').val() == '') {
                swal("Enter Conversion Rate INR...!!!");
                jQuery('#txtInrRate').focus();
                return false;
            }
        }


        if (jQuery('#txtIsinNo').val() == '') {
            swal("Enter ISIN Number...!!!");
            jQuery('#txtIsinNo').focus();
            return false;
        }
        if (jQuery('#txtRating').val() == '') {
            swal("Enter Rating...!!!");
            jQuery('#txtRating').focus();
            return false;
        }
        if (jQuery('#txtMatAmtPrinc').val() == '') {
            swal("Enter Amount...!!!");
            jQuery('#txtMatAmtPrinc').focus();
            return false;
        }
        if (jQuery('#txtintrate').val() == '') {
            swal("Enter Interest Rate ...!!!");
            jQuery('#txtintrate').focus();
            return false;
        }



        if (jQuery('#ddlintresttype').val() == '0') {
            swal("Select Interest Method ...!!!");
            jQuery('#ddlintresttype').focus();
            return false;
        }

        if (jQuery('#ddlprinciple').val() == '0') {
            swal("Select Principal Method...!!!");
            jQuery('#ddlprinciple').focus();
            return false;
        }
        if (jQuery('#txtAllotmentDate').val() == '') {
            swal("Select Allottement Date...!!!");
            jQuery('#txtAllotmentDate').focus();
            return false;
        }
        if (jQuery('#txtTenure').val() == '') {
            swal("Enter Tenure...!!!");
            jQuery('#txtTenure').focus();
            return false;

        }


        if (jQuery('#txtsecuritymarginamt').val() == '') {
            swal("Enter Security Margin...!!!");
            jQuery('#txtsecuritymarginamt').focus();
            return false;
        }


        if (jQuery('#txtProcessFee').val() == '') {
            swal("Enter Processing Fee...!!!");
            jQuery('#txtProcessFee').focus();
            return false;
        }
        if (jQuery('#txtOtherCost').val() == '') {
            swal("Enter Other Cost ...!!!");
            jQuery('#txtOtherCost').focus();
            return false;
        }
        if (jQuery('#txtdateofpay').val() == '') {
            swal("Select Date Of Payment ...!!!");
            jQuery('#txtdateofpay').focus();
            return false;
        }
        if (jQuery('#txtduedate').val() == '') {
            swal("Select Due Date ...!!!");
            jQuery('#txtduedate').focus();
            return false;
        }
      
        if (jQuery('#ddl_DebmainAcc').val() == "0") {
            swal("Please select Main Account");
            return false;
        }
        if (jQuery('#ddlDebSubAcc').val() == "0") {
            swal("Please select  Sub Account");
            return false;
        }
        if (jQuery('#ddlDebSubIDloan').val() == "0") {
            swal("Please select  Sub ID");
            return false;
        }
        if (jQuery('#ddl_DebFImainAcc').val() == "0") {
            swal("Please select Finance Cost Main Account");
            return false;
        }
        if (jQuery('#ddl_DebFISubAcc').val() == "0") {
            swal("Please select Finance Cost Sub Account");
            return false;
        }
        if (jQuery('#ddl_DebSubFIID').val() == "0") {
            swal("Please select Finance Cost Sub ID");
            return false;
        }
        if (jQuery('#ddl_DebINTmainAcc').val() == "0") {
            swal("Please select Interest Main Account");
            return false;
        }
        if (jQuery('#ddl_DebINTSubAcc').val() == "0") {
            swal("Please select Interest Sub Account");
            return false;
        }
        if (jQuery('#ddl_mainAcc').val() == "0") {
            swal("Please select Main Bank Account");
            return false;
        }
        if (jQuery('#ddl_SubAcc').val() == "0") {
            swal("Please select Sub Bank Account");
            return false;
        }
        return true;
    },



    interestrate: function () {
        //alert('mohanlal');
        if (jQuery('#txtintrate').val() > 100) {
            //alert('Interest rate  should be less than 100 ');
            swal("Interest rate  should be less than 100 ...!!!");
            jQuery('#txtintrate').val('');
            return;
        }

    },
   

    showmeturitydate: function () {

        var tt = document.getElementById('txtAllotmentDate').value;

        var date = new Date(tt);
        var newdate = new Date(date);

        newdate.setDate(newdate.getDate() + parseInt(jQuery('#txtTenure').val()));

        var dd = newdate.getDate();
        var mm = newdate.getMonth() + 1;
        var y = newdate.getFullYear();

        var month_names = ["January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"];

        var someFormattedDate = dd + '/' + month_names[mm - 1] + '/' + y;
        jQuery('#txtMaturityDate').val(someFormattedDate);
        //alert(someFormattedDate);   
        //document.getElementById('follow_Date').value = someFormattedDate;
    },


    submitdata1: function () {

        if (_NcdBond.checkvalues()) {

            var Data, itmdata, dateval, itmdatachild, MainAcc, SubAcc, LoanBal, Loanamnt, fundTfrMain, fundTfrSub, catid, subcatid, fityp, fiid;
            Data = '';
            itmdata = '';
            LoanBal = '';
            var tblAccntData = "";
            var maturityamnt = jQuery('#txtMatAmt').val();
            var amount = jQuery('#txtloanamt').val();
            var paydate = Date.parse(jQuery('#datepickerDate').val());
            var duedt = Date.parse(jQuery('#txtduedate').val());
            var datediff = duedt - paydate;
            var catid = jQuery('#ddlCategory').val();
            var subcatid = jQuery('#ddlSubCat').val();
            if (datediff <= 0) {
                swal("Choose Due Date greater than  Date Of Payment");
                jQuery("#txtduedate").val("");
                jQuery("#txtduedate").focus();
                return false;
            }

            if (subcatid == '2') {
                fityp = "";
                fiid = "";
            }
            else {
                fityp = jQuery('#ddlFiType').val();
                fiid = jQuery('#ddlFi').val();
            }



            //var table = document.getElementById('tblExcelData');
           
            //for (var i = 1; i < rowLength; i++) {
            //    //0-Date of payment
            //    //1-Due dat
            //    //2-Penalty
            //    //3-Penalty %
            //    //4-Principle Amount
            //    //5-Interest Amount

            //    itmdata = itmdata + i + '£' + table.rows[i].cells[0].innerHTML + '£' + table.rows[i].cells[1].innerHTML + '£' + table.rows[i].cells[2].innerHTML + '£' + table.rows[i].cells[3].innerHTML + '£' + table.rows[i].cells[4].innerHTML + '£' + table.rows[i].cells[5].innerHTML + 'æ';
            //}

            //itmdata = itmdata + '¥' + 1;

            if (jQuery('#ddl_mainAcc').val() == "-1") {
                swal("Please select Loan Main Account");
                return false;
            }
            else {
                MainAcc = jQuery('#ddl_mainAcc').val();
            }
            if (jQuery('#ddl_SubAcc').val() == null) {
                SubAcc = 0;
            }
            else {
                SubAcc = jQuery('#ddl_SubAcc').val();
            }

            var raterm = "";
            var hedgeType = "";
            var usdamt = 0;
            var inrrate = 0;
            var publicissueseries = "";
            var t = jQuery('#txtsecuritymarginamt').val();
            if (jQuery('#ddlCategory').val() == '5') {
                raterm = jQuery('#txtRateTerm').val();
                hedgeType = jQuery('#txtHedgeType').val();
                usdamt = jQuery('#txtUsdAmt').val();
                inrrate = jQuery('#txtInrRate').val();
            }
            else {
                raterm = "";
                hedgeType = "";
                usdamt = 0;
                inrrate = 0;
            }

            if (jQuery('#ddlSubCat').val() == '2') {
                publicissueseries = jQuery('#txtPublicIssueSeries').val();
            }
            //+ 'µ' + raterm + 'µ' + hedgeType + 'µ' + usdamt + 'µ' + inrrate
            //Data = $("[id*=hdBranchId]").val() + 'µ' + $("[id*=hdFirmId]").val() + 'µ' + $('#ddlFund').val().split("æ")[1] + 'µ' + Loanamnt + 'µ' + inttype1 + 'µ' + $('#txtintrate').val() + 'µ' + $('#txttenure').val() + 'µ' + $('#txtAvailmentDate').val() + 'µ' + $('#txtlonagree').val() + 'µ' + modpay + 'µ' + MainAcc + 'µ' + SubAcc + 'µ' + fundTfrMain + 'µ' + fundTfrSub + 'µ' + dateval + 'µ' + $("[id*=hdUserId]").val() + 'µ' + repay + 'µ' + LoanBal + 'µ' + raterm + 'µ' + tblAccntData;
            //alert(catid);
            //alert(subcatid);
            //alert(fityp);
            //alert(fiid);
            //if (itmdata == "") {
            //    itmdata = 's';
            //}
            //  Data = $("[id*=hdBranchId]").val() + 'µ' + $("[id*=hdFirmId]").val() + 'µ' + catid + "µ" + subcatid + "µ" + fityp + "µ" + fiid + "µ" + publicissueseries + "µ" + $('#txtIsinNo').val() + "µ" + $('#txtRating').val() + "µ" + $('#txtMatAmtPrinc').val() + "µ" + $('#txtintrate').val() + "µ" + $('#ddlintresttype').val() + "µ" + $('#txtAllotmentDate').val() + "µ" + $('#txtTenure').val() + "µ" + $('#txtMaturityDate').val() + "µ" + $('#txtMatAmt').val() + 'µ' + raterm + 'µ' + hedgeType + 'µ' + usdamt + 'µ' + inrrate + 'µ' + MainAcc + 'µ' + SubAcc + 'µ' + $("[id*=hdUserId]").val() + 'µ' + $('#txtsecuritymarginamt').val() + 'µ' + $('#txtProcessFee').val() + 'µ' + $('#txtOtherCost').val() + 'µ' + $('#ddlintresttype').val() + 'µ' + $('#txtMatAmt').val() + 'µ' + $('#ddlprinciple').val() + 'µ' + $('#txtttlAmt').val();
            //               1                                   2                            3          4                  5           6                7                           8                               9                                 10                               11                                  12                                         13                         14                          15                                16                                         17                                     18                          19                                     20                              21                                   22                              23                                    24                                 25                                         26                                27                       28                                     29                       30             31                32              33              34
            Data = userdata.branchId + 'µ' + '3' + 'µ' + catid + "µ" + subcatid + "µ" + fityp + "µ" + fiid + "µ" + jQuery('#txtIsinNo').val() + "µ" + jQuery('#txtRating').val() + "µ" + jQuery('#txtMatAmtPrinc').val() + "µ" + jQuery('#txtintrate').val() + "µ" + jQuery('#ddlintresttype').val() + "µ" + jQuery('#ddlprinciple').val() + "µ" + _NcdBond.convertdateformat(jQuery('#txtAllotmentDate').val()) + "µ" + jQuery('#txtTenure').val() + "µ" + jQuery('#txtMaturityDate').val() + 'µ' + jQuery('#txtsecuritymarginamt').val() + 'µ' + jQuery('#txtProcessFee').val() + 'µ' + jQuery('#txtOtherCost').val() + 'µ' + jQuery('#ddl_DebmainAcc').val() + 'µ' + jQuery('#ddlDebSubAcc').val() + 'µ' + jQuery('#ddlDebSubIDloan').val() + 'µ' + jQuery('#ddl_DebFImainAcc').val() + 'µ' + jQuery('#ddl_DebFISubAcc').val() + 'µ' + jQuery('#ddl_DebSubFIID').val() + 'µ' + jQuery('#ddl_DebINTmainAcc').val() + 'µ' + jQuery('#ddl_DebINTSubAcc').val() + 'µ' + jQuery('#ddl_mainAcc').val() + 'µ' + jQuery('#ddl_SubAcc').val() + 'µ' + userdata.branchId + 'µ' + raterm + 'µ' + hedgeType + 'µ' + usdamt + 'µ' + inrrate + 'µ' + publicissueseries;


            var submitRequest = {

                Flag: "INSERTNEWNCDBOND",
                PagVal: itmdata,
                parVal: Data,
                typeID: "4",
               userID: userdata.userId,
              branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _NcdBond.SubmitReturn, userdata.token)
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

    },






    
   
}
            


jQuery(document).ready(function () {




  //  _NcdBond.loadCategory();
   _NcdBond.tokenValidate();
    _NcdBond.loadinterestMethod();

    _NcdBond.loadprincipalMethod();

    _NcdBond.loadmainaccount();
    _NcdBond.loadFinanceCostMainAccount();


    _NcdBond.loadInterestMainAccount();
    _NcdBond.loadintMainAccount();

    jQuery("#divUSDBond").hide();


    jQuery('#datepickerDate input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        //defaultDate: "+1w",
        changeMonth: true,
        // minDate: new Date(),
        container: '#datepickerDate'
    });
    jQuery("#txtduedate").datepicker({
        dateFormat: 'dd/MM/yy',
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {

        }
    });
    jQuery('#ddl_DebmainAcc').on("change", function () {
        jQuery("#ddlDebsubacsts").show();
        var indata = jQuery("#ddl_DebmainAcc").val();
        _NcdBond.loadsubaccount(indata);
    });


    jQuery('#ddlDebSubAcc').on("change", function () {
        jQuery("#ddlDebsubID").show();
        var indata = jQuery("#ddl_DebmainAcc").val() + 'µ' + jQuery("#ddlDebSubAcc").val();
        _NcdBond.loadsubId(indata);
    });
    jQuery('#ddl_DebFImainAcc').on("change", function () {
        jQuery("#ddlDebFIsubacsts").show();
        var indata = jQuery("#ddl_DebFImainAcc").val();
        _NcdBond.loadFinanceCostSubAccount(indata);

    });

    jQuery('#ddl_mainAcc').on("change", function () {
        jQuery("#ddlsubacsts").show();
        var indata = jQuery("#ddl_mainAcc").val();
        _NcdBond.loadintsubaccount(indata);
    });


    jQuery('#ddl_DebFISubAcc').on("change", function () {
        jQuery("#ddlDebFIsubID").show();
        var indata = jQuery("#ddl_DebFImainAcc").val() + 'µ' + jQuery("#ddl_DebFISubAcc").val();

        _NcdBond.loadFinanceCostSubID(indata);

    });

    jQuery('#ddl_DebINTmainAcc').on("change", function () {
        jQuery("#ddlDebINTsubacsts").show();
        var indata = jQuery("#ddl_DebINTmainAcc").val();
        _NcdBond.loadInterestSubAccount(indata);

    });


    jQuery('#ddlCategory').on("change", function () {
        var indata = jQuery("#ddlCategory").val();
        if (jQuery('#ddlCategory').val() == '5') {
            jQuery('#divUSDBond').show();
        }
        else {
            jQuery('#divUSDBond').hide();
        }
        if (indata == 0) {
            window.location.reload(true);

        }
        else {


            
            
            jQuery("#ddlSubCat").val("");
            jQuery("#ddlFiType").val("");
            jQuery("#ddlFi").val("");
            jQuery("#txtPblcIssueSeries").val("");
            jQuery("#txtIsinNo").val("");
            jQuery("#txtRating").val("");
            jQuery("#txtMatAmtPrinc").val("");
            jQuery("#txtintrate").val("");
            jQuery("#ddlintresttype").val(0);
            jQuery("#ddlprinciple").val(0);
            jQuery("#txtAllotmentDate").val("");
            jQuery("#txtTenure").val("");
            jQuery("#txtMaturityDate").val("");
            jQuery("#txtsecuritymarginamt").val("");
            jQuery("#txtProcessFee").val("");
            jQuery("#txtOtherCost").val("");
            jQuery("#txtRateTerm").val("");
            jQuery("#txtHedgeType").val("");
            jQuery("#txtUsdAmt").val("");
            jQuery("#txtInrRate").val("");
            jQuery("#txtProcessFee").val("");
            jQuery("#fileUpload").val("");
            jQuery("#fileUpload").val("");
            jQuery("#ddl_DebmainAcc").val(0);
            jQuery("#ddlDebSubAcc").val("");
            jQuery("#ddlDebSubIDloan").val("");

            jQuery("#ddl_DebFImainAcc").val(0);
            jQuery("#ddl_DebFISubAcc").val("");
            jQuery("#ddl_DebSubFIID").val("");

            jQuery("#ddl_DebINTSubAcc").val(0);
            jQuery("#ddl_mainAcc").val(0);
            jQuery("#ddl_SubAcc").val("");

            jQuery("#ddlDebsubacsts").hide();
            jQuery("#ddlDebsubID").hide();
            jQuery("#ddlDebFIsubacsts").hide();
            jQuery("#ddlDebFIsubID").hide();
            jQuery("#ddlDebINTsubacsts").hide();
            jQuery("#ddlsubacsts").hide();





            
            


            _NcdBond.loadsubCategory(indata);
        }

        
    });


    jQuery('#ddlSubCat').on("change", function () {
        jQuery("#divFiType").show();
        _NcdBond.LoadInstitutionType();
    });


    jQuery('#ddlSubCat').on("change", function () {


        var SubCat = jQuery("#ddlSubCat").val();
        if (SubCat == '2') {
            jQuery('#divPISeries').show();
            jQuery('#divFi').hide();
            jQuery('#divFiType').hide();

            //if (jQuery('#txtPblcIssueSeries').val() == '') {

            //    swal("Enter Public Issue Series...!!!");
            //    jQuery('#txtPblcIssueSeries').focus();
            //    return false;
            //}
        }
        else
            jQuery('#ddlFiType').on("change", function () {
                jQuery("#divFi").show();
                var indata = jQuery("#ddlFiType").val();

                _NcdBond.loadfinacialinstitution(indata);
            });
    });


                jQuery('#txtTenure').on("change", function () {
                    _NcdBond.showmeturitydate();
                });
                jQuery('#txtloanamt').on("change", function () {
                    _NcdBond.amountchange();
                });


   
                jQuery('#btnconfirm').on("click", function () {
                    _NcdBond.submitdata1();
                });
});
jQuery('#btnexit').on("click", function () {
    window.open("Dashboard", "_self");
});

function RepaymentDtls() {
    var itmdata = '';
    var table = document.getElementById('tblExcelData');
    var rowLength = table.rows.length;

    if (rowLength < 1) {
        swal("", "Please View Repayment Shedule...!!!", "Error");
        return false;
    }

    for (var i = 1; i < rowLength; i++) {
        //itmdata = itmdata + table.rows[i].cells[1].innerText + '^' + table.rows[i].cells[2].innerText + '^' + table.rows[i].cells[3].innerText + '^' + table.rows[i].cells[4].innerText + '^' + $("[id*=hdUserId]").val() + 'æ';
        //itmdatahtml = itmdatahtml + table.rows[i].cells[1].innerHTML + '^' + table.rows[i].cells[2].innerHTML + '^' + table.rows[i].cells[3].innerHTML + '^' + table.rows[i].cells[4].innerHTML + '^' + $("[id*=hdUserId]").val() + 'æ';

        itmdata = itmdata + table.rows[i].cells[0].innerHTML + '£' + table.rows[i].cells[1].innerHTML + '£' + table.rows[i].cells[2].innerHTML + '£' + table.rows[i].cells[3].innerHTML + '£' + table.rows[i].cells[4].innerHTML + '£' + table.rows[i].cells[5].innerHTML.split("-")[0] + '£' + 'æ';
    }
    itmdata = itmdata + '¥' + 2;

    _NcdBond.submitdata1(itmdata);
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