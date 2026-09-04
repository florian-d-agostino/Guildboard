package laplateforme.guildboard.dto.response;

import laplateforme.guildboard.model.enums.*;

public record CharacterResponse(
    long id,
    String name,
    CharacterGender gender,
    CharacterClass characterClass,
    int lvl,
    int xp,
    int wallet,
    short completedQuest,
    short totalQuest,
    CharacterStatus status
) {}
