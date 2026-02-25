
var tblData = [];
var _AcctEntry = {
    //Select ACCOUNTING ENTRY
    loadacct: function () {
        
        jQuery('.page-loader-wrapper').show();
        var DebSelectLoan = {
            Flag: "Accountentry",
            PagVal: "SelectACC"
        };

        DebSelectLoan = JSON.stringify(DebSelectLoan);
        DebSelectLoan = { "encryptedRqstStr": EncryptAPIReq(DebSelectLoan) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", DebSelectLoan, _AcctEntry.Acctnumberresp, userdata.token);

    },
    Acctnumberresp: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlaccno").empty();
                jQuery("#ddlaccno").append(jQuery("<option></option>").val("0").text(" --------CHOOSE   ACCOUNTING ENTRY  -------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlaccno").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlaccno").empty();
                jQuery("#ddlaccno").append(jQuery("<option></option>").val("0").text(" --------CHOOSE ACCOUNTING ENTRY-------- "));
            }
            jQuery('.page-loader-wrapper').hide();

        }

    },

    //Select Sub Account No


    SubAccountNo: function (sub) {
        jQuery('.page-loader-wrapper').show();



        var sub = jQuery('#ddlaccno').val();


        var FromLoanDtls = {
            Flag: "Accountentry",
            PagVal: "selectSubACC",
            parVal: sub

        };

        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };

        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _AcctEntry.FromLoanDtlsResponse, userdata.token);

    },
    FromLoanDtlsResponse: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlsubacc").empty();
                jQuery("#ddlsubacc").append(jQuery("<option></option>").val("0").text(" --------SELECT SUB ACCOUNT -------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlsubacc").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlsubacc").empty();
                jQuery("#ddlsubacc").append(jQuery("<option></option>").val("0").text(" --------SELECT SUB ACCOUNT-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //Select Sub ID


    SSubid: function (sub) {
        jQuery('.page-loader-wrapper').show();



        var indata = jQuery('#ddlaccno').val() + 'µ' + jQuery('#ddlsubacc').val() ;



        var FromLoanDtls = {
            Flag: "Accountentry",
            PagVal: "SelectSubId",
            parVal: indata

        };
        FromLoanDtls = JSON.stringify(FromLoanDtls);
        FromLoanDtls = { "encryptedRqstStr": EncryptAPIReq(FromLoanDtls) };
        _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasurySelectDataQueries", FromLoanDtls, _AcctEntry.SSubidresp, userdata.token);

    },
    SSubidresp: function (response) {

        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                jQuery('.page-loader-wrapper').hide();

                jQuery("#ddlsubid").empty();
                jQuery("#ddlsubid").append(jQuery("<option></option>").val("0").text(" --------SELECT SUB ID -------- "));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlsubid").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));
                });

            }
            else {

                jQuery("#ddlsubid").empty();
                jQuery("#ddlsubid").append(jQuery("<option></option>").val("0").text(" --------SELECT SUB ID-------- "));
            }
            jQuery('.page-loader-wrapper').hide();
        }
    },

    //Add Button Table display
    addfuntion: function () {
        jQuery('.page-loader-wrapper').hide();
        jQuery('#maincard').show();
        jQuery('#Filldatatabl').empty();

        var accountnum = jQuery("#ddlaccno").val()
        var subaccnum = jQuery("#ddlsubacc").val()
        var subid = jQuery("#ddlsubid").val()
        var describtion = jQuery("#description").val()
        var amount = jQuery("#amount").val()
        var selecttype = jQuery("#ddltype").val()
        // selecttype = jQuery("#ddltype option:selected").text();


        if ($("#ddltype option:selected").val() == 0) {
            debit = document.getElementById("amount").value;
            credit = 0;

        }
        else {
            credit = document.getElementById("amount").value;
            debit = 0;
        }


        if (accountnum == 0) {
            swal("Please select bank!!!....", "", "warning");
            return false;

        }
        else if (subaccnum == 0) {
            swal("Please select branch!!!....", "", "warning");
            return false;

        }
        else if (subid == 0) {
            swal("Please select account!!!....", "", "warning");
            return false;

        }
        else if (describtion == "") {
            swal("Please enter amount!!!....", "", "warning");
            return false;

        }


        else if (amount == "") {
            swal("Please enter amount!!!....", "", "warning");
            return false;

        }

        else {

           

            if ($("#ddltype option:selected").val() == 0) {
                debit = document.getElementById("amount").value;
                credit = 0;

            }
            else {
                credit = document.getElementById("amount").value;
                debit = 0;
            }

            var RowData = {

                'accountnum': accountnum,
                'subaccnum': subaccnum,
                'subid': subid,
                'describtion': describtion,
                'credit': credit,
                'debit': debit,
                

            };

            tblData.push(RowData);
            _AcctEntry.AddCustomer(tblData);
        }


        
    },


    AddCustomer: function (tblData) {

        if (tblData != null && tblData.length > 0) {

            jQuery('#maincards').show();
            jQuery('.page-loader-wrapper').hide();
            jQuery('#divcustomertable').empty();

            var $table = jQuery('<table class="table" id="tbladd">');
            $table.append
                ('<thead><tr> <th style="text-align:center;">ACCOUNT NUMBER</th><th style="text-align:center;">SUB ACC</th><th style="text-align:center;">SUB ID</th><th style="text-align:center;">DESCRIPTION</th><th style="text-align:center;">CREDIT</th><th style="text-align:center;">DEBIT</th><th style="text-align:center;">DELETE</th></thead>')
            var $tbody = jQuery('<tbody>');

            jQuery.each(tblData, function (i, val) {

                var $row = jQuery('<tr/>');
              
                $row.append(jQuery('<td align="center">').html(val.accountnum));
                $row.append(jQuery('<td align="center">').html(val.subaccnum));
                $row.append(jQuery('<td align="center">').html(val.subid));
                $row.append(jQuery('<td align="center">').html(val.describtion));
                $row.append(jQuery('<td align="center">').html(val.credit));
                $row.append(jQuery('<td align="center">').html(val.debit));

                //$row.append(jQuery('<td class="HCol" align="left">').html($("#description").val()));
                //$row.append(jQuery('<td class="HCol" align="left">').html(debit));
                //$row.append(jQuery('<td class="HCol" align="left">').html(credit));



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
        _AcctEntry.debitamtfuntion();
        

    },




    debitamtfuntion: function () {
        jQuery('.page-loader-wrapper').hide();
        
        var table = document.getElementById('tbladd');
        var rowLength = table.rows.length;
        var DbValue = 0;
        var crValue = 0;
        
        for (i = 1; i < rowLength; i++) {
            DbValue = parseFloat(DbValue) + parseFloat(table.rows[i].cells[5].innerHTML);
            crValue = parseFloat(crValue) + parseFloat(table.rows[i].cells[4].innerHTML);
            // AddToTable();

        }
        
        jQuery("#txtdebit").val(DbValue);

        jQuery("#txtcredit").val(crValue);





       

    },


   




    //Account Entry  popup
    checkvalues: function () {
        var SelectAcctno = jQuery('#ddlaccno').val();
        var SelectSubacctno = jQuery('#ddlsubacc').val();
        var SSUBID = jQuery('#ddlsubid').val();
        var Description = jQuery('#description').val();
        var Amount = jQuery('#amount').val();
        var Stype = jQuery('#ddltype').val();
        




        if (SelectAcctno == 0) {
            swal("", "Please Select Account Number", "error");
            return false;
        }
        else if (SelectSubacctno == 0) {
            swal("", "Please  Select Sub Account Number", "error");
            return false;
        }
        else if (SSUBID == 0) {
            swal("", "Please Select Sub ID", "error");
            return false;
        }
       
        else if (Description == 0) {
            swal("", "Please Enter Description", "error");
            return false;
        }
        else if (Amount == 0) {
            swal("", "Please Select Amount", "error");
            return false;
        }
        else if (Stype == 0) {
            swal("", "Please  Select Type", "error");
            return false;
        }
        else
            return true;

    },



/*validation confirm button.*/

    Submitfuntion: function () {

        if (_AcctEntry.checkvalues()) {
            var tblaccData= "";
            var table = document.getElementById('tbladd');
            var rowLength = table.rows.length;
            for (j = 1; j < rowLength; j++) {

                if (table.rows[j].cells[4].innerText == 0) {

                    amount = table.rows[j].cells[5].innerText;
                    type = "credit";
                }
                else {
                    amount = table.rows[j].cells[4].innerText;
                    type = "debit";
                }
                tblaccData = tblaccData + table.rows[j].cells[0].innerText + "µ" + table.rows[j].cells[1].innerText + "µ" + table.rows[j].cells[2].innerText + "µ" + table.rows[j].cells[3].innerText + "µ" + amount + "µ" + type + "¥";
            }

    var submitRequest = {

        Flag: "PRINCIPLEINTERESTCONFIRM",
        ParVal: tblaccData
    };
            submitRequest = JSON.stringify(submitRequest);
            submitRequest = { "encryptedRqstStr": EncryptAPIReq(submitRequest) };
            _http.post(MFPUBLICTREASURYAPI_URL + "api/Treasury/TreasuryConfirmation", submitRequest, _AcctEntry.SubmitReturn, 'dfgdfgfgdfgdfgd')
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
                if (response.data.queryResult.QueryResult[0]) {
                    swal({
                        title: "confirm Successfully!",
                        text: "",
                        type: "success"
                    }, function () {
                        window.location.reload(true);
                    });
                }


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








}

jQuery(document).ready(function () {

    _AcctEntry.loadacct();
    jQuery("#maincardadd").hide();
});

jQuery('#ddlaccno').on("change", function () {

    jQuery('#subaccload').show();

        _AcctEntry.SubAccountNo();
    });

jQuery('#ddlsubacc').on("change", function () {

    jQuery('#subidload').show();

    _AcctEntry.SSubid();
});
jQuery('#btnAdd').on("click", function () {

    jQuery("#debitcredit").show();
    jQuery("#maincard").show();
    _AcctEntry.addfuntion();
    _AcctEntry.debitamtfuntion();


    //DbValue = DbValue + parseFloat(table.rows[i].cells[4].innerText);
    //crValue = crValue + parseFloat(table.rows[i].cells[5].innerText);
 
    //jQuery('#txtdebit').val(DbValue);
    //jQuery('#txtcredit').val(crValue);
    
});

jQuery('#btnsubmit').on("click", function () {
       _AcctEntry.Submitfuntion();
});


function ReversCon(i) {
    tblData.splice(i, 1);
    _AcctEntry.AddCustomer(tblData);
}