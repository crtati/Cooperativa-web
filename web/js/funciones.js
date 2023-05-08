function validarDatosRegistro(){
    let nombres = document.getElementById("nombres").value;
    let apellidos = document.getElementById("apellidos").value;
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
        var nombres = $("#nombres").val();
    var apellidos = $("#apellidos").val();
    var correo = $("#correo").val();
    var contrasena = $("#password").val();

    console.log(nombres);
    console.log(apellidos);
    console.log(correo);
    console.log(contrasena);

    var data = {
        nombreFuncion: "ClienteAlmacenar",
        parametros: [nombres, apellidos, correo, contrasena]
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

                $("#nombres").val("");
                $("#apellidos").val("");
                $("#correo").val("");
                $("#password").val("");

                /*llevar a la pagina principal*/ 
                /*window.location.href = "index.html"; */
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