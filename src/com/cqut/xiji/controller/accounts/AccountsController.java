package com.cqut.xiji.controller.accounts;

import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.accounts.IAccountsService;

@Controller
@RequestMapping("/accountsController")
public class AccountsController{
	
	@Resource(name="accountsService")
	IAccountsService service;
	
	/**
	 * 账目管理界面分页
	 * @author zkl
	 * @param contractCode
	 * @param contractName
	 * @param checkinTime1
	 * @param checkinTime2
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getAccountWithPaging")
	@ResponseBody
	public JSONObject getAccountWithPaging(String contractCode, String contractName, String checkinTime1, String checkinTime2,int limit, int offset, String order, String sort){
		Map<String, Object> result = service.getAccountWithPaging(contractCode,contractName,checkinTime1,checkinTime2,limit,offset,order,sort);
		return JSONObject.fromObject(result);
	}
	/**
	 * 更新账目
	 * 
	 * @author zkl
	 * @param accountsID
	 * @param contractID
	 * @return
	 */
	@RequestMapping("/upAccounts")
	@ResponseBody
	public String upAccounts(String accountsID, String contractID){
		String result = service.upAccounts(accountsID,contractID);
		return result;
		
	}
	
	/**
	 * 新增账目
	 * 
	 * @author zkl
	 * @param contractID
	 * @param employeeID
	 * @param remarks
	 * @return
	 */
	@RequestMapping("/addAccounts")
	@ResponseBody
	public String addAccounts(String contractID,String employeeID,String remarks){
		String result = service.addAccounts(contractID,employeeID,remarks);
		return result;
	}
	
	/**
	 * 删除账目
	 * 
	 * @author zkl
	 * @param accountsID
	 * @return
	 */
	@RequestMapping("/delAccounts")
	@ResponseBody
	public String delAccounts(String accountsID){
		String result = service.delAccounts(accountsID);
		return result;
	}
}
