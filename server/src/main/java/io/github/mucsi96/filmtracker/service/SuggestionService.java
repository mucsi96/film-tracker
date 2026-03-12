package io.github.mucsi96.filmtracker.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.ai.anthropic.AnthropicChatModel;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;

import io.github.mucsi96.filmtracker.entity.FavoriteActor;
import io.github.mucsi96.filmtracker.entity.Film;
import io.github.mucsi96.filmtracker.entity.Suggestion;
import io.github.mucsi96.filmtracker.model.SuggestionResponse;
import io.github.mucsi96.filmtracker.repository.FavoriteActorRepository;
import io.github.mucsi96.filmtracker.repository.FilmRepository;
import io.github.mucsi96.filmtracker.repository.SuggestionRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SuggestionService {
  private final SuggestionRepository suggestionRepository;
  private final FilmRepository filmRepository;
  private final FavoriteActorRepository favoriteActorRepository;
  private final AnthropicChatModel chatModel;

  public Optional<SuggestionResponse> getSuggestion() {
    return suggestionRepository.findAll().stream()
        .findFirst()
        .map(s -> new SuggestionResponse(s.getId(), s.getTitle(), s.getYear(), s.getReason()));
  }

  public SuggestionResponse generateSuggestion() {
    suggestionRepository.deleteAll();

    List<Film> films = filmRepository.findAll();
    List<FavoriteActor> favoriteActors = favoriteActorRepository.findAll();

    String aiResponse = callAI(films, favoriteActors);
    Suggestion suggestion = parseAiResponse(aiResponse);
    suggestion = suggestionRepository.save(suggestion);

    return new SuggestionResponse(
        suggestion.getId(),
        suggestion.getTitle(),
        suggestion.getYear(),
        suggestion.getReason());
  }

  public void dismissSuggestion() {
    suggestionRepository.deleteAll();
  }

  private String callAI(List<Film> films, List<FavoriteActor> favoriteActors) {
    String systemPrompt = "You are a film recommendation expert. Based on the user's watch history, scores, and preferences, suggest ONE film they should watch next. "
        + "Respond in exactly this format (3 lines, no extra text):\n"
        + "TITLE: <film title>\n"
        + "YEAR: <release year>\n"
        + "REASON: <brief reason for the recommendation>";

    StringBuilder userPrompt = new StringBuilder();

    if (!films.isEmpty()) {
      userPrompt.append("Films I've watched and my scores (1-10):\n");
      films.forEach(f -> userPrompt.append(String.format("- %s (%d) starring %s and %s - Score: %d/10\n",
          f.getTitle(), f.getYear(), f.getActor1(), f.getActor2(), f.getScore())));
    } else {
      userPrompt.append("I haven't watched any films yet.\n");
    }

    if (!favoriteActors.isEmpty()) {
      userPrompt.append("\nMy favorite actors: ");
      userPrompt.append(favoriteActors.stream()
          .map(FavoriteActor::getName)
          .collect(Collectors.joining(", ")));
      userPrompt.append("\n");
    }

    userPrompt.append("\nSuggest a film I should watch next. Do not suggest any film I've already watched.");

    Prompt prompt = new Prompt(List.of(
        new SystemMessage(systemPrompt),
        new UserMessage(userPrompt.toString())));

    return chatModel.call(prompt).getResult().getOutput().getText();
  }

  private Suggestion parseAiResponse(String response) {
    String title = "Unknown";
    int year = 2000;
    String reason = response;

    String[] lines = response.split("\n");
    for (String line : lines) {
      String trimmed = line.trim();
      if (trimmed.startsWith("TITLE:")) {
        title = trimmed.substring(6).trim();
      } else if (trimmed.startsWith("YEAR:")) {
        try {
          year = Integer.parseInt(trimmed.substring(5).trim());
        } catch (NumberFormatException e) {
          year = 2000;
        }
      } else if (trimmed.startsWith("REASON:")) {
        reason = trimmed.substring(7).trim();
      }
    }

    return Suggestion.builder()
        .title(title)
        .year(year)
        .reason(reason)
        .build();
  }
}
