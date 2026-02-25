/*varetepeid;*/
var a;
var Strbase64Qtn = "", Strbase64 = "";
var _Tabrelateddetails = {

    IssueTypeFill: function () {
        jQuery('.page-loader-wrapper').show();

        var IssueFillData = {
            "typeid": 2


        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/TabRelatedExpense", IssueFillData, _Tabrelateddetails.IssueTypeFillLoadCompleted, userdata.token)

    },

    IssueTypeFillLoadCompleted: function (response) {
        if (response.status === "SUCCESS") {
            if (response.data.tabIssueTypeDatas.length > 0) {
                jQuery("#ddlIssue").empty();
                jQuery("#ddlIssue").append(jQuery("<option></option>").val("0").text("Select Issue"));
                jQuery.each(response.data.tabIssueTypeDatas, function (i, val) {
                    jQuery("#ddlIssue").append(jQuery("<option></option>").val(val.issueId).text(val.issueType));
                });
            }
            else {
                jQuery("#ddlIssue").empty();
                jQuery("#ddlIssue").append(jQuery("<option></option>").val("0").text("Select Issue"));
            }
        }
        else {
            jQuery("#ddlIssue").empty();
            jQuery("#ddlIssue").append(jQuery("<option></option>").val("0").text("Select Issue"));
        }
        _Tabrelateddetails.TypeFill();

    },

    TabRelatedExpenseFillLoadCompleted: function (response) {


        jQuery('#maincard').show();

        if (response.status === "SUCCESS") {

            if (response.data.tabRelatedDetailsDatas != null && response.data.tabRelatedDetailsDatas.length > 0) {



                jQuery('#divtabrelatedexpense').empty();
                var $table = jQuery('<table class="table" id="tbltabRepairExpanse">');

                $table.append('<thead><tr> <th style="text-align:center;">Sl No</th><th style="text-align:center;">Branch Name</th><th style="text-align:center;">TAB model</th><th style="text-align:center;">IMEI Number</th><th style="text-align:center;">Employee ID</th><th style="text-align:center;">Purchase Date</th><th style="text-align:center;">Assigned Date</th><th style="text-align:center;">Warranty Date From</th><th style="text-align:center;">Warranty Date To</th><th style="text-align:center;">PO #</th><th style="text-align:center;">Select</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.tabRelatedDetailsDatas, function (i, val) {

                    var $row = jQuery('<tr/>');

                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="center">').html(val.branchName));
                    $row.append(jQuery('<td align="center">').html(val.tabModel));
                    $row.append(jQuery('<td align="center">').html(val.imeiNumber));
                    $row.append(jQuery('<td align="center">').html(val.employeeId));
                    $row.append(jQuery('<td align="center">').html(val.purchaseDate));
                    $row.append(jQuery('<td align="center">').html(val.assigneDate));
                    $row.append(jQuery('<td align="center">').html(val.warrantyDateTo));
                    $row.append(jQuery('<td align="center">').html(val.warrantyDateFrom));
                    $row.append(jQuery('<td align="center">').html(val.po));
                    $row.append(jQuery('<td align="center">').html('<button type="button" class="btn btn-sm btn-success"  onClick="_Tabrelateddetails.Assign(' + i + ',\'' + val.imeiNumber + '\');"> <i class="fa fa-edit"></i> Select</button> '));


                    /*  $row.append(jQuery('<td align="center">').html('<input type="checkbox" class="checkBoxClass"  id="centerscheck" name="centerscheck" onClick="_Tabrelateddetails.myFunctionCheck(' + i + ')" />'));*/
                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divtabrelatedexpense').html($table);



            } else {
                _General.noData(jQuery('#divtabrelatedexpense'), "No Data Found");
                //jQuery('#divtabrelatedexpense').hide();
                //jQuery('#divtabrelatedexpense').empty();
                /*   _General.noData(jQuery('#divtabrelatedexpense'), "No Data Found");*/
            }
        }
        //else {

        //    _General.noData(jQuery('#divtabrelatedexpense'), "No Data Found");
        //}

        jQuery('.page-loader-wrapper').hide();
    },


    TypeFill: function () {
        jQuery('.page-loader-wrapper').show();
        var TypFillData = {
            "typeid": 1,
            "branchId": userdata.branchId,
            "userId": userdata.userId
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/TabRelatedExpense", TypFillData, _Tabrelateddetails.TabRelatedExpenseFillLoadCompleted, userdata.token)

    },


    Assign: function (i, imeiNumber) {
        jQuery('.page-loader-wrapper').show();

        jQuery("#vaimeiNumber").val(imeiNumber);

        jQuery('.page-loader-wrapper').hide();
    },




    convertdateformat: function (dt) {
        ndt = dt.replace(/\//g, '-');
        var vday = ndt.split('-')[0];
        var vmonth = parseInt(ndt.split('-')[1]);
        var vyear = ndt.split('-')[2];
        var vmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var vmon = vmonths[vmonth - 1];
        var valtortn = vday + '-' + vmon + '-' + vyear;
        return valtortn
    },

    SavebuttonFill: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            swal(response.data.message, "", "success");
            _Tabrelateddetails.TypeFill();
            jQuery('#maincard').hide();
            /*            _Tabrelateddetails.TypeFill();*/
            _Tabrelateddetails.SaveFieldClear();


        }
        else {
            swal(response.responseMsg, "", "error");
        }
        jQuery('#ddlimageupload').show();
        jQuery('#ddlamount').show();
        jQuery('#ddlreason').show();
        jQuery('#ddluploadQtn').show();
    },





    SaveFillData: function (IssuePrice) {
        /* jQuery('.page-loader-wrapper').show();*/
        var imieno = parseInt(jQuery('#vaimeiNumber').val());
        var issuetyp = jQuery('#ddlIssue').val();
        var date = "";
        var amnt = parseInt(jQuery('#vaamount').val());
        var statusid

        if (isNaN(amnt)) amnt = 0;
        var reason = jQuery('#vareason').val();
        var comments = jQuery('#vacomments').val();
        var userId = userdata.userId;
        if (IssuePrice < amnt) {
            statusid = 2
        }
        else {
            statusid = 1
        }

        date = _Tabrelateddetails.convertdateformat(jQuery('#dateissueoccured').val());

        var savebuttonFillData = {
            "typeId": 3,
            "imeiNumber": imieno,
            "issueid": issuetyp,
            "issueOccurredDate": date,
            "quotationAmount": amnt,
            "excessReason": reason,
            "comments": comments,
            "userId": userdata.userId,
            "fileType": "IMG",
            "imgStr": Strbase64,
            "imgStrQtn": Strbase64Qtn,
            "imageStatus": 1,
            "statusId": statusid,
            "branchId": userdata.branchId,

        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/TabRelatedExpense", savebuttonFillData, _Tabrelateddetails.SavebuttonFill, userdata.token);
    },

    SaveFieldClear: function () {
        jQuery('#vaimeiNumber').val('');
        jQuery('#ddlIssue').val('0');


        jQuery('#dateissueoccured').val('');
        jQuery('#vaimgupload').val('');
        jQuery('#vaamount').val('');
        jQuery('#vareason').val('');
        jQuery('#vacomments').val('');
        jQuery('#vauploadQtn').val('');
        //jQuery('#SubAIdName').val('');
        //jQuery('#SubAcFlag2').prop('checked', false);
        jQuery('.page-loader-wrapper').hide();
    },

}




jQuery(document).ready(function ($) {
    jQuery('#ddlIssue').select()
    _Tabrelateddetails.IssueTypeFill();

    jQuery('#save').click(function () {
        var IMEINumber = jQuery('#vaimeiNumber').val();
        var Issuetype = jQuery('#ddlIssue').val();
        var IssueDet = jQuery('#ddlIssue :selected').text();
        var IssueDetData = IssueDet.split(" | ");
        var dateissueoccured = jQuery('#dateissueoccured').val();
        var imgupload = jQuery('#vaimgupload').val();
        var amount = jQuery('#vaamount').val();
        var reason = jQuery('#vareason').val();
        var comments = jQuery('#vacomments').val();
        var upload = jQuery('#vauploadQtn').val();
        a = jQuery('#ddlIssue').val();
        if (a == 7) {
            if (IMEINumber == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("", "Please Select IMEINumber..!", "warning");
                return false;
            }

            if (Issuetype == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("", "Please Select Type..!", "warning");
                return false;
            }
            if (dateissueoccured == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("", "Please Select Date..!", "warning");
                return false;
            }

            if (comments == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("", "Please Type comments..!", "warning");
                return false;
            }

        }
        else if (a == 8) {
            if (IMEINumber == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("", "Please Select IMEINumber..!", "warning");
                return false;
            }

            if (Issuetype == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("", "Please Select Type..!", "warning");
                return false;
            }
            if (dateissueoccured == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("", "Please Select Date..!", "warning");
                return false;
            }
            if (comments == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("", "Please Type comments..!", "warning");
                return false;
            }
            if (upload == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("", "Please upload quotation/FIR.....!", "warning");
                return false;
            }



        }
        else {
            if (IMEINumber == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("", "Please Select IMEINumber..!", "warning");
                return false;
            }

            if (Issuetype == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("", "Please Select Type..!", "warning");
                return false;
            }
            if (dateissueoccured == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("", "Please Select Date..!", "warning");
                return false;
            }
            if (imgupload == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("", "Please Upload Image..!", "warning");
                return false;
            }
            if (amount == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("", "Please Enter Amount..!", "warning");
                return false;
            }
            //if (reason == "") {
            //    jQuery('.page-loader-wrapper').hide();
            //    swal("", "Please Type Reason..!", "warning");
            //    return false;

            //}
            if (comments == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("", "Please Type comments..!", "warning");
                return false;
            }
            if (upload == "") {
                jQuery('.page-loader-wrapper').hide();
                swal("", "Please upload quotation/FIR.....!", "warning");
                return false;
            }

            var IssuePer = IssueDetData[2].replace("%", "");
            var IssuePrice = parseInt(IssueDetData[1]) + (parseInt(IssueDetData[1]) * parseInt(IssuePer) * 0.01);

            if (IssuePrice < amount) {
                jQuery('.page-loader-wrapper').hide();
                swal("", "EXCESS AMOUNT..!", "warning");

                if (reason == "") {
                    jQuery('.page-loader-wrapper').hide();
                    swal("", "Please Type Reason..!", "warning");
                    return false;

                }

            }

        }

        /* window.location = "tabrelatedexpenseview";*/
        _Tabrelateddetails.SaveFillData(IssuePrice);

    });

    jQuery("#vaamount").change(function (e) {
        var IssueDet = jQuery('#ddlIssue :selected').text();

        var amount = jQuery('#vaamount').val();
        var IssueDetData = IssueDet.split(" | ");
        var IssuePer = IssueDetData[2].replace("%", "");
        var IssuePrice = parseInt(IssueDetData[1]) + (parseInt(IssueDetData[1]) * parseInt(IssuePer) * 0.01);

        if (IssuePrice < amount) {
            jQuery('#ddlreason').show();

        }
        else {
            jQuery('#ddlreason').hide();

        }
    });

    jQuery('#bs_datepicker_container5_dateissueoccured input').datepicker({

        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        endDate: new Date(),
        container: '#bs_datepicker_container5_dateissueoccured'
    }).datepicker("setDate", new Date());

    jQuery('#vaimgupload').on('change', function () {
        var a = "vaimgupload";
        var selectedFile = document.getElementById(a).files;
        Strbase64 = "";
        if (selectedFile.length > 0) {
            //Size checking //
            var sizeInKB = selectedFile[0].size / 1024;
            var sizeLimit = 200;
            if (sizeInKB >= sizeLimit) {
                swal("", "Max file size allowed is 200KB", "warning");
                jQuery('#vaimgupload').val('');
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
                //fileReader.onloadend = function (fileLoadedEvent) {
                //    base64 = fileLoadedEvent.target.result;
                if ((base64.toString().includes("data:image/jpeg;base64")) || (base64.toString().includes("data:image/img;base64")) || (base64.toString().includes("data:image/jpg;base64")) || (base64.toString().includes("data:image/png;base64"))) {
                    DFILETYPE = "IMG";
                }
                else {
                    swal("", "Please only upload Images..!", "warning");
                    jQuery('#vaimgupload').val("");
                    //jQuery('#foodlFile').val("");
                    //jQuery('#stayFile').val("");
                    return false;

                }
                Strbase64 = base64.toString().replace('data:application/pdf;base64,', '').replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');



            }
        }
    });
    jQuery('#vauploadQtn').on('change', function () {
        var b = "vauploadQtn";
        var selectedFileQtn = document.getElementById(b).files;
        Strbase64Qtn = "";
        if (selectedFileQtn.length > 0) {
            //Size checking //
            var sizeInKB = selectedFileQtn[0].size / 1024;
            var sizeLimit = 200;
            if (sizeInKB >= sizeLimit) {
                swal("", "Max file size allowed is 200KB", "warning");

                jQuery('#vauploadQtn').val('');
                selectedFileQtn = "";
                return false;
            }
            // Select the very first file from list
            var fileToLoad = selectedFileQtn[0];
            // FileReader function for read the file.
            var fileReader = new FileReader();
            var base64;
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
            // Onload of file read the file content
            fileReader.onload = function (fileLoadedEvent) {
                base64 = fileLoadedEvent.target.result;
                if ((base64.toString().includes("data:image/jpeg;base64")) || (base64.toString().includes("data:image/img;base64")) || (base64.toString().includes("data:image/jpg;base64")) || (base64.toString().includes("data:image/png;base64"))) {
                    DFILETYPE = "IMG";
                }
                else {
                    swal("", "Please only upload Images..!", "warning");
                    jQuery('#vauploadQtn').val("");
                    //jQuery('#foodlFile').val("");
                    //jQuery('#stayFile').val("");
                    return false;

                }

                Strbase64Qtn = base64.toString().replace('data:application/pdf;base64,', '').replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');
            }
        }
    });

    jQuery("#ddlIssue").change(function (e) {
        a = jQuery('#ddlIssue').val();
        if (a == 7) {
            jQuery('#ddlimageupload').hide();
            jQuery('#ddlamount').hide();
            jQuery('#ddlreason').hide();
            jQuery('#ddluploadQtn').hide();
        }

        else if (a == 8) {


            jQuery('#ddlimageupload').hide();
            jQuery('#ddlamount').hide();
            //jQuery('#ddlreason').hide();
            jQuery('#ddluploadQtn').show();
        }
        else {
            jQuery('#ddlimageupload').show();
            jQuery('#ddlamount').show();
            // jQuery('#ddlreason').show();
            jQuery('#ddluploadQtn').show();
            // jQuery('#firstrow').show();
            //jQuery('#secondrow').show();
        }

        //jQuery('#vaimeiNumber').val('');
        jQuery('#dateissueoccured').val('');
        jQuery('#vaimgupload').val('');
        jQuery('#vaamount').val('');
        jQuery('#vacomments').val('');
        jQuery('#vareason').val('');
        jQuery('#vauploadQtn').val('');

    });
});


