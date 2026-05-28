// 할일 데이터를 저장하는 배열
let todos = [];
 
// 페이지가 처음 열릴 때 저장된 데이터 불러오기
let saved = localStorage.getItem("todos");
if (saved) {
  todos = JSON.parse(saved); //저장된 문자열을 다시 배열로 변경
  showList();
}
 
// 할일 추가 함수
function addTodo() {
  let input = document.querySelector("#todoInput");
  let text = input.value;

 // 아무것도 입력하지 않고 추가 할 시 아래 문장 출력
  if (text == "") { 
    alert("할일을 입력해주세요!");
    return;
  }
 
  // 새 할일 객체 만들기
  let  newTodo = { 
    text: text,
    done: false
  };
 
  todos.push(newTodo); //배열 맨 끝에 새 항목 추가
  input.value = ""; // 추가후 입력창 비우기
 
  // 저장하고 화면 업데이트
  localStorage.setItem("todos", JSON.stringify(todos));
  showList();
}
 
// 완료 처리 함수 i는 인덱스 번호 
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
 
  if (newText != null && newText != "") {  // 수정한 내용이 null이 아니고 공백이 아니면 그 인덱스 위치의 항목으로 변경
    todos[i].text = newText;
    localStorage.setItem("todos", JSON.stringify(todos));
    showList();
  }
}
 
// 삭제 함수
function deleteTodo(i) {
  todos.splice(i, 1); // i번째 위치에서 1개 항목 제거
  localStorage.setItem("todos", JSON.stringify(todos));
  showList();
}
 
// 화면에 목록 보여주기
function showList() {
  let list = document.querySelector("#todoList");
  let html = "";
 
  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i]; // 하나하나 꺼내기 번거롭기 때문에 todo라는 변수에 저장
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
