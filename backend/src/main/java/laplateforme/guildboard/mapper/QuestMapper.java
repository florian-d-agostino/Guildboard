package laplateforme.guildboard.mapper;

import org.springframework.stereotype.Component;

import laplateforme.guildboard.dto.response.QuestResponse;
import laplateforme.guildboard.model.Quest;

@Component
public class QuestMapper {
    public QuestResponse toResponse(Quest quest) {
        if (quest == null) {
            return null;
        }

        return new QuestResponse(
                quest.getId(),
                quest.getStatus(),
                quest.getTitle(),
                quest.getDescription(),
                quest.getDifficulty(),
                quest.getMinLvl(),
                quest.getGoldReward(),
                quest.getXpReward(),
                quest.getSlots(),
                quest.getSuccessRate(),
                quest.getCompletionTime());
    }

}
