import logging

from app.models import (
    ChatRequest,
    ChatResponse,
    ExtractRequest,
    ExtractResponse,
    SummarizeRequest,
    SummarizeResponse,
)

logger = logging.getLogger(__name__)


class AgentService:
    """
    Deterministic mock service simulating LLM-style behavior.
    No external model dependency.
    """

    def __init__(self) -> None:
        logger.debug("Initializing AgentService")
        # TODO
        logger.info("AgentService initialized successfully")

    async def chat(self, request: ChatRequest) -> ChatResponse:
        reply = f"[{request.model}] Echo: {request.message}"
        tokens_used = len(request.message.split()) + 5

        return ChatResponse(
            reply=reply,
            model=request.model,
            tokens_used=tokens_used,
        )

    async def summarize(self, request: SummarizeRequest) -> SummarizeResponse:
        logger.debug(
            "Summarizing text into max %d sentences...",
            request.max_sentences,
        )

        summary = "Wow That's a Lotta Words, Too Bad I'm Not Reading Em"

        return SummarizeResponse(
            summary=summary,
            tokens_used=1,
        )

    async def extract(self, request: ExtractRequest) -> ExtractResponse:
        logger.debug(
            "Extracting keys %s from source...",
            request.keys,
        )
        # Some mock data for the Duke Nukem Wikipedia page
        summary = (
            "Duke Nukem is a video game series and media franchise. "
            "The franchise follows the titular Duke Nukem as he battles against a military or extraterrestrial force."
        )
        developer = "Apogee Software/3D Realms"
        publisher = "Apogee Software (1991-1993), FormGen (1996), 2K Games (2011)"

        extracted = {}
        for key in request.keys:
            if key == "summary":
                extracted[key] = summary
            elif key == "developer":
                extracted[key] = developer
            elif key == "publisher":
                extracted[key] = publisher
            else:
                extracted[key] = None

        if request.include_summary is True and "summary" not in extracted:
            extracted["summary"] = summary

        tokens_used = len(extracted) * 2
        return ExtractResponse(extracted=extracted, tokens_used=tokens_used)

    async def cleanup(self) -> None:
        logger.debug("Cleaning up AgentService resources")
        # TODO
        logger.info("AgentService cleanup complete")


agent_service = AgentService()
