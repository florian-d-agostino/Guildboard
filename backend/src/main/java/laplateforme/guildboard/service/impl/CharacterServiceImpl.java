package laplateforme.guildboard.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import laplateforme.guildboard.dto.request.CreateCharacterRequest;
import laplateforme.guildboard.dto.request.UpdateCharacterRequest;
import laplateforme.guildboard.dto.response.CharacterHistory;
import laplateforme.guildboard.dto.response.CharacterResponse;
import laplateforme.guildboard.exception.BuisnessRuleExecption;
import laplateforme.guildboard.exception.RessourceNotFoundException;
import laplateforme.guildboard.mapper.CharacterMapper;
import laplateforme.guildboard.model.Assignment;
import laplateforme.guildboard.model.Character;
import laplateforme.guildboard.model.enums.CharacterStatus;
import laplateforme.guildboard.repository.AssignmentRepository;
import laplateforme.guildboard.repository.CharacterRepository;
import laplateforme.guildboard.service.CharacterService;

@Service
public class CharacterServiceImpl implements CharacterService {


private final CharacterRepository characterRepository;

private final CharacterMapper characterMapper;

private final AssignmentRepository assignmentRepository;

// Constructor
public CharacterServiceImpl(CharacterRepository characterRepository,CharacterMapper characterMapper,AssignmentRepository assignmentRepository){
    this.characterRepository=characterRepository;
    this.characterMapper=characterMapper;
    this.assignmentRepository=assignmentRepository;
}





// GetAllCharacter
@Override
public List<CharacterResponse> getAllCharacters(){
    List<CharacterResponse> reponses = new ArrayList<>();
    for (Character character:characterRepository.findAll()){
        reponses.add(characterMapper.toResponse(character));
    }
    return reponses;
}



// GetCharacterById
@Override
public CharacterResponse getCharacterById(Long id){
    Character character = characterRepository.findById(id)
    .orElseThrow(()-> new
    RessourceNotFoundException("Character not found..."));
    return characterMapper.toResponse(character);
}



// CreateCharacter
@Override
public CharacterResponse createCharacter(CreateCharacterRequest request){
    if (characterRepository.existsByName(request.name())){
        throw new BuisnessRuleExecption("Character name already exists...");
    }
    Character character = new Character();
    character.setName(request.name());
    character.setGender(request.gender());
    character.setCharacterClass(request.characterClass());
    character.setLvl(1);
    character.setXp(0);
    character.setWallet(0);
    character.setStatus(CharacterStatus.READY);

    Character savedCharacter = characterRepository.save(character);
    return characterMapper.toResponse(savedCharacter);
}



// UpdateCharacterById
@Override
public CharacterResponse updateCharacterById(Long id, UpdateCharacterRequest request){
    Character existingCharacter = characterRepository.findById(id)
    .orElseThrow(() -> new RessourceNotFoundException("Character not found..."));

    if (!existingCharacter.getName().equals(request.name()) && characterRepository.existsByName(request.name())) {
        throw new BuisnessRuleExecption("Character name already exists...");
    }

    existingCharacter.setName(request.name());
    existingCharacter.setGender(request.gender());
    existingCharacter.setCharacterClass(request.characterClass());

    Character updatedCharacter = characterRepository.save(existingCharacter);
    return characterMapper.toResponse(updatedCharacter);
}

// DeleteCharacterById
@Override
public void deleteCharacterById(Long id) {
Character existingCharacter = characterRepository.findById(id)
.orElseThrow(() -> new RessourceNotFoundException("Character not found..."));
characterRepository.delete(existingCharacter);
}


// getCharacterHistory
@Override
public List<CharacterHistory> getCharacterHistory(Long characterId){
    if (!characterRepository.existsById(characterId)) {
        throw new RessourceNotFoundException("Character not found...");
    }

    List<Assignment> assignments = assignmentRepository.findByCharacterId(characterId);
    List<CharacterHistory> history = new ArrayList<>();

    for (Assignment assignment : assignments) {
        history.add(new CharacterHistory(
            assignment.getId(),
            assignment.getQuest().getTitle(),
            assignment.getAssignedAt(),
            assignment.getCompletedAt()
        ));
    }

    return history;
}
}
