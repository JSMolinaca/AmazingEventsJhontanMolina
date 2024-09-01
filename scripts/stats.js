import { encontrarEventoMayorAsistencia, encontrarEventoMenorAsistencia, findMaxCapacityEvent, stats, pintarFilas, encontrarEventoMayorAsistencia } from "./modules/funciones";

//Llamar al html, la estructura, buscar || agregar
const highest = document.getElementById('r1')
const lowest = document.getElementById('r2')
const larger = document.getElementById('r3')
const statsUp = document.getElementById('statsUpcoming')
const statsPass = document.getElementById('statsPassEvents')

let arrayResults
let Url='./modules/dataApi.js'

fetch(Url)
    .then((response) => response.js())
    .then(results => {
        arrayResults = results

      //Llamar constantes de un modo mas facil
      const events = arrayResults.events
      const currentDate = arrayResults.currentDate

      //Crear un nuevo array con tarjetas que sean posteriores al currentDay
      const tarjetasPasadasArray = events.filter((event) => event.date < currentDate)
      const tarjetasFuturasArray = events.filter((event) => event.date > currentDate)
      
      highestAttendancePercentage(events)
      const eventWithHighestAttendancePercentage = highestAttendancePercentage(events)
      highest.innerHTML = `${eventWithHighestAttendancePercentage.name}`

      //llamo a la funcion e inserto en el codigo html el resultado
      lowestAssistancePercentage(events)
      const eventWithLowestAttendancePercentage = lowestAssistancePercentage(events)
      lowest.innerHTML = `${eventWithLowestAttendancePercentage.name}`

      findMaxCapacityEvent(events)
      const maxCapacityEvent = findMaxCapacityEvent(events)
      larger.innerHTML = `${maxCapacityEvent.name}`

      stats(tarjetasPasadasArray)
      const statsP = stats(tarjetasPasadasArray)
      pintarFilas(statsP, statsPass)

      stats(tarjetasFuturasArray)
      const statsU = stats(tarjetasFuturasArray)
      pintarFilas(statsU, statsUp)

    })

    //.catch nos permite detener todo lo que se ejecuta en el .then en caso de que la 
    //informacion este corrupta
    .catch((error) => {
        console.log(error)
    })