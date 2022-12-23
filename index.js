const mymap = L.map("issMap").setView([0, 0], 9);

const issIcon = L.icon({
  iconUrl: "UFO-awkward.gif",
  iconSize: [90, 80],
  iconAnchor: [30, 94],
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 9,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(mymap);

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { latitude, longitude, visibility, } = data;
  

  marker.setLatLng([latitude, longitude]);
  mymap.setView([latitude, longitude], 3);

  document.querySelector("#lat").textContent = latitude;
  document.querySelector("#lon").textContent = longitude;
  document.querySelector('#vis').textContent = visibility;
  //   console.log(latitude);
  //   console.log(longitude);
}

getISS();

setInterval(getISS, 1000);
