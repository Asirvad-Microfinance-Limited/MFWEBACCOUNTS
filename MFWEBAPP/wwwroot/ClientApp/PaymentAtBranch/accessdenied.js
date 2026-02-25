var token;
var _AddPayData = {


    AccessCopy: function () {
        jQuery('.page-loader-wrapper').show();
        //window.location.href = "Login";
        var AccessCopy = {

            "flag1": "ACESSDENY",
            "flag2": "DENY",
            "inptvar1": userdata.userId,
            "inptvar2": "1001",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        AccessCopy = JSON.stringify(AccessCopy);
       AccessCopy = { "encryptedRqstStr": EncryptAPIReq(AccessCopy) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", AccessCopy, _AddPayData.checkAccessRtn, userdata.token)

    },

    checkAccessRtn: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                   response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
                jQuery('.page-loader-wrapper').hide();
                //if (response.data.queryResult.length > 0) {
                if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                    var x = response.data.queryResult[0].param1;
                    if (x == "1") {

                        swal({
                            title: "Already Logged in",
                            text: "Please Log out from that session...!",
                            type: "info"
                        },
                            function () {
                                window.location.href = DOMAIN_URL;
                                // window.location.href = "login";
                            });
                    }
                    //else {
                    //    _AddPayData.GetPayData1();
                    //}

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
            }
        }

    }
}


jQuery(document).ready(function ($) {
    _AddPayData.AccessCopy();

  


});



