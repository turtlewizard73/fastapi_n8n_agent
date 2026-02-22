from typing import Literal

from pydantic import BaseModel, Field


# Chat
class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
    model: Literal["mock-gpt-mini", "mock-gpt-pro"] = "mock-gpt-mini"
    temperature: float = Field(0.7, ge=0, le=1)


class ChatResponse(BaseModel):
    reply: str
    model: str
    tokens_used: int


# Summarize
class SummarizeRequest(BaseModel):
    text: str = Field(
        default="A very long text that needs summarization.",
        min_length=10,
    )
    max_sentences: int = Field(3, ge=1, le=10)


class SummarizeResponse(BaseModel):
    summary: str
    tokens_used: int


#  Extract
class ExtractRequest(BaseModel):
    source: str = Field(
        default="https://en.wikipedia.org/wiki/Duke_Nukem",
        min_length=10,
    )
    keys: list[str] = Field(
        default=["developer", "publisher"],
        min_length=1,
    )
    include_summary: bool = False


class ExtractResponse(BaseModel):
    extracted: dict[str, str | None]
    tokens_used: int
