package com.cqut.xiji.service.timeCheck;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.jms.Session;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.constraints.Null;

import net.sf.json.JSONArray;

import org.apache.http.HttpResponse;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.contract.Contract;
import com.cqut.xiji.entity.department.Department;
import com.cqut.xiji.entity.employee.Employee;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.entity.qualityPlan.QualityPlan;
import com.cqut.xiji.entity.timeCheck.TimeCheck;
import com.cqut.xiji.service.base.SearchService;

import com.cqut.xiji.tool.treeNode.Node;
import com.cqut.xiji.tool.treeNode.NodeList;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.mysql.fabric.xmlrpc.base.Data;
import com.sun.jna.platform.win32.OaIdl.VARDESC;

@Service
public class TimeCheckService extends SearchService implements ITimeCheckService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;
	
	
	@Override
	public String getBaseEntityName() {
		return "timecheck";
	}

	@Override
	public String getBasePrimaryKey() {
		return "timeCheck.ID";
	}
	
	
	@Override
	public JSONArray getEmployeeID2(){
		String[] properties =new String[]{
			"employeeName",
			"employee.ID",
		};
		String leftconditionString = "JOIN duty ON dutyID = duty.ID and dutyName='审核人'";
		return JSONArray.fromObject(entityDao.searchForeign(properties,"employee", leftconditionString, null, "1=1"));
	}
	
	
	@Override
	public JSONArray getEmployeeID1BySeeion(HttpSession session){
		String[] properties =new String[]{
			"employeeName",
			"employee.ID",
		};
		String condition="ID = '"+session.getAttribute("ID").toString()+"'";
		return JSONArray.fromObject(entityDao.searchForeign(properties,"employee", null, null, condition));
	}
	
	@Override
	public JSONArray getDepartment(int type){
			String[] properties =new String[]{
					"departmentName",
				};
			return JSONArray.fromObject(entityDao.findByCondition(properties, "1=1", Department.class));
	}
	
	
	@Override
	public Map<String, Object> getTimeCheckWithPaging(int limit, int offset,String order,String sort,String projectcode,String projectpoint, 
			String starttime,String endtime,String projectname,String department,String chargePer,
			HttpSession session) {
		int index = limit;
		int pageNum = offset/limit;
		String tablename = "timeCheck";
		String conditiona2 = "1=1" + " and qualityPlanID = '" + session.getAttribute("qualiyPlanId")+"'" +" and employee3.ID= '"+session.getAttribute("ID").toString()+"'";
		String[] properties = new String[]{
				"timeCheck.ID",
				"employee3.ID",
				"timeCheck.projectCode",
				"timeCheck.projectName",
				"timeCheck.projectPoint",
				"department.departmentName",
				"date_format(endTime, '%Y-%m-%d') as endTime",
				"timeCheck.reason",
				"employeeName",
				"employeeName2",
				"timeCheck.auditState",
				"timeCheck.remark",
				"timeCheck.result",
		};
		
		if(projectcode!=null&&projectcode!=""){
			conditiona2 = conditiona2 + " and projectCode like '%" + projectcode +"%'";
		};
		if(projectpoint!=null&&projectpoint!=""){
			conditiona2 = conditiona2 +" and " + "projectPoint like '%" + projectpoint + "%'";
		};	
		if (starttime != null && !starttime.trim().equals("")
				&& endtime != null && !endtime.trim().equals("")) {
			conditiona2 =conditiona2+ " and endTime  between '"
					+ starttime + "' " + " and '"
					+ endtime + "'";
		};
		if(projectname!=null&&projectname!=""){
			conditiona2 = conditiona2 +" and "+"projectName like '%" + projectname + "%'";
		};
		if(department!=null&&department!=""){
			conditiona2 = conditiona2 +" and "+"departmentName like '%" + department + "%'";
		};
		if(chargePer!=null&&chargePer!=""){
			conditiona2 = conditiona2 +" and "+"employeeName like '%" + chargePer + "%'";
		};
		
		String leftstrString = "LEFT JOIN department ON timeCheck.departmentID = department.ID "
							+ "LEFT JOIN (select employeeName , qualityplan.ID as newID from employee,qualityplan where qualityplan.employeeID2 = employee.ID) as employee2 on employee2.newID = timeCheck.qualityplanID"
				+" LEFT JOIN (select employeeName as employeeName2,ID from employee) as employee3 on timecheck.employeeID = employee3.ID";
				
		List<Map<String, Object>> result = entityDao.searchWithpaging(properties, tablename, leftstrString, null, conditiona2, null, sort, order, index, pageNum);
		int count = getForeignCountInFull("timeCheck.ID", leftstrString,null, conditiona2, false);
		int i = 1;
		for (Map<String, Object> m : result)  
	    { 
			if(i<=count){
				m.put("number", i);
				i=i+1;
			}
	    }
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total",count);
		map.put("rows",result);
		return map;
	}
	
	@Override
	public Map<String, Object> getARTimeCheckWithPaging(int limit, int offset,String order,String sort,String projectcode,String projectpoint, 
			String starttime,String endtime,String projectname,String department,String chargePer,
			HttpSession session) {
		int index = limit;
		int pageNum = offset/limit;
		String tablename = "timeCheck";
		String conditiona2 = "1=1" + " and qualityPlanID = '" + session.getAttribute("qualiyPlanId")+"'";
		String[] properties = new String[]{
				"timeCheck.ID",
				"employee3.ID",
				"timeCheck.projectCode",
				"timeCheck.projectName",
				"timeCheck.projectPoint",
				"department.departmentName",
				"date_format(endTime, '%Y-%m-%d') as endTime",
				"timeCheck.reason",
				"employeeName",
				"employeeName2",
				"timeCheck.auditState",
				"timeCheck.remark",
				"timeCheck.result",
		};
		
		if(projectcode!=null&&projectcode!=""){
			conditiona2 = conditiona2 + " and projectCode like '%" + projectcode +"%'";
		};
		if(projectpoint!=null&&projectpoint!=""){
			conditiona2 = conditiona2 +" and " + "projectPoint like '%" + projectpoint + "%'";
		};	
		if (starttime != null && !starttime.trim().equals("")
				&& endtime != null && !endtime.trim().equals("")) {
			conditiona2 =conditiona2+ " and endTime  between '"
					+ starttime + "' " + " and '"
					+ endtime + "'";
		};
		if(projectname!=null&&projectname!=""){
			conditiona2 = conditiona2 +" and "+"projectName like '%" + projectname + "%'";
		};
		if(department!=null&&department!=""){
			conditiona2 = conditiona2 +" and "+"departmentName like '%" + department + "%'";
		};
		if(chargePer!=null&&chargePer!=""){
			conditiona2 = conditiona2 +" and "+"employeeName like '%" + chargePer + "%'";
		};
		
		String leftstrString = "LEFT JOIN department ON timeCheck.departmentID = department.ID "
							+ "LEFT JOIN (select employeeName , qualityplan.ID as newID from employee,qualityplan where qualityplan.employeeID2 = employee.ID) as employee2 on employee2.newID = timeCheck.qualityplanID"
				+" LEFT JOIN (select employeeName as employeeName2,ID from employee) as employee3 on timecheck.employeeID = employee3.ID";
				
		List<Map<String, Object>> result = entityDao.searchWithpaging(properties, tablename, leftstrString, null, conditiona2, null, sort, order, index, pageNum);
		int count = getForeignCountInFull("timeCheck.ID", leftstrString,null, conditiona2, false);
		int i = 1;
		for (Map<String, Object> m : result)  
	    { 
			if(i<=count){
				m.put("number", i);
				i=i+1;
			}
	    }
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total",count);
		map.put("rows",result);
		return map;
	}
	
	@Override
	public String addTimeCheck(String projectName,String projectPoint,String endTime,String remark,HttpSession session) throws ParseException{
		String id = EntityIDFactory.createId();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		TimeCheck timeCheck = new TimeCheck();
		String code = (int)(Math.random()*(9999-1000+1))+1000+"";
		timeCheck.setID(id);
		timeCheck.setQualityPlanID(session.getAttribute("qualiyPlanId").toString());
		timeCheck.setProjectCode(code);
		timeCheck.setProjectName(projectName);
		timeCheck.setProjectPoint(projectPoint);
		String userID = (String)session.getAttribute("ID");// 获取用户名ID
		if (userID != null && !userID.trim().equals("")) {
			List<Employee> ens = entityDao.getByCondition(" ID = '" + userID
					+ "'", Employee.class);
			if (ens.size() > 0) {
				timeCheck.setDepartmentID(ens.get(0).getDepartmentID());// 设置部门ID
			}
		}
		timeCheck.setEndTime(sdf.parse(endTime));
		timeCheck.setEmployeeID(session.getAttribute("ID").toString());
		timeCheck.setReason("");
		timeCheck.setAuditState("待审核");
		timeCheck.setResult("");
		timeCheck.setRemark(remark);
		return entityDao.save(timeCheck)+"";
	} 
	
	@Override
	public int updataTimeCheck(String id,String projectName,String  projectPoint,String endTime,String remark) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = sdf.parse(endTime);
		TimeCheck timeCheck = new TimeCheck();
		timeCheck.setProjectName(projectName);
		timeCheck.setProjectPoint(projectPoint);
		timeCheck.setReason("");
		timeCheck.setAuditState("待审核");
		timeCheck.setEndTime(date);
		timeCheck.setRemark(remark);
		return entityDao.updatePropByID(timeCheck, id);
	}
	
	@Override
	public String deleteTimeCheck(String idstr){
		String[] allid = idstr.split(",");
		return entityDao.deleteEntities(allid, TimeCheck.class)+"";
	}
	
	@Override
	public Map<String, Object> getTimecheckFileWithPaging(int limit, int offset,String order,String sort,String planID) {
		System.out.println("planID="+planID);
		int index = limit;
		int pageNum = offset/limit;
		String tablename = "fileinformation";
		String conditon="belongtoID='"+planID+"'";
		String[] properties = new String[]{
				"ID",
				"fileName",
				"date_format(uploadTime, '%y-%m-%d') as uploadTime",
				"remarks",
		};
		List<Map<String, Object>> result = entityDao.searchWithpaging(properties, tablename, null, null, conditon, null, sort ,order , index, pageNum);
		int count = entityDao.getByCondition(conditon, FileInformation.class).size();
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows",result);
		return map;
	}
	
	@Override
	public int AuditAndResultUpdata(int i,String id,String reason){
		TimeCheck timeCheck = new TimeCheck();
		if(i==1){
			if(reason==null||reason==""){
				timeCheck.setAuditState("通过");
				timeCheck.setReason(reason);
			}else{
				}
		}else if(i==2){
			if(reason!=null&&reason!=""){
				timeCheck.setAuditState("不通过");
				timeCheck.setReason(reason);
			}else{
				}
		}
		else{
			if(i==8){
				timeCheck.setResult("满意");
			}else {
				timeCheck.setResult("不满意");
			}
				}
		return entityDao.updatePropByID(timeCheck, id);
	}
	
	@Override
	public Boolean upload(HttpServletRequest request,HttpServletResponse response, ModelMap model) throws IOException {
		  MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		  // 得到上传的文件
		  MultipartFile mFile = multipartRequest.getFile("file");
		  System.out.println("mFile="+mFile);
		  // 得到上传服务器的路径
		  String path = request.getSession().getServletContext().getRealPath("/WEB-INF/");
		 
		  System.out.println(path);
		  String filename = mFile.getOriginalFilename();
		  String remark = request.getParameter("remark");
		  String belongID = request.getParameter("belongID");
		  
		  if(filename==null||filename==""){
			  return false;
		  }
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
		  String result = this.saveFiles(fr);
		  if(result=="true"){
			  return true;
		  }else {
			return false;
		}
		 }
	
	@Override
	public String saveFiles(FileInformation fr) {
		return baseEntityDao.save(fr) == 1 ? "true" : "false";
	}
}
