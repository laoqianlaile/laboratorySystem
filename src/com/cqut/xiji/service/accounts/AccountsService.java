package com.cqut.xiji.service.accounts;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.accounts.Accounts;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.treeNode.Node;
import com.cqut.xiji.tool.treeNode.NodeList;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class AccountsService extends SearchService implements IAccountsService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "accounts";
	}

	@Override
	public String getBasePrimaryKey() {
		return "accounts.ID";
	}

	@Override
	public Map<String, Object> getAccountWithPaging(String contractCode,
			String contractName, String checkinTime1, String checkinTime2,
			int limit, int offset, String order, String sort) {
		
		int index = limit;
		int pageNum = offset/limit;
		
		String baseEntity = "accounts";
		String[] properties ={
				"accounts.ID as accountsID",
				"contract.ID as contractID",
				"contract.contractCode",
				"contract.contractAmount",
				"contract.contractName",
				"DATE_FORMAT(accounts.checkinTime,'%Y-%m-%d %H:%i') as checkinTime",
				"employee.ID as employeeID",
				"employee.employeeName"
		};
		String joinEntity = " LEFT JOIN contract on accounts.contractID = contract.ID "
				+ " LEFT JOIN employee on accounts.employeeID = employee.ID ";
		
		String condition = " 1 = 1 ";
		if(contractCode != null && contractCode != ""){
			condition += " and contract.contractCode like '%" + contractCode + "%' ";
		}
		if(contractName != null && contractName != ""){
			condition += " and contract.contractName like '%" + contractName + "%' ";
		}
		if(checkinTime1 != null && !checkinTime1.equals("") && checkinTime2!=null && !checkinTime2.equals("")){
			condition += " and checkinTime between '" + checkinTime1
					+ "' and '" + checkinTime2 +"'";
		}
		
	    List<Map<String, Object>> result =  originalSearchWithpaging(properties, baseEntity, joinEntity, null, condition, false, null, sort, order, index, pageNum);
	    int count = getForeignCountWithJoin(joinEntity, null, condition, false);
		
	    Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
	    
		return map;
	}

	@Override
	public String upAccounts(String accountsID ,String contractID) {
		
		Accounts accounts = new Accounts();
		accounts.setContractID(contractID);
		
		int result = entityDao.updatePropByID(accounts,accountsID);
		
		return result + "";
	}

	@Override
	public String addAccounts(String contractID, String employeeID,
			String remarks) {
		Accounts accounts = new Accounts();
		
		accounts.setID(EntityIDFactory.createId());
		accounts.setContractID(contractID);
		accounts.setEmployeeID(employeeID);
		accounts.setCheckinTime(new Date());
		accounts.setRemarks(remarks);
		
		int result = entityDao.save(accounts);
		
		return result + "";
	}

	@Override
	public String delAccounts(String accountsID) {
		if(accountsID == null || accountsID.isEmpty()){
			return 0+"";
		}
		int result =  entityDao.deleteByID(accountsID, Accounts.class);
		return result + "";
	}
	
}
