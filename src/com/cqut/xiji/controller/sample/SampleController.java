package com.cqut.xiji.controller.sample;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.sample.ISampleService;

@Controller
@RequestMapping("/sampleController")
public class SampleController{
	
	@Resource(name="sampleService")
	ISampleService service;
	/**
	 * 初始化数据-分页取样品信息
	 * @author wzj
	 * @date 2016年10月13日 下午9:15:45
	 * @param sampleName
	 * @param sampleType
	 * @param giveMan
	 * @param takeMan
	 * @param receiptlistCode
	 * @param startTime
	 * @param endTime
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getSampleWithPaging")
	@ResponseBody
	public JSONObject getSampleWithPaging(String factoryCode,String sampleName,String sampleType,String giveMan,String takeMan,String receiptlistCode, String startTime, String endTime,int limit, int offset,
			String order, String sort ){
		
		Map<String, Object>list = service.getSampleWithPaging(factoryCode,sampleName, sampleType,giveMan, takeMan,receiptlistCode,startTime, endTime, limit, offset, order, sort);
	    return JSONObject.fromObject(list);
	}
	/**
	 * 
	 * @author wzj
	 * @date 2016年10月13日 下午9:15:41
	 * @param sampleID
	 * @return
	 */
	@RequestMapping("/getSampleByID")  
    @ResponseBody  	
	public String getSampleByID(String sampleID) {
		return service.getSampleByID(sampleID);
	}
	
	
	/**
	 * 
	 * @author wzj
	 * @date 2016年10月13日 下午9:15:32
	 * @param sampleName
	 * @param sampleType
	 * @param giveMan
	 * @param takeMan
	 * @param receiptlistCode
	 * @param takePhone
	 * @param givePhone
	 * @param remarks
	 * @param unit
	 * @return
	 */
	@RequestMapping("/addLinkSample")  
    @ResponseBody
	public String addLinkSample(String factoryCode,String sampleName, String sampleType,String giveMan,String takeMan,String receiptlistCode,String takePhone,String givePhone, String remarks,String unit){
		String result = service.addLinkSample(factoryCode, sampleName, sampleType, receiptlistCode, remarks, unit);
		return result;
	}
	/**
	 * 新增样品
	 * @author wzj
	 * @date 2016年12月21日 上午12:15:11
	 * @param factoryCode
	 * @param sampleName
	 * @param sampleType
	 * @param giveMan
	 * @param takeMan
	 * @param takePhone
	 * @param givePhone
	 * @param remarks
	 * @param unit
	 * @return
	 */
	@RequestMapping("/addSample")  
    @ResponseBody
	public String addSample(String factoryCode,String sampleName, String sampleType,String giveMan,String takeMan,String takePhone,String givePhone, String remarks,String unit){
		String result = service.addSample(factoryCode, sampleName, sampleType, remarks, unit);
		return result;
	}

	/**
	 * 
	 * @author wzj
	 * @date 2016年10月21日 下午7:43:33
	 * @param roleIDs
	 * @return
	 */
	@RequestMapping("/delSample")  
    @ResponseBody
	public String delSample(String roleIDs){
		String result = service.delSample(roleIDs);
		return result;
	}
	/**
	 * 
	 * @author wzj
	 * @date 2016年10月21日 下午7:43:46
	 * @param roleIDs
	 * @return
	 */
	@RequestMapping("/delLinkReSample")  
    @ResponseBody
	public String delLinkReSample(String linkIDs){
		String result = service.delLinkReSample(linkIDs);
		return result;
	}
	/**
	 * 单纯的更新样品信息
	 * @author wzj
	 * @date 2016年10月13日 下午9:15:24
	 * @param ID
	 * @param sampleName
	 * @param sampleType
	 * @param remarks
	 * @param unit
	 * @return
	 */
	@RequestMapping("/updateSample")  
    @ResponseBody
	public String updateSample(String ID,String sampleName, String factoryCode,String sampleType, String remarks,String unit){
		String result = service.updateSample(ID,sampleName, factoryCode, sampleType,  remarks, unit);
		return result;
	}
	/**
	 * 
	 * @author wzj
	 * @date 2016年10月21日 下午7:45:14
	 * @param ID
	 * @param sampleName
	 * @param sampleType
	 * @param remarks
	 * @param unit
	 * @return
	 */
	@RequestMapping("/updateLinkSample")  
    @ResponseBody
	public String updateLinkSample(String ID,String sampleName,String factoryCode, String sampleType, String remarks,String unit,String linkID,String reID){
		String result = service.updateLinkSample(ID, sampleName,factoryCode, sampleType, remarks, unit, linkID, reID);
		return result;
	}
	@RequestMapping("/getSampleByCode")  
    @ResponseBody
	public String getSampleByCode(String sampleCode){
		String result = service.getSampleByCode(sampleCode);
		return result;
	}
	@RequestMapping("/isExitFactory")  
    @ResponseBody
	public String isExitFactory(String factoryCode){
		String result = service.isExitFactory(factoryCode);
		return result;
	}
	
	
	/**
	 * @description 获取样品ID
	 * @author hzz
	 * @date 2016年11月17日 晚上 22:40:58
	 * @param qrcode
	 * @return
	 */
	@RequestMapping("/getSampleInfor")  
    @ResponseBody
	public String getSampleInfor(String qrcode){
		List<Map<String, Object>> result = service.getSampleInfor(qrcode);
		return JSONArray.fromObject(result).toString();
	}
	@RequestMapping("/getSampleListByCodeLimit")  
    @ResponseBody
	public String getSampleListByCodeLimit(String sampleCode){
		List<Map<String, Object>> result = service.getSampleListByCodeLimit(sampleCode);
		return JSONArray.fromObject(result).toString();
	}
	
}
