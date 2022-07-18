import { renderMarkers } from './map.js';
import { debounce } from './utils.js';

const RERENDER_DELAY = 500;
const houseTypeSelect = document.querySelector('select[name="housing-type"]');
const priseSelect = document.querySelector('select[name="housing-price"]');
const roomsSelect = document.querySelector('select[name="housing-rooms"]');
const guestsSelect = document.querySelector('select[name="housing-guests"]');

const filterByHouseType = (type) => houseTypeSelect.value === type || houseTypeSelect.value === 'any';
const filterByPrice = (price) => {
  if (priseSelect.value === 'low') {
    return price < 10000;
  }
  if (priseSelect.value === 'middle') {
    return price > 10000 && price < 50000;
  }
  if (priseSelect.value === 'high') {
    return price > 50000;
  }
  return true;
};

const filterByRoomsCount = (roomsCount) => Number(roomsSelect.value) === roomsCount || roomsSelect.value === 'any';
const filterByGuestsCount = (guestsCount) => Number(guestsSelect.value) === guestsCount || guestsSelect.value === 'any';

const filterByFeatures = (features) => {
  const checkBoxFeatures = document.querySelectorAll('.map__features :checked');
  if (checkBoxFeatures.length && features) {
    return Array.from(checkBoxFeatures).every((checkFeatures) => features.includes(checkFeatures.value));
  }
  return checkBoxFeatures.length === 0;
};

const filterOffer = (offers, rerenderMarkers) => {
  const filteredOffers = offers.filter(({ offer }) =>
    filterByHouseType(offer.type) &&
    filterByPrice(offer.price) &&
    filterByRoomsCount(offer.rooms) &&
    filterByGuestsCount(offer.guests) &&
    filterByFeatures(offer.features)
  );
  rerenderMarkers(filteredOffers.slice(0, 10));
};


const initFilters = (offers) => {
  const onFilterChange = debounce(() => filterOffer(offers, renderMarkers), RERENDER_DELAY);
  document.querySelector('.map__filters').addEventListener('change', onFilterChange);
};

export { initFilters };