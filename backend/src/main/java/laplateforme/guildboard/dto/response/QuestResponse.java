package laplateforme.guildboard.dto.response;

import laplateforme.guildboard.model.enums.QuestStatus;
import laplateforme.guildboard.model.enums.QuestDifficulty;

public record QuestResponse(

        Long id,
        QuestStatus status,
        String title,
        String description,
        QuestDifficulty difficulty,
        int minLvl,
        int goldReward,
        int xpReward,
        byte slots,
        short successRate,
        short completionTime) {
}
