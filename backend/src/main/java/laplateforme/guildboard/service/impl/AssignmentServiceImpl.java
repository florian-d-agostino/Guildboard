package laplateforme.guildboard.service.impl;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import laplateforme.guildboard.dto.request.AssignCharacterRequest;
import laplateforme.guildboard.dto.response.AssignmentResponse;
import laplateforme.guildboard.dto.response.QuestResponse;
import laplateforme.guildboard.exception.BusinessRuleException;
import laplateforme.guildboard.exception.RessourceNotFoundException;
import laplateforme.guildboard.mapper.AssignmentMapper;
import laplateforme.guildboard.mapper.QuestMapper;
import laplateforme.guildboard.model.Assignment;
import laplateforme.guildboard.model.Character;
import laplateforme.guildboard.model.Quest;
import laplateforme.guildboard.model.enums.CharacterStatus;
import laplateforme.guildboard.model.enums.QuestStatus;
import laplateforme.guildboard.repository.AssignmentRepository;
import laplateforme.guildboard.repository.CharacterRepository;
import laplateforme.guildboard.repository.QuestRepository;
import laplateforme.guildboard.service.AssignmentService;

@Service
public class AssignmentServiceImpl implements AssignmentService {


private final QuestRepository questRepository;
private final CharacterRepository characterRepository;
private final AssignmentRepository assignmentRepository;
private final AssignmentMapper assignmentMapper;
private final QuestMapper questMapper;


// Constructor
public AssignmentServiceImpl(QuestRepository questRepository, CharacterRepository characterRepository, AssignmentRepository assignmentRepository, AssignmentMapper assignmentMapper, QuestMapper questMapper){
    this.questRepository = questRepository;
    this.characterRepository = characterRepository;
    this.assignmentRepository = assignmentRepository;
    this.assignmentMapper = assignmentMapper;
    this.questMapper = questMapper;
}


@Override
public AssignmentResponse assignCharacter(Long questId, AssignCharacterRequest request) {


// Execptions



    // Quest find
    if (!questRepository.existsById(questId)){
        throw new RessourceNotFoundException("Quest not found..." + questId);
    }

    // Character find
    if (!characterRepository.existsById(request.characterId())){
        throw new RessourceNotFoundException("Character not found..." + request.characterId());
    }

    // Quest status
    if (quest.getStatus() != QuestStatus.AVAILABLE){
        throw new BusinessRuleException("Quest is not available ! ");
    }

    // Character status
    if (!characterRepository.findById(request.characterId()).get().getStatus().equals(CharacterStatus.READY)){
        throw new BusinessRuleException("Character is not ready !");
    }

    // Level requierment in Quest (RG1)
    if (character.getLvl() < quest.getMinLvl()){
        throw new BusinessRuleException("Minimum level required " + quest.getMinLvl());
    }

    // Character is busy (RG2)
    if (assignmentRepository.existsByCharacterIdAndCompletedAtIsNull(character.getId())){
    throw new BusinessRuleException("Character is busy on another quest ! ");


}







// Logic

@Override
public QuestResponse completeQuest(Long questId) {

}





}
