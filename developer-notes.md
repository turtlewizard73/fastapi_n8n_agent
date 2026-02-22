# Notes

## Project structure

- based on: [FastAPI fullstack template](https://github.com/fastapi/full-stack-fastapi-template)
- simplified (based on functionality) -> keep it minimal / only keep necessary
- use uv for python and ruff for linting

## n8n

Localhosted n8n instance with docker compose

- email: mate.laszlo703@gmail.com
- pass: Pass123456

## n8n custom node:

- [Creating custom node](https://docs.n8n.io/integrations/creating-nodes/overview/) -> **declarative style**
  - Uses a JSON-based syntax, making it simpler to write, with less risk of introducing bugs.
  - Is more future-proof.
  - Supports integration with REST APIs.s
- [NasaAPI Tutorial](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node)

- Using custom node with self hosted n8n instance
  https://docs.n8n.io/integrations/creating-nodes/deploy/install-private-nodes/#install-your-node-in-a-docker-n8n-instance
