package com.tech.mkblogs.providers;

import java.time.Duration;
import java.time.LocalDateTime;

import javax.transaction.Transactional;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.Context;
import javax.ws.rs.ext.Provider;

import com.tech.mkblogs.model.UserActionLog;

import io.vertx.core.http.HttpServerRequest;
import lombok.extern.slf4j.Slf4j;

@Provider
@Slf4j
public class LoggingFilter implements ContainerRequestFilter, ContainerResponseFilter {

	@Context
	HttpServerRequest request;
	
	@Override
    public void filter(ContainerRequestContext requestContext) {
		
		String method = requestContext.getMethod();
        String path = requestContext.getUriInfo().getPath();
        String address = request.remoteAddress().toString();
		
		UserActionLog logAction = new UserActionLog();
		
		logAction.setIpAddress(address);
		logAction.setVisitedPage(path);
		

        log.info("Path :: "+path + " Method :: " +method +" Request Address:: "+address);
       
        try {
			//String json = IOUtils.toString(requestContext.getEntityStream(), Charsets.UTF_8);
			//InputStream in = IOUtils.toInputStream(json);
            //requestContext.setEntityStream(in);
			
            //logAction.setInput(json);
            
		} catch (Exception e) {			
			log.error("filter() ::"+e.getMessage());
		}
        
        logAction.setStartTime(LocalDateTime.now());
        requestContext.setProperty("logRequest", logAction);
        
    }

    @Override
    @Transactional
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) {
		UserActionLog logAction = (UserActionLog) requestContext.getProperty("logRequest");
        /*
		try {
			byte[] data = null;
			IOUtils.write(data, responseContext.getEntityStream());
			String json = new String(data);
		}catch(Exception e) {
			log.error("filter() ::"+e.getMessage());
		}
		*/
		logAction.setEndTime(LocalDateTime.now());
		
		Duration duration = Duration.between(logAction.getStartTime(), logAction.getEndTime());
		Long timeTaken =  duration.toMillis();
		logAction.setTimeTaken(timeTaken);
		//logAction.persist();
    }
}
