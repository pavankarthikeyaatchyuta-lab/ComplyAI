"""Health check routes."""

from fastapi import APIRouter

from app.schemas.common import ApiResponse

router = APIRouter()


@router.get("/health", response_model=ApiResponse[dict[str, str]])
async def health_check() -> ApiResponse[dict[str, str]]:
    """Return API health status."""
    return ApiResponse(success=True, data={"status": "ok"}, error=None)
