

var OperationalList = {
    "layerId": 0,
    "layerName": "string",
    "displayName": "string",
    "preName": "string",
    "startWith": 0
};
var counts=0;
var leveldtls = [];
var displayName;

var _operationalLevel = {
    //OpLevelLoadCompleted: func_operationalLeveltion (response) {
    //   
    //    console.log(response.data.layersListData);


    //    if (response.status === "SUCCESS") {
    //        
    //        if (response.data.layersListData.length > 0) {
    //            jQuery("#ddlOpLevel").empty();
    //            jQuery("#ddlOpLevel").append(jQuery("<option></option>").val("0").text("-- Choose Operation Level --"));
    //            jQuery.each(response.data.layersListData, function (i, val) {
    //                jQuery("#ddlOpLevel").append(jQuery("<option></option>").val(val.layerId));
    //            });
    //        }
    //        else {
    //            jQuery("#ddlOpLevel").empty();
    //            jQuery("#ddlOpLevel").append(jQuery("<option></option>").val("0").text("-- Choose Operation Level --"));
    //        }

    //    }
    //    else {

    //        jQuery("#ddlOpLevel").empty();
    //        jQuery("#ddlOpLevel").append(jQuery("<option></option>").val("0").text("--Choose Operation Level --"));
    //    }

    //},
    OperationalLevelTableCompleted: function (response) {
       
        if (response.status === "SUCCESS") {
           
            //console.log(response['data']['layerDetailsData']);
            jQuery('#maincard').show();
            if (response.data.layerDetailsData.length > 0) {
                OperationalLevelData = [];
              
                jQuery('#divoperationallevel').empty();
                var $table = jQuery('<table class="table">');

                $table.append('<thead><tr><th>Display Name</th><th>ID Pre-Character If Required</th><th>Begin With</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.layerDetailsData, function (i, val) {
                   
                    OperationalLevelData.push(val.layerId);
                 
                    var $row = jQuery('<tr/>');
                    var preChars = "";
                    var dispNameVal = "";
                    var startWithVal = "";
                    if (val.displayName == null) {

                        dispNameVal = "";
                    }
                    else {
                        dispNameVal = val.displayName;
                    }
                    if (val.preChar == null) {
                        preChars = "";
                    }
                    else {
                        preChars = val.preChar;
                    }
                    if (val.startWith == null) {
                        startWithVal = "";
                    }
                    else {
                        startWithVal = val.startWith;
                    }
                    $row.append(jQuery('<td/>').html('<input type="text"  class="form-control" value="' + val.displayName + '"  id="displayNameId' + i + '"   name="displayNameId' + i + '" maxlength="20" required="required" /><label id="displayNameId' + i + '-error" class="error" for="displayNameId' + i + '" style="display:block;" ></label>') ); 
                    $row.append(jQuery('<td/>').html('<input type="text"  class="form-control" value="' + preChars + '"  id="preCharacterId' + i + '"  name="preCharacterId' + i + '" maxlength="3"  /><label id="preCharacterId' + i + '-error" class="error" for="preCharacterId' + i + '" style="display:block;" ></label>')); 
                    $row.append(jQuery('<td/>').html('<input type="text"  class="form-control"  value="' + val.startWith + '" id="beginId' + i + '"  name="beginId' + i + '"  maxlength="4" required="required"/> <label id="beginId' + i + '-error" class="error" for="beginId' + i + '" style="display:block;" ></label>')); 
                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divoperationallevel').html($table);
            } else {
                jQuery('#divoperationallevel').hide();
                jQuery('#divoperationallevel').empty();
            }
        } else {
            _General.noData(jQuery('#divoperationallevel'), "No Data Found")
            //_loanApplication.noData($('#policyReportDiv'), "No Policy Found");
        }
        jQuery('.error').addClass("error-msg");
    },
    OperationalLevelSubmitCompleted: function (response) {
        if (response.status === "SUCCESS") {
           

            swal(response.data.message, "", "success");
        }
        else {
            swal(response.data.message, "", "error");
        }
        
        jQuery('#ddlOpLevel').val(0);
       
        jQuery('#divoperationallevel').empty();
    },
    

    OperationalLevelTableFill:  function () {
        
      
        var layerId = jQuery("#ddlOpLevel").val();
        var OperationalLevelTableFillData = {

            "layerId": layerId
        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/layerdetailslist", OperationalLevelTableFillData, _operationalLevel.OperationalLevelTableCompleted, userdata.token)

    },
    OperationalLevelSubmitFill: function () {
            
        for (i = 0; i < OperationalLevelData.length; i++) {
           
          
            displayName = jQuery('#displayNameId' + i).val();
            preChar = jQuery('#preCharacterId' + i).val();
            beginWith = jQuery('#beginId' + i).val();
            layerName = jQuery('#displayNameId' + i).val();

            OperationalList.layerId = OperationalLevelData[i];
            OperationalList.layerName = jQuery('#displayNameId' + i).val();
            OperationalList.displayName = jQuery('#displayNameId' + i).val();
            OperationalList.preName = jQuery('#preCharacterId' + i).val();
            OperationalList.startWith = jQuery('#beginId' + i).val();
           
           
            leveldtls.push(OperationalList);
            OperationalList = {};
        }
       var userId = userdata.userId;
      
       var OperationalLevelSubmitData = {

           "userId": userId,
           "layerDetails": leveldtls
        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/layers", OperationalLevelSubmitData, _operationalLevel.OperationalLevelSubmitCompleted, userdata.token)

    },
    NumberCheck: function () {
        
    if (/\D/g.test(this.value)) {
    this.value = this.value.replace(/\D/g, '');
    }
    }

    }


//_operationalLevel.OpLevelFill();

jQuery(document).ready(function ($) {
   
    jQuery('#maincard').hide();
    jQuery('.error').addClass("error-msg");
    

    jQuery("#ddlOpLevel").change(function (e) {
      
        if ($(this).val() != 0) {

            _operationalLevel.OperationalLevelTableFill();
        }
        else {
            jQuery('#divoperationallevel').empty();
        }

    });
  
});


