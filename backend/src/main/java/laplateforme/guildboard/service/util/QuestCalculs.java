package laplateforme.guildboard.service.util;

import java.util.concurrent.ThreadLocalRandom;
import org.springframework.stereotype.Component;
import laplateforme.guildboard.model.enums.QuestDifficulty;

@Component
public class QuestCalculs {
    // RANDOM GENERATOR WITH RANGE
    private int randomInRange(int min, int max) {
        return ThreadLocalRandom.current().nextInt(min, max + 1);
    }

    // MIN LEVEL STATS
    public int calculateMinLvl(QuestDifficulty difficulty) {
        return switch (difficulty) {
            case EASY -> 1;
            case MEDIUM -> randomInRange(1, 10);
            case HARD -> randomInRange(11, 25);
            case EPIC -> randomInRange(26, 100);

        };
    }

    // GOLD REWARDS STATS
    public int calculateGoldReward(QuestDifficulty difficulty) {
        return switch (difficulty) {
            case EASY -> 10 + randomInRange(0, 10);
            case MEDIUM -> 50 + randomInRange(0, 50);
            case HARD -> 250 + randomInRange(0, 250);
            case EPIC -> 1000 + randomInRange(0, 1000);
        };
    }

    // XP REWARD STATS
    public int calculateXpReward(QuestDifficulty difficulty) {
        return switch (difficulty) {
            case EASY -> 100 + randomInRange(0, 100);
            case MEDIUM -> 250 + randomInRange(0, 250);
            case HARD -> 500 + randomInRange(0, 500);
            case EPIC -> 1000 + randomInRange(0, 1000);
        };
    }

    // SUCCESS RATE STATS
    public short calculateSuccessRate(QuestDifficulty difficulty) {
        return (short) switch (difficulty) {
            case EASY -> 100 - randomInRange(0, 10);
            case MEDIUM -> 85 - randomInRange(0, 15);
            case HARD -> 60 - randomInRange(0, 20);
            case EPIC -> 50 - randomInRange(0, 25);
        };
    }

    // COMPLETION TIME STATS
    public short calculateCompletionTime(QuestDifficulty difficulty) {
        return (short) switch (difficulty) {
            case EASY -> 1 + randomInRange(0, 1);
            case MEDIUM -> 3 + randomInRange(0, 3);
            case HARD -> 5 + randomInRange(0, 5);
            case EPIC -> 8 + randomInRange(0, 8);
        };
    }
}