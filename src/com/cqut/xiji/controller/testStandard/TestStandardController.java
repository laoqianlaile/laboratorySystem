package com.cqut.xiji.controller.testStandard;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.testStandard.ITestStandardService;

@Controller
@RequestMapping("/testStandardController")
public class TestStandardController{
	
	@Resource(name="testStandardService")
	ITestStandardService service;
}
