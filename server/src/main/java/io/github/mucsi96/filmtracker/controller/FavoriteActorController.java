package io.github.mucsi96.filmtracker.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.mucsi96.filmtracker.model.FavoriteActorRequest;
import io.github.mucsi96.filmtracker.model.FavoriteActorResponse;
import io.github.mucsi96.filmtracker.service.FavoriteActorService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class FavoriteActorController {
  private final FavoriteActorService favoriteActorService;

  @GetMapping("/favorite-actors")
  public List<FavoriteActorResponse> getFavoriteActors() {
    return favoriteActorService.getFavoriteActors();
  }

  @PostMapping("/favorite-actors")
  public FavoriteActorResponse addFavoriteActor(@RequestBody FavoriteActorRequest request) {
    return favoriteActorService.addFavoriteActor(request);
  }

  @DeleteMapping("/favorite-actors/{id}")
  public void deleteFavoriteActor(@PathVariable Long id) {
    favoriteActorService.deleteFavoriteActor(id);
  }
}
