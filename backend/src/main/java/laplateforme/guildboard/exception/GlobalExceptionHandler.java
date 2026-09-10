package laplateforme.guildboard.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import laplateforme.guildboard.dto.response.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // NOT FOUND ERROR HTTP 404
    @ExceptionHandler(RessourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(RessourceNotFoundException ex) {

        ErrorResponse error = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(), ex.getMessage()); // CREATE JSON MESSAGE

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error); // SEND
    }

    // BUSINESS RULE ERROR HTTP 400 (Game logic violation)
    @ExceptionHandler(BusinessRuleException.class)
    public ResponseEntity<ErrorResponse> handleBusinessRuleException(BusinessRuleException ex) {

        ErrorResponse error = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(), ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);

    }

    // DATA VALIDATION ERROR HTTP 400 (Fields violation)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult() // Get form errors
                .getFieldErrors() // Look at bad fields
                .stream() // Read one by one
                .map(error -> error.getDefaultMessage()) // Get error text
                .findFirst() // Take the first one
                .orElse("Validation error"); // Default value if empty

        ErrorResponse error = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), message);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    // INTERNAL SERVER ERROR HTTP 500
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception ex) {
        ErrorResponse error = new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(), "An unexpected internal error occurred.");

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
