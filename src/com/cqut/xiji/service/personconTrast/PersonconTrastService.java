package com.cqut.xiji.service.personconTrast;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.department.Department;
import com.cqut.xiji.entity.employee.Employee;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.entity.personconTrast.PersonconTrast;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;
/*import java.*/
@Service
public class PersonconTrastService extends SearchService implements IPersonconTrastService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "personconTrast";
	}

	@Override
	public String getBasePrimaryKey() {
		return "personconTrast.ID";
	}
	
	//新增
	@Override
	public int savePersonconTrast(PersonconTrast personconTrast,
			HttpSession session) {
		// 获取用户名ID以及该用户的部门ID
		String userID = (String) session.getAttribute("ID");// 获取用户名ID
		personconTrast.setID(EntityIDFactory.createId());
		if (userID != null && !userID.trim().equals("")) {
			List<Employee> ens = entityDao.getByCondition(" ID = '" + userID
					+ "'", Employee.class);
			if (ens.size() > 0) {
				personconTrast.setDepartmentID(ens.get(0).getDepartmentID());//设置部门ID
			}
		}
		personconTrast.setQualityPlanID(session.getAttribute("qualiyPlanId").toString());
		personconTrast.setEmployeeID0(userID);//设置制定者（用户名）ID
		personconTrast.setAuditState("0");// 0-未审核，1-通过，2-不通过
		personconTrast.setState("0");// 0-未完成，1-完成
		return entityDao.save(personconTrast);
	}
	
   //删除
	@Override
	public String deletePersonconTrastByID(String id) {
		String[] ids = id.split(",");
		return entityDao.deleteEntities(ids, PersonconTrast.class)+"";
	}
    //修改建议
	@Override
	public int updatePersonconTrastByID(PersonconTrast personconTrast) {
		//更新建议则把审核状态设置未审核
		personconTrast.setAuditState("0");
		return entityDao.updatePropByID(personconTrast, personconTrast.getID());
	}
	
	//获取初始化页面数据
	@Override
	public Map<String, Object> getPersonconTrastWithPaging(int limit,
			int offset, String order, String sort, String condition) {
		
		int  pageNum= limit;
		int  index= offset/limit;		
		String tableName = "personContrast";
		String group = "personcontrast.ID";
		String[] properties = new String[]{
				"personContrast.ID", //人员比对建议ID
				"qualityPlanID", //计划乐行ID
				"projectCode", //项目编号
				"projectName", //项目名
				"testDevice", //测试装置
				"personContrast.departmentID", //部门ID
				"personContrast.employeeID0", //建议制定者ID
				"personContrast.employeeID1", //比对人员ID
				"personContrast.employeeID2", //待比对人员ID
				"diffierence", //
				"result", //结果
				"DATE_FORMAT(startTime,'%Y-%m-%d') startTime", //执行时间
				"personContrast.state", //状态
				"auditState", //审核状态
				"reason", //不通过原因
				"personContrast.remark", //备注
				"departmentName", //部门名称
				"employee.employeeName as Name1",
				"employee2.Name2",
				"employee0.Name0"
		};
		String contectString = 
				" LEFT JOIN qualityPlan ON qualityPlan.ID = personContrast.qualityPlanID"+
		
				" LEFT JOIN department ON department.ID = personContrast.departmentID"+
				
				" LEFT JOIN (SELECT employee.employeeName as Name2,employee.ID FROM employee," +
				"personcontrast WHERE employee.ID=personcontrast.employeeID2) as employee2 ON" +
				" employee2.ID = personContrast.employeeID2"+
				
				" LEFT JOIN (SELECT employee.employeeName as Name0,employee.ID FROM employee," +
				"personcontrast WHERE employee.ID=personcontrast.employeeID0) as employee0 ON" +
				" employee0.ID = personContrast.employeeID0"+
				
		        " LEFT JOIN employee ON employee.ID = personContrast.employeeID1";
		
		List<Map<String, Object>> result = originalSearchWithpaging(properties, tableName, contectString, null,
				condition, false, group, sort, order, pageNum, index);
	
		int count = getForeignCountInFull("personContrast.ID", contectString, null, condition, false);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}
    
	//审核
	@Override
	public int auditPersonconTrastByID(PersonconTrast personconTrast) {
		return entityDao.updatePropByID(personconTrast, personconTrast.getID());
	}
	
	//填写结果
	@Override
	public int resultPersonconTrastByID(PersonconTrast personconTrast) {		
		return entityDao.updatePropByID(personconTrast, personconTrast.getID());
	}
	
	@Override
	public String getPersonconTrast(String ID) {
		// TODO Auto-generated method stub
		if(ID == null || ID.isEmpty()){
			return "error";
		}else{
			
			PersonconTrast PersonconTrastByEntityDao = entityDao.getByID(ID, PersonconTrast.class);
			System.out.println("EntityDao:  " + PersonconTrastByEntityDao.toString());
	
			List<Map<String, Object>> roleBySearchDao = searchDao.searchForeign(new String[]{"*"}, "personContrast", null, null, null, " 1=1 ");
			return JSONArray.fromObject(roleBySearchDao).toString();
		}
	}

	@Override
	public JSONArray getdepartmentlist() {
		String[] properties = new String[]{
				"ID",
				"departmentName"
				};
		return JSONArray.fromObject(entityDao.findByCondition(properties, "1=1", Department.class));
		}

	@Override
	public JSONArray getbydepartment(String departmentId) {
		
		String condition ="";
		if(departmentId==null||departmentId==""){
			condition = "1=1";
		}else{
			condition = "employee.departmentID='"+departmentId+"'";
		};
		return JSONArray.fromObject(entityDao.findByCondition(new String[]{
				"ID",
				"employeeName"
		}, condition, Employee.class));

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
