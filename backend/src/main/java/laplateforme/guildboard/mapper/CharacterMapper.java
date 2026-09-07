package laplateforme.guildboard.mapper;

import org.springframework.stereotype.Component;

import laplateforme.guildboard.dto.response.CharacterResponse;
import laplateforme.guildboard.model.Character; // import this because Character already exist in Java

@Component
public class CharacterMapper {
    public CharacterResponse toResponse(Character character) {
        if (character == null) {
            return null;
        }

        return new CharacterResponse(
                character.getId(),
                character.getName(),
                character.getGender(),
                character.getCharacterClass(),
                character.getLvl(),
                character.getXp(),
                character.getWallet(),
                character.getCompletedQuest(),
                character.getTotalQuest(),
                character.getStatus());
    }

}
