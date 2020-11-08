const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

console.log(data)
  // const cityDets = data.cityDets;
  // const weather = data.weather;

  // destructure properties se above for long solution
  const {cityDets, weather } = data;

  // Update details template
  details.innerHTML = `
      <h5 class="my-3">${cityDets.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
      </div>
    `;

    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // using terneray operator instead of all code below
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);
    // if(weather.IsDayTime){
    //   timeSrc = 'img/day.svg';
    // } else {
    //   timeSrc = 'img/night.svg';
    // }

    // Remove d-none class if present
    if(card.classList.contains('d-none')){
      card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {

  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {cityDets,weather};

};

cityForm.addEventListener('submit', e => {
  //prevent default action in other words the whole site dosen't refresh
  e.preventDefault();

  // Get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //Update the ui with new city
  updateCity(city)
  .then(data => updateUI(data))
  .catch(err => console.log(err));

  // Set locla storage.This line creates a sort of coockie so If you visit the website again, the last searc city will load
  localStorage.setItem('city', city);

});

if(localStorage.getItem('city')){
  updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}