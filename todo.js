const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  totalCount = document.querySelector(".js-totalCount");

const TODOS_LS = `toDos`;

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const div = li.parentNode;
  const btnIcon = div.parentNode;
  toDoList.removeChild(btnIcon);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(btnIcon.childNodes[0].id);
  });
  toDos = cleanToDos;
  totalCount.innerText = `총 할일 : ${toDos.length}개`;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const div = document.createElement("div");
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const delIcon = document.createElement("i");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  div.classList = "todoitems";
  delIcon.classList.add("fas");
  delIcon.classList.add("fa-times-circle");
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  delBtn.appendChild(delIcon);
  li.appendChild(delBtn);
  li.id = newId;
  div.appendChild(li);
  toDoList.appendChild(div);
  totalCount.innerText = `총 할일 : ${newId}개`;
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadedToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadedToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
