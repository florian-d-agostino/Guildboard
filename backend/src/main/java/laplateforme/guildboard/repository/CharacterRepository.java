package laplateforme.guildboard.repository;


import laplateforme.guildboard.model.Character;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface CharacterRepository extends JpaRepository<Character, Long> {
boolean existsByName(String name);
}
