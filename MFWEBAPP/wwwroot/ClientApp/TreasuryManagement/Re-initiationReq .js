
var amount;
var value_date;

var _Debentureprocess = {
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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _Debentureprocess.checkAccessRtn, token)
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
                    _Debentureprocess.GetRentDetails();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _Debentureprocess.checkAccessToken, userdata.token)
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
                _Debentureprocess.GetRentDetails();
            }


        }
    },

    GetRentDetails: function () {
        //debugger
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetRent = {
               
            Flag: "ReprocessDetails",
           // PagVal: "RentReprocessDetails"
           
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        GetRent = JSON.stringify(GetRent);
        GetRent = { "encryptedRqstStr": EncryptAPIReq(GetRent) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", GetRent, _Debentureprocess.FillReprocessRent, userdata.token)
    },

    FillReprocessRent: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlRent").empty();
                jQuery("#ddlRent").append(jQuery("<option></option>").val("0").text(" --------Id ~ Installment ~ Date-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlRent").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlRent").empty();
                jQuery("#ddlRent").append(jQuery("<option></option>").val("0").text(" --------Id ~ Installment ~ Date-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },




    //GetDate: function () {
    //    //debugger
    //    jQuery('.page-loader-wrapper').show();
    //    var Str = " ";
    //    var GetPreprocessDate = {
    //        "p_Flag": "RentReprocessDate"
    //    };

    //    _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", GetPreprocessDate, _Debentureprocess.FillReprocessDate, userdata.token)
    //},

    //FillReprocessDate: function (response) {
    //    if (response.status === "SUCCESS") {
    //        if (response.data.queryResult.length > 0) {
    //            jQuery("#ddlReprocess").empty();

    //            jQuery("#ddlReprocess").append(jQuery("<option></option>").val("0").text(" --------CHOOSE DATE-------- "));
    //            jQuery.each(response.data.queryResult, function (i, val) {
    //                jQuery("#ddlReprocess").append(jQuery("<option></option>").val(val.param1).text(val.param1));


    //            });
    //        }
    //        else {
    //            jQuery("#ddlReprocess").empty();
    //            jQuery("#ddlReprocess").append(jQuery("<option></option>").val("0").text(" --------CHOOSE DATE-------- "));
    //        }
    //    }
    //    else {

    //        jQuery("#ddlReprocess").empty();
    //        jQuery("#ddlReprocess").append(jQuery("<option></option>").val("0").text(" --------CHOOSE DATE-------- "));
    //    }
    //    jQuery('.page-loader-wrapper').hide();
    //},






    LoadApprvTable: function () {
        jQuery('.page-loader-wrapper').show();

        var input = jQuery("#ddlRent").val();
        var loadtableapr = {

            Flag: "IdDetails",
            PagVal: input,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId

        };
        loadtableapr = JSON.stringify(loadtableapr);
        loadtableapr = { "encryptedRqstStr": EncryptAPIReq(loadtableapr) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", loadtableapr, _Debentureprocess.TableLoadCompleted, userdata.token)
    },

    TableLoadCompleted: function (response) {


        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('#divvendordetailstable').empty();
                jQuery('.page-loader-wrapper').hide();
                jQuery('#maincard').show();

                var $table = jQuery('<table class="table" id="tblapproval">');
                $table.append
                    ('<thead><tr> <th style="text-align:center;">Project Code</th><th style="text-align:center;">Debenture ID</th><th style="text-align:center;">Account NO</th><th style="text-align:center;">IFSC Code</th><th style="text-align:center;">Mobile No </th><th style="text-align:center;">Amount </th><th style="text-align:center;">Coustmer Name </th></thead>')
                var $tbody = jQuery('<tbody>');
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                    var M = response.data.queryResult.QueryResult[i].Param1;
                    var datas = M.split('µ');
                    //jQuery("#ddlLoanId").append(jQuery("<option></option>").val(cust_Name[1]).text(cust_Name[1]));
                    // alert(datas[0]);
                    amount = datas[5];
                    value_date = datas[6];

                    var $row = jQuery('<tr/>');
                    //$row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="center">').html(datas[0]));
                    $row.append(jQuery('<td align="center">').html(datas[1]));
                    $row.append(jQuery('<td align="center">').html(datas[2]));
                    $row.append(jQuery('<td align="center">').html(datas[3]));
                    $row.append(jQuery('<td align="center">').html(datas[4]));
                    $row.append(jQuery('<td align="center">').html(datas[5]));
                    //   $row.append(jQuery('<td align="center">').html(datas[6]));


                    $tbody.append($row);

                });


                $tbody.append('</tbody>');
                $table.append($tbody);

                $table.append('</table>');
                jQuery('#divvendordetailstable').html($table);



            }
            else if (response.status === "AUTHERROR") {
                window.location.href = DOMAIN_URL + "?Id=1";
            }
            else {
                jQuery('#divvendordetailstable').empty();
                _General.noData(jQuery('#divvendordetailstable'), "No Data Found");
                jQuery('.page-loader-wrapper').hide();
            }
        }

        jQuery('.page-loader-wrapper').hide();

    },




    confirmreq: function (details, flag) {


        jQuery('.page-loader-wrapper').show();

        var confrim = {
            "p_Flag": "ReprocessRequest",
            "p_ParVal": details,
            "p_PageVal": userdata.userId,
            "p_ParVal1": flag,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId



        };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", confrim, _Debentureprocess.ConfirmDataResponse, userdata.token)

    },

    ConfirmDataResponse: function (response) {
        // debugger;
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {


            swal({
                title: "Success",
                text: "Requested Successfully.........!!!",
                type: "success"
            },



                function () {
                    window.location.reload(true);
                });
        }
        else {
            swal("Error", "Error", "error");
        }

    },

    BankDetailsValidation: function () {


        var accno = jQuery('#txtAccNo').val();
        var ifsccode = jQuery('#txtIFSCCODE').val();

        jQuery('.page-loader-wrapper').show();

        var BankDatas = {

            "empId": userdata.userId,
            "firmId": 3,
            "ifsc": ifsccode,
            "account": accno,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        //_http.post("https://lms.asirvad.com/mfpublickycapi/api/bank", VerifyFillData, _uploadInsuranceClaimDocuments.VerifiedLoadCompleted, userdata.token)

        _http.post(MFPUBLICKYCAPI_URL + "api/bank", BankDatas, _Debentureprocess.ConfirmBankDetails, userdata.token)

    },

    ConfirmBankDetails: function (response) {
        // debugger;
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {

            var accno = jQuery('#txtAccNo').val();
            var mobno = jQuery('#txtMobNo').val();
            var ifsccode = jQuery('#txtIFSCCODE').val();
            var Rid = jQuery('#ddlRent').val();

            var details = Rid + "µ" + accno + "µ" + mobno + "µ" + ifsccode + "µ" + amount + "µ" + value_date;

            _Debentureprocess.confirmreq(details, 1);


        }
        if (response.status == "FAIL") {

            swal({
                title: "warning",
                text: response.data.remark,
                type: "warning"
            });

        }

    },



}

jQuery(document).ready(function () {


    // _Debentureprocess.GetRentDetails();
    _Debentureprocess.tokenValidate();

    //jQuery('#rbtInterest').click( function () {
    //    jQuery("#divPrincInterdbn").show();
    //    _Debentureprocess.tokenValidate();
    //});

    //jQuery('#rbtPrinciple').click( function () {
    //    jQuery("#divPrincInterdbn").show();
    //    _Debentureprocess.tokenValidate();
    //});

    jQuery('#Btnedit').hide();
    jQuery('#AccountDetails').hide();

    // jQuery('#divAccNo').hide();
    //jQuery('#divMobNo').hide();
    //jQuery('#divIFSCCODE').hide();
    jQuery('#divReprocess').hide();


    jQuery('#ddlRent').change(function () {

        jQuery('#Btnedit').hide();
        jQuery('#btnapprv').hide();
        jQuery('#maincard').hide();
        jQuery('#AccountDetails').hide();
        jQuery('#txtIFSCCODE').val('');
        jQuery('#txtMobNo').val('');
        jQuery('#txtAccNo').val('');


    });



    jQuery('#BtnConfirm').click(function () {

        if (jQuery('#ddlRent').val() == 0) {
            swal("Please Select Option", "", "warning");
            return false;
        }
        else {

            _Debentureprocess.LoadApprvTable();
            //  _Rentreprocess.GetDate();
            //jQuery('#Btnedit').show();
            //jQuery('#divReprocess').show();
            jQuery('#btnapprv').show();
        }

    });


    jQuery('#Btnedit').click(function () {

        jQuery('#AccountDetails').toggle();
        //jQuery('#divAccNo').toggle();
        //jQuery('#divMobNo').toggle();
        //jQuery('#divIFSCCODE').toggle();



    });


    jQuery('#BtnApprv').click(function () {

        //if (jQuery('#ddlReprocess').val() == 0) {
        //    swal("Please Select Reprocess Date", "", "warning");
        //    return false;
        //}

        if (jQuery('#txtIFSCCODE').is(':visible')) {

            if (jQuery('#txtIFSCCODE').val() == 0) {
                swal("Please Enter IFSC Code", "", "warning");
                return false;
            }

            if (jQuery('#txtMobNo').val() == 0) {
                swal("Please Enter Mobile Number", "", "warning");
                return false;
            }

            if (jQuery('#txtAccNo').val() == 0) {
                swal("Please Enter Account number", "", "warning");
                return false;
            }
            else {

                _Debentureprocess.BankDetailsValidation();

                //var accno = jQuery('#txtAccNo').val();
                //var mobno = jQuery('#txtMobNo').val();
                //var ifsccode = jQuery('#txtIFSCCODE').val();
                //var Rid = jQuery('#ddlRent').val();

                //var details = Rid + "µ" + accno + "µ" + mobno + "µ" + ifsccode;

                //_Rentreprocess.confirmreq(details, 1);
            }
        }

        else {

            var Rid = jQuery('#ddlRent').val();
            //var ReDate = jQuery('#ddlReprocess').val();

            var details = Rid + "µ" + amount + "µ" + value_date;


            _Debentureprocess.confirmreq(details, 2);
        }
    });



    jQuery('#btn_exit').click(function (e) {
        window.location = "Dashboard";
    });

});

