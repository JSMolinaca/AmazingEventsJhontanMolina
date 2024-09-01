//Tomamos lo ingresado cuando se haga click en el boton
const sendBtn = document.getElementById("send-btn")

sendBtn.addEventListener("click", (event) => {
    event.preventDefault()
    const name = document.getElementById("nameinput").value
    const email = document.getElementById("emailinput").value
    const message = document.getElementById("messaggeinput").value

    //Creo las condiciones de ingresar name, email y message validos
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

    //Uso la palabra reservada mailto para enviar el mail con todo lo capturado al principio, %0D%0A%0D%0A se usa por lo leido para hacer un salto de linea, luego con windows.location.href llamo al programa de mail.
    const mailto = `
        mailto:consult.events@event.com?subject=Mensaje de ${name}&body=${message}%0D%0A%0D%0AEmail de contacto: ${email}`
    window.location.href = mailto

    //Se agrega esta linea para que despues de pulsar enviar se limpien los campos
    document.getElementById("nameinput").value = ""
    document.getElementById("emailinput").value = ""
    document.getElementById("messageinput").value = ""
})

//Le damos la opcion de borrar todo si algo esta mal escrito
const cleanBtn = document.getElementById("clean-btn")
cleanBtn.addEventListener("click", (evento) => {
    evento.preventDefault()
    document.getElementById("nameinput").value = ""
    document.getElementById("emailinput").value = ""
    document.getElementById("messageinput").value = ""
})