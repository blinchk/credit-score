package ee.laus.creditscore.repository;

import ee.laus.creditscore.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<Person> findByPersonalCode(String personalCode);
}
