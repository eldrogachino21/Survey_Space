
var pais=document.getElementById("pais").value;
var estado =  document.getElementById("estado").value;
var nombre =document.getElementById("nombre").value;
var direccion = document.getElementById("direccion").value;
var descripcion = document.getElementById("descripcion").value;
var codigopostal = document.getElementById("codigopostal").value;
var telefono = document.getElementById("telefono").value;




function render(){
    
    let datos1 = JSON.parse(localStorage.getItem("datos"));
    
    var usuario = document.getElementById('usuario');
    
    
    if(datos1 == null){
        console.log("no hay datos")
        usuario.innerHTML += `<a href="login.html">Iniciar Sesion</a>`;
        alert("Necesita iniciar sesion para poder comprar")
        location.replace('login.html');
        }else{ 

          usuario.innerHTML += `${datos1[0].nombre}  <a href="index.html"onclick="cerrar()" style="color: red;">Log out</a>   `;  
        
        }
}
function getId(id){
    return document.getElementById(id).value;
    
  }
    
document.getElementById("form").addEventListener("submit",(e)=>{
    let datos1 = JSON.parse(localStorage.getItem("datos"));
    console.log("firebase cargado ")
    e.preventDefault();
    var pais=getId("pais")
    var estado=getId("estado")
    var nombre=getId("nombre")
    var direccion=getId("direccion")
    var codigopostal=getId("codigopostal")
    var descripcion=getId("descripcion")
    var telefono=getId("telefono")
    let persona = JSON.parse(localStorage.getItem("datos"));
    let db = firebase.database().ref("Direcciones/"+persona[0].telefono);
    let itemdb= {
        id:datos1[0].telefono,
        pais : pais,
        estado: estado ,
        nombre: nombre, 
        direccion:direccion,
        descripcion:descripcion,
        codigopostal:codigopostal,
        telefono:telefono
    }
    console.log(itemdb)
    console.log(db.set(itemdb));
    
    alert (`Su direccion fue agragado con exito `);

  
    
 
  });


function registrar(){

    location.replace('cart.html');

   
}