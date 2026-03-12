package io.github.mucsi96.filmtracker.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import io.github.mucsi96.filmtracker.entity.Film;
import io.github.mucsi96.filmtracker.model.FilmRequest;
import io.github.mucsi96.filmtracker.model.FilmResponse;
import io.github.mucsi96.filmtracker.repository.FilmRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FilmService {
  private final FilmRepository filmRepository;

  public List<FilmResponse> getFilms() {
    return filmRepository.findAll(Sort.by(Sort.Direction.DESC, "id")).stream()
        .map(film -> new FilmResponse(
            film.getId(),
            film.getTitle(),
            film.getYear(),
            film.getActor1(),
            film.getActor2(),
            film.getScore()))
        .toList();
  }

  public FilmResponse addFilm(FilmRequest request) {
    Film film = Film.builder()
        .title(request.title())
        .year(request.year())
        .actor1(request.actor1())
        .actor2(request.actor2())
        .score(request.score())
        .build();
    film = filmRepository.save(film);
    return new FilmResponse(
        film.getId(),
        film.getTitle(),
        film.getYear(),
        film.getActor1(),
        film.getActor2(),
        film.getScore());
  }

  public void deleteFilm(Long id) {
    filmRepository.deleteById(id);
  }
}
