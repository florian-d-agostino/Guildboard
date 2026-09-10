package laplateforme.guildboard.service;



import laplateforme.guildboard.dto.request.AssignCharacterRequest;
import laplateforme.guildboard.dto.response.AssignmentResponse;
import laplateforme.guildboard.dto.response.QuestResponse;



public interface AssignmentService {

    AssignmentResponse assignCharacter(Long questId, AssignCharacterRequest request);

    QuestResponse completeQuest(Long questId);
}
