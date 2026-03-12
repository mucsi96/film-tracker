package io.github.mucsi96.filmtracker.model;

public record FilmRequest(
    String title,
    Integer year,
    String actor1,
    String actor2,
    Integer score) {
}
