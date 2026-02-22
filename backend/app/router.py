import logging

from fastapi import APIRouter, status
from fastapi.responses import RedirectResponse

router = APIRouter()

logger = logging.getLogger(__name__)


# By default redirect to /docs
@router.get("/")
def redirect_to_docs():
    return RedirectResponse(url="/docs")


@router.get("/ping")
def ping() -> int:
    return status.HTTP_200_OK
