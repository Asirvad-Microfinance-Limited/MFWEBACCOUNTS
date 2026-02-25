
var _SuspenseRecommend = {

    suspeserecommendfill: function () {
        jQuery(".page-loader-wrapper").show();
        var Str = "";
        var GetrecommendIddata = {
            "flag1": "SUSPENSEHOAPPROVAL",
            "flag2": "SUSPENSEID",
            "inptvar1": userdata.userId,
            "inptvar2": Str
        };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetrecommendIddata, _SuspenseRecommend.suspenserecommendLoadCompleted, userdata.token)
    },

    suspenserecommendLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                jQuery("#rcmndsrch").empty();
                jQuery("#rcmndsrch").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#rcmndsrch").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });


            }
            else {
                jQuery("#rcmndsrch").empty();
                jQuery("#rcmndsrch").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
            }

        }
        else {
            jQuery("#rcmndsrch").empty();
            jQuery("#rcmndsrch").append(jQuery("<option></option>").val("0").text("Employee code  >>>  Suspense Id >>> Amount"));
        }

    },

    showrecommenddetailstable: function () {
         var requestid=jQuery('#rcmndsrch').val();
        var Str = "";
        var GetRequestedDetailData = {
            "flag1": "SUSPENSEHOAPPROVAL",
            "flag2": "SUSPENSEDETAIL",
            "inptvar1": requestid,
            "inptvar2": Str

        }
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", GetRequestedDetailData, _SuspenseRecommend.FillRequestedDetailtable, userdata.token)

    },
    FillRequestedDetailtable: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status === "SUCCESS") {
            if (response.data.queryResult.length > 0) {
                var data1 = response.data.queryResult[0].param1;
                var data2 = response.data.queryResult[0].param2;
                var tot = data1.split("#")[0];
                var dt = data2.split("#")[1];
                jQuery("#paymentrcmndcard").show();
                var data = data1.split("#");

                var $row = jQuery('<tr/>');
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[0]));

                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[1].toUpperCase()));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[3].toUpperCase()));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[4]));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data2));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').html(data[2].toUpperCase()));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));
                $row.append(jQuery('<td class="HCol" style="text-align:left;">').text("0"));

                jQuery('#paymentrcmnddetails').append($row);
               // requestedamount = data[4];

                jQuery("#reason").show();
                jQuery("#btnext").show();
                

            }
            else {
            }

            jQuery('.page-loader-wrapper').hide();


        }
    },

    //suspenserecommendconfirm: function () {


    //    var branchid = jQuery("#brnchname").val();


    //    var branchhead = branchheadid;
    //    var suspenseid = jQuery("#rqstsearchngbrnch").val();
    //    var str = branchid + "!!" + branchhead;
    //    var changebranchconfirmData = {
    //        "flag1": "CHANGEBRANCH",
    //        "flag2": "CONFIRM",
    //        "inptvar1": str,
    //        "inptvar2": suspenseid,


    //    };
    //    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/EmployeeSuspenseAdvance/SuspenseQueries", changebranchconfirmData, _PaymentHo.changebranchconfirmLoadCompleted, userdata.token)
    //},

    //changebranchconfirmLoadCompleted: function (response) {
    //    //jQuery('.page-loader-wrapper').hide();
    //    if (response.status === "SUCCESS") {
    //        /*suspenseid = jQuery.trim(response.data.advance_payment_id);*/



    //        swal(response.data.message, "branch changed successfully.....!", "success");


    //        _PaymentHo.changebranchclear()

    //        //function () {
    //        //    window.location.reload(true);
    //        //});
    //    }

    //    else {

    //        swal(response.responseMsg, "", "error");

    //    }

    //},

}
    jQuery(document).ready(function ($) {
        _SuspenseRecommend.suspeserecommendfill()

        jQuery('#morercmndsrch').click(function () {
            var requestid1 = jQuery('#rcmndsrch').val();
            if (requestid1 == 0) {
                jQuery('.page-loader-wrapper').hide();
                swal("Error", "Please select your request..!", "error");
            }
            else {

                jQuery("#morercmndsrch").prop("disabled", true);


            }
            _SuspenseRecommend.showrecommenddetailstable()
                jQuery('#paymentrcmnddetails').empty();

        });

    });