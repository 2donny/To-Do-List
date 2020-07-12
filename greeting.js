const form = document.querySelector(".js-form"),
    input = form.querySelector('input'),
    greeting = document.querySelector('.js-greetings');

const USER_LS = 'currentUser',
    SHOWING_ON = 'showing';

function saveName(text) {
    localStorage.setItem(USER_LS, text); 
}

function handleSubmit(event) { //submit시 새로고침을 막고, 입력값을 local Storage에 저장 후, paintGreeting() 호출
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add('showing'); // form이 보인다
    form.addEventListener("submit", handleSubmit); // submit을 기다린다.
}

function paintGreeting(text) { // 호출되면 form은 안 보이게하고, greeting은 보이게 하며, 인사한다.
    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `Hello ${text}`
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) { //로컬 저장소에 currentUser가 없는 경우
        askForName(); 
    } else { // 있는 경우
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();
