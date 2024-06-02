package ee.laus.creditscore.service;

import ee.laus.creditscore.exception.EntityNotFoundException;
import ee.laus.creditscore.model.CreditRequest;
import ee.laus.creditscore.model.CreditRequestStatus;
import ee.laus.creditscore.model.CreditResponse;
import ee.laus.creditscore.model.Person;
import ee.laus.creditscore.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CreditScoreService {
    private final PersonRepository personRepository;

    public CreditResponse makeCreditDecision(CreditRequest request) {
        Person person = personRepository.findByPersonalCode(request.personalCode())
                .orElseThrow(EntityNotFoundException::new);
        float creditScore = calculateCreditScore(
                person.getCreditModifier(),
                request.loanAmount(),
                request.loanPeriodInMonths()
        );
        CreditRequestStatus requestStatus = creditScore >= 1f && !person.isDebt() ?
                CreditRequestStatus.APPROVE : CreditRequestStatus.DENY;
        if (requestStatus == CreditRequestStatus.APPROVE) {
            return new CreditResponse(CreditRequestStatus.APPROVE);
        }
        return new CreditResponse(CreditRequestStatus.DENY);
    }

    public float calculateCreditScore(int creditModifier, int loanAmount, int loanPeriodInMonths) {
        return ((float) creditModifier / loanAmount) * loanPeriodInMonths;
    }
}
