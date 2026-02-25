var reportType;
var ParamsData;
var paramslist;
var GetCbReport = {
    showReport: function () {
       
        if (reportType == 1) {
            paramslist = ParamsData.split('^')
            //show criff reprot

            window.location.href = DOMAIN_URL + "criffreport?RecordingId=" + paramslist[0] + "&CollectionName=" + paramslist[1] + "&FileType=" + paramslist[2] + "&authToken=" + paramslist[3] + "";
        }
        else
        {
            paramslist = ParamsData.split('^')
            window.location.href = DOMAIN_URL + "getequfaxcibildeatails/" + paramslist[0] + "/" + paramslist[1] +"";
        }

    },
   
}

jQuery(document).ready(function ($) {
    
    
    reportType = getUrlParameter('ReportType');
    ParamsData = getUrlParameter('ParamsData');  
    if (reportType != null && ParamsData != null) {
        GetCbReport.showReport();
    }

 
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