var InterestRateMasterReport = {


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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, InterestRateMasterReport.checkAccessRtn, token)
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
                    InterestRateMasterReport.loaddata();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, InterestRateMasterReport.checkAccessToken, userdata.token)
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
                InterestRateMasterReport.loaddata();
            }


        }

    },


    loaddata: function () {
        jQuery('.page-loader-wrapper').show();


        var interest_rate_data = {
            Flag: "106",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        interest_rate_data = JSON.stringify(interest_rate_data);
        interest_rate_data = { "encryptedRqstStr": EncryptAPIReq(interest_rate_data) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", interest_rate_data, InterestRateMasterReport.FillTable, userdata.token);

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
                        var data1 = response.data.queryResult.QueryResult[i].Param1;
                        var data2 = response.data.queryResult.QueryResult[i].Param2.split("~");
                        var data3 = response.data.queryResult.QueryResult[i].Param2.split("~");
                        var data4 = response.data.queryResult.QueryResult[i].Param2.split("~");
                        var data5 = response.data.queryResult.QueryResult[i].Param2.split("~");
                        var data6 = response.data.queryResult.QueryResult[i].Param2.split("~");

                        $row.append(jQuery('<td class="HCol" align="left">').html(data1));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data2[0]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data3[1]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data4[2]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data5[3]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data6[4]));




                        jQuery('#Fidatatabl1').append($row);
                    });
                }
            }

        }
    },
}


jQuery(document).ready(function () {
    //InterestRateMasterReport.loaddata();
    InterestRateMasterReport.tokenValidate();
});