package laplateforme.guildboard.dto.response;

import java.time.LocalDateTime;

public record AssignmentResponse(
    long id,
    long characterId,
    long questId,
    LocalDateTime assignedAt,
    LocalDateTime completedAt
) {}
