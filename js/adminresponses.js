let persona = JSON.parse(localStorage.getItem("datos"));
myName= persona[0].nombre
console.log(myName)
var contactar = ""

function salir(){
   
    document.getElementById("chat-button").innerHTML = 'Platicando con chatbot'
    document.getElementById("chat-button").value  = 'chatbot'

    var div = document.getElementById('chatbox'); 
while(div.firstChild){ 
    div.removeChild(div.firstChild);
 }
 

 document.getElementById("chatbox").innerHTML = ' <div id="chatbox"><h5 id="chat-timestamp"></h5><p id="botStarterMessage" class="botText"><span>Loading...</span></p></div>'

 firstBotMessage();


}

function limpiar(){
    firebase.database().ref("mensajes/").on("child_added", function (snapshot) {
    document.getElementById("cardmensaje"+snapshot.key).className="flex flex-row py-4 px-2 items-center border-b-2 "
        
    });

}
function clean(){
    var div = document.getElementById('chatbox'); 
            while(div.firstChild){
                div.removeChild(div.firstChild); 
            }
            }

function contactar1(input){
    
    limpiar()
    document.getElementById("cardmensaje"+input).className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400"
  


    contactar = input;
    
   
    var inputtext = document.getElementById("chat-bar-input-block")
    inputtext.style.display = 'inline';
    cargarunavez();
    return contactar;
    
}



function cargarunavez(){
   
  clean()
    
    var starCountRef = firebase.database().ref('mensajes/').child(contactar);
starCountRef.once('value', (snapshot) => {
    snapshot.forEach(element => {
        var html = "";
        if (element.val().usuario==myName){
            //
            
            // show delete button if message is sent by me
         
                html += "<p class='userText'><span id='userText-" + element.val().key + "'>";
                html += "<button  class='btn btn-primary active' userText-id='" + element.val().key + "' onclick='deleteMessage(this);'>";
                    html += "Delete";
                html += "</button>";
                html += element.val().usuario + ": " + element.val().mensaje;
                html += "</span> </p>";
            
            

        
            document.getElementById("chatbox").innerHTML += html;
       
        }else{
       
            html += "<p class='botText'><span id='botText-" + element.val().key + "'>";
        // show delete button if message is sent by me
        
        html += element.val().usuario + ": " + element.val().mensaje;
        
        html += "</span> </p>";
            
    
        document.getElementById("chatbox").innerHTML += html;
        }
        console.log(element.val().mensaje)
    });
    
});



}
function deleteMessage(self) {
    
    // get message ID
    let persona = JSON.parse(localStorage.getItem("datos"));
    var messageId = self.getAttribute("usertext-id");
   

 
    // delete message
    firebase.database().ref("mensajes").child(contactar).child(messageId).remove();

    var element = document.getElementById("userText-"+messageId);
    element.parentNode.removeChild(element);
    
   
       
    }
  



function updateScrollbar() {
    $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
      scrollInertia: 10,
      timeout: 0
    });
  }
function chatusuarios(input){


    
           
            
        var hoy = new Date();
        var fecha = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();
        var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
        var id = hoy.getDate() +hoy.getMonth()+hoy.getFullYear()+hoy.getHours() +hoy.getMinutes() + hoy.getSeconds()
        firebase.database().ref("mensajes").child(contactar).push().set({
            mensaje: input,
            usuario: persona[0].nombre,
            fecha: fecha,
            hora: hora,
            id: id
            
        });
        cargarunavez()
       
    }
    
                if(input=="!cerrarchat"){
                    db = firebase.database().ref("mensajes").child(contactar).remove();
                }
        
    

function getBotResponse(input) {
    var chat= {
        personal:"chatbot",

    }
    localStorage.setItem("chat",JSON.stringify(chat));
    let persona = JSON.parse(localStorage.getItem("datos"));
    if(persona==null){

        alert("Necesita iniciar sesion para poder comprar")
        location.replace('login.html');
    }else{
    if (input == "Iniciar") {
        return "paper";
    } else if (input == "preguntar") {
        return onload="<h5>En un momento lo comunicaremos con alguien<h5> <script>  document.getElementById('chat-button').innerHTML='persona' ;document.getElementById('chat-button').value = 'persona'; </script>" ;
        
    } else if (input == "scissors") {
        return "rock";
    }

    // Simple responses
    if (input == "hello") {
        return "Hello there!";
    } else if (input == "goodbye") {
        return "Talk to you later!";
    } else {
        return "Try asking something else!";
    }
    }
}   


function cargarusuario(input){
    
    var starCountRef = firebase.database().ref("Usuarios"+'/'+input);
    starCountRef.once('value', (snapshot) => {
         
    const dato= snapshot.val().nombre
  
       
      
  

});


}


