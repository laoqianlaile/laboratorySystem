package com.cqut.xiji.controller.contractFineItem;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.cqut.xiji.service.contractFineItem.IContractFineItemService;
import com.cqut.xiji.tool.POIXLSReader.ExcelReader;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.cqut.xiji.tool.util.PropertiesTool;

@Controller
@RequestMapping("/contractFineItemController")
public class ContractFineItemController{
	
	@Resource(name="contractFineItemService")
	IContractFineItemService service;
	
	/**
	 * @description 个人任务统计初始化表格
	 * @author chenyubo
	 * @created 2016年10月18日 下午7:50:46
	 * @param ID 员工ID
	 * @param type 任务类型
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getPersonalTaskStatistical")
	@ResponseBody
	public JSONObject getPersonalTaskStatistical(String ID, int type, String testProjectID,int limit, int offset,String order, String sort){
		Map<String, Object> result = service.getPersonalTaskStatistical(ID, type, testProjectID,limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
//	/**
//	 * 
//	 * @description 任务统计下查询所有该检测人员检测的检测项目
//	 * @author chenyubo
//	 * @created 2016年10月22日 上午10:38:38
//	 * @param ID
//	 * @return
//	 */
//	@RequestMapping("/getAllTestProjectInTaskStatistical")
//	@ResponseBody
//	public String getAllTestProjectInTaskStatistical(String ID){
//		List<Map<String, Object>> result = service.getAllTestProjectInTaskStatistical(ID);
//		return JSONArray.fromObject(result).toString();
//	}
//	
//	/**
//	 * 
//	 * @description 任务统计下查看检测项目详情
//	 * @author chenyubo
//	 * @created 2016年10月22日 下午2:46:33
//	 * @param ID
//	 * @param testProjectID
//	 * @param limit
//	 * @param offset
//	 * @param order
//	 * @param sort
//	 * @return
//	 */
//	@RequestMapping("/getTaskStatisticalDetail")
//	@ResponseBody
//	public JSONObject getTaskStatisticalDetail(String ID,String contractCode,String receiptlistCode,String companyName,String startTime,String endTime,String sampleName,int limit, int offset,String order, String sort){
//		Map<String, Object> result = service.getTaskStatisticalDetail(ID,contractCode,receiptlistCode,companyName,startTime,endTime,sampleName,limit, offset, order, sort);
//		return JSONObject.fromObject(result);
//	}
	
	//*******************科室任务统计*****************
	
	/**
	 * 
	 * @description 科室任务统计初始化表格
	 * @author chenyubo
	 * @created 2016年11月14日 上午9:56:49
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getTestProjectInDepartmentTaskStatistical")
	@ResponseBody
	public JSONObject getTestProjectInDepartmentTaskStatistical(String ID,int limit, int offset,String order, String sort){
		Map<String, Object> result = service.getTestProjectInDepartmentTaskStatistical(ID,limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
	 * @description 科室任务统计获取总金额
	 * @author chenyubo
	 * @created 2017年05月24日 16:51:14
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getTotalMoneyInDepartmentTaskStatistical")
	@ResponseBody
	public String getTotalMoneyInDepartmentTaskStatistical(String ID){
		String result = service.getTotalMoneyInDepartmentTaskStatistical(ID);
		return result;
	}
	
	/**
	 * 
	 * @description 科室任务统计下查看检测项目详情次数
	 * @author chenyubo
	 * @created 2016年11月14日 下午4:39:01
	 * @param ID
	 * @param contractCode
	 * @param receiptlistCode
	 * @param companyName
	 * @param startTime
	 * @param endTime
	 * @param sampleName
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
//	@RequestMapping("/getDepartmentTaskStatisticalDetail")
//	@ResponseBody
//	public JSONObject getDepartmentTaskStatisticalDetail(String ID,String testProjectID,String contractCode,String companyName,String startTime,String endTime,int limit, int offset,String order, String sort){
//		Map<String, Object> result = service.getDepartmentTaskStatisticalDetail(ID,testProjectID,contractCode,companyName,startTime,endTime,limit, offset, order, sort);
//		return JSONObject.fromObject(result);
//	}
	
	/**
	 * 
	 * @description 科室任务统计下查看检测项目详情页面
	 * @author chenyubo
	 * @created 2016年11月14日 下午10:02:33
	 * @param ID
	 * @param testProjectID
	 * @param contractID
	 * @param contractCode
	 * @param companyName
	 * @param startTime
	 * @param endTime
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
//	@RequestMapping("/getDepartmentTaskStatisticalDetailPage")
//	@ResponseBody
//	public JSONObject getDepartmentTaskStatisticalDetailPage(String ID,String testProjectID,String contractID,String contractCode,String receiptlistCode,String companyName,String sampleName,String startTime,String endTime,int limit, int offset,String order, String sort){
//		Map<String, Object> result = service.getDepartmentTaskStatisticalDetailPage(ID,testProjectID,contractID,contractCode,receiptlistCode,companyName,sampleName,startTime,endTime,limit, offset, order, sort);
//		return JSONObject.fromObject(result);
//	}
	

	//*******************大类任务统计*******************
	
	/**
	 * 
	 * @description 大类任务统计初始化表格
	 * @author chenyubo
	 * @created 2016年11月16日 下午3:42:54
	 * @param ID 科室ID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return 
	 */
	@RequestMapping("/getLargeclassTaskStatistical")
	@ResponseBody
	public JSONObject getLargeclassTaskStatistical(String ID, int limit, int offset,String order, String sort){
		Map<String, Object> result = service.getLargeclassTaskStatistical(ID, limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
	 * @description 大类任务统计查看具体大类检测项目
	 * @author chenyubo
	 * @created 2016年11月16日 下午7:26:51
	 * @param ID
	 * @param departmentID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getLargeclassTaskStatisticalDetail")
	@ResponseBody
	public JSONObject getLargeclassTaskStatisticalDetail(String ID,String departmentID, int limit, int offset,String order, String sort){
		Map<String, Object> result = service.getLargeclassTaskStatisticalDetail(ID, departmentID, limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	
	@RequestMapping("/getContractFileItemWithPaging1")
	@ResponseBody
	public JSONObject getContractFileItemWithPaging1(String ID,int limit, int offset,String order, String sort){
		Map<String, Object> result = service.getContractFileItemWithPaging1(ID,limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping("/getContractFileItemWithPaging2")
	@ResponseBody
	public JSONObject getContractFileItemWithPaging2(String ID,int limit, int offset,String order, String sort){
		Map<String, Object> result = service.getContractFileItemWithPaging2(ID,limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping("/addContractFineItem1")  
    @ResponseBody
	public int addContractFineItem1(int isOutsourcing,
			String testProjectID, String testProjectName,String standardID,int number, double price, double money,
			String remarks, String contractID){
		int results = service.addContractFineItem1(isOutsourcing, testProjectID,testProjectName,standardID, number, price, money, remarks, contractID);
		return results;
	}
	
	@RequestMapping("/addContractFineItem2")  
    @ResponseBody
	public int addContractFineItem2(String sampleID,String factoryCode,String sampleName,String specifications,
			double money,String remarks, String contractID){
		int results = service.addContractFineItem2(sampleID,factoryCode,sampleName,specifications,money,remarks,contractID);
		return results;
	}
	
	/**
	 * 
	 * @description 新增一个空的校准合同细项
	 * @author LG.hujiajun
	 * @created 2017年7月1日 下午4:23:10
	 * @param contractID
	 * @return
	 */
	@RequestMapping("/addNullFineItem")  
    @ResponseBody
	public int addNullFineItem(String contractID){
		int results = service.addNullFineItem(contractID);
		return results;
	}
	
	@RequestMapping("/delContractFineItem")  
    @ResponseBody
	public int delContractFineItem(String itemID,String contractID){
		int result = service.delContractFineItem(itemID,contractID);
		return result;
	}
	
	@RequestMapping("/updContractFineItem1")  
    @ResponseBody
	public int updContractFineItem1(String ID,int isOutsourcing,
			String testProjectID, String testProjectName,String standardID,int number, double price, double money,
			String remarks, String contractID){
		int results = service.updContractFineItem1(ID, isOutsourcing, testProjectID, testProjectName,standardID, number, price, money, remarks, contractID);
		return results;
	}
	
	@RequestMapping("/updContractFineItem2")  
    @ResponseBody
	public int updContractFineItem2(String ID,String sampleID,String factoryCode,String sampleName,String specifications,
			double money,String remarks, String contractID){
		int results = service.updContractFineItem2(ID,sampleID,factoryCode,sampleName,specifications,money,remarks,contractID);
		return results;
	}
	
	@RequestMapping("/updFineItem2")  
    @ResponseBody
	public int updFineItem2(String ID,String sampleID,String factoryCode,String sampleName,String specifications,
			double money,String remarks, String contractID){
		int results = service.updFineItem2(ID,sampleID,factoryCode,sampleName,specifications,money,remarks,contractID);
		return results;
	}
	
	@RequestMapping("/updateContractAmount")  
    @ResponseBody
	public int updateContractAmount(String contractID){
		int result = service.updateContractAmount(contractID);
		return result;
	}
	/**
	 * 通过合同ID获取合同细项
	 * 
	 * @author zkl
	 * @data 2017年4月12日 下午9:41:10
	 * @param contractID
	 * @return
	 */
	@RequestMapping("/getContractFineItemByContractIDs")
	@ResponseBody
	public String getContractFineItemByContractIDs(String ContractID){
		List<Map<String,Object>> result = service.getContractFineItemByContractIDs(ContractID);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * 
	 * @description 导出合同细项
	 * @author LG.hujiajun
	 * @created 2017年7月4日 下午9:45:30
	 * @param request
	 * @param response
	 */
	@RequestMapping("/contractFineItemExportExcel1")
	@ResponseBody
	public void contractFineItemExportExcel1(HttpServletRequest request,HttpServletResponse response) {
		service.contractFineItemExportExcel1(request, response);
	}
	
	/**
	 * 
	 * @description 导出合同细项
	 * @author LG.hujiajun
	 * @created 2017年7月4日 下午9:45:30
	 * @param request
	 * @param response
	 */
	@RequestMapping("/contractFineItemExportExcel2")
	@ResponseBody
	public void contractFineItemExportExcel2(HttpServletRequest request,HttpServletResponse response) {
		service.contractFineItemExportExcel2(request, response);
	}

	/**
	 * @description 导入合同细项
	 * @author LG.hujiajun
	 * @created 2017年7月8日 下午4:36:47
	 * @param file
	 * @param req
	 * @param response
	 * @param typeNumber
	 * @param belongtoID
	 */
	@RequestMapping("/importExcelTemplate")
	@ResponseBody
	public int importExcelTemplate(@RequestParam("contractfineitem") CommonsMultipartFile file,
			HttpServletRequest req, HttpServletResponse response,int typeNumber, String belongtoID) {
		int result = service.importExcelTemplate(file,req,response,typeNumber,belongtoID);
		return result;
	}
	
	/*@RequestMapping("/importExcelTemplate")
	@ResponseBody
	public String importExcelTemplate(@RequestParam("contractfineitem") CommonsMultipartFile file,
			HttpServletRequest req, HttpServletResponse response,int TypeNumber, String belongtoID){
		System.out.println("TypeNumber:"+TypeNumber);
		String ID = EntityIDFactory.createId();// 文件ID
		String fileName = file.getOriginalFilename();// 获取文件全名
		PropertiesTool pe = new PropertiesTool();
		String[] fileNames = fileName.split("\\.");// 将文件名以\.分割成一个数组
		String cacheFilePath = "";// 缓存文件路径
		cacheFilePath = pe.getSystemPram("cacheFilePath") + "\\";// 缓存文件地址
		System.out.println("cacheFilePath1: " + cacheFilePath);
		for (int j = 0; j < fileNames.length; j++) {
			if (fileNames.length - j > 1) {
				cacheFilePath += fileNames[j];
			} else {
				cacheFilePath += "_" + ID + "." + fileNames[j];
			}
		}

		File targetFile = new File(cacheFilePath);
		if (!targetFile.exists()) {
			targetFile.mkdirs();
		}
		try {
			file.transferTo(targetFile);
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	System.out.println("fileName :" + fileName);
	System.out.println("cacheFilePath " + cacheFilePath);
	String nameCn = "";
	String nameEn = "";
	int number = 0;
	double price = 0;
	double money = 0;
	String standardCode = "";
	String standardName = "";
	int isOutsourcing = 0;
	String remarks = "";
	
	try {  
		List<ArrayList<String>> list = new ExcelReader().readExcel(file); 
		ArrayList<String> rowList = null;
        //获得Excel表格的内容:
        for (int i = 1; i < list.size(); i++) {
        	rowList = list.get(i);
        	for (int j = 0; j < rowList.size(); j++) {
        		rowList.get(j);
        		switch (j) {
    			case 0:nameCn = rowList.get(j);
    				break;
    			case 1:nameEn = rowList.get(j);
					break;
    			case 2:number = Integer.parseInt(rowList.get(j));
					break;
    			case 3:price = Double.parseDouble(rowList.get(j));
					break;
    			case 4:money = Double.parseDouble(rowList.get(j));;
					break;
    			case 5:standardCode = rowList.get(j);
					break;
				case 6:standardName = rowList.get(j);
					break;
				case 7:if(rowList.get(j).equals("内测")){
							isOutsourcing = 0;
						}else{
							isOutsourcing = 1;
						}
					break;
				case 8:remarks = rowList.get(j);
					break;
    			default:
    				break;
    			}
        	}
        	
        }  
    } catch (IOException e) {  
        System.out.println("未找到指定路径的文件!");  
        e.printStackTrace();  
    }
	String result = belongtoID;
		return result;
	}*/
	
	/*@RequestMapping("/importExcelTemplate")
	@ResponseBody
	public String importExcelTemplate(@RequestParam("contractfineitem") CommonsMultipartFile file,
			HttpServletRequest req, HttpServletResponse response, String belongtoID){
		String ID = EntityIDFactory.createId();// 文件ID
		String fileName = file.getOriginalFilename();// 获取文件全名
		PropertiesTool pe = new PropertiesTool();
		String[] fileNames = fileName.split("\\.");// 将文件名以\.分割成一个数组
		String cacheFilePath = "";// 缓存文件路径
		cacheFilePath = pe.getSystemPram("cacheFilePath") + "\\";// 缓存文件地址
		System.out.println("cacheFilePath1" + cacheFilePath);
		for (int j = 0; j < fileNames.length; j++) {
			if (fileNames.length - j > 1) {
				cacheFilePath += fileNames[j];
			} else {
				cacheFilePath += "_" + ID + "." + fileNames[j];
			}
		}

		File targetFile = new File(cacheFilePath);
		if (!targetFile.exists()) {
			targetFile.mkdirs();
		}
		try {
			file.transferTo(targetFile);
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	System.out.println("fileName :" + fileName);
	System.out.println("cacheFilePath " + cacheFilePath);
	try {  
		List<ArrayList<String>> list = new ExcelReader().readExcel(file); 
		ArrayList<String> rowList = null;
        System.out.println("获得Excel表格的内容:");  
        for (int i = 1; i < list.size(); i++) {
        	rowList = list.get(i);
        	for (int j = 0; j < rowList.size(); j++) {
        		System.out.println(rowList.get(j)); 
        	}
        }  
        System.out.println(list.size());
        System.out.println(rowList.size());
    } catch (IOException e) {  
        System.out.println("未找到指定路径的文件!");  
        e.printStackTrace();  
    }
	String result = belongtoID;
		return result;
	}*/
}
