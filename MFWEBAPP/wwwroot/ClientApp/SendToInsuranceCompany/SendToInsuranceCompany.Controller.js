
var fromDate;
var toDate;
var memberCount;
var insuranceAmount;
var _sendToInsuranceCompany = {
    AgentFillLoadCompleted: function (response) {
        
      //  console.log(response.data.agentsList);

        if (response.status === "SUCCESS") {
          

            if (response.data.agentsList.length > 0) {

                jQuery("#ddlAgent").empty();
                jQuery("#ddlAgent").append(jQuery("<option></option>").val("0").text(" -------------- Choose Agent -------------- "));
                jQuery.each(response.data.agentsList, function (i, val) {
                    jQuery("#ddlAgent").append(jQuery("<option></option>").val(val.agentId).text(val.agentName));
                });
            }
            else {
                jQuery("#ddlAgent").empty();
                jQuery("#ddlAgent").append(jQuery("<option></option>").val("0").text(" -------------- Choose Agent -------------- "));
            }

        }
        else {

            jQuery("#ddlAgent").empty();
            jQuery("#ddlAgent").append(jQuery("<option></option>").val("0").text(" -------------- Choose Agent -------------- "));
        }

    },
    InsuranceTableFillCompleted: function (response) {
        
        
        //jQuery('#maincard').show();
        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {
           
            if (response.data.insurancePendingListData.length > 0) {
                jQuery("#downloadbtn").prop("disabled", false);

                memberCount = 0;
                insuranceAmount = 0;
                memberCount = response.data.insurancePendingListData.length;
                jQuery('#divmemberdetailstoinsurancecomp').empty();

                var $table = jQuery('<table class="table " id="tblInsuaranceCompany" >');

                $table.append('<thead ><tr><th style="text-align:center;">#</th><th style="text-align:left;">Branch Name</th><th style="text-align:left;">Center Name</th><th style="text-align:left;">Member Name</th><th style="text-align:right;">Premium Amount</th></tr></thead>');
                
                var $tbody = jQuery('<tbody>');

                jQuery.each(response.data.insurancePendingListData, function (i, val) {

                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(i + 1));
                    $row.append(jQuery('<td align="left">').html(val.branchName));
                    $row.append(jQuery('<td align="left">').html(val.centerName));
                    $row.append(jQuery('<td align="left">').html(val.memberName));
                    $row.append(jQuery('<td align="right">').html(val.premiumAmount));
                    insuranceAmount = insuranceAmount + parseInt(val.premiumAmount);
                    $tbody.append($row);
                });
                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divmemberdetailstoinsurancecomp').html($table);
                //start afsal's creation
               
                //var x = new CSVExport(response.data.insurancePendingListData);
                //return false;
                //end
            } else {
                jQuery('#divmemberdetailstoinsurancecomp').hide();
                jQuery('#divmemberdetailstoinsurancecomp').empty();
            }
        } else {

            _General.noData(jQuery('#divmemberdetailstoinsurancecomp'), "No Data Found");
            jQuery("#downloadbtn").prop("disabled", true);
        }
    },
    DownloadExcelCompleted: function (response) {
      

       
       
        if (response.status === "SUCCESS") {

          
            jQuery("#downloadbtn").prop("disabled", true);

           // console.log(response['data']['insuranceExcelDataIcici'])
            if (response.data.insuranceExcelDataIcici.length > 0) {
                //added by afsal
                var x = new CSVExport(response.data.insuranceExcelDataIcici);
                return false;
               
            } else {
                swal(response.responseMsg, "", "error");

            }
        }
        else {
            swal(response.responseMsg, "", "error");

            //jQuery("#downloadbtn").prop("disabled", true);


            //_General.noData(jQuery('#divmemberdetailstoinsurancecomp'), "No Data Found");
        }
        _sendToInsuranceCompany.InsuranceTableFill();

    },
    AgentFill: function () {
       
        _http.get(MFPUBLICLMSAPI_URL + "api/Insurance/agentslist", _sendToInsuranceCompany.AgentFillLoadCompleted, userdata.token)
    },
    InsuranceTableFill: function () {
        
        
        fromDate = jQuery("#fromDate").val();         
        toDate = jQuery("#toDate").val();
        
        var InsuranceTableFillData = {

            "accessLevelId": userdata.accessLevelId,
            "userId": userdata.userId,
            "fromDate": fromDate,
            "toDate": toDate,
            "agentId": jQuery("#ddlAgent").val()
        };

        _http.post(MFPUBLICLMSAPI_URL + "api/Insurance/insurancependinglist", InsuranceTableFillData,_sendToInsuranceCompany.InsuranceTableFillCompleted, userdata.token)
    },

    DownloadExcel: function () {
    

        var DownloadExcelData = {

            "agentId": jQuery("#ddlAgent").val(),
            "fromDate": fromDate,
            "toDate": toDate,
            "memberCount": memberCount,
            "insuranceAmount": insuranceAmount,
            "userId": userdata.userId,
            "accessLevelId": userdata.accessLevelId

        };

        _http.post(MFPUBLICLMSAPI_URL + "api/Insurance/insurance", DownloadExcelData, _sendToInsuranceCompany.DownloadExcelCompleted, userdata.token)
    }
}

jQuery(document).ready(function ($) {
   
    var opt = new Date();
    //var a = opt.format('mm/dd/yyyy');
    //var a = opt.toString('mm/dd/yyyy');
    //jQuery('#fromDate').val(a);
    jQuery('#maincard').hide();
    jQuery('.error').addClass("error-msg");
    jQuery('#bs_datepicker_container2 input').datepicker({
        autoclose: true,
        format: "mm/dd/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        minDate: new Date(),
        container: '#bs_datepicker_container2'
    }).datepicker("setDate", new Date());

    jQuery('#bs_datepicker_container3 input').datepicker({
        autoclose: true,
        format: "mm/dd/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        minDate: new Date(),
        container: '#bs_datepicker_container3'
    }).datepicker("setDate", new Date());
  
        if (fromDate == toDate)  {
           
            jQuery("#ddlAgent").prop("disabled", false);
            _sendToInsuranceCompany.AgentFill(); 

        }
   
    jQuery("#toDate").change(function (e) {
     
        var startDate = jQuery("#fromDate").val();
        var endDate = jQuery("#toDate").val();

        if ((Date.parse(startDate) > Date.parse(endDate))) {
           
            swal("", "To Date Should Be Greater Than From Date", "");
            jQuery("#toDate").val("");
        }
        jQuery("#ddlAgent").prop("disabled", false);
        _sendToInsuranceCompany.AgentFill();

    });

    jQuery("#fromDate").change(function (e) {
       
        var startDate = jQuery("#fromDate").val();
        var endDate = jQuery("#toDate").val();
        if ((Date.parse(startDate) > Date.parse(endDate))) {
            
            swal("", "From Date Should Be Less Than To Date", "");
            jQuery("#fromDate").val("");
        }
    });

    jQuery("#ddlAgent").change(function (e) {
        
        if (jQuery("#toDate").val() == "") {
            jQuery("#toDate").focus();
        }
        else if (jQuery("#fromDate").val() == "") {
            jQuery("#fromDate").focus();

        }
        else {
            _sendToInsuranceCompany.InsuranceTableFill();

        }
    });
    
    //jQuery(function () {
    //    jQuery(".exportToExcel").click(function (e) {
    //        var table = $(this).prev('.table2excel');
    //        if (table && table.length) {
    //            var preserveColors = (table.hasClass('table2excel_with_colors') ? true : false);
    //            jQuery(table).table2excel({
    //                exclude: ".noExl",
    //                name: "Excel Document Name",
    //                filename: "myFileName" + new Date().toISOString().replace(/[\-\:\.]/g, "") + ".xls",
    //                fileext: ".xls",
    //                exclude_img: true,
    //                exclude_links: true,
    //                exclude_inputs: true,
    //                preserveColors: preserveColors
    //            });
    //        }
    //    });

    //});



});

