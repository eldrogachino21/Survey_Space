function chatusuarios(input){
    let persona = JSON.parse(localStorage.getItem("datos"));
    if(persona==null){

        alert("Necesita iniciar sesion para poder comprar")
        location.replace('login.html');
    }else{
   
       
    let db = firebase.database().ref("mensajes/").child(`${persona[0].telefono}`).on("child_added", function (snapshot) {
    var hoy = new Date();
    var fecha = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();
    var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    let itemdb = {
        mensaje: input,
        usuario: persona[0].nombre,
        fecha: fecha,
        hora: hora,
    }
    db.set(itemdb);
    var html = "";
    // give each message a unique ID
    html += "<span id='message-" + snapshot.key + "'>";
    // show delete button if message is sent by me
    if (snapshot.val().sender == myName) {
        html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
            html += "Delete";
        html += "</button>";
    }
    html += snapshot.val().sender + ": " + snapshot.val().message;
    html += "</span>";

    document.getElementById("messages").innerHTML += html;
    });
}
}
function getBotResponse(input) {
    
    if (input == "Iniciar") {
        return "paper";
    } else if (input == "preguntar") {
        return "<h5>En un momento lo comunicaremos con alguien<h5> " ;
        document.getElementById('chat-button').innerHTML='persona'
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


