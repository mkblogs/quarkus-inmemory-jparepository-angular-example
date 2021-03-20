package com.tech.mkblogs.openapi;

import javax.ws.rs.core.Application;

import org.eclipse.microprofile.openapi.annotations.Components;
import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.enums.SecuritySchemeType;
import org.eclipse.microprofile.openapi.annotations.info.Contact;
import org.eclipse.microprofile.openapi.annotations.info.Info;
import org.eclipse.microprofile.openapi.annotations.info.License;
import org.eclipse.microprofile.openapi.annotations.security.SecurityRequirement;
import org.eclipse.microprofile.openapi.annotations.security.SecurityScheme;

@OpenAPIDefinition(
        info = @Info(
                title="Open API and Swagger Demo",
                version = "1.0.1",
                contact = @Contact(
                        name = "Simple Application Demo",
                        url = "https://github.com/mkblogs",
                        email = "tech.mkblog@gmail.com"),
                license = @License(
                        name = "Apache 2.0",
                        url = "http://www.apache.org/licenses/LICENSE-2.0.html")),
    		
        security = @SecurityRequirement(name = "BasicAuth", scopes = {"admin"}),
    	    components = @Components(
    	        securitySchemes = {
    	            @SecurityScheme(
    	                securitySchemeName = "BasicAuth",
    	                type = SecuritySchemeType.HTTP,
    	                scheme = "basic",
    	                description = "Baic Auth with In Memory File Based Authentication"
    	            )
    	        }
    	       )
)

public class SwaggerAPI extends Application{

	

	

}
