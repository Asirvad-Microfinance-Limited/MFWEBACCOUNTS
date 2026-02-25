var rulesList = new Array();
var SetRuleDetailsSubmits = {
    "userId": 0,
    "ruleId": 0,
    "statusId": 0
}

var _setRules = {
    SetRulesLoadCompleted: function (response) {
        
        jQuery('#maincard').show();

    //    console.log(response.data.rulesList);


        if (response.status === "SUCCESS") {
           
            if (response.data.rulesList.length > 0) {

                rulesList = response['data']['rulesList'];

                //RoleAssignStatusData = [];
                jQuery('#divsetrules').empty();
                var $table = jQuery('<table class="table" id="tblsetrules">');

                $table.append
                    ('<thead><tr> <th style="text-align:center;">#</th><th style="text-align:left;">Rule Name</th><th style="text-align:center;">Select</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.rulesList, function (i, val) {
                    var $row = jQuery('<tr/>');

                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="left">').html(val.ruleName));
                    if (val.statusId == 1) {
                        $row.append(jQuery('<td align="center">').html('<label class="switch"> <input type="checkbox" onchange="_setRules.toggleChecks(' + val.ruleId + ');" checked> <span class="slider round"></span> </label>'));
                    }
                    else {
                        $row.append(jQuery('<td align="center">').html('<label class="switch" > <input type="checkbox" onchange="_setRules.toggleChecks(' + val.ruleId + ');"  id="status' + i + '" name="status' + i + '" > <span class="slider round"></span> </label>'));
                    }
                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divsetrules').html($table);



            } else {
                jQuery('#divsetrules').hide();
                jQuery('#divsetrules').empty();
            }
        } else {
            _General.noData(jQuery('#divsetrules'), "No Data Found");

        }
    },
    SetRuleDetailsLoadCompleted: function (response) {
       
    },
   
    
    RuleDetailsTableFill:  function () {
       
        _http.get(MFPUBLICCUSTOMERAPI_URL + "api/general/ruleslist", _setRules.SetRulesLoadCompleted, userdata.token)

    },

    toggleChecks: function (responseRuleId) {
       
        var userId = userdata.userId;

        swal({
            title: "Are you sure?",
            text: "Do You Want To Change the Active Status!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, Change it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {

                    jQuery.each(rulesList, function (i, val) {
                       
                        if (val.ruleId == responseRuleId) {
                           
                            if (val.statusId == 1) {
                                toggleStatus = 0;
                            }
                            else {
                                toggleStatus = 1;
                            }


                            SetRuleDetailsSubmits.userId = userId;
                            SetRuleDetailsSubmits.ruleId = responseRuleId;
                            SetRuleDetailsSubmits.statusId = toggleStatus;


                        }
                    });
                    _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/rulesupdation", SetRuleDetailsSubmits, _setRules.SetRuleDetailsLoadCompleted, userdata.token)
                    swal("Changed!", "", "success");
                    setTimeout(function () {

                        _setRules.RuleDetailsTableFill();

                    }, 2000);
                }
                else {

                    swal("Cancelled", "", "error");

                    setTimeout(function () {
                        _setRules.RuleDetailsTableFill();
                    }, 2000);

                }
            });


    },
};

_setRules.RuleDetailsTableFill();


//RuleDetailsSubmit: function () {
    //    var userId = userdata.userId;

    //    var RuleDetailsFillData = {
    //        "userId": userId,
    //        "ruleId": 0,
    //        "statusId": 0
    //    };
    //    _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/rulesupdation", RuleDetailsFillData, _setRules.RuleDetailsSubmitLoadCompleted, userdata.token)
    //},