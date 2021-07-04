document.getElementById("timer").innerHTML="00:10";

let habilitado = true;

let seconds=10;
let timer;
let ganados = 0, empatados = 0, perdidos = 0;


/*let option = document.querySelectorAll("#option");
let youOption = document.querySelector("#you-choice");
let machineOption = document.querySelector("#machine-choice");*/


function myFunction() {

  if(seconds<1){habilitado=false}
  
  if(seconds < 10) { // I want it to say 1:00, not 60
    document.getElementById("timer").innerHTML = seconds; 
  }
  if (seconds >0 ) { // so it doesn't go to -1   
    seconds--;
  } else {
    //clearInterval(timer);
     let winner= document.querySelector(".winner");
     if(ganados>perdidos){
      winner.innerHTML += `<p>You</p>`;
      /*let continuar = confirm("¿Quieres seguir jugando?");
      if (continuar){
        document.location.reload();
      }
      let cargar = window.setInterval(function() {
        document.location.reload();
      }, 1000);*/
      
     }
     else if(perdidos>ganados){
      winner.innerHTML += `<p>Machine</p>`;
      /*let cargar = window.setInterval(function() { 
        document.location.reload;
      }, 1000);*/
      
     }
     else{
      winner.innerHTML += `<p>Nobody</p>`;
      /*let cargar = window.setInterval(function() { 
        document.location.reload();
      }, 1000);*/
     }
     clearInterval(timer);
         
     
     //document.getElementById("timer").innerHTML="01:00";
  }
  
}






//let button = document.querySelector(".fa-google-play");
let button = document.querySelector("#play");
button.addEventListener("click", function(){ //
     // every second
     
     habilitado=true;
        play();
      
      
})



/**REVIZAR LUEGO --Modo oscuro boton*/
//capturar el body
let body = document.querySelector("body");

//capturar el boton que es un input
let boton = document.querySelector("input");

//elemento de escucha al boton
boton.addEventListener("click", function(){
  
    body.classList.toggle("dark");
    boton.classList.toggle("active")
    if(document.body.classList.contains('dark')){ //cuando el cuerpo tiene la clase 'dark' actualmente
      localStorage.setItem('darkMode', 'enabled'); //almacenar estos datos si el modo oscuro está activado
  }else{
      localStorage.setItem('darkMode', 'disabled'); //almacenar estos datos si el modo oscuro está desactivado
  }

});
if(localStorage.getItem('darkMode') == 'enabled'){
  body.classList.toggle('dark');
}


/**-------------------Choice----------------- */

/*
*/

function play(){
  
  

  if(!timer) {
    console.log(timer);
      timer = window.setInterval(function() { 
        myFunction();
      }, 1000); } 
  

let option = document.querySelectorAll("#option");
let youOption = document.querySelector("#you-choice");
let machineOption = document.querySelector("#machine-choice");

  option.forEach(function(choice){

     
    choice.addEventListener("click", function(){
      

      //console.log(choice.classList.value);
   
      /**---------------------------rock----------------------------- */
      console.log(habilitado);
      console.log(seconds)
      if (habilitado){
      if(choice.classList.value==="rock"){
        let machineChoice = Math.floor( Math.random() * 3 + 1 );
        youOption.src="img/rock.png";
        if(machineChoice===1){
          machineOption.src="img/rock.png";
          empatados++;
          console.log("Empataste, la maquina tambien escogió piedra")
        }
        else if(machineChoice===2){
          machineOption.src="img/paper.png";
          perdidos++;
          console.log("Perdiste, la maquina escogió papel");
        }
        else{
          machineOption.src="img/scissors.png";
          ganados++;
          console.log("Ganaste, la maquina escogio tijeras")
        }
        console.log(machineChoice)
      }

      /**-----------------------------paper---------------------------- */
      else if(choice.classList.value==="paper"){
        let machineChoice = Math.floor( Math.random() * 3 + 1 );
        youOption.src="img/paper.png";
        if(machineChoice===2){
          machineOption.src="img/paper.png";
          empatados++;
          console.log("Empataste, la maquina tambien escogió papel")
        }
        else if(machineChoice===3){
          machineOption.src="img/scissors.png";
          perdidos++;
          console.log("Perdiste, la maquina escogió tijeras");
        }
        else{
          machineOption.src="img/rock.png";
          ganados++;
          console.log("Ganaste, la maquina escogio piedra")
        }
        console.log(machineChoice)
      }
      
      /**---------------------------scissors------------------------------ */
      else if(choice.classList.value==="scissors"){
        let machineChoice = Math.floor( Math.random() * 3 + 1 );
        youOption.src="img/scissors.png";
        if(machineChoice===3){
          machineOption.src="img/scissors.png";
          empatados++;
          console.log("Empataste, la maquina tambien escogió tijeras")
        }
        else if(machineChoice===1){
          machineOption.src="img/rock.png";
          perdidos++;
          console.log("Perdiste, la maquina escogió piedra");
        }
        else{
          machineOption.src="img/paper.png";
          ganados++;
          console.log("Ganaste, la maquina escogio papel")
        }
        console.log(machineChoice)
      }

      
      
      /*else if(choice.classList.value==="lizard")
      youOption.src="img/lizard.png";
      else if(choice.classList.value==="spock")
      youOption.src="img/spock.png";*/
     
      }
      
    })
    
  
  
})

  
}


