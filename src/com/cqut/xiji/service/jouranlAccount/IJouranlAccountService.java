package com.cqut.xiji.service.jouranlAccount;

import java.util.Map;

public interface IJouranlAccountService {

	Map<String, Object> getJouranlAccountsWithPaging(String contractID ,String invoice,
			String state, String checkinTime1, String checkinTime2, int limit,
			int offset, String order, String sort);

	String upJouranlAccounts(String jouranlAccountsID, String invoice,
			String money, int isIncome, String remarks);

	String addJouranlAccounts(String contractID,String employeeID, String invoice, String money,
			int isIncome, String remarks);
	
}
