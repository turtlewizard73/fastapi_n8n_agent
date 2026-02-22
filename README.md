# fastapi_n8n_agent

A FastAPI backend and custom n8n node for agent workflows.

## Building the agent node:

```bash
cd agent_node
npm i
npm install n8n -g

cd nodes/AgentNode/
npm run build
```

Copy build node into n8n (if n8n instance running needs restart)

```bash
rm -rf n8n/n8n_data/custom/*
cp -r agent_node/dist/nodes n8n/n8n_data/custom
cp -r agent_node/dist/credentials n8n/n8n_data/custom
```
