import { NodeConnectionTypes } from "n8n-workflow";
import type { INodeType, INodeTypeDescription } from "n8n-workflow";

export class AgentNode implements INodeType {
  description: INodeTypeDescription = {
    // Basic node details will go here
    displayName: "Agent Node",
    name: "agentNode",
    icon: "file:agentnode.svg",
    group: ["transform"],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: "A node to interact with the FastAPI hosted Agent",
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
      baseURL: "http://localhost:8000",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    properties: [
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "Say Hi to FastAPI Agent",
            value: "sayHi",
          },
          // {
          // 	name: 'Mars Rover Photos',
          // 	value: 'marsRoverPhotos',
          // },
        ],
        default: "sayHi",
      },
      // Operations will go here
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["sayHi"],
          },
        },
        options: [
          {
            name: "Get",
            value: "get",
            action: "Say Hi to FastAPI Agent",
            description: "Say Hi to the FastAPI n8n Agent",
            routing: {
              request: {
                method: "GET",
                url: "/hi",
              },
            },
          },
        ],
        default: "get",
      },
      // {
      // 	displayName: 'Operation',
      // 	name: 'operation',
      // 	type: 'options',
      // 	noDataExpression: true,
      // 	displayOptions: {
      // 		show: {
      // 			resource: ['marsRoverPhotos'],
      // 		},
      // 	},
      // 	options: [
      // 		{
      // 			name: 'Get',
      // 			value: 'get',
      // 			action: 'Get Mars Rover photos',
      // 			description: 'Get photos from the Mars Rover',
      // 			routing: {
      // 				request: {
      // 					method: 'GET',
      // 				},
      // 			},
      // 		},
      // 	],
      // 	default: 'get',
      // },
      // {
      // 	displayName: 'Rover name',
      // 	description: 'Choose which Mars Rover to get a photo from',
      // 	required: true,
      // 	name: 'roverName',
      // 	type: 'options',
      // 	options: [
      // 		{ name: 'Curiosity', value: 'curiosity' },
      // 		{ name: 'Opportunity', value: 'opportunity' },
      // 		{ name: 'Perseverance', value: 'perseverance' },
      // 		{ name: 'Spirit', value: 'spirit' },
      // 	],
      // 	routing: {
      // 		request: {
      // 			url: '=/mars-photos/api/v1/rovers/{{$value}}/photos',
      // 		},
      // 	},
      // 	default: 'curiosity',
      // 	displayOptions: {
      // 		show: {
      // 			resource: ['marsRoverPhotos'],
      // 		},
      // 	},
      // },
      // {
      // 	displayName: 'Date',
      // 	description: 'Earth date',
      // 	required: true,
      // 	name: 'marsRoverDate',
      // 	type: 'dateTime',
      // 	default: '',
      // 	displayOptions: {
      // 		show: {
      // 			resource: ['marsRoverPhotos'],
      // 		},
      // 	},
      // 	routing: {
      // 		request: {
      // 			// You've already set up the URL. qs appends the value of the field as a query string
      // 			qs: {
      // 				earth_date: '={{ new Date($value).toISOString().substr(0,10) }}',
      // 			},
      // 		},
      // 	},
      // },
      // Optional/additional fields will go here
      // {
      // 	displayName: 'Additional Fields',
      // 	name: 'additionalFields',
      // 	type: 'collection',
      // 	default: {},
      // 	placeholder: 'Add Field',
      // 	displayOptions: {
      // 		show: {
      // 			resource: ['astronomyPictureOfTheDay'],
      // 			operation: ['get'],
      // 		},
      // 	},
      // 	options: [
      // 		{
      // 			displayName: 'Date',
      // 			name: 'apodDate',
      // 			type: 'dateTime',
      // 			default: '',
      // 			routing: {
      // 				request: {
      // 					// You've already set up the URL. qs appends the value of the field as a query string
      // 					qs: {
      // 						date: '={{ new Date($value).toISOString().substr(0,10) }}',
      // 					},
      // 				},
      // 			},
      // 		},
      // 	],
      // },
    ],
  };
}
