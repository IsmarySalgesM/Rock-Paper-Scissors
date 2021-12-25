//LOGIN VARIABLES
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,8}$/,
  password: /^.{4,8}$/,
};

const campos = {
  usuario: false,
  password: false,
};

// GAME VARIABLES
let count = 0;
let scoreSumUser = [];
let scoreSumCompu = [];
const opcionGame = document.querySelectorAll(".game-opcion");
const userScore = document.getElementById("user-score");
const compScore = document.getElementById("comp-score");
const winLoose = document.querySelector(".win-loose p");
const result = document.querySelector(".result p");
const backGame = document.querySelector(".back-game");
const clearSesion = document.querySelector(".btn-close-sesion");
const clearUser = document.querySelector(".user-name");

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "usuario":
      validarCampo(expresiones.usuario, e.target, "usuario");
      break;
    case "password":
      validarCampo(expresiones.password, e.target, "password");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo-${campo}`)
      .classList.remove("formulario-grupo-incorrecto");
    document
      .getElementById(`grupo-${campo}`)
      .classList.add("formulario-grupo-correcto");
    document
      .querySelector(`#grupo-${campo} .formulario-input-error`)
      .classList.remove("formulario-input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo-${campo}`)
      .classList.add("formulario-grupo-incorrecto");
    document
      .getElementById(`grupo-${campo}`)
      .classList.remove("formulario-grupo-correcto");
    document
      .querySelector(`#grupo-${campo} .formulario-input-error`)
      .classList.add("formulario-input-error-activo");
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (campos.usuario && campos.password) {
    playStyle();
    formulario.reset();
    setTimeout(() => {
      document
        .getElementById("formulario-mensaje-exito")
        .classList.remove("formulario-mensaje-exito-activo");
    }, 5000);

    document.querySelectorAll(".formulario-grupo-correcto").forEach((icono) => {
      icono.classList.remove("formulario-grupo-correcto");
    });
  } else {
    document
      .getElementById("formulario-mensaje")
      .classList.add("formulario-mensaje-activo");
  }
});

opcionGame.forEach((opcion) => {
  opcion.addEventListener("click", function () {
    const opcionUser = this.className.split(" ")[1].split("-")[2];
    playGame(opcionUser);
  });
});

const chooseMachine = () => {
  const opciones = ["rock", "paper", "scissors"];
  const random = Math.floor(Math.random() * 3);
  const opcionMachine = opciones[random];
  document.querySelector(".compu i").className = "";
  document.querySelector(".compu i").className = `fa fa-hand-${opcionMachine}`;
  return opcionMachine;
};

const win = () => {
  scoreSumUser.push(100);
  scoreSumCompu.push(-30);
  result.innerHTML = `Tu ganaste`;
  result.className = "";
  result.classList.add("verde");
};

const loose = () => {
  scoreSumUser.push(-30);
  scoreSumCompu.push(100);
  result.innerHTML = `Tu perdiste`;
  result.className = "";
  result.classList.add("rojo");
};

const tie = () => {
  result.innerHTML = "Es un empate!!";
  result.className = "";
  result.classList.add("verde");
};

const playGame = (opcion) => {
  count++;
  if (count === 10) gameOver(count);
  document.querySelector(".user i").className = "";
  document.querySelector(".user i").className = `fa fa-hand-${opcion}`;
  const movidaPc = chooseMachine();
  const movidaUser = opcion;
  switch (movidaUser + movidaPc) {
    case "rockscissors":
    case "paperrock":
    case "scissorspaper":
      win();
      break;
    case "rockpaper":
    case "paperscissors":
    case "scissorsrock":
      loose();
      break;
    case "rockrock":
    case "paperpaper":
    case "scissorsscissors":
      tie();
      break;
  }
};

const gameOver = () => {
  let sumUser = scoreSumUser.reduce((a, b) => a + b, 0);
  let sumCompu = scoreSumCompu.reduce((a, b) => a + b, 0);
  userScore.innerHTML += `<li>${sumUser}</li>`;
  compScore.innerHTML += `<li>${sumCompu}</li>`;
  document.querySelector(".game").style.display = "none";
  document.querySelector(".win-loose").style.display = "block";
  winLoose.innerHTML = `Muchas gracias por participar, el juego ha terminando, <br> fueron ${count} rondas, dando como resultado User <span class="user-gameover">${scoreSumUser.reduce(
    (a, b) => a + b,
    0
  )} </span> y PC <span class="compu-gameover">${scoreSumCompu.reduce(
    (a, b) => a + b,
    0
  )} </span>, si quieres volver a jugar dale click a Volver,se reiniciara el juego y quedara tu historial de resultados`;
  localStorage.setItem("userScoreHistory", userScore.innerHTML);
  localStorage.setItem("compuScoreHistory", compScore.innerHTML);
};

const gameBack = () => {
  count = 0;
  result.innerHTML = "";
  document.querySelector(".game").style.display = "block";
  document.querySelector(".win-loose").style.display = "none";
};

const playStyle = () => {
  const userName = document.getElementById("usuario").value;
  clearSesion.style.display = "block";
  localStorage.setItem("usuario", userName);
  document.querySelector(".user-name").style.display = "block";
  document.querySelector(".marcador").style.display = "flex";
  document.querySelector(".user-name").innerHTML = `<p>Hola ${userName}</p>`;
  document.querySelector(".login").style.display = "none";
  document.querySelector(".game").style.display = "block";
  document.getElementById("formulario-mensaje-exito").classList.add("formulario-mensaje-exito-activo");
};

window.addEventListener("DOMContentLoaded", function () {
  const userHistory = localStorage.getItem("userScoreHistory");
  const compuHistory = localStorage.getItem("compuScoreHistory");
  const userStorage = localStorage.getItem("usuario");
  if (userStorage) {
    document.querySelector(".login").style.display = "none";
    document.querySelector(".game").style.display = "block";
    clearSesion.style.display = "block";
    clearUser.innerHTML = `<p>Hola ${userStorage}!</p>`;
    document.querySelector(".marcador").style.display = "flex";
  }
  userScore.innerHTML = userHistory;
  compScore.innerHTML = compuHistory;
});

const clearHistorialFn = () => {
  count = 0;
  localStorage.clear();
  document.querySelector(".login").style.display = "block";
  document.querySelector(".game").style.display = "none";
  document.querySelector(".marcador").style.display = "none";
  clearSesion.style.display = "none";
  document.querySelector(".win-loose").style.display = "none";
  document.querySelector(".user-name p").innerHTML = "";
  clearUser.style.display = "none";
  result.innerHTML = "";
  userScore.innerHTML = "";
  compScore.innerHTML = "";
};

backGame.addEventListener("click", gameBack);
clearSesion.addEventListener("click", clearHistorialFn);
