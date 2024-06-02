package ee.laus.creditscore.service;

import ee.laus.creditscore.model.CreditRequest;
import ee.laus.creditscore.model.CreditRequestStatus;
import ee.laus.creditscore.model.CreditResponse;
import ee.laus.creditscore.model.Person;
import ee.laus.creditscore.repository.PersonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CreditScoreServiceTest {
    private CreditScoreService creditScoreService;
    @Mock
    private PersonRepository personRepository;
    private final static String PERSONAL_CODE = "49002010965";

    @BeforeEach
    void setUp() {
        creditScoreService = Mockito.spy(new CreditScoreService(personRepository));
    }

    @Test
    void makeCreditDecision_resultDeny_whenPersonHasDebt() {
        CreditRequestStatus expected = CreditRequestStatus.DENY;
        int creditModifier = 1000;
        when(personRepository.findByPersonalCode(PERSONAL_CODE)).thenReturn(
                Optional.of(new Person(1L, PERSONAL_CODE, creditModifier, true))
        );
        CreditRequest request = new CreditRequest(PERSONAL_CODE, 2000, 12);
        CreditResponse response = creditScoreService.makeCreditDecision(request);
        assertEquals(expected, response.status());
        verify(creditScoreService).calculateCreditScore(
                creditModifier,
                request.loanAmount(),
                request.loanPeriodInMonths()
        );
    }

    @Test
    void makeCreditDecision_resultDeny() {
        CreditRequestStatus expected = CreditRequestStatus.DENY;
        int creditModifier = 100;
        when(personRepository.findByPersonalCode(PERSONAL_CODE)).thenReturn(
                Optional.of(new Person(1L, PERSONAL_CODE, creditModifier, false))
        );
        CreditRequest request = new CreditRequest(PERSONAL_CODE, 2000, 12);
        CreditResponse response = creditScoreService.makeCreditDecision(request);
        verify(creditScoreService).calculateCreditScore(
                creditModifier,
                request.loanAmount(),
                request.loanPeriodInMonths()
        );
        assertEquals(expected, response.status());
    }

    @Test
    void makeCreditDecision_resultApprove() {
        int creditModifier = 1000;
        CreditRequestStatus expected = CreditRequestStatus.APPROVE;
        when(personRepository.findByPersonalCode(PERSONAL_CODE)).thenReturn(
                Optional.of(new Person(1L, PERSONAL_CODE, creditModifier, false))
        );
        CreditRequest request = new CreditRequest(PERSONAL_CODE, 2000, 12);
        CreditResponse response = creditScoreService.makeCreditDecision(request);
        verify(creditScoreService).calculateCreditScore(
                creditModifier,
                request.loanAmount(),
                request.loanPeriodInMonths()
        );
        assertEquals(expected, response.status());
    }

    @Test
    void calculateCreditScore_lessThan1() {
        float expected = 0.6f;
        float actual = creditScoreService.calculateCreditScore(100, 2000, 12);
        assertEquals(expected, actual);
    }

    @Test
    void calculateCreditScore_equals3() {
        float expected = 3f;
        float actual = creditScoreService.calculateCreditScore(500, 2000, 12);
        assertEquals(expected, actual);
    }

    @Test
    void calculateCreditScore_equals6() {
        double expected = 6f;
        double actual = creditScoreService.calculateCreditScore(1000, 2000, 12);
        assertEquals(expected, actual);
    }
}