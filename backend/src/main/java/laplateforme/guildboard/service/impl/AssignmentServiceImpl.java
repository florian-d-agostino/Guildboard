package laplateforme.guildboard.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

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
    public AssignmentServiceImpl(QuestRepository questRepository, CharacterRepository characterRepository,
            AssignmentRepository assignmentRepository, AssignmentMapper assignmentMapper, QuestMapper questMapper) {
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
        if (quest.getStatus() != QuestStatus.AVAILABLE) {
            throw new BusinessRuleException("Quest is not available ! ");
        }

        // Character status
        if (character.getStatus() != CharacterStatus.READY) {
            throw new BusinessRuleException("Character is not ready !");
        }

        // Character already on this quest
        if (assignmentRepository.existsByQuestIdAndCharacterIdAndCompletedAtIsNull(questId, character.getId())) {
            throw new BusinessRuleException("Character is already assigned to this quest !");
        }

        // Level requierment in Quest (RG1)
        if (character.getLvl() < quest.getMinLvl()) {
            throw new BusinessRuleException("Minimum level required " + quest.getMinLvl());
        }

        // Character is busy (RG2)
        if (assignmentRepository.existsByCharacterIdAndCompletedAtIsNull(character.getId())) {
            throw new BusinessRuleException("Character is busy on another quest ! ");
        }

        // Logic
        Assignment assignment = new Assignment();
        assignment.setQuest(quest);
        assignment.setCharacter(character);
        Assignment savedAssignment = assignmentRepository.save(assignment);

        character.setStatus(CharacterStatus.BUSY);
        character.setTotalQuest((short) (character.getTotalQuest() + 1));
        characterRepository.save(character);

        // Update quest assigned slots
        quest.setAssignedSlots((byte) (quest.getAssignedSlots() + 1));

        // Only start quest if all slots are filled!
        if (quest.getAssignedSlots() >= quest.getSlots()) {
            quest.setStatus(QuestStatus.IN_PROGRESS);
        }
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

        // Assignments find
        List<Assignment> assignments = assignmentRepository.findByQuestIdAndCompletedAtIsNull(questId);
        if (assignments.isEmpty()) {
            throw new RessourceNotFoundException("Active assignment not found for quest: " + questId);
        }

        LocalDateTime now = LocalDateTime.now();

        // Roll against successRate (1 - 100)
        int roll = ThreadLocalRandom.current().nextInt(1, 101);
        boolean isSuccess = roll <= quest.getSuccessRate();

        for (Assignment assignment : assignments) {
            Character character = assignment.getCharacter();

            // Completed Assignment
            assignment.setCompletedAt(now);
            assignmentRepository.save(assignment);

            if (isSuccess) {
                // Gold Reward
                character.setWallet(character.getWallet() + quest.getGoldReward());

                // Xp Reward
                character.setXp(character.getXp() + quest.getXpReward());

                // Level Up
                while (character.getXp() >= character.getLvl() * 100) {
                    character.setXp(character.getXp() - (character.getLvl() * 100));
                    character.setLvl(character.getLvl() + 1);
                }

                // Increment completed quest count on success
                character.setCompletedQuest((short) (character.getCompletedQuest() + 1));
            }

            // Character is free regardless of outcome
            character.setStatus(CharacterStatus.READY);
            characterRepository.save(character);
        }

        // Set status based on outcome
        quest.setStatus(isSuccess ? QuestStatus.COMPLETED : QuestStatus.FAILED);
        Quest savedQuest = questRepository.save(quest);

        // DTO response
        return questMapper.toResponse(savedQuest);

    }

}
