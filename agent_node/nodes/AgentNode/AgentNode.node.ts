import { NodeConnectionTypes } from "n8n-workflow";
import type { INodeType, INodeTypeDescription } from "n8n-workflow";

export class AgentNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Agent Node",
    name: "agentNode",
    icon: "file:agentnode.png",
    group: ["transform"],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description:
      "Interact with the FastAPI-hosted Agent (chat, summarize, extract).",
    defaults: {
      name: "Agent Node",
    },
    usableAsTool: true,
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [
      {
        name: "AgentNodeApi",
        required: true,
      },
    ],
    requestDefaults: {
      // In Docker compose use http://fastapi:8000, local dev can use http://localhost:8000
      baseURL: "http://fastapi:8000",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },

    properties: [
      // Resource selection
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          { name: "Chat", value: "chat" },
          { name: "Summarize", value: "summarize" },
          { name: "Extract", value: "extract" },
        ],
        default: "chat",
      },

      // -------------------------
      // CHAT operation fields
      // -------------------------
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: { show: { resource: ["chat"] } },
        options: [
          {
            name: "Chat",
            value: "chat",
            description: "Send a chat message to the agent",
            action: "Chat with Agent",
            routing: {
              request: {
                method: "POST",
                url: "/agent/chat",
                // build request body from parameters
                body: "={{ { message: $parameter.message, model: $parameter.model, temperature: $parameter.temperature } }}",
              },
            },
          },
        ],
        default: "chat",
      },
      {
        displayName: "Message",
        name: "message",
        type: "string",
        placeholder: "Hello!",
        required: true,
        default: "",
        displayOptions: { show: { resource: ["chat"] } },
      },
      {
        displayName: "Model",
        name: "model",
        type: "options",
        options: [
          { name: "mock-gpt-mini", value: "mock-gpt-mini" },
          { name: "mock-gpt-pro", value: "mock-gpt-pro" },
        ],
        default: "mock-gpt-mini",
        displayOptions: { show: { resource: ["chat"] } },
      },
      {
        displayName: "Temperature",
        name: "temperature",
        type: "number",
        typeOptions: { minValue: 0, maxValue: 1, numberPrecision: 2 },
        default: 0.7,
        description: "0 = deterministic, 1 = more random",
        displayOptions: { show: { resource: ["chat"] } },
      },

      // -------------------------
      // SUMMARIZE operation fields
      // -------------------------
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: { show: { resource: ["summarize"] } },
        options: [
          {
            name: "Summarize",
            value: "summarize",
            action: "Summarize text",
            description: "Summarize a long text with a sentence limit",
            routing: {
              request: {
                method: "POST",
                url: "/agent/summarize",
                body: "={{ { text: $parameter.text, max_sentences: Number($parameter.max_sentences) } }}",
              },
            },
          },
        ],
        default: "summarize",
      },
      {
        displayName: "Text to summarize",
        name: "text",
        type: "string",
        typeOptions: { rows: 6 },
        default: "A very long text that needs summarization.",
        required: true,
        displayOptions: { show: { resource: ["summarize"] } },
      },
      {
        displayName: "Max sentences",
        name: "max_sentences",
        type: "number",
        typeOptions: { minValue: 1, maxValue: 10 },
        default: 3,
        description: "Limit of sentences in the summary",
        displayOptions: { show: { resource: ["summarize"] } },
      },

      // -------------------------
      // EXTRACT operation fields
      // -------------------------
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: { show: { resource: ["extract"] } },
        options: [
          {
            name: "Extract",
            value: "extract",
            action: "Extract structured fields",
            description: "Extract keys from the given source or text",
            routing: {
              request: {
                method: "POST",
                url: "/agent/extract",
                // keys will be passed as array; split CSV on client if needed
                body: '={{ { source: $parameter.source, keys: ($parameter.keys || "").split(",").map(k => k.trim()).filter(Boolean) } }}',
              },
            },
          },
        ],
        default: "extract",
      },
      {
        displayName: "Source (URL or text)",
        name: "source",
        type: "string",
        placeholder: "https://en.wikipedia.org/...",
        default: "https://en.wikipedia.org/wiki/Duke_Nukem",
        required: true,
        displayOptions: { show: { resource: ["extract"] } },
      },
      {
        displayName: "Keys (comma-separated)",
        name: "keys",
        type: "string",
        default: "developer, publisher",
        description: "List of fields to extract, comma-separated",
        required: true,
        displayOptions: { show: { resource: ["extract"] } },
      },
      {
        displayName: "Additional Options",
        name: "additionalFields",
        type: "collection",
        placeholder: "Add Option",
        default: {},
        displayOptions: {
          show: {
            resource: ["extract"],
            operation: ["extract"],
          },
        },
        options: [
          {
            displayName: "Include Summary",
            name: "include_summary",
            type: "boolean",
            default: false,
            description: "Include a short summary in the extracted output",
            routing: {
              request: {
                body: {
                  include_summary: "={{$value === true ? true : undefined}}",
                },
              },
            },
          },
        ],
      },

      // -------------------------
      // Output options / debugging
      // -------------------------
      {
        displayName: "Return full response",
        name: "rawOutput",
        type: "boolean",
        default: false,
        description:
          "If true, the node returns the full API JSON. Otherwise it returns cleaned fields (reply/summary/extracted).",
        // routing: {
        //   output: {
        //     postReceive: [
        //       {
        //         type: "set",
        //         properties: {
        //           reply: "={{$json.reply}}",
        //           model: "={{$json.model}}",
        //           tokens_used: "={{$json.tokens_used}}",
        //         },
        //         condition: "={{!$parameter.rawOutput}}",
        //       },
        //     ],
        //   },
        // },
      },
    ],
  };
}
