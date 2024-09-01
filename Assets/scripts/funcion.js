const contenedor = document.getElementById('card')
const contenedorCheck = document.getElementById('checkContainer')

//Toma un array y mediante un fragment crea las tarjetas que contiene el array
export function pintarTarjetas(array) {
    const fragment = document.createDocumentFragment();

    //En caso de que la busqieda no coincidad con los parametros, evite pintar las tarjetas y muestre este mensaje
    if (array.length === 0) {
        contenedor.innerHTML = `<h5 class="display-3">your search had no matches</h5>`
        return
    }

    //El forEach permite pintar la cantidad de tarjetas que contiene el array
    array.forEach(tarjeta => {
        const card = document.createElement('div')
        card.className = 'card shadow p-3 bg-body-tertiary rounded'
        card.style = 'width: 18rem;'
        card.innerHTML = `
            <img src="${tarjeta.image}" 
                class="card-img-top cajafotos" 
                alt="${tarjeta.category}">
            <div class="card-body d-flex flex-column justify-content-between flex-grow-1">
                <p class="card-text"><strong>${tarjeta.name}</strong></p>
                <p class="card-text">Description: ${tarjeta.description}</p>
                <p class="card-text">Category: ${tarjeta.category}</p>
                <p class="card-text">Place: ${tarjeta.place}</p>
                <div class="card-footer d-flex justify-content-center align-items-end mt-auto">
                    <a href="../pages/details.html?id=${tarjeta._id}" class="btn bg-rosa btn-primary">More Info</a>
                </div>
            </div>`

        fragment.appendChild(card)
    });

    contenedor.innerHTML = ''
    contenedor.appendChild(fragment)
}

//Esta funcion permite buscar el texto ingresado en el input y compararlo con los datos del array que se ingrese
export function filtrarPorTexto(array, texto) {
    let arrayFiltrado = array.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado
}

//Esta funcion permite buscar por categorias seleccionadas y compararlas con las categorias de las tarjetas 
export function filtrarCategoria(array) {
    const checkboxes = document.querySelectorAll("input[type='checkbox']:checked")
    const checkedValues = Array.from(checkboxes).map(checkbox => checkbox.value)
    return checkedValues.length > 0 ? array.filter(elemento => checkedValues.includes(elemento.category)) : array
}

//Esta funcion permite encontrar la asistencia de mayor porcentaje de un array, toma como valor inicial 0
export function mayorPorcentajeAsistencia(evento) {
    let mayorPorcentajeAsistencia = 0
    let eventoConMayorPorcentajeDeAsistencia = null;
    for (let i = 0; i < evento.length; i++) {
        const porcentajeAsistencia = ((evento[i].assistance || evento[i].estimate) / evento[i].capacity) * 100
        if (porcentajeAsistencia > mayorPorcentajeAsistencia) {
            mayorPorcentajeAsistencia = porcentajeAsistencia
            eventoConMayorPorcentajeDeAsistencia = evento[i];
        }
    }
    return eventoConMayorPorcentajeDeAsistencia
}

//Esta funcion permite encontrar la asistencia de menor porcenate de un array, toma como valor de comparacion la variable Infinity, permitiendo que el primer valor que lea sea menor y pueda ir actualizando correctamente
export function menorPorcentajeDeAsistencia(evento) {
    let menorPorcentajeDeAsistencia = Infinity
    let eventoConMenorPorcentajeDeAsistencia = null
    for (let i = 0; i < evento.length; i++) {
        const porcentajeAsistencia = ((evento[i].assistance || evento[i].estimate) / evento[i].capacity) * 100
        if (porcentajeAsistencia < menorPorcentajeDeAsistencia) {
            menorPorcentajeDeAsistencia = porcentajeAsistencia
            eventoConMenorPorcentajeDeAsistencia = evento[i]
        }
    }
    return eventoConMenorPorcentajeDeAsistencia;
}

//Utilizamos .find para encontrar el valor maximo y la operacion Math.max
export function findMaxCapacityEvent(evento) {
    return evento.find(event => event.capacity === Math.max(...evento.map(event => event.capacity)))
}

//Esta funcion permite crear un array de objetos,  utilizamos reduce para formar un objeto con los resultados que se van acumulando en cada iteracion
export function stats(datos) {
    const resultado = datos.reduce((resultado, dato) => {
        const categoria = dato.category
        //Si la categoría no existe en el objeto resultado, agregarla y establecer sus valores iniciales a 0
        if (!resultado.categorias.includes(categoria)) {
            resultado.categorias.push(categoria)
            resultado.ganancias[categoria] = 0
            resultado.attendance[categoria] = 0
            resultado.capacidad[categoria] = 0
        }
        //Obtener el valor de asistencia, que puede ser dato.assistance o dato.estimate si dato.assistance es nulo o no está definido
        const attendances = dato.assistance ?? dato.estimate
        //Agregar la cantidad de ganancias, asistencia y capacidad a la categoría correspondiente
        resultado.ganancias[categoria] += dato.price * attendances
        resultado.attendance[categoria] += attendances
        resultado.capacidad[categoria] += dato.capacity

        return resultado
    }, { categorias: [], ganancias: {}, porcentajes: {}, attendance: {}, capacidad: {} })

    //Calcular los porcentajes de asistencia para cada categoría y los agrega a la propiedad porcentaje
    resultado.categorias.forEach(categoria => {
        resultado.porcentajes[categoria] = resultado.attendance[categoria] / resultado.capacidad[categoria] * 100
    })
    return resultado
}

//esta funcion llena la tabla de stats, tanto para eventos pasados como futuros, toma 2 parametros, luego recorre con un forEache inserta en html la ganancia y el porcentaje
export function pintarFilas(dato, contenedor) {
    let filas = ''
    dato.categorias.forEach(categoria => {
        filas += `
        <tr>
        <td>${categoria}</td>
        <td>$ ${dato.ganancias[categoria].toFixed(2)}</td>
        <td>${dato.porcentajes[categoria].toFixed(2)} %</td>
        </tr>`
    })
    contenedor.innerHTML = filas
}

//Esta funcion nos permite crear los checkboxes basado en crear array de categorias de los eventos, Con map creamos ese array de categorias, Con set eliminamos del array anterior las repeticiones, Luego con ese nuevo array creamos los checkboxes que insertamos con innerHTML
export function crearCheckBoxes(array) {
    let arrayCategorys = array.map(tarjeta => tarjeta.category)
    let setCategory = new Set(arrayCategorys)
    let arrayChecks = Array.from(setCategory)
    let checkboxes = ''
    arrayChecks.forEach(category => {
        checkboxes += `<div class="form-check me-4">
                <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
                <label class="form-check-label color-text" for="${category}">${category}</label>
              </div>`
    })
    contenedorCheck.innerHTML = checkboxes
}
