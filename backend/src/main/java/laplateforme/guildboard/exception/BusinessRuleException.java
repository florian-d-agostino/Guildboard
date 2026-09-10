package laplateforme.guildboard.exception;

public class BusinessRuleException extends RuntimeException {

    private final String code;

    public BusinessRuleException(String code, String message) {
        super(message);
        this.code = code;
    }

    public BusinessRuleException(String message) {
        this("BUSSINESS_RULE_VIOLATION", message);
    }

    public String getCode() {
        return code;
    }
}
