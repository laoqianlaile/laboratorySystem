package com.cqut.xiji.service.equipmentUse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.equipmentUse.EquipmentUse;
import com.cqut.xiji.service.base.SearchService;

@Service
public class EquipmentUseService extends SearchService implements IEquipmentUseService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "equipmentUse";
	}

	@Override
	public String getBasePrimaryKey() {
		return "equipmentUse.ID";
	}
	
	@Override
	public Map<String, Object> getEquipmentUseWithPaging(int limit, int offset,
			String sort, String order, String equipmentName, String testProject,
			String sampleName, String applicat, String startTime, String endTime){
		// TODO Auto-generated method stub
				int index = limit;
				int pageNum = offset/limit ;
				//String tableName = "contract";
				String[] properties = new String[]{
						"b.ID",
						"b.equipmentID",
						"b.sampleID",
						"b.testProjectID",
						"b.application",
						"date_format(b.applyTime,'%Y.%m.%d') as applyTime",
						"b.equipmentFactoryCode",
						"b.equipmentName",
						"b.model",
						"b.employeeName",
						"b.departmentName",
						"testProject.nameCn",
						"sample.factoryCode",
						"sample.sampleName"
				};
				String baseEntity = "(select a.ID,a.equipmentID,a.sampleID,a.testProjectID,a.application,a.applyTime,a.equipmentFactoryCode," +
											"a.equipmentName,a.model,a.employeeName,department.departmentName " +
									"from (select equipmentuse.ID,equipmentuse.equipmentID,equipmentuse.sampleID," +
												 "equipmentuse.testProjectID,equipmentuse.application,equipmentuse.applyTime," +
												 "equipment.factoryCode as equipmentFactoryCode,equipment.equipmentName,equipment.model," +
												 "employee.employeeName,employee.departmentID " +
												 "from equipmentuse " +
												 "LEFT JOIN employee ON equipmentuse.application = employee.ID " +
												 "LEFT JOIN equipment ON equipmentuse.equipmentID = equipment.ID ) as a " +
									"LEFT JOIN department ON a.departmentID = department.ID) as b ";
				String joinEntity = "LEFT JOIN testProject ON b.testProjectID = testProject.ID " +
									"LEFT JOIN sample ON b.sampleID = sample.ID ";
				String condition = " 1 = 1 "; 
				if (equipmentName != null && !equipmentName.isEmpty()) {
					condition += " and b.equipmentName like '%" + equipmentName+ "%'";
				}if (testProject != null && !testProject.isEmpty()) {
					condition += " and testProject.nameCn like '%" + testProject + "%'";
				}if (startTime != null && !startTime.isEmpty()) {
					condition += " and b.applyTime >'" + startTime + "'";
				}if (endTime != null && !endTime.isEmpty()) {
					condition += " and b.applyTime <'" + endTime + "'";
				}if (sampleName != null && !sampleName.isEmpty()) {
					condition += " and sample.sampleName like '%" + sampleName + "%'";
				}if (applicat != null && !applicat.isEmpty()) {
					condition += " and b.employeeName like '%" + applicat + "%'";
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
	 * @description 删除设备使用记录
	 * @author hujiajun
	 * @created 2016年12月10日15:01:37
	 * @param equipmentCodes
	 * @return
	 * @see EquipmentUseService
	 */
	@Override
	public int delEquipmentUse(String equipmentUseId) {
		// TODO Auto-generated method stub
		if(equipmentUseId == null || equipmentUseId.isEmpty()){
			return 0;
		}
		
		String position = "equipmentUse.Id =" + equipmentUseId;
		int result = entityDao.deleteByCondition(position, EquipmentUse.class);
		return result;
	}
}
