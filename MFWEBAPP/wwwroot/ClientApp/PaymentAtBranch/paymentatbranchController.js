//var token = "";
var token = "";
var Strbase64List = [];   // array to hold multiple base64 strings
var DFILETYPE = "";       // optional: track file type (IMG/PDF)
var _AddPayData = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _AddPayData.checkAccessRtn, token)
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
                    _AddPayData.GetPayData1();
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

    // Token Validation
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _AddPayData.checkAccessToken, userdata.token)
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
                _AddPayData.GetPayData1();
            }


        }

    },




    //CheckCourierSend: function () {
    //    jQuery('.page-loader-wrapper').show();
    //    var Str = " ";
    //    var CheckCourierSend = {
    //        "flag1": "CHECKCOURIERSEND",
    //        "flag2": "",
    //        "inptvar1": userdata.branchId,
    //        "inptvar2": Str
    //    };

    //    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckCourierSend, _AddPayData.checkCouriersendRtn, userdata.token)
    //},

    //checkCouriersendRtn: function (response) {
    //    if (response.status === "SUCCESS") {
    //        jQuery('.page-loader-wrapper').hide();
    //        if (response.data.queryResult.length > 0) {
    //            var x = response.data.queryResult[0].param1;
    //            if (x > "0") {
    //                swal({
    //                    title: "WARNING",
    //                    text: "PLEASE SEND THE BILL ABOVE RS 1,000/- VIA COURIER; OTHERWISE, BRANCH EXPENSES WILL NOT BE RECORDED..!",
    //                    type: "info"
    //                }, function () {
    //                    window.location.href = "dashboard";
    //                });
    //            }

    //        }
    //    }
    //    else {
    //        swal({
    //            title: "WARNING",
    //            text: "PLEASE SEND THE BILL ABOVE RS 1,000 VIA COURIER; OTHERWISE, BRANCH EXPENSES WILL NOT BE RECORDED..!",
    //            type: "info"
    //        }, function () {
    //            window.location.href = "dashboard";
    //        });
    //    }
    //},


    GetPayData1: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetPayTypeData = {
            "typeID": "2",
            "flag1": "INITIALICEPAYATBRANCH",
            "flag2": "PAYTYPE",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            GetPayTypeData = JSON.stringify(GetPayTypeData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillPayType, token)

    },
    FillPayType: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                //if (response.data.queryResult.length > 0) {
                //token = response.data.queryResult.token;
                var tokenidd = response.data.queryResult.token;;  //token response
                token = tokenidd; //new token
                jQuery("#ddlPayType").empty();
                jQuery("#ddlPayType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE PAYMENT TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
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
    getElectData: function (branchid) {
        var Str = " ";
        var GetPayTypeData = {
            "typeID": "2",
            "flag1": "ELECTRICITY",
            "flag2": "READING",
            "inptvar1": branchid,
            "inptvar2": Str,
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            GetPayTypeData = JSON.stringify(GetPayTypeData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.fillElectData, token)
    },
    fillElectData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            var tokenidd = response.data.queryResult.token;
            token = tokenidd;
            if (response.data.queryResult.QueryResult[0].param1 == '1') {
                //var dt = _AddPayData.changeDt(response.data.queryResult[0].param3);
                jQuery("#openReading").val(response.data.queryResult.QueryResult[0].param2);
                jQuery("#efromDate").val(response.data.queryResult.QueryResult[0].param3);
                jQuery("#openReading").prop("disabled", true);
                jQuery("#efromDate").prop("disabled", true);
            }
        }
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
            "typeID": "2",
            "flag1": "ELECTRICITY",
            "flag2": "NONELECTRICITY",
            "inptvar1": branchid,
            "inptvar2": ptype,
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            GetPayTypeData = JSON.stringify(GetPayTypeData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.fillNonElectData, token)
    },
    fillNonElectData: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            var tokenidd = response.data.queryResult.token;
            token = tokenidd;

            if (response.data.queryResult.QueryResult[0].param1 != null) {
                var p1 = response.data.queryResult.QueryResult[0].param1;
            }
            if (response.data.queryResult.QueryResult[0].param2 != null) {
                var p2 = parseInt(response.data.queryResult.QueryResult[0].param2);
            }
            if (response.data.queryResult.QueryResult[0].param3 != null) {
                p3 = response.data.queryResult.QueryResult[0].param3;
            }

            jQuery("#fromc").val(response.data.queryResult.QueryResult[0].param3);
            //jQuery("#openReading").prop("disabled", true);
            jQuery("#fromc").prop("disabled", true);



            jQuery("#grosssgstper").val(0);
            jQuery("#grosscgstper").val(0);
            jQuery("#grossigstper").val(0);
            jQuery('#others').show();
            jQuery('#confirm').show();
            jQuery('#eopen').val(0);
            jQuery('#eclose').val(0);
            jQuery('#emonths').val(0);
            jQuery('#emonthsadd').val(0);
            jQuery('#limit').val(limit);
            jQuery('#requested').val(p1);
            jQuery('#available').val(parseInt(limit) - parseInt(p1));
            if (p2 < 100) {
                jQuery('#Limit').show();
                jQuery('#Requested').show();
                jQuery('#Available').show();
            }
            jQuery('#gstcheck').show();


            //new modification PR date
            jQuery('#bs_datepicker_container11').show();
            jQuery('#bs_datepicker_container10').show();
            jQuery('#remarkss').show();
            if (response.data.queryResult.QueryResult[0].param5 == '5' && response.data.queryResult.QueryResult[0].param4 != null) {
                jQuery("#fromc").val(response.data.queryResult.QueryResult[0].param4);
                //jQuery("#openReading").prop("disabled", true);
                jQuery("#fromc").prop("disabled", true);
                //}
                //else {sss
                //    jQuery('#fromc').val("");
                //    jQuery("#fromc").prop("disabled", false);

                //}

            }
            //var dt = _AddPayData.changeDt(response.data.queryResult[0].param3);
            else {
                jQuery('#fromc').val("");
                jQuery("#fromc").prop("disabled", false);
            }


            //if (p1 == '0') {
            //    jQuery("#grosssgstper").val(0);
            //    jQuery("#grosscgstper").val(0);
            //    jQuery("#grossigstper").val(0);
            //    jQuery('#others').show();
            //    jQuery('#confirm').show();
            //    jQuery("#itmfrmdt").prop("disabled", false);
            //}
            //else if (p1 == '1') {
            //    jQuery("#grosssgstper").val(0);
            //    jQuery("#grosscgstper").val(0);
            //    jQuery("#grossigstper").val(0);
            //    jQuery('#others').show();
            //    jQuery('#confirm').show();
            //    var dt = _AddPayData.changeDt(p2);
            //    jQuery("#itmfrmdt").val(dt);
            //    jQuery("#itmfrmdt").prop("disabled", true);
            //}
            //else if (p1 == '2') {
            //    jQuery("#itmfrmdt").prop("enabled", true);
            //    jQuery('#gstcheck').show();
            //}
            //else {
            //    jQuery('#gstcheck').show();
            //    var dt = _AddPayData.changeDt(p2);  
            //    jQuery("#itmfrmdt").val(dt);
            //    jQuery("#itmfrmdt").prop("disabled", true);
            //}
        }

        else if (response.responseMsg == "Invalid Token") {
            window.location.href = DOMAIN_URL;
        }
    },

    //New modification For date
    GetDateData: function (typeid) {
        var Str = " ";
        var exptypeid = typeid;

        var GetPayTypeDatas = {
            "typeID": "2",
            "flag1": "ELECTRICITY",
            "flag2": "NONREADING",
            "inptvar1": userdata.branchId,
            "inptvar2": exptypeid,
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            GetPayTypeDatas = JSON.stringify(GetPayTypeDatas);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetPayTypeDatas = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeDatas) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeDatas, _AddPayData.fillElectNonData, token)
    },
    fillElectNonData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            var tokenidd = response.data.queryResult.token;
            token = tokenidd;
            if (response.data.queryResult.QueryResult[0].param1 == '1') {


                //var dt = _AddPayData.changeDt(response.data.queryResult[0].param3);
                //jQuery("#openReading").val(response.data.queryResult[0].param2);
                jQuery("#fromc").val(response.data.queryResult.QueryResult[0].param3);
                //jQuery("#openReading").prop("disabled", true);
                jQuery("#fromc").prop("disabled", true);
            }

            else {

                jQuery("#fromc").prop("enabled", true);
            }
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

        _http.post(MFPUBLICKYCAPI_URL + "api/gst", GetGSTValue, _AddPayData.FillGST, token)

    },
    FillGST: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            // response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.pradr.em.length > 0) {
                jQuery('#vendordata').show();
                jQuery("#vendorName").val(response.data.lgnm);
                jQuery("#vendorAddress").val(response.data.pradr.adr);
                jQuery('#gstin').prop("readonly", false);
                jQuery("#grossGST").val("");
                jQuery("#grossamt").val("");
                //_AddPayData.gstsplitup(gststate, userdata.branchId,p3);

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
    gstsplitup: function (gstvndr, brid, gstper) {
        jQuery('.page-loader-wrapper').show();
        var val1 = gstvndr + '!!' + brid;
        var GetPayTypeData = {
            "typeID": "2",
            "flag1": "GSTIN",
            "flag2": "SPLITUP",
            "inptvar1": val1,
            "inptvar2": gstper,
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            GetPayTypeData = JSON.stringify(GetPayTypeData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.fillgstsplitup, token)

    },
    fillgstsplitup: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            var tokenidd = response.data.queryResult.token;
            token = tokenidd;

            jQuery("#grosssgstper").val(response.data.queryResult[0].param1);
            jQuery("#grosscgstper").val(response.data.queryResult[0].param2);
            jQuery("#grossigstper").val(response.data.queryResult[0].param3);
            jQuery('#others').show();
            jQuery('#confirm').show();
        }
    },
    consumption: function () {
        var open = parseFloat(jQuery('#openReading').val());
        var close = parseFloat(jQuery('#closeReading').val());
        if (isNaN(open) || isNaN(close)) {
            jQuery('#unitconsumed').val("");
        } else {
            if (close > open) {
                jQuery('#unitconsumed').val(close - open);
                //_AddPayData.electtotal();
            } else {
                jQuery('#unitconsumed').val("");
            }
        }
    },

    EnetVals: function () {
        var esgst = parseFloat(jQuery('#esgstamt').val());
        var ecgst = parseFloat(jQuery('#ecgstamt').val());
        var eigst = parseFloat(jQuery('#eigstamt').val());
        var etot = parseFloat(jQuery('#electtotamt').val());
        if (isNaN(esgst) || isNaN(ecgst) || isNaN(eigst) || isNaN(etot)) {
            jQuery('#etotalgst').val("");
            jQuery('#enetamount').val("");
        } else {
            var totalgst = esgst + ecgst + eigst;
            var netamt = etot + totalgst;
            jQuery('#etotalgst').val(totalgst.toFixed(2));
            jQuery('#enetamount').val(netamt.toFixed(2));
        }

    },

    addElectricity: function () {
        var etot = parseFloat(jQuery('#electtotamt').val());
        var totgst = parseFloat(jQuery('#etotalgst').val());
        var totamt = parseFloat(jQuery('#enetamount').val());
        var efrmdtval = Date.parse(jQuery('#efromDate').val());
        var etodtval = Date.parse(jQuery('#etoDate').val());
        var efrmdt = jQuery('#efromDate').val();
        var etodt = jQuery('#etoDate').val();
        var eopen = jQuery('#openReading').val();
        var eclse = jQuery('#closeReading').val();
        var eunit = jQuery('#unitconsumed').val();
        var sgst = parseFloat(jQuery('#esgstamt').val());
        var cgst = parseFloat(jQuery('#ecgstamt').val());
        var igst = parseFloat(jQuery('#eigstamt').val());
        if (isNaN(etot) || isNaN(totgst) || isNaN(totamt) || isNaN(efrmdtval) || isNaN(etodtval)) {
            jQuery('#others').hide();
            swal("", "Please fill all the required Fields...!", "warning");
        }
        else {
            jQuery('#readingdetails').show();
            jQuery('#others').show();
            jQuery('#confirm').show();
            jQuery('#electricity').hide();

            jQuery('#electonly').show();
            jQuery('#electonly2').show();
            jQuery('#totalamt').val(etot);
            jQuery('#eopen').val(eopen);
            jQuery('#eclose').val(eclse);
            jQuery('#grossamt').val(totamt);
            jQuery('#grossGST').val(totgst);
            jQuery('#grosssgstamt').val(sgst);
            jQuery('#grosscgstamt').val(cgst);
            jQuery('#grossigstamt').val(igst);
            jQuery('#grosssgstper').val(sgst);
            jQuery('#grosscgstper').val(cgst);
            jQuery('#grossigstper').val(igst);
            jQuery('#itmfrmdt').val(efrmdt);
            jQuery('#itmtodt').val(etodt);
            jQuery('#eunitconsumed').val(eunit);
            jQuery('#grossTax').val(0);
            jQuery('#itmfrmdt').prop('disabled', 'true');
            jQuery('#itmtodt').prop('disabled', 'true');
        }
    },
    submitdata1: function () {
        if (_AddPayData.checkVals()) {
            jQuery('.page-loader-wrapper').show();
            var paytype = parseInt(jQuery('#ddlPayType').val().split('#')[0]);
            var gstin = jQuery('#gstin').val().toUpperCase();
            var accumilated = 0;
            if (paytype == 105 || paytype == 106) {
                accumilated = parseInt(jQuery('#accumilatedMonths').val());
            }
            if (gstin == null || gstin == "") gstin = "NIL";
            var totamt = parseFloat(jQuery('#totalamt').val());
            var totnet = parseFloat(jQuery('#grossamt').val());
            var totsgst = 0;// parseFloat(jQuery('#grosssgstamt').val());
            var totcgst = 0;//parseFloat(jQuery('#grosscgstamt').val());
            var totigst = 0;//parseFloat(jQuery('#grossigstamt').val());
            var totgst = parseFloat(jQuery('#grossGST').val());
            var months = jQuery('#emonths').val();
            //var frmdtval = Date.parse(jQuery('#itmfrmdt').val());
            //var todtdtval = Date.parse(jQuery('#itmtodt').val());
            // alert(jQuery('#itmfrmdt').val());
            var frmdtval = _AddPayData.convertdateformat(jQuery('#itmfrmdt').val());
            var todtdtval = _AddPayData.convertdateformat(jQuery('#itmtodt').val());
            var oneyrfromtval = _AddPayData.convertdateformat(jQuery('#One_YearFromdt').val());
            var oneyrtodtdtval = _AddPayData.convertdateformat(jQuery('#One_YearTodt').val());


            var fromdt = '1-jan-2021';
            var todt = '1-jan-2021';
            
            if (!isNaN(frmdtval))
                fromdt = _AddPayData.convertdateformat(jQuery('#itmfrmdt').val());
            if (!isNaN(todtdtval))
                todt = _AddPayData.convertdateformat(jQuery('#itmtodt').val());

                 //Oneyear expense date chages//
         
            //if (paytype == 28 || paytype == 23 || paytype == 128 || paytype == 129 || paytype == 130) {


            //    if (!isNaN(oneyrfromtval))
            //        oneyrfromtval = _AddPayData.convertdateformat(jQuery('#One_YearFromdt').val());

            //    if (!isNaN(oneyrtodtdtval))
            //        oneyrtodtdtval = _AddPayData.convertdateformat(jQuery('#One_YearTodt').val());

            //}
            



            var bilno = jQuery('#billno').val().toUpperCase();
            var bildt = _AddPayData.convertdateformat(jQuery('#dtToDate').val());
            var remarks = jQuery('#remarks').val().toUpperCase();
            var openread = jQuery('#eopen').val();
            var closread = jQuery('#eclose').val();
            var electunit = parseInt(closread) - parseInt(openread);
            var incident = openread + '~' + closread + '~' + months + '~' + accumilated;
            var brid = userdata.branchId;
            var frmid = 3;
            var usrid = userdata.userId.toString();
            var vendername = jQuery("#vendorName").val();
          
            

            //new modification PR
            if (paytype == 1 || paytype == 102) {
                if (frmdtval !== null || frmdtval !== undefined) {
                    var fromdt = _AddPayData.convertdateformat(jQuery('#itmfrmdt').val());
                }
                if (todtdtval !== null || todtdtval !== undefined) {
                    var todt = _AddPayData.convertdateformat(jQuery('#itmtodt').val());
                }
            }

                //Oneyear expense date chages//
            else if (paytype == 28 || paytype == 23 || paytype == 128 || paytype == 129 || paytype == 130 || paytype == 132 || paytype == 133) {


                if (!isNaN(oneyrfromtval))
                    oneyrfromtval = _AddPayData.convertdateformat(jQuery('#One_YearFromdt').val());

                if (!isNaN(oneyrtodtdtval))
                    oneyrtodtdtval = _AddPayData.convertdateformat(jQuery('#One_YearTodt').val());

                var fromdt = oneyrfromtval;
                var todt = oneyrtodtdtval;
                                
            }

            else {
                if (frmdtval !== null || frmdtval !== undefined) {
                    var fromdt = _AddPayData.convertdateformat(jQuery('#fromc').val());
                }
                if (todtdtval !== null || todtdtval !== undefined) {
                    var todt = _AddPayData.convertdateformat(jQuery('#Toc').val());
                }
              
            }

            var GetPayTypeData = {
                "branchId": brid,
                "firmId": frmid,
                "paymentType": paytype,
                "mAgencyId": 0,
                "amount": totamt,
                "serviceTax": totgst,
                "sgst": totsgst,
                "ugst": 0,
                "cgst": totcgst,
                "igst": totigst,
                "grossAmount": totnet,
                "billno": bilno,
                "billDt": bildt,
                "elecUnits": electunit,
                "remarks": remarks,
                "fromDt": fromdt,
                "toDt": todt,
                "userId": usrid,
                "incid": 0,
                "incident": incident,
                "itemDtl": "NIL",
                "connType": gstin,
                //"invoiceFile": Strbase64,
                //"fileType": "img",
                "invoiceFile": Strbase64List,   // send all images as an array
                "fileType": "img",              // still "img" since you only allow images
                "userID": userdata.userId,
                "branchID": userdata.branchId,
                "typeID": "2",
                "vendorName": vendername
            };
            try {
                GetPayTypeData = JSON.stringify(GetPayTypeData);
            } catch (e) {
                swal("", e.message, "warning");
                return false;
            }
            GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PrPaymentAtBranch", GetPayTypeData, _AddPayData.SubmitReturn, token)

        }
    },

    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            //var msg = jQuery.trim(response.data.message);
            var msg = jQuery.trim(response.data.queryResult.message);
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
    //    checkdate: function (frmdt) {
    //        jQuery('.page-loader-wrapper').show();
    //        var ptype = jQuery("#ddlPayType").val().split('#')[0];
    //        var GetdtcheckData = {
    //            "flag1": "DATECHECK",
    //            "flag2": "",
    //            "inptvar1": ptype + "!!" + frmdt,
    //            "inptvar2": userdata.branchId
    //        };

    //        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetdtcheckData, _AddPayData.checkdateResult, userdata.token)

    //    },
    //    checkdateResult: function (response) {
    //        jQuery('.page-loader-wrapper').hide();
    //        if (response.status === "SUCCESS") {
    //            if (response.data.queryResult.length > 0) {
    //                var x = parseInt(response.data.queryResult[0].param1);
    //                if (x == 1) {
    //                    swal("Invalid Date", "Already entered in this period..!", "error");
    //                    jQuery('#itmfrmdt').val("");
    //                    jQuery('#itmtodt').val("");
    //                    return false;
    //                }
    //            }
    //        }

    //    },

    checkVals: function () {
        var val = jQuery('#ddlPayType').val();
        var tpe = parseInt(jQuery('#ddlPayType').val().split("#")[0]);
        var totamt = parseFloat(jQuery('#totalamt').val());
        var bilno = jQuery('#billno').val();
        var gst = parseFloat(jQuery('#grossGST').val());
        //alert(jQuery('#dtToDate').val());
        var bildtval = Date.parse(jQuery('#dtToDate').val());
        var remarks = jQuery('#remarks').val();
        var gstin = jQuery('#gstin').val();
        var acummonth = jQuery('#accumilatedMonths').val();
        var frmdtval = Date.parse(jQuery('#itmfrmdt').val());
        var todtval = Date.parse(jQuery('#itmtodt').val());
        

        //New modification PR date
        if (tpe == 1) {
            frmdtval = frmdtval;
            todtdtval = todtval;
        }
        else {
            frmdtval = frmdtval;
            todtdtval = todtval;
        }
        //if (val != "1#3#7500") {
        //    if (jQuery('#fromc').val() == '') {
        //        swal("", "Please Select From date ....", "warning");
        //        return false;
        //    }
        //    if (jQuery('#Toc').val() == '') {
        //        swal("", "Please Select To date ....", "warning");
        //        return false;
        //    }

        //}


        if (val == 0) {
            swal("", "Please Select a Payment Type...!", "error");
            return false;
        }
        else if (isNaN(totamt) || totamt < 1) {
            swal("", "Total amount cannot be Null..!", "error");
            return false;
        }
        else if (frmdtval == "") {
            swal("", "Please select the From date..!", "error");
            return false;
        }
        else if (todtdtval == "") {
            swal("", "Please select the To date..!", "error");
            return false;
        }
        else if (isNaN(gst) || gst < 0) {
            swal("", "GST cannot be Null..!", "error");
            return false;
        }
        //else if (gstin != "" && gst == 0) {
        //    swal("", "GST cannot be Zero..!", "error");
        //    jQuery('#grossGST').val("");
        //    jQuery('#grossamt').val("");

        //    return false;
        //}
        else if (bilno == "") {
            swal("", "Please enter bill number..!", "error");
            return false;
        }
        else if (isNaN(bildtval)) {
            swal("", "Please select the bill date..!", "error");
            return false;
        }
        else if (remarks == "") {
            swal("", "Remarks cannot be Null..!", "error");
            return false;
        }

        else if (!Strbase64List || Strbase64List.length === 0) {
            swal("", "Please capture the Bill..!", "error");
            return false;
        }
        //else if (Strbase64 == null || Strbase64 == "") {
        //    swal("", "Please capture the Bill..!", "error");
        //    return false;
        //}
        else if ((tpe == 105 || tpe == 106) && acummonth <= 0) {
            swal("Info", "accumilated months must be graterthan 0..!", "info");
            return false;
        }

        else if ((tpe == 127 || tpe == 128 || tpe == 129 || tpe == 130 || tpe == 131 || tpe == 132 || tpe == 133) && (totamt > 35000)) {
            swal("Info", "You cannot enter more than maximum amount..!", "info");
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

            var $image = jQuery('<img id="rtimg" src="' + k + '" height="310" width="80%" />');
            jQuery('#viewUploadedImages').html($image);
            jQuery('#viewUploadedImages').show();

            // Push captured image into the list instead of overwriting
            var cleanBase64 = k.toString().replace('data:image/jpeg;base64,', '');
            Strbase64List.push(cleanBase64);

            // Validation check
            if (!Strbase64List || Strbase64List.length === 0) {
                swal("", "Add URL or PDF File..!", "warning");
                return false;
            }
        });

    },
    //takeInvoice: function () {
    //    Webcam.snap(function (k) {

    //        var $image = jQuery('<img id="rtimg" src="' + k + '" height="310" width="80%" />');
    //        jQuery('#viewUploadedImages').html($image);
    //        jQuery('#viewUploadedImages').show();

    //        Strbase64 = k.toString().replace('data:image/jpeg;base64,', '');

    //        if (jQuery('#viewUploadedImages').val() == null) {
    //            swal("", "Add URL or PDF File..!", "warning");
    //            return false;
    //        }
    //    });

    //},
    DateDiff: function (tp) {
        if (tp == 1) {
            var frmdtval = Date.parse(jQuery('#itmfrmdt').val());
            var todtval = Date.parse(jQuery('#itmtodt').val());
        }
        else if (tp == 3) {
            var frmdtval = Date.parse(jQuery('#fromc').val());
            var todtval = Date.parse(jQuery('#Toc').val());
        }



        else if (tp == 4) {
            var frmdtval = Date.parse(jQuery('#One_YearFromdt').val());
            var todtval = Date.parse(jQuery('#One_YearTodt').val());
        }
        else {
            var frmdtval = Date.parse(jQuery('#efromDate').val());
            var todtval = Date.parse(jQuery('#etoDate').val());
        }
        var dif = (todtval - frmdtval) / 86400000;
        //alert(dif);
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

                if (tp == 3) {
                    _AddPayData.monthdif(_AddPayData.convertdateformat(jQuery('#fromc').val()), _AddPayData.convertdateformat(jQuery('#Toc').val()),3);
                }
                if (tp == 2) {
                    _AddPayData.monthdif(_AddPayData.convertdateformat(jQuery('#efromDate').val()), _AddPayData.convertdateformat(jQuery('#etoDate').val()),2);
                }
                //one year expense
                if (tp == 4) {
                    _AddPayData.monthdif(_AddPayData.convertdateformat(jQuery('#One_YearFromdt').val()), _AddPayData.convertdateformat(jQuery('#One_YearTodt').val()),4);
                }
            }
            //else if (dif < 2332800000 && tp==2 ) {
            //    swal("Invalid Date Selection", "Atleast 1 month difference needed..!", "error");

            //    jQuery('#etoDate').val("");
            //    return false;

            //}
            //if (tp == 1) {
            //    var dt = jQuery('#itmfrmdt').val();
            //    var frmdt = _AddPayData.convertdateformat(dt);

            //    _AddPayData.checkdate(frmdt);
            //}
        }
    },
    monthdif: function (frmdt, todt,typ) {
        jQuery('.page-loader-wrapper').show();
        var Str = todt+"@@" + typ;
        var GetPayTypeData = {
            "typeID": "2",
            "flag1": "GETMONTHDIFF",
            "flag2": "",
            "inptvar1": frmdt,
            "inptvar2": Str,
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            GetPayTypeData = JSON.stringify(GetPayTypeData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetPayTypeData = { "encryptedRqstStr": EncryptAPIReq(GetPayTypeData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.fillmonthdif, token)

    },
    fillmonthdif: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            var tokenidd = response.data.queryResult.token;
            token = tokenidd;
           
            var exp_typ = response.data.queryResult.QueryResult[0].param2;
            if (exp_typ == 4) {
                var month = response.data.queryResult.QueryResult[0].param1;

                if (month != 1) {
                    swal("Invalid Date Selection", "Atleast 1 Year difference needed..!", "error");
                    jQuery('#One_YearFromdt').val("");
                    jQuery('#One_YearTodt').val("");
                    return false;
                }

            }
            else {
                var month = parseInt(response.data.queryResult.QueryResult[0].param1);

                if (month > 0) {
                    jQuery("#emonths").val(month);
                    jQuery("#emonthsadd").val(month);
                }
                else {
                    swal("Invalid Date Selection", "Atleast 1 month difference needed..!", "error");
                    jQuery('#etoDate').val("");
                    jQuery('#Toc').val("");
                    return false;
                }
            }
        }
    },
    checkDuplicateBillNoRequest: function (val, tpe) {
        jQuery('.page-loader-wrapper').show();
        var val1 = val + "!!" + tpe  ;
        var GetBillData = {
            "typeID": "2",
            "flag1": "GetBill_Count",
            "flag2": "",
            "inptvar1": val1,
            "inptvar2": userdata.branchId,
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            GetBillData = JSON.stringify(GetBillData);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetBillData = { "encryptedRqstStr": EncryptAPIReq(GetBillData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetBillData, _AddPayData.checkDuplicateBillNo, token)

    },
    checkDuplicateBillNo: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            var tokenidd = response.data.queryResult.token;
            token = tokenidd;

            var count = parseInt(response.data.queryResult.QueryResult[0].param1);
            if (count >=1) {
            
                var msg = response.data.queryResult.QueryResult[0].param2;
                swal({
                    title: "Error",
                    text: msg,
                    type: "error",
                   
                });
                jQuery('#billno').val("");
                return false;
            }
        }
    },

    //BLOCKING GST NUMBERS FOR CRF 1877//


    ASIRVADGSTBLOCK: function () {
        var val = jQuery('#gstin').val().toUpperCase();
        var Gstblockdtl = {
            "flag1": "GSTBLOCK",
            "flag2": "GSTBLOCK2",
            "inptvar1": val,
            "inptvar2": userdata.userId,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        Gstblockdtl = JSON.stringify(Gstblockdtl);
        Gstblockdtl = { "encryptedRqstStr": EncryptAPIReq(Gstblockdtl) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", Gstblockdtl, _AddPayData.Gstblockreturn, userdata.token)

    },

    Gstblockreturn: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.QueryResult.length > 0) {
                var x = response.data.queryResult.QueryResult[0].param1;
                if (x != "0") {

                    swal("GST", "THIS GST IS NOT POSSIBLE..!", "error");

                    jQuery("#gstin").val("");
                }
                else {
                    _AddPayData.GetGST();
                }
            }
        }
    },


    readingDiff: function () {
        var opnread = parseInt(jQuery('#openReading').val());
        var clsread = parseInt(jQuery('#closeReading').val());
        elecunits = clsread - opnread;
        if (!(isNaN(elecunits))) {
            if (elecunits <= 0) {
                swal("Reading Data Error", "Close Reading Must be greater than Open Reading..!", "error");
                jQuery('#closeReading').val("");
                return false;
            } else {
                _AddPayData.consumption();
            }
        }
    },
    enontotcalc: function (n) {

        var totamt = parseFloat(jQuery('#totalamt').val());
        var grossGST = parseFloat(jQuery('#grossGST').val());
        var gstin = jQuery('#gstin').val();
        if (n == 1) {
            if (totamt == 0 || isNaN(totamt)) {
                swal("Error", "Invalid amount, must be greater than Zero..!", "error");
                return false;
            }
            if (gstin == "" || gstin == null) {
                jQuery('#grossGST').val(0);
                jQuery('#grossamt').val(Math.round(totamt).toFixed(2));

            }
            if (grossGST >= 0 && !isNaN(grossGST)) {
                var grossamt = grossGST + totamt;
                jQuery('#grossamt').val(Math.round(grossamt).toFixed(2));
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
                    var grossamt = grossGST + totamt;
                    jQuery('#grossamt').val(Math.round(grossamt).toFixed(2));


                }
            }
        }
        //var sgst = parseFloat(jQuery('#grosssgstper').val());
        //var cgst = parseFloat(jQuery('#grosscgstper').val());
        //var igst = parseFloat(jQuery('#grossigstper').val());
        //var sgstamt = totamt * sgst / 100;
        //var cgstamt = totamt * cgst / 100;
        //var igstamt = totamt * igst / 100;
    },
    //convertToBase64: function (img) {
    //    Strbase64 = "";
    //    DFILETYPE = "";
    //    //var a = "travelFile";
    //    var a = img;
    //    //Read File
    //    var selectedFile = document.getElementById(a).files;
    //    //Check File is not Empty
    //    if (selectedFile.length > 0) {
    //        //Size checking //
    //        var sizeInKB = selectedFile[0].size / 1024;
    //        var sizeLimit = 200;
    //        //if (sizeInKB >= sizeLimit) {
    //        //    swal("", "Max file size allowed is 200KB", "warning");
    //        //    selectedFile = "";
    //        //    return false;
    //        //}
    //        // TEST BLOB TO BASE 64 //

    //        //var reader = new FileReader();
    //        //reader.readAsDataURL(blob);
    //        //reader.onloadend = function () {
    //        //    var base64String = reader.result;
    //        //   // console.log('Base64 String - ', base64String);

    //        //TEST BLOB TO BASE 64 //

    //        // Select the very first file from list
    //        var fileToLoad = selectedFile[0];
    //        // FileReader function for read the file.
    //        var fileReader = new FileReader();
    //        var base64;
    //        // Convert data to base64
    //        fileReader.readAsDataURL(fileToLoad);
    //        // Onload of file read the file content
    //        fileReader.onloadend = function (fileLoadedEvent) {
    //            base64 = fileLoadedEvent.target.result;
    //            if (base64.toString().includes("data:application/pdf;base64")) {
    //                DFILETYPE = "PDF";
    //                swal("", "Please only upload Images..!", "warning");
    //                jQuery('#payfile').val("");
    //                jQuery('#tick').hide();
    //                jQuery('#close').show();
    //                return false;

    //            }
    //            else {
    //                DFILETYPE = "IMG";
    //            }
    //            if ((base64.toString().includes("data:image/jpeg;base64")) || (base64.toString().includes("data:image/img;base64")) || (base64.toString().includes("data:image/jpg;base64")) || (base64.toString().includes("data:image/png;base64"))) {
    //                DFILETYPE = "IMG";
    //            }
    //            else {
    //                swal("", "Please only upload Images..!", "warning");
    //                jQuery('#payfile').val("");
    //                jQuery('#tick').hide();
    //                jQuery('#close').show();

    //                return false;
    //            }

    //            Strbase64 = base64.toString().replace('data:application/pdf;base64,', '').replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');

    //        };
    //        if (Strbase64 != null) {
    //            jQuery('#tick').show();
    //            jQuery('#close').hide();
    //        }
    //    }
    //    else {

    //        swal("", "Add Image..!", "warning");
    //        return false;
    //    }
    //},

    convertToBase64: function (img) {
        Strbase64List = [];   // store multiple base64 strings
        DFILETYPE = "";

        var a = img;
        var selectedFiles = document.getElementById(a).files;

        if (selectedFiles.length > 0) {
            // Loop through all selected files
            for (var i = 0; i < selectedFiles.length; i++) {
                var fileToLoad = selectedFiles[i];

                // Size check (optional)
                var sizeInKB = fileToLoad.size / 1024;
                var sizeLimit = 200;
                if (sizeInKB >= sizeLimit) {
                    swal("", "Max file size allowed is 200KB", "warning");
                    jQuery('#payfile').val("");
                    jQuery('#tick').hide();
                    jQuery('#close').show();
                    return false;
                }

                var fileReader = new FileReader();
                fileReader.onloadend = function (fileLoadedEvent) {
                    var base64 = fileLoadedEvent.target.result;

                    // Validate type
                    if (base64.includes("data:application/pdf;base64")) {
                        DFILETYPE = "PDF";
                        swal("", "Please only upload Images..!", "warning");
                        jQuery('#payfile').val("");
                        jQuery('#tick').hide();
                        jQuery('#close').show();
                        return false;
                    } else if (
                        base64.includes("data:image/jpeg;base64") ||
                        base64.includes("data:image/jpg;base64") ||
                        base64.includes("data:image/png;base64")
                    ) {
                        DFILETYPE = "IMG";
                    } else {
                        swal("", "Please only upload Images..!", "warning");
                        jQuery('#payfile').val("");
                        jQuery('#tick').hide();
                        jQuery('#close').show();
                        return false;
                    }

                    // Clean base64 string and push to list
                    var cleanBase64 = base64
                        .replace('data:image/jpeg;base64,', '')
                        .replace('data:image/jpg;base64,', '')
                        .replace('data:image/png;base64,', '');
                    Strbase64List.push(cleanBase64);

                    // Show tick if at least one valid file
                    if (Strbase64List.length > 0) {
                        jQuery('#tick').show();
                        jQuery('#close').hide();
                    }
                };

                fileReader.readAsDataURL(fileToLoad);
            }
        } else {
            swal("", "Add Image..!", "warning");
            return false;
        }
    },



    //Pr new modification date diff
    DateDiffcheck: function (tp) {
        if (tp == 1) {
            var frmdtval = Date.parse(jQuery('#fromc').val());
            var todtval = Date.parse(jQuery('#Toc').val());
        }
        else {
            var frmdtval = Date.parse(jQuery('#fromc').val());
            var todtval = Date.parse(jQuery('#Toc').val());
        }
        var dif = (todtval - frmdtval) / 86400000;
        //alert(dif);
        if (!(isNaN(dif))) {
            if (dif < 0) {
                swal("Invalid Date Selection", "To Date must be greater than From date..!", "error");
                if (tp == 1) {
                    jQuery('#Toc').val("");
                    return false;
                }
                else {
                    jQuery('#Toc').val("");
                    return false;
                }
            }

        }
    },



}

//_AddPayData.GetOutWardNumber();
//var checkval = 0;
//var checkarr = [];
//var checkdataarr = [];
//var itemdata = "";
var Strbase64;
var limit;
//var elecunits = 0;
//var vnetgst = 0; var vtotamt = 0; var vtotsgst = 0; var vtotcgst = 0; var vtotigst = 0; var vtottax = 0; var vnetamt = 0;


jQuery(document).ready(function ($) {

    _AddPayData.tokenValidate();
    //_AddPayData.checkAccess();



    // _AddPayData.CheckCourierSend();
    //    jQuery('#vendordata').hide()0
    //    jQuery('#itemdata').hide();
    //    jQuery('#electricity').hide();
    //    jQuery('#others').hide();
    //    jQuery('#confirm').hide();
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
    //jQuery('#efromDate').prop('max', d);
    //jQuery('#etoDate').prop('max', d);
    jQuery('#itmfrmdt').prop('max', d);
    jQuery('#itmtodt').prop('max', d);
    jQuery('#dtToDate').prop('max', d);

    jQuery('#ddlPayType').change(function (e) {
        var nlen = jQuery('#typelength');
        jQuery('#checkbox').hide();
        jQuery('#bs_datepicker_container1 input').datepicker({
            autoclose: true,
            format: "yyyy/mm/dd",
            showbuttonPanel: true,
            defaultDate: "+1w",
            changeMonth: true,
            minDate: new Date(),
            container: '#bs_datepicker_container1'
        }).datepicker("setDate", new Date());
        jQuery('#bs_datepicker_container2 input').datepicker({
            autoclose: true,
            format: "yyyy/mm/dd",
            showbuttonPanel: true,
            defaultDate: "+1w",
            changeMonth: true,
            endDate: new Date(),
            container: '#bs_datepicker_container2'
        }).datepicker("setDate", new Date());
        jQuery('#bs_datepicker_container3 input').datepicker({
            autoclose: true,
            format: "yyyy/mm/dd",
            showbuttonPanel: true,
            defaultDate: "+1w",
            changeMonth: true,
            endDate: new Date(),
            container: '#bs_datepicker_container3'
        }).datepicker("setDate", new Date());
        jQuery('#bs_datepicker_container4 input').datepicker({
            autoclose: true,
            format: "yyyy/mm/dd",
            showbuttonPanel: true,
            defaultDate: "+1w",
            changeMonth: true,
            endDate: new Date(),
            container: '#bs_datepicker_container4'
        }).datepicker("setDate", new Date());
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
        if (nlen.hasClass('col-lg-2')) {
            nlen.attr('class', 'col-lg-4');
            jQuery('#checkbox').hide();
        }
        if (val != "0") {
            var arr = val.split("#");
            var typeid = parseInt(arr[0]);

           //new modification of yearly expense date//

            if (typeid == 23 || typeid == 28 || typeid == 128 || typeid == 130 || typeid == 129 || typeid == 133 || typeid == 132) {
                jQuery('#yearly_exp').show();
                jQuery('#Normal_exp').hide();


            }
            else {

                jQuery('#Normal_exp').show();
                jQuery('#yearly_exp').hide();
                //jQuery('#One_YearFromdt').hide();
                //jQuery('#One_YearTodt').hide();

                //jQuery('#fromc').show();
                //jQuery('#Toc').show();
                //jQuery('#fstdt').show();
                //jQuery('#todt').show();

                //jQuery('#Fromdtfst').hide();
                //jQuery('#TodtSec').hide();
            }


            if (typeid == 105 || typeid == 106) {
                //if (nlen.hasClass('col-lg-4')) {
                //nlen.attr('class', 'col-lg-2');
                jQuery('#checkbox').show();
                //}
            }
            var type = parseInt(arr[1]);
            limit = parseInt(arr[2]);
            //_AddPayData.GetItemFillData();
            jQuery('#gstcheck').hide();
            jQuery('#itemdata').hide();
            jQuery('#electricity').hide();
            jQuery('#others').hide();
            jQuery('#confirm').hide();
            jQuery('#vendordata').hide();
            jQuery('#gstin').val("");
            jQuery("#vendorName").val("");
            jQuery("#vendorAddress").val("");
            jQuery('#esgst').val("");
            jQuery('#ecgst').val("");
            jQuery('#eigst').val("");
            jQuery('#esgstamt').val("");
            jQuery('#ecgstamt').val("");
            jQuery('#eigstamt').val("");
            jQuery('#openReading').val("");
            jQuery('#closeReading').val("");
            jQuery('#emonths').val("");
            jQuery('#emonthsadd').val("");
            jQuery('#efromDate').val("");
            jQuery('#etoDate').val("");
            jQuery('#unitconsumed').val("");
            jQuery('#electtotamt').val("");
            jQuery('#etotalgst').val("");
            jQuery('#enetamount').val("");

            jQuery('#grosssgstper').val("");
            jQuery('#grosssgstamt').val("");
            jQuery('#grosscgstper').val("");
            jQuery('#grosscgstamt').val("");
            jQuery('#grossigstper').val("");
            jQuery('#grossigstamt').val("");
            jQuery('#itmtodt').val("");
            jQuery('#itmfrmdt').val("");
            jQuery('#eopen').val("");
            jQuery('#eclose').val("");
            jQuery('#totalamt').val("");
            jQuery('#grossGST').val("");
            jQuery('#grossamt').val("");
            jQuery('#billno').val("");
            jQuery('#dtToDate').val("");
            jQuery('#remarks').val("");

            if (type == 3) {
                jQuery('.page-loader-wrapper').show();
                _AddPayData.getElectData(userdata.branchId);
                jQuery('#itemdata').hide();
                jQuery('#electricity').show();
                jQuery('#readingdetails').show();
                jQuery('#others').hide();
                jQuery('#confirm').hide();
                jQuery('#totalamt').prop("readonly", true)
                jQuery('#grossGST').prop("readonly", true)
                jQuery('#grossamt').prop("readonly", true)
                jQuery('#esgst').val(0);
                jQuery('#ecgst').val(0);
                jQuery('#eigst').val(0);
                jQuery('#esgstamt').val(0);
                jQuery('#ecgstamt').val(0);
                jQuery('#eigstamt').val(0);
                jQuery('#Limit').hide();
                jQuery('#Requested').hide();
                jQuery('#Available').hide();
            } else if (type == 1) {
                jQuery('#itemdata').show();
                jQuery('#electricity').hide();
                jQuery('#readingdetails').hide();
                jQuery('#others').hide();
                jQuery('#confirm').hide();
                jQuery('#totalamt').prop("readonly", true)
                jQuery('#grossGST').prop("readonly", true)
                jQuery('#grossamt').prop("readonly", true)
            }
            else {
                _AddPayData.getNonElectData(userdata.branchId, typeid);
                jQuery('#itemdata').hide();
                jQuery('#electricity').hide();
                jQuery('#readingdetails').hide();

                jQuery('#totalamt').prop("readonly", false)
                jQuery('#grossGST').prop("readonly", false)
                jQuery('#grossamt').prop("readonly", true)

                //new modification from date
                //jQuery('#bs_datepicker_container10 input').datepicker({
                //    autoclose: true,
                //    format: "yyyy/mm/dd",
                //    showbuttonPanel: true,
                //    defaultDate: "+1w",
                //    changeMonth: true,
                //    minDate: new Date(),
                //    endDate: new Date(),
                //    container: '#bs_datepicker_container10'

                //});

              

               

                jQuery('#bs_datepicker_container10 input').datepicker({
                    autoclose: true,
                    format: "yyyy/mm/dd",
                    showButtonPanel: true,
                    defaultDate: "+1w",
                    changeMonth: true,
                    startDate: '-90d',
                    endDate: '0d',
                    container: '#bs_datepicker_container10'
                });


                //new modification  To date
                jQuery('#bs_datepicker_container11 input').datepicker({
                    autoclose: true,
                    format: "yyyy/mm/dd",
                    showbuttonPanel: true,
                    defaultDate: "+1w",
                    startDate: '-90d',
                    endDate: '0d',
                    container: '#bs_datepicker_container11'
                });


                //one year selection for trade licence from date//
                //jQuery('#bs_datepicker_container30 input').datepicker({
                //    autoclose: true,
                //    format: "yyyy/mm/dd",
                //    showButtonPanel: true,
                //    defaultDate: "+1w",
                //    startDate: '-365d',  
                //    endDate: '0d',       
                //    container: '#bs_datepicker_container30'
                //});
                jQuery('#bs_datepicker_container30 input').datepicker({
                    autoclose: true,
                    format: "yyyy/mm/dd",
                    showButtonPanel: true,
                    defaultDate: "+1w",
                    startDate: '-90d',   // Start from 90 days ago
                    endDate: '0d',       // Up to today
                    container: '#bs_datepicker_container30'
                });
                //one year selection for trade licence to date//


                jQuery('#bs_datepicker_container31 input').datepicker({
                    autoclose: true,
                    format: "yyyy/mm/dd",
                    showButtonPanel: true,
                    defaultDate: "+1w",
                    startDate: '0d',         // Start from today
                    endDate: '+365d',        // Up to one year from today
                    container: '#bs_datepicker_container31'
                });


                //jQuery('#bs_datepicker_container31 input').datepicker({
                //    autoclose: true,
                //    format: "yyyy/mm/dd",
                //    showButtonPanel: true,
                //    defaultDate: "+1w",
                //    startDate: '-365d',  
                //    endDate: '0d',       
                //    container: '#bs_datepicker_container31'
                //});


              

            }
        }
        else {
            jQuery('#gstcheck').hide();
            jQuery('#itemdata').hide();
            jQuery('#electricity').hide();
            jQuery('#others').hide();
            jQuery('#confirm').hide();
            jQuery('#Limit').hide();
            jQuery('#Requested').hide();
            jQuery('#Available').hide();

        }
    });
    //    jQuery('#ddlPRItem').change(function (e) {
    //        var val = parseInt(jQuery('#ddlPRItem').val());
    //        jQuery('#hsncode').val("");
    //        jQuery('#taxRate').val("");
    //        jQuery('#taxRateamt').val("");
    //        jQuery('#quantity').val("");0
    //        jQuery('#unitAmount').val("");
    //        jQuery('#total').val("");
    //        jQuery('#sgst').val("");
    //        jQuery('#sgstamt').val("");
    //        jQuery('#cgst').val("");
    //        jQuery('#cgstamt').val("");
    //        jQuery('#igst').val("");
    //        jQuery('#igstamt').val("");
    //        jQuery('#netgst').val("");
    //        jQuery('#netamt').val("");
    //        if (val != 0) {

    //            if (checkval > 0) {
    //                for (i = 0; i < checkval; i++) {
    //                    if (checkarr[i] == val) {
    //                        swal("", "Already Added..!", "info");
    //                        jQuery('#ddlPRItem').val(0);
    //                        return false;
    //                    }
    //                }
    //            }
    //            _AddPayData.GetItemValData();
    //        }

    //    });

    //jQuery('#gstin').change(function (e) {
    //    //var val = parseInt(jQuery('#gstin').val());
    //    //var expense =
    //        _AddPayData.GSTBLOCK();
    //});

    jQuery('#gstin').change(function (e) {
        var val = parseInt(jQuery('#gstin').val());
        var expense =
            _AddPayData.ASIRVADGSTBLOCK();
            //_AddPayData.GetGST();
    });

   
    jQuery('#billno').change(function (e) {
        var val = parseInt(jQuery('#billno').val());
        var tpe = parseInt(jQuery('#ddlPayType').val().split("#")[0]);
        if (val == 0) {
            swal("", "Bill number column does not allow zero only..!", "info");
            return false;
        }
        else {
            _AddPayData.checkDuplicateBillNoRequest(val, tpe);
        }

    });
    //jQuery('#billno').change(function (e) {
    //    var val = parseInt(jQuery('#billno').val());
    //    var tpe = parseInt(jQuery('#ddlPayType').val().split("#")[0]);
    //    _AddPayData.checkDuplicateBillNoRequest(val, tpe);
    //});
    //    jQuery('#quantity').change(function (e) {
    //        _AddPayData.getitemSum();
    //    });
    //    jQuery('#unitAmount').change(function (e) {
    //        _AddPayData.getitemSum();
    //    });
    //    jQuery('#sgst').change(function (e) {
    //        _AddPayData.getSgstSum();
    //    });
    //    jQuery('#cgst').change(function (e) {
    //        _AddPayData.getCgstSum();
    //    });
    //    jQuery('#igst').change(function (e) {
    //        _AddPayData.getIgstSum();
    //    });
    jQuery('#itmfrmdt').change(function (e) {
        _AddPayData.DateDiff(1);
    });
    jQuery('#itmtodt').change(function (e) {
        _AddPayData.DateDiff(1);
    });
    jQuery('#efromDate').change(function (e) {
        _AddPayData.DateDiff(2);
    });

    jQuery('#etoDate').change(function (e) {
        _AddPayData.DateDiff(2);
    });
    jQuery('#fromc').change(function (e) {
        _AddPayData.DateDiff(3);
    });
    jQuery('#Toc').change(function (e) {
        _AddPayData.DateDiff(3);
    });
    jQuery('#One_YearFromdt').change(function (e) {
        _AddPayData.DateDiff(4);
    });
    jQuery('#One_YearTodt').change(function (e) {
        _AddPayData.DateDiff(4);
    });
    jQuery('#openReading').change(function (e) {
        _AddPayData.readingDiff();
    });
    jQuery('#closeReading').change(function (e) {
        _AddPayData.readingDiff();
    });
    //    jQuery('#addItem').click(function (e) {

    //        var itemid = jQuery('#ddlPRItem').val();
    //        if (itemid != 0) {
    //            var qty = parseFloat(jQuery('#quantity').val());
    //            var unitamt = parseFloat(jQuery('#unitAmount').val());
    //            if (!(isNaN(qty)) && !(isNaN(unitamt))) {
    //                jQuery('#maincard').show();
    //                jQuery('#confdiv').show();
    //                _AddPayData.addToGrid();
    //            } else {
    //                swal("", "Enter Quantity and Unit Amount..!", "info");
    //                return false;
    //            }
    //        }
    //        else {
    //            swal("", "Select an item..!", "info");
    //            return false;
    //        }
    //    });
    //    jQuery('#openReading').change(function (e) {
    //        _AddPayData.consumption();
    //    });
    //    jQuery('#closeReading').change(function (e) {
    //        _AddPayData.consumption();
    //    });
    jQuery('#electtotamt').change(function (e) {
        _AddPayData.EnetVals();
    });
    jQuery('#accumilatedMonths').focusout(function (e) {
        var tpe = parseInt(jQuery('#ddlPayType').val().split("#")[0]);
        var acummonth = jQuery('#accumilatedMonths').val();
        if (tpe == 105 || tpe == 106) {

            if (acummonth <= 0) {
                swal("Info", "accumilated months must be graterthan 0..!", "info");
                //jQuery('#acumcheck').prop("checked", false);
                //jQuery('#accumilatedMonths').val(0);
                //jQuery('#accumilatedMonths').prop("disabled", true);
                jQuery('#accumilatedMonths').focus();
                return false;
            }



        }
    });
    //jQuery('#esgst').change(function (e) {
    //    _AddPayData.esgstamt();
    //});
    //jQuery('#ecgst').change(function (e) {
    //    _AddPayData.ecgstamt();
    //});
    //jQuery('#eigst').change(function (e) {
    //    _AddPayData.eigstamt();
    //});
    jQuery('#addElectricity').click(function (e) {
        jQuery('#bs_datepicker_container11').hide();
        jQuery('#bs_datepicker_container10').hide();
        _AddPayData.addElectricity();
    });
    jQuery('#totalamt').change(function (e) {
        _AddPayData.enontotcalc(1);
    });
    jQuery('#grossGST').change(function (e) {
        _AddPayData.enontotcalc(0);
    });
    //    jQuery('#payAmt').change(function (e) {
    //        _AddPayData.checkamt();
    //    });
    jQuery('#submit').click(function (e) {
        _AddPayData.submitdata1();
    });
    jQuery('#billupd').click(function (e) {

        jQuery('#camera').show();
        jQuery('#camsection').show();
        jQuery('#closeCam').show();
        jQuery('#payFile').hide();
        _AddPayData.takeSnapShot();
    });
    jQuery('#ClickmeBtn').click(function (e) {
        _AddPayData.takeInvoice();
        jQuery('#payfile').hide();
    });


    jQuery('#payfile').change(function (e) {
        var file = "payfile";
        jQuery('#billupd').hide();
        _AddPayData.convertToBase64(file);
    });


    jQuery('#ClickmeBtnSave').click(function (e) {
        jQuery('#camera').hide();
        jQuery('#camsection').hide();
        jQuery('#closeCam').hide();
        jQuery('#viewUploadedImages').hide();
        /*jQuery('#payfile').hide();*/
        if (Strbase64List && Strbase64List.length > 0) {
            jQuery('#tick').show();
            jQuery('#close').hide();
        }
        Webcam.reset();
    });

    //jQuery('#acumcheck').click(function (e) {
    //    if (jQuery('#acumcheck').is(":checked")) {
    //        jQuery('#accumilatedMonths').prop("disabled", false);
    //        jQuery('#accumilatedMonths').val("");
    //        jQuery('#accumilatedMonths').focus();
    //    } else {
    //        jQuery('#accumilatedMonths').val(0);
    //        jQuery('#accumilatedMonths').prop("disabled", true);

    //    }

    //});
    //    jQuery('#addConfirm').click(function (e) {
    //        _AddPayData.additem();
    //    });
});

var spanCam = document.getElementsByClassName("close")[0];
spanCam.onclick = function () {
    jQuery('#camera').hide();
    jQuery('#camsection').hide();
    jQuery('#closeCam').hide();
    jQuery('#viewUploadedImages').hide();
    if (Strbase64List && Strbase64List.length > 0) {
        jQuery('#tick').show();
        jQuery('#close').hide();
    }

    Webcam.reset();
}

//jQuery(document).on('click', '.delete', function () {

//    var id = jQuery(this).closest("tr").find('td:eq(0)').text();
//    var tot = jQuery(this).closest("tr").find('td:eq(4)').text();
//    var sgst = jQuery(this).closest("tr").find('td:eq(6)').text();
//    var cgst = jQuery(this).closest("tr").find('td:eq(7)').text();
//    var igst = jQuery(this).closest("tr").find('td:eq(8)').text();
//    var tax = jQuery(this).closest("tr").find('td:eq(5)').text();
//    vtotamt = parseFloat(vtotamt) - parseFloat(tot);
//    vtotsgst = parseFloat(vtotsgst) - parseFloat(sgst);
//    vtotcgst = parseFloat(vtotcgst) - parseFloat(cgst);
//    vtotigst = parseFloat(vtotigst) - parseFloat(igst);
//    vtottax = parseFloat(vtottax) - parseFloat(tax);

//    if (checkarr[checkval - 1] != id) {
//        for (i = 0; i < checkval; i++) {
//            if (checkarr[i] == id) {
//                for (j = i; j < checkval - 1; j++) {
//                    checkarr[j] = checkarr[j + 1];
//                }
//                break;
//            }
//        }
//    } checkarr[checkval - 1] = "";
//    checkval = checkval - 1;
//    checkdataarr[id] = "";
//    jQuery(this).closest('tr').remove();
//    if (jQuery("#tbldespatch tr").length == 1) {
//        jQuery('#maincard').hide();
//        jQuery('#confdiv').hide();
//    }


//    return false;
//});
var tryCount = 0;
var minimalUserResponseInMiliseconds = 700;
function check() {
    console.clear();
    before = new Date().getTime();
    
    after = new Date().getTime();
    if (after - before > minimalUserResponseInMiliseconds) {
        document.write(" Dont open Developer Tools. ");
        self.location.replace(
            window.location.protocol + window.location.href.substring(
                window.location.protocol.length
            )
        );
    } else {
        before = null;
        after = null;
        delete before;
        delete after;
    }
    setTimeout(check, 500);
}
check();
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);
document.addEventListener("keydown", function (e) {
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        disabledEvent(e);
    }
    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        disabledEvent(e);
    }
    // Ctrl+S
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        disabledEvent(e);
    }
    // Ctrl + U
    if (e.ctrlKey && e.keyCode == 85) {
        disabledEvent(e);
    }
    // F12
    if (event.keyCode == 123) {
        disabledEvent(e);
    }
}, false);
function disabledEvent(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else if (window.event) {
        window.event.cancelBubble = true;
    }
    e.preventDefault();
    return false;
}

