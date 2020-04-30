
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const errorMessage = document.querySelector('#error')
const weatherMessage = document.querySelector('#weather')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value

    if (!location) {
        weatherMessage.textContent = ""
        errorMessage.textContent = "You did not input a location."
        return
    }

    fetch(`http://localhost:3000/weather?location=${location}`).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                errorMessage.textContent = data.error
                weatherMessage.textContent = ""
            }

            else {
                errorMessage.textContent = ""
                weatherMessage.textContent = `${data.forecast.forecast} in ${data.location}. 
                It is ${data.forecast.temperature} degrees outside. It feels like ${data.forecast.feelsLike}.`
            }

        })
    })
})