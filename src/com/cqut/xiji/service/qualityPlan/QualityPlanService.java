package com.cqut.xiji.service.qualityPlan;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.qualityPlan.QualityPlan;
import com.cqut.xiji.service.base.SearchService;
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
	public Map<String, Object> getQualityPlanWithPaging(int limit, int offset,String order,String sort,String type,String year,String code,String employeeName2, String EMPLOYEEID) {
		List<Map<String, Object>> permission = entityDao.searchForeign(new String[]{"permission"}, "employee", null, null, " ID='"+EMPLOYEEID+"'");
		System.out.println((int)(permission.get(0).get("permission")) == 1);
		System.out.println((permission.get(0).get("permission").equals("0")));
		
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
				"remark"
		};
		String strcondition = " left JOIN employee ON qualityPlan.employeeID1 = employee.ID"+
							" left JOIN (select employeeName as employeeName2 , employee.ID from employee) as employee2 ON qualityPlan.employeeID2 = employee2.ID";
		
		if((type!=null&&type!="")||(code!=null&&code!="")||(year!=null&&year!="")||(employeeName2!=null&&employeeName2!="")||(int)(permission.get(0).get("permission")) == 1||(int)(permission.get(0).get("permission")) == 0){
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
			if((int)(permission.get(0).get("permission")) == 0){
				condition = "1=1";
			};
			if((int)(permission.get(0).get("permission")) == 1){
				condition = condition +" and "+"employee2.ID = qualityplan.employeeID2" +" and "+" employee2.ID = '"+EMPLOYEEID+"'";
			}
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
	public int updataQualityPlanById(String id,String type,String  code,String year,String employeeName,String employeeName2,int jude,int judg2,String remark){
		QualityPlan qualityPlan = new QualityPlan();
		qualityPlan.setType(type);
		qualityPlan.setCode(code);
		qualityPlan.setYear(year);
		qualityPlan.setRemark(remark);
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
	public String addQualityPlan(String type,String code,String year,String employeeName,String employeeName2,String remark,HttpSession session){
		String id = EntityIDFactory.createId();
		QualityPlan qualityPlan = new QualityPlan();
		qualityPlan.setID(id);
		qualityPlan.setType(type);
		qualityPlan.setCode(code);
		qualityPlan.setState("未审核");
		qualityPlan.setYear(year);
		qualityPlan.setEmployeeID1(session.getAttribute("ID").toString());
		qualityPlan.setEmployeeID2(employeeName2);
		qualityPlan.setRemark(remark);
		return entityDao.save(qualityPlan)+"";
	}
	
	
}
