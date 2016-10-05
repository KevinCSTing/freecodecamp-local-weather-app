$(document).ready(function(){
  
  var temp=0;

  getLocation();
  //getLocation first
  function getLocation()
  {

  
    
    $.getJSON('http://ipinfo.io', function(location){

      $(".city").append(location.city +", "+ location.region);
      getWeather(location);
})
    
  };
  
  function getWeather(location)
  {
    var API_key = "3bc84928281f01b26cab1d4d696f9279";
    var units = "&units=imperial"; //alternate &units=metric for celsius
    var API_url = "http://api.openweathermap.org/data/2.5/weather?zip="+ location.postal+",us&appid="+API_key+"&units=imperial"; //imperial for fahrenheit


    $.ajax({
      dataType: "jsonp",
      url: API_url,
      success: function (json) 
          {
          //  console.log(json);
             $(".weatherIcon").html(json.weather[0].icon);
            var iconUrl = "http://openweathermap.org/img/w/"+json.weather[0].icon+".png";
            $(".weatherIcon").html('<img src='+iconUrl+' width="150" height="150">');
            temp = json.main.temp;
            $(".tempDesc").html(temp+"&deg; F");
            $(".weatherDesc").html(json.weather[0].main); 
           updateClock();
          }
        });

  };// getWeather() ends
 
  
  
$('.tempDesc').on('click', function(){
  $('.tempDesc').toggleClass('celcius');
  $('.tempDesc').toggleClass('fahrenheit');
  
  if ($(this).hasClass('fahrenheit')) {
    $('.tempDesc').text(setFahrenheit());
    return;
  }
  
  $('.tempDesc').text(setCelcius());
});

function setCelcius(){
  var cel = (temp - 32) * 5/9;
  return cel.toFixed(2) + "° C";
};

function setFahrenheit(){
  return temp + "° F";
};
  
  

  
  
  //thanks to Sam Deering for this code. https://www.sitepoint.com/create-jquery-digital-clock-jquery4u/
  function updateClock ( )
 	{
 	var currentTime = new Date ( );
   
  	var currentHours = currentTime.getHours ( );
  	var currentMinutes = currentTime.getMinutes ( );
  	//var currentSeconds = currentTime.getSeconds ( );

  	// Pad the minutes and seconds with leading zeros, if required
  	currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  //	currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

  	// Choose either "AM" or "PM" as appropriate
  	var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

  	// Convert the hours component to 12-hour format if needed
  	currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

  	// Convert an hours component of "0" to "12"
  	currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  	// Compose the string for display
  	var currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;
   	$(".clock").html(currentTimeString); //currentTimeString
   	  	
    //This is my own codes now.
    //Date Today
    var mo = currentTime.getMonth();
    var d  =currentTime.getDate();
    var year= currentTime.getFullYear();
    var day = currentTime.getDay();
    
    
    var month = ["January", "February", "March",
                "April", "May", "June",
                "July", "August", "September",
                "October", "November", "December"];
    
    var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
          //Compose the string for the date and weekday
    var dateToday = "Today is " + week[day] + ". " + month[mo] + " " + d + ", " + year;
    $(".today").html(dateToday); 
    
 }
  setInterval(updateClock, 1000);
  
  
  
  
  });//$(document).ready finishes here