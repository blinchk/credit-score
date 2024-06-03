export enum CreditRequestStatus {
  APPROVE = "APPROVE",
  DENY = "DENY"
}

export interface CreditResponse {
  status: CreditRequestStatus;
}