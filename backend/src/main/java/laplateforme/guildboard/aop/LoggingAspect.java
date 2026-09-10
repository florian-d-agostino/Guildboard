package laplateforme.guildboard.aop;


import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;



@Aspect
@Component
public class LoggingAspect {



private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);


@Pointcut("execution(* laplateforme.guildboard.controller..*(..))")
public void controllerMethods(){
}



@Around("controllerMethods()")
public Object logExecution(ProceedingJoinPoint joinPoint ) throws Throwable{

    // Method Name
    String methodName = joinPoint.getSignature().toShortString();

    // Timer
    long start = System.currentTimeMillis();

    // Log Inc
    logger.info(" --> Enter in {} with arguments : {}", methodName, joinPoint.getArgs());


try {
    // Execute Method
    Object result = joinPoint.proceed();

    // Calculate duration
    long duration = System.currentTimeMillis() - start;

    // Log Out
    logger.info(" <-- Exit from {} , duration in ms : {}", methodName, duration);

    return result;
    } catch (Throwable ex){
    long duration = System.currentTimeMillis() - start;
    logger.error("Execption in {} after {} ms : {}", methodName, duration, ex.getMessage());
    throw ex;
    }
}
}
