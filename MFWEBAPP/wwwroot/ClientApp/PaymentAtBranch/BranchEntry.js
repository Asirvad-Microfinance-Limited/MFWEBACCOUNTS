
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
                jQuery("#ddlDebitAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE ACCOUNT NAME-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlDebitAcc").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }
            else {
                jQuery("#ddlDebitAcc").empty();
                jQuery("#ddlDebitAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE ACCOUNT NAME-------- "));
            }
        }
        else {

            jQuery("#ddlDebitAcc").empty();
            jQuery("#ddlDebitAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE ACCOUNT NAME-------- "));
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


    submitdata: function () {
        if (creditSum == debitSum) {
            jQuery('.page-loader-wrapper').show();
            var AccountingData = "", UserData = "";
            var userID = userdata.userId;
            var paytype = jQuery('#ddlPayType').val().split("#")[0];
            var brID = jQuery('#ddlPayBranch').val();
            if (paytype == 0) {
                swal("", "Please select Payment Type..!", "error");
                return false;
            }
            else if (brID == 0) {
                swal("", "Please select Payment Type..!", "error");
                return false;
            }
            else {
                for (i = 0; i < slno; i++)
                    AccountingData = AccountingData + '!!' + dataarray[i];

                AccountingData = slno + AccountingData;
                UserData = userID + "@@" + paytype + "@@" + brID;
                var BranchEntryData = {
                    "flag1": "BRANCHENTRY",
                    "flag2": "INSERTOTRANS",
                    "inptvar1": AccountingData,
                    "inptvar2": UserData,
                    "typeID": "4",
                    "userID": userdata.userId,
                    "branchID": userdata.branchId
                };

                _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", BranchEntryData, _AddPayData.SubmitReturn, userdata.token)
            }
        }
        else {
            swal("", "Credit and Debit are not equal..!", "error");
            return false;
        }
    },
    insertToGrid: function () {
        var Stringval = _AddPayData.checkVals();
        var $row = "";
        var subacc = "";
        if (Stringval != "") {
            var rdata = Stringval.split("~");
            dataarray[slno] = rdata[0] + '~' + rdata[2] + '~' + rdata[9].toUpperCase() + '~' + rdata[4] + '~' + rdata[5];
            slno = slno + 1;
            if (rdata[2] == 0) {
                subacc = '---';
            } else {
                subacc = rdata[3];
            }
            jQuery('#maincard').show();
            creditSum = creditSum + parseFloat(rdata[5]);
            debitSum = debitSum + parseFloat(rdata[4]);
            $row = jQuery('<tr/>');
            $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(slno));
            $row.append(jQuery('<td class="HCol" style="text-align:left;display:none;">').html(rdata[0]));
            $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(rdata[1]));

            $row.append(jQuery('<td class="HCol" style="text-align:left;display:none;>').html(rdata[2]));
            $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(subacc));
            $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(rdata[9].toUpperCase()));
            $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(rdata[4]));

            $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(rdata[5]));
            $row.append(jQuery('<td class="HCol" align="left"><a href="javascript:void();" id="delete" title="Delete" class="bs-tooltip remove delete">DELETE</a>').html());
            jQuery('#paymenttabl').append($row);

            if (rdata[6] != "0") {
                $row = "";
                creditSum = creditSum + parseFloat(rdata[8]);
                dataarray[slno] = 41109 + '~' + rdata[6] + '~' + rdata[9].toUpperCase() + '~' + 0 + '~' + rdata[8];
                slno = slno + 1;
                $row = jQuery('<tr/>');
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(slno));
                $row.append(jQuery('<td class="HCol" style="text-align:left;display:none;">').html("41109"));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html("T D S  PAYABLE"));

                $row.append(jQuery('<td class="HCol" style="text-align:left;display:none;>').html(rdata[6]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(rdata[7]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(rdata[9].toUpperCase()));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html("0"));

                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(rdata[8]));
                $row.append(jQuery('<td class="HCol" align="left"><a href="javascript:void();" id="delete" title="Delete" class="bs-tooltip remove delete">DELETE</a>').html());

            }
            jQuery('#paymenttabl').append($row);
            jQuery('#ddlDebitAcc').val(0);
            jQuery('#ddlDebitSubAcc').val(0);
            jQuery('#ddltdsCat').val(0);
            jQuery('#debitSubAcc').hide();
            jQuery('#debitAcc').attr('class', 'col-lg-4');
            jQuery('#debitAmt').val("");
            jQuery('#creditAmt').val("");
            jQuery('#tdscheck').prop("checked", false);
            jQuery('#tdsper').prop("disabled", true);
            jQuery('#ddltdsCat').prop("disabled", true);
            jQuery('#tdspercentage').hide();
            jQuery('#tdsCategory').attr('class', 'col-lg-4');
            jQuery('#remarks').val("");
        }
    },
    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            var msg = jQuery.trim(response.data.queryResult[0].param1);

            swal({
                title: msg,
                text: "",
                type: "success"
            }, function () {
                window.location.reload(true);
            });

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

        var Account = jQuery('#ddlDebitAcc').val();
        var AccountName = jQuery('#ddlDebitAcc option:selected').html();
        var SubAccount = jQuery('#ddlDebitSubAcc').val();
        var SubAccountName = jQuery('#ddlDebitSubAcc option:selected').html();
        var Debit = jQuery('#debitAmt').val();
        var Credit = jQuery('#creditAmt').val();
        var tdsamt = parseFloat(jQuery('#tdsamt').val());
        var tds = jQuery('#ddltdsCat').val();
        var tdsdescription = jQuery('#ddltdsCat option:selected').html();
        var remarks = jQuery('#remarks').val();

        if (Account == 0) {
            swal("", "Please select an account..!", "error");
            return "";
        }
        else if (Account != 0 && dbsub && SubAccount == 0) {
            swal("", "Please select a sub account..!", "error");
            return "";
        }
        else if (Debit == 0 && Credit == 0) {
            swal("", "Please enter Debit/Credit..!", "error");
            return "";
        }
        else if (jQuery('#tdscheck').is(":checked") && tds == 0) {
            swal("", "Please select TDS category..!", "error");
            return "";
        }
        else if (jQuery('#tdscheck').is(":checked") && isNaN(tdsamt) || jQuery('#tdscheck').is(":checked") && tdsamt < 1) {
            swal("", "Please enter TDS amount..!", "error");
            return "";
        }
        else if (remarks == "") {
            swal("", "Description cannot be Null..!", "error");
            return "";
        }
        else {
            jQuery('#confirm').show();
            var rtndata = Account + "~" + AccountName + "~" + SubAccount + "~" + SubAccountName + "~" + Debit + "~" + Credit + "~" + tds + "~" + tdsdescription + "~" + tdsamt + "~" + remarks;
            return rtndata;
        }
    },
}


var limit;
var dbsub = false;
var crsub = false;
var creditSum = 0;
var debitSum = 0;
var slno = 0;
var dataarray = [];


_AddPayData.checkAccess();
jQuery(document).ready(function ($) {

    jQuery('.page-loader-wrapper').show();
    jQuery('#ddlPayType').change(function (e) {

        var val = jQuery('#ddlPayType').val();

        if (val != "0") {
            var arr = val.split("#");
            var typeid = parseInt(arr[0]);
            if (typeid == 25) {
                var prtype = jQuery('#typelength');
                if (prtype.hasClass('col-lg-4')) {
                    jQuery('#BranchPayment').show();
                    _AddPayData.GetBranchData();
                }
                else {
                    jQuery('#BranchPayment').hide();
                }
            }
            var type = parseInt(arr[1]);
            jQuery('#tdspercentage').hide();
            jQuery('#tdsamount').hide();

            jQuery('#others').show();

            jQuery('#tdsper').val("");
            jQuery('#remarks').val("");

            jQuery('#ddltdsCat').prop("disabled", true);

            if (type == 4) {
                _AddPayData.GetDebitAcc(typeid);
            }
        }
        else {
            jQuery('#others').hide();
            jQuery('#confirm').hide();
            jQuery('#BranchPayment').hide();
        }
    });
    jQuery('#ddltdsCat').change(function (e) {
        var val = parseInt(jQuery('#ddltdsCat').val());
        var tds = jQuery('#tdsCategory');
        if (val != 0) {
            tds.attr('class', 'col-lg-2');
            jQuery('#tdspercentage').show();
        }
        else {
            jQuery('#tdspercentage').hide();
            tds.attr('class', 'col-lg-4');
        }
    });

    jQuery('#creditAmt').change(function (e) {
        var val = parseFloat(jQuery('#creditAmt').val());
        if (val > 0) {
            jQuery('#debitAmt').val(0);
            jQuery('#tdscheck').prop("checked", false);
            jQuery('#ddltdsCat').val(0);
            jQuery('#tdsper').val("");
            jQuery('#tdsper').prop("disabled", true);
            jQuery('#ddltdsCat').prop("disabled", true);

            jQuery('#tdspercentage').hide();
            jQuery('#tdsCategory').attr('class', 'col-lg-4');

        }
    });

    jQuery('#debitAmt').change(function (e) {
        var val = parseFloat(jQuery('#debitAmt').val());
        if (val > 0) {
            jQuery('#creditAmt').val(0);
        }
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
    jQuery('#tdsper').keyup(function (e) {
        var per = parseFloat(jQuery('#tdsper').val());
        if (per > 50) {
            jQuery('#tdsper').val("");
        }
    });
    jQuery('#submit').click(function (e) {
        _AddPayData.submitdata();
    });
    jQuery('#add').click(function (e) {
        _AddPayData.insertToGrid();
    });
    jQuery('#tdscheck').click(function (e) {
        var credit = parseFloat(jQuery('#creditAmt').val());
        var debit = parseFloat(jQuery('#debitAmt').val());
        if (credit > 0) {
            jQuery('#tdscheck').prop("checked", false);
        }
        else if (debit > 0) {
            jQuery('#tdsper').val("");
            jQuery('#tdsamt').val("");
            if (jQuery('#tdscheck').is(":checked")) {
                jQuery('#tdsper').prop("disabled", false);
                jQuery('#ddltdsCat').prop("disabled", false);

                jQuery('#tdsper').focus();
            } else {
                jQuery('#tdsper').val(0);
                jQuery('#tdsper').prop("disabled", true);
                jQuery('#ddltdsCat').val(0);
                jQuery('#ddltdsCat').prop("disabled", true);
            }
        }

    });


});

jQuery(document).on('click', '.delete', function () {
    var id = jQuery(this).closest("tr").find('td:eq(0)').text();

    for (i = 0; i < slno - 1; i++) {

        if (i == id - 1) {
            for (j = i; j < slno - 1; j++) {
                dataarray[j] = dataarray[j + 1];
            }
            break;
        }
    }
    dataarray[slno - 1] = "";
    dataarray.length = dataarray.length - 1;
    slno = slno - 1;


    jQuery(this).closest('tr').remove();
    if (jQuery("#paymenttabl tr").length < 1) {
        jQuery('#maincard').hide();
        jQuery('#confirm').hide();
    }
});