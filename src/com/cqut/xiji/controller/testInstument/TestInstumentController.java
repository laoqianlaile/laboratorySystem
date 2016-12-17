package com.cqut.xiji.controller.testInstument;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.cqut.xiji.service.testInstument.ITestInstumentService;

@Controller
@RequestMapping("/testInstumentController")
public class TestInstumentController{
	
	@Resource(name="testInstumentService")
	ITestInstumentService service;
}
