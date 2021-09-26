var config = {
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
firebase.initializeApp(config);


function load (){
    let datos1 = JSON.parse(localStorage.getItem("datos"));
    
    var usuario = document.getElementById('usuario');
    
    var carrito = [];
    if(datos1 == null){
        console.log("no hay datos")
        usuario.innerHTML += `<a style="color: rgb(226, 241, 255);" href="login.html">Iniciar Sesion</a>`;

        }else{ 

          usuario.innerHTML += `<a style="color: rgb(226, 241, 255);"> ${datos1[0].nombre} </a> <a  href="index.html"onclick="cerrar()" style="color: red;">Log out</a>   `;  
        }
        cargar()
      }
      let datos1 = JSON.parse(localStorage.getItem("datos"));
var datos2
      function cargar (){
    
    
        firebase.database().ref("Ordenes/"+datos1[0].telefono).on("child_added", function (snapshot) {
            
            var carrito=[];
                let itemdb= {
                    llaves: snapshot.val()
                    
                 }

                
                carrito.push(itemdb);
                localStorage.setItem("mensajes", JSON.stringify(carrito));
    
    
                
           
    //document.getElementById("botones").innerHTML+="<button  class='btn btn-primary active' onclick=contactar1('"+snapshot.key+"')>"+snapshot.key+"</button>"
    document.getElementById("botones").innerHTML+=`
    <div class="p-4 sm:w-1/4 w-1/2">
        <div " class="bg-indigo-500 rounded-lg p-2 xl:p-6">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">Pedido</h2>
            <p class="leading-relaxed text-gray-100 font-bold">${snapshot.key}</p>
            <p class="leading-relaxed text-gray-100 font-bold">codigo postal :${snapshot.val().codigopostal}</p>
            <p class="leading-relaxed text-gray-100 font-bold">descripcion :${snapshot.val().descripcion}</p>
            <p class="leading-relaxed text-gray-100 font-bold">direccion ${snapshot.val().direccion}</p>
            <p class="leading-relaxed text-gray-100 font-bold">estado${snapshot.val().estado}</p>
            <p class="leading-relaxed text-gray-100 font-bold">estado${snapshot.val().producto}</p>


        </div>
      </div>
    
    `
        
    });
        firebase.database().ref("mensajes/").on("child_removed", function (snapshot) {
                
            var div = document.getElementById('botones'); 
    while(div.firstChild){ 
        div.removeChild(div.firstChild);
     }
     return;
        });
    
    }