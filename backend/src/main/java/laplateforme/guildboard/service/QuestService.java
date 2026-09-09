package laplateforme.guildboard.service;

import java.util.List;
import laplateforme.guildboard.dto.request.CreateQuestRequest;
import laplateforme.guildboard.dto.request.UpdateQuestRequest;
import laplateforme.guildboard.dto.response.QuestResponse;

public interface QuestService {

    // GET ALL QUESTS
    List<QuestResponse> getAllQuests();

    // GET QUEST BY ID
    QuestResponse getQuestById(Long id);

    // CREATE QUEST
    QuestResponse createQuest(CreateQuestRequest request);

    // UPDATE QUEST BY ID
    QuestResponse updateQuestById(Long id, UpdateQuestRequest request);

    // DELETE QUEST BY ID
    void deleteQuestById(Long id);
}