package io.github.mucsi96.filmtracker.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import io.github.mucsi96.filmtracker.entity.FavoriteActor;
import io.github.mucsi96.filmtracker.model.FavoriteActorRequest;
import io.github.mucsi96.filmtracker.model.FavoriteActorResponse;
import io.github.mucsi96.filmtracker.repository.FavoriteActorRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FavoriteActorService {
  private final FavoriteActorRepository favoriteActorRepository;

  public List<FavoriteActorResponse> getFavoriteActors() {
    return favoriteActorRepository.findAll(Sort.by(Sort.Direction.ASC, "name")).stream()
        .map(actor -> new FavoriteActorResponse(actor.getId(), actor.getName()))
        .toList();
  }

  public FavoriteActorResponse addFavoriteActor(FavoriteActorRequest request) {
    FavoriteActor actor = FavoriteActor.builder()
        .name(request.name())
        .build();
    actor = favoriteActorRepository.save(actor);
    return new FavoriteActorResponse(actor.getId(), actor.getName());
  }

  public void deleteFavoriteActor(Long id) {
    favoriteActorRepository.deleteById(id);
  }
}
