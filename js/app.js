'use strict';

// create these five locations, redundantly, as object literals
var location1 = {
  location: '1st and Pike',
  minimum: 23,
  maximum: 65,
  averageCookies: 6.3,
  customersPerHour: [],
  cookiesSoldHourly: []
};

var location2 = {
  location: 'SeaTac Airport',
  minimum: 3,
  maximum: 24,
  averageCookies: 1.2,
  customersPerHour: [],
  cookiesSoldHourly: []
};

var location3 = {
  location: 'Seattle Center',
  minimum: 11,
  maximum: 38,
  averageCookies: 3.7,
  customersPerHour: [],
  cookiesSoldHourly: []
};

var location4 =  {
  location: 'Capitol Hill',
  minimum: 20,
  maximum: 38,
  averageCookies: 2.3,
  customersPerHour: [],  
  cookiesSoldHourly: []
};

var location5 = {
  location: 'Alki',
  minimum: 2,
  maximum: 16,
  averageCookies: 6.3,
  customersPerHour: [],
  cookiesSoldHourly: []
}

//for (let i = 6; i <= 20; i++) {
  for (var i = 0; i < 15; i ++) {
    addRandomCustomers(location1, i);
    addRandomCustomers(location2, i);
    addRandomCustomers(location3, i);
    addRandomCustomers(location4, i);
    addRandomCustomers(location5, i);
  }

// helper function to add number of customers to array, calls function to add to cookies per hour array
function addRandomCustomers (location, i) {
  var number = location.customersPerHour[i] = getRandomIntInclusive(location.minimum, location.maximum);
  cookiesSold(location, i, number);
}

// helper function that add number of cookies sold per location - dependent on number of customers that hour
function cookiesSold(location, i, number) {
  var cookies = location.cookiesSoldHourly[i] = Math.floor(number * location.averageCookies);
  // console.log("cookies at " + location.location + " at hour " + i + " = " + cookies); // testing
}

// source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random - generates random number, min and max inclusive
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// let's display our number of customers per location!

returnList(location1);
returnList(location2);
returnList(location3);
returnList(location4);
returnList(location5);

function returnList(singleLocation) {
  var text = '';
  var html = document.getElementById('hidden');
  var startHour = 6;
  var sum = 0;
  
  text += '<div><h3>' + singleLocation.location + '</h3><ul>';

  // append li for hours and cookies sold by that hour
  for (let i = 0; i < singleLocation['cookiesSoldHourly'].length; i ++) {
    sum += singleLocation['cookiesSoldHourly'][i];
    text += '<li> ' + processTime(startHour) + ': ' +  singleLocation['cookiesSoldHourly'][i] + ' cookies</li>';
    startHour++;
  }
  text += '<li>' + 'Total: ' + sum + ' cookies</li>';
  text += '</ul></div>';

  html.innerHTML += text;
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
