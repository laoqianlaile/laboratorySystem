package com.cqut.xiji.controller.receiptlist;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.receiptlist.IReceiptlistService;

@Controller
@RequestMapping("/receiptlistController")
public class ReceiptlistController{
	
	@Resource(name="receiptlistService")
	IReceiptlistService service;
	
	/**
	 * 
	 * @description 任务分配下分页取出表格信息
	 * @author chenyubo
	 * @created 2016年11月16日 下午9:34:32
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @param receiptlistCode
	 * @param contractCode
	 * @param companyName
	 * @param linkMan
	 * @param acceptSampleTime_start
	 * @param acceptSampleTime_end
	 * @param state
	 * @param assignState
	 * @return
	 */
	@RequestMapping("/getReceiptlistWithPagingInTaskAssign")  
    @ResponseBody
	public JSONObject getReceiptlistWithPagingInTaskAssign(int limit, int offset, String sort, String order,String receiptlistCode,String contractCode,String companyName,String linkMan,String acceptSampleTime_start,String acceptSampleTime_end,int state,int assignState){
		Map<String, Object> result = service.getReceiptlistWithPagingInTaskAssign(limit, offset, sort, order, receiptlistCode, contractCode, companyName, linkMan, acceptSampleTime_start, acceptSampleTime_end, state, assignState);
		return JSONObject.fromObject(result);
	}
	/**
	 * 分页取出交接单的信息
	 * @author wzj
	 * @date 2016年10月22日 上午10:41:14
	 * @param reCode
	 * @param coCode
	 * @param companyName
	 * @param reType
	 * @param linkMan
	 * @param startTime
	 * @param endTime
	 * @param state
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getReceiptlistWithPaging")  
    @ResponseBody
	public JSONObject getReceiptlistWithPaging(String reCode,String coCode,String companyName,String reType,String linkMan,String startTime,String endTime,String state,int limit, int offset, String order, String sort){
		Map<String, Object> result = service.getReceiptlistWithPaging(reCode, coCode, companyName, reType, linkMan, startTime, endTime, state, limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	@RequestMapping("/getsecretWithPaging")  
    @ResponseBody
	public JSONObject getsecretWithPaging(String reCode,String coCode,String companyName,String reType,String linkMan,String startTime,String endTime,String classifiedLevel,int limit, int offset, String order, String sort){
		Map<String, Object> result = service.getsecretWithPaging(reCode, coCode, companyName, reType, linkMan, startTime, endTime, classifiedLevel, limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
	 * @description 任务分配下获取交接单信息
	 * @author chenyubo
	 * @created 2016年11月16日 下午9:35:00
	 * @param ID
	 * @return
	 */
	@RequestMapping("/getReceiptlistInfoInTaskAssign")  
    @ResponseBody
	public String getReceiptlistInfoInTaskAssign(String ID){
		System.out.println(ID);
		List<Map<String, Object>> result = service.getReceiptlistInfoInTaskAssign(ID);
		return JSONArray.fromObject(result).toString();
	}
	/**
	 * 获取任务列表通过交接单ID
	 * @author wzj
	 * @date 2016年11月16日 下午8:17:40
	 * @param reID
	 * @return
	 */
	@RequestMapping("/getTasklistByReID")  
    @ResponseBody
	public JSONObject getTasklistByReID(String reID,int limit,
			int offset, String order, String sort){
		System.out.println("reID:"+reID);
		Map<String, Object> result = service.getTasklistByReID(reID, limit, offset,  order,  sort);
	    return JSONObject.fromObject(result);
	}
	/**
	 * 获取交接单相关的附件信息通过交接单ID
	 * @author wzj
	 * @date 2016年11月17日 下午7:48:29
	 * @param reID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getRelateFiletByReID")
	@ResponseBody
	public JSONObject getRelateFiletByReID(String reID, int limit, int offset, String order,  String sort) {
		Map<String, Object> result = service.getRelateFiletByReID(reID,limit,offset,order,sort);
		return JSONObject.fromObject(result);
	}
	/**
	 * 新增任务或者编辑任务
	 * @author wzj
	 * @date 2016年11月20日 下午1:56:02
	 * @param sampleID
	 * @param sampleCode
	 * @param sampleName
	 * @param sampleStyle
	 * @param testProject
	 * @param unit
	 * @param require
	 * @param reID
	 * @param state
	 * @return
	 */
	@RequestMapping("/addTaskAndSampleWithEdit")
	@ResponseBody
	public String addTaskAndSampleWithEdit(String taskID ,String sampleID, String sampleCode,String  sampleName, String sampleStyle, String testProjects, String type,String departmentID,  String unit,String require,String reID,String
			 state) {
		String result = service.addTaskAndSampleWithEdit( taskID,sampleID,  sampleCode,  sampleName,  sampleStyle,  testProjects,   type, departmentID ,unit, require, reID, state);
		return result;
	}
	/**
	 * 通过任务ID删除任务
	 * @author wzj
	 * @date 2016年11月20日 下午10:27:14
	 * @param taskID
	 * @return
	 */
	@RequestMapping("/deleteTaskByID")
	@ResponseBody
	public String deleteTaskByID(String taskID ) {
		
		String result = service.deleteTaskByID( taskID  );
		return result;
	}
	/**
	 * 保存或者提交交接单
	 * @author wzj
	 * @date 2016年11月22日 上午1:55:46
	 * @param reID
	 * @param saveState
	 * @param addState
	 * @param companyName
	 * @param address
	 * @param linkMan
	 * @param startTime
	 * @param endTime
	 * @param linkPhone
	 * @param accordingDoc
	 * @param coID
	 * @return
	 */
	@RequestMapping("/saveSubmitReceipt")
	@ResponseBody
	public String saveSubmitReceipt(String reID ,String saveState ,String addState ,String companyName ,String address ,String linkMan ,String startTime ,String endTime ,String linkPhone , String accordingDoc ,String reCode,String coID ,String comID) {
		String result = service.saveSubmitReceipt( reID , saveState , addState , companyName , address , linkMan , startTime , endTime , linkPhone ,  accordingDoc , reCode,coID ,comID) ;
		return result;
	}
	/**
	 * 新增交接单
	 * @author wzj
	 * @date 2016年11月27日 下午7:38:56
	 * @param coID
	 * @param proID
	 * @param state
	 * @param request
	 * @return
	 */
	@RequestMapping("/addReceiptList")
	@ResponseBody
	public String addReceiptList(HttpServletRequest request,String coID ,String proID ,String state) {
		Map<String, Object> result = service.addReceiptList( request.getSession() ,coID , proID , state ,request ) ;
		return JSONObject.fromObject(result).toString();
	}
	/**
	 * 获取交接单信息通过交接单ID
	 * @author wzj
	 * @date 2016年11月27日 下午7:39:24
	 * @param reID
	 * @return
	 */
	@RequestMapping("/getReceiptByReID")
	@ResponseBody
	public String getReceiptByReID(String reID , String coID) {
		Map<String, Object> result = service.getReceiptByReID( reID,coID) ;
		return JSONObject.fromObject(result).toString();
	}
	/**
	 * 删除交接单
	 * @author wzj
	 * @date 2016年12月22日 下午10:25:18
	 * @param reID
	 * @return
	 */
	@RequestMapping("/delReceiptlist")
	@ResponseBody
	public String delReceiptlist(String reIDs ) {
		return service.delReceiptlist( reIDs) ;
	}
	
	/**
	 * @author hzz
	 * @date 2016年  10月20日 晚上 21:04:32
	 * @param ID
	 * @return
	 */
	@RequestMapping("/getReceiptlistInformationInView")  
	@ResponseBody
	public String getReceiptlistInformationInView(String ID){
		System.out.println(ID);
		List<Map<String, Object>> result = service.getReceiptlistInformationInView(ID);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * @author hzz
	 * @date 2016年  10月21日 晚上 19:35:02
	 * @param ID
	 * @return
	 */
	@RequestMapping("/getReceiptlistInforInReturn")  
	@ResponseBody
	public String getReceiptlistInforInReturn(String ID){
		System.out.println(ID);
		List<Map<String, Object>> result = service.getReceiptlistInforInReturn(ID);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * @author hzz
	 * @date  2016年11月15日 下午 14:43:21
	 * @param ID
	 * @param linkMan
	 * @param createTime
	 * @param linkPhone
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping("/updReceiptlistInforInReturn")  
	@ResponseBody
	public String updReceiptlistInforInReturn(String ID,String linkMan,String createTime,String linkPhone) throws UnsupportedEncodingException{
		linkMan=URLDecoder.decode(linkMan,"utf-8");
		String result = service.updReceiptlistInforInReturn(ID, linkMan, createTime, linkPhone);
		return result;
	}
	
	/**
	 * 新增退还交接单
	 * @author hzz
	 * @date 2016年11月30日 早上 10:30:09
	 * @return
	 */
	@RequestMapping("/addReceiptListInReturn")  
	@ResponseBody
	public String addReceiptListInReturn() {
		Map<String, Object> result = service.addReceiptListInReturn() ;
		return JSONObject.fromObject(result).toString();
	}
	
	/**
	 * 更新退还交接单
	 * @author hzz
	 * @date 2016年11月 30日 早上 11:05:19
	 * @param reID
	 * @param conID
	 * @param linkMan
	 * @param createTime
	 * @param linkPhone
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping("/updRelistInforInReturn")  
	@ResponseBody
	public String updRelistInforInReturn(String reID,String conID,String linkMan,String createTime,String linkPhone) throws UnsupportedEncodingException{
		linkMan=URLDecoder.decode(linkMan,"utf-8");
		String result = service.updRelistInforInReturn(reID, conID, linkMan, createTime, linkPhone);
		return result; 
	}
	/**
	 * 样品管理员-获取合同-交接单数据信息
	 * @author wzj
	 * @date 2016年12月28日 下午3:03:33
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping("/getReceiptlistAll")  
	@ResponseBody
	public JSONObject getReceiptlistAll(int limit, int offset, String sort, String order) throws UnsupportedEncodingException{
		return JSONObject.fromObject(service.getReceiptlistAll(   limit,   offset,   sort,   order));
	}
	

	/**
	 * 获取交接单数据 通过合同ID
	 * 
	 * @author zkl
	 * @return
	 */
	@RequestMapping("/getReceiptlistInfo")
	@ResponseBody
	public String getReceiptlistInfo(String contractID){
		List<Map<String, Object>> result = service.getReceiptlistInfo(contractID);
		return JSONArray.fromObject(result).toString();
	}
	@RequestMapping("/downReceiptlist")
	@ResponseBody
	public String downReceiptlist(String reID,String coID, String proID){
		
		return  service.downReceiptlist(reID,coID,proID);
	}
	/**
	 * 
	 * 删除交接单的合同 任务 文件等操作
	 * @author wzj
	 * @date 2017年3月20日 下午8:48:50
	 * @param reID
	 * @param coID
	 * @param proID
	 * @return
	 */
	@RequestMapping("/deleteNewReceipt")
	@ResponseBody
	public String deleteNewReceipt(String reID,String coID, String proID ,String state){
		
		return  service.deleteNewReceipt(reID,coID,proID,state);
	}
	
}
