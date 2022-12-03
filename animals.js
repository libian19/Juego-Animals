let ataqueJugador;
let ataqueContrario;
let vidasJugador = 3;
let vidasContrario = 3;

function iniciarJuego(){
    let seccionAtaque = document.getElementById('seleccionaAtaque');
    seccionAtaque.style.display = 'none';

    let resultados = document.getElementById('resultado');
    resultados.style.display = 'none'

    let mascotaJugador = document.getElementById('eligirMascota');
    mascotaJugador.addEventListener('click', elegirMascotaJugador);

    let reiniciarPartida = document.getElementById('butonReiniciar');
    reiniciarPartida.style.display = 'none'

    let modal = document.querySelector('.mensaje--final-reiniciar');
    modal.style.display = 'none'
}

function elegirMascotaJugador(){
   
    let imgMascotaJugador = document.createElement('img')
    const mascotaPerro = document.getElementById('perro')    
    const mascotaGato = document.getElementById('gato')
    const mascotaMono = document.getElementById('mono')

    if (mascotaPerro.checked){
        imgMascotaJugador.src = "./assets/perros.png"

    }else if (mascotaGato.checked){ 
        imgMascotaJugador.src = "./assets/gatos.png"
        
    }else if (mascotaMono.checked){
        imgMascotaJugador.src = "./assets/gorilas.png"
   
    }else{
        alert('Elige una mascota')
    }
 
    imgMascotaJugador.className = 'mascota-ataque' 
    document.querySelector(".ataque--info-jugador").appendChild(imgMascotaJugador)
    
    //Para seleccionar la mascota contraria
    elegirMascotaContrario();

    let seccMascota = document.getElementById('secc-mascota');
    seccMascota.style.display = 'none'
    
    seleccionarAtaque();
  
}

function elegirMascotaContrario(){
   
    let mascotaContrario = aleatorio(1, 3)
    let imgMascotaContrario = document.createElement('img')
     
    if (mascotaContrario === 1){
        imgMascotaContrario.src = "/assets/perros.png";
 
    }else if (mascotaContrario === 2){
        imgMascotaContrario.src = "/assets/gatos.png";
    
    }else if (mascotaContrario === 3) {
        imgMascotaContrario.src = "/assets/gorilas.png";
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
    
    let seccionAtaque = document.getElementById('seleccionaAtaque')
    seccionAtaque.style.display = 'block'
    let ataqueMordidaJugador = document.getElementById('butonMordida')
    ataqueMordidaJugador.addEventListener('click', ataqueMordida)
    let ataqueGarraJugador = document.getElementById('butonGarra')
    ataqueGarraJugador.addEventListener('click', ataqueGarra)
    let ataquePatadaJugador = document.getElementById('butonPatada')
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
    let resultados = document.getElementById('resultado');
    resultados.style.display = 'flex'

    let spanVidasJugador = document.getElementById('vidasJugador');
    let spanVidasContrario = document.getElementById('vidasContrario');

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
    let modal = document.querySelector('.mensaje--final-reiniciar');
    modal.style.display = 'flex'
    
    let theEnd = document.getElementById('mensajeFinal')
    
    let theEndMsj = document.createElement('div')
    theEndMsj.innerHTML = msj
    theEnd.appendChild(theEndMsj)

    let mascotaJugador = document.getElementById('eligirMascota')
    mascotaJugador.disabled = true
    let ataqueMordidaJugador = document.getElementById('butonMordida')
    ataqueMordidaJugador.disabled = true
    let ataqueGarraJugador = document.getElementById('butonGarra')
    ataqueGarraJugador.disabled = true
    let ataquePatadaJugador = document.getElementById('butonPatada')
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

    let reiniciarPartida = document.getElementById('butonReiniciar');
    reiniciarPartida.style.display = 'block'

    let opacarBody = document.querySelector('body')
    opacarBody.style.backgroundColor= 'rgba(0,0,0,0.5)'
    
    reiniciarPartida.addEventListener('click', onReiniciarJuego);

        function onReiniciarJuego(){
            location.reload()
        }
    
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego);