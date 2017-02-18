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
			if(standardIDs == null || standardIDs.isEmpty()){
				return 0+"";
			}
			String[] ids = standardIDs.split(",");
			int result = entityDao.deleteEntities(ids,Standard.class);
			return result+"";
	}

	@Override
	public String addStandard(String uploaderID,String STANDARDCODE, String STANDARDNAME,
			String TYPE, String SCOPE, int APPLICATIONTYPE,
			int EDITSTATE, String DESCRIPTION,String fileID) {
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
		standard.setFileID(fileID);
		
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
				"standard.STANDARDCODE",
				"standard.STANDARDNAME",
				"standard.TYPE",
				"standard.DESCRIPTION",
				"standard.SCOPE",
				"standard.SUGGEST",
				"standard.fileID",
				"standardType.standardTypeName",
				"case when standard.APPLICATIONTYPE = 0 then '国家标准'"
				+ "when standard.APPLICATIONTYPE = 1 then '企业标准'"
				+ "when standard.APPLICATIONTYPE = 2 then '作业指导书' end as APPLICATIONTYPE",
				
				"case when standard.EDITSTATE = 0 then '不可编辑'"
				+ "when standard.EDITSTATE = 1 then '可编辑' end as EDITSTATE",
				
				"case when standard.STATE = 0 then '待审核'"
				+ "when standard.STATE = 1 then '通过'"
				+ "when standard.STATE = 2 then '已废弃'"
				+ "when standard.STATE = 3 then '驳回' end as STATE",
		};
		
		String condition=" 1 = 1 and standard.TYPE = standardtype.ID ";
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
		
		String[] foreignEntitys={
				"standardType"
		};
		
		List<Map<String, Object>> result = originalSearchWithpaging(properties, tableName, null, foreignEntitys, condition, false, null, sort, order, index, pageNum);
		int count = getForeignCount(foreignEntitys, condition, false);
		
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}

	@Override
	public String upStandard(String ID,String STANDARDCODE, String STANDARDNAME,
			String TYPE, String SCOPE, String APPLICATIONTYPE,
			String EDITSTATE,String SUGGEST, String STATE, String ABANDONAPPLYMAN,
			String ABANDONAPPLYTIME, String ABANDONAPPLYREASON) {
		Standard standard = entityDao.getByID(ID, Standard.class);
		
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
		System.out.println("ABANDONAPPLYMAN : " + ABANDONAPPLYMAN + " ABANDONAPPLYREASON : " + ABANDONAPPLYREASON);
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

				System.out.println(Arrays.toString(result.toArray()));

				return result;
	}

}
