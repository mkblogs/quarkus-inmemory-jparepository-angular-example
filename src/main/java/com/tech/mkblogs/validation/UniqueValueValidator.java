package com.tech.mkblogs.validation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.time.LocalTime;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;

import com.tech.mkblogs.model.Account;
import com.tech.mkblogs.repository.AccountRepository;
import com.tech.mkblogs.validation.UniqueValueValidator.UniqueValue;

import lombok.extern.slf4j.Slf4j;

@ApplicationScoped
@Slf4j
public class UniqueValueValidator implements ConstraintValidator<UniqueValue, Object> {
	
	@Inject
	AccountRepository accountRepository;
	
	@Target({ ElementType.TYPE_USE, ElementType.ANNOTATION_TYPE })
	@Retention(RetentionPolicy.RUNTIME)
	@Constraint(validatedBy = UniqueValueValidator.class)
	@Documented
	public @interface UniqueValue {
		String message() default "Already exists value";
	    Class<?>[] groups() default {};
	    Class<? extends Payload>[] payload() default {};
	}
	
	@Override
    public void initialize(UniqueValue unique) {
		log.info("In side UniqueValueValidator.initialize()");
		
	}
	
	@Override
	public boolean isValid(Object value, ConstraintValidatorContext context) {
		log.info("| Request Time - Start - isValid() " + LocalTime.now());
		if(value instanceof Account) {
			Account inputValue = (Account) value;
			return isValidAccount(inputValue,context);
		}
		return true;
	}
	
	private boolean isValidAccount(Account inputValue,ConstraintValidatorContext context) {
		log.info("| Request Time - Start - isValidAccount() " + LocalTime.now());
		boolean flag = true;
		if(inputValue.getId() == null) {
			flag = isValidObjectForSave(inputValue);
		}else {
			flag = isValidObjectForUpdate(inputValue);
		}
		return flag;
	}
	
	private boolean isValidObjectForSave(Account inputValue) {
		boolean statusFlag = true; //Default Success
		try {
			long count = accountRepository.countByIdAndAccountName
					(inputValue.getId(),inputValue.getName());
			if(count > 0)
				statusFlag = false;	
		}catch(Exception e) {
			log.error("isValidObjectForSave() -> Error ::"+e.getMessage());
		}
		return statusFlag;
	}
	
		
	private boolean isValidObjectForUpdate(Account inputValue) {
		boolean statusFlag = true; //Default Success
		try {
			long count = accountRepository.countByNotIdAndAccountName(inputValue.getId(),inputValue.getName());
			if(count > 0)
				statusFlag = false;			
		}catch(Exception e) {
			log.error("isValidObjectForUpdate() -> Error ::"+e.getMessage());
		}
		return statusFlag;
	}
}
