var recid;
var collname;
var filetype;
var authtoken;
var _criffReport = {

   CriffReportDispLoadCompleted: function (response) {
        

        if (response.status === "SUCCESS") {

            jQuery('#divcriffreport').empty();
            
            jQuery('#divcriffreport').html(response.data.imageString);

        }
        else {
            alert(response.data.message);
        }
    },
   CriffReportDisp: function () {

      

       var CriffReportDispData = {


           "recordingId": recid,
           "collectionName": collname,
           "fileType": filetype


        };

       _http.post(MFPUBLICLOSAPI_URL + "api/loans/crifimagestring", CriffReportDispData, _criffReport.CriffReportDispLoadCompleted, authtoken)

    },
};

jQuery(document).ready(function ($) {
  
    //var pageURL = jQuery(location).attr("href");
    recid = getUrlParameter('RecordingId');
    collname = getUrlParameter('CollectionName');
   filetype = getUrlParameter('FileType');
    authtoken = getUrlParameter('authToken');
    _criffReport.CriffReportDisp();
});
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

