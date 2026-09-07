package laplateforme.guildboard.mapper;

import org.springframework.stereotype.Component;

import laplateforme.guildboard.dto.response.AssignmentResponse;
import laplateforme.guildboard.model.Assignment;

@Component
public class AssignmentMapper {
    public AssignmentResponse toResponse(Assignment assignment) {
        if (assignment == null) {
            return null;
        }

        return new AssignmentResponse(
                assignment.getId(),
                assignment.getCharacter().getId(),
                assignment.getQuest().getId(),
                assignment.getAssignedAt(),
                assignment.getCompletedAt());
    }

}
