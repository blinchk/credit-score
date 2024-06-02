package ee.laus.creditscore.controller;

import ee.laus.creditscore.model.CreditRequest;
import ee.laus.creditscore.model.CreditResponse;
import ee.laus.creditscore.service.CreditScoreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/credit-score")
@RestController
@RequiredArgsConstructor
public class CreditScoreController {
    private final CreditScoreService creditScoreService;

    @PostMapping
    public CreditResponse makeCreditDecision(@RequestBody @Valid CreditRequest request) {
        return creditScoreService.makeCreditDecision(request);
    }
}
