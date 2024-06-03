import {CreditRequest} from "../model/CreditRequest.ts";

export const useCredit = () => {
  const fetchCreditResponse = (request: CreditRequest): Promise<Response> => {
    return fetch('http://localhost:8080/credit-score', {
      body: JSON.stringify(request),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return { fetchCreditResponse };
}