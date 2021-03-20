package com.tech.mkblogs.resource;

import java.util.Base64;

import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import org.eclipse.microprofile.metrics.MetricUnits;
import org.eclipse.microprofile.metrics.annotation.Timed;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import com.tech.mkblogs.dto.UserAuthDTO;

import io.vertx.core.http.HttpServerRequest;
import lombok.extern.slf4j.Slf4j;



@Path("/auth")
@Produces("application/json")
@Consumes("application/json")
@Tag(name = "Account Resource", description = "Account Resource Operations")
@Slf4j
public class AuthResource {

	@Context
    HttpServerRequest request;
	
	@Timed(name="Login Information", 
			description="Login Information", 
			unit = MetricUnits.MILLISECONDS, 
			absolute = true)
	@Operation(
			summary = "Login Information",
			description = "Login Information"
	)
	@GET
	@Path(value = "/token")
	@PermitAll
    public UserAuthDTO token() {
		log.info(" token() method ");
		String loginName = request.getParam("loginName");
		String password  = request.getParam("password");
		String plainCredentials = loginName+":"+password;
		String base64Credentials = new String(Base64.getEncoder().encodeToString(plainCredentials.getBytes()));
		
		if(("firstuser").equalsIgnoreCase(loginName) 
				&& "password".equalsIgnoreCase(password)) {
			UserAuthDTO authDTO = UserAuthDTO.builder()
									 .userName(loginName)
									 .basicToken(base64Credentials)
									 .isAuthenticated(true)
									 .isAdmin(true)
									 .isUser(true)
									 .build();
			return authDTO;
		}else {
			UserAuthDTO authDTO = UserAuthDTO.builder()
											 .userName(loginName)
											 .basicToken(base64Credentials)
											 .isAuthenticated(false)
											 .isAdmin(false)
											 .isUser(false)
											 .build();
			return authDTO;
		}
    }
}
