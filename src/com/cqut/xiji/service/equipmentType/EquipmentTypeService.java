package com.cqut.xiji.service.equipmentType;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.equipmentType.EquipmentType;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class EquipmentTypeService extends SearchService implements IEquipmentTypeService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "equipmentType";
	}

	@Override
	public String getBasePrimaryKey() {
		return "equipmentType.ID";
	}
	
	@Override
	public Map<String, Object> getEquipmentTypeWithPaging(int limit,
			int offset, String sort, String order, String equipmentTypeCode,
			String equipmentTypeName){
		int index = limit;
		int pageNum = offset/limit ;
		String tableName = "equipmentType";
		String[] properties = new String[]{
				"equipmentType.ID",
				"equipmentType.typeCode",
				"equipmentType.name",
				"date_format(equipmentType.createTime,'%Y.%m.%d') as createTime",
				"equipmentType.remarks"
		};
		String joinEntity = null;
		String condition = " 1 = 1 "; 
		if (equipmentTypeCode != null && !equipmentTypeCode.isEmpty()) {
			condition += " and typeCode like '%" + equipmentTypeCode+ "%'";
		}if (equipmentTypeName != null && !equipmentTypeName.isEmpty()) {
			condition += " and name like '%" + equipmentTypeName + "'";
		}
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tableName, joinEntity, null, condition, null,sort,
				order, index, pageNum);
		System.out.println("初始化成功:"+result);
		int count = entityDao.getByCondition(" 1=1 ", EquipmentType.class).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}
	
	@Override
	public List<Map<String, Object>> getEquipmentTypeName() {
		String[] properties = new String[] {"ID","name"};
		String condition = "";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, EquipmentType.class);
		System.out.println("EquipmentType result:" + result);
		return result;
	}
	
	@Override
	public int addEquipmentType(String equipmentTypeCode, String equipmentTypeName, String remarks){
		EquipmentType equipmentType = new EquipmentType();
		equipmentType.setID(EntityIDFactory.createId());
		equipmentType.setTypeCode(equipmentTypeCode);
		equipmentType.setName(equipmentTypeName);
		equipmentType.setRemarks(remarks);
		equipmentType.setCreateTime(new Date());
		
		int result = entityDao.save(equipmentType);
		return result;
	}
	
	/**
	 * 
	 * @description 删除设备
	 * @author hujiajun
	 * @created 2016-10-21 下午4:45:15
	 * @param equipmentTypeIds
	 * @return
	 * @see com.cqut.xiji.service.equipmentType.IEquipmentTypeService#delEquipmentType(java.lang.String)
	 */
	@Override
	public int delEquipmentType(String equipmentTypeIds) {
		// TODO Auto-generated method stub
		if(equipmentTypeIds == null || equipmentTypeIds.isEmpty()){
			return 0;
		}
		
		String position = equipmentTypeIds;
		int result = entityDao.deleteByCondition(position, EquipmentType.class);
		return result;
	}
	
	/**
	 * 
	 * @description 通过编号获得ID
	 * @author hujiajun
	 * @created 2016-10-21 下午4:47:01
	 * @param equipmentCode
	 * @return
	 * @see com.cqut.xiji.service.equipment.IEquipmentService#getIdByCode(java.lang.String)
	 */
	@Override
	public List<Map<String, Object>> getIdByCode(String equipmentTypeCode) {
		// TODO Auto-generated method stub
		String[] properties = new String[] {"ID"};
		String condition = "typeCode='" + equipmentTypeCode + "'";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, EquipmentType.class);
		return result;
	}
	
	@Override
	public int updEquipmentType(String ID, String equipmentTypeCode, String equipmentTypeName, String remarks){
		// TODO Auto-generated method stub
		EquipmentType equipmentType = new EquipmentType();
		equipmentType.setID(ID);
		equipmentType.setTypeCode(equipmentTypeCode);
		equipmentType.setName(equipmentTypeName);
		equipmentType.setRemarks(remarks);
		equipmentType.setCreateTime(new Date());
				
		int result = entityDao.updatePropByID(equipmentType,ID);
		return result;
	}

	@Override
	public int isCodeExist(String equipmentTypeCode){
		String condition = " typeCode = '" + equipmentTypeCode + "'";
		int count = entityDao.getByCondition(condition, EquipmentType.class).size();
		System.out.println("countcode:" + count);
		if(count > 0){
			return 1;
		}else{
			return -1;
		}
	};

	@Override
	public int isTypeExist(String equipmentTypeName){
		String condition = " name = '" + equipmentTypeName + "'";
		int count = entityDao.getByCondition(condition, EquipmentType.class).size();
		System.out.println("counttype:" + count);
		if(count > 0){
			return 1;
		}else{
			return -1;
		}
	};
}
