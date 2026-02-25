var _StatusUpdation = {

    noticenoFills: function () {
        jQuery('.page-loader-wrapper').show();
        var noticenoFillLoad = {
            "Flag": 3

        };
        noticenoFillLoad = JSON.stringify(noticenoFillLoad);
        noticenoFillLoad = { "encryptedRqstStr": EncryptAPIReq(noticenoFillLoad) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/TaxUpdation", noticenoFillLoad, _StatusUpdation.noticenoData, userdata.token)

    },

    noticenoData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.noticenoListData.length > 0) {
                jQuery("#ddlnoticeno").empty();
                jQuery("#ddlnoticeno").append(jQuery("<option></option>").val("0").text("Choose notice number"));
                jQuery.each(response.data.noticenoListData, function (i, val) {
                    jQuery("#ddlnoticeno").append(jQuery("<option></option>").val(val.notie_no).text(val.notie_no));
                });
            }

            else {
                jQuery("#ddlnoticeno").empty();
                jQuery("#ddlnoticeno").append(jQuery("<option></option>").val("0").text("  Choose notice number "));
            }

        }
        else if (response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {

            jQuery("#ddlnoticeno ").empty();
            jQuery("#ddlnoticeno ").append(jQuery("<option></option>").val("0").text(" Choose notice number  "));
        }
        jQuery('.page-loader-wrapper').hide();

    },

    //datafill

    noticenodatasFills: function () {
        jQuery('.page-loader-wrapper').show();
        var noticenodataload = {
            "Flag": 4,
            "noticeNo": jQuery('#ddlnoticeno').val()

        };
        noticenodataload = JSON.stringify(noticenodataload);
        noticenodataload = { "encryptedRqstStr": EncryptAPIReq(noticenodataload) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/TaxUpdation", noticenodataload, _StatusUpdation.noticenoDatafetch, userdata.token)

    },
    noticenoDatafetch: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.noticenoListData.length > 0) {
                jQuery('#txtfinancialyear').val(response.data.noticenoListData[0].previous_year);
                jQuery('#txtassesmentyear').val(response.data.noticenoListData[0].assessment_year);
                jQuery('#txtdocsub').val(response.data.noticenoListData[0].doc_recived_by);
                jQuery('#txtnoticedate').val(response.data.noticenoListData[0].notice_date);
                jQuery('#txthearingdate').val(response.data.noticenoListData[0].personal_hearing_date);
                jQuery('#txtreplydate').val(response.data.noticenoListData[0].replay_date);
                jQuery('#recordingID').val(response.data.noticenoListData[0].recordingID);
            }

            else {
                alert("no data found");
            }

        }
        else if (response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {

            jQuery("#ddlnoticeno ").empty();
            jQuery("#ddlnoticeno ").append(jQuery("<option></option>").val("0").text(" Choose notice number  "));
        }
        jQuery('.page-loader-wrapper').hide();

    },

    ShowImage: function () {
        jQuery('.page-loader-wrapper').show();
        jQuery('#ImageDiv').html('');
        var recordingId = jQuery('#recordingID').val();
        var invimagemageData = {
            "recordingId": recordingId,
            "collectionName": 'TAXUPDATIONIMAGE'
        };

        // _http.post(MFPUBLICLOSAPI_URL + "api/loans/images", invimagemageData, _StatusUpdation.DrowImage, userdata.token);
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/images", invimagemageData, _StatusUpdation.DrowImage, userdata.token)
    },
    DrowImage: function (Response) {
        jQuery('.page-loader-wrapper').hide();
        jQuery('#exportpdf').html('');
        if (Response.status === "SUCCESS") {
           // jQuery('#exportpdf').modal('show');
            //var $image = jQuery('<img src="data:image/png;base64,' + Response.data.imageString + '>'); /* " height="500" width="900"*/
            var base64String = Response.data.imageString; /* " height="500" width="900"*/
            var fileName = "example.pdf";
            downloadPdfFromBase64(base64String, fileName);
            //jQuery('#exportpdf').html($image);
        }
        else {
            jQuery('#ImageModel').modal('hide');
            swal("", "No Image ...", "warning");
            jQuery('.page-loader-wrapper').hide();


        }
        jQuery('.page-loader-wrapper').hide();
    },

    approvestatuspage: function () {
        jQuery('.page-loader-wrapper').show();
        var approvestatusload = {
            "Flag": 5,
            "currentstatus": jQuery('#ddlPayType').val(),
            "approverremark": jQuery('#txtcurrentRemark').val(),
            "userid": userdata.userId,
            "noticeNo": jQuery('#ddlnoticeno').val()

        };
        approvestatusload = JSON.stringify(approvestatusload);
        approvestatusload = { "encryptedRqstStr": EncryptAPIReq(approvestatusload) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/TaxUpdation", approvestatusload, _StatusUpdation.statusapprove, userdata.token)

    },
    statusapprove: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            swal("", response.responseMsg, "success");
            jQuery('#ddlnoticeno').val(0);
            jQuery('#ddlPayType').val(0);
            jQuery('#txtcurrentRemark').val('');
            jQuery('#allcolum').hide();

            _StatusUpdation.noticenoFills();




        }
        else {

            swal("", response.responseMsg, "error")

        }


    }


}


jQuery(document).ready(function ($) {
    _StatusUpdation.noticenoFills();


    jQuery('#ddlnoticeno').change(function () {

        _StatusUpdation.noticenodatasFills();

        jQuery('#allcolum').show();
        jQuery('#txtfinancialyear1').show();
        jQuery('#txtassesmentyear1').show();
        jQuery('#txtdocsub1').show();
        jQuery('#txtnoticedate1').show();
        jQuery('#txthearingdate1').show();
        jQuery('#txtreplydate1').show();
        jQuery('#btnView').show();
        jQuery('#ddlStatus').show();
        jQuery('#txtremark1').show();


    });


    jQuery('#submit').click(function () {



        if (jQuery('#ddlnoticeno').val() == 0) {
            swal("Please Select Notice Number", "", "warning");
        }
        else if (jQuery('#ddlPayType').val() == 0) {
            swal("Please Select status", "", "warning");
        }
        else if (jQuery('#txtcurrentRemark').val() == 0) {
            swal("Please Select remark", "", "warning");
        }
        else {
            _StatusUpdation.approvestatuspage();
        }


    });
    jQuery("#btnView").click(function () {
        _StatusUpdation.ShowImage();
    });

    //jQuery('#submit').click(function () {

    //    _StatusUpdation.approvestatuspage();
    //});

    jQuery('#reject').click(function () {

        window.open('dashboard', '_self');

    });
});

function downloadPdfFromBase64(base64String, fileName) {
    const binaryString = atob(base64String);
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
