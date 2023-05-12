
function validarDatosRegistro(){
    let nombres = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellido").value;
    let correo = document.getElementById("correo").value;
    let password = document.getElementById("password").value;
        if(nombres == '' || apellidos == '' || correo == '' || password == '') {
            document.getElementById("datos").hidden = false;
        }else{
            validarCheck();
        }
}


function validarCheck(){
    var check = document.forms["miForm"]["miCheck"].checked;
    if(check == true){
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

                    setTimeout(() => {window.location.href = "index.html"},4000);
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
        }else{
            document.getElementById("aceptar").hidden = false;
        }
}
function login() {
    var correo = $("#correoLogin").val();
    var contrasena = $("#passwordLogin").val();


    var data = {
        nombreFuncion: "ClienteLogin",
        parametros: [correo, contrasena]
    };

    $.ajax({
        method: "POST",
        url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
        data: JSON.stringify(data),
        success: function (response) {
            if (response.result == 'LOGIN OK') {
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
                    title: 'Credenciales correctas'
                });
                
                
                var miModal = document.getElementById("exampleModal2");
                $(miModal).modal("hide");
                
                setTimeout(() => {window.location.href = "iniciousuario.html"},4000);

                almacenarCompraID()
                
            } else if (response.result == 'LOGIN NOK') {
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
                    title: 'Credenciales inválidas'
                });
            }


            console.log(response);
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function loginAdmin() {
    document.getElementById("sp_loading").hidden = false;
    
    var rut = $("#txt_rut").val();
    var contrasena = $("#txt_password").val();


    var data = {
        nombreFuncion: "ClienteLogin",
        parametros: [rut, contrasena]
    };

    $.ajax({
        method: "POST",
        url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
        data: JSON.stringify(data),
        success: function (response) {
            if (response.result == 'LOGIN OK') {
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
                    title: 'Credenciales correctas'
                });
                document.getElementById("sp_loading").hidden = true;
                setTimeout(() => {window.location.href = "administrador.html"},4000);

            } else if (response.result == 'LOGIN NOK') {
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
                    title: 'Credenciales inválidas'
                });
            }


            console.log(response);
        },
        error: function (error) {
            console.log(error);
        }
    });
}





function formateaRut() {

    let rut = document.getElementById("txt_rut").value;


    var actual = rut.replace(/^0+/, "");
    if (actual != '' && actual.length > 1) {
        var sinPuntos = actual.replace(/\./g, "");
        var actualLimpio = sinPuntos.replace(/-/g, "");
        var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
        var rutPuntos = "";
        var i = 0;
        var j = 1;
        for (i = inicio.length - 1; i >= 0; i--) {
            var letra = inicio.charAt(i);
            rutPuntos = letra + rutPuntos;
            if (j % 3 == 0 && j <= inicio.length - 1) {
                rutPuntos = "." + rutPuntos;
            }
            j++;
        }
        var dv = actualLimpio.substring(actualLimpio.length - 1);
        rutPuntos = rutPuntos + "-" + dv;
    }
    document.getElementById("txt_rut").value = rutPuntos;
}


function almacenarAdmin() {
    document.getElementById("sp_loading").hidden = false;


    this.formateaRut();
    
    let rut = document.getElementById("txt_rut").value;
    let password = document.getElementById("txt_password").value;
    setTimeout(() => {
        console.log('RUT           : ' + rut);
        console.log('CONTRASEÑA    : ' + password);

        document.getElementById("sp_loading").hidden = true;
        window.location.href = "administrador.html"; 
    }, 3000);
}

function toastCarrito(){
    const toast = document.getElementById('carritoToast');
        const toastBootstrap 
            = bootstrap.Toast.getOrCreateInstance(toast);

        toastBootstrap.show();
}

function recuperacion(){
    let correo = document.getElementById("correo").value;
    console.log('Correo: ' + correo);
    Swal.fire('En breve recibirás un correo con las instrucciones a seguir para terminar el proceso.')
}

function suscribete(){
    let sus = document.getElementById("footer-email").value;
    console.log('Correo: ' + sus);
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
        title: 'Gracias por suscribirte, recibiras 5% de descuento en tus compras'
    });
}

function crearProducto() {
    var codigo = $("#codigo").val();
    var nombre = $("#nombreProducto").val();
    var descripcion = $("#descripcion").val();
    var precio = $("#precio").val();
    var stock = $("#stock").val();


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

var codigoID;
function almacenarCompraID(){
    let correoLogin = document.getElementById("correoLogin").value;
    var data = {
        nombreFuncion: "CompraAlmacenar",
        parametros: [correoLogin]
    };
    $.ajax({
        method: "POST",
        url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
        data: JSON.stringify(data),
        success: function (response) {
        response.result[0].RESPUESTA = codigoID
        console.log(response);
        console.log(codigoID);
        },
        error: function (error) {
            console.log(error);
        }
    });
}


var productosFiltrados = [];
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
                }
            });
            console.log(productosFiltrados);
        },
        error: function (error) {
                console.log(error);
        }
    });
}

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





