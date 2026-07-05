import express from "express";
import "dotenv/config";
import OpenAI from "openai";
import { run, setDefaultOpenAIClient, setTracingDisabled } from "@openai/agents";
import { agents } from "./Agents/Biggboss.js";
import { getSession } from "./session.js";

const app = express();
const PORT = process.env.PORT || 3000;

const client = new OpenAI({
    baseURL: "https://aicredits.in/v1",
    apiKey: process.env.APIKEY
});

setDefaultOpenAIClient(client);
setTracingDisabled(true);

app.use(express.static("public"))
app.use(express.json())

app.post("/chat", async (req, res) => {
    try{
    
    const { message, agent = "hulku", userId } = req.body;
    const selectedAgent = agents[agent];

    if(!selectedAgent){
        return res.status(404).json({
            reply: "Unknown agent"
        });
    }

    if(!message){
        return res.status(400).json({
            reply: "Message is required"
        });
    }

    const session = getSession(userId || req.ip, agent);

    const result = await run(selectedAgent, message, {
        session
    });

    res.json({
        reply: result.finalOutput
    });
    } catch(e){
        console.log(e);
        res.status(500).json({
            reply: "Internal Error"
        });
    }
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})
