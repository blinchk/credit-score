package ee.laus.creditscore.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.hibernate.validator.constraints.Length;

public record CreditRequest(
        @Length(min = 11, max = 11, message = "Personal code length must contain exactly 11 digits")
        String personalCode,
        @Min(value = 2000, message = "Loan amount must be at least 2000")
        @Max(value = 10000, message = "Loan amount must be at most 10000")
        Integer loanAmount,
        @Min(value = 12, message = "Loan period must be at least 12 months")
        @Max(value = 60, message = "Loan period must be at most 60 months")
        Integer loanPeriodInMonths
) {
}
