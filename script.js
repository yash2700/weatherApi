var latitude = 0;
var longitude = 0;
const apiKey = "3a11b3d6879f4897884142628232204";
var weatherData;

var fetchButton = document.getElementById("fetch");
var map = document.getElementById("map");

var data = document.getElementById("data");

function fetchData(e) {
  e.preventDefault();

  if ("geolocation" in navigator) {
    // Geolocation is supported
    navigator.geolocation.getCurrentPosition(function (position) {
      // Get latitude and longitude from the position object
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`)
        .then(response => response.json())
        .then(data => { weatherData = data,
        console.log(weatherData.current),
        map.setAttribute('src', `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=14&amp&output=embed`);
        document.getElementById("bottom").innerHTML += `<div class="weather-content">
            <p>Location : &nbsp;${weatherData.location.name} </p>
            <div class="long">
                <p>Lat :&nbsp;${latitude}
                </p>
                <p>Long :&nbsp;${longitude}
                </p>
            </div>
  
            <p>TimeZone :&nbsp;${weatherData.location.tz_id}</p>
            <p>Wind Speed : &nbsp;${weatherData.current.wind_kph}</p>
            <p>Pressure :&nbsp;${weatherData.current.pressure_in}</p>
            <p>Humidity :&nbsp; ${weatherData.current.humidity}</p>
            <p>Wind Direction :&nbsp;${weatherData.current.wind_dir}</p>
            <p>UV Index :&nbsp;${weatherData.current.uv}</p>
            <p>Feels Like :&nbsp;${weatherData.current.feelslike_f}</p>
        </div>`;
    })
        .catch(error => console.error(error));

      document.getElementById("latitude").innerHTML += `&nbsp` + `&nbsp` + latitude;
      document.getElementById("longitude").innerHTML += `&nbsp` + `&nbsp` + longitude;

      data.style.display = "block";

      

    });

  }

  fetchButton.style.display = "none";
}

fetchButton.addEventListener("click", fetchData);
