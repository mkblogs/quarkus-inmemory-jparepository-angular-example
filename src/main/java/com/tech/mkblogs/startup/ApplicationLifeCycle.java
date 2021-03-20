package com.tech.mkblogs.startup;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;

import org.jboss.logging.Logger;

import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.StartupEvent;
import io.quarkus.runtime.configuration.ProfileManager;

@ApplicationScoped
public class ApplicationLifeCycle {

	private static final Logger log = Logger.getLogger(ApplicationLifeCycle.class);

	@Inject
	DBInit dbInit;
	
    void onStart(@Observes StartupEvent ev) {
        log.infof("The application is starting with profile `%s`", ProfileManager.getActiveProfile());
    	log.info("The application has started");
    	dbInit.insertDB();
    }

    void onStop(@Observes ShutdownEvent ev) {
        log.info("The application is stopping...");
    }
}
