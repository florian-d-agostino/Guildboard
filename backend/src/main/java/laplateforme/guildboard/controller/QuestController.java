package laplateforme.guildboard.controller;

import java.util.List;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import laplateforme.guildboard.dto.request.AssignCharacterRequest;
import laplateforme.guildboard.dto.request.CreateQuestRequest;
import laplateforme.guildboard.dto.request.UpdateQuestRequest;
import laplateforme.guildboard.dto.response.AssignmentResponse;
import laplateforme.guildboard.dto.response.QuestResponse;
import laplateforme.guildboard.model.enums.QuestDifficulty;
import laplateforme.guildboard.model.enums.QuestStatus;
import laplateforme.guildboard.service.QuestService;
import laplateforme.guildboard.service.AssignmentService;

@RestController
@RequestMapping("/api/quests")
public class QuestController {
    private final QuestService questService;
    private final AssignmentService assignmentService;


    public QuestController(QuestService questService, AssignmentService assignmentService) {
        this.questService = questService;
        this.assignmentService = assignmentService;

    }

    @GetMapping // GET ALL QUESTS
    public ResponseEntity<List<QuestResponse>> getAllQuests(
            @RequestParam(required = false) QuestStatus status,
            @RequestParam(required = false) QuestDifficulty difficulty) {
        List<QuestResponse> quests = questService.getAllQuests(status, difficulty);
        return ResponseEntity.ok(quests);
    }

    @GetMapping("/{id}") // GET A QUEST BY ID
    public ResponseEntity<QuestResponse> getQuestById(@PathVariable Long id) {
        QuestResponse quest = questService.getQuestById(id);
        return ResponseEntity.ok(quest);
    }

    @PostMapping // CREATE A QUEST
    public ResponseEntity<QuestResponse> createQuest(@Valid @RequestBody CreateQuestRequest request) {
        QuestResponse createdQuest = questService.createQuest(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuest);
    }

    @PostMapping("/{id}/assignment") // ASSIGN A CHARACTER TO A QUEST
    public ResponseEntity<AssignmentResponse> assignCharacter(@PathVariable Long id,
            @Valid @RequestBody AssignCharacterRequest request) {
        AssignmentResponse assignment = assignmentService.assignCharacter(id, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(assignment);
    }

    @PostMapping("/{id}/completion") // COMPLETE A QUEST
    public ResponseEntity<QuestResponse> completeQuest(@PathVariable Long id) {
        QuestResponse quest = assignmentService.completeQuest(id);
        return ResponseEntity.ok(quest);
    }

    @PatchMapping("/{id}") // UPDATE A QUEST BY ID
    public ResponseEntity<QuestResponse> updateQuestById(@PathVariable Long id,
            @Valid @RequestBody UpdateQuestRequest request) {
        QuestResponse updatedQuest = questService.updateQuestById(id, request);
        return ResponseEntity.ok(updatedQuest);
    }

    @DeleteMapping("/{id}") // DELETE A QUEST BY ID
    public ResponseEntity<Void> deleteQuestById(@PathVariable Long id) {
        questService.deleteQuestById(id);
        return ResponseEntity.noContent().build();
    }
}
