$(document).ready(function () {
    $.ajax({
        url: '/Employees/GetEmployee',
       
    }).done((result) => {
        console.log(result);
        var female = result.filter(data => data.gender === 1).length;
        var male = result.filter(data => data.gender === 0).length;
       
        /*ini untuk char gender*/

        var options = {
            series: [male, female],
            chart: {
                width: 280,
                height: '100%',
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
     
        /*ini untuk chart interview result*/

        var options = {
            series: [decline, accepted],
            chart: {
                width: 280,
                height: '100%',
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
        text = `<p>${count}</p>`;
        $('#Jobs').html(text);
    }).fail((error) => {
        Swal.fire({
            title: 'Error!',
            text: 'Data Cannot Show',
            icon: 'Error',
            confirmButtonText: 'Next'
        })
    });


    $.ajax({
        url: '/JobEmployees/Invited',

    }).done((result) => {
        console.log(result);
        var text = "";
        var count = result.length;
        text = `<p>${count}</p>`;
        $('#assignment').html(text);
    }).fail((error) => {
        Swal.fire({
            title: 'Error!',
            text: 'Data Cannot Show',
            icon: 'Error',
            confirmButtonText: 'Next'
        })
    });


    $.ajax({
        url: '/JobEmployees/Interview',

    }).done((result) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        var text = "";
        var title = "";
        var today = new Date();
        var select = `${today.getFullYear()}-${addZero(today.getMonth() + 1)}`;
        console.log(result[0].interviewDate.toString().substring(8,10));
        console.log(select);
       
        var interviewData = result.filter(data => data.interviewDate.toString().substring(0, 7) === select.toString());
  
        console.log(interviewData);
        var count = interviewData.length;
        console.log(count);

        title = `<h3 class="card-title">Interview - ${monthNames[today.getMonth()]}<h3>`
        text = `<p>${count} Interview's Schedule </p>`;
        $('#interview').html(text);
        $('#dashInterview').html(title);
    }).fail((error) => {
        Swal.fire({
            title: 'Error!',
            text: 'Data Cannot Show',
            icon: 'Error',
            confirmButtonText: 'Next'
        })
    });

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
})