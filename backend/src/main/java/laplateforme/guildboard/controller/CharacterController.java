package laplateforme.guildboard.controller;

import jakarta.validation.Valid;
import org.hibernate.sql.Update;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import laplateforme.guildboard.dto.request.UpdateCharacterRequest;
import laplateforme.guildboard.dto.request.CreateCharacterRequest;
import laplateforme.guildboard.dto.response.CharacterHistory;
import laplateforme.guildboard.dto.response.CharacterResponse;
import laplateforme.guildboard.service.CharacterService;

@RestController
@RequestMapping("/api/characters")
public class CharacterController {
    private final CharacterService characterService;

    public CharacterController(CharacterService characterService) {
        this.characterService = characterService;

    }

    @GetMapping // GET ALL CHARACTERS
    public ResponseEntity<List<CharacterResponse>> getAllCharacters() {
        List<CharacterResponse> characters = characterService.getAllCharacters();
        return ResponseEntity.ok(characters);
    }

    @GetMapping("/{id}") // GET A CHARACTER BY ID
    public ResponseEntity<CharacterResponse> getCharacterById(@PathVariable Long id) {
        CharacterResponse character = characterService.getCharacterById(id);
        return ResponseEntity.ok(character);
    }

    @GetMapping("/{id}/history") // GET CHARACTER HISTORY BY ID
    public ResponseEntity<List<CharacterHistory>> getCharacterHistory(@PathVariable Long id) {
        List<CharacterHistory> history = characterService.getCharacterHistory(id);
        return ResponseEntity.ok(history);
    }

    @PostMapping // CREATE A CHARACTER
    public ResponseEntity<CharacterResponse> createCharacter(@Valid @RequestBody CreateCharacterRequest request) {
        CharacterResponse createdCharacter = characterService.createCharacter(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCharacter);
    }

    @PatchMapping("/{id}") // UPDATE A CHARACTER BY ID
    public ResponseEntity<CharacterResponse> updateCharacterById(@PathVariable Long id,
            @Valid @RequestBody UpdateCharacterRequest request) {
        CharacterResponse updatedCharacter = characterService.updateCharacterById(id, request);
        return ResponseEntity.ok(updatedCharacter);
    }

    @DeleteMapping("/{id}") // DELETE A CHARACTER BY ID
    public ResponseEntity<Void> deleteCharacterById(@PathVariable Long id) {
        characterService.deleteCharacterById(id);
        return ResponseEntity.noContent().build();
    }
}
