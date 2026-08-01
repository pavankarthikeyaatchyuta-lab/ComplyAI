import { apiGet, apiPost } from "./api";

export type DocumentType = "DRC_01" | "GSTR_3A" | "ASMT_10" | "GST_INVOICE" | "TAX_REMINDER";

export type DocumentMetadata = {
  document_id: string;
  file_name: string;
  document_type: DocumentType;
  mime_type: string;
  size_bytes: number;
  upload_status: string;
};

export type DocumentPreview = {
  document_id: string;
  title: string;
  detected_fields: Record<string, string>;
  preview_text: string;
};

export async function uploadDocument(file: File, documentType: DocumentType) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("document_type", documentType);

  return apiPost<DocumentMetadata>("/api/documents/upload", formData);
}

export function getDocument(documentId: string) {
  return apiGet<DocumentMetadata>(`/api/documents/${documentId}`);
}

export function getDocumentPreview(documentId: string) {
  return apiGet<DocumentPreview>(`/api/documents/${documentId}/preview`);
}

