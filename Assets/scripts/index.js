import { pintarTarjetas, filtrarPorTexto, filtrarCategoria, crearCheckBoxes } from "./funcion.js"

//Constantes para llamar al html buscar || agregar
const input = document.querySelector('input')
const contenedorCheck = document.getElementById('checkContainer')

let arrayResults
const Url = 'https://aulamindhub.github.io/amazing-api/events.json'

//Utilizamos fetch para traer la url y la funcion .then para obtener los datos del array
fetch(Url)
    .then((response) => response.json())
    .then(results => {

        arrayResults = results

        //Se creran constantes, para llamarlas mas facil
        const events = arrayResults.events
        const currentDate = arrayResults.currentDate

        //llamamos las funciones
        pintarTarjetas(events)
        crearCheckBoxes(events)
        superFiltro()

        //Esto escucha lo que el usuario escriba en el buscador
        input.addEventListener('input', superFiltro)

        //Esto evalua si hay algun cambio en los checks
        contenedorCheck.addEventListener('change', superFiltro)

        //Esta funcion permite filtrar por checks y search para pintar las tarjetas filtradas
        function superFiltro() {
            let primerFiltro = filtrarPorTexto(events, input.value)
            let segundoFiltro = filtrarCategoria(primerFiltro)
            pintarTarjetas(segundoFiltro)
        }
    });