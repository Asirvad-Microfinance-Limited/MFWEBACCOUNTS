var MemberData = new Array();
var _insuranceForm = {

    BranchFillLoadCompleted: function (response) {
        
      //  console.log(response.data.branchListData);


        if (response.status === "SUCCESS") {
            
            if (response.data.branchListData.length > 0) {
                jQuery("#ddlBranches").empty();
               // jQuery("#ddlBranches").append(jQuery("<option></option>").val("0").text("-- Choose Branch--"));
                jQuery("#ddlBranches").append(jQuery("<option></option>").val("0").text(" --------- Choose Branch --------- "));
                jQuery.each(response.data.branchListData, function (i, val) {
                    jQuery("#ddlBranches").append(jQuery("<option></option>").val(val.branchID).text(val.branchName));
                });
            }
            else {
                jQuery("#ddlBranches").empty();
                jQuery("#ddlBranches").append(jQuery("<option></option>").val("0").text(" --------- Choose Branch --------- "));
            }

        }
        else {

            jQuery("#ddlBranches").empty();
            jQuery("#ddlBranches").append(jQuery("<option></option>").val("0").text(" --------- Choose Branch --------- "));
        }

    },

    CenterFillLoadCompleted: function (response) {
       
       // console.log(response.data.centersListData);

        if (response.status === "SUCCESS") {

          
            if (response.data.centersListData.length > 0) {
                jQuery("#ddlCenters").empty();
                jQuery("#ddlCenters").append(jQuery("<option></option>").val("0").text(" --------- Choose Center --------- "));
                jQuery.each(response.data.centersListData, function (i, val) {
                    jQuery("#ddlCenters").append(jQuery("<option></option>").val(val.applicationId).text(val.centerId).text(val.centerName));
                });
            }
            else {
                jQuery("#ddlCenters").empty();
                jQuery("#ddlCenters").append(jQuery("<option></option>").val("0").text(" --------- Choose Center --------- "));
            }

        }
        else {
        
            jQuery("#ddlCenters").empty();
            jQuery("#ddlCenters").append(jQuery("<option></option>").val("0").text(" --------- Choose Center --------- "));
        }

    },

    BindInsuranceFormTableLoadCompleted: function (response) {
        jQuery('#maincard').show();
      //  console.log(response.data.membersListData);


      
        if (response.status === "SUCCESS") {
            if (response.data.membersListData.length > 0) {
                MemberData = [];
                jQuery('#divinsuranceform').empty();
                var $table = jQuery('<table class="table" id="tblInsuranceForm">');

                $table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:center;">Member ID</th><th style="text-align:left;">Member Name</th><th style="text-align:left;">Nominee Name</th><th style="text-align:right;">Loan Amount</th><th style="text-align:center;">Select</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.membersListData, function (i, val) {
                    MemberData.push(val.memberId);
                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="center">').html(val.memberId));
                    $row.append(jQuery('<td align="left">').html(val.memberName));
                    $row.append(jQuery('<td align="left">').html(val.nomineeName));
                    $row.append(jQuery('<td align="right">').html(val.loanAmount));
                  //  $row.append(jQuery('<td align="center">').html('<input type="button" class="btn btn-danger fc-center" onClick="_insuranceForm.viewData(' + i + ');" id="submitprint" name="submitprint" value="Print"/>'));
                    $row.append(jQuery('<td align="center">').html('<button type="button" class="btnsmall  btn-danger fc-center"  onClick="_insuranceForm.viewData(' + i + ');" id="submitprint" name="submitprint" > <i class="fa fa-print" style="font-size:15px;"></i></button> ')); 

                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divinsuranceform').html($table);
            } else {
                jQuery('#divinsuranceform').hide();
                jQuery('#divinsuranceform').empty();
            }
        } else {
            _General.noData(jQuery('#divinsuranceform'), "No Data Found");

        }
    },

    viewData: async function (i) {
        var memid = "";
        memid = MemberData[i];

  

        var ApplicationId = jQuery('#ddlCenters').val();
        var MemberId = memid
      //  var BranchId = jQuery('#ddlBranches').val();
        //_loanApplication.getArrayData();
        jQuery("#generatedinsuranceform").load(DOMAIN_URL + "InsuranceFormPrintPreview/" + ApplicationId + '/' + MemberId + '/' + userdata.token , function (response) {
           
            _insuranceForm.testpdf(jQuery("#pdfinsuranceform"));


        });
    },




    branchFill: function () {

      
        var userid = userdata.userId;
        var BranchFillData = {


            "userId": userid

        };

        _http.post(MFPUBLICLOSAPI_URL + "api/centers/branchlist", BranchFillData, _insuranceForm.BranchFillLoadCompleted, userdata.token)

    },


    centerFill: function () {

       
        var branchId = jQuery('#ddlBranches').val();
        var CenterFillData = {

            "branchId": branchId

        };

        _http.post(MFPUBLICLOSAPI_URL + "api/centers/centerlist", CenterFillData, _insuranceForm.CenterFillLoadCompleted, userdata.token)

    },
    insuranceFormFill: function () {

        var applicationId = jQuery('#ddlCenters').val();

        var insuranceFormFillData = {

            "applicationId": applicationId


        };

        _http.post(MFPUBLICLOSAPI_URL + "api/centers/memberlist", insuranceFormFillData, _insuranceForm.BindInsuranceFormTableLoadCompleted, userdata.token)

    },





   
    testpdf: function (divname) {
       
        var contents = divname.html();
        var frame1 = jQuery('<iframe />');
        frame1[0].name = "frame1";
        //frame1.css({ "position": "absolute", "top": "-1000000px" });
        jQuery("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title></title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        //frameDoc.document.write('<link href="/lib/bootstrap/dist/assets/css/normalize.css" rel="stylesheet" />');
        //frameDoc.document.write('<link href="/lib/bootstrap/dist/assets/css/paper.css" rel="stylesheet" />');
        //frameDoc.document.write('<link href="' + DOMAIN_URL +'/lib/bootstrap/dist/assets/css/print3.css" rel="stylesheet" />');

        //Append the DIV contents.
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            frame1.remove();
            //$("#btnGenerateAgreement").prop("disabled", false);
        }, 500);
    }





}

_insuranceForm.branchFill();


jQuery(document).ready(function ($) {
    jQuery('.error').addClass("error-msg");
    jQuery('#maincard').hide();
   
    jQuery("#ddlBranches").change(function (e) {

        _insuranceForm.centerFill();

    });

    jQuery("#ddlCenters").change(function (e) {

        _insuranceForm.insuranceFormFill();

    });




});



