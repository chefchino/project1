var mymap = L.map('mapId').setView([35.900019, -79.012629], 13);

var zomatoAPIKey = "&apikey=a07626ef54fa05775a802f84080be9bf";


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

			for (i = 0; i < response.restaurants.length; i++) {
				console.log(response.restaurants[i].restaurant.name);
				pTag = $("<p></p>");
				// pTag.addClass("restInfo");
				pTag.text(response.restaurants[i].restaurant.name);
				pTag1 = $("<p>");
				pTag1.text(response.restaurants[i].restaurant.location.address);
				pTag2 = $("<a>");
				pTag2.attr(response.restaurants[i].restaurant.url);
				pTag2.text("website");
				pTag3 = $("<p>");
				pTag3.text("Rating: " + response.restaurants[i].restaurant.user_rating.aggregate_rating);

				$(".restaurant-name-tag").append(pTag);
				$(".restaurant-name-tag").append(pTag1);
				$(".restaurant-name-tag").append(pTag2);
				$(".restaurant-name-tag").append(pTag3);
			};

		});

	$.ajax({
		url: seatGeekURL,
		method: 'GET',
	})
		.done((response1) => {
			console.log(response1);

			for (i = 0; i < response1.events.length; i++) {
				console.log(response1.events[i].title);
				pTwo = $("<p>");
				pTwo.text(response1.events[i].title);
				$("#events").append(pTwo);
			};
		});

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoiY2hlZmNoaW5vIiwiYSI6ImNrMXhxdG05dDBjNXczbW8zcDVsZXAza3gifQ.n7yrjPAM_yOPpOJGez6qKQ'
	}).addTo(mymap);



	var circle = L.circle([35.900019, -79.012629], {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5,
		radius: 1000
	}).addTo(mymap);

	function onMapClick(e) {
		circle
			.setLatLng(e.latlng)
		circle.bindPopup("You are at " + e.latlng.toString());
		// .setContent("You clicked the map at " + e.latlng.toString())
		// .openOn(mymap);
	}

	mymap.on('click', onMapClick);



})

