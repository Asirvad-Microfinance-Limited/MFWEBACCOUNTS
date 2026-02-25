var excelRows;
var _DebitInBankUpload = {
    bankLoad: function () {
        jQuery('.page-loader-wrapper').show();
        var bankFillData = {
            "typeId": 11
        };
        bankFillData = JSON.stringify(bankFillData);
        bankFillData = { "encryptedRqstStr": EncryptAPIReq(bankFillData) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/disbursementEntryUpdation", bankFillData, _DebitInBankUpload.bankFillDataLoadCompleated, userdata.token)
    },
    bankFillDataLoadCompleated: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.aproverDataLoads.length > 0) {
                jQuery("#ddlBank").empty();
                jQuery("#ddlBank").append(jQuery("<option></option>").val("0").text("  Choose Bank  "));
                jQuery.each(response.data.queryResult.aproverDataLoads, function (i, val) {
                    jQuery("#ddlBank").append(jQuery("<option></option>").val(val.bankCode).text(val.bank));
                });
            }
            else {
                jQuery("#ddlBank").empty();
                jQuery("#ddlBank").append(jQuery("<option></option>").val("0").text("  Choose  Bank  "));
            }
        }
        else {

            jQuery("#ddlBank").empty();
            jQuery("#ddlBank").append(jQuery("<option></option>").val("0").text("  Choose  Bank  "));
        }
        jQuery('.page-loader-wrapper').hide();

    },
    ExcelDataUpload: function () {
        jQuery('.page-loader-wrapper').show();
        if (excelRows == undefined) {

            swal("View Data and Verify...!", "", "warning");
            return false;
        }
        if (excelRows.length == 0) {
            swal("View Data and Verify...!", "", "warning");
            return false;
        }
        if (jQuery('#ddlBank').val() == '0') {
            swal("Please Select Bank...!", "", "warning");
            return false;
            jQuery('.page-loader-wrapper').hide();
        }
        var UploadRequest = {
            "DebitInBankUpload": excelRows,
            "typeId": 2,
            "userId": userdata.userId,
            "bankId": jQuery('#ddlBank').val()
        };

        UploadRequest = JSON.stringify(UploadRequest);
        UploadRequest = { "encryptedRqstStr": EncryptAPIReq(UploadRequest) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/disbursementEntryUpdation", UploadRequest, _DebitInBankUpload.ExcelDataUploadLoadCompleated, userdata.token)
    },
    ExcelDataUploadLoadCompleated: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').show();
            jQuery('#fileUpload').val('');
            swal("Uploaded Successfully..!", "", "success");
            jQuery('#dvExcel').empty();
            excelRows = [];
            jQuery('#excelUpload').hide();
            jQuery('#maincard').hide();
            jQuery('#ddlBank').val("0");

        }
        else
            swal("Something went wrong..!", response.responseMsg, "error");
        jQuery('.page-loader-wrapper').hide();
    },
    GetData: function () {

        // Valid Excel Upload
        var filepath = jQuery('#fileUpload').val(); // Replace 'upload' with your input's ID
        const filename = filepath.replace(/^.*?([^\\/]+)$/, '$1');;
        //const filename = fileInput.files[0].name;
        if (filename != "DebitInBankUploadTemplates.xlsx") {
            jQuery('.page-loader-wrapper').hide();
            swal("Upload a valid Excel..!", "", "warning");
            return false;
        }

        if (jQuery('#fileUpload').val() == "") {
            swal("Choose a Excel File....!", "", "warning");
            return false;
        }

        jQuery('.page-loader-wrapper').show();
        var fileUpload = document.getElementById("fileUpload");
        //Validate whether File is valid Excel file.

        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;

        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
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
}
jQuery(document).ready(function ($) {
    jQuery('.page-loader-wrapper').hide();
    _DebitInBankUpload.bankLoad();
    jQuery('#ddlBank').change(function () {
        jQuery('#excelUpload').show();
        jQuery('#maincard').show();
    });

    jQuery('#fileUpload').change(function () {
        jQuery('#dvExcel').empty();
        excelRows = [];;
    });
});
Date.prototype.toShortFormat = function () {

    let monthNames = ["Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"];

    let day = this.getDate();

    let monthIndex = this.getMonth();
    let monthName = monthNames[monthIndex];

    let year = this.getFullYear();

    return `${day}-${monthName}-${year}`;
}

function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    //excelRows.filter(function (el) {
    //   // el.AMOUNT = el.AMOUNT.toFixed(2);
    //});
    //Create a HTML Table element.
    var table = document.createElement("table");
    table.border = "1";
    table.id = "tblExcelData";
    table.className = "table dataTable";

    //Add the header row.
    var row = table.insertRow(-1);

    //Add the header cells.
    headerCell = document.createElement("TH");
    headerCell.innerHTML = "PAYMENT REFERENCE NO";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "UTRN NO";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "AMOUNT";
    row.appendChild(headerCell);
    headerCell.style = "";

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "DATE";
    row.appendChild(headerCell);
    headerCell.style = "";

    var flag = 0;
    //Add the data rows from Excel file.
    for (var i = 0; i < excelRows.length; i++) {
        //Add the data row.
        var row = table.insertRow(-1);
        //if (excelRows[i].SEND_DATE == undefined) {
        //    flag = 1;
        //    break;
        //}

        //Add the data cells.
        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].PAYMENT_REFERENCE_NO != undefined ? excelRows[i].PAYMENT_REFERENCE_NO : 'N/A';

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].UTRN_NO != undefined ? excelRows[i].UTRN_NO : 'N/A';

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].AMOUNT != undefined ? excelRows[i].AMOUNT : 'N/A';

        cell = row.insertCell(-1);
        var date1 = ExcelDateToJSDate(excelRows[i].TRA_DT);
        cell.innerHTML = excelRows[i].TRA_DT != undefined ? moment(date1).format('DD-MMM-YYYY') : 'N/A';
        excelRows[i].TRA_DT = excelRows[i].TRA_DT != undefined ? moment(date1).format('DD-MMM-YYYY') : 'N/A';
    }

    if (flag > 0) {
        jQuery('.page-loader-wrapper').hide();
        excelRows = [];
        swal("Invalid Data..!", "", "warning");
        return false;
    }

    var dvExcel = document.getElementById("dvExcel");
    dvExcel.innerHTML = "";
    dvExcel.appendChild(table);
    jQuery('.page-loader-wrapper').hide();
};

function GetDateFormat(dateString) {
    var current_datetime = dateString;
    var hours = current_datetime.getHours();
    var minutes = current_datetime.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = (hours < 10 ? '0' + hours : hours) + ':' + minutes + ' ' + ampm;
    var cDate = current_datetime.getDate();
    CurDate = (cDate < 10 ? '0' + cDate : cDate) + " " + Zmonths[current_datetime.getMonth()] + " " + current_datetime.getFullYear() + " " + strTime;
    return CurDate;
}

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




