package com.tech.mkblogs.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.GroupSequence;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.tech.mkblogs.validation.FirstStepValidation;
import com.tech.mkblogs.validation.SecondStepValidation;
import com.tech.mkblogs.validation.UniqueValueValidator.UniqueValue;

import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@RegisterForReflection
@GroupSequence({FirstStepValidation.class,SecondStepValidation.class,Account.class})
@UniqueValue(message ="{account.name.alreadyexists}" ,groups = com.tech.mkblogs.validation.Account.class)
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;	
	@NotEmpty(message = "{account.name.notempty}",groups = {FirstStepValidation.class})
	@Size(min = 3,max = 50,message = "{account.name.size}",groups = {SecondStepValidation.class})
	@Column(name="accountName")
	private String name;	
	@NotEmpty(message = "{account.type.notempty}",groups = {FirstStepValidation.class})
	@Size(min = 2,max = 50,message = "{account.type.size}",groups = {SecondStepValidation.class})
	@Column(name="accountType")
	private String type;
	@NotNull(message = "{account.amount.notnull}",groups = {FirstStepValidation.class})
	@DecimalMin(value = "99.00",inclusive = false,message = "{account.amount.min}",groups = {SecondStepValidation.class})
	@DecimalMax(value = "1000.00",inclusive = true,message = "{account.amount.max}",groups = {SecondStepValidation.class})
	private Integer amount;
}
