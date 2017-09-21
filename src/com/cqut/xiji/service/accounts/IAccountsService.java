package com.cqut.xiji.service.accounts;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public interface IAccountsService {

	Map<String, Object> getAccountWithPaging(String contractCode,
			String contractName, String checkinTime1, String checkinTime2,
			int limit, int offset, String order, String sort);

	String upAccounts(String accountsID ,String contractID);

	String addAccounts(String contractID, String employeeID, String remarks);

	String delAccounts(String accountsID);
	void exportAccounts(HttpServletRequest request , HttpServletResponse response);

	List<Map<String, Object>> getAccounts(int total);
	
	int importAccounts(CommonsMultipartFile file, HttpServletRequest req,HttpServletResponse response); 
	
}
