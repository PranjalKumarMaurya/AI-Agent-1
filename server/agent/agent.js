import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from 'dotenv';


dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",  // or another available Gemini model ID
  temperature: 0,             // configure as needed
  apiKey: process.env.GOOGLE_API_KEY,
});

const agent = createReactAgent({
  llm: model,
  tools: [],  // add any tools if required
});

const result = await agent.invoke({
  messages: [
    {
      role: 'user',
      content: 'Hello, How can you help me?',
    },
  ]
});

console.log(result.messages.at(-1)?.content);
