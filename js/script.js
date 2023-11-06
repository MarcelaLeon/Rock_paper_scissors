document.getElementById("timer").innerHTML = "00:10";

let enabled;
let seconds = 10;
let countdown = 10;
let mode = localStorage.getItem('spockMode')

if (mode == null) {
  localStorage.setItem('spockMode', 'disabled')
}

if (seconds === undefined) {
  seconds = 10;
  countdown = 10;
}

let timer;
let won = 0, tied = 0, lost = 0;

let inLocal = JSON.parse(localStorage.getItem("winners"));

if (inLocal == null) {
  inLocal = [];
}

let winner = document.querySelector(".winner");
inLocal.forEach(function (element) {
  winner.innerHTML += `<p>${element}</p>`;
})

function reload() {
  setTimeout(function () { window.location.href = "index.html" }, 3000);
}


/**----------------Timekeeper-------------------- */
function myFunction() {

  if (seconds < countdown) {
    document.getElementById("timer").innerHTML = seconds;
  }

  if (seconds > 0) {
    seconds--;
  }
  else {

    if (won > lost) {
      if (inLocal.length > 6) {
        localStorage.removeItem("winners");
        inLocal = [];
      }
      inLocal.push("You 🥇 ");
      localStorage.setItem("winners", JSON.stringify(inLocal));
      Swal.fire({
        imageUrl: 'img/win.gif',
        imageWidth: 100,
        imageHeight: 100,
        title: 'You have won this round',
        showConfirmButton: false,
        timer: 3000,
        allowOutsideClick: false
      })
      reload();
    }
    else if (lost > won) {
      if (inLocal.length > 6) {
        localStorage.removeItem("winners");
        inLocal = [];
      }
      inLocal.push("Machine 💻");
      localStorage.setItem("winners", JSON.stringify(inLocal));
      localStorage.setItem("winners", JSON.stringify(inLocal));
      Swal.fire({
        imageUrl: 'img/lose.gif',
        imageWidth: 100,
        imageHeight: 100,
        title: 'You have lost this round',
        showConfirmButton: false,
        timer: 3000,
        allowOutsideClick: false
      })
      reload();
    }
    else {
      if (inLocal.length > 6) {
        localStorage.removeItem("winners");
        inLocal = [];
      }
      inLocal.push("Nobody");
      localStorage.setItem("winners", JSON.stringify(inLocal));
      Swal.fire({
        imageUrl: 'img/tie.gif',
        imageWidth: 100,
        imageHeight: 100,
        title: 'You have tied this round',
        showConfirmButton: false,
        timer: 3000,
        allowOutsideClick: false
      })
      reload();
    }

    clearInterval(timer);
  }
}


/**----------------Click new------------------- */
let newButton = document.querySelector("#new");
let listMode = document.querySelector("#list-mode");
newButton.addEventListener("click", function () {
  list.classList.remove("show");
  rule.classList.remove("show");
  listMode.classList.toggle("show");
})
let lizard = document.querySelector(".lizard");
let spock = document.querySelector(".spock");

/**----------------Click clasic------------------- */
let clasicButton = document.querySelector(".clasic");
clasicButton.addEventListener("click", function () {
  lizard.classList.remove("show");
  spock.classList.remove("show");
  localStorage.setItem('spockMode', 'disabled');
})


/**----------------Click lizard-spock------------------- */
let lizardSpockButton = document.querySelector(".lizard-spock");
lizardSpockButton.addEventListener("click", function () {
  lizard.classList.add("show");
  spock.classList.add("show");
  localStorage.setItem('spockMode', 'enabled');
});

if (localStorage.getItem('spockMode') == 'enabled') {
  lizard.classList.add("show");
  spock.classList.add("show");
}


/**----------------Click setting------------------- */
let setting = document.querySelector("#setting");
let list = document.querySelector("#list-time");
setting.addEventListener("click", function () {
  listMode.classList.remove("show");
  rule.classList.remove("show");
  list.classList.toggle("show");
})


/**----------------Click time------------------- */
let times = document.querySelectorAll(".time");
times.forEach(function (time) {
  time.addEventListener("click", function () {
    seconds = time.value;
    if (seconds == 10) {
      countdown = 10;
      document.getElementById("timer").innerHTML = "00:10";
    }
    else if (seconds == 30) {
      countdown = 30;
      document.getElementById("timer").innerHTML = "00:30";
    }
    else if (seconds == 60) {
      countdown = 60;
      document.getElementById("timer").innerHTML = "01:00";
    }
  })
})


/**----------------Click rules------------------- */
let rulesButton = document.querySelector("#rules");
let rule = document.querySelector(".rule-back");
let closeButton = document.querySelector(".fa-times-circle")

rulesButton.addEventListener("click", function () {
  listMode.classList.remove("show");
  list.classList.remove("show");
  rule.classList.toggle("show");
})
closeButton.addEventListener("click", function () {
  rule.classList.toggle("show");
})


/**----------------Click menu------------------- */
let menuButton = document.querySelector(".fa-bars");
let menu = document.querySelector("#menu")
menuButton.addEventListener("click", function () {
  menu.classList.toggle("show");
})


/**----------------Click ?------------------- */
let questionButton = document.querySelector(".fa-question-circle");
questionButton.addEventListener("click", function () {
  Swal.fire({
    icon: "info",
    title: 'Coming soon...💣',
    showConfirmButton: false,
    timer: 2000
  })
})


/**----------------Click play------------------- */
let playButton = document.querySelector("#play");
playButton.addEventListener("click", function () {
  enabled = true;
  play(enabled);
  let boxing = document.querySelectorAll("img[src='img/boxing.png']");
  for (let box of boxing) {
    box.classList.add("spin");
    playButton.classList.add("hide")
  }
})


/**----------------Click reset------------------- */
let resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", function () {
  localStorage.removeItem("winners");
  location.reload();
})


/**-------------Modo oscuro boton-----------------*/
let body = document.querySelector("body");
let boton = document.querySelector("input");

boton.addEventListener("click", function () {
  body.classList.toggle("dark");
  boton.classList.toggle("active")
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('darkMode', 'enabled');

  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});

if (localStorage.getItem('darkMode') == 'enabled') {
  body.classList.toggle('dark');
  boton.setAttribute("checked", "true");
}


/**-------------------Choice----------------- */
function play() {
  if (!timer) {
    timer = window.setInterval(function () {
      myFunction();
    }, 1000);
  }

  let option = document.querySelectorAll("#option");
  let youOption = document.querySelector("#you-choice");
  let machineOption = document.querySelector("#machine-choice");

  option.forEach(function (choice) {
    choice.addEventListener("click", function () {

      /**--------------------------Clasic mode------------------------------- */
      if (enabled == true && localStorage.getItem('spockMode') == 'disabled') {
        /**---------------------------rock----------------------------- */
        if (choice.classList.value === "rock") {
          let machineChoice = Math.floor(Math.random() * 3 + 1);
          youOption.src = "img/rock.png";
          if (machineChoice === 1) {
            machineOption.src = "img/rock.png";
            tied++;
          }
          else if (machineChoice === 2) {
            machineOption.src = "img/paper.png";
            lost++;
          }
          else {
            machineOption.src = "img/scissors.png";
            won++;
          }
        }

        /**-----------------------------paper---------------------------- */
        else if (choice.classList.value === "paper") {
          let machineChoice = Math.floor(Math.random() * 3 + 1);
          youOption.src = "img/paper.png";
          if (machineChoice === 2) {
            machineOption.src = "img/paper.png";
            tied++;
          }
          else if (machineChoice === 3) {
            machineOption.src = "img/scissors.png";
            lost++;
          }
          else {
            machineOption.src = "img/rock.png";
            won++;
          }
        }

        /**---------------------------scissors--------------------------- */
        else if (choice.classList.value === "scissors") {
          let machineChoice = Math.floor(Math.random() * 3 + 1);
          youOption.src = "img/scissors.png";
          if (machineChoice === 3) {
            machineOption.src = "img/scissors.png";
            tied++;
          }
          else if (machineChoice === 1) {
            machineOption.src = "img/rock.png";
            lost++;
          }
          else {
            machineOption.src = "img/paper.png";
            won++;
          }
        }
      }

      /**-----------------------Lizard-Spock mode--------------------- */
      if (enabled == true && localStorage.getItem('spockMode') == 'enabled') {
        /**---------------------------rock----------------------------- */
        if (choice.classList.value === "rock") {
          let machineChoice = Math.floor(Math.random() * 5 + 1);
          youOption.src = "img/rock.png";
          if (machineChoice === 1) {
            machineOption.src = "img/rock.png";
            tied++;
          }
          else if (machineChoice === 2) {
            machineOption.src = "img/paper.png";
            lost++;
          }
          else if (machineChoice === 5) {
            machineOption.src = "img/spock.png";
            lost++;
          }
          else if (machineChoice === 4) {
            machineOption.src = "img/lizard.png";
            won++;
          }
          else {
            machineOption.src = "img/scissors.png";
            won++;
          }
        }

        /**-----------------------------paper---------------------------- */
        else if (choice.classList.value === "paper") {
          let machineChoice = Math.floor(Math.random() * 5 + 1);
          youOption.src = "img/paper.png";
          if (machineChoice === 2) {
            machineOption.src = "img/paper.png";
            tied++;
          }
          else if (machineChoice === 3) {
            machineOption.src = "img/scissors.png";
            lost++;
          }
          else if (machineChoice === 4) {
            machineOption.src = "img/lizard.png";
            lost++;
          }
          else if (machineChoice === 5) {
            machineOption.src = "img/spock.png";
            won++;
          }
          else {
            machineOption.src = "img/rock.png";
            won++;
          }
        }

        /**---------------------------scissors--------------------------- */
        else if (choice.classList.value === "scissors") {
          let machineChoice = Math.floor(Math.random() * 5 + 1);
          youOption.src = "img/scissors.png";
          if (machineChoice === 3) {
            machineOption.src = "img/scissors.png";
            tied++;
          }
          else if (machineChoice === 1) {
            machineOption.src = "img/rock.png";
            lost++;
          }
          else if (machineChoice === 5) {
            machineOption.src = "img/spock.png";
            lost++;
          }
          else if (machineChoice === 4) {
            machineOption.src = "img/lizard.png";
            won++;
          }
          else {
            machineOption.src = "img/paper.png";
            won++;
          }
        }

        /**---------------------------lizard--------------------------- */
        else if (choice.classList.value === "lizard show") {
          let machineChoice = Math.floor(Math.random() * 5 + 1);
          youOption.src = "img/lizard.png";
          if (machineChoice === 4) {
            machineOption.src = "img/lizard.png";
            tied++;
          }
          else if (machineChoice === 1) {
            machineOption.src = "img/rock.png";
            lost++;
          }
          else if (machineChoice === 3) {
            machineOption.src = "img/scissors.png";
            lost++;
          }
          else if (machineChoice === 5) {
            machineOption.src = "img/spock.png";
            won++;
          }
          else {
            machineOption.src = "img/paper.png";
            won++;
          }
        }

        /**---------------------------spock--------------------------- */
        else if (choice.classList.value === "spock show") {
          let machineChoice = Math.floor(Math.random() * 5 + 1);
          youOption.src = "img/spock.png";
          if (machineChoice === 5) {
            machineOption.src = "img/spock.png";
            tied++;
          }
          else if (machineChoice === 2) {
            machineOption.src = "img/paper.png";
            lost++;
          }
          else if (machineChoice === 4) {
            machineOption.src = "img/lizard.png";
            lost++;
          }
          else if (machineChoice === 3) {
            machineOption.src = "img/scissors.png";
            won++;
          }
          else {
            machineOption.src = "img/rock.png";
            won++;
          }
        }
      }
    })
  })
}