'use strict';

// array to hold all locations
var allStores = [];
var storeHours = [];

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

// create location instances
new Store('1st and Pike', 23, 65, 6.3);
new Store ('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 2.3);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 6.3);

// populate store hours array
for (let i = 6; i <= 20; i ++) {
  storeHours.push(processTime(i));
}

for (let storeIndex = 0; storeIndex < allStores.length; storeIndex++) {
  for (let i = 0; i < 15; i ++) {
    addCustomersAndCookies(allStores[storeIndex], i);
  }
  returnList(allStores[storeIndex]);
}

// helper function to add number of customers to array, calls function to add to cookies per hour array
function addCustomersAndCookies (location, i) {
  var number = location.customersPerHour[i] = getRandomIntInclusive(location.minimum, location.maximum);
  totalCookiesPerHour(location, i, number);
}

// helper function that calculates number of cookies sold per location - dependent on number of customers that hour
function totalCookiesPerHour(location, i, number) {
  location.cookiesSoldHourly[i] = Math.floor(number * location.averageCookies);
  // console.log("cookies at " + location.location + " at hour " + i + " = " + cookies); // testing
}

// source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random - generates random number, min and max inclusive
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// let's display our number of customers per location!
function returnList(singleLocation) {
  // var ulEl = document.getElementById();
  // for loop
  // var liEl = document.createElement('li');
  // liEl.textContent = 
  var text = '';
  var html = document.getElementById('hidden');
  var startHour = 6;
  var sum = 0;

  text += '<div><h3>' + singleLocation.location + '</h3><ul>';

  // append li for hours and cookies sold by that hour
  for (let i = 0; i < singleLocation['cookiesSoldHourly'].length; i ++) {
    sum += singleLocation['cookiesSoldHourly'][i];
    text += '<li> ' + processTime(startHour) + ': ' + singleLocation['cookiesSoldHourly'][i] + ' cookies</li>';
    startHour++;
  }
  text += '<li>' + 'Total: ' + sum + ' cookies</li>';
  text += '</ul></div>';

  html.innerHTML += text;

  //save sum
  singleLocation['totalCookies'] = sum;
}

// helper function to display time in correct way, with am and pm
function processTime(time) {
  if(time > 11 && time !== 12) {
    return (time - 12) + 'pm';
  } else if (time === 12) {
    return time + 'pm';
  } else {
    return time + 'am';
  }
}
