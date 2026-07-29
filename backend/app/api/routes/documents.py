"""Document API routes."""

from fastapi import APIRouter, Depends, File, Form, UploadFile

from app.api.deps import get_document_service
from app.schemas.common import ApiResponse
from app.schemas.document import DocumentMetadata, DocumentPreview, DocumentType
from app.services.document_service import DocumentService

router = APIRouter()


@router.post("/upload", response_model=ApiResponse[DocumentMetadata])
async def upload_document(
    document_type: DocumentType = Form(...),
    file: UploadFile = File(...),
    service: DocumentService = Depends(get_document_service),
) -> ApiResponse[DocumentMetadata]:
    """Upload and validate a compliance document."""
    metadata = await service.upload_document(file=file, document_type=document_type)
    return ApiResponse(success=True, data=metadata, error=None)


@router.get("/{document_id}", response_model=ApiResponse[DocumentMetadata])
async def get_document(
    document_id: str,
    service: DocumentService = Depends(get_document_service),
) -> ApiResponse[DocumentMetadata]:
    """Return uploaded document metadata."""
    document = service.get_document(document_id)
    return ApiResponse(success=True, data=document, error=None)


@router.get("/{document_id}/preview", response_model=ApiResponse[DocumentPreview])
async def get_document_preview(
    document_id: str,
    service: DocumentService = Depends(get_document_service),
) -> ApiResponse[DocumentPreview]:
    """Return preview-ready document data."""
    preview = service.get_preview(document_id)
    return ApiResponse(success=True, data=preview, error=None)
