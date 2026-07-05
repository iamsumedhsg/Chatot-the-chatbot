const query = document.getElementById("userInput");
const button = document.getElementById("sendButton");
const chatBox = document.getElementById("chatBox");
const thinking = document.getElementById("thinking");
const agentTabs = document.querySelectorAll(".agentTab");

const agents = {
    hulku: {
        label: "Hulku",
        greeting: "Hello! I am Hulku. How can I help you today?"
    },
    jarvis: {
        label: "Hitesh Sir",
        greeting: "Haan ji, Hitesh Sir here. Bolo, kya discuss karna hai?"
    },
    sherlock: {
        label: "Piyush Sir",
        greeting: "Piyush bhai here. Right, kya perspective chahiye?"
    }
};

let selectedAgent = localStorage.getItem("selectedAgent") || "hulku";
let userId = localStorage.getItem("userId");

if(!userId){
    userId = crypto.randomUUID();
    localStorage.setItem("userId", userId);
}

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

function setAgent(agent){
    if(!agents[agent]){
        return;
    }

    selectedAgent = agent;
    localStorage.setItem("selectedAgent", selectedAgent);

    agentTabs.forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.agent === selectedAgent);
    });

    const agentInfo = agents[selectedAgent];
    chatBox.innerHTML = "";
    addMessage(agentInfo.greeting, "bot");
    thinking.textContent = `${agentInfo.label.toUpperCase()} IS THINKING...`;
    query.placeholder = `MESSAGE ${agentInfo.label.toUpperCase()}...`;
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
                message,
                userId,
                agent: selectedAgent
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

agentTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        setAgent(tab.dataset.agent);
    });
});

query.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        sendMessage();
    }
});

setAgent(selectedAgent);

