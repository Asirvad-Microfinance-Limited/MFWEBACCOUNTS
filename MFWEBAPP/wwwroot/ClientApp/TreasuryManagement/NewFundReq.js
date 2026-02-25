var _NewFundReq = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _NewFundReq.checkAccessRtn, token)
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
                    _NewFundReq.loadFFundCategory();
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


    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _NewFundReq.checkAccessToken, userdata.token)
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
            _NewFundReq.loadFFundCategory();
        }


    }
 },

    loadFFundCategory: function () {
        jQuery('.page-loader-wrapper').show();
        var FundType = {
            Flag: "NewFundRequest",
            PagVal: "FundCategory",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        FundType = JSON.stringify(FundType);
        FundType = { "encryptedRqstStr": EncryptAPIReq(FundType) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", FundType, _NewFundReq.fillFundCategory, userdata.token);
    },
    fillFundCategory: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlCatgry").empty();
                jQuery("#ddlCatgry").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FUND CATEGORY-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlCatgry").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlCatgry").empty();
                jQuery("#ddlCatgry").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FUND CATEGORY-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    LoadFundSubCategory: function (FundCat) {
        jQuery('.page-loader-wrapper').show();
        var FundType = {
            Flag: "NewFundRequest",
            PagVal: "FundSubCategory",
            parVal: FundCat,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        FundType = JSON.stringify(FundType);
        FundType = { "encryptedRqstStr": EncryptAPIReq(FundType) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", FundType, _NewFundReq.fillFundSubCategory, userdata.token);
    },
    fillFundSubCategory: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlsSubCat").empty();
                jQuery("#ddlsSubCat").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FUND SUB CATEGORY-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlsSubCat").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlsSubCat").empty();
                jQuery("#ddlsSubCat").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FUND SUB CATEGORY-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }

    },
    LoadFIType: function () {
        jQuery('.page-loader-wrapper').show();
        var FundType = {
            Flag: "NewFundRequest",
            PagVal: "FiType",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        FundType = JSON.stringify(FundType);
        FundType = { "encryptedRqstStr": EncryptAPIReq(FundType) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", FundType, _NewFundReq.fillFIType, userdata.token);
    },
    fillFIType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFIType").empty();
                jQuery("#ddlFIType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFIType").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFIType").empty();
                jQuery("#ddlFIType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI TYPE-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }

    },
    LoadFIName: function (FIType) {
        jQuery('.page-loader-wrapper').show();
        var FundType = {
            Flag: "NewFundRequest",
            PagVal: "FinancialInstitution",
            parVal: FIType,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        FundType = JSON.stringify(FundType);
        FundType = { "encryptedRqstStr": EncryptAPIReq(FundType) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", FundType, _NewFundReq.fillFIName, userdata.token);
    },
    fillFIName: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFInst").empty();
                jQuery("#ddlFInst").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI NAME-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFInst").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFInst").empty();
                jQuery("#ddlFInst").append(jQuery("<option></option>").val("0").text(" --------CHOOSE FI NAME-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
            jQuery('#maincard').hide();
        }
    },
    LoadTable: function (finame) {
        jQuery('.page-loader-wrapper').show();
        var GetTable = {
            Flag: "NewFundRequest",
            PagVal: "GetTableValues",
            parVal: finame,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        GetTable = JSON.stringify(GetTable);
        GetTable = { "encryptedRqstStr": EncryptAPIReq(GetTable) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", GetTable, _NewFundReq.FillTable, userdata.token);
    },
    //ShowTableValues: function (response) {
    //    if (response.status === "SUCCESS") {
    //        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
    //        if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


    //            _NewFundReq.FillTable(response);

    //        }
    //        else {

    //            return false;
    //        }
    //    }
    //},
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
                        jQuery('#Fidatatabl').append($row);
                    });
                }
                jQuery('#divAprRejBtn').show();
            }
        }
    },
    CalAgreTo: function () {

        var agrfrom = jQuery('#txt_DtAgrmntFrm').val();
        var tenure = jQuery('#txt_tenure').val();
        if (agrfrom == "") {
            swal("", "Please Select Areement From Date", "error");
            jQuery('#txt_tenure').val("");
            return false;
        }
        else if (tenure <= 0) {
            swal("", "Please Enter Tenure Greater Than Zero", "error");
            jQuery('#txt_tenure').val("");
            return false;
        }
        var date = new Date(agrfrom);
        var newdate = new Date(date);

        newdate.setDate(newdate.getDate() + parseInt($('#txt_tenure').val()));

        var dd = newdate.getDate();
        var mm = newdate.getMonth() + 1;
        var y = newdate.getFullYear();

        //var month_names = ["January", "February", "March",
        //    "April", "May", "June",
        //    "July", "August", "September",
        //    "October", "November", "December"];

        var someFormattedDate = mm + '/' + dd + '/' + y;
        jQuery('#txt_DtAgrmntTo').val(someFormattedDate);
    },
    CheckValue: function () {
        var catefory = jQuery('#ddlCatgry').val();
        var Subcatefory = jQuery('#ddlsSubCat').val();
        var FiType = jQuery('#ddlFIType').val();
        var FiName = jQuery('#ddlFInst').val();

        var Todate = Date.parse(jQuery("#txt_DtAgrmntTo").val());
        var FrmDate = Date.parse(jQuery("#txt_DtAgrmntFrm").val());
        var AgDate = Date.parse(jQuery("#txt_AgrmntDt").val());
        var DateDiff = Todate - FrmDate;

        var loanLimint = jQuery('#txt_loan').val();
        var ROI = jQuery('#txt_ROI').val();
        var tenure = jQuery('#txt_tenure').val();
        var agrmtdt = jQuery('#AgreeDt').val();
        var agrmtdtfrm = jQuery('#txt_DtAgrmntFrm').val();
        var agrmtdtto = jQuery('#txt_DtAgrmntTo').val();

        if (catefory == 0) {
            swal("", "Please Select Category", "error");
            return false;
        }
        else if (Subcatefory == 0) {
            swal("", "Please Select Sub Category", "error");
            return false;
        }
        else if (FiType == 0) {
            swal("", "Please Select Financial Institution Type", "error");
            return false;
        }
        else if (FiName == 0) {
            swal("", "Please Select Financial Institution Name", "error");
            return false;
        }
        else if (loanLimint == "") {
            swal("", "Please Enter Loan Amount", "error");
            return false;
        }
        else if (ROI == "") {
            swal("", "Please Enter ROI", "error");
            return false;
        }
        else if (tenure == "") {
            swal("", "Please Enter Tenure", "error");
            return false;
        }
        else if (ROI <= 0) {
            swal("", "Please Enter ROI Greater Than Zero", "error");
            return false;
        }
        else if (loanLimint <= 0) {
            swal("", "Please Enter Loan Amount Greater Than Zero", "error");
            return false;
        }
        else if (agrmtdt == "") {
            swal("", "Please Select Agreement Date", "error");
            return false;
        }
        else if (agrmtdtfrm <= 0) {
            swal("", "Please Select Agreement From Date", "error");
            return false;
        }
        else if (agrmtdtto <= 0) {
            swal("", "Please Select Agreement To Date", "error");
            return false;
        }
        else if (DateDiff < 0) {
            swal("", "Choose Agreement To Date greater than Agreement From Date", "error");
            jQuery("#txt_DtAgrmntFrm").val("");
            jQuery("#txt_DtAgrmntTo").focus();
            return false;
        }
        else if ((AgDate > FrmDate)) {
            swal("", "Choose Agreement  Date  Less Than Agreement From Date", "error");
            jQuery("#txt_AgrmntDt").val("");
            jQuery("#txt_AgrmntDt").focus();
            return false;
        }
        else if ((AgDate > Todate)) {
            swal("", "Choose Agreement  Date  Less Than Agreement To Date", "error");
            jQuery("#txt_AgrmntDt").val("");
            jQuery("#txt_AgrmntDt").focus();
            return false;
        }
        else {
            return true;
        }
    },
    submitevalue: function () {
        if (_NewFundReq.CheckValue()) {
            var catefory = jQuery('#ddlCatgry').val();
            var Subcatefory = jQuery('#ddlsSubCat').val();
            var FiType = jQuery('#ddlFIType').val();
            var FiName = jQuery('#ddlFInst').val();
            var agrmtdt = _NewFundReq.convertdateformat(jQuery('#AgreeDt').val());
            var agrmtdtfrm = _NewFundReq.convertdateformat(jQuery('#txt_DtAgrmntFrm').val());
            var agrmtdtto = _NewFundReq.convertdateformat(jQuery('#txt_DtAgrmntTo').val());
            var loanLimint = jQuery('#txt_loan').val();
            var ROI = jQuery('#txt_ROI').val();


            var InputData = catefory + "µ" + Subcatefory + "µ" + FiType + "µ" + FiName + "µ" + agrmtdt + "µ" + agrmtdtfrm + "µ" + agrmtdtto + "µ" + loanLimint + "µ" + userdata.userId + "µ" + userdata.branchId + "µ" + ROI;


            var submitRequest = {

                Flag: "ADDNEWFUND",
                ParVal: InputData,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _NewFundReq.SubmitReturn, userdata.token)
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


}
jQuery(document).ready(function () {

    jQuery('.page-loader-wrapper').hide();
    //_NewFundReq.loadFFundCategory();
     _NewFundReq.tokenValidate();
    _NewFundReq.LoadFIType();

    jQuery('#datepickerDate input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        //defaultDate: "+1w",
        changeMonth: true,
        // minDate: new Date(),
        container: '#datepickerDate'
    });

    jQuery('#datepickerAgrFrom input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        //defaultDate: "+1w",
        changeMonth: true,
        // minDate: new Date(),
        container: '#datepickerAgrFrom'
    });

    jQuery('#datepickerAgrTo input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        //defaultDate: "+1w",
        changeMonth: true,
        // minDate: new Date(),
        container: '#datepickerAgrTo'
    });



});
_NewFundReq.loadFFundCategory();
jQuery('#ddlCatgry').on("change", function () {
    var FundCat = jQuery('#ddlCatgry').val();
    if (FundCat == 0) {
        window.location.reload(true);
    }
    else {
        jQuery('#ddlsSubCat').val("");
        jQuery('#ddlFIType').val(0);
        jQuery('#ddlFInst').val("");
        jQuery('#maincard').hide();
        jQuery('#txt_loan').val("");
        jQuery('#txt_ROI').val("");
        jQuery('#AgreeDt').val("");
        jQuery('#txt_DtAgrmntFrm').val("");
        jQuery('#txt_tenure').val("");
        jQuery('#txt_DtAgrmntTo').val("");
        jQuery('#txt_DtAgrmntFrm').val("");

        _NewFundReq.LoadFundSubCategory(FundCat);
    }
});
//jQuery('#ddlsSubCat').on("change", function () {
//    _NewFundReq.LoadFIType();
//});
jQuery('#ddlFIType').on("change", function () {
    var FIType = jQuery('#ddlFIType').val();
    _NewFundReq.LoadFIName(FIType);
});
jQuery('#ddlFInst').on("change", function () {
    var finame = jQuery('#ddlFInst').val();
    _NewFundReq.LoadTable(finame);
});

jQuery('#txt_tenure').on("change", function () {
    var finame = jQuery('#txt_tenure').val();
    _NewFundReq.CalAgreTo();
});
jQuery('#btnConf').on("click", function () {
    _NewFundReq.submitevalue();
});
jQuery('#btnExit').on("click", function () {
    window.open("Dashboard", "_self");
});