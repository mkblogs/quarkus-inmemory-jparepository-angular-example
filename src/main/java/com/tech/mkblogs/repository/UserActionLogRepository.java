package com.tech.mkblogs.repository;

import javax.enterprise.context.ApplicationScoped;

import com.tech.mkblogs.model.Account;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class UserActionLogRepository implements PanacheRepository<Account>{

}
