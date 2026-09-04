package laplateforme.guildboard.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import laplateforme.guildboard.model.enums.QuestDifficulty;

public record UpdateQuestRequest(
        @NotBlank(message = "Enter a title") @Size(min = 5, max = 100) String title,

        @NotBlank(message = "Enter a description") @Size(min = 10, max = 500) String description,

        @NotNull(message = "Select difficulty") QuestDifficulty difficulty,

        @PositiveOrZero byte slots) {
}
