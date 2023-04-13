
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
function toastCarrito(){
    const toast = document.getElementById('carritoToast');
        const toastBootstrap 
            = bootstrap.Toast.getOrCreateInstance(toast);

        toastBootstrap.show();
}