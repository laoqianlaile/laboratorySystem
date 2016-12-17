package com.cqut.xiji.controller.testStandard;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.cqut.xiji.service.testStandard.ITestStandardService;

@Controller
@RequestMapping("/testStandardController")
public class TestStandardController{
	
	@Resource(name="testStandardService")
	ITestStandardService service;
}
