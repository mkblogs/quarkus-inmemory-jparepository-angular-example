package com.tech.mkblogs.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountFilterDTO {

	private String accountName;
	private String accountType;
	private String amount;
	private boolean isFromSearch;
}
