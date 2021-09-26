

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

function chatusuarios(input){
    if(input=="salirchat"){
        salir();
    }

    
    let persona = JSON.parse(localStorage.getItem("datos"));
    myName= persona[0].nombre
    var chat= {
        personal:"personal",

    }
    localStorage.setItem("chat",JSON.stringify(chat));
    if(persona==null){

        alert("Necesita iniciar sesion para poder comprar")
        location.replace('login.html');
    }else{
      
        if(input==""){}else{
        var hoy = new Date();
        var fecha = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();
        var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
        firebase.database().ref("mensajes").child(`${persona[0].telefono}`).push().set({
            mensaje: input,
            usuario: persona[0].nombre,
            fecha: fecha,
            hora: hora,
        });
        
    }
    var div = document.getElementById('chatbox'); 
    while(div.firstChild){ 
        div.removeChild(div.firstChild);
     }
   
     
       firebase.database().ref("mensajes/").child(persona[0].telefono).on("child_added", function (snapshot) {
       
            var html = "";
            console.log()
            // give each message a unique ID
            if (snapshot.val().usuario==myName){
                html += "<p class='userText'><span id='userText-" + snapshot.key + "'>";
                // show delete button if message is sent by me
                if (snapshot.val().usuario == myName) {
                    html += "<button  class='btn btn-primary active' userText-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
                        html += "Delete";
                    html += "</button>";
                }
                html += snapshot.val().usuario + ": " + snapshot.val().mensaje;
                html += "</span> </p>";
    
            
                document.getElementById("chatbox").innerHTML += html;
           
            }else{html += "<p class='botText'><span  botText-id='" + snapshot.key + "'  id='botText-" + snapshot.key + "'>";
            // show delete button if message is sent by me
            if (snapshot.val().usuario == myName) {
                html += "<button  class='btn btn-primary active' botText-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
                    html += "Delete";
                html += "</button>";
            }
            html += snapshot.val().usuario + ": " + snapshot.val().mensaje;
            html += "</span> </p>";

        
            document.getElementById("chatbox").innerHTML += html;
       
                 }
            });
    }
    }




function deleteMessage(self) {
    
    // get message ID
    let persona = JSON.parse(localStorage.getItem("datos"));
    var messageId = self.getAttribute("usertext-id");
   

 
    // delete message
   
    firebase.database().ref("mensajes").child(persona[0].telefono).child(messageId).remove();
    var div = document.getElementById('chatbox'); 
    while(div.firstChild){ 
        div.removeChild(div.firstChild);
     }
       firebase.database().ref("mensajes/").child(`${persona[0].telefono}`).on("child_added", function (snapshot) {
        
            var html = "";
            console.log()
            // give each message a unique ID
            html += "<p class='userText'><span id='"+ snapshot.key + "'>";
            // show delete button if message is sent by me
            if (snapshot.val().usuario == myName) {
                html += "<button userText-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
                    html += "Delete";
                html += "</button>";
            }
            html += snapshot.val().usuario + ": " + snapshot.val().mensaje;
            html += "</span> </p>";

        
            document.getElementById("chatbox").innerHTML += html;
            });
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
        return "<h6>Menu de chat bot <h6> \n 1-Soporte 2-Consulta de medicamentos  </span>";
    } else if (input == "1") {
        return onload=chatusuarios("")+"<h5>En un momento lo comunicaremos con alguien<h5> <script>  document.getElementById('chat-button').innerHTML='persona' ;document.getElementById('chat-button').value = 'persona'; </script>" ;
        
    } else if (input == "2") {
        return " <h5> \n En esta seccion le ayudaremos encontrar un tratamiento adecuado \n [gto1]-inf. Genito-Urinarias Cistitis [gto2]-inf. Genito-Urinarias Pielonefritis mujeres  \n [ts1]-inf. de trasnmision sexual Sifilis \n </h5>" ;
        
    }else if (input == "gto1") {
        return "Cistis (No complicada)  Tratamiento de eleccion  -Nitrofurantoina 100mg  c/8hrs /  -cefalexina 500 c/8hrs " + "<img width='100' height='100' alt='https://media.giphy.com/media/l4EoMoMhvTo2wntsY/giphy.gif' class='Media' src='https://www.fahorro.com/media/catalog/product/cache/6517c62f5899ad6aa0ba23ceb3eeff97/7/5/7502223701601.jpg'></img>" + "<img width='100' height='100' alt='https://media.giphy.com/media/l4EoMoMhvTo2wntsY/giphy.gif' class='Media' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSF78ABq1orz7cGg8Ee5RDSp3vFXvyjt8Haw&usqp=CAU'></img>"
    }else if (input == "gto2") {
        return "Pielonefritis  Tratamiento de eleccion  ciprofloxacina 500mg c/12 hrs / cefixima 400c/24 hrs "+"<img width='100' height='100' alt='https://media.giphy.com/media/l4EoMoMhvTo2wntsY/giphy.gif' class='Media' src='data:image/jpeg;base64,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'></img>" + "<img width='100' height='100' alt='https://media.giphy.com/media/l4EoMoMhvTo2wntsY/giphy.gif' class='Media' src='data:image/jpeg;base64,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'></img>"
    }else if (input == "ts1") {
        return "sifilis Tratamiento de eleccion Penicilina g Benzatinica 2.4 Mui (IM) Unica dosis / Doxiciliclina 100mg c/12 "+" <img width='100' height='100' alt='https://media.giphy.com/media/l4EoMoMhvTo2wntsY/giphy.gif' class='Media' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTTCImTZNuRZ5iPpJ_lfK8AdTb7pDf8KY-Za0G-AMe8uA6IL0kvKTs3C2arrwHsSh4E3A&usqp=CAU'></img>";
        
    }else if (input == "ts2") {
        return "En esta seccion le ayudaremos encontrar un tratamiento adecuado \n 1-inf. Genito-Urinarias \n 2-inf. de trasnmision sexual \n " ;
        
    }
    // Simple responses
    if (input == "genito") {
        return "Hello there!";
    } else if (input == "goodbye") {
        return "Nos vemos luego";
    } else {
        return "Intente de nuevo";
    }
    }
}   
