package com.tech.mkblogs.providers;

import javax.json.Json;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

import com.tech.mkblogs.exception.AccountNotFoundException;

public class AccountNotFoundExceptionMapper implements ExceptionMapper<AccountNotFoundException>{

	@Override
	public Response toResponse(AccountNotFoundException exception) {
		int code = 400;
        return Response.status(code)
                .entity(Json.createObjectBuilder()
                		    .add("error", exception.getMessage())
                		    .add("code", code).build())
                .build();
	}

}
