import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from "n8n-workflow";

export class AgentNodeApi implements ICredentialType {
  name = "AgentNodeApi";
  displayName = "Agent Node API";
  // Uses the link to this tutorial as an example
  // Replace with your own docs links when building your own nodes
  documentationUrl =
    "https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/";
  properties: INodeProperties[] = [
    {
      displayName: "API Key",
      name: "apiKey",
      type: "string",
      default: "",
    },
  ];
  authenticate: IAuthenticateGeneric = {
    type: "generic",
    properties: {
      qs: {
        api_key: "={{$credentials.apiKey}}",
      },
    },
  };
  test: ICredentialTestRequest = {
    request: {
      baseURL: "http://localhost:8000",
      url: "/ping",
    },
  };
}
