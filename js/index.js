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







function render1(){
  var datos = JSON.parse(localStorage.getItem('datos'));
    if(datos==null){
        
    }else{
      location.replace('index.html');
    }
}



const str = 'thisIsAString';
    const getMap = (legend, shift) => {
       return legend.reduce((charsMap, currentChar, charIndex) => {
          const copy = { ...charsMap };
          let ind = (charIndex + shift) % legend.length;
          if (ind < 0) {
             ind += legend.length;
          };
          copy[currentChar] = legend[ind];
          console.log( copy[currentChar])
          return copy;
       }, {});
    };
    const getMap2 = (legend2, shift) => {
        return legend2.reduce((charsMap, currentChar, charIndex) => {
           const copy = { ...charsMap };
           let ind = (charIndex + shift) % legend2.length;
           if (ind < 0) {
              ind += legend2.length;
           };
           copy[currentChar] = legend2[ind];
           console.log( copy[currentChar])
           return copy;
        }, {});
     };
    const encrypt = (str, shift = 0) => {
        
        
        const legend = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const legend2= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        const map = getMap(legend, shift);
        const map2 = getMap2(legend2,shift);

        
        return str
        .split('')
        .map(char => map[char] || map2[char] || char)
        .join('');
     };
console.log();



var database = firebase.database();

document.getElementById("form").addEventListener("submit",(e)=>{
  console.log("firebase cargado ");
  e.preventDefault();
  var tel=getId("telefono");
  var pass = getId("password");
  var starCountRef = firebase.database().ref("Usuarios"+'/'+tel);
starCountRef.once('value', (snapshot) => {
  const id = snapshot.val().telefono;
  const id2 = snapshot.val().contrase\u00F1a;
  const id3 = snapshot.val().nombre;
  const id4 = snapshot.val().usuario;

  var pr=encrypt(id2,-2);

  if(id==tel && pr == pass){
    datos(id,id3,id4);
   
  alert("ingresaste");
  //Redireccionamiento tras 5 segundos
  

  location.href="index.html";
 
}else{
 alert("los datos no coinciden con los de la cuenta registrada");
}
});

  
  
});
var products=[];
var info=[];



function datos(telefono,nombre,usuario){
  
  var item={
    nombre: nombre,
   telefono:telefono,
   usuario:usuario
  }
  info.push(item);
  let storage = JSON.parse(localStorage.getItem("datos"));
  if (storage==null) {
    products.push(item);
    localStorage.setItem("datos",JSON.stringify(products));
  }else{
    products= JSON.parse(localStorage.clear("datos"));
    products.push(item);
    localStorage.setItem("datos",JSON.stringify(products));
  }
   

  
    

  
  
  }
 

function getId(id){
  return document.getElementById(id).value;
  
}


