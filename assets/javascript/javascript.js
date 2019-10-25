var mymap = L.map('mapId')
mymap.setView([35.900019, -79.012629], 13);

var zomatoAPIKey = "&apikey=a07626ef54fa05775a802f84080be9bf";
// var long;
// var lat;
$("#zipcode").keyup(function(event){

	if (event.keyCode ===13){
		$("#search").click();
	}
});
$("#search").on("click", function (event) {
	event.preventDefault();
	console.log("inside");
	var zipcode = $("#zipcode").val();
	// zomato ajax

	zomatoURL = "https://developers.zomato.com/api/v2.1/search?q=" + zipcode + zomatoAPIKey;
	// resturants[0].resturant.R.name
	seatGeekURL = "https://api.seatgeek.com/2/events?client_id=MTkwMzg0NDh8MTU3MTc4NTIxNS4zOQ&postal_code=" + zipcode;


	$.ajax({
		url: zomatoURL,
		method: 'GET',
	})
		.done((response) => {
			console.log(response);
			//  console.log(response.restaurants[0].restaurant.name)
			mymap.setView([response.restaurants[0].restaurant.location.latitude,
				response.restaurants[0].restaurant.location.longitude], 13);

			for (i = 0; i < response.restaurants.length; i++) {
				console.log(response.restaurants[i].restaurant.name);
				long= response.restaurants[i].restaurant.location.longitude;
				lat= response.restaurants[i].restaurant.location.latitude;
				pTag = $("<p></p>");
				pTag.addClass("restName");
				// pTag.addClass("restInfo");
				pTag.text(response.restaurants[i].restaurant.name);
				pTag1 = $("<p>");
				pTag1.text(response.restaurants[i].restaurant.location.address);
				pTag2 = $("<a>");
				pTag2.attr("href", response.restaurants[i].restaurant.url);
				pTag2.text("restaurant");
				pTag3 = $("<p>");
				pTag3.text("Rating: " + response.restaurants[i].restaurant.user_rating.aggregate_rating);
				pTag4 = $("<p>");
				pTag4.text("Avg for two: $" + response.restaurants[i].restaurant.average_cost_for_two);
				$(".restaurant-name-tag").append(pTag);
				$(".restaurant-name-tag").append(pTag1);
				$(".restaurant-name-tag").append(pTag3);
				$(".restaurant-name-tag").append(pTag4);
				$(".restaurant-name-tag").append(pTag2);
				var marker= L.marker([lat, long], {
					color: 'red',
					fillColor: '#f03',
					fillOpacity: 0.5,
					// radius: 000
				})
				marker.addTo(mymap);
				// mymap.setView([lat, long], 13);
			};

		});

	$.ajax({
		url: seatGeekURL,
		method: 'GET',
	})
		.done((response1) => {
			console.log(response1);

			for (i = 0; i < response1.events.length; i++) {
				lat1= response1.events[i].venue.location.lat;
				long1= response1.events[i].venue.location.lon;
				console.log(response1.events[i].title);
				pTwo = $("<p>");
				pTwo.addClass("eventName");
				pTwo.text(response1.events[i].title);
				pTwo1 = $("<p>");
				pTwo1.text("Event Type: "+ response1.events[i].type)
				pTwo2 = $("<p>");
				pTwo2.text(response1.events[i].venue.address);
				pTwo3= $("<p>");
				pTwo3.text(response1.events[i].venue.city);
				pTwo4 = $("<a>");
				pTwo4.attr("href", response1.events[i].url);
				pTwo4.text("Event")
				$("#events").append(pTwo);
				$("#events").append(pTwo1);
				$("#events").append(pTwo2);
				$("#events").append(pTwo3);
				$("#events").append(pTwo4);
				var myIcon = L.divIcon({className: 'my-div-icon'});
				L.marker([lat1, long1], {icon: myIcon}).addTo(mymap);
				// var marker1= L.marker([lat1, long1], {
				// 	color: 'red',
				// 	fillColor: '#f03',
				// 	fillOpacity: 0.5,
				// 	// radius: 000
				// })
				// marker1.addTo(mymap);
			};
		});

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoiY2hlZmNoaW5vIiwiYSI6ImNrMXhxdG05dDBjNXczbW8zcDVsZXAza3gifQ.n7yrjPAM_yOPpOJGez6qKQ'
	}).addTo(mymap);



	// var circle = L.circle([lat, long], {
	// 	color: 'red',
	// 	fillColor: '#f03',
	// 	fillOpacity: 0.5,
	// 	radius: 1000
	// .addTo(mymap);

	// function onMapClick(e) {
	// 	circle
	// 		.setLatLng(e.latlng)
	// 	circle.bindPopup("You are at " + e.latlng.toString());
	// 	// .setContent("You clicked the map at " + e.latlng.toString())
	// 	// .openOn(mymap);
	// }

	// mymap.on('click', onMapClick);



})

