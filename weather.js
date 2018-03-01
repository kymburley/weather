$(document).ready(function() {
  var lat;
  var long;
  var key = "4b3abda62c9f41b9aaf230223182802";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
                
      var url = "https://api.apixu.com/v1/current.json?key="+key+"&q="+lat+","+long;
      
      $.getJSON(url, function(data) {
        var celsius = data.current.temp_c;
        var fahren = data.current.temp_f;
        var location = data.location.name + ", " + data.location.region;
        var weatherType = data.current.condition.text;
        var isFahr = true;
        var weatherIconURL = "https://"+data.current.condition.icon;
        var currentTime = data.location.localtime;
        var hour = currentTime.substring(11,13);
        var isDay = data.current.is_day;
        console.log(weatherType); 
        // Use daytime background-image between sunrise and sunset, then switch to nighttime background
        if (isDay) {
          switch(weatherType){
            case "Sunny":
              $("body").css("background-image","url(https://res.cloudinary.com/kymburley/image/upload/v1489250380/clear_sunny_sky_dyjltj.jpg)");
              break;
            case "Partly cloudy":
              $("body").css("background-image", "url(https://res.cloudinary.com/kymburley/image/upload/v1477418074/daysky_ybhqii.jpg)");
              break;
            case "Cloudy":
            case "Overcast":
            case "Patchy rain possible":
              $("body").css("background-image", "url(https://res.cloudinary.com/kymburley/image/upload/v1489502562/CloudySkies_tyqigl.jpg)");
              break;
            case "Mist":
              $("body").css({"background-image": "url(https://res.cloudinary.com/kymburley/image/upload/v1490084645/mist_k5cvcd.jpg)", "color": "#000"});
              break;
            case "Light rain":
            case "Light drizzle":
            case "Light rain shower":
              $("body").css({"background-image": "url(https://res.cloudinary.com/kymburley/image/upload/v1489250684/light-rain-139977_1920_pl8yo6.jpg)", "color": "#000"});
              break;
            case "Moderate or heavy rain shower":
              $("body").css("background-image", "url(https://res.cloudinary.com/kymburley/image/upload/v1491394963/heavyrain_nrgau6.jpg)");
              break;
            case "Freezing drizzle":
              $("body").css("background-image", "url(https://res.cloudinary.com/kymburley/image/upload/v1519894611/sleet.jpg)");
              break;
            case "Light snow":
              $("body").css("background-image", "url(https://media.giphy.com/media/1eKtYfNa9GMPC/giphy.gif)");
              break;
            default:
              $("body").css("background-image", "url(https://res.cloudinary.com/kymburley/image/upload/v1489250380/clear_sunny_sky_dyjltj.jpg)");
          }
        } else {
          switch(weatherType) {
            case "Clear":
              $("body").css("background-image", "url(https://res.cloudinary.com/kymburley/image/upload/v1489258813/Clear_Night_Sky_lz72uk.jpg)");
              break;
            case "Partly cloudy":
              $("body").css("background-image", "url(https://res.cloudinary.com/kymburley/image/upload/v1489863920/darkCloudySky_zwdes3.jpg)");
              break;
            case "Cloudy":
              $("body").css("background-image", "url(https://res.cloudinary.com/kymburley/image/upload/v1489250960/cloudy_sky_paryp9.jpg)");
              break;
            case "Patchy rain possible":
              $("body").css("background-image", "url(https://res.cloudinary.com/kymburley/image/upload/v1489861805/NightClouds_nhffjg.jpg)");
              break;
            default:
              $("body").css("background-image", "url(https://res.cloudinary.com/kymburley/image/upload/v1489258813/Clear_Night_Sky_lz72uk.jpg)");
          }
        }

        $(".temperature").html(fahren+"&#176;F");
        $(".cityState").html(location);
        $(".skyCondition").html(weatherType);
       
        // Convert F to C
        $(".CorF").click(function(){
          if (isFahr === true) {
            $(".temperature").html(celsius+"&#176;C");
            isFahr = false;
          } 
        });
        
        // Convert C to F
        $(".ForC").click(function(){
          if (isFahr === false) {
            $(".temperature").html(fahren+"&#176;F");
            isFahr = true;
          }
        });

        $(".icon").html("<img src="+weatherIconURL+">"); 
      });
    });
  }
});
