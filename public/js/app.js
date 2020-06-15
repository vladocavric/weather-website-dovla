// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }else if(data.geoData){
//             console.log((data.geoData))
//         } else {
//             console.log(data.forcast);
//             console.log(data.city2)
//
//         }
//     })
// })
const $sendLocationBtn = document.getElementById('sendLocation')
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const place = document.getElementById("city");
let message1 = document.getElementById("message-1");
let message2 = document.getElementById("message-2");

$sendLocationBtn.addEventListener('click', () => {
    console.log('poslata je lokacija')
    navigator.geolocation.getCurrentPosition((position) => {
        let coordinate = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            // city: position.coords.locality
            coordsData: position.coords
        }
       console.log(coordinate)

       message1.textContent = 'loading...'
       message2.textContent = '';

       const url = `/weatherfromcords?lat=${coordinate.lat}&lon=${coordinate.lon}`;

       fetch(url).then((response) => {
        // console.log(url)
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error);
                message1.textContent = data.error;
            } else if (!data.forcast) {
                // console.log(data.geoData)
                message1.textContent = ''
                message2.textContent = 'We did not find pelace withi this name';
            } else {
                // console.log(data.forcast);

                let city = data.city;
                message2.innerHTML = `In <span id="city">${city}</span> the temperature is <span id="temp">${Math.round(data.forcast.temp)}
                </span>&deg;C and it feeles like <span id="feeles-like">${Math.round(data.forcast.feels_like)}</span>&deg;C, 
                also dayle maximum and minimum will be <span id="feeles-like">${Math.round(data.forcast.temp_max)}</span>&deg;C 
                and <span id="feeles-like">${Math.round(data.forcast.temp_min)}</span>&deg;C respectively` ;
                message1.textContent = '';
                // message3.innerHTML = data.url;
            }
        })
    })
})
})

let content = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    message1.textContent = 'loading...'
    message2.textContent = '';

    const location = search.value
    const url = '/weather?address=' + location;
    // const foolUrl = window.location.href + url

    fetch(url).then((response) => {
        // console.log(url)
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error);
                message1.textContent = data.error;
            } else if (!data.forcast) {
                // console.log(data.geoData)
                message1.textContent = ''
                message2.textContent = 'We did not find pelace withi this name';
            } else {
                // console.log(data.forcast);

                let city = data.city2;
                message2.innerHTML = `In <span id="city">${city}</span> the temperature is <span id="temp">${Math.round(data.forcast.temp)}
                </span>&deg;C and it feeles like <span id="feeles-like">${Math.round(data.forcast.feels_like)}</span>&deg;C, 
                also dayle maximum and minimum will be <span id="feeles-like">${Math.round(data.forcast.temp_max)}</span>&deg;C 
                and <span id="feeles-like">${Math.round(data.forcast.temp_min)}</span>&deg;C respectively` ;
                message1.textContent = '';
                // message3.innerHTML = data.url;
            }
        })
    })
})