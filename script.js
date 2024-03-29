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
const apiKey = `pk.18f82f578d8f656a2719c24a0974a158`;



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

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(
//     `${apiLink}/name/${country}`,
//     'Country not found'
//   )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) throw new Error('No neighbour found!');

//       // Country 2
//       return getJSON(
//         `${apiLink}/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })

//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };



// getCountryData('australia');

// CHALLENEGE - 1




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
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lotter draw is happening 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰');
//     } else {
//       reject(new Error('You lost your money 💩'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 second passed');
//     return wait(1);
//   })
//   .then(() => console.log('4 second passed'));

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

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));

///////////////////////////////////////
// Promisifying the Geolocation API
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     // here the position is automatically passed into the resolve as argument
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };




// const whereAmI = function () {
//   getPosition().then(pos => {
//     const { latitude: lat, longitude: lng } = pos.coords;
//     return fetch(`https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${lat}&lon=${lng}&format=json`)
//   }).then((response) => {
//     if (!response.ok) throw new Error(`Something not right (${response.status})`);
//     return response.json();
//   })
//     .then(function (data) {
//       getCountryData(data.address.country);
//     })
//     .catch(Error => {
//       alert(Error) // Error!
//     },);
// }
// btn.addEventListener('click', whereAmI);


// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     resolve(document.createElement('img'))
//   });
// }

// createImage(`https://picsum.photos/id/237/200/300`)
//   .then(value => {
//     value.setAttribute("src", imgPath);
//     console.log()
//   });

// let imgEl = '';

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const createImg = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     resolve(document.createElement('img'))
//   }).then(data => {
//     data.setAttribute("src", `${imgPath}`);
//     return data;
//   }).then(data => {
//     imgEl = data;
//     countriesContainer.appendChild(data)
//   })
//     .then(() => {
//       wait(2).then(() => {
//         imgEl.style.display = "none";
//         console.log(imgEl);
//       })
//         .then(() => {
//           wait(2).then(() => {
//             console.log(imgEl);
//             imgEl.setAttribute("src", "https://picsum.photos/id/237/400/300");
//             imgEl.style.display = "block";
//           }).then(() => {
//             wait(2).then(() => {
//               console.log(imgEl);
//               imgEl.style.display = "none";
//             })
//           })
//         })
//     })
//     .catch(Error => {
//       alert(Error) // Error!
//     },)
// };

// btn.addEventListener("click", function () {
//   createImg("https://picsum.photos/id/237/200/300");
// })

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };


// solution

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };



// let currentImg;

// createImage('https://picsum.photos/id/237/200/300')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('https://picsum.photos/id/238/200/300');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// // Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };


// const whereAmI = async function (country) {
//   // this code will run in the bg till the res value is fetched
//   // the blocking in the await function will not interefere with the main thread 
//   // on which the main code is getting executed.
//   const res = await fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`);

//   // sync await is just syntactical sugercoading over the then function else
//   // fetch("link").then(res=>console.log(res);)

//   // since the res.json() return a new promise and then we had to return that promise 
//   // and then we chain .then handler on that promise
//   // but we can directly store in a vatiable directlly
//   const data = await res.json();
//   renderCountry(data[0]);
//   console.log(data);
// }

// whereAmI(`germany`);

// try catch

// try {
//   let x = 1;
//   const y = 6;
//   y = 5;
// } catch (err) {
//   alert(err);
// }

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     // here the position is automatically passed into the resolve as argument
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };



// const whereAmI = async function () {
//   try {
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     const resLoc = await fetch(`https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${lat}&lon=${lng}&format=json`);
//     if (!resLoc.ok) throw new Error('Problem getting location data');

//     const countryData = await resLoc.json();

//     const resGeo = await fetch(`https://countries-api-836d.onrender.com/countries/name/${countryData.address.country}`);
//     if (!resGeo.ok) throw new Error('Problem getting country');

//     const data = await resGeo.json();

//     renderCountry(data[0]);

//     return `you are in ${countryData.address.country}`;
//   }
//   catch (err) {
//     // alert(err);
//     throw err;
//   }
// };


// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err} 💥`);
//   }
//   console.log('3: Finished getting location');
// })();

///////////////////////////////////////

// const data = await Promise.all([
//   getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
//   getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
//   getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
// ]);
// console.log(data.map(d => d[0].capital));
// } catch (err) {
// console.error(err);
// }
// Running Promises in Parallel
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(
//     //   `https://countries-api-836d.onrender.com/countries/name/${c1}`
//     // );
//     // const [data2] = await getJSON(
//     //   `https://countries-api-836d.onrender.com/countries/name/${c2}`
//     // );
//     // const [data3] = await getJSON(
//     //   `https://countries-api-836d.onrender.com/countries/name/${c3}`
//     // );


//     const data = await Promise.all([
//       getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
//       getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
//       getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
//     ]);
//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// }
// get3Countries('portugal', 'canada', 'tanzania');


// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long!'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
//   timeout(5),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// // Promise.allSettled
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));

// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// // Promise.any [ES2021]
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

async function chalSoln() {
  try {
    const response1 = await createImage('img/img-1.jpg');
    if (response1) {
      currentImg = response1;
      await wait(2);
      currentImg.style.display = 'none';
      await wait(2);

    }
    const response2 = await createImage('img/img-2.jpg');
    if (response2) {
      currentImg = response2;
      await wait(2);
      currentImg.style.display = 'none';
      console.log('Image 2 removed');
    }
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

// chalSoln();
const data = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];
async function loadAll(imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }

}
loadAll(data);