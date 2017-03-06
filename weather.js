$(document).ready(function() {
    var lat;
    var long;
    var key = "b1e8e0e9cf36a74f61c53a7b17364a77";
    var state;
  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
                      
            var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=imperial&appid="+ key;
  
            $.getJSON(url, function(data) {
                var temperature = Math.round(data.main.temp);
                var celsius = Math.round(((data.main.temp - 32) * (5/9)));
                var location = data.name + " " + data.sys.country;
                var weatherType = data.weather[0].description;
                var convertTemp = true;
                var timeOfDay = data.dt;
                var sunrise = data.sys.sunrise;
                var sunset = data.sys.sunset;
                console.log(location);
      
                // Use daytime background-image between sunrise and sunset, then switch to nighttime background
                if (timeOfDay <= sunset && timeOfDay >= sunrise) {        
                    $("body").css("background-image", "url(https://res.cloudinary.com/kymburley/image/upload/v1477418074/daysky_ybhqii.jpg)");
                } else {
                    $("body").css("background-image", "url(https://res.cloudinary.com/kymburley/image/upload/v1477280115/nightsky.jpg)");
                }
        
                $(".temperature").html(temperature+"&#176; F");
                $(".cityState").html(location);
                $(".skyCondition").html(weatherType);

        
                // Convert F to C - C to F
                $(".temperature").click(function(){
                    if (convertTemp === false) {
                        $(".temperature").html(temperature+"&#176; F");
                        convertTemp = true;
                    } else {
                        $(".temperature").html(celsius+"&#176; C");
                        convertTemp = false;
                    }
                });
    
                // Get weather icon
                var weatherIconURL = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
                $(".icon").html("<img src="+weatherIconURL+">"); 
      
            });
        });
    }
});