package com.tech.mkblogs.startup;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

import com.tech.mkblogs.model.Account;
import com.tech.mkblogs.repository.AccountRepository;

import lombok.extern.slf4j.Slf4j;

@ApplicationScoped
@Slf4j
public class DBInit {

	@Inject
	AccountRepository accountRepository;
	
	@SuppressWarnings("deprecation")
	@Transactional
	public void insertDB( ) {
		log.info("in side insertDB()");
		List<Account> accountList = accountRepository.listAll();
		log.info("Size is ::"+accountList.size());
		if(accountList.isEmpty()) {
			Account account = new Account();
			account.setName("FirstName");
			account.setType("Savings");
			account.setAmount(new Integer("100"));
			accountRepository.persist(account);
		}
	}
}
