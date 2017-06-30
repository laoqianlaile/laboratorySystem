package com.cqut.xiji.service.standard;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.entity.message.Message;
import com.cqut.xiji.entity.messageNotice.MessageNotice;
import com.cqut.xiji.entity.standard.Standard;
import com.cqut.xiji.entity.standardType.StandardType;
import com.cqut.xiji.entity.template.Template;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class StandardService extends SearchService implements IStandardService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "standard";
	}

	@Override
	public String getBasePrimaryKey() {
		return "standard.ID";
	}

	@Override
	public String getStandrad(String ID) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String delStandard(String standardIDs) {
			
			int count = 0; // 计数操作失败的数量
		
			if(standardIDs == null || standardIDs.isEmpty()){
				return 0+"";
			}
			String[] ids = standardIDs.split(",");
			for(String id :ids){
				Standard standard = entityDao.getByID(id, Standard.class);
				FileInformation fileInformation = entityDao.getByID(standard.getFileID(), FileInformation.class);
				if(fileInformation != null){
					fileInformation.setState(1);
					entityDao.updatePropByID(fileInformation, fileInformation.getID());	
				}
				else{
					System.out.println("没有对应的ID");
					count++;
				}
				
			}
			int result = entityDao.deleteEntities(ids,Standard.class);
			return count> 0 ?"-"+count:result+"";
	}

	@Override
	public String addStandard(String uploaderID,String STANDARDCODE, String STANDARDNAME,
			String TYPE, String SCOPE, int APPLICATIONTYPE,
			int EDITSTATE, String DESCRIPTION,String fileID,String EquipmentIDs) {
		try {
			URLDecoder.decode(STANDARDNAME, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		Standard standard = new Standard();
		standard.setID(EntityIDFactory.createId());
		standard.setStandardCode(STANDARDCODE);
		standard.setStandardName(STANDARDNAME);
		standard.setType(TYPE);
		standard.setScope(SCOPE);
		standard.setApplicationType(APPLICATIONTYPE);
		standard.setEditState(EDITSTATE);
		standard.setDescription(DESCRIPTION);
		standard.setAbandonApplyMan(uploaderID); // 提交人
		standard.setFileID(fileID);
		standard.setEquipmentCode(EquipmentIDs);
		
		int result = entityDao.save(standard);
		
		FileInformation fileInformation = entityDao.getByID(fileID, FileInformation.class);
		
		fileInformation.setBelongtoID(standard.getID());
		fileInformation.setUploaderID(uploaderID);
		
		//消息推送
		Message message = new Message();
		
		message.setID(EntityIDFactory.createId());
		message.setContent("有新的标准需要审核！");
		message.setCreateTime(new Date());
		
		MessageNotice messageNotice = new MessageNotice();
		
		messageNotice.setID(EntityIDFactory.createId());
		messageNotice.setMessageID(message.getID());
		
		result += entityDao.updatePropByID(fileInformation, fileID);
		
		return result + "";
	}

	@Override
	public Map<String, Object> getStandardWithPaging(String STANDARDCODE,
			String STANDARDNAME, String TYPE, String STATE, String APPLICATIONTYPE,
			int limit, int offset, String order, String sort) {
		
		int index = limit;
		int pageNum = offset/limit;
		
		String tableName = "Standard";
		String[] properties = new String[]{
				"standard.ID",
				"GROUP_CONCAT(equipment.ID) AS equipmentID",
				"GROUP_CONCAT(equipment.equipmentName) AS equipmentName",
				"standard.STANDARDCODE",
				"standard.STANDARDNAME",
				"standard.TYPE",
				"standard.DESCRIPTION",
				"standard.SCOPE",
				"standard.SUGGEST",
				"standard.fileID",
				"standardType.standardTypeName",
				"employee.employeeName",
				"standard.abandonApplyReason",
				"case when standard.APPLICATIONTYPE = 0 then '国家标准'"
				+ "when standard.APPLICATIONTYPE = 1 then '企业标准'"
				+ "when standard.APPLICATIONTYPE = 2 then '作业指导书' "
				+ "when standard.APPLICATIONTYPE = 3 then '军用标准' "
				+ "when standard.APPLICATIONTYPE = 4 then '行业标准' end as APPLICATIONTYPE",
				
				"case when standard.EDITSTATE = 0 then '不可编辑'"
				+ "when standard.EDITSTATE = 1 then '可编辑' end as EDITSTATE",
				
				"case when standard.STATE = 0 then '未提交'"
				+ "when standard.STATE = 1 then '待审核'"
				+ "when standard.STATE = 2 then '通过'"
				+ "when standard.STATE = 3 then '驳回'"
				+ "when standard.STATE = 4 then '废弃待审核'"
				+ "when standard.STATE = 5 then '已废弃' end as STATE",
		};
		
		String condition=" 1 = 1";
		if(STANDARDCODE != null && STANDARDCODE != ""){
			condition += " and standard.STANDARDCODE LIKE  '%"+ STANDARDCODE + "%' ";
		}
		if(STANDARDNAME != null && STANDARDNAME != ""){
			condition += " and standard.STANDARDNAME LIKE   '%" + STANDARDNAME + "%' ";
		}
		if(TYPE != null && TYPE != ""){
			condition += " and standard.TYPE = '" + TYPE + "' ";
		}
		if(STATE != null && STATE != ""){
			condition += " and standard.STATE = " + STATE ;
		}
		if(APPLICATIONTYPE != null && APPLICATIONTYPE  != ""){
			condition += " and standard.APPLICATIONTYPE = " + APPLICATIONTYPE;
		}
		
		String joinEntity =" LEFT JOIN standardtype ON standardtype.ID = standard.type "
				+ " LEFT JOIN employee on employee.ID = standard.abandonApplyMan "
				+ " LEFT JOIN equipment ON  FIND_IN_SET(equipment.ID,standard.equipmentCode) ";
		
		List<Map<String, Object>> result = originalSearchWithpaging(properties, tableName, joinEntity, null, condition, false, "standard.ID", sort, order, index, pageNum);
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);
		
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}

	@Override
	public String upStandard(String ID,String STANDARDCODE, String STANDARDNAME,
			String TYPE, String SCOPE, String APPLICATIONTYPE,
			String EDITSTATE,String SUGGEST, String STATE, String ABANDONAPPLYMAN,
			 String ABANDONAPPLYREASON,String EquipmentIDs) {
		
		Standard standard = entityDao.getByID(ID, Standard.class);
		
		if(standard == null){
			System.out.println("没有对应Id");
			return "-1";
		}
		if(STANDARDCODE !=null && STANDARDCODE != "" ){
			standard.setStandardCode(STANDARDCODE);
		}
		if(STANDARDNAME !=null && STANDARDNAME != "" ){
			standard.setStandardName(STANDARDNAME);
		}
		if(TYPE !=null && TYPE != "" ){
			standard.setType(TYPE);
		}
		if(SCOPE !=null && SCOPE != "" ){
			standard.setScope(SCOPE);
		}
		if(APPLICATIONTYPE !=null && APPLICATIONTYPE != "" ){
			standard.setApplicationType(Integer.parseInt(APPLICATIONTYPE));
		}
		if(EDITSTATE !=null && EDITSTATE != "" ){
			standard.setEditState(Integer.parseInt(EDITSTATE));
		}
		if(SUGGEST !=null && SUGGEST != "" ){
			standard.setSuggest(SUGGEST);
		}
		if(STATE !=null && STATE != "" ){
			standard.setState(Integer.parseInt(STATE));
		}
		if(EquipmentIDs != null && EquipmentIDs != ""){
			standard.setEquipmentCode(EquipmentIDs);
		}
		
		if(ABANDONAPPLYMAN != null && ABANDONAPPLYMAN !="" && ABANDONAPPLYREASON != null && ABANDONAPPLYREASON !="" ){
			standard.setAbandonApplyMan(ABANDONAPPLYMAN);
			standard.setAbandonApplyTime(new Date());
			standard.setAbandonApplyReason(ABANDONAPPLYREASON);
		}
		int result = entityDao.updatePropByID(standard, ID);
		return result + "";
	}

	@Override
	public List<Map<String, Object>> getStandardType() {
		String[] properties = new String[] {

				"StandardType.ID", "StandardType.standardTypeName",

				};
				List<Map<String, Object>> result = entityDao.findByCondition(
						properties, " 1 = 1", StandardType.class);


				return result;
	}

	@Override
	public boolean recoverCheck(String standardID) {
		
		Map<String, Object> stateInfo =	entityDao.findByID(new String[]{"state"}, standardID, Standard.class);
		String state = stateInfo.get("state").toString();
		if (state.equals("0") || state.equals("3")) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public String upFileID(String standardID, String fileID) {
		
		Standard standard = entityDao.getByID(standardID, Standard.class);
		
		if(standard == null){
			return -1 +"";
		}
		standard.setFileID(fileID);
		int Backvalue = entityDao.updatePropByID(standard, standardID);
		return Backvalue + "";
	}

	@Override
	public String upSubmitStandard(String standardIDs) {
		int result = 0;
		if(standardIDs == null || standardIDs == ""){
			return "-1";
		}
		String[] ids = standardIDs.split(",");
		
		for(String id :ids){
			Standard standard = entityDao.getByID(id, Standard.class);
			if(standard.getState() == 0){
				standard.setState(1);
				result += entityDao.updatePropByID(standard, id);
			}
			else{
				System.out.println("当前状态不可更改");
			}
		}
		return result + "";
	}

	@Override
	public Map<String, Object> getStandardReviewWithPaging(String STANDARDCODE,
			String STANDARDNAME, String TYPE, String STATE,
			String APPLICATIONTYPE, int limit, int offset, String order,
			String sort) {
		int index = limit;
		int pageNum = offset/limit;
		
		String tableName = "Standard";
		String[] properties = new String[]{
				"standard.ID",
				"standard.STANDARDCODE",
				"standard.STANDARDNAME",
				"standard.TYPE",
				"standard.DESCRIPTION",
				"standard.SCOPE",
				"standard.SUGGEST",
				"standard.fileID",
				"standardType.standardTypeName",
				"employee.employeeName",
				"standard.abandonApplyReason",
				"case when standard.APPLICATIONTYPE = 0 then '国家标准'"
				+ "when standard.APPLICATIONTYPE = 1 then '企业标准'"
				+ "when standard.APPLICATIONTYPE = 2 then '作业指导书' end as APPLICATIONTYPE",
				
				"case when standard.EDITSTATE = 0 then '不可编辑'"
				+ "when standard.EDITSTATE = 1 then '可编辑' end as EDITSTATE",
				
				"case when standard.STATE = 0 then '未提交'"
				+ "when standard.STATE = 1 then '待审核'"
				+ "when standard.STATE = 2 then '通过'"
				+ "when standard.STATE = 3 then '驳回'"
				+ "when standard.STATE = 4 then '废弃待审核'"
				+ "when standard.STATE = 5 then '已废弃' end as STATE",
		};
		
		String condition=" 1 = 1";
		if(STANDARDCODE != null && STANDARDCODE != ""){
			condition += " and standard.STANDARDCODE LIKE  '%"+ STANDARDCODE + "%' ";
		}
		if(STANDARDNAME != null && STANDARDNAME != ""){
			condition += " and standard.STANDARDNAME LIKE   '%" + STANDARDNAME + "%' ";
		}
		if(TYPE != null && TYPE != ""){
			condition += " and standard.TYPE = '" + TYPE + "' ";
		}
		if(STATE != null && STATE != ""){
			condition += " and standard.STATE = " + STATE ;
		}
		else{
			condition += " and standard.STATE = '1' or  standard.STATE = '4'";
		}
		if(APPLICATIONTYPE != null && APPLICATIONTYPE  != ""){
			condition += " and standard.APPLICATIONTYPE = " + APPLICATIONTYPE;
		}
		
		String joinEntity =" LEFT JOIN standardtype ON standardtype.ID = standard.type "
				+ " LEFT JOIN employee on employee.ID = standard.abandonApplyMan ";
		
		List<Map<String, Object>> result = originalSearchWithpaging(properties, tableName, joinEntity, null, condition, false, null, sort, order, index, pageNum);
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);
		
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}

}
