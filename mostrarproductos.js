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
  


 
  function htmlproductos(){

    let storage = JSON.parse(localStorage.getItem("mostrar"));
    titulo.innerHTML+=storage[0].name;
    console.log(titulo);
    console.log("hola")
    var counter = 0;
    var task = firebase.database().ref("productos/");
    task.on("child_added",function(data){
    var taskV = data.val();
  
    con = counter+=1;
  
  
    
    let URL = `${taskV.imagen}`;
    let btn = `btnjarabe${con}`;
    document.getElementById('divmostrarproductos').innerHTML+=`
   <div class="col-md4"><div class="card"><div class="card mb-4 shadow-sm">
          <img class="card-img-top" style=" height:16rem; width:16rem;" src="${URL}"
    alt ="Card image cap">
     <div class="card-body" >
      
         <div align="center">
        
         </div>
      
          <h5 align="center" class="card-title">${taskV.ProductNombre}</h5>
         <h6  align="center" class="card-subtitle mb-2 text-muted">Precio: $  ${taskV.precio}</h6>
         </div>
         </div>
         <div class=" align-item-center">
                       <div class="btn-group">
                           <a type="button" class="btn btn-sm  btn-outline-info" href="cart.html">Comprar</a>
                          <button id="${con}" type="button" class="btn btn-sm btn-outline-secondary">Agregar al carrito</button>
                       </div>
  
               </div> 
          </div>
           </div>`;
          });
  }
function load (){
  htmlproductos()
}