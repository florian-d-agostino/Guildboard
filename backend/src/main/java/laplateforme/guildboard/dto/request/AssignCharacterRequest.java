package laplateforme.guildboard.dto.request;

import jakarta.validation.constraints.NotNull;

public record AssignCharacterRequest(
        @NotNull(message = "Character ID is required") Long characterId) {
}
