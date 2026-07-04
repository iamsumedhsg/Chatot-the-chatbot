import express from "express";
import { chat } from "./Agents/hulk.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(express.static("public"))
app.use(express.json())

app.post("/chat", async (req, res) => {
    try{
    
    const { message } = req.body;

    const reply = await chat(message);

    res.json({
        reply
    });
    } catch(e){
        console.log(e);
    }
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})