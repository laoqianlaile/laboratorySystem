package com.cqut.xiji.service.contract;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.context.annotation.Condition;
import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.company.Company;
import com.cqut.xiji.entity.contract.Contract;
import com.cqut.xiji.entity.contractFineItem.ContractFineItem;
import com.cqut.xiji.entity.employee.Employee;
import com.cqut.xiji.entity.equipment.Equipment;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.entity.project.Project;
import com.cqut.xiji.entity.receiptlist.Receiptlist;
import com.cqut.xiji.entity.technical.Technical;
import com.cqut.xiji.entity.template.Template;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.service.company.CompanyService;
import com.cqut.xiji.service.fileEncrypt.IFileEncryptService;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.cqut.xiji.tool.util.PropertiesTool;
import com.cqut.xiji.tool.word.WordProcess;

@Service
public class ContractService extends SearchService implements IContractService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;
	
	@Resource(name = "fileEncryptService")
	IFileEncryptService fileEncryptservice;

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
				"contract.fileID",
				"contract.ID",
				"contract.contractCode",
				"contract.contractName",
				"contract.isInput",
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
		}if (state >= 0 && state < 8 ) {
				condition += " and contract.state = '" + state + "'";
		}if (state == 9) {
			condition += " and contract.state != '0' and contract.state != '1' ";
		}
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tableName, joinEntity, null, condition, null,sort,
				order, index, pageNum);
		int count = entityDao.searchForeign(properties, tableName, joinEntity, null, condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}
	
	/**
	 * 
	 * @description 获取合同审核界面需要的数据
	 * @author LG.hujiajun
	 * @created 2017年6月30日 上午9:31:12
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
	 * @see com.cqut.xiji.service.contract.IContractService#getContractAuditWithPaging(int, int, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, int)
	 */
	@Override
	public Map<String, Object> getContractAuditWithPaging(int limit, int offset, String sort, String order, String contractName, String contractCode, String employeeName, String companyName, String startTime, String endTime, String oppositeMen, String linkPhone, int state) {
		// TODO Auto-generated method stub
		int index = limit;
		int pageNum = offset/limit ;
		String tableName = "contract";
		String[] properties = new String[]{
				"contract.fileID",
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
				"case when contract.state = 2 then '待审核' "
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
		}if (state == 9) {
			condition += " and contract.state != '0' and contract.state != '1' ";
		}
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tableName, joinEntity, null, condition, null,sort,
				order, index, pageNum);
		int count = entityDao.searchForeign(properties, tableName, joinEntity, null, condition).size();
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
	
	/**
	 * 
	 * @description 通过合同编号获得合同
	 * @author LG.hujiajun
	 * @created 2017年6月30日 上午9:32:28
	 * @param contractCode
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#getContractByCode(java.lang.String)
	 */
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
	
	/**
	 * 
	 * @description 通过合同ID获得合同
	 * @author LG.hujiajun
	 * @created 2017年6月30日 上午9:33:06
	 * @param ID
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#getContractByID(java.lang.String)
	 */
	@Override
	public List<Map<String, Object>> getContractByID(String ID) {
		// TODO Auto-generated method stub
		String baseEntity = "contract";
		String[] properties = new String[]{
				"contract.ID",
				"contract.contractCode",
				"contract.contractName",
				"contract.companyID",
				"contract.fileID",
				"company.companyName",
				"company.address",
				"contract.oppositeMen",
				"contract.linkPhone",
				"contract.employeeID",
				"employee.employeeName",
				"contract.signAddress",
				"date_format(contract.signTime,'%Y年%m月%d日') as signTime",
				"date_format(contract.startTime,'%Y年%m月%d日') as startTime",
				"date_format(contract.endTime,'%Y年%m月%d日') as endTime",
				"contract.contractAmount",
				"contract.isClassified",
				"contract.classifiedLevel",
				"technical.ID as technicalID",
				"technical.content as technicalContent",
				"contract.type as contractType",
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
				" LEFT JOIN employee ON contract.employeeID = employee.ID " +
				" LEFT JOIN technical ON technical.contractID = contract.ID ";
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
	public int addContract(String contractCode,String contractName, String companyID, String companyName, String oppositeMen,String linkPhone,String employeeID, String employeeName, String address, String signAddress,String startTime,String signTime, String endTime,int isClassified,int classifiedLevel,int contractType,String technicalContent) {
		// TODO Auto-generated method stub
		String[] properties = new String[] {"ID"};
		String condition = " contractCode = '" + contractCode + "'";
		List<Map<String, Object>> resul = entityDao.findByCondition(properties, condition, Contract.class);
		if(!resul.isEmpty()){
			System.out.println("合同编号已存在！");
			return -11;
		}
		
		String[] properties1 = new String[] {"ID"};
		String condition1 = " companyName = '" + companyName + "'";
		List<Map<String, Object>> result1 = entityDao.findByCondition(properties1, condition1, Company.class);
		if(result1.isEmpty()){
			System.out.println("不存在该公司名的公司,将新增对应公司记录");
			Company company = new Company();
			companyID = EntityIDFactory.createId();
			company.setID(companyID);
			company.setCompanyName(companyName);
			company.setLinkMan(oppositeMen);
			company.setMobilePhone(linkPhone);
			company.setAddress(address);
			company.setCreateTime(new Date());
			int result = entityDao.save(company);
			if(result <= 0){
				String position = "ID =" + companyID;
				entityDao.deleteByCondition(position,Company.class);
				return -2;
			}
		}else{
			int com = 0;
			String companyID1 = "";
			for (int i = 0; i < result1.size(); i++) {
				companyID1 = result1.get(i).get("ID").toString();
				if(companyID1.equals(companyID)){
					com = 1;
				}
			}
			if(com == 0){
				System.out.println("公司名与公司ID不相符");
				return -4;
			}
		}
		String[] properties2 = new String[] {"ID"};
		String condition2 = " employeeName = '" + employeeName + "'";
		List<Map<String, Object>> result2 = entityDao.findByCondition(properties2, condition2, Employee.class);
		if(result2.isEmpty()){
			System.out.println("不存在该员工");
			return -6;
		}else{
			String employeeID1 = result2.get(0).get("ID").toString();
			if(!employeeID1.equals(employeeID)){
				System.out.println("员工名与员工ID不相符");
				return -8;
			}
		}
		Contract contract = new Contract();
		String ID = EntityIDFactory.createId();
		int state = 0;
		contract.setID(ID);
		contract.setContractCode(contractCode);
		contract.setContractName(contractName);
		contract.setCompanyID(companyID);
		contract.setOppositeMen(oppositeMen);
		contract.setLinkPhone(linkPhone);
		contract.setEmployeeID(employeeID);
		contract.setSignAddress(signAddress);
		contract.setIsClassified(isClassified);
		contract.setClassifiedLevel(classifiedLevel);
		contract.setType(contractType);
		contract.setOrderType(0);
		contract.setIsInput(0);
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
		
		int result = entityDao.save(contract);
		if(result <= 0){
			String position = "ID =" + ID;
			entityDao.deleteByCondition(position,Contract.class);
		}else{
			Project project = new Project();
			String projectID = EntityIDFactory.createId();
			int projectState = 1;
			project.setID(projectID);
			project.setContractID(ID);
			project.setState(projectState);
			project.setCreateTime(new Date());
			project.setRemarks("新增合同时创建的项目");
			int aresult = entityDao.save(project);
		}
		
		Technical technical = new Technical();
		String technicalID = EntityIDFactory.createId();
		technical.setID(technicalID);
		technical.setContractID(ID);
		technical.setContent(technicalContent);
		entityDao.save(technical);
		
		return result;
	}
	
	/**
	 * 
	 * @description 复制合同
	 * @author LG.hujiajun
	 * @created 2017年6月30日 下午4:21:16
	 * @param ID
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#cloneContractByID(java.lang.String)
	 */
	@Override
	public int cloneContractByID(String ID){
		Contract contract = entityDao.getByID(ID, Contract.class);
		String contractID = EntityIDFactory.createId();
		String contractCode = contract.getContractCode();
		contract.setID(contractID);
		contract.setContractCode(contractCode);
		int result1 = entityDao.save(contract);
		if(result1 <= 0){
			String position = "ID =" + contractID;
			entityDao.deleteByCondition(position,Contract.class);
			return -2;
		}
		
		String baseEntityf = "contractFineItem";
		String[] propertiesf = new String[]{
				" contractFineItem.ID as contractFineItemID"
		};
		String joinEntityf = "";
		String conditionf = " contractFineItem.contractID = " + ID;
		List<Map<String, Object>> result2 = entityDao.searchForeign(propertiesf,baseEntityf,joinEntityf,null,conditionf);
		String contractFineItemID = "";
		String contractFineItemId = "";
		int result4 = 1;
		System.out.println("result2:"+result2);
		if(!result2.isEmpty()){
			for(int i = 0; i < result2.size(); i++){
				contractFineItemID = result2.get(i).get("contractFineItemID").toString();
				ContractFineItem contractFineItem = entityDao.getByID(contractFineItemID, ContractFineItem.class);
				contractFineItemId = EntityIDFactory.createId();
				contractFineItem.setID(contractFineItemId);
				contractFineItem.setContractID(contractID);
				int result3 = entityDao.save(contractFineItem);
				if(result3 <= 0){
					result4 = result3;
					String position = "ID =" + contractFineItemId;
					entityDao.deleteByCondition(position,ContractFineItem.class);
				}
			}
			if(result4 <= 0){
				return -3;
			}
		}
		return 1;
	}
	@Override
	public int isContractFile(String ID){
		String[] properties1 = new String[] {"ID"};
		String condition1 = " fileinformation.belongtoID = '" + ID + "'";
		List<Map<String, Object>> result1 = entityDao.findByCondition(properties1, condition1, FileInformation.class);
		
		if(result1.isEmpty()){
			System.out.println("不存在合同模板文件");
			return 0;
		}
		return 1;
	}
	/**
	 * 
	 * @description 覆盖合同信息，生成新合同
	 * @author hujiajun
	 * @created 2017年3月16日 下午7:41:09
	 * @param ID
	 * @param contractCode
	 * @param contractName
	 * @param companyName
	 * @param oppositeMen
	 * @param linkPhone
	 * @param employeeName
	 * @param address
	 * @param signAddress
	 * @param startTime
	 * @param signTime
	 * @param endTime
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#coverContractFile(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String)
	 */
	public int coverContractFile1(String ID, String fileID,HttpServletRequest request,HttpServletResponse response){
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
		
		String baseEntityf = "fileInformation";
		String[] propertiesf = new String[]{
				" fileInformation.ID AS fileID",
				"fileinformation.pathPassword", 
				"fileinformation.path",
				"fileinformation.filePassword"
		};
		String joinEntityf = " LEFT JOIN template ON template.fileID = fileInformation.ID ";
		String conditionf = " fileinformation.id = " + fileID;
		List<Map<String, Object>> result1 = entityDao.searchForeign(propertiesf,baseEntityf,joinEntityf,null,conditionf);
		
		if(result1.isEmpty()){
			System.out.println("不存在合同模板文件");
			return -3;
		}
		String fileInfoID = result1.get(0).get("fileID").toString();;
		String filePath = result1.get(0).get("path").toString();
		String pathPassword = result1.get(0).get("pathPassword").toString();
		
		String baseEntity1 = "contract";
		String[] properties1 = new String[]{
				"contract.ID",
				"contract.contractCode",
				"contract.contractName",
				"contract.companyID",
				"contract.fileID",
				"company.companyName",
				"company.address",
				"company.linkMan",
				"company.fax",
				"contract.oppositeMen",
				"contract.linkPhone",
				"contract.employeeID",
				"employee.employeeName",
				"contract.signAddress",
				"date_format(contract.signTime,'%Y年%m月%d日') as signTime",
				"date_format(contract.startTime,'%Y年%m月%d日') as startTime",
				"date_format(contract.endTime,'%Y年%m月%d日') as endTime",
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
		String joinEntity1 = " LEFT JOIN company ON contract.companyID = company.ID " +
				" LEFT JOIN employee ON contract.employeeID = employee.ID ";
		String condition1 = "contract.ID='" + ID + "'";
		List<Map<String, Object>> contractA = entityDao.searchForeign(properties1,baseEntity1,joinEntity1,null,condition1);
		String contractCode = contractA.get(0).get("contractCode").toString();
		String contractName = contractA.get(0).get("contractName").toString();
		String companyName = contractA.get(0).get("companyName").toString();
		String fax = contractA.get(0).get("fax").toString();
		String linkMan = contractA.get(0).get("linkMan").toString();
		String oppositeMen = contractA.get(0).get("oppositeMen").toString();
		String linkPhone = contractA.get(0).get("linkPhone").toString();
		//String employeeName = contractA.get(0).get("employeeName").toString();
		String address = contractA.get(0).get("address").toString();
		String contractAmount = contractA.get(0).get("contractAmount").toString();
		String signAddress = contractA.get(0).get("signAddress").toString();
		String startTime = contractA.get(0).get("startTime").toString();
		String signTime = contractA.get(0).get("signTime").toString();
		String endTime = contractA.get(0).get("endTime").toString();
		
		String contractItem = "";
		String baseEntiy = "contractFineItem";
		String[] properties = new String[] { 
			"contractFineItem.ID as fineItemCode",
			"testProject.nameCn",
			"testProject.nameEn",
			"contractFineItem.number",
			"contractFineItem.price",
			"contractFineItem.money"
			};
		String joinEntity = " LEFT JOIN testProject ON contractFineItem.testProjectID = testProject.ID ";
		
		String condition2 = "contractFineItem.contractID = '" + ID + "' ORDER BY contractFineItem.ID desc";
		
		List<Map<String, Object>> result2 = entityDao.searchForeign(properties, baseEntiy, joinEntity, null, condition2);
		
		String baseEntiy4 = "project";
		String[] properties4 = new String[] { 
			"contractID",
			"ID"
			};
		String joinEntity4 = "";
		
		String condition4 = "contractID = " + ID;
		
		List<Map<String, Object>> result4 = entityDao.searchForeign(properties4, baseEntiy4, joinEntity4, null, condition4);
		String projectID = result4.get(0).get("ID").toString();
		
		String baseEntiy5 = "teststandard";
		String[] properties5 = new String[] { 
			"DISTINCT standard.standardCode,"
			+ "standard.standardName,"
			+ "testtype.`name` as testTypeName,"
			+ "testproject.testTypeID"
			};
		String joinEntity5 =  " LEFT JOIN testproject ON teststandard.testProjectID = testproject.ID"
				+ " LEFT JOIN testtype ON testproject.testTypeID = testtype.ID"
				+ " LEFT JOIN contractfineitem ON contractfineitem.testProjectID = testProject.ID"
		        + " LEFT JOIN standard ON contractfineitem.standardID = standard.ID";
		String condition5 = " contractfineitem.contractID = '" + ID + "' ORDER BY testproject.testTypeID desc";
		
		List<Map<String, Object>> result5 = entityDao.searchForeign(properties5, baseEntiy5, joinEntity5, null, condition5);
		
		PropertiesTool pe = new PropertiesTool();
		
		filePath = fileEncryptservice.decryptPath(filePath, pathPassword);
		
		String path = pe.getSystemPram("filePath") + "\\" ;
		File file = new File(path + filePath);
		if(!file.exists()){
			System.out.println("合同模板文件被删除");
			return -4;
		}
		String cacheFilePath = pe.getSystemPram("cacheFilePath")+"\\";
		File dectoryName = new File(cacheFilePath);
		if(!dectoryName.exists()){
			dectoryName.mkdirs();
		}

		String newFileID = EntityIDFactory.createId();
		cacheFilePath += contractName + "_" + newFileID + ".docx";

		fileEncryptservice.decryptFile(path+filePath, cacheFilePath, fileInfoID);
		System.out.println("文件的路径1 ："+filePath);
		System.out.println("文件的路径2 ："+cacheFilePath);
		try {
			String relativePath = "项目文件" + "\\" + projectID + "\\"  + "合同文件" + "\\";

			path += relativePath ;

			System.out.println("文件的路径3 ："+path);
			File targetFile = new File(path);
			if(!targetFile.exists()){
				targetFile.mkdirs();
			}
			path +=  contractName + "_" + newFileID + ".docx";
			WordProcess wp = new WordProcess(false);
			wp.openDocument(cacheFilePath);
			
			if (contractCode != null)
				wp.replaceText("{contractCode}",contractCode.toString());
			if (contractName != null)
				wp.replaceText("{contractName}",contractName.toString());
			if (companyName != null)
				wp.replaceText("{companyName-x}",companyName.toString());
			if (signAddress != null)
				wp.replaceText("{signAddress-x}",signAddress.toString());
			if (signTime != null)
				wp.replaceText("{signTime-x}",signTime.toString());
			if (startTime != null)
				wp.replaceText("{startTime-x}",startTime.toString());
			if (endTime != null)
				wp.replaceText("{endTime-x}",endTime.toString());
			if (contractName != null)
				wp.replaceText("{contractName}",contractName.toString());
			
			if(!result5.isEmpty()){
				String standardCode = "";
				String standardName = "";
				String testTypeName = "";
				String testTypeID = "";
				String standardNote = "";
				for(int i = 0; i < result5.size(); i++){
					standardCode = (String)result5.get(i).get("standardCode");
					standardName = (String)result5.get(i).get("standardName");
					testTypeName = (String)result5.get(i).get("testTypeName");
					/*testTypeID = result5.get(i).get("testTypeID").toString();
					standardNote += testTypeName + ":" + standardCode + "," + standardName + ";\n ";*/
					
					wp.addTableRow(1,2);
					wp.putTxtToCell(1, 2, 1,testTypeName);
					wp.putTxtToCell(1, 2, 2,standardCode);
					wp.putTxtToCell(1, 2, 3,standardName);
				}
				/*wp.replaceText("{testTypeName}",standardNote.toString());*/
			}
				
				
			if (endTime != null)
				wp.replaceText("{endTime-x}",endTime.toString());
			
			if(!result2.isEmpty()){
				String nameCn = "";
				String nameEn = "";
				String fineItemCode = "";
				//String departmentName = "";
				double money = 0;
				double price = 0;
				int number = 0;
				int i = 0;
				for(;i < result2.size(); i++){
					nameCn = (String)result2.get(i).get("nameCn");
					nameEn = (String)result2.get(i).get("nameEn");
					fineItemCode = (String)result2.get(i).get("fineItemCode");
					money = (double)result2.get(i).get("money");
					price = (double)result2.get(i).get("price");
					number = (int)result2.get(i).get("number");
					String projectName = nameCn+"("+nameEn+")";
					wp.addTableRow(2,2);
					wp.putTxtToCell(2, 2, 1,fineItemCode);
					wp.putTxtToCell(2, 2, 2,projectName);
					wp.putTxtToCell(2, 2, 3,price+"元/每次");
					wp.putTxtToCell(2, 2, 4,number+"次");
					wp.putTxtToCell(2, 2, 5,money+"元");
				}
				wp.putTxtToCell(2, 2+i, 5,"总计"+contractAmount.toString());
			}
			if (companyName != null)
				wp.replaceText("{companyName-x}",companyName.toString() == null ? " " :  companyName.toString());
			if (linkMan != null)
				wp.replaceText("{linkMan-x}",linkMan.toString() == null ? " " :  linkMan.toString());
			if (oppositeMen != null)
				wp.replaceText("{oppositeMan-x}",oppositeMen.toString() == null ? " " :  oppositeMen.toString());
			if (address != null)
				wp.replaceText("{address-x}",companyName.toString() == null ? " " :  companyName.toString());
			if (linkPhone != null)
				wp.replaceText("{linkPhone-x}",linkPhone.toString() == null ? " " :  linkPhone.toString());
			if (fax != null)
				wp.replaceText("{fax-x}",fax.toString() == null ? " " :  fax.toString());
			if (signTime != null)
				wp.replaceText("{signTime-x}",signTime.toString() == null ? " " :  signTime.toString());
			if (signTime != null)
				wp.replaceText("{signTime-x}",signTime.toString() == null ? " " :  signTime.toString());
			wp.save(cacheFilePath);
			wp.close();
			
			
			FileInformation fi = new FileInformation();
			fi.setID(newFileID);
			fi.setBelongtoID(ID);
			fi.setFileName(contractName + ".docx");
			System.out.println("保存的相对路径是a: " + relativePath);
			relativePath += contractName + "_" + newFileID + ".docx";
			fi.setPath(relativePath);
			fi.setUploadTime(new Date());
			fi.setState(0);
			fi.setType(1);
			fi.setUploaderID(employeeID);
			fi.setRemarks("系统生成");
		    baseEntityDao.save(fi);
		    updateContractFileID(ID);
		    updContractState(ID,1);
		    fileEncryptservice.encryptPath(relativePath, newFileID);
			fileEncryptservice.encryptFile(cacheFilePath,path,newFileID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 1;
	}
	
	private String getCoFileModule() {
		// TODO Auto-generated method stub
		/*PropertiesTool pt = new PropertiesTool();
		@SuppressWarnings("static-access")
		String filePath = pt.getSystemPram("filePath");*/
		String templateConditionnString  = " templateType = 3 and  state = 2 order by  createTime desc limit 0,1";
		List<Template> list = entityDao.getByCondition(templateConditionnString, Template.class);
		if(list != null && list.size() > 0){
			 Template template = list.get(0);
			 String fileID = template.getFileID() ;
			 if(fileID == null || fileID.equals("")){
				 return null;
			 }
			 else return fileID;
		
		}
		else return null;  //还没有模板
	}
	
	public int coverContractFile2(String ID, String fileID,HttpServletRequest request,HttpServletResponse response){
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
		String baseEntiy4 = "project,contract";
		String[] properties4 = new String[] { 
			"contract.contractName",
			"project.ID"
			};
		String joinEntity4 = "";
		
		String condition4 = " project.contractID = contract.ID and contractID = " + ID;
		
		List<Map<String, Object>> result4 = entityDao.searchForeign(properties4, baseEntiy4, joinEntity4, null, condition4);
		String proID = result4.get(0).get("ID").toString();
		
		String cofileModule = getCoFileModule();
		String coModulePath = "";
		String saveBasePath = "";
		String savePath = "";
		String cacheBasePathString = "";
		String coFileName = "";
		coFileName = result4.get(0).get("contractName").toString();
		if(coFileName == null || coFileName.equals("")){
			coFileName = "";
		}
		PropertiesTool pt = new PropertiesTool();
		if(cofileModule == null || cofileModule.equals("")){
			 return -3;
		}
		else{
			cacheBasePathString =  pt.getSystemPram("cacheFilePath") ;
			saveBasePath = pt.getSystemPram("filePath");
			coModulePath =saveBasePath+"\\"+fileEncryptservice.getFileDecryPath(cofileModule);
		}
		if (ID != null && !ID.equals("")) {
             
			try {
				
				
				//解密文件才能操作
				String cacheID = EntityIDFactory.createId();
				String cacheFilePath1 = cacheBasePathString+"\\"+cacheID+".docx";
				System.out.println("huangcong"+cacheID);
				File dectoryName = new File(cacheBasePathString);
				if(!dectoryName.exists()){
					System.out.println("合同模板文件被删除");
					return -4;
				}
				if(!dectoryName.exists()){
					dectoryName.mkdirs();
				}
				dectoryName = null;
				System.out.println("模板解密文件："+cacheFilePath1);
				System.out.println("模板文件："+coModulePath);
				fileEncryptservice.decryptFile(coModulePath, cacheFilePath1, cofileModule); //这个应该是模板文件的ID
			
				// 获取甲方公司信息
				String[] properties = new String[] { 
						"companyName", 
						"linkman",
						"mobilephone",
						"address", 
						"fax", 
						"emailbox" 
						};
				String baseEntity = " (  SELECT * FROM contract WHERE contract.ID = '"
						+ ID
						+ "'  "
						+ " ) AS a LEFT JOIN company on company.ID = a.companyID ";

				List<Map<String, Object>> companyInfo = originalSearchForeign(
						properties, baseEntity, null, null, null, false);
			
				
				//获取样品信息
				String[] properties1 = new String[] { 
						"sample.factoryCode as sampleCode",
						"sample.sampleName",
						"sample.specifications as style",
						"contractfineitem.money",
						"contractfineitem.remarks"
						};
			String baseEntity1 = "contractfineitem,sample";
			String condition1 = " sample.ID = contractfineitem.sampleID "
					+ " AND contractfineitem.contractID = '" + ID + "'";
			List<Map<String, Object>> sampleInfo = originalSearchForeign(
					properties1, baseEntity1, null, null, condition1, false);
			
			WordProcess wordProcess = new WordProcess(false);
			wordProcess.openDocument(cacheFilePath1);
			
			if (companyInfo != null && companyInfo.size() > 0) {
				   String companyName = (String)companyInfo.get(0).get("companyName") ;
				    String linkman = (String)companyInfo.get(0).get("linkman") ;
				    String mobilephone = (String)companyInfo.get(0).get("mobilephone") ;
				    String address = (String)companyInfo.get(0).get("address") ;
				    String fax = (String)companyInfo.get(0).get("fax") ;
				    String emailbox = (String)companyInfo.get(0).get("emailbox") ;

				    wordProcess.replaceText("{companyName-x}", companyName  == null ? " " :  companyName);
                 wordProcess.replaceText("{linkman-x}",  linkman  == null ? " " :  linkman);
                 wordProcess.replaceText("{emailbox-x}",  emailbox  == null ? " " :  emailbox);
                 wordProcess.replaceText("{mobilephone-x}",  mobilephone  == null ? " " :  mobilephone);
                 wordProcess.replaceText("{fax-x}",  fax  == null ? " " :  fax);
                 wordProcess.replaceText("{address-x}",  address  == null ? " " :  address);
                
			}
			else{
				
			}
			
			for (int i = 0; i < sampleInfo.size(); i++) {
				wordProcess.addTableRow(1, 13);
				Map<String, Object> map = sampleInfo.get(i);
				String sampleName = map.get("sampleName").toString();
				String style = map.get("style").toString();
				String sampleCode = map.get("sampleCode").toString();
				String remarks = map.get("remarks").toString();
				wordProcess.putTxtToCell(1, 13, 1, i+1+"");
				wordProcess.putTxtToCell(1, 13, 2, sampleName  == null ? " " :  sampleName);
				wordProcess.putTxtToCell(1, 13, 3, style  == null ? " " :  style);
				wordProcess.putTxtToCell(1, 13, 4, sampleCode  == null ? " " :  sampleCode);
				wordProcess.putTxtToCell(1, 13, 5, "常规校准");
				wordProcess.putTxtToCell(1, 13, 6, "1");
				String money = String.valueOf(map.get("money"));
				wordProcess.putTxtToCell(1, 13, 7, money == null || money.equals("null") ? " 0.0 " : money);
				wordProcess.putTxtToCell(1, 13, 8, remarks  == null ? " " :  remarks);
			}
			//填充个人公司信息
		   /**
		    * 从配置取出数据
		    */
		
			String ourCompanyName = pt.getSystemPram("ourCompanyName") ;
			String ourLinkCompanyName = pt.getSystemPram("ourLinkCompanyName") ;
			String ourCompanyAddress = pt.getSystemPram("ourCompanyAddress") ;
			String ourAccount = pt.getSystemPram("ourAccount") ;
			String ourAccountProxy = pt.getSystemPram("ourAccountProxy") ;
			String ourInvoiceType = pt.getSystemPram("ourInvoiceType");
			String ourFinancePhone = pt.getSystemPram("ourFinancePhone") ;
			String ourEmaile = pt.getSystemPram("ourEmaile") ;
			String ourFax = pt.getSystemPram("ourFax") ;
			String ourLinkMan = pt.getSystemPram("ourLinkMan") ;
			String ourLinkPhone = pt.getSystemPram("ourLinkPhone") ;
			
			wordProcess.replaceText("{ourCompanyName}", ourCompanyName);
			wordProcess.replaceText("{ourAccount}", ourAccount);
			wordProcess.replaceText("{ourAccountProxy}", ourAccountProxy);
			wordProcess.replaceText("{ourInvoiceType}", ourInvoiceType);
			wordProcess.replaceText("{ourFinancePhone}", ourFinancePhone);
			wordProcess.replaceText("{ourLinkCompanyName}", ourLinkCompanyName);
			wordProcess.replaceText("{ourEmaile}", ourEmaile);
			wordProcess.replaceText("{ourLinkPhone}", ourLinkPhone);
			wordProcess.replaceText("{ourFax}", ourFax);
			wordProcess.replaceText("{ourLinkMan}", ourLinkMan);
			wordProcess.moveStart();
			wordProcess.replaceAllText("{ourCompanyAddress}", ourCompanyAddress);
			
			
			/*
			 * 2016年4月28日  插入时间
			 */
			SimpleDateFormat myFmt=new SimpleDateFormat("yyyy年MM月dd日");
			Date now=new Date();
	        String currentData = myFmt.format(now);
	    	wordProcess.moveStart();
	        wordProcess.replaceAllText("{currentData}", currentData);
	        
			/*
			 * 填出合同编码
			 */
	        Contract contract = entityDao.getByID(ID, Contract.class);
			if(contract != null){
				wordProcess.moveStart();
				wordProcess.replaceText("{coCode}", contract.getContractCode());
			}
			if(coFileName == null || coFileName.equals("")){
				coFileName = "校准合同文件";
			}
			wordProcess.save(cacheFilePath1);  //先保存到缓冲文件区才能生成
			wordProcess.close();
			
			coFileName += EntityIDFactory.createId()+".docx";
			savePath = saveBasePath+"\\项目文件\\"+proID+"\\合同文件\\"+coFileName;
		
			
			File dectoryName1 = new File(saveBasePath+"\\项目文件\\"+proID+"\\合同文件\\");
			if(!dectoryName1.exists()){
				dectoryName1.mkdirs();
			} 
			dectoryName1 = null ;
			
			/* //生成文件信息并加密文件和路径
			 FileEncryptService  fileEncryptService = new FileEncryptService();*/
			
			 FileInformation fileInformation = new FileInformation();
			 fileInformation.setBelongtoID(ID);
			 fileInformation.setID(EntityIDFactory.createId());
			 fileInformation.setPath("项目文件\\"+proID+"\\合同文件\\"+coFileName);
			 fileInformation.setUploaderID(employeeID);
			 fileInformation.setRemarks("系统生成");
			 fileInformation.setFileName(coFileName);
			 fileInformation.setUploadTime(new Date());
			 fileInformation.setState(0);
			 fileInformation.setType(2);
			 entityDao.save(fileInformation);
			 
			 fileEncryptservice.encryptPath(fileInformation.getPath(), fileInformation.getID());
			 fileEncryptservice.encryptFile(cacheFilePath1, savePath, fileInformation.getID());
		
			 
			 
			 //更新合同--文件ID
			 fileID = fileInformation.getID();
		    contract.setFileID(fileInformation.getID());
		    contract.setState(1);
		    entityDao.updatePropByID(contract, ID);
			 
			} catch (Exception e) {
				e.printStackTrace();
			}
			return 1;
		} else
			return -3;
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
	public int updContract(String ID, String contractCode, String contractName,
			String companyID, String companyName, String address,
			String oppositeMen, String linkPhone, String employeeID,
			String employeeName, String signAddress, String startTime,
			String signTime, String endTime,
			int isClassified, int classifiedLevel,String technicalID,String technicalContent) {
		// TODO Auto-generated method stub
		System.out.println("进入updContract");
		String[] properties1 = new String[] {"ID"};
		String condition1 = " companyName = '" + companyName + "'";
		List<Map<String, Object>> result1 = entityDao.findByCondition(properties1, condition1, Company.class);
		if(result1.isEmpty()){
			System.out.println("不存在该公司名的公司,将新增对应公司记录");
			Company company = new Company();
			companyID = EntityIDFactory.createId();
			company.setID(companyID);
			company.setCompanyName(companyName);
			company.setLinkMan(oppositeMen);
			company.setMobilePhone(linkPhone);
			company.setAddress(address);
			company.setCreateTime(new Date());
			int result = entityDao.save(company);
			if(result <= 0){
				String position = "ID =" + companyID;
				entityDao.deleteByCondition(position,Company.class);
				return -2;
			}
		}else{
			int com = 0;
			String companyID1 = "";
			for (int i = 0; i < result1.size(); i++) {
				companyID1 = result1.get(i).get("ID").toString();
				if(companyID1.equals(companyID)){
					com = 1;
				}
			}
			if(com == 0){
				System.out.println("公司名与公司ID不相符");
				return -4;
			}
		}
		String[] properties2 = new String[] {"ID"};
		String condition2 = " employeeName = '" + employeeName + "'";
		List<Map<String, Object>> result2 = entityDao.findByCondition(properties2, condition2, Employee.class);
		if(result2.isEmpty()){
			System.out.println("不存在该员工");
			return -6;
		}else{
			String employeeID1 = result2.get(0).get("ID").toString();
			if(!employeeID1.equals(employeeID)){
				System.out.println("员工名与员工ID不相符");
				return -8;
			}
		}
		Contract contract = entityDao.getByID(ID, Contract.class);
		contract.setContractCode(contractCode);
		contract.setContractName(contractName);
		contract.setCompanyID(companyID);
		contract.setOppositeMen(oppositeMen);
		contract.setLinkPhone(linkPhone);
		contract.setEmployeeID(employeeID);
		contract.setSignAddress(signAddress);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
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
		//contract.setContractAmount(contractAmount);
		contract.setIsClassified(isClassified);
		contract.setClassifiedLevel(classifiedLevel);
		int result3 = entityDao.updatePropByID(contract,ID);
		
		Technical technical = new Technical();
		technical.setID(technicalID);
		technical.setContractID(ID);
		technical.setContent(technicalContent);
		entityDao.updatePropByID(technical,ID);
		return result3;
	}
	
	@Override
	public int updContractState(String ID,int state){
		if(state == 2){
			String[] properties1 = new String[] {"ID"};
			String condition1 = "fileinformation.state = '0' and fileinformation.belongtoID = '" + ID + "'";
			List<Map<String, Object>> result1 = entityDao.findByCondition(properties1, condition1, FileInformation.class);
			if(result1.isEmpty()){
				System.out.println("该合同没有合同文件");
				return -2;
			}
		}
		Contract contract = entityDao.getByID(ID, Contract.class);
		contract.setState(state);
		int result = entityDao.updatePropByID(contract,ID);
		return result;
	}
	
	@Override
	public int updateContractFileID(String contractID){
		int index = 1;
		int pageNum = 0;
		String sort = "fileInformation.uploadTime";
		String order = "desc";
		String tableName = "fileInformation";
		String[] properties = new String[]{
			"fileInformation.ID AS fileID",
		};
		
		String condition = " 1 = 1 and fileInformation.belongToID = " + contractID;
		List<Map<String, Object>> file  = entityDao.searchWithpaging(properties, tableName, null, null, condition, null, sort, order, index, pageNum);
		
		String fileID = "";
		for (Map<String, Object> m : file)  
	    {  
	      for (String k : m.keySet())  
	      {  
	    	  fileID = (String) m.get(k);  
	      }  
	    }
		
		Contract contract = entityDao.getByID(contractID, Contract.class);
		contract.setFileID(fileID);
		
		int result = entityDao.updatePropByID(contract,contractID);
		return result;
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
		if (ID == null || ID.equals("")) {
			return -1;
		}
		Contract contract = entityDao.getByID(ID, Contract.class);
		if (contract == null)
			return -1;
		contract.setViewpoint(viewpoint);
		contract.setState(state);

		int result = entityDao.updatePropByID(contract,ID);
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
	public Map<String, Object> getContractWithPaging(int limit, int offset,String order,String sort,String contract,HttpSession session) {
		int index = limit;
		int pageNum = offset/limit ;
		String tablename = "contract";
		String[] properties = new String[]{
				"ID",
				"contractName",
				"DATE_FORMAT(signTime,'%Y-%m-%d') signTime"
		};
		String name = session.getAttribute("clientNo").toString();
		System.out.println(name);
		String acondition = "companyID in (SELECT  companyID from client WHERE clientNo = "+name+")";
		List<Map<String, Object>> result = entityDao.searchWithpaging(properties, tablename, null, null, acondition, null, sort, order, index, pageNum);
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
		System.out.println(map.toString());
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
    /**
     * 获取合同的标准号和标准名称
     * features or effect
     * @author wzj
     * @date 2017年5月20日 下午4:54:26
     *
     */
	@Override
	public String getStandardByContractID(String coID) {
		// TODO Auto-generated method stub
		String[] properties = new String[]{
			"standard.standardCode",
			"standard.standardName",
			"technical.content",
			"standard.ID",
		};
		String baseEntity = ""
		+" ( SELECT 	DISTINCT testProjectID ,contractfineitem.contractID "
		+" FROM contractfineitem  WHERE "
		+" contractfineitem.contractID = '"+coID+"'"
		+" 	) a "
		+" LEFT JOIN teststandard ON teststandard.testProjectID = a.testProjectID "
		+" LEFT JOIN technical ON a.contractID = technical.contractID"
		+" LEFT JOIN standard ON teststandard.standardID = standard.ID GROUP BY standard.ID ";
		List<Map<String, Object>> list = searchDao.searchForeign(properties, baseEntity, null, null, null, null);
		String reString = "";
		Object temp = null;
		reString += "依据的技术文件: ";
		for (int i = 0; i < list.size(); i++) {
			 temp = list.get(i).get("standardCode") ;
			reString+=  temp = temp != null ? temp.toString()+"(" : "";
			 temp = list.get(i).get("standardName");
			reString+=  temp  != null ? temp.toString()+")," : "";
		}
		reString += "客户要求: "+(String)list.get(0).get("content")+",";
		if (reString == null || reString.equals("") ){
			return "";
		}
		else {
			return reString.substring(0, reString.length()-1);
		}
	}
	public Map<String, Object> getMakeContractPaging(String reCode,
			String coCode, String companyName, String reType, String linkMan,
			String startTime, String endTime, String state, int limit,
			int offset, String order, String sort) {
		int pageNum = limit;
		int pageIndex = offset / limit; // 分页查询数据限制
		System.out.println("limit : " + limit + "  " + offset);
		String[] properties = new String[] { // 查询的字段
		"a.ID", "project.ID AS proID", "a.contractCode as coCode",
				"a.isEditSample", "a.coID", "a.orderType", "a.companyID AS comID", "a.reCode",
				"a.coState", "company.companyName", "a.linkMan", "a.startTime",
				"a.endTime", "a.employeeName", "a.linkPhone", "a.reType",
				"a.state","a.isInput" };
		// 连接关系表和一些删选条件
		String joinEntity = " "
				+ "( SELECT receiptlist.ID,"
				+ "contract.contractCode,"
				+ "contract.ID AS coID,"
				+ "contract.orderType AS orderType,"
				+ "IF (contract.isInput = 0,'可以',IF (contract.isInput = 1,'不可以','无')) AS isInput,"
				+ "contract.state AS coState,"
				+ "receiptlist.receiptlistCode AS reCode,"
				+ "contract.companyID,"
				+ "receiptlist.linkMan,"
				+ "receiptlist.isEditSample,"
				+ "receiptlist.linkPhone,"
				+ "date_format(receiptlist.createTime,'%Y-%m-%d') AS startTime,"
				+ "date_format(receiptlist.completeTime,'%Y-%m-%d') AS endTime,"
				+ "employee.employeeName,"
				+ "IF (receiptlist.state = 0,'未检测',IF (receiptlist.state = 1,'检测中',IF (receiptlist.state = 2,'检测完成',"
				+ "IF (receiptlist.state = 3,'异常终止','无')))) AS state,"
				+ " IF (receiptlist.receiptlistType = 0,'接受',IF (receiptlist.receiptlistType = 1,'退还','无' "
				+ " )) AS reType FROM contract LEFT JOIN  receiptlist ON receiptlist.contractID = contract.ID "
				+ " LEFT JOIN employee ON receiptlist.employeeID = employee.ID "
				+ " WHERE 1 = 1 ";
		// 异常数据判断 并加上搜索条件
		if (reCode != null && !reCode.equals("")) {
			joinEntity += " and receiptlistCode  like '%" + reCode + "%'  ";
		}
		// 异常数据判断 并加上搜索条件
		if (coCode != null && !coCode.equals("")) {
			joinEntity += " and  contract.contractCode like '%" + coCode
					+ "%'  ";
		}
		// 异常数据判断 并加上搜索条件
		if (reType != null && !reType.equals("")) {
			if (!reType.equals("2")) // 2--所有类型的交接单数据
				joinEntity += " and receiptlistType = " + reType + "  ";
		}
		// 异常数据判断 并加上搜索条件
		if (linkMan != null && !linkMan.equals("")) {
			joinEntity += " and linkMan like '%" + linkMan + "%'  ";
		}
		// 异常数据判断 并加上搜索条件
		if (state != null && !state.equals("")) {
			if (!state.equals("4")) // 4---看所有的交接单
				joinEntity += " and receiptlist.state = " + state + "  ";
		}
		// 时间的三种方式查询
		if (startTime != null && endTime != null && !startTime.equals("")
				&& !endTime.equals("")) { // 中间
			startTime.replaceAll(" ", "");
			endTime.replaceAll(" ", "");
			joinEntity += " and startTime between  '" + startTime + "' and '"
					+ endTime + "'  ";
		} else if ((startTime != null && !startTime.equals(""))
				&& (endTime == null || endTime.equals(""))) { // 从什么时候起
			startTime.replaceAll(" ", "");
			joinEntity += " and startTime >  '" + startTime + "'  ";
		} else if ((startTime == null || startTime.equals(""))
				&& (endTime != null && !endTime.equals(""))) { // 到什么时候至
			endTime.replaceAll(" ", "");
			joinEntity += " and startTime < '" + endTime + "'  ";
		}
		joinEntity += " ) AS a LEFT JOIN company ON company.ID = a.companyID "
				+ "  LEFT JOIN project on project.contractID = a.coID  and  project.state != 5" ;
		// 搜索条件 condition
		String condition = " 1 = 1 and a.orderType=1";
		if (companyName != null && !companyName.equals("")) {
			condition += " and company.companyName like '%" + companyName
					+ "%' ";
		}
		// 获取数据
		List<Map<String, Object>> list = entityDao.searchWithpaging(properties,
				null, joinEntity, null, condition, null, sort, order, pageNum,
				pageIndex);
		// 获取总的记录数
		int count = entityDao.searchForeign(properties, null, joinEntity, null,
				condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", list);
		return map;
	}
	public int passMakeContract(String ID){
		Contract contract=entityDao.getByID(ID, Contract.class);
		contract.setIsInput(0);
		int result = entityDao.updatePropByID(contract, ID);
		return result;
		
	}
	
}
