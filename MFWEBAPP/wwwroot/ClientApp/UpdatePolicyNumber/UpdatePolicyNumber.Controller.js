var policyDtl = [];
var policyDetails = {
    "memberId": "",
    "policyNo": "",
    "loanId": 0
};
var excelJSON;
var _updatePolicyNumber = {
    UpdatePolicyNumberSubmitLoadCompleted: function (response) {
       
        if (response.status === "SUCCESS") {
           
            swal(response.data.message, "", "success");
        }
        else {
            swal(response.data.message, "", "error");
        }

    },

    UpdatePolicyNumberSubmit: function () {
       
        var userId = userdata.userId;
        var fileData = excelJSON;
        var fileDatalen = fileData.length;
        for (i = 0; i < fileDatalen; i++) {
            if (i != 0) {
                var custIds = String(fileData[i][6]);
                var loanIds = String(fileData[i][5]);
                var policyNo = String(fileData[i][22]);
                var loanIdSplit = loanIds.split("'");
                var custIdSplit = custIds.split("'");
                if (custIdSplit.length>1) {
                    var custId = custIdSplit[1];
                }
                else {
                    var custId = custIdSplit[0];
                }

                if (loanIdSplit.length > 1) {
                    var loanId = loanIdSplit[1];
                }
                else {
                    var loanId = loanIdSplit[0];
                }
                policyDetails.memberId = custId;
                policyDetails.policyNo = policyNo;
                policyDetails.loanId = loanId;
                policyDtl.push(policyDetails);
                policyDetails = {};
            }
     }
       
        var UpdatePolicyNumberSubmitData = {
            
            "policyDetails": policyDtl,
            "userId": userId
        };

        _http.post(MFPUBLICLMSAPI_URL + "api/Insurance/policyupdate", UpdatePolicyNumberSubmitData, _updatePolicyNumber.UpdatePolicyNumberSubmitLoadCompleted, userdata.token)
    }
};
jQuery(document).ready(function ($) {

    jQuery('#maincard').hide();
    jQuery('.error').addClass("error-msg");




});
jQuery("#fileUpload").on("change", function (e) {
    
    var file = e.target.files[0];
    // input canceled, return
    
    if (!(/\.(xls|xlsx|csv)$/i).test(file.name)) {
        //common.notifyError('You must select an image file only');
        //wal('please upload a csv or xlsx file ', '', 'warning')

        //jQuery('#fileUpload').addClass('error');
        jQuery('#fileUpload-errors').text('Please select xlsx or csv');
        jQuery('#fileUpload-errors').addClass('error-msg');
        jQuery('#fileUpload-errors').css('display','block')
        jQuery('#upload').prop('disabled','block')
        file = "";

        goUpload = false;
    }
    else {
       // jQuery('#fileUpload').removeClass('error');
        jQuery('#fileUpload-errors').text('');
        jQuery('#fileUpload-errors').removeClass('error-msg');
        jQuery('#fileUpload-errors').css('display', 'none')
    }
  
    if (!file) return;
    var FR = new FileReader
    FR.onload = function (e) {
        
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var firstSheet = workbook.Sheets[workbook.SheetNames[0]];

        // header: 1 instructs xlsx to create an 'array of arrays'
        var result = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        // data preview
        //var output = document.getElementById('result');
        //output.innerHTML = JSON.stringify(result, null, 1);
        excelJSON = result;
    };
    FR.readAsArrayBuffer(file);
});
