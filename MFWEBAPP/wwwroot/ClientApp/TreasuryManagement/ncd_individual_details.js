
var _NcdIndividual = {


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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _NcdIndividual.checkAccessRtn, token)
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
                    _NcdIndividual.loadSelectFundType();
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


    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _NcdIndividual.checkAccessToken, userdata.token)
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
            _NcdIndividual.loadSelectFundType();
        }


    }
    },
    loadSelectFundType: function () {
        jQuery('.page-loader-wrapper').show();
        var DebSelectFundType = {
            Flag: "NCDBondAvailment",
            PagVal: "GetNcdAvailFundTypeDtl"

        };
        DebSelectFundType = JSON.stringify(DebSelectFundType);
        DebSelectFundType = { "encryptedRqstStr": EncryptAPIReq(DebSelectFundType) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectFundType, _NcdIndividual.FillDebSelectFundType, userdata.token);

    },

    FillDebSelectFundType: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFundType").empty();
                jQuery("#ddlFundType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FUND TYPE-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFundType").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFundType").empty();
                jQuery("#ddlFundType").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FUND TYPE-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },




    //select finacial institution
    loadSelectFinancialInstitution: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var DebSelectFinancialInstitution = {
            Flag: "NCDBondAvailment",
            PagVal: "GetNcdAvailFIDtl",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId


        };
        DebSelectFinancialInstitution = JSON.stringify(DebSelectFinancialInstitution);
        DebSelectFinancialInstitution = { "encryptedRqstStr": EncryptAPIReq(DebSelectFinancialInstitution) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectFinancialInstitution, _NcdIndividual.FillDebSelectFinancialInstitution, userdata.token);


    },

    FillDebSelectFinancialInstitution: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlFi").empty();
                jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FINACIAL INSTITUTION-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFi").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlFi").empty();
                jQuery("#ddlFi").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FINACIAL INSTITUTION-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },


    //Select Fund

    loadSelectFund: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var DebSelectFund = {
            Flag: "NCDBondAvailment",
            PagVal: "GetNcdAvailedPublicIssueDtl",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebSelectFund = JSON.stringify(DebSelectFund);
        DebSelectFund = { "encryptedRqstStr": EncryptAPIReq(DebSelectFund) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectFund, _NcdIndividual.FillDebSelectFund, userdata.token);

    },

    FillDebSelectFund: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlLoans").empty();
                jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FUND-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlLoans").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {
                jQuery("#ddlLoans").empty();
                jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SELECT FUND--------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //Select Fund

    loadSelectFund2: function (indata) {
        jQuery('.page-loader-wrapper').show();
        var DebSelectFund = {
            Flag: "NCDBondAvailment",
            PagVal: "GetNcdAvailedDtl",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        DebSelectFund = JSON.stringify(DebSelectFund);
        DebSelectFund = { "encryptedRqstStr": EncryptAPIReq(DebSelectFund) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectFund, _NcdIndividual.FillDebSelectFund, userdata.token);

    },

    FillDebSelectFund: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlLoans").empty();
                jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SELECT FUND-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlLoans").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });
            }
            else {
                jQuery("#ddlLoans").empty();
                jQuery("#ddlLoans").append(jQuery("<option></option>").val("0").text(" --------CHOOSE  SELECT FUND--------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
   


    //Add Debenture Details
    checkvalues: function () {
        if (jQuery('#ddlFundType').val() == '0') {
            swal("Select Fund Type!!!");
            jQuery('#ddlFundType').focus();
            return false;
        }
        if (jQuery('#ddlFi').val() == '0') {
            swal("Select Financial Institution!!!");
            jQuery('#ddlFi').focus();
            return false;
        }
        if (jQuery('#ddlLoans').val() == '0') {
            swal("Select Fund!!!");
            jQuery('#ddlLoans').focus();
            return false;
        }
    

        else
            return true;

    },

    //file upload




    GetData: function () {

        if (jQuery('#fileUpload').val() == "") {
            swal("Choose a Excel File....!", "", "warning");
            jQuery('#fileUpload').val('');
            return false;
        }

        jQuery('.page-loader-wrapper').show();
        var fileUpload = document.getElementById("fileUpload");

        var fileUpload = document.getElementById("fileUpload");

        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;

        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();


                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                jQuery('.page-loader-wrapper').hide();
                swal("This browser does not support HTML5..!", "", "warning");
                return false;
            }
        }

        else {
            jQuery('.page-loader-wrapper').hide();
            swal("Upload a valid Excel..!", "", "warning");
            return false;
        }
    },

    submitevalue: function () {
        if (_NcdIndividual.checkvalues()) {

            debugger;
            var itmdata = ' ';
            var data;
            data = '';
            if (jQuery('#ddlLoans').val() == '-1') {
                swal("Select ...!!!");
                jQuery('#ddlLoans').focus();
                return false;
            }
            var data = jQuery('#ddlLoans').val();

            //if ($('#ddlLoans').val() != '-1') {

            var table = document.getElementById('tblExcelData');
            var rowLength = table.rows.length;
            if (rowLength < 1) {
                swal("Upload Debenture Owner Details...!!!");
                return false;
            }
            for (var i = 1; i < rowLength; i++) {

                itmdata = itmdata + table.rows[i].cells[0].innerHTML + '£' + table.rows[i].cells[1].innerHTML + '£' + table.rows[i].cells[2].innerHTML + '£' + table.rows[i].cells[3].innerHTML + '£' + table.rows[i].cells[4].innerHTML + '£' + table.rows[i].cells[5].innerHTML.split("-")[0] + '£' + table.rows[i].cells[6].innerHTML.split("-")[0] + '£' + table.rows[i].cells[7].innerHTML.split("-")[0] + '£0£0£1æ';

            }
            itmdata = itmdata + '¥' + 2;
            //}

            var submitRequest = {

                Flag: "ADDDEBDTL",
                PagVal: data,//Pqid
                ParVal: itmdata,//Pdata
                 typeID: "4",
               userID: userdata.userId,
               branchID: userdata.branchId
            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };

            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _NcdIndividual.SubmitReturn, userdata.token)


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



}

    jQuery(document).ready(function () {

       // _NcdIndividual.loadSelectFundType();
       _NcdIndividual.tokenValidate();

        jQuery('#ddlFundType').on("change", function () {
            jQuery("#ShowFinInst").show();
            var indata = jQuery("#ddlFundType").val();

            if (indata == '2') {
                jQuery("#ShowSelFund").show();
                jQuery("#ShowFinInst").hide();
                _NcdIndividual.loadSelectFund(indata);
            }
            else {

                _NcdIndividual.loadSelectFinancialInstitution(indata);   
            }

           
        });

        jQuery('#ddlFi').on("change", function () {
            jQuery("#ShowSelFund").show();
            var indata = jQuery("#ddlFundType").val() + 'µ' + jQuery("#ddlFi").val();


            _NcdIndividual.loadSelectFund2(indata);
        });

        
        jQuery('#btnconfirm').on("click", function () {


            _NcdIndividual.submitevalue();
        });
        
        

    });
jQuery('#btnexit').on("click", function () {
    window.open("Dashboard", "_self");
});


function RepaymentDtls() {
    var itmdata = '';
    var table = document.getElementById('tblExcelData');
    var rowLength = table.rows.length;

    if (rowLength < 1) {
        swal("", "Please View Repayment Shedule...!!!", "Error");
        return false;
    }

    for (var i = 1; i < rowLength; i++) {
        //itmdata = itmdata + table.rows[i].cells[1].innerText + '^' + table.rows[i].cells[2].innerText + '^' + table.rows[i].cells[3].innerText + '^' + table.rows[i].cells[4].innerText + '^' + $("[id*=hdUserId]").val() + 'æ';
        //itmdatahtml = itmdatahtml + table.rows[i].cells[1].innerHTML + '^' + table.rows[i].cells[2].innerHTML + '^' + table.rows[i].cells[3].innerHTML + '^' + table.rows[i].cells[4].innerHTML + '^' + $("[id*=hdUserId]").val() + 'æ';

        itmdata = itmdata + table.rows[i].cells[0].innerHTML + '£' + table.rows[i].cells[1].innerHTML + '£' + table.rows[i].cells[2].innerHTML + '£' + table.rows[i].cells[3].innerHTML + '£' + table.rows[i].cells[4].innerHTML + '£' + table.rows[i].cells[5].innerHTML.split("-")[0] + '£' + 'æ';
    }
    itmdata = itmdata + '¥' + 2;

    _NcdIndividual.submitdata1(itmdata);
    //alert(itmdata);
}

function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });


    var firstSheet = workbook.SheetNames[0];


    excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    var table = document.createElement("table");
    table.border = "1";
    table.id = "tblExcelData";
    table.className = "table dataTable";

    //Add the header row.
    var row = table.insertRow(-1);

    //Add the header cells.
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "DEMATID";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "NCDS";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "DESC";
    row.appendChild(headerCell);
    headerCell.style = "";


    headerCell = document.createElement("TH");
    headerCell.innerHTML = "NAME";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "ADDRESS";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "IFSCCODE";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "BANKNAME";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "AMOUNT";
    row.appendChild(headerCell);
    headerCell.style = "";

    var flag = 0; rowNo = 0;
    //Add the data rows from Excel file.
    for (var i = 0; i < excelRows.length; i++) {
        //Add the data row.
        var row = table.insertRow(-1);
        // rowNo = i + 2;

        var cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].DEMATID != '' ? excelRows[i].DEMATID : 'N/A';

        var cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].NCDS != '' ? excelRows[i].NCDS : 'N/A';

        var cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].DESC != '' ? excelRows[i].DESC : 'N/A';

        
        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].NAME != undefined ? excelRows[i].NAME : 'N/A';

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].ADDRESS != undefined ? excelRows[i].ADDRESS : 'N/A';


        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].IFSCCODE != undefined ? excelRows[i].IFSCCODE : 'N/A';

         cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].BANKNAME != undefined ? excelRows[i].BANKNAME : 'N/A';

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].AMOUNT != undefined ? excelRows[i].AMOUNT : 'N/A';


    }

    jQuery("#divclass").show();
    var dvExcel = document.getElementById("dvExcel");
    dvExcel.innerHTML = "";
    dvExcel.appendChild(table);
    jQuery('.page-loader-wrapper').hide();
};

function ExcelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
}