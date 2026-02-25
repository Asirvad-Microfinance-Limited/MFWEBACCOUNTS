var _FunderExposure = {
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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _FunderExposure.checkAccessRtn, token)
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
                    _FunderExposure.loadSelectLoan();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _FunderExposure.checkAccessToken, userdata.token)
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
                _FunderExposure.loadSelectLoan();
            }


        }

    },





    //Select Loan
    loadSelectLoan: function () {
        jQuery('.page-loader-wrapper').show();
        var DebSelectLoan = {
            Flag: "fundexposure",
            PagVal: "SelectLoan"
        };

        DebSelectLoan = JSON.stringify(DebSelectLoan);
        DebSelectLoan = { "encryptedRqstStr": EncryptAPIReq(DebSelectLoan) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectdataQueries", DebSelectLoan, _FunderExposure.FillDebSelectLoan, userdata.token);

    },
    FillDebSelectLoan: function (response) {

        if (response.status == "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#txt_selectloan").empty();
                jQuery("#txt_selectloan").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SELECT LOAN-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#txt_selectloan").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#txt_selectloan").empty();
                jQuery("#txt_selectloan").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT LOAN-------- "));
            }
            jQuery('.page-loader-wrapper').hide();

        }
    },



    VerifySAmount: function () {
        var AAmount = jQuery('#txt_Sanc_amnt').val();

        if (AAmount <= 0) {
            swal("", "Please  Enter New Sanctioned Amount Greater than 0", "error");

            jQuery('#txt_Sanc_amnt').val(" ");
            return false;
        }

    },
    VerifyAvledAmount: function () {
        var AAmount = jQuery('#txt_Ava_amnt').val();

        if (AAmount <= 0) {
            swal("", "Please  Enter New Availed Amount Greater than 0", "error");

            jQuery('#txt_Ava_amnt').val(" ");
            return false;
        }

    },



    // validation confirm button...
    submitdata3: function () {

        if (_FunderExposure.checkvalues()) {
           
            var Selectloan = jQuery("#txt_selectloan").val();
            var projectname = jQuery("#txt_PjtName").val();
            var Investor = jQuery("#txt_invest").val();
            var InvestorType = jQuery("#txt_investType").val();
            var Investorsubtype = jQuery("#txt_subinvestType").val();
            var securedunsecured = jQuery("#txtsecuredunsecured").val();
            var MCLR = jQuery("#txt_Mclr").val();
            var Natureoffacily = jQuery("#txt_nat_fac").val();
            var typeofsceem = jQuery("#txt_schemes").val();
            var facilname = jQuery("#txt_fac_name").val();
            var fundname = jQuery("#txt_fund_name").val();
            var sancamnt = jQuery("#txt_Sanc_amnt").val();
            var avaamt = jQuery("#txt_Ava_amnt").val();
            /*var datesancL = jQuery("#txt_date_sanc").val();*/
            var datesancL = _FunderExposure.convertdateformat(jQuery('#txt_date_sanc').val());
            var basemclr = jQuery("#txt_base_mclr_san").val();
            var spreadrate = jQuery("#txt_spreadrate").val();
            var intrateatsan = jQuery("#txt_intRateAtSan").val();
            var cashmargin = jQuery("#txt_cashmargin").val();
            var BookdebtMargin = jQuery("#txt_bkdbt_margin").val();
            /*var DisbursalDate = jQuery("#txt_dis_dt").val();*/
            var DisbursalDate = _FunderExposure.convertdateformat(jQuery('#txt_dis_dt').val());
            /*var DateOfMaturity = jQuery("#txt_Mat_dt").val();*/
            var DateOfMaturity = _FunderExposure.convertdateformat(jQuery('#txt_Mat_dt').val());
            var ProcessingFee = jQuery("#txt_proc_fee").val();
            var ArrangerName = jQuery("#txt_arg_name").val();
            var ArrangerFee = jQuery("#txt_arg_fee").val();
            var PrepaymentPenalty = jQuery("#txt_prepaymentpenalty").val();
            var TenureInMonths = jQuery("#txt_tenure").val();
            var InterestType = jQuery("#ddldebenture").val();
            var Rating = jQuery("#txt_rating").val();
            var ListedUnListed = jQuery("#ddllisted").val();
            var MCLRNextChange = jQuery("#txt_mclr_next").val();
            var TotalTranscationCost = jQuery("#txt_tottracst").val();
           
            var data = Selectloan + "µ" + projectname + "µ" + Investor + "µ" + InvestorType + "µ" + Investorsubtype + "µ" + securedunsecured + "µ" + MCLR + "µ" + Natureoffacily + "µ" + typeofsceem + "µ" + facilname + "µ" + fundname + "µ" + sancamnt + "µ" + avaamt + "µ" + datesancL + "µ" + basemclr + "µ" + spreadrate + "µ" + intrateatsan + "µ" + cashmargin + "µ" + BookdebtMargin + "µ" + DisbursalDate + "µ" + DateOfMaturity + "µ" + ProcessingFee + "µ" + ArrangerName + "µ" + ArrangerFee + "µ" + PrepaymentPenalty + "µ" + TenureInMonths + "µ" + InterestType + "µ" + Rating + "µ" + ListedUnListed + "µ" + MCLRNextChange + "µ" + userdata.userId + "µ" + TotalTranscationCost

          
            
            var submitRequest = {

                Flag: 'FUNDEREXPOSURECONFIRM',
                PagVal: data
            };

            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };


            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _FunderExposure.SubmitReturn, 'dfgdfgfgdfgdfgd')
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




    //New funder exposure popup
    checkvalues: function () {
        var SltLn = jQuery('#txt_selectloan').val();
        var pjtname = jQuery('#txt_PjtName').val();
        var Investor = jQuery('#txt_invest').val();
        var Invstrtype = jQuery('#txt_investType').val();
        var InvstrsbType = jQuery('#txt_subinvestType').val();
        var Secrdunsecrd = jQuery('#txtsecuredunsecured').val();
        var NtrOffclty = jQuery('#txt_nat_fac').val();
        var TypOfSchems = jQuery('#txt_schemes').val();
        var FaciltrName = jQuery('#txt_fac_name').val();
        var FndrName = jQuery('#txt_fund_name').val();
        var santnamt = jQuery('#txt_Sanc_amnt').val();
        var Aviledamt = jQuery('#txt_Ava_amnt').val();
        var DtOfSantin = jQuery('#txt_date_sanc').val();
        var IntrstRateAtSantn = jQuery('#txt_intRateAtSan').val();
        var DisbursalDate = jQuery('#txt_dis_dt').val();
        var DateOfMatry = jQuery('#txt_Mat_dt').val();
        var TntrInMnts = jQuery('#txt_tenure').val();
        var IntrstType = jQuery('#ddldebenture').val();
        var ListdUnListd = jQuery('#ddllisted').val();
        var TTCost = jQuery('#txt_tottracst').val();




        if (SltLn == 0) {
            swal("", "Please  Select Loan", "error");
            return false;
        }
        else if (pjtname == "") {
            swal("", "Please Enter Project Name ", "error");
            return false;
        }
        else if (Investor == "") {
            swal("", "Please Enter Investor ", "error");
            return false;
        }
        else if (Invstrtype == "") {
            swal("", "Please Enter  Investor Type", "error");
            return false;
        }

        else if (InvstrsbType == 0) {
            swal("", "Please Enter  Investor Sub Type", "error");
            return false;
        }

        else if (Secrdunsecrd == 0) {
            swal("", "Please Select  Secured/Unsecured", "error");
            return false;
        }

        else if (NtrOffclty == 0) {
            swal("", "Please Enter  Nature Of Facility", "error");
            return false;
        }

        else if (TypOfSchems == 0) {
            swal("", "Please Enter  Type Of Scheme", "error");
            return false;
        }

        else if (FaciltrName == 0) {
            swal("", "Please Enter  Facilitator Name", "error");
            return false;
        }

        else if (FndrName == 0) {
            swal("", "Please Enter  Funder Name", "error");
            return false;
        }

        else if (santnamt == "") {
            swal("", "Please Enter  Sanctioned Amount", "error");
            return false;
        }

        else if (Aviledamt == "") {
            swal("", "Please Enter  Availed Amount", "error");
            return false;
        }

        else if (DtOfSantin == 0) {
            swal("", "Please Enter  Date Of Sanction", "error");
            return false;
        }

        else if (IntrstRateAtSantn == 0) {
            swal("", "Please Enter  Interest Rate At Sanction", "error");
            return false;
        }

        else if (DisbursalDate == 0) {
            swal("", "Please Enter  Disbursal Date", "error");
            return false;
        }

        else if (DateOfMatry == 0) {
            swal("", "Please Enter  Date Of Maturity", "error");
            return false;
        }

        else if (TntrInMnts == 0) {
            swal("", "Please Enter  Tenure In Months", "error");
            return false;
        }

        else if (IntrstType == 0) {
            swal("", "Please Select  Interest Type", "error");
            return false;
        }

        else if (ListdUnListd == 0) {
            swal("", "Please Select  Listed/UnListed", "error");
            return false;
        }

        //else if (TTCost =="") {
        //    swal("", "Please Enter  Total Transcation Cost", "error");
        //    return false;
        //}
        else
            return true;

    }
}







    
jQuery(document).ready(function () {

    //_FunderExposure.loadSelectLoan();
    _FunderExposure.tokenValidate();


    jQuery('#txt_selectloan').on("change", function () {


        var indata = jQuery('#txt_selectloan').val();
        if (indata == 0) {
            window.location.reload(true);
        }
        else {
            
             jQuery("#txt_PjtName").val(" ");
            jQuery("#txt_invest").val(" ");
            jQuery("#txt_investType").val(" ");
            jQuery("#txt_subinvestType").val(" ");
            jQuery("#txtsecuredunsecured").val(0);
            jQuery("#txt_Mclr").val(" ");
            jQuery("#txt_nat_fac").val(" ");
            jQuery("#txt_schemes").val(" ");
            jQuery("#txt_fac_name").val(" ");
            jQuery("#txt_fund_name").val(" ");
            jQuery("#txt_Sanc_amnt").val(" ");
            jQuery("#txt_Ava_amnt").val(" ");
            /*var datesancL = jQuery("#txt_date_sanc").val();*/
            jQuery('#txt_date_sanc').val(" ");
            jQuery("#txt_base_mclr_san").val(" ");
            jQuery("#txt_spreadrate").val(" ");
            jQuery("#txt_intRateAtSan").val(" ");
            jQuery("#txt_cashmargin").val(" ");
            jQuery("#txt_bkdbt_margin").val(" ");
            /*var DisbursalDate = jQuery("#txt_dis_dt").val();*/
            jQuery('#txt_dis_dt').val(" ");
            
            jQuery('#txt_Mat_dt').val(" ");
            jQuery("#txt_proc_fee").val(" ");
            jQuery("#txt_arg_name").val(" ");
            jQuery("#txt_arg_fee").val(" ");
            jQuery("#txt_prepaymentpenalty").val(" ");
            jQuery("#txt_tenure").val(" ");
            jQuery("#ddldebenture").val(0);
            jQuery("#txt_rating").val(" ");
            jQuery("#ddllisted").val(" ");
            jQuery("#txt_mclr_next").val(" ");
            jQuery("#txt_tottracst").val(" ");
        }

    });





    jQuery('#btnconfirm').on("click", function () {



        _FunderExposure.checkvalues();
    });

    jQuery('#txt_Sanc_amnt').on("change", function () {


        _FunderExposure.VerifySAmount();
    });
    jQuery('#txt_Ava_amnt').on("change", function () {


        _FunderExposure.VerifyAvledAmount();
    });
    jQuery('#datepickerDates input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        //defaultDate: "+1w",
        changeMonth: true,
        // minDate: new Date(),
        container: '#datepickerDates'
    });
    jQuery('#datepickerDatesss input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        //defaultDate: "+1w",
        changeMonth: true,
        // minDate: new Date(),
        container: '#datepickerDatesss'
    });

    jQuery('#datepickerDatess input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        //defaultDate: "+1w",
        changeMonth: true,
        // minDate: new Date(),
        container: '#datepickerDatess'
    });

    jQuery('#btnconfirm').on("click", function () {


        _FunderExposure.submitdata3();
    });
});
jQuery('#btnexit').on("click", function () {
    window.open("Dashboard", "_self");
});
