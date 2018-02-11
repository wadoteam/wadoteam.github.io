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

    },
    initProvenance: function () {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var repo = url.searchParams.get("giturl");
        $.ajax({
            url: "https://wado-project.herokuapp.com/repositories/provenance?repo=" + repo,
            type: 'GET',
            contentType: 'application/html',
            success: function (res) {
                res = res.replace("btn btn-default btn-sm", "disable-button");
                $("#provenance-wrapper").append(res);
                $(".loader").addClass("disable-button");

            },
            error: function (err) {
                console.log("error");
            }
        });
    },

    initRecomandationPage: function () {

        var template = "<tr>\n" +
            "<td>!name</td>\n" +
            "<td>!desc</td>\n" +
            "<td>!license</td>\n" +
            "<td>!list</td>\n" +
            "<td>!arr</td>\n" +
            "</tr>";

        $.ajax({
            type: "GET",
            url: "http://localhost:8080/wado/fgf/recomandation",
            cache: false,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    $("#suggestion-table").append(
                        template.replace("!name", data[i][0])
                            .replace("!desc", data[i][1])
                            .replace("!license", data[i][2])
                            .replace("!list", getListOfRepo(data[i][3]))
                            .replace("!arr", getListOfArrows(data[i][3])));
                }
            },
            error: function (error) {
                alert("Internal error");
            }
        });

        $("#suggestion-table .text-danger").click(function (target) {
            var repo = $("#suggestion-table tr td:nth-child(2)");
            window.location.href = "/provenance.html?giturl=" + repo.text();
        });

        setArchitecturelRecomandation();

    }


};

var getListOfRepo = function (data) {
    var template =
        "<li>\n" +
        "<a href=\"!n\">!r</a>\n" +
        "</li>\n"
    var list = "<ul>";
    for (var i = 0; i < data.length; i++) {
        list += template.replace("!n", data[i]).replace("!r", data[i]);
    }
    return list + "</ul>"

}

var getListOfArrows = function (data) {
    var template =
        "<li><a class=\"text-danger\" href=\"!#\"><i class=\"material-icons\">arrow_forward</i></a></li>";
    var list = "<ul>";
    for (var i = 0; i < data.length; i++) {
        list += template.replace("!#", "/provenance.html?giturl=" + data[i]);
    }
    return list + "</ul>"

};

var setArchitecturelRecomandation = function(){
    var template = "<tr>\n" +
        "<td>!pattern</td>\n" +
        "<td>!desc</td>\n" +
        "</tr>";

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/wado/fgf/arhitecture_informations",
        cache: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var name = Object.keys(data[i])[0];
                var description = data[i][name];
                $("#suggestion-table-arhitecture").append(
                    template.replace("!pattern", name.replace(/_/g, " "))
                        .replace("!desc", description).replace("@en", ""));
            }
        },
        error: function (error) {
            alert("Internal error");
        }
    });
};