package com.cqut.xiji.service.equipmentRepair;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
import com.cqut.xiji.entity.equipmentRepair.EquipmentRepair;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class EquipmentRepairService extends SearchService implements IEquipmentRepairService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "equipmentRepair";
	}

	@Override
	public String getBasePrimaryKey() {
		return "equipmentRepair.ID";
	}
	
	@Override
	public Map<String, Object> getEquipmentRepairWithPaging(int limit, int offset,
			String sort, String order, String factoryCode, String equipmentName,
			String model, String employeeName){
		// TODO Auto-generated method stub
				int index = limit;
				int pageNum = offset/limit ; 
				//String tableName = "contract";
				String[] properties = new String[]{
						"a.ID", 
						"a.equipmentID",
						"equipment.factoryCode", 
						"equipment.equipmentName", 
						"equipment.model", 
						"equipment.useYear",
						"date_format(a.repairTime,'%Y.%m.%d') as repairTime", 
						"a.employeeID", 
						"a.employeeName", 
						"a.beforeStatus", 
						"a.afterStatus", 
						"a.mounting", 
						"a.money", 
						"a.remarks"
				};
				String baseEntity = "(select equipmentrepair.*,employee.employeeName " +
									"from equipmentrepair " +
									"LEFT JOIN employee ON equipmentrepair.employeeID = employee.ID) as a ";
				String joinEntity = "LEFT JOIN equipment ON a.equipmentID = equipment.ID ";
				String condition = " 1 = 1 "; 
				if (factoryCode != null && !factoryCode.isEmpty()) {
					condition += " and equipment.factoryCode like '%" + factoryCode+ "%'";
				}
				if (equipmentName != null && !equipmentName.isEmpty()) {
					condition += " and equipment.equipmentName like '%" + equipmentName+ "%'";
				}if (model != null && !model.isEmpty()) {
					condition += " and equipment.model like '%" + model + "%'";
				}if (employeeName != null && !employeeName.isEmpty()) {
					condition += " and a.employeeName like '%" + employeeName + "%'";
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
	 * @param equipmentRepairIds
	 * @return
	 * @see EquipmentRepairService
	 */
	@Override
	public int delEquipmentRepair(String equipmentRepairIds) {
		// TODO Auto-generated method stub
		if(equipmentRepairIds == null || equipmentRepairIds.isEmpty()){
			return 0;
		}
		
		String position = equipmentRepairIds;
		int result = entityDao.deleteByCondition(position, EquipmentRepair.class);
		return result;
	}
	
	@Override
	public int addEquipmentRepair(String equipmentID,String equipmentName, String repairTime,
			String employeeID,String employeeName, String beforeStatus, String afterStatus,
			String mounting, int money, String remarks){
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
			if(!employeeID1.equals(employeeID)){
				System.out.println("员工名与员工ID不相符");
				return -8;
			}
		}
		EquipmentRepair equipmentRepair = new EquipmentRepair();
		String id = EntityIDFactory.createId();
		equipmentRepair.setID(id);
		equipmentRepair.setEquipmentID(equipmentID);
		equipmentRepair.setBeforeStatus(beforeStatus);
		equipmentRepair.setMounting(mounting);
		equipmentRepair.setEmployeeID(employeeID);
		equipmentRepair.setAfterStatus(afterStatus);
		equipmentRepair.setMoney(money);
		equipmentRepair.setRemarks(remarks);
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd");
		Date repairTime1 = null;
		try {
			repairTime1 = sdf.parse(repairTime);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (repairTime1 != null) {
			equipmentRepair.setRepairTime(repairTime1);
		}
		
		int results = entityDao.save(equipmentRepair);
		
		if(results <= 0){
			String position = "ID =" + id;
			results = entityDao.deleteByCondition(position, EquipmentRepair.class);
			return results;
		}
		
		return results;
	}
	
	@Override
	public int updEquipmentRepair(String ID, String equipmentID,String equipmentName, String repairTime,
			String employeeID,String employeeName, String beforeStatus, String afterStatus,
			String mounting, int money, String remarks){
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
			if(!employeeID1.equals(employeeID)){
				System.out.println("员工名与员工ID不相符");
				return -8;
			}
		}
		EquipmentRepair equipmentRepair = new EquipmentRepair();
		equipmentRepair.setID(ID);
		equipmentRepair.setEquipmentID(equipmentID);
		equipmentRepair.setBeforeStatus(beforeStatus);
		equipmentRepair.setMounting(mounting);
		equipmentRepair.setEmployeeID(employeeID);
		equipmentRepair.setAfterStatus(afterStatus);
		equipmentRepair.setMoney(money);
		equipmentRepair.setRemarks(remarks);
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd");
		Date repairTime1 = null;
		try {
			repairTime1 = sdf.parse(repairTime);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (repairTime1 != null) {
			equipmentRepair.setRepairTime(repairTime1);
		}
		
		int results = entityDao.updatePropByID(equipmentRepair,ID);
		return results;
	}
}
