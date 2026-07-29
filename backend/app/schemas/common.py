"""Common API response schemas."""

from typing import Generic, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class ApiError(BaseModel):
    """Structured API error body."""

    code: str
    message: str


class ApiResponse(BaseModel, Generic[T]):
    """Standard response envelope used by all API routes."""

    success: bool
    data: T | None
    error: ApiError | None
