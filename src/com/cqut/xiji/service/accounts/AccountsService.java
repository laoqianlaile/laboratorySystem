package com.cqut.xiji.service.accounts;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.accounts.Accounts;
import com.cqut.xiji.entity.contract.Contract;
import com.cqut.xiji.entity.sample.Sample;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.POIEntity.DynamicLengthConfig;
import com.cqut.xiji.tool.POIXLSReader.ExcelReader;
import com.cqut.xiji.tool.POIXMLReader.XMLParser;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class AccountsService extends SearchService implements IAccountsService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "accounts";
	}

	@Override
	public String getBasePrimaryKey() {
		return "accounts.ID";
	}

	@Override
	public Map<String, Object> getAccountWithPaging(String contractCode,
			String contractName, String checkinTime1, String checkinTime2,
			int limit, int offset, String order, String sort) {
		
		int index = limit;
		int pageNum = offset/limit;
		
		String baseEntity = "accounts";
		String[] properties ={
				"accounts.ID as accountsID",
				"contract.ID as contractID",
				"contract.contractCode",
				"contract.contractAmount",
				"contract.contractName",
				"DATE_FORMAT(accounts.checkinTime,'%Y-%m-%d %H:%i') as checkinTime",
				"employee.ID as employeeID",
				"employee.employeeName"
		};
		String joinEntity = " LEFT JOIN contract on accounts.contractID = contract.ID "
				+ " LEFT JOIN employee on accounts.employeeID = employee.ID ";
		
		String condition = " 1 = 1 ";
		if(contractCode != null && contractCode != ""){
			condition += " and contract.contractCode like '%" + contractCode + "%' ";
		}
		if(contractName != null && contractName != ""){
			condition += " and contract.contractName like '%" + contractName + "%' ";
		}
		if(checkinTime1 != null && !checkinTime1.equals("") && checkinTime2!=null && !checkinTime2.equals("")){
			condition += " and checkinTime between '" + checkinTime1
					+ "' and '" + checkinTime2 +"'";
		}
		
	    List<Map<String, Object>> result =  originalSearchWithpaging(properties, baseEntity, joinEntity, null, condition, false, null, sort, order, index, pageNum);
	    int count = getForeignCountWithJoin(joinEntity, null, condition, false);
		
	    Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
	    
		return map;
	}

	@Override
	public String upAccounts(String accountsID ,String contractID) {
		
		Accounts accounts = new Accounts();
		accounts.setContractID(contractID);
		
		int result = entityDao.updatePropByID(accounts,accountsID);
		
		return result + "";
	}

	@Override
	public String addAccounts(String contractID, String employeeID,
			String remarks) {
		Accounts accounts = new Accounts();
		
		accounts.setID(EntityIDFactory.createId());
		accounts.setContractID(contractID);
		accounts.setEmployeeID(employeeID);
		accounts.setCheckinTime(new Date());
		accounts.setRemarks(remarks);
		
		int result = entityDao.save(accounts);
		
		return result + "";
	}

	@Override
	public String delAccounts(String accountsID) {
		if(accountsID == null || accountsID.isEmpty()){
			return 0+"";
		}
		int result =  entityDao.deleteByID(accountsID, Accounts.class);
		return result + "";
	}
	
	@Override
	public void exportAccounts(HttpServletRequest request , HttpServletResponse response){
		//在object这个类中有一个方法：getclass().这个方法是用来取得该类已经被实例化了的对象的该类的引用，
				Class objClass = this.getClass(); 
				String strRealPath  = objClass.getClassLoader().getResource("").getFile(); 
				try {
					strRealPath = URLDecoder.decode(strRealPath, "UTF-8");//把字符解码
				} catch (UnsupportedEncodingException e2) {
					// TODO Auto-generated catch block
					e2.printStackTrace();
				} 

				File objFile = new File(strRealPath); 

				strRealPath = objFile.getParent(); 
				String XMLPath = strRealPath;
				//String XMLPath = getClass().getResource("/").getFile().toString();
				XMLPath = XMLPath + "/classes/ReportXML/accounts.xml";
				String sheetName = "employee";
				Map<String, DynamicLengthConfig> dynamicLengthMap = new HashMap<String, DynamicLengthConfig>();
				List<String> list1 = new ArrayList<String>();// 大标题
				List<Map<String, Object>> dataSource =getAccounts(-1);
				System.out.println("dataSource:"+dataSource);
				String fileName = "";
				//dataSource =null;
				fileName = "账目单.xls";
				final String userAgent = request.getHeader("USER-AGENT");
				list1.add("账目信息");
				DynamicLengthConfig config1 = new DynamicLengthConfig(0, 0, 1, 5,list1);
				dynamicLengthMap.put("dynamicLengt1", config1);
				XMLParser parser = new XMLParser(XMLPath, sheetName, null,	dynamicLengthMap, dataSource);
				parser.parse();
				try {
					if(StringUtils.contains(userAgent, "MSIE")){//IE浏览器
		                fileName = URLEncoder.encode(fileName,"UTF8");
		            }else if(StringUtils.contains(userAgent, "Mozilla")){//google,火狐浏览器
		                fileName = new String(fileName.getBytes(), "ISO8859-1");
		            }else{
		                fileName = URLEncoder.encode(fileName,"UTF8");//其他浏览器
		            }
					response.setHeader("content-disposition", "attachment;filename=\"" + fileName+ "\"");
				} catch (UnsupportedEncodingException e1) {
					e1.printStackTrace();
				}

				try {
					OutputStream output = response.getOutputStream();
					parser.write(output);
					output.close();

				} catch (IOException e) {
					e.printStackTrace();
				}
	}
	
	/**
	 * 获取前面N条样品信息
	 * features or effect
	 * @author zx
	 * @date 2017年7月18日 下午1:03:44
	 *
	 */
	@Override
	public List<Map<String, Object>> getAccounts(int total) {
	// TODO Auto-generated method stub
		String condition =" 1 = 1  ";
		int pageNum = 0;
		if(total == -1){
			 pageNum = entityDao.getByCondition(condition, Accounts.class).size();
		}else if(total > 0){
			pageNum = total;
		}
	
		
		int pageIndex = 0;
		String[] properties =  new String[]{
		"contract.contractCode",
		"contract.contractAmount",
		"contract.contractName",
		"DATE_FORMAT(accounts.checkinTime,'%Y-%m-%d %H:%i') AS checkinTime ",
		"employee.employeeName",
		};
	
	    String tableName = " accounts JOIN contract on accounts.contractID = contract.ID LEFT JOIN employee on accounts.employeeID = employee.ID ";
    	String sort = " ASC ";			//升序
    	String order= " accounts.ID ";
	    List<Map<String, Object>> list = entityDao.searchWithpaging(properties, tableName, null, null, condition, null, order, sort, pageNum, pageIndex);
	     return list;
	}
	
	 /**
	    * 导入样品信息
	    * features or effect
	    * @author wzj
	    * @date 2017年7月18日 下午1:03:27
	    *
	    */
		@Override
		public int importAccounts(CommonsMultipartFile file, HttpServletRequest req,	HttpServletResponse response) {
				
				Date date = new Date();
				try {  
					List<ArrayList<String>> list = new ExcelReader().readExcel(file); 
					ArrayList<String> rowList = null;
			        //获得Excel表格的内容:
			        for (int i = 1; i < list.size(); i++) {
			        	rowList = list.get(i);
			        	Accounts accounts = new Accounts();
			        	Contract contract = new Contract();
			        	accounts.setID(EntityIDFactory.createId());
			        	String id = EntityIDFactory.createId();
			        	accounts.setContractID(id);
			        	contract.setID(id);
			        	contract.setContractCode(rowList.get(0));
			        	contract.setContractName(rowList.get(1));
			        	contract.setContractAmount(Double.parseDouble(rowList.get(2)));
			        	accounts.setCheckinTime(new Date());
			        	accounts.setEmployeeID((String)req.getSession().getAttribute("EMPLOYEEID"));
			        	
			        	entityDao.save(contract);
			            entityDao.save(accounts);
			           
			        }
			      
			     
			        
			    } 
				catch(NumberFormatException e ){
					
					  e.printStackTrace();  
					  return 2 ; //未在指定位置输入正确工时时间
				}
				catch (IndexOutOfBoundsException e){
					
					  e.printStackTrace();  
					  return 1 ; //格式不对
				}
				catch (IOException e) {  
			        System.out.println("未找到指定路径的文件!");  
			        e.printStackTrace();  
			  	    return 3 ; //
			    }
				return 0;
		
		}
}
