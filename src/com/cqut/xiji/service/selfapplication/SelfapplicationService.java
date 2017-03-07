package com.cqut.xiji.service.selfapplication;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;



import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.client.Client;
import com.cqut.xiji.entity.selfapplication.Selfapplication;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class SelfapplicationService extends SearchService implements ISelfapplicationService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "selfapplication";
	}

	@Override
	public String getBasePrimaryKey() {
		return "selfapplication.selfApplyID";
	}
	/**
	 * 模块管理
	 * moduleName 模块名称
	 * condition 传的查询条件
	 */
	/*@Override
	public Map<String, Object> getSelfApplicationWithPaging(int limit, int offset,
			String order, String sort,String selfSampleName,String selfCompanyName,String selfHasContact,String isTouchReviewStatus) {
		// TODO Auto-generated method stub
		
		System.out.println("selfSampleName: "+selfSampleName+" selfCompanyName "+selfCompanyName+" selfHasContact "+selfHasContact + " isTouchReviewStatus " + isTouchReviewStatus);
		int index = limit;
		int pageNum = offset/limit + 1;
		String tableName = "selfapplication";
		String[] properties = new String[]{
				"ROLEID",
				"NAME",
				"CREATOR",
				"CREATTIME",
				"REMARKS"
		};
		String[] properties = new String[]{
			"selfApplyID",
			"company.companyName selfCompanyName",//公司表里的 名字
            "selfSampleName",
            "selfDetection",
            "selfContact",
            "selfContactPhone",
            "DATE_FORMAT(selfEntryData,'%Y-%m-%d %H:%i:%S') selfEntryData",//查询数据为date类型的封装
            "selfHasContact",
            "selfRemork",			
		};
		List<Map<String, Object>> result;
		String condition="";
		String selfHasContactCondition = null;
		if(selfHasContact.equals("否"))//联系状态   0:未联系   1：已联系 
			selfHasContactCondition = " selfHasContact='0' ";
		else if(selfHasContact.equals("是"))
			selfHasContactCondition = " selfHasContact='1' ";
		else if(selfHasContact.equals("全部"))
			selfHasContactCondition = null;
		
	if(isTouchReviewStatus.equals("null")){
		if(selfCompanyName.equals("null")&&selfSampleName.equals("null")){
			String s = "1=1";
		     result = entityDao.searchWithpaging(properties, tableName, "left join company on selfapplication.selfCompanyId=company.id", null, s, null, sort,order, index, pageNum);
		}
		else {
		      if(!selfCompanyName.equals("null")&&selfSampleName.equals("null")){
			     condition += " company.companyName='"+selfCompanyName+"'";
		      }
		      else if(selfCompanyName.equals("null")&&!selfSampleName.equals("null")){
		    	  condition += " selfSampleName='"+selfSampleName+"'"; 
		      }
		      else if(!selfCompanyName.equals("null")&&!selfSampleName.equals("null")){
		    	  condition = " company.companyName='"+selfCompanyName
					 +"' and selfSampleName='"+selfSampleName+"' ";
		      }
		      else {
		    	  condition = "";
			}
			 result = entityDao.searchWithpaging(properties, tableName, "left join company on selfapplication.selfCompanyId=company.id", null, condition, null, sort,order , index, pageNum);
		}
	}
	else{
		 result = entityDao.searchWithpaging(properties, tableName, "left join company on selfapplication.selfCompanyId=company.id", null, selfHasContactCondition, null, sort,order , index, pageNum);
	}
		System.out.println("SelfService:"+result);
		Map<String,Object> map1 = new HashMap<String, Object>();
		for(int i=0;i<result.size();i++){
			map1=result.get(i);
			if(map1.get("selfHasContact").equals("0"))
				map1.put("selfHasContact","否");
			else if(map1.get("selfHasContact").equals("1"))
				map1.put("selfHasContact","是");
			map1.put("opration", "<button class='btn contact' onclick='contactModal()'>联系</button>");
		}
		int count;
	if(isTouchReviewStatus.equals("null")){
		if(condition==null||selfHasContact.equals("全部"))
		 count = entityDao.getCountByCondition(" 1=1 ", Selfapplication.class);
		else {
		   count = entityDao.getForeignCount("selfApplyID","selfapplication", "left join company on selfapplication.selfCompanyId=company.id",null, condition);
		}
	}
	else{
		count = entityDao.getForeignCount("selfApplyID","selfapplication", "left join company on selfapplication.selfCompanyId=company.id",null, selfHasContactCondition);	
		}
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}
*/
	/**
	 * autor 李龙顺
	 * 模块管理
	 * moduleName 模块名称
	 * condition 传的查询条件
	 */
	@Override
	public Map<String, Object> getSelfApplicationWithPaging(int limit, int offset,
			String order, String sort,String selfSampleName,String selfCompanyName,String selfHasContact) {
		System.out.println("selfSampleName: "+selfSampleName+" selfCompanyName "+selfCompanyName+" selfHasContact "+selfHasContact);
		int index = limit;
		int pageNum = offset/limit;
		String tableName = "selfapplication";
		String[] properties = new String[]{
				"selfApplyID",
				"company.companyName selfCompanyName",//公司表里的 名字
	            "selfSampleName",
	            "selfDetection",
	            "selfContact",
	            "selfContactPhone",
	            "DATE_FORMAT(selfEntryData,'%Y-%m-%d') selfEntryData",//查询数据为date类型的封装
	            "selfHasContact",
	            "selfRemork",			
			};
		List<Map<String, Object>> result;
		String condition="";
		String selfHasContactCondition = null;
		
		if(selfHasContact.equals("否"))//联系状态   0:未联系   1：已联系 
			selfHasContactCondition = " 1=1 and selfHasContact='0' ";
		else if(selfHasContact.equals("是"))
			selfHasContactCondition = " 1=1 and selfHasContact='1' ";
		else if(selfHasContact.equals("全部"))
			selfHasContactCondition = " 1=1 ";
		if(!selfCompanyName.equals("null") && selfCompanyName != null){
			 condition += " and company.companyName='"+selfCompanyName+"'";
		}
		if(!selfSampleName.equals("null") && selfSampleName != null){
			condition += " and selfSampleName='"+selfSampleName+"'"; 
		}
		if(condition.length() != 0){
			selfHasContactCondition += condition;
		}
		
		 result = entityDao.searchWithpaging(properties, tableName, "left join company on selfapplication.selfCompanyId=company.id", null, selfHasContactCondition, null, sort,order , index, pageNum);
		 System.out.println("SelfService:"+result);
			Map<String,Object> map1 = new HashMap<String, Object>();
			for(int i=0;i<result.size();i++){
				map1=result.get(i);
				if(map1.get("selfHasContact").equals("0"))
					map1.put("selfHasContact","否");
				else if(map1.get("selfHasContact").equals("1"))
					map1.put("selfHasContact","是");
				map1.put("opration", "<button class='btn btn-primary' onclick='contactModal()'>联系</button>");
			}
			int count;
			count = entityDao.getForeignCount("selfApplyID","selfapplication", "left join company on selfapplication.selfCompanyId=company.id",null, selfHasContactCondition);
			Map<String,Object> map = new HashMap<String, Object>();
			map.put("total", count);
			map.put("rows", result);
			return map;
	}
	/**
	 * autor 李龙顺
	 * 修改联系字段
	 * moduleName 模块名称
	 */
	@Override
	public int contact(Selfapplication selfapplication){
		return entityDao.updatePropByID(selfapplication, selfapplication.getSelfApplyID());
	}

	@Override
	public Map<String, Object> getSelfApplicationWithPaging2(int limit,int offset, String order, String sort, HttpSession session) {
		
		int index = limit;
		int pageNum = offset/limit;
		// TODO Auto-generated method stub
		String condition= " clientNo = '" + (String) session.getAttribute("clientNo") + "'";
		
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				new String[] {
						"selfApplyID",
						"selfCompanyId",
			            "selfSampleName",
			            "selfDetection",
			            "selfContact",
			            "selfContactPhone",
			            "DATE_FORMAT(selfEntryData,'%Y-%m-%d %H:%i:%S') selfEntryData",//查询数据为date类型的封装
			            "selfHasContact",
			            "selfRemork",}, getBaseEntityName(), " join client on client.companyID = selfapplication.selfCompanyId", null, condition,
				 null, order, sort, index, pageNum);
		
		for(int i = 0; i < result.size(); i++){
			if(result.get(i).get("selfHasContact").equals("0")){
				result.get(i).put("selfHasContact", "否");
			}else{
				result.get(i).put("selfHasContact", "是");
			}
		}
		
		/*List<Map<String, Object>> result = entityDao.searchWithpaging(properties, baseEntity, joinEntity, foreignEntitys,
		 *  condition, groupField, orderField, sortMode, pageNum, pageIndex)*/
		Map<String,Object> map = new HashMap<String, Object>();
		int count = getForeignCountInFull("selfapplication.selfApplyID", 
					"join client on client.companyID = selfapplication.selfCompanyId"
				, null, condition, false);
		
		System.out.println(result);

		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}
	
	@Override
	public String addSelfApplication(Selfapplication selfapplication, HttpSession session){
		selfapplication.setSelfApplyID(EntityIDFactory.createId().toString());
		
		String condition = " 1 = 1 and clientNo = '" + (String) session.getAttribute("clientNo") + "'";
		String selfCompanyId = entityDao.getByCondition(condition, Client.class).get(0).getCompanyID();
		selfapplication.setSelfCompanyId(selfCompanyId);
		return entityDao.save(selfapplication) + "";
		
	}
}
