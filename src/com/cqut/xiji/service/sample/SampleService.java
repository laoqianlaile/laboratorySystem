package com.cqut.xiji.service.sample;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.company.Company;
import com.cqut.xiji.entity.contractFineItem.ContractFineItem;
import com.cqut.xiji.entity.linkReSample.LinkReSample;
import com.cqut.xiji.entity.sample.Sample;
import com.cqut.xiji.entity.standard.Standard;
import com.cqut.xiji.entity.task.Task;
import com.cqut.xiji.entity.testProject.TestProject;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.POIEntity.DynamicLengthConfig;
import com.cqut.xiji.tool.POIXLSReader.ExcelReader;
import com.cqut.xiji.tool.POIXMLReader.XMLParser;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class SampleService extends SearchService implements ISampleService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "sample";
	}

	@Override
	public String getBasePrimaryKey() {
		return "sample.ID";
	}
    /**
     * 
     * 分页查询样品信息
     * @author wzj
     * @date 2016年10月13日 下午9:25:04
     *
     */
	@Override
	public Map<String, Object> getSampleWithPaging(String factoryCode,String sampleName,String sampleType,String giveMan,String takeMan,String receiptlistID, String startTime, String endTime,int limit, int offset,
			String order, String sort){
		// TODO Auto-generated method stub
		System.out.println("sampleName: "+sampleName+"  "+"sampleType:"+sampleType+"  "+"startTime:"+startTime+"  "+"endTime: "+endTime+"  rolename:");
		System.out.println("giveMan : "+giveMan+"  takeman :"+takeMan +" receiptlistID "+receiptlistID);
		System.out.println("limit : "+limit+"  "+offset);
		System.out.println("orderFiled : "+order+"  sortModel:"+sort);
		if(startTime == null){
			System.out.println("strtime is null");
		}
		if(endTime == null){
			System.out.println("endTime is null");
		}
		int pageNum = limit;
		int pageIndex = offset/limit ;
		System.out.println("");
		String[] properties =  new String[]{
		"sample.ID",
		"factoryCode",
		"sampleName",
		"specifications AS type", 
		"if(state = 0 ,'未领用','领用') as state",
		"unit",
		"DATE_FORMAT(sample.createTime,'%Y-%m-%d %H:%i:%s') AS createTime ",
		"sample.remarks  "
		};
	
	    String tableName = " sample ";
		String condition =" 1 = 1  ";
		if(factoryCode != null && !factoryCode.equals("")){
			 condition+=" and factoryCode like '%"+factoryCode+"%'  ";
		}
		if(sampleName != null && !sampleName.equals("")){
			condition+=" and  sampleName like '%"+sampleName+"%'  ";
		}
		
		if(sampleType != null && !sampleType.equals("")){
			condition+=" and specifications like '%"+sampleType+"%'  ";
		}
		
	/*	if(takeMan != null && !takeMan.equals("")){
			condition+=" and takeMan like '%"+takeMan+"%'  ";
		}
		if(giveMan != null && !giveMan.equals("")){
			condition+=" and giveMan like '%"+giveMan+"%'  ";
		}
		
		if(receiptlistID != null && !receiptlistID.equals("")){
			condition+=" and receiptlist.receiptlistID like '%"+receiptlistID+"%'  ";
		}*/
		
    	if(startTime != null && endTime != null  && !startTime.equals("") &&  !endTime.equals("") ){
			condition+=" and sample.createTime between  "+startTime+" and "+endTime+"  ";
		}else if((startTime != null && !startTime.equals("")) && (endTime == null || endTime.equals(""))){
			condition+=" and sample.createTime >  "+startTime+"  " ;
		}else if((startTime == null ||startTime.equals("")) && (endTime != null && !endTime.equals(""))){
			condition+=" and sample.createTime < "+endTime+"  " ;
		}
    	sort = " desc ";
    	order = " sample.createTime ";
	    List<Map<String, Object>> list = entityDao.searchWithpaging(properties, tableName, null, null, condition, null, order, sort, pageNum, pageIndex);
    	int count = entityDao.getByCondition(condition, Sample.class).size();
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", list);
	   return map;
	}
 /**
  * 
  * 删除样品
  * @author wzj
  * @date 2016年10月21日 下午7:24:13
  *
  */
	@Override
	public String delSample(String roleIDs) {
		// TODO Auto-generated method stub
		String[] ids = roleIDs.split(",");
		System.out.println(Arrays.toString(ids));
		return entityDao.deleteEntities(ids, Sample.class) == ids.length ? "true" :"false";
	}
   /**
    * 
    * 删除交接单中的样品
    * @author wzj
    * @date 2016年10月21日 下午7:26:01
    *
    */
	@Override
	public String delLinkReSample(String linkIDs) {
		// TODO Auto-generated method stub
		String[] ids = linkIDs.split(",");
		System.out.println(Arrays.toString(ids));
		return entityDao.deleteEntities(ids, LinkReSample.class) == ids.length ? "true" :"false";
	}
	
	/**
	 * 
	 * 添加样品
	 * @author wzj
	 * @date 2016年10月13日 下午9:19:42
	 *
	 */
	@Override
	public String addLinkSample(String factoryCode,String sampleName, String sampleType,String receiptlistCode, String remarks,String unit){
		System.out.println(sampleName+" sn "+ sampleType+" st "+remarks+ " r "+ unit);
		System.out.println(factoryCode+" f "+" gm "+ " tm "+ receiptlistCode);
		// TODO Auto-generated method stub
		Sample sample = new Sample();
		String sampleID = EntityIDFactory.createId();
		sample.setID(sampleID);
	/*	LinkReSample linkReSample = null ;*/
		if(factoryCode != null && !factoryCode.equals("")){
			sample.setFactoryCode(factoryCode);
		}
		if(sampleName != null && !sampleName.equals("")){
			sample.setSampleName(sampleName);
		}
		if(sampleType != null && !sampleType.equals("")){
			sample.setSpecifications(sampleType);
		}
		
		if(remarks != null  && !remarks.equals("")){
			sample.setRemarks(remarks);
		}
		/*if(takeMan != null && !takeMan.equals("")){
			sample.setTakeMan(takeMan);
			sample.setTakeTime(new Date());
		}
		if(giveMan != null && !giveMan.equals("")){
			sample.setGiveMan(giveMan);
			sample.setGiveTime(new Date());
		}*/
	/*	if(receiptlistCode != null && !receiptlistCode.equals("")){
			sample.setReceiptlistID(receiptlistCode);
			 linkReSample = new LinkReSample();
			linkReSample.setID(EntityIDFactory.createId());
			linkReSample.setSampleID(sampleID);
			linkReSample.setReceiptlistID(receiptlistCode);
			linkReSample.setCreateTime(new Date());
		}*/
		/*if(givePhone != null && !givePhone.equals("")){
			sample.setGivePhone(givePhone);
		}
		if(takePhone != null && !takePhone.equals("")){
			sample.setTakePhone(takePhone);
		}*/
		sample.setState(0);
		sample.setUnit(unit);
		sample.setCreateTime(new Date());
		sample.setQrcode(EntityIDFactory.createId());
		String condition = " factoryCode ='"+factoryCode+"'";
		List<Sample> list = entityDao.getByCondition(condition, Sample.class);
		if(list != null && list.size() > 0)
			return "codeExit";
		else return  entityDao.save(sample) == 1 ?"true":"false";
		/* if(linkReSample != null )
		     return entityDao.save(sample) + entityDao.save(linkReSample) == 2 ?"true":"false";
		 else return "false";*/
	}
	/**
	 * 
	 * 新增样品
	 * @author wzj
	 * @date 2016年12月20日 下午5:14:15
	 *
	 */
	@Override
	public String addSample(String factoryCode,String sampleName, String sampleType, String remarks,String unit){
		String sampleID = isExitByCodeName(factoryCode, sampleName, sampleType);
		if(sampleID == null || sampleID.equals("")){
			Sample sample = new Sample();
			sampleID = EntityIDFactory.createId();
			sample.setID(sampleID);
			if(factoryCode != null && !factoryCode.equals("")){
				sample.setFactoryCode(factoryCode);
			}
			if(sampleName != null && !sampleName.equals("")){
				sample.setSampleName(sampleName);
			}
			if(sampleType != null && !sampleType.equals("")){
				sample.setSpecifications(sampleType);
			}
			
			if(remarks != null  && !remarks.equals("")){
				sample.setRemarks(remarks);
			}
			sample.setUnit(unit);
			sample.setState(0);
			sample.setCreateTime(new Date());
			sample.setQrcode(EntityIDFactory.createId());	
			 return  entityDao.save(sample) == 1 ?"true":"false";
		}
		else {
			return "have";
		}
	}
	
	/**
	 * 字符串转换成日期
	 * @author wzj
	 * @date 2016年10月13日 下午9:21:15
	 * @param str
	 * @return date
	 */
	public static Date StrToDate(String str) {

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = null;
		try {
			date = format.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
   
    /**
     * 
     * 更新样品信息(包括样品交接单号)
     * @author wzj
     * @date 2016年10月13日 下午9:22:00
     *
     */
	@Override
	public String updateLinkSample(String ID,String sampleName, String factoryCode,String sampleType,
			String remarks, String unit,String linkID ,String reID) {
		// TODO Auto-generated method stub
	
		if(ID == null  || ID.equals("")){
			return "false";
		}
		Sample	sample = entityDao.getByID(ID, Sample.class);
		if(sample == null )
			return "false";
		sample.setSampleName(sampleName);
		sample.setSpecifications(sampleType);
		sample.setRemarks(remarks);
		
		if(linkID == null  || linkID.equals("")){
			return "false";
		}
		 LinkReSample linkReSample  = entityDao.getByID(linkID, LinkReSample.class);
		 if(linkReSample == null  ){
				return "false";
			}
		 List<Sample> list1 = entityDao.getByCondition("  sample.factoryCode='"+factoryCode+"'", Sample.class);
			if(list1 != null && list1.size() > 0)
				return "codeExit";
		linkReSample.setReceiptlistID(reID);
		linkReSample.setCreateTime(new Date());
		return entityDao.updatePropByID(sample, ID) + entityDao.updatePropByID(linkReSample, linkID) == 2 ? "true": "false";
	}
	/**
	 * 
	 * 单纯的修改样品信息
	 * @author wzj
	 * @date 2016年10月21日 下午7:40:42
	 *
	 */
	@Override
	public String updateSample(String ID,String sampleName,String factoryCode, String sampleType,
			String remarks, String unit) {
		if(ID == null  || ID.equals("")){
			return "false";
		}
		String sampleID = isExitByCodeName(factoryCode, sampleName, sampleType);
		if(sampleID == null || sampleID.equals("")){
			Sample	sample = entityDao.getByID(ID, Sample.class);
			if(sample == null )
				return "false";
			sample.setSampleName(sampleName);
			sample.setSpecifications(sampleType);
			sample.setRemarks(remarks);
			sample.setFactoryCode(factoryCode);
			return entityDao.updatePropByID(sample, ID)  == 1 ? "true": "false";
		}else{
	       return "true";
		}
	}
/**
 * 
 * 通过样品编码 名称 型号 判断是否存在获得样品信息
 * @author wzj
 * @date 2016年11月29日 上午12:20:54
 *
 */
	@Override
	public String isExitByCodeName(String sampleCode,String sampleName , String sampleStyle) {
		// TODO Auto-generated method stub
		String[] properties = new String[]{
				 "sample.ID as sampleID",
				
		};
		String condition = " specifications ='"+sampleStyle+"' and factory ='"+sampleCode+"' and sampleName ='"+sampleName+"'";
		List<Map<String, Object>> list = entityDao.findByCondition(properties, condition, Sample.class);
	
	  if(list == null || list.size() == 0)
		 return "";
	  else {
		  Object sampleID =  list.get(0).get("smapleID");
		  if(sampleID == null ){
			  return "";
		  }
		  else{
			  return sampleID.toString();
		  }
	  }
	}
	
	public String getSampleByID(String sampleID) {
		// TODO Auto-generated method stub
		String[] properties = new String[]{
				 "sample.ID as sampleID",
				 "sampleName",
				 "factoryCode as sampleCode",
				 "specifications as sampleStyle",
				 "unit",
				 "DATE_FORMAT(sample.createTime,'%Y-%m-%d %H:%i:%s') as createTime ",
				 "remarks"
				
		};
		String condition = "  sample.ID ='"+sampleID+"'";
		 List<Map<String, Object>> list = entityDao.findByCondition(properties, condition, Sample.class);
	  if(list == null || list.size() == 0)
		 return "false";
	  else return JSONObject.fromObject(list.get(0)).toString();
	}
	

	/**
	 * @description 获取样品ID
	 * @author hzz 
	 * @date 2016年11月17日 晚上22:37:58
	 */
	@Override
	public List<Map<String, Object>> getSampleInfor(String qrcode) {
		String[] properties = new String[] {"ID"};
		String condition = "qrcode=" + qrcode;
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Sample.class );
		return result;
	}

	@Override
	public String isExitFactory(String factoryCode) {
		// TODO Auto-generated method stub
		List<Sample> list = entityDao.getByCondition(" factoryCode='"+factoryCode+"'", Sample.class);
		if(list != null && list.size() > 0)
			return "true";
		else return "false";
	}
    /**
     * 
     * 模糊搜索样品通过名称或者样品编码
     * @author wzj
     * @date 2017年3月20日 下午5:28:19
     *
     */
	@Override
	public List<Map<String, Object>> getSampleListByCodeLimit(String sampleCode) {
		// TODO Auto-generated method stub
		String[] properties = new String[]{
				"sample.ID ",
				"factoryCode as sampleCode",
				"sampleName as sampleName",
				"specifications as sampleStyle",
				"unit"
		};
		if( sampleCode == null || sampleCode.equals("")){ //sampleCode 有可能是编号或者名称
			return null;
		}else{
			String condition = " factoryCode like '%"+sampleCode+"%' or sampleName like '%"+sampleCode+"%' order by factoryCode asc ";
			List<Map<String, Object>> list = entityDao.findByCondition(properties, condition, Sample.class);
			return list;
		}
	
	}

	@Override
	public List<Map<String, Object>> getSampleMsg(String codeOrName){
		String[] properties = new String[] {"ID as sampleID","factoryCode","sampleName","specifications"};
		
		String condition = " factoryCode like '%" + codeOrName + "%' or sampleName like '%" + codeOrName + "%'";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Sample.class);
		return result;
	}
	

	public Map<String, Object> getSampleWithPagingINmanhour(String factoryCode,String sampleName,String specifications,int limit, int offset,
			String order, String sort){
		
		int index = limit;
		int pageNum = offset/limit;
		String[] properties = new String[]{
			"sample.ID",
			"sample.factoryCode",
			"sample.sampleName",
			"sample.specifications",
			"sample.laborHour"
		};

		String condition = " 1 = 1 and sample.laborHour is not null";
		if (factoryCode != null && !factoryCode.equals("")) {
			condition += " and sample.factoryCode like '%"
					+ factoryCode + "%'";
		}
		if (sampleName != null && !sampleName.equals("")) {
			condition += " and sample.sampleName like '%" + sampleName
					+ "%'";
		}
		if (specifications != null && !specifications.equals("")) {
			condition += " and sample.specifications like '%" + specifications
					+ "%'";
		}

		List<Map<String, Object>> result = originalSearchWithpaging(properties, getBaseEntityName(), null, null, condition, false, null, sort, order, index, pageNum);
		int count = getForeignCountWithJoin(null, null, condition, false);

		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);

		return map;

	}
	
	public List<Map<String, Object>> getSampleImforByFactoryCode(String factoryCode) {
		String[] properties = new String[] {
				"ID",
				"factoryCode",
				"sampleName",
				"specifications",
				"laborHour"
				};
		
		String condition = " factoryCode like '%" + factoryCode + "%' ORDER BY createTime ";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Sample.class);
		return result;
	}
	
	public List<Map<String, Object>> getSampleImforBySampleName(String sampleName) {
		String[] properties = new String[] {
				"ID",
				"factoryCode",
				"sampleName",
				"specifications",
				"laborHour"
				};
		
		String condition = " sampleName like '%" + sampleName + "%' ORDER BY createTime ";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Sample.class);
		return result;
	}
	
	public List<Map<String, Object>> getSampleImforBySpecifications(String specifications) {
		String[] properties = new String[] {
				"ID",
				"sampleName",
				"factoryCode",
				"specifications",
				"laborHour"
				};
		
		String condition = " specifications like '%" + specifications + "%' ORDER BY createTime ";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Sample.class);
		return result;
	}
	
	@Override
	public String updateManHour(String ID,double laborHour){
		if(ID == null  || ID.equals("")){
			return "false";
		}
		Sample	sample = entityDao.getByID(ID, Sample.class);
		if(sample == null )
			return "false";
		sample.setLaborHour(laborHour);
		return entityDao.updatePropByID(sample, ID)  == 1 ? "true": "false";
	}
	
	public String addSampleInManHour(String factoryCode,String sampleName, String specifications, double laborHour){
		Sample sample = new Sample();
		String sampleID = EntityIDFactory.createId();
		sample.setID(sampleID);
		
		if(factoryCode != null && !factoryCode.equals("")){
			sample.setFactoryCode(factoryCode);
		}
		if(sampleName != null && !sampleName.equals("")){
			sample.setSampleName(sampleName);
		}
		if(specifications != null && !specifications.equals("")){
			sample.setSpecifications(specifications);
		}
		
		sample.setUnit("个");
		sample.setState(0);
		sample.setCreateTime(new Date());
		sample.setQrcode(EntityIDFactory.createId());
		sample.setLaborHour(laborHour);
	
		 return  entityDao.save(sample) == 1 ?"true":"false";
	}
	
	@Override
	public boolean updateSampleNameByID(String sampleID, String sampleName) {
		Sample se = entityDao.getByID(sampleID, Sample.class);
		se.setSampleName(sampleName);
		return baseEntityDao.updatePropByID(se, sampleID) > 1 ? true : false;
	}
   /**
    * 
    * f导出样品信息表
    * @author wzj
    * @date 2017年7月18日 上午9:45:20
    *
    */
	@Override
	public void exportSample(HttpServletRequest request,
			HttpServletResponse response) {
		// TODO Auto-generated method stub
		Class objClass = this.getClass(); 
		String strRealPath  = objClass.getClassLoader().getResource("").getFile(); 
		try {
			strRealPath = URLDecoder.decode(strRealPath, "UTF-8");
		} catch (UnsupportedEncodingException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		} 

		File objFile = new File(strRealPath); 

		strRealPath = objFile.getParent(); 
		String XMLPath = strRealPath;
		//String XMLPath = getClass().getResource("/").getFile().toString();
		XMLPath = XMLPath + "/classes/ReportXML/sample.xml";
		String sheetName = "employee";
		Map<String, DynamicLengthConfig> dynamicLengthMap = new HashMap<String, DynamicLengthConfig>();
		List<String> list1 = new ArrayList<String>();// 大标题
		List<Map<String, Object>> dataSource =getAllSample(-1);
		System.out.println("dataSource:"+dataSource);
		String fileName = "";
		//dataSource =null;
		fileName = "样品信息.xls";
		final String userAgent = request.getHeader("USER-AGENT");
		list1.add("样品信息");
		DynamicLengthConfig config1 = new DynamicLengthConfig(0, 0, 1, 8,
				list1);
		dynamicLengthMap.put("dynamicLengt1", config1);
		XMLParser parser = new XMLParser(XMLPath, sheetName, null,
				dynamicLengthMap, dataSource);
		parser.parse();
		try {
			if(StringUtils.contains(userAgent, "MSIE")){//IE浏览器
                fileName = URLEncoder.encode(fileName,"UTF8");
            }else if(StringUtils.contains(userAgent, "Mozilla")){//google,火狐浏览器
                fileName = new String(fileName.getBytes(), "ISO8859-1");
            }else{
                fileName = URLEncoder.encode(fileName,"UTF8");//其他浏览器
            }
			response.setHeader("content-disposition", "attachment;filename=\""
					+ fileName+"\"");
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
	 * @author wzj
	 * @date 2017年7月18日 下午1:03:44
	 *
	 */
	@Override
	public List<Map<String, Object>> getAllSample(int total) {
	// TODO Auto-generated method stub
		String condition =" 1 = 1  ";
		int pageNum = 0;
		if(total == -1){
			 pageNum = entityDao.getByCondition(condition, Sample.class).size();
		}else if(total > 0){
			pageNum = total;
		}
	
		
		int pageIndex = 0;
		String[] properties =  new String[]{
		"sample.ID",
		"factoryCode as sampleCode",
		"sampleName",
		"specifications AS sampleStype", 
		"laborHour",
		"unit",
		"if(state = 0 ,'未领用','领用') as state",
		"sample.remarks  ",
		"DATE_FORMAT(sample.createTime,'%Y-%m-%d %H:%i:%s') AS createTime "
		};
	
	    String tableName = " sample ";
    	String sort = " desc ";
    	String order= " sample.createTime ";
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
	public int importExcel(CommonsMultipartFile file, HttpServletRequest req,	HttpServletResponse response) {
			
			Date date = new Date();
			try {  
				List<ArrayList<String>> list = new ExcelReader().readExcel(file); 
				ArrayList<String> rowList = null;
		        //获得Excel表格的内容:
				
		        for (int i = 1; i < list.size(); i++) {
		        	rowList = list.get(i);
		        	Sample sample = new Sample();
		        	sample.setID(EntityIDFactory.createId());
		        	sample.setFactoryCode(rowList.get(0));
		        	sample.setSampleName(rowList.get(1));
		        	sample.setSpecifications(rowList.get(2));
		        	String tempString = rowList.get(3);
		        	if(tempString == null || tempString.equals("")){
		        		sample.setLaborHour(0);
		        	}else{
		        		sample.setLaborHour(Integer.parseInt(tempString));
		        	}
		        
		        	sample.setUnit(rowList.get(4));
		        	sample.setState(0);
		        	sample.setRemarks(rowList.get(6));
		        	sample.setCreateTime(date);
		            entityDao.save(sample);
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
