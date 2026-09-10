package laplateforme.guildboard.dto.response;

import java.time.LocalDateTime;

public record ErrorResponse(
        int status,
        String code,
        String message,
        LocalDateTime timestamp) {
    public ErrorResponse(int status, String code, String message) {
        this(status, code, message, LocalDateTime.now());
    }
}