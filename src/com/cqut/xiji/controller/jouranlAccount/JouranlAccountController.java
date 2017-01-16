package com.cqut.xiji.controller.jouranlAccount;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.jouranlAccount.IJouranlAccountService;

@Controller
@RequestMapping("/jouranlAccountController")
public class JouranlAccountController{

	@Resource(name="jouranlAccountService")
	IJouranlAccountService service;

	/**
	 * 流水账分页查询
	 *
	 * @author zkl
	 * @param contractID
	 * @param invoice
	 * @param state
	 * @param checkinTime1
	 * @param checkinTime2
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getJouranlAccountsWithPaging")
	@ResponseBody
	public JSONObject getJouranlAccountsWithPaging(String contractID,String invoice, String state, String checkinTime1, String checkinTime2,int limit, int offset, String order, String sort){
		Map<String, Object> result = service.getJouranlAccountsWithPaging(contractID,invoice,state,checkinTime1,checkinTime2,limit,offset,order,sort);
		return JSONObject.fromObject(result);
	}

	/**
	 * 更新流水账
	 *
	 * @author zkl
	 * @param jouranlAccountsID
	 * @param invoice
	 * @param money
	 * @param isIncome
	 * @param remarks
	 * @return
	 */
	@RequestMapping("/upJouranlAccounts")
	@ResponseBody
	public String upJouranlAccounts(String jouranlAccountsID,String invoice,String money,int isIncome,String remarks){
		String result = service.upJouranlAccounts(jouranlAccountsID,invoice,money,isIncome,remarks);
		return result;
	}


	/**
	 * 添加流水账
	 *
	 * @author zkl
	 * @param contractID
	 * @param employeeID
	 * @param invoice
	 * @param money
	 * @param isIncome
	 * @param remarks
	 * @return
	 */
	@RequestMapping("/addJouranlAccounts")
	@ResponseBody
	public String addJouranlAccounts(String contractID,String employeeID,String invoice,String money,int isIncome,String remarks){
		String result = service.addJouranlAccounts(contractID,employeeID,invoice,money,isIncome,remarks);
		return result;
	}
	/**
	 *
	 * 删除流水账目
	 *
	 * @author zkl
	 * @param jouranlAccountsID
	 * @return
	 */
	@RequestMapping("/delJouranlAccounts")
	@ResponseBody
	public String delJouranlAccounts(String jouranlAccountsID){
		String result = service.delJouranlAccounts(jouranlAccountsID);
		return result;
	}


	/**
	 * 获取报账专员信息，公司名称（委托单位）
	 *
	 * @author zkl
	 * @param jouranlAccountID
	 * @return
	 */
	@RequestMapping("/getJouranlAccountDate")
	@ResponseBody
	public String getJouranlAccountDate(String jouranlAccountID){
		List<Map<String, Object>> result = service.getJouranlAccountDate(jouranlAccountID);
		return JSONArray.fromObject(result).toString();
	}
}
