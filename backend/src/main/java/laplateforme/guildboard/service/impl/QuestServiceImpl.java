package laplateforme.guildboard.service.impl;

import laplateforme.guildboard.dto.request.CreateQuestRequest;
import laplateforme.guildboard.dto.request.UpdateQuestRequest;
import laplateforme.guildboard.dto.response.QuestResponse;
import laplateforme.guildboard.exception.RessourceNotFoundException;
import laplateforme.guildboard.mapper.QuestMapper;
import laplateforme.guildboard.model.Quest;
import laplateforme.guildboard.model.enums.QuestDifficulty;
import laplateforme.guildboard.model.enums.QuestStatus;
import laplateforme.guildboard.repository.QuestRepository;
import laplateforme.guildboard.service.QuestService;
import laplateforme.guildboard.service.util.QuestCalculs;
import laplateforme.guildboard.exception.BusinessRuleException;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class QuestServiceImpl implements QuestService {

    private final QuestRepository questRepository;
    private final QuestMapper questMapper;
    private final QuestCalculs questCalculs;

    // CONSTRUCTOR
    public QuestServiceImpl(
            QuestRepository questRepository,
            QuestMapper questMapper,
            QuestCalculs questCalculs) {
        this.questRepository = questRepository;
        this.questMapper = questMapper;
        this.questCalculs = questCalculs;
    }

    // GET ALL QUESTS
    @Override
    public List<QuestResponse> getAllQuests(QuestStatus status, QuestDifficulty difficulty) {

        List<Quest> quests;

        if (status != null && difficulty != null) {
            quests = questRepository.findByStatusAndDifficulty(status, difficulty);
        } else if (status != null) {
            quests = questRepository.findByStatus(status);
        } else if (difficulty != null) {
            quests = questRepository.findByDifficulty(difficulty);
        } else {
            quests = questRepository.findAll();
        }

        return quests.stream().map(questMapper::toResponse).toList();
    }

    // GET QUEST BY ID
    @Override
    public QuestResponse getQuestById(Long id) {
        Quest quest = questRepository.findById(id).orElseThrow(
                () -> new RessourceNotFoundException("Quest not found."));
        return questMapper.toResponse(quest);

    }

    // CREATE QUEST
    @Override
    public QuestResponse createQuest(CreateQuestRequest request) {
        if (questRepository.existsByTitle(request.title())) {
            throw new BusinessRuleException("Quest title already exists... ");
        }

        QuestDifficulty difficulty = request.difficulty(); // LOCAL VAR / NO REQUEST REPEAT

        Quest quest = new Quest();
        quest.setStatus(QuestStatus.AVAILABLE);
        quest.setTitle(request.title());
        quest.setDescription(request.description());
        quest.setDifficulty(request.difficulty()); // USE LOCAL VAR
        quest.setMinLvl(questCalculs.calculateMinLvl(difficulty)); // USE LOCAL VAR
        quest.setGoldReward(questCalculs.calculateGoldReward(difficulty)); // USE LOCAL VAR
        quest.setXpReward(questCalculs.calculateXpReward(difficulty)); // USE LOCAL VAR
        quest.setSlots(request.slots());
        quest.setSuccessRate(questCalculs.calculateSuccessRate(difficulty)); // USE LOCAL VAR
        quest.setCompletionTime(questCalculs.calculateCompletionTime(difficulty)); // USE LOCAL VAR

        Quest savedQuest = questRepository.save(quest);
        return questMapper.toResponse(savedQuest);

    }

    // UPDATE QUEST
    @Override
    public QuestResponse updateQuestById(Long id, UpdateQuestRequest request) {
        Quest existingQuest = questRepository.findById(id).orElseThrow(
                () -> new RessourceNotFoundException("Quest not found."));

        if (!existingQuest.getTitle().equals(request.title()) && questRepository.existsByTitle(request.title())) {
            throw new BusinessRuleException("Quest title already exist.");
        }

        QuestDifficulty newDifficulty = request.difficulty();

        existingQuest.setTitle(request.title());
        existingQuest.setDescription(request.description());
        existingQuest.setDifficulty(newDifficulty); // USE LOCAL VAR
        existingQuest.setMinLvl(questCalculs.calculateMinLvl(newDifficulty)); // USE LOCAL VAR
        existingQuest.setGoldReward(questCalculs.calculateGoldReward(newDifficulty)); // USE LOCAL VAR
        existingQuest.setXpReward(questCalculs.calculateXpReward(newDifficulty)); // USE LOCAL VAR
        existingQuest.setSlots(request.slots());
        existingQuest.setSuccessRate(questCalculs.calculateSuccessRate(newDifficulty)); // USE LOCAL VAR
        existingQuest.setCompletionTime(questCalculs.calculateCompletionTime(newDifficulty)); // USE LOCAL VAR

        Quest updatedQuest = questRepository.save(existingQuest);
        return questMapper.toResponse(updatedQuest);

    }

    @Override
    public void deleteQuestById(Long id) {
        Quest existingQuest = questRepository.findById(id).orElseThrow(
                () -> new RessourceNotFoundException("Quest not found."));

        questRepository.delete(existingQuest);
    }
}
