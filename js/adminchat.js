// Collapsible
function render(){
  var inputtext = document.getElementById("chat-bar-input-block")
  inputtext.style.display = 'none';
    let persona = JSON.parse(localStorage.getItem("datos"));

    if(persona==null){
        location.replace('login.html');
    }
    if(persona[0].usuario=="admin" || persona[0].usuario=="soporte"){
        actualizar()
    alert("hola admin " + `${persona[0].nombre}`);
    }else{
        alert("usted no tiene privilegios para estar aqui adios.");
        location.replace('login.html');
    }
  
  localStorage.removeItem("mensajes");
  cargar()
 
cargarchat()
}




function cargarchat() {
    clean()
   
  
    firebase.database().ref("mensajes/").child(contactar).on("child_added", function (snapshot) {






        var html = "";
        
           
        // give each message a unique ID
        if (snapshot.val().usuario==myName){
            //
            
           
         
                html += "<p class='userText'><span id='userText-" + snapshot.key + "'>";
                html += "<button  class='btn btn-primary active' userText-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
                    html += "Delete";
                html += "</button>";
                html += snapshot.val().usuario + ": " + snapshot.val().mensaje;
                html += "</span> </p>";
            
            
        
        
            document.getElementById("chatbox").innerHTML += html;
        
        }else{
        
            html += "<p class='botText'><span id='botText-" + snapshot.key + "'>";
        // show delete button if message is sent by me
        
        html += snapshot.val().usuario + ": " + snapshot.val().mensaje;
        
        html += "</span> </p>";
            
        
        document.getElementById("chatbox").innerHTML += html;
        }
    
    valor=snapshot.val().mensaje
             
        
        
          
        });
    }
  


   
    //cargarchat()


function cargar (){
    
    
    firebase.database().ref("mensajes/").on("child_added", function (snapshot) {
        
        var carrito=[];
            let itemdb= {
                llaves: snapshot.val()
                
             }
            carrito.push(itemdb);
            localStorage.setItem("mensajes", JSON.stringify(carrito));


        
       
//document.getElementById("botones").innerHTML+="<button  class='btn btn-primary active' onclick=contactar1('"+snapshot.key+"')>"+snapshot.key+"</button>"
document.getElementById("botones").innerHTML+=`<div id="cardmensaje${snapshot.key}" onclick="contactar1(${snapshot.key})" class="flex flex-row py-4 px-2 items-center border-b-2">
        <div class="w-1/4">
          <img
            src="https://source.unsplash.com/otT2199XwI8/600x600"
            class="object-cover h-12 w-12 rounded-full"
            alt=""
          />
        </div>
        <div class="w-full">
          <div class="text-lg font-semibold" id=nombre>${snapshot.key}</div>
          <span class="text-gray-500"></span>
        </div>
      </div>`
    
});
    firebase.database().ref("mensajes/").on("child_removed", function (snapshot) {
            
        var div = document.getElementById('botones'); 
while(div.firstChild){ 
    div.removeChild(div.firstChild);
 }
 return;
    });

}
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
}
function actualizar(){

    load()
    let datos1 = JSON.parse(localStorage.getItem("datos"));
    if(datos1[0].usuario=="admin" || datos1[0].usuario=="soporte"){
        document.getElementById("ul").innerHTML+="<li class='nav-item active'><a class='nav-link' href='adminchat.html'>Adminchat <span class='sr-only'>(current)</span></a></li>";
       
    } if(datos1[0].usuario=="admin"){
        document.getElementById("ul").innerHTML+="<li class='nav-item active'><a class='nav-link' href='adminusuarios.html'>Adminusuarios <span class='sr-only'>(current)</span></a></li>";
        document.getElementById("ul").innerHTML+="<li class='nav-item active'><a class='nav-link' href='adminagregarproductos.html'>Admin agregar productos <span class='sr-only'>(current)</span></a></li>";
        
        
      
        
    }
    
    
    
    
    
    
}

var firebaseConfig = {
    apiKey: "AIzaSyD8WXHgN7DP3wGpk6kP4wWt8v3vuWNMkN4",
authDomain: "proyectomodular-6980b.firebaseapp.com",
databaseURL: "https://proyectomodular-6980b-default-rtdb.firebaseio.com",
projectId: "proyectomodular-6980b",
storageBucket: "proyectomodular-6980b.appspot.com",
messagingSenderId: "964515011775",
appId: "1:964515011775:web:247b58a7a5e14f8e0bfa0a",
measurementId: "G-CP7LKM240X"
};

firebase.initializeApp(firebaseConfig);

function inicio(){
    document.getElementById("chat-container").innerHTML = 'Platicando con chatbot'
}


var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}


function firstBotMessage() {
    
   
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + '<img width="100" height="100" alt="https://media.giphy.com/media/l4EoMoMhvTo2wntsY/giphy.gif" class="Media" src="https://media.giphy.com/media/l4EoMoMhvTo2wntsY/giphy.gif">' + '</span></p>';
    

    
    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();


function getHardResponse(userText) {
   
   
        console.log("adentro persona")
        let personResponse=chatusuarios(userText);

        document.getElementById("chat-bar-bottom").scrollIntoView(true);
   
}


function getResponse() {
    
   
    let userText = $("#textInput").val();

    

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
   
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
    var dato=document.getElementById("chat-button");
    
        setTimeout(() => {
            getHardResponse(userText);
        }, 1000)
    
}




function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    
}

function sendButton() {
    getResponse();
}

function heartButton() {
    buttonSendText("Heart clicked!")
}


$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
        
    }
});