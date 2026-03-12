package io.github.mucsi96.filmtracker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "films")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Film {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private Integer year;

  @Column(nullable = false)
  private String actor1;

  @Column(nullable = false)
  private String actor2;

  @Column(nullable = false)
  private Integer score;
}
