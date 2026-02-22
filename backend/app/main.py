import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.agent_service import AgentService
from app.config import settings
from app.router import router

# Set up logging configuration
logging.basicConfig(
    level=logging.DEBUG,
    format="[%(asctime)s] [%(name)s] [%(levelname)s]: %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        logger.info("Starting application initialization...")

        logger.info("Initializing AgentService...")
        app.state.agent_service = AgentService()

        logger.info("Application startup complete - ready to accept requests")

    except Exception as e:
        logger.critical("Failed to initialize services: %s", e, exc_info=True)
        raise

    yield

    try:
        logger.info("Shutting down application...")

        if hasattr(app.state, "agent_service"):
            app.state.agent_service.cleanup()

    except Exception as e:
        logger.error("Error during shutdown: %s", e, exc_info=True)


def create_application() -> FastAPI:
    # Create FastAPI app with lifespan management
    app = FastAPI(
        title=settings.app_title,
        version=settings.app_version,
        description=settings.app_description,
        lifespan=lifespan,
    )

    # Configure CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register API routers
    app.include_router(router)
    return app


# Create the FastAPI application
app = create_application()
