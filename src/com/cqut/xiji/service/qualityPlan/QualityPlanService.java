package com.cqut.xiji.service.qualityPlan;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.qualityPlan.QualityPlan;
import com.cqut.xiji.service.base.SearchService;

import com.cqut.xiji.tool.treeNode.Node;
import com.cqut.xiji.tool.treeNode.NodeList;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class QualityPlanService extends SearchService implements IQualityPlanService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "qualityPlan";
	}

	@Override
	public String getBasePrimaryKey() {
		return "qualityPlan.ID";
	}
	
	@Override
	public Map<String, Object> getQualityPlanWithPaging(int limit, int offset,String order,String sort,String type,String year,String code,String employeeName2) {
		System.out.println("222" + "<br />");
		int index = limit;
		int pageNum = offset/limit;
		String tablename = "qualityplan";
		String condition="";
		String[] properties = new String[]{
				"qualityplan.ID",
				"qualityplan.type",
				"qualityplan.code",
				"qualityplan.year",
				"qualityplan.state",
				"employee2.employeeName2",
				"employeeName",
		};
		String strcondition = " left JOIN employee ON qualityPlan.employeeID1 = employee.ID"+
							" left JOIN (select employeeName as employeeName2 , employee.ID from employee) as employee2 ON qualityPlan.employeeID2 = employee2.ID";
		
		if((type!=null&&type!="")||(code!=null&&code!="")||(year!=null&&year!="")||(employeeName2!=null&&employeeName2!="")){
			if(type!=null&&type!=""){
				condition = condition + "type like '%" + type +"%'";
			};
			if(code!=null&&code!=""){
				condition = condition +" and " + "code like '%" + code + "%'";
			};	
			if(year!=null&&year!=""){
				condition = condition + " and "+"year like '%" + year + "%'" ;
			};	
			if(employeeName2!=null&&employeeName2!=""){
				condition = condition +" and "+"employeeName2 like '%" + employeeName2 + "%'";
			};	
		}else{
			condition = "1=1";
		};
		List<Map<String, Object>> result = entityDao.searchWithpaging(properties, tablename, strcondition, null, condition, null, sort ,order , index, pageNum);
		int count = getForeignCountInFull("qualityplan.ID", strcondition,null, condition, false);
		int i = 1;
		for (Map<String, Object> m : result)  
	    { 
			if(i<=count){
				m.put("number", i);
				i=i+1;
			}
	    }
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows",result);
		count = 0;
		return map;
	}
	
	@Override
	public int updataQualityPlanById(String id,String type,String  code,String year,String employeeName,String employeeName2,int jude,int judg2){
		QualityPlan qualityPlan = new QualityPlan();
		qualityPlan.setType(type);
		qualityPlan.setCode(code);
		qualityPlan.setYear(year);
		if(jude == 1){
			qualityPlan.setEmployeeID1(employeeName);		
		}
		if(judg2==1)
		{
			qualityPlan.setEmployeeID2(employeeName2);
		}
		
		return entityDao.updatePropByID(qualityPlan, id);
	}
	
	@Override
	public String deleteQualityPlanById(String idstr){
		String[] allid = idstr.split(",");
		return entityDao.deleteEntities(allid, QualityPlan.class)+"";
	}
	
	@Override
	public String addQualityPlan(String type,String code,String year,String employeeName,String employeeName2,HttpSession session){
		String id = EntityIDFactory.createId();
		QualityPlan qualityPlan = new QualityPlan();
		qualityPlan.setID(id);
		qualityPlan.setType(type);
		qualityPlan.setCode(code);
		qualityPlan.setState("寰呭鏍�");
		qualityPlan.setYear(year);
		qualityPlan.setEmployeeID1(session.getAttribute("ID").toString());
		qualityPlan.setEmployeeID2(employeeName2);
		return entityDao.save(qualityPlan)+"";
	}
	
	
}
