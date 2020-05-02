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

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const place = document.getElementById("city")
let message1 = document.getElementById("message-1")
let message2 = document.getElementById("message-2")
let content = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    message1.textContent = 'loading...'
    message2.textContent = ''
    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error);
                message1.textContent = data.error;
            } else if (data.geoData) {
                // console.log((data.geoData))
                message1.textContent = ''
                message2.textContent = data.geoData;
            } else {
                // console.log(data.forcast);
                // console.log(data.city2)
                let city = data.city2;
                message2.innerHTML = `In <span id="city">${city}</span> temperature is <span id="temp">${Math.round(data.forcast.temp)}
                </span>&deg;C and it feeles like <span id="feeles-like">${Math.round(data.forcast.feels_like)}</span>&deg;C`;
                message1.textContent = '';
            }
        })
    })
})