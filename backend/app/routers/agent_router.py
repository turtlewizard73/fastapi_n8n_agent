from fastapi import APIRouter, Depends, HTTPException

from app.deps import get_agent_service
from app.models import (
    ChatRequest,
    ChatResponse,
    ExtractRequest,
    ExtractResponse,
    SummarizeRequest,
    SummarizeResponse,
)

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(
    request: ChatRequest,
    agent_service=Depends(get_agent_service),
):
    """Chat with the agent using the specified model and temperature settings."""
    try:
        return await agent_service.chat(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.post("/summarize", response_model=SummarizeResponse)
async def summarize_endpoint(
    request: SummarizeRequest,
    agent_service=Depends(get_agent_service),
):
    """Summarize the given text using the specified model and temperature settings."""
    try:
        return await agent_service.summarize(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.post("/extract", response_model=ExtractResponse)
async def extract_endpoint(
    request: ExtractRequest,
    agent_service=Depends(get_agent_service),
):
    """Extract specified fields from the given text using the agent."""
    try:
        return await agent_service.extract(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
