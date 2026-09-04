package laplateforme.guildboard.dto.request;

import jakarta.validation.constraints.*;
import laplateforme.guildboard.model.enums.*;

public record CreateCharacterRequest(
    @NotBlank
    @Size(min = 2, max = 25)
    String name,

    @NotNull(message = "Choisissez un genre")
    CharacterGender gender,

    @NotNull(message = "Choisissez une classe")
    CharacterClass characterClass
) {}