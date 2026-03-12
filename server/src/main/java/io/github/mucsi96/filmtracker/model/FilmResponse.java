package io.github.mucsi96.filmtracker.model;

public record FilmResponse(
    Long id,
    String title,
    Integer year,
    String actor1,
    String actor2,
    Integer score) {
}
