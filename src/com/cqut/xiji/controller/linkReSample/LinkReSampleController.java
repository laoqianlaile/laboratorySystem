package com.cqut.xiji.controller.linkReSample;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.linkReSample.ILinkReSampleService;

@Controller
@RequestMapping("/linkReSampleController")
public class LinkReSampleController{
	
	@Resource(name="linkReSampleService")
	ILinkReSampleService service;
	
	/**
	 * @description  获取交接单中的信息
	 * @author hzz
	 * @date 2016年 10月19日 晚上19:20:05
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 */
	@RequestMapping("/getlinkReSampleInforWithPaging")
	@ResponseBody
	public JSONObject getlinkReSampleInforWithPaging(String ID, int limit,
			int offset, String sort, String order) {
		Map<String, Object> result = service
				.getlinkReSampleInforWithPaging(ID, limit, offset, sort,
						order);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
	 * @param ID
	 * @return
	 */
	@RequestMapping("/getRequire")
	@ResponseBody
	public String getRequire(String ID) {
		System.out.println(ID);
		List<Map<String, Object>> result = service
				.getRequire(ID);
		return JSONArray.fromObject(result).toString();
	}
	
	
	/**
	 * @description 更新交接单中的样品信息
	 * @author hzz
	 * @date 2016年11月12日 早上 09：35:12
	 * @param ID
	 * @param factoryCode
	 * @param sampleName
	 * @param specifications
	 * @param createTime
	 * @param linkID 
	 * @param testID 
	 * @param nameCn 
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping("/updlinkReSampleInForInReturn")  
    @ResponseBody
	public String updlinkReSampleInForInReturn(String ID, String factoryCode,
			String sampleName, String specifications,String createTime, String linkID, String testID, String nameCn
			) throws UnsupportedEncodingException {
		System.out.println(sampleName);
		sampleName=URLDecoder.decode(sampleName,"utf-8");
		nameCn=URLDecoder.decode(nameCn,"utf-8");
		String result = service.updlinkReSampleInForInReturn(ID, linkID, testID, factoryCode, sampleName, specifications, nameCn, createTime);
		return result;
	}
	
	/**
	 * @description 删除交接单中的样品
	 * @author hzz
	 * @date  2016年11月16日  早上 11:04:07
	 * @param ID
	 * @param linkID
	 * @return
	 */
	@RequestMapping("/delLinkReSample")  
    @ResponseBody
	public String delLinkReSample(String linkID){
		String result = service.delLinkReSample(linkID);
		return result;
	}
	
	/**
	 * @description 录入样品
	 * @author hzz
	 * @date 2016年11月17日 晚上 20:3:09
	 * @param ID
	 * @param receiptlistID
	 * @return
	 */
	@RequestMapping("/addLinkSample")  
    @ResponseBody
	public String addLinkSample(String ID, String receiptlistID){
		String result = service.addLinkSample(ID,receiptlistID);
		return result;
	}
	
	/**
	 * @description 获取样品ID
	 * @author hzz
	 * @date 2016年11月17日 晚上 22:40:58
	 * @param qrcode
	 * @return
	 */
	@RequestMapping("/getSampleID")  
    @ResponseBody
	public String getSampleID(String qrcode){
		List<Map<String, Object>> result = service.getSampleID(qrcode);
		return JSONArray.fromObject(result).toString();
	}
	
}
