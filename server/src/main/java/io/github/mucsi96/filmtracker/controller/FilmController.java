package io.github.mucsi96.filmtracker.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.mucsi96.filmtracker.model.FilmRequest;
import io.github.mucsi96.filmtracker.model.FilmResponse;
import io.github.mucsi96.filmtracker.service.FilmService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class FilmController {
  private final FilmService filmService;

  @GetMapping("/films")
  public List<FilmResponse> getFilms() {
    return filmService.getFilms();
  }

  @PostMapping("/films")
  public FilmResponse addFilm(@RequestBody FilmRequest request) {
    return filmService.addFilm(request);
  }

  @DeleteMapping("/films/{id}")
  public void deleteFilm(@PathVariable Long id) {
    filmService.deleteFilm(id);
  }
}
