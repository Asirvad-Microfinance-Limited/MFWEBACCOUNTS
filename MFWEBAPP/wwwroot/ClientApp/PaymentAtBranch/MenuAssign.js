var _ModuledataDetails = {


    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var CheckAccess = {
            "typeID": "2",
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1001",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            CheckAccess = JSON.stringify(CheckAccess);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _loanrepayment.checkAccessRtn, token)
    },

    checkAccessRtn: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                token = response.data.token;
                var x = response.data.queryResult[0].param1;
                if (x == "0") {
                    swal({
                        title: "Access Denied",
                        text: "You are not autherized to view this page.!",
                        type: "info"
                    }, function () {
                        window.location.href = "dashboard";
                    });
                }
                else {
                    _ModuledataDetails.ModuleFill();
                }

            }
        }
        else {
            swal({
                title: "Access Denied",
                text: "You are not autherized to view this page.!",
                type: "info"
            }, function () {
                window.location.href = "dashboard";
            });
        }
    },

    tokenValidate: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var CheckToken = {
            "typeID": "1",
            "userID": userdata.userId,
            "branchID": userdata.branchId

        };

        try {
            CheckToken = JSON.stringify(CheckToken);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckToken = { "encryptedRqstStr": EncryptAPIReq(CheckToken) };


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _ModuledataDetails.checkAccessToken, userdata.token)
    },

    // Token response



    checkAccessToken: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            token = response.data.queryResult.tokenId;
            if (response.data.errStatus == 0) {
                swal({
                    title: "Access Denied",
                    text: "You are already login in pr module!",
                    type: "info"
                }, function () {
                    window.location.href = "dashboard";
                });
            }
            else {
                _ModuledataDetails.ModuleFill();
            }


        }

    },

    ModuleFill: function () {
        jQuery('.page-loader-wrapper').show();

        var ModuleFillData = {
            "TypeIDD": 1,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId


        };
        ModuleFillData = JSON.stringify(ModuleFillData);
        ModuleFillData = { "encryptedRqstStr": EncryptAPIReq(ModuleFillData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/moduledetails", ModuleFillData, _ModuledataDetails.ModuleFillLoadCompleted, userdata.token)

    },

    ModuleFillLoadCompleted: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            if (response.data != null && response.data.queryResult.moduledetails.length > 0) {

                jQuery("#ddlModule").empty();
                jQuery("#ddlModule").append(jQuery("<option></option>").val("0").text("Select Module"));
                jQuery.each(response.data.queryResult.moduledetails, function (i, val) {
                    jQuery("#ddlModule").append(jQuery("<option></option>").val(val.ModuleId).text(val.ModuleName));
                });
            }
            else {
                jQuery("#ddlModule").empty();
                jQuery("#ddlModule").append(jQuery("<option></option>").val("0").text("Select Module"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {
            jQuery("#ddlModule").empty();
            jQuery("#ddlModule").append(jQuery("<option></option>").val("0").text("Select Module"));
        }
    },


    MenuFill: function () {
        jQuery('.page-loader-wrapper').show();
        var moduleId = jQuery('#ddlModule').val();
        var MenuFillData = {
            "TypeIDD": 2,
            "flag": moduleId,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        MenuFillData = JSON.stringify(MenuFillData);
        MenuFillData = { "encryptedRqstStr": EncryptAPIReq(MenuFillData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/moduledetails", MenuFillData, _ModuledataDetails.MenuFillLoadCompleted, userdata.token)

    },



    MenuFillLoadCompleted: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
           // if (response.data != null && response.data.queryResult.moduledetails.length > 0) {
                if (response.data != null && response.data.queryResult.menudtl.length > 0) {
                    jQuery("#ddlmainmenu").empty();
                    jQuery("#ddlmainmenu").append(jQuery("<option></option>").val("0").text("Select Menu"));
                jQuery.each(response.data.queryResult.menudtl, function (i, val) {
                    jQuery("#ddlmainmenu").append(jQuery("<option></option>").val(val.MenuId).text(val.DisplayName));
                });
            }
            else {
                    jQuery("#ddlmainmenu").empty();
                    jQuery("#ddlmainmenu").append(jQuery("<option></option>").val("0").text("Select Menu"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {
            jQuery("#ddlmainmenu").empty();
            jQuery("#ddlmainmenu").append(jQuery("<option></option>").val("0").text("Select Menu"));
        }
    },



    //Employee fill function//
    Employeefill: function () {
        jQuery('.page-loader-wrapper').show();
        var moduleId = jQuery('#ddlModule').val();
        var EmployeeFillData = {
            "TypeIDD": 2,
            "flag": moduleId,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };
        EmployeeFillData = JSON.stringify(EmployeeFillData);
        EmployeeFillData = { "encryptedRqstStr": EncryptAPIReq(EmployeeFillData) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/moduledetails", EmployeeFillData, _ModuledataDetails.EmployeeLoadCompleted, userdata.token)

    },
    EmployeeLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            //swal("SUCCESS", "", "success");
            swal(response.data.confirm1[0].paramList, "", "success");



        }
        else {
            swal(response.responseMsg, "", "error");
        }
    },


    //end changes//

    // Assign
    Assignreq: function () {

        var selectedIds = [];

        jQuery("input[name='prdtcheck']:checked").each(function () {
            selectedIds.push(this.id); // 'this.id' is the menu id (data1[0])});

        });

        var selectedCount = selectedIds.length;

        if (selectedCount === 0) {
            swal("", "No rows selected! Please select at least one row.", "warning");
            return;
        }
        // var menuString = "[" + selectedIds.join(",") + "]";

        var menuString = selectedIds.join(',');

        var PST = jQuery('#ddlpost').val();
        var empid = jQuery('#vaemployee').val();
        var result = '';


        if (PST != 0) {

           // var pstdes = document.getElementById("ddlpostdesc").value;
            //var pstdes = jQuery('#ddlpostdesc').val();

            //if (pstdes === "") {
            //    swal("", "Enter Menu Description", "warning");
            //    return;
            //}



            var finalString = menuString + "^" + PST + "^" + 0 + "^" + 0;

            var Pstassign = {
                "TypeIDD": 7,
                "flag": moduleId,
                "ParamList": finalString,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId

            };
            Pstassign = JSON.stringify(Pstassign);
            Pstassign = { "encryptedRqstStr": EncryptAPIReq(Pstassign) };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/moduledetails", Pstassign, _ModuledataDetails.Assignresp, userdata.token)

        }
        else if (empid != 0) {

            
            //var empdes = jQuery('#vaemployeedesc').val();
            //var empcd = jQuery('#vaemployee').val();

            //if (empcd === "") {
            //    swal("", "Enter Employee Code", "warning");
            //    return;
            //}


            //if (empdes === "") {
            //    swal("", "Enter Menu Description", "warning");
            //    return;
            //}


            var finalString = menuString + "^" + 0 + "^" + empid + "^" + 0;

            var Emppassign = {
                "TypeIDD": 7,
                "flag": moduleId,
                "ParamList": finalString,
                typeID: "4",
                userID: userdata.userId,
                branchID: userdata.branchId

            };
            try {
                Emppassign = JSON.stringify(Emppassign);
            } catch (e) {
                swal("", e.message, "warning");
                return false;
            }
            Emppassign = { "encryptedRqstStr": EncryptAPIReq(Emppassign) };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/moduledetails", Emppassign, _ModuledataDetails.Assignresp, userdata.token)
           


        }
        else {

            swal("", "Please Enter the value", "warning");
            return false;

        }
    },

        Assignresp: function (response) {
            jQuery('.page-loader-wrapper').hide();
            if (response.status === "SUCCESS") {
                response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
                swal({
                    title: "Assigned",
                    text: "SUCCESSFULLY ASSIGNED",
                    type: "success"
                }, function () {
                    window.location.reload(true);


                });

            }

     
        
    },
     





    //post show//
    GetPostId: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetPost = {
            "TypeIDD": 6,
            "flag": moduleId,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId 
        };
        try {
            GetPost = JSON.stringify(GetPost);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetPost = { "encryptedRqstStr": EncryptAPIReq(GetPost) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/moduledetails", GetPost, _ModuledataDetails.Check_PostId, userdata.token)

    },
    Check_PostId: function (response) {

        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.confirm1.length > 0) {

                jQuery("#ddlpost").append(jQuery("<option></option>").val("0").text("Select Post"));
                jQuery.each(response.data.queryResult.confirm1, function (i, val) {

                    
                    var data1 = val.ParamList.split("~");
                    
                    jQuery("#ddlpost").append(jQuery("<option></option>").val(data1[0]).text(data1[1]));
                   


                    

                });
            }
        }



    },

    //grid show//

    GetPRData: function () {
        var Str = " ";
        jQuery('.page-loader-wrapper').show();
        var menudt = jQuery('#ddlmainmenu').val();
        var employeeid = jQuery('#vaemployee').val();
        paramslist = menudt + "^" + employeeid;
        var Gridshow = {
            "TypeIDD": 5,
            "flag": moduleId,
            "ParamList": paramslist,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        Gridshow = JSON.stringify(Gridshow);
        Gridshow = { "encryptedRqstStr": EncryptAPIReq(Gridshow) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/moduledetails", Gridshow, _ModuledataDetails.fillgrid, userdata.token)

    },


    fillgrid: function (response) {

        if (response.status === "SUCCESS") {
            jQuery('.page-loader-wrapper').hide();
            jQuery('#maincard').show();
            jQuery('#confirm').show();
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.confirm1.length > 0) {

                jQuery('#paymenttabl').empty();
                jQuery.each(response.data.queryResult.confirm1, function (i, val) {

                    var $row = jQuery('<tr/>');
                    var data1 = val.ParamList.split("~");



                   // $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                    $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));

                    $row.append(jQuery('<td class="HCol" align="left">').html('<input type="checkbox" id="' + data1[0] + '" name="prdtcheck" />'));

                    jQuery('#paymenttabl').append($row);
                    jQuery('#clickbtn').hide();
                    jQuery('#Assign').show();

                });
            }
        }

      
        
    }
}

jQuery(document).ready(function ($) {
    jQuery('.page-loader-wrapper').hide();
    jQuery('#ddlModule').select2();
    jQuery('#ddlmainmenu').select2();

    //jQuery('#ddlpost').change(function (e) {

    //    _ModuledataDetails.Assignreq();

    //});

    //jQuery('#vaemployee').change(function (e) {

    //    _ModuledataDetails.Assignreq();

    //});

    

    jQuery('#ddlmainmenu').click(function (e) {
        jQuery('#maincard').hide();

    });

    jQuery("#ddlmainmenu").change(function (e) {
 
        jQuery('.page-loader-wrapper').show();
        _ModuledataDetails.GetPRData();
        jQuery('#empost').show();
        jQuery('#vaemployee').hide();
        jQuery('#ddlpost').hide();
        /*jQuery('#vaemployee').val('');*/
    });

    jQuery('#clickbtn').click(function (e) {

        jQuery('.page-loader-wrapper').show();
/*        _ModuledataDetails.GetPRData();*/
        jQuery('#vaemployee').show();

    });


    // _ModuledataDetails.ModuleFill();
    _ModuledataDetails.tokenValidate();


    jQuery("#ddlModule").change(function (e) {

        /*  moduleId = jQuery('#ddlmainmenu').val();*/
        jQuery('.page-loader-wrapper').show();
        _ModuledataDetails.MenuFill();
    });


    jQuery('#Assign').click(function (e) {

        jQuery('.page-loader-wrapper').show();
        _ModuledataDetails.Assignreq();
    });

    jQuery('#radAppr').click(function (e) {
        jQuery('#vaemployee').show();
        //jQuery('#vaemployeedesc').show();
        //jQuery('#menudes1').show();

        jQuery('#ddlpost').hide();
        jQuery('#ddlpostdesc').hide();
        jQuery('#menudes2').hide();

        
    });

    jQuery('#radRjct').click(function (e) {
        jQuery('#ddlpost').show();
        //jQuery('#ddlpostdesc').show();
        //jQuery('#menudes2').show();

        jQuery('#vaemployee').hide();
        //jQuery('#vaemployeedesc').hide();
        //jQuery('#menudes1').hide();
    });

    jQuery('#ddlpost').click(function (e) {

        jQuery('.page-loader-wrapper').show();
        _ModuledataDetails.GetPostId();
    });

});


