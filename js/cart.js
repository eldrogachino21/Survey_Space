

var Config = {
    apiKey: "AIzaSyD8WXHgN7DP3wGpk6kP4wWt8v3vuWNMkN4",
    authDomain: "proyectomodular-6980b.firebaseapp.com",
    databaseURL: "https://proyectomodular-6980b-default-rtdb.firebaseio.com",
    projectId: "proyectomodular-6980b",
    storageBucket: "proyectomodular-6980b.appspot.com",
    messagingSenderId: "964515011775",
    appId: "1:964515011775:web:247b58a7a5e14f8e0bfa0a",
    measurementId: "G-CP7LKM240X"
    // PUT YOUR CREDENTIALS HERE
  };
  // Initialize Firebase
  firebase.initializeApp(Config);
var products=JSON.parse(localStorage.getItem('cart'));
var cartitems=[];
var cart_n = document.getElementById('cart_n');
var table = document.getElementById('table');
var hola = document.getElementById('hola');

function cerrar(){
   
    localStorage.removeItem("datos");
    localStorage.removeItem("cart");
    location.replace('index.html');
   
}
var total = 0 ;

function tableHTML(i){
    return`
    
    <tr id=fila${i}>
    <th scope="row">${i+1}</th>
    <td><img style="width:90px;" src="${products[i].url}"></th>
    <td>${products[i].ProductNombre}</td>
    <td>
    
    <select id="select${i}" class="form-select" aria-label="Default select example">
    <option value="${products[i].cantidad}"selected>${products[i].cantidad}</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>

  </select>
    </td>
    <td>$${products[i].precio.replace("$","")}</td>
    <td><button  onclick="editar('${products[i].ProductNombre}','${products[i].url}','${products[i].precio}','${i}')" class="btn btn-info">Editar</button> </td>
    <td><button  onclick="eliminar('${products[i].ProductNombre}','${i}')" class="btn btn-danger">Eliminar</button> </td>
    </tr>
    `
}
function editar (ProductNombre,Producturl,Productprecio,i){

    let obtenerValor = function(e){
        let select = document.querySelector('#select'+i);
        console.log(select.value)
        return select.value

      }
    let persona = JSON.parse(localStorage.getItem("datos"));

    
    
    let db = firebase.database().ref("Lista de Carrito/").child("Vista_de_usuario").child(persona[0].telefono).child("producto/").child(`/`+ProductNombre);
    var hoy = new Date();
    var fecha = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();
    var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    
    let itemdb = {
        ProductNombre: ProductNombre,
        precio:Productprecio,
        cantidad: obtenerValor(),
        url: Producturl,
        fecha: fecha,
        hora: hora,
        pid: ProductNombre,
        descuento: ""
    }
    db.set(itemdb);
    
    location.reload();
}

function eliminar(ProductNombre,i){
    $("#fila" + i).remove();
   
    let persona = JSON.parse(localStorage.getItem("datos"));

    
   db = firebase.database().ref("Lista de Carrito/").child("Vista_de_usuario").child(persona[0].telefono).child(`producto/${ProductNombre}`).remove();

   
    localStorage.removeItem("cart");
    actualizarcarrito();
    total=0;
    table.innerHTML= `
    <tr>
    <th ></th>
    <th ></th>
    <th ></th>
    <th ></th>
    <th ></th>
    </tr> 
    `;
    
    hola.innerHTML=`
    <tr>
    <th ></th>
    <th ></th>
    <th ></th>
    <th ></th>
    <th ></th>
    </tr> 
    `;
    
    
    for (let index = 0; index < products.length; index++) {
        table.innerHTML+=tableHTML(index);
        products[index].precio=products[index].precio.replace("$","");
        
        total=total+parseInt(products[index].precio);
        
    }

 
    
    hola.innerHTML+= `
    <tr>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col" id="totalprecio">Total: $${total}.00</th>
    </tr> 
    <tr>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col">
        <button id="btnClean" onclick="clean()" class="btn btn-warning">Vaciar carrito</button> 
    </th>
    <th scope="col">
    <button id="btnBuy" onclick="buy()" class="btn btn-warning">Comprar</button> 
    </th>
    </tr>
    `;
   
    
}
   


function buy(){
    let persona = JSON.parse(localStorage.getItem("datos"));


    var starCountRef = firebase.database().ref("Direcciones/"+persona[0].telefono);

    starCountRef.once('value', (snapshot) => {
       
        
      
    if(snapshot.val() == null){
        location.replace('agregardireccion.html');
    }else{
    if(snapshot.val().id==persona[0].telefono ){
    

    
var codigopostal = snapshot.val().codigopostal;
var descripcion = snapshot.val().descripcion;
var direccion = snapshot.val().direccion;
var estado = snapshot.val().estado;
var id = snapshot.val().id;
var nombre = snapshot.val().nombre;
var telefono = snapshot.val().telefono;
var pais = snapshot.val().pais;
        var d = new Date();
    var t = d.getTime();
    var counter= t;
    counter+=1;
    let db = firebase.database().ref("Ordenes/"+persona[0].telefono+"/"+counter);
    let itemdb= {
        
        id:counter,
        order:counter-895,
        producto: products,
        total:total,
        codigopostal: codigopostal,
        descripcion: descripcion,
        direccion: direccion,
        estado:estado,
        id:id,
        nombre:nombre,
        telefono:telefono,
        pais:pais
        
    }

    db.set(itemdb);
    alert (`su orden fue hecha!!! \n tu numero de orden es : ${itemdb.order} `);
    clean();

    }else{
        location.replace('agregardireccion.html');
    }
}
    });
    }



function bclean(){
    let persona = JSON.parse(localStorage.getItem("datos"));
    firebase.database().ref("Lista de Carrito/").child("Vista_de_usuario").child(persona[0].telefono).child("producto/").remove();
    
}
   
function clean(){

     
    bclean();
    localStorage.removeItem("cart");
    for (let index = 0; index < products.length; index++) {
        table.innerHTML+=tableHTML(index);
        total= total+parseInt(products[index].price);
        
    }
    total=0;
    table.innerHTML= `
    <tr>
    <th ></th>
    <th ></th>
    <th ></th>
    <th ></th>
    <th ></th>
    </tr> 
    `;
    cart_n.innerHTML='';
    hola.innerHTML=`
    <tr>
    <th ></th>
    <th ></th>
    <th ></th>
    <th ></th>
    <th ></th>
    </tr> 
    `;

    document.getElementById("btnBuy").style.display="none";
    document.getElementById("btnClean").style.display="none";
    


}

function load (){
    let datos1 = JSON.parse(localStorage.getItem("datos"));
    
    var usuario = document.getElementById('usuario');
    
    var carrito = [];
    if(datos1 == null){
        console.log("no hay datos")
        usuario.innerHTML += `<a href="login.html">Iniciar Sesion</a>`;

        }else{ 

          usuario.innerHTML += `${datos1[0].nombre}  <a href="index.html"onclick="cerrar()" style="color: red;">Log out</a>   `;  
        }
}
function cargarcarrito(){
    var datos1 = JSON.parse(localStorage.getItem('datos'));

    var carrito = [];
    if(datos1 == null){
        console.log("no hay datos")
        

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

function render(){
cargarcarrito()
    load();
   
    var datos = JSON.parse(localStorage.getItem('datos'));
    if(datos==null){
        alert("Necesita iniciar sesion para poder comprar")
        location.replace('login.html');
      }
      actualizarcarrito();
    for (let index = 0; index < products.length; index++) {
        table.innerHTML+=tableHTML(index);
        products[index].precio=products[index].precio.replace("$","");
        products[index].precio=parseInt(products[index].precio)*parseInt(products[index].cantidad)
        total=total+parseInt(products[index].precio);
        
    }

    hola.innerHTML+= `
    <tr>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col" id="totalprecio">Total: $${total}.00</th>
    </tr> 
    <tr>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col">
        <button id="btnClean" onclick="clean()" class="btn btn-warning">Vaciar carrito</button> 
    </th>
    <th scope="col">
    <button id="btnBuy" onclick="buy()" class="btn btn-warning">Comprar</button> 
    </th>
    </tr>
    `;
    
}


function actualizarcarrito() {
    var carrito = [];

    let persona = JSON.parse(localStorage.getItem("datos"));
    var starCountRef = firebase.database().ref("Lista de Carrito/").child("Vista_de_usuario").child(persona[0].telefono).child("producto/");

    starCountRef.once('value', (snapshot) => {
        
        snapshot.forEach(element => {
            carrito.push(element.val());
        });
       console.log(carrito);
       localStorage.setItem("cart", JSON.stringify(carrito));
        
       if (localStorage.getItem("cart") == null) {

    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        cart_n.innerHTML = `[${products.length}]`;
    }
       

        
        
    });

}