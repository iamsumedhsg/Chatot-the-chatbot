const query = document.getElementById("userInput");
const button = document.getElementById("sendButton");
const chatBox = document.getElementById("chatBox");
const thinking = document.getElementById("thinking");

function scrollChatToBottom(){
    requestAnimationFrame(() => {
        chatBox.scrollTo({
            top: chatBox.scrollHeight,
            behavior: "smooth"
        });
    });
}

function addMessage(text, type){
    const div = document.createElement("div");
    div.classList.add("message");
    div.classList.add(type);
    div.textContent=text;
    chatBox.appendChild(div);
    scrollChatToBottom();
}

async function sendMessage(){
    const message = query.value.trim();

    if(message === ""){
        return;
    }

    addMessage(message, "user");
    query.value = "";
    thinking.style.display = "block";

    let response;
    try{
        response = await fetch("/chat", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                message
            })
        });
    } catch(e){
        console.error(e);
        thinking.style.display = "none";
        addMessage("Sorry, an error occurred while sending your message.", "bot");
        return;
    } finally{
        thinking.style.display = "none";
    }

    const data = await response.json();
    console.log(data);
    addMessage(data.reply, "bot");
}


button.addEventListener("click", sendMessage);

query.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        sendMessage();
    }
});


