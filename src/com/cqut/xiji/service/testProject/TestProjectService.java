package com.cqut.xiji.service.testProject;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.contract.Contract;
import com.cqut.xiji.entity.department.Department;
import com.cqut.xiji.entity.equipment.Equipment;
import com.cqut.xiji.entity.standard.Standard;
import com.cqut.xiji.entity.testInstument.TestInstument;
import com.cqut.xiji.entity.testProject.TestProject;
import com.cqut.xiji.entity.testStandard.TestStandard;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class TestProjectService extends SearchService implements ITestProjectService {

	@Resource(name = "entityDao")
	EntityDao entityDao;

	@Resource(name = "searchDao")
	SearchDao searchDao;

	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "testProject";
	}

	@Override
	public String getBasePrimaryKey() {
		return "testProject.ID";
	}

	@Override
	public Map<String, Object> getTestProjectWithPaging(String departmentID,
			String nameCnORnameEn, int limit, int offset, String order,
			String sort) {
		int index = limit;
		int pageNum = offset / limit;

		String tableName = "testProject";
		String[] properties = new String[] { "testProject.ID as testProjectID",
				"testProject.NAMEEN", "testProject.NAMECN",
				"testProject.ENVIRONMENTALREQUIREMENTS",
				"testproject.describes",
				"testproject.remarks",
				"GROUP_CONCAT(distinct testInstument.ID ) AS testInstumentID",
				"GROUP_CONCAT(distinct	testStandard.ID) AS testStandardID",
				"GROUP_CONCAT(distinct  standard.STANDARDCODE) as STANDARDCODE",
				"GROUP_CONCAT(equipment.equipmentName) as EQUIPMENTNAME",
				"GROUP_CONCAT(equipment.ID) AS EQUIPMENTID",
				"department.DEPARTMENTNAME", 
				"DATE_FORMAT(testProject.CREATETIME,'%Y-%m-%d %H:%i') as createTime",
				"department.ID as DEPARTMENTID",
				"template.`name`" };

		String condition = "1 = 1 ";
		if (departmentID != null && departmentID != "") {
			condition += " and department.id = '" + departmentID + "' ";
		}
		if (nameCnORnameEn != null && nameCnORnameEn != "") {
			condition += " and testproject.nameCn like '%" + nameCnORnameEn
					+ "%' or testproject.nameEn like '%" + nameCnORnameEn
					+ "%' ";
		}
		String joinEntity = "LEFT JOIN testinstument on testproject.ID = testinstument.testProjectID "
				+ "LEFT JOIN teststandard on testproject.ID = teststandard.testProjectID "
				+ "LEFT JOIN standard on standard.ID = teststandard.standardID "
				+ "LEFT JOIN department on department.ID = testproject.departmentID "
				+ "LEFT JOIN template on template.ID = testproject.templateID "
				+ "LEFT JOIN equipment on equipment.ID = testinstument.equipmentID";

		String groupField = "testproject.ID ";
		List<Map<String, Object>> result = originalSearchWithpaging(properties,
				tableName, joinEntity, null, condition, false, groupField,
				sort, order, index, pageNum);

		int count = getForeignCountInFull("testproject.ID", joinEntity, null,
				condition, false);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.cqut.xiji.service.testProject.ITestProjectService#addTestProject(
	 * java.lang.String, java.lang.String, java.lang.String, java.lang.String,
	 * java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public String addTestProject(String NAMECN, String NAMEEN,
			String DEPARTMENTID, String ENVIRONMENTALREQUIREMENTS,
			String STANDARDID, String EQUIPMENTID,String describes,String remarks) {

		int result = 0; //
		// 检测项目
		TestProject testProject = new TestProject();

		testProject.setID(EntityIDFactory.createId());
		testProject.setNameEn(NAMEEN);
		testProject.setNameCn(NAMECN);
		testProject.setDepartmentID(DEPARTMENTID);
		testProject.setEnvironmentalRequirements(ENVIRONMENTALREQUIREMENTS);
		testProject.setStandardID(STANDARDID);
		testProject.setDescribes(describes);
		testProject.setRemarks(remarks);
		testProject.setCreateTime(new Date());

		result += entityDao.save(testProject);
		// 检测标准
		TestStandard testStandard = new TestStandard();

		testStandard.setID(EntityIDFactory.createId());
		testStandard.setStandardID(STANDARDID);
		testStandard.setTestProjectID(testProject.getID());

		result += entityDao.save(testStandard);
		// 检测仪器

		String[] EQUIPMENTIDs = EQUIPMENTID.replaceAll(" ", "").split(",");
		if (EQUIPMENTIDs.length > 0) {

			for (int i = 0; i < EQUIPMENTIDs.length; i++) {
				TestInstument testInstument = new TestInstument();
				testInstument.setID(EntityIDFactory.createId());
				testInstument.setTestProjectID(testProject.getID());
				testInstument.setEquipmentID(EQUIPMENTIDs[i]);

				result += entityDao.save(testInstument);

			}
		}
		return result + "";

	}

	@Override
	public String upTestProject(String testProjectID,String testStandardID,String testInstumentID,String NAMECN,
			String NAMEEN, String DEPARTMENTID,
			String ENVIRONMENTALREQUIREMENTS, String STANDARDID,
			String EQUIPMENTID,String describes,String remarks) {
		int result = 0; //

		// 检测项目
		TestProject testProject = new TestProject();

		testProject.setNameEn(NAMEEN);
		testProject.setNameCn(NAMECN);
		testProject.setDepartmentID(DEPARTMENTID);
		testProject.setEnvironmentalRequirements(ENVIRONMENTALREQUIREMENTS);
		testProject.setStandardID(STANDARDID);
		testProject.setDescribes(describes);
		testProject.setRemarks(remarks);

		result += entityDao.updatePropByID(testProject,testProjectID);
		// 检测标准
		
		entityDao.deleteByCondition(" testProjectID =" + testProjectID, TestStandard.class);
		
		TestStandard testStandard = new TestStandard();
		
		testStandard.setID(EntityIDFactory.createId());
		testStandard.setStandardID(STANDARDID);
		testStandard.setTestProjectID(testProjectID);
		result += entityDao.save(testStandard);
		// 检测仪器

		int IsDelete = 0;
		
		
		IsDelete += entityDao.deleteByCondition(" testProjectID = " + testProjectID, TestInstument.class);
		if(IsDelete >= 0){
			String[] EQUIPMENTIDs = EQUIPMENTID.replaceAll(" ", "").split(",");
			if (EQUIPMENTIDs.length > 0) {

				for (int i = 0; i < EQUIPMENTIDs.length; i++) {
					TestInstument testInstument = new TestInstument();
					testInstument.setID(EntityIDFactory.createId());
					testInstument.setTestProjectID(testProjectID);
					testInstument.setEquipmentID(EQUIPMENTIDs[i]);
					result += entityDao.save(testInstument);
				}
			}
		}
		return result + "";
	}

	@Override
	public String delTestProject(String TestProjectIDs) {
		if (TestProjectIDs == null || TestProjectIDs.isEmpty()) {
			return 0 + "";
		}
		String[] ids = TestProjectIDs.split(",");

		int result = entityDao.deleteEntities(ids, TestProject.class);
		if (ids.length == 1) {
			result += entityDao.deleteByCondition(
					"teststandard.testProjectID =  " + ids[0],
					TestStandard.class);
			result += entityDao.deleteByCondition(
					"testinstument.testProjectID =  " + ids[0],
					TestInstument.class);
		} else {
			for (int i = 0; i < ids.length; i++) {
				result += entityDao.deleteByCondition(
						"teststandard.testProjectID =  " + ids[i],
						TestStandard.class);
				result += entityDao.deleteByCondition(
						"testinstument.testProjectID =  " + ids[i],
						TestInstument.class);
			}
		}
		return result + "";
	}

	@Override
	public List<Map<String, Object>> getDepartment() {

		String[] properties = new String[] {

		"Department.ID", "Department.departmentName"

		};

		List<Map<String, Object>> result = entityDao.findByCondition(
				properties, " 1 = 1", Department.class);

		return result;
	}

	@Override
	public List<Map<String, Object>> getEquipment() {
		String[] properties = new String[] {

		"equipment.ID", "equipment.equipmentName"

		};

		List<Map<String, Object>> result = entityDao.findByCondition(
				properties, " 1 = 1", Equipment.class);

		return result;
	}

	@Override
	public List<Map<String, Object>> getStandard() {

		String[] properties = new String[] {

		"standard.ID", "standard.STANDARDCODE" , "standard.state"

		};

		List<Map<String, Object>> result = entityDao.findByCondition(
				properties, " 1 = 1 and state = 1", Standard.class);

		return result;
	}

	@Override
	public Map<String, Object> getTestproWithPaging(int limit, int offset,
			String order, String sort, String contract,HttpSession session) {
		System.out.println("kaishi222" + "<br />");
		int index = limit;
		int pageNum = offset / limit;
		String tablename = "testproject";
		String acondition = "ID in (SELECT testprojectID from contractfineitem WHERE contractID in("+
		"SELECT ID from contract WHERE companyID in ("+
		"SELECT companyID from client WHERE clientNo = \""+session.getAttribute("clientNo").toString()+"\")))";
		String[] properties = new String[] { "ID", "nameCn", "DATE_FORMAT(createTime,'%Y-%m-%d') createTime" };
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tablename, null, null, acondition, null, sort, order,
				index, pageNum);
		int count = entityDao.getByCondition("1=1", TestProject.class).size();
		String receive = "";
		for (Map<String, Object> m : result) {
			Map map2 = m;
			receive = "<span class='tabledata'>"
					+ map2.get("createTime").toString() + "</span>";
			m.put("nameCn",
					"<img class='point-image' src='Portal/images/point_triangle.png' />"
							+ "<span class='tablevalue'>" + map2.get("nameCn")
							+ "</span>" + receive);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		System.out.println(map.toString());
		return map;
	}

	/**
	 * 
	 * 
	 * @author wzj
	 * @date 2016年11月19日 上午9:45:23
	 * 
	 */
	@Override
	public List<Map<String, Object>> getTestProjectListByName(String matchName) {
		// TODO Auto-generated method stub
		String condition = "";
		String[] properties = new String[] {
				"testproject.ID ",
				"IF(testproject.nameCn IS  NULL , testproject.nameEn , "
						+ " if ( testproject.nameEn is null ,testproject.nameCn,"
						+ " CONCAT(testproject.nameCn,'(',testproject.nameEn,')') )) as testName " };
		if(matchName != null && !matchName.equals("")){
			matchName = matchName.replaceAll(" ", "");
			condition = " testproject.nameCn LIKE '%"+matchName+"%' or testproject.nameEn  like '%"+matchName+"%' ";
		}else{
			condition = " 1=1 ";
		}
		
		List<Map<String, Object>> list = entityDao.findByCondition(properties,
				condition, TestProject.class);
		return list;
	}

	
	/**
	 * @description 通过检测项目名称得到设备信息
	 * @author hujiajun
	 * @created 2016年12月12日19:13:01
	 * @param testProjectName
	 */
	@Override
	public List<Map<String, Object>> getTestProjectByName(String testProjectName){
		String[] properties = new String[] {"ID","nameCn","nameEn"};
		String condition = " nameCn like '%" + testProjectName + "%' or nameEn like '%" + testProjectName + "%'";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, TestProject.class);
		return result;
	}
	
	/**
	 * @description 通过检测项目ID得到设备信息
	 * @author hujiajun
	 * @created 2016年12月12日19:13:01
	 * @param testProjectByID
	 */
	@Override
	public List<Map<String, Object>> getTestProjectById(String testProjectByID){
		String[] properties = new String[] {"ID","nameCn","nameEn"};
		String condition = " ID = '" + testProjectByID + "'";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, TestProject.class);
		return result;
	}
	
	@Override
	public List<Map<String, Object>> getTestProject(String testProjectNamae) {
		String[] properties = new String[] { "DISTINCT(IF (testproject.nameCn IS NULL,testproject.nameEn,"
				+ "IF (testproject.nameEn IS NULL,testproject.nameCn,"
				+ "CONCAT(testproject.nameCn,'(',testproject.nameEn,')')))) AS testProjectName" };
	String condition = " 1 = 1 ";
		if (testProjectNamae != null && !testProjectNamae.isEmpty()&& !testProjectNamae.equals("")) {
			condition += " AND (testproject.nameCn LIKE '%" + testProjectNamae
					+ "%' OR testproject.nameEn LIKE '%" + testProjectNamae
					+ "%' )";
		}
		List<Map<String, Object>> result = entityDao.findByCondition(
				properties, condition, TestProject.class);
		return result;
	}
}




