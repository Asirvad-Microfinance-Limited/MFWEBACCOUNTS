var _DashBoardController = {
    CheckRejectedPR: function () {
        // debugger;
        jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var CheckRejectPR = {
            "flag1": "CHECKREJECTEDPR",
            "flag2": Str,
            "inptvar1": userdata.userId,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        CheckRejectPR = JSON.stringify(CheckRejectPR);
        CheckRejectPR = { "encryptedRqstStr": EncryptAPIReq(CheckRejectPR) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckRejectPR, _DashBoardController.rejcetedReturn, userdata.token)
    },
    rejcetedReturn: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.QueryResult.length > 0) {
                var x = response.data.queryResult.QueryResult[0].param1;
                if (x != "0") {
                    //var lmt = response.data.queryResult.length;
                    //var msg = "";
                    //for (i = 0; i < lmt; i++) {
                    //    msg = "The PR " + response.data.queryResult[i].param2 + " is rejected by " + response.data.queryResult[i].param4 + " due to " + response.data.queryResult[i].param3;
                    //    alert(msg);
                    //}
                    swal("Please Resubmit your rejected PR", "Check status report menu!", "warning");


                }

            }

        }
    },
    //NEW OVERSIGHT PENDING MESSAGE//10-10-2025

    PendingOversight: function () {

        jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var PendingOversight = {
            "flag1": "LOADOVERSIGHT",
            "flag2": "PENDINGOVERSIGHT",
            "inptvar1": userdata.branchId,
            "inptvar2": userdata.userId,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        PendingOversight = JSON.stringify(PendingOversight);
        PendingOversight = { "encryptedRqstStr": EncryptAPIReq(PendingOversight) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratOversightDelegation", PendingOversight, _DashBoardController.PendingReturn, userdata.token)
    },
    PendingReturn: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.QueryResult.length > 0) {
                var x = response.data.queryResult.QueryResult[0].param1;
                if (x != "0") {
                    //var lmt = response.data.queryResult.length;
                    //var msg = "";
                    //for (i = 0; i < lmt; i++) {
                    //    msg = "The PR " + response.data.queryResult[i].param2 + " is rejected by " + response.data.queryResult[i].param4 + " due to " + response.data.queryResult[i].param3;
                    //    alert(msg);
                    //}
                    swal("OVERSIGHT VERIFICATION PENDING", "Please Verify Oversight!", "warning");


                }

            }

        }
    }

}

jQuery(document).ready(function ($) {
    _DashBoardController.CheckRejectedPR();
    _DashBoardController.PendingOversight();

});
var tryCount = 0;
var minimalUserResponseInMiliseconds = 700;
function check() {
    console.clear();
    before = new Date().getTime();
    // debugger;
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

