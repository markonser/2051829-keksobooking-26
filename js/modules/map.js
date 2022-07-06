import { createCard } from './create-card.js';

const addressInputElement = document.querySelector('#address');
let map = null;
let markerGroup = null;

const ZOOM_LEVEL = 9;
const TOKIO_COORDINATES = {
  lat: 35.681729,
  lng: 139.753927,
};

const mainRedIcon = L.icon({
  iconUrl: '../../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const blueIcon = L.icon({
  iconUrl: '../../img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const markerRed = L.marker(
  TOKIO_COORDINATES,
  {
    draggable: true,
    icon: mainRedIcon,
  },
);

const createMarker = ((offer) => {
  const markerBlue = L.marker(
    offer.location,
    {
      icon: blueIcon,
    },
  );
  markerBlue
    .addTo(markerGroup)
    .bindPopup(createCard(offer));
  return markerBlue;
});

function activateMap(showForms, offers) {
  map = L.map('map-canvas')
    .on('load', showForms)
    .setView(TOKIO_COORDINATES, ZOOM_LEVEL);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  markerRed.addTo(map);
  markerRed.on('drag', (evt) => {
    const coordinates = evt.target.getLatLng();
    addressInputElement.value = `${coordinates.lat.toFixed(5)},${coordinates.lng.toFixed(5)}`;
  });

  markerGroup = L.layerGroup();
  markerGroup.addTo(map);

  offers.forEach(createMarker);
}

export { activateMap };
// resetButton.addEventListener('click', () => {
//   mainPinMarker.setLatLng({
//     lat: 59.96831,
//     lng: 30.31748,
//   });
//   map.setView({
//     lat: 59.96831,
//     lng: 30.31748,
//   }, 16);
// });
// markerGroup.clearLayers();