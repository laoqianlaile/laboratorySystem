package com.cqut.xiji.service.equipmentScrap;

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
import com.cqut.xiji.entity.equipmentScrap.EquipmentScrap;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class EquipmentScrapService extends SearchService implements IEquipmentScrapService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "equipmentScrap";
	}

	@Override
	public String getBasePrimaryKey() {
		return "equipmentScrap.ID";
	}
	
	@Override
	public Map<String, Object> getEquipmentScrapWithPaging(int limit, int offset,String sort,
			String order, String model, String equipmentName,String departmentID){
		// TODO Auto-generated method stub
				int index = limit;
				int pageNum = offset/limit ;
				//String tableName = "contract";
				String[] properties = new String[]{
						"b.ID", 
						"b.equipmentID",
						"b.factoryCode", 
						"b.equipmentName", 
						"b.model",
						"b.departmentID", 
						"department.departmentName",
						"date_format(b.buyTime,'%Y.%m.%d') as buyTime",
						"date_format(b.checkinTime,'%Y.%m.%d') as checkinTime", 
						"b.employeeID", 
						"b.employeeName", 
						"b.useTime", 
						"b.remarks"
				};
				String baseEntity = "(select a.*,equipment.factoryCode,equipment.equipmentName," +
											"equipment.model,equipment.departmentID " +
									"from (select equipmentscrap.*,employee.employeeName " +
										  "from equipmentscrap " + 
										  "LEFT JOIN employee ON equipmentscrap.employeeID = employee.ID) as a " +
									"LEFT JOIN equipment ON a.equipmentID = equipment.ID) as b ";
				String joinEntity = "LEFT JOIN department ON b.departmentID = department.ID ";
				String condition = " 1 = 1 "; 
				if (equipmentName != null && !equipmentName.isEmpty()) {
					condition += " and b.equipmentName like '%" + equipmentName+ "%'";
				}if (model != null && !model.isEmpty()) {
					condition += " and b.model like '%" + model + "%'";
				}if (!departmentID.equals("0") && departmentID != null && !departmentID.isEmpty()) {
					condition += " and b.departmentID ='" + departmentID + "'";
				}
				List<Map<String, Object>> result = entityDao.searchWithpaging(
						properties, baseEntity, joinEntity, null, condition, null,sort,
						order, index, pageNum);
				System.out.println("result:"+result);
				int count = entityDao.searchWithpaging(
						properties, baseEntity, joinEntity, null, condition, null,sort,
						order, index, pageNum).size();
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("total", count);
				map.put("rows", result);
				return map;
	}
	
	/**
	 * 
	 * @description 删除设备报废记录
	 * @author hujiajun
	 * @created 2016年12月10日15:01:37
	 * @param equipmentScrapIds
	 * @return
	 * @see EquipmentScrapService
	 */
	@Override
	public int delEquipmentScrap(String equipmentScrapIds) {
		// TODO Auto-generated method stub
		if(equipmentScrapIds == null || equipmentScrapIds.isEmpty()){
			return 0;
		}
		
		String position = equipmentScrapIds;
		int result = entityDao.deleteByCondition(position, EquipmentScrap.class);
		return result;
	}
	
	@Override
	public int addEquipmentScrap(String equipmentID, String employeeID,
			String buyTime, String checkinTime, int useTime, String remarks){
		EquipmentScrap equipmentScrap = new EquipmentScrap();
		String id = EntityIDFactory.createId();
		equipmentScrap.setID(id);
		equipmentScrap.setEquipmentID(equipmentID);
		equipmentScrap.setEmployeeID(employeeID);
		equipmentScrap.setUseTime(useTime);
		equipmentScrap.setRemarks(remarks);
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd");
		Date buyTime1 = null;
		Date checkinTime1 = null;
		try {
			buyTime1 = sdf.parse(buyTime);
			checkinTime1 = sdf.parse(checkinTime);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (buyTime1 != null && checkinTime1 != null) {
			equipmentScrap.setBuyTime(buyTime1);
			equipmentScrap.setCheckinTime(checkinTime1);
		}
		
		int results = entityDao.save(equipmentScrap);
		
		if(results <= 0){
			String position = "ID =" + id;
			results = entityDao.deleteByCondition(position, EquipmentScrap.class);
			return results;
		}
		
		return results;
	}
	
	@Override
	public int updEquipmentScrap(String ID, String equipmentID,String employeeID,
			String buyTime, String checkinTime, int useTime,String remarks){
		// TODO Auto-generated method stub
		EquipmentScrap equipmentScrap = new EquipmentScrap();
		equipmentScrap.setID(ID);
		equipmentScrap.setEquipmentID(equipmentID);
		equipmentScrap.setEmployeeID(employeeID);
		equipmentScrap.setUseTime(useTime);
		equipmentScrap.setRemarks(remarks);
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd");
		Date buyTime1 = null;
		Date checkinTime1 = null;
		try {
			buyTime1 = sdf.parse(buyTime);
			checkinTime1 = sdf.parse(checkinTime);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (buyTime1 != null && checkinTime1 != null) {
			equipmentScrap.setBuyTime(buyTime1);
			equipmentScrap.setCheckinTime(checkinTime1);
		}
		
		int results = entityDao.updatePropByID(equipmentScrap,ID);
		
		/*if(results > 0){
			String position = "ID =" + ID;
			results = entityDao.deleteByCondition(position, Equipment.class);
			return results;
		}*/
		
		return results;
	}
	
}
