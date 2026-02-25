var _Balancesheet = {
    BalancesheetFill: function () {
     
        var asondate = _Balancesheet.convertdateformat(jQuery('#dtToDate').val());

        jQuery('.page-loader-wrapper').show();
        var BalanceFilleData = {

            "typeId": 2,
            "asondata": asondate
        };
        BalanceFilleData = JSON.stringify(BalanceFilleData);
        BalanceFilleData = { "encryptedRqstStr": EncryptAPIReq(BalanceFilleData) };
        _http.post(MFPUBLICGENERALAPI_URL + "api/AMLAccounts/balanceSheet", BalanceFilleData, _Balancesheet.BalanceFilleDataLoad, userdata.token)


    },
    BalanceFilleDataLoad: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {
            response.data = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            var asondate = _Balancesheet.convertdateformat(jQuery('#dtToDate').val());
           
            if (response.data != null && response.data.balanceSheetDataList.length > 0) {
                var Particular = '<center><table width="65%" style="background-color:white;margin-bottom:50px"><tr style="border-bottom: 1px solid black;"><th width="30%" style="padding-left:5px;">Particulars</th><th width="30%" style="text-align:right;padding-right:25px"> As On ' + asondate +' </th></tr></center>';
                var uniqueIds = [];
                jQuery.each(response.data.balanceSheetDataList, function (i, el) {
                    if (jQuery.inArray(el.groupId + "^" + el.groupName, uniqueIds) === -1)
                        if (el.Flag != 2) uniqueIds.push(el.groupId + "^" + el.groupName);
                });

                jQuery.each(uniqueIds, function (i, val) {
                    var rd = val.split("^");

                    Particular += '<tr><td><b>' + rd[1] + '</b></td><td></td></tr>';
                    var totBal = 0, totAcc = 0, totTot = 0;
                    jQuery.each(response.data.balanceSheetDataList, function (j, sval) {
                        if (val[0] == sval.groupId && sval.Flag == "0") {
                            if (sval.SUBGROUPID > 0) {
                                Particular += '<tr><td width="65%" style="padding-left:40px"><a class="btn" onclick=_Balancesheet.DrilldownFill(' + sval.SUBGROUPID + ')>' + sval.subGroupName + '</a></td><td width="28%" style="text-align:right;padding-right:">' + (parseFloat(sval.amount)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</td></tr>';
                            }
                            else {
                                Particular += '<tr><td width="65%" style="padding-left:50px">' + sval.subGroupName + '</td><td width="28%" style="text-align:right;padding-right:">' + (parseFloat(sval.amount)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</td></tr>';
                            }
                        }
                        else if (val[0] == sval.groupId && sval.Flag == "2") {
                            Particular += '<tr ><td width="65%"><b>' + sval.groupName + '</b></td ><td width="28%" style="text-align:right;padding-right:"><b>' + (parseFloat(sval.amount)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</b></td></tr>';
                        }
                    });

                });



                jQuery("#table").html(Particular);

            }

        }

       // _Balancesheet.date();
    },
    //date: function () {
    //    if ((localStorage.getItem("dtToDate")) != null) {

    //        var d = localStorage.getItem("dtToDate");


    //        //var clientid = client.split('-')[0];
    //        //var clientname = client.split('-')[1];
    //        ////jQuery("#customerid").val(clientid);
    //        //jQuery("#customername").val(client);



    //    }
    //},
    DrilldownFill: function (SUBGROUPID) {
        jQuery('.page-loader-wrapper').show();
        var asondate = _Balancesheet.convertdateformat(jQuery('#dtToDate').val());
        jQuery("#table").html('');
        var FilleData = {

            "typeId": 3,
            "subgroupID": SUBGROUPID,
            "asondata": asondate

        };

        FilleData = JSON.stringify(FilleData);
        FilleData = { "encryptedRqstStr": EncryptAPIReq(FilleData) };
        _http.post(MFPUBLICGENERALAPI_URL + "api/AMLAccounts/balanceSheet", FilleData, _Balancesheet.FilleDataLoad, userdata.token)

    },


    FilleDataLoad: function (response) {
        if (response.status === "SUCCESS") {
            response.data = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            jQuery('#back').show();


            var Particular = '<center><table width="65%" style="background-color:white;margin-bottom:50px"><tr style="border-bottom: 1px solid black;"><th style="padding-left:50px;">ACCOUNT NAME</th><th width="20%" style="padding-left:0px;text-align:right;padding-right:90px">BALANCE</th><th width="10%" style="text-align:right;padding-right:110px">ACCRUAL</th><th width="10%" style="text-align:right;padding-right:95px">ADJUSTMENT</th><th width="20%" style="text-align:right;padding-right:"> AMOUNT</th></tr></center>';
            // var Particular = '<center><table width="50%" style="background-color:white;margin-bottom:px"><tr style="border-bottom: 1px solid black;"><th width="30%" style="">ACCOUNT NAME</th><th width="%" style="padding-left:px;text-align:right">TOTAL</th></tr></center>';
            if (response.data != null && response.data.balanceSheetDataList.length > 0) {

                jQuery.each(response.data.balanceSheetDataList, function (j, sval) {
                    if (sval.accountNo == -1) {
                        Particular += '<tr><td width="47%" style="padding-left:50px">' + sval.AccountName + '</td><td width="10%" style="text-align:right;padding-right:90px"><b>' + parseFloat(sval.BALANCE).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</b></td><td width="15%" style="text-align:right;padding-right:120px"><b>' + (parseFloat(sval.ACCRUAL)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</b></td><td width="10%" style="text-align:right;padding-right:90px"><b>' + parseFloat(sval.ADJUSTMENTS).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</b></td><td width="20%" style="text-align:right;padding-right:"><b>' + (parseFloat(sval.amount)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</b></td></tr>';

                        //Particular += '<tr><td width="65%" style="text-align:left;">' + sval.accountName + '</td><td width="28%" style="text-align:right;padding-right:"><b>' + (parseFloat(sval.amount)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</b></td></tr>';


                    }
                    else
                        Particular += '<tr><td width="47%" style="padding-left:50px">' + sval.AccountName + '</td><td width="10%" style="text-align:right;padding-right:90px">' + parseFloat(sval.BALANCE).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</td><td width="15%" style="text-align:right;padding-right:120px">' + (parseFloat(sval.ACCRUAL)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</td><td width="10%" style="text-align:right;padding-right:90px">' + parseFloat(sval.ADJUSTMENTS).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</td><td width="18%" style="text-align:right;padding-right:">' + (parseFloat(sval.amount)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</td></tr>';

                    //Particular += '<tr><td width="65%" style="text-align:left;">' + sval.accountName + '</td><td width="28%" style="text-align:right;padding-right:">' + (parseFloat(sval.amount)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</td></tr>';


                });



                jQuery("#table").html(Particular);

            }
        }
    },
    convertdateformat: function (dt) {
        ndt = dt.replace(/\//g, '-');
        var vyear = ndt.split('-')[2];
        var vmonth = ndt.split('-')[1];
        var vday = ndt.split('-')[0];
        return vday + '-' + vmonth + '-' + vyear;
    }

}

var formattedDate = new Date();     
var asondate = new Date();
jQuery(document).ready(function ($) {
    jQuery('.page-loader-wrapper').hide();

 

    jQuery('#bs_datepicker_container5 input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        endDate: new Date(),
        endDate: '-1d',
        container: '#bs_datepicker_container5'
    }).datepicker("setDate", new Date());

  





    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    formattedDate = formatDate(yesterday);
    $("#date-info").append(formattedDate);

    function formatDate(date) {
        var monthNames = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];

        var month = monthNames[date.getMonth()];
        var day = date.getDate();
        var year = date.getFullYear();

        return month + " " + day + ", " + year;
    }

   /* _Balancesheet.BalancesheetFill();*/



    jQuery('#back').on('click', function () {


     
        _Balancesheet.BalancesheetFill();
        jQuery('#balance').show();
        jQuery('#back').hide(); 

    });


    jQuery('#viewData').on('click', function () {

        _Balancesheet.BalancesheetFill();
        jQuery('#balance').show();

              
      
    });


   


});