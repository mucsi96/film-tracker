package io.github.mucsi96.filmtracker.controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.mucsi96.filmtracker.model.SuggestionResponse;
import io.github.mucsi96.filmtracker.service.SuggestionService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SuggestionController {
  private final SuggestionService suggestionService;

  @GetMapping("/suggestion")
  public Optional<SuggestionResponse> getSuggestion() {
    return suggestionService.getSuggestion();
  }

  @PostMapping("/suggestion/generate")
  public SuggestionResponse generateSuggestion() {
    return suggestionService.generateSuggestion();
  }

  @DeleteMapping("/suggestion")
  public void dismissSuggestion() {
    suggestionService.dismissSuggestion();
  }
}
