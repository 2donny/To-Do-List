const API_KEY = "e5d9296e19bf7f7a0e2653e697e1f2fa";
const  COORDS = 'coords';


function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
        );
}

function saveCoords(coordsObj) {
    const coords = JSON.stringify(coordsObj);
    localStorage.setItem(COORDS, coords);
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude,
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGEOError() {
    console.log("Cant't access geo location.");
}

function askforCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGEOError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS)

    if(loadedCoords === null) {
        askforCoords();
    }else {
        const parsedCoords = JSON.parse(loadedCoords);
        console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
        
    }
}

function init() {
    loadCoords();

}

init();