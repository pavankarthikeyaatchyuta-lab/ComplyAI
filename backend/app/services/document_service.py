"""Document intake service."""

from uuid import uuid4

from fastapi import UploadFile

from app.core.config import Settings
from app.core.errors import ComplyAIError
from app.schemas.document import DocumentMetadata, DocumentPreview, DocumentType


class DocumentService:
    """Handle document validation and metadata creation."""

    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    async def upload_document(
        self,
        file: UploadFile,
        document_type: DocumentType,
    ) -> DocumentMetadata:
        """Validate and register an uploaded compliance document."""
        if not file.filename:
            raise ComplyAIError("MISSING_FILE_NAME", "Uploaded file must have a filename.")

        allowed_extensions = (".pdf", ".png", ".jpg", ".jpeg", ".docx")
        if not file.filename.lower().endswith(allowed_extensions):
            raise ComplyAIError(
                "UNSUPPORTED_FILE_TYPE",
                "Supported files are PDF, DOCX, PNG, JPG, and JPEG.",
            )

        content = await file.read()
        if len(content) > 12 * 1024 * 1024:
            raise ComplyAIError("FILE_TOO_LARGE", "File must be 12 MB or smaller.")

        return DocumentMetadata(
            document_id=f"doc_{uuid4().hex[:12]}",
            file_name=file.filename,
            document_type=document_type,
            mime_type=file.content_type or "application/octet-stream",
            size_bytes=len(content),
            upload_status="accepted",
        )

    def get_document(self, document_id: str) -> DocumentMetadata:
        """Return placeholder document metadata for scaffolded development."""
        return DocumentMetadata(
            document_id=document_id,
            file_name="sample-drc-01-notice.pdf",
            document_type=DocumentType.DRC_01,
            mime_type="application/pdf",
            size_bytes=248_000,
            upload_status="accepted",
        )

    def get_preview(self, document_id: str) -> DocumentPreview:
        """Return a preview object for the requested document."""
        return DocumentPreview(
            document_id=document_id,
            title="DRC-01 Notice Preview",
            detected_fields={
                "GSTIN": "Detected",
                "Notice Type": "DRC-01",
                "Deadline": "15 Jul 2026",
            },
            preview_text="Preview scaffold for uploaded GST compliance document.",
        )
