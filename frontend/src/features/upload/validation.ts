import type { FileValidation } from "./types";

const acceptedExtensions = [".pdf", ".png", ".jpg", ".jpeg", ".docx"];
const supportedDocumentSignals = [
  { signal: "drc", documentType: "GST Notice DRC-01" },
  { signal: "gstr", documentType: "GST Notice GSTR-3A" },
  { signal: "asmt", documentType: "GST Notice ASMT-10" },
  { signal: "invoice", documentType: "GST Invoice" },
  { signal: "reminder", documentType: "Tax Reminder" },
  { signal: "notice", documentType: "GST Notice" },
  { signal: "gst", documentType: "GST Document" }
];

export function validateUploadFile(file: File): FileValidation {
  const lowerName = file.name.toLowerCase();
  const hasAcceptedExtension = acceptedExtensions.some((extension) =>
    lowerName.endsWith(extension)
  );

  if (!hasAcceptedExtension) {
    return {
      valid: false,
      reason: "Use PDF, DOCX, PNG, JPG, or JPEG files for compliance upload."
    };
  }

  if (file.size > 12 * 1024 * 1024) {
    return {
      valid: false,
      reason: "File is larger than 12 MB. Compress it or upload a clearer extract."
    };
  }

  const detected = supportedDocumentSignals.find(({ signal }) =>
    lowerName.includes(signal)
  );

  if (!detected) {
    return {
      valid: false,
      reason:
        "This does not look like a supported GST notice, invoice, or tax reminder."
    };
  }

  return {
    valid: true,
    documentType: detected.documentType
  };
}

export function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
