var _AHapprove = {

    //BRANCH FILL AH//

     BranchFill:  function () {
         jQuery('.page-loader-wrapper').show();


         var BranchFills = {

            "typeid": 3,
            "userId": userdata.userId 
        };
          _http.post(MFPUBLICACCOUNTSAPI_URL+ "api/accounts/Ttrequest", BranchFills, _AHapprove.BranchListData, userdata.token)
        
    },

    BranchListData: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            jQuery('#BtnRecommend').show();

           
            if (response.data.ttrequestList.length > 0) {
                jQuery("#ddlAssignedFrom").empty();
                jQuery("#ddlAssignedFrom").append(jQuery("<option></option>").val("0").text("Choose Branch"));
                jQuery.each(response.data.ttrequestList, function (i, val) {
                    jQuery("#ddlAssignedFrom").append(jQuery("<option></option>").val(val.branchId).text(val.branchName));
                });
            }

            else {
                jQuery("#ddlAssignedFrom").empty();
                jQuery("#ddlAssignedFrom").append(jQuery("<option></option>").val("0").text("  Select Branch  "));
            }

        }
        else if (response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {

            jQuery("#selectbranch").empty();
            jQuery("#selectbranch").append(jQuery("<option></option>").val("0").text("  Select Branch   "));
        }
        jQuery('.page-loader-wrapper').hide();



    },

    //TABLE AH//

    LoadBranchDetails: function () {
        jQuery('.page-loader-wrapper').show();
        var Bid = jQuery('#ddlAssignedFrom').val();


        var BranchData = {
            "typeid": 4,
            "branchId": Bid
        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/Ttrequest", BranchData, _AHapprove.BranchDetailsTableLoadCompleted, userdata.token)
    },
    BranchDetailsTableLoadCompleted: function (response) {

        jQuery('#maincard').show();

        if (response.status === "SUCCESS") {
            
            if (response.data.approvalList != null && response.data.approvalList.length > 0) {
                jQuery('#divloanDetails').empty();
                var $table = jQuery('<table class="table" id="divloanDetails">');

                $table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text_align:center;">Branch Id</th><th style=""margin-left:80px;">Branch Name</th><th style="text-align:left;">Bank Name</th><th style="text-align:left;min-width:100px;">Bank Balance</th><th style="text_align:center;">Total Balance</th><th style="text_align:center;">Retention Limt</th><th style="text_align:center;">Amount</th><th style="text_align:center;">Remark</th><th style="text_align:center;"></th></tr></thead>');

                var $tbody = jQuery('<tbody>');
                jQuery.each(response.data.approvalList, function (i, val) {

                    var $row = jQuery('<tr/>');

                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="left">').html(val.branchId));
                    $row.append(jQuery('<td align="left">').html(val.branchName));
                    $row.append(jQuery('<td align="left">').html(val.bankName));
                    $row.append(jQuery('<td align="left">').html(val.bankbalance));
                    $row.append(jQuery('<td align="left">').html(val.totalbalance));
                    $row.append(jQuery('<td align="left">').html(val.retentionlimt));
                    $row.append(jQuery('<td align="left">').html(val.amount));
                    $row.append(jQuery('<td align="left">').html(val.remark));


                    $row.append(jQuery('<td align="center">').html('<button type="button" id="select" class="btn btn-success"   onClick="_AHapprove.Assign(' + i + ',\'' + val.branchName + '\',' + val.amount + ',\'' + val.reqId + '\');" name="select"><i class="fa fa-edit"></i>Select </button>'));

                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divloanDetails').html($table);

            } else {
                jQuery('#divloanDetails').hide();
                jQuery('#divloanDetails').empty();
            }
        } else {

            _General.noData(jQuery('#divloanDetails'), "No Data Found");

        }

        jQuery('.page-loader-wrapper').hide();
    },
    
    Assign: function (row, branchName, amount,reqId) {
        jQuery('.page-loader-wrapper').show();
        jQuery("#BranchName").prop("disabled", false);
        jQuery("#Amount").prop("disabled", false);

        jQuery("#reqIds").val(reqId);
        jQuery("#BranchName").val(branchName);
        jQuery("#Amount").val(amount);

        jQuery('.page-loader-wrapper').hide();
    },


    // AH AND RM RECOMMEND//
    AHRecommend: function (type_id) {
        jQuery('.page-loader-wrapper').hide();
        var Remark = jQuery('#remark').val();

        if (jQuery('#ddlAssignedFrom').val() == 0) {
            swal("", "Please select Branch  ", "warning");
            return false;
        }
        if (jQuery('#BranchName').val() == "") {
            swal("", "Please Enter Branch  name ", "warning");
            return false;
        }
        else if (jQuery('#remark').val() == "") {
            swal("", "Please Enter Remarks", "warning");
            return false;
        }
        var Req = jQuery('#reqIds').val(); 
        var Bid = jQuery('#ddlAssignedFrom').val();

        var Recommend = {
            "Typeid": type_id,
            "branchId": Bid,
            "remark": Remark,
            "UserId": userdata.userId,
            "reqId": Req

        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/Ttrequest", Recommend, _AHapprove.AHRecommendCompleted, userdata.token)

    },

    AHRecommendCompleted: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            swal("Recommended successfully", "", "success");

            jQuery('#ddlAssignedFrom').val(0);
            jQuery('#BranchName').val('');
            jQuery('#Amount').val('');
            jQuery('#remark').val('');
            jQuery('#divloanDetails').hide();


            if (response.data.message == "Recommended Successfully") {
                _AHapprove.BranchFill();
            }
            else if (response.data.message == "Successfully Recommended") {
                _AHapprove.BranchFillRM();
            }
        }

        else {
            swal("Error...!!","","warning");
        }
    },
    //AH AND RM REJECT//
    AHReject: function (type_id) {
        //jQuery('.page-loader-wrapper').hide();
        var Remark = jQuery('#remark').val();
        var Bid = jQuery('#ddlAssignedFrom').val();


        if (jQuery('#ddlAssignedFrom').val() == 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("", "Please Enter Branch  name ", "warning");
            return false;
        }
        else if (jQuery('#BranchName').val() == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("", "Please select Branch name", "warning");
            return false;
        }
        else if (jQuery('#remark').val() == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("", "Please Enter Remarks", "warning");
            return false;
        }

        var Req = jQuery('#reqIds').val(); 

        var Reject = {
            "Typeid": type_id,
            "branchId": Bid,
            "remark": Remark,
            "UserId": userdata.userId,
            "reqId": Req

        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/Ttrequest", Reject, _AHapprove.AHRejectCompleted, userdata.token)

    },

    AHRejectCompleted: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            swal("Rejected successfully", "", "success");

            jQuery('#ddlAssignedFrom').val(0);
            jQuery('#BranchName').val('');
            jQuery('#Amount').val('');
            jQuery('#remark').val('');
            jQuery('#divloanDetails').hide();
            if (response.data.message == "Rejected Successfully") {
                _AHapprove.BranchFill();
            }
            else if (response.data.message == "Successfully Rejected") {
                _AHapprove.BranchFillRM();
            }
                
            
        }

        else {
            swal("Error...!!", "", "warning");
        }
    },

    // BRANCH FILL RM//
    BranchFillRM: function () {
        jQuery('.page-loader-wrapper').show();


        var BrancheFillRM = {
            "typeid": 11,
            "userId": userdata.userId
            //"branchId": userdata.branchId
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/Ttrequest", BrancheFillRM, _AHapprove.BranchListDataRM, userdata.token)

    },
    BranchListDataRM: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.ttrequestList.length > 0) {
                jQuery("#ddlAssignedFrom").empty();
                jQuery("#ddlAssignedFrom").append(jQuery("<option></option>").val("0").text("Choose Branch"));
                jQuery.each(response.data.ttrequestList, function (i, val) {
                    jQuery("#ddlAssignedFrom").append(jQuery("<option></option>").val(val.branchId).text(val.branchName));
                });
            }

            else {
                jQuery("#ddlAssignedFrom").empty();
                jQuery("#ddlAssignedFrom").append(jQuery("<option></option>").val("0").text("  Select Branch  "));
            }

        }
        else if (response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {

            jQuery("#selectbranch").empty();
            jQuery("#selectbranch").append(jQuery("<option></option>").val("0").text("  Select Branch  "));
        }
        jQuery('.page-loader-wrapper').hide();



    },

    //TABLE RM//
    LoadBranchDetailsRM: function () {
        jQuery('.page-loader-wrapper').show();
        var Bid = jQuery('#ddlAssignedFrom').val();

        var BranchDataRM = {
            "typeid": 14,
            "branchId": Bid
        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/Ttrequest", BranchDataRM, _AHapprove.BranchDetailsTableLoadCompletedRM, userdata.token)
    },
    BranchDetailsTableLoadCompletedRM: function (response) {

        jQuery('#maincard').show();

        if (response.status === "SUCCESS") {

            if (response.data.approvalList != null && response.data.approvalList.length > 0) {
                jQuery('#divloanDetails').empty();
                jQuery('#divloanDetails').show();
                var $table = jQuery('<table class="table" id="divloanDetails">');

                $table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text_align:center;">Branch Id</th><th style=""margin-left:80px;">Branch Name</th><th style="text-align:left;">Bank Name</th><th style="text-align:left;min-width:100px;">Bank Balance</th><th style="text_align:center;">Total Balance</th><th style="text_align:center;">Retention Limt</th><th style="text_align:center;">Amount</th><th style="text_align:center;">Remark</th><th style="text_align:center;"></th></tr></thead>');

                var $tbody = jQuery('<tbody>');
                jQuery.each(response.data.approvalList, function (i, val) {

                    var $row = jQuery('<tr/>');

                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="left">').html(val.branchId));
                    $row.append(jQuery('<td align="left">').html(val.branchName));
                    $row.append(jQuery('<td align="left">').html(val.bankName));
                    $row.append(jQuery('<td align="left">').html(val.bankbalance));
                    $row.append(jQuery('<td align="left">').html(val.totalbalance));
                    $row.append(jQuery('<td align="left">').html(val.retentionlimt));
                    $row.append(jQuery('<td align="left">').html(val.amount));
                    $row.append(jQuery('<td align="left">').html(val.remark));


                    $row.append(jQuery('<td align="center">').html('<button type="button" id="select" class="btn btn-success"   onClick="_AHapprove.Assign(' + i + ',\'' + val.branchName + '\',' + val.amount + ',\'' + val.reqId + '\');" name="select"><i class="fa fa-edit"></i>Select </button>'));

                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divloanDetails').html($table);

            } else {
                jQuery('#divloanDetails').hide();
                jQuery('#divloanDetails').empty();
            }
        } else {

            _General.noData(jQuery('#divloanDetails'), "No Data Found");

        }

        jQuery('.page-loader-wrapper').hide();
    },

    //BRANCH FILL HO//
    BranchFillHO: function () {
        jQuery('.page-loader-wrapper').show();
        var BranchFill = {
            "Typeid": 8,
            "UserId": userdata.userId
        };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/Ttrequest", BranchFill, _AHapprove.BranchListDataHO, userdata.token)

    },

    BranchListDataHO: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            jQuery('#BtnApprove').show();


            if (response.data.ttrequestList.length > 0) {
                jQuery("#ddlAssignedFrom").empty();
                jQuery("#ddlAssignedFrom").append(jQuery("<option></option>").val("0").text("Choose Branch"));
                jQuery.each(response.data.ttrequestList, function (i, val) {
                    jQuery("#ddlAssignedFrom").append(jQuery("<option></option>").val(val.branchId).text(val.branchName));
                });
            }

            else {
                jQuery("#ddlAssignedFrom").empty();
                jQuery("#ddlAssignedFrom").append(jQuery("<option></option>").val("0").text("  Select Branch  "));
            }

        }
        else if (response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {

            jQuery("#selectbranch").empty();
            jQuery("#selectbranch").append(jQuery("<option></option>").val("0").text("  Select Branch  "));
        }
        jQuery('.page-loader-wrapper').hide();



    },

    //TABLE HO//
    LoadBranchDetailsHO: function () {
        jQuery('.page-loader-wrapper').show();
        var Bid = jQuery('#ddlAssignedFrom').val();

        var BranchDataHO = {
            "typeid": 9,
            "branchId": Bid
        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/Ttrequest", BranchDataHO, _AHapprove.BranchDetailsTableLoadCompletedHO, userdata.token)
    },

    BranchDetailsTableLoadCompletedHO: function (response) {

        jQuery('#maincard').show();

        if (response.status === "SUCCESS") {

            if (response.data.approvalList != null && response.data.approvalList.length > 0) {
                jQuery('#divloanDetails').empty();
                jQuery('#divloanDetails').show();
                var $table = jQuery('<table class="table" id="divloanDetails">');

                $table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text_align:center;">Branch Id</th><th style=""margin-left:80px;">Branch Name</th><th style="text-align:left;">Bank Name</th><th style="text-align:left;min-width:100px;">Bank Balance</th><th style="text_align:center;">Total Balance</th><th style="text_align:center;">Retention Limt</th><th style="text_align:center;">Amount</th><th style="text_align:center;">Remark</th><th style="text_align:center;"></th></tr></thead>');

                var $tbody = jQuery('<tbody>');
                jQuery.each(response.data.approvalList, function (i, val) {

                    var $row = jQuery('<tr/>');

                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="left">').html(val.branchId));
                    $row.append(jQuery('<td align="left">').html(val.branchName));
                    $row.append(jQuery('<td align="left">').html(val.bankName));
                    $row.append(jQuery('<td align="left">').html(val.bankbalance));
                    $row.append(jQuery('<td align="left">').html(val.totalbalance));
                    $row.append(jQuery('<td align="left">').html(val.retentionlimt));
                    $row.append(jQuery('<td align="left">').html(val.amount));
                    $row.append(jQuery('<td align="left">').html(val.remark));
                   // $row.append(jQuery('<td align="left">').html(val.reqId));

                    $row.append(jQuery('<td align="center">').html('<button type="button" id="select" class="btn btn-success"   onClick="_AHapprove.Assign(' + i + ',\'' + val.branchName + '\',' + val.amount + ',\'' + val.reqId + '\');" name="select"><i class="fa fa-edit"></i>Select </button>'));

                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divloanDetails').html($table);

            } else {
                jQuery('#divloanDetails').hide();
                jQuery('#divloanDetails').empty();
            }
        } else {

            _General.noData(jQuery('#divloanDetails'), "No Data Found");

        }

        jQuery('.page-loader-wrapper').hide();
    },



    HOApprove: function () {
        jQuery('.page-loader-wrapper').hide();
        var Remark = jQuery('#remark').val();
        var Bid = jQuery('#ddlAssignedFrom').val();

        if (jQuery('#ddlAssignedFrom').val() == 0) {
            swal("", "Please select Branch  ", "warning");
            return false;
        }
         else if (jQuery('#BranchName').val() == "") {
            swal("", "Please select Branch  name ", "warning");
            return false;
        }
        else if (jQuery('#remark').val() == "") {
            swal("", "Please Enter Remarks", "warning");
            return false;
        }
        var Req = jQuery('#reqIds').val();
        var Approve = {
            "Typeid": 7,
            "branchId": Bid,
            "remark": Remark,
            "UserId": userdata.userId,
            "reqId": Req
        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/Ttrequest", Approve, _AHapprove.HOApprovedCompleted, userdata.token)

    },

    HOApprovedCompleted: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            swal("Approved successfully", "", "success");

            jQuery('#ddlAssignedFrom').val(0);
            jQuery('#BranchName').val('');
            jQuery('#Amount').val('');
            jQuery('#remark').val('');
            jQuery('#divloanDetails').hide();

            _AHapprove.BranchFillHO();


        }

        else {
            swal("Error...!!", "", "warning");
        }
    },


    
    HOReject: function() {
       // jQuery('.page-loader-wrapper').hide();
        var Remark = jQuery('#remark').val();
        var Bid = jQuery('#ddlAssignedFrom').val();

        if (jQuery('#ddlAssignedFrom').val() == 0) {
            jQuery('.page-loader-wrapper').hide();
            swal("", "Please Enter Branch  name ", "warning");
            return false;
        }
        else if (jQuery('#BranchName').val() == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("", "Please select Branch name", "warning");
            return false;
        }
        else if (jQuery('#remark').val() == "") {
            jQuery('.page-loader-wrapper').hide();
            swal("", "Please Enter Remarks", "warning");
            return false;
        }
        var Req = jQuery('#reqIds').val();

        var Reject = {
            "Typeid": 10,
            "branchId": Bid,
            "remark": Remark,
            "UserId": userdata.userId,
            "reqId": Req
        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/Ttrequest", Reject, _AHapprove.HORejectCompleted, userdata.token)

    },
    HORejectCompleted: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            swal("Rejected successfully", "", "success");

            jQuery('#ddlAssignedFrom').val(0);
            jQuery('#BranchName').val('');
            jQuery('#Amount').val('');
            jQuery('#remark').val('');
            jQuery('#divloanDetails').hide();

            _AHapprove.BranchFillHO();
        }

        else {
            swal("Error...!!", "", "warning");
        }
    },
}

jQuery(document).ready(function ($) {
  //  debugger;

    //jQuery('.page-loader-wrapper').show();

    var bid = userdata.branchId;
    var post_id = userdata.accessLevelId;
   

    if (bid == 0) {


        jQuery('#ho-header').show();

        _AHapprove.BranchFillHO();

    }
    else if (post_id==5) {

        jQuery('#ah-header').show();

        _AHapprove.BranchFill();
    }

    else if (post_id == 1) {

        jQuery('#ah-header').show();

        jQuery('#BtnRecommend').show();
        _AHapprove.BranchFillRM();
    }


    jQuery("#ddlAssignedFrom").change(function () {

        var bid = userdata.branchId;

        if (bid == 0) {

            _AHapprove.LoadBranchDetailsHO();

        }
        else if (post_id == 5) {

            _AHapprove.LoadBranchDetails();
            jQuery('#divloanDetails').show();

        }
        else if (post_id == 1) {

            _AHapprove.LoadBranchDetailsRM();
        }
    });


    jQuery("#BtnRecommend").click(function () {
        if (post_id == 5) {
            var type_id = 5;
            _AHapprove.AHRecommend(type_id);
        }
        else if (post_id == 1) {
            var type_id = 12;
            //jQuery('#BtnRecommend').show();
            _AHapprove.AHRecommend(type_id);

        }
    });

    jQuery("#BtnApprove").click(function () {

        _AHapprove.HOApprove();
    });




    jQuery("#BtnReject").click(function () {
        jQuery('.page-loader-wrapper').show();
        var bid = userdata.branchId;

        if (bid == 0) {

            _AHapprove.HOReject();

        }
        else if (post_id == 5) {
            var type_id = 6;
            _AHapprove.AHReject(type_id);
        }
        else if (post_id == 1) {
            var type_id = 13;
            _AHapprove.AHReject(type_id)
        }
    });
});
