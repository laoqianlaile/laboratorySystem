package com.cqut.xiji.controller.client;


import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.cqut.xiji.entity.client.Client;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.service.client.IClientService;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.cqut.xiji.tool.util.PropertiesTool;

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
	
	/***
	 * 
	 * @description 文件上传
	 * @author zt
	 * @created 2016-10-10 下午8:28:08
	 * @param file
	 * @param req
	 * @param response
	 * @param type
	 * @param subtypeName
	 * @param content
	 * @param belongtoID
	 * @param remark
	 * @return
	 * @throws IOException
	 */
	@SuppressWarnings("static-access")
	@RequestMapping("/upload")
	@ResponseBody
	public String uploadFile(@RequestParam("files") CommonsMultipartFile file,
			HttpServletRequest req, HttpServletResponse response,
			String filePath, String firstDirectory, String secondDirectory,
			String thirdDirectory,Integer TypeNumber, String belongtoID,
			String content, String remark) throws IOException {
		long begin = 0;
		String ID = "";// 文件ID
		String fileName = "";// 文件名
		String[] fileNames = null; // 文件名按"."分割后文件名的集合
		String path = "";// 文件路径
		begin = System.currentTimeMillis();
		ID = EntityIDFactory.createId();
		fileName = file.getOriginalFilename();
		fileNames = fileName.split("\\.");
//		path = System.getProperty("user.dir").replace("bin", "webapps") + "\\" + "files" + "\\";// 获取tomcat下webapps的目录
		PropertiesTool pe = new PropertiesTool();
		path= pe.getSystemPram("filePath")+"\\" ;
		String pathBack ="";
		pathBack+= pe.getSystemPram("fileRoute")+"/";
		if (filePath != null && !filePath.isEmpty() && !filePath.equals("")) {
			path = filePath;
		} else if (firstDirectory != null && !firstDirectory.isEmpty()
				&& !firstDirectory.equals("")) {
			path = path + firstDirectory + "\\";
			pathBack = pathBack+firstDirectory + "\\";
		}
		if (secondDirectory != null && !secondDirectory.isEmpty()
				&& !secondDirectory.equals("")) {
			path = path + secondDirectory + "\\";
			pathBack+=secondDirectory + "\\";
		}
		if (thirdDirectory != null && !thirdDirectory.isEmpty()
				&& !thirdDirectory.equals("")) {
			path = path + thirdDirectory + "\\";
			pathBack+=thirdDirectory + "\\";
		}
		for (int j = 0; j < fileNames.length; j++) {
			if (fileNames.length - j > 1) {
				path += fileNames[j];
				pathBack+= fileNames[j];
			} else {
				path += "_" + ID + "." + fileNames[j];
				pathBack+="_" + ID + "." + fileNames[j];
			}
		}
		System.out.println("test-------------------------");
		System.out.println("Pathback:"+pathBack);
        System.out.println("path :"+path);
		File targetFile = new File(path);
		if (!targetFile.exists()) {
			targetFile.mkdirs();
		}

		try {
			file.transferTo(targetFile);
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		Date now = new Date(begin);
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		FileInformation fr = new FileInformation();
		fr.setID(ID);
		fr.setContent(content);
		fr.setFileName(fileName);
		/*fr.setPath(path);*/
		fr.setPath(pathBack);//只把文件名写进去
		fr.setRemarks(remark);
		fr.setBelongtoID(belongtoID);
		// fr.setUploaderID();
		fr.setType(TypeNumber);
		fr.setState(0);
		try {
			fr.setUploadTime(dateFormat.parse(dateFormat.format(now)));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		service.saveFiles(fr);
		return ID;

	}
}