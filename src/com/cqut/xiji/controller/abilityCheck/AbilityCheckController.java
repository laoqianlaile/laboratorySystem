package com.cqut.xiji.controller.abilityCheck;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.entity.abilityCheck.AbilityCheck;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.service.abilityCheck.IAbilityCheckService;
import com.cqut.xiji.service.fileOperate.IFileOperateService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Controller
@RequestMapping("/abilityCheckController")
public class AbilityCheckController{

	@Resource(name="abilityCheckService")
	IAbilityCheckService service;
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	/**
	 * 
	 * 方法简述: 新增计划
	 * 
	 * @param  abilitycheck
	 * @return “true” or “false”
	 * @author 邓瑞
	 * @date : 2016年10月22日 上午10:23:18
	 * 
	 */ 
	@RequestMapping("/addAbilityCheck")
	@ResponseBody
	public String addAbilityCheck(AbilityCheck abilityCheck, HttpSession session){
		return service.addAbilityCheck(abilityCheck, session);
	}

	/**
	 * 
	 * 方法简述:根据ID删除计划
	 * 
	 * @param abilitycheckID
	 * @return “true” or “false”
	 * @author 邓瑞
	 * @date : 2016年10月22日 上午10:25:00
	 * 
	 */ 
	@RequestMapping("/deleteAbilityCheckID")
	@ResponseBody
	public String deleteAbilityCheckByID(String[] ID) {
		return service.deleteAbilityCheckByID(ID) == 1 ? "ture" : "false";
	}

	/**
	 * 
	 * 方法简述: 更新计划
	 * 
	 * @param abilitycheck
	 * @return “true” or “false”
	 * @author 邓瑞
	 * @date : 2016年10月22日 上午10:27:03
	 * 
	 */ 
	@RequestMapping("/updateAbilityCheck")
	@ResponseBody
	public String updateabilityCheck(AbilityCheck abilityCheck) throws ParseException{
		System.out.println(abilityCheck.toString() + "~~~~~~~~~~~~~~~~~~");
		return service.updateAbilityCheck(abilityCheck);
	}

	/**
	 * 
	 * 方法简述:根据条件更新计划
	 * 
	 * @param 组织者，设备名称，时间
	 * @return 
	 * @author 邓瑞
	 * @date : 2016年12月9日 下午5:06:19
	 * 
	 */ 
	@RequestMapping("/updateAbilityCheckByCondition")
	@ResponseBody
	public String updateAbilityCheckByCondition(AbilityCheck abilityCheck){
		System.out.println(abilityCheck.toString() +"~~~~~~~~~~~~~~~~~~");
		return service.updateAbilityCheckByCondition(abilityCheck);
	}
	/**
	 * 
	 * 方法简述: 根据分页获取数据
	 * 
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 * @author 邓瑞
	 * @throws ParseException 
	 * @date : 2016年10月22日 上午10:38:41
	 * 
	 */  
	@RequestMapping("/getAbilityCheckWithPaging")
	@ResponseBody
	public JSONObject getAbilityCheckWithPaging(int limit, int offset, String order,
			String sort, String condition)
			throws UnsupportedEncodingException, ParseException {
		System.out.println("limit ======== " + limit);
		System.out.println("offset ======== " + offset);
		System.out.println("order ======== " + order);
		System.out.println("sort ======== " + sort);


		return JSONObject.fromObject(service.getAbilityCheckWithPaging(limit,
				offset, order, sort, condition));
	}
	

	
	/**
	 * 
	 * 方法简述: 根据表名，实施查找数据
	 * 
	 * @param 
	 * @return json
	 * @author 邓瑞
	 * @date : 2016年10月22日 下午8:55:05
	 * 
	 */
	
	@RequestMapping("/getTableName")  
	@ResponseBody  	
	public JSONArray getTableName(String tableName){
		return service.getTableName(tableName);
	}
	
	/**
	 * 
	 * 方法简述:文件上传
	 * 
	 * @param file
	 * @return 
	 * @author 邓瑞
	 * @throws IOException 
	 * @date : 2016年11月18日 下午9:14:42
	 * 
	 */ 
	@RequestMapping("/imageUpload")
	@ResponseBody
	public void imageUpload(@RequestParam("file") CommonsMultipartFile file,HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		  String state = request.getParameter("state");
			long begin = 0;
			String[] fileNames = null; // 文件名按"."分割后文件名的集合
			String ID = request.getParameter("fileID");// 文件ID
			String fileName = file.getOriginalFilename();// 文件名
			String path = "";// 文件路径
			begin = (long) System.currentTimeMillis();
			fileNames = fileName.split("\\.");
			
			path = System.getProperty("user.dir").replace("bin", "webapps")  + "\\"
					+ "file" + "\\" ;// 获取tomcat下webapps的目录
			
			System.out.println(path);
			
			for (int j = 0; j < fileNames.length; j++) {
				if (fileNames.length - j > 1) {
					path += fileNames[j];
				} else {
					path += "_" + ID + "." + fileNames[j];
				}
			}

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
			fr.setContent("1");
			fr.setFileName(fileName);
			fr.setBelongtoID("1");
			fr.setPath(path);
			fr.setRemarks("");
			fr.setUploaderID("1");
			fr.setType(0);
			fr.setState(Integer.parseInt(state));
			try {
				fr.setUploadTime(dateFormat.parse(dateFormat.format(now)));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			String result = "";
			int res = 0;
			if(state.equals("0"))
			result = service.saveFiles(fr);

			else
				res = entityDao.updatePropByID(fr, ID);
		

		  if(result=="true" || res == 1){
			  System.out.println("返回结果正确");
			  response.sendRedirect("../module/jsp/AbilityCheck/AbilityCheck.jsp");
		  }
		 }
	
}
