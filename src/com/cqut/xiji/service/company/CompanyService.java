package com.cqut.xiji.service.company;

import java.text.DateFormat;
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
import com.cqut.xiji.entity.company.Company;
import com.cqut.xiji.entity.role.Role;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class CompanyService extends SearchService implements ICompanyService {

	@Resource(name = "entityDao")
	EntityDao entityDao;

	@Resource(name = "searchDao")
	SearchDao searchDao;

	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "company";
	}

	@Override
	public String getBasePrimaryKey() {
		return "company.ID";
	}

	@Override
	public Map<String, Object> getCompanyWithPaging(int limit, int offset,
			String order, String sort, String roleName) {
		int index = limit;
		int pageNum = offset / limit + 1;
		String tableName = "company";
		String[] properties = new String[] { "COMPANYID", "NAME", "CONTACTOR",
				"CONTACTPHONE", "TELEPHONE", "ADDRESS", "SCOPE",
				"DATE_FORMAT(CREATTIME,'%Y-%m-%d') AS CREATTIME ", "REMARKS" };
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tableName, null, null, " 1=1 ", null, "CREATTIME",
				sort, index, pageNum);
		int count = entityDao.getByCondition(" 1=1 ", Role.class).size();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		
		/*Set<String> fieldSqls =new HashSet<String>();
		fieldSqls.add("column1 SMALLINT NOT NULL PRIMARY KEY");
		fieldSqls.add("column2 VARCHAR(20) ");
		entityDao.createtable("xinbiao",fieldSqls);*/
		
		
		
		
		return map;
	}

	@Override
	public String addCompany(String NAME, String CONTACTOR,
			String CONTACTPHONE, String TELEPHONE, String ADDRESS,
			String SCOPE, String CREATTIMES, String REMARKES) {
		CompanyService cs = new CompanyService();
		Company company = cs.setValue(null, NAME, CONTACTOR, CONTACTPHONE,
				TELEPHONE, ADDRESS, SCOPE, CREATTIMES, REMARKES);

		int result = entityDao.save(company);
		return result + "";
	}

	@Override
	public String delCompany(String COMPANYID) {
		if (COMPANYID == null || COMPANYID.isEmpty()) {
			return 0 + "";
		}
		String[] ids = COMPANYID.split(",");
		int result = entityDao.deleteEntities(ids, Company.class);
		return result + "";

	}

	@Override
	public String updCompany(String COMPANYID, String NAME, String CONTACTOR,
			String CONTACTPHONE, String TELEPHONE, String ADDRESS,
			String SCOPE, String CREATTIMES, String REMARKES) {
		CompanyService cs = new CompanyService();
		Company company = cs.setValue(COMPANYID, NAME, CONTACTOR, CONTACTPHONE,
				TELEPHONE, ADDRESS, SCOPE, CREATTIMES, REMARKES);
		int result = entityDao.updatePropByID(company, COMPANYID);
		return result + "";
	}

	@Override
	public Company setValue(String COMPANYID, String NAME, String CONTACTOR,
			String CONTACTPHONE, String TELEPHONE, String ADDRESS,
			String SCOPE, String CREATTIMES, String REMARKES) {
		DateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
		Date date = null;
		try {
			date = fmt.parse(CREATTIMES);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		Company company = new Company();
		if (COMPANYID == null || COMPANYID.isEmpty()) {
			company.setID(EntityIDFactory.createId());
		}
		company.setCompanyName(NAME);
		company.setLinkMan(CONTACTOR);
		//company.setFlxedTelephone(CONTACTPHONE);
		//company.setMobilePhone(TELEPHONE);
		company.setAddress(ADDRESS);
		company.setScope(SCOPE);
		//company.setCreateTime(date);
		company.setRemarks(REMARKES);
		return company;
	}

	@Override
	public List<Map<String, Object>> getCompanyName(String companyName) {
//		String tableName = "company";
		String[] properties = new String[] {"ID","companyName"};
		String condition = null;
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Company.class);
		return result;
	}
	
	@Override
	public List<Map<String, Object>> getCompanyMsg(String companyName) {
//		String tableName = "company";
		
		String[] properties = new String[] {"ID","companyName","linkMan","mobilePhone","address"};
		
		String condition = " companyName like '%" + companyName + "%' ORDER BY createTime ";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Company.class);
		return result;
	}
   /**
    * 
    * 通过公司ID获取公司信息
    * @author wzj
    * @date 2016年11月21日 下午2:37:22
    *
    */
	@Override
	public Map<String, Object> getCompanyInformation(String comID) {
		// TODO Auto-generated method stub
		if(comID == null || comID.equals(""))
		   return null;
		String[] properties = new String[]{
				"company.ID",
				"companyName",
				"address"
		};
		Map<String, Object> company = entityDao.findByID(properties,comID, Company.class);
		return company;
	}
	@Override
	public List<Map<String, Object>> getComListByName(String companyName) {
		// TODO Auto-generated method stub
		if(companyName == null || companyName.equals("")){
			return null;
		}else{
			companyName = companyName.replaceAll(" ", "");
		}
		String[] properties = new String[]{
				"company.ID ",
				"company.companyName",
				"company.address"
		};
		String condition = " companyName like '%"+companyName+"%' order by companyName asc ";
		List<Map<String, Object>> list = entityDao.findByCondition(properties, condition, Company.class);
		return list;
	}

public Map<String, Object> getCompanyWithPage(String companyName,String address,String linkMan,
		 int limit, int offset,String order, String sort) {
	int index = limit;
	int pageNum = offset / limit;
	String tableName = "company";
	String[] properties = new String[] { 
			"company.ID",
			"company.companyName",
			"company.linkMan",
			"company.mobilePhone",
			"company.address",
			"company.scope",
			"company.fax",
			"company.emailbox",
			"DATE_FORMAT(company.createTime,'%Y-%m-%d ') as createTime ",
			
					
			
	};

	String condition = " 1 = 1  ";
	if(companyName != null && !companyName.equals("")){
		 condition+=" and company.companyName like '%"+companyName+"%'  ";
	}
	if(address != null && !address.equals("")){
		 condition+=" and company.address like '%"+address+"%'  ";
	}
	if(linkMan != null && !linkMan.equals("")){
		 condition+=" and company.linkMan like '%"+linkMan+"%'  ";
	}

	
	
/*	String joinEntity = " left join employee on department.employeeID = employee.ID "
			+" left join department as department2 on department.parentID = department2.ID";*/
	
	List<Map<String, Object>> result = originalSearchWithpaging(properties,
			tableName, null, null, condition, false, null,
			sort, order, index, pageNum);

	
	//int count = getForeignCount(null, condition, false);
	//int count = entityDao.getByCondition(condition, Department.class).size();
	int count = getForeignCountWithJoin(null, null, condition, false);

	Map<String, Object> map = new HashMap<String, Object>();
	map.put("total", count);
	map.put("rows", result);
	return map;
	
}
}
