package laplateforme.guildboard.repository;

import org.springframework.stereotype.Repository;
import laplateforme.guildboard.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;


@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByQuestId(Long questId);
    List<Assignment> findByCharacterId(Long characterId);
    boolean existsByCharacterIdAndCompletedAtIsNull(Long characterId);
    List<Assignment> findByQuestIdAndCompletedAtIsNull(Long questId);
    boolean existsByQuestIdAndCharacterIdAndCompletedAtIsNull(Long questId, Long characterId);
    void deleteByCharacterId(Long characterId);
}