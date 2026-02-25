var _TabExpenseApprovalOrRejectController = {
    TabExpenseTypeFill: function () {
        jQuery('.page-loader-wrapper').show();
        var TabExpenseTypeFillData = {
            "typeid": 4,
            "AccesslevelId": userdata.AccesslevelId,
            "userId": userdata.userId
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/TabRelatedExpense", TabExpenseTypeFillData, _TabExpenseApprovalOrRejectController.TabExpenseFillLoadCompleted, userdata.token)

    },

    TabExpenseFillLoadCompleted: function (response) {


        jQuery('#maincard').show();

        if (response.status === "SUCCESS") {

            if (response.data.infraRecommentationDatas != null && response.data.infraRecommentationDatas.length > 0) {



                jQuery('#divtabrelatedexpenseview').empty();
                var $table = jQuery('<table class="table" id="tbltabRepairExpanseview">');

                $table.append('<thead><tr> <th style="text-align:center;">Sl_No</th><th style="text-align:center;">IMEI Number</th><th style="text-align:center;width:200px;">Issue Type</th><th style="text-align:center;">Issue OccurredDate</th><th style="text-align:center;">Max IssueCost</th><th style="text-align:center;">Quotation Amount</th><th style="text-align:center;">Excess Reason</th><th style="text-align:center;">Comments</th><th style="text-align:center;">CreatedBy</th><th style="text-align:center;">User Name</th><th style="text-align:center;">CreatedDt</th></th><th style="text-align:center;">Damage</th><th style="text-align:center;">FIR/Quatation</th><th style="text-align:center;">Approve</th><th style="text-align:center;">Reject</th> </tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.infraRecommentationDatas, function (i, val) {

                    var $row = jQuery('<tr/>');

                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="center">').html(val.imeiNumber));
                    $row.append(jQuery('<td align="center">').html(val.issueType));
                    $row.append(jQuery('<td align="center">').html(val.issueOccurredDate));
                    $row.append(jQuery('<td align="center">').html(val.maxIssueCost));
                    $row.append(jQuery('<td align="center">').html(val.quotationAmount));
                    $row.append(jQuery('<td align="center">').html(val.excessReason));
                    $row.append(jQuery('<td align="center">').html(val.comments));
                    $row.append(jQuery('<td align="center">').html(val.createdBy));
                    $row.append(jQuery('<td align="center">').html(val.userName));
                    $row.append(jQuery('<td align="center">').html(val.createdDt));

                    $row.append(jQuery('<td align="center">').html('<button type="button" class="btn btn-warning btn-sm"  onClick="ShowImage(' + val.recordingId + ',\'DAMAGEDTABIMG\');"><i class="fa fa-image"></i> Image</button>'));
                    $row.append(jQuery('<td align="center">').html('<button type="button" class="btn btn-warning btn-sm"  onClick="ShowImage(' + val.recordingId + ',\'DAMAGEDTABQTN\');"><i class="fa fa-image"></i> Image</button>'));
                    $row.append(jQuery('<td align="center">').html('<button type="button" class="btn btn-success btn-sm"  onClick="_TabExpenseApprovalOrRejectController.ApproveButtonFillData(' + val.referenceId + ',' + val.recommentedBy + ',' + val.statusId + ');"><i class="fa fa-check"></i> ' + (val.recommentedBy == null ? "Recommend" : "Approve") + '</button>'));
                    $row.append(jQuery('<td align="center">').html('<button type="button" class="btn btn-danger btn-sm"  onClick="_TabExpenseApprovalOrRejectController.RejectButtonFillData(' + val.referenceId + ',6);"><i class="fa fa-times"></i> Reject</button>'));
                    //$row.append(jQuery('<td align="center">').html('<button type="button" class="btn btn-sm btn-success"  onClick="_TabExpenseApprovalOrRejectController.Assign(' + i + ',\'' + val.imeiNumber + '\');"> <i class="fa fa-edit"></i> Approve</button> '));
                    //$row.append(jQuery('<td align="center">').html('<button type="button" class="btn btn-sm btn-success"  onClick="_TabExpenseApprovalOrRejectController.Assign(' + i + ',\'' + val.imeiNumber + '\');"> <i class="fa fa-edit"></i> Reject</button> '));
                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divtabrelatedexpenseview').html($table);



            } else {
                _General.noData(jQuery('#divtabrelatedexpenseview'), "No Data Found");
                //jQuery('#divtabrelatedexpenseview').hide();
                //jQuery('#divtabrelatedexpenseview').empty();
                /*_General.noData(jQuery('#divtabrelatedexpenseview'), "No Data Found");*/
            }

        }
        //else {


        //}

        jQuery('.page-loader-wrapper').hide();
    },

    viewInvoiceImages: function (x) {
        jQuery('.page-loader-wrapper').show();
        var invimagemageData = {
            "recordingId": x,
            "collectionName": colectname
        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/images", invimagemageData, _AddPayData.viewInvoiceImagesLoadCompleted, userdata.token)
    },

    viewInvoiceImagesLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            var $image = jQuery('<img class="north" id = "rtimg" src="data:image/png;base64,' + response.data.imageString + ' " height="450" width="50%" >');
            jQuery('#ImageModel').modal('show');
            jQuery('#ImageDiv').html($image);

            var zoomImage = jQuery('#rtimg');
            zoomImage.imageZoom();

        }
        else {
            //jQuery('.page-loader-wrapper').hide();
            _General.noData(jQuery('#divInvimages'), "No Data Found");

        }
    },

    ApproveButtonFillData: function (referenceId, recommentedBy, statusId) {
        jQuery('.page-loader-wrapper').show();

        var Approvebutton = {
            "typeId": (statusId == 3 ? 8 : 5),
            "userId": userdata.userId,
            "refereceId": referenceId,
            "statusId": (recommentedBy != null ? 3 : (statusId == 1 ? 2 : 1))
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/TabRelatedExpense", Approvebutton, _TabExpenseApprovalOrRejectController.ApprovebuttonFill, userdata.token)

    },

    ApprovebuttonFill: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            swal(response.data.message, "", "success");

            _TabExpenseApprovalOrRejectController.TabExpenseTypeFill();


        }
        else {
            swal(response.responseMsg, "", "error");
        }



    },
    RejectButtonFillData: function (ReferenceId) {
        jQuery('.page-loader-wrapper').show();

        var Rejectbutton = {
            "typeId": 6,
            "userId": userdata.userId,
            "refereceId": ReferenceId
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/TabRelatedExpense", Rejectbutton, _TabExpenseApprovalOrRejectController.RejectbuttonFill, userdata.token)

    },

    RejectbuttonFill: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            swal(response.data.message, "", "success");

            _TabExpenseApprovalOrRejectController.TabExpenseTypeFill();

        }
        else {
            swal(response.responseMsg, "", "error");
        }



    },
    DrowImage: function (Response) {
        if (Response.status === "SUCCESS") {
            jQuery('#ImageModel').modal('show');
            jQuery('#ImageDiv').html('');
            var $image = jQuery('<img src="data:image/png;base64,' + Response.data.imageString + ' " height="500" width="900">');
            jQuery('#ImageDiv').html($image);
        }
        else {
            jQuery('#ImageDiv').html('');
            var $image = jQuery('<img src="../lib/bootstrap/dist/images/No Image.jpg" height="400" width="400" />');
            jQuery('#ImageDiv').html($image);
        }
        jQuery('.page-loader-wrapper').hide();
    }

}

jQuery(document).ready(function ($) {

    _TabExpenseApprovalOrRejectController.TabExpenseTypeFill();

    //jQuery('#Assign').click(function (e) {

    //    jQuery('.page-loader-wrapper').show();
    //    _TabExpenseApprovalOrRejectController.ApprovebuttonFill();
    //});

});
function ShowImage(RecordingId, CollectionName) {
    jQuery('.page-loader-wrapper').show();
    var invimagemageData = {
        "recordingId": RecordingId,
        "collectionName": CollectionName
    }
    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/images", invimagemageData, _TabExpenseApprovalOrRejectController.DrowImage, userdata.token);
}