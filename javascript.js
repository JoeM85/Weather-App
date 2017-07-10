$(document).ready(function () {

    //Gets the UTC time
    var currentTime = new Date().getTime();

    var loctionApi = "http://ipinfo.io?token=e31c36501a3e39";

    //Gets the user location from the locationAPI  
    $.getJSON(loctionApi, function (location) {
        var zipCode = location.postal;
        var weatherApi = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&APPID=83405b5f94dd4446be2f33e72d528ab0&units=imperial";

        //Icon images
        var weatherIcons = [
            {
                condition: "Clear",
                dayIcon: "01d.png",
                nightIcon: "01n.png"
            },
            {
                condition: "Clear sky",
                dayIcon: "01d.png",
                nightIcon: "01n.png"
            },
            {
                condition: "Few clouds",
                dayIcon: "02d.png",
                nightIcon: "02n.png"
            },
            {
                condition: "Scattered clouds",
                dayIcon: "03d.png",
                nightIcon: "03n.png"
            },
            {
                condition: "Broken clouds",
                dayIcon: "04d.png",
                nightIcon: "04n.png"
            },
            {
                condition: "Shower rain",
                dayIcon: "09d.png",
                nightIcon: "09n.png"
            },
            {
                condition: "Rain",
                dayIcon: "10d.png",
                nightIcon: "10n.png"
            },
            {
                condition: "Thunderstorm",
                dayIcon: "11d.png",
                nightIcon: "11n.png"
            },
            {
                condition: "Snow",
                dayIcon: "13d.png",
                nightIcon: "13n.png"
            },
            {
                condition: "Mist",
                dayIcon: "50d.png",
                nightIcon: "50n.png"
            }
        ];

        //Gets the user temperature from the weatherAPI
        $.getJSON(weatherApi, function (weather) {
            $("#display-location").html(weather.name);
            $('#current-temp').html(Math.round(weather.main.temp) + "\xB0 F");
            var weatherCondition = weather.weather[0].main;
            //Checks weather conditon and sunset time to display correct icon
            function weatherIcon() {
                for (var i = 0; i < weatherIcons.length; i++) {
                    var img = document.createElement("IMG");
                    document.getElementById("icon-container").appendChild(img);
                    document.getElementById("weather-condition").innerHTML = weather.weather[0].main;
                    if (weatherIcons[i].condition === weatherCondition &&
                        currentTime <= weather.sys.sunset) {
                        img.src = "icon-imgs/" + weatherIcons[i].nightIcon;
                        console.log(img);
                    }
                    if (weatherIcons[i].condition === weatherCondition) {
                        img.src = "icon-imgs/" + weatherIcons[i].dayIcon;
                        console.log(img);
                    }
                }
            }
            weatherIcon();

            //Converts Fahrenheit to Celsius on button press    
            $("#temp-change-btn").click(function () {
                var convertMetric = Math.round((weather.main.temp - 32) * 5 / 9);
                if ($("#current-temp").is(":contains('\xB0 F')")) {
                    $("#current-temp").html(convertMetric + "\xB0 C")
                } else {
                    $("#current-temp").html(Math.round(weather.main.temp) + "\xB0 F");
                }
                //Changes button text from Celsius and Fahrenheit
                var text = $("#temp-change-btn").text();
                $("#temp-change-btn").text(
                    text == "Fahrenheit" ? "Celsius" : "Fahrenheit");
            });
        });
    });
});
