package com.tech.mkblogs.exception;

public class AccountNotFoundException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public AccountNotFoundException(String exceptionMessage) {
		super(exceptionMessage);
	}
	
	public AccountNotFoundException(String exceptionMessage, Throwable throwable) {
		super(exceptionMessage,throwable);
	}
	
}
