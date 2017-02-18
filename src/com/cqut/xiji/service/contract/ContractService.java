package com.cqut.xiji.service.contract;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
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
import com.cqut.xiji.entity.contract.Contract;
import com.cqut.xiji.entity.employee.Employee;
import com.cqut.xiji.entity.equipment.Equipment;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class ContractService extends SearchService implements IContractService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "contract";
	}

	@Override
	public String getBasePrimaryKey() {
		return "contract.ID";
	}

	/**
	 * 
	 * @description 初始化数据
	 * @author hujiajun
	 * @created 2016-10-22 下午5:23:08
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @param contractName
	 * @param contractCode
	 * @param employeeName
	 * @param companyName
	 * @param startTime
	 * @param endTime
	 * @param oppositeMen
	 * @param linkPhone
	 * @param state
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#getContractWithPaging2(int, int, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, int)
	 */
	@Override
	public Map<String, Object> getContractWithPaging2(int limit, int offset, String sort, String order, String contractName, String contractCode, String employeeName, String companyName, String startTime, String endTime, String oppositeMen, String linkPhone, int state) {
		// TODO Auto-generated method stub
		int index = limit;
		int pageNum = offset/limit ;
		String tableName = "contract";
		String[] properties = new String[]{
				"contract.ID",
				"contract.contractCode",
				"contract.contractName",
				"company.companyName",
				"contract.oppositeMen",
				"contract.linkPhone",
				"employee.employeeName",
				"contract.signAddress",
				"date_format(contract.signTime,'%Y.%m.%d') as signTime",
				"date_format(contract.startTime,'%Y.%m.%d') as startTime",
				"date_format(contract.endTime,'%Y.%m.%d') as endTime",
				"contract.contractAmount",
				"case when contract.isClassified = 0 then '否' "
				+ "when contract.isClassified = 1 then '是' end as isClassified",
				"case when contract.classifiedLevel = 0 then '秘密' "
				+ "when contract.classifiedLevel = 1 then '机密' "
				+ "when contract.classifiedLevel = 2 then '绝密' "
				+ "when contract.classifiedLevel = 3 then '无密级' end as classifiedLevel",
				"case when contract.state = 0 then '未上传合同文件' "
				+ "when contract.state = 1 then '未提交' "
				+ "when contract.state = 2 then '审核中' "
				+ "when contract.state = 3 then '驳回' "
				+ "when contract.state = 4 then '审核通过' "
				+ "when contract.state = 5 then '执行中' "
				+ "when contract.state = 6 then '执行完成' "
				+ "when contract.state = 7 then '异常终止' end as state",
				"contract.viewpoint"
		};
		String joinEntity = " LEFT JOIN company ON contract.companyID = company.ID " +
				" LEFT JOIN employee ON contract.employeeID = employee.ID ";
		String condition = " 1 = 1 "; 
		if (contractCode != null && !contractCode.isEmpty()) {
			condition += " and contractCode like '%" + contractCode+ "%'";
		}if (employeeName != null && !employeeName.isEmpty()) {
			condition += " and employeeName like '%" + employeeName + "%'";
		}if (companyName != null && !companyName.isEmpty()) {
			condition += " and companyName like '%" + companyName + "%'";
		}if (startTime != null && !startTime.isEmpty()) {
			condition += " and signTime >'" + startTime + "'";
		}if (endTime != null && !endTime.isEmpty()) {
			condition += " and signTime <'" + endTime + "'";
		}if (oppositeMen != null && !oppositeMen.isEmpty()) {
			condition += " and oppositeMen like '%" + oppositeMen + "%'";
		}if (linkPhone != null && !linkPhone.isEmpty()) {
			condition += " and linkPhone like '%" + linkPhone + "%'";
		}if (state > 0 && state < 8 ) {
				condition += " and contract.state = '" + state + "'";
		}
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tableName, joinEntity, null, condition, null,sort,
				order, index, pageNum);
		System.out.println("result:"+result);
		int count = entityDao.getByCondition(" 1=1 ", Contract.class).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}
	
	/**
	 * 
	 * @description 通过合同编号获得合同ID
	 * @author hujiajun
	 * @created 2016-10-21 下午4:47:01
	 * @param contractCode
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#getIdByCode(java.lang.String)
	 */
	@Override
	public List<Map<String, Object>> getIdByCode(String contractCode) {
		// TODO Auto-generated method stub
		String[] properties = new String[] {"ID"};
		String condition = "contractCode=" + contractCode;
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Contract.class);
		return result;
	}
	
	@Override
	public List<Map<String, Object>> getContractByCode(String contractCode) {
		// TODO Auto-generated method stub
		String baseEntity = "contract";
		String[] properties = new String[]{
				"contract.ID",
				"contract.contractCode",
				"contract.contractName",
				"company.companyName",
				"contract.oppositeMen",
				"contract.linkPhone",
				"employee.employeeName",
				"contract.signAddress",
				"date_format(contract.signTime,'%Y.%m.%d') as signTime",
				"date_format(contract.startTime,'%Y.%m.%d') as startTime",
				"date_format(contract.endTime,'%Y.%m.%d') as endTime",
				"contract.contractAmount",
				"case when contract.isClassified = 0 then '否' "
				+ "when contract.isClassified = 1 then '是' end as isClassified",
				"case when contract.classifiedLevel = 0 then '秘密' "
				+ "when contract.classifiedLevel = 1 then '机密' "
				+ "when contract.classifiedLevel = 2 then '绝密' "
				+ "when contract.classifiedLevel = 3 then '无密级' end as classifiedLevel",
				"case when contract.state = 0 then '未上传合同文件' "
				+ "when contract.state = 1 then '未提交' "
				+ "when contract.state = 2 then '审核中' "
				+ "when contract.state = 3 then '驳回' "
				+ "when contract.state = 4 then '审核通过' "
				+ "when contract.state = 5 then '执行中' "
				+ "when contract.state = 6 then '执行完成' "
				+ "when contract.state = 7 then '异常终止' end as state"
		};
		String joinEntity = " LEFT JOIN company ON contract.companyID = company.ID " +
				" LEFT JOIN employee ON contract.employeeID = employee.ID ";
		String condition = "contract.contractCode=" + contractCode;
		List<Map<String, Object>> result = entityDao.searchForeign(properties,baseEntity,joinEntity,null,condition);
		System.out.println("result:"+result);
		return result;
	}
	
	@Override
	public List<Map<String, Object>> getContractByID(String ID) {
		// TODO Auto-generated method stub
		String baseEntity = "contract";
		String[] properties = new String[]{
				"contract.ID",
				"contract.contractCode",
				"contract.contractName",
				"contract.companyID",
				"company.companyName",
				"company.address",
				"contract.oppositeMen",
				"contract.linkPhone",
				"contract.employeeID",
				"employee.employeeName",
				"contract.signAddress",
				"date_format(contract.signTime,'%Y.%m.%d') as signTime",
				"date_format(contract.startTime,'%Y.%m.%d') as startTime",
				"date_format(contract.endTime,'%Y.%m.%d') as endTime",
				"contract.contractAmount",
				"contract.isClassified",
				"contract.classifiedLevel",
				"case when contract.state = 0 then '未上传合同文件' "
				+ "when contract.state = 1 then '未提交' "
				+ "when contract.state = 2 then '审核中' "
				+ "when contract.state = 3 then '驳回' "
				+ "when contract.state = 4 then '审核通过' "
				+ "when contract.state = 5 then '执行中' "
				+ "when contract.state = 6 then '执行完成' "
				+ "when contract.state = 7 then '异常终止' end as state"
		};
		String joinEntity = " LEFT JOIN company ON contract.companyID = company.ID " +
				" LEFT JOIN employee ON contract.employeeID = employee.ID ";
		String condition = "contract.ID='" + ID + "'";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,baseEntity,joinEntity,null,condition);
		System.out.println("getContractByID() result:"+result);
		return result;
	}
	
	/**
	 * 
	 * @description 新增合同
	 * @author hujiajun
	 * @created 2016-10-21 下午4:45:53
	 * @param contractName
	 * @param companyName
	 * @param oppositeMen
	 * @param linkPhone
	 * @param employeeName
	 * @param signAddress
	 * @param startTime
	 * @param signTime
	 * @param endTime
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#addContract(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public int addContract(String contractName, String companyName, String oppositeMen,String linkPhone, String employeeName, String address, String signAddress,String startTime,String signTime, String endTime) {
		// TODO Auto-generated method stub
		Company company = new Company();
		String id = EntityIDFactory.createId();
		company.setID(id);
		company.setCompanyName(companyName);
		company.setAddress(address);
		company.setMobilePhone(linkPhone);
		company.setLinkMan(oppositeMen);
		int result = entityDao.save(company);
	
		Contract contract = new Contract();
		String contractCode = "20161010";
		int isClassified = 0;
		int classifiedLevel = 3;
		int state = 0;
		contract.setID(EntityIDFactory.createId());
		contract.setContractCode(contractCode);
		contract.setContractName(contractName);
		contract.setCompanyID(id);
		contract.setOppositeMen(oppositeMen);
		contract.setLinkPhone(linkPhone);
		contract.setEmployeeID(employeeName);
		contract.setSignAddress(signAddress);
		contract.setIsClassified(isClassified);
		contract.setClassifiedLevel(classifiedLevel);
		contract.setState(state);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd");
		Date startTime1 = null;
		Date signTime1 = null;
		Date endTime1 = null;
		try {
			startTime1 = sdf.parse(startTime);
			signTime1 = sdf.parse(signTime);
			endTime1 = sdf.parse(endTime);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (startTime1 != null && signTime1 != null && endTime1 != null) {
			contract.setStartTime(startTime1);
			contract.setSignTime(signTime1);
			contract.setEndTime(endTime1);
		}
		
		result = entityDao.save(contract);
		
		if(result <= 0){
			String position = "ID =" + id;
			result = entityDao.deleteByCondition(position, Company.class);
			return result;
		}
		return result;
	}
	
	/**
	 * 
	 * @description 删除合同
	 * @author hujiajun
	 * @created 2016-10-21 下午4:45:15
	 * @param ids
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#delContract(java.lang.String)
	 */
	@Override
	public int delContract(String ids) {
		// TODO Auto-generated method stub
		if(ids == null || ids.isEmpty()){
			return 0;
		}
		System.out.println("删除合同ID是："+ids);
		int result = entityDao.deleteByCondition(ids, Contract.class);
		return result;
	}

	/**
	 * 
	 * @description 修改合同
	 * @author hujiajun
	 * @created 2016-10-21 下午4:44:16
	 * @param ID
	 * @param contractCode
	 * @param contractName
	 * @param companyID
	 * @param companyName
	 * @param address
	 * @param oppositeMen
	 * @param linkPhone
	 * @param employeeID
	 * @param employeeName
	 * @param signAddress
	 * @param startTime
	 * @param signTime
	 * @param endTime
	 * @param contractAmount
	 * @param isClassified
	 * @param classifiedLevel
	 * @param state
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#updContract(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, double, int, int, int)
	 */
	@Override
	public String updContract(String ID, String contractCode, String contractName,
			String companyID, String companyName, String address,
			String oppositeMen, String linkPhone, String employeeID,
			String employeeName, String signAddress, String startTime,
			String signTime, String endTime, double contractAmount,
			int isClassified, int classifiedLevel, int state) {
		// TODO Auto-generated method stub
		System.out.println("进入updContract");
		//String[] properties = {"companyName"};
		
		String companyid = "";
		String[] properties = new String[] {"ID"};
		String condition = "companyName like '%" + companyName + "%'";
		List<Map<String, Object>> list = entityDao.findByCondition(properties, condition, Company.class);
		Map<String, Object> temp = list.get(0);
		
		for (String obj : temp.keySet()) {
			
			Object value = temp.get(obj);
			// 判断取出来的值是否为空
			if (value != null && !"".equals(value.toString())) {
				// 转换为String类型
				companyid = value.toString();
				System.out.println("companyid"+companyid);
			}
		}
		
		if(companyid != null && !"".equals(companyid)){
			if(companyid.equals(companyID)){
				Company company = new Company();
				company.setCompanyName(companyName);
				company.setAddress(address);
//				company.setMobilephone(linkPhone);
				company.setLinkMan(oppositeMen);
				
				int result = entityDao.updatePropByID(company,companyID);
			}else{
				Company company = new Company();
				company.setCompanyName(companyName);
				company.setAddress(address);
//				company.setMobilephone(linkPhone);
				company.setLinkMan(oppositeMen);
				
				int result = entityDao.updatePropByID(company,companyid);
			}
		}else{
			Company company = new Company();
			String id = EntityIDFactory.createId();
			company.setID(id);
			company.setCompanyName(companyName);
			company.setAddress(address);
//			company.setMobilephone(linkPhone);
			company.setLinkMan(oppositeMen);
			int result = entityDao.save(company);
			companyID = id;
		}
		
		String employeeid = "";
		String[] properties1 = new String[] {"ID"};
		String condition1 = "employeeName like '%" + employeeName + "%'";
		
		List<Map<String, Object>> list1 = entityDao.findByCondition(properties1, condition1, Employee.class);
		Map<String, Object> temp1 = list1.get(0);
		
		for (String obj : temp1.keySet()) {
			
			Object value = temp1.get(obj);
			// 判断取出来的值是否为空
			if (value != null && !"".equals(value.toString())) {
				// 转换为String类型
				employeeid = value.toString();
				System.out.println("employeeid"+employeeid);
			}
		} 
		
		if(employeeid != null && !"".equals(employeeid)){
			if(employeeid.equals(employeeID)){
				System.out.println(employeeid);
			}else{
				employeeID = employeeid;
			}
		}else{
			System.out.println("没有员工,此项不会改变");
		}
		
		Contract contract = new Contract();
		contract.setContractCode(contractCode);
		contract.setContractName(contractName);
		contract.setCompanyID(companyID);
		contract.setOppositeMen(oppositeMen);
		contract.setLinkPhone(linkPhone);
		contract.setEmployeeID(employeeID);
		contract.setSignAddress(signAddress);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd");
		Date startTime1 = null;
		Date signTime1 = null;
		Date endTime1 = null;
		try {
			startTime1 = sdf.parse(startTime);
			signTime1 = sdf.parse(signTime);
			endTime1 = sdf.parse(endTime);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if (startTime1 != null && signTime1 != null && endTime1 != null) {
			contract.setStartTime(startTime1);
			contract.setSignTime(signTime1);
			contract.setEndTime(endTime1);
		}
		contract.setContractAmount(contractAmount);
		contract.setIsClassified(isClassified);
		contract.setClassifiedLevel(classifiedLevel);
		contract.setState(state);
		
		int result = entityDao.updatePropByID(contract,ID);
		return result + "";
	}
	
	/**
	 * 
	 * @description 添加审核意见
	 * @author hujiajun
	 * @created 2016-10-22 下午5:24:02
	 * @param ID
	 * @param viewpoint
	 * @param state
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#auditContract(java.lang.String, java.lang.String, int)
	 */
	@Override
	public int auditContract(String ID, String viewpoint, int state) {
		Contract contract = new Contract();
		contract.setViewpoint(viewpoint);
		contract.setState(state);
		
		int result = entityDao.updatePropByID(contract,ID);
		System.out.println("返回信息" + result);
		return result;
	}
	
	
	/**
	 * 
	 * @description 初始化表格
	 * @author fei
	 * @created 2016-10-8 下午7:59:17
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param contract
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#getContractWithPaging(int, int, java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getContractWithPaging(int limit, int offset,String order,String sort,String contract) {
		System.out.println("222" + "<br />");
		int index = limit;
		int pageNum = offset/limit ;
		String tablename = "contract";
		String[] properties = new String[]{
				"ID",
				"contractName",
				"signTime"
		};
		List<Map<String, Object>> result = entityDao.searchWithpaging(properties, tablename, null, null, "1=1", null, sort, order, index, pageNum);
		int count = entityDao.getByCondition("1=1", Contract.class).size();
		String receive ="";
		for (Map<String, Object> m : result)  
	    { 
			receive ="<span class='tabledata'>" + m.get("signTime").toString() + "</span>";
	    	m.put("contractName", "<img class='point-image' src='Portal/images/point_triangle.png' />"+"<span class='tablevalue'>" + m.get("contractName")+"</span>" + receive);
	       
	    }
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows",result);
		return map;
	}
	/**
	 * @description 获取公司信息
	 * @author hzz
	 * @date 2016年11月30日 中午12:35:44
	 */
	@Override
	public List<Map<String, Object>> getcompanyInforByCode(String contractCode) {
		// TODO Auto-generated method stub
		String tableName = "contract";
		String[] properties = new String[]{
				"company.companyName",	
				"company.ID as comID",
				"contract.ID as conID"
		};
		
		String[] foreignEntitys = new String[]{
				"company",
		};
		
		String condition = "contract.contractCode ='"+ contractCode+"'"
				+ " and contract.companyID = company.ID ";
	List<Map<String, Object>> result = entityDao.searchForeign(properties, tableName, null, foreignEntitys, condition);
	return result;
	}

	/**
	 * 获取合同ID、合同编码、合同名称、合同金额
	 * 
	 * @author zkl
	 * @return
	 */
	@Override
	public List<Map<String, Object>> getContract() {
		String[] properties = new String[] {

				"contract.ID as contractID", "contract.contractCode",
				"contract.contractName",
				"contract.contractAmount"
				};
				List<Map<String, Object>> result = entityDao.findByCondition(
						properties, " 1 = 1", Contract.class);

				System.out.println(Arrays.toString(result.toArray()));

			return result;
	}
}
