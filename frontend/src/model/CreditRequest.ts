export interface CreditRequest {
  personalCode: string | null;
  loanAmount: number | undefined;
  loanPeriodInMonths: number | undefined;
}