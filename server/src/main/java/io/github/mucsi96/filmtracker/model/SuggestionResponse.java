package io.github.mucsi96.filmtracker.model;

public record SuggestionResponse(
    Long id,
    String title,
    Integer year,
    String reason) {
}
