import { pintarTarjetas, filtrarPorTexto, filtrarPorCategoria, crearCheckBoxex } from "./modules/funciones.js";

//Llamar al html, la estructura, buscar || agregar
const input = document.querySelector('input')
const contenedorCheck = document.getElementById('checkContainer')


let arrayResults
const Url = './modules/dataApi.js'

//Utilizamos Fetch para traer la Url y .then obtener los datos de la Api

fetch(Url)
    .then((response) => response.js())
    .then(results => {

        arrayResults = results

        //Llamar constantes de un modo mas facil
        const events = arrayResults.events
        const currentDate = arrayResults.CurrentDate

        //Llamado a las funciones
        pintarTarjetas(events);
        crearCheckBoxex(events)
        superFiltro()

        //Este vento recibe lo del input del search
        input.addEventListener('input', superFiltro)

        //Verifica si hay cambio en algun check
        contenedorCheck.addEventListener('change', superFiltro)

        //Funcion permite filtrar por checks y search para pintar las tarjetas
        function superFiltro() {
            let primerFiltro = filtrarPorTexto(events, input.value)
            let segundoFiltro = filtrarPorCategoria(primerFiltro)
            pintarTarjetas(segundoFiltro)
        }
    });