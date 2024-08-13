let arrayResults
let Url = '../json/amazing.json';

fetch(Url)
    .then((response) => response.json())
    .then(results => {

    arrayResults = results

    const events = arrayResults.events

    const queryString = location.search
    const params = new URLSearchParams(queryString)
    const id = params.get('id')

    const tarjeta = events.find(evento => evento._id == id)
    const div = document.getElementById("container")

    div.innerHTML = `
        <div class="card mt-3 p-3">
            <div class="row">
                <div class= "col-3 d-flex flex-wrap align-content-around justify-content-center">
                    <img src="${tarjeta.image}" class="img-fluid" alt="${tarjeta.name}">
                    <a class="btn btn-primary" href="../index.html" d-flex justify-content-center role="button">Back</a>
                </div>
                <div class="col-9">
                    <div class="card-body">
                        <h5 class="card-title">${tarjeta.name}</h5>
                        <table class="table table-bordered m-2">
                            <tr>
                                <td>Name</td>
                                <td>${tarjeta.name}</td>
                            </tr>
                            <tr>
                                <td>Descripcion</td>
                                <td>${tarjeta.description}</td>
                            </tr>
                            <tr>
                                        <td>Category</td>
                                        <td>${tarjeta.category}</td>
                                    </tr>
                                    <tr>
                                        <td>Place</td>
                                        <td>${tarjeta.place}</td>
                                    </tr>
                                    <tr>
                                        <td>Capacity</td>
                                        <td>${tarjeta.capacity}</td>
                                    </tr>
                                    <tr>
                                        <td>Assistance or Estimate</td>
                                        <td>${tarjeta.assistance || tarjeta.estimate}</td>
                                    </tr>
                                    <tr>
                                        <td>Price</td>
                                        <td>${tarjeta.price}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>`

})