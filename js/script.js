document.getElementById("timer").innerHTML="00:10";

let enabled;
let seconds;
let countdown;

if (seconds === undefined){
  seconds=10;
  countdown =10;
}

let timer;
let won = 0, tied = 0, lost = 0;


let inLocal = JSON.parse(localStorage.getItem("winners"));

if(inLocal == null) {
  inLocal = [];
}



let winner= document.querySelector(".winner");
inLocal.forEach(function(element) {
  winner.innerHTML += `<p>${element}</p>`;
})

/**----------------Timekeeper-------------------- */
function myFunction() {
    
  if(seconds < countdown) { 
    document.getElementById("timer").innerHTML = seconds; 
  }

  if (seconds >0 ) {   
    seconds--;
  } 
  else {
    
      if(won>lost){
        if(inLocal.length > 6){
          localStorage.removeItem("winners");
          inLocal=[];
        }
        inLocal.push("You 🥇 ");
        localStorage.setItem("winners", JSON.stringify(inLocal));
        alert("You have won this round of the game 😎")
        location.reload();
      }
    else if(lost>won){
      if(inLocal.length > 6){
        localStorage.removeItem("winners");
        inLocal=[];
      }
      inLocal.push("Machine 💻");
        localStorage.setItem("winners", JSON.stringify(inLocal));
        alert("You have lost this round of the game,\n good luck next time 😥")
        location.reload();
       }
    else{
      if(inLocal.length > 6){
        localStorage.removeItem("winners");
        inLocal=[];
      }
      inLocal.push("Nobody");
        localStorage.setItem("winners", JSON.stringify(inLocal));
        alert("You have tied this round of the game 🤪")
        location.reload();
       }  
    
     clearInterval(timer);
  }
  
}

/**----------------Click setting------------------- */
let setting = document.querySelector("#setting");
let list = document.querySelector("#list");
setting.addEventListener("click",function(){
  list.classList.toggle("show");
})


/**----------------Click time------------------- */
let times = document.querySelectorAll(".time");
times.forEach(function(time){ 
  time.addEventListener("click",function(){
    seconds = time.value;
    if(seconds == 10){
      countdown =10;
      document.getElementById("timer").innerHTML="00:10";
    }
    else if(seconds == 30){
      countdown=30;
      document.getElementById("timer").innerHTML="00:30";
    }
    else if(seconds == 60){
      countdown=60;
      document.getElementById("timer").innerHTML="01:00";
    }
  })
})

/**----------------Click rules------------------- */
let rules = document.querySelector("#rules");
let rule1 = document.querySelector(".rule1");
let closeButton = document.querySelector(".fa-times-circle")
rules.addEventListener("click",function(){
  rule1.classList.toggle("show");
})
closeButton.addEventListener("click",function(){
  rule1.classList.toggle("show"); 
})

/**----------------Click New------------------- */
let newButton = document.querySelector("#new");
newButton.addEventListener("click",function(){
    alert("Coming soon...💣")
})

/**----------------Click menu------------------- */
let menuButton = document.querySelector(".fa-bars");
let menu = document.querySelector("#menu")
menuButton.addEventListener("click",function(){
  menu.classList.toggle("show");
})


/**----------------Click ?------------------- */
let questionButton = document.querySelector(".fa-question-circle");
questionButton.addEventListener("click",function(){
  alert("Coming soon...💣")
})


/**----------------Click play------------------- */
let playButton = document.querySelector("#play");
playButton.addEventListener("click", function(){ 
  enabled = true;
    play(enabled);   
})

/**----------------Click reset------------------- */
let resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", function(){ 
    localStorage.removeItem("winners"); 
    location.reload(); 
})


/**-------------Modo oscuro boton-----------------*/
let body = document.querySelector("body");
let boton = document.querySelector("input");

boton.addEventListener("click", function(){   
    body.classList.toggle("dark");
    boton.classList.toggle("active")
    if(document.body.classList.contains('dark')){ 
      localStorage.setItem('darkMode', 'enabled');

    }else{
      localStorage.setItem('darkMode', 'disabled'); 
    }
});

if(localStorage.getItem('darkMode') == 'enabled'){
  body.classList.toggle('dark');
  boton.setAttribute("checked","true");
}


/**-------------------Choice----------------- */

function play(){  
  if(!timer) {
      timer = window.setInterval(function() { 
        myFunction();
      }, 1000); } 
  
  let option = document.querySelectorAll("#option");
  let youOption = document.querySelector("#you-choice");
  let machineOption = document.querySelector("#machine-choice");
  
  option.forEach(function(choice){  
    choice.addEventListener("click", function(){
      if (enabled){
      /**---------------------------rock----------------------------- */
        if(choice.classList.value==="rock"){
          let machineChoice = Math.floor( Math.random() * 3 + 1 );
          youOption.src="img/rock.png";
          if(machineChoice===1){
            machineOption.src="img/rock.png";
            tied++;
          }
        else if(machineChoice===2){
          machineOption.src="img/paper.png";
          lost++;
        }
        else{
          machineOption.src="img/scissors.png";
          won++;
        }
      }

      /**-----------------------------paper---------------------------- */
      else if(choice.classList.value==="paper"){
        let machineChoice = Math.floor( Math.random() * 3 + 1 );
        youOption.src="img/paper.png";
        if(machineChoice===2){
          machineOption.src="img/paper.png";
          tied++;
        }
        else if(machineChoice===3){
          machineOption.src="img/scissors.png";
          lost++;
        }
        else{
          machineOption.src="img/rock.png";
          won++;
        }
      }
      
      /**---------------------------scissors--------------------------- */
      else if(choice.classList.value==="scissors"){
        let machineChoice = Math.floor( Math.random() * 3 + 1 );
        youOption.src="img/scissors.png";
        if(machineChoice===3){
          machineOption.src="img/scissors.png";
          tied++;
          }
        else if(machineChoice===1){
          machineOption.src="img/rock.png";
          lost++;
          }
        else{
          machineOption.src="img/paper.png";
          won++;
          }
        }
      } 
    })
  })  
}


