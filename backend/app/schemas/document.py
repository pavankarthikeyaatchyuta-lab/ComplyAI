"""Document upload and metadata schemas."""

from enum import Enum

from pydantic import BaseModel, Field


class DocumentType(str, Enum):
    """Supported compliance document categories."""

    DRC_01 = "DRC_01"
    GSTR_3A = "GSTR_3A"
    ASMT_10 = "ASMT_10"
    GST_INVOICE = "GST_INVOICE"
    TAX_REMINDER = "TAX_REMINDER"


class DocumentMetadata(BaseModel):
    """Metadata for an uploaded document."""

    document_id: str
    file_name: str
    document_type: DocumentType
    mime_type: str
    size_bytes: int = Field(ge=0)
    upload_status: str


class DocumentPreview(BaseModel):
    """Preview-ready document details."""

    document_id: str
    title: str
    detected_fields: dict[str, str]
    preview_text: str
