import { MemorySession } from "@openai/agents";

const sessions = new Map();

export function getSession(userId, agentName){

    const key = `${userId}-${agentName}`;

    if(!sessions.has(key)){

        sessions.set(
            key,
            new MemorySession()
        );

    }

    return sessions.get(key);

}