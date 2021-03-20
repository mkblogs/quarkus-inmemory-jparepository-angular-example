package com.tech.mkblogs.resource;

import java.util.List;
import java.util.Set;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import javax.validation.Validator;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.metrics.MetricUnits;
import org.eclipse.microprofile.metrics.annotation.Timed;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import com.tech.mkblogs.dto.AccountFilterDTO;
import com.tech.mkblogs.exception.AccountNotFoundException;
import com.tech.mkblogs.model.Account;
import com.tech.mkblogs.repository.AccountRepository;
import com.tech.mkblogs.util.AccountUtil;


@Path("/api/account")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "Account Resource", description = "Account Resource Operations")
@RolesAllowed(value = {"user"})
public class AccountResource {

	@Inject
	AccountRepository accountRepository;
	
	@Inject
	Validator validator;
	
	@Timed(name="Fetch All Account Data", 
			description="Fetches all account information without a filter", 
			unit = MetricUnits.MILLISECONDS, 
			absolute = true)
	@Operation(
			summary = "List of all accounts",
			description = "Fetch All Account Data"
	)
	@GET
    public List<Account> getAccountData() {
        return accountRepository.listAll();
    }
	
	@Timed(name="Fetch All Account Data based on Filter", 
			description="Fetches all account information with a filter", 
			unit = MetricUnits.MILLISECONDS, 
			absolute = true)
	@Operation(
			summary = "List of all accounts based on Filter",
			description = "Fetch All Account Data based on Filter"
	)
	@GET
	@Path("/search-filter")
    public List<Account> getFilterAccountData(@QueryParam("accountName") String accountName,
    		@QueryParam("accountType") String accountType,
    		@QueryParam("amount") String amount) {
		if(AccountUtil.isNotEmptyANDNotNull(accountName))
			accountName = "";
		if(AccountUtil.isNotEmptyANDNotNull(accountType))
			accountType = "";
		if(AccountUtil.isNotEmptyANDNotNull(amount))
			amount = "";
		AccountFilterDTO filterDTO = AccountFilterDTO.builder()
											.accountName(accountName)
											.accountType(accountType)
											.amount(amount).build();
		List<Account> list = accountRepository.findByFilterData(filterDTO);
        return list;
    }
	
	@Timed(name="Fetch Account Data", 
			description="Fetches Account Data for given id", 
			unit = MetricUnits.MILLISECONDS, 
			absolute = true)
	@Operation(
			summary = "Fetch Account Data",
			description = "Fetches Account Data for given id"
	)
	@GET
    @Path("{id}")
    public Account getAccountDetails(@PathParam(value = "id") Long id) throws AccountNotFoundException {
        Account account = accountRepository.findById(id);
        if (account == null) {
            throw new AccountNotFoundException("Account with id of " + id + " does not exist.");
        }
        return account;
    }
	
	@Operation(
			summary = "Saving Account",
			description = "Save Account Data"
	)
	@POST
    @Transactional
    public Response saveAccount(@Valid Account inputAccount) {
        if (inputAccount.getId() != null) {
            throw new WebApplicationException("Id was invalidly set on request.", 422);
        }
        Set<ConstraintViolation<Account>> violations = validator.validate(inputAccount,com.tech.mkblogs.validation.Account.class);
		if(violations != null && !violations.isEmpty()) {
			throw new ConstraintViolationException(violations);
		}
		accountRepository.persist(inputAccount);
        return Response.ok(inputAccount).status(200).build();
    }
	
	@Operation(
			summary = "Update Account",
			description = "Update Account Data"
	)
	@PUT
    @Transactional
    public Response updateAccount(@Valid Account updateAccount) throws Exception {
		Account dbAccount = null;
		if (updateAccount.getId() == null) {
            throw new WebApplicationException("Id was invalidly set on request.", 422);
        }
		Set<ConstraintViolation<Account>> violations = validator.validate(updateAccount,com.tech.mkblogs.validation.Account.class);
		if(violations != null && !violations.isEmpty()) {
			throw new ConstraintViolationException(violations);
		}
        dbAccount = accountRepository.findById(updateAccount.getId());
        if (dbAccount == null) {
            throw new AccountNotFoundException("Account with id of " + updateAccount.getId() + " does not exist.");
        }
        dbAccount.setName(updateAccount.getName());
        dbAccount.setType(updateAccount.getType());
        dbAccount.setAmount(updateAccount.getAmount());
        accountRepository.persist(dbAccount);
		return Response.ok(dbAccount).status(200).build();
    }
	
	@Operation(
			summary = "Delete Account",
			description = "Delete Account Data"
	)
	@DELETE
    @Path("{id}")
    @Transactional
    public Response delete(@PathParam(value = "id") Long id) {
        Account account =accountRepository.findById(id);
        if (account == null) {
            throw new WebApplicationException("Account with id of " + id + " does not exist.", 404);
        }
        accountRepository.delete(account);
        return Response.status(200).build();
    }
}

