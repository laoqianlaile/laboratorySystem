package com.cqut.xiji.service.jouranlAccount;

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
import com.cqut.xiji.entity.jouranlAccount.JouranlAccount;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.treeNode.Node;
import com.cqut.xiji.tool.treeNode.NodeList;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class JouranlAccountService extends SearchService implements IJouranlAccountService{

	@Resource(name="entityDao")
	EntityDao entityDao;

	@Resource(name="searchDao")
	SearchDao searchDao;

	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "jouranlAccount";
	}

	@Override
	public String getBasePrimaryKey() {
		return "jouranlAccount.ID";
	}

	@Override
	public Map<String, Object> getJouranlAccountsWithPaging(String contractID,String invoice,
			String state, String checkinTime1, String checkinTime2, int limit,
			int offset, String order, String sort) {


		int index = limit;
		int pageNum = offset/limit;

		String baseEntity = "jouranlAccount";

		String[] properties ={
				"jouranlaccount.ID as jouranlAccountID",
				"jouranlaccount.invoice",
				"jouranlaccount.money",
				"jouranlaccount.remarks",
				"CASE WHEN jouranlaccount.isIncome = 0 THEN '收入'"
				+ "when jouranlaccount.isIncome = 1 then '支出' end as isIncome",
				"DATE_FORMAT(jouranlaccount.checkinTime,'%Y-%m-%d %H:%i') as checkinTime",
				"contract.ID as contractID",
				"contract.contractCode",
				"contract.contractName",
				"contract.contractAmount",
				"employee.ID as employeeID",
				"employee.employeeName"
		};
		String joinEntity = " LEFT JOIN contract ON contract.ID = jouranlaccount.contractID "
				+" LEFT JOIN employee ON employee.ID = jouranlaccount.employeeID ";
		Map<String,Object> map = new HashMap<String, Object>();

		if(contractID == null && contractID == ""){
			System.out.println("没有获取到合同ID");
			return map ;
		}
		String condition = " 1 = 1 and jouranlaccount.contractID = " + contractID;

		if(invoice != null && invoice != ""){
			condition += " and jouranlaccount.invoice like '%" + invoice + "%' ";
		}
		if(state != null && state != ""){
			condition += " and jouranlaccount.state = " + state + " ";
		}
		if(checkinTime1 != null && !checkinTime1.equals("") && checkinTime2!=null && !checkinTime2.equals("")){
			condition += " and checkinTime between '" + checkinTime1
					+ "' and '" + checkinTime2 +"'";
		}
		List<Map<String, Object>> result = originalSearchWithpaging(properties, baseEntity, joinEntity, null, condition, false, null, sort, order, index, pageNum);
	    int count = getForeignCountWithJoin(joinEntity, null, condition, false);
		map.put("total", count);
		map.put("rows", result);

		return map;
	}

	@Override
	public String upJouranlAccounts(String jouranlAccountsID, String invoice,
			String money, int isIncome, String remarks) {


		JouranlAccount jouranlAccount = new JouranlAccount();
		jouranlAccount.setInvoice(invoice);
		jouranlAccount.setMoney(Integer.parseInt(money));
		jouranlAccount.setIsIncome(isIncome);
		jouranlAccount.setRemarks(remarks);

		int result = entityDao.updatePropByID(jouranlAccount, jouranlAccountsID);

		return result + "";
	}

	@Override
	public String addJouranlAccounts(String contractID,String employeeID, String invoice,
			String money, int isIncome, String remarks) {
		JouranlAccount jouranlAccount = new JouranlAccount();

		jouranlAccount.setID(EntityIDFactory.createId());
		jouranlAccount.setContractID(contractID);
		jouranlAccount.setInvoice(invoice);
		jouranlAccount.setMoney(Integer.parseInt(money));
		jouranlAccount.setIsIncome(isIncome);
		jouranlAccount.setRemarks(remarks);
		jouranlAccount.setEmployeeID(employeeID);
		jouranlAccount.setCheckinTime(new Date());

		int result = entityDao.save(jouranlAccount);

		return result + "";
	}

	@Override
	public String delJouranlAccounts(String jouranlAccountsID) {
		if(jouranlAccountsID == null || jouranlAccountsID.isEmpty()){
			return 0+"";
		}
		int result =  entityDao.deleteByID(jouranlAccountsID, JouranlAccount.class);
		return result + "";
	}

	@Override
	public List<Map<String, Object>> getJouranlAccountDate(
			String jouranlAccountID) {
		String	baseEntity = "jouranlAccount";

		String[] properties = {
				"jouranlaccount.employeeID as employeeID",
				"jouranlaccount.invoice",
				"jouranlaccount.contractID",
				"company.companyName",
				"employee.employeeName as employeeName"
		};

		String joinEntity = " LEFT JOIN contract on  contract.ID = jouranlaccount.contractID "
				+ " LEFT JOIN company on company.ID = contract.companyID "
				+ " LEFT JOIN employee ON employee.ID = jouranlaccount.employeeID ";
		if(jouranlAccountID == null && jouranlAccountID == ""){
			System.out.println("没有获取到流水账ID");
			return null ;
		}
		String condition = " 1 = 1 and jouranlaccount.ID = " + jouranlAccountID;
		List<Map<String, Object>> result = originalSearchForeign(properties, baseEntity, joinEntity, null, condition, false);


		return result;
	}

}
