const conetendor = document.getElementById('eventos-container')

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

//Funcion para encontrar evento con mayor assitencia
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