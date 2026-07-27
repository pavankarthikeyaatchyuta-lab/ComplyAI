export type UploadStatus =
  | "idle"
  | "validating"
  | "uploading"
  | "ocr"
  | "success"
  | "failure";

export type FileValidation = {
  valid: boolean;
  reason?: string;
  documentType?: string;
};

export type RecentUpload = {
  id: string;
  fileName: string;
  documentType: string;
  status: "verified" | "needs_review" | "failed";
  uploadedAt: string;
};
