var designerData = {};
var comboid = 0;
var DrilfileldId = 0;
var LinkLevelId = "";
var xlfileName = "";
var rptName = "";
var rptsubheading = "";
var rptsubheadingcmb = "";
var rptsubheadingtxt = "";
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
var intRegex = /^\d+$/;
var floatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;
var BackwardManger = new Array();
MicroReports = {

    MicroReportsDesignMakerLoadCompleated: function (response) {

        if (response.status === "SUCCESS") {
            jQuery('#btnMicroSubmit').show();

            response.data = JSON.parse(DecryptAPIReq(response.data.encryptedStr));
            if (response.data.dynamicReportDatas.length > 0) {

                designerData = response.data.dynamicReportDatas;
                jQuery("#ddlMicrRptName").empty();
                jQuery("#ddlMicrRptName").append(jQuery("<option></option>").val("0").text(" -------- Choose Report Name ------"));
                jQuery.each(response.data.dynamicReportDatas, function (i, val) {
                    jQuery("#ddlMicrRptName").append(jQuery("<option></option>").val(val.reportId).text(val.reportName));
                });
            }
            else {
                jQuery("#ddlMicrRptName").empty();
                jQuery("#ddlMicrRptName").append(jQuery("<option></option>").val("0").text(" -------- Choose Report Name ------"));
            }

        }
        else {

            jQuery("#ddlMicrRptName").empty();
            jQuery("#ddlMicrRptName").append(jQuery("<option></option>").val("0").text(" -------- Choose Report Name ------"));
        }
    },
    MicroReportsDynCombofillCompleated: function (response) {

        if (response.status === "SUCCESS") {

            comboid = comboid + 1;

            if (response.data.resultset.length > 0) {
                combofilldata = "";
                //designerData = response.data.dynamicReportDatas;
                jQuery('#ddlDynCombo' + comboid + '').empty();
                //jQuery('#ddlDynCombo' + comboid +'').append(jQuery("<option></option>").val("0").text(" -------- Choose ------"));
                jQuery.each(response.data.resultset, function (i, val) {
                    var combofilldata = val.value.split('||')
                    jQuery('#ddlDynCombo' + comboid + '').append(jQuery("<option></option>").val(combofilldata[0]).text(combofilldata[1]));
                });
            }
            else {
                jQuery('#ddlDynCombo' + comboid + '').empty();
                jQuery('#ddlDynCombo' + comboid + '').append(jQuery("<option></option>").val("0").text(" -------- Choose  ------"));
            }

        }
        else {

            jQuery('#ddlDynCombo' + comboid + '').empty();
            jQuery('#ddlDynCombo' + comboid + '').append(jQuery("<option></option>").val("0").text(" -------- Choose ------"));
        }
    },
    MicroReportsDesignMaker: function () {

        var MicroReportsDesignMakerData = {

            "accessLevelId": -1,//userdata.accessLevelId,
            "userId": userdata.userId,
            "branchId": userdata.branchId,
            "moduleId": 1

        };

        MicroReportsDesignMakerData = JSON.stringify(MicroReportsDesignMakerData);
        MicroReportsDesignMakerData = { "encryptedStr": EncryptAPIReq(MicroReportsDesignMakerData) };

        _http.post(MFPUBLICCUSTOMERAPI_URL + "reports/dynamicreport", MicroReportsDesignMakerData, MicroReports.MicroReportsDesignMakerLoadCompleated, userdata.token)
    },

    MicroReportsDynCombofill: function (query) {

        var MicroReportsDynCombofillData = {

            "userId": userdata.userId,
            "branchId": userdata.branchId,
            "accessLevelId": -1, //userdata.accessLevelId,
            "query": query

        };

        MicroReportsDynCombofillData = JSON.stringify(MicroReportsDynCombofillData);
        MicroReportsDynCombofillData = { "encryptedStr": EncryptAPIReq(MicroReportsDynCombofillData) };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "reports/combofill", MicroReportsDynCombofillData, MicroReports.MicroReportsDynCombofillCompleated, userdata.token)
    },

    fileldShower: function (data) {

        jQuery.each(designerData, function (i, val) {

            if (val.reportId == data) {

                if (val.comboId != "0") {
                    var cmbId = parseInt(val.comboId);
                    var queryData = val.comboQuery.split('$');
                    for (i = 1; i <= cmbId; i++) {


                        jQuery('#DivddlDynCombo' + i + '').show();
                        MicroReports.MicroReportsDynCombofill(queryData[i - 1]);
                    }
                }

                if (val.dateField != "0") {

                    var cmbId = parseInt(val.dateField);
                    for (i = 1; i <= cmbId; i++) {

                        jQuery('#bs_datepicker_container' + i + '').show();
                    }
                }

                if (val.textFieldId != "0") {

                    var cmbId = parseInt(val.textFieldId);
                    for (i = 1; i <= cmbId; i++) {

                        var labeldata = val.textFieldCaption.split('$')
                        jQuery('#DivtxtDyn' + i + '').show();
                        jQuery('#lblDyn' + i + '').text(labeldata[i - 1]);

                    }
                }


            }
        });

    },
    dataTableViewerCompleted: function (response) {
        debugger;
        BackwardManger.push(response);
        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {
            jQuery('#btnexport').show();
            jQuery('#btnPdf').show();
            jQuery('#backButton').show();
            response.data = JSON.parse(DecryptAPIReq(response.data.encryptedStr));
            if (response.data.reportDatas.length > 0) {
                if (response.data.panelValue != 'null') {
                    var headandpanel = response.data.panelValue.split('$')
                    jQuery('#Heading').text(headandpanel[1].toString())
                    if (headandpanel[0] == 'nill') {

                    
                    var firstLevel = headandpanel[0].split('~');
                    var $custDtailsData;
                    jQuery('#custDetailsDiv').show();
                    jQuery.each(firstLevel, function (i, val) {
                        debugger;
                        var custData = val.split('!')
                        var count = i + 1;
                        jQuery('#custLabel' + count).text(custData[0] + ':' + custData[1]);


                    });
                    }
                    else {
                        jQuery('#custDetailsDiv').hide();
                    }
                }
                else {
                    jQuery('#custDetailsDiv').hide();
                }
                var headersData = response.data.headers;
                var headers = headersData.split("||");
                LinkLevelId = response.data.linklevelId;
                jQuery('#divMicroRptTable').empty();
                var slno = "Sl No."
                var $table = jQuery('<table class="table" id="tblmicrodetails">');
                var $thead = jQuery('<thead id="sumTableHead">')
                var $row1 = jQuery('<tr/>');
                $row1.append(jQuery('<th align="center" style="text-align:center;">').html(slno));
                DrilfileldId = -1;
                jQuery.each(headers, function (i, val) {
                    var TierChecker = val.split("~");
                    if (response.data.linkField == TierChecker[0]) {
                        DrilfileldId = i;
                    }
                    var splithead = val.split('~')
                    var hds = splithead[0];
                    var algnmnt = splithead[1];

                    $row1.append(jQuery('<th align="center" style="text-align:' + algnmnt + ';">').html(hds));

                    $thead.append($row1);
                });
                $thead.append('</thead>');
                $table.append($thead);
                var $tbody = jQuery('<tbody id="tblUserList">');

                jQuery.each(response.data.reportDatas, function (i, val) {
                    debugger;
                    var rowsData = val.value;
                    var color = rowsData.split("^");
                    var dataBinder = color[0].split("||");
                    if (dataBinder[0] == -1) {
                        var $row = jQuery('<tr style="background:#777373;"/>');
                        $row.append(jQuery('<td align="center" style="color:#777373;">').html(i + 1));
                    }
                    else {
                        if (color[1] != "") {
                            var $row = jQuery('<tr style="background-color:' + color[1] + ';">');
                        }
                        else {
                            var $row = jQuery('<tr/>');
                        }
                        $row.append(jQuery('<td align="center">').html(i + 1));
                    }

                    jQuery.each(dataBinder, function (i, val) {
                        debugger
                        if (DrilfileldId == i) {
                            debugger
                            if (dataBinder[0] == -1) {
                                debugger
                                if (intRegex.test(val) || floatRegex.test(val)) {
                                    debugger
                                    $row.append(jQuery('<td align="right" style="font-weight: bold; color:white;" onclick = "">').html(val));
                                }
                                else {
                                    $row.append(jQuery('<td align="left" style="font-weight: bold; color:white;" onclick = "">').html(val));
                                }
                            }
                            else {

                                if (intRegex.test(val) || floatRegex.test(val)) {
                                    $row.append(jQuery('<td align="right" style="color:blue;cursor: pointer;" onclick = "MicroReports.dataTableViewer(1,' + dataBinder[0] + ',' + dataBinder[1] + ')">').html(val));
                                }
                                else {
                                    $row.append(jQuery('<td align="left" style="color:blue;cursor: pointer;" onclick = "MicroReports.dataTableViewer(1,' + dataBinder[0] + ',' + dataBinder[1] + ')">').html(val));
                                }

                            }




                        }
                        else {
                            if (dataBinder[0] == -1) {
                                if (intRegex.test(val) || floatRegex.test(val)) {
                                    $row.append(jQuery('<td align="right" style="font-weight: bold;color:white; ">').html(val));
                                }
                                else {
                                    $row.append(jQuery('<td align="left" style="font-weight: bold;color:white;">').html(val));
                                }
                            }
                            else {
                                if (intRegex.test(val) || floatRegex.test(val)) {
                                    $row.append(jQuery('<td align="right" >').html(val));
                                }
                                else {
                                    $row.append(jQuery('<td align="left" >').html(val));
                                }
                            }

                        }

                        $tbody.append($row);
                    });
                    dataBinder = "";
                    dataset = "";
                });

                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divMicroRptTable').html($table);
                jQuery('#tblmicrodetails').DataTable({
                    "aLengthMenu": [[-1, 75, 50, 25, 10, 8], ["All", 75, 50, 25, 10, 8]],
                    "iDisplayLength": -1,
                    "ordering": false,
                    "info": false,
                    "columnDefs": [
                        {
                            "targets": [1],
                            "visible": false,
                            "searchable": false
                        },
                        {
                            "targets": [2],
                            "visible": false,
                            "searchable": false
                        },
                    ]
                });
                jQuery('#tblmicrodetails_wrapper').removeClass('form-inline');
                jQuery('.page-loader-wrapper').hide();

            } else {
                jQuery('#divMicroRptTable').hide();
                jQuery('#divMicroRptTable').empty();
                jQuery('.page-loader-wrapper').hide();
            }
        } else {
            jQuery('.page-loader-wrapper').hide();
            _General.noData(jQuery('#divMicroRptTable'), "No Data Found");
            jQuery('#divMicroRptTable').attr('align', 'center')
        }
    },
    dataTableViewerBackwardButtonCompleted: function (response) {

        debugger;
        jQuery('#maincard').show();
        if (response.status === "SUCCESS") {
            jQuery('#btnexport').show();
            jQuery('#btnPdf').show();
            jQuery('#backButton').show();
            response.data = JSON.parse(DecryptAPIReq(response.data.encryptedStr));
            if (response.data.reportDatas.length > 0) {
                var headersData = response.data.headers;
                var headers = headersData.split("||");
                LinkLevelId = response.data.linklevelId;
                jQuery('#divMicroRptTable').empty();
                var slno = "Sl No."
                var $table = jQuery('<table class="table" id="tblmicrodetails"  >');
                var $thead = jQuery('<thead id="sumTableHead">')
                var $row1 = jQuery('<tr/>');
                $row1.append(jQuery('<th align="center" style="text-align:center;">').html(slno));
                DrilfileldId = -1;
                jQuery.each(headers, function (i, val) {
                    var drillchecker = val.split("~")
                    if (response.data.linkField == drillchecker[0]) {
                        DrilfileldId = i;
                    }


                    var splithead = val.split('~')
                    var hds = splithead[0];
                    var algnmnt = splithead[1];

                    $row1.append(jQuery('<th align="center" style="text-align:' + algnmnt + ';">').html(hds));

                    $thead.append($row1);
                });
                $thead.append('</thead>');
                $table.append($thead);
                var $tbody = jQuery('<tbody id="tblUserList">');

                jQuery.each(response.data.reportDatas, function (i, val) {
                    if (response.data.panelValue != 'null') {
                        var firstLevel = response.data.panelValue.split('~');
                        var $custDtailsData;
                        jQuery('#custDetailsDiv').show();
                        jQuery.each(firstLevel, function (i, val) {
                            debugger;
                            var custData = val.split('!')
                            var count = i + 1;
                            jQuery('#custLabel' + count).text(custData[0] + ':' + custData[1]);


                        });

                    }
                    else {
                        jQuery('#custDetailsDiv').hide();
                    }
                    var rowsData = val.value;
                    var color = rowsData.split("^");
                    var dataBinder = color[0].split("||");
                    if (dataBinder[0] == -1) {
                        var $row = jQuery('<tr style="background:#777373;"/>');
                        $row.append(jQuery('<td align="center" style="color:#777373;">').html(i + 1));
                    }
                    else {
                        if (color[1] != "") {
                            var $row = jQuery('<tr style="background-color:' + color[1] + '">');
                        }
                        else {
                            var $row = jQuery('<tr>');
                        }

                        $row.append(jQuery('<td align="center">').html(i + 1));
                    }

                    jQuery.each(dataBinder, function (i, val) {

                        if (DrilfileldId == i) {
                            if (dataBinder[0] == -1) {
                                if (intRegex.test(val) || floatRegex.test(val)) {
                                    $row.append(jQuery('<td align="right" style="font-weight: bold;" onclick = "">').html(val));
                                }
                                else {
                                    $row.append(jQuery('<td align="left" style="font-weight: bold;" onclick = "">').html(val));
                                }
                            }
                            else {

                                if (intRegex.test(val) || floatRegex.test(val)) {
                                    $row.append(jQuery('<td align="right" style="color:blue;cursor: pointer;" onclick = "MicroReports.dataTableViewer(1,' + dataBinder[0] + ',' + dataBinder[1] + ')">').html(val));
                                }
                                else {
                                    $row.append(jQuery('<td align="left" style="color:blue;cursor: pointer;" onclick = "MicroReports.dataTableViewer(1,' + dataBinder[0] + ',' + dataBinder[1] + ')">').html(val));
                                }

                            }




                        }
                        else {
                            if (dataBinder[0] == -1) {
                                if (intRegex.test(val) || floatRegex.test(val)) {
                                    $row.append(jQuery('<td align="right" style="font-weight: bold;">').html(val));
                                }
                                else {
                                    $row.append(jQuery('<td align="left" style="font-weight: bold;">').html(val));
                                }
                            }
                            else {
                                if (intRegex.test(val) || floatRegex.test(val)) {
                                    $row.append(jQuery('<td align="right" >').html(val));
                                }
                                else {
                                    $row.append(jQuery('<td align="left" >').html(val));
                                }
                            }

                        }

                        $tbody.append($row);
                    });
                    dataBinder = "";
                    dataset = "";
                });

                $tbody.append('</tbody>');
                $table.append($tbody);
                $table.append('</table>');
                jQuery('#divMicroRptTable').html($table);
                jQuery('#tblmicrodetails').DataTable({
                    "aLengthMenu": [[-1, 75, 50, 25, 10, 8], ["All", 75, 50, 25, 10, 8]],
                    "iDisplayLength": -1,
                    "ordering": false,
                    "info": false,
                    "columnDefs": [
                        {
                            "targets": [1],
                            "visible": false,
                            "searchable": false
                        },
                        {
                            "targets": [2],
                            "visible": false,
                            "searchable": false
                        },
                    ]
                });
                jQuery('#tblmicrodetails_wrapper').removeClass('form-inline');


            } else {
                jQuery('#divMicroRptTable').hide();
                jQuery('#divMicroRptTable').empty();
            }
        } else {
            _General.noData(jQuery('#divMicroRptTable'), "No Data Found");
            jQuery('#divMicroRptTable').attr('align', 'center')
        }
    },
    dataTableViewer: function (data, ParamValue, ctegoryId) {
        debugger;
        jQuery('.page-loader-wrapper').show();
        var a = jQuery('#ddlMicrRptName').val();
        //jQuery('#rptHeadName').val(')
        var formatted_date = "";

        if (jQuery('#dtFromDate').val() != "") {
            var d1 = jQuery('#dtFromDate').val()
            var d2 = d1.split('/');
            var d3 = d2[1] + '/' + d2[0] + '/' + d2[2];
            var current_datetime = new Date(d3);
            formatted_date = current_datetime.getDate() + "/" + months[current_datetime.getMonth()] + "/" + current_datetime.getFullYear() + "!";
        }
        if (jQuery('#dtToDate').val() != "") {
            var c1 = jQuery('#dtToDate').val()
            var c2 = c1.split('/');
            var c3 = c2[1] + '/' + c2[0] + '/' + c2[2];
            var to_datetime = new Date(c3);
            formatted_date = formatted_date + to_datetime.getDate() + "/" + months[to_datetime.getMonth()] + "/" + to_datetime.getFullYear();
        }



        var cmbBindData = "";
        if (jQuery('#ddlDynCombo1').val() != null) {

            cmbBindData = cmbBindData + jQuery('#ddlDynCombo1').val().toString() + "!";
        }
        if (jQuery('#ddlDynCombo2').val() != null) {

            cmbBindData = cmbBindData + jQuery('#ddlDynCombo2').val().toString() + "!";
        }
        if (jQuery('#ddlDynCombo3').val() != null) {

            cmbBindData = cmbBindData + jQuery('#ddlDynCombo3').val().toString();
        }

        var txtBindData = "";
        if (jQuery('#txtDyn1').val() != "") {

            txtBindData = txtBindData + jQuery('#txtDyn1').val().toString() + "!";
        }
        if (jQuery('#txtDyn2').val() != "") {

            txtBindData = txtBindData + jQuery('#txtDyn2').val().toString() + "!";
        }
        if (jQuery('#txtDyn3').val() != "") {

            txtBindData = txtBindData + jQuery('#txtDyn3').val().toString();
        }

        if (data == 0) {




            var dataTableViewerData = {

                "reportId": parseInt(a),
                "levelId": 1,
                "userId": userdata.userId,
                "branchId": userdata.branchId,
                "linkField": "",
                "textBoxData": txtBindData,
                "comboBoxData": cmbBindData,
                "dateData": formatted_date,
                "categoryId": 1
            };
        }
        else {


            var dataTableViewerData = {

                "reportId": parseInt(a),
                "levelId": parseInt(LinkLevelId),
                "userId": userdata.userId,
                "branchId": userdata.branchId,
                "linkField": ParamValue,
                "textBoxData": txtBindData,
                "comboBoxData": cmbBindData,
                "dateData": formatted_date,
                "categoryId": ctegoryId
            };
        }

        dataTableViewerData = JSON.stringify(dataTableViewerData);
        dataTableViewerData = { "encryptedStr": EncryptAPIReq(dataTableViewerData) };
        _http.post(MFPUBLICCUSTOMERAPI_URL + "reports/generatedynamicreport", dataTableViewerData, MicroReports.dataTableViewerCompleted, userdata.token)

    },
    RefresherOfTheForm: function () {

        jQuery('#custDetailsDiv').hide();
        jQuery('#bs_datepicker_container1').hide();
        jQuery('#dtFromDate').val('');
        jQuery('#bs_datepicker_container2').hide();
        jQuery('#dtToDate').val('');
        jQuery('#DivddlDynCombo1').hide();
        jQuery('#ddlDynCombo1').empty();
        jQuery('#ddlDynCombo2').empty();
        jQuery('#ddlDynCombo3').empty();
        jQuery('#divMicroRptTable').empty();
        jQuery('#DivddlDynCombo2').hide();
        jQuery('#DivddlDynCombo3').hide();
        jQuery('#DivtxtDyn1').hide();
        jQuery('#txtDyn1').val('');
        jQuery('#txtDyn2').val('');
        jQuery('#txtDyn2').val('');
        jQuery('#DivtxtDyn2').hide();
        jQuery('#DivtxtDyn3').hide();
        jQuery('#maincard').show();
    }
}

MicroReports.MicroReportsDesignMaker();

jQuery(document).ready(function ($) {
    jQuery('.page-loader-wrapper').hide();
    jQuery('.error').addClass("error-msg");
    jQuery('#btnMicroSubmit').show();
    jQuery('#btnexport').hide();
    jQuery('#btnPdf').hide();
    jQuery('#custDetailsDiv').hide();
    jQuery('#bs_datepicker_container1').hide();
    jQuery('#bs_datepicker_container2').hide();
    jQuery('#DivddlDynCombo1').hide();
    jQuery('#DivddlDynCombo2').hide();
    jQuery('#DivddlDynCombo3').hide();
    jQuery('#DivtxtDyn1').hide();
    jQuery('#DivtxtDyn2').hide();
    jQuery('#DivtxtDyn3').hide();
    jQuery('#maincard').show();
    jQuery('#backButton').hide();
    jQuery('#Heading').text("");
    jQuery('#bs_datepicker_container1 input').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        showbuttonPanel: true,
        defaultDate: "+1w",
        changeMonth: true,
        minDate: new Date(),
        container: '#bs_datepicker_container1'
    }).datepicker("setDate", new Date());
    //jQuery('#bs_datepicker_container2 input').datepicker({
    //    autoclose: true,
    //    format: "mm/dd/yyyy",
    //    showbuttonPanel: true,
    //    defaultDate: "+1w",
    //    changeMonth: true,
    //    minDate: new Date(),
    //    container: '#bs_datepicker_container2'
    //}).datepicker("setDate", new Date());

    jQuery("#ddlMicrRptName").change(function (e) {
        jQuery('#backButton').hide();
        BackwardManger = new Array();
        jQuery('#Heading').text("");
        xlfileName = jQuery("#ddlMicrRptName option:selected").text();
        if (jQuery('#ddlMicrRptName').val() == 0) {
            rptName = "MICRO REPORTING FRAMEWORK";
        }
        else {
            rptName = jQuery("#ddlMicrRptName option:selected").text();
        }

        //jQuery('#rptHeadName').text(rptName.toUpperCase());
        MicroReports.RefresherOfTheForm();
        MicroReports.fileldShower(jQuery('#ddlMicrRptName').val());
        jQuery('#bs_datepicker_container1 input').datepicker({
            autoclose: true,
            format: "dd/mm/yyyy",
            showbuttonPanel: true,
            defaultDate: "+1w",
            changeMonth: true,
            minDate: new Date(),
            container: '#bs_datepicker_container1'
        }).datepicker("setDate", new Date());
        jQuery('#bs_datepicker_container2 input').datepicker({
            autoclose: true,
            format: "dd/mm/yyyy",
            showbuttonPanel: true,
            defaultDate: "+1w",
            changeMonth: true,
            minDate: new Date(),
            container: '#bs_datepicker_container2'
        }).datepicker("setDate", new Date());
    });
    jQuery("#btnMicroSubmit").click(function (e) {
        jQuery('.page-loader-wrapper').show();
        MicroReports.dataTableViewer(0, 0);
    });
    jQuery("#btnexport").click(function () {

        jQuery("#tblmicrodetails").table2excel({



            exclude: ".noExl",

            name: xlfileName,

            filename: xlfileName,

            fileext: ".xls"

        });


    });
    jQuery("#dtFromDate").change(function (e) {
        

        rptName = jQuery("#ddlMicrRptName option:selected").text();
        rptsubheading = "As On " + jQuery("#dtFromDate").val();
        //jQuery('#rptHeadName').text(rptName.toUpperCase() + "- " + rptsubheading);

    });
    jQuery("#dtToDate").change(function (e) {

        rptName = jQuery("#ddlMicrRptName option:selected").text();
        rptsubheading = "From" + jQuery("#dtFromDate").val() + "To" + jQuery("#dtToDate").val();
        //jQuery('#rptHeadName').text(rptName.toUpperCase() + "- " + rptsubheading);

    });

    jQuery("#ddlDynCombo1").change(function (e) {

        rptName = jQuery("#ddlMicrRptName option:selected").text();
        var a = jQuery("#ddlDynCombo1 option:selected").text().toString();
        rptsubheadingcmb = rptName + " " + rptsubheading + " - " + a;
        //jQuery('#rptHeadName').text(rptsubheadingcmb.toUpperCase());

    });
    jQuery("#ddlDynCombo2").change(function (e) {

        rptName = jQuery("#ddlMicrRptName option:selected").text();
        rptsubheadingcmb = rptName + " " + rptsubheading + " - " + jQuery("#ddlDynCombo1 option:selected").text() + " - " + jQuery("#ddlDynCombo2 option:selected").text();
        //jQuery('#rptHeadName').text(rptsubheadingcmb.toUpperCase());

    });
    jQuery("#ddlDynCombo3").change(function (e) {

        rptName = jQuery("#ddlMicrRptName option:selected").text();
        rptsubheadingcmb = rptName + " " + rptsubheading + " - " + jQuery("#ddlDynCombo1 option:selected").text() + " - " + jQuery("#ddlDynCombo2 option:selected").text() + " - " + jQuery("#ddlDynCombo3 option:selected").text();
        //jQuery('#rptHeadName').text(rptsubheadingcmb.toUpperCase());

    });

    jQuery("#DivtxtDyn1").change(function (e) {
        debugger;
        rptName = jQuery("#ddlMicrRptName option:selected").text();
        rptsubheadingtxt = rptsubheadingcmb + jQuery('#DivtxtDyn1').val();
        //jQuery('#rptHeadName').text(rptsubheadingtxt.toUpperCase());
    });
    jQuery("#DivtxtDyn2").change(function (e) {

        rptName = jQuery("#ddlMicrRptName option:selected").text();
        rptsubheadingtxt = rptName + " " + rptsubheading + " - " + rptsubheadingcmb + jQuery('#DivtxtDyn1').val() + jQuery('#DivtxtDyn2').val();
        //jQuery('#rptHeadName').text(rptsubheadingtxt.toUpperCase());
    });

    jQuery("#DivtxtDyn3").change(function (e) {

        rptName = jQuery("#ddlMicrRptName option:selected").text();
        rptsubheadingtxt = rptName + " " + rptsubheading + " - " + rptsubheadingcmb + jQuery('#DivtxtDyn1').val() + jQuery('#DivtxtDyn2').val() + jQuery('#DivtxtDyn3').val();
       // jQuery('#rptHeadName').text(rptsubheadingtxt.toUpperCase());
    });
    jQuery("#backButton").click(function (e) {


        var positionCount = BackwardManger.length - 1;
        if (positionCount != -1) {
            jQuery('#backButton').show();
            MicroReports.dataTableViewerBackwardButtonCompleted(BackwardManger[positionCount])
            if (positionCount != 0 && positionCount != -1) {
                BackwardManger.pop();
            }

        }
        else {
            //jQuery('#backButton').hide();
        }

        if (positionCount == 0) {
            jQuery('#backButton').hide();
        }
        else {

            jQuery('#backButton').show();
        }

    });
    jQuery('#btnPdf').click(function (e) {
        
        html2canvas($('#exportpdf')[0], {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500
                    }]
                };
                pdfMake.createPdf(docDefinition).download("customer-details.pdf");
            }
        });
        
    });
});