var SerialNo="";
var LoanNumber="";
var loanNo;
var claimListDetails = new Array();
var loanIdData = new Array();
var slNoData = new Array();

ClaimDetailsData = new Array();
bankDetailsData = new Array();

var _insuranceClaimApproval = {

    BindInsuranceClaimMembersApprovalTableCompleted: function (response) {
        
        jQuery('#maincard').show();

        if (response.status === "SUCCESS") {
           
            if (response.data.claimList.length > 0) {
                claimListDetails = [];
                loanIdData = [];
                slNoData = [];
                jQuery('#divinsuranceclaimapproval').empty();
                var $table = jQuery('<table class="table" id="tblInsuranceClaimApproval">');

                $table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:left;">Client</th><th style="text-align:center;">Loan Number</th><th style="text-align:left;">Center</th><th style="text-align:left;">Notification Date</th><th style="text-align:left;">Notified By</th><th style="text-align:center;">View Certificate</th><th style="text-align:center;">More Details</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.claimList, function (i, val) {
                   
                    var $row = jQuery('<tr/>');              
                    slNoData.push(val.slno);
                    loanIdData.push(val.loanId);
                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="left">').html(val.client));
                    $row.append(jQuery('<td align="center">').html(val.loanId));
                    $row.append(jQuery('<td align="left">').html(val.center));
                    $row.append(jQuery('<td align="left">').html(val.notificationDate));
                    $row.append(jQuery('<td align="left">').html(val.notifiedBy));
                    $row.append(jQuery('<td align="center">').html('<button type="button" class="btnsmall  btn-danger fc-center"  onClick="_insuranceClaimApproval.CertificateViewData(' + i + ');"> <i class="fa fa-eye" style="font-size:15px;"></i></button> ')); 
                    $row.append(jQuery('<td align="center">').html('<button type="button" class="btnsmall  btn-danger fc-center" data-target="#moreDetailsModal" data-toggle="modal" onClick="_insuranceClaimApproval.InsuranceClaimMoreDetailsViewFill(' + i + ');" class="btn btn-danger fc-center"> <i class="fa fa-ellipsis-h"></i></button> '));

                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divinsuranceclaimapproval').html($table);
            } else {
                jQuery('#divinsuranceclaimapproval').hide();
                jQuery('#divinsuranceclaimapproval').empty();
            }
        } else {

            _General.noData(jQuery('#divinsuranceclaimapproval'), "No Data Found");

        }
    },
  
    InsuranceClaimMoreDetailsViewLoad: function (response) {
       
        if (response.status === "SUCCESS") {
            
            //console.log(response.data.claimApprovalDetails);
            ClaimDetailsData = response.data.claimApprovalDetails;
          
            bankDetailsData = response.data.bankDetails;
         
            jQuery('#totLoanAmt').html(ClaimDetailsData.loanAmount);
            jQuery('#paidLoan').html(ClaimDetailsData.paidAmount);
            jQuery('#totInsAmt').html(ClaimDetailsData.insuranceAmount);
            jQuery('#totDue').html(ClaimDetailsData.dueAmount);
            jQuery('#balAmt').html(ClaimDetailsData.balanceAmount);
            jQuery('#claimFor').html(ClaimDetailsData.claimFor);
            jQuery('#memId').html(ClaimDetailsData.memberId); 
            jQuery('#bankAccStatus').empty();
            if (bankDetailsData.verifyStatus == "VERIFIED") {
                jQuery('#bankAccStatus').append('<button type="button" data-target="#bankDetailsModal" data-toggle="modal" class="btn btn-success fc-center">Verified</button>');

            }
            else {
                jQuery('#bankAccStatus').append('<button type="button" class="btn btn-danger fc-center" readonly>Not Verified</button>');

            }

            jQuery('#bankName').html(bankDetailsData.bankName);
            jQuery('#ifscCode').html(bankDetailsData.ifscCode);
            jQuery('#branchName').html(bankDetailsData.branchName);   
            jQuery('#accNo').html(bankDetailsData.accountNo);   
          
           

        }
        else {
            alert(response.data.message);
        }

        jQuery("#bankDetailsModal .close").click();
    },


    InsuranceClaimMembersApprovalTableFill: function () {

       
     
        var InsuranceClaimMembersApprovalTableData = {

            "typeId": 2, //approvalmemberlisttable hardcodes as 2 for approval claim
        };

        _http.post(MFPUBLICLMSAPI_URL + "api/Insurance/claimlist", InsuranceClaimMembersApprovalTableData, _insuranceClaimApproval.BindInsuranceClaimMembersApprovalTableCompleted, userdata.token)

    },
    InsuranceClaimMoreDetailsViewFill: function (i) {
        
        var slnoval = "";
        var loanidval = "";
     

        slnoval = slNoData[i];
        loanidval = loanIdData[i];
        SerialNo = slnoval;
        LoanNumber = loanidval;

        var InsuranceClaimMoreDetailsViewFillData = {

            "slNo": SerialNo ,
            "loanNo": LoanNumber
        };

        _http.post(MFPUBLICLMSAPI_URL + "api/Insurance/claimdetails", InsuranceClaimMoreDetailsViewFillData, _insuranceClaimApproval.InsuranceClaimMoreDetailsViewLoad, userdata.token)
    },

    
    CertificateViewData:  function (i) {
       
        var serialno = "";
        var loannid = "";
        serialno = slNoData[i];
        loannid = loanIdData[i];
        localStorage.setItem('slno', serialno);
        localStorage.setItem('loanid', loannid);
        window.location.href = DOMAIN_URL + "inusranceclaimcertificateview";
       
    },

  




}
_insuranceClaimApproval.InsuranceClaimMembersApprovalTableFill();
jQuery(document).ready(function ($) {
    jQuery('.error').addClass("error-msg");
    jQuery('#maincard').hide();

});