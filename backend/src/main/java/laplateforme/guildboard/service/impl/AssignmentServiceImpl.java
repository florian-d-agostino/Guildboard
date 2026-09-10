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
    Quest quest = questRepository.findById(questId)
            .orElseThrow(() -> new RessourceNotFoundException("Quest not found..." + questId));

    // Character find
    Character character = characterRepository.findById(request.characterId())
            .orElseThrow(() -> new RessourceNotFoundException("Character not found..." + request.characterId()));

    // Quest status
    if (quest.getStatus() != QuestStatus.AVAILABLE){
        throw new BusinessRuleException("Quest is not available ! ");
    }

    // Character status
    if (character.getStatus() != CharacterStatus.READY) {
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

    Assignment assignment = new Assignment();
    assignment.setQuest(quest);
    assignment.setCharacter(character);
    Assignment savedAssignment = assignmentRepository.save(assignment);

    character.setStatus(CharacterStatus.BUSY);
    characterRepository.save(character);

    quest.setStatus(QuestStatus.IN_PROGRESS);
    questRepository.save(quest);

    return assignmentMapper.toResponse(savedAssignment);

}


@Override
public QuestResponse completeQuest(Long questId) {

    // Quest find
    Quest quest = questRepository.findById(questId)
    .orElseThrow(() -> new RessourceNotFoundException("Quest not found with id: " + questId));

    // Quest Status
    if (quest.getStatus() != QuestStatus.IN_PROGRESS) {
    throw new BusinessRuleException("Quest is not in progress !");
}

    // Assignment find
    Assignment assignment = assignmentRepository.findByQuestIdAndCompletedAtIsNull(questId)
    .orElseThrow(() -> new RessourceNotFoundException("Active assignment not found for quest: " + questId));

    // Get Character quest
    Character character = assignment.getCharacter();

    // Completed Assignment
    assignment.setCompletedAt(LocalDateTime.now());
    assignmentRepository.save(assignment);

    // Completed Quest
    quest.setStatus(QuestStatus.COMPLETED);
    Quest savedQuest = questRepository.save(quest);

    // Gold Reward
    character.setWallet(character.getWallet() + quest.getGoldReward());

    // Xp Reward
    character.setXp(character.getXp() + quest.getXpReward());

    // Level Up
    while (character.getXp() >= character.getLvl()* 100) {
   character.setXp(character.getXp() - (character.getLvl() *100));
        character.setLvl(character.getLvl() + 1);
    }    

    // Character free
    character.setStatus(CharacterStatus.READY);
    characterRepository.save(character);

    // DTO request
    return questMapper.toResponse(savedQuest);



}






}
