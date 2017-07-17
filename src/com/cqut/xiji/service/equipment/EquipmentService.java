package com.cqut.xiji.service.equipment;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.employee.Employee;
import com.cqut.xiji.entity.equipment.Equipment;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;


@Service
public class EquipmentService extends SearchService implements
		IEquipmentService {


	@Resource(name = "entityDao")
	EntityDao entityDao;

	@Resource(name = "searchDao")
	SearchDao searchDao;

	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "equipment";
	}

	@Override
	public String getBasePrimaryKey() {
		return "equipment.ID";
	}

	@Override
	public List<Map<String, Object>> getEquipments() {
		List<Map<String, Object>> ens = searchDao
				.searchForeign(
						new String[] { "equipment.ID as equipmentID",
								"equipmentCode", "equipmentName",
								"equipmentType.ID as equipmentTypeID",
								"equipmentType.name as equipmentTypeName", },
						"equipment",
						"join equipmentType on equipmentType.ID = equipment.equipmentTypeID",
						null, null, " 1 = 1");
		return ens;
	}

	@Override
	public List<Map<String, Object>> getEquipmentsByID(String equipmentID) {
		List<Map<String, Object>> ens = searchDao
				.searchForeign(
						new String[] { "equipment.ID as equipmentID",
								"equipmentCode",
								"equipmentName",
								"model", },
						"equipment",
						null,
						null, null, "equipment.ID='" + equipmentID + "'");
		return ens;
	}
	@Override
	public Map<String, Object> getEquipmentWithPaging(int limit, int offset,
			String sort, String order, String equipmentName,
			String equipmentType, String departmentName, String buyTime){
		int index = limit;
		int pageNum = offset/limit ;
		String tableName = "equipment";
		String[] properties = new String[]{
				"equipment.ID",
				"equipment.equipmentName",
				"equipment.model",
				"department.ID as departmentID",
				"department.departmentName",
				"date_format(equipment.buyTime,'%Y.%m.%d') as buyTime",
				"equipment.useYear",
				"equipmentType.ID as equipmentTypeID",
				"equipmentType.name",
				"equipment.employeeID",
				"employee.employeeName",
				"equipment.factoryCode",
				"equipment.credentials",
				"date_format(equipment.effectiveTime,'%Y.%m.%d') as effectiveTime",
				"equipment.remarks"
		};
		String joinEntity = " LEFT JOIN department ON equipment.departmentID = department.ID " +
				" LEFT JOIN equipmentType ON equipment.equipmentTypeID = equipmentType.ID " +
				" LEFT JOIN employee ON equipment.employeeID = employee.ID ";
		String condition = " 1 = 1 "; 
		if (equipmentName != null && !equipmentName.isEmpty()) {
			condition += " and equipmentName like '%" + equipmentName+ "%'";
		}if (equipmentType != null && !equipmentType.isEmpty()) {
			if( !equipmentType.equals("0") ){
				condition += " and equipmentType.ID = '" + equipmentType + "'";
			}
		}if (departmentName != null && !departmentName.isEmpty()) {
			if( !departmentName.equals("0") ){
				condition += " and department.ID = '" + departmentName + "'";
			}
		}if (buyTime != null && !buyTime.isEmpty()) {
			condition += " and buyTime >'" + buyTime + "'";
		}
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tableName, joinEntity, null, condition, null,sort,
				order, index, pageNum);
		System.out.println("初始化成功:"+result);
		int count = entityDao.searchForeign(properties, tableName, joinEntity, null, condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}
	
	@Override
	public int addEquipment(String equipmentName,
			String equipmentType, String model, String department,
			String buyTime, int useYear, String factoryCode, String credentials,
			String effectiveTime, String remarks,HttpServletRequest request,HttpServletResponse response){
		HttpSession session = request.getSession();
	    Object LOGINNAME = session.getAttribute("LOGINNAME");
	    //操作对应的操作员
	    String condition = "LOGINNAME = '"+LOGINNAME+"'";
	    List<Employee> employee = entityDao.getByCondition(condition, Employee.class);

	     //没找到对应用户
	    if(employee.size()==0){
	    	 return -1;
	    }
	    Employee employee2 = employee.get(0);
		String employeeID = employee2.getID();
		System.out.println("employeeID:"+employeeID);
		Equipment equipment = new Equipment();
		String ID = EntityIDFactory.createId();
		equipment.setID(ID);
		equipment.setEquipmentName(equipmentName);
		equipment.setEquipmentTypeID(equipmentType);
		equipment.setModel(model);
		equipment.setDepartmentID(department);
		equipment.setUseYear(useYear);
		equipment.setFactoryCode(factoryCode);
		equipment.setCredentials(credentials);
		
		equipment.setEmployeeID(employeeID);
		equipment.setRemarks(remarks);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd");
		Date buyTime1 = null;
		Date effectiveTime1 = null;
		try {
			buyTime1 = sdf.parse(buyTime);
			effectiveTime1 = sdf.parse(effectiveTime);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if (buyTime1 != null) {
			equipment.setBuyTime(buyTime1);
		}
		if (effectiveTime1 != null) {
			equipment.setEffectiveTime(effectiveTime1);
		}
		
		int result = entityDao.save(equipment);
		if(result <= 0){
			String position = "ID =" + ID;
			entityDao.deleteByCondition(position, Equipment.class);
		}
		
		return result;
	}
	
	/**
	 * 
	 * @description 删除设备
	 * @author hujiajun
	 * @created 2016-10-21 下午4:45:15
	 * @param equipmentIds
	 * @return
	 * @see com.cqut.xiji.service.equipment.IEquipmentService#delEquipment(java.lang.String)
	 */
	@Override
	public int delEquipment(String equipmentIds) {
		// TODO Auto-generated method stub
		String condition = "";
		if(equipmentIds == null || equipmentIds.isEmpty()){
			return 0;
		}else{
			int count = 0;
			String[] properties1 = new String[] {"COUNT(equipmentrepair.ID) as r"};
			String[] properties2 = new String[] {"COUNT(equipmentuse.ID) as u"};
			String[] properties3 = new String[] {"COUNT(equipmentverify.ID) as v"};
			String[] properties4 = new String[] {"COUNT(equipmentscrap.ID) as s"};
			String tableName = "equipment";
			String joinEntity1 = " LEFT JOIN equipmentrepair ON equipment.ID = equipmentrepair.equipmentID ";
			String joinEntity2 = " LEFT JOIN equipmentuse ON equipment.ID = equipmentuse.equipmentID ";
			String joinEntity3 = " LEFT JOIN equipmentverify ON equipment.ID = equipmentverify.equipmentID ";
			String joinEntity4 = " LEFT JOIN equipmentscrap ON equipment.ID = equipmentscrap.equipmentID ";
			condition = "equipment.ID = '" + equipmentIds + "'";
			List<Map<String, Object>> re1 = entityDao.searchForeign(properties1, tableName, joinEntity1, null, condition);
			List<Map<String, Object>> re2 = entityDao.searchForeign(properties2, tableName, joinEntity2, null, condition);
			List<Map<String, Object>> re3 = entityDao.searchForeign(properties3, tableName, joinEntity3, null, condition);
			List<Map<String, Object>> re4 = entityDao.searchForeign(properties4, tableName, joinEntity4, null, condition);
			count = Integer.parseInt(re1.get(0).get("r").toString()) + 
					Integer.parseInt(re2.get(0).get("u").toString()) +
					Integer.parseInt(re3.get(0).get("v").toString()) +
					Integer.parseInt(re4.get(0).get("s").toString());
			if(count == 0){
				int result = entityDao.deleteByCondition(condition, Equipment.class);
				return result;
		    }else {
		    	System.out.println("该设备与其他表数据有关联，请先删除关联");
		    	return -2;
		    }
		}
	}
	
	/**
	 * 
	 * @description 通过仪器编号获得合同ID
	 * @author hujiajun
	 * @created 2016-10-21 下午4:47:01
	 * @param equipmentCode
	 * @return
	 * @see com.cqut.xiji.service.equipment.IEquipmentService#getIdByCode(java.lang.String)
	 */
	@Override
	public List<Map<String, Object>> getIdByCode(String equipmentCode) {
		// TODO Auto-generated method stub
		String[] properties = new String[] {"ID"};
		String condition = "equipmentCode='" + equipmentCode + "'";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Equipment.class);
		return result;
	}
	
	/**
	 * @description 通过设备名称得到设备信息
	 * @author hujiajun
	 * @created 2016年12月12日19:13:01
	 * @param equipmentName
	 */
	@Override
	public List<Map<String, Object>> getEquipmentByName(String equipmentName){
		String[] properties = new String[] {"ID","factoryCode","equipmentName","date_format(buyTime,'%Y.%m.%d') as buyTime","departmentID"};
		String condition = "equipmentName like '%" + equipmentName + "%'";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Equipment.class);
		return result;
	}
	
	/**
	 * @description 通过设备ID得到设备信息
	 * @author hujiajun
	 * @created 2016年12月12日19:13:01
	 * @param ID
	 */
	@Override
	public List<Map<String, Object>> getEquipmentById(String ID){
		String[] properties = new String[] {"ID","factoryCode","equipmentName","date_format(buyTime,'%Y.%m.%d') as buyTime","departmentID"};
		String condition = "ID = '" + ID + "'";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Equipment.class);
		return result;
	}
	
	@Override
	public int updEquipment(String ID,
			String equipmentName, String equipmentType, String model,
			String department, String buyTime, int useYear, String factoryCode,
			String credentials, String effectiveTime, String employeeID,
			String remarks){
		// TODO Auto-generated method stub
		Equipment equipment = new Equipment();
		
		equipment.setEquipmentName(equipmentName);
		equipment.setEquipmentTypeID(equipmentType);
		equipment.setModel(model);
		equipment.setDepartmentID(department);
		equipment.setUseYear(useYear);
		equipment.setFactoryCode(factoryCode);
		equipment.setCredentials(credentials);
		equipment.setEmployeeID(employeeID);
		equipment.setRemarks(remarks);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd");
		Date buyTime1 = null;
		Date effectiveTime1 = null;
		try {
			buyTime1 = sdf.parse(buyTime);
			effectiveTime1 = sdf.parse(effectiveTime);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if (buyTime1 != null) {
			equipment.setBuyTime(buyTime1);
		}
		if (effectiveTime1 != null) {
			equipment.setEffectiveTime(effectiveTime1);
		}
				
		int result = entityDao.updatePropByID(equipment,ID);
		return result;
	}
	
	@Override
	public Long dateDiff(String startTime, String endTime,  String format, String str) {   
        // 按照传入的格式生成一个simpledateformate对象    
        SimpleDateFormat sd = new SimpleDateFormat(format);    
        long nd = 1000 * 24 * 60 * 60;// 一天的毫秒数    
        long nh = 1000 * 60 * 60;// 一小时的毫秒数    
        long nm = 1000 * 60;// 一分钟的毫秒数    
        long ns = 1000;// 一秒钟的毫秒数    
        long diff;    
        long day = 0;    
        long hour = 0;    
        long min = 0;    
        long sec = 0;    
        // 获得两个时间的毫秒时间差异    
        try {    
            diff = sd.parse(endTime).getTime() - sd.parse(startTime).getTime();    
            day = diff / nd;// 计算差多少天    
            hour = diff % nd / nh + day * 24;// 计算差多少小时    
            min = diff % nd % nh / nm + day * 24 * 60;// 计算差多少分钟    
            sec = diff % nd % nh % nm / ns;// 计算差多少秒    
            // 输出结果    
            System.out.println("时间相差：" + day + "天" + (hour - day * 24) + "小时"   
                    + (min - day * 24 * 60) + "分钟" + sec + "秒。");    
            System.out.println("hour=" + hour + ",min=" + min);    
            if (str.equalsIgnoreCase("h")) {    
                return hour;    
            } else {    
                return min;    
            }    
   
        } catch (ParseException e) {    
            // TODO Auto-generated catch block    
            e.printStackTrace();    
        }    
        if (str.equalsIgnoreCase("h")) {    
            return hour;    
        } else {    
            return min;    
        }    
	}
	
	@Override
	public List<Map<String, Object>> getEquipmentInfo() {
		String tableName = "equipment";
		String[] properties = new String[] { "ID,IF (factoryCode IS NULL,equipmentName,CONCAT(equipmentName,'(',factoryCode,')')) AS equipmentInfo" };
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				tableName, null, null, null);
		return result;
	}

	@Override
	public List<Map<String, Object>> MatchNameEquipmentInfo(String matchName) {
		String tableName = "equipment";
		
		String condition = " 1 = 1 ";
		if(matchName != null ){
			condition += " and equipment.equipmentName like '%"+matchName+"%'";
		}
		String[] properties = new String[] { "ID,IF (factoryCode IS NULL,equipmentName,CONCAT(equipmentName,'(',factoryCode,')')) AS equipmentInfo" };
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				tableName, null, null, condition);
		return result;
	}
}
	

