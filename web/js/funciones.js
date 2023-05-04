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
        document.getElementById("sp_loading").hidden = false;


    
        let nombres = document.getElementById("nombres").value;
        let apellidos = document.getElementById("apellidos").value;
        let correo = document.getElementById("correo").value;
        let password = document.getElementById("password").value;
        setTimeout(() => {
            console.log('Nombres    : ' + nombres);
            console.log('Apellidos  : ' + apellidos);
            console.log('Correo     : ' + correo);
            console.log('Contraseña : ' + password);

        

            const toast = document.getElementById('registroToast');
            const toastBootstrap 
                = bootstrap.Toast.getOrCreateInstance(toast);

            toastBootstrap.show();

            document.getElementById("sp_loading").hidden = true;
        }, 3000);
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