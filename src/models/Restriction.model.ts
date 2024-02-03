export interface Restriction {
  value?: string;
  unit?: "mg/l" | "mg/kg" | "mg/dm";
  type?: "quantum satis" | "ML";
  productCategory: string;
  additiveId: string;
  legislationId: string;
  comment?: string;
}
