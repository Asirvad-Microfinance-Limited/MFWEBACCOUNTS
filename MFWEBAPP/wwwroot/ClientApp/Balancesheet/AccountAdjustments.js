var slsno 
var _AccountAdjustment = {
    AccountFill: function () {
        jQuery('.page-loader-wrapper').show();
        var AccountFilleData = {
            
            "typeid": 5
        };
        AccountFilleData = JSON.stringify(AccountFilleData);
        AccountFilleData = { "encryptedRqstStr": EncryptAPIReq(AccountFilleData) };

        _http.post(MFPUBLICGENERALAPI_URL + "api/AMLAccounts/balanceSheet", AccountFilleData, _AccountAdjustment.AccountFilleDataLoad, userdata.token)



    },
    AccountFilleDataLoad: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.balanceSheetDataList.length > 0) {
                jQuery("#Accounts").empty();
                jQuery("#Accounts").append(jQuery("<option></option>").val("0").text("  Choose Account  "));
                jQuery.each(response.data.balanceSheetDataList, function (i, val) {
                    jQuery("#Accounts").append(jQuery("<option></option>").val(val.AccountName).text(val.AccountName));
                });
            }
            else {
                jQuery("#Accounts").empty();
                jQuery("#Accounts").append(jQuery("<option></option>").val("0").text("  Choose Account  "));
            }

        }
        else if (response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {

            jQuery("#Accounts").empty();
            jQuery("#Accounts").append(jQuery("<option></option>").val("0").text("  Choose Account  "));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    DescFill: function () {
        jQuery('.page-loader-wrapper').show();
       /* var Accountsno = jQuery('#Accounts').val();*/
        var DescFilleData = {

            "typeid":5 
            
        };
        DescFilleData = JSON.stringify(DescFilleData);
        DescFilleData = { "encryptedRqstStr": EncryptAPIReq(DescFilleData) };

        _http.post(MFPUBLICGENERALAPI_URL + "api/AMLAccounts/balanceSheet", DescFilleData, _AccountAdjustment.DescFilleDataLoad, userdata.token)



    },
    DescFilleDataLoad: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.balanceSheetDataList.length > 0) {
                jQuery("#contra").empty();
                jQuery("#contra").append(jQuery("<option></option>").val("0").text("  Choose Contra Number  "));
                jQuery.each(response.data.balanceSheetDataList, function (i, val) {
                    jQuery("#contra").append(jQuery("<option></option>").val(val.AccountName).text(val.AccountName));
                    
                });
            }
            else {
                jQuery("#contra").empty();
                jQuery("#contra").append(jQuery("<option></option>").val("0").text("  Choose Contra Number "));
            }

        }
        else if (response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {

            jQuery("#contra").empty();
            jQuery("#contra").append(jQuery("<option></option>").val("0").text(" Choose Contra Number  "));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    //AmountFill: function () {
    //    jQuery('.page-loader-wrapper').show();

    //    var slsno = jQuery('#Desc').val();
    //    var AmountFilleData = {

    //        "typeid": 7,
    //        "accountNo": slsno
    //    };
    //    AmountFilleData = JSON.stringify(AmountFilleData);
    //    AmountFilleData = { "encryptedRqstStr": EncryptAPIReq(AmountFilleData) };
    
    //    _http.post(MFPUBLICGENERALAPI_URL + "api/AMLAccounts/balanceSheet", AmountFilleData, _AccountAdjustment.AmountFilleDataLoad, userdata.token)

    //},

    //AmountFilleDataLoad: function (response) {
    //    jQuery('.page-loader-wrapper').hide();

    //    if (response.status === "SUCCESS") {
    //        response.data = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

    //        if (response.data != null && response.data.balanceSheetDataList.length > 0) {

    //            jQuery("#ammounts").empty();
    //            jQuery("#ammounts").val(response.data.balanceSheetDataList[0].amount);
    //        }
    //        else if (response.data.balanceSheetDataList[0].amount = "") {
    //            jQuery("#ammounts").val("No Amount");

    //        }


    //        jQuery('.page-loader-wrapper').hide();
    //    }
    //},

    Confirmbut: function () {
        jQuery('.page-loader-wrapper').show();

        var account = jQuery('#Accounts').val();
        var acountsSplit = account.split('-');
        var Accountno = acountsSplit[0];
         accountname = acountsSplit[1];
        var descr = jQuery('#desc').val();
        var todate = jQuery('#dtToDate').val();
        var user = userdata.userId;
        var contra = jQuery('#contra').val();
        var contraSplit = contra.split('-');
        var contrano = contraSplit[0];
        contrname = contraSplit[1];
        var amt = jQuery('#ammounts').val();
        /*var data = descr + '-' + amt +'-'+ user;*/
        var confirmdata = {
           
            "typeid": 8,
            "accountNo": Accountno,
            "contraNo": contrano,
            "amount": amt,
            "discription": descr,
            "asondata": todate,
            "userId": user

        };

        confirmdata = JSON.stringify(confirmdata);
        confirmdata = { "encryptedRqstStr": EncryptAPIReq(confirmdata) };

        _http.post(MFPUBLICGENERALAPI_URL + "api/AMLAccounts/balanceSheet", confirmdata, _AccountAdjustment.ConfirmCompleted, userdata.token)
    },

    ConfirmCompleted: function (response) {
        // debugger;
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {

            response.data = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            swal({
                title: "Success",
                text: " Confirmed.........!!!",
                type: "success"
            },



                function () {
                    window.location.reload(true);
                });
        }

        else {
            swal("Error", "Error", "error");

        }


    }
   
}

jQuery(document).ready(function ($) {
    jQuery('#Accounts').select2();
    jQuery('#contra').select2();


    jQuery('#bs_datepicker_container5 input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        endDate: new Date(),
        endDate: '-1d',
        container: '#bs_datepicker_container5'
    }).datepicker("setDate", new Date());

   

    _AccountAdjustment.AccountFill();




       



    jQuery("#Accounts").on('change', function () {
        jQuery('.page - loader - wrapper').show();
        jQuery('#ammounts').val('');
        _AccountAdjustment.DescFill();

    });



        jQuery("#Desc").on('change', function () {
            jQuery('.page - loader - wrapper').show();
            
            _AccountAdjustment.AmountFill();

        });


        jQuery('#btnSaveBank').on('click', function () {
            jQuery('.page - loader - wrapper').hide();

            var Dte = jQuery('#dtToDate').val();
            if (Dte == 0) {
                swal("", "Please Select the Date ", "warning");
                return false;
            }


            var Account = jQuery('#Accounts').val();
            if (Account == 0) {
                swal("", "Please Select the AccountName ", "warning"); 
                 
                      return false;
            }

            var Contra = jQuery('#contra').val();
            if (Contra == 0) {
                swal("", "Please Select the ContraName ", "warning");
                return false;
            }
        
            var Descc = jQuery('#desc').val();
            if (Descc == 0) {
                swal("", "Please Select the Description ", "warning");
                return false;
            }

          
 

            if (jQuery('#ammounts').val() == '') {
                swal("", "Please Enter Amount", "warning");
                return false;
            }

            _AccountAdjustment.Confirmbut();

        });

   
});


