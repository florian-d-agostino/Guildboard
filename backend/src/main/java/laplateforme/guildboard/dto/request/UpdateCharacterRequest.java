package laplateforme.guildboard.dto.request;

import jakarta.validation.constraints.*;
import laplateforme.guildboard.model.enums.*;

public record UpdateCharacterRequest(
        @NotBlank
        @Size(min = 2, max = 25)
        String name,

        @NotNull(message = "Make a choice for the gender")
        CharacterGender gender,

        @NotNull(message = "Make a choice for the class")
        CharacterClass characterClass
) {
}