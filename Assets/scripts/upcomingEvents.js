import { pintarTarjetas, filtrarPorTexto, filtrarCategoria, crearCheckBoxes } from "./funcion.js"

//Constantes para llamar al html buscar || agregar
const input = document.querySelector('input')
const contenedorCheck = document.getElementById('checkContainer')

let arrayResults
let Url = 'https://aulamindhub.github.io/amazing-api/events.json'

//Utilizamos fetch para traer la url y la funcion .then para obtener los datos del array
fetch(Url)
    .then((response) => response.json())
    .then(results => {

        arrayResults = results

        //Se creran constantes, para llamarlas mas facil
        const events = arrayResults.events
        const currentDate = arrayResults.currentDate

        //Aca creamos un nuevo array para las tarjetas futuras
        const tarjetasFuturasArray = events.filter((event) => event.date > currentDate);

        //llamamos las funciones
        pintarTarjetas(tarjetasFuturasArray)
        crearCheckBoxes(tarjetasFuturasArray)
        superFiltro()

        //Esto escucha lo que el usuario escriba en el buscador
        input.addEventListener('input', superFiltro)

        //Esto evalua si hay algun cambio en los checks
        contenedorCheck.addEventListener('change', superFiltro)

        //Funcion para pintar las tarjetas filtradas, coloco esta funcion aqui porque en caso de no seleccionar nada, pinta tarjetas con el array original
        function superFiltro() {
            const resultado = filtrarCategoria(filtrarPorTexto(tarjetasFuturasArray, input.value));
            pintarTarjetas(resultado);
        }

    })

    //.catch detiene lo que se ejecuta en .then en caso de que la informacion no ejecute
    .catch((error) => {
        console.log(error);
    });