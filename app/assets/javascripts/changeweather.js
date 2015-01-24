
function getWeather(city_search,state_search){
	var url_con_search = "http://api.wunderground.com/api/8eff5076b5830486/geolookup/conditions/q/"+ state_search +"/"+ city_search +".json";
	var url_ten_search =  "http://api.wunderground.com/api/8eff5076b5830486/forecast10day/q/"+state_search +"/"+ city_search +".json";
  $.ajax({
  	url: url_con_search,
  	dataType: "jsonp",
  	success: function(parsed_json) {
     	var temp_f = parsed_json['current_observation']['temp_f'];
    	var weather = parsed_json['current_observation']['weather'];	
      icon = parsed_json['current_observation']['icon_url'];
    
      $("#pic").html("<img style='width: 30%; margin-bottom: -70px;' src=" + icon + "></img>");
      $("#city h2").text(city_search);
      $("#state h2").text(state_search);
      $("#temp h3").text(temp_f + " degrees").css('margin-top', '-30px');
      $("#short-summary h4").text(weather).css('margin-top', '-10px');
  }
	});
	$.ajax({
		url: url_ten_search,
		dataType : "jsonp",
		success : function(parsed_json){
			ten_day_search = parsed_json['forecast']['simpleforecast']['forecastday'];
			for(i=0; i<1; i++){
				var current_day_desc_search = parsed_json['forecast']['txt_forecast']['forecastday'][i]['fcttext'];
			};
  		$("#long-summary p").text(current_day_desc_search).css('margin-top', '-10px');
			for (i = 0; i < ten_day_search.length; i++){
  			var weekday = ten_day_search[i].date.weekday;
  			var high = ten_day_search[i].high.fahrenheit;
  			var low = ten_day_search[i].low.fahrenheit;
  			var weather = ten_day_search[i].conditions;
        var image = ten_day_search[i].icon_url
  			$("#"+ i + "> ul").empty();
  			$("#"+ i + "> ul").append(
          "<img src=" + image + "></img>" +
    			"<li><strong>"+ weekday  +"</strong></li>" +
    			"<li>High:"+ high  +"</li>" +
    			"<li>Low:"+ low +"</li>" +
    			"<li>"+ weather  +"</li>"
    		);
  		};
		}
	});
};

//// BY DEFAULT, LOAD WEATHER FROM IP ADDRESS ////

	

$( document ).ready(function() {
	var url_ip = "http://api.wunderground.com/api/8eff5076b5830486/geolookup/q/autoip.json";
  $.ajax({
  url: url_ip,
  dataType : "jsonp",
  success : function(parsed_json) {
  	var city = parsed_json['location']['city'];
  	var state = parsed_json['location']['state'];
  	getWeather(city,state);
  }
	});
});


//// EVENT LISTENERS TO CHANGE WEATHER //// 


$("select").on("change", function(e){
	e.preventDefault();
	var city = $(":selected").val().split(",")[0];
	var state = $(":selected").val().split(",")[1];
	getWeather(city,state);
})

$("#weather_search").on("submit", function(e){
	e.preventDefault();
	var city = $("#weather_search_city").val();
	var state = $("#weather_search_state").val()
	getWeather(city,state);
})
