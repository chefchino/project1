var mymap = L.map('mapId')
// mymap.setView([35.900019, -79.012629], 13);

var zomatoAPIKey = "&apikey=a07626ef54fa05775a802f84080be9bf";

// $("#zipcode").keyup(function (event) {

// 	if (event.keyCode === 13) {
// 		$("#search").click();
// 	}
// });


	if (sessionStorage.getItem("zipcode") === null){
		starterZip = "27607";
	
		sessionStorage.setItem("zipcode", starterZip);
	}
	


function search(zipcode) {
	

	zomatoURL = "https://developers.zomato.com/api/v2.1/search?q=" + zipcode + zomatoAPIKey;

	seatGeekURL = "https://api.seatgeek.com/2/events?client_id=MTkwMzg0NDh8MTU3MTc4NTIxNS4zOQ&postal_code=" + zipcode;


	$.ajax({
		url: zomatoURL,
		method: 'GET',
	})
		.done((response) => {
			console.log(response);

			

			for (i = 0; i < response.restaurants.length; i++) {
				console.log(response.restaurants[i].restaurant.name);
				long = response.restaurants[i].restaurant.location.longitude;
				lat = response.restaurants[i].restaurant.location.latitude;
				pTag = $("<p></p>");
				pTag.addClass("restName");
				pTag.text(response.restaurants[i].restaurant.name);
				pTag1 = $("<p>");
				pTag1.text("Address: " + response.restaurants[i].restaurant.location.address);
				pTag2 = $("<a>");
				pTag2.attr("href", response.restaurants[i].restaurant.url);
				pTag2.text("Check It Out");
				pTag3 = $("<p>");
				pTag3.text("Rating: " + response.restaurants[i].restaurant.user_rating.aggregate_rating);
				pTag4 = $("<p>");
				pTag4.text("Avg for two: $" + response.restaurants[i].restaurant.average_cost_for_two);
				$(".restaurant-name-tag").append(pTag);
				$(".restaurant-name-tag").append(pTag1);
				$(".restaurant-name-tag").append(pTag3);
				$(".restaurant-name-tag").append(pTag4);
				$(".restaurant-name-tag").append(pTag2);
				var marker = L.divIcon({className: 'my-other-div'});
                L.marker([lat, long], { icon: marker
                }).bindPopup('<a href="' + response.restaurants[i].restaurant.url + '">' + response.restaurants[i].restaurant.name + '</a>')
                .openPopup().addTo(mymap);
			};
		});

	$.ajax({
		url: seatGeekURL,
		method: 'GET',
	})
		.done((response1) => {
			console.log(response1);
			mymap.setView([response1.events[0].venue.location.lat,
				response1.events[0].venue.location.lon], 13);
			for (i = 0; i < response1.events.length; i++) {
				lat1 = response1.events[i].venue.location.lat;
				long1 = response1.events[i].venue.location.lon;
				console.log(response1.events[i].title);
				pTwo = $("<p>");
				pTwo.addClass("eventName");
				pTwo.text(response1.events[i].title);
				pTwo1 = $("<p>");
				pTwo1.text("Event Type: " + response1.events[i].type)
				pTwo2 = $("<p>");
				pTwo2.text("Address: " + response1.events[i].venue.address);
				pTwo3 = $("<p>");
				pTwo3.text("City: " + response1.events[i].venue.city);
				pTwo4 = $("<a>");
				pTwo4.attr("href", response1.events[i].url);
				pTwo4.text("Get Tickets")
				$("#events").append(pTwo);
				$("#events").append(pTwo1);
				$("#events").append(pTwo2);
				$("#events").append(pTwo3);
				$("#events").append(pTwo4);
				var myIcon = L.divIcon({ className: 'my-div-icon' });
				L.marker([lat1, long1], { icon: myIcon }).bindPopup('<a href="' + response1.events[i].url + '">' + response1.events[i].title + '</a>')
				.openPopup().addTo(mymap);
			};
		});

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoiY2hlZmNoaW5vIiwiYSI6ImNrMXhxdG05dDBjNXczbW8zcDVsZXAza3gifQ.n7yrjPAM_yOPpOJGez6qKQ'
	}).addTo(mymap);

	sessionStorage.clear();
	sessionStorage.setItem("zipcode", zipcode);

};


$(document).on("click", "#search", function(event) {
	event.preventDefault();
	console.log("inside");
	var zipcode = $("#zipcode").val();
	search(zipcode);
	
	$("#zipcode").val("");
	$(".location-div").val("");
	$(".location-div").text(zipcode);
	$("#events").empty();
	$("#restInfo").empty();
	$(".leaflet-marker-pane").empty();

   });

$(document).keypress(function(event) {
if (event.keyCode == 13) {   
	event.preventDefault();
	console.log("inside");
	var zipcode = $("#zipcode").val();
	search(zipcode); 


	$("#zipcode").val("");
	$(".location-div").val("");
	$(".location-div").text(zipcode);
	$("#events").empty();
	$("#restInfo").empty();  
	$(".leaflet-marker-pane").empty();

}
});

$(document).ready(function() {
	var sZip = sessionStorage.getItem("zipcode");
	$("#zipcode").val(sZip);
	search(sZip);
	
});


