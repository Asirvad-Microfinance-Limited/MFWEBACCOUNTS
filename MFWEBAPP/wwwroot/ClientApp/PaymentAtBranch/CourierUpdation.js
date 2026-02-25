var _AddPayData = {

    GetOutwardData: function () {
        var Str = " ";
        jQuery('.page-loader-wrapper').show();
        var GetPayTypeData = {
            "flag1": "COURIERUPDATION",
            "flag2": "FILLOUTWARDDATA",
            "inptvar1": userdata.branchId,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillOutwardData, userdata.token)

    },
    FillOutwardData: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {

                jQuery("#ddlOutWard").empty();
                jQuery("#ddlOutWard").append(jQuery("<option></option>").val("0").text(" --------CHOOSE OUTWARD NUMBER-------- "));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlOutWard").append(jQuery("<option></option>").val(val.param1).text(val.param1));
                });
            }
            else {
                jQuery("#ddlOutWard").empty();
                jQuery("#ddlOutWard").append(jQuery("<option></option>").val("0").text(" --------CHOOSE OUTWARD NUMBER-------- "));
            }
        }
        else {

            jQuery("#ddlOutWard").empty();
            jQuery("#ddlOutWard").append(jQuery("<option></option>").val("0").text(" --------CHOOSE OUTWARD NUMBER-------- "));
        }
    },
    GetPRData: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var outward = jQuery('#ddlOutWard').val();
        var GetPayTypeData = {
            "flag1": "COURIERUPDATION",
            "flag2": "FILLDEPTDATA",
            "inptvar1": outward,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetPayTypeData, _AddPayData.FillPRData, userdata.token)

    },
    FillPRData: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#maincard').show();
            jQuery('#confirm').show();
            jQuery('#others').show();

            if (response.data.queryResult.length > 0) {
                var len = response.data.queryResult.length;

                jQuery("#nobills").val(len);
                jQuery('#paymenttabl').empty();
                jQuery.each(response.data.queryResult, function (i, val) {

                    var $row = jQuery('<tr/>');
                    var billdata = val.param3.split("~");
                    $row.append(jQuery('<td class="HCol" align="left">').html(val.param5));
                    $row.append(jQuery('<td class="HCol" align="left">').html(val.param1));
                    $row.append(jQuery('<td class="HCol" align="left">').html(val.param2));
                    $row.append(jQuery('<td class="HCol" align="left">').html(billdata[0]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(billdata[1]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(val.param4));
                    jQuery('#paymenttabl').append($row);

                });

            }
        }
    },

    takeSnapShot: function () {
        jQuery('#camsection').show();
        Webcam.set({
            width: 400,
            height: 310,
            image_format: 'jpeg',
            jpeg_quality: 100
        });
        Webcam.attach('#camera');
    },
    takeInvoice: function () {
        Webcam.snap(function (k) {

            var $image = jQuery('<img id="rtimg" src="' + k + '" height="310" width="100%" />');
            jQuery('#viewUploadedImages').html($image);
            jQuery('#viewUploadedImages').show();

            Strbase64 = k.toString().replace('data:image/jpeg;base64,', '');

            if (jQuery('#viewUploadedImages').val() == null) {
                swal("", "Add URL or PDF File..!", "warning");
                return false;
            }
        });

    },
    confdata: function () {
        if (_AddPayData.checkVals()) {
            var outward = jQuery('#ddlOutWard').val();
            var agencyName = jQuery('#agencyName').val().toUpperCase();
            var ChallanNo = jQuery('#challanno').val().toUpperCase();
            var weight = jQuery('#totWeight').val();
            var amount = jQuery('#Amount').val();
            var usrid = userdata.userId;
            var outval = agencyName + '@@' + ChallanNo + '@@' + weight + '@@' + amount + '@@' + usrid;

            var GetOutWardData = {
                "flag1": "COURIERUPDATION",
                "flag2": "CONFDATA",
                "inptvar1": outward,
                "inptvar2": outval,
                "typeID": "4",
                "userID": userdata.userId,
                "branchID": userdata.branchId
            };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetOutWardData, _AddPayData.Fillconfdata, userdata.token)
        }
    },
    Fillconfdata: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();

            var outward = jQuery('#ddlOutWard').val();
            var GetOutWardData = {
                "typeId": "0",
                "image": Strbase64,
                "collectionName": "PROUTWARDFILE",
                "fileName": "PROUTWARDFILE",
                "recordingId": outward,
                "imageType": "img"
            };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/insertimage", GetOutWardData, "", userdata.token)

            if (response.data.queryResult.length > 0) {
                swal({
                    title: "Approve",
                    text: response.data.queryResult[0].param1,
                    type: "success"
                }, function () {

                    window.location.reload(true);
                });
            }
        }

    },
    GetSendDate: function () {
        var outward = jQuery('#ddlOutWard').val();
        var Str = " ";
        var GetOutWardDate = {
            "flag1": "COURIERUPDATION",
            "flag2": "GETDATE",
            "inptvar1": outward,
            "inptvar2": Str,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", GetOutWardDate, _AddPayData.FillOutWardDate, userdata.token)

    },
    FillOutWardDate: function (response) {
        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            if (response.data.queryResult.length > 0) {
                jQuery('#sendDate').val(response.data.queryResult[0].param1);
            }
        }
    },
    checkVals: function () {
        var outward = jQuery('#ddlOutWard').val();
        var agencyName = jQuery('#agencyName').val();
        var ChallanNo = jQuery('#challanno').val();
        var weight = jQuery('#totWeight').val();
        var amount = jQuery('#Amount').val();
        if (outward == 0) {
            swal("Error", "Please select a Outward number..!", "error");
            return false;
        } else if (agencyName == "") {
            swal("Error", "Please Enter Agency Name..!", "error");
            return false;
        } else if (ChallanNo == "") {
            swal("Error", "Please Enter Chalan Number..!", "error");
            return false;
        } else if (weight == "") {
            swal("Error", "Please Enter Weight..!", "error");
            return false;
        } else if (amount == "") {
            swal("Error", "Please Enter Amount..!", "error");
            return false;
        } else if (Strbase64 == null) {
            swal("Error", "Please capture the chalan..!", "error");
            return false;
        }
        else
            return true;
    },

    convertToBase64: function (img) {
        Strbase64 = "";
        DFILETYPE = "";
        //var a = "travelFile";
        var a = img;
        //Read File
        var selectedFile = document.getElementById(a).files;
        //Check File is not Empty
        if (selectedFile.length > 0) {
            //Size checking //
            var sizeInKB = selectedFile[0].size / 1024;
            var sizeLimit = 200;
            //if (sizeInKB >= sizeLimit) {
            //    swal("", "Max file size allowed is 200KB", "warning");
            //    selectedFile = "";
            //    return false;
            //}
            // TEST BLOB TO BASE 64 //

            //var reader = new FileReader();
            //reader.readAsDataURL(blob);
            //reader.onloadend = function () {
            //    var base64String = reader.result;
            //   // console.log('Base64 String - ', base64String);

            //TEST BLOB TO BASE 64 //

            // Select the very first file from list
            var fileToLoad = selectedFile[0];
            // FileReader function for read the file.
            var fileReader = new FileReader();
            var base64;
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
            // Onload of file read the file content
            fileReader.onloadend = function (fileLoadedEvent) {
                base64 = fileLoadedEvent.target.result;
                //if (base64.toString().includes("data:application/pdf;base64")) {
                //    DFILETYPE = "PDF";
                //    swal("", "Please only upload Images..!", "warning");
                //    jQuery('#travelFile').val("");
                //    jQuery('#foodlFile').val("");
                //    jQuery('#stayFile').val("");
                //    return false;

                //}
                //else {
                //    DFILETYPE = "IMG";
                //}
                if ((base64.toString().includes("data:image/jpeg;base64")) || (base64.toString().includes("data:image/img;base64")) || (base64.toString().includes("data:image/jpg;base64")) || (base64.toString().includes("data:image/png;base64"))) {
                    DFILETYPE = "IMG";
                }
                else {
                    swal("", "Please only upload Images..!", "warning");
                    jQuery('#chalan_file').val("");
                    return false;
                }

                Strbase64 = base64.toString().replace('data:application/pdf;base64,', '').replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');

            }; if (Strbase64 != null) {
                jQuery('#tick').show();
                jQuery('#close').hide();
            }
        }
        else {

            swal("", "Add Image..!", "warning");
            return false;
        }
    },


}

_AddPayData.GetOutwardData();
var Strbase64;

jQuery(document).ready(function ($) {
    jQuery('.page-loader-wrapper').hide();
    jQuery('#billupd').click(function (e) {
        jQuery('#camera').show();
        jQuery('#camsection').show();
        jQuery('#closeCam').show();
        _AddPayData.takeSnapShot();
    });

    jQuery('#ClickmeBtn').click(function (e) {
        _AddPayData.takeInvoice();
    });

    jQuery('#ddlOutWard').change(function (e) {
        var outward = jQuery('#ddlOutWard').val();
        if (outward != 0) {
            _AddPayData.GetPRData();
            _AddPayData.GetSendDate();
        } else {
            jQuery('#maincard').hide();
            jQuery('#confirm').hide();
            jQuery('#others').hide();
        }
    });

    jQuery('#chalan_file').change(function (e) {
        var file = "payfile";
        // _AddPayData.takeInvoice();

        _AddPayData.convertToBase64(file);
    });

    jQuery('#submit').click(function (e) {
        var outward = jQuery('#ddlOutWard').val();
        if (outward != 0) {
            _AddPayData.confdata();
        }
        else
            swal("Error", "Select an outward number..!", "error");
    });

});

var spanCam = document.getElementsByClassName("close")[0];
spanCam.onclick = function () {
    jQuery('#camera').hide();
    jQuery('#camsection').hide();
    jQuery('#closeCam').hide();
    jQuery('#viewUploadedImages').hide();
    if (Strbase64 != null) {
        jQuery('#tick').show();
        jQuery('#close').hide();
    }
    Webcam.reset();
}