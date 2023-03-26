
// Función inicial para asegurarnos que la página este completamente cargada
document.addEventListener("DOMContentLoaded", () => {

// Objetos creados

const email = {
  nombre: "",
  email : "",
  asunto : "",
  mensaje : ""
}

// variables de selección de elementos ---------------
const main = document.querySelector("#main");
const inputNombre = document.querySelector("#nombre");
const inputAsunto = document.querySelector("#asunto");
const inputEmail = document.querySelector("#email");
const inputMensaje = document.querySelector("#mensaje");
const formulario = document.querySelector("#formulario");
const inputsContainer = document.querySelector("#inputsContainer")
const btnSubmit = document.querySelector("#formulario button[type='submit']");
const btnReset = document.querySelector("#formulario button[type='reset']");
const spinner = document.querySelector(".sk-chase");

// CARGAR LOS EVENTLISTENERS -----------------
inputEmail.addEventListener('input', validar);
inputEmail.addEventListener('blur', validar);
inputNombre.addEventListener('blur', validar);
inputAsunto.addEventListener('blur', validar);
inputMensaje.addEventListener('blur', validar);

// seleccionamos el elemento adecuado ya sea poniendole un id específico o como en este caso para practicar usamos el traversing the Dom

btnSubmit.addEventListener('click', function (e) {
  setTimeout(() => {
      spinner.parentNode.classList.add("hidden");
      resetearFormulario();
      console.log(email);
      // mensajeEnviado(formulario);
      // mensajeEnviado(inputsContainer);
      mensajeEnviado(main);
      setTimeout(() => {
          const msgEnviado = main.querySelector(".msgEnviado");
          if (msgEnviado) {
              msgEnviado.remove();
         } 
      }, 3000);
  }, 3000);
  e.preventDefault();
  spinner.parentNode.classList.remove("hidden");
  spinner.parentNode.classList.add("flex");
  console.log("Me estan enviando");
  
})

btnReset.addEventListener('click', function(e) {
  e.preventDefault();
  resetearFormulario();
  limpiarAlerta(formulario);
  limpiarTodasLasAlertas(formulario);
  comprobarEmail(email);
});

// FUNCIONES ------------------------ 

// Funcion 1 : Valida si un campo esta vacío
function validar(e) {
  if (e.target.value.trim() === "") {
      //  console.log("Esta vacio");
      alerta(`El campo ${e.target.id} es obligatorio`, e.target.parentNode);
      email[e.target.id] = "";
      comprobarEmail(email);
      return;
  } 
      
  if (e.target.id === 'email' && !validarEmail(e.target.value)) {
      // console.log("El mail es válido");
      alerta(`El mail ${e.target.value} no es válido`, e.target.parentNode);
      email[e.target.id] = "";
      comprobarEmail(email);
      return;
  }
  limpiarAlerta(e.target.parentNode);
      
  // Asigna los valores de los campos al objeto email

  email[e.target.name] = e.target.value.trim().toLowerCase();
  console.log(email);
  
  comprobarEmail(email);
}

// Funcion 2 : Crea el mensaje de Alerta

function alerta(mensaje, referencia) {

  limpiarAlerta(referencia);
  // Construyendo la alerta en Html
  const parrafoError = document.createElement("P");
  // parrafoError.textContent = `El campo ${e.target.id} es obligatorio`;
  parrafoError.textContent = mensaje;
  parrafoError.classList.add("bg-red-600", "text-white",  "text-center", "p-2");
  // se puede poner estilos atambien
  parrafoError.style.borderRadius = "5px"
  referencia.appendChild(parrafoError);
}

// Funcion 3 : Limpiando alerta cuando pasa validacion

function limpiarAlerta(referencia) {
    
  // Miramos si en el Html ya existe la alerta con esta clase red
  const alertaEnHtml = referencia.querySelector(".bg-red-600");
  if (alertaEnHtml) {
      alertaEnHtml.remove();
 } 
}

// Funcion 4 : Limpiando todas las alertas Activas

function limpiarTodasLasAlertas(referencia) {

do {
  const alertaEnHtml = referencia.querySelector(".bg-red-600");
  if (alertaEnHtml) {
      alertaEnHtml.remove();
  } 
} while (!alertaEnHtml);

}

// Funcion 5 :  Patron validar Email

function validarEmail(email) {
  const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
  const resultado = regex.test(email);
  return resultado;
  
}

// Funcion 6 :  Comprobar Email

function comprobarEmail(email) {
  if (Object.values(email).includes('')) {
      console.log("falta uno en el objeto email");
      console.log(email);
      btnSubmit.classList.add("opacity-30");
      btnSubmit.disabled = true;
  } else {
      console.log("Todo lleno en el objeto email");
     btnSubmit.classList.remove("opacity-30");
     btnSubmit.disabled = false;
     
  }
}


// Funcion 7 :  Resetear Formulario

function resetearFormulario() {
  email.nombre = "";
  email.email = "";
  email.asunto = "";
  email.mensaje = "";
  formulario.reset();
  comprobarEmail(email);
}

// Funcion 8 :  Crear mensaje Enviado

function mensajeEnviado(referencia) {

  // Construyendo el mensaje en Html
  const mensajeEnviado = document.createElement("P");
  mensajeEnviado.textContent = "El Formulario se ha enviado Correctamente";
  // mensajeEnviado.classList.add("bg-green-400", "text-white",  "text-center", "p-2");
   mensajeEnviado.classList.add("text-white",  "text-center", "p-6", "msgEnviado", "bg-sky-500/50",  "absolute", "w-4/4", "h-auto", "rounded-3xl", "font-bold", "text-2xl");
   // Por alguna razon en tailwind no funcionaba el color de fondo verde, entonces con javascript se puede personalizar asi
   mensajeEnviado.style.backgroundColor = "green";
  // se puede poner estilos atambien
  mensajeEnviado.style.borderRadius = "5px"
  referencia.appendChild(mensajeEnviado);
  console.log("desde mensajeEnviado");
}


// End Initial Function -------------------------------------

  }); 