dconst conetendor = document.getElementById('eventos-container')

export function pintarTarjetas(array) {
    const fragment = document.createDocumentFragment();

    //esto permite que en caso de busqueda por texto, no concuerde con lo buscado, evite pintar las tarjetas y mostrar el siguiente mensaje
    if (array.length === 0) {
        contenedor.innerHTML = '<h5 class= "dispay-3">Your search had no matches</h5>'
        return
    }

    //Pinta las tarjetas que contiene el array ingresado
    array.forEach(tarjeta => {
        const card = document.createElement('div')
        card.className = 'card shadow p-3 bg-body-tertiary rounded'
        card.style = 'width: 18rem'
        card.innerHTML = `
            <img src="${tarjeta.image}"
                class="card-img-top cajafotos"
                alt="${tarjeta.category}">
            <div class ="card-body d-flex flex-column justify-content-between flex-grow-1">
                <p class= "card-text"><strong>${tarjeta.name}</strong></p>
                <p class= "card-text">Description: ${tarjeta.description}</p>
                <p class= "card-text">Category: ${tarjeta.category}</p>                    <p class= "card-text">Place: ${tarjeta.place}</p>
                <div class="card-footer d-flex justify-content-center align-items-end mt-auto">
                    <a href="../pages/details.html?id=${tarjeta._id}" class="btn btn-primary">More Info</a>
                </div>
            </div>`

        fragment.appendChild(card)
    });

    conetendor.innerHTML = ''
    conetendor.appendChild(fragment)
}

//Funcion para buscar el texto ingresado en el search
export function filtrarPorTexto(array, texto) {
    let arrayFiltrado = array.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado
}
[]
//Funcion para filtrar por categoria seleccionada
export function filtrarPorCategoria(array) {
    const checkboxes = document.querySelectorAll("input[type='checkbox']:checked")
    const checkedValues = Array.form(checkboxes).map(checkbox => checkbox.value)
    return checkedValues.length > 0 ? array.filter(elemento => checkedValues.includes(elemento.category)) : array
}

//Funcion para encontrar evento con mayor asitencia
export function encontrarEventoMayorAsistencia(eventos) {
    let mayorPorcentajeAsistencia = 0;
    let eventoConMayorAsistencia = null;
    for (let i = 0; i < eventos.length; i++) {
        const porcentajeAsitenciaActual = ((eventos[i].assistance || eventos[i].estimate) / eventos[i].capacity) * 100;
        if (porcentajeAsistenciaActual > mayorPorcentajeAsistencia) {
            mayorPorcentajeAsistencia = porcentajeAsitenciaActual;
            eventoConMayorAsistencia = eventos[i];
        }
    }
    return eventoConMayorAsistencia;
}

//Funcion para encontrar evento con menor asistencia
export function encontrarEventoMenorAsistencia(eventos) {
    let menorPorcentajeAsistencia = Infinity;
    let eventosconMenorAsistencia = null;

    for (let i = 0; i < eventos.length; i++) {
        const porcenjeAsistencia = ((eventos[i].assistance || eventos[i].estimate) / eventos[i].capacity) * 100;
        if (porcentajeAsistencia < menorPorcentajeAsistencia) {
            menorPorcentajeAsistencia = porcenjeAsistencia;
            eventosconMenorAsistencia = eventos[i];
        }
        return eventosconMenorAsistencia;
    }
}

//Funcion para encontrar el valor maximo dentro de un array, utilizando find y Math.max, para encontrar el valor maximo
export function stats(datos) {
    const resultado = datos.reduce((resultado, dato) => {
        const categoria = dato.category
        //Si en la categoria no existe el objeto resultado, agregarla en 0
        if (!resultado.categorias.includes(categoria)) {
            resultado.categorias.push(categoria)
            resultado.ganancias[categoria] = 0
            resultado.attendance[categoria] = 0
            resultado.capacidad[categoria] = 0
        }
        const attendances = dato.assistance ?? dato.estimate
        //Agregamos la cantidad de ganancias, asistencia y capacidad a la categoria correspondiente
        resultado.ganancias[categoria] += dato.price * attendances
        resultado.attendance[categoria] += attendances
        resultado.capacidad[categoria] += dato.capacity

        return resultado
    }, { categorias: [], ganancias: {}, porcentajes: {}, attendance: {}, capacidad: {} })   
}

//Funcion para pintar la tabla stats
export function pintarFilas(dato, contenedor) {
    let filas = ''
    dato.categorias.forEach(categoria => {
        filas += 
        `
        <tr>
        <td>${categoria}</td>
        <td>$ ${dato.ganancias[categoria].toFixed(2)}</td>
        <td>${dato.porcentajes[categoria].toFixed(2)} %</td>
        `
    })
    contenedor.innerHTML = filas
}

//Funcion para los checkboxes 
export function crearCheckBoxex(array) {
    let arrayCategorys = array.map(tarjeta => tarjeta.cateogory)
    let setCategory = new Set(arrayCategorys)
    let arrayChecks = Array.from(setCategory)
    let checkboxes = ''
    arrayChecks.forEach(category => {
        checkboxes += `<div class="form-check me-4">
                    <input class="form-check-input" type="checkbox" id="${cateogory}" value="${category}>
                    <label class="form-check-label" for="${category}">${category}</label>
                    </div>`
    })
    contenedorCheck.innerHTML = checkboxes
}