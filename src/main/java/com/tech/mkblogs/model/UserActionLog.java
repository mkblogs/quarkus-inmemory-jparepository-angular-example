package com.tech.mkblogs.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserActionLog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	String loginName;
	String ipAddress;
	String visitedPage;
	@Column(columnDefinition = "TEXT")
	String input;
	@Column(columnDefinition = "TEXT")
	String output;
	LocalDateTime startTime;
	LocalDateTime endTime;
	Long timeTaken;
}
