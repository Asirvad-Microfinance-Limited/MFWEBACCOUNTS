var brid;
var BalanceRecovery = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var CheckAccess = {
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1014",
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        //encryption//
        try {
            CheckAccess = JSON.stringify(CheckAccess);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };

        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, BalanceRecovery.checkAccessRtn, userdata.token)
    },

    checkAccessRtn: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {
                var x = response.data.queryResult.QueryResult[0].param1;
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
                    BalanceRecovery.BranchLoad();
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

    // Token Validation
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


        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, BalanceRecovery.checkAccessToken, userdata.token)
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
                BalanceRecovery.BranchLoad();
            }


        }

    },

// Branch Load

    BranchLoad: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";
        var GetEmployeeLoad = {
            
            "typId":"1",
            /*"branchIds": "2752",*/
            "usrId": userdata.userId,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            GetEmployeeLoad = JSON.stringify(GetEmployeeLoad);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetEmployeeLoad = { "encryptedRqstStr": EncryptAPIReq(GetEmployeeLoad) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/BalanceRecovery", GetEmployeeLoad, BalanceRecovery.FillstateLoad, userdata.token)

    },
    FillstateLoad: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.branchFill.length > 0) {

                jQuery("#Branchid").empty();
                jQuery("#Branchid").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH-------- "));
                jQuery.each(response.data.queryResult.branchFill, function (i, val) {
                    jQuery("#Branchid").append(jQuery("<option></option>").val(val.branchId).text(val.branchName));
                });
            }
            else {
                jQuery("#Branchid").empty();
                jQuery("#Branchid").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH-------- "));
            }
        }
        else {

            jQuery("#Branchid").empty();
            jQuery("#Branchid").append(jQuery("<option></option>").val("0").text(" --------CHOOSE BRANCH-------- "));
        }
    },

    //Expense Load

    EmployeeLoad: function () {
        jQuery('.page-loader-wrapper').show();

        var brid = jQuery('#Branchid').val();

        var GetBranchLoad = {
            "typId": "2",
            "branchIds": brid,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            GetBranchLoad = JSON.stringify(GetBranchLoad);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetBranchLoad = { "encryptedRqstStr": EncryptAPIReq(GetBranchLoad) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/BalanceRecovery", GetBranchLoad, BalanceRecovery.FillEmployeeLoad, userdata.token)


    },

    FillEmployeeLoad: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data.queryResult.empFill.length > 0) {

                jQuery("#empid").empty();
                jQuery("#empid").append(jQuery("<option></option>").val("0").text(" --------CHOOSE EMPLOYEE-------- "));
                jQuery.each(response.data.queryResult.empFill, function (i, val) {
                    jQuery("#empid").append(jQuery("<option></option>").text(val.empCode));
                });
            }
            else {
                jQuery("#empid").empty();
                jQuery("#empid").append(jQuery("<option></option>").val("0").text(" --------CHOOSE EMPLOYEE-------- "));
            }
        }
        else {

            jQuery("#empid").empty();
            jQuery("#empid").append(jQuery("<option></option>").val("0").text(" --------CHOOSE EMPLOYEE-------- "));
        }


    },

    // TABLE LOAD

    tablefill: function (emcode, brid) {

        jQuery('.page-loader-wrapper').show();

        jQuery('#maincard').hide();


        var brnachtablefill = {
            "typId": "3",
            "branchIds": brid,
            //"usrId": emcode,
            "empCode": emcode,
            "typeID": "4",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            brnachtablefill = JSON.stringify(brnachtablefill);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        brnachtablefill = { "encryptedRqstStr": EncryptAPIReq(brnachtablefill) };
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/BalanceRecovery", brnachtablefill, BalanceRecovery.branchtableload, userdata.token)
   },

    branchtableload: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.tableFill.length > 0) {

                jQuery('#maincard').show();
                jQuery('.page-loader-wrapper').hide();



                if (response.data.queryResult.tableFill.length > 0) {

                    jQuery('#Fidatatabl').empty();
                    jQuery.each(response.data.queryResult.tableFill, function (i, val) {

                        var $row = jQuery('<tr/>');

                        //var nval = nval + 1;

                        //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                        $row.append(jQuery('<td class="HCol" align="center">').html(val.branchId));
                        $row.append(jQuery('<td class="HCol" align="center">').html(val.branchName));
                        $row.append(jQuery('<td class="HCol" align="center">').html(val.empCode));
                        $row.append(jQuery('<td class="HCol" align="center">').html(val.empName));
                        $row.append(jQuery('<td class="HCol" align="center">').html(val.Amount));
                        //$row.append(jQuery('<td align="center">').html('<input type="checkbox" id="prdtcheck" class="checkBoxClass"   name="hobby">'));

                        /*if (status == 1) {
                            $row.append(jQuery('<td align="center">').html('<button type="button" class="btn btn-danger" id="Block" style="width:100px; height:40px;" onClick="ExpenseBranch.Block(' + data1[0] + ',\'' + status + '\');" name="block" >BLOCK</button>'));

                            //$row.append(jQuery('<td class="HCol" align="center">').html(val.param2));

                        }
                        else {
                            $row.append(jQuery('<td align="center">').html('<button type="button" class="btn btn-success" id="Add" style="width:100px; height:40px;" onClick = "ExpenseBranch.Add(' + data1[0] + ',\'' + status + '\');" name="add" >ADD</button> '));

                        }*/
                        //$row.append(jQuery('<td class="HCol" align="center">').html(val.param2));
                        //$row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                        //$row.append(jQuery('<td class="HCol" align="left">').html(data1[4]));
                        /*$row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[8]));
                        $row.append(jQuery('<td class="HCol" align="left">').html(data1[9]));*/
                        jQuery('#Fidatatabl').append($row);
                    });
                }


            }
            else {
                window.location.reload(true);
                BalanceRecovery.BranchLoad();
            }
        }

    },


    Staffrecoveryapproval: function (result) {
        jQuery('.page-loader-wrapper').show();
        var amnt = jQuery('#amount').val();
            var AddButton = {

                "typId": "4",
                "dataInsert": result,
                "usrId": userdata.userId,
                "amount": amnt,
                "typeID": "4",
                "userID": userdata.userId,
                "branchID": userdata.branchId

            };
            try {
                AddButton = JSON.stringify(AddButton);
            } catch (e) {
                swal("", e.message, "warning");
                return false;
            }
            AddButton = { "encryptedRqstStr": EncryptAPIReq(AddButton) };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/BalanceRecovery", AddButton, BalanceRecovery.Staffrecoveryapprovalload, userdata.token)
    },

    Staffrecoveryapprovalload: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            var selectedValue = jQuery('#empid').val();
            var selectedValue1 = jQuery('#Branchid').val();

            var msg = response.data.queryResult.message;

            if (msg == 'Success') {

                swal({
                    title: "Confirmed Successfully",
                    //text: "success",
                    type: "success"
                }, function () {
                    //location.reload();
                    window.location.reload(true);
                    //_StaffDebitReversalrecmnd.tableFill();
                    //BalanceRecovery.tablefill(selectedValue, selectedValue1);
                });
            }

            else {

                swal({
                    title: response.data.queryResult.message,
                    //text: "success",
                    type: "warning"
                });
            }





            //swal("Saved Successfully", "", "success")
            jQuery('.page-loader-wrapper').hide();

        }


    },


    StaffrecoveryReject: function (result) {

        jQuery('.page-loader-wrapper').show();
        var amount = jQuery('#amount').val();

        var table = result.split('~');
        var amounttable = table[2];
        if (amount <= amounttable) {



            var debitreject = {

                "typId": "5",
                "dataInsert": result,
                "typeID": "4",
                "userID": userdata.userId,
                "branchID": userdata.branchId
            };
            debitreject = JSON.stringify(debitreject);
            debitreject = { "encryptedRqstStr": EncryptAPIReq(debitreject) };
            _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/BalanceRecovery", debitreject, BalanceRecovery.StaffdebitrevrejLoad, userdata.token)

        }
        else {
            swal("", "Amount should be less than or equal to the shown amount", "warning");
            return false;
        }
    },

    StaffdebitrevrejLoad: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            var selectedValue = jQuery('#empid').val();
            var selectedValue1 = jQuery('#Branchid').val();

            var msg = response.data.queryResult.message;

            if (msg == 'Success') {

                swal({
                    title: "Rejected Successfully",
                    //text: "success",
                    type: "success"
                }, function () {
                    //location.reload();
                    //window.location.reload(true);
                    //_StaffDebitReversalrecmnd.tableFill();
                    BalanceRecovery.tablefill(selectedValue, selectedValue1);
                });
            }

            else {

                swal({
                    title: response.data.queryResult.message,
                    //text: "success",
                    type: "warning"
                });
            }





            //swal("Saved Successfully", "", "success")
            jQuery('.page-loader-wrapper').hide();

        }


    },








}

jQuery(document).ready(function ($) {
    jQuery('#maincard').hide();

    BalanceRecovery.tokenValidate();
    BalanceRecovery.checkAccess();
    //BalanceRecovery.BranchLoad();
    
    jQuery('#Branchid').change(function (e) {
        BalanceRecovery.EmployeeLoad();
        jQuery('#maincard').hide();
        jQuery('#amountdiv').hide();

    });

    jQuery('#empid').change(function (e) {
        var emcode = jQuery('#empid').val();
        var brid = jQuery('#Branchid').val();
        BalanceRecovery.tablefill(emcode, brid);
        jQuery('#amountdiv').show();
    });

    jQuery('#btnExit').on("click", function () {
        window.open("Dashboard", "_self");
    });


    jQuery('#btnSaveBank').on('click', function () {

        var branch = jQuery('#Branchid').val();
        if (branch == 0) {
            swal("", "Please Select the Branch ", "warning");
            return false;
        }
        var user = jQuery('#empid').val();
        if (user == 0) {
            swal("", "Please Select Employee Code ", "warning");
            return false;
        }
        var amt = jQuery('#amount').val();
        if (amt == 0) {
            swal("", "Please Enter Amount ", "warning");
            return false;
        }
        
        let data = [];

        // Loop through each table row
        jQuery("#Fidatatabl tr").each(function () {
            let columns = jQuery(this).find("td");

            // Ensure the row has enough columns before extracting data
            if (columns.length >= 5) {
                let rowData = jQuery(columns[0]).text().trim() + "~" + jQuery(columns[2]).text().trim() + "~" + jQuery(columns[4]).text().trim();
                data.push(rowData);
            }
        });
        var amount = jQuery('#amount').val();
        var table = data[0].split("~");
        var amounttable = parseInt(table[2]);
        if (amount > amounttable) {
            swal("", "Amount Should not be greater than the actual amount ", "warning");
            return false;
        }
        /*var selectedCheckboxes = jQuery('table tbody input[type="checkbox"]:checked');
        var selectedCount = selectedCheckboxes.length;

        if (selectedCount === 0) {
            swal("", "No rows selected! Please select at least one row.", "warning");
            return;
        }

        var allRowsData = []; // Store all row data
        var result = ''; // Final result string

        selectedCheckboxes.each(function () {
            var $row = jQuery(this).closest('tr'); // Get the parent row of the checkbox
            var rowData = []; // Temporary array to hold data for this row

            // Iterate over table cells (columns)
            $row.find('td').each(function (index) {
                if (index === 0 || index === 2 || index === 4) {
                    rowData.push(jQuery(this).text().trim()); // Fetch and trim text
                }
            });

            allRowsData.push(rowData.join('~'));
        });

        allRowsData.forEach(function (rowData, index) {
            if (index > 0 && index % 3 === 0) {
                result += '^'; // Add '^' after every 3 rows
            }
            result += (result && !result.endsWith('^') ? '^' : '') + rowData;
        });*/

        else { 
            let dataString = data.join(",");
            BalanceRecovery.Staffrecoveryapproval(dataString);
        }
    });


    /*jQuery('#btnRejectBank').on('click', function () {

        var branch = jQuery('#Branchid').val();
        if (branch == 0) {
            swal("", "Please Select the Branch ", "warning");
            return false;
        }
        var user = jQuery('#empid').val();
        if (user == 0) {
            swal("", "Please Select Employee Code ", "warning");
            return false;
        }

        var selectedCheckboxes = jQuery('table tbody input[type="checkbox"]:checked');
        var selectedCount = selectedCheckboxes.length;

        if (selectedCount === 0) {
            swal("", "No rows selected! Please select at least one row.", "warning");
            return;
        }

        var allRowsData = []; // Store all row data
        var result = ''; // Final result string

        selectedCheckboxes.each(function () {
            var $row = jQuery(this).closest('tr'); // Get the parent row of the checkbox
            var rowData = []; // Temporary array to hold data for this row

            // Iterate over table cells (columns)
            $row.find('td').each(function (index) {
                if (index === 0 || index === 2 || index === 4) {
                    rowData.push(jQuery(this).text().trim()); // Fetch and trim text
                }
            });

            allRowsData.push(rowData.join('~'));
        });

        allRowsData.forEach(function (rowData, index) {
            if (index > 0 && index % 3 === 0) {
                result += '^'; // Add '^' after every 3 rows
            }
            result += (result && !result.endsWith('^') ? '^' : '') + rowData;
        });


        BalanceRecovery.StaffrecoveryReject(result);
    });
*/

});
    






