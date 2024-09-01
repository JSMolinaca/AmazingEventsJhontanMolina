import { mayorPorcentajeAsistencia, menorPorcentajeDeAsistencia, findMaxCapacityEvent, stats, pintarFilas } from "./funcion.js"

//Constantes para llamar al html buscar || agregar
const highest = document.getElementById('r1')
const lowest = document.getElementById('r2')
const larger = document.getElementById('r3')
const statsUp = document.getElementById('statsUpcoming')
const statsPass = document.getElementById('statsPassEvents')

let arrayResults
let Url = 'https://aulamindhub.github.io/amazing-api/events.json'

fetch(Url)
    .then((response) => response.json())
    .then(results => {

        arrayResults = results

        //Se creran constantes, para llamarlas mas facil
        const events = arrayResults.events
        const currentDate = arrayResults.currentDate

        //Aca creamos un nuevo array para las tarjetas futuras !! pasadas
        const tarjetasPasadasArray = events.filter((event) => event.date < currentDate)
        const tarjetasFuturasArray = events.filter((event) => event.date > currentDate)

        //llamo a la funcion e inserto en el codigo html el resultado
        mayorPorcentajeAsistencia(events)
        const eventoConMayorPorcentajeDeAsistencia = mayorPorcentajeAsistencia(events)
        highest.innerHTML = `${eventoConMayorPorcentajeDeAsistencia.name}`

        //llamo a la funcion e inserto en el codigo html el resultado
        menorPorcentajeDeAsistencia(events)
        const eventoConMenorPorcentajeDeAsistencia = menorPorcentajeDeAsistencia(events)
        lowest.innerHTML = `${eventoConMenorPorcentajeDeAsistencia.name}`

        //llamo a la funcion e inserto en el codigo html el resultado
        findMaxCapacityEvent(events)
        const maxCapacityEvent = findMaxCapacityEvent(events)
        larger.innerHTML = `${maxCapacityEvent.name}`

        //llamo a la funcion para crear un nuevo array y despues pintar las celdas
        stats(tarjetasPasadasArray)
        const statsP = stats(tarjetasPasadasArray)
        pintarFilas(statsP, statsPass)

        //llamo a la funcion para crear un nuevo array y despues pinatar las celdas
        stats(tarjetasFuturasArray)
        const statsU = stats(tarjetasFuturasArray)
        pintarFilas(statsU, statsUp)

    })

    //.catch detiene lo que se ejecuta en .then en caso de que la informacion no ejecut
    .catch((error) => {
        console.log(error)
    })



    
