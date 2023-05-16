function redireccionar() {
    if (correoEntrar == null) {
        $('#exampleModal2').modal('show');
        $('#exampleModal3').modal('hide');
    } else {
        setTimeout(() => {window.location.href = "carrito.html"},2000);// aquí puedes cambiar la dirección de la redirección
    }
}
var correoEntrar;
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
                correoEntrar = correo;
                console.log(correoEntrar)
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
                addLocalStorageVariables()
                setTimeout(() => {window.location.href = "iniciousuario.html"},4000);
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
var codigoID;
function almacenarID() {
    var correoLogin = correoEntrar;
    var data = {
        nombreFuncion: "CompraAlmacenar",
        parametros: [correoLogin]
    };
    return new Promise(function(resolve, reject) {
        $.ajax({
        method: "POST",
        url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
        data: JSON.stringify(data),
        success: function(response) {
            codigoID = response.result[0].RESPUESTA
            addLocalStorageVariables();
            resolve();
        },
        error: function(error) {
            console.log(error);
            reject(error);
            }
        });
    });
}
function compra() {
    var id_compra = codigoID;
    var codigo_producto = "Producto04"
    var cantidad = 2;

    almacenarID().then(function() {
        var data = {
        nombreFuncion:"CompraDetalleAlmacenar",
        parametros:[id_compra,codigo_producto,cantidad]
        };
        $.ajax({
        method: "POST",
        url: "https://www.fer-sepulveda.cl/API_PLANTAS/api-service.php?nombreFuncion=CompraListar&correo="+correoEntrar,
        data: JSON.stringify(data),
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.log(error);
        }
        });
    });
}



/*carrito*/ 

const clickButton = document.querySelectorAll('.button');
const tbody = document.querySelector('.tbody');
let carrito = [];

clickButton.forEach( btn => {
    btn.addEventListener('click', addToCarritoItem)    
});


function addToCarritoItem(e) {
    const button = e.target
    const item = button.closest('.card')
    const itemTitulo = item.querySelector('.card-title').textContent;
    const itemPrecio = item.querySelector('.precio').textContent;
    const itemCantidad = item.querySelector('.cantidad').value;
    const itemImg = item.querySelector('.card-img-top').src;
    const newItem ={
        title: itemTitulo,
        price: itemPrecio,
        image: itemImg,
        cantidad: itemCantidad
    }
    
    
    newItemCarrito(newItem)
    
}

function newItemCarrito(newItem) {
    const inputElemento = tbody.getElementsByClassName('input-element')
    for(let i = 0; i < carrito.length; i++){
        if(carrito[i].title === newItem.title){
            carrito[i].cantidad++;
            const inputValue = inputElemento[i]
            inputValue.value++
            carritoTotal()
            return null;
        }


    }
    carrito.push(newItem);

    renderCarrito();
    
}

function renderCarrito() {
    
    tbody.innerHTML = '';
    carrito.map(item => {
        const tr = document.createElement('tr'); 
        tr.classList.add('itemCarrito');
        const content = `   <th scope="row">1</th>
                            <td class="table-producto">
                                <img src=${item.image} alt="">
                                <h6 class="titulo"> ${item.title}</h6>
                            </td>
                            <td class="table-precio"><p>${item.price}</p></td>
                            <td class="table-cantidad">
                                <input type="number" min="1" value=${item.cantidad} class="input-element">
                                <button class="delete btn "><i class="bi bi-trash-fill"></i></button>
                            </td>`;
        tr.innerHTML = content ;
        tbody.append(tr);
        tr.querySelector(".delete").addEventListener('click',removeItemCarrito);
        tr.querySelector(".input-element").addEventListener('change',sumaCantidad);
    })
    carritoTotal();
} 


function carritoTotal() {
    let total = 0 ;
    const itemCarTotal = document.querySelector('.item-car-total');
    carrito.forEach((item)=>{
        const precio = Number(item.price.replace("$", ''));
        total = total + precio*item.cantidad;
    })
    itemCarTotal.innerHTML =`Total: $${total}`;
    addLocalStorage();
}

function removeItemCarrito(e) {
    const buttonDelete = e.target;
    const tr = buttonDelete.closest(".itemCarrito");
    const title = tr.querySelector('.titulo').textContent;
    for(let i=0; i < carrito.length; i++ ){
        if(carrito[i].title.trim() === title.trim()){
        carrito.splice(i, 1);
        }
    }
    tr.remove();
    carritoTotal()
}

function sumaCantidad(e) {
    const sumaInput = e.target;
    const tr = sumaInput.closest(".itemCarrito");
    const title = tr.querySelector('.titulo').textContent;
    carrito.forEach(item => {
        if(item.title.trim() === title.trim()){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            carritoTotal()
            }
    })
    
    
}

function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
        carrito = storage;
        renderCarrito();
        
    }
}
function addLocalStorageVariables() {
    localStorage.setItem('correoEntrar', correoEntrar);
    localStorage.setItem('codigoID', JSON.stringify(codigoID));
}

window.onload = function(){
    const storageCorreo = localStorage.getItem('correoEntrar');
    if (storageCorreo) {
        correoEntrar = storageCorreo;
    }
    console.log('Correo: ', correoEntrar);
    const storageCodigo = localStorage.getItem('codigoID');
    if (storageCodigo) {
        codigoID = storageCodigo;
    }
    console.log('Codigo: ', codigoID);
}

