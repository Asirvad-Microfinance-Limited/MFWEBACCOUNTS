var generalParamsResponse;
var statusID;
var _setGeneralParams = {
    ParameterFillLoadCompleted: function (response) {
       
      

        if (response.status === "SUCCESS") {
           

            if (response.data.generalParameterList.length > 0) {
                generalParamsResponse = response.data.generalParameterList;
                jQuery("#ddlparameter").empty();
                jQuery("#ddlparameter").append(jQuery("<option></option>").val("0").text(" ---------- Choose Parameter ---------- "));
                jQuery.each(response.data.generalParameterList, function (i, val) {
                    jQuery("#ddlparameter").append(jQuery("<option></option>").val(val.paramId).text(val.paramName));
                });
            }
            else {

                jQuery("#ddlparameter").empty();
                jQuery("#ddlparameter").append(jQuery("<option></option>").val("0").text(" ---------- Choose Parameter ---------- "));
            }

        }
        else {

            jQuery("#ddlparameter").empty();
            jQuery("#ddlparameter").append(jQuery("<option></option>").val("0").text(" ---------- Choose Parameter ---------- "));
        }

    },

    SetGeneralParamsSubmitCompleted: function (response) {
        if (response.status === "SUCCESS") {
            
            //swal("", response.data.message, "success");
            //jQuery("#txtValue").val("");
            //_setGeneralParams.parameterFill();

            swal({
                title: "Are you sure?",
                text: "Do you want to change parameter value",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0aa812",
                cancelButtonColor: "#0aa812",
                confirmButtonClass: "btn btn-primary",
                confirmButtonText: "Change",
                cancelButtonClass: "btn-danger",
                cancelButtonText: "Cancel",
                closeOnConfirm: false,
                closeOnCancel: true
            },
                function (isConfirm) {
                    if (isConfirm) {

                        _setGeneralParams.parameterFill();
                        jQuery("#txtValue").val("");
                        swal("", response.data.message, "success");
                    } else {

                        
                    }
                });
        }
        else {
            swal(response.data.message, "", "error");
        }

    },

    parameterFill: function () {
        
        _http.get(MFPUBLICLOSAPI_URL + "api/meetings/generalparameterlist", _setGeneralParams.ParameterFillLoadCompleted, userdata.token)
    },

    SetGeneralParamsSubmit: function () {
    

        var SetGeneralParamsSubmitData = {
            "paramId": jQuery("#ddlparameter").val(),
            "paramName": jQuery("#ddlparameter").find("option:selected").text(),
            "paramValue": jQuery("#txtValue").val(),
            "statusId": statusID, 
            "userId": userdata.userId
        };

        _http.post(MFPUBLICLOSAPI_URL + "api/meetings/generalparameter", SetGeneralParamsSubmitData, _setGeneralParams.SetGeneralParamsSubmitCompleted, userdata.token)
    },

    showValue: function (paramId) {
       
        
        jQuery.each(generalParamsResponse ,function (i, val) {

            if (val.paramId == paramId) {

                jQuery("#txtValue").val(val.paramValue);
                statusID = val.statusId;
            }
        });
        
        
    },

};

_setGeneralParams.parameterFill();


jQuery(document).ready(function ($) {

    jQuery('.error').addClass("error-msg");
    jQuery('#maincard').hide();


    jQuery("#ddlparameter").change( function (e) {
       
        _setGeneralParams.showValue(jQuery("#ddlparameter").val());

    });

   
});