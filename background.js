const body = document.querySelector('body');

const IMG_NUMBER = 3;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = "images/" + imgNumber + ".jpg";
    image.classList.add("bgImage");

    body.appendChild(image);
}

function getRandom(number) {
    randNum = Math.ceil(Math.random() * 3);
    return randNum;
}

function init() {
    const randomNumber = getRandom(IMG_NUMBER);
    paintImage(randomNumber);

}

init();