


var IntAccrualAuto = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, IntAccrualAuto.checkAccessRtn, token)
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
                    IntAccrualAuto.loaddata();
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, IntAccrualAuto.checkAccessToken, userdata.token)
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
                IntAccrualAuto.loaddata();
            }


        }

    },

    loaddata: function () {
        jQuery('.page-loader-wrapper').show();


        var loandata = {
            Flag: "AccrualTable",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        loandata = JSON.stringify(loandata);
        loandata = { "encryptedRqstStr": EncryptAPIReq(loandata) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", loandata, IntAccrualAuto.FillTable, userdata.token);

    },


    //Fillloandata: function (Response) {
    //    if (Response.status === "SUCCESS") {


    //        IntAccrualAuto.FillTable(Response);

    //    }
    //    else {

    //        return false;
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
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[8]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[9]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[10]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[11]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[12]));



                        jQuery('#Fidatatabl').append($row);
                    });
                }
            }

        }
    },


    submitdata1: function () {


        var userid = userdata.userId;
        var tblAmntData = "";
        var rowLength;
        var table = document.getElementById('Fidatatabl');

        for (i = 1; i < rowLength; i++) {


            tblAmntData = tblAmntData + table.rows[i].cells[0].innerText + "µ" + table.rows[i].cells[1].innerText + "µ" + table.rows[i].cells[2].innerText + "µ" + table.rows[i].cells[3].innerText + "µ" + table.rows[i].cells[4].innerText + "µ" + table.rows[i].cells[5].innerText + "µ" + table.rows[i].cells[6].innerText + "µ" + table.rows[i].cells[7].innerText + "µ" + table.rows[i].cells[8].innerText + "µ" + table.rows[i].cells[9].innerText + "¥";
        }

        var submitRequest = {

            Flag: "INTERESTACCRAUTO",
            PagVal: userid.toString(),//p_qid
            parval: tblAmntData,//p_data
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        submitRequest = JSON.stringify(submitRequest);
        submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, IntAccrualAuto.SubmitReturn, userdata.token)
    },


    SubmitReturn: function (response) {
        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
        if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


            jQuery('.page-loader-wrapper').hide();
            if (response.data.errStatus = "1") {
                if (response.data.queryResult.QueryResult[0].Param1 == "1") {
                    swal({
                        title: "Confirmed Successfully...!!! ",
                        text: "",
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
                else {
                    swal({
                        title: "Already Requested...!!! ",
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

        exportTableToExcel:function(filename = ''){
    const downloadLink = document.createElement('a');
    const dataType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;';
    const tableSelect = document.getElementById('tbldespatch');
    const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    filename = filename ? filename + '.xlsx' : 'excel_data.xlsx';

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        const blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
        downloadLink.download = filename;
        downloadLink.click();
    }
        }


}


jQuery(document).ready(function () {
    //IntAccrualAuto.loaddata();
    IntAccrualAuto.tokenValidate();
        
        
         

    jQuery('#btnConf').on("click", function () {
        IntAccrualAuto.submitdata1();
    });


    jQuery('#btn_Excel').on("click", function () {
        IntAccrualAuto.exportTableToExcel();
    });
    
});
jQuery('#btnExit').on("click", function () {
    window.open("Dashboard", "_self");
});
