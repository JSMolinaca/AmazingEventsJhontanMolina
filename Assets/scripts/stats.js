import { highestAttendancePercentage, lowestAssistancePercentage, findMaxCapacityEvent, stats, pintarFilas } from "./funcion.js"

//constantes que me permiten llamar al hmtl, en especifico a la estructura que los contiene para
//buscar || agregar
const highest = document.getElementById('r1')
const lowest = document.getElementById('r2')
const larger = document.getElementById('r3')
const statsUp = document.getElementById('statsUpcoming')
const statsPass = document.getElementById('statsPassEvents')

let arrayResults
let Url='../Assets/json/amazing.json'

fetch(Url)
    .then((response) => response.json())
    .then(results => {

        arrayResults = results

        //se crean las constantes para llamarlas de un modo mas facil, acorto caminos
        const events = arrayResults.events
        const currentDate = arrayResults.currentDate

        //estas funcione permiten crear un nuevo array con tarjetas que sean 
        //posteriores || anteriores al currentDate del json
        const tarjetasPasadasArray = events.filter((event) => event.date < currentDate)
        const tarjetasFuturasArray = events.filter((event) => event.date > currentDate)

        //llamo a la funcion e inserto en el codigo html el resultado
        highestAttendancePercentage(events)
        const eventWithHighestAttendancePercentage = highestAttendancePercentage(events)
        highest.innerHTML = `${eventWithHighestAttendancePercentage.name}`

        //llamo a la funcion e inserto en el codigo html el resultado
        lowestAssistancePercentage(events)
        const eventWithLowestAttendancePercentage = lowestAssistancePercentage(events)
        lowest.innerHTML = `${eventWithLowestAttendancePercentage.name}`

        //llamo a la funcion e inserto en el codigo html el resultado
        findMaxCapacityEvent(events)
        const maxCapacityEvent = findMaxCapacityEvent(events)
        larger.innerHTML = `${maxCapacityEvent.name}`

        //llamo a la funcion para crear el nuevo array y despues pinto las celdas
        stats(tarjetasPasadasArray)
        const statsP = stats(tarjetasPasadasArray)
        pintarFilas(statsP, statsPass)
        
        //llamo a la funcion para crear el nuevo array y despues pinto las celdas
        stats(tarjetasFuturasArray)
        const statsU = stats(tarjetasFuturasArray)
        pintarFilas(statsU, statsUp)

    })

    //.catch nos permite detener todo lo que se ejecuta en el .then en caso de que la 
    //informacion este corrupta
    .catch((error) => {
        console.log(error)
    })


