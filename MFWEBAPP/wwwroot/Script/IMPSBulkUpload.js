var excelRows;
var _ImpsWorkUpload = {
    ExcelDataUpload: function () {
        var IMPSUploadRequest = {
            "IMPSUploadData": excelRows
        };
        jQuery('.page-loader-wrapper').show();
        _http.post(MFPUBLICLMSAPI_URL + "api/accountdetails/impsupload", IMPSUploadRequest, _ImpsWorkUpload.ExcelDataUploadLoadCompleated, userdata.token)
    },

    ExcelDataUploadLoadCompleated: function (response) {
        if (response.status === "SUCCESS") {
            swal("Uploaded Successfully..!", "", "success");
        }
        else
            swal("Something went wrong..!", response.status, "error");
        jQuery('.page-loader-wrapper').hide();
    },

    GetData: function () {
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
                swal("This browser does not support HTML5..!", "", "warning");
            }
        } else {
            swal("Upload a valid Excel..!","", "warning");
        }
    },
}


jQuery(document).ready(function () {

   
});

function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
     excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    //Create a HTML Table element.
    var table = document.createElement("table");
    table.border = "1";
    table.id = "tblExcelData";
    table.className = "table";

    //Add the header row.
    var row = table.insertRow(-1);

    //Add the header cells.
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "Customer ID";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Loan NO";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Amount";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Transaction Date";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Beneficiary Name";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "IFSC Code";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Account Number";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Bank Name";
    row.appendChild(headerCell);

    //Add the data rows from Excel file.
    for (var i = 0; i < excelRows.length; i++) {
        //Add the data row.
        var row = table.insertRow(-1);

        //Add the data cells.
        var cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].CustomerID;

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].LoanNO;

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].Amount;

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].TransactionDate;

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].BeneficiaryName;

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].IFSCCode;

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].AccountNumber;

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].BankName;
    }

    var dvExcel = document.getElementById("dvExcel");
    dvExcel.innerHTML = "";
    dvExcel.appendChild(table);
};

