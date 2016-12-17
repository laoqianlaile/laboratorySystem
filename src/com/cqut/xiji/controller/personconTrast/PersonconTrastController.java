package com.cqut.xiji.controller.personconTrast;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
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
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.entity.personconTrast.PersonconTrast;
import com.cqut.xiji.service.personconTrast.IPersonconTrastService;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.sun.org.apache.xerces.internal.impl.xpath.regex.ParseException;

@Controller
@RequestMapping("/personconTrastController")
public class PersonconTrastController{
	
	@Resource(name="personconTrastService")
	IPersonconTrastService service;
	
	@RequestMapping("/getPersonconTrast")  
    @ResponseBody  	
	public String getPersonconTrast(String ID) {
		
		return service.getPersonconTrast(ID);
	}
	/**
	 * 
	 * 方法简述：新增人员比对建议
	 * @param personconTrast
	 * @param session
	 * @return  
	 * @author 蒋兴成
	 * @date 2016年12月7日 上午10:17:47
	 *
	 */
	@RequestMapping("/savePersonconTrast")
	@ResponseBody
	public String savePersonconTrast(PersonconTrast personconTrast,HttpSession session){
		return service.savePersonconTrast(personconTrast, session) == 1 ? "true"
				: "false";
	}

	/**
	 * 
	 * 方法简述:删除检测计划的相关项目
	 * 
	 * @param article
	 * @return “true” or "false"
	 * @author liumin
	 * @date :  2016-11-17 
	 * 
	 */ 
	@RequestMapping("/deletePersonconTrastByID")
	@ResponseBody
	public String deletePersonconTrastByID(String id) {
		return service.deletePersonconTrastByID(id);
	}

	/**
	 * 
	 * 方法简述：根据id修改人员比对建议
	 * @param personconTrast
	 * @return  
	 * @author 蒋兴成
	 * @date 2016年12月7日 上午10:18:36
	 *
	 */
	@RequestMapping("/updatePersonconTrastByID")
	@ResponseBody
	public String updatePersonconTrastByID(PersonconTrast personconTrast){
		return service.updatePersonconTrastByID(personconTrast) == 1 ? "true"
				: "false";
	}
	
	/**
	 * 
	 *方法简述：分页获取人员比对建议（新增页面获取，主要是根据session中制定人来获取）
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param projectCode
	 * @param projectName
	 * @param testDevice
	 * @param startTime
	 * @param endTime
	 * @param employeeID1
	 * @param employeeID2
	 * @param state
	 * @param departmentName
	 * @param qualityPlanID(必须有字段)
	 * @param session(必有字段)
	 * @return
	 * @throws ParseException
	 * @throws java.text.ParseException  
	 * @author 蒋兴成
	 * @date 2016年12月17日 上午11:25:55
	 *
	 */
	@RequestMapping("/getPersonconTrastWithPaging")
	@ResponseBody
	public JSONObject getPersonconTrastWithPaging(int limit, int offset,
			String order, String sort, String projectCode,
			String projectName,String testDevice,String startTime,String endTime,
			String employeeID1,String employeeID2,String state,String departmentName,
			String qualityPlanID,HttpSession session) throws ParseException, java.text.ParseException{
		String condition = "";
		
		condition = " EmployeeID0 = '" + session.getAttribute("ID").toString() + "'";
		qualityPlanID = session.getAttribute("qualiyPlanId").toString();
		
		condition += getCondition(projectCode, projectName, testDevice, startTime, endTime,
				employeeID1, employeeID2, state, departmentName, qualityPlanID);
		return JSONObject.fromObject(service.getPersonconTrastWithPaging(limit, offset, order, sort, condition));
	}
	

	//分页获取条件
	public String getCondition(String projectCode,
			String projectName,String testDevice,String startTime,String endTime,
			String employeeID1,String employeeID2,String state,String departmentName,
			String qualityPlanID){
		String condition = "";
		if(qualityPlanID != null && !qualityPlanID.trim().toString().equals("")){
			qualityPlanID += " and qualityPlanID = '" + qualityPlanID + "'";
		}
		
		if(projectCode != null && !projectCode.trim().toString().equals("")){
			condition +=" and projectCode like '%"+ projectCode +"%' ";
		}
		if(projectName != null && !projectName.trim().toString().equals("")){
			condition +=" and projectName like '%"+ projectName +"%' ";
		}
		if(employeeID1 != null && !employeeID1.trim().toString().equals("")){
			condition +=" and employee.employeeName like '%"+ employeeID1 +"%' ";
		}
		if(testDevice != null && !testDevice.trim().toString().equals("")){
			condition +=" and testDevice like '%"+ testDevice +"%' ";
		}
		if (startTime != null && !startTime.trim().equals("")
				&& endTime != null && !endTime.trim().equals("")) {
			condition += " nowCorrectYear  between '"
					+ startTime + "' " + " and '"
					+ endTime + "'";
		} 
		if(employeeID2 != null && !employeeID2.trim().toString().equals("")){
			condition +=" and employee2.Name2 like '%"+ employeeID2 +"%' ";
		}
		if(state != null && !state.trim().toString().equals("")){
			condition +=" and auditState= '"+ state +"' ";
		}
		if(departmentName != null && !departmentName.trim().toString().equals("")){
			condition +=" and departmentName like '%"+ departmentName +"%' ";
		}
		return condition;
	}
	/**
	 * 
	 *方法简述：分页获取人员比对建议（技术主管审核和综合管理室结果页面获取）
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param projectCode
	 * @param projectName
	 * @param testDevice
	 * @param startTime
	 * @param endTime
	 * @param employeeID1
	 * @param employeeID2
	 * @param state
	 * @param departmentName
	 * @return
	 * @throws ParseException
	 * @throws java.text.ParseException  
	 * @author 蒋兴成
	 * @date 2016年12月17日 上午11:25:55
	 *
	 */
	@RequestMapping("/getAuditPersonconTrastWithPaging")
	@ResponseBody
	public JSONObject getAuditPersonconTrastWithPaging(int limit, int offset,
			String order, String sort, String projectCode,
			String projectName,String testDevice,String startTime,String endTime,
			String employeeID1,String employeeID2,String state,String departmentName,
			String qualityPlanID,HttpSession session){
		String condition = getCondition(projectCode, projectName, testDevice, startTime, endTime, 
				employeeID1, employeeID2, state, departmentName, qualityPlanID);
		qualityPlanID = session.getAttribute("qualityPlanId").toString();
		return JSONObject.fromObject(service.getPersonconTrastWithPaging(limit, offset, order, sort, condition));
	}
	
	/**
	 * 
	 * 方法简述：审核人员比对建议
	 * @param personconTrast
	 * @return  
	 * @author 蒋兴成
	 * @date 2016年12月7日 上午10:19:10
	 *
	 */
	@RequestMapping("/auditPersonconTrastByID")  
    @ResponseBody
	public String auditPersonconTrastByID(PersonconTrast personconTrast){
		
		return service.auditPersonconTrastByID(personconTrast) == 1 ? "true"
				: "false";
	}
	
	/*
	 * 方法简述：填写人员比对结果
	 */
	@RequestMapping("/resultPersonconTrastByID")  
    @ResponseBody
	public String resultPersonconTrastByID(PersonconTrast personconTrast){
		
		return service.resultPersonconTrastByID(personconTrast) == 1 ? "true"
				: "false";
	}
	
	
	
	/**
	 * 
	 * 方法简述:获得部门id和名称
	 * 
	 * @param 
	 * @return 
	 * @author liumin
	 * @date :  2016-11-17 
	 * 
	 */ 
	@RequestMapping("/getdepartmentlist")  
    @ResponseBody
	public JSONArray getdepartmentlist(){
		return service.getdepartmentlist();
	}
	
     /**
	 * 
	 * 方法简述:根据部门id获取人员选项
	 * 
	 * @param 
	 * @return 
	 * @author liumin
     * @throws UnsupportedEncodingException 
	 * @date :  2016-11-17 
	 * 
	 */
	@RequestMapping("/getbydepartment")  
    @ResponseBody
	public JSONArray getbydepartment(String departmentID){
		return service.getbydepartment(departmentID);
	} 

	/**
	 * @description 上传文件并保存
	 * @author fujianfei
	 * @param request
	 * @param response
	 * @param model
	 * @throws IOException
	 */
	@RequestMapping("/upload")
	@ResponseBody
	public void upload(HttpServletRequest request,HttpServletResponse response, ModelMap model) throws IOException {
		  MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		  // 得到上传的文件
		  MultipartFile mFile = multipartRequest.getFile("file");
		  // 得到上传服务器的路径
		  String path = request.getSession().getServletContext().getRealPath("/WEB-INF/");
		 
		  System.out.println(path);
		  String filename = mFile.getOriginalFilename();
		  String remark = request.getParameter("remark");
		  String belongID = request.getParameter("belongID");
		  System.out.println("filename:"+filename);
		  System.out.println("remarks:"+remark);
		  InputStream inputStream = mFile.getInputStream();
		  byte[] b = new byte[1048576];
		  int length = inputStream.read(b);
		  path += "\\" + filename;
		  // 文件流写到服务器端
		  FileOutputStream outputStream = new FileOutputStream(path);
		  outputStream.write(b, 0, length);
		  inputStream.close();
		  outputStream.close();
		  String ID = EntityIDFactory.createId();
		  FileInformation fr = new FileInformation();
		  fr.setID(ID);
		  fr.setBelongtoID(belongID);
		  fr.setFileName(filename);
		  fr.setPath(path);
		  fr.setUploadTime(new Date());
		  fr.setRemarks(remark);
		  String result = service.saveFiles(fr);
		  if(result=="true"){
			  System.out.println("返回结果正确");
			  response.sendRedirect("../module/jsp/personContrast/personContrastResult.jsp");
		  }
		 }
}
