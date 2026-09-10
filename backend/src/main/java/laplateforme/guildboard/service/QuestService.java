package laplateforme.guildboard.service;

import java.util.List;
import laplateforme.guildboard.dto.request.CreateQuestRequest;
import laplateforme.guildboard.dto.request.UpdateQuestRequest;
import laplateforme.guildboard.dto.response.QuestResponse;
import laplateforme.guildboard.model.enums.QuestDifficulty;
import laplateforme.guildboard.model.enums.QuestStatus;

public interface QuestService {

    // GET ALL QUESTS
    List<QuestResponse> getAllQuests(QuestStatus status, QuestDifficulty difficulty);

    // GET QUEST BY ID
    QuestResponse getQuestById(Long id);

    // CREATE QUEST
    QuestResponse createQuest(CreateQuestRequest request);

    // UPDATE QUEST BY ID
    QuestResponse updateQuestById(Long id, UpdateQuestRequest request);

    // DELETE QUEST BY ID
    void deleteQuestById(Long id);
}