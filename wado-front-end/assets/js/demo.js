type = ['', 'info', 'success', 'warning', 'danger'];


demo = {
    initDashboardPageCharts: function () {

        var issue = [12, 12, 7, 17, 23, 18, 38];

        dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                issue
            ]
        };

        optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        };

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        md.startAnimationForLineChart(dailySalesChart);

    },


    showNotification: function (from, align) {
        color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "notifications",
            message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

        }, {
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
    },

    initProjectPage: function () {
        var projects = [{name: "proiect", description: "descriere"}, {name: "proiect", description: "descriere"}];
        var templateRow = "<tr>\n" +
            "<td><<name</td>\n" +
            "<td><<desc</td>\n" +
            "<td><a class=\"text-success\" href=\"\"><i class=\"material-icons pull-right\">arrow_forward</i></a></td>\n" +
            "</tr>";
        for (var i = 0; i < projects.length; i++) {
            $("#projects").append(templateRow.replace("<<name", projects[i]["name"]).replace("<<desc", projects[i]['description']));
        }
    },

    initUserPage: function () {

        var dataFromApi = {plugins: "sdf"};
        for (var i in dataFromApi) {
            $("input[name=" + i + "]").val(dataFromApi[i]);
        }

        $("#user-data-submit").click(function () {
                var userInfo = {};
                var inputs = $("#user-data input");
                for (var i = 0; i < inputs.length; i++) {
                    if ($(inputs[i]).attr("name") != undefined && $(inputs[i]).val().length > 1) {
                        userInfo[$(inputs[i]).attr("name")] = $(inputs[i]).val();
                    }

                }
                console.log(userInfo);
            }
        );
    },
    initDashboardPage: function () {

    }

}