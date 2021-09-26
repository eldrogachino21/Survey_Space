var config = {
    apiKey: "AIzaSyD8WXHgN7DP3wGpk6kP4wWt8v3vuWNMkN4",
    authDomain: "proyectomodular-6980b.firebaseapp.com",
    databaseURL: "https://proyectomodular-6980b-default-rtdb.firebaseio.com",
    projectId: "proyectomodular-6980b",
    storageBucket: "proyectomodular-6980b.appspot.com",
    messagingSenderId: "964515011775",
    appId: "1:964515011775:web:247b58a7a5e14f8e0bfa0a",
    measurementId: "G-CP7LKM240X"
};
firebase.initializeApp(config);



var titulo = document.getElementById('titulo');
let storage = JSON.parse(localStorage.getItem("mostrar"));

function htmlproductos() {

    let datos1 = JSON.parse(localStorage.getItem("datos"));
    
    
    
    var carrito = [];
    if(datos1 == null){
        console.log("no hay datos")
        usuario.innerHTML += `<a href="login.html">Iniciar Sesion</a>`;

        }else{ 

          usuario.innerHTML += `${datos1[0].nombre}  <a href="index.html"onclick="cerrar()" style="color: red;">Log out</a>   `;  
        }

    var counter = 0;

    con = counter += 1;
    let btn = `btnjarabe${con}`;

    document.getElementById('divmostrarproductos').innerHTML += `
    <div class="card-header">
    <h1 id="titulo" style="color: aliceblue;">${storage[0].name}</h1>
</div>

<div class="card mb-3" style="max-width: 100%; ">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${storage[0].url}" style="width: 100%;" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
        <h5 class="card-title">Descripcion del producto </h5>
          <p class="card-text">${storage[0].descripcion}</p>
          <br>
          <p class="card-text">\n</p>
          
          <button id="${btn}" onclick="cart('${storage[0].name}','${storage[0].price}','${storage[0].url}','${con}','${btn}')" class="btn btn-primary">Agregar al carrito</button>
          <button  onclick="cart2('${storage[0].name}','${storage[0].price}','${storage[0].url}','${con}','${btn}')" class="btn btn-info">$${storage[0].price}</button>
 
        </div>
      </div>
    </div>
  </div>


 
<div class="card-footer text-muted">
  2 days ago
</div>`;
    products = JSON.parse(localStorage.getItem("cart"));
    document.getElementById('cart_n').innerHTML = `[${products.length}]`;
}
var products = [];

function cart(name, price, url, con, btncart) {
    var item = {
        name: name,
        price: price,
        
        url: url
    }
    let persona = JSON.parse(localStorage.getItem("datos"));
    let db = firebase.database().ref("Lista de Carrito/").child("Vista_de_usuario").child(persona[0].telefono).child("producto/").child(`/${name}`);
    var hoy = new Date();
    var fecha = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();
    var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    let itemdb = {
        ProductNombre: name,
        precio: "$" + price,
        cantidad: "1",
        url: url,
        fecha: fecha,
        hora: hora,
        pid: name,
        descuento: ""
    }
    db.set(itemdb);

    /*cartItems.push(item);
    let storage = JSON.parse(localStorage.getItem("cart"));


    if (storage==null) {
      products.push(item);
      localStorage.setItem("cart",JSON.stringify(products));
    }else{
      products= JSON.parse(localStorage.getItem("cart"));
      products.push(item);
      localStorage.setItem("cart",JSON.stringify(products));
    }


      products= JSON.parse(localStorage.getItem("cart"));
      document.getElementById('cart_n').innerHTML=`[${products.length}]`;
     */
    document.getElementById(btncart).style.display = "none";
    actualizar();
    animation();

}

function actualizar(){
    let datos1 = JSON.parse(localStorage.getItem("datos"));
    
    
    
    var carrito = [];
    if(datos1 == null){
      

        }else{ 

          

    var starCountRef = firebase.database().ref("Lista de Carrito/").child("Vista_de_usuario").child(datos1[0].telefono).child("producto/");

    starCountRef.once('value', (snapshot) => {
        
        snapshot.forEach(element => {
            carrito.push(element.val());
        });
 
       localStorage.setItem("cart", JSON.stringify(carrito));
        
       if (localStorage.getItem("cart") == null) {

    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        cart_n.innerHTML = `[${products.length}]`;
    }
       

        
        
    });
    }
}

function cart2(name, price,  url, con, btncart) {
    var item = {
        name: name,
        price: price,
        
        url: url
    }
    let persona = JSON.parse(localStorage.getItem("datos"));
    let db = firebase.database().ref("Lista de Carrito/").child("Vista_de_usuario").child(persona[0].telefono).child("producto/").child(`/${name}`);
    var hoy = new Date();
    var fecha = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();
    var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    let itemdb = {
        ProductNombre: name,
        precio: "$" + price,
        cantidad: "1",
        url: url,
        fecha: fecha,
        hora: hora,
        pid: name,
        descuento: ""
    }
    db.set(itemdb);

    /*cartItems.push(item);
    let storage = JSON.parse(localStorage.getItem("cart"));


    if (storage==null) {
      products.push(item);
      localStorage.setItem("cart",JSON.stringify(products));
    }else{
      products= JSON.parse(localStorage.getItem("cart"));
      products.push(item);
      localStorage.setItem("cart",JSON.stringify(products));
    }


      products= JSON.parse(localStorage.getItem("cart"));
      document.getElementById('cart_n').innerHTML=`[${products.length}]`;
     */
    document.getElementById(btncart).style.display = "none";
    actualizar();
    animation();
    
 location.href="cart.html";
}

function cerrar(){
   
    localStorage.removeItem("datos");
    localStorage.removeItem("cart");
    location.replace('index.html');
   
}

function animation() {
    alert("producto agragado correctamente");
}

function load() {
    htmlproductos()
}