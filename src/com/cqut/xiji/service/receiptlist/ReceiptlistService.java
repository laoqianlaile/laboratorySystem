package com.cqut.xiji.service.receiptlist;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.company.Company;
import com.cqut.xiji.entity.contract.Contract;
import com.cqut.xiji.entity.project.Project;
import com.cqut.xiji.entity.receiptlist.Receiptlist;
import com.cqut.xiji.entity.sample.Sample;
import com.cqut.xiji.entity.task.Task;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class ReceiptlistService extends SearchService implements
		IReceiptlistService {

	@Resource(name = "entityDao")
	EntityDao entityDao;

	@Resource(name = "searchDao")
	SearchDao searchDao;

	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "receiptlist";
	}

	@Override
	public String getBasePrimaryKey() {
		return "receiptlist.ID";
	}

	/**
	 * 
	 * @description 任务分配模块查询所有交接单信息
	 * @author chenyubo
	 * @created 2016年9月24日 上午10:35:44
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 * @see com.cqut.xiji.service.receiptlist.IReceiptlistService#getReceiptlistWithPaging(int,
	 *      int, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getReceiptlistWithPagingInTaskAssign(int limit,
			int offset, String sort, String order, String receiptlistCode,
			String contractCode, String companyName, String linkMan,
			String acceptSampleTime_start, String acceptSampleTime_end,
			int state, int assignState) {
		int index = limit;
		int pageNum = offset / limit;
		String tableName = "receiptlist";
		String[] properties = new String[] {
				"receiptlist.ID",
				"contract.contractCode",
				"receiptlist.receiptlistCode",
				"company.companyName",
				"receiptlist.linkMan",
				"date_format(receiptlist.createTime,'%Y-%m-%e') as createTime",
				"date_format(receiptlist.completeTime,'%Y-%m-%e') as completeTime",
				"employee.employeeName",
				"case when receiptlist.state = 0 then '未检测' "
						+ "when receiptlist.state = 1 then '检测中' "
						+ "when receiptlist.state = 2 then '检测完成' "
						+ "when receiptlist.state = 3 then '异常终止' end as state",
				"case when receiptlist.isEditSample = 0 then '未分配'"
						+ "when receiptlist.isEditSample = 1 then '未分配' "
						+ "when receiptlist.isEditSample = 2 then '已分配' end as assignState " };
		String joinEntity = " left join contract on receiptlist.contractID = contract.ID " + 
							" left join company on contract.companyID = company.ID "+
							" left join employee on receiptlist.employeeID = employee.ID ";
		String condition = "1 = 1 "
				+ "and receiptlist.contractID = contract.ID "
				+ "and contract.companyID = company.ID "
				+ "and receiptlist.employeeID = employee.ID";

		if (receiptlistCode != null && !receiptlistCode.equals("")) {
			condition += " and receiptlist.receiptlistCode like '%"
					+ receiptlistCode + "%'";
		}
		if (contractCode != null && !contractCode.equals("")) {
			condition += " and contract.contractCode like '%" + contractCode
					+ "%'";
		}
		if (companyName != null && !companyName.equals("")) {
			condition += " and company.companyName like '%" + companyName
					+ "%'";
		}
		if (linkMan != null && !linkMan.equals("")) {
			condition += " and receiptlist.linkMan like '%" + linkMan + "%'";
		}
		if (acceptSampleTime_start != null
				&& !acceptSampleTime_start.equals("")
				&& acceptSampleTime_end != null
				&& !acceptSampleTime_end.equals("")) {
			condition += " and receiptlist.createTime between '"
					+ acceptSampleTime_start + "' and '" + acceptSampleTime_end
					+ "'";
		}
		if (state != -1) {
			condition += " and receiptlist.state =" + state;
		}
		if (assignState != -1) {
			if (assignState == 2) {// 已分配
				condition += " and receiptlist.isEditSample = 2";
			} else {// 已分配
				condition += " and (receiptlist.isEditSample = 0 or receiptlist.isEditSample = 1)";
			}
		}

		List<Map<String, Object>> result = originalSearchWithpaging(properties,
				tableName, joinEntity, null, condition, false, null, sort,
				order, index, pageNum);
		
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);

		return map;
	}

	/**
	 * 
	 * 初始化交接单数据 --以合同为主表（存在合同有而交接单没有）
	 * @author wzj
	 * @date 2016年10月22日 上午10:41:48
	 * 
	 */
	@Override
	public Map<String, Object> getReceiptlistWithPaging(String reCode, String coCode, String companyName, String reType, String linkMan,
			String startTime, String endTime, String state, int limit,
			int offset, String order, String sort) {
		int pageNum = limit;
		int pageIndex = offset / limit ;  //分页查询数据限制
		System.out.println("limit : " + limit + "  " + offset);
		String[] properties = new String[] {   //查询的字段
				"a.ID", 
				"project.ID AS proID",
				"a.contractCode as coCode", 
				"a.isEditSample", 
				"a.coID",
				"a.companyID AS comID", 
				"a.reCode",
				"company.companyName",
				"a.linkMan", 
				"a.startTime",
				"a.endTime", 
				"a.employeeName",
				"a.linkPhone", 
				"a.reType", "a.state" };
		//连接关系表和一些删选条件
		String joinEntity = " " 
				+ "( SELECT receiptlist.ID,"
				+ "contract.contractCode,"
				+ "contract.ID AS coID,"
				+ "receiptlist.receiptlistCode AS reCode,"
				+ "contract.companyID,"
				+ "receiptlist.linkMan,"
				+ "receiptlist.isEditSample,"
				+ "receiptlist.linkPhone,"
				+ "date_format(receiptlist.createTime,'%Y-%m-%e') AS startTime,"
				+ "date_format(receiptlist.completeTime,'%Y-%m-%e') AS endTime,"
				+ "employee.employeeName,"
				+ "IF (receiptlist.state = 0,'未检测',IF (receiptlist.state = 1,'检测中',IF (receiptlist.state = 2,'检测完成',"
				+ "IF (receiptlist.state = 3,'异常终止','无')))) AS state,"
				+ " IF (receiptlist.receiptlistType = 0,'接受',IF (receiptlist.receiptlistType = 1,'退还','无' "
				+ " )) AS reType FROM contract LEFT JOIN  receiptlist ON receiptlist.contractID = contract.ID "
				+ " LEFT JOIN employee ON receiptlist.employeeID = employee.ID "
				+ " WHERE 1 = 1 ";
       //异常数据判断 并加上搜索条件
		if (reCode != null && !reCode.equals("")) {
			joinEntity += " and receiptlistCode  like '%" + reCode + "%'  ";
		}
		 //异常数据判断 并加上搜索条件
		if (coCode != null && !coCode.equals("")) {
			joinEntity += " and  contract.contractCode like '%" + coCode + "%'  ";
		}
		 //异常数据判断 并加上搜索条件
		if (reType != null && !reType.equals("")) {
			if (!reType.equals("2"))
				joinEntity += " and receiptlistType = " + reType + "  ";

		}
		 //异常数据判断 并加上搜索条件
		if (linkMan != null && !linkMan.equals("")) {
			joinEntity += " and linkMan like '%" + linkMan + "%'  ";
		}
		//异常数据判断 并加上搜索条件
		if (state != null && !state.equals("")) {
		//	if (!state.equals("4"))   //看异常终止的交接单是否能够查看
				joinEntity += " and receiptlist.state = " + state + "  ";
		}
        //时间的三种方式查询
		if (startTime != null && endTime != null && !startTime.equals("") && !endTime.equals("")) {  //中间
			startTime.replaceAll(" ", "");
			endTime.replaceAll(" ", "");
			joinEntity += " and startTime between  '" + startTime + "' and '"
					+ endTime + "'  ";
		} else if ((startTime != null && !startTime.equals(""))  && (endTime == null || endTime.equals(""))) {  // 从什么时候起
			startTime.replaceAll(" ", "");
			joinEntity += " and startTime >  '" + startTime + "'  ";
		} else if ((startTime == null || startTime.equals(""))  && (endTime != null && !endTime.equals(""))) {  // 到什么时候至
			endTime.replaceAll(" ", "");
			joinEntity += " and startTime < '" + endTime + "'  ";
		}
		joinEntity += " ) AS a LEFT JOIN company ON company.ID = a.companyID "
				+ "  LEFT JOIN project on project.contractID = a.coID  and  project.state != 5";
		//搜索条件  condition
		String condition = " 1 = 1    ";
		if (companyName != null && !companyName.equals("")) {
			condition += " and company.companyName like '%" + companyName
					+ "%' ";
		}
		List<Map<String, Object>> list = entityDao.searchWithpaging(properties,
				null, joinEntity, null, condition, null, sort, order, pageNum,
				pageIndex);  //获取数据
		 //获取总的记录数
		int count = entityDao.searchForeign(properties, null, joinEntity, null,
				condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", list);
		return map;

	}

	public List<Map<String, Object>> getReceiptlistInfoInTaskAssign(String ID) {
		String tableName = "receiptlist";

		String[] properties = new String[] {
				"receiptlist.receiptlistCode",
				"company.companyName",
				"receiptlist.linkMan",
				"date_format(receiptlist.createTime,'%Y-%m-%e') as createTime",
				"date_format(contract.endTime,'%Y-%m-%e') as endTime",
				"receiptlist.linkPhone",
				"company.address",
				"contract.isClassified",
				"case when contract.classifiedLevel = 0 then '秘密' "
						+ "when contract.classifiedLevel = 1 then '机密' "
						+ "when contract.classifiedLevel = 2 then '绝密' end as classifiedLevel",
				"receiptlist.accordingDoc", "employee.employeeName", };
		String[] foreignEntitys = new String[] { "contract", "company",
				"employee" };
		String condition = "receiptlist.ID = " + ID
				+ " and receiptlist.contractID = contract.ID "
				+ " and contract.companyID = company.ID "
				+ " and receiptlist.employeeID = employee.ID";

		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				tableName, null, foreignEntitys, condition);

		return result;
	}

	/**
	 * 
	 * 通过交接单ID查询任务
	 * @author wzj
	 * @date 2016年11月18日 上午8:58:54
	 * 
	 */
	@Override
	public Map<String, Object> getTasklistByReID(String reID, int limit,
			int offset, String order, String sort) {
		// TODO Auto-generated method stub
		int pageNum = limit;
		int pageIndex = offset / limit ;  //分页查询数据限制
		System.out.println("limit : " + limit + "  " + offset);
		if (reID == null || reID.equals(""))
			  return null;
		else {
			String[] properties = new String[] {   //查询字段
					"a.ID",
					"a.reID",
					"a.askFor",
					"a.sampleID",
					"a.startTime",
					"sample.sampleName",
					"sample.factoryCode",
					"sample.specifications as sampleStyle",
					"sample.qrcode",
					//"sample.unit",
					"IF(testproject.nameCn IS  NULL , testproject.nameEn , "
							+ " if ( testproject.nameEn is null ,testproject.nameCn,"
							+ " CONCAT(testproject.nameCn,'(',testproject.nameEn,')') )) as testName " };
          //关联条件
			String joinEntity = "  "
					+ " ( SELECT "
					+ "task.ID,"
					+ "task.receiptlistID as reID,"
					+ "task.sampleID,"
					+ "task.testProjectID,"
					+ " date_format(task.startTime,'%Y-%m-%d %H:%i:%s') as startTime , "
					+ " task.requires as askFor "
					+ " from task where  task.receiptlistID ='"
					+ reID
					+ "' ) as a "
					+ " left join sample on a.sampleID = sample.ID "
					+ " LEFT JOIN testproject on testproject.ID = a.testProjectID ";

			List<Map<String, Object>> list = entityDao.searchWithpaging( properties, null, joinEntity, null, null, null, " factoryCode ", "  desc ,  a.startTime desc ", pageNum, pageIndex);
			int count = entityDao.searchForeign(properties, null, joinEntity, null, null).size();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("total", count);
			map.put("rows", list);
			return map;
		}
	}

	/**
	 * 
	 * 获取交接单文件通过交接单ID
	 * 
	 * @author wzj
	 * @date 2016年11月18日 上午8:59:30
	 * 
	 */
	@Override
	public Map<String, Object> getReFiletByReID(String reID, int limit,
			int offset, String order, String sort) {
		// TODO Auto-generated method stub
		int pageNum = limit;
		int pageIndex = offset / limit ; //分页查询数据限制
		if (reID == null || reID.equals("")) 
			return null;
		String[] properties = new String[] { 
				"fileinformation.ID",
				"fileName",
				"remarks",
				"employee.employeeName as uploadName",
				"date_format(fileinformation.uploadTime,'%Y-%m-%d %H:%i:%s') as uploadTime	"
				};

		String baseEntity = " fileinformation ";  //主表
		String joinEntity = " LEFT JOIN employee on fileinformation.uploaderID = employee.ID "; //关联条件
		String condition = " fileinformation.belongtoID = '" + reID + "' and fileinformation.state = 0"; //查询条件

		List<Map<String, Object>> list = entityDao.searchWithpaging(properties, baseEntity, joinEntity, null, condition, null, " uploadTime ", "desc", pageNum, pageIndex);
		int count = entityDao.searchForeign(properties, baseEntity, joinEntity, null, condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", list);
		return map;
	}

	/**
	 * 
	 * 新增或者编辑任务
	 * @author wzj
	 * @date 2016年11月22日 上午1:58:08
	 * 
	 */
	@Override
	public String addTaskAndSampleWithEdit(String taskID, String sampleID,
			String sampleCode, String sampleName, String sampleStyle,
			String testProject, String unit, String require, String reID,
			String state) {
		if (sampleID == null || sampleID.equals("")) {
			// 样品还不存在
			Sample sample = new Sample();
			sample.setID(EntityIDFactory.createId());
			sample.setFactoryCode(sampleCode);
			sample.setSampleName(sampleName);
			sample.setCreateTime(new Date());
			sample.setSpecifications(sampleStyle);
			sample.setState(0);
			sample.setUnit(unit);
			sample.setQrcode(EntityIDFactory.createId());
			sampleID = sample.getID();
			if (entityDao.save(sample) != 1)
				return "false";

		} else {
			Sample sample = entityDao.getByID(sampleID, Sample.class); //有样品更新数据
			sample.setFactoryCode(sampleCode);
			sample.setSampleName(sampleName);
			sample.setSpecifications(sampleStyle);
			sample.setUnit(unit);
			if (entityDao.updatePropByID(sample, sampleID) != 1)
				return "false";
		}
		// 不管是不是新增还是编辑
		if (state.equals("edit"))  //先删除后重新添加
			if (entityDao.deleteByID(taskID, Task.class) != 1)
				return "false";
		// 新增任务--选择了检测项目
		if (testProject != null && !testProject.equals("")) {  
			String[] testProjectIDs = testProject.replaceAll(" ", "") .split(",");
			int counter = 0;
			for (int i = 0; i < testProjectIDs.length; i++) {
				Task task = new Task();
				task.setID(EntityIDFactory.createId());
				task.setReceiptlistID(reID);
				task.setSampleID(sampleID);
				task.setStartTime(new Date());
				task.setAllotstate(0);
				task.setDetectstate(0);
				System.out.println("任务检测项目：" + i + "  " + testProjectIDs[i]);
				task.setTestProjectID(testProjectIDs[i]);
				counter += entityDao.save(task);
			}
			return counter == testProjectIDs.length ? "true" : "false";
		} else {  // 新增任务--没有选择了检测项目
			Task task = new Task();
			task.setID(EntityIDFactory.createId());
			task.setReceiptlistID(reID);
			task.setSampleID(sampleID);
			task.setStartTime(new Date());
			task.setAllotstate(0);
			task.setDetectstate(0);
			return entityDao.save(task) == 1 ? "true" : "false";
		}

	}

	/**
	 * 
	 * 通过TaskID删除任务
	 * @author wzj
	 * @date 2016年11月22日 上午1:49:49
	 * 
	 */
	@Override
	public String deleteTaskByID(String taskID) {
		if (taskID == null || taskID.equals(""))
			return "false";
		int retur = entityDao.deleteByID(taskID, Task.class);
		return retur == 1 ? "true" : "fasle";
	}

	/**
	 * 
	 * 保存和提交交接单
	 * @author wzj
	 * @date 2016年11月22日 上午1:57:43
	 * 
	 */
	@Override
	public String saveSubmitReceipt(String reID, String saveState,
			String addState, String companyName, String address,
			String linkMan, String startTime, String endTime, String linkPhone,
			String accordingDoc, String coID) {
		// TODO Auto-generated method stub
		Contract contract = null;
		Company company = null;
		if (addState == null || addState.equals("") || addState.equals("no")) {
			contract = entityDao.getByID(coID, Contract.class); // 即使是编辑进来的addState也是No
			company = new Company();
			company.setID(EntityIDFactory.createId());
			company.setCompanyName(companyName);
			company.setAddress(address);
			entityDao.save(company);
			contract.setCompanyID(company.getID());
			entityDao.updatePropByID(contract, coID);
		}
		Receiptlist receiptlist = entityDao.getByID(reID, Receiptlist.class);
		receiptlist.setLinkMan(linkMan);
		receiptlist.setContractID(coID);
		receiptlist.setLinkPhone(linkPhone);
		receiptlist.setCreateTime(StrToDate(startTime));
		receiptlist.setCompleteTime(StrToDate(endTime));
		receiptlist.setAccordingDoc(accordingDoc);
		receiptlist.setState(0);
		receiptlist.setReceiptlistType(0);
		if (saveState == null || saveState.equals("") || saveState == "save") { //保存交接单
			receiptlist.setIsEditSample(0);
		} else {  //提交交接单
			receiptlist.setIsEditSample(1);
		}
		return entityDao.updatePropByID(receiptlist, reID) == 1 ? "true"
				: "false";
	}
   //新增交接单--各种类型
	@Override
	public Map<String, Object> addReceiptList(HttpSession  session ,String coID, String proID,
			String state, HttpServletRequest request) {
		// String employeeID = (String) request.getSession().getAttribute("ID");
		Map<String, Object> map = new HashMap<String, Object>();
		String employeeID = "1";
     //   request.getSession().getAttribute("employeeid");
		Receiptlist receiptlist = new Receiptlist();
		receiptlist.setID(EntityIDFactory.createId());
		map.put("reID", receiptlist.getID());
		receiptlist.setCreateTime(new Date());
		receiptlist.setEmployeeID(employeeID);
		receiptlist.setState(0);
		receiptlist.setIsEditSample(1);
		receiptlist.setIsEditSample(1);
		receiptlist.setReceiptlistType(0);
		map.put("coID", coID);
		if (state.equals("yes")) { //有合同新增交接单-接受
			receiptlist.setReceiptlistCode("交接单编码生成规则不知道-接受");
			receiptlist.setContractID(coID);
			receiptlist.setProjectID(proID);
		} else if(state.equals("no")) { //无合同新增交接单-接受
			Contract contract = new Contract();
			contract.setID(EntityIDFactory.createId());
			contract.setContractCode("合同编号生成规则");
			contract.setContractName("暂无具体合同信息，先生成的交接单");
			contract.setState(0);
			map.put("coID", contract.getID());
			map.put("coCode", contract.getContractCode());

			Project project = new Project();
			project.setID(EntityIDFactory.createId());
			project.setContractID(contract.getID());
			project.setState(0);
			project.setCreateTime(new Date());
			project.setRemarks("这是先接受的样品，后拟定合同的");
			receiptlist.setProjectID(project.getID());
			entityDao.save(project);
			entityDao.save(contract);
		}else{  //有合同新增交接单-退还
			receiptlist.setReceiptlistCode("交接单编码生成规则不知道--退还");
			receiptlist.setContractID(coID);
			receiptlist.setProjectID(proID);
		}
		map.put("reCode", receiptlist.getReceiptlistCode());
		entityDao.save(receiptlist);
		return map;
	}
    /**
     * 
     * 通过交接单IDH获取交接单一部分的信息 --编辑接受交接单的页面调用
     * @author wzj
     * @date 2016年12月22日 下午10:18:35
     *
     */
	@Override
	public Map<String, Object> getReceiptByReID(String reID) {
		// TODO Auto-generated method stub
		if (reID == null || reID.equals("")) //传输错误返回
			return null;
		String[] properties = new String[] { //选择字段
				"date_format(receiptlist.createTime,'%Y-%m-%e') as startTime",
				"receiptlist.linkMan", "receiptlist.linkPhone",
				"date_format(receiptlist.completeTime,'%Y-%m-%e') as endTime" };
		Map<String, Object> map = entityDao.findByID(properties, reID,
				Receiptlist.class);
		return map;
	}
	
	
	/**
	    * @description 查看交接单信息
	    * @author hzz
		* @date 2016年  10月20日 晚上 20:55:11
	    */
		@Override
		public List<Map<String, Object>> getReceiptlistInformationInView(String ID) {
			String tableName = "receiptlist";
			String[] properties = new String[]{
//				"receiptlist.ID",
				"contract.contractCode",
				"receiptlist.receiptlistCode",
				"company.companyName",
				"receiptlist.linkMan",
				"date_format(receiptlist.createTime,'%Y-%m-%e') as createTime",
				"date_format(receiptlist.completeTime,'%Y-%m-%e') as completeTime",
				"receiptlist.linkPhone",
				"company.address",
				"case when contract.classifiedLevel = 0 then '秘密' "
				+ "when contract.classifiedLevel = 1 then '机密' "
				+ "when contract.classifiedLevel = 2 then '绝密' end as classifiedLevel",
				"receiptlist.accordingDoc",
			};
			String[] foreignEntitys = new String[]{
				"contract",
				"company",
			};
			String condition = "receiptlist.ID = " + ID
					+ " and receiptlist.contractID = contract.ID "
					+ " and contract.companyID = company.ID ";
			
			List<Map<String, Object>> result = entityDao.searchForeign(properties, tableName, null, foreignEntitys, condition);
			
			return result;
		}

		/**
		 * @description 查看退还交接单信息
		 * @author hzz
		 * @date 2016年  10月21日 晚上 19:30:12
		 */
		@Override
		public List<Map<String, Object>> getReceiptlistInforInReturn(String ID) {
			String tableName = "receiptlist";
			String[] properties = new String[]{
//				"receiptlist.ID",
				"contract.contractCode",
				"receiptlist.receiptlistCode",
				"company.companyName",
				"receiptlist.linkMan",
				"date_format(receiptlist.createTime,'%Y-%m-%d') as createTime",
				"receiptlist.linkPhone",
			};
			String[] foreignEntitys = new String[]{
				"contract",
				"company",
			};
			String condition = "receiptlist.ID = " + ID
					+ " and receiptlist.contractID = contract.ID "
					+ " and contract.companyID = company.ID ";
			
			List<Map<String, Object>> result = entityDao.searchForeign(properties, tableName, null, foreignEntitys, condition);
			
			return result;
		}

		/**
		 * @description 更新退还交接单信息
		 * @author hzz
		 * @date  2016年11月15日 下午 14:40:07
		 */
		@Override
		public String updReceiptlistInforInReturn(String ID, String linkMan,
				String createTime, String linkPhone) {
			if(ID == null  || ID.equals("")){
				return "false";
			}
			Receiptlist receiptlist=entityDao.getByID(ID, Receiptlist.class);
			if(receiptlist == null )
				return "false";
			receiptlist.setLinkMan(linkMan);
			receiptlist.setLinkPhone(linkPhone);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date createTime1 = null;
			try {
				createTime1 = sdf.parse(createTime);
				System.out.println(createTime1);
			} catch (ParseException e){
				e.printStackTrace();
			}
			if (createTime1 != null) {
				receiptlist.setCreateTime(createTime1);
			}
			
			int receiptlistType=1;
			receiptlist.setReceiptlistType(receiptlistType);
			return entityDao.updatePropByID(receiptlist,ID)==1?"true":"false";
		}
       /**
        * 
        * 删除交接单
        * @author wzj
        * @date 2016年12月22日 下午10:28:05
        *
        */
		@Override
		public String delReceiptlist(String reID) {
			 System.out.println(reID);
			return entityDao.deleteByID(reID, Receiptlist.class) == 1 ? "true" : "false";
		}

		/**
		 * @description 新增退还交接单
		 * @author hzz
		 * @date 2016年11月30日 早上 10:28:05
		 */
		@Override
		public Map<String, Object> addReceiptListInReturn() {
			// TODO Auto-generated method stub
			Map<String, Object> map = new HashMap<String, Object>();

			Receiptlist receiptlist = new Receiptlist();
			receiptlist.setID(EntityIDFactory.createId());
			map.put("reID", receiptlist.getID());
			receiptlist.setReceiptlistCode("XJHJ-226-14-1058-TET");
			map.put("reCode", receiptlist.getReceiptlistCode());
			receiptlist.setCreateTime(new Date());
			receiptlist.setState(0);
			receiptlist.setIsEditSample(1);
			receiptlist.setReceiptlistType(0);
			entityDao.save(receiptlist);
			return map;
		}

		/**
		 * @description 更新退还交接单
		 * @author hzz
		 * @date 2016年11月30日 早上11:03:50
		 */
		@Override
		public String updRelistInforInReturn(String reID, String conID,
				 String linkMan, String createTime,
				String linkPhone) {
			// TODO Auto-generated method stub
			if(reID == null  || reID.equals("")){
				return "false";
			}
			Receiptlist receiptlist=entityDao.getByID(reID, Receiptlist.class);
			if(receiptlist == null )
				return "false";
			receiptlist.setLinkMan(linkMan);
			receiptlist.setLinkPhone(linkPhone);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date createTime1 = null;
			try {
				createTime1 = sdf.parse(createTime);
				System.out.println(createTime1);
			} catch (ParseException e){
				e.printStackTrace();
			}
			if (createTime1 != null) {
				receiptlist.setCreateTime(createTime1);
			}
			
			int receiptlistType=1;
			receiptlist.setReceiptlistType(receiptlistType);
			receiptlist.setContractID(conID);
			
			return entityDao.updatePropByID(receiptlist,reID)==1?"true":"false";
		}
}
