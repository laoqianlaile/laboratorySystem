package com.cqut.xiji.controller.timeCheck;

import java.awt.Window;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.service.timeCheck.ITimeCheckService;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.sun.jna.platform.win32.WinDef.BOOL;

@Controller
@RequestMapping("/timeCheckController")
public class TimeCheckController{
	
	@Resource(name="timeCheckService")
	ITimeCheckService service;
	
	
	/**
	 * @description 初始化文件列表
	 * @author fujianfei
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param tableName
	 * @return
	 */
	@RequestMapping("/getTimecheckFileWithPaging")
	@ResponseBody
	public JSONObject getTimecheckFileWithPaging(int limit, int offset,String order, String sort, String belongtoID){
		Map<String, Object> result = service.getTimecheckFileWithPaging(limit, offset, order, sort, belongtoID);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * @description 根据登陆的Session获取制定人
	 * @author fujianfei
	 * @param session
	 * @return
	 */
	@RequestMapping("/getEmployeeID1BySeeion")
	@ResponseBody
	public String getEmployeeID1BySeeion(HttpSession session){
		JSONArray arr=service.getEmployeeID1BySeeion(session);
		JSONObject js=JSONObject.fromObject(arr.get(0).toString());
		return js.getString("employeeName");
	}
	
	
	/**
	 * @description 获取审核人
	 * @author fujianfei
	 * @return
	 */
	@RequestMapping("/getEmployeeID2")
	@ResponseBody
	public JSONArray getEmployeeID2(){
		return service.getEmployeeID2();
	}
	
	/**
	 * @description 初始化建议表格
	 * @author fujianfei
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param tableName
	 * @return
	 */
	@RequestMapping("/getTimeCheckWithPaging")
	@ResponseBody
	public JSONObject getTimeCheckWithPaging(int limit, int offset,String order, String sort,String projectcode,String projectpoint, 
			String starttime,String endtime,String projectname,String department,String chargePer,
			HttpSession session){
		Map<String, Object> result = service.getTimeCheckWithPaging(limit, offset, order, sort, projectcode, projectpoint, starttime,endtime, projectname, department, chargePer, session);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * @description 审核/结果页面初始化建议表格
	 * @author fujianfei
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param tableName
	 * @return
	 */
	@RequestMapping("/getARTimeCheckWithPaging")
	@ResponseBody
	public JSONObject getARTimeCheckWithPaging(int limit, int offset,String order, String sort,String projectcode,String projectpoint, 
			String starttime,String endtime,String projectname,String department,String chargePer,
			HttpSession session){
		Map<String, Object> result = service.getARTimeCheckWithPaging(limit, offset, order, sort, projectcode, projectpoint, starttime,endtime, projectname, department, chargePer, session);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * @description 新增建议
	 * @author fujianfei
	 * @param projectName
	 * @param projectPoint
	 * @param endTime
	 * @param remark
	 * @return
	 * @throws ParseException
	 */
	@RequestMapping("/addTimeCheck")
	@ResponseBody
	public String addTimeCheck(String projectName,String projectPoint,String endTime,String remark,HttpSession session) throws ParseException{
		System.out.println(remark);
		return service.addTimeCheck(projectName, projectPoint, endTime, remark,session);
	}
	
	/**
	 * @description 删除建议
	 * @author fujianfei
	 * @param idstr
	 * @return
	 */
	@RequestMapping("/deleteTimeCheck")
	@ResponseBody
	public String deleteTimeCheck(String idstr){
		return service.deleteTimeCheck(idstr);
	}
	
	/**
	 * @description 修改建议
	 * @author fujianfei
	 * @param id
	 * @param projectName
	 * @param projectPoint
	 * @param endTime
	 * @param remark
	 * @return
	 * @throws ParseException
	 */
	@RequestMapping("/updataTimeCheck")
	@ResponseBody
	public int updataTimeCheck(String id,String projectName,String projectPoint,String endTime,String remark) throws ParseException{
		return service.updataTimeCheck(id, projectName, projectPoint, endTime, remark);
	}
	
	/**
	 * @description 审核和结果修改
	 * @author fujianfei
	 * @param i
	 * @param id
	 * @param reason
	 * @return
	 */
	@RequestMapping("/AuditAndResultUpdata")
	@ResponseBody
	public int AuditAndResultUpdata(int i,String id,String reason){
		return service.AuditAndResultUpdata(i, id, reason);
	}
	
	/**
	 * @description 搜索部分下拉
	 * @author fujianfei
	 * @param type
	 * @return
	 */
	@RequestMapping("/getDepartment")
	@ResponseBody
	public JSONArray getDepartment(int type){
		return service.getDepartment(type);
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
			  Boolean result =  service.upload(request, response, model);
			  String year = request.getParameter("year");
			  String code = request.getParameter("code");
			  if(result == true){
				  response.sendRedirect("../module/jsp/timecheck/TimeCheck.jsp?year="+year+"&&code="+code);
			  }else {
				  response.sendRedirect("../module/jsp/timecheck/TimeCheck.jsp?year="+year+"&&code="+code);
			}
		}
}
