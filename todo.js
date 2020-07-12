const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');
    

const TODOS_LS = 'toDos';

let toDo_arr = [];
  
// 삭제 버튼 클릭 시 실행되는 함수.
function deleteToDo(event) { 
    const btn = event.target; //클릭 이벤트의 타겟.
    const li = btn.parentNode; //부모 노드, 즉 li를 반환.
    
    toDoList.removeChild(li);
    const deletedTodos = toDo_arr.filter((toDo) => {
        return toDo.id !== parseInt(li.id);
    });
    toDo_arr = deletedTodos; //새로고침 하기전, 즉 Local Storagee를 수정해야하기 전까지 toDo_arr를 수정하고 Local Storage에 save한다.
    saveToDos();
}

function saveToDos() {
    const todo = JSON.stringify(toDo_arr); //local Storage는 항상 string으로 저장됨.
    localStorage.setItem(TODOS_LS, todo);
    
}

function paintToDo(text) { // span, btn을 li의 자식으로 추가하고, 그 li를 toDoList에 추가
    const li = document.createElement('li');
    const delBtn = document.createElement('button');      
    const span = document.createElement('span');
    const newId = toDo_arr.length + 1;

    // ToDo를 HTML에 먼저 만들고
    delBtn.innerText = "❌";
    span.innerText = text;

    delBtn.addEventListener("click", deleteToDo); // X 버튼 클릭을 기다린다.
    
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId; 
    toDoList.appendChild(li);

    // 그 다음에 Local Storage에 저장한다.
    const toDoObj = { // property를 저장해야하니까 객체로 생성. 
        text: text,
        id: newId,
    };
    toDo_arr.push(toDoObj); // 기억해야하니까 toDo_arr 이용

    saveToDos();
}

function handleSubmit(event) { //새로고침을 막고, 입력값을 받아 paintoToDo() 호출
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS); //local Storage에는 항상 string으로 저장되어있음. 

    // Local Storage에 toDos가 아직 없으면 통과.
    if(loadedToDos !== null) { // LS에 toDos가 있을 때 실행.
        const parsedToDos = JSON.parse(loadedToDos); //LS 내의 값을 string -> Object로 파싱함.
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