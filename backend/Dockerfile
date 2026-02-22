# https://github.com/fastapi/full-stack-fastapi-template/blob/master/backend/Dockerfile
FROM python:3.14-slim

ENV PYTHONUNBUFFERED=1

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Compile bytecode for better performance
ENV UV_COMPILE_BYTECODE=1

# Use copy mode for better compatibility
ENV UV_LINK_MODE=copy

WORKDIR /app

# Add virtual environment to PATH
ENV PATH="/app/.venv/bin:$PATH"

# Copy dependency files
COPY pyproject.toml ./

# Install dependencies
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync

# Copy application code
COPY ./app ./app

EXPOSE 8000

# CMD ["fastapi", "run", "app/main.py", "--host", "0.0.0.0", "--port", "8000"]
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
