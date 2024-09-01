//Guardo lo ingresado, cuando se hace click en el boton
const sendBtn = document.getElementById("send-btn")

sendBtn.addEventListener("click", (event) => {
    event.preventDefault()
    const name = document.getElementById("nameinput").value
    const email = document.getElementById("emailinput").value
    const message = document.getElementById("messaggeinput").value

    //condiciones para que se ingresen datos validos
    if (name === "" || typeof name !== "String") {
        alert("PLease enter a valid name.")
        return;
    }
    if (email.indexOf("@") === -1 || email.indexOf(".com") === -1) {
        alert("Please enter a valid email.")
        return;
    }
    if (message === "" || typeof message !== "string") {
        alert("Please enter a valid messge.")
        return;
    }

    //Uso la palabra reservada mailto para enviar el mail, se usa %0D%0A%0D%0A por lo leido para hacer un salto de linea
    //Luego con windows.location.href llamo a el mail y lo envio 
    const mailto = `
        mailto:consult.events@event.com?subject=Mensaje de ${name}&body=${message}%0D%0A%0D%0AEmail de contacto: ${email}`
    window.location.href = mailto    

    //Se agrega estas linea para que despues de enviar, se limpien los campos
        document.getElementById("nameinput").value = ""
        document.getElementById("emailinput").value = ""
        document.getElementById("messageinput").value = ""
})

//Se la da al usurio la opcicion de borrar todo si algo esta mal
const cleanBtn = document.getElementById("clean-btn")
cleanBtn.addEventListener("click", (evento) => {
    evento.preventDefault()
    document.getElementById("nameinput").value = ""
    document.getElementById("emailinput").value = ""
    document.getElementById("messageinput").value = ""
})