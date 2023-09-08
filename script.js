'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1; handled by finally method
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const apiLink = `https://countries-api-836d.onrender.com/countries`;



// ///////////////////////////////////////
// // Our First AJAX Call: XMLHttpRequest

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     renderCountry(data);
//   });
// };

// // getCountryData('portugal');
// // getCountryData('usa');
// // getCountryData('germany');


// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);
//     console.log(data.borders);

//     // Get neighbour country (2)
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();

//     request2.open('GET', `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// // getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);


// Consuming Promises

// const apiLink = `https://countries-api-836d.onrender.com/countries/name/`;

// const getCountryData = function (country) {
//   fetch(`${apiLink}${country}`) // returns promise
//     .then(function (response) { // .then means if the promise is settled
//       // console.log(response);
//       return response.json(); // return an new promise and response.json give sthe data or the body
//     }).then(function (actualData) {
//       console.log(actualData);
//       renderCountry(actualData[0]);
//     })
// };

// getCountryData("india");

// const getCountryData = function (country) {
//   fetch(`${apiLink}/name/${country}`)
//     .then(
//       response => response.json()
//     )
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;
//       //country-2
//       return fetch(`${apiLink}/alpha/${neighbour}`);
//     }).then(response => response.json())
//     .then((data) => {
//       renderCountry(data, 'neighbour');
//     });
// }


// btn.addEventListener("click", function () {
//   getCountryData("germany");
// })


//Handle promise rejections
// this happens only when user losses internet connection


const getCountryData = function (country) {
  fetch(`${apiLink}/name/${country}`)
    .then(
      response => response.json(),
      // (reason) => {
      //   alert(reason) // Error!
      // },
    )
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      //country-2
      return fetch(`${apiLink}/alpha/${neighbour}`);
    }).then(response => response.json())
    .then((data) => {
      renderCountry(data, 'neighbour');
    }).catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    }).finally(() => {
      countriesContainer.style.opacity = 1;
    });
}


btn.addEventListener("click", function () {
  getCountryData("germany");
})