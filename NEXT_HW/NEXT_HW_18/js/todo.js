const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const submitBtn = document.querySelector('.submitBtn');
// 폼 요소를 가져온다.
document.addEventListener('DOMContentLoaded', loadTodos);
// 기존의 할 일 목록을 로컬스토리지로 불러온다.

function loadTodos() {
    const todos = JSON.parse(window.localStorage.getItem('todos')) || [];
    todos.forEach((todo) => {
        addTodoToDOM(todo);
    });
}
// 로컬스토리지에서 todos로 저장된 할일 목록을 json 형식으로 파싱해서 배열로 가져온다.
// adtodotodom을 호출해서 dom에 저장한다.
function addTodo() {
    const content = document.getElementById('content').value;
    if (content) {
        const todo = {
            id: Date.now().toString(), // 고유한 ID 생성
            content: content,
        };
        addTodoToDOM(todo);
        saveTodoToLocalStorage(todo);
        document.getElementById('content').value = '';
    }
}
// 할 일 입력 필드에서 값을 가져온다.
// 할 일 값에 대한 객체를 생성한다. 이 객체는 고유한 id 와 content를 가진다.
// addtodotodom을 호출해서 새로운 할 일을 dom에 추가한다.
// savetodotolocalstorage를 호출해서 로컬스토리지에 저장한다.
// 입력필드를 비운다.

function addTodoToDOM(todo) {
    const li = document.createElement('li');
    li.textContent = todo.content;
    li.setAttribute('data-id', todo.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.onclick = () => removeTodo(todo.id);

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}
// 새로운 li 요소를 생성해 할 일 내용을 설정한다.
// 할 일 객체의 id를 date-id 속성으로 설정한다. 식별자를 부여하기 위해
// 삭제 버튼을 생성하고 클릭 이벤트를 만든다. 클릭되었을 때 removetodo함수가 호출되도록 한다.
// 삭제 버튼을 li 요소에 추가하고 li 요소를 ul에 추가한다. 삭제할 때 배열에서 특정한 객체만 적절하게 삭제하기 위해서
function saveTodoToLocalStorage(todo) {
    const todos = JSON.parse(window.localStorage.getItem('todos')) || [];
    todos.push(todo);
    window.localStorage.setItem('todos', JSON.stringify(todos));
}
// 로컬스토리지에서 저장된 할 일 목록을 가져온다.
//업데이트된 배열을 json 형식으로 문자열화해서 로컬스토리지에 저장한다.
function removeTodo(id) {
    const todos = JSON.parse(window.localStorage.getItem('todos')) || [];
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    window.localStorage.setItem('todos', JSON.stringify(updatedTodos));
    document.querySelector(`li[data-id="${id}"]`).remove();
}
// 로컬스토리지에서 저장된 할 일 목록을 가져온다.
// 주어진 id와 일치하지 않는 할 일만 필터링해서 새로운 배열을 만든다.
// 업데이트된 배열을 json 형식으로 문자열화해서 로컬스토리지에 저장한다.
// dom에서 해당 id를 가진 li 요소를 찾아 제가한다.
