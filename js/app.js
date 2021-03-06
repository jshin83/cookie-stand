'use strict';

var allStores = [];
var storeHours = [];
var storeCookieSum = 0;
var tbdy;
var trElement;
var totalCookieSum = 0;
var newStoreForm = document.getElementById('new-store');
var hourlySums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


// create location object - constructor
function Store(locationName, minimum, maximum, averageCookies) {
  this.location = locationName;
  this.minimum = minimum;
  this.maximum = maximum;
  this.averageCookies = averageCookies;
  this.customersPerHour = [];
  this.cookiesSoldHourly = [];
  this.totalCookies = 0;
  allStores.push(this);
}

// adds object information to table
Store.prototype.render = function() {
  // make table row
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  // create, content, append - store name
  tdElement.textContent = this.location;
  trElement.appendChild(tdElement);
  // store properties td and append to tr
  for(let cookiesIndex = 0 ; cookiesIndex < this.cookiesSoldHourly.length; cookiesIndex++) {
    tdElement = document.createElement('td');
    tdElement.textContent = this.cookiesSoldHourly[cookiesIndex];
    trElement.appendChild(tdElement);
    hourlySums[cookiesIndex] = hourlySums[cookiesIndex] + this.cookiesSoldHourly[cookiesIndex];
  }
  tdElement = document.createElement('td');
  tdElement.textContent = this.totalCookies;
  trElement.appendChild(tdElement);
  // append tr to tbdy
  tbdy.appendChild(trElement);
};

// creates table, calls render for each object in store array
function displayData() {
  createTable();
  // call render on all stores
  for(let i = 0; i < allStores.length; i++) {
    allStores[i].render();
  }
  // create row of totals and display onto Table
  createTotalsRow();
}

// create table element, assign table body
function createTable() {
  var div = document.getElementById('hidden');
  div.innerHTML = '';
  // make a table
  var table = document.createElement('table');
  // make table body
  tbdy = document.createElement('tbody');
  // create table headers
  createTableHeaderRow();
  table.appendChild(tbdy);
  div.appendChild(table);
}

// helper function to create table headers
function createTableHeaderRow() {
  createTh('');
  for (let i = 0; i < storeHours.length; i++) {
    createTh(storeHours[i]);
  }
  createTh('Daily Location Total');
}

// helper funciton to create table hr
function createTh(thContent) {
  var thElement = document.createElement('th');
  thElement.textContent = thContent;
  tbdy.appendChild(thElement);
}

// helper function to create totals table tr - footer row
function createTotalsRow() {
  trElement = document.createElement('tr');
  createTd('Totals');
  for (let i = 0; i < hourlySums.length; i++) {
    createTd(hourlySums[i]);
  }
  createTd(totalCookieSum);
}

// helper function that creates blank td
function createTd(content) {
  let tdEl = document.createElement('td');
  tdEl.textContent = content;
  tbdy.appendChild(trElement.appendChild(tdEl));
}

// helper function to add number of customers to array, calls function to add to cookies per hour array
function addCustomersAndCookies (location, i) {
  location.customersPerHour[i] = getRandomIntInclusive(location.minimum, location.maximum);
  totalCookiesPerHour(location, i, location.customersPerHour[i]);
}

// helper function that calculates number of cookies sold per location - dependent on number of customers that hour
function totalCookiesPerHour(location, i, number) {
  location.cookiesSoldHourly[i] = Math.ceil(number * location.averageCookies);
  storeCookieSum += location.cookiesSoldHourly[i];
}

// source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random - generates random number, min and max inclusive
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// helper function to display time in correct way, with am and pm
function processTime(time) {
  if (time > 11 && time !== 12) {
    return (time - 12) + ':00pm';
  } else if (time === 12) {
    return time + ':00pm';
  } else {
    return time + ':00am';
  }
}

// create location instances
new Store('1st and Pike', 23, 65, 6.3);
new Store ('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 2.3);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 6.3);

// attach event listener for when form is submitted
newStoreForm.addEventListener('submit', addNewStore);

// when submit button is called, handle from input fields
function addNewStore(event){
  event.preventDefault();
  let locationName = event.target.location.value;
  let minimumInput = Number(event.target.minimum.value);
  let maximumInput = Number(event.target.maximum.value);
  let averageCookiesInput = Number(event.target.averageCookies.value);
  // some validation
  if(minimumInput > maximumInput) {
    alert('Maximum input should be more than minimum.');
  } else if (averageCookiesInput > maximumInput) {
    alert('Average number of cookies cannot be greater than maxiumum input.');
  } else {
    totalCookieSum = 0; // have to reset or will continue adding previous total
    let storeToAdd = new Store(locationName, minimumInput, maximumInput, averageCookiesInput);

    storeToAdd.render();
    populateObject();

    displayData();
  }
  console.log(locationName + ', ' + maximumInput + ', ' + minimumInput + ', ' + averageCookiesInput);
}

// populate store hours array
for (let i = 6; i <= 20; i ++) {
  storeHours.push(processTime(i));
}

function populateObject() {
  hourlySums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // populate customersPerHour and cookiesSoldHourly arrays, total cookies property for object
  for (let storeIndex = 0; storeIndex < allStores.length; storeIndex++) {
    // initialize sum to zero, or reset to zero for store object
    storeCookieSum = 0;
    // allStores[storeIndex].totalCookies = 0;
    for (let i = 0; i < 15; i ++) {
      allStores[storeIndex].totalCookies = 0;
      addCustomersAndCookies(allStores[storeIndex], i);
    }
    // populate totalCookies for object
    console.log(storeCookieSum + ' is store cookie sum, populate object.');
    allStores[storeIndex].totalCookies = storeCookieSum;
    console.log(allStores[storeIndex].totalCookies + ' cookies for object ' + allStores[storeIndex]);
    console.log('store cookie sum ' + storeCookieSum + ', ' + allStores[storeIndex].totalCookies);
    totalCookieSum += storeCookieSum;
  }
}

populateObject();
// wrapper function to render table onto page
displayData();
