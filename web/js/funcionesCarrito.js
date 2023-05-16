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

