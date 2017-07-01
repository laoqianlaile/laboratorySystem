package com.cqut.xiji.service.department;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Date;
import java.util.HashMap;

import javax.annotation.Resource;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.entity.base.BootstrapTreeNode;
import com.cqut.xiji.entity.department.Department;
import com.cqut.xiji.entity.duty.Duty;
import com.cqut.xiji.entity.employee.Employee;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class DepartmentService extends SearchService implements IDepartmentService{
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "department";
	}
		
	@Override
	public String getBasePrimaryKey() {
		return "department.ID";
	}
   /**
    * 只需要检测和校准科室
    * features or effect
    * @author wzj
    * @date 2017年6月7日 下午10:03:18
    *
    */
	@Override
	public List<Map<String, Object>> getDepartmentName() {
		String[] properties = new String[] {"ID","departmentName"};
		String condition = " department.property =  0 or department.property = 1 ";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Department.class);
		return result;
	}
//初始化部门页面
	@Override
	public Map<String, Object> getDepartmentWithPage(String departmentCode,String departmentName,String employeeName,
			 int limit, int offset,String order, String sort) {
		int index = limit;
		int pageNum = offset / limit;
		String tableName = "department";
		String[] properties = new String[] { 
				"department.ID",
				"department.employeeID",
				"department.departmentCode",
				"department.departmentName",
				"employee.employeeName",
				"department.remarks",
				"case when department.property = 0 then '检测'"
						+ "when department.property = 1 then '校准'"
						+ "when department.property = 2 then '其他' end as property",
				
				"DATE_FORMAT(department.createTime,'%Y-%m-%d ') as createTime ",
				"department2.departmentName as Pdepartment"
						
				
		};

		String condition = " 1 = 1  ";
		if(departmentCode != null && !departmentCode.equals("")){
			 condition+=" and department.departmentCode like '%"+departmentCode+"%'  ";
		}
		if(departmentName != null && !departmentName.equals("")){
			 condition+=" and department.departmentName like '%"+departmentName+"%'  ";
		}
		if(employeeName != null && !employeeName.equals("")){
			 condition+=" and employee.employeeName like '%"+employeeName+"%'  ";
		}
	
		
		
		String joinEntity = " left join employee on department.employeeID = employee.ID "
				+" left join department as department2 on department.parentID = department2.ID";
		
		List<Map<String, Object>> result = originalSearchWithpaging(properties,
				tableName, joinEntity, null, condition, false, null,
				sort, order, index, pageNum);

		
		//int count = getForeignCount(null, condition, false);
		//int count = entityDao.getByCondition(condition, Department.class).size();
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
		
	}
	//检测是否有重复
	public String addText(String departmentCode,String departmentName){
		String[] properties = new String[] { "department.departmentCode","department.departmentName"};

		String condition = "1 = 1 " + "and department.departmentCode= '"
				+ departmentCode + "'"+"or department.departmentName= '"
				+ departmentName + "'";
		List<Map<String, Object>> list = entityDao.findByCondition(properties, condition, Department.class);
		if(list.size()==0){
			return "true";
		}else {
			return "false";
		}
	}
	//添加部门
	@Override
	public String addDepartment(String departmentName,String departmentCode,String remarks,String property,String employeeID,String parent){
		Department department = new Department();
		department.setID(EntityIDFactory.createId());
		try {
			department.setProperty(Integer.parseInt(property));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		department.setDepartmentName(departmentName);
		department.setDepartmentCode(departmentCode);
		department.setRemarks(remarks);
		department.setEmployeeID(employeeID);
		department.setCreateTime(new Date());
		
		String[] properties = new String[] { "department.ID","department.level0"};

		String condition = "1 = 1 " + "and department.departmentName= '"
				+ parent + "'";
		List<Map<String, Object>> list = entityDao.findByCondition(properties, condition, Department.class);
		if (list != null  && list.size() >0) {
			Map<String, Object> parentID=list.get(0);
          department.setParentID((String) parentID.get("ID"));
		} else  department.setParentID("");
		if(parent!=null&&!parent.equals("")){
			if(list != null  && list.size() >0){
				Map<String, Object> LEVEL=list.get(0);
				try {
					department.setLevel0(""+ (int)(Integer.valueOf((String) LEVEL.get("level0"))+1));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}else{
			department.setLevel0("1");
		}
		int result = entityDao.save(department);
		return result+"";
		
	}
//删除部门
	@Override
	public String delDepartment(String IDs) {
		// TODO Auto-generated method stub
		if(IDs == null || IDs.isEmpty()){
			return 0+"";
		}
		String[] ids = IDs.split(",");
		int result = entityDao.deleteEntities(ids, Department.class);
		return result+"";
	}
	//查询人员方法
	@Override
	public JSONArray getdatalist(int type){
		if (type==1){
			String[] properties =new String[]{
					"departmentName",
				};
			return JSONArray.fromObject(entityDao.findByCondition(properties, "1=1", Department.class));
		}else{
			String[] properties =new String[]{
					"employeeName",
				};
			return JSONArray.fromObject(entityDao.findByCondition(properties, "level0=3", Employee.class));
		}
	}
	//更新方法
	@Override
	public String updDepartment(String ID,String departmentName,String departmentCode,String remarks,String property,String employeeID,String parent){
		Department department=entityDao.getByID(ID, Department.class);
		department.setDepartmentName(departmentName);
		department.setDepartmentCode(departmentCode);
		try {
			department.setProperty(Integer.parseInt(property));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		department.setRemarks(remarks);
		department.setEmployeeID(employeeID);
		String[] properties = new String[] { "department.ID","department.level0"};

		String condition = "1 = 1 " + "and department.departmentName= '"
				+ parent + "'";
		// String str=(String)entityDao.findByCondition(properties,
		// condition, Sample.class).get(0).get("ID");
		List<Map<String, Object>> list = entityDao.findByCondition(properties, condition, Department.class);
		System.out.println(list.size());
		if (list != null  && list.size() >0) {
			Map<String, Object> parentID=list.get(0);
          department.setParentID((String) parentID.get("ID"));
		} else  department.setParentID("");
		
		if(parent!=null&&!parent.equals("")){
			if(list != null  && list.size() >0){
				Map<String, Object> LEVEL=list.get(0);
				try {
					department.setLevel0(""+(int)(Integer.valueOf((String) LEVEL.get("level0"))+1));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}else{
			department.setLevel0("1");
		}
		int result = entityDao.updatePropByID(department, ID);
		return result+"";
	}


	/*@Override
	public List<BootstrapTreeNode> getModuleTree() {
		BootstrapTreeNode TreeNode = null;
		Map<String, BootstrapTreeNode> parentOne = new HashMap<String, BootstrapTreeNode>();
		Map<String, BootstrapTreeNode> parentTwo = new HashMap<String, BootstrapTreeNode>();
		
		//头节点 
		BootstrapTreeNode node = new BootstrapTreeNode("", "部门管理");
		node.setBackColor("f2f2f2");
		node.setlevel0("0");
		node.setIcon("glyphicon glyphicon-th");
		node.setColor("green");
		node.setHref("module/jsp/department/department.jsp");
		TreeNode= node;
		
		String[]  properties = new String[]{
				" ID ",
				"havechild",
				"departmentName", 
				"parentID",
				};
		
		List<Map<String, Object>> allModules 	=	entityDao.findByCondition(properties, " 1 = 1 order by havechild  ", Department.class);
				
		for (Map<String, Object> module : allModules) {
			String havechildren = module.get("havechild").toString();
			String ParentID = module.get("parentID").toString();
			
			if ("0".equals(havechildren)) {
				node = new BootstrapTreeNode("", module.get("departmentName").toString());
				List<BootstrapTreeNode> list = new ArrayList<BootstrapTreeNode>();
				list.add(node);
				while(ParentID!=null&&!ParentID.equals("")){
					String[] properties1 = new String[] { "department.departmentName","department.parentID"};

					String condition = "1 = 1 " + "and department.ID= '"
							+ ParentID + "'";
					List<Map<String, Object>> parentnode 	=	entityDao.findByCondition(properties1, condition, Department.class);
					ParentID=parentnode.get(0).get("parentID").toString();
					node = new BootstrapTreeNode("", parentnode.get(0).get("departmentName").toString());
					list.add(node);
				}
				for(int i=0;i<list.size();i++){
					TreeNode.addChilred(list.get(list.size()-1));
				}
			}
		}
		
		List<BootstrapTreeNode> bootsrapTree = new ArrayList<BootstrapTreeNode>();
		bootsrapTree.add(TreeNode);
		return bootsrapTree;
	}*/
	//树形结构
	@Override
	public List<BootstrapTreeNode> getModuleTree() {
		BootstrapTreeNode TreeNode = null;
		Map<String, BootstrapTreeNode> parentOne = new HashMap<String, BootstrapTreeNode>();
		Map<String, BootstrapTreeNode> parentTwo = new HashMap<String, BootstrapTreeNode>();
		
		//头节点 
		BootstrapTreeNode node = new BootstrapTreeNode("", "部门管理");
		node.setBackColor("f2f2f2");
		node.setlevel0("0");
		
		node.setColor("green");
		
		TreeNode= node;
		
		String[]  properties = new String[]{
				" ID ",
				"parentID",
				" departmentName",
				"level0",
				
				
				};
		
		List<Map<String, Object>> allModules 	=	entityDao.findByCondition(properties, " 1 = 1 order by level0 ", Department.class);
				
		for (Map<String, Object> module : allModules) {
			String levelString = module.get("level0").toString();
			String ParentID = module.get("parentID").toString();
			
			if ("1".equals(levelString)) { // 第一级
				node = new BootstrapTreeNode("", module.get("departmentName").toString());
				node.setId(module.get("ID").toString());
				node.setBackColor(module.get("backColor"));
				node.setlevel0(levelString);
				
				TreeNode.addChilred(node);
				parentOne.put(module.get("ID").toString(), node);

			} else if ("2".equals(levelString)) { // 第二级

				 node = new BootstrapTreeNode("", module
						.get("departmentName").toString());
				 node.setId(module.get("ID").toString());
				node.setBackColor(module.get("backColor"));
				node.setlevel0(levelString);
				

				if (parentOne.containsKey(ParentID)) {
					parentOne.get(ParentID).addChilred(node);
					parentTwo.put(module.get("ID").toString(), node);
				} else {
					TreeNode.addChilred(node);
				}

			} else {

				 node = new BootstrapTreeNode("", module
						.get("departmentName").toString());
				 node.setId(module.get("ID").toString());
				node.setBackColor(module.get("backColor"));
				node.setlevel0(levelString);
				

				if (parentTwo.containsKey(ParentID)) {
					parentTwo.get(ParentID).addChilred(node);
				} else {
					TreeNode.addChilred(node);
				}
			}
		}

		List<BootstrapTreeNode> bootsrapTree = new ArrayList<BootstrapTreeNode>();
		bootsrapTree.add(TreeNode);
		return bootsrapTree;
	}
	
	/**
	 * @descriptlion 获取所有的部门名称
	 * @author Hzz
	 * @date 2016年12月7日 下午13:10:54
	 */
	@Override
	public List<Map<String, Object>> getAllDepartmentName() {
		// TODO Auto-generated method stub
		String[] properties = new String[] {"ID","departmentName"};
		String condition = "";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Department.class);
		return result;
	}	
}
	

	

		