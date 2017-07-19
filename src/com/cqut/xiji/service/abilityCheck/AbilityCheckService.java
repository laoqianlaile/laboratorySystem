package com.cqut.xiji.service.abilityCheck;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.abilityCheck.AbilityCheck;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.entity.role.Role;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.treeNode.Node;
import com.cqut.xiji.tool.treeNode.NodeList;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class AbilityCheckService extends SearchService implements IAbilityCheckService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "abilityCheck";
	}

	@Override
	public String getBasePrimaryKey() {
		return "abilityCheck.ID";
	}

	
	/**
	 * 
	 * 方法简述:根据ID删除计划
	 * 
	 * @param abilitycheckID
	 * @return “true” or “false”
	 * @author 邓瑞
	 * @date : 2016年10月22日 上午10:25:00
	 * 
	 */ 
	@Override
	public int deleteAbilityCheckByID(String[] abilitycheckID) {
		// TODO Auto-generated method stub
	return entityDao.deleteEntities(abilitycheckID, AbilityCheck.class);
	}
	
	/**
	 * 
	 * 方法简述: 更新计划
	 * 
	 * @param abilitycheck
	 * @return “true” or “false”
	 * @author 邓瑞
	 * @date : 2016年10月22日 上午10:27:03
	 * 
	 */ 
	@Override
	public String updateAbilityCheck(AbilityCheck abilityCheck) throws ParseException {
		int res = entityDao.updatePropByID(abilityCheck,abilityCheck.getID());
		return res + "";
	}
	
	/**
	 * 
	 * 方法简述: 根据分页获取数据
	 * 
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 * @author 邓瑞
	 * @date : 2016年10月22日 上午10:38:41
	 * 
	 */  
	@Override
	public Map<String, Object> getAbilityCheckWithPaging(int limit, int offset,
			String order, String sort, String condition)  throws ParseException{
		// TODO Auto-generated method stub
		System.out.println("condition : =======" + condition);
		int pageNum = limit;
		int index = offset / limit;
		int mergeCount;
		int mergeIndex;
		String tableName = "abilitycheck";
		String contectString = "LEFT JOIN employee ON abilitycheck.employeeID = employee.ID " + " LEFT JOIN duty ON employee.dutyID = duty.ID " + " LEFT JOIN equipment ON abilitycheck.equipmentID = equipment.ID" + " LEFT JOIN department ON abilitycheck.departmentID = department.ID" + " LEFT JOIN fileinformation ON abilitycheck.fileID = fileinformation.belongtoID"; 
		// 获取总数
		int count = getForeignCountInFull("abilitycheck.ID", contectString, null,
				condition, false);
		List<Map<String, String>> mergeRes = new ArrayList<Map<String, String>>();
		Map<String, String> mergeMap = new HashMap<String, String>();
		List<Map<String , Object>> result = entityDao.searchWithpaging(
				new String[]{
				"abilitycheck.ID",// ID
				"parameter",// 参数/项目
				"employeeName",// 组织者（技术主管）
				"abilitycheck.type",// 实施类型
				"equipmentName",// 设备名称
				"departmentName",//实验室名称（部门名称）
				"abilitycheck.startTime",//实施日期
				"result",// 结果
				"abilitycheck.state",// 状态
				"fileName",// 结果报告
				"fileID",// 备注
				"equipmentID"//设备ID
				}
		, tableName, contectString, null, condition, null, sort, order, pageNum, index);
		int i = 0;		int j = 0;
		SimpleDateFormat s2 = new SimpleDateFormat("yyyy-MM");  
		String outTime = null;
		while(i < result.size()){
		outTime = s2.format(result.get(i).get("startTime")); 
		result.get(i).put("startTime", outTime);
		i++;
		}

		j = 0;i=0;
		while(j < (result.size()-1)){
				if(result.get(j).get("employeeName") == null ||result.get(j).get("employeeName").equals("") ||  result.get(j).get("equipmentName") == null||result.get(j).get("equipmentName").equals("")  || result.get(j).get("startTime") == null||result.get(j).get("startTime").equals("") )
					j++;
				else{
					if(result.get(j).get("employeeName").equals(result.get(j + 1).get("employeeName")) && result.get(j).get("equipmentName").equals(result.get(j + 1).get("equipmentName")) && result.get(j).get("startTime").equals(result.get(j + 1).get("startTime"))){
						mergeIndex = j;
						mergeCount = 1;
						while(j < (result.size()-1) && result.get(j).get("employeeName").equals(result.get(j + 1).get("employeeName")) && result.get(j).get("equipmentName").equals(result.get(j + 1).get("equipmentName")) && result.get(j).get("startTime").equals(result.get(j + 1).get("startTime"))){
							mergeCount++;
							j++;
						}
						mergeMap.put("index"+i, mergeIndex+"");
						mergeMap.put("count"+i, mergeCount+"");
						i++;
					}
				}
				j++;
			}
		mergeRes.add(mergeMap);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		map.put("merge", mergeRes);
		map.put("count", i);
		return map;
	}
	
	/**
	 * 
	 * 方法简述: 新增计划
	 * 
	 * @param  abilitycheck
	 * @return “true” or “false”
	 * @author 邓瑞
	 * @date : 2016年10月22日 上午10:23:18
	 * 
	 */ 
	@Override
	public String addAbilityCheck(AbilityCheck abilityCheck, HttpSession session){
			// TODO Auto-generated method stub
		String ID = EntityIDFactory.createId();
		abilityCheck.setID(ID);
		String condition = "";
		abilityCheck.setEmployeeID((String)session.getAttribute("EMPLOYEEID"));
		condition += " employeeID ='"+abilityCheck.getEmployeeID()+"'";
		condition += " and equipmentID ='"+abilityCheck.getEquipmentID()+"'";
		condition += " and startTime ='"+abilityCheck.getStartTime()+"'";
		List<Map<String, Object>> list = searchDao.searchForeign(new String[]{
				"fileID"}, "abilitycheck", null, null, null, condition);
		if(list.size() != 0){
			abilityCheck.setFileID(list.get(0).get("fileID").toString());
		}
		int res = entityDao.save(abilityCheck);
			return res + "";
		
	}
	
	

	@Override
	public JSONArray getTableName(String tableName) {
		// TODO Auto-generated method stub
		List<Map<String, Object>> tableNameBySearchDao = searchDao.searchForeign(new String[]{"*"}, tableName, null, null, null, "1=1");
		return JSONArray.fromObject(tableNameBySearchDao);
	}

	@Override
	public String saveFiles(FileInformation fr) {
		// TODO Auto-generated method stub
		return baseEntityDao.save(fr) == 1 ? "true" : "false";
	}

	@Override
	public String updateAbilityCheckByCondition(AbilityCheck abilityCheck) {
		// TODO Auto-generated method stub
		AbilityCheck abk = new AbilityCheck();
		abk.setFileID(abilityCheck.getFileID());
		String condition = " employeeID = " + abilityCheck.getEmployeeID() +" and equipmentID = " + abilityCheck.getEquipmentID() +" and startTime = '" + abilityCheck.getStartTime()+"'";
		String res = entityDao.updatePropByCondition(abk, condition) + "";
		return res;
	}
	
}
