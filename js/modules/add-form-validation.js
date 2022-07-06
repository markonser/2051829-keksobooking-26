import { updateSliderOptions } from './no-ui-slider.js';

const MATCH_ROOMS_OPTIONS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const MIN_PRICE_OF_HOUSE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000
};

const addFormElement = document.querySelector('.ad-form');
const roomsSelectElement = addFormElement.querySelector('[name="rooms"]');
const capacitySelectElement = addFormElement.querySelector('[name="capacity"]');
const typeOfHouseOptionElement = addFormElement.querySelector('[name="type"]');
const pricePerNightInputElement = addFormElement.querySelector('[name="price"]');
const addressInputElement = addFormElement.querySelector('[name="address"]');
const checkInElement = addFormElement.querySelector('[name="timein"]');
const checkOutElement = addFormElement.querySelector('[name="timeout"]');

const pristine = new Pristine(addFormElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text'
}, true);

function onHouseChange() {
  pricePerNightInputElement.min = MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value];
  pricePerNightInputElement.placeholder = `от ${MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value]}`;
  updateSliderOptions(MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value]);
  pristine.validate(typeOfHouseOptionElement);
}
function validateRooms() {
  return MATCH_ROOMS_OPTIONS[roomsSelectElement.value].includes(capacitySelectElement.value);
}

function getRoomsErrorMessage() {
  if (roomsSelectElement.value === '1' && capacitySelectElement.value !== '0') {
    return `для ${roomsSelectElement.value} гостя`;
  }
  if (roomsSelectElement.value === '2' && capacitySelectElement.value !== '0') {
    return `для ${roomsSelectElement.value}-${capacitySelectElement.value} гостей`;
  }
  if (roomsSelectElement.value === '3' && capacitySelectElement.value !== '0') {
    return `для ${roomsSelectElement.value}-${capacitySelectElement.value} гостей`;
  }
  if (capacitySelectElement.value === '0' || roomsSelectElement.value === '100') {
    return 'не для гостей';
  }
}
function validateAddress() {
  return addressInputElement.value !== '';
}

function validatePriceOfType() {
  return pricePerNightInputElement.value >= MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value];
}

function getPriceErrorMessage() {
  if (pricePerNightInputElement.value <= MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value]) {
    return `минимальная цена ${MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value]}`;
  }
}

const onCheckInCHange = (evt) => {
  checkOutElement.value = evt.target.value;
};

const onCheckOutChange = (evt) => {
  checkInElement.value = evt.target.value;
};

const onFormSubmit =(evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

function activateFormValidation() {
  pristine.addValidator(capacitySelectElement, validateRooms, getRoomsErrorMessage);
  pristine.addValidator(pricePerNightInputElement, validatePriceOfType, getPriceErrorMessage);
  pristine.addValidator(addressInputElement, validateAddress, 'Обязательное поле');
  addFormElement.addEventListener('submit', onFormSubmit);
  addFormElement.querySelectorAll('[name="type"]').forEach((item) => item.addEventListener('change', onHouseChange));
  checkInElement.addEventListener('change', onCheckInCHange);
  checkOutElement.addEventListener('change', onCheckOutChange);
}
export { activateFormValidation };