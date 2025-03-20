import { tool } from "@langchain/core/tools";
import { z } from 'zod';

const weatherTool = tool(
  async ({ query }) => {
    console.log('query', query);
    // Return an object with a result property
    return { result: `The weather in ${query} is sunny.` };
  },
  {
    name: 'weather',
    description: 'Get the weather in a given location',
    schema: z.object({
      query: z.string().describe('The query to use in search'),
    }),
  }
);

export default weatherTool;