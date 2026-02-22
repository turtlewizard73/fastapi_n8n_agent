import logging

from fastapi import APIRouter, status
from fastapi.responses import RedirectResponse

router = APIRouter()

logger = logging.getLogger(__name__)


# By default redirect to /docs
@router.get("/")
def redirect_to_docs():
    """Redirect to the API documentation."""
    return RedirectResponse(url="/docs")


@router.get("/ping")
def ping() -> int:
    """Simple health check endpoint to verify that the API is responsive."""
    return status.HTTP_200_OK


@router.get("/hi")
def hi() -> dict[str, str]:
    """Simple endpoint to verify that the API is responsive."""
    return {"message": "Hello from the FastAPI Agent!"}
