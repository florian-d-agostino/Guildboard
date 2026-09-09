package laplateforme.guildboard.service;

import java.util.List;
import laplateforme.guildboard.dto.request.CreateCharacterRequest;
import laplateforme.guildboard.dto.request.UpdateCharacterRequest;
import laplateforme.guildboard.dto.response.CharacterHistory;
import laplateforme.guildboard.dto.response.CharacterResponse;


public interface CharacterService {


// GetAllCharacter
List<CharacterResponse> getAllCharacters();


// GetCharacterById
CharacterResponse getCharacterById(Long id);



// CreateCharacter
CharacterResponse createCharacter(CreateCharacterRequest request);



// UpdateCharacter
CharacterResponse updateCharacterById(Long id, UpdateCharacterRequest request);


// DeleteCharacter
void deleteCharacterById(Long id);


// QuestCharacterHistory
List<CharacterHistory> getCharacterHistory(Long characterId);


}