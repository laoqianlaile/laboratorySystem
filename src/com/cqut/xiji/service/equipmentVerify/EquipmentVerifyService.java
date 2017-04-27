package com.cqut.xiji.service.equipmentVerify;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.employee.Employee;
import com.cqut.xiji.entity.equipment.Equipment;
import com.cqut.xiji.entity.equipmentVerify.EquipmentVerify;
import com.cqut.xiji.entity.testProject.TestProject;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class EquipmentVerifyService extends SearchService implements IEquipmentVerifyService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "equipmentVerify";
	}

	@Override
	public String getBasePrimaryKey() {
		return "equipmentVerify.ID";
	}
	
	@Override
	public Map<String, Object> getEquipmentVerifyWithPaging(int limit, int offset,
			String sort, String order,String factoryCode,String equipmentName, 
			String employeeName,String departmentName){
		// TODO Auto-generated method stub
				int index = limit;
				int pageNum = offset/limit ;
				//String tableName = "contract";
				String[] properties = new String[]{
						"a.ID",
						"case when a.accuracy = 0 then '低' " + 
						"when a.accuracy = 1 then '中' " + 
						"when a.accuracy = 2 then '高' end as accuracy",
						"a.remarks",
						"case when a.result = 0 then '不合格' " + 
						"when a.result = 1 then '合格' end as result",
						"a.equipmentID",
						"a.factoryCode",
						"a.equipmentName",
						"a.departmentID",
						"a.departmentName",
						"a.verifyID",
						"employee.employeeName",
						"a.testProjectID",
						"testProject.nameCn"
				};
				String baseEntity = "(select equipmentVerify.*,equipment.factoryCode," + 
									 		 "equipment.equipmentName,department.departmentName " +
									 "from equipmentVerify " +
									 "LEFT JOIN equipment ON equipmentVerify.equipmentID = equipment.ID " +
									 "LEFT JOIN department ON equipmentVerify.departmentID = department.ID) as a ";
				String joinEntity = "LEFT JOIN employee ON a.verifyID = employee.ID " +
									"LEFT JOIN testProject ON a.testProjectID = testProject.ID ";
				String condition = " 1 = 1 "; 
				if (factoryCode != null && !factoryCode.isEmpty()) {
					condition += " and a.factoryCode like '%" + factoryCode+ "%'";
				}if (equipmentName != null && !equipmentName.isEmpty()) {
					condition += " and a.equipmentName like '%" + equipmentName+ "%'";
				}if (employeeName != null && !employeeName.isEmpty()) {
					condition += " and employee.employeeName like '%" + employeeName + "%'";
				}if (!departmentName.equals("0") && departmentName != null && !departmentName.isEmpty()) {
					condition += " and a.departmentID ='" + departmentName + "'";
				}
				List<Map<String, Object>> result = entityDao.searchWithpaging(
						properties, baseEntity, joinEntity, null, condition, null,sort,
						order, index, pageNum);
				System.out.println("result:"+result);
				int count = entityDao.searchForeign(properties, baseEntity, joinEntity, null, condition).size();
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("total", count);
				map.put("rows", result);
				return map;
	}
	
	/**
	 * 
	 * @description 删除设备检验记录
	 * @author hujiajun
	 * @created 2016年12月10日15:01:37
	 * @param equipmentVerifyids
	 * @return
	 * @see EquipmentVerifyidsService
	 */
	@Override
	public int delEquipmentVerify(String equipmentVerifyids) {
		// TODO Auto-generated method stub
		if(equipmentVerifyids == null || equipmentVerifyids.isEmpty()){
			return 0;
		}
		
		String position = equipmentVerifyids;
		int result = entityDao.deleteByCondition(position, EquipmentVerify.class);
		return result;
	}
	
	@Override
	public int addEquipmentVerify(String equipmentID,String equipmentName, String testProjectID,String testProjectName, int accuracy,
			String departmentID, int result, String verifyID,String employeeName, String remarks){
		String[] properties1 = new String[] {"ID"};
		String condition1 = " equipment.equipmentName = '" + equipmentName + "'";
		List<Map<String, Object>> result1 = entityDao.findByCondition(properties1, condition1, Equipment.class);
		if(result1.isEmpty()){
			System.out.println("不存在该仪器");
			return -2;
		}else{
			String equipmentID1 = result1.get(0).get("ID").toString();
			if(!equipmentID1.equals(equipmentID)){
				System.out.println("仪器名与仪器ID不相符");
				return -4;
			}
		}
		String[] properties2 = new String[] {"ID"};
		String condition2 = " employeeName = '" + employeeName + "'";
		List<Map<String, Object>> result2 = entityDao.findByCondition(properties2, condition2, Employee.class);
		if(result2.isEmpty()){
			System.out.println("不存在该员工");
			return -6;
		}else{
			String employeeID1 = result2.get(0).get("ID").toString();
			if(!employeeID1.equals(verifyID)){
				System.out.println("员工名与员工ID不相符");
				return -8;
			}
		}
		String[] properties3 = new String[] {"ID"};
		String condition3 = " nameCn = '" + testProjectName + "'";
		List<Map<String, Object>> result3 = entityDao.findByCondition(properties3, condition3, TestProject.class);
		if(result3.isEmpty()){
			System.out.println("不存在该检测项目");
			return -10;
		}else{
			String testProjectID1 = result3.get(0).get("ID").toString();
			if(!testProjectID1.equals(testProjectID)){
				System.out.println("检测项目名与检测项目ID不相符");
				return -12;
			}
		}
		EquipmentVerify equipmentVerify = new EquipmentVerify();
		String id = EntityIDFactory.createId();
		equipmentVerify.setID(id);
		equipmentVerify.setEquipmentID(equipmentID);
		equipmentVerify.setTestProjectID(testProjectID);
		equipmentVerify.setDepartmentID(departmentID);
		equipmentVerify.setAccuracy(accuracy);
		equipmentVerify.setVerifyID(verifyID);
		equipmentVerify.setResult(result);
		equipmentVerify.setRemarks(remarks);
		
		int results = entityDao.save(equipmentVerify);
		
		if(results <= 0){
			String position = "ID =" + id;
			results = entityDao.deleteByCondition(position, EquipmentVerify.class);
			return results;
		}
		
		return results;
	}
	
	@Override
	public int updEquipmentVerify(String ID, String equipmentID,String equipmentName, String testProjectID,String testProjectName, int accuracy,
			String departmentID, int result, String verifyID,String employeeName, String remarks){
		// TODO Auto-generated method stub
		String[] properties1 = new String[] {"ID"};
		String condition1 = " equipment.equipmentName = '" + equipmentName + "'";
		List<Map<String, Object>> result1 = entityDao.findByCondition(properties1, condition1, Equipment.class);
		if(result1.isEmpty()){
			System.out.println("不存在该仪器");
			return -2;
		}else{
			String equipmentID1 = result1.get(0).get("ID").toString();
			if(!equipmentID1.equals(equipmentID)){
				System.out.println("仪器名与仪器ID不相符");
				return -4;
			}
		}
		String[] properties2 = new String[] {"ID"};
		String condition2 = " employeeName = '" + employeeName + "'";
		List<Map<String, Object>> result2 = entityDao.findByCondition(properties2, condition2, Employee.class);
		if(result2.isEmpty()){
			System.out.println("不存在该员工");
			return -6;
		}else{
			String employeeID1 = result2.get(0).get("ID").toString();
			if(!employeeID1.equals(verifyID)){
				System.out.println("员工名与员工ID不相符");
				return -8;
			}
		}
		String[] properties3 = new String[] {"ID"};
		String condition3 = " nameCn = '" + testProjectName + "'";
		List<Map<String, Object>> result3 = entityDao.findByCondition(properties3, condition3, TestProject.class);
		if(result3.isEmpty()){
			System.out.println("不存在该检测项目");
			return -10;
		}else{
			String testProjectID1 = result3.get(0).get("ID").toString();
			if(!testProjectID1.equals(testProjectID)){
				System.out.println("检测项目名与检测项目ID不相符");
				return -12;
			}
		}
		EquipmentVerify equipmentVerify = new EquipmentVerify();
		equipmentVerify.setEquipmentID(equipmentID);
		equipmentVerify.setTestProjectID(testProjectID);
		equipmentVerify.setDepartmentID(departmentID);
		equipmentVerify.setAccuracy(accuracy);
		equipmentVerify.setVerifyID(verifyID);
		equipmentVerify.setResult(result);
		equipmentVerify.setRemarks(remarks);
				
		int results = entityDao.updatePropByID(equipmentVerify,ID);
		return results;
	}
}
