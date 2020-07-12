const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');
    

const TODOS_LS = 'toDos';

let toDo_arr = [];
  
function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    
    toDoList.removeChild(li);
    const deletedTodos = toDo_arr.filter((toDo) => {
        return toDo.id !== parseInt(li.id);
    });
    toDo_arr = deletedTodos; //새로고침 하기전, 즉 Local Storagee를 수정해야하기 전까지 toDo_arr를 수정하고 Local Storage에 save한다.
    saveToDos();
}

function saveToDos() {
    const todo = JSON.stringify(toDo_arr);
    localStorage.setItem(TODOS_LS, todo);
    
}

function paintToDo(text) { // span, btn을 li의 자식으로 추가하고, 그 li를 toDoList에 추가
    const li = document.createElement('li');
    const delBtn = document.createElement('button');      
    const span = document.createElement('span');
    const newId = toDo_arr.length + 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId; 
    toDoList.appendChild(li);

    const toDoObj = { 
        text: text,
        id: newId,
    };
    toDo_arr.push(toDoObj);

    saveToDos();
}

function handleSubmit(event) { //새로고침을 막고, 입력값을 받아 paintoToDo() 호출
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    
    // Local Storage에 toDos가 아직 없으면 통과.
    if(loadedToDos !== null) { // LS에 toDos가 있을 때 실행.
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDos) {
            paintToDo(toDos.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit); //to-do 추가시 handleSubmit() 호출
    
}

init();