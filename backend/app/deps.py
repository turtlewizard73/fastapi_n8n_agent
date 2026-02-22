# Dependency injection utilities
from fastapi import Request

from app.agent_service import AgentService


def get_agent_service(request: Request) -> AgentService:
    return request.app.state.agent_service
