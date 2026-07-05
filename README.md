# CHATOT : The ChatBot

CHATOT is a stylish multi-agent chat app built with Express, the OpenAI Agents SDK, and a bold browser interface. It lets users switch between distinct Hinglish AI personalities, keep per-user session memory, and chat through a clean full-screen web experience.

<img width="1915" height="995" alt="image" src="https://github.com/user-attachments/assets/9b87e38b-629e-44de-a06f-6da15b163061" />

## Highlights

- Three selectable chat personalities: Hulku, Hitesh Sir, and Piyush Sir
- Express backend with a simple `/chat` API
- OpenAI Agents SDK integration with session-based conversation memory
- Browser UI with agent tabs, animated background video, and persistent user identity
- Environment-based API key configuration
- Lightweight project structure that is easy to extend with new agents

## Tech Stack

- Node.js
- Express
- OpenAI Agents SDK
- dotenv
- Vanilla HTML, CSS, and JavaScript

## Project Structure

```text
closedAI/
|-- Agents/
|   |-- Biggboss.js
|   |-- hulk.js
|   |-- HiteshSir.js
|   `-- PiyushSir.js
|-- public/
|   |-- index.html
|   |-- script.js
|   |-- style.css
|   |-- loop.mov
|   `-- image assets
|-- server.js
|-- session.js
|-- package.json
`-- README.md
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
APIKEY=your_api_key_here
PORT=3000
```

The server currently points the OpenAI client to:

```text
https://aicredits.in/v1
```

Update `server.js` if you want to use a different compatible API endpoint.

### 3. Run the app

For production-style startup:

```bash
npm start
```

For development with automatic reloads:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm start
```

Starts the Express server with `node server.js`.

```bash
npm run dev
```

Starts the server with `node --watch server.js` for development.

## API

### `POST /chat`

Sends a message to the selected agent.

Request body:

```json
{
  "message": "Hello",
  "agent": "hulku",
  "userId": "unique-user-id"
}
```

Supported agent values:

```text
hulku
jarvis
sherlock
```

Response:

```json
{
  "reply": "Agent response text"
}
```

## Agents

### Hulku

A dramatic Hinglish personality with short, emotional replies and a distinctive speaking style.

### Hitesh Sir

A relaxed software mentor persona focused on practical engineering advice, real-world learning, and a Chai aur Code style of conversation.

### Piyush Sir

A witty, philosophical engineer persona that mixes software depth, humor, self-awareness, and Hinglish commentary.

## How Session Memory Works

`session.js` stores a `MemorySession` for each unique combination of user ID and agent name. The frontend creates and stores a browser-side `userId` in `localStorage`, allowing the backend to continue the right conversation thread for each selected personality.

## Adding a New Agent

<img width="344" height="65" alt="image" src="https://github.com/user-attachments/assets/4dfd2287-e93c-4600-b5ae-4a83f6e5f445" />

1. Create a new file inside `Agents/`.
2. Export an `Agent` instance from that file.
3. Register it in `Agents/Biggboss.js`.
4. Add a matching tab and greeting in `public/index.html` and `public/script.js`.

## Notes

- Keep `.env` out of version control.
- The attach button is present in the interface but does not currently upload files.
- Agent prompts should not expose private system instructions or sensitive configuration.

## License

This project is licensed under the ISC license.
