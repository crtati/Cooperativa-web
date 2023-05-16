/*CREACION Y VALIDACION PRODUCTO */
function validarDatosProducto(){
    let codigo = document.getElementById("codigo").value;
    let nombreProducto = document.getElementById("nombreProducto").value;
    let descripcion = document.getElementById("descripcion").value;
    let precio = document.getElementById("precio").value;
    let stock = document.getElementById("stock").value;
        if(codigo == '' || nombreProducto == '' || descripcion == '' || precio == '' || stock == '') {
            document.getElementById("datos").hidden = false;
        }else{
            crearProducto();
        }
}
function crearProducto() {
    var codigo = $("#codigo").val();
    var nombre = $("#nombreProducto").val();
    var descripcion = $("#descripcion").val();
    var precio = $("#precio").val();
    var stock = $("#stock").val();
    // Crear la nueva card con los datos del formulario
    var nuevaCard = `
    <div class="col" align="center">
        <div class="card shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 30rem;">
            <h5 class="card-codigo">${codigo}</h5>
            <img class="img img-fluid card-img-top" src="assets/tierra1.png" style="height: 20rem;" alt="...">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">
                    <ul>
                        <li style="text-align: left;">${descripcion}</li>
                        <!-- Otros elementos de la lista -->
                    </ul>
                </p>
                <h5>Precio: <span class="precio">${precio}</span></h5>
                <!--BOTON AÑADIR AL CARRITO-->
                <div class="btn-group" role="group" style="background-color: rgba(0, 0, 0, 0.05);">
                    <td><input class="inp cantidad" type="number" min="1" value="1"></td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-car btn-outline-secondary button">Añadir al carro</button>
                    </div>
                </div>    
            </div>
        </div>
    </div>
    `;

    // Agregar la nueva card al div "tienda"
    $("#tienda").append(nuevaCard);
    // Agregar la card a la variable storedCards
    storedCards.push(nuevaCard);
    // Guardar la variable storedCards en el localStorage
    localStorage.setItem('cards', JSON.stringify(storedCards));


    var data = {
        nombreFuncion: "ProductoAlmacenar",
        parametros: [codigo, nombre,descripcion,precio,stock]
    };

    $.ajax({
        method: "POST",
        url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
        data: JSON.stringify(data),
        success: function (response) {
            if (response.result[0].RESPUESTA == 'OK') {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Producto almacenado'
                });
                
                $("#codigo").val('');
                $("#nombreProducto").val('');
                $("#descripcion").val('');
                $("#precio").val('');
                $("#stock").val('');
            } else if (response.result[0].RESPUESTA == 'ERR01') {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'warning',
                    title: 'Producto ya se encuentra registrado'
                });
            }


            console.log(response);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

/*BUSCAR NUESTROS PRODUCTOS CAJ */
var productosFiltrados = [];
var codigoRescatado;
function traerProductosApi(){
    $.ajax({
        method: "GET",
        url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php?nombreFuncion=ProductoListar",
        CODIGO: 'CAJ*', fields: 'CODIGO,NOMBRE,DESCRIPCION,STOCK',
        
        success: function (response){

            var result = response.result;

            $.each(result, function(index, product) {
                var productCodigo = product.CODIGO;
                var productNombre = product.NOMBRE;
                var productDescripcion = product.DESCRIPCION;
                var productStock = product.STOCK;
              // Filtra los productos que cumplen con el criterio CAJ
                if (productCodigo.startsWith('CAJ')) {
                    productosFiltrados.push({CODIGO: productCodigo, NOMBRE: productNombre, DESCRIPCION: productDescripcion, STOCK: productStock});
                    codigoRescatado = product.CODIGO;
                }
            });
            console.log(productosFiltrados);
        },
        error: function (error) {
                console.log(error);
        }
    });
}
/*LISTAR EN MODAL NUESTROS PRODUCTOS */
function listar(){
    traerProductosApi()
    var productos = document.getElementById('modal-card');

    productosFiltrados.forEach(function(producto) {
    var card = document.createElement('div');
    card.classList.add('card');

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    var productoCodigo = document.createElement('h5');
    productoCodigo.classList.add('card-title');
    productoCodigo.innerText = producto.CODIGO;

    var productoNombre = document.createElement('p');
    productoNombre.classList.add('card-text');
    productoNombre.innerText = 'Nombre: ' + producto.NOMBRE;

    var productoStock = document.createElement('p');
    productoStock.classList.add('card-text');
    productoStock.innerText = 'Stock: ' + producto.STOCK;

    cardBody.appendChild(productoCodigo);
    cardBody.appendChild(productoNombre);
    cardBody.appendChild(productoStock);

    card.appendChild(cardBody);

    productos.appendChild(card);
});
}

function validarDatosRegistro(){
    let nombres = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellido").value;
    let correo = document.getElementById("correo").value;
    let password = document.getElementById("password").value;
        if(nombres == '' || apellidos == '' || correo == '' || password == '') {
            document.getElementById("datosU").hidden = false;
        }else{
            registrarUsuario();
        }
}

function registrarUsuario(){
        var nombres = $("#nombre").val();
        var apellidos = $("#apellido").val();
        var correo = $("#correo").val();
        var contrasena = $("#password").val();

        console.log(nombres);
        console.log(apellidos);
        console.log(correo);
        console.log(contrasena);

        var data = {
            nombreFuncion: "ClienteAlmacenar",
            parametros: [correo, contrasena, nombres, apellidos]
        };

        $.ajax({
            method: "POST",
            url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
            data: JSON.stringify(data),
            success: function (response) {
                if (response.result[0].RESPUESTA == 'OK') {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: 'Cliente registrado correctamente'
                    });
                    $("#nombre").val("");
                    $("#apellido").val("");
                    $("#correo").val("");
                    $("#password").val("");
                } else if (response.result[0].RESPUESTA == 'ERR01') {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'warning',
                        title: 'Usuario ingresado ya se encuentra registrado'
                    });
                }
                console.log(response);
            },
            error: function (error) {
                console.log(error);
            }
        });
}

var storedCards = JSON.parse(localStorage.getItem('cards')) || [];
function addLocalStorageCards() {
    // Recuperar las cards del localStorage
    var storedCards = JSON.parse(localStorage.getItem('cards')) || [];

    // Agregar las cards al div "tienda"
    storedCards.forEach(function(card) {
        $("#tienda").append(card);
    });
    
}

window.onload = function() {
    // ...

    addLocalStorageCards();

    // ...
}