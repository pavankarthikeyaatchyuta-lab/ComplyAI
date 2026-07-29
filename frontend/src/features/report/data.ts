import type { ComplianceReport } from "./types";

export const complianceReport: ComplianceReport = {
  documentType: "GST Notice DRC-01",
  priority: "high",
  deadline: "15 Jul 2026",
  providerUsed: "Groq Llama 3.1 primary + Gemini fallback",
  reviewStatus: "verified",
  immediateActions: [
    {
      id: "action-1",
      title: "Verify notice number, GSTIN, and tax period against GST portal.",
      owner: "Chartered Accountant",
      due: "Today"
    },
    {
      id: "action-2",
      title: "Collect purchase register and relevant invoice annexures.",
      owner: "Business Owner",
      due: "24 hours"
    },
    {
      id: "action-3",
      title: "Prepare response draft and supporting document index.",
      owner: "Compliance Team",
      due: "Before deadline"
    }
  ],
  checklist: [
    { id: "check-1", label: "GSTIN verified", completed: true },
    { id: "check-2", label: "Notice reference captured", completed: true },
    { id: "check-3", label: "Deadline reviewed", completed: true },
    { id: "check-4", label: "Annexure evidence attached", completed: false },
    { id: "check-5", label: "Draft response approved", completed: false }
  ],
  missingInformation: [
    {
      field: "Annexure reference",
      reason: "The uploaded scan mentions supporting annexures but the actual attachment is not included.",
      severity: "required"
    },
    {
      field: "Demand amount confirmation",
      reason: "The extracted amount has medium confidence due to image compression.",
      severity: "critical"
    }
  ],
  draftResponse:
    "To the Proper Officer,\n\nWith reference to the GST Notice DRC-01, the taxpayer respectfully submits that the notice details, tax period, and supporting records have been reviewed. The taxpayer requests consideration of the enclosed reconciliation, invoice records, and supporting annexures before final determination.\n\nThe taxpayer is prepared to provide any additional clarification required by the department within the prescribed timeline.\n\nRegards,\nAuthorized Signatory"
};
