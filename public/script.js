const query = document.getElementById("userInput");
const button = document.getElementById("sendButton");
const chatBox = document.getElementById("chatBox");

function addMessage(text, type){
    const div = document.createElement("div");
    div.classList.add("message");
    div.classList.add(type);
    div.textContent=text;
    chatBox.appendChild(div);
    chatBox.scrollTop=chatBox.scrollHeight;
}

async function sendMessage(){
    const message = query.value;
    if(message === "") return;
    addMessage(message, "user");
    input.value="";
    const response=await fetch("/chat", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            message
        })
    });
    const data=await response.json();

    addMessage(data.reply,"bot");
}


button.addEventListener("click", sendMessage);

query.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        sendMessage();
    }
});
