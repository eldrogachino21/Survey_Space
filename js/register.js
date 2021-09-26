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


document.getElementById("form").addEventListener("submit",(e)=>{
 
  console.log("firebase cargado ")
  e.preventDefault();
  var tel=getId("telefono");
  var pass=getId("contraseña");
  var conpass = getId("confirmarcontraseña");
  
  var starCountRef = firebase.database().ref('Usuarios/'+tel);
starCountRef.once('value', (snapshot) => {

  if (snapshot.exists()) {
    console.log(snapshot.val());
    const id = snapshot.val().telefono;
    if(id==tel){
      alert("no se ha podido registrar el numero que ingresaste ya existe");
    
    }else{
      
      if(pass==conpass){
        register();
        location.replace('login.html');
      }else{
        alert("las contraseñas no concuerdan")
      }
      
    }
   
  } else {
    if(pass==conpass){
      register();
      location.replace('login.html');
    }else{
      alert("las contraseñas no concuerdan")
    }
  }

  

});
  


  
  
  });
  


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

  
function register(){
  var tel=getId("telefono")
  firebase.database().ref("Usuarios/"+tel).set({
    nombre: getId("nombre"),
    contrase\u00F1a: encrypt(getId("contraseña"), 2),
    telefono: getId("telefono"),
    usuario: "cliente"
  });




  alert("registrado");
  console.log(getId("telefono"));
  document.getElementById("form").reset();

}

  function getId(id){
    return document.getElementById(id).value;
    
  }
    


  $(document).ready(function () {
    $('#contraseña').keyup(function () {
        $('#strengthMessage').html(checkStrength($('#contraseña').val()))
    })
    function checkStrength(password) {
        var strength = 0
        if (password.length < 6) {
            $('#strengthMessage').removeClass()
            $('#strengthMessage').addClass('Short')
            return 'Too short'
        }
        if (password.length > 7) strength += 1
        // If password contains both lower and uppercase characters, increase strength value.
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
        // If it has numbers and characters, increase strength value.
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
        // If it has one special character, increase strength value.
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
        // If it has two special characters, increase strength value.
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
        // Calculated strength value, we can return messages
        // If value is less than 2
        if (strength < 2) {
            $('#strengthMessage').removeClass()
            $('#strengthMessage').addClass('Weak')
            return 'Weak'
        } else if (strength == 2) {
            $('#strengthMessage').removeClass()
            $('#strengthMessage').addClass('Good')
            return 'Good'
        } else {
            $('#strengthMessage').removeClass()
            $('#strengthMessage').addClass('Strong')
            return 'Strong'
        }
    }
});