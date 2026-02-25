
var _AddVendorFee = {

    VendorLoad: function () {
        jQuery('.page-loader-wrapper').show();
        var Vendor = {
            "Flag1": "ADDVENDOR",
            "Flag2": "LOADTRADEDEBTOR"

        };
        Vendor = JSON.stringify(Vendor);
        Vendor = { "encryptedRqstStr": EncryptAPIReq(Vendor) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", Vendor, _AddVendorFee.VendorFill, userdata.token)

    },

    VendorFill: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {
                jQuery("#ddlVendor").empty();
                jQuery("#ddlVendor").append(jQuery("<option></option>").val("0").text(" ------------ Choose Vendor  ------------"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlVendor").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }

            else {
                jQuery("#ddlVendor").empty();
                jQuery("#ddlVendor").append(jQuery("<option></option>").val("0").text(" ------------ Select Vendor  ------------"));
            }

        }
        //else if (response.status === "AUTHERROR") {
        //    window.location.href = DOMAIN_URL + "?Id=1";
        //}
        else {

            jQuery("#ddlVendor").empty();
            jQuery("#ddlVendor").append(jQuery("<option></option>").val("0").text(" ------------ Select Vendor  ------------"));
        }
        jQuery('.page-loader-wrapper').hide();

    },



    StateLoad: function () {
        jQuery('.page-loader-wrapper').show();
        var State = {
            "Flag1": "ADDVENDOR",
            "Flag2": "LOADSTATE"

        };
        State = JSON.stringify(State);
        State = { "encryptedRqstStr": EncryptAPIReq(State) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", State, _AddVendorFee.StateFill, userdata.token)

    },

    StateFill: function (response) {

        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.length > 0) {
                jQuery("#ddlState").empty();
                jQuery("#ddlState").append(jQuery("<option></option>").val("0").text(" ------------ Choose State  ------------"));
                jQuery.each(response.data.queryResult, function (i, val) {
                    jQuery("#ddlState").append(jQuery("<option></option>").val(val.param1).text(val.param2));
                });
            }

            else {
                jQuery("#ddlState").empty();
                jQuery("#ddlState").append(jQuery("<option></option>").val("0").text(" ------------ Select State  ------------"));
            }

        }
        //else if (response.status === "AUTHERROR") {
        //    window.location.href = DOMAIN_URL + "?Id=1";
        //}
        else {

            jQuery("#ddlState").empty();
            jQuery("#ddlState").append(jQuery("<option></option>").val("0").text(" ------------ Select State  ------------"));
        }
        jQuery('.page-loader-wrapper').hide();

    },


    GetGST: function () {
        jQuery('.page-loader-wrapper').show();
        jQuery('#gstin-error').hide();
        var val = jQuery('#gstin').val().toUpperCase();
        gststate = parseInt(val.substring(0, 2));
        var GetGSTValue = {
            "gstin": val,
            "consent": "Y",
            "consent_text": "I hereby declare my consent agreement for verifying my data to Asirvad company",
            "firmId": "3",
            "empId": userdata.userId

        };
        GetGSTValue = JSON.stringify(GetGSTValue);
        GetGSTValue = { "encryptedRqstStr": EncryptAPIReq(GetGSTValue) };
        _http.post(MFPUBLICKYCAPI_URL + "api/gst", GetGSTValue, _AddVendorFee.FillGST, userdata.token)

    },
    FillGST: function (response) {
         jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.pradr.em.length > 0) {
               // jQuery('#vendordata').show();
                //jQuery("#vendorName").val(response.data.lgnm);
               // jQuery("#vendorAddress").val(response.data.pradr.adr);
                //jQuery('#gstin').prop("readonly", false);
                //jQuery("#grossGST").val("");
                //jQuery("#grossamt").val("");
                //_AddPayData.gstsplitup(gststate, userdata.branchId,p3);
            //    swal("tfrghyghj");


                var vendor = jQuery("#ddlVendor").val();
                var address = jQuery("#addres").val();
                var state = jQuery("#ddlState").val();
                var gst = jQuery("#gstin").val();

                var datas = vendor + "!!" + address + "!!" + state + "!!" + gst;

                _AddVendorFee.ConfirmReq(datas);

            }
            else {
                //jQuery('#vendordata').hide();
                //jQuery("#gstin").val("");
                //jQuery("#grossGST").val("");
                //jQuery("#grossamt").val("");
                //jQuery("#vendorName").val("");
                //jQuery("#vendorAddress").val("");
                //jQuery('#gstin').prop("readonly", false);
                //swal("NO");

            }
        }
        else {
            swal("GST", "Invalid GSTIN number..!", "error");
            //jQuery('#vendordata').hide();
            //jQuery("#vendorName").val("");
            //jQuery("#vendorAddress").val("");
            //jQuery("#gstin").val("");
            //jQuery("#grossGST").val("");
            //jQuery("#grossamt").val("");
            //jQuery('#gstin').prop("readonly", false);
        }
    },


    ConfirmReq: function (datas) {
        jQuery('.page-loader-wrapper').show();
        var Confirm = {
            "Flag1": "ADDVENDOR",
            "Flag2": "INSERTACCOUNT",
            "inptvar1": datas,
            "inptvar2": userdata.userId

        };
        Confirm = JSON.stringify(Confirm);
        Confirm = { "encryptedRqstStr": EncryptAPIReq(Confirm) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/serivicefeedetails", Confirm, _AddVendorFee.ConfirmData, userdata.token)

    },

    ConfirmData: function (response) {
        // debugger;
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            var str = response.data.queryResult[0].param1;
            //var msg = jQuery.trim(response.data.message);


            if (str == "success") {

                swal({
                    title: str,
                    text: "Account added successfully",
                    type: "success"
                },
                function () {
                    window.location.reload(true);
                });
            }
                 else {
                //var msg = jQuery.trim(response.responseMsg);
                swal({
                    title: "warning",
                    text: str,
                    type: "warning"

                }, function () {
                    window.location.reload(true);
                });
            }

           
            
        }
       

    },


}




jQuery(document).ready(function ($) {


    _AddVendorFee.VendorLoad();

    jQuery('#addres').change(function ($) {

        _AddVendorFee.StateLoad();

    });

    //jQuery('#gstin').change(function ($) {

    //    _AddVendorFee.GetGST();

    //});

    jQuery('#exit').click(function (e) {
        window.location = "Dashboard";
    });


    jQuery('#submit').click(function () {

        var vendor = jQuery("#ddlVendor").val();
        var address = jQuery("#addres").val();
        var state = jQuery("#ddlState").val();
        var gst = jQuery("#gstin").val();

        if (vendor == 0) {
            swal("Please select vendor !!!....", "", "warning");
            return false;
        }
        else if (address == 0) {
            swal("Please enter address !!!....", "", "warning");
            return false;
        }
        else if (state == 0) {
            swal("Please select state !!!....", "", "warning");
            return false;
        }
        else if (gst == 0) {
            swal("Please enter GSTIN !!!....", "", "warning");
            return false;
        }

        else {

            _AddVendorFee.GetGST();

            //var datas = vendor + "!!" + address + "!!" + state + "!!" + gst ;

        }




    });


});
