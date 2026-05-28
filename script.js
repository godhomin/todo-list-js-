// 할일 데이터를 저장하는 배열
let todos = [];
 
// 페이지가 처음 열릴 때 저장된 데이터 불러오기
let saved = localStorage.getItem("todos");
if (saved) {
  todos = JSON.parse(saved);
  showList();
}
 
// 할일 추가 함수
function addTodo() {
  let input = document.querySelector("#todoInput");
  let text = input.value;
 
  if (text == "") {
    alert("할일을 입력해주세요!");
    return;
  }
 
  // 새 할일 객체 만들기
  let  newTodo = {
    text: text,
    done: false
  };
 
  todos.push(newTodo);
  input.value = "";
 
  // 저장하고 화면 업데이트
  localStorage.setItem("todos", JSON.stringify(todos));
  showList();
}
 
// 완료 처리 함수
function doneTodo(i) {
  if (todos[i].done == false) {
    todos[i].done = true;
  } else {
    todos[i].done = false;
  }
 
  localStorage.setItem("todos", JSON.stringify(todos));
  showList();
}
 
// 수정 함수
function editTodo(i) {
  let newText = prompt("수정할 내용을 입력하세요", todos[i].text);
 
  if (newText != null && newText != "") {
    todos[i].text = newText;
    localStorage.setItem("todos", JSON.stringify(todos));
    showList();
  }
}
 
// 삭제 함수
function deleteTodo(i) {
  todos.splice(i, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  showList();
}
 
// 화면에 목록 보여주기
function showList() {
  let list = document.querySelector("#todoList");
  let html = "";
 
  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];
    let doneClass = "";
 
    if (todo.done == true) {
      doneClass = "done";
    }
 
    html += "<li class='" + doneClass + "'>";
    html += todo.text;
    html += " <button class='btn-done' onclick='doneTodo(" + i + ")'>완료</button>";
    html += " <button class='btn-edit' onclick='editTodo(" + i + ")'>수정</button>";
    html += " <button onclick='deleteTodo(" + i + ")'>삭제</button>";
    html += "</li>";
  }
 
  list.innerHTML = html;
}
 
// 엔터키를 누르면 추가되도록
document.querySelector("#todoInput").onkeydown = function(e) {
  if (e.key == "Enter") {
    addTodo();
  }
}
