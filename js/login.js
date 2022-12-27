"use strict";

const $input = document.querySelector(".login__input");
const $button = document.querySelector(".login__button");
const $clear = document.querySelector(".login__clear");
const $form = document.querySelector(".login");

const validateInput = ({ target }) => {

  if (target.value.length > 2) {
    $button.removeAttribute("disabled");
    $clear.setAttribute("disabled", "");

    return;
  } 
    $button.setAttribute("disabled", "");
    $clear.removeAttribute("disabled");

};



function submit (e) {
    e.preventDefault();

    let attempt = 0;
    let victorie = 0;
    let defeat = 0;

    const data = {
      name: $input.value,
      attempt: attempt,
      victorie: victorie,
      defeat: defeat
    }

    const user =  JSON.parse(localStorage.getItem('id')) ?? "";

    if (user.name === $input.value) {
        window.location = 'pages/mario.html';
    } else {
        localStorage.setItem('id', JSON.stringify(data));
    }

    window.location = 'pages/mario.html';

}


$input.addEventListener("input", validateInput);
$form.addEventListener("submit", submit);

$clear.addEventListener('click', () => {
  localStorage.clear();
})
  