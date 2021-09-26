// Collapsible


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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);




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

    let firstMessage = "Hola que tal Bienvenido"
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage +'<button onclick="getResponse()" type="button" class="sc-fnVZcZ gsdXBt input-button sc-laZMeE ljWfRO u-white-space-normal is-emoji-button is-flex-direction-column button" aria-label=""><span class="icon is-marginless is-size-1">🏃</span><span class="input-button-label">¡Vamos! </span></button>' + '</span></p>' + '<p class="botText"><span>' + '<img width="100" height="100" alt="https://media.giphy.com/media/l4EoMoMhvTo2wntsY/giphy.gif" class="Media" src="https://media.giphy.com/media/l4EoMoMhvTo2wntsY/giphy.gif">' + '</span></p>';
    

    
    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();

// Retrieves the response
function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

//Gets the text text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();

    if (userText == "") {
        userText = "Iniciar";
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

}



// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
}

function sendButton() {
    getResponse();
}

function heartButton() {
    buttonSendText("Heart clicked!")
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});