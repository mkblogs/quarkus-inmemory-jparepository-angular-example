package com.tech.mkblogs.repository;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;

import com.tech.mkblogs.dto.AccountFilterDTO;
import com.tech.mkblogs.model.Account;
import com.tech.mkblogs.util.AccountUtil;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import lombok.extern.slf4j.Slf4j;

@ApplicationScoped
@Slf4j
public class AccountRepository implements PanacheRepository<Account> {

	/***
	 * 
	 * @param filterDTO
	 * @return
	 */
	public List<Account> findByFilterData(AccountFilterDTO filterDTO){
		String accountName = filterDTO.getAccountName();
		String accountType = filterDTO.getAccountType();
		String amount = filterDTO.getAmount();
		try {
			String jpql = "FROM Account a ";
			String whereCondition = "";
			if(AccountUtil.isNotEmpty(accountName)) 
				whereCondition += "a.name like '%"+accountName + "%' AND ";
			
			if(AccountUtil.isNotEmpty(accountType))
				whereCondition += "a.type ='"+accountType+"' AND ";
			
			if(AccountUtil.isNotEmpty(amount))
				whereCondition += " a.amount = "+amount + " AND ";
			
			if(whereCondition != null && whereCondition.trim().length() > 0) {
				whereCondition = whereCondition.substring(0, whereCondition.lastIndexOf("AND"));
				jpql = jpql + " WHERE "+ whereCondition;
				List<Account> list = list(jpql, new Object[] {});
				return list;
			}else {
				return find(jpql).list();
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
    }

	/***
	 * 
	 * @param id
	 * @param accountName
	 * @return
	 */
	public long countByIdAndAccountName(Long id, String accountName) {
		String jpql = "FROM Account a WHERE a.name='"+accountName+"' AND a.id="+id;
		try {
			return count(jpql, new Object[] {});
		}catch(Exception e) {
			log.error("countByIdAndAccountName() >> "+e.getMessage());
		}
		return -1;
	}

	/**
	 * 
	 * @param id
	 * @param accountName
	 * @return
	 */
	public long countByNotIdAndAccountName(Long id, String accountName) {
		String jpql = "FROM Account a WHERE a.name='"+accountName+"' AND a.id!="+id;
		try {
			return count(jpql, new Object[] {});
		}catch(Exception e) {
			log.error("countByIdAndAccountName() >> "+e.getMessage());
		}
		return -1;
	}
}
