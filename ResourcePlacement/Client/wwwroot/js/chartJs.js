$(document).ready(function () {
    $.ajax({
        url: '/Employees/',
       
    }).done((result) => {
        console.log(result);
        var female = result.filter(data => data.gender === 1).length;
        var male = result.filter(data => data.gender === 0).length;
        console.log(male);
        console.log(result[0].gender);


        /*ini untuk char gender*/

        var options = {
            series: [male, female],
            chart: {
                width: 280,
                height: 350,
                type: 'pie',
            },
            labels: ['Male', 'Female'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        show: true,
                        position: 'right',
                    }
                }
            }]
        };
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }).fail((error) => {
        Swal.fire({
            title: 'Error!',
            text: 'Data Cannot Show',
            icon: 'Error',
            confirmButtonText: 'Next'
        })
    });


    $.ajax({
        url: '/JobEmployees/Finalized',

    }).done((result) => {
        console.log(result);
        var accepted = result.filter(data => data.interviewResult === 1).length;
        var decline = result.filter(data => data.interviewResult === 0).length;
        console.log(accepted);
        console.log(result[0].interviewResult);


        /*ini untuk chart interview result*/

        var options = {
            series: [decline, accepted],
            chart: {
                width: 280,
                height: 350,
                type: 'pie',
            },
            labels: ['Decline', 'Accepted'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        show: true,
                        position: 'right',
                    }
                }
            }]
        };
        var chart = new ApexCharts(document.querySelector("#chartinterview"), options);
        chart.render();
    }).fail((error) => {
        Swal.fire({
            title: 'Error!',
            text: 'Data Cannot Show',
            icon: 'Error',
            confirmButtonText: 'Next'
        })
    });


    $.ajax({
        url: '/Jobs/',

    }).done((result) => {
        console.log(result);
        var text = "";
        var count = result.length;
        text = `<p>Count: ${count}</p>`;
        $('#Jobs').html(text);
    }).fail((error) => {
        Swal.fire({
            title: 'Error!',
            text: 'Data Cannot Show',
            icon: 'Error',
            confirmButtonText: 'Next'
        })
    });
   
})