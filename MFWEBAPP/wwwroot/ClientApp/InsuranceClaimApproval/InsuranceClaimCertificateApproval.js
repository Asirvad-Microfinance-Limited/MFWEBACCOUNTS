var recordingId="";
var collectionName = ""
var Remarks = "";
var modeedit = "";
var _insuranceClaimCertificateApproval = {
    InsuranceClaimApprovalCertificateLoadCompleted: function (response) {
        
        //console.log(response.data.documentTypesData);


        if (response.status === "SUCCESS") {
            

            if (response.data.documentTypesData.length > 0) {
                jQuery("#ddlDocType").empty();
               // jQuery("#ddlDocType").append(jQuery("<option></option>").val("0").text("-- Choose Document Type--"));
                jQuery.each(response.data.documentTypesData, function (i, val) {
                    jQuery("#ddlDocType").append(jQuery("<option></option>").val(val.typeId).text(val.typeName));
                });
            }
            else {
                jQuery("#ddlDocType").empty();
                jQuery("#ddlDocType").append($("<option></option>").val("0").text("-- Choose Document Type --"));
            }

        }
        else {

            jQuery("#ddlDocType").empty();
            jQuery("#ddlDocType").append($("<option></option>").val("0").text("-- Choose Document Type --"));
        }
        jQuery("#ddlDocType").val(1);
        _insuranceClaimCertificateApproval.InsuranceClaimApprovalCertificateView();
    },

    InsuranceClaimAppLoadCompleted: function (response) {
        
        var typeId = parseInt(jQuery("#ddlDocType").val());
        if (response.status === "SUCCESS") {
            
          //  console.log(response.data.claimDocumentsDisplayTypes);
            jQuery.each(response.data.claimDocumentsDisplayTypes, function (i, val) {
                if (typeId == val.documentType) {
                    
                    recordingId = val.recordingId;
                    collectionName = val.collectionName;
                    _insuranceClaimCertificateApproval.InsuranceClaimApprovalCertDisp();
                }

            });
          
        }
        else {
            alert(response.data.message);
        }
    },

    
   
    InsuranceClaimAppDispLoadCompleted: function (response) {
       
      
        if (response.status === "SUCCESS") {
        
            var $image = jQuery('<img src="data:image/png;base64,' + response.data.imageString + '">');
            jQuery('#viewUpload').html($image);
           // jQuery('#viewUpload').show($image);


        }
        else {
            alert(response.data.message);
        }
    },
    InsuranceClaimAppRejDispLoadCompleted: function (response) {
       
        if (modeedit == 1) {

            if (response.status === "SUCCESS") {
                
                swal({
                    title: response.data.message,
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonClass: "btn-success",
                    confirmButtonText: "OK",
                    closeOnConfirm: false
                },
                    function () {
                        window.location.href = DOMAIN_URL + "insuranceclaimapproval";
                    });

                //swal(response.data.message, "", "success");
                //window.location.href = DOMAIN_URL + "insuranceclaimapproval";
               

                //swal(response.data.message)
                //    .then((value) => {
                //                        window.location.href = DOMAIN_URL + "insuranceclaimapproval";

                //        //swal(`The returned value is: ${value}`);

                //    });
            }
            else {


                swal(response.data.message, "", "error");

            }
        }
        else if (modeedit == 2) {
            if (Remarks != "") {
               
                if (response.status === "SUCCESS") {

                    //swal(response.data.message)
                    //    .then((value) => {
                    //        window.location.href = DOMAIN_URL + "insuranceclaimapproval";

                    //        //swal(`The returned value is: ${value}`);

                    //    });

                    //swal(response.data.message, "", "success");
                    //window.location.href = DOMAIN_URL + "insuranceclaimapproval";
                    swal({
                        title: response.data.message,
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonClass: "btn-success",
                        confirmButtonText: "OK",
                        closeOnConfirm: false
                    },
                        function () {
                            window.location.href = DOMAIN_URL + "insuranceclaimapproval";
                        });

                }
                else {


                    swal(response.data.message, "", "error");
                }

            }
            else {
                swal("","Please Enter Remarks Before Rejecting","warning")
            }
            


        }
        else {

        }
    },

    InsuranceClaimApprovalCertificateFill: function () {

       
        _http.get(MFPUBLICLMSAPI_URL + "api/Insurance/documenttypes",  _insuranceClaimCertificateApproval.InsuranceClaimApprovalCertificateLoadCompleted, userdata.token)

    },
    InsuranceClaimApprovalCertificateView: function () {

       

        var InsuranceClaimApprovalCertificateData = {

          
            "slno": slno,
            "loanNo": loanid
            //"loanNo": "1001SGFW000030"

        };

        _http.post(MFPUBLICLMSAPI_URL + "api/Insurance/claimapprovaldisplaydetails", InsuranceClaimApprovalCertificateData, _insuranceClaimCertificateApproval.InsuranceClaimAppLoadCompleted, userdata.token)

    },
    InsuranceClaimApprovalCertDisp: function () {

      

        var InsuranceClaimApprovalCertDispData = {


            "recordingId": recordingId,
            "collectionName": collectionName
            

        };

        _http.post(MFPUBLICLOSAPI_URL + "api/loans/images", InsuranceClaimApprovalCertDispData, _insuranceClaimCertificateApproval.InsuranceClaimAppDispLoadCompleted, userdata.token)

    },

    insClaimApprove: function (statusval, mode) {
        modeedit = mode;
       
        Remarks = jQuery('#remarks').val();
        var   insClaimData = {

            "slNo": slno,
            "loanNo": loanid,
            "remark": Remarks,
            "statusId": statusval,
            "userId": userdata.userId

        };

        _http.post(MFPUBLICLMSAPI_URL + "api/Insurance/claimapproval", insClaimData, _insuranceClaimCertificateApproval.InsuranceClaimAppRejDispLoadCompleted, userdata.token)
    },
    GetClaimDataForDisplay: function () {
        
        if ((localStorage.getItem("slno") && localStorage.getItem("loanid"))  != null) {
           
            slno = localStorage.getItem("slno");
            loanid = localStorage.getItem("loanid");
           
        }

        //else {
        //    localStorage.removeItem('slno');
        //    localStorage.removeItem('loanid');
        //}
        localStorage.removeItem('slno');
        localStorage.removeItem('loanid');
    }
};
_insuranceClaimCertificateApproval.GetClaimDataForDisplay();
_insuranceClaimCertificateApproval.InsuranceClaimApprovalCertificateFill();


jQuery(document).ready(function ($) {

    jQuery("#ddlDocType").change(function (e) {
       
        _insuranceClaimCertificateApproval.InsuranceClaimApprovalCertificateView();

    });
    

});
