package com.cqut.xiji.controller.testStandard;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.testStandard.ITestStandardService;

@Controller
@RequestMapping("/testStandardController")
public class TestStandardController{
	
	@Resource(name="testStandardService")
	ITestStandardService service;
	
	/**
	 * 
	 * @description 通过检测项目id获得检测标准
	 * @author LG.hujiajun
	 * @created 2017年7月4日 上午9:43:54
	 * @param testProjectID
	 * @return
	 */
	@RequestMapping("/getTSdByTPID")  
    @ResponseBody
	public String getTSdByTPID(String testProjectID){
		List<Map<String, Object>> result = service.getTSdByTPID(testProjectID);
		return JSONArray.fromObject(result).toString();
	}
}
