const form = document.querySelector(".js-form"),
      input = form.querySelector("input"),
      todoform = document.querySelector(".js-toDoForm"),
      greeting = document.querySelector(".js-userName")

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  todoform.classList.add(SHOWING_CN);
  greeting.innerText = text;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();