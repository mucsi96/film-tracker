package io.github.mucsi96.filmtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.mucsi96.filmtracker.entity.Film;

public interface FilmRepository extends JpaRepository<Film, Long> {
}
