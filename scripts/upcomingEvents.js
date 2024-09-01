import { pintarTarjetas, filtrarPorTexto, filtrarPorCategoria, crearCheckBoxex } from "./funciones";

//Llamar al html, la estructura, buscar || agregar
const input = document.querySelector('input')
const contenedorCheck = document.getElementById('checkContainer')

let arrayResults
let Url = '../json/amazing.json';

//Utilizamos Fetch para traer la Url y .then obtener los datos de la Api
fetch(Url)
  .then((response) => response.json())
  .then(results => {

    arrayResults = results

    //Llamar constantes de un modo mas facil
    const events = arrayResults.events
    const currentDate = arrayResults.currentDate

    //Crear un nuevo array con tarjetas que sean posteriores al currentDay
    const tarjetasFuturasArray = events.filter((event) => event.date > currentDate);

    //Llamado a las funciones
    pintarTarjetas(tarjetasFuturasArray)
    crearCheckBoxex(tarjetasFuturasArray)
    superFiltro()

    //este evento escucha lo que ingresamos en la barra de search del html
    input.addEventListener('input', superFiltro)

    //este evento escucha si existe algun cambio en los checks
    contenedorCheck.addEventListener('change', superFiltro)

    //esta funcion permite filtrar por checks y search y pintar las tarjetas filtradas
    function superFiltro() {
      const resultado = filtrarPorCategoria(filtrarPorTexto(tarjetasFuturasArray, input.value))
      pintarTarjetas(resultado);
    }
  })

    //.catch nos permite detener todo lo que se ejecuta en el .then en caso de que la 
    //informacion este corrupta
    .catch((error) => {
      console.log(error);
  });