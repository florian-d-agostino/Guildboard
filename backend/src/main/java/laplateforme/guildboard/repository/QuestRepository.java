package laplateforme.guildboard.repository;

import java.util.List;
import laplateforme.guildboard.model.Quest;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import laplateforme.guildboard.model.enums.*;


@Repository
public interface QuestRepository extends JpaRepository<Quest, Long> {
    boolean existsByTitle(String title);
    List<Quest> findByStatus(QuestStatus status);
    List<Quest> findByDifficulty(QuestDifficulty difficulty);
    List<Quest> findByStatusAndDifficulty(QuestStatus status, QuestDifficulty difficulty);
}