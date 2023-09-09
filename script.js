'use strict';

// const { response } = require("express");

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

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
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


// const getCountryData = function (country) {
//   fetch(`${apiLink}/name/${country}`)
//     .then(
//       response => {
//         if (!response.ok)
//           throw new Error(`Country not found (${response.status})`);

//         return response.json();
//       }
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
//     }).catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     }).finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// }


// btn.addEventListener("click", function () {
//   getCountryData("asbhwud");
// })

const getCountryData = function (country) {
  // Country 1
  getJSON(
    `${apiLink}/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `${apiLink}/alpha/${neighbour}`,
        'Country not found'
      );
    })

    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};



// getCountryData('australia');

// CHALLENEGE - 1
// const apiKey = `pk.18f82f578d8f656a2719c24a0974a158`;



// const whereAmI = function (lat, lng) {
//   fetch(`https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${lat}&lon=${lng}&format=json`)
//     .then((response) => {
//       if (!response.ok) throw new Error(`Something not right (${response.status})`);
//       return response.json();
//     })
//     .then(function (data) {
//       getCountryData(data.address.country);
//     })
//     .catch(Error => {
//       alert(Error) // Error!
//     },);
// }


// btn.addEventListener('click', function () {
//   whereAmI(22.508534, 88.410564);
// });

//Working examp-le of async js

// The Event Loop in Practice
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) { }
//   console.log(res);
// });

// console.log('Test end');


/****************************************************************/
// Building a Simple Promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

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

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));