var checkboxstatus;
var refreshrbiNo="";
var rbiNumber = "";
//var level_Id;
//var levelIdVal = new Array();


var userlistdataResponse;
var rbiNo="";
var LevelDependentId;
var dependentId;
var layerDetailsList;
var pinSerial = "";
var levelId = "0";
var AddOperationalLevelSubmitDatas = {
    "layerId": 0,
    "userId": 0,
    "levelId": 0,
    "levelName": "",
    "address": "",
    "pincode": 0,
    "headId":0,
    "cinNo": "",
    "gstInNo": "",
    "rbiNo": "",
    "pinSerial": 0,
    "statusId": 0,
    "languageId": 0,
    "phone": "",
    "dependentId": 0,
    "email": ""
};
var toggleStatus = 0;
var _operationalSubLevel = {


    OpLevelLoadCompleted: function (response) {
        
     //   console.log(response.data.layersListData);


        if (response.status === "SUCCESS") {
           

            if (response.data.layersListData.length > 0) {
                LevelDependentId = response['data']['layersListData'];
                jQuery("#ddlLevels").empty();
                jQuery("#ddlLevels").append(jQuery("<option></option>").val("0").text("----------- Choose Level -----------"));
                jQuery.each(response.data.layersListData, function (i, val) {
                    jQuery("#ddlLevels").append(jQuery("<option></option>").val(val.layerId).text(val.displayName));
                });
            }
            else {
                jQuery("#ddlLevels").empty();
                jQuery("#ddlLevels").append(jQuery("<option></option>").val("0").text("----------- Choose Level -----------"));
            }

        }
        else {

            jQuery("#ddlLevels").empty();
            jQuery("#ddlLevels").append(jQuery("<option></option>").val("0").text("----------- Choose  Level -----------"));
        }

    },

    OperationalLevelTableCompleted: function (response) {
        
        //console.log(response.data.layerDetailsData);
        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {
            
            //levelIdVal = [];
          //  console.log(response['data']['layerDetailsData'])
            if (response.data.layerDetailsData.length > 0) {
                layerDetailsList = response['data']['layerDetailsData'];
                jQuery('#divoperationalsublevel').empty();
                
                var $table = jQuery('<table class="table " id="tbllayerDetails" >');

                $table.append('<thead ><tr> <th style="text-align:center;">#</th><th style="text-align:center;" >Level ID</th><th style="text-align:left;">Level Name</th><th style="text-align:left;">Head Name</th><th style="text-align:center;">Status</th><th style="text-align:center;">Edit</th></tr></thead>');

                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.layerDetailsData, function (i, val) {
                    //levelIdVal.push(val.levelId);

                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="center">').html(val.levelId));
                    $row.append(jQuery('<td align="left">').html(val.levelName));
                    $row.append(jQuery('<td align="left">').html(val.headName));
                    
                    //$row.append(jQuery('<td />').html('<input type="checkbox" class="switch"/>  <span class="slider round"></span>'));   
                    if (val.statusId == 1) {
                        $row.append(jQuery('<td align="center" >').html('<label class="switch"> <input type="checkbox" onchange="_operationalSubLevel.toggleChecks(' + val.levelId + ',' + i + ');" id="status' + i + '" name="status' + i +'" checked> <span class="slider round"></span> </label>'));
                    }
                    else {
                        $row.append(jQuery('<td align="center" >').html('<label class="switch" > <input type="checkbox" onchange="_operationalSubLevel.toggleChecks(' + val.levelId + ','+ i +');"  id="status' + i + '" name="status' + i +'" > <span class="slider round"></span> </label>'));
                    }
                                      
                    //$row.append(jQuery('<td />').html('<button type="button" onClick="_operationalSubLevel.Edit(' + val.levelId +')" class="btn btn-danger fc-center"> <i class="fa fa-pencil"></i></button> '));                  
                    $row.append(jQuery('<td align="center">').html('<button type="button" data-toggle="modal" data-target="#mediumModal" onClick="_operationalSubLevel.Edit(' + val.levelId +')" class="btnsmall  btn-danger fc-center"> <i class="fa fa-pencil"></i></button> '));                  
    

                      

                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
          


                jQuery('#divoperationalsublevel').html($table);
                jQuery('#tbllayerDetails').DataTable({
                    "aLengthMenu": [[6, 10, 25, 50, 75, -1], [6, 10, 25, 50, 75, "All"]],
                    "iDisplayLength": 6
                });
                jQuery('#tbllayerDetails_wrapper').removeClass('form-inline');
                
            } else {
                jQuery('#divoperationalsublevelHead').hide();
                jQuery('#divoperationalsublevelHead').empty();
            }
        } else {
            
            _General.noData(jQuery('#divoperationalsublevel'), "No Data Found");
        }
    },
    toggleChecks: function (responseLevel,position) {
      

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
                   
                    var layerId = jQuery('#ddlLevels').val();
                    var userId = userdata.userId;
                    jQuery.each(layerDetailsList, function (i, val) {
                        if (val.levelId == responseLevel) {

                            if (val.statusId == 1) {
                                toggleStatus = 0;
                            }
                            else {
                                toggleStatus = 1;
                            }


                            AddOperationalLevelSubmitDatas.layerId = layerId;
                            AddOperationalLevelSubmitDatas.userId = userId;
                            AddOperationalLevelSubmitDatas.levelId = responseLevel;
                            AddOperationalLevelSubmitDatas.levelName = val.levelName;
                            AddOperationalLevelSubmitDatas.address = val.address;
                            AddOperationalLevelSubmitDatas.pincode = val.zipCode;
                            AddOperationalLevelSubmitDatas.headId = val.headId;
                            AddOperationalLevelSubmitDatas.cinNo = val.cinNo;
                            AddOperationalLevelSubmitDatas.gstInNo = val.gstIn;
                            AddOperationalLevelSubmitDatas.rbiNo = val.rbiNo;
                            AddOperationalLevelSubmitDatas.pinSerial = val.pinSerial;
                            AddOperationalLevelSubmitDatas.statusId = toggleStatus;
                            AddOperationalLevelSubmitDatas.languageId = val.languageId;
                            AddOperationalLevelSubmitDatas.phone = val.phoneNo;
                            AddOperationalLevelSubmitDatas.dependentId = val.dependentId;
                            AddOperationalLevelSubmitDatas.txtemail = val.txtemail;


                        }


                    });

                    _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/addsublayers", AddOperationalLevelSubmitDatas, _operationalSubLevel.AddOperationalLevelToggleSubmitCompleted, userdata.token)
                    swal("Changed!", "", "success");

                   
                    setTimeout(function () {
                        //jQuery('#divoperationalsublevel').empty();
                        _operationalSubLevel.OperationalLevelTableFill();
                        //swal("Ajax request finished!");
                    }, 2000);
                } else {

                    
                    swal("Cancelled", "", "error");

                    setTimeout(function () {
                        //jQuery('#divoperationalsublevel').empty();
                        _operationalSubLevel.OperationalLevelTableFill();
                        //swal("Ajax request finished!");
                    }, 2000);

                }
            });

        
       
    },
     
    AddOperationalLevelSubmitCompleted: function (response) {
        
        if (response.status === "SUCCESS") {
         
            
            var type = 'success';
            swal({
                title: response.data.message,
                
                type: type
            });
            _operationalSubLevel.OperationalLevelTableFill();
            

        }
        else {

            swal({
                title: response.data.message,
                //text: response.data.message,
                type: 'error'
            });
        }
      
        jQuery("#mediumModal .close").click();
        //jQuery('.modal').removeClass('show');     
        //jQuery('.modal-backdrop').removeClass('show');     
    },
    AddOperationalLevelToggleSubmitCompleted: function (response) {
        
        

    },
    postOfficeDetailsLoadCompleted: function (response) {
        if (response.status === "SUCCESS") {
          


            if (response.data.postOfficeList.length > 0) {
                postalDetails = response.data.postOfficeList;
                jQuery("#ddlPostOffice").empty();
                jQuery("#ddlPostOffice").append(jQuery("<option></option>").val("0").text(" --------- Choose Post Office --------- "));
                jQuery.each(response.data.postOfficeList, function (i, val) {
                    jQuery("#ddlPostOffice").append(jQuery("<option></option>").val(val.serialNo).text(val.postOfficeName));
                });
            }
            else {
                jQuery("#ddlPostOffice").empty();
                jQuery("#ddlPostOffice").append(jQuery("<option></option>").val("0").text(" --------- Choose Post Office --------- "));
            }
            if (pinSerial != "") {
                jQuery("#ddlPostOffice").val(pinSerial);

            }
            pinSerial = "";
        }
        else {

            jQuery("#ddlPostOffice").empty();
            jQuery("#ddlPostOffice").append(jQuery("<option></option>").val("0").text(" --------- Choose Post Office --------- "));
        }

    },
    Edit: function (LevelID) {
       
        
        jQuery.each(layerDetailsList, function (i, val) {
           
            refreshrbiNo = "";
            if (LevelID == val.levelId) {
                if (val.rbiNo == "NOOFFICECLICKED") {
                    jQuery('#checkBoxQuest').prop("checked", false);
                    jQuery("#rbiNo").val("");
                    jQuery("#rbiNo").prop("disabled", true);

                }
                else {
                    jQuery("#rbiNo").val(val.rbiNo);
                    jQuery("#rbiNo").prop("disabled", false);

                    jQuery('#checkBoxQuest').prop("checked", true);

                }
                jQuery("#levelName").val(val.levelName);
                jQuery("#mobno").val(val.phoneNo);
                jQuery("#ddlLanguage").val(val.languageId);
                jQuery("#address").val(val.address);
                jQuery("#cinNo").val(val.cinNo);
                jQuery("#gstIn").val(val.gstIn);
                //jQuery("#rbiNo").val(val.rbiNo);
                if (val.zipCode != 0) {

                    jQuery("#pincode").val(val.zipCode);
                }
                else {
                    jQuery("#pincode").val("");
                }
                jQuery("#ddlDependentID").val(val.dependentId);
                jQuery("#head").val(val.headId);
                jQuery("#headName").val(val.headName);
                jQuery("#txtemail").val(val.email);
                levelId = val.levelId;
                pinSerial = val.pinSerial;
                _operationalSubLevel.postOfficeDetails();
                

            }

        });
        _operationalSubLevel.changePopupHeader(0);

    },

    languageLoadCompleted: function (response) {
        if (response.status === "SUCCESS") {
           


            if (response.data.languages.length > 0) {

                jQuery("#ddlLanguage").empty();
                jQuery("#ddlLanguage").append(jQuery("<option></option>").val("0").text(" --------- Choose Language --------- "));
                jQuery.each(response.data.languages, function (i, val) {
                    jQuery("#ddlLanguage").append(jQuery("<option></option>").val(val.languageId).text(val.language));
                });
            }
            else {
                jQuery("#ddlLanguage").empty();
                jQuery("#ddlLanguage").append(jQuery("<option></option>").val("0").text(" --------- Choose Language --------- "));
            }

        }
        else {

            jQuery("#ddlLanguage").empty();
            jQuery("#ddlLanguage").append(jQuery("<option></option>").val("0").text(" --------- Choose Language --------- "));


        }
    },

    

    headNameLoad: function (response) {
        if (response.status === "SUCCESS") {
            
            var userName = response.data.userName;
            jQuery("#headName").val(userName);

          //  alert(response.data.message);
        }
        else {
           // alert(response.data.message);
            swal("","No User Data Found","")
        }
    },

    userSearchModalTableCompleted: function (response) {
        
       // console.log(response.data.usersList);

        if (response.status === "SUCCESS") {
            
            if (response.data.usersList.length > 0) {
                userlistdataResponse = response['data']['usersList'];
               // console.log(userlistdataResponse);
                jQuery('#userListTable').empty();
                var $table = jQuery('<table class="table" id="tblUserSearch"  style="width="100%";">');
                
                
                var $tbody = jQuery('<tbody >');

                jQuery.each(response.data.usersList, function (i, val) {
                   
                    var $row = jQuery('<tr/>');

                    //$row.append(jQuery('<td/>').html(i + 1));
                    $row.append(jQuery('<td/>').html(val.userId));
                    $row.append(jQuery('<td/>').html(val.userName));
                   

                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#userListTable').html($table);



            } else {
                jQuery('#userListTable').hide();
                jQuery('#userListTable').empty();
            }
        } else {
            
            _General.noData(jQuery('#userListTable'),"No Data Found")
        }
    },
    dependentLoadCompleted: function (response) {
        if (response.status === "SUCCESS") {
            


            if (response.data.layerDetailsData.length > 0) {

                jQuery("#ddlDependentID").empty();
                jQuery("#ddlDependentID").append(jQuery("<option></option>").val("0").text(" --------- Choose Dependent ID --------- "));
                jQuery.each(response.data.layerDetailsData, function (i, val) {
                    jQuery("#ddlDependentID").append(jQuery("<option></option>").val(val.levelId).text(val.levelName));
                });
            }
            else {
                jQuery("#ddlDependentID").empty();
                jQuery("#ddlDependentID").append(jQuery("<option></option>").val("0").text(" --------- Choose Dependent ID --------- "));
            }

        }
        else {

            jQuery("#ddlDependentID").empty();
            jQuery("#ddlDependentID").append(jQuery("<option></option>").val("0").text(" --------- Choose Dependent ID --------- "));


        }
    },

    OpLevelFill: function () {
      
    
        var OpLevelFillData = {

            "typeId": 1    //for operational sublevel
        };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/layerslist", OpLevelFillData, _operationalSubLevel.OpLevelLoadCompleted, userdata.token)

    },

    OperationalLevelTableFill: function () {
        
        var layerId = parseInt(jQuery('#ddlLevels').val()); 
        var OperationalLevelTableFillData = {

            "layerId": layerId
        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/layerdetails", OperationalLevelTableFillData, _operationalSubLevel.OperationalLevelTableCompleted, userdata.token)
    },

    AddOperationalLevelSubmit: function () {
     
        refreshrbiNo = "";
        var layerId = jQuery('#ddlLevels').val();
        var userId = userdata.userId;
        if (jQuery('#checkBoxQuest').is(':checked')) {
           rbiNumber=jQuery('#rbiNo').val();

        }
        else {
            rbiNumber = "NoOfficeClicked";

        }
        if (jQuery('#pincode').val() != "") {
            var pincodeTxtData = jQuery('#pincode').val();
        }
        else {
            var pincodeTxtData = "0";
        }

        var AddOperationalLevelSubmitData = {
                    "layerId": layerId,
                    "userId": userId,
                    "levelId": levelId,
                    "levelName": jQuery('#levelName').val(),
                    "address": jQuery('#address').val(),
                    "pincode": parseInt(pincodeTxtData),
                    "headId": jQuery('#head').val(),
                    "cinNo": jQuery('#cinNo').val(),
                    "gstInNo": jQuery('#gstIn').val(),
                    //"rbiNo": jQuery('#rbiNo').val(),
                    "rbiNo": rbiNumber,
                    "pinSerial": parseInt(jQuery('#ddlPostOffice').val()),
                    "statusId": 1,
                    "languageId": jQuery('#ddlLanguage').val(),
                    "phone": jQuery('#mobno').val(),
                    "dependentId": jQuery('#ddlDependentID').val(),
                    "email": jQuery('#txtemail').val(),

         
        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/addsublayers", AddOperationalLevelSubmitData, _operationalSubLevel.AddOperationalLevelSubmitCompleted, userdata.token)
        
    },
    


    postOfficeDetails: function () {
        
        var postOfficeDetailsData = {
            "typeId": 1,
            "typeValue": parseInt(jQuery('#pincode').val())
        };
        _http.post(MFPUBLICLOSAPI_URL + "api/centers/postofficelist", postOfficeDetailsData, _operationalSubLevel.postOfficeDetailsLoadCompleted, userdata.token)

    },

    languageFill: function () {
        

        _http.get(MFPUBLICLOSAPI_URL + "api/loans/languages", _operationalSubLevel.languageLoadCompleted, userdata.token)

    },
     headNameDetails: function () {
         
         var layerId = jQuery('#ddlLevels').val();
         var userId = jQuery('#head').val();
         var headNameDetailsData = {
             "layerId": layerId,
             "userId": userId
        };
         _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/username", headNameDetailsData, _operationalSubLevel.headNameLoad, userdata.token)

    },
    clearForm: function () {
        

        jQuery("#frmOperationalAddSubLevel")[0].reset();
        //jQuery("#frmOperationalSubLevel")[0].reset();
        jQuery("#ddlPostOffice").empty();
        jQuery("#ddlPostOffice").append(jQuery("<option></option>").val("0").text(" --------- Select --------- "));
        //jQuery("#ddlPostOffice").append(jQuery("<option></option>").val("0").text(" --------- Select --------- "));

        var validator = jQuery("#frmOperationalAddSubLevel").validate();
        levelId = "0";
        validator.resetForm();

    },
   
    userSearchModal: function () {
        
        var layerId = jQuery('#ddlLevels').val();
        var userSearchData = {
            "layerId": layerId,
           
        };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/userslist", userSearchData, _operationalSubLevel.userSearchModalTableCompleted, userdata.token)
    },
    dependentDataDetails: function () {
         
        
        var layerId = jQuery('#ddlLevels').val();
        jQuery.each(LevelDependentId, function (i, val) {
            if (val.layerId == layerId) {
                dependentId = val.dependedId;
            }
        });
        var dependentData = {
            "layerId": dependentId,

        };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/layers/layerdetails", dependentData, _operationalSubLevel.dependentLoadCompleted, userdata.token)
    },
    

    changePopupHeader: function (type) {
        
        jQuery("#mediumModal").modal('show');
        

        if (type == 1) {
            
            _operationalSubLevel.postOfficeDetails();
            //jQuery("#rbiNo").prop("disabled", false);

            jQuery('#mediumModalLabel').text('Add Operational Sublevel ');
           
        }
        else {
            //jQuery("#rbiNo").val("");
            //jQuery("#rbiNo").prop("disabled", true);

            jQuery('#mediumModalLabel').text('Edit Operational Sublevel');
        }


       
    }
   
}

_operationalSubLevel.OpLevelFill();
_operationalSubLevel.languageFill();


jQuery(document).ready(function ($) {



    jQuery('.error').addClass("error-msg");
    jQuery('#maincard').hide();
   
        jQuery("#addBtnClick").click(function (e) {
           

            jQuery("#rbiNo").prop("disabled", false);

        });
    if (jQuery('#checkBoxQuest').prop("checked") == true) {
        
        
        jQuery("#rbiNo").prop("disabled", false);
       
    }
    else {
       
        jQuery("#rbiNo").val("");
        jQuery("#rbiNo").prop("disabled", true);
      
    }
    jQuery("#pincode").change(function (e) {
        
        
                _operationalSubLevel.postOfficeDetails();

          

    });

    jQuery("#ddlLevels").change(function (e) {
       
        pinSerial = "";
        levelId = "0";
        _operationalSubLevel.OperationalLevelTableFill();
        _operationalSubLevel.dependentDataDetails();

    });
    jQuery("#head").change(function (e) {
        
        _operationalSubLevel.headNameDetails();

    });
    jQuery("#userSearchbtn").click(function (e) {
        
        
        _operationalSubLevel.userSearchModal();

    });
    

    jQuery('#userListTable').on('dblclick', 'td', function () {
        
        var userclick = $(this).text();
        jQuery.each(userlistdataResponse, function (i, val) {

            if ((val.userId == userclick) || (val.userName == userclick)) {

                jQuery('#head').val(val.userId);
                jQuery('#headName').val(val.userName);

            }
        });


       
    });
    jQuery("#pincode").keyup(function (e) {
        if (/\D/g.test(this.value)) {

            this.value = this.value.replace(/\D/g, '');
        }
    });

    jQuery("#mobno").keyup(function (e) {
        if (/\D/g.test(this.value)) {

            this.value = this.value.replace(/\D/g, '');
        }
    });

    jQuery.validator.addMethod('ddlLanguage', function (value, element) {

        return (value != '0');
    }, 'Please Select Language');
    jQuery.validator.addMethod('ddlPostOffice', function (value, element) {

        return (value != '0');
    }, 'Please Select Post Office');
    jQuery.validator.addMethod('ddlDependentId', function (value, element) {

        return (value != '0');
    }, 'This Field Is Required');

    jQuery.validator.addMethod("Namevalid", function (value, element) {
        //return this.optional(element) || /^[a-zA-Z0-9]+$/i.test(value);
        return this.optional(element) || /^[a-zA-Z0-9\s]+$/i.test(value);

    }, "Please enter valid name");

    jQuery.validator.addMethod("cinnoval", function (value, element) {
        return this.optional(element) || /^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/i.test(value);
    }, "Please enter valid CIN Number");

    jQuery.validator.addMethod("gstnoval", function (value, element) {
        return this.optional(element) || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value);
    }, "Please Enter Valid GSTIN");

    jQuery.validator.addMethod("rbinoval", function (value, element) {
        return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
    }, "Please enter valid RBI Number");

    jQuery.validator.addMethod("validatephonenumber", function (value, element) {
        return this.optional(element) || /^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/.test(value);
    }, "Please Enter Valid Mobile Number");
    jQuery.validator.addMethod("emailvalid", function (value, element) {
        return this.optional(element) || /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i.test(value);
    }, "Please Enter Valid E-mail ID");

    //jQuery.validator.addMethod("validateemailid", function (value, element) {
    //    return this.optional(element) || /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    //}, "Please Enter Valid E-mail ID");

    jQuery("#frmOperationalAddSubLevel").validate({

       
        messages:
        {
            levelId: {
                required: "Please Enter ID"

            },
            levelName: {
                required: "Please Enter Name"

            },
            address: {
                required: "Please Enter Address"

            },
            cinNo: {
                required: "Please Enter CIN Number"

            },

            gstIn: {
                required: "Please Enter GST Number"

            },

            rbiNo: {
                required: "Please Enter RBI Number"

            },

            pincode: {
                required: "Please Enter Pincode"

            },
            dependentId: {
                required: "Please Enter Dependent ID"

            },
            head: {
                required: "Please Enter Head"

            },
            headName: {
                required: "Please Enter Head Name"

            },
            mobno: {
                required: "Please Enter Mobile Number"

            },
            txtemail: {
                required: "Please Enter E-mail ID"

            },
        },


        submitHandler: function (form) {
           
            _operationalSubLevel.AddOperationalLevelSubmit();


        }
                

    });
    

    addRules(checkboxClickTrue);

});


var checkboxClickTrue = {

    levelId: {
        required: true
    },
    levelName: {
        required: true,
        Namevalid: true,
        maxlength: 25,
    },
    ddlLanguage: {
        required: true,
        ddlLanguage: true
    },
    ddlDependentID: {
        required: true,
        ddlDependentId: true,
    },
    address: {
        required: true,
        maxlength: 150,
    },
    mobno: {
        required: true,
        validatephonenumber: true,

    },

    cinNo: {
        required: true,
        cinnoval: true,
    },
    gstIn: {
        required: true,
        gstnoval: true,
    },
    rbiNo: {
        required: true,
        rbinoval: true,
    },
    pincode: {
        required: true
    },
    ddlPostOffice: {
        required: true,
        ddlPostOffice: true
    },
    dependentId: {
        required: true,

    },
    head: {
        required: true,
    },
    headName: {
        required: true
    },
    txtemail: {
        required: true,
        emailvalid: true
    }


};


var checkboxClickFalse = {
    levelId: {
        required: true
    },
    levelName: {
        required: true,
        Namevalid: true,
        maxlength: 25,
    },
    ddlLanguage: {
        required: true,
        ddlLanguage: true
    },
    ddlDependentID: {
        required: true,
        ddlDependentId: true,
    },
    txtemail: {
        required: true,
        emailvalid: true
    },
    mobno: {
        required: true,
        validatephonenumber: true,

    },

};

jQuery('#checkBoxQuest').change(function () {
    jQuery('.error').attr("error-msg");
    jQuery('.error-msg').css("display", "none");
    //jQuery('.error').removeClass("error");
    
    
            if (jQuery(this).prop("checked") == true) {
                
                //level_Id = jQuery("#levelId").val();
                //_operationalSubLevel.Edit(levelIdVal[i]);
                if (refreshrbiNo!="") {
                    jQuery("#rbiNo").val(refreshrbiNo);
                }
                jQuery("#rbiNo").prop("disabled", false);
                removeRules(checkboxClickFalse);
                addRules(checkboxClickTrue);
                
          
            }
            else {
               
                refreshrbiNo = jQuery("#rbiNo").val();

                jQuery("#rbiNo").val("");
                jQuery("#rbiNo").prop("disabled", true);
                removeRules(checkboxClickTrue);
                addRules(checkboxClickFalse);
    }
});
function addRules(rulesObj) {
    
    for (var item in rulesObj) {
       jQuery('#' + item).rules('add', rulesObj[item]);
    }
}
function removeRules(rulesObj) {
   

    for (var item in rulesObj) {
       jQuery('#' + item).rules('remove');
    }
}