package com.tech.mkblogs.util;

public class AccountUtil {

	public static boolean isNotEmptyANDNotNull(String value) {
		if(value != null && "null".equalsIgnoreCase(value))
			return true;
		else
			return false;
	}
	
	public static boolean isNotEmpty(String value) {
		if(value != null && value.trim().length() > 0)
			return true;
		else
			return false;
	}
	
}
