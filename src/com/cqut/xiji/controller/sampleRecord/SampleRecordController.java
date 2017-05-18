package com.cqut.xiji.controller.sampleRecord;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.sampleRecord.ISampleRecordService;

@Controller
@RequestMapping("/sampleRecordController")
public class SampleRecordController{
	
	@Resource(name="sampleRecordService")
	ISampleRecordService service;
	/**
	 * 
	 * @description 添加样品信息记录
	 * @author wujie
	 * @created 2016年9月26日 下午7:25:51
	 * @param factoryCode
	 * @param sampleName
	 * @param specifications
	 * @param getMan
	 * @param getTime
	 * @param returnMan
	 * @param returnTime
	 * @return
	 */
	@RequestMapping("/addSampleRecord")
	@ResponseBody
	public String addSampleRecord(String factoryCode,String sampleName,String specifications,String getMan,String getTime,String type,String remarks){
	
		String result = service.addSampleRecord(factoryCode,sampleName,specifications,getMan,getTime,type,remarks);
		return result;
	}
	/**
	 * 
	 * @description 更新样品记录管理
	 * @author wujie
	 * @created 2016年9月26日 下午7:37:56
	 * @param SampleRecord
	 * @param factoryCode
	 * @param sampleName
	 * @param specifications
	 * @param getMan
	 * @param getTime
	 * @param returnMan
	 * @param returnTime
	 * @return
	 */
	@RequestMapping("/updSampleRecord")
	@ResponseBody
	public String updSampleRecord(String ID,String sampleID,String factoryCode,String sampleName,String specifications,String getManID,String getTime,String type,String remarks){
		String result = service.updSampleRecord(ID,sampleID ,factoryCode, sampleName, specifications, getManID, getTime,type,remarks);
		return result;
	}
	/**
	 * 
	 * @description 获取样品信息
	 * @author wujie
	 * @created 2016年9月26日 下午7:38:19
	 * @param SampleRecordID
	 * @return
	 */
	@RequestMapping("/getSample")
	@ResponseBody
	public Map<String, Object> getSample(String factoryCode){
		Map<String, Object> result = service.getSample(factoryCode);
		return result;
	}
	/**
	 * 
	 * @param factoryCode
	 * @return
	 */
	@RequestMapping("/addJudge")
	@ResponseBody
	public Map<String, Object> addJudge(String factoryCode){
		Map<String, Object> result = service.addJudge(factoryCode);
		return result;
	}
	
	/**
	 * 
	 * @description 分页获样品记录信息
	 * @author wujie
	 * @created 2016年9月26日 下午7:39:50
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getSampleRecordWithPaging")  
    @ResponseBody
	public JSONObject getSampleRecordWithPaging(String factoryCode,String sampleName,String specifications,String getMan,int limit, int offset, String sort, String order){
		Map<String, Object> result = service.getSampleRecordWithPaging(factoryCode,sampleName,specifications,getMan,limit,offset,sort,order);
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping("/getdatalist")
	@ResponseBody
	public JSONArray getdatalist(){
		
		return service.getdatalist();
	}
	
	@RequestMapping("/getFactoryCode")
    @ResponseBody
	public List<Map<String, Object>>  getFactoryCode(String factoryCode){
		System.out.println(factoryCode);
		List<Map<String, Object>> result = service.getFactoryCode(factoryCode);
		return result;
	}

	
	
	
}
