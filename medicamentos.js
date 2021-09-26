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


var starCountRef = firebase.database().ref('productos/');
starCountRef.on('value', (snapshot) => {
  const data = snapshot.val();
console.log(data);
});


var products=[];
var cartItems=[];
var cart_n=document.getElementById('cart_n');
var jarabeDiv = document.getElementById('jarabeDiv');
var pastillasDiv = document.getElementById('pastillasDiv');
var comprimidosDiv = document.getElementById('comprimidosDiv');
var polvosDiv = document.getElementById('polvosDiv');
var jarabe=[
  {name:'Ambroxol', price:100},
  {name:'jarabe2', price:2},
  {name:'jarabe3', price:3},
  {name:'jarabe4', price:4},
  {name:'jarabe5', price:5},
];
var pastilla=[
  {name:'pastilla1', price:100},
  {name:'pastilla2', price:2},
  {name:'pastilla3', price:3},
  {name:'pastilla4', price:4},
  {name:'pastilla5', price:5},
];
var comprimidos=[
  {name:'comprimidos1', price:1},
  {name:'comprimidos2', price:2},
  {name:'comprimidos3', price:3},
  {name:'comprimidos4', price:4},
  {name:'comprimidos5', price:5},
];
var polvos=[
  {name:'polvos1', price:1},
  {name:'polvos2', price:2},
  {name:'polvos3', price:3},
  {name:'polvos4', price:4},
  {name:'polvos5', price:5},
];

function HTMLjarabe(con){

  let URL = `medicamentos/jarabe/jarabe${con}.jpg`;
  let btn = `btnjarabe${con}`;
  return ` <div class="col-md4"><div class="card mb-4 shadow-sm">
        <img class="card-img-top" style=" height:16rem; width:16rem;" src="${URL}"
  alt ="Card image cap">
   <div class="card-body" >
     </div>
       <div align="center">
      
       </div>
    
        <h5 align="center" class="card-title">${jarabe[con-1].name}</h5>
       <h6  align="center" class="card-subtitle mb-2 text-muted">Precio: $  ${jarabe[con-1].price}</h6>
       <div class=" align-item-center">
                     <div class="btn-group">
                         <a type="button" onclick="cart2('${jarabe[con-1].name}','${jarabe[con-1].price}','${URL}','${con}','${btn}')"class="btn btn-sm  btn-outline-info" href="cart.html">Comprar</a>
                        <button id="${btn}" type="button" onclick="cart('${jarabe[con-1].name}','${jarabe[con-1].price}','${URL}','${con}','${btn}')"class="btn btn-sm btn-outline-secondary">Agregar al carrito</button>
                     </div>

             </div> 
        </div>
         </div>`;
}

function HTMLpastillas(con){
console.log("pastillas")

  let URL = `medicamentos/pastillas/pastilla${con}.jpg`;
  let btn = `btnpastillas${con}`;
  return ` <div class="col-md4"><div class="card mb-4 shadow-sm">
        <img class="card-img-top" style=" height:16rem; width:16rem;" src="${URL}"
  alt ="Card image cap">
   <div class="card-body" >
   
   <h5 align="center" class="card-title">${pastilla[con-1].name}</h5>
   <h6  align="center" class="card-subtitle mb-2 text-muted">Precio: $   ${pastilla[con-1].price}.00</h6>
     </div>
       <div align="center">
       
       </div>
    
       <div class=" align-item-center">
                     <div class="btn-group">
                         <a type="button" onclick="cart2('${pastilla[con-1].name}','${pastilla[con-1].price}','${URL}','${con}','${btn}')"class="btn btn-sm  btn-outline-info" href="cart.html">Comprar</a>
                        <button id="${btn}" type="button" onclick="cart('${pastilla[con-1].name}','${pastilla[con-1].price}','${URL}','${con}','${btn}')"class="btn btn-sm btn-outline-secondary">Agregar al carrito</button>
                     </div>

             </div> 
        </div>
         </div>`;
}

function HTMLcomprimidos(con){


  let URL = `medicamentos/comprimidos/comprimidos${con}.jpg`;
  let btn = `btnmedicamento${con}`;
  return ` <div class="col-md4"><div class="card mb-4 shadow-sm">
        <img class="card-img-top" style=" height:16rem; width:16rem;" src="${URL}"
  alt ="Card image cap">
   <div class="card-body" >
   <h5 align="center" class="card-title">${comprimidos[con-1].name}</h5>
   <h6  align="center" class="card-subtitle mb-2 text-muted">Precio: $  ${comprimidos[con-1].price}.00</h6>
     </div>
       <div align="center">
       
       </div>
    
       
       <div class=" align-item-center">
                     <div class="btn-group">
                         <a type="button" onclick="cart2('${comprimidos[con-1].name}','${comprimidos[con-1].price}','${URL}','${con}','${btn}')"class="btn btn-sm  btn-outline-info" href="cart.html">Comprar</a>
                        <button id="${btn}" type="button" onclick="cart('${comprimidos[con-1].name}','${comprimidos[con-1].price}','${URL}','${con}','${btn}')"class="btn btn-sm btn-outline-secondary">Agregar al carrito</button>
                     </div>

             </div> 
        </div>
         </div>`;
}
function HTMLpolvos(con){


  let URL = `medicamentos/polvos/polvos${con}.jpg`;
  let btn = `btnmedicamento${con}`;
  return ` <div class="col-md4"><div class="card mb-4 shadow-sm">
        <img class="card-img-top" style=" height:16rem; width:16rem;" src="${URL}"
  alt ="Card image cap">
   <div class="card-body" >
   <h5 align="center" class="card-title">${polvos[con-1].name}</h5>
       <h6  align="center" class="card-subtitle mb-2 text-muted">Precio: $  ${polvos[con-1].price}.00</h6>
     </div>
       <div align="center">
       
       </div>
    
        
       <div class=" align-item-center">
                     <div class="btn-group">
                         <a type="button" onclick="cart2('${polvos[con-1].name}','${polvos[con-1].price}','${URL}','${con}','${btn}')"class="btn btn-sm  btn-outline-info" href="cart.html">Comprar</a>
                        <button id="${btn}" type="button" onclick="cart('${polvos[con-1].name}','${polvos[con-1].price}','${URL}','${con}','${btn}')"class="btn btn-sm btn-outline-secondary">Agregar al carrito</button>
                     </div>

             </div> 
        </div>
         </div>`;
}




function animation(){
   alert("producto agragado correctamente");
}
function cart(name,price,url,con,btncart){
var item={
 name: name,
 price:price,
 url:url
}
cartItems.push(item);
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
  cart_n.innerHTML=`[${products.length}]`;
  document.getElementById(btncart).style.display="none";
  animation();

}

function cart2(name,price,url,con,btncart){
  var item={
   name: name,
   price:price,
   url:url
  }
  cartItems.push(item);
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
    cart_n.innerHTML=`[${products.length}]`;
    document.getElementById(btncart).style.display="none";
    animation();
  
  }

function render(){
  for (let index = 1; index <=6; index++) {
    jarabeDiv.innerHTML+=`${HTMLjarabe(index)}`;
    pastillasDiv.innerHTML+=`${HTMLpastillas(index)}`;
  }
  for (let index = 1; index <=6; index++) {
    comprimidosDiv.innerHTML+=`${HTMLcomprimidos(index)}`;
  }
  for (let index = 1; index <=6; index++) {
    polvosDiv.innerHTML+=`${HTMLpolvos(index)}`;
  }if(localStorage.getItem("cart") ==null){

  }else{
    products=JSON.parse(localStorage.getItem("cart"));
  cart_n.innerHTML= `[${products.length}]`;
  }

}
