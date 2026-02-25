var _mainDashboard = {

    mainDashboardLoadCompleted: function (response) {

        if (response.status === "SUCCESS") {

            swal(response.responseMsg, "", "success");

        }
        else {

            swal(response.responseMsg, "", "error");
        }

    },

    mainDashboard: function () {

       
        var mainDashboardData = {

                //"userId": jQuery('#txtUserID').val(),
                //"oldPassword": encryptedoldpass.toString(),
                //"newPassword": encryptednewpass.toString()
            }
        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/login/changepassword", mainDashboardData, _mainDashboard.mainDashboardLoadCompleted, userdata.token)

        }

    

}


jQuery(document).ready(function ($) {

    //var ctx = document.getElementById('myChart').getContext('2d');
    //var chart = new Chart(ctx, {
    //    // The type of chart we want to create
    //    type: 'line',

    //    // The data for our dataset
    //    data: {
    //        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //        datasets: [{
    //            label: 'My First dataset',
    //            backgroundColor: 'rgb(255, 99, 132)',
    //            borderColor: 'rgb(255, 99, 132)',
    //            data: [0, 10, 5, 2, 20, 30, 45]
    //        }]
    //    },

    //    // Configuration options go here
    //    options: {}
    //});

    //var ctx = document.getElementById('myChart1');
    //var myChart = new Chart(ctx, {
    //    type: 'bar',
    //    data: {
    //        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //        datasets: [{
    //            label: '# of Votes',
    //            data: [12, 19, 3, 5, 2, 3],
    //            backgroundColor: [
    //                'rgba(255, 99, 132, 0.2)',
    //                'rgba(54, 162, 235, 0.2)',
    //                'rgba(255, 206, 86, 0.2)',
    //                'rgba(75, 192, 192, 0.2)',
    //                'rgba(153, 102, 255, 0.2)',
    //                'rgba(255, 159, 64, 0.2)'
    //            ],
    //            borderColor: [
    //                'rgba(255, 99, 132, 1)',
    //                'rgba(54, 162, 235, 1)',
    //                'rgba(255, 206, 86, 1)',
    //                'rgba(75, 192, 192, 1)',
    //                'rgba(153, 102, 255, 1)',
    //                'rgba(255, 159, 64, 1)'
    //            ],
    //            borderWidth: 1
    //        }]
    //    },
    //    options: {
    //        scales: {
    //            yAxes: [{
    //                ticks: {
    //                    beginAtZero: true
    //                }
    //            }]
    //        }
    //    }
    //});
  
  
    var totalVisitors = 883000;
    var visitorsData = {
        "New vs Returning Visitors": [{
            click: visitorsChartDrilldownHandler,
            cursor: "pointer",
            explodeOnClick: false,
            innerRadius: "75%",
            legendMarkerType: "square",
            name: "New vs Returning Visitors",
            radius: "100%",
            showInLegend: true,
            startAngle: 90,
            type: "doughnut",
            dataPoints: [
                { y: 519960, name: "New Visitors", color: "#E7823A" },
                { y: 363040, name: "Returning Visitors", color: "#546BC1" }
            ]
        }],
        "New Visitors": [{
            color: "#E7823A",
            name: "New Visitors",
            type: "column",
            dataPoints: [
                { x: new Date("1 Jan 2015"), y: 33000 },
                { x: new Date("1 Feb 2015"), y: 35960 },
                { x: new Date("1 Mar 2015"), y: 42160 },
                { x: new Date("1 Apr 2015"), y: 42240 },
                { x: new Date("1 May 2015"), y: 43200 },
                { x: new Date("1 Jun 2015"), y: 40600 },
                { x: new Date("1 Jul 2015"), y: 42560 },
                { x: new Date("1 Aug 2015"), y: 44280 },
                { x: new Date("1 Sep 2015"), y: 44800 },
                { x: new Date("1 Oct 2015"), y: 48720 },
                { x: new Date("1 Nov 2015"), y: 50840 },
                { x: new Date("1 Dec 2015"), y: 51600 }
            ]
        }],
        "Returning Visitors": [{
            color: "#546BC1",
            name: "Returning Visitors",
            type: "column",
            dataPoints: [
                { x: new Date("1 Jan 2015"), y: 22000 },
                { x: new Date("1 Feb 2015"), y: 26040 },
                { x: new Date("1 Mar 2015"), y: 25840 },
                { x: new Date("1 Apr 2015"), y: 23760 },
                { x: new Date("1 May 2015"), y: 28800 },
                { x: new Date("1 Jun 2015"), y: 29400 },
                { x: new Date("1 Jul 2015"), y: 33440 },
                { x: new Date("1 Aug 2015"), y: 37720 },
                { x: new Date("1 Sep 2015"), y: 35200 },
                { x: new Date("1 Oct 2015"), y: 35280 },
                { x: new Date("1 Nov 2015"), y: 31160 },
                { x: new Date("1 Dec 2015"), y: 34400 }
            ]
        }]
    };

    var newVSReturningVisitorsOptions = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "New VS Returning Visitors"
        },
        subtitles: [{
            text: "Click on Any Segment to Drilldown",
            backgroundColor: "#2eacd1",
            fontSize: 16,
            fontColor: "white",
            padding: 5
        }],
        legend: {
            fontFamily: "calibri",
            fontSize: 14,
            itemTextFormatter: function (e) {
                return e.dataPoint.name + ": " + Math.round(e.dataPoint.y / totalVisitors * 100) + "%";
            }
        },
        data: []
    };

    var visitorsDrilldownedChartOptions = {
        animationEnabled: true,
        theme: "light2",
        axisX: {
            labelFontColor: "#717171",
            lineColor: "#a2a2a2",
            tickColor: "#a2a2a2"
        },
        axisY: {
            gridThickness: 0,
            includeZero: false,
            labelFontColor: "#717171",
            lineColor: "#a2a2a2",
            tickColor: "#a2a2a2",
            lineThickness: 1
        },
        data: []
    };

    var chart = new CanvasJS.Chart("chartContainer", newVSReturningVisitorsOptions);
    chart.options.data = visitorsData["New vs Returning Visitors"];
    chart.render();

    function visitorsChartDrilldownHandler(e) {
        chart = new CanvasJS.Chart("chartContainer", visitorsDrilldownedChartOptions);
        chart.options.data = visitorsData[e.dataPoint.name];
        chart.options.title = { text: e.dataPoint.name }
        chart.render();
        jQuery("#backButton").toggleClass("invisible");
    }

    jQuery("#backButton").click(function () {
        jQuery(this).toggleClass("invisible");
        chart = new CanvasJS.Chart("chartContainer", newVSReturningVisitorsOptions);
        chart.options.data = visitorsData["New vs Returning Visitors"];
        chart.render();
    });



});

        
    
  