package laplateforme.guildboard.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "character_id", nullable = false)
    private Character character;
    
    @ManyToOne
    @JoinColumn(name = "quest_id", nullable = false)
    private Quest quest;

    @Column(nullable = false)
    private LocalDateTime assignedAt = LocalDateTime.now();

    private LocalDateTime completedAt;



public Assignment() {
}

//---Getters and Setters---


//ID
public Long getId() {
    return id;
}
public void setId(Long id) {
    this.id = id;
}


//Character
public Character getCharacter() {
    return character;
}
public void setCharacter(Character character) {
    this.character = character;
}


//Quest
public Quest getQuest() {
    return quest;
}
public void setQuest(Quest quest) {
    this.quest = quest;
}


//AssignedAt
public LocalDateTime getAssignedAt() {
    return assignedAt;
}
public void setAssignedAt(LocalDateTime assignedAt) {
    this.assignedAt = assignedAt;
}


//CompletedAt
public LocalDateTime getCompletedAt() {
    return completedAt;
}
public void setCompletedAt(LocalDateTime completedAt) {
    this.completedAt = completedAt;
}
}