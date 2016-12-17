package com.cqut.xiji.service.accounts;

import java.util.Map;

import com.cqut.xiji.entity.accounts.Accounts;

public interface IAccountsService {

	Map<String, Object> getAccountWithPaging(String contractCode,
			String contractName, String checkinTime1, String checkinTime2,
			int limit, int offset, String order, String sort);

	String upAccounts(String accountsID ,String contractID);

	String addAccounts(String contractID, String employeeID, String remarks);

	String delAccounts(String accountsID);
	
}
