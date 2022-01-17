$(() => {
	$.getScript("./config.js");
	const API_KEY = config.MY_KEY;

	$("form#get-weather").submit(function (e) {
		e.preventDefault();
		let city = html = "";
		const dataDiv = $("div.data");
		city = $("input#city").val();
		const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
		if (city !== "") {
			$.get(API_URL, function (data) {
				let { current, location } = data;
				html = `
				<p>${city}</p>
        <div class="data-temp">
          <p>${current.temp_c}°</p>
          <img src="${current.condition.icon}" />
        </div>
        <p>Longitude: ${location.lon}</p>
        <p>Latitude: ${location.lat}</p> 
        `;
				dataDiv.empty().append(html);
			}).fail(() => dataDiv.empty().append("<p>Data not found</p>"));
		} else {
			dataDiv.empty().append("<p>Please enter city name</p>");
		}
	});
});
