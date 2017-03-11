$(document).ready(function() {
    var lat;
    var long;
    var key = "666d0d93347e439cb7a95222171103";
  
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
                 
                // Use daytime background-image between sunrise and sunset, then switch to nighttime background
               if (isDay) {
                    switch(weatherType){
                        case "Sunny":
                            $("body").css("background-image", "url(http://www.clipartkid.com/images/445/blue-sky-ash-s-machiavellian-bloggery-tHG5ib-clipart.jpg)");
                            break;
                        case "Partly Cloudy":
                            $("body").css("background-image", "url(https://cdn.shutterstock.com/shutterstock/videos/9503816/thumb/1.jpg)");
                            break;
                        case "Light rain":
                            $("body").css("background-image", "url(https://cdn.shutterstock.com/shutterstock/videos/8387281/thumb/1.jpg");
                            break;
                        case "Light snow":
                            $("body").css("background-image", "url(https://media.giphy.com/media/1eKtYfNa9GMPC/giphy.gif");
                            break;
                        default:
                            $("body").css("background-image", "url(http://www.clipartkid.com/images/445/blue-sky-ash-s-machiavellian-bloggery-tHG5ib-clipart.jpg)");
                    }
                    
                } else {
                    switch(weatherType) {
                        case "Clear":
                            $("body").css("background-image", "url(https://res.cloudinary.com/kymburley/image/upload/v1477280115/nightsky.jpg)");
                            break;
                        case "Overcast":
                            $("body").css("background-image", "url(http://cdn2.bigcommerce.com/server4100/0b764/products/13207/images/10285/SR-0251__91973.1325295870.600.600.gif?c=2)");
                            break;
                        default:
                            $("body").css("background-image", "url(https://res.cloudinary.com/kymburley/image/upload/v1477280115/nightsky.jpg)");
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