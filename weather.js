const API_KEY = "e5d9296e19bf7f7a0e2653e697e1f2fa";
const  COORDS = 'coords';


function saveCoords(coordsObj) {
    const coords = JSON.stringify(coordsObj);
    localStorage.setItem(C햣OORDS, coords);
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const logitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        logitude,
    };

    saveCoords(coordsObj);
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
        // getWeather
        
    }
}

function init() {
    loadCoords();

}

init();