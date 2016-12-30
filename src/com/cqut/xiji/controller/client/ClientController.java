package com.cqut.xiji.controller.client;


import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Date;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.entity.client.Client;
import com.cqut.xiji.service.client.IClientService;

@Controller
@RequestMapping("/clientController")
public class ClientController{
	
	@Resource(name="clientService")
	IClientService service;
	@RequestMapping("/getRegistryWithPaging")  
    @ResponseBody
	public JSONObject getRegistryWithPaging(int limit, int offset, String order, String sort, String companyName,String clientNo,String reviewStatus,String isTouchReviewStatus) throws UnsupportedEncodingException{
		 companyName = URLDecoder.decode(companyName,"utf-8");
		 clientNo = URLDecoder.decode(clientNo,"utf-8");
		 reviewStatus = URLDecoder.decode(reviewStatus,"utf-8");
		 isTouchReviewStatus = URLDecoder.decode(isTouchReviewStatus,"utf-8");
		 Map<String, Object> result = service.getRegistryWithPaging(limit,offset,sort,order,companyName,clientNo,reviewStatus,isTouchReviewStatus);
		 return JSONObject.fromObject(result);
	}
	@RequestMapping("/updateStatus")  
    @ResponseBody
    public String updateStatus(String reviewStatus,String clientID) throws UnsupportedEncodingException{
	
		reviewStatus = URLDecoder.decode(reviewStatus,"utf-8");
		System.out.println("reviewStatus:"+reviewStatus+" clientId:"+clientID);
		String isSuccess = service.updateStatus(reviewStatus,clientID);
		return isSuccess;
	}

	
	/**
	 * 
	 * 方法简述：用户登录
	 * @param client
	 * @return 
	 * @author 蒋兴成
	 * @date 2016年10月5日 下午8:20:07
	 *
	 */
		
	@RequestMapping("/clientLogin")  
    @ResponseBody 
	public int clientLogin(Client client,HttpSession session){
		System.out.println("用户登录" + client);
		return service.clientLogin(client,session) == "true" ? 1 : 0;
	}
	
	/**
	 * 方法简述：用户注册
	 * @param register
	 * @author 李龙顺
	 * @throws UnsupportedEncodingException 
	 * @date 2016年10月11日 上午10:08:07
	 *
	 */
	@RequestMapping("/addPersonnel")  
    @ResponseBody 
    public String addPersonnel(String clientNo,String password,String companyName,String mobilePhone,String address,
    		String scope,String legal,String companyType,String remarks,String fileID1,String fileID2) throws UnsupportedEncodingException{
		clientNo = URLDecoder.decode(clientNo,"utf-8");
		password = URLDecoder.decode(password,"utf-8");
		companyName = URLDecoder.decode(companyName,"utf-8");
		mobilePhone = URLDecoder.decode(mobilePhone,"utf-8");
		address = URLDecoder.decode(address,"utf-8");
		scope = URLDecoder.decode(scope,"utf-8");
		legal = URLDecoder.decode(legal,"utf-8");
		companyType = URLDecoder.decode(companyType,"utf-8");
		remarks = URLDecoder.decode(remarks,"utf-8");
		fileID1 = URLDecoder.decode(fileID1,"utf-8");
		fileID2 = URLDecoder.decode(fileID2,"utf-8");
		return service.addPersonnel(clientNo,password,companyName,mobilePhone,address,
				scope,legal,companyType,remarks,fileID1,fileID2); 
		
	}


	/**
	 * 方法简述：个人信息获取（用于修改个人信息）
	 * @author 李龙顺
	 * @throws
	 * @date 2016年10月20日 上午10:08:07
	 *
	 */
	@RequestMapping("/getPersonage")
	@ResponseBody
	public JSONObject getPersonage(String clientNo)
			throws UnsupportedEncodingException {
		if (clientNo != null)
			clientNo = URLDecoder.decode(clientNo, "utf-8");
		else {
			return null;
		}
		
		Map<String,Object> map = service.getPersonage(clientNo);
		return JSONObject.fromObject(map);
	}
	
	/**
	 * 方法简述：个人信息密码获取（用于修改密码）
	 * @author 李龙顺
	 * @throws
	 * @date 2016年10月20日 上午10:08:07
	 *
	 */
	@RequestMapping("/getClientPassword")
	@ResponseBody
	public JSONArray getClientPassword(String clientNo)
			throws UnsupportedEncodingException {
		/* System.out.println(artTitle); */
		if (clientNo != null)
			clientNo = URLDecoder.decode(clientNo, "utf-8");
		return JSONArray.fromObject(service.getClientPassword(clientNo));
	}
	/**
	 * 方法简述：个人信息修改
	 * @author 李龙顺
	 * @throws
	 * @date 2016年10月20日 上午10:08:07
	 *
	 */
	@RequestMapping("/changePersonnel")  
    @ResponseBody 
    public String changePersonnel(String clientNo,String clientID,String clientPassword,String companyID,String companyName,String address,String mobilePhone,
    		String scope,String legal,String companyType,String remarks,String fileID1,String fileID2) throws UnsupportedEncodingException{
		clientNo = URLDecoder.decode(clientNo,"utf-8");
		clientID = URLDecoder.decode(clientID,"utf-8");
		clientPassword = URLDecoder.decode(clientPassword,"utf-8");
		companyID = URLDecoder.decode(companyID,"utf-8");
		mobilePhone = URLDecoder.decode(mobilePhone,"utf-8");
		address = URLDecoder.decode(address,"utf-8");
		scope = URLDecoder.decode(scope,"utf-8");
		legal = URLDecoder.decode(legal,"utf-8");
		companyType = URLDecoder.decode(companyType,"utf-8");
		remarks = URLDecoder.decode(remarks,"utf-8");
		companyName = URLDecoder.decode(companyName,"utf-8");
		fileID1 = URLDecoder.decode(fileID1,"utf-8");
		fileID2 = URLDecoder.decode(fileID2,"utf-8");
		return service.changePersonnel(clientNo,clientID,clientPassword,companyID,companyName,address,mobilePhone,
	    		 scope,legal,companyType,remarks,fileID1,fileID2); 
		
	}
	
	/**
	 * 方法简述：个人信息密码修改
	 * @author 李龙顺
	 * @throws
	 * @date 2016年10月20日 上午10:08:07
	 *
	 */
	@RequestMapping("/changePassword")
	@ResponseBody
	public String changePassword(String clientID,String password,String companyID,String clientNo){
		Client client = new Client();
		
		client.setClientNo(clientNo);
		client.setCompanyID(companyID);
		client.setCreateTime(new Date());
		client.setReviewStatus("1");
		client.setID(clientID);
		client.setPassword(password);
		
     	if(service.changePassword(client).equals("true")){
     		return "true";
     	}
     	else {
			return "false";
		}
	}
	
	/**
	 * 方法简述：验证账户是否被使用
	 * @author 李龙顺
	 * @throws UnsupportedEncodingException 
	 * @throws
	 * @date 2016年10月20日 上午10:08:07
	 *
	 */
	@RequestMapping("/verifyClientNo")
	@ResponseBody
	public String verifyClientNo(String clientNo) throws UnsupportedEncodingException{
			clientNo = URLDecoder.decode(clientNo, "utf-8");
		if(service.getClientPassword(clientNo) == ""){
		   return "true";
		}
	    else	  
		   return "false";
	}
	
	/**
	 * 方法简述：注销，清空保存的session
	 * @author 李龙顺
	 * @throws
	 * @date 2016年10月20日 上午10:08:07
	 *
	 */
	@RequestMapping("/logout")
	@ResponseBody
	public int logout(Client client,HttpSession session){
		return service.clientlogout(client,session) == "true" ? 1 : 0;
	}
	
	/**
	 * 方法简述：找回密码
	 * @author 李龙顺
	 * @throws
	 * @date 2016年10月20日 上午10:08:07
	 *
	 */
	@RequestMapping("/findPassword")
	@ResponseBody
	public int findPassword(String clientNo1,String mobilePhone){
		return service.findPassword(clientNo1,mobilePhone) == "true" ? 1 : 0;
	}
}