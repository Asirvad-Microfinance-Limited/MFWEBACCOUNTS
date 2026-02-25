var slNoRestrited = new Array()
var BlackListValueRestrited = new Array()
var _RestrictMemberCreation = {

    fillRestrictTypeLoadCompleted: function (response) {
       
        

        if (response.status === "SUCCESS") {

            
            if (response.data.restrictTypeList.length > 0) {
                jQuery("#ddlRestricttype").empty();
                jQuery("#ddlRestricttype").append(jQuery("<option></option>").val("0").text("----- Choose Restrict Type -----"));
                jQuery.each(response.data.restrictTypeList, function (i, val) {
                    jQuery("#ddlRestricttype").append(jQuery("<option></option>").val(val.typeId).text(val.typeName));
                });
            }
            else {
                jQuery("#ddlRestricttype").empty();
                jQuery("#ddlRestricttype").append($("<option></option>").val("0").text("----- Choose Restrict Type -----"));
            }

        }
        else {
           
            jQuery("#ddlRestricttype").empty();
            jQuery("#ddlRestricttype").append($("<option></option>").val("0").text("----- Choose Restrict Type -----"));
        }

    },

    StateLoadCompleted: function (response) {
        


        if (response.status === "SUCCESS") {

           
            if (response.data.stateList.length > 0) {
                jQuery("#ddlPopCombo").empty();
                jQuery("#ddlPopCombo").append(jQuery("<option></option>").val("0").text(" ----- Choose State -----"));
                jQuery.each(response.data.stateList, function (i, val) {
                    jQuery("#ddlPopCombo").append(jQuery("<option></option>").val(val.stateId).text(val.stateName));
                });
            }
            else {
                jQuery("#ddlPopCombo").empty();
                jQuery("#ddlPopCombo").append(jQuery("<option></option>").val("0").text(" ----- Choose State -----"));
            }

        }
        else {
       
            jQuery("#ddlPopCombo").empty();
            jQuery("#ddlPopCombo").append(jQuery("<option></option>").val("0").text(" ----- Choose State -----"));
        }

    },
    LevelBranchesLoadCompleted: function (response) {
      


        if (response.status === "SUCCESS") {

          
            if (response.data.levelBranchList.length > 0) {
                jQuery("#ddlPopCombo").empty();
                jQuery("#ddlPopCombo").append(jQuery("<option></option>").val("0").text(" ----- Choose Branch ----- "));
                jQuery.each(response.data.levelBranchList, function (i, val) {
                    jQuery("#ddlPopCombo").append(jQuery("<option></option>").val(val.branchId).text(val.branchName));
                });
            }
            else {
                jQuery("#ddlPopCombo").empty();
                jQuery("#ddlPopCombo").append(jQuery("<option></option>").val("0").text(" ----- Choose Branch ----- "));
            }

        }
        else {
           
            jQuery("#ddlPopCombo").empty();
            jQuery("#ddlPopCombo").append(jQuery("<option></option>").val("0").text(" ----- Choose Branch ----- "));
        }

    },
    RestrictedMemberFillLoadCompleted: function (response) {
        jQuery('#maincard').show();
    


       
        if (response.status === "SUCCESS" && response.data.restrictList.length > 0) {
            if (response.data.restrictList.length > 0) {
                slNoRestrited = [];
                BlackListValueRestrited = [];
                jQuery('#DivRestrictedMemberTable').empty();
                var $table = jQuery('<table class="table" id="tblRestrictedApp">');

                $table.append('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:left;">Block Name</th><th style="text-align:center;">Blocked From</th><th style="text-align:left;">Blocked By</th><th style="text-align:center;">Select</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.restrictList, function (i, val) {
                    slNoRestrited.push(val.slno);
                    BlackListValueRestrited.push(val.blockName);
                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="left">').html(val.blockName));
                    $row.append(jQuery('<td align="center">').html(val.blockedFrom));
                    $row.append(jQuery('<td align="left">').html(val.blockedBy));
                    if (val.statusId == 1) {

                        $row.append(jQuery('<td align="center">').html('<input type="button" style="font-size: 11px;width:60px;" class="btnsmall btn-success fc-center" onClick="_RestrictMemberCreation.editAlreadyRestricted(' + i + ','+ 0 + ' );" id="submitprint" name="submitprint" value="Unblock"/>'));
                    }
                    else {

                        $row.append(jQuery('<td align="center">').html('<input type="button" style="font-size: 11px;width:60px;" class="btnsmall btn-danger fc-center" onClick="_RestrictMemberCreation.editAlreadyRestricted(' + i +','+ 1 + ');" id="submitprint" name="submitprint" value="Block"/>'));
                    }

                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#DivRestrictedMemberTable').html($table);
                jQuery('#tblRestrictedApp').DataTable({
                    "aLengthMenu": [[8, 10, 25, 50, 75, -1], [8, 10, 25, 50, 75, "All"]],
                    "iDisplayLength": 8
                });
                jQuery('#tblRestrictedApp_wrapper').removeClass('form-inline');
            } else {
                jQuery('#DivRestrictedMemberTable').hide();
                jQuery('#DivRestrictedMemberTable').empty();
            }
        } else {
            _General.noData(jQuery('#DivRestrictedMemberTable'), "No Data Found");
        }
    },

    AddNewRestictionLoadCompleted: function (response) {
       
       
      
        if (response.status === "SUCCESS") {
           
            swal(response.responseMsg, "", "success");
            jQuery('#txtPop').val();
            jQuery('#mediumModal').modal('hide');

        }

        _RestrictMemberCreation.RestrictedMemberFill();
    },

    fillRestrictType: function () {

        _http.get(MFPUBLICLOSAPI_URL + "api/members/restricttype", _RestrictMemberCreation.fillRestrictTypeLoadCompleted, userdata.token)


    },

    RestrictedMemberFill: function () {
       
        var typeId = jQuery('#ddlRestricttype').val();

        var RestrictedMemberData = {

            "typeId": typeId


        };

        _http.post(MFPUBLICLOSAPI_URL + "api/members/restrictlist", RestrictedMemberData, _RestrictMemberCreation.RestrictedMemberFillLoadCompleted, userdata.token)

    },


    fillpopform: function () {
        
        if (jQuery("#ddlRestricttype").val() == 1) {

            jQuery("#txtPop").show();
            jQuery("#txtPop").attr("placeholder", "Pincode");
            jQuery("#txtPop").attr("maxlength", "6");
            jQuery("#txtPop").attr("minlength", "6");
            jQuery('.error').addClass('error-msg');
            jQuery('#txtPop').removeClass('error-msg');

            jQuery("#txtPop").keyup(function (e) {
                
                if (/\D/g.test(this.value)) {


                    this.value = this.value.replace(/\D/g, '');
                }
            });
        }
        else if (jQuery("#ddlRestricttype").val() == 2 ) {

            jQuery("#ddlPopCombo").show();
            var BranchDAta = {

                accessLevelId: userdata.accessLevelId,
                userId: userdata.userId
            }

            _http.post(MFPUBLICLOSAPI_URL + "api/members/levelbranches", BranchDAta, _RestrictMemberCreation.LevelBranchesLoadCompleted, userdata.token)
        }
        else if (jQuery("#ddlRestricttype").val() == 3){
            
            jQuery("#txtPop").show();

            jQuery("#txtPop").attr("placeholder", "Name");
           
            jQuery("#txtPop").keyup(function (e) {
               jQuery('#txtPop-error').hide();
                var yourInput = jQuery(this).val();
                re = /[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]/\\0-9]/gi;
                var isSplChar = re.test(yourInput);
                if (isSplChar) {
                    var no_spl_char = yourInput.replace(/[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]/\\0-9]/gi, '');
                    jQuery(this).val(no_spl_char);

                }
            });

            
            
        }
        else if (jQuery("#ddlRestricttype").val() == 4) {

            jQuery("#ddlPopCombo").show();
            var BranchDAta = {

                accessLevelId: userdata.accessLevelId,
                userId: userdata.userId
            }

            _http.post(MFPUBLICLOSAPI_URL + "api/members/levelbranches", BranchDAta, _RestrictMemberCreation.LevelBranchesLoadCompleted, userdata.token)
        }
        else if (jQuery("#ddlRestricttype").val() == 5) {

            jQuery("#ddlPopCombo").show();
            _http.get(MFPUBLICLOSAPI_URL + "api/members/statelist", _RestrictMemberCreation.StateLoadCompleted, userdata.token)
        }

        

    },

    loadpopwindow: async function (i) {
        
        jQuery("#divloadpartial").load(DOMAIN_URL + "restrictmembercreationview", function (response) {
       

            
            if (jQuery("#ddlRestricttype").val() != 0) {

                jQuery("#mediumModal").modal('show');
                _RestrictMemberCreation.fillpopform();

            }
            

        });
    },

    AddNewRestiction: function (i) {
      
        var typeId = jQuery('#ddlRestricttype').val();
        var blackListValue = "";
        var slNo = i;
        var statusId = 1;
        if (typeId == 1) {
            var blackListValue = jQuery('#txtPop').val().toString();
        }
        else if (typeId == 2) {

            var blackListValue = jQuery('#ddlPopCombo').val().toString();
        }
        else if (typeId == 3) {
            var blackListValue = jQuery('#txtPop').val().toString();
        }
        else if (typeId == 4) {
            var blackListValue = jQuery('#ddlPopCombo').val().toString();;
        }
        else {
            var blackListValue = jQuery('#ddlPopCombo').val().toString();
        }
       
       
        if ((blackListValue == "") || (blackListValue == "0") || (typeId == 1 && blackListValue.length != "6")) {
           
            //if (blackListValue == 0) {
            
            jQuery('#txtPop-error').text("This field is required");
            jQuery('.error').addClass('error-msg');
            jQuery('#txtPop').removeClass('error-msg');

          
        }
        else {
            jQuery('#txtPop-error').hide();

            var AddNewRestictionData = {

                "typeId": typeId,
                "blackListValue": blackListValue,
                "slNo": slNo,
                "userId": userdata.userId,
                "statusId": statusId

            };

            _http.post(MFPUBLICLOSAPI_URL + "/api/meetings/restrictmembers", AddNewRestictionData, _RestrictMemberCreation.AddNewRestictionLoadCompleted, userdata.token)
        }

       
        
       

    },

    editAlreadyRestricted: async function (i,restrictVal) {
     
        var slNo = slNoRestrited[i];
        var blackListValue = BlackListValueRestrited[i];
        var typeId = jQuery('#ddlRestricttype').val();
        var EditRestictionData = {

            "typeId": typeId,
            "blackListValue": blackListValue,
            "slNo": slNo,
            "userId": userdata.userId,
            "statusId": restrictVal


        };

        _http.post(MFPUBLICLOSAPI_URL + "/api/meetings/restrictmembers", EditRestictionData, _RestrictMemberCreation.AddNewRestictionLoadCompleted, userdata.token)
        
    },
}


_RestrictMemberCreation.fillRestrictType();


jQuery(document).ready(function ($) {
   
    jQuery('.error').addClass("error-msg");
    jQuery('#maincard').hide();
   
    jQuery("#ddlRestricttype").change(function (e) {
        jQuery("#txtPop").hide();
        jQuery("#ddlPopCombo").hide();
        _RestrictMemberCreation.RestrictedMemberFill();

    });

    
   
});