const seccionAtaque = document.getElementById('seleccionaAtaque');
seccionAtaque.style.display = 'none';

const resultados = document.getElementById('resultado');
resultados.style.display = 'none';

const reiniciarPartida = document.getElementById('butonReiniciar');
reiniciarPartida.style.display = 'none';

const modal = document.querySelector('.mensaje--final-reiniciar');
modal.style.display = 'none';

const opacarBody = document.querySelector('body')


const mascotaJugador = document.getElementById('eligirMascota');
//const mascotaPerro = document.getElementById('perro')    
//const mascotaGato = document.getElementById('gato')
//const mascotaMono = document.getElementById('mono')

const ataqueMordidaJugador = document.getElementById('butonMordida')
const ataqueGarraJugador = document.getElementById('butonGarra')
const ataquePatadaJugador = document.getElementById('butonPatada') 

let spanVidasJugador = document.getElementById('vidasJugador');
let spanVidasContrario = document.getElementById('vidasContrario');

let mascotas = [];
let displayMascotas;
let inputPerro;
let inputGato;
let inputMono;
let ataqueJugador;
let ataqueContrario;
let vidasJugador = 3;
let vidasContrario = 3;

class Mascota{
    constructor (nombre, imagen, vidas){
        this.nombre = nombre,
        this.imagen = imagen,
        this.vidas = vidas,
        this.ataques = []
    }
}

let perro = new Mascota ('Firulay', './assets/perros.png' , 3);
let gato = new Mascota ('Michii', './assets/gatos.png' , 3);
let mono = new Mascota ('Koong', './assets/gorilas.png' , 3);

perro.ataques.push(
    {nombre: 'Mordida', id: 'butonMordida'},
    {nombre: 'Mordida', id: 'butonMordida'},
    {nombre: 'Mordida', id: 'butonMordida'},
    {nombre: 'Patada', id: 'butonPatada'},
    {nombre: 'Garra', id: 'butonGarra'},
)

gato.ataques.push(
    {nombre: 'Garra', id: 'butonGarra'},
    {nombre: 'Garra', id: 'butonGarra'},
    {nombre: 'Garra', id: 'butonGarra'},
    {nombre: 'Mordida', id: 'butonMordida'},
    {nombre: 'Patada', id: 'butonPatada'},
)

mono.ataques.push(
    {nombre: 'Patada', id: 'butonPatada'},
    {nombre: 'Patada', id: 'butonPatada'},
    {nombre: 'Patada', id: 'butonPatada'},
    {nombre: 'Garra', id: 'butonGarra'}, 
    {nombre: 'Mordida', id: 'butonMordida'}, 
)

mascotas.push(perro, gato, mono)

function iniciarJuego(){
    let contenedorMascotas = document.getElementById('mascota-container');

    mascotas.forEach((mascota) => { 
        displayMascotas= `
        <input type="radio" name="mascota" id=${mascota.nombre} class="check-mascota"/>
        <label for=${mascota.nombre} class="mascota-etiqueta">
            <p>${mascota.nombre}</p>
            <img src=${mascota.imagen} alt=${mascota.nombre}/>
        </label>`

        contenedorMascotas.innerHTML += displayMascotas;

        inputPerro = document.getElementById('Firulay');
        inputGato = document.getElementById('Michii');
        inputMono = document.getElementById('Koong');

    })
    mascotaJugador.addEventListener('click', elegirMascotaJugador);
}

function elegirMascotaJugador(){
  
    let mascotaSeleccion

    if (inputPerro.checked){
        mascotaSeleccion = mascotas.filter(mascota => mascota.nombre === inputPerro.id)

    }else if (inputGato.checked){ 
        mascotaSeleccion = mascotas.filter(mascota => mascota.nombre === inputGato.id)
        
    }else if (inputMono.checked){
        mascotaSeleccion = mascotas.filter(mascota => mascota.nombre === inputMono.id)
   
    }else{
        alert('Elige una mascota')
    }

    let imgMascotaJugador = document.createElement('img')
    imgMascotaJugador.src = mascotaSeleccion[0].imagen 
    imgMascotaJugador.className = 'mascota-ataque' 

    document.querySelector(".ataque--info-jugador").appendChild(imgMascotaJugador)
    
    //Para seleccionar la mascota contraria
    elegirMascotaContrario();
    
    let seccMascota = document.getElementById('secc-mascota');
    seccMascota.style.display = 'none'
    
    seleccionarAtaque();
  
}

function elegirMascotaContrario(){
   
    let mascotaContrario = aleatorio(0, mascotas.length-1)
    let imgMascotaContrario = document.createElement('img')
     
    if (mascotaContrario === 1){
        imgMascotaContrario.src = perro.imagen;
 
    }else if (mascotaContrario === 2){
        imgMascotaContrario.src = gato.imagen;
    
    }else if (mascotaContrario === 3) {
        imgMascotaContrario.src = mono.imagen;
    }

    imgMascotaContrario.className = 'mascota-ataque' 
    document.querySelector(".ataque--info-contrario").appendChild(imgMascotaContrario)

}

function elegirAtaqueContrario(){
    let seleccionarAtaqueContrario = aleatorio(1, 3)
    let insertAtaqueContrario = document.getElementById('spanAtaqueContrario')

    if (seleccionarAtaqueContrario == 1){
        ataqueContrario = 'MORDIDA'
        insertAtaqueContrario.innerHTML = 'MORDIDA...'
    
    }else if (seleccionarAtaqueContrario == 2){
        ataqueContrario = 'GARRA'
        insertAtaqueContrario.innerHTML = 'GARRA...'
    
    }else if (seleccionarAtaqueContrario == 3) {
        ataqueContrario = 'PATADA'
        insertAtaqueContrario.innerHTML = 'PATADA...'
    }
    return ataqueContrario;
}

function seleccionarAtaque(){
    
    seccionAtaque.style.display = 'block'

    ataqueMordidaJugador.addEventListener('click', ataqueMordida)
    ataqueGarraJugador.addEventListener('click', ataqueGarra)
    ataquePatadaJugador.addEventListener('click', ataquePatada)
  
    let spanAtaqueJugador = document.getElementById('spanAtaqueJugador')
 
    function ataqueMordida(){
        ataqueJugador = 'MORDIDA';
        spanAtaqueJugador.innerHTML = ataqueJugador
        ataqueContrario = elegirAtaqueContrario();
        combate()
    }

    function ataqueGarra(){
        ataqueJugador = 'GARRA';
        spanAtaqueJugador.innerHTML = ataqueJugador
        ataqueContrario = elegirAtaqueContrario();
        combate()
    }

    function ataquePatada(){
        ataqueJugador = 'PATADA';
        spanAtaqueJugador.innerHTML = ataqueJugador
        ataqueContrario = elegirAtaqueContrario();
        combate()
    }
    
}

function combate(){
    
    resultados.style.display = 'flex'

    if(ataqueJugador == ataqueContrario){
        crearMensaje("EMPATE...INTENTA DE NUEVO")
        
    }else if(ataqueJugador == 'MORDIDA' && ataqueContrario == 'GARRA'){
        vidasContrario-- 
        spanVidasContrario.innerHTML = vidasContrario   
        crearMensaje("Buen ataque!...Vas ganando")
    
    }else if(ataqueJugador == 'MORDIDA' && ataqueContrario == 'PATADA'){
        vidasContrario-- 
        spanVidasContrario.innerHTML = vidasContrario
        crearMensaje("Buen ataque!...Así se hace!!")

    }else if(ataqueJugador == 'PATADA' && ataqueContrario == 'GARRA'){
        vidasContrario-- 
        spanVidasContrario.innerHTML = vidasContrario   
        crearMensaje("Buen golpe!...Eres fuerte!!")
    
    }else{
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
        crearMensaje("Perdiste...Vuelve a intentarlo")
    }
    valorarVidas()
}

function valorarVidas(){
    if(vidasJugador == 0){
        crearMensajeFinal('LO SIENTO, PERDISTE LA PARTIDA')
   
    }else if(vidasContrario == 0){
        crearMensajeFinal('FELICITACIONES, GANASTE LA PARTIDA!')
    }
    
}

function crearMensajeFinal(msj){
  
    modal.style.display = 'flex'
    
    let theEnd = document.getElementById('mensajeFinal')
    
    let theEndMsj = document.createElement('div')
    theEndMsj.innerHTML = msj
    theEnd.appendChild(theEndMsj)

    mascotaJugador.disabled = true
    ataqueMordidaJugador.disabled = true
    ataqueGarraJugador.disabled = true
    ataquePatadaJugador.disabled = true
 
    reiniciarJuego()
    
}

function crearMensaje(msj){
    let resultado = document.getElementById("resultado")

    let mensaje = document.createElement('p')
    mensaje.innerHTML = msj
    resultado.appendChild(mensaje)
}

function reiniciarJuego(){
    reiniciarPartida.style.display = 'block'
    opacarBody.style.backgroundColor= 'rgba(0,0,0,0.5)'
    reiniciarPartida.addEventListener('click', onReiniciarJuego);
  
}

function onReiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego);