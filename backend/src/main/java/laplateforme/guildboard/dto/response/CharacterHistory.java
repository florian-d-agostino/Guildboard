package laplateforme.guildboard.dto.response;

import java.time.LocalDateTime;

public record CharacterHistory(
    long id,
    String name,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
