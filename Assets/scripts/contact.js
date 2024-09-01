//tomo lo ingresado en name, email y message cuando escucho el evento click del boton
const sendBtn = document.getElementById("send-btn")

sendBtn.addEventListener("click", (event) => {
    event.preventDefault()
    const name = document.getElementById("nameinput").value
    const email = document.getElementById("emailinput").value
    const message = document.getElementById("messaggeinput").value

//creo las condiciones de ingresar name, email y message validos, porque required no funciono =((
    if (name === "" || typeof name !== "string") {
        alert("Please enter a valid name.");
        return;
    }

    if (email.indexOf("@") === -1 || email.indexOf(".com") === -1) {
        alert("Please enter a valid email.");
        return;
    }

    if (message === "" || typeof message !== "string") {
        alert("Please enter a valid message.");
        return;
    }

//uso la palabra reservada mailto para enviar el mail con todo lo capturado al principio
//%0D%0A%0D%0A se usa por lo leido para hacer un salto de linea
//luego con windows.location.href llamo al programa de mail por defecto de la pc y envio el mail por ese medio
    const mailto = `
        mailto:consult.events@event.com?subject=Mensaje de ${name}&body=${message}%0D%0A%0D%0AEmail de contacto: ${email}`
    window.location.href = mailto

//se agrega esta linea para que despues de pulsar enviar se limpie el campo
    document.getElementById("nameinput").value = ""
    document.getElementById("emailinput").value = ""
    document.getElementById("messageinput").value = ""
})

//da la opcion de borrar todo si algo se escrito mal o no correspondia, limpiando todos los campos
const cleanBtn = document.getElementById("clean-btn")
cleanBtn.addEventListener("click", (evento) => {
    evento.preventDefault()
    document.getElementById("nameinput").value = ""
    document.getElementById("emailinput").value = ""
    document.getElementById("messageinput").value = ""
})