"""Application exceptions and HTTP exception handlers."""

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

from app.schemas.common import ApiError, ApiResponse


class ComplyAIError(Exception):
    """Base exception for expected ComplyAI failures."""

    def __init__(self, code: str, message: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        self.code = code
        self.message = message
        self.status_code = status_code
        super().__init__(message)


def register_exception_handlers(app: FastAPI) -> None:
    """Register JSON exception handlers for expected and unexpected failures."""

    @app.exception_handler(ComplyAIError)
    async def handle_complyai_error(_: Request, exc: ComplyAIError) -> JSONResponse:
        body = ApiResponse[None](
            success=False,
            data=None,
            error=ApiError(code=exc.code, message=exc.message),
        )
        return JSONResponse(status_code=exc.status_code, content=body.model_dump())

    @app.exception_handler(Exception)
    async def handle_unexpected_error(_: Request, exc: Exception) -> JSONResponse:
        body = ApiResponse[None](
            success=False,
            data=None,
            error=ApiError(code="INTERNAL_SERVER_ERROR", message="Unexpected backend error."),
        )
        return JSONResponse(status_code=500, content=body.model_dump())
