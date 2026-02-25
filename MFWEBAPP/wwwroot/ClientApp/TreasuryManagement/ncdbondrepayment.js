var tblData = [];

var _NcdBondRePayment = {

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
        _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/PayratQueries", CheckAccess, _NcdBondRePayment.checkAccessRtn, token)
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
                    _NcdBondRePayment.loadMainAccount();
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

    
    // Token validation


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


    _http.post(MFPUBLICACCOUNTSAPI_URL + "api/accounts/UserSession", CheckToken, _NcdBondRePayment.checkAccessToken, userdata.token)
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
            _NcdBondRePayment.loadMainAccount();
        }


    }
    },


    //Main Account
    loadMainAccount: function () {
        jQuery('.page-loader-wrapper').show();
        var DebMainAccount = {
            Flag: "NCDBondAvailment",
            PagVal: "GetBnkID",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebMainAccount = JSON.stringify(DebMainAccount);
        DebMainAccount = { "encryptedRqstStr": EncryptAPIReq(DebMainAccount) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebMainAccount, _NcdBondRePayment.FillDebMainAccount, userdata.token);

    },
    FillDebMainAccount: function (response) {


        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_mainAcc").empty();
                jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_mainAcc").empty();
                jQuery("#ddl_mainAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //Sub Account

    loadSubAccount: function () {
        jQuery('.page-loader-wrapper').show();
        var indata = jQuery("#ddl_mainAcc").val ();
        var DebSubAccount = {
            Flag: "NCDBondAvailment",
            PagVal: "GetMainBnkID",
            parVal: indata,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebSubAccount = JSON.stringify(DebSubAccount);
        DebSubAccount = { "encryptedRqstStr": EncryptAPIReq(DebSubAccount) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSubAccount, _NcdBondRePayment.FillDebSubAccount, userdata.token);

    },
    FillDebSubAccount: function (response) {


        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_SubAcc").empty();
                jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_SubAcc").empty();
                jQuery("#ddl_SubAcc").append(jQuery("<option></option>").val("0").text(" --------CHOOSE SUB ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },
    //tds
    getTdsbankid: function () {
        jQuery('.page-loader-wrapper').show();
        var DebTdsAccount = {
            Flag: "LoanRepaymentReq",
            PagVal: "GetTDSBnkID",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };
        DebTdsAccount = JSON.stringify(DebTdsAccount);
        DebTdsAccount = { "encryptedRqstStr": EncryptAPIReq(DebTdsAccount) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectQueries", DebTdsAccount, _NcdBondRePayment.FillDebtdsAccount, userdata.token);

    },
    FillDebtdsAccount: function (response) {


        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddl_TDS_main_bnk").empty();
                jQuery("#ddl_TDS_main_bnk").append(jQuery("<option></option>").val("0").text(" --------CHOOSE TDS MAin ACCOUNT-------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddl_TDS_main_bnk").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddl_TDS_main_bnk").empty();
                jQuery("#ddl_TDS_main_bnk").append(jQuery("<option></option>").val("0").text(" --------CHOOSE MAIN ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },






    PrincipleIntrest: function () {
        var FundTyp;
        if (jQuery("#rbtPublic").prop("checked")) {
            FundTyp = '2';
        }
        else if (jQuery("#rbtOther").prop("checked") == true) {
            FundTyp = '1';
        }


        if (jQuery("#rbtInterest").prop("checked")) {
            IRate = 0;
            jQuery("#tblPrincpleIntDtl").empty();
            jQuery("#tblPaymentDtl").empty();
            jQuery("#txtTotalAmount").val(0);
            jQuery("#txt_tot").val(0);
            jQuery("#divtblPrincpleIntDtl").fadeIn();
            jQuery("#divAddAccount").fadeIn();
            jQuery("#divTotal").fadeIn();
            intPrnc = "GetIntRePaymentTblncd";
        }
        else if (jQuery("#rbtPrinciple").prop("checked") == true) {
            IRate = 0;
            jQuery("#tblPrincpleIntDtl").empty();
            jQuery("#tblPaymentDtl").empty();
            jQuery("#txtTotalAmount").val(0);
            jQuery("#txt_tot").val(0);
            jQuery("#divtblPrincpleIntDtl").fadeIn();
            jQuery("#divAddAccount").fadeIn();
            jQuery("#divTotal").fadeIn();
            intPrnc = "GetPrncRepaymntncd";
        }


        var LoadTableReq = {
            Flag: "DebRepayment",
            PagVal: intPrnc,
            parVal: FundTyp,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId


        };
        LoadTableReq = JSON.stringify(LoadTableReq);
        LoadTableReq = { "encryptedRqstStr": EncryptAPIReq(LoadTableReq) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", LoadTableReq, _NcdBondRePayment.LoadTablerep, userdata.token);

    },

    LoadTablerep: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();
                jQuery('#maincard').show();

                
                  


                
                if (response.data.queryResult.QueryResult.length > 0) {
                    jQuery('#Fidatatabl').empty();
                  
                    if ((jQuery("#rbtInterest").prop("checked"))) {

                        jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                            var $row = jQuery('<tr/>');
                            var data1 = val.Param1.split("~");
                            //var nval = nval + 1;

                            //$row.append(jQuery('<td class="HCol" align="left">').html(nval));
                            $row.append(jQuery('<td><input type="checkbox"  id="chkbx' + i + 'm" name="Paymnt"  onclick="_NcdBondRePayment.addIntrst(' + i + ')"/></td>'));

                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[0]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[1]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[2]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[3]));
                            $row.append(jQuery('<td align="center">').html('<input type="text" id="TDS_id" value=' + data1[4] + ' disabled onkeypress="return onlyNumberKey(event)" maxlength="4" onchange="_NcdBondRePayment.addIntTDS(' + i + ')">'));

                            $row.append(jQuery('<td align="center">').html('<input type="text" id="Record_id" value=' + data1[5] + ' disabled onkeypress="return onlyNumberKey(event)" maxlength="4"onchange="_NcdBondRePayment.addamtdetails(' + i + ')">'));

                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[6]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[7]));
                            $row.append(jQuery('<td class="HCol" align="left">').html(data1[8]));
                            jQuery('#Fidatatabl').append($row);
                        });
                    }
                }
                
                
                 

                //else {

                //    //var Strt = '<thead class="bg-success text-white"><tr><th scope="col">Pay</th><th scope="col">LoanID</th><th scope="col">Installment</th><th scope="col">Financial_Institition</th><th scope="col">Pay_Type</th><th scope="col">Principle_Amount</th><th scope="col">TDS</th><th scope="col">Pay_Date</th><th scope="col">LoanAccount</th><th scope="col">Pjt_Code</th></tr></thead><tbody class="border border-dark">';

                //    for (i = 0; i < valData.length - 1; i++) {

                //        valData1 = valData[i].split('^');
                //        jQuery('#tblPrincpleIntDtl').append('<tr>' +
                //            '<td><input class="form-control input-sm align-right " id="chkbx' + i + 'm" name="Paymnt" type="checkbox" onclick="addPrincipal(' + i + ')"/></td>' +
                //            '<td>' + valData1[0] + '</td>' +
                //            '<td>' + valData1[1] + '</td>' +
                //            '<td>' + valData1[2] + '</td>' +
                //            '<td>' + valData1[3] + '</td>' +
                //            '<td><input type = "text" id= "Record_id' + i + '" name = "Record_id1" value =' + valData1[4] + ' Disabled  onkeypress="return onlyNumberKey(event)" class="price"   size = "10" onchange="return getsum()"   /></td>' +
                //            '<td><input type = "text" id= "TDS_id' + i + '" name = "TDS_id1" value =' + valData1[5] + ' Disabled  onkeypress="return onlyNumberKey(event)" class="price"   size = "10" onchange="return addprcTDS(' + i + ')"  /></td>' +

                //            '<td>' + valData1[7] + '</td>' +
                //            '<td>' + valData1[6] + '</td>' +
                //            '<td>' + valData1[9] + '</td>' +
                //            '<td><input id="hdn' + i + '" type="hidden" value="' + valData1[9] + '"/></td>' +
                //            '</tr> </tbody>');
                    
                //    }
                

                //    jQuery('#tblPrincpleIntDtl').append(Strt);
                //}

                

            }
        }
    },

    addIntrst: function (i) {
        if ((jQuery("#rbtInterest").prop("checked"))) {

            if (jQuery("#txt_tot").val() == "") {
                tot = 0;
            }
            else {
                tot = parseFloat(jQuery("#txt_tot").val());
            }
            jQuery("#TDS_id").prop("disabled", false);
            jQuery("#Record_id").prop("disabled", false);


            var tableData = document.getElementById('tbldespatchs');//2 table

            var tdsamt = tableData.rows[1].cells[5].querySelector('input').value;
            var interestamt = tableData.rows[1].cells[6].querySelector('input').value;


            jQuery("#txt_intrst_amt").html(interestamt);
            jQuery("#txt_intrst_amt").val(interestamt);
            jQuery("#txt_tot").html(interestamt);
            jQuery("#txt_tot").val(interestamt);
            jQuery("#txt_net_amnt").html(interestamt);
            jQuery("#txt_net_amnt").val(interestamt);
            jQuery("#txtTotalAmount").html(interestamt);
            jQuery("#txtTotalAmount").val(0);

        }
        if ((jQuery("#rbtPrinciple").prop("checked"))) {
            if (jQuery("#txt_tot").val() == "") {
                tot = 0;
            }
            else {
                tot = parseFloat(jQuery("#txt_tot").val());
            }
            jQuery("#TDS_id").prop("disabled", false);
            jQuery("#Record_id").prop("disabled", false);


            var tableData = document.getElementById('tbldespatchs');//2 table

            var tdsamt = tableData.rows[1].cells[5].querySelector('input').value;
            var interestamt = tableData.rows[1].cells[6].querySelector('input').value;


            jQuery("#txt_intrst_amt").html(interestamt);
            jQuery("#txt_intrst_amt").val(interestamt);
            jQuery("#txt_tot").html(interestamt);
            jQuery("#txt_tot").val(interestamt);
            jQuery("#txt_net_amnt").html(interestamt);
            jQuery("#txt_net_amnt").val(interestamt);
            jQuery("#txtTotalAmount").html(interestamt);
            jQuery("#txtTotalAmount").val(0);


        }
    },
    addIntTDS: function (i) {


        debugger;
        var table;
        var tdsamnt;
        var intrAmnt;
        var j = i + 1;
        var tot = 0;
        jQuery("#TDS_id").prop("disabled", true);
        if (jQuery("#txt_tds_amnt").val() == "")
            tot = 0;
        else
            tot = parseFloat($("#txt_tds_amnt").val());
        var tableData = document.getElementById('tbldespatchs');//2 table

        var tdsamnt = tableData.rows[1].cells[5].querySelector('input').value;
        if (jQuery("#chkbx" + i + "m").prop("checked")) {
            tot = parseInt(tot) + parseInt(tdsamnt);
            //tot = tot + tableData.rows[1].cells[5].querySelector('input').value;
            jQuery("#TDS_id" + i).prop("disabled", true);
        }
        else {
            tot = tot - tdsamnt;
            jQuery("#TDS_id" + i).prop("disabled", true);
            jQuery("#TDS_id" + i).val("0");
        }
        if (tdsamnt == 0) {
            jQuery("#divTDSmainbnk").hide();
        }
        else {
            jQuery("#divTDSmainbnk").show();
            _NcdBondRePayment.getTdsbankid();

        }
        jQuery("#txt_tds_amnt").val(tot);
        _NcdBondRePayment.calcnetAmt();


    },

    addamtdetails: function (i) {
        // _loanrepayment.addIntrst(i)
        var tableData = document.getElementById('tbldespatchs');//2 table

        var tdsamt = tableData.rows[1].cells[5].querySelector('input').value;
        var interestamt = tableData.rows[1].cells[6].querySelector('input').value;


        jQuery("#txt_intrst_amt").html(interestamt);
        jQuery("#txt_intrst_amt").val(interestamt);
        jQuery("#txt_tot").html(interestamt);
        jQuery("#txt_tot").val(interestamt);
        jQuery("#txt_net_amnt").html(interestamt);
        jQuery("#txt_net_amnt").val(interestamt);
        jQuery("#txtTotalAmount").html(interestamt);
        jQuery("#txtTotalAmount").val(0);

        if (jQuery("#rbtInterest").prop("checked")) {

            debugger;
            var total = 0;
            var tds = $("#txt_tds_amnt").val();
            jQuery("#tblPrincpleIntDtl input[type=checkbox]:checked").each(function () {
                var row = $(this).closest("tr")[0];
                if ($("#rbtInterest").prop("checked")) {
                    var tableData = document.getElementById('tbldespatchs');//2 table

                    var tdsamt = tableData.rows[1].cells[5].querySelector('input').value;
                    var interestamt = tableData.rows[1].cells[6].querySelector('input').value;

                    total = total + parseFloat(tableData.rows[1].cells[5].querySelector('input').value);
                    jQuery("#txt_tot").val(total.toFixed(2));
                    // $("#txtPayAmount").val(total.toFixed(2));
                    jQuery("#txt_intrst_amt").val(total.toFixed(2));
                    if (tds == "") {
                        tds = 0;
                    }
                    var net_amnt = parseFloat(total) + parseFloat(tds);
                    jQuery("#txt_net_amnt").val(net_amnt);
                    //row.cells[6].childNodes[0].readOnly = false;
                }
                else {
                    total = total + parseFloat(tableData.rows[1].cells[5].querySelector('input').value);
                    jQuery("#txt_tot").val(total.toFixed(2));
                   // $("#txtPayAmount").val(total.toFixed(2));
                    jQuery("#txt_intrst_amt").val(total.toFixed(2));
                    if (tds == "") {
                        tds = 0;
                    }
                    var net_amnt = parseFloat(total) + parseFloat(tds);
                    jQuery("#txt_net_amnt").val(net_amnt);
                    //row.cells[6].childNodes[0].readOnly = true;
                }


            });
            _NcdBondRePayment.calcnetAmt();

        }

        else if (jQuery("#rbtPrinciple").prop("checked")) {

            debugger;
            var table;
            var tdsamnt;
            var intrAmnt;
            var j = i + 1;
            var tot = 0;
            if (jQuery("#txt_tds_amnt").val() == "")
                tot = 0;
            else
                tot = parseFloat($("#txt_tds_amnt").val());
            //table = document.getElementById('tblPrincpleIntDtl');
            //tdsamnt = parseFloat(table.rows[j].cells[6].childNodes[0].value);
            var tableData = document.getElementById('tbldespatchs');//2 table

            var tdsamnt = tableData.rows[1].cells[5].querySelector('input').value;


            if (jQuery("#chkbx" + i + "m").prop("checked")) {
                //tot = parseFloat(tot) + parseFloat(tdsamnt);
                jQuery("#TDS_id" + i).prop("disabled", true);
            }
            else {
                tot = parseFloat(tot) - parseFloat(tdsamnt);
                jQuery("#TDS_id" + i).prop("disabled", true);
                jQuery("#TDS_id" + i).val("0");
            }
            if (tdsamnt == 0) {
                jQuery("#divTDSmainbnk").hide();
            }
            else {
                jQuery("#divTDSmainbnk").show();
            }
            // $("#txt_tds_amnt").val(tot);
            var amt = jQuery("#txtPayAmount").val();
            var amt = jQuery("#txt_intrst_amt").val();
            // $("#txtTotalAmount").val(amt);
            _NcdBondRePayment.calcnetAmt();


        }



    },



    calcnetAmt: function (i) {

        var amount = jQuery("#txt_intrst_amt").val();
        var tdsamnt = jQuery("#txt_tds_amnt").val();
        var netAmnt = amount - tdsamnt;
        jQuery("#txt_tot").val(netAmnt);

        if (tdsamnt == 0) {
            jQuery("#divTDSmainbnk").hide();
        }
        else {
            jQuery("#divTDSmainbnk").show();
        }
    },



    getToAddDtls: function () {

        var mainacc = jQuery("#ddl_mainAcc").val();
        var subacc = jQuery("#ddl_SubAcc").val();
        var amount = jQuery("#txtPayAmount").val();
        var amont = jQuery('#txt_intrst_amt').val();

        if(amont == 0) {
        swal("", "Please select the check box..!", "error");
          return false;
        }


        else if (mainacc == 0) {
            swal("Please select main account!!!....", "", "warning");
            return false;

        }
        else if (subacc == 0) {
            swal("Please select sub account!!!....", "", "warning");
            return false;

        }
        else if (amount == "") {
            swal("Please select amount!!!....", "", "warning");
            return false;

        }
        else if (amount == 0) {
            swal("Please  enter greater than zero !!!....", "", "warning");
            return false;
        }
        else {

            for (i = 0; i < tblData.length; i++) {

                if (tblData[i].subacc == subacc) {

                    swal("Already Selected this Sub Account !!!....", "", "warning");
                    return false;
                }
            }


            var RowData = {

                'mainacc': mainacc,
                'subacc': subacc,
                 'amount': amount,

            };

            tblData.push(RowData);
            _NcdBondRePayment.AddCustomer(tblData);
        }

    },




    AddCustomer: function (tblData) {

        if (tblData != null && tblData.length > 0) {

            jQuery('#maincards').show();
            jQuery('.page-loader-wrapper').hide();
            jQuery('#divcustomertable').empty();

            var $table = jQuery('<table class="table" id="tbladd">');
            $table.append
                ('<thead><tr> <th style="text-align:center;">Main Account</th><th style="text-align:center;">Sub Account</th><th style="text-align:center;">Amount</th><th style="text-align:center;">DELETE</th></thead>')
            var $tbody = jQuery('<tbody>');

            jQuery.each(tblData, function (i, val) {

                var $row = jQuery('<tr/>');
                // $row.append(jQuery('<td align="center">').html(i + 1));
                $row.append(jQuery('<td align="center">').html(val.mainacc));
                $row.append(jQuery('<td align="center">').html(val.subacc));
                $row.append(jQuery('<td align="center">').html(val.amount));


                $row.append(jQuery('<td align="center">').html('<button type="button" class="btnsmall  btn-danger fc-center" id="delete" name="submit"  onclick="ReversCon(' + i + ');" > <i class="fa fa-trash" class="bs-tooltip remove" style="font-size:15px;"></i></button> '));




                $tbody.append($row);

            });


            $tbody.append('</tbody>');
            $table.append($tbody);
            $table.append('</table>');
            jQuery('#divcustomertable').html($table);
        }
        else {
            jQuery('#maincards').hide();
            jQuery('#hodetailsentry').empty();
        }



        jQuery('.page-loader-wrapper').hide();
        _NcdBondRePayment.addamount(tblData);



        _NcdBondRePayment.clear();



    },


    clear: function (tblData) {
        jQuery("#ddl_mainAcc").val(0);
        jQuery("#ddl_SubAcc").val(0);
      
        jQuery("#txtPayAmount").val('');

    },
    addamount: function (tblData) {
        if (tblData != null && tblData.length > 0) {
            jQuery('#maincards').show();
            var AMOUNTtotalRent = 0;
            var AMOUNTtotalAdvance = 0;
            jQuery("#amttotal").html(0);

            jQuery.each(tblData, function (i, val) {

                AMOUNTtotalRent = (parseFloat(AMOUNTtotalRent) + parseFloat(val.amount));
                // AMOUNTtotalAdvance = (parseFloat(AMOUNTtotalAdvance) + parseFloat(val.SecurityDep));
                jQuery("#txtTotalAmount").html(AMOUNTtotalRent);
                jQuery('#txtTotalAmount').val(AMOUNTtotalRent);
                //jQuery("#txtTotalAmount").html(AMOUNTtotalAdvance);


            });

        }

        jQuery('.page-loader-wrapper').hide();
    },






    submitevalue: function () {
        if (_NcdBondRePayment.checkvalue()) {
            var tableData = document.getElementById('tbldespatchs');//2
            var loanid = tableData.rows[1].cells[1].innerText;
            var installment = tableData.rows[1].cells[2].innerText;
            var tdsamt = tableData.rows[1].cells[5].querySelector('input').value;
            var amount = tableData.rows[1].cells[6].querySelector('input').value;
            var tdsacc = jQuery('#ddl_TDS_main_bnk').val();

            if ((jQuery("#rbtInterest").prop("checked"))) {
                paytype = 2;
                var tblAmnt = loanid + "µ" + amount + "µ" + userdata.userId + "µ" + installment + "µ" + paytype + "µ" + tdsamt + "µ" + tdsacc + "¥";;
            }
            if ((jQuery("#rbtPrinciple").prop("checked"))) {
                paytype = 1;
                var tblAmnt = loanid + "µ" + amount + "µ" + userdata.userId + "µ" + installment + "µ" + paytype + "µ" + tdsamt + "µ" + tdsacc + "¥";;
            }


          

            var tblAmntData = "";

            for (i = 0; i < tblData.length; i++) {


                //tblAmntData = tblAmntData + table.rows[i].cells[0].innerText + "µ" + table.rows[i].cells[1].innerText + "µ" + table.rows[i].cells[2].innerText + "µ" + table.rows[i].cells[3].innerText + "¥";
                tblAmntData = tblAmntData + tblData[i].mainacc + "µ" + tblData[i].subacc + "µ" + tblData[i].amount + "µ" + userdata.userId + "¥";


            }
            var submitRequest = {

                Flag: "ncdbondrepaymentconfirm",

                PagVal: tblAmntData,//pqid
                parval: tblAmnt, //pdata,
                typeID: "4",
               userID: userdata.userId,
               branchID: userdata.branchId

            };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };
            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _NcdBondRePayment.SubmitReturn, 'dfgdfgfgdfgdfgd')

        }
    },
    SubmitReturn: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response.status == "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                var msg = jQuery.trim(response.data.message);
                //var msg = String.prototype.trim(response.data.message);
                if (response.data.errStatus = "1") {
                    swal({
                        title: "Requested Successfully!",
                        text: "",
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }
            }
            else if (response.responseMsg == "Invalid Token") {
                window.location.href = DOMAIN_URL;
            }
            else {
                var msg = jQuery.trim(response.responseMsg);
                swal({
                    title: "Error",
                    text: msg,
                    type: "error"
                }, function () {
                    window.location.reload(true);
                });
            }
        }
    },
    checkvalue: function () {

        var mainacc = jQuery('#ddl_mainAcc').val();
        var subacc = jQuery('#ddl_SubAcc').val();
        var account = jQuery('#ddl_accnt').val();
        

      
        if (jQuery("#rbtPublic").prop("checked") == false && jQuery("#rbtOther").prop("checked") == false) {
            swal("", "Please select an Option  Public issues and Other..!", "error");
            return false;
        }
        else if (jQuery("#rbtInterest").prop("checked") == false && jQuery("#rbtPrinciple").prop("checked") == false) {
            swal("", "Please select an Option Interest /principal..!", "error");
            return false;
        }
       
        else {
            return true;
        }
    },





}

jQuery(document).ready(function () {

    jQuery('#rbtPublic').on("click", function () {
        jQuery("#divPrincInter").show();

    });

    jQuery('#rbtOther').on("click", function () {
        jQuery("#divPrincInter").show();
    });



    jQuery('#rbtInterest').on("click", function () {
        jQuery("#maincard").show();
        jQuery("#divAddAc-count").show();
        jQuery("#divTotal").show();
        jQuery("#addbtn").show();
        jQuery("#DivTotalAmnt").show();
        _NcdBondRePayment.PrincipleIntrest();
        //_NcdBondRePayment.loadMainAccount();
        _NcdBondRePayment.tokenValidate();
    });

    jQuery('#rbtPrinciple').on("click", function () {
        jQuery("#maincard").show();
        jQuery("#divAddAc-count").show();
        jQuery("#divTotal").show();
        jQuery("#addbtn").show();
        jQuery("#DivTotalAmnt").show();
        _NcdBondRePayment.PrincipleIntrest();
        //_NcdBondRePayment.loadMainAccount();
        _NcdBondRePayment.tokenValidate();
    });

    jQuery("#ddl_mainAcc").on("change", function () {

        // jQuery("#ddlsubacsts").show();

        _NcdBondRePayment.loadSubAccount();
    });


    jQuery("#btnAdd").on("click", function () {


        _NcdBondRePayment.getToAddDtls();
    });


    jQuery("#btnConf").on("click", function () {


        _NcdBondRePayment.submitevalue();
    });
});
jQuery('#btnExit').on("click", function () {
    window.open("Dashboard", "_self");
});
function ReversCon(i) {
    tblData.splice(i, 1);
    _NcdBondRePayment.AddCustomer(tblData);
}