package io.github.mucsi96.filmtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.mucsi96.filmtracker.entity.Suggestion;

public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {
}
