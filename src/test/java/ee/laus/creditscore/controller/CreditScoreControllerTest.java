package ee.laus.creditscore.controller;

import ee.laus.creditscore.model.CreditRequest;
import ee.laus.creditscore.service.CreditScoreService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class CreditScoreControllerTest {
    private CreditScoreController creditScoreController;
    @Mock
    CreditScoreService creditScoreService;

    @BeforeEach
    void setUp() {
        creditScoreController = new CreditScoreController(creditScoreService);
    }

    @Test
    void calculateCreditScore() {
        CreditRequest request = new CreditRequest("49002010965", 2000, 36);
        creditScoreController.makeCreditDecision(request);
        verify(creditScoreService).makeCreditDecision(request);
    }
}