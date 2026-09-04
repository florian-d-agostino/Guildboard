package laplateforme.guildboard.dto.response;

public record QuestResponse(

        private Long id,
        private QuestStatus status,
        private String title,
        private String description,
        private QuestDifficulty difficulty,
        private int minLvl,
        private int goldReward,
        private int xpReward,
        private byte slots,
        private short successRate,
        private short completionTime) {
}
