let width, height;
const markerIcon = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [40, 42], // size of the icon
  iconAnchor: [20, 21], // point of the icon which will correspond to marker's location
});
const map = L.map("map").setView([0, 0], 5);
const marker = L.marker([0, 0], { icon: markerIcon }).addTo(map);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoibW9oYW1lZGVuaW0iLCJhIjoiY2wwcXVjaWNmMDJtYTNncGtvY2QzaWdoayJ9.Jk-DY18O0OegohAiEB-Z3g",
  }
).addTo(map);
const search = document.querySelector(".ipTracker__inputWrapper__enter");
const ipAdress = document.querySelector(".ipTracker__inputWrapper__input");
const ipBox = document.getElementById("ip");
const locationZone = document.getElementById("location");
const timeZone = document.getElementById("timeZone");
const isp = document.getElementById("isp");
const banner = document.querySelector(".ipTracker__banner");
const error = document.querySelector(".error");
const divider = document.querySelectorAll(".divider");

window.onresize = window.onload = function () {
  if (this.innerWidth < 881) {
    divider.forEach((el) => {
      el.classList.add("hidden");
    });
  } else {
    divider.forEach((el) => {
      el.classList.remove("hidden");
    });
  }

  search.onclick = async () => {
    if (ValidateInput(ipAdress.value)) {
      error.classList.add("hidden");
      const result = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_nWqO9y0M1FhkIHxBPN00Vhu8hCx3A&ipAddress=${ipAdress.value}`
      );
      data = await result.json();

      banner.classList.remove("hidden");

      ipBox.textContent = data.ip;
      locationZone.textContent = `${data.location.country},${data.location.region}`;
      timeZone.textContent = `UTC${data.location.timezone}`;
      isp.textContent = `${data.isp}`;
      map.setView([data.location.lat, data.location.lng], 13);
      marker.setLatLng([data.location.lat, data.location.lng]).addTo(map);
    } else {
      error.classList.remove("hidden");
    }
  };

  const ValidateInput = (inputValue) => {
    let testInput = ipAdress.value.split(".");
    if (testInput.length < 4 || testInput.length > 4) {
      return false;
    }

    return testInput
      .map((el) => {
        return parseInt(el) ? (el <= 255 && el >= 0 ? true : false) : false;
      })
      .join("")
      .includes(false)
      ? false
      : true;
  };
};
