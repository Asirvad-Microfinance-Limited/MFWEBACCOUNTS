var Data = [];
var _TaxNoticeUpdation = {

    stateFills: function () {
        jQuery('.page-loader-wrapper').show();
        var stateFill = {
            "Flag": 1
        };
        stateFill = JSON.stringify(stateFill);
        stateFill = { "encryptedRqstStr": EncryptAPIReq(stateFill) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/TaxUpdation", stateFill, _TaxNoticeUpdation.stateListData, userdata.token)

    },

    stateListData: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.stateListData.length > 0) {
                jQuery("#ddlState").empty();
                jQuery("#ddlState").append(jQuery("<option></option>").val("0").text("Choose state"));
                jQuery.each(response.data.stateListData, function (i, val) {
                    jQuery("#ddlState").append(jQuery("<option></option>").val(val.stateName).text(val.stateName));
                });
            }

            else {
                jQuery("#ddlState").empty();
                jQuery("#ddlState").append(jQuery("<option></option>").val("0").text("  Choose state  "));
            }

        }
        else if (response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {

            jQuery("#selectbranch").empty();
            jQuery("#selectbranch").append(jQuery("<option></option>").val("0").text("  Choose state  "));
        }
        jQuery('.page-loader-wrapper').hide();

    },

    dataLaod: function () {


        if (jQuery('#traDate').val() == "") {
            swal("Please Select From Date", "", "warning");
        }

        else if (jQuery('#etoDate').val() == '') {

            swal("Please Select To Date", "", "warning");
        }
        else if (jQuery('#txtpreyr').val() == '') {

            swal("Please Select Previous Date", "", "warning");
        }

        else if (jQuery('#txtassesmtyr').val() == 0) {

            swal("Please Select Assessment Date", "", "warning");
        }
        else if (jQuery('#noticedate').val() == 0) {

            swal("Please Select Notice Date", "", "warning");
        }

        else if (jQuery('#txtnoticeno').val() == 0) {

            swal("Please Select Notice Number", "", "warning");
        }

        else if (jQuery('#ddldocrecivd').val() == 0) {

            swal("Please Select document received ", "", "warning");
        }
        else if (jQuery('#ddldocsbmted').val() == 0) {

            swal("Please Select document submitted", "", "warning");
        }
        else if (!jQuery('#radGYes').prop('checked') && !jQuery('#radGNo').prop('checked'))
            swal("Please Select Any option", "", "warning");
        


        else if (jQuery('#hearingDate').val() == 0 && jQuery('#radGYes').prop('checked')) {

            swal("Please Select Hearing date", "", "warning");
        }
        else if (jQuery('#ReplayDate').val() == 0) {

            swal("Please Select replay date", "", "warning");
        }
        else if (!jQuery('#raddir').prop('checked') && !jQuery('#radind').prop('checked') && !jQuery('#radoth').prop('checked'))
            swal("Please Select Any option", "", "warning");

        else if (jQuery('#ddlType').val() == 0 && jQuery('#radind').prop('checked')) {

            swal("Please Select Type", "", "warning");
        }
        else if (jQuery('#ddlState').val() == 0 && jQuery('#radind').prop('checked')) {

            swal("Please Select State", "", "warning");
        }
        else if (jQuery('#dmremarks').val() == 0) {

            swal("Please Select Remark", "", "warning");
        }
        else if (jQuery('#dmreason').val() == 0) {

            swal("Please Select Reason", "", "warning");
        }
        else if (jQuery('#dmSubject').val() == 0) {

            swal("Please Select Subject", "", "warning");
        }
        else if (jQuery('#InvIMG').val() === '') {

            swal("Add File..!", "", "warning");
        }
        else {

            var fromdate = jQuery('#traDate').val();
            var todate = jQuery('#etoDate').val();
            var previousyear = jQuery('#txtpreyr').val();
            var assessmentyear = jQuery('#txtassesmtyr').val();
            var noticedate = jQuery('#noticedate').val();
            var noticeno = jQuery('#txtnoticeno').val();
            var amountinvolved = jQuery('#txtamontinvolved').val();
            var docrecived = jQuery('#ddldocrecivd option:selected').val();
            var docsubmited = jQuery('#ddldocsbmted option:selected').val();
            var personalhearing = jQuery('input[name="personalHearing"]:checked').val();
            var personalhearingdate = jQuery('#hearingDate').val();
            var replaydate = jQuery('#ReplayDate').val();
            var type = jQuery('#ddlType').val();
            var state = jQuery('#ddlState').val();
            var remark = jQuery('#dmremarks').val();
            var specireason = jQuery('#dmreason').val();
            var subject = jQuery('#dmSubject').val();
            var tax = jQuery('input[name="Tax"]:checked').val();
            var userId = userdata.userId;
            var LoadData = {
                "fromdate": fromdate, "todate": todate, "previousyear": previousyear, "assessmentyear": assessmentyear, "noticedate": noticedate, "noticeno": noticeno, "amountinvolved": amountinvolved, "docrec": docrecived, "docsub": docsubmited, "personalhearing": personalhearing, "personalhearingdate": personalhearingdate, "replydate": replaydate, "type": type, "state": state, "remark": remark, "specifyreason": specireason, "subject": subject, "tax": tax, "useid": userId
            }
            Data.push(LoadData);
            _TaxNoticeUpdation.SavetaxupdationDetails(Data);
        }
    },

    SavetaxupdationDetails: function (Data) {
        
        jQuery('.page-loader-wrapper').show();

       



        var a = "InvIMG";
        var selectedFile = document.getElementById(a).files;
        var Strbase64 = "";
        if (selectedFile.length > 0) {
            //Size checking //
            var sizeInKB = selectedFile[0].size / 1024;
            var sizeLimit = 700;
            if (sizeInKB >= sizeLimit) {
                swal("", "Max file size allowed is 700KB", "warning");
                selectedFile = "";
                return false;
            }
            // Select the very first file from list
            var fileToLoad = selectedFile[0];
            // FileReader function for read the file.
            var fileReader = new FileReader();
            var base64;
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
            // Onload of file read the file content
            fileReader.onload = function (fileLoadedEvent) {
                base64 = fileLoadedEvent.target.result;
                if (base64.toString().includes("data:application/pdf;base64")) {
                    IFILETYPE = "PDF";

                    jQuery('#tick').hide();
                    jQuery('#close').show();
                }
                else {
                    IFILETYPE = "IMG"

                    jQuery('#tick').hide();
                    jQuery('#close').show();
                }
                Strbase64 = base64.toString().replace('data:application/pdf;base64,', '').replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');
                

               
                
                var saveEditFillData = {
                    "Flag": 2,
                    "taxupdtionlist": Data,
                    "fileType": IFILETYPE,
                    "imgStr": Strbase64
                };

                saveEditFillData = JSON.stringify(saveEditFillData);
                saveEditFillData = { "encryptedRqstStr": EncryptAPIReq(saveEditFillData) };
                _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/TaxUpdation", saveEditFillData, _TaxNoticeUpdation.savedetails, userdata.token)
            }
        }
    },



    savedetails: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            var imgmsg = jQuery.trim(response.data.message);
            var msg = jQuery.trim(response.status);
            if (response.data.errStatus = "1") {
                swal({
                    title: msg,
                    text: "",
                    type: "success"
                }, function () {
                    window.location.reload(true);
                });
            }

          


            else {

                swal("", response.responseMsg, "error")

                //jQuery('#UploadIMGEdit').val("");
                //jQuery('#txtAccountHoldernameedit').val("");
                //jQuery('#txtIFSCCodeacc').val("");
                //jQuery('#txtBankNameacc').val("");
                //jQuery('#txtBranchNameacc').val("");
                //jQuery('#txtAccountNumberedit').val("");
                //jQuery('#txtConfirmAccountNumberacc').val("");
            }
        }

    },



    datecheck: function () {

        var frm = new Date(jQuery('#traDate').val());
        var todt = new Date(jQuery('#etoDate').val());

        if (todt < frm) {
            swal(" Todate must be greater than Fromdate", "", "warning");
                             jQuery('#etoDate').val('');


        }
    }

}
jQuery(document).ready(function ($) {


    _TaxNoticeUpdation.stateFills();

    jQuery('#txt_type').hide();
    jQuery('#txt_state').hide();
    jQuery('#bs_datepicker_container4').hide();

    jQuery('#traDate').datepicker({
        autoclose: true,
        format: "dd/M/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        // startDate: '+0d',
        minDate: new Date(),
        endDate: new Date(),
        container: '#bs_datepicker_container1',
    });

    jQuery('#etoDate').datepicker({
        autoclose: true,
        format: "dd/M/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        // startDate: '+0d',
        minDate: new Date(),
        endDate: new Date(),
        container: '#bs_datepicker_container2',
    });
    jQuery('#noticedate').datepicker({
        autoclose: true,
        format: "dd/M/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        // startDate: '+0d',
        minDate: new Date(),
        endDate: new Date(),
        container: '#bs_datepicker_container3',
    });

    jQuery('#hearingDate').datepicker({
        autoclose: true,
        format: "dd/M/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        // startDate: '+0d',
        minDate: new Date(),
        endDate: new Date(),
        container: '#bs_datepicker_container4',
    });
    jQuery('#ReplayDate').datepicker({
        autoclose: true,
        format: "dd/M/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        // startDate: '+0d',
        minDate: new Date(),
        endDate: new Date(),
        container: '#bs_datepicker_container5',
    });

    jQuery('#txtpreyr').datepicker({
        autoclose: true,
        format: "yyyy",
        //showbuttonPanel: true,
        //defaultDate: "+1w",
        //changeMonth: true,
        //// startDate: '+0d',
        //minDate: new Date(),
        endDate: new Date(),
        viewMode: "years",
        minViewMode: "years",
        autoclose: true,
        container: '#bs_datepicker_container11',
    });
    jQuery('#txtassesmtyr').datepicker({
        autoclose: true,
        format: "yyyy",
        //showbuttonPanel: true,
        //defaultDate: "+1w",
        //changeMonth: true,
        //// startDate: '+0d',
        //minDate: new Date(),
        //endDate: new Date(),
        viewMode: "years",
        minViewMode: "years",
        autoclose: true,
        container: '#bs_datepicker_container22',
    });

    jQuery('#btn_submit').click(function () {
        //var a = "pdf";
        //var fileName = document.getElementById(a).files;
        //var fltype = fileName[0].type;
        //if (fltype == "image/png") {
        //    swal("Only pdf  Files are allowed", "", "warning");
        //    return false;
        //}
        _TaxNoticeUpdation.dataLaod();



    });


    jQuery('#radind').click(function () {
        if (jQuery('#radind').prop('checked')) {
            // alert("clicked");
            jQuery('#txt_type').show();
            jQuery('#txt_state').show(); 
        }
    });

    jQuery('#raddir').click(function () {
        if (jQuery('#raddir').prop('checked')) {
            // alert("clicked");
            jQuery('#txt_type').hide();
            jQuery('#txt_state').hide();
        }
    });

    jQuery('#radoth').click(function () {
        if (jQuery('#radoth').prop('checked')) {
            // alert("clicked");
            jQuery('#txt_type').hide();
            jQuery('#txt_state').hide();
        }

    });

    jQuery('#radGYes').click(function () {
        if (jQuery('#radGYes').prop('checked')) {
            // alert("clicked");
            jQuery('#bs_datepicker_container4').show();
        }

        jQuery('#radGNo').click(function () {
            if (jQuery('#radGNo').prop('checked')) {
                // alert("clicked");
                jQuery('#bs_datepicker_container4').hide();
            }

        });
    });


    jQuery('#reject').click(function () {

        window.open('dashboard', '_self');

    });

    jQuery('#etoDate').change(function () {

        _TaxNoticeUpdation.datecheck();


    });

});