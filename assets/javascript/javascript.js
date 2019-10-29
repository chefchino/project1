var mymap = L.map('mapId')
var lat2;
var long2;
var eatStreetAPI = "&access-token=aba37ae090f087f7";

if (sessionStorage.getItem("zipcode") === null){
	starterZip = "27607";

	sessionStorage.setItem("zipcode", starterZip);
}

function search(zipcode) {
	
	seatGeekURL = "https://api.seatgeek.com/2/events?client_id=MTkwMzg0NDh8MTU3MTc4NTIxNS4zOQ&postal_code=" + zipcode;
	
	$.ajax({
		url: seatGeekURL,
		method: 'GET',
	})
	.done((response1) => {
		console.log(response1);
		mymap.setView([response1.events[4].venue.location.lat,
			response1.events[4].venue.location.lon], 11);
						for (i = 0; i < response1.events.length; i++) {
							var lat1 = response1.events[i].venue.location.lat;
							 lat2 = response1.events[0].venue.location.lat;
							 var long1 = response1.events[i].venue.location.lon;
							 long2 = response1.events[0].venue.location.lon;
							 
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
						EatStreetURL = "https://eatstreet.com/publicapi/v1/restaurant/search?latitude=" + lat2 + "&longitude=" + long2 + eatStreetAPI;
					
					
					
						$.ajax({
							url: EatStreetURL,
							method: 'GET',
						})
							.done((response) => {
								console.log(response);
					
								for (i = 0; i < response.restaurants.length; i++) {
								
									long = response.restaurants[i].longitude;
									lat = response.restaurants[i].latitude;
									pTag = $("<p></p>");
									pTag.addClass("restName");
									pTag.text(response.restaurants[i].name);
									pTag1 = $("<p>");
									pTag1.text("Address: " + response.restaurants[i].streetAddress + ", " + response.restaurants[i].city);
									pTag2 = $("<a>");
									pTag2.attr("href", response.restaurants[i].url);
									pTag2.text("Check It Out");
									pTag3 = $("<p>");
									pTag3.text("Minimum Wait Time: " + response.restaurants[i].minWaitTime);
									pTag4 = $("<p>");
									pTag4.text("Delivery: " + response.restaurants[i].offersDelivery);
									$(".restaurant-name-tag").append(pTag);
									$(".restaurant-name-tag").append(pTag1);
									$(".restaurant-name-tag").append(pTag3);
									$(".restaurant-name-tag").append(pTag4);
									$(".restaurant-name-tag").append(pTag2);
									var marker = L.divIcon({className: 'my-other-div'});
									L.marker([lat, long], { icon: marker
									}).bindPopup('<a href="' + response.restaurants[i].url + '">' + response.restaurants[i].name + '</a>')
									.openPopup().addTo(mymap);
								};
					});
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