
var _AddPayData = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var CheckAccess = {
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1004",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _AddPayData.checkAccessRtn, userdata.token)
    },

    checkAccessRtn: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {
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
                    _AddPayData.GetPayData();
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


    GetPayData: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetPayTypeData = {
            "flag1": "INITIALICEPAYATBRANCH",
            "flag2": "PAYTYPE",
            "inptvar1": userdata.branchId,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillPayType, userdata.token)

    },
    FillPayType: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                jQuery("#ddlPayType").empty();
                jQuery("#ddlPayType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlPayType").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlPayType").empty();
                jQuery("#ddlPayType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
            }
        }
        else {

            jQuery("#ddlPayType").empty();
            jQuery("#ddlPayType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
        }
        jQuery('.page-loader-wrapper').hide();
    },




    GetBranchData: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetBranchListData = {
            "flag1": "INITIALICEPAYATBRANCH",
            "flag2": "PAYBRANCH",
            "inptvar1": Str,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetBranchListData, _AddPayData.FillBranchData, userdata.token)

    },
    FillBranchData: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                jQuery("#ddlPayBranch").empty();
                jQuery("#ddlPayBranch").append(jQuery("<option></option>").val("0").text(" --- CHOOSE BRANCH --- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlPayBranch").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlPayBranch").empty();
                jQuery("#ddlPayBranch").append(jQuery("<option></option>").val("0").text("  --- CHOOSE BRANCH ---  "));
            }
        }
        else {

            jQuery("#ddlPayBranch").empty();
            jQuery("#ddlPayBranch").append(jQuery("<option></option>").val("0").text("  --- CHOOSE BRANCH ---  "));
        }
        jQuery('.page-loader-wrapper').hide();
    },




    GetDebitAcc: function (typeid) {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetDebitAccount = {
            "flag1": "INITIALICEPAYATBRANCH",
            "flag2": "DEBIT",
            "inptvar1": typeid,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetDebitAccount, _AddPayData.FillDebitAcc, userdata.token)

    },

    FillDebitAcc: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                jQuery("#ddlDebitAcc").empty();
                jQuery("#ddlDebitAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE DEBIT ACCOUNT-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlDebitAcc").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlDebitAcc").empty();
                jQuery("#ddlDebitAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE DEBIT ACCOUNT-------- "));
            }
        }
        else {

            jQuery("#ddlDebitAcc").empty();
            jQuery("#ddlDebitAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE DEBIT ACCOUNT-------- "));
        }
        jQuery('.page-loader-wrapper').hide();
        _AddPayData.GetCreditAcc();
    },

    GetDebitSubAcc: function (accno) {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetDebitSubAccount = {
            "flag1": "INITIALICEPAYATBRANCH",
            "flag2": "SUBACCOUNT",
            "inptvar1": accno,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetDebitSubAccount, _AddPayData.FillDebitSubAcc, userdata.token)

    },

    FillDebitSubAcc: function (response) {
        var debit = jQuery('#debitAcc');
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                if (debit.hasClass('col-lg-4'))
                    debit.attr('class', 'col-lg-2');
                dbsub = true;
                jQuery('#debitSubAcc').show();
                jQuery("#ddlDebitSubAcc").empty();
                jQuery("#ddlDebitSubAcc").append(jQuery("<option></option>").val("0").text("SUB ACCOUNT"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlDebitSubAcc").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                dbsub = false;
                jQuery('#debitSubAcc').hide();
                debit.attr('class', 'col-lg-4');
                jQuery("#ddlDebitSubAcc").empty();
                jQuery("#ddlDebitSubAcc").append(jQuery("<option></option>").val("0").text("SUB ACCOUNT"));
            }
        }
        else {
            dbsub = false;
            jQuery('#debitSubAcc').hide();
            debit.attr('class', 'col-lg-4');
            jQuery("#ddlDebitSubAcc").empty();
            jQuery("#ddlDebitSubAcc").append(jQuery("<option></option>").val("0").text("SUB ACCOUNT"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetCreditAcc: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetDebitAccount = {
            "flag1": "INITIALICEPAYATBRANCH",
            "flag2": "CREDIT",
            "inptvar1": Str,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetDebitAccount, _AddPayData.FillCreditAcc, userdata.token)

    },

    FillCreditAcc: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                jQuery("#ddlCreditAcc").empty();
                jQuery("#ddlCreditAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE CREDIT ACCOUNT-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlCreditAcc").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlCreditAcc").empty();
                jQuery("#ddlCreditAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE CREDIT ACCOUNT-------- "));
            }
        }
        else {
            jQuery("#ddlCreditAcc").empty();
            jQuery("#ddlCreditAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE CREDIT ACCOUNT-------- "));
        }
        jQuery('.page-loader-wrapper').hide();
        _AddPayData.GetTdsCat();
    },
    GetTdsCat: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetTDSCategory = {
            "flag1": "INITIALICEPAYATBRANCH",
            "flag2": "TDSCATEGORY",
            "inptvar1": Str,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetTDSCategory, _AddPayData.FillTdsCat, userdata.token)

    },

    FillTdsCat: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                jQuery("#ddltdsCat").empty();
                jQuery("#ddltdsCat").append(jQuery("<option></option>").val("0").text("-------CHOOSE TDS CATEGORY-------"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddltdsCat").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddltdsCat").empty();
                jQuery("#ddltdsCat").append(jQuery("<option></option>").val("0").text("-------CHOOSE TDS CATEGORY-------"));
            }
        }
        else {

            jQuery("#ddltdsCat").empty();
            jQuery("#ddltdsCat").append(jQuery("<option></option>").val("0").text("-------CHOOSE TDS CATEGORY-------"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetCreditSubAcc: function (accno) {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetCreditSubAccount = {
            "flag1": "INITIALICEPAYATBRANCH",
            "flag2": "SUBACCOUNT",
            "inptvar1": accno,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetCreditSubAccount, _AddPayData.FillCreditSubAcc, userdata.token)

    },

    FillCreditSubAcc: function (response) {
        var credit = jQuery('#CreditAcc');
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                crsub = true;
                if (credit.hasClass('col-lg-4'))
                    credit.attr('class', 'col-lg-2');
                jQuery('#creditSubAcc').show();
                jQuery("#ddlCreditSubAcc").empty();
                jQuery("#ddlCreditSubAcc").append(jQuery("<option></option>").val("0").text("SUB ACCOUNT"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlCreditSubAcc").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                crsub = false;
                jQuery('#creditSubAcc').hide();
                credit.attr('class', 'col-lg-4');
                jQuery("#ddlCreditSubAcc").empty();
                jQuery("#ddlCreditSubAcc").append(jQuery("<option></option>").val("0").text("SUB ACCOUNT"));
            }
        }
        else {
            crsub = false;
            jQuery('#creditSubAcc').hide();
            credit.attr('class', 'col-lg-4');
            jQuery("#ddlCreditSubAcc").empty();
            jQuery("#ddlCreditSubAcc").append(jQuery("<option></option>").val("0").text("SUB ACCOUNT"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    changeDt: function (dt) {

        var day = dt.split('-')[0];
        var mnth = dt.split('-')[1].trim();
        var year = dt.split('-')[2];
        var mntharr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        for (var i = 0; i < 12; i++)
            if (mntharr[i] == mnth)
                break;
        i = i + 1;
        if (i < 10)
            mnth = '0' + i;
        else
            mnth = i;
        dt = year + '-' + mnth + '-' + day;
        return dt;
    },

    getNonElectData: function (branchid, ptype) {
        jQuery('.page-loader-wrapper').show();
        var GetPayTypeData = {
            "flag1": "ELECTRICITY",
            "flag2": "NONELECTRICITY",
            "inptvar1": branchid,
            "inptvar2": ptype,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.fillNonElectData, userdata.token)
    },
    fillNonElectData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult[0].param1 != null) {
                var p1 = response.data.queryResult[0].param1;
            }
            if (response.data.queryResult[0].param2 != null) {
                var p2 = parseInt(response.data.queryResult[0].param2);
            }
            if (response.data.queryResult[0].param3 != null) {
                p3 = response.data.queryResult[0].param3;
            }

            jQuery('#others').show();
            jQuery('#confirm').show();

            jQuery('#gstcheck').show();
            jQuery('#tdspercentage').show();
            jQuery('#tdsamount').show();
            jQuery('#tdsper').prop("disabled", true);
            jQuery('#tdsamt').prop("disabled", true);
            jQuery('#ddltdsCat').prop("disabled", true);

        }
    },

    GetGST: function () {
        jQuery('.page-loader-wrapper').show();
        jQuery('#gstin-error').hide();
        var val = jQuery('#gstin').val().toUpperCase();
        gststate = parseInt(val.substring(0, 2));
        var GetGSTValue = {
            "gstin": val,
            "consent": "Y",
            "consent_text": "I hereby declare my consent agreement for verifying my data to Asirvad company",
            "firmId": "3",
            "empId": userdata.userId

        };

        _http.post(MFPUBLICKYCAPI_URL + "api/gst", GetGSTValue, _AddPayData.FillGST, userdata.token)

    },
    FillGST: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.pradr.em.length > 0) {
                jQuery('#vendordata').show();
                jQuery("#vendorName").val(response.data.lgnm);
                jQuery("#vendorAddress").val(response.data.pradr.adr);
                jQuery('#gstin').prop("readonly", false);
                jQuery("#grossGST").val("");
                jQuery("#grossamt").val("");


            }
            else {
                jQuery('#vendordata').hide();
                jQuery("#gstin").val("");
                jQuery("#grossGST").val("");
                jQuery("#grossamt").val("");
                jQuery("#vendorName").val("");
                jQuery("#vendorAddress").val("");
                jQuery('#gstin').prop("readonly", false);
            }
        }
        else {
            swal("GST", "Invalid GSTIN number..!", "error");
            jQuery('#vendordata').hide();
            jQuery("#vendorName").val("");
            jQuery("#vendorAddress").val("");
            jQuery("#gstin").val("");
            jQuery("#grossGST").val("");
            jQuery("#grossamt").val("");
            jQuery('#gstin').prop("readonly", false);
        }
    },


    submitdata: function () {
        if (_AddPayData.checkVals()) {
            jQuery('.page-loader-wrapper').show();
            var paytype = parseInt(jQuery('#ddlPayType').val().split('#')[0]);
            var gstin = jQuery('#gstin').val().toUpperCase();
            var tdsper = 0;
            var tdsamt = 0;
            var tdscat = 0;
            var vendor_data = "";
            var brid;

            if (paytype == 22) {
                brid = userdata.branchId;
            } else {
                brid = jQuery('#ddlPayBranch').val();
            }
            if (gstin == null || gstin == "") {
                gstin = "NIL";
            }
            else {
                var vendor_name = jQuery('#vendorName').val().toUpperCase();
                var vendor_address = jQuery('#vendorAddress').val().toUpperCase();
                vendor_data = vendor_name + "~" + vendor_address;
            }
            if (jQuery('#tdscheck').is(":checked")) {
                tdsper = parseFloat(jQuery('#tdsper').val());
                tdsamt = parseFloat(jQuery('#tdsamt').val());
                tdscat = parseFloat(jQuery('#ddltdsCat').val());
            }
            var totamt = parseFloat(jQuery('#totalamt').val());
            var totnet = parseFloat(jQuery('#grossamt').val());
            var totgst = parseFloat(jQuery('#grossGST').val());

            var dbmainAccount = jQuery('#ddlDebitAcc').val();
            var dbSubAccount = 0, crSubAccount = 0;
            if (dbsub)
                dbSubAccount = jQuery('#ddlDebitSubAcc').val();
            var crmainAccount = jQuery('#ddlCreditAcc').val();
            if (crsub)
                crSubAccount = jQuery('#ddlCreditSubAcc').val();


            var bilno = jQuery('#billno').val().toUpperCase();
            var bildt = _AddPayData.convertdateformat(jQuery('#dtToDate').val());
            var remarks = jQuery('#remarks').val().toUpperCase();

            var usrid = userdata.userId.toString();

            var GetPayTypeData = {
                "branchId": brid,
                "type_id": paytype,
                "gstin": gstin,
                "vender_data": vendor_data,
                "tds_per": tdsper,
                "tds_amt": tdsamt,
                "tot_amt": totamt,
                "tot_gst": totgst,
                "gross_amt": totnet,
                "bill_number": bilno,
                "bill_dt": bildt,
                "main_acc_db": dbmainAccount,
                "sub_acc_db": dbSubAccount,
                "main_acc_cr": crmainAccount,
                "sub_acc_cr": crSubAccount,
                "tds_cat": tdscat,
                "remarks": remarks,
                "user_id": usrid
            };

            //_http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PrPaymentAtBranch", GetPayTypeData, _AddPayData.SubmitReturn, userdata.token)

        }
    },

    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            var msg = jQuery.trim(response.data.message);
            if (response.data.errStatus = "1") {
                swal({
                    title: msg,
                    text: "",
                    type: "success"
                }, function () {
                    window.location.reload(true);
                });
            }
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


    checkVals: function () {
        var val = jQuery('#ddlPayType').val();
        var tpe = parseInt(jQuery('#ddlPayType').val().split("#")[0]);
        var totamt = parseFloat(jQuery('#totalamt').val());
        var bilno = jQuery('#billno').val();
        var gst = parseFloat(jQuery('#grossGST').val());
        var bildtval = Date.parse(jQuery('#dtToDate').val());
        var remarks = jQuery('#remarks').val();
        var gstin = jQuery('#gstin').val();
        var branchId = jQuery('#ddlPayBranch').val();
        var dbAccount = jQuery('#ddlDebitAcc').val();
        var dbSubAccount = jQuery('#ddlDebitSubAcc').val();
        var crAccount = jQuery('#ddlCreditAcc').val();
        var crSubAccount = jQuery('#ddlCreditSubAcc').val();
        var tdspr = jQuery('#tdsper').val();
        var tds = jQuery('#ddltdsCat').val();

        if (val == 0) {
            swal("", "Please Select a Payment Type...!", "error");
            return false;
        }
        else if (tpe == 25 && branchId == 0) {
            swal("", "Please Select a Branch...!", "error");
            return false;
        }
        else if ((jQuery('#tdscheck').is(":checked") && isNaN(tdspr)) || (jQuery('#tdscheck').is(":checked") && tdspr < 1)) {
            swal("", "Enter TDS percentage..!", "error");
            return false;
        }
        else if (isNaN(totamt) || totamt < 1) {
            swal("", "Total amount cannot be Null..!", "error");
            return false;
        }

        else if (isNaN(gst) || gst < 0) {
            swal("", "GST cannot be Null..!", "error");
            return false;
        }

        else if (bilno == "") {
            swal("", "Please enter bill number..!", "error");
            return false;
        }
        else if (isNaN(bildtval)) {
            swal("", "Please select the bill date..!", "error");
            return false;
        }
        else if (dbAccount == 0) {
            swal("", "Please select debit account..!", "error");
            return false;
        }
        else if (dbAccount != 0 && dbsub && dbSubAccount == 0) {
            swal("", "Please select sub account for debit account..!", "error");
            return false;
        }
        else if (crAccount == 0) {
            swal("", "Please select credit account..!", "error");
            return false;
        }
        else if (crAccount != 0 && crsub && crSubAccount == 0) {
            swal("", "Please select sub account for credit account..!", "error");
            return false;
        }
        else if (jQuery('#tdscheck').is(":checked") && tds == 0) {
            swal("", "Please select TDS category..!", "error");
            return false;
        }
        else if (remarks == "") {
            swal("", "Remarks cannot be Null..!", "error");
            return false;
        }
        else if (Strbase64 == null) {
            swal("", "Please capture the Bill..!", "error");
            return false;
        }
        else
            return true;
    },
    convertdateformat: function (dt) {
        ndt = dt.replace(/\//g, '-');
        var vyear = ndt.split('-')[0];
        var vmonth = parseInt(ndt.split('-')[1]);
        var vday = ndt.split('-')[2];
        var vmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var vmon = vmonths[vmonth - 1];
        var valtortn = vday + '-' + vmon + '-' + vyear;
        return valtortn
    },
    takeSnapShot: function () {
        jQuery('#camsection').show();
        Webcam.set({
            width: 400,
            height: 310,
            image_format: 'jpeg',
            jpeg_quality: 100
        });
        Webcam.attach('#camera');
    },
    takeInvoice: function () {
        Webcam.snap(function (k) {

            var $image = jQuery('<img id="rtimg" src="' + k + '" height="310" width="100%" />');
            jQuery('#viewUploadedImages').html($image);
            jQuery('#viewUploadedImages').show();

            Strbase64 = k.toString().replace('data:image/jpeg;base64,', '');

            if (jQuery('#viewUploadedImages').val() == null) {
                swal("", "Add URL or PDF File..!", "warning");
                return false;
            }
        });

    },
    DateDiff: function (tp) {
        if (tp == 1) {
            var frmdtval = Date.parse(jQuery('#itmfrmdt').val());
            var todtval = Date.parse(jQuery('#itmtodt').val());
        }
        else {
            var frmdtval = Date.parse(jQuery('#efromDate').val());
            var todtval = Date.parse(jQuery('#etoDate').val());
        }
        var dif = (todtval - frmdtval) / 86400000;

        if (!(isNaN(dif))) {
            if (dif < 0) {
                swal("Invalid Date Selection", "To Date must be greater than From date..!", "error");
                if (tp == 1) {
                    jQuery('#itmtodt').val("");
                    return false;
                }
                else {
                    jQuery('#etoDate').val("");
                    return false;
                }
            }
            else {
                if (tp == 2) {
                    _AddPayData.monthdif(_AddPayData.convertdateformat(jQuery('#efromDate').val()), _AddPayData.convertdateformat(jQuery('#etoDate').val()));
                }
            }
        }
    },
    monthdif: function (frmdt, todt) {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetPayTypeData = {
            "flag1": "GETMONTHDIFF",
            "flag2": "",
            "inptvar1": frmdt,
            "inptvar2": todt,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.fillmonthdif, userdata.token)

    },

    enontotcalc: function (n) {

        var totamt = parseFloat(jQuery('#totalamt').val());
        var grossGST = parseFloat(jQuery('#grossGST').val());
        var tdsper;
        var grossamt;
        var tdsamt;
        if (jQuery('#tdscheck').is(":checked")) {
            tdsper = parseFloat(jQuery('#tdsper').val());
            if (tdsper == 0 || isNaN(tdsper)) {
                swal("Error", "Invalid TDS, must be greater than Zero..!", "error");
                return false;
            }
        }
        else {
            tdsper = 0;
            jQuery('#tdsper').val(tdsper.toFixed(2));
        }
        tdsamt = tdsper * totamt / 100;
        jQuery('#tdsamt').val(tdsamt.toFixed(2));
        var gstin = jQuery('#gstin').val();
        if (n == 1) {
            if (totamt == 0 || isNaN(totamt)) {
                swal("Error", "Invalid amount, must be greater than Zero..!", "error");
                return false;
            }
            if (gstin == "" || gstin == null) {
                jQuery('#grossGST').val(0);
                grossamt = totamt - tdsamt;
                jQuery('#grossamt').val(grossamt.toFixed(2));


            }
            if (grossGST >= 0 && !isNaN(grossGST)) {
                grossamt = grossGST + totamt - tdsamt;
                jQuery('#grossamt').val(grossamt.toFixed(2));
            }
        }
        else {
            if (grossGST < 0 || isNaN(grossGST)) {
                swal("Error", "Invalid GST amount, must be greater than or equal to Zero..!", "error");
                jQuery('#grossGST').val("");
                jQuery("#grossamt").val("");
                return false;
            }

            if (gstin == "" && grossGST > 0) {
                swal("Error", "Enter the GSTIN number First..!", "error");
                jQuery('#grossGST').val("");
                jQuery("#grossamt").val("");
                return false;
            }
            else if (gstin != "" && grossGST <= 0) {
                swal("Error", "GST Amount cannot be zero..!", "error");
                jQuery('#grossGST').val("");
                jQuery("#grossamt").val("");
                return false;
            }
            else {
                if (totamt > 0 && !isNaN(totamt)) {
                    grossamt = grossGST + totamt - tdsamt;
                    jQuery('#grossamt').val(grossamt.toFixed(2));
                }
            }
        }
    }
}


var Strbase64;
var limit;


jQuery(document).ready(function ($) {
    _AddPayData.checkAccess();
    jQuery('.page-loader-wrapper').hide();
    var dt = new Date();
    var mon, dy, e;
    e = parseInt(dt.getMonth()) + 1;
    if (e < 10)
        mon = "0" + e;
    else
        mon = e;
    e = parseInt(dt.getDate());
    if (e < 10)
        dy = "0" + e;
    else
        dy = e;
    var d = dt.getFullYear() + '-' + mon + '-' + dy;

    jQuery('#dtToDate').prop('max', d);

    jQuery('#ddlPayType').change(function (e) {

        jQuery('#bs_datepicker_container5 input').datepicker({
            autoclose: true,
            format: "yyyy/mm/dd",
            showbuttonPanel: true,
            defaultDate: "+1w",
            changeMonth: true,
            endDate: new Date(),
            container: '#bs_datepicker_container5'
        }).datepicker("setDate", new Date());

        //jQuery("#ddlPayType").prop('disabled', 'true');
        var val = jQuery('#ddlPayType').val();

        if (val != "0") {
            var arr = val.split("#");
            var typeid = parseInt(arr[0]);
            if (typeid == 25) {
                var prtype = jQuery('#typelength');
                if (prtype.hasClass('col-lg-4')) {
                    prtype.attr('class', 'col-lg-2');
                    jQuery('#BranchPayment').show();
                    _AddPayData.GetBranchData();
                }
                else {
                    jQuery('#BranchPayment').hide();
                    prtype.attr('class', 'col-lg-4');
                }
            }
            var type = parseInt(arr[1]);
            limit = parseInt(arr[2]);
            jQuery('#gstcheck').hide();
            jQuery('#tdspercentage').hide();
            jQuery('#tdsamount').hide();

            jQuery('#others').hide();
            jQuery('#confirm').hide();
            jQuery('#vendordata').hide();
            jQuery('#gstin').val("");
            jQuery("#vendorName").val("");

            jQuery('#tdsper').val("");
            jQuery("#tdsamt").val("");

            jQuery("#vendorAddress").val("");

            jQuery('#totalamt').val("");
            jQuery('#grossGST').val("");
            jQuery('#grossamt').val("");
            jQuery('#billno').val("");
            jQuery('#dtToDate').val("");
            jQuery('#remarks').val("");

            _AddPayData.getNonElectData(userdata.branchId, typeid);
            jQuery('#itemdata').hide();
            jQuery('#electricity').hide();
            jQuery('#readingdetails').hide();

            jQuery('#totalamt').prop("readonly", false);
            jQuery('#grossGST').prop("readonly", false);
            jQuery('#grossamt').prop("readonly", true);

            if (type == 4) {
                _AddPayData.GetDebitAcc(typeid);
            }

        }
        else {
            jQuery('#gstcheck').hide();
            jQuery('#tdspercentage').hide();
            jQuery('#tdsamount').hide();
            jQuery('#others').hide();
            jQuery('#confirm').hide();
        }
    });


    jQuery('#gstin').change(function (e) {
        var val = parseInt(jQuery('#gstin').val());
        _AddPayData.GetGST();
    });

    jQuery('#ddlDebitAcc').change(function (e) {
        var accno = jQuery('#ddlDebitAcc').val();
        if (accno != 0) {
            _AddPayData.GetDebitSubAcc(accno);
        }
        else {
            jQuery('#debitSubAcc').hide();
            debit.attr('class', 'col-lg-4');
        }
    });

    jQuery('#ddlCreditAcc').change(function (e) {
        var accno = jQuery('#ddlCreditAcc').val();

        if (accno != 0) {
            _AddPayData.GetCreditSubAcc(accno);
        }
        else {
            jQuery('#creditSubAcc').hide();
            credit.attr('class', 'col-lg-4');
        }
    });

    jQuery('#totalamt').focusout(function (e) {
        _AddPayData.enontotcalc(1);
    });
    jQuery('#tdsper').keyup(function (e) {
        var per = parseFloat(jQuery('#tdsper').val());
        if (per > 50) {
            jQuery('#tdsper').val("");
        }
    });
    jQuery('#tdsper').focusout(function (e) {
        var amt = parseFloat(jQuery('#totalamt').val());
        var tdsper = parseFloat(jQuery('#tdsper').val());
        if (!isNaN(amt) && !isNaN(tdsper))
            _AddPayData.enontotcalc(1);
    });

    jQuery('#grossGST').change(function (e) {
        _AddPayData.enontotcalc(0);
    });
    jQuery('#submit').click(function (e) {
        _AddPayData.submitdata();
    });
    jQuery('#billupd').click(function (e) {
        jQuery('#camera').show();
        jQuery('#camsection').show();
        jQuery('#closeCam').show();
        _AddPayData.takeSnapShot();
    });
    jQuery('#ClickmeBtn').click(function (e) {
        _AddPayData.takeInvoice();
    });
    jQuery('#ClickmeBtnSave').click(function (e) {
        jQuery('#camera').hide();
        jQuery('#camsection').hide();
        jQuery('#closeCam').hide();
        jQuery('#viewUploadedImages').hide();
        if (Strbase64 != null) {
            jQuery('#tick').show();
            jQuery('#close').hide();
        }
        Webcam.reset();
    });
    jQuery('#tdscheck').click(function (e) {
        jQuery('#tdsper').val("");
        jQuery('#tdsamt').val("");
        jQuery('#grossamt').val("");
        var amt = parseFloat(jQuery('#totalamt').val());
        if (jQuery('#tdscheck').is(":checked")) {
            jQuery('#tdsper').prop("disabled", false);
            jQuery('#ddltdsCat').prop("disabled", false);

            jQuery('#tdsper').focus();
        } else {
            jQuery('#tdsper').val(0);
            jQuery('#tdsper').prop("disabled", true);
            jQuery('#ddltdsCat').val(0);
            jQuery('#ddltdsCat').prop("disabled", true);
            if (!isNaN(amt))
                _AddPayData.enontotcalc(1);
        }

    });


});

var spanCam = document.getElementsByClassName("close")[0];
var dbsub = false;
var crsub = false;
spanCam.onclick = function () {
    jQuery('#camera').hide();
    jQuery('#camsection').hide();
    jQuery('#closeCam').hide();
    jQuery('#viewUploadedImages').hide();
    if (Strbase64 != null) {
        jQuery('#tick').show();
        jQuery('#close').hide();
    }

    Webcam.reset();
}

